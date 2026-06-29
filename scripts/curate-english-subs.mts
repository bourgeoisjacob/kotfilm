// Finds official English-subtitled YouTube versions for films that may lack them,
// and rewrites lib/watchLinks.ts for HIGH-confidence swaps (Mosfilm English
// channel). MED-confidence matches are printed for manual approval; films with
// no English source are listed for labelling.
//
// Resumable: progress is saved to the OS temp dir, so re-running on a later day
// (after quota resets) skips already-processed films.
//
//   npx tsx scripts/curate-english-subs.mts
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { films } from "../lib/films";
import { watchLinks as currentLinks } from "../lib/watchLinks";

type Link = { url: string; sourceType: string; label: string; platform: string; rightsNote: string };
const wl = { ...(currentLinks as Record<string, Link>) };

const KEY = (fs.readFileSync(path.join(process.cwd(), ".env"), "utf8")
  .split(/\r?\n/).find((l) => l.startsWith("YOUTUBE_API_KEY=")) ?? "")
  .slice("YOUTUBE_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
if (!KEY) { console.error("no key"); process.exit(1); }

const PROGRESS = path.join(os.tmpdir(), "kotfilm-sub-curation.json");
type Decision = { slug: string; action: "swap" | "propose" | "label" | "good"; url?: string; label?: string; channel?: string; note?: string };
const progress: Record<string, Decision> = fs.existsSync(PROGRESS) ? JSON.parse(fs.readFileSync(PROGRESS, "utf8")) : {};
const save = () => fs.writeFileSync(PROGRESS, JSON.stringify(progress, null, 1));

const SEARCH_COST = 100, DAILY = 10000, BUDGET = 9500; // leave headroom
let units = 0;
let quotaHit = false;

async function api(endpoint: string, params: Record<string, string>): Promise<any> {
  const u = `https://www.googleapis.com/youtube/v3/${endpoint}?` +
    new URLSearchParams({ ...params, key: KEY }).toString();
  const r = await fetch(u);
  const j: any = await r.json();
  if (j.error) {
    if (JSON.stringify(j.error).includes("quota")) { quotaHit = true; throw new Error("QUOTA"); }
    throw new Error(j.error.message);
  }
  return j;
}
const vid = (url: string) => url.match(/[?&]v=([A-Za-z0-9_-]{11})/)?.[1] ?? url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/)?.[1];
const durSec = (iso: string) => { const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso || ""); return (+(m?.[1] || 0)) * 3600 + (+(m?.[2] || 0)) * 60 + (+(m?.[3] || 0)); };
const STOP = new Set(["the", "and", "of", "a", "in", "to", "part", "or", "no"]);
const words = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !STOP.has(w));
const titleMatch = (filmTitle: string, cand: string) => {
  const fw = words(filmTitle); const c = cand.toLowerCase();
  if (fw.length === 0) return true;
  const hit = fw.filter((w) => c.includes(w)).length;
  return hit >= Math.max(1, Math.ceil(fw.length / 2));
};

async function getVideos(ids: string[]): Promise<Map<string, any>> {
  const out = new Map<string, any>();
  for (let i = 0; i < ids.length; i += 50) {
    const j = await api("videos", { part: "snippet,contentDetails,status", id: ids.slice(i, i + 50).join(",") });
    units += 1;
    for (const it of j.items ?? []) out.set(it.id, it);
  }
  return out;
}

