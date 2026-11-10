// Custom next/image loader. Uses ZERO Vercel Image Optimization (metered):
//   • Wikimedia Commons images are self-hosted as pre-resized WebP files in
//     public/img/wm/ (see scripts/localize-images.ts). Hot-linking them made
//     browsers hit Commons' per-IP rate limit (HTTP 429 → broken images).
//   • Commons images not localized yet fall back to the official
//     Special:FilePath?width= endpoint, which renders and redirects to a thumbnail.
//   • YouTube thumbnails and local /static files are already small: serve as-is.
import { imageKey, LOCAL_IMAGE_WIDTHS } from "./imageKey";
import { localImageKeys } from "./localImages";

type LoaderArgs = { src: string; width: number; quality?: number };

const COMMONS =
  /^https:\/\/upload\.wikimedia\.org\/wikipedia\/[^/]+\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)$/;

export default function imageLoader({ src, width }: LoaderArgs): string {
  const wm = src.match(COMMONS);
  if (wm) {
    const key = imageKey(src);
    if (localImageKeys.has(key)) {
      const w =
        LOCAL_IMAGE_WIDTHS.find((lw) => lw >= width) ??
        LOCAL_IMAGE_WIDTHS[LOCAL_IMAGE_WIDTHS.length - 1];
      return `/img/wm/${key}-${w}.webp`;
    }
    const file = wm[1];
    // SVGs render fine at any size already; leave them alone.
    if (!/\.svg$/i.test(file)) {
      const w = Math.min(width, 1024); // never larger than we display
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=${w}`;
    }
  }
  return src;
}
