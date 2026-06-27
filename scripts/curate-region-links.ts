// Precise region curation. For every film whose watch link is a YouTube upload,
// check (via the YouTube Data API) whether that video is available in the US. If
// it is geo-blocked, search for an alternate official/embeddable upload that IS
// US-available (e.g. Mosfilm's English "Golden Collection" channel) and record it
// as the international link. Writes lib/regionWatchLinks.ts.
//
//   1. Put YOUTUBE_API_KEY=... in .env
//   2. npx tsx scripts/curate-region-links.ts
//
import fs from "node:fs";
import path from "node:path";
import { films } from "../lib/films";
import { watchLinks } from "../lib/watchLinks";

try {
  process.loadEnvFile();
} catch {
  /* .env optional */
}
const KEY = process.env.YOUTUBE_API_KEY;
if (!KEY) {
  console.error("Missing YOUTUBE_API_KEY in .env — see scripts/curate-region-links.ts header.");
  process.exit(1);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function api<T = any>(endpoint: string, params: Record<string, string>): Promise<T | null> {
  const qs = new URLSearchParams({ ...params, key: KEY! }).toString();
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(`https://www.googleapis.com/youtube/v3/${endpoint}?${qs}`);
      if (r.ok) return (await r.json()) as T;
      if (r.status === 403) {
        console.error("API error 403 (quota/key?):", await r.text());
        return null;
      }
    } catch {
      /* retry */
    }
    await sleep(500 * (i + 1));
  }
  return null;
}

const ytId = (url: string | null): string | null => {
  if (!url) return null;
  const m =
    url.match(/[?&]v=([A-Za-z0-9_-]{11})/) ?? url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
};

// US-availability from a contentDetails.regionRestriction object.
function usAvailable(rr?: { allowed?: string[]; blocked?: string[] }): boolean {
  if (!rr) return true;
  if (rr.blocked?.includes("US")) return false;
  if (rr.allowed) return rr.allowed.includes("US");
  return true;
}

const isoMinutes = (iso?: string): number => {
  if (!iso) return 0;
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (Number(m[1] ?? 0)) * 60 + Number(m[2] ?? 0) + Number(m[3] ?? 0) / 60;
};

const OFFICIAL_RE =
  /mosfilm|мосфильм|soyuzmultfilm|союзмультфильм|lenfilm|ленфильм|gorky|горького|dovzhenko|довженко|пятый канал|channel five|odesa|одеськ/i;

type VideoInfo = {
  id: string;
  title: string;
  channel: string;
  minutes: number;
  embeddable: boolean;
  usOk: boolean;
};
async function videoInfo(ids: string[]): Promise<VideoInfo[]> {
  if (ids.length === 0) return [];
  const data = await api<{ items?: any[] }>("videos", {
    part: "contentDetails,status,snippet",
    id: ids.join(","),
  });
  return (data?.items ?? []).map((v) => ({
    id: v.id,
    title: v.snippet?.title ?? "",
    channel: v.snippet?.channelTitle ?? "",
    minutes: isoMinutes(v.contentDetails?.duration),
    embeddable: v.status?.embeddable !== false,
    usOk: usAvailable(v.contentDetails?.regionRestriction),
  }));
}

type RegionLink = { url: string; sourceType: string; platform: string; label: string };

async function findUsAlternate(title: string, year: number): Promise<RegionLink | null> {
  const search = await api<{ items?: any[] }>("search", {
    part: "snippet",
    q: `${title} ${year}`,
    type: "video",
    maxResults: "20",
    regionCode: "US",
    videoEmbeddable: "true",
  });
  const ids = (search?.items ?? []).map((i) => i.id?.videoId).filter(Boolean);
  const infos = await videoInfo(ids);
  // Prefer official channels, US-available, embeddable, full-length.
  const full = infos.filter((v) => v.usOk && v.embeddable && v.minutes >= 50);
  const official = full.find((v) => OFFICIAL_RE.test(v.channel));
  const pick = official ?? full[0];
  if (!pick) return null;
  return {
    url: `https://www.youtube.com/watch?v=${pick.id}`,
    platform: "YouTube",
    sourceType: official ? "OFFICIAL" : "UNVERIFIED",
    label: official ? `${pick.channel}` : "Alternate upload (unverified)",
  };
}

async function main() {
  const out: Record<string, RegionLink> = {};
  let i = 0;
  for (const f of films) {
    i += 1;
    const wl = (watchLinks as Record<string, RegionLink>)[f.slug];
    const id = ytId(wl?.url ?? null);
    if (!id) {
      continue; // archive / no youtube link: plays everywhere
    }
    const [info] = await videoInfo([id]);
    await sleep(200);
    if (info?.usOk) {
      console.log(`${String(i).padStart(3)} ${f.slug.padEnd(36)} US ok`);
      continue;
    }
    const alt = await findUsAlternate(f.title, f.year);
    await sleep(300);
    if (alt) {
      out[f.slug] = alt;
      console.log(`${String(i).padStart(3)} ${f.slug.padEnd(36)} BLOCKED -> ${alt.sourceType} ${alt.label}`);
    } else {
      console.log(`${String(i).padStart(3)} ${f.slug.padEnd(36)} BLOCKED -> no US alternate found`);
    }
  }

  const header =
    `// AUTO-GENERATED by scripts/curate-region-links.ts — do not edit by hand.\n` +
    `// Verified US/international-available official uploads for films whose primary\n` +
    `// YouTube link is geo-blocked in the US, used for viewers outside Europe.\n\n` +
    `export type RegionLink = { url: string; sourceType: string; platform: string; label: string };\n\n` +
    `export const regionWatchLinks: Record<string, RegionLink> = `;
  fs.writeFileSync(
    path.join(process.cwd(), "lib", "regionWatchLinks.ts"),
    `${header}${JSON.stringify(out, null, 2)};\n`,
  );
  console.log(`\nWrote lib/regionWatchLinks.ts — ${Object.keys(out).length} films given a US alternate.`);
}

main().catch((e) => {
  console.error("curate-region-links failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});
