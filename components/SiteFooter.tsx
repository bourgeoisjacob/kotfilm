import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-kot-line bg-kot-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/kotfilm-icon.png"
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-display text-lg font-semibold tracking-[0.16em] text-kot-red">
            KOTFILM
          </span>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-kot-char/80">
          A curated, non-commercial guide to Soviet cinema, built on public and
          freely-licensed sources. Kotfilm does not host films and is not
          affiliated with Mosfilm, Lenfilm, or any studio, platform, or archive.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-kot-ink/80">
            <li>
              <Link className="transition-colors hover:text-kot-red" href="/films">
                Catalogue
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-kot-red" href="/sources">
                Data sources
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-kot-red" href="/privacy">
                Privacy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
