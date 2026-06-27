import { Globe, ExternalLink } from "lucide-react";
import { regionalYouTubeSearch, archiveSearch } from "@/lib/regionLinks";

// Shown when the viewer is outside the regions where Russian-studio uploads
// reliably play. Offers ways to reach a copy that works where they are.
export default function RegionWatchNote({
  title,
  year,
  compact = false,
}: {
  title: string;
  year: number;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-kot-line bg-kot-creamHi p-3 text-sm text-kot-char ${
        compact ? "" : "mt-1"
      }`}
    >
      <p className="flex items-start gap-2">
        <Globe aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-kot-char/70" />
        <span>
          Some official Soviet-studio uploads are geo-blocked by YouTube outside
          Europe. If it will not play where you are, find a copy available in your
          region:
        </span>
      </p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 pl-6">
        <a
          href={regionalYouTubeSearch(title, year)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-kot-red underline-offset-4 hover:underline"
        >
          <ExternalLink aria-hidden className="h-3.5 w-3.5" />
          Search YouTube
        </a>
        <a
          href={archiveSearch(title)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-kot-red underline-offset-4 hover:underline"
        >
          <ExternalLink aria-hidden className="h-3.5 w-3.5" />
          Search the Internet Archive
        </a>
      </div>
    </div>
  );
}
