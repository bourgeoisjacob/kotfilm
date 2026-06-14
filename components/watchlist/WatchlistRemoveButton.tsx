"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { removeWatchlist } from "@/lib/actions/personalization";

export default function WatchlistRemoveButton({
  filmId,
  title,
}: {
  filmId: string;
  title: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await removeWatchlist(filmId);
          router.refresh();
        })
      }
      aria-label={`Remove ${title} from watchlist`}
      title="Remove"
      className="z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-kot-line bg-kot-creamHi text-kot-ink transition-colors hover:border-kot-red hover:text-kot-red disabled:opacity-50"
    >
      <X aria-hidden className="h-4 w-4" />
    </button>
  );
}
