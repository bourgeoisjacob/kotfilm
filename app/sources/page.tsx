import type { Metadata } from "next";
import { Database, BookOpen, Image as ImageIcon, Clapperboard } from "lucide-react";

export const metadata: Metadata = {
  title: "Data sources — Kotfilm",
  description:
    "Where Kotfilm's information comes from, and how we handle copyright and attribution.",
};

const sources = [
  {
    icon: Database,
    name: "Wikidata",
    use: "Structured metadata — titles, years, people, studios, and identifiers used to link records together.",
  },
  {
    icon: BookOpen,
    name: "Wikipedia",
    use: "Background reading only. We read it to understand a film, then write our own concise, original summaries — we never copy its text.",
  },
  {
    icon: ImageIcon,
    name: "Wikimedia Commons",
    use: "Freely-licensed images. Each image stores its license and attribution; we use only media that is free to reuse.",
  },
  {
    icon: Clapperboard,
    name: "Official studio channels",
    use: "Free, legal places to watch — e.g. Mosfilm and Soyuzmultfilm releasing their own films. We link to these; we never host video ourselves.",
  },
];

const principles = [
  "We never host full films. Watch links point only to official or clearly-licensed sources.",
  "We never copy long summaries, biographies, or essays. Descriptions on Kotfilm are original and concise.",
  "Every film, person, image, and watch link stores a source URL and attribution.",
  "Images are used only with a known free license, which we record.",
  "Every watch link is labelled by trust level; an unverified link is never presented as official.",
  "Kotfilm is independent and implies no affiliation with any studio, platform, or archive.",
];

export default function SourcesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
          Data sources
        </h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-kot-char">
          Kotfilm is a curated guide built on public, freely-licensed information.
          Here is where our facts and media come from, and the rules we hold
          ourselves to.
        </p>
      </header>

      <section>
        <h2 className="font-display text-xl font-semibold uppercase tracking-[0.14em] text-kot-red">
          Where our information comes from
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {sources.map(({ icon: Icon, name, use }) => (
            <li
              key={name}
              className="rounded-lg border border-kot-line bg-kot-cream p-5"
            >
              <Icon aria-hidden className="h-6 w-6 text-kot-red" />
              <h3 className="mt-2 font-display text-lg font-semibold tracking-wide text-kot-ink">
                {name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-kot-char">{use}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold uppercase tracking-[0.14em] text-kot-red">
          Our copyright stance
        </h2>
        <ul className="mt-4 flex flex-col gap-2">
          {principles.map((p) => (
            <li
              key={p}
              className="flex gap-3 rounded-lg border border-kot-line bg-kot-cream p-4 text-sm leading-relaxed text-kot-ink"
            >
              <span aria-hidden className="font-display font-bold text-kot-red">
                ·
              </span>
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold uppercase tracking-[0.14em] text-kot-red">
          Watch-link trust levels
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-kot-char">
          On each film page, every place to watch is badged:{" "}
          <strong className="text-kot-ink">Official source</strong> (the rights
          holder&rsquo;s own release),{" "}
          <strong className="text-kot-ink">Archive</strong> and{" "}
          <strong className="text-kot-ink">Public repository</strong> (legitimate
          libraries of free media), and{" "}
          <strong className="text-kot-ink">Source needs verification</strong> for
          anything we have not yet confirmed. We never promote an unverified link as
          official.
        </p>
      </section>
    </main>
  );
}
