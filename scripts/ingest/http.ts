// Shared HTTP client for the ingestion pipeline.
//
// Respects API etiquette: a descriptive User-Agent (Wikimedia requires one that
// identifies the tool) and a minimum interval between requests so we stay well
// within rate limits. We only call documented public APIs — no scraping.

const USER_AGENT =
  "KotfilmIngest/0.1 (https://github.com/kotfilm/kotfilm; non-commercial Soviet-film guide)";

const MIN_INTERVAL_MS = 350;
let lastRequestAt = 0;

async function throttle() {
  const wait = lastRequestAt + MIN_INTERVAL_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequestAt = Date.now();
}

export async function getJson<T = unknown>(url: string): Promise<T> {
  await throttle();
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`GET ${url} → ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

/** Strip HTML tags (Commons attribution fields arrive as HTML). */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
