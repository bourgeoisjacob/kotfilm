"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { HomePoster, HomeRail } from "@/lib/queries";
import FilmPlayerModal from "@/components/home/FilmPlayerModal";

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

export default function HomeBrowser({ rails }: { rails: HomeRail[] }) {
  const [selected, setSelected] = useState<HomePoster | null>(null);
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-9 px-4 py-10 sm:px-6">
      {rails.map((rail) => (
        <Rail key={rail.key} rail={rail} onOpen={setSelected} />
      ))}
      <FilmPlayerModal film={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
