import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type LibraryItem = {
  href: string;
  title: string;
  subtitle?: string;
  /** Optional portrait thumbnail (people). When set, shown as a round avatar. */
  imageUrl?: string;
  /** When `avatar` is true but no imageUrl, show these initials instead. */
  avatar?: boolean;
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default function LibraryGrid({
  items,
  empty,
}: {
  items: LibraryItem[];
  empty: string;
}) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-kot-line bg-kot-cream p-8 text-center text-sm text-kot-char">
        {empty}
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex items-center justify-between gap-2 rounded-lg border border-kot-line bg-kot-cream px-4 py-3 transition-colors hover:border-kot-red"
          >
            <span className="flex min-w-0 items-center gap-3">
              {item.avatar &&
                (item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-kot-char font-display text-xs font-semibold text-kot-creamHi"
                  >
                    {initials(item.title)}
                  </span>
                ))}
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="truncate font-display font-semibold tracking-wide text-kot-ink group-hover:text-kot-red">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="text-xs uppercase tracking-wider text-kot-char/75">
                    {item.subtitle}
                  </span>
                )}
              </span>
            </span>
            <ChevronRight
              aria-hidden
              className="h-4 w-4 shrink-0 text-kot-char/50 group-hover:text-kot-red"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
