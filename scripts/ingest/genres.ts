// Normalizes Wikidata genre labels (e.g. "science fiction film", "historical
// film") to Kotfilm's curated vocabulary. Unmapped labels fall back to a
// tidied version of the original rather than being dropped, so nothing is lost.

const GENRE_MAP: Record<string, string> = {
  "drama film": "Drama",
  drama: "Drama",
  "comedy film": "Comedy",
  comedy: "Comedy",
  "war film": "War",
  "science fiction film": "Science fiction",
  "science fiction": "Science fiction",
  "animated film": "Animation",
  animation: "Animation",
  "silent film": "Silent cinema",
  "musical film": "Musical",
  musical: "Musical",
  "fantasy film": "Fantasy",
  fantasy: "Fantasy",
  "historical film": "Historical epic",
  "historical drama": "Historical epic",
  "epic film": "Historical epic",
  "biographical film": "Biographical",
  biography: "Biographical",
  "documentary film": "Documentary",
  documentary: "Documentary",
  "crime film": "Crime",
  "adventure film": "Adventure",
  "romance film": "Romance",
  "romantic drama": "Romance",
  "children's film": "Children's films",
  "fairy tale film": "Fairy tale",
  "fairy tale": "Fairy tale",
};

function tidy(label: string): string {
  const trimmed = label.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/** Map raw Wikidata genre labels to curated names, de-duplicated, order kept. */
export function normalizeGenres(rawLabels: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of rawLabels) {
    const name = GENRE_MAP[raw.trim().toLowerCase()] ?? tidy(raw);
    const key = name.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(name);
    }
  }
  return out;
}
