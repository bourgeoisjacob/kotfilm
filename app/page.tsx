import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import HomeBrowser from "@/components/home/HomeBrowser";
import { getHomeRails } from "@/lib/queries";

// Browse rails read the live catalogue, so render at request time.
export const dynamic = "force-dynamic";

export default async function Home() {
  const rails = await getHomeRails();

  // Spotlight: strong, embeddable picks (Start here, then other official films).
  const pool = [
    ...(rails.find((r) => r.key === "start-here")?.films ?? []),
    ...(rails.find((r) => r.key === "watch-free")?.films ?? []),
  ];
  const seen = new Set<string>();
  const featured = pool
    .filter((f) => f.posterUrl && f.watchSourceType === "OFFICIAL")
    .filter((f) => !seen.has(f.slug) && seen.add(f.slug))
    .slice(0, 6);

  return (
    <main>
      {/* Slim brand hero */}
      <section className="grain border-b border-kot-line bg-kot-cream">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-10 text-center sm:py-12">
          <Image
            src="/kotfilm-icon.png"
            alt="Kotfilm, a cat gazing up beside a Soviet film reel and a red star"
            width={88}
            height={88}
            priority
            className="rounded-full shadow-sm ring-1 ring-kot-line"
          />
          <div>
            <h1 className="font-display text-4xl font-bold tracking-[0.16em] text-kot-red sm:text-5xl">
              KOTFILM
            </h1>
            <p className="mt-2 font-display text-sm uppercase tracking-[0.25em] text-kot-char">
              Catnip for Soviet Film Lovers
            </p>
          </div>

          <form
            action="/films"
            method="get"
            role="search"
            className="mt-1 flex w-full max-w-md items-center gap-2"
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
            <Link
              href="/films"
              className="whitespace-nowrap rounded-full border border-kot-red px-4 py-2.5 font-display text-sm uppercase tracking-wider text-kot-red transition-colors hover:bg-kot-red hover:text-kot-creamHi"
            >
              All films
            </Link>
          </form>
        </div>
      </section>

      {/* Spotlight hero + Netflix-style browse rails */}
      <HomeBrowser rails={rails} featured={featured} />
    </main>
  );
}
