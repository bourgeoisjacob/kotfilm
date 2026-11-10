"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Clapperboard, Home, Menu, Users, X } from "lucide-react";
import AuthNav from "@/components/auth/AuthNav";
import RegionSelector from "@/components/RegionSelector";

// Phone-only bottom tab bar (the desktop header nav is hidden below `sm`).
// Secondary pages, account and region live in the "More" sheet.
const tabs = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  { href: "/films", label: "Films", icon: Clapperboard, match: (p: string) => p.startsWith("/films") },
  {
    href: "/directors",
    label: "People",
    icon: Users,
    match: (p: string) => p.startsWith("/directors") || p.startsWith("/actors"),
  },
  { href: "/watchlist", label: "Watchlist", icon: Bookmark, match: (p: string) => p.startsWith("/watchlist") },
];

const moreLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/directors", label: "Directors" },
  { href: "/actors", label: "Actors" },
  { href: "/genres", label: "Genres" },
  { href: "/about", label: "About" },
  { href: "/sources", label: "Data sources" },
];

export default function MobileNav({
  detectedCountry,
  override,
}: {
  detectedCountry: string | null;
  override: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const item =
    "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 font-display text-[0.65rem] uppercase tracking-wider transition-colors";

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 sm:hidden" role="dialog" aria-modal aria-label="More">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-kot-ink/50"
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-kot-line bg-kot-cream px-5 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-sm uppercase tracking-[0.2em] text-kot-red">
                More
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-kot-ink/70 hover:text-kot-red"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-2 font-display text-sm uppercase tracking-wider">
              {moreLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg border border-kot-line bg-kot-creamHi px-3 py-2.5 text-kot-ink transition-colors hover:border-kot-red hover:text-kot-red"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-kot-line pt-4 font-display text-sm uppercase tracking-wider">
              <AuthNav />
              <RegionSelector detectedCountry={detectedCountry} override={override} />
            </div>
          </div>
        </div>
      )}

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-kot-line bg-kot-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
      >
        <ul className="flex">
          {tabs.map(({ href, label, icon: Icon, match }) => {
            const active = !open && match(pathname);
            return (
              <li key={href} className="flex flex-1">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`${item} ${active ? "text-kot-red" : "text-kot-ink/70"}`}
                >
                  <Icon aria-hidden className="h-5 w-5" />
                  {label}
                </Link>
              </li>
            );
          })}
          <li className="flex flex-1">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className={`${item} ${open ? "text-kot-red" : "text-kot-ink/70"}`}
            >
              <Menu aria-hidden className="h-5 w-5" />
              More
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
