import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import FilmGrid from "@/components/catalogue/FilmGrid";
import type { PersonWithFilms } from "@/lib/queries";
import { getWatchlistContext } from "@/lib/userData";

export default async function PersonProfile({
  data,
  role,
}: {
  data: PersonWithFilms;
  role: "director" | "actor";
}) {
  const { person, directed, actedIn } = data;
  const watchlist = await getWatchlistContext();

  const isDirector = role === "director";
  const primary = isDirector ? directed : actedIn;
  const secondary = isDirector ? actedIn : directed;
  const primaryLabel = isDirector ? "Films directed" : "Filmography";
  const secondaryLabel = isDirector ? "Also appears in" : "Also directed";
  const roleLabel = isDirector ? "Director" : "Actor";
  const backHref = isDirector ? "/directors" : "/actors";
  const backLabel = isDirector ? "Directors" : "Actors";

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-kot-char transition-colors hover:text-kot-red"
      >
        <ArrowLeft aria-hidden className="h-4 w-4" />
        {backLabel}
      </Link>

      <header className="mt-4">
        <p className="font-display text-xs uppercase tracking-[0.18em] text-kot-red">
          {roleLabel}
        </p>
        <h1 className="mt-1 font-display text-4xl font-bold tracking-wide text-kot-ink">
          {person.name}
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-kot-char">
          {person.bio ?? (
            <span className="italic text-kot-char/70">
              A short, original biography will appear here once added — Kotfilm
              writes its own concise summaries rather than copying source text.
            </span>
          )}
        </p>
      </header>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold uppercase tracking-[0.14em] text-kot-red">
          {primaryLabel}
        </h2>
        <p className="mb-3 mt-1 text-sm text-kot-char">
          {primary.length} {primary.length === 1 ? "film" : "films"}
        </p>
        <FilmGrid
          films={primary}
          signedIn={watchlist.signedIn}
          savedSlugs={watchlist.savedSlugs}
        />
      </section>

      {secondary.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold uppercase tracking-[0.14em] text-kot-red">
            {secondaryLabel}
          </h2>
          <div className="mt-3">
            <FilmGrid
              films={secondary}
              signedIn={watchlist.signedIn}
              savedSlugs={watchlist.savedSlugs}
            />
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold uppercase tracking-[0.14em] text-kot-red">
          Sources &amp; attribution
        </h2>
        <div className="mt-3 rounded-lg border border-kot-line bg-kot-cream p-5 text-sm text-kot-char">
          <p>
            Biographical details will cite Wikidata and Wikipedia when added; any
            summary text on Kotfilm is{" "}
            <strong className="text-kot-ink">original</strong>, not copied.
          </p>
          {person.wikipediaUrl && (
            <p className="mt-2">
              <a
                href={person.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-kot-red underline-offset-4 hover:underline"
              >
                <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                Wikipedia
              </a>
            </p>
          )}
          <p className="mt-2 text-xs text-kot-char/70">
            Kotfilm is an independent guide and is not affiliated with any studio,
            platform, or archive.
          </p>
        </div>
      </section>
    </main>
  );
}
