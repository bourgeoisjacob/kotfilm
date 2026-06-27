import type { Metadata } from "next";
import LibraryGrid from "@/components/library/LibraryGrid";
import PeopleFilters from "@/components/people/PeopleFilters";
import {
  listActorsWithCounts,
  listDecades,
  listGenres,
  listStudios,
  type PeopleFilters as PF,
  type PeopleSort,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Actors — Kotfilm",
  description: "Browse, search, and filter the actors in the Kotfilm guide to Soviet cinema.",
};

type SearchParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ActorsPage({
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
  };
  const sort: PeopleSort = first(params.sort) === "films" ? "films" : "surname";

  const [actors, decades, genres, studios] = await Promise.all([
    listActorsWithCounts(filters, sort),
    listDecades(),
    listGenres(),
    listStudios(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
          Actors
        </h1>
        <p className="mt-1 text-sm text-kot-char">
          {actors.length} {actors.length === 1 ? "actor" : "actors"}
          {Object.values(filters).some(Boolean) ? " matching your filters" : ""}
        </p>
      </header>

      <div className="mb-8">
        <PeopleFilters
          kind="actors"
          decades={decades}
          genres={genres.map((g) => ({ value: g.slug, label: g.name }))}
          studios={studios.map((s) => ({ value: s.slug, label: s.name }))}
        />
      </div>

      <LibraryGrid
        empty="No actors match these filters."
        items={actors.map((a) => ({
          href: `/actors/${a.slug}`,
          title: a.name,
          subtitle: `${a._count.castCredits} ${a._count.castCredits === 1 ? "film" : "films"}`,
          avatar: true,
          imageUrl: a.imageAssets[0]?.url,
        }))}
      />
    </main>
  );
}
