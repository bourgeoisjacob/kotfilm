import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Postgres via the pg driver adapter. `engineType = "client"` (see
// prisma/schema.prisma) runs the architecture-independent WASM query compiler,
// and `pg` is pure JS — so this works on any platform, including ARM. The
// connection string (DATABASE_URL) is read from the environment.

/** Create a fresh PrismaClient backed by the Postgres (pg) adapter. */
export function createPrismaClient(): PrismaClient {
  let connectionString = process.env.DATABASE_URL;
  let ssl: { rejectUnauthorized: boolean } | undefined;

  // Managed Postgres (Supabase/Neon) terminates TLS with a chain Node doesn't
  // verify by default, and recent `pg` treats `sslmode=require` as full
  // verification (rejecting it). Strip `sslmode` from the string and configure
  // SSL explicitly to honour the intended `require` meaning — encrypt without CA
  // verification. (To verify strictly, supply the provider's CA instead.)
  if (connectionString && /[?&]sslmode=/.test(connectionString)) {
    const url = new URL(connectionString);
    url.searchParams.delete("sslmode");
    connectionString = url.toString();
    ssl = { rejectUnauthorized: false };
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
