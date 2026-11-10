import Image from "next/image";
import Link from "next/link";
import AuthNav from "@/components/auth/AuthNav";
import RegionSelector from "@/components/RegionSelector";
import MobileNav from "@/components/MobileNav";
import { getViewerRegion } from "@/lib/region";

const navItems = [
  { href: "/learn", label: "Learn" },
  { href: "/films", label: "Catalogue" },
  { href: "/directors", label: "Directors" },
  { href: "/actors", label: "Actors" },
  { href: "/about", label: "About" },
];

export default async function SiteHeader() {
  const region = await getViewerRegion();
  return (
    <header className="border-b border-kot-line bg-kot-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-2 sm:px-6 sm:py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/kotfilm-icon.png"
            alt="Kotfilm home"
            width={48}
            height={48}
            priority
            className="h-10 w-10 rounded-full sm:h-12 sm:w-12"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-[0.18em] text-kot-red sm:text-2xl">
              KOTFILM
            </span>
            <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-kot-char/80 sm:text-[0.7rem]">
              Catnip for Soviet Film Lovers
            </span>
          </span>
        </Link>

        {/* Phones navigate with the bottom tab bar instead (MobileNav). */}
        <nav aria-label="Primary" className="hidden sm:block">
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
      <MobileNav detectedCountry={region.detectedCountry} override={region.override} />
    </header>
  );
}
