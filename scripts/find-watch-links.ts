// Finds a concrete "where to watch" URL for every film and writes lib/watchLinks.ts.
// Priority per film:
//   1. Reuse the exact video already discovered for its image (i.ytimg.com source).
//   2. Otherwise, for an official-channel film, search YouTube for the studio's
//      own upload (channel + title match).
//   3. For public-domain silents (Internet Archive watch), search archive.org.
//   4. Fall back to the best available upload, labelled UNVERIFIED.
// Trust is recorded honestly; an unofficial link is never marked OFFICIAL.
//
//   npx tsx scripts/find-watch-links.ts
//
import fs from "node:fs";
import path from "node:path";
import { films } from "../lib/films";
import { filmImages } from "../lib/imageData";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function fetchText(url: string): Promise<string> {
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(url, {
        headers: {
          "Accept-Language": "en;q=0.9,ru;q=0.8,uk;q=0.7",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        },
      });
      if (r.ok) return await r.text();
    } catch {
      /* retry */
    }
    await sleep(600 * (i + 1));
  }
  return "";
}
async function fetchJson<T>(url: string): Promise<T | null> {
  const t = await fetchText(url);
  try {
    return JSON.parse(t) as T;
  } catch {
    return null;
  }
}

function channelFragments(studio?: string | null): string[] | null {
  const s = (studio ?? "").toLowerCase();
  if (s.includes("mosfilm")) return ["mosfilm", "мосфильм"];
  if (s.includes("soyuzmultfilm")) return ["soyuzmultfilm", "союзмультфильм"];
  if (s.includes("lenfilm")) return ["lenfilm", "ленфильм"];
  if (s.includes("gorky")) return ["gorky", "горького"];
  return null;
}

type Vid = { id: string; title: string; owner: string };
function collect(node: any, out: Vid[]): void {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const n of node) collect(n, out);
    return;
  }
  const vr = node.videoRenderer;
  if (vr?.videoId) {
    out.push({
      id: vr.videoId,
      title: vr.title?.runs?.[0]?.text ?? "",
      owner: vr.ownerText?.runs?.[0]?.text ?? vr.longBylineText?.runs?.[0]?.text ?? "",
    });
  }
  for (const k of Object.keys(node)) collect(node[k], out);
}
async function ytSearch(q: string): Promise<Vid[]> {
  const html = await fetchText(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}&hl=en`,
  );
  const m = html.match(/ytInitialData\s*=\s*(\{.+?\});<\/script>/s);
  if (!m) return [];
  try {
    const out: Vid[] = [];
    collect(JSON.parse(m[1]), out);
    return out;
  } catch {
    return [];
  }
}

const STOP = new Set(["the", "and", "for", "with", "film", "story", "tale", "part"]);
function words(...t: (string | null | undefined)[]): string[] {
  return t
    .filter(Boolean)
    .flatMap((s) => (s as string).toLowerCase().split(/[^a-zа-яё0-9]+/i))
    .filter((w) => w.length >= 3 && !STOP.has(w));
}

async function archiveId(title: string, year: number): Promise<string | null> {
  const q = `${title} AND mediatype:movies`;
  const j = await fetchJson<{ response?: { docs?: { identifier: string }[] } }>(
    `https://archive.org/advancedsearch.php?q=${encodeURIComponent(q)}` +
      `&fl[]=identifier&rows=5&output=json`,
  );
  return j?.response?.docs?.[0]?.identifier ?? null;
}

type Out = {
  url: string;
  sourceType: string;
  label: string;
  platform: string;
  rightsNote: string;
};

// Hand-verified overrides for films the automatic pass mislabelled or missed.
const MANUAL: Record<string, Out> = {
  "hedgehog-in-the-fog": {
    url: "https://www.youtube.com/watch?v=HPTkvoQZYlg",
    platform: "YouTube",
    label: "Soyuzmultfilm official channel",
    sourceType: "OFFICIAL",
    rightsNote: "Free to watch on the studio's official channel.",
  },
  "that-same-munchausen": {
    url: "https://www.youtube.com/watch?v=OWB4k-YXJUM",
    platform: "YouTube",
    label: "Mosfilm official channel",
    sourceType: "OFFICIAL",
    rightsNote: "Free to watch on the studio's official channel.",
  },
  "storm-over-asia": {
    url: "https://www.youtube.com/watch?v=VjbHu-yubKY",
    platform: "YouTube",
    label: "Классика советского кино",
    sourceType: "UNVERIFIED",
    rightsNote:
      "Unofficial upload, provided as a convenience; not the rights holder's own channel.",
  },
};

// Hand-verified Internet Archive identifiers for the public-domain silents
// (the generic-title search picked wrong items, e.g. "Earth" -> unrelated video).
const ARCHIVE_IDS: Record<string, string> = {
  earth: "1930-earth",
  arsenal: "arsenal-eng-sub",
  strike: "strike-eisenstein-1925-english-intertitles-hd-quality",
  "october-ten-days-that-shook-the-world": "october1928",
  mother: "mother-1926",
  aelita: "aelita-queen-of-mars-1924_202506",
  "the-end-of-st-petersburg": "VsevolodPudovkinTheEndOfSt.Petersburg1927",
  "bed-and-sofa": "bed-and-sofa-tretya-meshchanskaya-1927",
};

