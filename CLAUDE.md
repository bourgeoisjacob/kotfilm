# CLAUDE.md — Kotfilm

Guidance for Claude Code. Read this first, then SPEC.md, then prisma/schema.prisma.

## What Kotfilm is
A curated, cat-branded guide to Soviet cinema — "Catnip for Soviet Film Lovers."
Users browse/search films by director, actor, genre, decade, and studio, then open a
film page with an original summary, historical context, interpretation, cast/crew,
and free & legal watch links. It is a curated archive, NOT a streaming site or social
app. It does not glorify Soviet politics — the focus is film history, artistry, and
where to watch legally.

## Non-negotiables (copyright & sourcing) — never break these
- Never host full films. Only link/embed from official or clearly-licensed sources.
- Never copy long summaries, biographies, reviews, or essays. Write short ORIGINAL text.
- Store a source URL + attribution for every film, person, image, and watch link.
- Track image license info; use only freely-licensed media.
- Label every watch link by trust level. Never present an unverified link as official.
- No implied affiliation with Mosfilm, Lenfilm, YouTube, Wikipedia, Wikimedia, etc.
- Preferred sources: Wikidata (metadata), Wikipedia (background for original text),
  Wikimedia Commons (licensed images), official studio channels (e.g. Mosfilm,
  Soyuzmultfilm on YouTube).
- Secrets only via env vars — never hard-code.

## Stack & conventions
- Next.js (App Router) + TypeScript + Tailwind CSS + Prisma.
- SQLite for the local MVP (DATABASE_URL=file:./dev.db); Postgres later in production.
- Zod for validation. NextAuth/Auth.js only in the later accounts phase.
- Server Components by default; client components only where interactivity needs them
  (search box, filters, watchlist).
- Keep components small. UI in /components, data access in /lib, routes in /app.

## Brand tokens (see app/globals.css + tailwind.config.ts)
red #9e2b25 · deep red #7c211c · cream #efe4cd · cream-hi #f6efe0 · tan #c9ab7e ·
gold #bd9a55 · ink #211d18 · charcoal #2c2722 · hairline #cdbb97.
Soviet-poster look: bold display type, slight paper grain, playful cat motif, and
film-reel / red-star / clapperboard motifs. Place the supplied PNG at
public/kotfilm-icon.png and use it for favicon, loading screen, and home brand mark.

## Data model
See prisma/schema.prisma. Core entities: Film, Person (director/actor via relations),
CastCredit, Genre, Studio, WatchLink, SubtitleLanguage, SourceReference, ImageAsset,
WatchlistItem, and User (later). Seed shape lives in lib/films.ts.

## Build plan — do ONE phase at a time, summarize after each, then run checks
- Phase 0  Confirm setup: `npm install`, `npm run db:push`, `npm run db:seed`,
           `npm run dev`. Confirm the icon is in place. Propose the architecture and
           flag risks/missing decisions BEFORE writing Phase 1.
- Phase 1  Brand + layout: header, SVG brand mark, fonts, globals, home shell.
- Phase 2  Data layer: finish the schema, port all ~22 films into lib/films.ts (from
           the Kotfilm prototype, same field names), wire the seed, add typed queries.
- Phase 3  Catalogue: grid + search + filters (decade/genre/director/studio/subtitle/
           official-source) + sort (title/year/director/starter classics).
- Phase 4  Film detail page: metadata, original summary/context/interpretation, themes,
           cast cards, related films, watch links (trust-badged), sources panel.
- Phase 5  Director / actor / genre library pages.
- Phase 6  Watchlist (localStorage first), Data Sources page.
- Phase 7  (Later) Accounts (Auth.js), favorites/ratings/history, and the
           Wikidata/Wikipedia/Commons ingestion pipeline.

Do not build everything at once. After each phase run `npm run lint`,
`npx tsc --noEmit`, and `npm run build`; keep the code clean and the app visually
polished from the start.

## Commands
npm run dev | build | start | lint
npm run db:push | db:seed | db:studio
