// Check that every YouTube video referenced in lib/*.ts still exists and can be
// embedded, using YouTube's public oEmbed endpoint (no API key needed):
//   200 → OK · 401 → private or embedding disabled · 404 → removed.
// Exits 1 if any are unavailable, so the scheduled GitHub Action fails and
// GitHub emails the repo owner.
//
//   node scripts/check-youtube-links.mjs
import fs from "node:fs";
import path from "node:path";

const libDir = path.join(process.cwd(), "lib");
const refs = new Map(); // videoId -> Set of "file: slug"

for (const file of fs.readdirSync(libDir).filter((f) => f.endsWith(".ts"))) {
  const lines = fs.readFileSync(path.join(libDir, file), "utf8").split("\n");
  let slug = "?";
  for (const line of lines) {
    const key = line.match(/^\s*"?([a-z0-9-]+)"?\s*:\s*[{[]/);
    if (key) slug = key[1];
    // Credit text quotes an image's original source; it isn't a link we serve.
    if (/^\s*"?attribution"?\s*:/.test(line)) continue;
    for (const m of line.matchAll(/(?:youtube\.com\/watch\?v=|i\.ytimg\.com\/vi\/)([\w-]{11})/g)) {
      if (!refs.has(m[1])) refs.set(m[1], new Set());
      refs.get(m[1]).add(`${file}: ${slug}`);
    }
  }
}

const bad = [];
const ids = [...refs.keys()];
for (let i = 0; i < ids.length; i += 8) {
  await Promise.all(
    ids.slice(i, i + 8).map(async (id) => {
      const url = `https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${id}`;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
          if (res.status === 200) return;
          if (res.status === 401 || res.status === 403 || res.status === 404) {
            const why = res.status === 404 ? "removed" : "private or not embeddable";
            bad.push(`${id} (${why}) used by ${[...refs.get(id)].join(", ")}`);
            return;
          }
        } catch {
          /* network blip: retry */
        }
        await new Promise((r) => setTimeout(r, 2000 * attempt));
      }
      console.warn(`could not check ${id} (network), skipping`);
    }),
  );
}

console.log(`Checked ${ids.length} YouTube videos.`);
if (bad.length) {
  console.log(`\n${bad.length} unavailable:\n- ${bad.sort().join("\n- ")}`);
  process.exit(1);
}
console.log("All available.");
