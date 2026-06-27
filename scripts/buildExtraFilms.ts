// One-time generator: enriches scripts/newFilmsData.ts with verified Wikidata
// facts (Q-id, original title, runtime, country, Wikipedia URL) and writes a
// typed lib/filmsExtra.ts of SeedFilm objects. No video URLs are fabricated.
//
//   npx tsx scripts/buildExtraFilms.ts
//
import { writeFileSync } from "node:fs";
import { newFilms, type NewFilm, type NewSource } from "./newFilmsData";
import { newFilms2 } from "./newFilmsData2";

// `npx tsx scripts/buildExtraFilms.ts 2` builds the second tranche.
const TRANCHE2 = process.argv[2] === "2";
const DATASET: NewFilm[] = TRANCHE2 ? newFilms2 : newFilms;
const OUT_FILE = TRANCHE2 ? "filmsExtra2.ts" : "filmsExtra.ts";
const EXPORT_NAME = TRANCHE2 ? "extraFilms2" : "extraFilms";

const UA = {
  "User-Agent":
    "Kotfilm/1.0 (educational Soviet-cinema guide; contact bourgeoisjacob@gmail.com)",
};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Wikidata "instance of" (P31) values that count as a film for our purposes.
const FILM_TYPES = new Set([
  "Q11424", // film
  "Q24856", // film series
  "Q202866", // animated film
  "Q29168811", // animated feature film
  "Q24862", // short film
  "Q226730", // silent film
  "Q506240", // television film
  "Q93204", // documentary film (just in case)
  "Q18011172", // film project
  "Q229390", // 3D film
  "Q1054574", // feature film
  "Q20650540", // animated short film
  "Q17517379", // animated film (used widely for Soviet animation)
]);

// Films pinned by exact Wikidata Q-id (resolved via their English Wikipedia
// article): very ambiguous titles where text search is unreliable.
const QID_HINTS: Record<string, string> = {
  "tale-of-tales": "Q259685",
  hamlet: "Q2481391",
  "cheburashka-and-gena-the-crocodile": "Q1965370",
  "winnie-the-pooh": "Q404535",
  earth: "Q55188",
  arsenal: "Q704456",
  "the-scarlet-flower": "Q3209019",
  "the-bremen-town-musicians": "Q4096274",
  "trial-on-the-road": "Q3213961",
};

// Slugs whose Wikidata runtime is unusable (e.g. a series total) — drop it.
const RUNTIME_CLEAR = new Set<string>(["nu-pogodi"]);

// Russian/original-language search hints for films whose English Wikidata label
// differs from our title (animation, silents, transliterations). The English-only
// search missed these; searching the original title finds them.
const SEARCH_HINTS: Record<string, string> = {
  "ivan-the-terrible-part-i": "Иван Грозный",
  "tale-of-tales": "Сказка сказок",
  hamlet: "Гамлет",
  wings: "Крылья",
  "cheburashka-and-gena-the-crocodile": "Крокодил Гена",
  "winnie-the-pooh": "Винни-Пух",
  earth: "Земля",
  arsenal: "Арсенал",
  strike: "Стачка",
  mother: "Мать",
  "that-same-munchausen": "Тот самый Мюнхгаузен",
  "the-needle": "Игла",
  assa: "Асса",
  "ruslan-and-lyudmila": "Руслан и Людмила",
  "nu-pogodi": "Ну, погоди!",
  "the-scarlet-flower": "Аленький цветочек",
  "the-bremen-town-musicians": "Бременские музыканты",
  // Tranche 2
  "clear-sky": "Чистое небо",
  agony: "Агония",
  "dont-grieve": "Не горюй",
  "fire-water-and-brass-pipes": "Огонь, вода и… медные трубы",
  "the-golden-antelope": "Золотая антилопа",
  "don-quixote": "Дон Кихот",
  "trial-on-the-road": "Проверка на дорогах",
  "the-star-of-captivating-happiness": "Звезда пленительного счастья",
};

type WdFacts = {
  wikidataId?: string;
  original?: string;
  runtime?: number;
  country?: string;
  wikipediaUrl?: string;
  matchedLabel?: string;
  matchedYear?: number;
};

const surname = (name: string) => name.trim().split(/\s+/).pop()!.toLowerCase();

async function getEntity(qid: string): Promise<any | null> {
  try {
    const r = await fetch(
      `https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`,
      { headers: UA },
    );
    if (!r.ok) return null;
    const j = await r.json();
    return j.entities?.[qid] ?? null;
  } catch {
    return null;
  }
}

async function search(title: string): Promise<string[]> {
  const url =
    `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json` +
    `&language=en&type=item&limit=10&search=${encodeURIComponent(title)}`;
  try {
    const r = await fetch(url, { headers: UA });
    const j = await r.json();
    return (j.search ?? []).map((s: any) => s.id);
  } catch {
    return [];
  }
}

