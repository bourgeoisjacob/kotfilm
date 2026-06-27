// Minimal image attribution. Wikimedia Commons images are reused under licenses
// (CC-BY, CC-BY-SA, etc.) that require crediting the author, so we keep a small
// credit beneath the image even though the larger "Sources" panel was removed.
export default function ImageCredit({
  asset,
}: {
  asset?: {
    attribution?: string | null;
    licenseName?: string | null;
    licenseUrl?: string | null;
  } | null;
}) {
  if (!asset?.attribution) return null;
  return (
    <p className="mt-1 text-[0.6rem] leading-tight text-kot-char/55">
      {asset.attribution}
      {asset.licenseName ? `, ${asset.licenseName}` : ""}
      {asset.licenseUrl && (
        <>
          {" "}
          <a
            href={asset.licenseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            (license)
          </a>
        </>
      )}
    </p>
  );
}