async function main() {
  // 1. Current videos -> titles/channels (cheap).
  const ytFilms = films.filter((f) => wl[f.slug] && /youtube|youtu\.be/.test(wl[f.slug].url) && vid(wl[f.slug].url));
  const curMeta = await getVideos(ytFilms.map((f) => vid(wl[f.slug].url)!));

  // 2. Find Mosfilm English channelId from an existing English upload.
  let MOSFILM_EN = "";
  for (const f of ytFilms) {
    const m = curMeta.get(vid(wl[f.slug].url)!);
    if (m?.snippet?.channelTitle === "Mosfilm") { MOSFILM_EN = m.snippet.channelId; break; }
  }
  console.log("Mosfilm English channelId:", MOSFILM_EN || "(not found)");

  // 3. Classify already-good (skip to save quota).
  const isGood = (slug: string) => {
    const m = curMeta.get(vid(wl[slug].url)!); if (!m) return false;
    const t = m.snippet?.title ?? ""; const ch = m.snippet?.channelTitle ?? "";
    return ch === "Mosfilm" || /\beng\b|english|subtitl/i.test(t);
  };

  const candidates = ytFilms.filter((f) => !isGood(f.slug) && !progress[f.slug]);
  let goodCount = ytFilms.filter((f) => isGood(f.slug)).length;
  for (const f of ytFilms) if (isGood(f.slug) && !progress[f.slug]) progress[f.slug] = { slug: f.slug, action: "good" };
  save();
  console.log(`YouTube films: ${ytFilms.length} | already good: ${goodCount} | to search now: ${candidates.length}`);

  let swaps = 0, proposes = 0, labels = 0;
  for (const f of candidates) {
    if (units + SEARCH_COST > BUDGET) { console.log(`\n[budget] stopping before ${f.slug} (used ~${units} units)`); break; }
    const isMosfilm = /mosfilm/i.test(f.studio ?? "");
    try {
      const params: Record<string, string> = { part: "snippet", type: "video", maxResults: "6", q: `${f.title} ${f.original ?? ""}`.trim() };
      if (isMosfilm && MOSFILM_EN) params.channelId = MOSFILM_EN;
      else params.q = `${f.title} ${f.year} english subtitles`;
      const sr = await api("search", params);
      units += SEARCH_COST;
      const ids = (sr.items ?? []).map((i: any) => i.id?.videoId).filter(Boolean);
      const metas = ids.length ? await getVideos(ids) : new Map();

      type C = { id: string; title: string; chId: string; chTitle: string; dur: number; embeddable: boolean; cap: boolean };
      const cands: C[] = [...metas.values()].map((m: any) => ({
        id: m.id, title: m.snippet?.title ?? "", chId: m.snippet?.channelId ?? "", chTitle: m.snippet?.channelTitle ?? "",
        dur: durSec(m.contentDetails?.duration), embeddable: m.status?.embeddable !== false, cap: m.contentDetails?.caption === "true",
      })).filter((c) => c.embeddable && titleMatch(f.title, c.title));

      const durOk = (c: C) => !f.runtime || (c.dur >= f.runtime * 60 * 0.5 && c.dur <= f.runtime * 60 * 1.6);
      // Mosfilm's English channel also posts Spanish/other dubs; require an English
      // cue and reject obvious non-English titles.
      const EN_CUE = /full movie|english|drama|comedy|war movie|melodrama|chekhov|detective|musical|horror|eastern|romantic|award|tragic|fantasy|adventure|fairy|thriller/i;
      const NON_EN = /pel[ií]cula|completa|subt[ií]tulos|sous-titr|legendad|untertitel|deutsch|フル|完整|일/i;
      const high = cands.find((c) => MOSFILM_EN && c.chId === MOSFILM_EN && durOk(c) && EN_CUE.test(c.title) && !NON_EN.test(c.title));
      const med = cands.find((c) => /english|subtitl|eng sub/i.test(c.title) && durOk(c));

      const curId = vid(wl[f.slug].url);
      if (high && high.id !== curId) {
        wl[f.slug] = { url: `https://www.youtube.com/watch?v=${high.id}`, platform: "YouTube", label: "Mosfilm (English subtitles)", sourceType: "OFFICIAL", rightsNote: "Free to watch on Mosfilm's official channel, with English subtitles." };
        progress[f.slug] = { slug: f.slug, action: "swap", url: wl[f.slug].url, label: high.title, channel: high.chTitle };
        swaps++; console.log(`SWAP  ${f.slug.padEnd(36)} -> ${high.title.slice(0, 50)}`);
      } else if (med && med.id !== curId) {
        progress[f.slug] = { slug: f.slug, action: "propose", url: `https://www.youtube.com/watch?v=${med.id}`, label: med.title, channel: med.chTitle, note: `dur ${Math.round(med.dur / 60)}m vs runtime ${f.runtime ?? "?"}m` };
        proposes++; console.log(`PROP  ${f.slug.padEnd(36)} ?  ${med.title.slice(0, 46)} [${med.chTitle.slice(0, 18)}]`);
      } else {
        progress[f.slug] = { slug: f.slug, action: "label", note: "no English-subtitled match found" };
        labels++; console.log(`LABEL ${f.slug.padEnd(36)} (no english match)`);
      }
      save();
    } catch (e) {
      save();
      if (quotaHit) { console.log(`\n[QUOTA EXHAUSTED] stopped at ${f.slug}. Re-run tomorrow to resume.`); break; }
      console.log(`ERR   ${f.slug}: ${e instanceof Error ? e.message : e}`);
    }
  }

  // Write watchLinks.ts with HIGH-confidence swaps applied.
  if (swaps > 0) {
    const header =
      `// AUTO-GENERATED by scripts/find-watch-links.ts — do not edit by hand.\n` +
      `// Concrete free/legal watch URLs per film, with honest trust levels.\n\n` +
      `export type WatchLink = {\n  url: string;\n  sourceType: string;\n  label: string;\n  platform: string;\n  rightsNote: string;\n};\n\n` +
      `export const watchLinks: Record<string, WatchLink> = `;
    fs.writeFileSync(path.join(process.cwd(), "lib", "watchLinks.ts"), `${header}${JSON.stringify(wl, null, 2)};\n`);
    console.log(`\nWrote lib/watchLinks.ts with ${swaps} swap(s).`);
  }

  const remaining = ytFilms.filter((f) => !progress[f.slug]).length;
  console.log(`\n== DONE this run ==`);
  console.log(`swaps(applied)=${swaps}  proposals=${proposes}  no-english(label)=${labels}`);
  console.log(`units used ~${units}/${DAILY}.  films still unprocessed: ${remaining}`);
  console.log(`Progress: ${PROGRESS}`);
  // Print all proposals so far for review.
  const props = Object.values(progress).filter((d) => d.action === "propose");
  if (props.length) {
    console.log(`\n== MED-CONFIDENCE PROPOSALS (need your OK) [${props.length}] ==`);
    for (const p of props) console.log(`  ${p.slug.padEnd(34)} ${p.url}  | ${p.label?.slice(0, 50)} [${p.channel}] (${p.note})`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
