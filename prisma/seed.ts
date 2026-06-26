import { films } from "../lib/films";
import { createPrismaClient } from "../lib/prisma";
import { filmImages, personImages } from "../lib/imageData";

// This script runs via `tsx` (not the Prisma CLI), so load DATABASE_URL from
// .env ourselves before creating the client. No-op if the file is absent.
try {
  process.loadEnvFile();
} catch {
  // .env is optional here.
}

const prisma = createPrismaClient();

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Map subtitle language names to ISO-ish codes; fall back to a slug.
const SUBTITLE_CODES: Record<string, string> = {
  English: "en",
  Russian: "ru",
  Ukrainian: "uk",
  French: "fr",
  German: "de",
  Spanish: "es",
  Italian: "it",
  Georgian: "ka",
};
const subtitleCode = (name: string) => SUBTITLE_CODES[name] ?? slugify(name);

// Wikidata Q-ids for the seed films, so the ingestion pipeline can later
// enrich/replace them idempotently (it upserts Film by wikidataId).
const WIKIDATA_IDS: Record<string, string> = {
  "the-cranes-are-flying": "Q714524",
  solaris: "Q125772",
  "hedgehog-in-the-fog": "Q260138",
  "battleship-potemkin": "Q152350",
  "man-with-a-movie-camera": "Q829250",
  "ballad-of-a-soldier": "Q1305092",
  "war-and-peace": "Q845176",
  stalker: "Q200437",
  "ivans-childhood": "Q147878",
  "the-mirror": "Q838149",
  "come-and-see": "Q1130395",
  "the-ascent": "Q760053",
  "dersu-uzala": "Q948023",
  "the-irony-of-fate": "Q913426",
  "moscow-does-not-believe-in-tears": "Q53105",
  "office-romance": "Q2528155",
  "the-diamond-arm": "Q1999930",
  "operation-y-and-shuriks-other-adventures": "Q2513681",
  "kin-dza-dza": "Q1415194",
  "the-color-of-pomegranates": "Q2235380",
  "the-snow-queen": "Q2376391",
  "the-tale-of-tsar-saltan": "Q1169922",
};

async function reset() {
  await prisma.watchLink.deleteMany();
  await prisma.sourceReference.deleteMany();
  await prisma.castCredit.deleteMany();
  await prisma.filmGenre.deleteMany();
  await prisma.filmSubtitle.deleteMany();
  await prisma.imageAsset.deleteMany();
  await prisma.watchlistItem.deleteMany();
  await prisma.film.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.studio.deleteMany();
  await prisma.subtitleLanguage.deleteMany();
  await prisma.person.deleteMany();
}

async function main() {
  await reset();

  for (const f of films) {
    const studio = f.studio
      ? await prisma.studio.upsert({
          where: { slug: slugify(f.studio) },
          update: {},
          create: { slug: slugify(f.studio), name: f.studio },
        })
      : null;

    const director = await prisma.person.upsert({
      where: { slug: slugify(f.director) },
      update: {},
      create: { slug: slugify(f.director), name: f.director },
    });

    const film = await prisma.film.create({
      data: {
        slug: f.slug,
        title: f.title,
        originalTitle: f.original,
        year: f.year,
        country: f.country,
        runtimeMinutes: f.runtime,
        shortSummary: f.summary,
        historicalContext: f.context,
        impact: f.impact ?? null,
        themes: JSON.stringify(f.themes),
        starterClassic: f.starterClassic ?? false,
        wikipediaUrl: f.wikipediaUrl,
        wikidataId: f.wikidataId ?? WIKIDATA_IDS[f.slug] ?? null,
        studioId: studio?.id ?? null,
        directorId: director.id,
      },
    });

    for (const g of f.genres) {
      const genre = await prisma.genre.upsert({
        where: { slug: slugify(g) },
        update: {},
        create: { slug: slugify(g), name: g },
      });
      await prisma.filmGenre.create({
        data: { filmId: film.id, genreId: genre.id },
      });
    }

    for (const name of f.cast) {
      const person = await prisma.person.upsert({
        where: { slug: slugify(name) },
        update: {},
        create: { slug: slugify(name), name },
      });
      await prisma.castCredit.create({
        data: { filmId: film.id, personId: person.id, characterName: "" },
      });
    }

    for (const w of f.watch) {
      await prisma.watchLink.create({
        data: {
          filmId: film.id,
          platform: w.platform,
          url: w.url ?? null,
          label: w.label,
          sourceType: w.sourceType,
          rightsNote: w.rightsNote,
        },
      });
    }

    for (const s of f.subs) {
      const code = subtitleCode(s);
      const language = await prisma.subtitleLanguage.upsert({
        where: { code },
        update: {},
        create: { code, name: s },
      });
      await prisma.filmSubtitle.create({
        data: { filmId: film.id, languageId: language.id },
      });
    }

    await prisma.sourceReference.create({
      data: {
        filmId: film.id,
        sourceType: "Wikipedia",
        url: f.wikipediaUrl,
        note: "Original summary written for Kotfilm; verify facts on import.",
      },
    });

  }

  // Freely-licensed images from Wikimedia Commons (see scripts/fetch-images.ts).
  let filmImageCount = 0;
  for (const [slug, img] of Object.entries(filmImages)) {
    const film = await prisma.film.findUnique({ where: { slug }, select: { id: true } });
    if (!film) continue;
    await prisma.imageAsset.create({
      data: {
        filmId: film.id,
        url: img.url,
        kind: "STILL",
        licenseName: img.licenseName,
        licenseUrl: img.licenseUrl ?? null,
        attribution: img.attribution,
        sourceUrl: img.descriptionUrl,
      },
    });
    filmImageCount += 1;
  }

  let personImageCount = 0;
  for (const [slug, img] of Object.entries(personImages)) {
    const person = await prisma.person.findUnique({ where: { slug }, select: { id: true } });
    if (!person) continue;
    await prisma.imageAsset.create({
      data: {
        personId: person.id,
        url: img.url,
        kind: "PHOTO",
        licenseName: img.licenseName,
        licenseUrl: img.licenseUrl ?? null,
        attribution: img.attribution,
        sourceUrl: img.descriptionUrl,
      },
    });
    personImageCount += 1;
  }

  console.log(
    `Seeded ${films.length} films, ${filmImageCount} film images, ${personImageCount} person images.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
