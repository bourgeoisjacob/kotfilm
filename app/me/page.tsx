import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Star } from "lucide-react";
import { auth } from "@/auth";
import FilmGrid from "@/components/catalogue/FilmGrid";
import WatchlistRemoveButton from "@/components/watchlist/WatchlistRemoveButton";
import { getDbWatchlist, getUserActivity, getWatchlistContext } from "@/lib/userData";

export const metadata: Metadata = {
  title: "Your activity — Kotfilm",
};

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-semibold uppercase tracking-[0.14em] text-kot-red">
        {title}
      </h2>
      <p className="mb-3 mt-1 text-sm text-kot-char">
        {count} {count === 1 ? "film" : "films"}
      </p>
      {children}
    </section>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-kot-line bg-kot-cream p-6 text-sm text-kot-char">
      {children}
    </p>
  );
}

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin?callbackUrl=/me");

  const [{ favorites, ratings, watched }, watchlist, savedFilms] = await Promise.all([
    getUserActivity(session.user.id),
    getWatchlistContext(),
    getDbWatchlist(session.user.id),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
          Your activity
        </h1>
        <p className="mt-1 text-sm text-kot-char">{session.user.email}</p>
      </header>

      <Section title="Watchlist" count={savedFilms.length}>
        {savedFilms.length === 0 ? (
          <EmptyState>
            Save films to watch later with the bookmark button on any film page or in
            the{" "}
            <Link href="/films" className="text-kot-red underline-offset-4 hover:underline">
              catalogue
            </Link>
            .
          </EmptyState>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {savedFilms.map((item) => (
              <li
                key={item.filmId}
                className="group relative flex items-center justify-between gap-2 rounded-lg border border-kot-line bg-kot-cream px-4 py-3 transition-colors hover:border-kot-red"
              >
                <Link href={`/films/${item.film.slug}`} className="flex flex-col leading-tight">
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
      </Section>

      <Section title="Favourites" count={favorites.length}>
        {favorites.length === 0 ? (
          <EmptyState>
            Mark films you love with the heart on a film page. They&rsquo;ll
            gather here.
          </EmptyState>
        ) : (
          <FilmGrid
            films={favorites.map((f) => f.film)}
            signedIn={watchlist.signedIn}
            savedSlugs={watchlist.savedSlugs}
          />
        )}
      </Section>

      <Section title="Your ratings" count={ratings.length}>
        {ratings.length === 0 ? (
          <EmptyState>Rate a film 1–5 stars on its page to track it here.</EmptyState>
        ) : (
          <ul className="flex flex-col gap-2">
            {ratings.map((r) => (
              <li
                key={r.film.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-kot-line bg-kot-cream px-4 py-2.5"
              >
                <Link
                  href={`/films/${r.film.slug}`}
                  className="font-display font-semibold tracking-wide text-kot-ink hover:text-kot-red"
                >
                  {r.film.title}{" "}
                  <span className="font-normal text-kot-char/70">({r.film.year})</span>
                </Link>
                <span
                  className="flex shrink-0 items-center gap-0.5 text-kot-gold"
                  aria-label={`${r.value} out of 5 stars`}
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      aria-hidden
                      className={`h-4 w-4 ${s <= r.value ? "fill-current" : "fill-transparent text-kot-line"}`}
                    />
                  ))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Watched" count={watched.length}>
        {watched.length === 0 ? (
          <EmptyState>
            Use &ldquo;Mark watched&rdquo; on a film page to build your history.
          </EmptyState>
        ) : (
          <FilmGrid
            films={watched.map((w) => w.film)}
            signedIn={watchlist.signedIn}
            savedSlugs={watchlist.savedSlugs}
          />
        )}
      </Section>
    </main>
  );
}
