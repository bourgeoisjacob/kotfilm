// Generates the PWA icon set from public/kotfilm-icon.png.
//   npx tsx scripts/gen-pwa-icons.mts
import sharp from "sharp";
import path from "node:path";

const pub = path.join(process.cwd(), "public");
const src = path.join(pub, "kotfilm-icon.png");
const CREAM = "#efe4cd"; // --kot-cream, used as the maskable safe-zone background

async function square(size: number, out: string) {
  await sharp(src).resize(size, size, { fit: "cover" }).png().toFile(path.join(pub, out));
  console.log("wrote", out, `${size}x${size}`);
}

// Maskable: the icon must survive Android's circular/squircle mask, so the art
// sits inside an ~80% safe zone on a brand-cream field.
async function maskable(size: number, out: string) {
  const inner = Math.round(size * 0.8);
  const art = await sharp(src).resize(inner, inner, { fit: "contain", background: CREAM }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: CREAM } })
    .composite([{ input: art, gravity: "center" }])
    .png()
    .toFile(path.join(pub, out));
  console.log("wrote", out, `${size}x${size} (maskable)`);
}

await square(192, "icon-192.png");
await square(512, "icon-512.png");
await square(180, "apple-icon-180.png");
await maskable(512, "icon-maskable-512.png");
await maskable(192, "icon-maskable-192.png");
console.log("done");
