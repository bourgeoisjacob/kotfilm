# Kotfilm 🐈 🎞️

**Catnip for Soviet Film Lovers** — a curated guide to Soviet cinema, built only on
public, open, and freely-licensed sources.

## Quick start
1. Save the brand icon to `public/kotfilm-icon.png`.
2. `npm install`
3. `cp .env.example .env`
4. `npm run db:push` && `npm run db:seed`
5. `npm run dev` → http://localhost:3000

## Stack
Next.js (App Router) · TypeScript · Tailwind · Prisma · SQLite (local) / Postgres
(prod) · Zod. See `CLAUDE.md` for conventions and the phased build plan, and `SPEC.md`
for the full brief.

## Data sources
- **Wikidata** — structured metadata (titles, directors, cast, year, studio, runtime, IDs).
- **Wikipedia** — background for short, ORIGINAL summaries/biographies (never copied).
- **Wikimedia Commons** — freely-licensed images, with license stored.
- **Official studio channels** (Mosfilm, Soyuzmultfilm, etc.) for free & legal viewing.

## Copyright constraints
No full films hosted. No long text copied. Attribution stored per film, person, image,
and watch link. Watch links labelled *Official / free* vs *Needs verification*. No
implied affiliation with any studio, platform, or foundation.

## Future ingestion plan
Replace seed data with a pipeline: resolve Wikidata Q-ids → import metadata, Commons
images (license-checked), and candidate watch links; generate concise original
summaries; queue unverified links for manual review. Then add accounts (Auth.js) and
cloud watchlist sync.

## Status
Seeded MVP — ~22 Soviet classics with original descriptions and source placeholders.
