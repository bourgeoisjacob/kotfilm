import { cookies, headers } from "next/headers";

// Countries where the official Soviet-studio YouTube uploads (Mosfilm's Russian
// channel, 4K restorations, etc.) generally play: Europe plus Russia and the
// other former-Soviet states. Elsewhere (the US and most of the world) those
// uploads are frequently geo-blocked, so we surface a "find a copy in your
// region" fallback.
const PLAYS_OK = new Set([
  "AL", "AD", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FI",
  "FR", "DE", "GR", "HU", "IS", "IE", "IT", "XK", "LV", "LI", "LT", "LU", "MT",
  "MD", "MC", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "RU", "SM", "RS", "SK",
  "SI", "ES", "SE", "CH", "UA", "GB", "VA",
  // Former-Soviet states where these channels are also available
  "AM", "AZ", "GE", "KZ", "KG", "TJ", "TM", "UZ",
]);

export type ViewerRegion = {
  /** Russian-studio uploads are likely geo-restricted for this viewer. */
  restricted: boolean;
  /** Detected ISO country code (from the CDN), or null when unknown. */
  detectedCountry: string | null;
  /** Manual override cookie value: "" (auto), "eu", or "row". */
  override: string;
};

export async function getViewerRegion(): Promise<ViewerRegion> {
  const override = (await cookies()).get("kf_region")?.value ?? "";
  const detectedCountry =
    ((await headers()).get("x-vercel-ip-country") || "").toUpperCase() || null;

  let restricted: boolean;
  if (override === "eu") restricted = false;
  else if (override === "row") restricted = true;
  else restricted = detectedCountry ? !PLAYS_OK.has(detectedCountry) : false;

  return { restricted, detectedCountry, override };
}
