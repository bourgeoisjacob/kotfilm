"use client";

import { useState, useTransition } from "react";
import { Heart, Eye, Star } from "lucide-react";
import {
  clearRating,
  setRating,
  toggleFavorite,
  toggleWatched,
} from "@/lib/actions/personalization";
import type { FilmUserState } from "@/lib/userData";

export default function PersonalControls({
  filmId,
  initial,
}: {
  filmId: string;
  initial: FilmUserState;
}) {
  const [rating, setRatingState] = useState<number | null>(initial.rating);
  const [favorite, setFavorite] = useState(initial.isFavorite);
  const [watched, setWatched] = useState(initial.watched);
  const [, startTransition] = useTransition();

  const rate = (value: number) => {
    const next = value === rating ? null : value;
    setRatingState(next);
    startTransition(() => {
      if (next === null) clearRating(filmId);
      else setRating(filmId, next);
    });
  };

  const onFavorite = () => {
    setFavorite((v) => !v);
    startTransition(() => toggleFavorite(filmId));
  };

  const onWatched = () => {
    setWatched((v) => !v);
    startTransition(() => toggleWatched(filmId));
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-kot-line bg-kot-cream p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-display text-sm uppercase tracking-wider text-kot-char">
          Your rating
        </span>
        <div className="flex items-center gap-1" role="group" aria-label="Rate this film 1 to 5 stars">
          {[1, 2, 3, 4, 5].map((star) => {
            const active = rating !== null && star <= rating;
            return (
              <button
                key={star}
                type="button"
                onClick={() => rate(star)}
                aria-label={`${star} star${star === 1 ? "" : "s"}`}
                aria-pressed={active}
                className="text-kot-gold transition-transform hover:scale-110"
              >
                <Star
                  aria-hidden
                  className={`h-6 w-6 ${active ? "fill-current" : "fill-transparent text-kot-line"}`}
                />
              </button>
            );
          })}
        </div>
        {rating !== null && (
          <button
            type="button"
            onClick={() => rate(rating)}
            className="text-xs text-kot-char underline-offset-4 hover:text-kot-red hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onFavorite}
          aria-pressed={favorite}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            favorite
              ? "bg-kot-red text-kot-creamHi hover:bg-kot-redDeep"
              : "border border-kot-line text-kot-ink hover:border-kot-red hover:text-kot-red"
          }`}
        >
          <Heart aria-hidden className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
          {favorite ? "Favourited" : "Favourite"}
        </button>

        <button
          type="button"
          onClick={onWatched}
          aria-pressed={watched}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            watched
              ? "bg-kot-ink text-kot-creamHi hover:bg-kot-char"
              : "border border-kot-line text-kot-ink hover:border-kot-red hover:text-kot-red"
          }`}
        >
          <Eye aria-hidden className="h-4 w-4" />
          {watched ? "Watched" : "Mark watched"}
        </button>
      </div>
    </div>
  );
}
