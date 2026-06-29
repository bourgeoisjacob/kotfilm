import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Kotfilm",
  description:
    "The story behind Kotfilm — one enthusiastic film lover, one unimpressed cat, and a mission to bring the great films of Soviet cinema to a wider audience.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
          About
        </h1>
        <p className="mt-2 font-display text-sm uppercase tracking-[0.18em] text-kot-char/80">
          Comrade, allow me to introduce the management
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <figure className="overflow-hidden rounded-xl border border-kot-line shadow-sm">
          <span className="relative block aspect-[4/3] bg-kot-cream">
            <Image
              src="/about-illustration.png"
              alt="The founder of Kotfilm, with a calico cat, a film reel, and a Soviet-poster backdrop"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
              priority
            />
          </span>
        </figure>

        <div className="flex flex-col gap-4 leading-relaxed text-kot-char">
          <p>
            Behind Kotfilm is one very enthusiastic film lover and one decidedly
            unimpressed cat, who considers herself the true head of the studio. The
            division of labour is simple: I do the writing, she approves the naps.
          </p>
          <p>
            I grew up among the hills of New England, the sort of place that breeds a
            stubborn curiosity about the wider world. That curiosity turned into a love
            of history and foreign policy, and somewhere along the way into a lasting
            fascination with the films that came out of the Soviet Union, bold, strange,
            funny, and heartbreaking by turns, and far too good to be left gathering dust
            behind a language barrier.
          </p>
          <p>
            By day I work to keep the planet a little greener; at dawn you will often
            find me somewhere quiet with a pair of binoculars, watching birds. By
            evening, more often than not, I am watching a Soviet classic and wishing more
            people knew it existed. I also helped write a children&rsquo;s book about a
            cat, which is presumably how the feline management ended up in charge here.
          </p>
          <p>
            That is the whole idea behind Kotfilm: to take these great stories, the
            montage experiments, the fairy tales, the war epics, and the sly comedies,
            and bring them to a broader audience, with original write-ups and honest,
            legal places to watch. No politics to glorify, just remarkable filmmaking
            that deserves a new generation of viewers.
          </p>
          <p>
            So settle in, scratch the cat behind the ears, and enjoy. I hope Kotfilm
            helps you discover a film you will love. The {""}
            <Link href="/learn" className="font-medium text-kot-red underline-offset-4 hover:underline">
              short history
            </Link>{" "}
            is a fine place to begin, or dive straight into the {""}
            <Link href="/films" className="font-medium text-kot-red underline-offset-4 hover:underline">
              catalogue
            </Link>
            . Welcome, comrade.
          </p>
        </div>
      </div>
    </main>
  );
}
