import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type LibraryItem = {
  href: string;
  title: string;
  subtitle?: string;
};

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
            <span className="flex flex-col leading-tight">
              <span className="font-display font-semibold tracking-wide text-kot-ink group-hover:text-kot-red">
                {item.title}
              </span>
              {item.subtitle && (
                <span className="text-xs uppercase tracking-wider text-kot-char/75">
                  {item.subtitle}
                </span>
              )}
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
