import type { Metadata } from "next";
import Link from "next/link";
import EraTimeline, { type Era } from "@/components/learn/EraTimeline";
import { FilmLink, PersonLink, Figure, FigureRow } from "@/components/learn/elements";

export const metadata: Metadata = {
  title: "Learn — A short history of Soviet cinema | Kotfilm",
  description:
    "How Soviet cinema grew from the silent avant-garde to the Thaw and beyond — its eras, how films were funded and made, the directors and actors who shaped it, and the techniques that changed world cinema.",
};

const eras: Era[] = [
  { id: "system", label: "The Soviet film system", years: "How it worked" },
  { id: "silent", label: "Silent avant-garde", years: "1918–1930" },
  { id: "sound", label: "Sound & Socialist Realism", years: "1930–1941" },
  { id: "war", label: "War & late Stalin", years: "1941–1953" },
  { id: "thaw", label: "The Thaw", years: "1953–1968" },
  { id: "stagnation", label: "Stagnation-era masters", years: "1968–1985" },
  { id: "glasnost", label: "Glasnost & the end", years: "1985–1991" },
  { id: "legacy", label: "A global legacy", years: "Why it matters" },
];

function EraSection({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-kot-line pt-10 first:border-t-0 first:pt-0">
      <p className="font-display text-xs uppercase tracking-[0.2em] text-kot-red">{kicker}</p>
      <h2 className="mt-1 font-display text-2xl font-bold tracking-wide text-kot-ink sm:text-3xl">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4 leading-relaxed text-kot-char">{children}</div>
    </section>
  );
}

