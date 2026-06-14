import Link from "next/link";
import FilmCard from "@/components/catalogue/FilmCard";
import type { FilmCard as FilmCardData } from "@/lib/queries";

export default function FilmGrid({
  films,
  signedIn = false,
  savedSlugs,
}: {
  films: FilmCardData[];
  signedIn?: boolean;
  savedSlugs?: Set<string>;
}) {
  if (films.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-kot-line bg-kot-cream p-10 text-center">
        <p className="font-display text-lg text-kot-ink">No films match these filters.</p>
        <p className="mt-1 text-sm text-kot-char">
          Try removing a filter, or{" "}
          <Link href="/films" className="text-kot-red underline-offset-4 hover:underline">
            clear them all
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {films.map((film) => (
        <li key={film.id}>
          <FilmCard film={film} signedIn={signedIn} savedSlugs={savedSlugs} />
        </li>
      ))}
    </ul>
  );
}
