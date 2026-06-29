import Image from "next/image";
import Link from "next/link";
import { filmImages, personImages } from "@/lib/imageData";
import ImageCredit from "@/components/ImageCredit";

// Inline link to a film page; film titles are italicised by convention.
export function FilmLink({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <Link
      href={`/films/${slug}`}
      className="font-medium italic text-kot-red underline-offset-2 hover:underline"
    >
      {children}
    </Link>
  );
}

// Inline link to a director or actor page.
export function PersonLink({
  slug,
  role = "directors",
  children,
}: {
  slug: string;
  role?: "directors" | "actors";
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/${role}/${slug}`}
      className="font-medium text-kot-red underline-offset-2 hover:underline"
    >
      {children}
    </Link>
  );
}

// A captioned, licensed image that links through to its film/person page.
export function Figure({
  kind,
  slug,
  role = "directors",
  caption,
}: {
  kind: "film" | "person";
  slug: string;
  role?: "directors" | "actors";
  caption?: string;
}) {
  const rec = (kind === "film" ? filmImages : personImages)[slug];
  if (!rec) return null;
  const href = kind === "film" ? `/films/${slug}` : `/${role}/${slug}`;
  return (
    <figure className="w-full">
      <Link
        href={href}
        className="block overflow-hidden rounded-lg border border-kot-line transition-colors hover:border-kot-red"
      >
        <span className="relative block aspect-[3/4] bg-kot-cream">
          <Image
            src={rec.url}
            alt={caption ?? ""}
            fill
            sizes="(max-width: 640px) 45vw, 200px"
            className="object-cover"
          />
        </span>
      </Link>
      {caption && (
        <figcaption className="mt-1 font-display text-xs leading-tight tracking-wide text-kot-ink">
          {caption}
        </figcaption>
      )}
      <ImageCredit asset={rec} />
    </figure>
  );
}

// A responsive row of figures.
export function FigureRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
}