export default function LearnPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-10 max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-wide text-kot-red">
          A short history of Soviet cinema
        </h1>
        <p className="mt-3 leading-relaxed text-kot-char">
          For seven decades, film in the USSR was an art form, an industry, and an
          instrument of the state all at once. That tension produced some of the most
          inventive cinema ever made. This is a brief, opinionated tour — the eras, how
          films were actually funded and made, the people who defined them, and the
          techniques that rippled out across world cinema. Everything mentioned links
          straight to its page in the {""}
          <Link href="/films" className="text-kot-red underline-offset-4 hover:underline">
            catalogue
          </Link>
          .
        </p>
      </header>

      <div className="lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-12">
        <aside className="mb-8 lg:mb-0">
          <EraTimeline eras={eras} />
        </aside>

        <article className="max-w-3xl">
          <div className="flex flex-col gap-10">
            <EraSection id="system" kicker="How it worked" title="The Soviet film system">
              <p>
                There was no private film industry in the Soviet Union. Studios were
                state-owned, and from 1922 the cinema was nationalised under a central
                authority that later became Goskino, the State Committee for
                Cinematography. Production money came from the state, not from
                investors, and a film&rsquo;s success was measured less by ticket sales
                than by whether officials approved of it. The great studios —{" "}
                Mosfilm and Lenfilm for features, Soyuzmultfilm for animation, the
                Dovzhenko studio in Kyiv and republican studios across the union — were
                arms of that single system.
              </p>
              <p>
                This had a strange double effect. Freed from the box office, directors
                could spend years on a single difficult film. But every script passed
                through committees, and a finished film could be censored, re-edited, or
                &ldquo;shelved&rdquo; — locked away unseen for years. {" "}
                <FilmLink slug="andrei-rublev">Andrei Rublev</FilmLink> sat largely
                unseen before a cut reached audiences; {" "}
                <PersonLink slug="aleksei-german">Aleksei German</PersonLink>&rsquo;s{" "}
                <FilmLink slug="trial-on-the-road">Trial on the Road</FilmLink> was held
                back for fifteen years; {" "}
                <PersonLink slug="sergei-parajanov">Sergei Parajanov</PersonLink> was
                imprisoned and banned from filming. To understand Soviet cinema is to
                read it against that constant negotiation between artists and the state.
              </p>
            </EraSection>

            <EraSection id="silent" kicker="1918–1930" title="The silent avant-garde">
              <p>
                The young Soviet state inherited a film culture and almost no film stock,
                and out of that scarcity came revolution. At the State Film School, Lev
                Kuleshov ran editing experiments showing that meaning is created by the
                join between shots, not the shots themselves — the &ldquo;Kuleshov
                effect&rdquo; still taught in every film school. His students and peers
                turned montage into a whole theory of cinema.
              </p>
              <p>
                <PersonLink slug="sergei-eisenstein">Sergei Eisenstein</PersonLink> made
                editing a weapon of emotion in {" "}
                <FilmLink slug="strike">Strike</FilmLink> and{" "}
                <FilmLink slug="battleship-potemkin">Battleship Potemkin</FilmLink>,
                whose Odessa Steps sequence remains the most quoted montage in film
                history, then pushed further into &ldquo;intellectual montage&rdquo; with{" "}
                <FilmLink slug="october-ten-days-that-shook-the-world">October</FilmLink>.
                <PersonLink slug="vsevolod-pudovkin">Vsevolod Pudovkin</PersonLink> built
                a gentler, narrative montage in{" "}
                <FilmLink slug="mother">Mother</FilmLink>;{" "}
                <PersonLink slug="dziga-vertov">Dziga Vertov</PersonLink> rejected fiction
                entirely in the dazzling city-symphony{" "}
                <FilmLink slug="man-with-a-movie-camera">Man with a Movie Camera</FilmLink>;
                and <PersonLink slug="aleksandr-dovzhenko">Aleksandr Dovzhenko</PersonLink>{" "}
                brought a lyrical, almost pantheist eye to{" "}
                <FilmLink slug="arsenal">Arsenal</FilmLink> and{" "}
                <FilmLink slug="earth">Earth</FilmLink>. Even science fiction got a
                Constructivist makeover in{" "}
                <PersonLink slug="yakov-protazanov">Yakov Protazanov</PersonLink>&rsquo;s{" "}
                <FilmLink slug="aelita">Aelita: Queen of Mars</FilmLink>.
              </p>
              <FigureRow>
                <Figure kind="film" slug="battleship-potemkin" caption="Battleship Potemkin (1925)" />
                <Figure kind="film" slug="man-with-a-movie-camera" caption="Man with a Movie Camera (1929)" />
                <Figure kind="film" slug="earth" caption="Earth (1930)" />
                <Figure kind="film" slug="aelita" caption="Aelita (1924)" />
              </FigureRow>
            </EraSection>

            <EraSection id="sound" kicker="1930–1941" title="Sound & Socialist Realism">
              <p>
                Sound arrived as the political climate hardened. In 1934 &ldquo;Socialist
                Realism&rdquo; became official doctrine: art was to be optimistic,
                accessible, and heroic, picturing life as it should become. The
                experimental montage of the 1920s gave way to clear storytelling and
                positive heroes. The model hit was{" "}
                <FilmLink slug="chapaev">Chapaev</FilmLink> by{" "}
                <PersonLink slug="georgi-vasilyev">the &ldquo;Vasilyev brothers&rdquo;</PersonLink>,
                a Civil War tale that audiences watched again and again.
              </p>
              <p>
                The decade also invented the Soviet musical comedy:{" "}
                <PersonLink slug="grigori-aleksandrov">Grigori Aleksandrov</PersonLink>{" "}
                made <FilmLink slug="jolly-fellows">Jolly Fellows</FilmLink> a showcase
                for the era&rsquo;s biggest star,{" "}
                <PersonLink slug="lyubov-orlova" role="actors">Lyubov Orlova</PersonLink>.
                And Eisenstein returned in spectacular sound-era form with{" "}
                <FilmLink slug="alexander-nevsky">Alexander Nevsky</FilmLink>, whose
                battle on the ice set Sergei Prokofiev&rsquo;s score against the image so
                tightly that it became a textbook case of music and montage working as
                one.
              </p>
              <FigureRow>
                <Figure kind="film" slug="chapaev" caption="Chapaev (1934)" />
                <Figure kind="film" slug="jolly-fellows" caption="Jolly Fellows (1934)" />
                <Figure kind="film" slug="alexander-nevsky" caption="Alexander Nevsky (1938)" />
              </FigureRow>
            </EraSection>

            <EraSection id="war" kicker="1941–1953" title="War & the late Stalin years">
              <p>
                The German invasion turned the studios toward the front. Crews were
                evacuated east — much of Mosfilm and Lenfilm relocated to Alma-Ata — and
                made morale films and frontline newsreels. The towering work of the
                period was Eisenstein&rsquo;s{" "}
                <FilmLink slug="ivan-the-terrible-part-i">Ivan the Terrible, Part I</FilmLink>;
                its darker{" "}
                <FilmLink slug="ivan-the-terrible-part-ii">Part II</FilmLink>, read as a
                veiled portrait of tyranny, was suppressed and not shown until after
                Stalin&rsquo;s death.
              </p>
              <p>
                The post-war years brought a notorious &ldquo;film hunger&rdquo; — very
                few features were approved — but also lavish escapism. {" "}
                <PersonLink slug="aleksandr-ptushko">Aleksandr Ptushko</PersonLink>{" "}
                turned Russian folklore into Technicolor spectacle with{" "}
                <FilmLink slug="the-stone-flower">The Stone Flower</FilmLink> and{" "}
                <FilmLink slug="sadko">Sadko</FilmLink>, while Soyuzmultfilm&rsquo;s
                animators, among them{" "}
                <PersonLink slug="lev-atamanov">Lev Atamanov</PersonLink>, built a
                hand-drawn tradition that would soon produce world classics.
              </p>
              <FigureRow>
                <Figure kind="film" slug="ivan-the-terrible-part-i" caption="Ivan the Terrible (1944)" />
                <Figure kind="film" slug="the-stone-flower" caption="The Stone Flower (1946)" />
                <Figure kind="film" slug="sadko" caption="Sadko (1953)" />
              </FigureRow>
            </EraSection>

            <EraSection id="thaw" kicker="1953–1968" title="The Thaw">
              <p>
                After Stalin died, the cultural &ldquo;Thaw&rdquo; let filmmakers turn
                from collective heroes to private feeling. The breakthrough was{" "}
                <PersonLink slug="mikhail-kalatozov">Mikhail Kalatozov</PersonLink>&rsquo;s{" "}
                <FilmLink slug="the-cranes-are-flying">The Cranes Are Flying</FilmLink>,
                whose fallible heroine and soaring, restless camera (by Sergei Urusevsky)
                won the Palme d&rsquo;Or in 1958 — still the only Soviet film to do so.{" "}
                <PersonLink slug="grigori-chukhrai">Grigori Chukhrai</PersonLink>&rsquo;s{" "}
                <FilmLink slug="ballad-of-a-soldier">Ballad of a Soldier</FilmLink> found
                the same humane register.
              </p>
              <p>
                It was also a launch pad for new voices. A young{" "}
                <PersonLink slug="andrei-tarkovsky">Andrei Tarkovsky</PersonLink> debuted
                with <FilmLink slug="ivans-childhood">Ivan&rsquo;s Childhood</FilmLink>,
                winning Venice in 1962; Kalatozov and Urusevsky pushed their camera to
                delirious extremes in{" "}
                <FilmLink slug="i-am-cuba">I Am Cuba</FilmLink>. Meanwhile the era built
                the popular comedy that Soviet audiences adored, from{" "}
                <PersonLink slug="eldar-ryazanov">Eldar Ryazanov</PersonLink> to{" "}
                <PersonLink slug="leonid-gaidai">Leonid Gaidai</PersonLink>, and{" "}
                <PersonLink slug="sergei-parajanov">Parajanov</PersonLink> announced a
                wholly different, folkloric kind of poetry with{" "}
                <FilmLink slug="shadows-of-forgotten-ancestors">Shadows of Forgotten Ancestors</FilmLink>.
              </p>
              <FigureRow>
                <Figure kind="film" slug="the-cranes-are-flying" caption="The Cranes Are Flying (1957)" />
                <Figure kind="film" slug="ballad-of-a-soldier" caption="Ballad of a Soldier (1959)" />
                <Figure kind="film" slug="ivans-childhood" caption="Ivan's Childhood (1962)" />
                <Figure kind="film" slug="i-am-cuba" caption="I Am Cuba (1964)" />
              </FigureRow>
            </EraSection>

            <EraSection id="stagnation" kicker="1968–1985" title="Stagnation-era masters">
              <p>
                Politically the Brezhnev years were called the era of &ldquo;Stagnation,&rdquo;
                yet on screen it was astonishingly rich. {" "}
                <PersonLink slug="andrei-tarkovsky">Tarkovsky</PersonLink> made his
                signature films — the science-fiction meditation{" "}
                <FilmLink slug="solaris">Solaris</FilmLink>, the autobiographical{" "}
                <FilmLink slug="the-mirror">The Mirror</FilmLink>, and the haunted{" "}
                <FilmLink slug="stalker">Stalker</FilmLink> — building his idea of
                cinema as &ldquo;sculpting in time&rdquo; from long, unbroken takes.{" "}
                <PersonLink slug="larisa-shepitko">Larisa Shepitko</PersonLink> reached a
                spiritual intensity in{" "}
                <FilmLink slug="the-ascent">The Ascent</FilmLink>, and{" "}
                <PersonLink slug="sergei-parajanov">Parajanov</PersonLink> made the
                jewel-like tableaux of{" "}
                <FilmLink slug="the-color-of-pomegranates">The Color of Pomegranates</FilmLink>.
              </p>
              <p>
                Animation hit its own peak as{" "}
                <PersonLink slug="yuri-norstein">Yuri Norstein</PersonLink> created{" "}
                <FilmLink slug="hedgehog-in-the-fog">Hedgehog in the Fog</FilmLink> and{" "}
                <FilmLink slug="tale-of-tales">Tale of Tales</FilmLink>, films routinely
                voted among the greatest ever animated. And popular cinema thrived too:
                the much-loved adventure{" "}
                <FilmLink slug="white-sun-of-the-desert">White Sun of the Desert</FilmLink>,
                the Oscar-winning crowd-pleaser{" "}
                <FilmLink slug="moscow-does-not-believe-in-tears">Moscow Does Not Believe in Tears</FilmLink>,
                and{" "}
                <PersonLink slug="sergei-bondarchuk">Sergei Bondarchuk</PersonLink>&rsquo;s
                colossal{" "}
                <FilmLink slug="war-and-peace">War and Peace</FilmLink>, which also took
                an Academy Award.
              </p>
              <FigureRow>
                <Figure kind="film" slug="stalker" caption="Stalker (1979)" />
                <Figure kind="film" slug="the-ascent" caption="The Ascent (1977)" />
                <Figure kind="film" slug="tale-of-tales" caption="Tale of Tales (1979)" />
                <Figure kind="film" slug="war-and-peace" caption="War and Peace (1966)" />
              </FigureRow>
            </EraSection>

            <EraSection id="glasnost" kicker="1985–1991" title="Glasnost & the end of an era">
              <p>
                Under Gorbachev&rsquo;s policy of glasnost, the vaults opened: films
                shelved for years finally screened, and new work spoke with startling
                frankness. {" "}
                <PersonLink slug="elem-klimov">Elem Klimov</PersonLink>&rsquo;s{" "}
                <FilmLink slug="come-and-see">Come and See</FilmLink> delivered perhaps
                the most harrowing war film ever made, while{" "}
                <PersonLink slug="tengiz-abuladze">Tengiz Abuladze</PersonLink>&rsquo;s{" "}
                <FilmLink slug="repentance">Repentance</FilmLink> confronted the legacy
                of Stalinist terror head-on.
              </p>
              <p>
                A younger, rawer cinema arrived with the candour of{" "}
                <FilmLink slug="little-vera">Little Vera</FilmLink> and the rock-fuelled
                youth films{" "}
                <FilmLink slug="assa">Assa</FilmLink> and{" "}
                <FilmLink slug="the-needle">The Needle</FilmLink>, the latter starring
                the rock idol{" "}
                <PersonLink slug="viktor-tsoi" role="actors">Viktor Tsoi</PersonLink>. When
                the USSR dissolved in 1991, the state system that had funded all of this
                dissolved with it, closing the chapter this guide covers.
              </p>
              <FigureRow>
                <Figure kind="film" slug="come-and-see" caption="Come and See (1985)" />
                <Figure kind="film" slug="repentance" caption="Repentance (1987)" />
                <Figure kind="film" slug="the-needle" caption="The Needle (1988)" />
              </FigureRow>
            </EraSection>

            <EraSection id="legacy" kicker="Why it matters" title="A global legacy">
              <p>
                Soviet cinema&rsquo;s influence reaches far beyond its borders. The
                montage theories of{" "}
                <PersonLink slug="sergei-eisenstein">Eisenstein</PersonLink>,{" "}
                <PersonLink slug="vsevolod-pudovkin">Pudovkin</PersonLink> and{" "}
                <PersonLink slug="dziga-vertov">Vertov</PersonLink> became foundations of
                how editing is taught and understood everywhere; the Kuleshov effect is
                still day-one material in film schools. The fluid, gravity-defying camera
                of <FilmLink slug="i-am-cuba">I Am Cuba</FilmLink> openly astonished
                later filmmakers, and{" "}
                <PersonLink slug="andrei-tarkovsky">Tarkovsky</PersonLink>&rsquo;s long
                take reshaped art cinema for generations.
              </p>
              <p>
                <PersonLink slug="yuri-norstein">Norstein</PersonLink> is revered by
                animators worldwide, and the documentary ideas of Vertov echo through
                modern non-fiction. The best way to feel all of this is simply to watch.
                Start with the {""}
                <Link href="/films" className="font-medium text-kot-red underline-offset-4 hover:underline">
                  catalogue
                </Link>
                , browse by {""}
                <Link href="/directors" className="font-medium text-kot-red underline-offset-4 hover:underline">
                  director
                </Link>{" "}
                or {""}
                <Link href="/genres" className="font-medium text-kot-red underline-offset-4 hover:underline">
                  genre
                </Link>
                , and find a free, legal place to begin.
              </p>
            </EraSection>
          </div>

          <p className="mt-12 border-t border-kot-line pt-6 text-xs leading-relaxed text-kot-char/70">
            Images are freely-licensed or public-domain stills and posters; each carries
            its credit. See {""}
            <Link href="/sources" className="underline-offset-2 hover:underline">
              Data sources
            </Link>{" "}
            for how Kotfilm handles attribution and copyright.
          </p>
        </article>
      </div>
    </main>
  );
}
