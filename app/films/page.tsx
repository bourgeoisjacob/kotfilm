import type { Metadata } from "next";
import CatalogueFilters from "@/components/catalogue/CatalogueFilters";
import FilmGrid from "@/components/catalogue/FilmGrid";
import {
  listActorsWithCounts,
  listDecades,
  listDirectors,
  listFilms,
  listGenres,
  listStudios,
  listSubtitleLanguages,
  type FilmFilters,
  type FilmSort,
} from "@/lib/queries";
import { getWatchlistContext } from "@/lib/userData";

export const metadata: Metadata = {
  title: "Catalogue — Kotfilm",
  description: "Browse and search the Kotfilm guide to Soviet cinema.",
};

const SORTS: FilmSort[] = ["title", "year", "director", "classics", "recent"];

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined): string =>
  (Array.isArray(value) ? value[0] : value) ?? "";

function parseFilters(params: SearchParams): {
  filters: FilmFilters;
  sort: FilmSort;
} {
  const decade = Number.parseInt(first(params.decade), 10);
  const sortRaw = first(params.sort) as FilmSort;

  const filters: FilmFilters = {
    q: first(params.q) || undefined,
    decade: Number.isNaN(decade) ? undefined : decade,
    genre: first(params.genre) || undefined,
    director: first(params.director) || undefined,
    actor: first(params.actor) || undefined,
    studio: first(params.studio) || undefined,
    subtitle: first(params.subtitle) || undefined,
    availableToWatch: first(params.watch) === "1" || undefined,
  };

  return {
    filters,
    sort: SORTS.includes(sortRaw) ? sortRaw : "title",
  };
}

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { filters, sort } = parseFilters(await searchParams);

  const [films, decades, genres, directors, actors, studios, subtitles, watchlist] =
    await Promise.all([
      listFilms(filters, sort),
      listDecades(),
      listGenres(),
      listDirectors(),
      listActorsWithCounts(),
      listStudios(),
      listSubtitleLanguages(),
      getWatchlistContext(),
    ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
          Catalogue
        </h1>
        <p className="mt-1 text-sm text-kot-char">
          {films.length} {films.length === 1 ? "film" : "films"}
          {Object.values(filters).some(Boolean) ? " matching your filters" : ""}.
        </p>
      </header>

      <div className="mb-8">
        <CatalogueFilters
          decades={decades}
          genres={genres.map((g) => ({ value: g.slug, label: g.name }))}
          directors={directors.map((d) => ({ value: d.slug, label: d.name }))}
          actors={actors.map((a) => ({ value: a.slug, label: a.name }))}
          studios={studios.map((s) => ({ value: s.slug, label: s.name }))}
          subtitles={subtitles.map((s) => ({ value: s.code, label: s.name }))}
        />
      </div>

      <FilmGrid
        films={films}
        signedIn={watchlist.signedIn}
        savedSlugs={watchlist.savedSlugs}
      />
    </main>
  );
}
