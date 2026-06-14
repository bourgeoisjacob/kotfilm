import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import FilmGrid from "@/components/catalogue/FilmGrid";
import { getGenreWithFilms } from "@/lib/queries";
import { getWatchlistContext } from "@/lib/userData";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getGenreWithFilms(slug);
  if (!data) return { title: "Genre not found — Kotfilm" };
  return {
    title: `${data.genre.name} — Kotfilm`,
    description: `Soviet ${data.genre.name.toLowerCase()} films in the Kotfilm guide.`,
  };
}

export default async function GenrePage({ params }: { params: Params }) {
  const { slug } = await params;
  const data = await getGenreWithFilms(slug);
  if (!data) notFound();

  const { genre, films } = data;
  const watchlist = await getWatchlistContext();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/genres"
        className="inline-flex items-center gap-1.5 text-sm text-kot-char transition-colors hover:text-kot-red"
      >
        <ArrowLeft aria-hidden className="h-4 w-4" />
        Genres
      </Link>

      <header className="mb-6 mt-4">
        <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
          {genre.name}
        </h1>
        <p className="mt-1 text-sm text-kot-char">
          {films.length} {films.length === 1 ? "film" : "films"}
        </p>
      </header>

      <FilmGrid
        films={films}
        signedIn={watchlist.signedIn}
        savedSlugs={watchlist.savedSlugs}
      />
    </main>
  );
}
