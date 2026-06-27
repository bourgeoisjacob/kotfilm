"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ExternalLink, Info } from "lucide-react";
import TrustBadge from "@/components/film/TrustBadge";
import type { HomePoster } from "@/lib/queries";
import { getEmbed } from "@/components/home/embed";

export default function FilmPlayerModal({
  film,
  onClose,
}: {
  film: HomePoster | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!film) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [film, onClose]);

  if (!film) return null;
  const embed = getEmbed(film.watchUrl, film.watchSourceType);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${film.title} (${film.year})`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mt-4 w-full max-w-3xl overflow-hidden rounded-xl border border-kot-line bg-kot-creamHi shadow-2xl sm:mt-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-kot-ink/70 text-kot-creamHi transition-colors hover:bg-kot-ink"
        >
          <X aria-hidden className="h-5 w-5" />
        </button>

        {/* Player or poster */}
        <div className="relative aspect-video w-full bg-kot-ink">
          {embed.kind === "youtube" || embed.kind === "archive" ? (
            <iframe
              src={embed.embedUrl}
              title={`${film.title} (${film.year})`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <>
              {film.posterUrl ? (
                <Image
                  src={film.posterUrl}
                  alt=""
                  fill
                  sizes="768px"
                  className="object-cover opacity-70"
                />
              ) : null}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-kot-ink/50 p-6 text-center">
                <p className="max-w-md text-sm text-kot-creamHi">
                  This film is available on an external source that Kotfilm does not
                  embed. You can watch it for free at the linked source.
                </p>
                {embed.openUrl && (
                  <a
                    href={embed.openUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-kot-red px-5 py-2 font-display text-sm uppercase tracking-wider text-kot-creamHi transition-colors hover:bg-kot-redDeep"
                  >
                    <ExternalLink aria-hidden className="h-4 w-4" />
                    Open {film.watchPlatform ?? "source"}
                  </a>
                )}
              </div>
            </>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-3 p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="font-display text-2xl font-bold leading-tight tracking-wide text-kot-ink">
                {film.title}
              </h2>
              {film.originalTitle && (
                <p className="text-sm italic text-kot-char/80">{film.originalTitle}</p>
              )}
              <p className="mt-1 text-sm text-kot-char">
                {film.year}
                {film.director && <> · {film.director}</>}
              </p>
            </div>
            {film.watchSourceType && <TrustBadge sourceType={film.watchSourceType} />}
          </div>

          <p className="text-sm leading-relaxed text-kot-ink">{film.summary}</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
            <Link
              href={`/films/${film.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-kot-red underline-offset-4 hover:underline"
            >
              <Info aria-hidden className="h-4 w-4" />
              More about this film
            </Link>
            {embed.kind !== "none" && embed.openUrl && (
              <a
                href={embed.openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-kot-char underline-offset-4 hover:text-kot-red hover:underline"
              >
                <ExternalLink aria-hidden className="h-4 w-4" />
                Open on {film.watchPlatform ?? "source"}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
