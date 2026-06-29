import Image from "next/image";
import Link from "next/link";
import AuthNav from "@/components/auth/AuthNav";
import RegionSelector from "@/components/RegionSelector";
import { getViewerRegion } from "@/lib/region";

const navItems = [
  { href: "/learn", label: "Learn" },
  { href: "/films", label: "Catalogue" },
  { href: "/genres", label: "Genres" },
  { href: "/directors", label: "Directors" },
  { href: "/actors", label: "Actors" },
  { href: "/about", label: "About" },
];

export default async function SiteHeader() {
  const region = await getViewerRegion();
  return (
    <header className="border-b border-kot-line bg-kot-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/kotfilm-icon.png"
            alt="Kotfilm home"
            width={48}
            height={48}
            priority
            className="rounded-full"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl font-bold tracking-[0.18em] text-kot-red">
              KOTFILM
            </span>
            <span className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-kot-char/80">
              Catnip for Soviet Film Lovers
            </span>
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-display text-sm uppercase tracking-wider">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-kot-ink/80 transition-colors hover:text-kot-red"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <AuthNav />
            </li>
            <li>
              <RegionSelector
                detectedCountry={region.detectedCountry}
                override={region.override}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
