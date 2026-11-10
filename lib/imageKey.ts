// Stable short key for a remote image URL (FNV-1a, 32-bit, hex). Used to name the
// self-hosted copies in public/img/wm/ — shared by scripts/localize-images.ts
// (which writes the files) and lib/imageLoader.ts (which points at them).
export function imageKey(url: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < url.length; i++) {
    h ^= url.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

/** Widths generated for each self-hosted image. */
export const LOCAL_IMAGE_WIDTHS = [480, 960] as const;
