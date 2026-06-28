// Verifies the shared (Upstash/Vercel KV) rate limiter actually works:
//   1. confirms the REST credentials connect (PING),
//   2. exercises the real rateLimit() against the shared store and checks it
//      throttles at the limit.
// Needs the REST env vars locally — pull them from Vercel first:
//   vercel env pull .env.local
// Then:  npx tsx scripts/test-ratelimit.mts
import fs from "node:fs";
import path from "node:path";

// Load env from .env.local (vercel env pull) then .env, without overwriting.
function loadEnv(file: string) {
  const p = path.join(process.cwd(), file);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnv(".env.local");
loadEnv(".env");

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
if (!url || !token) {
  console.error("No Upstash/KV REST env vars found locally.");
  console.error("Pull them from Vercel:  vercel env pull .env.local");
  process.exit(1);
}
console.log("REST endpoint:", new URL(url).host);

async function cmd(args: (string | number)[]): Promise<unknown> {
  const r = await fetch(url!, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`REST ${r.status}`);
  const j = (await r.json()) as { result?: unknown; error?: string };
  if (j.error) throw new Error(j.error);
  return j.result;
}

// 1) Connectivity.
console.log("PING ->", await cmd(["PING"]));

// 2) Real limiter against the shared store (import after env is loaded).
const { rateLimit } = await import("../lib/rateLimit");
const key = `selftest:${Date.now()}`;
const seq: boolean[] = [];
for (let i = 0; i < 5; i++) seq.push((await rateLimit(key, 3, 60_000)).ok);
await cmd(["DEL", `rl:${key}`]); // cleanup
console.log("rateLimit ok-sequence (limit 3 of 5):", seq);

const pass = JSON.stringify(seq) === JSON.stringify([true, true, true, false, false]);
console.log(
  pass
    ? "\n=> ✅ Shared rate limiting works against Upstash. Production throttling is now cross-instance."
    : "\n=> ⚠️ Unexpected sequence — connected, but check limit logic/config.",
);
