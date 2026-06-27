// Portrait fetcher (safe). Auto pass uses only subject-accurate sources, the
// person's Wikidata P18 and their Wikipedia lead image, so it never returns a
// grave, plaque, or unrelated photo (the noise a Commons-category scan produced).
// A small hand-verified MANUAL_PHOTOS map covers notable people whose real photo
// is not the designated image. Stamps are an accepted fallback; envelopes /
// covers / graves / monuments are always rejected. Merges into lib/imageData.ts.
//
//   npx tsx scripts/fetch-person-images.ts
//
import fs from "node:fs";
import path from "node:path";
import { films } from "../lib/films";
import { filmImages, personImages as existing } from "../lib/imageData";
import { getJson } from "./ingest/http";
import { fetchCommonsImage, type CommonsImage } from "./ingest/commons";

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

// Hand-verified real-photo Commons files (exact names) for people whose P18 /
// lead image is a stamp/envelope but a genuine photo exists in their category.
const MANUAL_PHOTOS: Record<string, string> = {
  "andrei-tarkovsky": "Andrej Tarkovskij mug shot at Latina Refugee Camp 1985 (cropped).jpg",
  "georgi-vasilyev": "Братья Васильевы и Алексей Толстой, 1938 год.jpg",
  "liya-akhedzhakova": "AhedzhakovaRozel.jpg",
  "fyodor-khitruk": "13134 6402f3fee6a73 (3).png",
};

// Existing images that are envelopes/postal covers with no good replacement:
// drop them (a clean initials avatar beats a postal cover).
const DROP = new Set(["aleksandr-ptushko", "maksim-shtraukh", "elza-radzina"]);

const REJECT =
  /envelope|cover|конверт|открытк|postcard|coin|монет|banknote|банкнот|signature|автограф|подпис|plaque|доск|таблиц|grave|tomb|cemeter|могил|надгроб|monument|памятник|bust|статуя|sculpture|vagankovo|novodevich/i;
const STAMP = /stamp|\bмарк|\bCPA\b|filatel|почтов/i;
const FILM_ROLE =
  /actor|actress|director|film|cinema|screenwriter|animator|cinematograph|producer|singer|composer|ballerina|dancer|artist/i;

type Rec = {
  url: string;
  descriptionUrl: string;
  licenseName: string;
  licenseUrl?: string;
  attribution: string;
};
const toRec = (img: CommonsImage): Rec => ({
  url: img.url,
  descriptionUrl: img.descriptionUrl,
  licenseName: img.licenseName,
  licenseUrl: img.licenseUrl,
  attribution: img.attribution,
});

async function resolveEntity(name: string): Promise<any | null> {
  const data = await getJson<{ search?: { id: string; description?: string }[] }>(
    `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json` +
      `&type=item&language=en&limit=6&search=${encodeURIComponent(name)}`,
  );
  const cands = data.search ?? [];
  const ordered = [
    ...cands.filter((c) => FILM_ROLE.test(c.description ?? "")),
    ...cands.filter((c) => !FILM_ROLE.test(c.description ?? "")),
  ];
  for (const c of ordered) {
    const ent = await getJson<{ entities: Record<string, any> }>(
      `https://www.wikidata.org/wiki/Special:EntityData/${c.id}.json`,
    );
    const e = ent.entities?.[c.id];
    const p31 = (e?.claims?.P31 ?? []).map((s: any) => s.mainsnak?.datavalue?.value?.id);
    if (p31.includes("Q5")) return e;
  }
  return null;
}

