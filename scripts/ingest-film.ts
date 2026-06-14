import fs from "node:fs";
import path from "node:path";
import { createPrismaClient } from "../lib/prisma";
import { fetchWikidataFilm } from "./ingest/wikidata";
import { fetchWikipediaBackground } from "./ingest/wikipedia";
import { fetchCommonsImage } from "./ingest/commons";
import { generateOriginalText } from "./ingest/text";
import { normalizeGenres } from "./ingest/genres";

// Load DATABASE_URL (+ optional ANTHROPIC_API_KEY) before creating the client.
try {
  process.loadEnvFile();
} catch {
  /* .env optional */
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Studios known to publish their own films free & legal on official channels.
// A candidate from one of these is still UNVERIFIED until a human confirms the
// exact video URL — we never auto-publish a link as OFFICIAL.
const STUDIOS_WITH_OFFICIAL_CHANNELS = ["Mosfilm", "Soyuzmultfilm", "Lenfilm"];

type WatchCandidate = {
  platform: string;
  label: string;
  url: string | null;
  sourceType: "OFFICIAL" | "UNVERIFIED";
  rightsNote: string;
};

const prisma = createPrismaClient();

async function main() {
  const qid = process.argv[2];
  const publish = process.argv.includes("--publish");
  if (!qid || !/^Q\d+$/.test(qid)) {
    console.error("Usage: npm run ingest -- <WikidataQID> [--publish]");
    console.error("Example: npm run ingest -- Q152350");
    process.exit(1);
  }

  console.log(`\nIngesting ${qid} …`);

  // 1. Structured metadata from Wikidata.
  const wd = await fetchWikidataFilm(qid);
  if (!wd.year) throw new Error(`${qid} (${wd.title}) has no release year; refusing to ingest.`);
  console.log(`  Wikidata: "${wd.title}" (${wd.year}) dir. ${wd.director ?? "?"}`);

  // 2. Background reading (recorded as a source; never published verbatim).
  const bg = wd.enwikiTitle ? await fetchWikipediaBackground(wd.enwikiTitle) : null;
  console.log(`  Wikipedia: ${bg ? `"${bg.title}"` : "(none)"}`);

  // 3. Original text in our own words (LLM if configured, else a draft).
  const generated = bg
    ? await generateOriginalText({
        title: wd.title,
        year: wd.year,
        director: wd.director,
        background: bg.extract,
      })
    : null;
  console.log(`  Original text: ${generated ? "generated" : "DRAFT placeholder"}`);

  // 4. Freely-licensed image from Commons (skipped if non-free).
  const image = wd.imageFile ? await fetchCommonsImage(wd.imageFile) : null;
  console.log(
    `  Commons image: ${image ? `${image.fileName} [${image.licenseName}]` : "(none / not free)"}`,
  );

  // 5. Candidate watch links — classify, publish OFFICIAL, queue UNVERIFIED.
  const candidates: WatchCandidate[] = [];
  if (wd.studio && STUDIOS_WITH_OFFICIAL_CHANNELS.includes(wd.studio)) {
    candidates.push({
      platform: "YouTube",
      label: `${wd.studio} official channel`,
      url: null, // never fabricated — a human confirms the exact upload
      sourceType: "UNVERIFIED",
      rightsNote: `${wd.studio} may host this film free & legal on its official channel. Find and verify the exact video URL before publishing.`,
    });
  }
  const official = candidates.filter((c) => c.sourceType === "OFFICIAL" && c.url);
  const unverified = candidates.filter((c) => c.sourceType !== "OFFICIAL" || !c.url);

  const genres = normalizeGenres(wd.genres);
  const isDraft = !publish;

  // Slug from the English title; if a *different* film already owns it (e.g. a
  // hand-written seed entry), disambiguate with the year. Stable across re-runs
  // because the matching film is found by wikidataId, not slug.
  let slug = slugify(wd.title);
  const slugClash = await prisma.film.findUnique({ where: { slug } });
  if (slugClash && slugClash.wikidataId !== qid) slug = `${slug}-${wd.year}`;

  // 6. Idempotent upsert (by Wikidata Q-id), then rebuild child rows.
  const studio = wd.studio
    ? await prisma.studio.upsert({
        where: { slug: slugify(wd.studio) },
        update: {},
        create: { slug: slugify(wd.studio), name: wd.studio },
      })
    : null;

  const director = wd.director
    ? await prisma.person.upsert({
        where: { slug: slugify(wd.director) },
        update: {},
        create: { slug: slugify(wd.director), name: wd.director },
      })
    : null;

  const filmData = {
    slug,
    title: wd.title,
    originalTitle: wd.originalTitle ?? null,
    year: wd.year,
    country: wd.country ?? null,
    runtimeMinutes: wd.runtimeMinutes ?? null,
    shortSummary: generated?.summary ?? "Draft — original summary pending review.",
    historicalContext: generated?.context ?? null,
    interpretation: generated?.interpretation ?? null,
    wikipediaUrl: bg?.url ?? null,
    wikidataId: qid,
    imdbId: wd.imdbId ?? null,
    draft: isDraft,
    studioId: studio?.id ?? null,
    directorId: director?.id ?? null,
  };

  const film = await prisma.film.upsert({
    where: { wikidataId: qid },
    update: filmData,
    create: filmData,
  });

  // Rebuild relations so re-runs stay idempotent.
  await prisma.$transaction([
    prisma.filmGenre.deleteMany({ where: { filmId: film.id } }),
    prisma.castCredit.deleteMany({ where: { filmId: film.id } }),
    prisma.imageAsset.deleteMany({ where: { filmId: film.id } }),
    prisma.sourceReference.deleteMany({ where: { filmId: film.id } }),
    prisma.watchLink.deleteMany({ where: { filmId: film.id } }),
  ]);

  for (const g of genres) {
    const genre = await prisma.genre.upsert({
      where: { slug: slugify(g) },
      update: {},
      create: { slug: slugify(g), name: g },
    });
    await prisma.filmGenre.create({ data: { filmId: film.id, genreId: genre.id } });
  }

  for (const name of wd.cast) {
    const person = await prisma.person.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: { slug: slugify(name), name },
    });
    await prisma.castCredit.create({
      data: { filmId: film.id, personId: person.id, characterName: "" },
    });
  }

  if (image) {
    await prisma.imageAsset.create({
      data: {
        filmId: film.id,
        url: image.url,
        kind: "STILL",
        licenseName: image.licenseName,
        licenseUrl: image.licenseUrl ?? null,
        attribution: image.attribution,
        sourceUrl: image.descriptionUrl,
      },
    });
  }

  // SourceReference for every imported item (URL + attribution).
  await prisma.sourceReference.create({
    data: {
      filmId: film.id,
      sourceType: "Wikidata",
      title: `Wikidata ${qid}`,
      url: `https://www.wikidata.org/wiki/${qid}`,
      note: "Structured metadata source.",
    },
  });
  if (bg) {
    await prisma.sourceReference.create({
      data: {
        filmId: film.id,
        sourceType: "Wikipedia",
        title: bg.title,
        url: bg.url,
        note: "Background reading only; the summary on Kotfilm is original text.",
      },
    });
  }
  if (image) {
    await prisma.sourceReference.create({
      data: {
        filmId: film.id,
        sourceType: "Wikimedia Commons",
        title: image.fileName,
        url: image.descriptionUrl,
        licenseInfo: image.licenseName,
        note: `Image by ${image.attribution}.`,
      },
    });
  }

  // Publish OFFICIAL links; queue UNVERIFIED ones for manual review.
  for (const link of official) {
    await prisma.watchLink.create({
      data: {
        filmId: film.id,
        platform: link.platform,
        label: link.label,
        url: link.url,
        sourceType: "OFFICIAL",
        rightsNote: link.rightsNote,
      },
    });
  }
  let queuePath: string | null = null;
  if (unverified.length > 0) {
    const dir = path.join(process.cwd(), "scripts", "review-queue");
    fs.mkdirSync(dir, { recursive: true });
    queuePath = path.join(dir, `${slug}.json`);
    fs.writeFileSync(
      queuePath,
      JSON.stringify(
        { filmSlug: slug, wikidataId: qid, queuedAt: new Date().toISOString(), candidates: unverified },
        null,
        2,
      ),
    );
  }

  console.log(`\n✓ ${publish ? "Published" : "Ingested as DRAFT"}: ${wd.title} (/films/${slug})`);
  console.log(
    `  genres:${genres.length} cast:${wd.cast.length} image:${image ? 1 : 0} ` +
      `official-links:${official.length} queued-for-review:${unverified.length}`,
  );
  if (queuePath) console.log(`  review queue → ${path.relative(process.cwd(), queuePath)}`);
  if (isDraft) {
    console.log(
      `  NOTE: hidden from the public catalogue until reviewed. Re-run with --publish after authoring/verifying.`,
    );
  }
}

main()
  .catch((e) => {
    console.error("\nIngestion failed:", e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
