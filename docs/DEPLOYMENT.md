# Deploying Kotfilm to production

> **Status: the SQLite→Postgres cutover is already applied in this repo.** The
> schema `provider` is `postgresql`, `lib/prisma.ts` uses the `pg` adapter,
> `prisma/migrations/` is Postgres, and case-insensitive search is on. Steps 2–5
> below are recorded for reference / new environments. The live work left is the
> **environment variables** and **Vercel deploy** (steps 7+). It stays on
> **Prisma 6.19.3** — no Prisma 7 upgrade needed.

> Every environment (including local dev) now uses Postgres — set `DATABASE_URL`
> to a Postgres connection string everywhere (`docs` use Supabase/Neon).

---

## 1. Pick a host

- **App:** Vercel (Next.js App Router, server actions, and the `/api/auth` route all work out of the box).
- **Database:** Neon or Supabase (managed Postgres, free tier, connection pooling).

Create the database and copy its connection string (use the **pooled** URL for the app,
and keep the **direct** URL for migrations if the provider distinguishes them).

> ⚠️ **Supabase + Vercel: use the IPv4 connection string, or the build fails.**
> Supabase's **direct** connection (`db.<ref>.supabase.co:5432`) is **IPv6-only**.
> Vercel's build/runtime is IPv4, so `prisma migrate deploy` can't reach it and the
> deploy fails ~1–2s into the migrate step with a connection error. Use the
> **Session pooler** string instead (IPv4, supports migrations):
> `postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres?sslmode=require`
> — Supabase dashboard → Settings → Database → Connection string → mode **Session**
> (port `5432`, **not** the Transaction pooler on `6543`, which breaks `migrate deploy`).
> A machine with IPv6 (e.g. local dev) can use the direct host fine; only the
> IPv4 host (the pooler) works from Vercel.

## 2. Switch the schema to Postgres

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"   // was: "sqlite"
  url      = env("DATABASE_URL")
}
```

Install the Postgres driver adapter (version-matched to the client):

```sh
npm install @prisma/adapter-pg@6.19.3 pg
npm install -D @types/pg
```

## 3. Point the client at the pg adapter

```ts
// lib/prisma.ts — replace the better-sqlite3 adapter
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

export function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

`engineType = "client"` (already set in the schema) keeps the architecture-independent
WASM query compiler — `pg` is pure JS, so this also works on Apple/Windows ARM.
You can then drop `better-sqlite3` and `@prisma/adapter-better-sqlite3` from
dependencies, and remove the `prisma/dev.db` lines from `.gitignore`.

## 4. Regenerate migrations against Postgres

The existing `prisma/migrations/` SQL is SQLite-specific and will not apply to Postgres.

```sh
rm -rf prisma/migrations
DATABASE_URL="postgresql://…" npx prisma migrate dev --name init   # dev DB
# In CI/production:
DATABASE_URL="postgresql://…" npx prisma migrate deploy
```

`prisma migrate dev` auto-runs the seed (`prisma/seed.ts`) — the 22 films, Q-ids, and
all relations load unchanged.

## 5. Case-insensitive search

On Postgres, add `mode: "insensitive"` to the three search clauses in
`lib/queries.ts → buildWhere` for full Unicode case-folding (incl. Cyrillic):

```ts
{ title: { contains: q, mode: "insensitive" } },
{ originalTitle: { contains: q, mode: "insensitive" } },
{ director: { name: { contains: q, mode: "insensitive" } } },
```

(`mode` is only valid on the Postgres-generated client, which is why it's omitted
in the SQLite default. Note: Prisma's `contains` is **case-sensitive** on SQLite,
so case-insensitive search genuinely arrives with this Postgres switch.)

## 6. Build-time database access

The library index pages (`/genres`, `/directors`, `/actors`) are statically
prerendered and **query the database at build time**. Either:

- ensure `DATABASE_URL` is set and reachable during `npm run build` (simplest on
  Vercel — set the env var), **or**
- add `export const dynamic = "force-dynamic";` to those three `page.tsx` files to
  render them per-request instead.

## 7. Environment variables (production)

Set these on the host (see `.env.example`):

| Var | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `AUTH_SECRET` | Auth.js signing secret (`openssl rand -base64 32`) |
| `AUTH_URL` | Canonical site URL (OAuth callbacks behind a proxy) |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | Optional — enables "Continue with GitHub" |
| `ANTHROPIC_API_KEY` | Optional — original-text generation in the ingestion pipeline |

## 8. Auth hardening for multiple instances

Login/register rate limiting (`lib/rateLimit.ts`) is **in-memory** — it does not
share state across serverless instances or survive restarts. For production, back it
with a shared store (e.g. Upstash Redis) keyed the same way (`signin:<ip>` /
`register:<ip>`). Email verification and password reset are not implemented; add them
once an SMTP provider is configured (Auth.js Email/Nodemailer provider).

## 9. Deploy

```sh
npm run build        # prisma generate && next build
npm run start        # or let Vercel run it
```

Run `prisma migrate deploy` as a release/build step so schema changes apply before
the new build serves traffic.
