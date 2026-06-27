import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Globe, Star } from "lucide-react";
import FilmCard from "@/components/catalogue/FilmCard";
import PersonCard from "@/components/film/PersonCard";
import ImageCredit from "@/components/ImageCredit";
import WatchLinks from "@/components/film/WatchLinks";
import WatchlistButton from "@/components/watchlist/WatchlistButton";
import PersonalControls from "@/components/film/PersonalControls";
import { getFilmBySlug, listRelatedFilms } from "@/lib/queries";
import { getFilmUserState, getWatchlistContext } from "@/lib/userData";
import { getViewerRegion } from "@/lib/region";
import { regionWatchLinks } from "@/lib/regionWatchLinks";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = await getFilmBySlug(slug);
  if (!film) return { title: "Film not found — Kotfilm" };
  return {
    title: `${film.title} (${film.year}) — Kotfilm`,
    description: film.shortSummary,
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-semibold uppercase tracking-[0.14em] text-kot-red">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default async function FilmDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const film = await getFilmBySlug(slug);
  if (!film) notFound();

  const [related, userState, watchlist, region] = await Promise.all([
    listRelatedFilms(film),
    getFilmUserState(film.id),
    getWatchlistContext(),
    getViewerRegion(),
  ]);
  const genres = film.genres.map((g) => g.genre);
  const signedIn = watchlist.signedIn;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href="/films"
        className="inline-flex items-center gap-1.5 text-sm text-kot-char transition-colors hover:text-kot-red"
      >
        <ArrowLeft aria-hidden className="h-4 w-4" />
        Catalogue
      </Link>

      {/* Hero */}
      <header className="mt-4 grid gap-6 sm:grid-cols-[220px_1fr]">
        <div>
          <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-lg bg-kot-char sm:aspect-[3/4]">
            {film.imageAssets[0]?.url ? (
              <Image
                src={film.imageAssets[0].url}
                alt={`Still or poster from ${film.title}`}
                fill
                sizes="220px"
                className="object-cover"
                priority
              />
            ) : (
              <span className="font-display text-5xl font-bold tracking-widest text-kot-cream/25">
                {film.year}
              </span>
            )}
            {film.starterClassic && (
              <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-kot-red px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-kot-creamHi">
                <Star aria-hidden className="h-3 w-3 fill-current" />
                Start here
              </span>
            )}
          </div>
          <ImageCredit asset={film.imageAssets[0]} />
        </div>

        <div>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-wide text-kot-ink">
            {film.title}
          </h1>
          {film.originalTitle && (
            <p className="mt-1 text-lg italic text-kot-char/80">
              {film.originalTitle}
            </p>
          )}

          <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-kot-char">
            <div className="flex items-center gap-1.5">
              <CalendarDays aria-hidden className="h-4 w-4 text-kot-char/70" />
              <dt className="sr-only">Year</dt>
              <dd>{film.year}</dd>
            </div>
            {film.runtimeMinutes && (
              <div className="flex items-center gap-1.5">
                <Clock aria-hidden className="h-4 w-4 text-kot-char/70" />
                <dt className="sr-only">Runtime</dt>
                <dd>{film.runtimeMinutes} min</dd>
              </div>
            )}
            {film.country && (
              <div className="flex items-center gap-1.5">
                <Globe aria-hidden className="h-4 w-4 text-kot-char/70" />
                <dt className="sr-only">Country</dt>
                <dd>{film.country}</dd>
              </div>
            )}
          </dl>

          <p className="mt-4 text-sm text-kot-ink">
            {film.director && (
              <>
                Directed by{" "}
                <Link
                  href={`/directors/${film.director.slug}`}
                  className="font-semibold text-kot-red underline-offset-4 hover:underline"
                >
                  {film.director.name}
                </Link>
              </>
            )}
            {film.studio && (
              <>
                {" · "}
                <Link
                  href={`/films?studio=${film.studio.slug}`}
                  className="underline-offset-4 hover:text-kot-red hover:underline"
                >
                  {film.studio.name}
                </Link>
              </>
            )}
          </p>

          {genres.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {genres.map((genre) => (
                <li key={genre.slug}>
                  <Link
                    href={`/genres/${genre.slug}`}
                    className="inline-block rounded-full border border-kot-line bg-kot-cream px-2.5 py-0.5 text-xs text-kot-ink/80 transition-colors hover:border-kot-red hover:text-kot-red"
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5">
            <WatchlistButton
              variant="full"
              film={{
                slug: film.slug,
                title: film.title,
                year: film.year,
                director: film.director?.name ?? null,
              }}
              filmId={film.id}
              signedIn={signedIn}
              initialSaved={userState?.inWatchlist ?? false}
            />
          </div>
        </div>
      </header>

      <Section title="Where to watch">
        <WatchLinks
          watchLinks={film.watchLinks}
          regionRestricted={region.restricted}
          intlLink={regionWatchLinks[film.slug]}
          title={film.title}
          year={film.year}
        />
      </Section>

      <Section title="Your activity">
        {signedIn && userState ? (
          <PersonalControls filmId={film.id} initial={userState} />
        ) : (
          <p className="rounded-lg border border-kot-line bg-kot-cream p-4 text-sm text-kot-char">
            <Link
              href={`/signin?callbackUrl=/films/${film.slug}`}
              className="font-semibold text-kot-red underline-offset-4 hover:underline"
            >
              Sign in
            </Link>{" "}
            to rate this film, mark it watched, and add it to your favourites.
          </p>
        )}
      </Section>

      <Section title="Summary">
        <p className="leading-relaxed text-kot-ink">{film.shortSummary}</p>
      </Section>

      {film.historicalContext && (
        <Section title="Historical context">
          <p className="leading-relaxed text-kot-ink">{film.historicalContext}</p>
        </Section>
      )}

      {film.impact && (
        <Section title="Impact on cinema">
          <p className="leading-relaxed text-kot-ink">{film.impact}</p>
        </Section>
      )}

      <Section title="Cast & crew">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {film.director && (
            <li>
              <PersonCard
                name={film.director.name}
                href={`/directors/${film.director.slug}`}
                role="Director"
                imageUrl={film.director.imageAssets[0]?.url}
              />
            </li>
          )}
          {film.cast.map((credit) => (
            <li key={credit.id}>
              <PersonCard
                name={credit.person.name}
                href={`/actors/${credit.person.slug}`}
                role={credit.characterName ? `as ${credit.characterName}` : "Cast"}
                imageUrl={credit.person.imageAssets[0]?.url}
              />
            </li>
          ))}
        </ul>
      </Section>

      {related.length > 0 && (
        <Section title="Related films">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <li key={rel.id}>
                <FilmCard
                  film={rel}
                  signedIn={signedIn}
                  savedSlugs={watchlist.savedSlugs}
                />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  );
}
