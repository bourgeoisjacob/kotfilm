import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Postgres via the pg driver adapter. `engineType = "client"` (see
// prisma/schema.prisma) runs the architecture-independent WASM query compiler,
// and `pg` is pure JS — so this works on any platform, including ARM. The
// connection string (DATABASE_URL) is read from the environment.

// Transient connection failures (a free-tier database waking from idle, or a
// brief pooler blip) otherwise surface to visitors as a 500. We retry READ
// operations a couple of times on those specific errors so a hiccup becomes a
// short delay instead of an error page. Writes are never retried (no risk of a
// duplicated insert/update).
const READ_OPS = new Set([
  "findFirst",
  "findFirstOrThrow",
  "findMany",
  "findUnique",
  "findUniqueOrThrow",
  "count",
  "aggregate",
  "groupBy",
]);
const RETRYABLE_CODES = new Set(["P1001", "P1002", "P1008", "P1017"]);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function isTransientConnectionError(e: unknown): boolean {
  if (e instanceof Prisma.PrismaClientInitializationError) return true;
  if (e instanceof Prisma.PrismaClientKnownRequestError && RETRYABLE_CODES.has(e.code)) return true;
  const msg = e instanceof Error ? e.message : String(e);
  return /ECONNRESET|ETIMEDOUT|EPIPE|ENOTFOUND|Connection terminated|Connection closed|connection is closed|server closed the connection|Timed out fetching a new connection|Can't reach database/i.test(
    msg,
  );
}

/** Create a fresh PrismaClient (with read-retry) backed by the Postgres adapter. */
export function createPrismaClient() {
  let connectionString = process.env.DATABASE_URL;
  let ssl: { rejectUnauthorized: boolean; ca?: string } | undefined;

  // Managed Postgres (Supabase/Neon) terminates TLS with a chain Node doesn't
  // verify by default, and recent `pg` treats `sslmode=require` as full
  // verification (rejecting it). Strip `sslmode` from the string and configure
  // SSL explicitly.
  if (connectionString && /[?&]sslmode=/.test(connectionString)) {
    const url = new URL(connectionString);
    url.searchParams.delete("sslmode");
    connectionString = url.toString();

    // Preferred: verify the server certificate against the provider's CA.
    // Set DATABASE_CA_CERT to the PEM contents (Supabase: Settings → Database →
    // SSL configuration → download certificate). Falls back to encrypt-without-
    // verify only when no CA is supplied.
    const ca = process.env.DATABASE_CA_CERT?.trim();
    if (ca) {
      ssl = { rejectUnauthorized: true, ca };
    } else {
      if (process.env.NODE_ENV === "production") {
        console.warn(
          "[prisma] DATABASE_CA_CERT not set — DB connection is encrypted but " +
            "the server certificate is NOT verified (MITM risk). Set DATABASE_CA_CERT.",
        );
      }
      ssl = { rejectUnauthorized: false };
    }
  }

  const adapter = new PrismaPg({ connectionString, ...(ssl ? { ssl } : {}) });
  return new PrismaClient({ adapter }).$extends({
    name: "retry-transient-reads",
    query: {
      async $allOperations({ operation, args, query }) {
        if (!READ_OPS.has(operation)) return query(args);
        let lastErr: unknown;
        for (let attempt = 0; attempt <= 2; attempt++) {
          try {
            return await query(args);
          } catch (e) {
            lastErr = e;
            if (attempt === 2 || !isTransientConnectionError(e)) throw e;
            await sleep(200 * (attempt + 1)); // 200ms, then 400ms
          }
        }
        throw lastErr;
      },
    },
  });
}

// Reuse a single client across hot-reloads in development to avoid exhausting
// connections (Next.js recreates modules on each change).
const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
