import type { Metadata } from "next";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import LocalWatchlist from "@/components/watchlist/LocalWatchlist";
import WatchlistRemoveButton from "@/components/watchlist/WatchlistRemoveButton";
import { getCurrentUserId, getDbWatchlist } from "@/lib/userData";

export const metadata: Metadata = {
  title: "Your watchlist — Kotfilm",
};

export default async function WatchlistPage() {
  const userId = await getCurrentUserId();

  // Signed out: the local (device) watchlist handles everything client-side.
  if (!userId) return <LocalWatchlist />;

  const items = await getDbWatchlist(userId);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
          Your watchlist
        </h1>
        <p className="mt-1 text-sm text-kot-char">
          {items.length} {items.length === 1 ? "film" : "films"} · saved to your
          account
        </p>
      </header>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-kot-line bg-kot-cream p-10 text-center">
          <Bookmark aria-hidden className="mx-auto h-8 w-8 text-kot-char/50" />
          <p className="mt-3 font-display text-lg text-kot-ink">
            Your watchlist is empty.
          </p>
          <p className="mt-1 text-sm text-kot-char">
            Add films from the{" "}
            <Link href="/films" className="text-kot-red underline-offset-4 hover:underline">
              catalogue
            </Link>{" "}
            using the bookmark button.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.filmId}
              className="group relative flex items-center justify-between gap-2 rounded-lg border border-kot-line bg-kot-cream px-4 py-3 transition-colors hover:border-kot-red"
            >
              <Link
                href={`/films/${item.film.slug}`}
                className="flex flex-col leading-tight"
              >
                <span className="font-display font-semibold tracking-wide text-kot-ink group-hover:text-kot-red">
                  {item.film.title}
                </span>
                <span className="text-xs uppercase tracking-wider text-kot-char/75">
                  {item.film.year}
                  {item.film.director ? ` · ${item.film.director.name}` : ""}
                </span>
              </Link>
              <WatchlistRemoveButton filmId={item.filmId} title={item.film.title} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