function claimYear(e: any): number | undefined {
  const t = e.claims?.P577?.[0]?.mainsnak?.datavalue?.value?.time as
    | string
    | undefined;
  if (!t) return undefined;
  const m = t.match(/^\+(\d{4})/);
  return m ? Number(m[1]) : undefined;
}

function instanceOf(e: any): string[] {
  return (e.claims?.P31 ?? [])
    .map((s: any) => s.mainsnak?.datavalue?.value?.id)
    .filter(Boolean);
}

function directorIds(e: any): string[] {
  return (e.claims?.P57 ?? [])
    .map((s: any) => s.mainsnak?.datavalue?.value?.id)
    .filter(Boolean);
}

function runtimeOf(e: any): number | undefined {
  const amt = e.claims?.P2047?.[0]?.mainsnak?.datavalue?.value?.amount;
  return amt ? Math.round(Number(amt)) : undefined;
}

function originalTitleOf(e: any): string | undefined {
  // Prefer P1476 (title, monolingual, original language), else ru/uk label.
  const p1476 = e.claims?.P1476?.[0]?.mainsnak?.datavalue?.value?.text;
  if (p1476) return p1476;
  return e.labels?.ru?.value ?? e.labels?.uk?.value ?? undefined;
}

async function countryOf(e: any): Promise<string | undefined> {
  const ids: string[] = (e.claims?.P495 ?? [])
    .map((s: any) => s.mainsnak?.datavalue?.value?.id)
    .filter(Boolean);
  if (ids.length === 0) return undefined;
  const names: string[] = [];
  for (const id of ids) {
    if (id === "Q15180") {
      names.push("USSR");
      continue;
    }
    const ent = await getEntity(id);
    names.push(ent?.labels?.en?.value ?? id);
    await sleep(80);
  }
  return names.join(" / ");
}

function wikipediaOf(e: any): string | undefined {
  const title = e.sitelinks?.enwiki?.title;
  return title
    ? `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`
    : undefined;
}

async function factsFromEntity(e: any, id: string): Promise<WdFacts> {
  return {
    wikidataId: id,
    original: originalTitleOf(e),
    runtime: runtimeOf(e),
    country: await countryOf(e),
    wikipediaUrl: wikipediaOf(e),
    matchedLabel: e.labels?.en?.value,
    matchedYear: claimYear(e),
  };
}

async function resolve(f: NewFilm): Promise<WdFacts> {
  const pinned = QID_HINTS[f.slug];
  if (pinned) {
    const e = await getEntity(pinned);
    await sleep(110);
    if (e) return factsFromEntity(e, pinned);
  }
  const hint = SEARCH_HINTS[f.slug];
  const ids = new Set<string>(await search(f.title));
  await sleep(120);
  if (hint) {
    for (const id of await search(hint)) ids.add(id);
    await sleep(120);
  }
  const want = surname(f.director);
  type Scored = { e: any; id: string; score: number };
  const scored: Scored[] = [];
  for (const id of ids) {
    const e = await getEntity(id);
    await sleep(110);
    if (!e) continue;
    const types = instanceOf(e);
    const isFilm = types.some((t) => FILM_TYPES.has(t));
    if (!isFilm) continue;
    const y = claimYear(e);
    // Disqualify a clearly different release: prevents e.g. Part I grabbing Part II.
    if (y !== undefined && Math.abs(y - f.year) > 3) continue;
    const dirs = directorIds(e);
    let dirMatch = false;
    if (dirs.length) {
      for (const d of dirs) {
        const de = await getEntity(d);
        await sleep(80);
        const dl = (de?.labels?.en?.value ?? "").toLowerCase();
        if (dl.includes(want)) {
          dirMatch = true;
          break;
        }
      }
    }
    let score = 0;
    if (y !== undefined && Math.abs(y - f.year) <= 1) score += 3;
    else if (y !== undefined && Math.abs(y - f.year) <= 3) score += 1;
    if (dirMatch) score += 3;
    const ruLabel = e.labels?.ru?.value;
    if (hint && ruLabel === hint) score += 2;
    const enLabel = (e.labels?.en?.value ?? "").toLowerCase();
    if (enLabel && f.title.toLowerCase().includes(enLabel)) score += 1;
    scored.push({ e, id, score });
  }
  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  if (!best || best.score < 3) {
    return {}; // no confident match — leave for manual review
  }
  return factsFromEntity(best.e, best.id);
}

