// Pure helpers (no server-only imports) so client components can use them too.

/** A YouTube search scoped to a film. YouTube auto-filters results to copies that
 *  play in the viewer's own region, so this reliably reaches a watchable upload. */
export function regionalYouTubeSearch(title: string, year: number): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${title} ${year} фильм`,
  )}`;
}

export function archiveSearch(title: string): string {
  return `https://archive.org/search?query=${encodeURIComponent(title)}`;
}
