import { getJson, stripHtml } from "./http";

// Fetches image license metadata from Wikimedia Commons and returns it ONLY if
// the license clearly permits reuse. Anything non-free (or with unknown
// licensing) is skipped — we never import media we can't show the rights for.

export type CommonsImage = {
  fileName: string;
  url: string;
  descriptionUrl: string;
  licenseName: string;
  licenseUrl?: string;
  attribution: string;
};

// Machine-readable license codes (extmetadata.License) that permit reuse.
const FREE_LICENSE_PREFIXES = ["cc0", "cc-by", "cc-by-sa", "pd", "publicdomain"];

function isFreeLicense(code: string | undefined, shortName: string): boolean {
  const c = (code ?? "").toLowerCase();
  if (FREE_LICENSE_PREFIXES.some((p) => c.startsWith(p))) return true;
  const s = shortName.toLowerCase();
  return s.includes("public domain") || s.startsWith("cc ") || s.includes("cc0");
}

type ExtMeta = Record<string, { value?: string }>;

export async function fetchCommonsImage(
  fileName: string,
): Promise<CommonsImage | null> {
  const title = `File:${fileName}`;
  const url =
    `https://commons.wikimedia.org/w/api.php?action=query&format=json` +
    `&prop=imageinfo&iiprop=url|extmetadata&titles=${encodeURIComponent(title)}`;

  const data = await getJson<{
    query?: { pages?: Record<string, { imageinfo?: { url: string; descriptionurl: string; extmetadata?: ExtMeta }[] }> };
  }>(url);

  const pages = data.query?.pages;
  const page = pages ? Object.values(pages)[0] : undefined;
  const info = page?.imageinfo?.[0];
  if (!info) return null;

  const meta = info.extmetadata ?? {};
  const licenseCode = meta.License?.value;
  const licenseName =
    meta.LicenseShortName?.value ?? meta.UsageTerms?.value ?? "Unknown";

  if (!isFreeLicense(licenseCode, licenseName)) {
    return null; // skip non-free / unknown-license media
  }

  const artist = meta.Artist?.value ? stripHtml(meta.Artist.value) : "";
  const credit = meta.Credit?.value ? stripHtml(meta.Credit.value) : "";
  const attribution = [artist, credit].filter(Boolean).join(" / ") || "Wikimedia Commons";

  return {
    fileName,
    url: info.url,
    descriptionUrl: info.descriptionurl,
    licenseName,
    licenseUrl: meta.LicenseUrl?.value,
    attribution,
  };
}
