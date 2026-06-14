import { getJson } from "./http";

// Background reading from the Wikipedia REST API. The extract is used ONLY to
// inform our own original writing (and is recorded as a SourceReference) — it
// is never published verbatim. See scripts/ingest/text.ts.

export type WikipediaBackground = {
  title: string;
  extract: string;
  url: string;
};

export async function fetchWikipediaBackground(
  enwikiTitle: string,
): Promise<WikipediaBackground | null> {
  const url =
    `https://en.wikipedia.org/api/rest_v1/page/summary/` +
    encodeURIComponent(enwikiTitle.replace(/ /g, "_"));
  try {
    const data = await getJson<{
      title?: string;
      extract?: string;
      content_urls?: { desktop?: { page?: string } };
    }>(url);
    if (!data.extract) return null;
    return {
      title: data.title ?? enwikiTitle,
      extract: data.extract,
      url:
        data.content_urls?.desktop?.page ??
        `https://en.wikipedia.org/wiki/${encodeURIComponent(enwikiTitle.replace(/ /g, "_"))}`,
    };
  } catch {
    return null;
  }
}
