"use client";

import { useEffect, useState } from "react";

export type Era = { id: string; label: string; years: string };

// Sticky left-hand timeline. Highlights the era currently in view (via an
// IntersectionObserver on each section) and fills the rail up to it, so the
// marker "moves" as you scroll through the history.
export default function EraTimeline({ eras }: { eras: Era[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = eras
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (inView[0]) {
          const idx = eras.findIndex((e) => e.id === inView[0].target.id);
          if (idx >= 0) setActive(idx);
        }
      },
      // Treat a section as "current" once it reaches the upper third of the view.
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [eras]);

  const fillPct = eras.length > 1 ? (active / (eras.length - 1)) * 100 : 0;

  return (
    <nav aria-label="Eras" className="sticky top-8 hidden lg:block">
      <div className="relative">
        {/* track + animated fill */}
        <span
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-kot-line"
        />
        <span
          aria-hidden
          className="absolute left-[7px] top-2 w-[2px] bg-kot-red transition-all duration-500 ease-out"
          style={{ height: `${fillPct}%` }}
        />
        <ul className="flex flex-col gap-6">
          {eras.map((era, i) => {
            const done = i <= active;
            const current = i === active;
            return (
              <li key={era.id} className="relative pl-7">
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(era.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="group flex flex-col text-left"
                  aria-current={current ? "true" : undefined}
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 transition-colors ${
                      done
                        ? "border-kot-red bg-kot-red"
                        : "border-kot-line bg-kot-cream group-hover:border-kot-red"
                    }`}
                  />
                  <span
                    className={`text-[0.7rem] uppercase tracking-wider transition-colors ${
                      current ? "font-semibold text-kot-red" : "text-kot-char/70"
                    }`}
                  >
                    {era.years}
                  </span>
                  <span
                    className={`font-display text-sm leading-tight transition-colors ${
                      current ? "font-semibold text-kot-ink" : "text-kot-char group-hover:text-kot-red"
                    }`}
                  >
                    {era.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
