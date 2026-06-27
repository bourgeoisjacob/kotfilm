// Last-resort image fallback: for films that still have no freely-licensed
// Commons image, use the thumbnail of the film's OFFICIAL studio upload on
// YouTube (the same source we link to for watching). These are the studio's own
// frames, not CC media, so they are labelled honestly as official YouTube stills
// rather than claimed as freely licensed. Merges into lib/imageData.ts.
//
//   npx tsx scripts/youtube-thumbs.ts
//
import fs from "node:fs";
import path from "node:path";
import { createPrismaClient } from "../lib/prisma";
import { filmImages as existingFilmImages, personImages } from "../lib/imageData";

try {
  process.loadEnvFile();
} catch {
  /* env optional */
}

// Hand-picked official uploads for films the automatic channel match misses
// (different studios / rights-holder broadcasters), plus a corrected classic
// episode for Nu, Pogodi!. Verified by hand from the official channels.
const MANUAL: Record<
  string,
  { videoId: string; attribution: string; licenseName: string }
> = {
  "nu-pogodi": {
    videoId: "jlyzTjzseOk",
    attribution: "Мультики студии Союзмультфильм (official YouTube)",
    licenseName: "Official YouTube upload",
  },
  "brief-encounters": {
    videoId: "Qaj3RRFNP5c",
    attribution: "Odesa Film Studio (official YouTube)",
    licenseName: "Official YouTube upload",
  },
  "heart-of-a-dog": {
    videoId: "FeGuBXYLbug",
    attribution: "Channel Five / Lenfilm (official YouTube)",
    licenseName: "Official YouTube upload",
  },
  "shadows-of-forgotten-ancestors": {
    videoId: "1EpSSmcusUI",
    attribution: "Dovzhenko Centre (official YouTube)",
    licenseName: "Official YouTube upload",
  },
  // Licensed third-party uploads (not the studio's own channel), labelled as such.
  repentance: {
    videoId: "bIIb5wUzjdc",
    attribution: "RVISION (licensed distributor)",
    licenseName: "Licensed distributor upload",
  },
  "the-needle": {
    videoId: "UFEMle60E-4",
    attribution: "UNESCO Almaty (licensed)",
    licenseName: "Licensed upload",
  },
};

// Map a studio to its official channel name fragments (lowercase, Latin+Cyrillic).
function channelFragments(studio: string | null): string[] | null {
  const s = (studio ?? "").toLowerCase();
  if (s.includes("mosfilm")) return ["mosfilm", "мосфильм"];
  if (s.includes("soyuzmultfilm")) return ["soyuzmultfilm", "союзмультфильм"];
  if (s.includes("lenfilm")) return ["lenfilm", "ленфильм"];
  if (s.includes("gorky")) return ["gorky", "горького"];
  return null; // no reliable official channel
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function fetchText(url: string): Promise<string> {
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(url, {
        headers: {
          "Accept-Language": "en-US,en;q=0.9,ru;q=0.8",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        },
      });
      if (r.ok) return await r.text();
    } catch {
      /* retry */
    }
    await sleep(700 * (i + 1));
  }
  return "";
}

type Vid = { videoId: string; title: string; owner: string };

// Recursively collect videoRenderer-like nodes from ytInitialData.
function collectVideos(node: any, out: Vid[]): void {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const n of node) collectVideos(n, out);
    return;
  }
  const vr = node.videoRenderer;
  if (vr?.videoId) {
    const title = vr.title?.runs?.[0]?.text ?? "";
    const owner =
      vr.ownerText?.runs?.[0]?.text ??
      vr.longBylineText?.runs?.[0]?.text ??
      "";
    out.push({ videoId: vr.videoId, title, owner });
  }
  for (const k of Object.keys(node)) collectVideos(node[k], out);
}

async function searchVideos(query: string): Promise<Vid[]> {
  const html = await fetchText(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&hl=en`,
  );
  const m = html.match(/ytInitialData\s*=\s*(\{.+?\});<\/script>/s);
  if (!m) return [];
  try {
    const data = JSON.parse(m[1]);
    const out: Vid[] = [];
    collectVideos(data, out);
    return out;
  } catch {
    return [];
  }
}

const STOP = new Set([
  "the", "and", "for", "with", "film", "story", "tale", "part", "his", "her",
]);
function words(...titles: (string | null | undefined)[]): string[] {
  return titles
    .filter(Boolean)
    .flatMap((t) => (t as string).toLowerCase().split(/[^a-zа-яё0-9]+/i))
    .filter((w) => w.length >= 3 && !STOP.has(w));
}

type Rec = {
  url: string;
  descriptionUrl: string;
  licenseName: string;
  licenseUrl?: string;
  attribution: string;
};

const prisma = createPrismaClient();

async function main() {
  const rows = await prisma.film.findMany({
    select: {
      slug: true,
      title: true,
      originalTitle: true,
      year: true,
      studio: { select: { name: true } },
    },
  });
  const films = rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    originalTitle: r.originalTitle,
    year: r.year,
    studio: r.studio?.name ?? null,
  }));

  const filmImages: Record<string, Rec> = { ...existingFilmImages };

  // Apply hand-picked official uploads first (overrides any earlier auto-match).
  for (const [slug, m] of Object.entries(MANUAL)) {
    filmImages[slug] = {
      url: `https://i.ytimg.com/vi/${m.videoId}/hqdefault.jpg`,
      descriptionUrl: `https://www.youtube.com/watch?v=${m.videoId}`,
      licenseName: m.licenseName,
      attribution: m.attribution,
    };
    console.log(`  ★ ${slug} (manual) [${m.attribution}]`);
  }

  const todo = films.filter(
    (f) => !filmImages[f.slug] && channelFragments(f.studio),
  );
  console.log(`Films missing image with an official channel: ${todo.length}`);

  let hits = 0;
  for (const f of todo) {
    const frags = channelFragments(f.studio)!;
    const ws = words(f.title, f.originalTitle);
    const queries = [
      `${f.originalTitle ?? f.title} ${f.studio}`,
      `${f.title} ${f.studio}`,
    ];
    let chosen: Vid | undefined;
    for (const q of queries) {
      const vids = await searchVideos(q);
      await sleep(500);
      chosen = vids.find(
        (v) =>
          frags.some((fr) => v.owner.toLowerCase().includes(fr)) &&
          ws.some((w) => v.title.toLowerCase().includes(w)),
      );
      if (chosen) break;
    }
    if (!chosen) {
      console.log(`  – ${f.slug} (no official-channel match)`);
      continue;
    }
    filmImages[f.slug] = {
      url: `https://i.ytimg.com/vi/${chosen.videoId}/hqdefault.jpg`,
      descriptionUrl: `https://www.youtube.com/watch?v=${chosen.videoId}`,
      licenseName: "Official YouTube upload",
      attribution: `${chosen.owner} (official YouTube)`,
    };
    hits += 1;
    console.log(`  ✓ ${f.slug}  [${chosen.owner}]  "${chosen.title}"`);
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
    `\nAdded ${hits} YouTube thumbnails. Total now ${Object.keys(filmImages).length} film, ${Object.keys(personImages).length} person.`,
  );
}

main()
  .catch((e) => {
    console.error("youtube-thumbs failed:", e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
