import type { Metadata } from "next";
import LibraryGrid from "@/components/library/LibraryGrid";
import { listDirectorsWithCounts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Directors — Kotfilm",
  description: "Browse the directors in the Kotfilm guide to Soviet cinema.",
};

export default async function DirectorsPage() {
  const directors = await listDirectorsWithCounts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
          Directors
        </h1>
        <p className="mt-1 text-sm text-kot-char">{directors.length} directors</p>
      </header>

      <LibraryGrid
        empty="No directors yet."
        items={directors.map((d) => ({
          href: `/directors/${d.slug}`,
          title: d.name,
          subtitle: `${d._count.directed} ${d._count.directed === 1 ? "film" : "films"}`,
        }))}
      />
    </main>
  );
}
