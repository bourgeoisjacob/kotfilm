import type { Metadata } from "next";
import LibraryGrid from "@/components/library/LibraryGrid";
import { listGenresWithCounts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Genres — Kotfilm",
  description: "Browse Soviet cinema by genre in the Kotfilm guide.",
};

export default async function GenresPage() {
  const genres = await listGenresWithCounts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
          Genres
        </h1>
        <p className="mt-1 text-sm text-kot-char">{genres.length} genres</p>
      </header>

      <LibraryGrid
        empty="No genres yet."
        items={genres.map((g) => ({
          href: `/genres/${g.slug}`,
          title: g.name,
          subtitle: `${g._count.films} ${g._count.films === 1 ? "film" : "films"}`,
        }))}
      />
    </main>
  );
}
