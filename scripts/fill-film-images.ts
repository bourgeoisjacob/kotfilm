// Best-effort second pass for film images. For films still missing a picture,
// look up the film's Wikimedia Commons category (Wikidata P373) and pick the
// first freely-licensed still or poster from it. Merges into lib/imageData.ts
// without disturbing existing entries. Many older Soviet films simply have no
// free image on Commons, so some will remain placeholders by design.
//
//   npx tsx scripts/fill-film-images.ts
//
import fs from "node:fs";
import path from "node:path";
import { createPrismaClient } from "../lib/prisma";
import { getJson } from "./ingest/http";
import { fetchCommonsImage, type CommonsImage } from "./ingest/commons";
import { filmImages as existingFilmImages, personImages } from "../lib/imageData";

try {
  process.loadEnvFile();
} catch {
  /* env optional */
}

type ImageRecord = {
  url: string;
  descriptionUrl: string;
  licenseName: string;
  licenseUrl?: string;
  attribution: string;
};
const toRecord = (img: CommonsImage): ImageRecord => ({
  url: img.url,
  descriptionUrl: img.descriptionUrl,
  licenseName: img.licenseName,
  licenseUrl: img.licenseUrl,
  attribution: img.attribution,
});

async function commonsCategory(qid: string): Promise<string | undefined> {
  const data = await getJson<{ entities: Record<string, any> }>(
    `https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`,
  );
  const cat = data.entities[qid]?.claims?.P373?.[0]?.mainsnak?.datavalue?.value;
  return typeof cat === "string" ? cat : undefined;
}

async function categoryFiles(category: string): Promise<string[]> {
  const url =
    `https://commons.wikimedia.org/w/api.php?action=query&format=json` +
    `&list=categorymembers&cmtype=file&cmlimit=50` +
    `&cmtitle=${encodeURIComponent(`Category:${category}`)}`;
  const data = await getJson<{
    query?: { categorymembers?: { title: string }[] };
  }>(url);
  return (data.query?.categorymembers ?? [])
    .map((m) => m.title.replace(/^File:/, ""))
    .filter((n) => /\.(jpe?g|png)$/i.test(n));
}

const STOPWORDS = new Set([
  "the", "and", "are", "for", "with", "film", "story", "tale", "love", "life",
  "days", "from", "part", "man", "war", "his", "her", "its", "you", "who",
  "queen", "town", "fellows", "fate", "wings", "mother", "earth", "strike",
]);

// Words (Latin and Cyrillic) from the titles, used to tell whether a Commons
// filename actually depicts THIS film.
function titleWords(...titles: (string | null | undefined)[]): string[] {
  return titles
    .filter(Boolean)
    .flatMap((t) => (t as string).toLowerCase().split(/[^a-zа-яё0-9]+/i))
    .filter((w) => w.length >= 4 && !STOPWORDS.has(w));
}

const STRONG = /poster|afisha|пла[кк]ат|афиша|still|screenshot|\bscene\b|szene|cadr|кадр|\bframe\b/;
const REJECT =
  /panoramio|cahiers|kinema|junpo|magazine|\bcover\b|premiere|festival|grave|monument|plaque|stamp|building|museum|street|house|exhibition|portrait|\bcrew\b|actor|actress|director|signature|poster_for_another/;

// High precision over recall: only accept a file whose name carries an explicit
// poster/still/frame signal. A bare title match is not enough, since it lets in
// commemorative coins, tickets, and present-day location photos that merely
// mention the film. Also reject anything dated well after the film's release.
function score(name: string, words: string[], year: number): number {
  const n = name.toLowerCase();
  if (!STRONG.test(n)) return -1;
  if (REJECT.test(n)) return -1;
  const years = (n.match(/\b(?:19|20)\d{2}\b/g) ?? []).map(Number);
  if (years.some((y) => y > year + 3)) return -1; // later-dated photo, not a still
  let s = 4;
  if (words.some((w) => n.includes(w))) s += 2;
  if (n.includes(String(year))) s += 1;
  return s;
}

const prisma = createPrismaClient();

async function main() {
  const films = await prisma.film.findMany({
    where: { wikidataId: { not: null } },
    select: { slug: true, wikidataId: true, year: true, title: true, originalTitle: true },
  });

  const filmImages: Record<string, ImageRecord> = { ...existingFilmImages };
  const todo = films.filter((f) => !filmImages[f.slug]);
  console.log(`Films missing an image: ${todo.length}`);

  let hits = 0;
  for (const f of todo) {
    try {
      const cat = f.wikidataId ? await commonsCategory(f.wikidataId) : undefined;
      if (!cat) {
        console.log(`  – ${f.slug} (no Commons category)`);
        continue;
      }
      const words = titleWords(f.title, f.originalTitle);
      const candidates = (await categoryFiles(cat))
        .map((name) => ({ name, s: score(name, words, f.year) }))
        .filter((c) => c.s >= 0)
        .sort((a, b) => b.s - a.s);
      let found: CommonsImage | null = null;
      for (const c of candidates.slice(0, 8)) {
        found = await fetchCommonsImage(c.name);
        if (found) break;
      }
      if (found) {
        filmImages[f.slug] = toRecord(found);
        hits += 1;
        console.log(`  ✓ ${f.slug} [${found.licenseName}] ${found.fileName}`);
      } else {
        console.log(`  – ${f.slug} (category had no free image)`);
      }
    } catch (e) {
      console.log(`  ! ${f.slug}: ${(e as Error).message}`);
    }
  }

  const out =
    `// AUTO-GENERATED by scripts/fetch-images.ts — do not edit by hand.\n` +
    `// Freely-licensed Wikimedia Commons images for films and people.\n\n` +
    `export type ImageRecord = {\n` +
    `  url: string;\n  descriptionUrl: string;\n  licenseName: string;\n` +
    `  licenseUrl?: string;\n  attribution: string;\n};\n\n` +
    `export const filmImages: Record<string, ImageRecord> = ${JSON.stringify(filmImages, null, 2)};\n\n` +
    `export const personImages: Record<string, ImageRecord> = ${JSON.stringify(personImages, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), "lib", "imageData.ts"), out);
  console.log(
    `\nAdded ${hits} film images. Total now ${Object.keys(filmImages).length} film, ${Object.keys(personImages).length} person.`,
  );
}

main()
  .catch((e) => {
    console.error("fill-film-images failed:", e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