async function pageImage(lang: string, title: string): Promise<string | undefined> {
  const data = await getJson<{ query?: { pages?: Record<string, { pageimage?: string }> } }>(
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json` +
      `&prop=pageimages&piprop=name&titles=${encodeURIComponent(title)}`,
  );
  const pages = data.query?.pages;
  return (pages ? Object.values(pages)[0] : undefined)?.pageimage;
}

type Found = { img: CommonsImage; kind: "photo" | "stamp" };

// Subject-accurate only: the entity's own P18 and Wikipedia lead images.
async function bestPortrait(name: string): Promise<Found | null> {
  const e = await resolveEntity(name);
  if (!e) return null;
  const candidates: string[] = [];
  const en = e.sitelinks?.enwiki?.title;
  const ru = e.sitelinks?.ruwiki?.title;
  if (en) {
    const f = await pageImage("en", en);
    if (f) candidates.push(f);
  }
  if (ru) {
    const f = await pageImage("ru", ru);
    if (f) candidates.push(f);
  }
  const p18 = e.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
  if (typeof p18 === "string") candidates.push(p18);

  const seen = new Set<string>();
  const uniq = candidates.filter((f) => !seen.has(f) && seen.add(f));
  const ok = (f: string) => !REJECT.test(decodeURIComponent(f));
  const photos = uniq.filter((f) => ok(f) && !STAMP.test(decodeURIComponent(f)));
  const stamps = uniq.filter((f) => ok(f) && STAMP.test(decodeURIComponent(f)));
  for (const f of photos) {
    const img = await fetchCommonsImage(f);
    if (img) return { img, kind: "photo" };
  }
  for (const f of stamps) {
    const img = await fetchCommonsImage(f);
    if (img) return { img, kind: "stamp" };
  }
  return null;
}

async function main() {
  const names = new Map<string, string>();
  for (const f of films) {
    names.set(slugify(f.director), f.director);
    for (const c of f.cast ?? []) names.set(slugify(c), c);
  }

  const personImages: Record<string, Rec> = { ...existing };

  // 1. Hand-verified real photos (override).
  for (const [slug, file] of Object.entries(MANUAL_PHOTOS)) {
    const img = await fetchCommonsImage(file);
    if (img) {
      personImages[slug] = toRec(img);
      console.log(`  ★ ${slug.padEnd(24)} ${file.slice(0, 40)}`);
    } else {
      console.log(`  ! manual file failed: ${slug} (${file})`);
    }
  }
  // 2. Drop envelope/cover images with no good replacement.
  for (const s of DROP) delete personImages[s];

  // 3. Auto-fill the rest from subject-accurate sources only.
  const todo = [...names.keys()].filter((s) => !personImages[s]);
  console.log(`Auto targets: ${todo.length}`);
  let photos = 0,
    stamps = 0;
  for (const s of todo) {
    try {
      const r = await bestPortrait(names.get(s)!);
      if (r) {
        personImages[s] = toRec(r.img);
        if (r.kind === "photo") photos++;
        else stamps++;
        console.log(`  ${r.kind === "photo" ? "✓" : "▣"} ${s.padEnd(24)} ${r.img.fileName.slice(0, 42)}`);
      }
    } catch (e) {
      console.log(`  ! ${s}: ${(e as Error).message}`);
    }
  }

  const out =
    `// AUTO-GENERATED by scripts/fetch-images.ts — do not edit by hand.\n` +
    `// Freely-licensed Wikimedia Commons images for films and people, plus\n` +
    `// official-studio YouTube thumbnails as a last resort (see youtube-thumbs.ts).\n\n` +
    `export type ImageRecord = {\n` +
    `  url: string;\n  descriptionUrl: string;\n  licenseName: string;\n` +
    `  licenseUrl?: string;\n  attribution: string;\n};\n\n` +
    `export const filmImages: Record<string, ImageRecord> = ${JSON.stringify(filmImages, null, 2)};\n\n` +
    `export const personImages: Record<string, ImageRecord> = ${JSON.stringify(personImages, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), "lib", "imageData.ts"), out);
  console.log(
    `\nManual: ${Object.keys(MANUAL_PHOTOS).length}, auto photos: ${photos}, auto stamps: ${stamps}. ` +
      `Total now ${Object.keys(personImages).length} person images.`,
  );
}

main().catch((e) => {
  console.error("fetch-person-images failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});
