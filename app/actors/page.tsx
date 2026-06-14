import type { Metadata } from "next";
import LibraryGrid from "@/components/library/LibraryGrid";
import { listActorsWithCounts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Actors — Kotfilm",
  description: "Browse the actors in the Kotfilm guide to Soviet cinema.",
};

export default async function ActorsPage() {
  const actors = await listActorsWithCounts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
          Actors
        </h1>
        <p className="mt-1 text-sm text-kot-char">{actors.length} actors</p>
      </header>

      <LibraryGrid
        empty="No actors yet."
        items={actors.map((a) => ({
          href: `/actors/${a.slug}`,
          title: a.name,
          subtitle: `${a._count.castCredits} ${a._count.castCredits === 1 ? "film" : "films"}`,
        }))}
      />
    </main>
  );
}
