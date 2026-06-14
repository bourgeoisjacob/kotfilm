"use client";

import { useState, useTransition } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useWatchlist, type WatchlistItem } from "@/lib/watchlist";
import { addWatchlist, removeWatchlist } from "@/lib/actions/personalization";

type Props = {
  film: Omit<WatchlistItem, "addedAt">;
  /** Film id, required for the signed-in (database) path. */
  filmId?: string;
  /** When true, persist to the account's watchlist instead of localStorage. */
  signedIn?: boolean;
  /** Initial DB state when signed in. */
  initialSaved?: boolean;
  variant?: "icon" | "full";
};

export default function WatchlistButton({
  film,
  filmId,
  signedIn = false,
  initialSaved = false,
  variant = "icon",
}: Props) {
  const local = useWatchlist();
  const [savedDb, setSavedDb] = useState(initialSaved);
  const [, startTransition] = useTransition();

  const saved = signedIn ? savedDb : local.has(film.slug);

  const onClick = (e: React.MouseEvent) => {
    // Cards wrap the whole tile in a link; don't navigate when toggling.
    e.preventDefault();
    e.stopPropagation();

    if (signedIn) {
      if (!filmId) return;
      const next = !savedDb;
      setSavedDb(next);
      startTransition(() => {
        if (next) addWatchlist(filmId);
        else removeWatchlist(filmId);
      });
    } else if (saved) {
      local.remove(film.slug);
    } else {
      local.add(film);
    }
  };

  const label = saved ? "Remove from watchlist" : "Add to watchlist";
  const Icon = saved ? BookmarkCheck : Bookmark;

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={saved}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-display text-sm uppercase tracking-wider transition-colors ${
          saved
            ? "bg-kot-red text-kot-creamHi hover:bg-kot-redDeep"
            : "border border-kot-red text-kot-red hover:bg-kot-red hover:text-kot-creamHi"
        }`}
      >
        <Icon aria-hidden className="h-4 w-4" />
        {saved ? "In your watchlist" : "Add to watchlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-colors ${
        saved
          ? "border-kot-red bg-kot-red text-kot-creamHi"
          : "border-kot-line bg-kot-creamHi text-kot-ink hover:border-kot-red hover:text-kot-red"
      }`}
    >
      <Icon aria-hidden className="h-4 w-4" />
    </button>
  );
}
