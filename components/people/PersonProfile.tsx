import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FilmGrid from "@/components/catalogue/FilmGrid";
import CollaborationText from "@/components/people/CollaborationText";
import ImageCredit from "@/components/ImageCredit";
import type { PersonWithFilms } from "@/lib/queries";
import { collaborations } from "@/lib/collaborations";
import { getWatchlistContext } from "@/lib/userData";

// Neutral fallback when no curated biography exists yet. Kept factual and free of
// any reference to the website; the person's films are listed below regardless.
function fallbackBio(
  name: string,
  role: "director" | "actor",
  directed: { title: string }[],
  actedIn: { title: string }[],
): string {
  const craft = role === "director" ? "film director" : "actor";
  const other =
    role === "director" && actedIn.length > 0
      ? " who also appeared on screen"
      : role === "actor" && directed.length > 0
        ? " who also directed"
        : "";
  return `${name} is a Soviet ${craft}${other}.`;
}

export default async function PersonProfile({
  data,
  role,
}: {
  data: PersonWithFilms;
  role: "director" | "actor";
}) {
  const { person, directed, actedIn } = data;
  const watchlist = await getWatchlistContext();
  const collaborationNote = collaborations[person.slug];

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

      <header className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start">
        {person.imageAssets[0]?.url && (
          <div className="shrink-0">
            <Image
              src={person.imageAssets[0].url}
              alt={person.name}
              width={120}
              height={120}
              className="h-28 w-28 rounded-full object-cover ring-1 ring-kot-line"
            />
            <div className="max-w-28">
              <ImageCredit asset={person.imageAssets[0]} />
            </div>
          </div>
        )}
        <div>
          <p className="font-display text-xs uppercase tracking-[0.18em] text-kot-red">
            {roleLabel}
          </p>
          <h1 className="mt-1 font-display text-4xl font-bold tracking-wide text-kot-ink">
            {person.name}
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-kot-char">
            {person.bio ?? fallbackBio(person.name, role, directed, actedIn)}
          </p>
        </div>
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

      {collaborationNote && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold uppercase tracking-[0.14em] text-kot-red">
            Collaborators
          </h2>
          <div className="mt-3">
            <CollaborationText text={collaborationNote} />
          </div>
        </section>
      )}
    </main>
  );
}
