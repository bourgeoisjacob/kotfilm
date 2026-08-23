// Captures Play Store phone screenshots of the live site at 1080x1920 (9:16).
//   node scripts/capture-screenshots.mjs
import { chromium } from "playwright";
import fs from "node:fs";

const OUT = "public/play/screenshots";
fs.mkdirSync(OUT, { recursive: true });
const BASE = "https://kotfilm-iota.vercel.app";

// 360x640 CSS @3x device scale => exact 1080x1920 (9:16) screenshots showing the
// mobile layout. Meets phone + 7"/10" tablet requirements (min side 1080).
const shots = [
  ["1-home", "/"],
  ["2-catalogue", "/films"],
  ["3-film", "/films/stalker"],
  ["4-learn", "/learn"],
  ["5-about", "/about"],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 640 }, deviceScaleFactor: 3 });
const page = await ctx.newPage();
for (const [name, path] of shots) {
  await page.goto(BASE + path, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2800); // let Wikimedia images + fonts settle
  await page.screenshot({ path: `${OUT}/${name}.png` }); // viewport only => 1080x1920
  console.log("captured", name);
}
await browser.close();
console.log("done ->", OUT);
