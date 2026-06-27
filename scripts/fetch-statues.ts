// Adds bust / statue / monument portraits (a sculpted likeness of the person)
// for people who still have no image. Statues are acceptable; bare gravestones,
// memorial plaques, envelopes, coins and stamps are not. To avoid attaching the
// wrong monument, a candidate must both look like a statue AND contain one of the
// person's name tokens (Latin or Cyrillic, from their Wikipedia titles).
//
//   npx tsx scripts/fetch-statues.ts
//
import fs from "node:fs";
import path from "node:path";
import { films } from "../lib/films";
import { filmImages, personImages as existing } from "../lib/imageData";
import { getJson } from "./ingest/http";
import { fetchCommonsImage, type CommonsImage } from "./ingest/commons";

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");

const STATUE = /bust|бюст|statue|стату|monument|памятник|пам.?ятник|sculptur|скульптур|пам.?ятник/i;
const NOT_LIKENESS = /envelope|конверт|\bcover\b|coin|монет|banknote|stamp|\bмарк|plaque|таблиц|доск|signature|автограф/i;
const FILM_ROLE =
  /actor|actress|director|film|cinema|screenwriter|animator|cinematograph|producer|singer|composer|dancer|artist/i;

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

async function categoryFiles(cat: string): Promise<string[]> {
  const data = await getJson<{ query?: { categorymembers?: { title: string }[] } }>(
    `https://commons.wikimedia.org/w/api.php?action=query&format=json` +
      `&list=categorymembers&cmtype=file&cmlimit=50&cmtitle=${encodeURIComponent("Category:" + cat)}`,
  );
  return (data.query?.categorymembers ?? [])
    .map((m) => m.title.replace(/^File:/, ""))
    .filter((n) => /\.(jpe?g|png)$/i.test(n));
}

// Name tokens (lowercased) from the English name plus the Russian/Ukrainian
// Wikipedia title surnames, so we can match Cyrillic statue filenames.
function tokensFor(name: string, e: any): string[] {
  const t = new Set<string>();
  for (const w of name.toLowerCase().split(/\s+/)) if (w.length >= 4) t.add(w);
  for (const lang of ["ruwiki", "ukwiki"]) {
    const title: string | undefined = e?.sitelinks?.[lang]?.title;
    if (title) {
      const surname = title.split(/[,\s]+/)[0]?.toLowerCase();
      if (surname && surname.length >= 4) t.add(surname);
    }
  }
  return [...t];
}

async function main() {
  const names = new Map<string, string>();
  for (const f of films) {
    names.set(slugify(f.director), f.director);
    for (const c of f.cast ?? []) names.set(slugify(c), c);
  }
  const personImages: Record<string, Rec> = { ...existing };
  const todo = [...names.keys()].filter((s) => !personImages[s]);
  console.log(`Image-less people to check for a statue: ${todo.length}`);

  let added = 0;
  for (const s of todo) {
    try {
      const e = await resolveEntity(names.get(s)!);
      if (!e) continue;
      const candidates: string[] = [];
      // P18 is the entity's own designated image: if it is a statue, trust it
      // (no name match needed, it cannot be the wrong person).
      const p18 = e.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
      if (typeof p18 === "string") {
        const d = decodeURIComponent(p18).toLowerCase();
        if (STATUE.test(d) && !NOT_LIKENESS.test(d)) candidates.push(p18);
      }
      // Category statues must also carry one of the person's name tokens.
      const cat =
        e.claims?.P373?.[0]?.mainsnak?.datavalue?.value ??
        e.sitelinks?.commonswiki?.title?.replace(/^Category:/, "");
      if (cat) {
        const tokens = tokensFor(names.get(s)!, e);
        for (const f of await categoryFiles(cat)) {
          const d = decodeURIComponent(f).toLowerCase();
          if (STATUE.test(d) && !NOT_LIKENESS.test(d) && tokens.some((t) => d.includes(t)))
            candidates.push(f);
        }
      }
      let picked: CommonsImage | null = null;
      for (const c of candidates) {
        picked = await fetchCommonsImage(c);
        if (picked) break;
      }
      if (picked) {
        personImages[s] = toRec(picked);
        added += 1;
        console.log(`  ✓ ${s.padEnd(24)} ${picked.fileName.slice(0, 46)}`);
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
  console.log(`\nAdded ${added} statue portraits. Total now ${Object.keys(personImages).length} person images.`);
}

main().catch((e) => {
  console.error("fetch-statues failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});
