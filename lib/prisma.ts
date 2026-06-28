import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Postgres via the pg driver adapter. `engineType = "client"` (see
// prisma/schema.prisma) runs the architecture-independent WASM query compiler,
// and `pg` is pure JS — so this works on any platform, including ARM. The
// connection string (DATABASE_URL) is read from the environment.

/** Create a fresh PrismaClient backed by the Postgres (pg) adapter. */
export function createPrismaClient(): PrismaClient {
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
  return new PrismaClient({ adapter });
}

// Reuse a single client across hot-reloads in development to avoid exhausting
// connections (Next.js recreates modules on each change).
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
