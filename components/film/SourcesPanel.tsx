import { ExternalLink } from "lucide-react";
import type { FilmDetail } from "@/lib/queries";

export default function SourcesPanel({ film }: { film: FilmDetail }) {
  const { sourceReferences, imageAssets, wikipediaUrl, commonsCategoryUrl, imdbId } =
    film;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-kot-line bg-kot-cream p-5 text-sm text-kot-char">
      <p>
        The summary, historical context, and impact notes above are{" "}
        <strong className="text-kot-ink">original text written for Kotfilm</strong>,
        not copied from any source. Facts are drawn from the references below and
        should be re-verified before publication.
      </p>

      {sourceReferences.length > 0 && (
        <div>
          <h3 className="font-display text-xs uppercase tracking-[0.18em] text-kot-red">
            References
          </h3>
          <ul className="mt-2 flex flex-col gap-2">
            {sourceReferences.map((ref) => (
              <li key={ref.id}>
                <span className="font-semibold text-kot-ink">{ref.sourceType}</span>
                {ref.title ? ` — ${ref.title}` : ""}
                {ref.url && (
                  <>
                    {" "}
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-kot-red underline-offset-4 hover:underline"
                    >
                      <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                      link
                    </a>
                  </>
                )}
                {ref.note && <span className="block text-kot-char/80">{ref.note}</span>}
                {ref.licenseInfo && (
                  <span className="block text-xs text-kot-char/70">
                    License: {ref.licenseInfo}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {imageAssets.length > 0 && (
        <div>
          <h3 className="font-display text-xs uppercase tracking-[0.18em] text-kot-red">
            Image credits
          </h3>
          <ul className="mt-2 flex flex-col gap-1">
            {imageAssets.map((img) => (
              <li key={img.id}>
                {img.attribution ?? "Uncredited"}
                {img.licenseName ? ` — ${img.licenseName}` : ""}
                {img.licenseUrl && (
                  <>
                    {" "}
                    <a
                      href={img.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-kot-red underline-offset-4 hover:underline"
                    >
                      (license)
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(wikipediaUrl || commonsCategoryUrl || imdbId) && (
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {imdbId && (
            <a
              href={`https://www.imdb.com/title/${imdbId}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-kot-red underline-offset-4 hover:underline"
            >
              <ExternalLink aria-hidden className="h-3.5 w-3.5" />
              IMDb
            </a>
          )}
          {wikipediaUrl && (
            <a
              href={wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-kot-red underline-offset-4 hover:underline"
            >
              <ExternalLink aria-hidden className="h-3.5 w-3.5" />
              Wikipedia
            </a>
          )}
          {commonsCategoryUrl && (
            <a
              href={commonsCategoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-kot-red underline-offset-4 hover:underline"
            >
              <ExternalLink aria-hidden className="h-3.5 w-3.5" />
              Wikimedia Commons
            </a>
          )}
        </div>
      )}

      <p className="text-xs text-kot-char/70">
        Kotfilm is an independent guide and is not affiliated with any studio,
        platform, or archive named here.
      </p>
    </div>
  );
}
