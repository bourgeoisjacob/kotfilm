"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";
import type { HomePoster, HomeRail } from "@/lib/queries";
import FilmPlayerModal from "@/components/home/FilmPlayerModal";

function Spotlight({
  films,
  onOpen,
}: {
  films: HomePoster[];
  onOpen: (f: HomePoster) => void;
}) {
  const [i, setI] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (films.length < 2) return;
    const t = setInterval(() => {
      if (!paused.current) setI((n) => (n + 1) % films.length);
    }, 7000);
    return () => clearInterval(t);
  }, [films.length]);

  if (films.length === 0) return null;
  const film = films[i];

  return (
    <section
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      className="relative h-[380px] w-full overflow-hidden border-b border-kot-line bg-kot-ink sm:h-[460px]"
    >
      {film.posterUrl && (
        <Image
          key={film.slug}
          src={film.posterUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      )}
      {/* Legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-kot-ink via-kot-ink/55 to-kot-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-kot-ink/85 via-kot-ink/30 to-transparent" />

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-12">
          <p className="font-display text-xs uppercase tracking-[0.25em] text-kot-gold">
            Featured film
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold leading-tight tracking-wide text-kot-creamHi sm:text-5xl">
            {film.title}
          </h2>
          <p className="mt-1 text-sm text-kot-cream/80">
            {film.year}
            {film.director && <> · {film.director}</>}
          </p>
          <p className="mt-3 hidden max-w-xl text-sm leading-relaxed text-kot-cream/85 sm:line-clamp-3">
            {film.summary}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => onOpen(film)}
              className="inline-flex items-center gap-2 rounded-full bg-kot-red px-6 py-2.5 font-display text-sm uppercase tracking-wider text-kot-creamHi transition-colors hover:bg-kot-redDeep"
            >
              <Play aria-hidden className="h-4 w-4 fill-current" />
              Play
            </button>
            <Link
              href={`/films/${film.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-kot-cream/40 bg-kot-ink/30 px-5 py-2.5 font-display text-sm uppercase tracking-wider text-kot-creamHi backdrop-blur-sm transition-colors hover:border-kot-cream"
            >
              <Info aria-hidden className="h-4 w-4" />
              More info
            </Link>
          </div>

          {films.length > 1 && (
            <div className="mt-5 flex gap-2">
              {films.map((f, n) => (
                <button
                  key={f.slug}
                  aria-label={`Show ${f.title}`}
                  onClick={() => setI(n)}
                  className={`h-1.5 rounded-full transition-all ${
                    n === i ? "w-6 bg-kot-red" : "w-3 bg-kot-cream/40 hover:bg-kot-cream/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PosterCard({
  film,
  onOpen,
}: {
  film: HomePoster;
  onOpen: (f: HomePoster) => void;
}) {
  return (
    <button
      onClick={() => onOpen(film)}
      className="group w-44 shrink-0 text-left sm:w-56"
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-kot-line bg-kot-char transition-colors group-hover:border-kot-red">
        {film.posterUrl ? (
          <Image
            src={film.posterUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 176px, 224px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="font-display text-3xl font-bold tracking-widest text-kot-cream/25">
            {film.year}
          </span>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-kot-ink/0 transition-colors group-hover:bg-kot-ink/40">
          <span className="flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-kot-red/90 text-kot-creamHi opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
            <Play aria-hidden className="h-5 w-5 fill-current" />
          </span>
        </span>
      </div>
      <p className="mt-1.5 line-clamp-1 font-display text-sm font-semibold tracking-wide text-kot-ink group-hover:text-kot-red">
        {film.title}
      </p>
      <p className="text-xs text-kot-char/75">
        {film.year}
        {film.director && <> · {film.director}</>}
      </p>
    </button>
  );
}

function Rail({
  rail,
  onOpen,
}: {
  rail: HomeRail;
  onOpen: (f: HomePoster) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: "smooth" });

  return (
    <section className="group/rail">
      <h2 className="mb-2 font-display text-lg font-semibold uppercase tracking-[0.14em] text-kot-red">
        {rail.title}
      </h2>
      <div className="relative">
        <div
          ref={ref}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {rail.films.map((f) => (
            <PosterCard key={f.slug} film={f} onOpen={onOpen} />
          ))}
        </div>
        <button
          aria-label="Scroll left"
          onClick={() => scrollBy(-1)}
          className="absolute left-0 top-[28%] hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-kot-line bg-kot-creamHi/95 text-kot-ink opacity-0 shadow transition-opacity hover:text-kot-red group-hover/rail:opacity-100 sm:flex"
        >
          <ChevronLeft aria-hidden className="h-5 w-5" />
        </button>
        <button
          aria-label="Scroll right"
          onClick={() => scrollBy(1)}
          className="absolute right-0 top-[28%] hidden h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-kot-line bg-kot-creamHi/95 text-kot-ink opacity-0 shadow transition-opacity hover:text-kot-red group-hover/rail:opacity-100 sm:flex"
        >
          <ChevronRight aria-hidden className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

export default function HomeBrowser({
  rails,
  featured = [],
}: {
  rails: HomeRail[];
  featured?: HomePoster[];
}) {
  const [selected, setSelected] = useState<HomePoster | null>(null);
  return (
    <>
      <Spotlight films={featured} onOpen={setSelected} />
      <div className="mx-auto flex max-w-6xl flex-col gap-9 px-4 py-10 sm:px-6">
        {rails.map((rail) => (
          <Rail key={rail.key} rail={rail} onOpen={setSelected} />
        ))}
      </div>
      <FilmPlayerModal film={selected} onClose={() => setSelected(null)} />
    </>
  );
}