const SUBS_DEFAULT: Record<NewSource, string[]> = {
  mosfilm: ["English", "Russian"],
  soyuzmultfilm: ["English", "Russian"],
  lenfilm: ["English", "Russian"],
  gorky: ["English", "Russian"],
  dovzhenko: ["English", "Russian"],
  georgiafilm: ["English", "Russian"],
  kazakhfilm: ["English", "Russian"],
  odessa: ["Russian"],
  archive: ["English"],
};

function watchFor(source: NewSource) {
  const confirm =
    "Released free & legal by the studio. Confirm the exact video link before production.";
  const pd =
    "In the public domain; a free copy is hosted on the Internet Archive. Confirm the exact link before production.";
  switch (source) {
    case "mosfilm":
      return [{ platform: "YouTube", label: "Mosfilm official channel", sourceType: "OFFICIAL", rightsNote: confirm }];
    case "soyuzmultfilm":
      return [{ platform: "YouTube", label: "Soyuzmultfilm official channel", sourceType: "OFFICIAL", rightsNote: confirm }];
    case "lenfilm":
      return [{ platform: "YouTube", label: "Lenfilm official channel", sourceType: "OFFICIAL", rightsNote: confirm }];
    case "gorky":
      return [{ platform: "YouTube", label: "Gorky Film Studio official channel", sourceType: "OFFICIAL", rightsNote: confirm }];
    case "dovzhenko":
      return [{ platform: "YouTube", label: "Oleksandr Dovzhenko Centre", sourceType: "OFFICIAL", rightsNote: confirm }];
    case "georgiafilm":
      return [{ platform: "YouTube", label: "Georgian Film studio upload", sourceType: "OFFICIAL", rightsNote: confirm }];
    case "kazakhfilm":
      return [{ platform: "YouTube", label: "Kazakhfilm official channel", sourceType: "OFFICIAL", rightsNote: confirm }];
    case "odessa":
      return [{ platform: "Internet Archive", label: "Internet Archive", sourceType: "ARCHIVE", rightsNote: "Confirm rights and the exact link before production." }];
    case "archive":
      return [{ platform: "Internet Archive", label: "Internet Archive (public domain)", sourceType: "PUBLIC_REPOSITORY", rightsNote: pd }];
  }
}

async function main() {
  const out: any[] = [];
  const report: string[] = [];
  let i = 0;
  for (const f of DATASET) {
    i += 1;
    const wd = await resolve(f);
    const entry: any = {
      slug: f.slug,
      title: f.title,
      original: wd.original ?? undefined,
      year: f.year,
      country: f.country ?? wd.country ?? "USSR",
      studio: f.studio,
      director: f.director,
      cast: f.cast,
      genres: f.genres,
      runtime: RUNTIME_CLEAR.has(f.slug) ? undefined : (wd.runtime ?? undefined),
      subs: f.subs ?? SUBS_DEFAULT[f.source],
      summary: f.summary,
      context: f.context,
      impact: f.impact ?? undefined,
      themes: f.themes,
      watch: watchFor(f.source),
      wikipediaUrl: wd.wikipediaUrl ?? undefined,
      starterClassic: f.starter ?? undefined,
      wikidataId: wd.wikidataId ?? undefined,
    };
    // Drop undefined keys so JSON output stays clean.
    Object.keys(entry).forEach((k) => entry[k] === undefined && delete entry[k]);
    out.push(entry);

    const flag =
      !wd.wikidataId
        ? "‼ NO MATCH"
        : wd.matchedYear !== undefined && Math.abs(wd.matchedYear - f.year) > 1
          ? `⚠ year ${wd.matchedYear}≠${f.year}`
          : !wd.runtime
            ? "⚠ no runtime"
            : "ok";
    report.push(
      `${String(i).padStart(2)} ${f.slug.padEnd(34)} ${(wd.wikidataId ?? "-").padEnd(11)} ` +
        `${(wd.matchedLabel ?? "").slice(0, 28).padEnd(28)} rt=${wd.runtime ?? "-"} ${flag}`,
    );
    console.log(report[report.length - 1]);
  }

  const header = `// AUTO-GENERATED by scripts/buildExtraFilms.ts — do not edit by hand.
// Catalogue expansion (${out.length} films). Editorial text is ORIGINAL
// (see scripts/newFilmsData*.ts); factual metadata enriched from Wikidata.
import type { SeedFilm } from "./films";

export const ${EXPORT_NAME}: SeedFilm[] = `;
  const body = JSON.stringify(out, null, 2);
  writeFileSync(
    new URL(`../lib/${OUT_FILE}`, import.meta.url),
    `${header}${body};\n`,
    "utf8",
  );

  console.log(`\nWrote lib/${OUT_FILE} with ${out.length} films.`);
  const noMatch = report.filter((r) => r.includes("NO MATCH")).length;
  console.log(`Unmatched (need manual Q-id/metadata): ${noMatch}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
