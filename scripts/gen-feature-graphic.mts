// Generates the Google Play feature graphic (1024x500) from the brand assets.
//   npx tsx scripts/gen-feature-graphic.mts
import sharp from "sharp";
import path from "node:path";

const pub = path.join(process.cwd(), "public");
const out = path.join(pub, "play", "feature-graphic.png");

const W = 1024;
const H = 500;
const RED = "#9e2b25";
const RED_DEEP = "#7c211c";
const CREAM = "#efe4cd";
const CREAM_HI = "#f6efe0";
const GOLD = "#bd9a55";

// Background + wordmark as an SVG. Fonts use widely-available bold sans-serif so
// rendering doesn't depend on Oswald being installed.
const FONT = "Arial, 'Helvetica Neue', Helvetica, sans-serif";
const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${RED}"/>
      <stop offset="1" stop-color="${RED_DEEP}"/>
    </linearGradient>
    <pattern id="grain" width="3" height="3" patternUnits="userSpaceOnUse">
      <rect width="3" height="3" fill="transparent"/>
      <circle cx="1" cy="1" r="0.5" fill="#000000" opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grain)"/>
  <!-- gold hairline accent -->
  <rect x="432" y="150" width="84" height="6" fill="${GOLD}"/>
  <text x="430" y="240" font-family="${FONT}" font-size="90" font-weight="800"
        letter-spacing="6" fill="${CREAM_HI}">KOTFILM</text>
  <text x="433" y="292" font-family="${FONT}" font-size="21" font-weight="700"
        letter-spacing="4" fill="${CREAM}">CATNIP FOR SOVIET FILM LOVERS</text>
  <text x="433" y="338" font-family="${FONT}" font-size="19" font-weight="400"
        letter-spacing="0.5" fill="${CREAM}" opacity="0.92">A curated guide to Soviet cinema · free &amp; legal</text>
</svg>`;

const ICON = 320;
const icon = await sharp(path.join(pub, "kotfilm-icon.png"))
  .resize(ICON, ICON)
  .composite([
    {
      // circular mask so the cat sits in a clean disc
      input: Buffer.from(
        `<svg width="${ICON}" height="${ICON}"><circle cx="${ICON / 2}" cy="${ICON / 2}" r="${ICON / 2}" fill="#fff"/></svg>`,
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([
    // cream ring behind the icon
    {
      input: Buffer.from(
        `<svg width="${ICON + 16}" height="${ICON + 16}"><circle cx="${(ICON + 16) / 2}" cy="${(ICON + 16) / 2}" r="${(ICON + 16) / 2}" fill="${CREAM}"/></svg>`,
      ),
      left: 62,
      top: Math.round((H - ICON - 16) / 2),
    },
    { input: icon, left: 70, top: Math.round((H - ICON) / 2) },
  ])
  .png()
  .toFile(out);

console.log("wrote", out, `${W}x${H}`);
