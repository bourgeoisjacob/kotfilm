import type { Metadata } from "next";
import LibraryGrid from "@/components/library/LibraryGrid";
import PeopleFilters from "@/components/people/PeopleFilters";
import {
  listDirectorsWithCounts,
  listDecades,
  listGenres,
  listStudios,
  listSubtitleLanguages,
  type PeopleFilters as PF,
  type PeopleSort,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Directors — Kotfilm",
  description: "Browse, search, and filter the directors in the Kotfilm guide to Soviet cinema.",
};

type SearchParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function DirectorsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const decade = Number.parseInt(first(params.decade), 10);
  const filters: PF = {
    q: first(params.q) || undefined,
    decade: Number.isNaN(decade) ? undefined : decade,
    genre: first(params.genre) || undefined,
    studio: first(params.studio) || undefined,
    subtitle: first(params.subtitle) || undefined,
    availableToWatch: first(params.watch) === "1" || undefined,
  };
  const sort: PeopleSort = first(params.sort) === "films" ? "films" : "surname";

  const [directors, decades, genres, studios, subtitles] = await Promise.all([
    listDirectorsWithCounts(filters, sort),
    listDecades(),
    listGenres(),
    listStudios(),
    listSubtitleLanguages(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
          Directors
        </h1>
        <p className="mt-1 text-sm text-kot-char">
          {directors.length} {directors.length === 1 ? "director" : "directors"}
          {Object.values(filters).some(Boolean) ? " matching your filters" : ""}
        </p>
      </header>

      <div className="mb-8">
        <PeopleFilters
          kind="directors"
          decades={decades}
          genres={genres.map((g) => ({ value: g.slug, label: g.name }))}
          studios={studios.map((s) => ({ value: s.slug, label: s.name }))}
          subtitles={subtitles.map((s) => ({ value: s.code, label: s.name }))}
        />
      </div>

      <LibraryGrid
        empty="No directors match these filters."
        items={directors.map((d) => ({
          href: `/directors/${d.slug}`,
          title: d.name,
          subtitle: `${d._count.directed} ${d._count.directed === 1 ? "film" : "films"}`,
          avatar: true,
          imageUrl: d.imageAssets[0]?.url,
        }))}
      />
    </main>
  );
}
