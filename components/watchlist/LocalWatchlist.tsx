"use client";

import Link from "next/link";
import { Bookmark, Trash2, X } from "lucide-react";
import { useWatchlist } from "@/lib/watchlist";

export default function LocalWatchlist() {
  const { items, count, remove, clear } = useWatchlist();
  const sorted = [...items].sort((a, b) => b.addedAt - a.addedAt);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
            Your watchlist
          </h1>
          <p className="mt-1 text-sm text-kot-char">
            {count} {count === 1 ? "film" : "films"} · saved on this device.{" "}
            <Link
              href="/signin"
              className="text-kot-red underline-offset-4 hover:underline"
            >
              Sign in
            </Link>{" "}
            to sync across devices.
          </p>
        </div>
        {count > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Clear your whole watchlist on this device?")) {
                clear();
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-md border border-kot-line px-3 py-2 text-sm text-kot-ink transition-colors hover:border-kot-red hover:text-kot-red"
          >
            <Trash2 aria-hidden className="h-3.5 w-3.5" />
            Clear all
          </button>
        )}
      </header>

      {count === 0 ? (
        <div className="rounded-lg border border-dashed border-kot-line bg-kot-cream p-10 text-center">
          <Bookmark aria-hidden className="mx-auto h-8 w-8 text-kot-char/50" />
          <p className="mt-3 font-display text-lg text-kot-ink">
            Your watchlist is empty.
          </p>
          <p className="mt-1 text-sm text-kot-char">
            Add films from the{" "}
            <Link href="/films" className="text-kot-red underline-offset-4 hover:underline">
              catalogue
            </Link>{" "}
            using the bookmark button.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((item) => (
            <li
              key={item.slug}
              className="group relative flex items-center justify-between gap-2 rounded-lg border border-kot-line bg-kot-cream px-4 py-3 transition-colors hover:border-kot-red"
            >
              <Link href={`/films/${item.slug}`} className="flex flex-col leading-tight">
                <span className="font-display font-semibold tracking-wide text-kot-ink group-hover:text-kot-red">
                  {item.title}
                </span>
                <span className="text-xs uppercase tracking-wider text-kot-char/75">
                  {item.year}
                  {item.director ? ` · ${item.director}` : ""}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => remove(item.slug)}
                aria-label={`Remove ${item.title} from watchlist`}
                title="Remove"
                className="z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-kot-line bg-kot-creamHi text-kot-ink transition-colors hover:border-kot-red hover:text-kot-red"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
