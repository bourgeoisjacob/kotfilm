// Fixed-window rate limiter for auth endpoints.
//
// Uses a shared Redis store (Upstash / Vercel KV) over its REST API when
// configured, so the limit holds across all serverless instances. Set either:
//   UPSTASH_REDIS_REST_URL  + UPSTASH_REDIS_REST_TOKEN   (Upstash), or
//   KV_REST_API_URL         + KV_REST_API_TOKEN          (Vercel KV).
// With neither set (e.g. local dev), it falls back to a best-effort in-memory
// limiter that is per-instance only.

export type RateLimitResult = { ok: boolean; retryAfterSec: number };

// ── In-memory fallback ───────────────────────────────────────────────────────
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function memoryLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSec: 0 };
}

// ── Shared Redis (REST) ──────────────────────────────────────────────────────
function redisEnv(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function redisCmd(
  env: { url: string; token: string },
  args: (string | number)[],
): Promise<unknown> {
  const res = await fetch(env.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`redis REST ${res.status}`);
  const json = (await res.json()) as { result?: unknown; error?: string };
  if (json.error) throw new Error(json.error);
  return json.result;
}

async function redisLimit(
  env: { url: string; token: string },
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const k = `rl:${key}`;
  const count = Number(await redisCmd(env, ["INCR", k]));
  if (count === 1) {
    // First hit in this window — set the expiry that defines the window.
    await redisCmd(env, ["PEXPIRE", k, windowMs]);
  }
  if (count > limit) {
    const pttl = Number(await redisCmd(env, ["PTTL", k]));
    const ms = pttl > 0 ? pttl : windowMs;
    return { ok: false, retryAfterSec: Math.ceil(ms / 1000) };
  }
  return { ok: true, retryAfterSec: 0 };
}

export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const env = redisEnv();
  if (env) {
    try {
      return await redisLimit(env, key, limit, windowMs);
    } catch {
      // Redis unreachable — fail open to the in-memory limiter rather than
      // locking out legitimate users.
    }
  }
  return memoryLimit(key, limit, windowMs);
}

/** Best-effort client IP from proxy headers; falls back to a shared bucket. */
export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  const first = fwd?.split(",")[0]?.trim();
  return first || headers.get("x-real-ip") || "unknown";
}
