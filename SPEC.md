# Kotfilm — Product Spec

## Concept
A playful, visually distinctive guide to Soviet cinema. "Kot" (кот) means cat; "film"
evokes studio names like Mosfilm/Lenfilm. Kotfilm is a fictional, cat-branded film
archive for discovering, understanding, and legally watching Soviet films.

## Positioning
"Catnip for Soviet film lovers" — a charming, curated, cat-branded guide built on
public, free, and properly attributed sources. Curated archive, not a streaming or
social app. Film history and artistry, never political glorification.

## Core user flows
1. Land on a Soviet-poster-style home page.
2. Search films, directors, actors, genres, or themes.
3. Browse by genre, director, actor, decade, studio, subtitle availability, or source.
4. Open a film page (full metadata, original summary, context, interpretation, cast,
   watch links, attribution).
5. Open director/actor pages and browse their films.
6. Browse genre libraries.
7. Save films to a watchlist (localStorage in the MVP).

## MVP features
- Home: logo/icon, tagline, search, featured films, browse-by-genre/director/actor,
  "Start with classics", "Available with subtitles".
- Catalogue: searchable grid; filters (decade, genre, director, actor, studio,
  subtitle language, available to watch); sort (title, year, director, starter
  classics, recently added).
- Film detail: title, original title, year, director, cast, genre, studio, runtime,
  short original summary, historical context, interpretation, key themes, cast/crew
  cards, watch links, subtitle availability, source references, related films.
- Director pages: name, photo (if freely licensed), short bio, major films, recurring
  style, linked films, sources.
- Actor pages: name, photo (if licensed), short bio, notable roles, linked films,
  sources.
- Genre libraries: Comedy, War, Science fiction, Animation, Drama, Silent cinema,
  Musical, Fairy tale, Historical epic, Children's films, Literary adaptations.
- Watchlist: local-first, cloud sync later.
- Source & attribution layer on every detail page + a general "Data sources" page.

## Data model (see prisma/schema.prisma)
Film, Person, CastCredit, Genre, Studio, WatchLink, SubtitleLanguage,
SourceReference, ImageAsset, WatchlistItem, User (optional/later).

WatchLink fields: platform, url, label, sourceType (official / archive /
public repository / unverified), subtitleLanguages, isEmbeddable, lastCheckedAt,
rightsNote.

## Sources
Wikidata (metadata) · Wikipedia (background for short original text) · Wikimedia
Commons (licensed images, license stored) · official studio channels (free & legal).

## Legal rules
No hosting of full films. Prefer linking/embedding official sources. No scraping in
violation of terms. No copying long text — generate concise original summaries.
Store source URLs + attribution everywhere. Track image licenses. Show attribution on
film/director/actor pages. No implied affiliation. Label uncertain sources
"source needs verification" and never promote them as official.

## Acceptance criteria
- Polished home page using the supplied icon + tagline.
- Browse, search, and filter films.
- Film detail with summary, context, interpretation, director, actors, genre, links.
- Director, actor, and genre library pages.
- Local watchlist.
- Source references on every page with seeded/imported facts.
- Official/free links clearly distinguished from unverified ones.
- README explains setup, sources, copyright constraints, and the ingestion plan.
