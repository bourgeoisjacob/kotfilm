import { useSyncExternalStore } from "react";

// Local-first watchlist (Phase 6). Stores a minimal film snapshot in
// localStorage so the watchlist renders without a server round-trip; cloud sync
// arrives with accounts in Phase 7.

export type WatchlistItem = {
  slug: string;
  title: string;
  year: number;
  director?: string | null;
  addedAt: number;
};

const KEY = "kotfilm:watchlist";
const EMPTY: WatchlistItem[] = [];

const listeners = new Set<() => void>();
// Cached snapshot so useSyncExternalStore gets a stable reference between writes.
let cache: WatchlistItem[] | null = null;

function read(): WatchlistItem[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as WatchlistItem[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function snapshot(): WatchlistItem[] {
  if (cache === null) cache = read();
  return cache;
}

function write(items: WatchlistItem[]) {
  cache = items;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  }
  listeners.forEach((l) => l());
}

function onStorage(e: StorageEvent) {
  if (e.key === KEY) {
    cache = read();
    listeners.forEach((l) => l());
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (listeners.size === 1 && typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

export function addToWatchlist(item: Omit<WatchlistItem, "addedAt">) {
  const items = snapshot();
  if (items.some((i) => i.slug === item.slug)) return;
  write([...items, { ...item, addedAt: Date.now() }]);
}

export function removeFromWatchlist(slug: string) {
  write(snapshot().filter((i) => i.slug !== slug));
}

export function clearWatchlist() {
  write([]);
}

/** Reactive watchlist state for client components. */
export function useWatchlist() {
  const items = useSyncExternalStore(subscribe, snapshot, () => EMPTY);
  return {
    items,
    count: items.length,
    has: (slug: string) => items.some((i) => i.slug === slug),
    add: addToWatchlist,
    remove: removeFromWatchlist,
    clear: clearWatchlist,
  };
}
