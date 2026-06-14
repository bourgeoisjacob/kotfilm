"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useWatchlist } from "@/lib/watchlist";
import { mergeLocalWatchlist } from "@/lib/actions/personalization";

// On first sign-in, merge any signed-out localStorage watchlist into the
// account, then clear the local copy so the DB becomes the single source.
export default function WatchlistSync() {
  const { status } = useSession();
  const { items, clear } = useWatchlist();
  const mergedRef = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || mergedRef.current) return;
    mergedRef.current = true;

    if (items.length === 0) return;
    const slugs = items.map((i) => i.slug);
    mergeLocalWatchlist(slugs)
      .then(() => clear())
      .catch(() => {
        mergedRef.current = false; // allow a retry on a later render
      });
  }, [status, items, clear]);

  return null;
}
