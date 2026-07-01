// Generates the PWA icon set from public/kotfilm-icon.png.
//   npx tsx scripts/gen-pwa-icons.mts
//
// The source art is a circular emblem on a square with white corners. For app
// launcher/splash icons that white shows around the circle, so we mask the art
// to a clean circle and fill the corners with brand cream (the same colour as
// the manifest background), making the emblem read as a single clean disc.
import sharp from "sharp";
import path from "node:path";

const pub = path.join(process.cwd(), "public");
const src = path.join(pub, "kotfilm-icon.png");
const CREAM = "#efe4cd"; // --kot-cream, matches manifest background_color

const circleMask = (size: number) =>
  Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  );

// Circular emblem on a full-bleed cream field. `scale` < 1 leaves a small safe
// margin (used for maskable icons so aggressive launcher masks don't clip it).
async function circleOnCream(size: number, out: string, scale = 1) {
  const inner = Math.round(size * scale);
  const emblem = await sharp(src)
    .resize(inner, inner, { fit: "cover" })
    .composite([{ input: circleMask(inner), blend: "dest-in" }])
    .png()
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: CREAM } })
    .composite([{ input: emblem, gravity: "center" }])
    .png()
    .toFile(path.join(pub, out));
  console.log("wrote", out, `${size}x${size}${scale < 1 ? ` (safe ${scale})` : ""}`);
}

await circleOnCream(192, "icon-192.png");
await circleOnCream(512, "icon-512.png");
await circleOnCream(180, "apple-icon-180.png");
await circleOnCream(512, "icon-maskable-512.png", 0.96);
await circleOnCream(192, "icon-maskable-192.png", 0.96);
console.log("done");