const NOTE_OFFICIAL = "Free to watch on the studio's official channel.";
const NOTE_ARCHIVE = "Public-domain copy hosted on the Internet Archive.";
const NOTE_UNVERIFIED =
  "Unofficial upload, provided as a convenience; not the rights holder's own channel.";

function cleanChannel(attribution: string): string {
  return attribution.replace(/\s*\((official YouTube|unverified source|licensed[^)]*)\)\s*$/i, "");
}

async function main() {
  const result: Record<string, Out> = {};
  let i = 0;
  for (const f of films) {
    i += 1;
    const w0 = (f.watch ?? [])[0];
    const isArchive =
      w0?.platform === "Internet Archive" ||
      w0?.sourceType === "PUBLIC_REPOSITORY" ||
      w0?.sourceType === "ARCHIVE";
    const img = (filmImages as Record<string, { url: string; descriptionUrl: string; licenseName: string; attribution: string }>)[f.slug];
    const ytId = img && /i\.ytimg\.com\/vi\/([A-Za-z0-9_-]{11})\//.exec(img.url)?.[1];

    let out: Out | null = null;

    if (ARCHIVE_IDS[f.slug]) {
      // Curated public-domain copy on the Internet Archive.
      out = {
        url: `https://archive.org/details/${ARCHIVE_IDS[f.slug]}`,
        platform: "Internet Archive",
        label: "Internet Archive",
        sourceType: "PUBLIC_REPOSITORY",
        rightsNote: NOTE_ARCHIVE,
      };
    } else if (ytId) {
      // Reuse the verified video we already found for the image.
      const official = img.licenseName === "Official YouTube upload";
      out = {
        url: `https://www.youtube.com/watch?v=${ytId}`,
        platform: "YouTube",
        label: official ? (w0?.label ?? cleanChannel(img.attribution)) : cleanChannel(img.attribution),
        sourceType: official ? "OFFICIAL" : "UNVERIFIED",
        rightsNote: official ? NOTE_OFFICIAL : NOTE_UNVERIFIED,
      };
    } else if (isArchive) {
      const id = await archiveId(f.original ?? f.title, f.year);
      await sleep(400);
      if (id) {
        out = {
          url: `https://archive.org/details/${id}`,
          platform: "Internet Archive",
          label: "Internet Archive",
          sourceType: "PUBLIC_REPOSITORY",
          rightsNote: NOTE_ARCHIVE,
        };
      }
    } else {
      // Official-channel film whose image came from Commons: search for the upload.
      const frags = channelFragments(f.studio);
      const ws = words(f.title, f.original);
      let chosen: Vid | undefined;
      let firstAny: Vid | undefined;
      for (const q of [`${f.original ?? f.title} ${f.studio}`, `${f.title} ${f.studio}`]) {
        const vids = await ytSearch(q);
        await sleep(450);
        firstAny ??= vids.find((v) => ws.some((w) => v.title.toLowerCase().includes(w)));
        if (frags) {
          chosen = vids.find(
            (v) =>
              frags.some((fr) => v.owner.toLowerCase().includes(fr)) &&
              ws.some((w) => v.title.toLowerCase().includes(w)),
          );
        }
        if (chosen) break;
      }
      if (chosen) {
        out = {
          url: `https://www.youtube.com/watch?v=${chosen.id}`,
          platform: "YouTube",
          label: w0?.label ?? chosen.owner,
          sourceType: "OFFICIAL",
          rightsNote: NOTE_OFFICIAL,
        };
      } else if (firstAny) {
        out = {
          url: `https://www.youtube.com/watch?v=${firstAny.id}`,
          platform: "YouTube",
          label: firstAny.owner,
          sourceType: "UNVERIFIED",
          rightsNote: NOTE_UNVERIFIED,
        };
      }
    }

    if (out) {
      result[f.slug] = out;
      console.log(`${String(i).padStart(2)} ✓ ${f.slug.padEnd(36)} ${out.sourceType.padEnd(16)} ${out.platform}`);
    } else {
      console.log(`${String(i).padStart(2)} – ${f.slug} (no link found)`);
    }
  }

  for (const [slug, o] of Object.entries(MANUAL)) {
    result[slug] = o;
    console.log(`   ★ ${slug} (manual override) ${o.sourceType}`);
  }

  const header =
    `// AUTO-GENERATED by scripts/find-watch-links.ts — do not edit by hand.\n` +
    `// Concrete free/legal watch URLs per film, with honest trust levels.\n\n` +
    `export type WatchLink = {\n  url: string;\n  sourceType: string;\n` +
    `  label: string;\n  platform: string;\n  rightsNote: string;\n};\n\n` +
    `export const watchLinks: Record<string, WatchLink> = `;
  fs.writeFileSync(
    path.join(process.cwd(), "lib", "watchLinks.ts"),
    `${header}${JSON.stringify(result, null, 2)};\n`,
  );
  const n = Object.keys(result).length;
  console.log(`\nWrote lib/watchLinks.ts — ${n}/${films.length} films have a watch URL.`);
}

main().catch((e) => {
  console.error("find-watch-links failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});
