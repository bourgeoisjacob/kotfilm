// Decide how a film can play in the modal. We only embed the rights holder's own
// player (official studio uploads on YouTube, or public-domain items on the
// Internet Archive). Unverified / licensed third-party links are never embedded;
// they open on the source instead, so we never present an unofficial upload as if
// Kotfilm were serving it.

export type Embed =
  | { kind: "youtube"; embedUrl: string; openUrl: string }
  | { kind: "archive"; embedUrl: string; openUrl: string }
  | { kind: "none"; openUrl: string | null };

export function getEmbed(
  watchUrl: string | null,
  sourceType: string | null,
): Embed {
  if (!watchUrl) return { kind: "none", openUrl: null };
  const embeddable = sourceType === "OFFICIAL" || sourceType === "PUBLIC_REPOSITORY";

  const yt =
    watchUrl.match(/[?&]v=([A-Za-z0-9_-]{11})/) ??
    watchUrl.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (embeddable && yt) {
    return {
      kind: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`,
      openUrl: watchUrl,
    };
  }

  const arch = watchUrl.match(/archive\.org\/details\/([^/?#]+)/);
  if (embeddable && arch) {
    return {
      kind: "archive",
      embedUrl: `https://archive.org/embed/${arch[1]}`,
      openUrl: watchUrl,
    };
  }

  return { kind: "none", openUrl: watchUrl };
}
