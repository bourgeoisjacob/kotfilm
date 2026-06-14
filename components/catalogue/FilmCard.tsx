import Link from "next/link";
import { Star, BadgeCheck } from "lucide-react";
import WatchlistButton from "@/components/watchlist/WatchlistButton";
import type { FilmCard as FilmCardData } from "@/lib/queries";

export default function FilmCard({
  film,
  signedIn = false,
  savedSlugs,
}: {
  film: FilmCardData;
  signedIn?: boolean;
  savedSlugs?: Set<string>;
}) {
  const genres = film.genres.map((g) => g.genre.name);
  const subtitleCodes = film.subtitleLanguages.map((s) => s.language.code);
  const hasOfficial = film.watchLinks.some((w) => w.sourceType === "OFFICIAL");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-kot-line bg-kot-cream transition-colors hover:border-kot-red">
      {/* Poster placeholder — imagery arrives with the Commons ingestion. */}
      <div className="relative flex aspect-[3/2] items-center justify-center bg-kot-char">
        <span className="font-display text-4xl font-bold tracking-widest text-kot-cream/25">
          {film.year}
        </span>
        {film.starterClassic && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-kot-red px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-kot-creamHi">
            <Star aria-hidden className="h-3 w-3 fill-current" />
            Start here
          </span>
        )}
        {hasOfficial && (
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-kot-gold px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-kot-ink">
            <BadgeCheck aria-hidden className="h-3 w-3" />
            Official
          </span>
        )}
      </div>

      {/* Watchlist toggle sits above the stretched link. */}
      <div className="absolute right-2 top-2 z-10">
        <WatchlistButton
          film={{
            slug: film.slug,
            title: film.title,
            year: film.year,
            director: film.director?.name ?? null,
          }}
          filmId={film.id}
          signedIn={signedIn}
          initialSaved={savedSlugs?.has(film.slug) ?? false}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight tracking-wide text-kot-ink group-hover:text-kot-red">
            <Link href={`/films/${film.slug}`} className="after:absolute after:inset-0">
              {film.title}
            </Link>
          </h3>
          {film.originalTitle && (
            <p className="text-sm italic text-kot-char/70">{film.originalTitle}</p>
          )}
        </div>

        <p className="text-sm text-kot-char">
          {film.year}
          {film.director && <> · {film.director.name}</>}
        </p>

        {genres.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {genres.map((name) => (
              <li
                key={name}
                className="rounded-full border border-kot-line bg-kot-creamHi px-2 py-0.5 text-xs text-kot-ink/75"
              >
                {name}
              </li>
            ))}
          </ul>
        )}

        {subtitleCodes.length > 0 && (
          <p className="text-xs uppercase tracking-wider text-kot-char/70">
            Subtitles: {subtitleCodes.join(" · ")}
          </p>
        )}
      </div>
    </article>
  );
}
