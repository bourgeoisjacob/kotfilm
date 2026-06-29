// Record-only, resumable search for English DUBBED (or any English-subtitled)
// versions of films that currently have no English option. Saves decisions to
// the OS temp dir; stops gracefully when the daily quota is exhausted, and skips
// already-processed films on re-run. Apply step is separate.
//
//   npx tsx scripts/curate-english-dubs.mts
import fs from "node:fs"; import os from "node:os"; import path from "node:path";
import { films } from "../lib/films"; import { watchLinks } from "../lib/watchLinks";

const KEY = (fs.readFileSync(".env", "utf8").split(/\r?\n/).find((l) => l.startsWith("YOUTUBE_API_KEY=")) ?? "").slice(16).trim();
const wl = watchLinks as Record<string, { url: string }>;
const vid = (u: string) => u.match(/[?&]v=([A-Za-z0-9_-]{11})/)?.[1] ?? u.match(/youtu\.be\/([A-Za-z0-9_-]{11})/)?.[1];

// The 39 no-English films (recomputed from current links so it stays accurate).
const ENG = /english|eng[\s._-]?sub|\beng\b|subtitl|hardsub|full movie|fullmovie|англ/i;
const PROGRESS = path.join(os.tmpdir(), "kotfilm-dub-pass.json");
const prog: Record<string, any> = fs.existsSync(PROGRESS) ? JSON.parse(fs.readFileSync(PROGRESS, "utf8")) : {};
const save = () => fs.writeFileSync(PROGRESS, JSON.stringify(prog, null, 1));

let quota = false;
async function api(endpoint: string, params: Record<string, string>) {
  const u = `https://www.googleapis.com/youtube/v3/${endpoint}?` + new URLSearchParams({ ...params, key: KEY });
  const j: any = await (await fetch(u)).json();
  if (j.error) { if (JSON.stringify(j.error).includes("quota")) { quota = true; throw new Error("QUOTA"); } throw new Error(j.error.message); }
  return j;
}
const durSec = (iso: string) => { const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso || ""); return (+(m?.[1] || 0)) * 3600 + (+(m?.[2] || 0)) * 60 + (+(m?.[3] || 0)); };
const STOP = new Set(["the", "and", "of", "a", "in", "to", "part", "or", "no"]);
const words = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !STOP.has(w));
const match = (ft: string, c: string) => { const fw = words(ft); if (!fw.length) return true; return fw.filter((w) => c.toLowerCase().includes(w)).length >= Math.max(1, Math.ceil(fw.length / 2)); };

async function main() {
  // Determine current no-English set.
  const ytF = films.filter((f) => wl[f.slug] && vid(wl[f.slug].url));
  const cur = new Map<string, any>();
  for (let i = 0; i < ytF.length; i += 50) {
    const j = await api("videos", { part: "snippet", id: ytF.slice(i, i + 50).map((f) => vid(wl[f.slug].url)!).join(",") });
    for (const it of j.items ?? []) cur.set(it.id, it);
  }
  const noEng = ytF.filter((f) => { const m = cur.get(vid(wl[f.slug].url)!); const t = (m?.snippet?.title ?? "") + " " + (m?.snippet?.description ?? ""); return !(ENG.test(t) || m?.snippet?.channelTitle === "Mosfilm"); });
  const todo = noEng.filter((f) => !prog[f.slug]);
  console.log(`no-English films: ${noEng.length} | already processed: ${noEng.length - todo.length} | to do: ${todo.length}\n`);

  let dub = 0, sub = 0, none = 0, done = 0;
  for (const f of todo) {
    try {
      const sr = await api("search", { part: "snippet", type: "video", maxResults: "8", videoEmbeddable: "true", q: `${f.title} ${f.year} english` });
      const ids = (sr.items ?? []).map((i: any) => i.id?.videoId).filter(Boolean);
      const vmeta = ids.length ? (await api("videos", { part: "snippet,contentDetails,status", id: ids.join(",") })).items ?? [] : [];
      const cands = vmeta.map((m: any) => ({ id: m.id, title: m.snippet?.title ?? "", ch: m.snippet?.channelTitle ?? "", dur: durSec(m.contentDetails?.duration), emb: m.status?.embeddable !== false }))
        .filter((c: any) => c.emb && match(f.title, c.title));
      const durOk = (c: any) => !f.runtime || (c.dur >= f.runtime * 60 * 0.5 && c.dur <= f.runtime * 60 * 1.6);
      const dubC = cands.find((c: any) => /dub|english version|englishdub/i.test(c.title) && durOk(c));
      const subC = cands.find((c: any) => /english sub|eng sub|subtitl|with english/i.test(c.title) && durOk(c));
      if (subC) { prog[f.slug] = { action: "sub", url: `https://www.youtube.com/watch?v=${subC.id}`, title: subC.title, ch: subC.ch }; sub++; console.log(`SUB  ${f.slug.padEnd(34)} ${subC.title.slice(0,46)} [${subC.ch.slice(0,16)}]`); }
      else if (dubC) { prog[f.slug] = { action: "dub", url: `https://www.youtube.com/watch?v=${dubC.id}`, title: dubC.title, ch: dubC.ch }; dub++; console.log(`DUB  ${f.slug.padEnd(34)} ${dubC.title.slice(0,46)} [${dubC.ch.slice(0,16)}]`); }
      else { prog[f.slug] = { action: "none" }; none++; console.log(`NONE ${f.slug.padEnd(34)} (no english dub/sub found)`); }
      done++; save();
    } catch (e) {
      save();
      if (quota) { console.log(`\n[QUOTA] stopped after ${done} this run. Re-run in the next quota window to resume.`); break; }
      console.log(`ERR ${f.slug}: ${e instanceof Error ? e.message : e}`);
    }
  }
  const remaining = noEng.filter((f) => !prog[f.slug]).length;
  console.log(`\n== this run: sub=${sub} dub=${dub} none=${none} | remaining=${remaining} ==`);
  console.log(`progress: ${PROGRESS}`);
  if (remaining === 0) {
    const subs = Object.entries(prog).filter(([, v]: any) => v.action === "sub");
    const dubs = Object.entries(prog).filter(([, v]: any) => v.action === "dub");
    const nones = Object.entries(prog).filter(([, v]: any) => v.action === "none");
    console.log(`\nALL DONE. subtitled=${subs.length} dubbed=${dubs.length} russian-only=${nones.length}`);
    console.log("SUBS:\n" + subs.map(([s, v]: any) => `  ${s} ${v.url} | ${v.title}`).join("\n"));
    console.log("DUBS:\n" + dubs.map(([s, v]: any) => `  ${s} ${v.url} | ${v.title}`).join("\n"));
    console.log("RUSSIAN-ONLY:\n  " + nones.map(([s]) => s).join("\n  "));
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
