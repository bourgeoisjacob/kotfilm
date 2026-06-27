import { ExternalLink } from "lucide-react";
import TrustBadge from "@/components/film/TrustBadge";
import type { FilmDetail } from "@/lib/queries";

// Most-trusted first.
const TRUST_ORDER = ["OFFICIAL", "ARCHIVE", "PUBLIC_REPOSITORY", "UNVERIFIED"];
const rank = (sourceType: string) => {
  const i = TRUST_ORDER.indexOf(sourceType);
  return i === -1 ? TRUST_ORDER.length : i;
};

type IntlLink = { url: string; sourceType: string; platform: string; label: string };

export default function WatchLinks({
  watchLinks,
  regionRestricted = false,
  intlLink,
}: {
  watchLinks: FilmDetail["watchLinks"];
  regionRestricted?: boolean;
  intlLink?: IntlLink;
}) {
  if (watchLinks.length === 0) {
    return (
      <p className="text-sm text-kot-char">
        No watch links recorded yet. Kotfilm only lists free, legal sources.
      </p>
    );
  }

  const links = [...watchLinks].sort((a, b) => rank(a.sourceType) - rank(b.sourceType));
  // The curation pass verified every film's US availability, so we only surface a
  // region link for the films actually geo-blocked outside Europe.
  const showIntl = regionRestricted && !!intlLink;

  return (
    <ul className="flex flex-col gap-3">
      {showIntl && (
        <li className="flex flex-col gap-2 rounded-lg border border-kot-red/40 bg-kot-cream p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-display font-semibold tracking-wide text-kot-ink">
              Available in your region
              <span className="ml-2 text-sm font-normal text-kot-char/75">
                on {intlLink!.platform}
              </span>
            </span>
            <TrustBadge sourceType={intlLink!.sourceType} />
          </div>
          <p className="text-sm text-kot-char">
            The primary upload below may be geo-blocked outside Europe; this copy
            ({intlLink!.label}) plays in your region.
          </p>
          <a
            href={intlLink!.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-kot-red underline-offset-4 hover:underline"
          >
            <ExternalLink aria-hidden className="h-4 w-4" />
            Open link
          </a>
        </li>
      )}
      {links.map((link) => (
        <li
          key={link.id}
          className="flex flex-col gap-2 rounded-lg border border-kot-line bg-kot-cream p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-display font-semibold tracking-wide text-kot-ink">
              {link.label}
              {link.platform && (
                <span className="ml-2 text-sm font-normal text-kot-char/75">
                  on {link.platform}
                </span>
              )}
            </span>
            <TrustBadge sourceType={link.sourceType} />
          </div>

          {link.rightsNote && (
            <p className="text-sm text-kot-char">{link.rightsNote}</p>
          )}

          {link.url ? (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-kot-red underline-offset-4 hover:underline"
            >
              <ExternalLink aria-hidden className="h-4 w-4" />
              Open link
            </a>
          ) : (
            <p className="text-sm italic text-kot-char/70">
              Link pending verification, not yet published.
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
