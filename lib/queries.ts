import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Shared shapes
// ---------------------------------------------------------------------------

// Enough relations to render a film card in grids and lists.
export const filmCardInclude = {
  director: { select: { name: true, slug: true } },
  studio: { select: { name: true, slug: true } },
  genres: { include: { genre: { select: { name: true, slug: true } } } },
  subtitleLanguages: {
    include: { language: { select: { code: true, name: true } } },
  },
  watchLinks: { select: { sourceType: true, url: true } },
  imageAssets: { select: { url: true }, take: 1 },
} satisfies Prisma.FilmInclude;

export type FilmCard = Prisma.FilmGetPayload<{ include: typeof filmCardInclude }>;

// Everything the film detail page needs.
const filmDetailInclude = {
  director: {
    select: { name: true, slug: true, bio: true, imageAssets: { select: { url: true }, take: 1 } },
  },
  studio: { select: { name: true, slug: true } },
  genres: { include: { genre: { select: { name: true, slug: true } } } },
  cast: {
    orderBy: { billingOrder: "asc" },
    include: {
      person: {
        select: { name: true, slug: true, imageAssets: { select: { url: true }, take: 1 } },
      },
    },
  },
  watchLinks: true,
  subtitleLanguages: { include: { language: true } },
  sourceReferences: true,
  imageAssets: true,
} satisfies Prisma.FilmInclude;

export type FilmDetail = Prisma.FilmGetPayload<{
  include: typeof filmDetailInclude;
}>;

// ---------------------------------------------------------------------------
// Filters & sorting for the catalogue
// ---------------------------------------------------------------------------

export type FilmSort = "title" | "year" | "director" | "classics" | "recent";

export type FilmFilters = {
  /** Free-text search across title, original title, and director name. */
  q?: string;
  /** Decade start year, e.g. 1970 matches 1970–1979. */
  decade?: number;
  genre?: string; // genre slug
  director?: string; // person slug
  actor?: string; // person slug
  studio?: string; // studio slug
  subtitle?: string; // subtitle language code
  /** Only films with at least one watch link that has a URL. */
  availableToWatch?: boolean;
  /** Only films with an OFFICIAL watch link. */
  officialOnly?: boolean;
};

function buildWhere(filters: FilmFilters): Prisma.FilmWhereInput {
  // Drafts (freshly ingested, unreviewed) never appear in the public catalogue.
  const where: Prisma.FilmWhereInput = { draft: false };
  const and: Prisma.FilmWhereInput[] = [];

  if (filters.q?.trim()) {
    const q = filters.q.trim();
    // Postgres case-insensitive (and Unicode-folded) search.
    and.push({
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { originalTitle: { contains: q, mode: "insensitive" } },
        { director: { name: { contains: q, mode: "insensitive" } } },
      ],
    });
  }

  if (typeof filters.decade === "number") {
    where.year = { gte: filters.decade, lt: filters.decade + 10 };
  }
  if (filters.genre) {
    where.genres = { some: { genre: { slug: filters.genre } } };
  }
  if (filters.director) {
    where.director = { slug: filters.director };
  }
  if (filters.actor) {
    where.cast = { some: { person: { slug: filters.actor } } };
  }
  if (filters.studio) {
    where.studio = { slug: filters.studio };
  }
  if (filters.subtitle) {
    where.subtitleLanguages = {
      some: { language: { code: filters.subtitle } },
    };
  }
  if (filters.availableToWatch) {
    // "Has a place to watch listed." Seeded links are official but may carry a
    // placeholder URL pending verification, so match on the link's existence.
    where.watchLinks = { some: {} };
  }
  if (filters.officialOnly) {
    where.watchLinks = { some: { sourceType: "OFFICIAL" } };
  }

  if (and.length) where.AND = and;
  return where;
}

function buildOrderBy(
  sort: FilmSort,
): Prisma.FilmOrderByWithRelationInput | Prisma.FilmOrderByWithRelationInput[] {
  switch (sort) {
    case "year":
      return [{ year: "asc" }, { title: "asc" }];
    case "director":
      return [{ director: { name: "asc" } }, { year: "asc" }];
    case "classics":
      return [{ starterClassic: "desc" }, { year: "asc" }];
    case "recent":
      return [{ createdAt: "desc" }, { title: "asc" }];
    case "title":
    default:
      return [{ title: "asc" }];
  }
}

/** List films for the catalogue, applying optional filters and sort. */
export function listFilms(
  filters: FilmFilters = {},
  sort: FilmSort = "title",
): Promise<FilmCard[]> {
  return prisma.film.findMany({
    where: buildWhere(filters),
    orderBy: buildOrderBy(sort),
    include: filmCardInclude,
  });
}

