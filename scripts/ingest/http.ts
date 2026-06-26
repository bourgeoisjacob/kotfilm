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
  // Retry transient network/5xx failures with backoff; Wikimedia and flaky
  // connections occasionally drop requests over a long run.
  let lastErr: unknown;
  for (let attempt = 0; attempt < 4; attempt++) {
    await throttle();
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
      });
      if (res.status === 429 || res.status >= 500) {
        throw new Error(`GET ${url} → ${res.status} ${res.statusText}`);
      }
      if (!res.ok) {
        throw new Error(`GET ${url} → ${res.status} ${res.statusText}`);
      }
      return (await res.json()) as T;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

/** Strip HTML tags (Commons attribution fields arrive as HTML). */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
