import Image from "next/image";
import Link from "next/link";
import { Compass, BookOpenText, PlayCircle, Search } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Discover",
    body: "Browse Soviet cinema by director, actor, genre, decade, and studio.",
  },
  {
    icon: BookOpenText,
    title: "Understand",
    body: "Original summaries, historical context, and notes on each film's impact.",
  },
  {
    icon: PlayCircle,
    title: "Watch legally",
    body: "Free, official, clearly-labelled links — never pirated, never hosted here.",
  },
];

const genrePreview = [
  "Comedy",
  "War",
  "Science fiction",
  "Animation",
  "Drama",
  "Silent cinema",
  "Musical",
  "Fairy tale",
  "Historical epic",
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="grain border-b border-kot-line bg-kot-cream">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-20">
          <Image
            src="/kotfilm-icon.png"
            alt="Kotfilm — a cat gazing up beside a Soviet film reel and a red star"
            width={156}
            height={156}
            priority
            className="rounded-full shadow-sm ring-1 ring-kot-line"
          />

          <div>
            <h1 className="font-display text-5xl font-bold tracking-[0.16em] text-kot-red sm:text-6xl">
              KOTFILM
            </h1>
            <p className="mt-3 font-display text-lg uppercase tracking-[0.25em] text-kot-char">
              Catnip for Soviet Film Lovers
            </p>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-kot-ink/85">
            A curated guide to Soviet cinema — discover films, read original
            summaries and historical context, and find free, legal ways to watch.
          </p>

          {/* Search points at the future catalogue route. */}
          <form
            action="/films"
            method="get"
            role="search"
            className="mt-2 flex w-full max-w-md items-center gap-2"
          >
            <label htmlFor="q" className="sr-only">
              Search films, directors, actors
            </label>
            <div className="relative flex-1">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kot-char/60"
              />
              <input
                id="q"
                name="q"
                type="search"
                placeholder="Search films, directors, actors…"
                className="w-full rounded-full border border-kot-line bg-kot-creamHi py-2.5 pl-9 pr-4 text-sm text-kot-ink placeholder:text-kot-char/55 focus:border-kot-red focus:outline-none focus:ring-2 focus:ring-kot-red/30"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-kot-red px-5 py-2.5 font-display text-sm uppercase tracking-wider text-kot-creamHi transition-colors hover:bg-kot-redDeep"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/films"
              className="rounded-full border border-kot-red px-5 py-2 font-display text-sm uppercase tracking-wider text-kot-red transition-colors hover:bg-kot-red hover:text-kot-creamHi"
            >
              Browse the catalogue
            </Link>
            <Link
              href="/films?sort=classics"
              className="rounded-full px-5 py-2 font-display text-sm uppercase tracking-wider text-kot-ink/80 underline-offset-4 transition-colors hover:text-kot-red hover:underline"
            >
              Start with classics
            </Link>
          </div>
        </div>
      </section>

      {/* What Kotfilm does */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <ul className="grid gap-6 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="rounded-lg border border-kot-line bg-kot-cream p-6"
            >
              <Icon aria-hidden className="h-7 w-7 text-kot-red" />
              <h2 className="mt-3 font-display text-xl font-semibold tracking-wide text-kot-ink">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-kot-char">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Genre preview */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-lg border border-kot-line bg-kot-cream p-6 sm:p-8">
          <h2 className="font-display text-lg uppercase tracking-[0.18em] text-kot-red">
            Genres to explore
          </h2>
          <p className="mt-1 text-sm text-kot-char">
            Genre libraries arrive with the catalogue.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {genrePreview.map((genre) => (
              <li
                key={genre}
                className="rounded-full border border-kot-line bg-kot-creamHi px-3 py-1 text-sm text-kot-ink/80"
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