// ---------------------------------------------------------------------------
// Single film + related
// ---------------------------------------------------------------------------

/** Get one film by slug with all relations needed for its detail page. */
export function getFilmBySlug(slug: string): Promise<FilmDetail | null> {
  return prisma.film.findUnique({
    where: { slug },
    include: filmDetailInclude,
  });
}

/** Films related to the given one — same director or shared genre. */
export function listRelatedFilms(
  film: Pick<FilmDetail, "id" | "directorId"> & {
    genres: { genreId: string }[];
  },
  take = 6,
): Promise<FilmCard[]> {
  const genreIds = film.genres.map((g) => g.genreId);
  return prisma.film.findMany({
    where: {
      id: { not: film.id },
      draft: false,
      OR: [
        ...(film.directorId ? [{ directorId: film.directorId }] : []),
        ...(genreIds.length
          ? [{ genres: { some: { genreId: { in: genreIds } } } }]
          : []),
      ],
    },
    orderBy: { year: "asc" },
    include: filmCardInclude,
    take,
  });
}

// ---------------------------------------------------------------------------
// People & genres
// ---------------------------------------------------------------------------

const personInclude = {
  imageAssets: { select: { url: true }, take: 1 },
} satisfies Prisma.PersonInclude;

export type PersonWithFilms = {
  person: Prisma.PersonGetPayload<{ include: typeof personInclude }>;
  directed: FilmCard[];
  actedIn: FilmCard[];
};

/** A person (director/actor) with the films they directed and acted in. */
export async function getPersonWithFilms(
  slug: string,
): Promise<PersonWithFilms | null> {
  const person = await prisma.person.findUnique({
    where: { slug },
    include: personInclude,
  });
  if (!person) return null;

  const [directed, actedIn] = await Promise.all([
    prisma.film.findMany({
      where: { directorId: person.id, draft: false },
      orderBy: { year: "asc" },
      include: filmCardInclude,
    }),
    prisma.film.findMany({
      where: { cast: { some: { personId: person.id } }, draft: false },
      orderBy: { year: "asc" },
      include: filmCardInclude,
    }),
  ]);

  return { person, directed, actedIn };
}

export type GenreWithFilms = {
  genre: Prisma.GenreGetPayload<true>;
  films: FilmCard[];
};

/** A genre with every film in it. */
export async function getGenreWithFilms(
  slug: string,
): Promise<GenreWithFilms | null> {
  const genre = await prisma.genre.findUnique({ where: { slug } });
  if (!genre) return null;

  const films = await prisma.film.findMany({
    where: { genres: { some: { genreId: genre.id } }, draft: false },
    orderBy: { year: "asc" },
    include: filmCardInclude,
  });

  return { genre, films };
}

// ---------------------------------------------------------------------------
// Filter option sources (for the catalogue UI)
// ---------------------------------------------------------------------------

export function listGenres() {
  return prisma.genre.findMany({ orderBy: { name: "asc" } });
}

export function listStudios() {
  return prisma.studio.findMany({ orderBy: { name: "asc" } });
}

export function listSubtitleLanguages() {
  return prisma.subtitleLanguage.findMany({ orderBy: { name: "asc" } });
}

/** People who directed at least one film, for the directors filter/index. */
export function listDirectors() {
  return prisma.person.findMany({
    where: { directed: { some: {} } },
    orderBy: { name: "asc" },
  });
}

// ---------------------------------------------------------------------------
// Library index pages (with film counts)
// ---------------------------------------------------------------------------

/** All directors with how many films they directed. */
export function listDirectorsWithCounts() {
  return prisma.person.findMany({
    where: { directed: { some: {} } },
    orderBy: { name: "asc" },
    include: { _count: { select: { directed: true } } },
  });
}

/** All actors with how many films they appear in. */
export function listActorsWithCounts() {
  return prisma.person.findMany({
    where: { castCredits: { some: {} } },
    orderBy: { name: "asc" },
    include: { _count: { select: { castCredits: true } } },
  });
}

/** All genres with how many films belong to each. */
export function listGenresWithCounts() {
  return prisma.genre.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { films: true } } },
  });
}

/** Distinct decades (e.g. 1950, 1970) present in the catalogue, ascending. */
export async function listDecades(): Promise<number[]> {
  const rows = await prisma.film.findMany({ select: { year: true } });
  const decades = new Set<number>();
  for (const { year } of rows) decades.add(Math.floor(year / 10) * 10);
  return [...decades].sort((a, b) => a - b);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parse a JSON-encoded string[] column (e.g. Film.themes) safely. */
export function parseStringArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}
