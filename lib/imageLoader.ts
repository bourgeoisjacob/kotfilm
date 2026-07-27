// Custom next/image loader. Offloads image resizing to the source CDNs instead
// of Vercel's Image Optimization (which is metered), so we use ZERO Vercel
// transformations and stay on the free tier.
//   • Wikimedia: use the official Special:FilePath?width= endpoint, which renders
//     any requested width and redirects to the cached thumbnail. (Hand-built
//     /thumb/ URLs only work for already-generated sizes — Wikimedia 400s the
//     rest to prevent thumbnail-generation abuse.)
//   • YouTube thumbnails and local /static files are already small — serve as-is.
type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width }: LoaderArgs): string {
  // e.g. https://upload.wikimedia.org/wikipedia/commons/8/89/File_name.jpg
  const wm = src.match(
    /^https:\/\/upload\.wikimedia\.org\/wikipedia\/[^/]+\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)$/,
  );
  if (wm) {
    const file = wm[1];
    // SVGs render fine at any size already; leave them alone.
    if (!/\.svg$/i.test(file)) {
      const w = Math.min(width, 1024); // never larger than we display
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=${w}`;
    }
  }
  // YouTube thumbnails (already sized) and local static assets: serve directly.
  return src;
}
