import type { Metadata } from "next";
import Link from "next/link";
import { Film } from "lucide-react";
import EraTimeline, { type Era } from "@/components/learn/EraTimeline";
import { FilmLink, PersonLink, Figure, FigureRow } from "@/components/learn/elements";

export const metadata: Metadata = {
  title: "Learn: A short history of Soviet cinema | Kotfilm",
  description:
    "How Soviet cinema grew from the silent avant-garde to the Thaw and beyond: its eras, how films were funded and made, the directors and actors who shaped it, the national cinemas of the republics, and the techniques that changed world cinema.",
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

const studios = [
  "Mosfilm",
  "Lenfilm",
  "Soyuzmultfilm",
  "Dovzhenko, Kyiv",
  "Georgian Film",
  "Armenfilm · Kazakhfilm",
];

function StudioPanel() {
  return (
    <div className="mb-8 hidden rounded-lg border border-kot-line bg-kot-cream p-4 lg:block">
      <p className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.18em] text-kot-red">
        <Film aria-hidden className="h-4 w-4" />
        The studios
      </p>
      <ul className="mt-3 flex flex-col gap-1.5 text-sm text-kot-char">
        {studios.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

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
      <div className="lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block">
          <StudioPanel />
          <EraTimeline eras={eras} />
        </aside>

        <div className="max-w-3xl">
          <header className="mb-10">
            <h1 className="font-display text-4xl font-bold tracking-wide text-kot-red">
              A short history of Soviet cinema
            </h1>
            <p className="mt-3 leading-relaxed text-kot-char">
              For seven decades, film in the USSR was an art form, an industry, and an
              instrument of the state all at once. That tension produced some of the
              most inventive cinema ever made. This is a short, opinionated tour of the
              eras, how films were funded and made, the people who defined them, the
              national cinemas that grew up across the republics, and the techniques
              that rippled out into world cinema. Everything mentioned links straight to
              its page in the{" "}
              <Link href="/films" className="text-kot-red underline-offset-4 hover:underline">
                catalogue
              </Link>
              .
            </p>
          </header>

          <article>
            <div className="flex flex-col gap-10">
              <EraSection id="system" kicker="How it worked" title="The Soviet film system">
                <p>
                  There was no private film industry in the Soviet Union. Studios were
                  state-owned, and from 1922 the cinema was nationalised under a central
                  authority that later became Goskino, the State Committee for
                  Cinematography. Production money came from the state, not from
                  investors, and a film&rsquo;s success was measured less by ticket sales
                  than by whether officials approved of it.
                </p>
                <p>
                  The great studios were arms of that single system: Mosfilm and Lenfilm
                  for features, Soyuzmultfilm for animation, and a studio in nearly every
                  republic, from the{" "}
                  <PersonLink slug="aleksandr-dovzhenko">Dovzhenko</PersonLink> studio in
                  Kyiv to Georgian Film in Tbilisi, Armenfilm, and Kazakhfilm. Those
                  republican studios would grow into distinct national cinemas with
                  voices of their own, a thread worth following through the decades below.
                </p>
                <p>
                  State control had a strange double effect. Freed from the box office,
                  directors could spend years on a single difficult film. But every
                  script passed through committees, and a finished film could be censored,
                  re-edited, or &ldquo;shelved,&rdquo; locked away unseen for years.{" "}
                  <FilmLink slug="andrei-rublev">Andrei Rublev</FilmLink> sat largely
                  unseen before a cut reached audiences;{" "}
                  <PersonLink slug="aleksei-german">Aleksei German</PersonLink>&rsquo;s{" "}
                  <FilmLink slug="trial-on-the-road">Trial on the Road</FilmLink> was held
                  back for fifteen years; and{" "}
                  <PersonLink slug="sergei-parajanov">Sergei Parajanov</PersonLink> was
                  imprisoned and banned from filming. To understand Soviet cinema is to
                  read it against that constant negotiation between artists and the state.
                </p>
              </EraSection>

              <EraSection id="silent" kicker="1918–1930" title="The silent avant-garde">
                <p>
                  The young Soviet state inherited a film culture and almost no film
                  stock, and out of that scarcity came revolution. At the State Film
                  School, Lev Kuleshov ran editing experiments showing that meaning is
                  created by the join between shots, not the shots themselves. The
                  &ldquo;Kuleshov effect&rdquo; is still taught in every film school, and
                  his students and peers turned montage into a whole theory of cinema.
                </p>
                <p>
                  <PersonLink slug="sergei-eisenstein">Sergei Eisenstein</PersonLink> made
                  editing a weapon of emotion in{" "}
                  <FilmLink slug="strike">Strike</FilmLink> and{" "}
                  <FilmLink slug="battleship-potemkin">Battleship Potemkin</FilmLink>,
                  whose Odessa Steps sequence remains the most quoted montage in film
                  history, then pushed further into &ldquo;intellectual montage&rdquo;
                  with{" "}
                  <FilmLink slug="october-ten-days-that-shook-the-world">October</FilmLink>.{" "}
                  <PersonLink slug="vsevolod-pudovkin">Vsevolod Pudovkin</PersonLink> built
                  a gentler, narrative montage in{" "}
                  <FilmLink slug="mother">Mother</FilmLink>, while{" "}
                  <PersonLink slug="dziga-vertov">Dziga Vertov</PersonLink> rejected
                  fiction entirely in the dazzling city-symphony{" "}
                  <FilmLink slug="man-with-a-movie-camera">Man with a Movie Camera</FilmLink>.
                </p>
                <p>
                  The energy was not only Russian.{" "}
                  <PersonLink slug="aleksandr-dovzhenko">Aleksandr Dovzhenko</PersonLink>,
                  working in Ukraine, brought a lyrical, almost pantheist eye to{" "}
                  <FilmLink slug="arsenal">Arsenal</FilmLink> and{" "}
                  <FilmLink slug="earth">Earth</FilmLink>, the films that gave the Kyiv
                  studio later named after him its reputation. Even science fiction got a
                  Constructivist makeover in{" "}
                  <PersonLink slug="yakov-protazanov">Yakov Protazanov</PersonLink>&rsquo;s{" "}
                  <FilmLink slug="aelita">Aelita: Queen of Mars</FilmLink>.
                </p>
                <FigureRow>
                  <Figure kind="film" slug="aelita" caption="Aelita (1924)" />
                  <Figure kind="film" slug="battleship-potemkin" caption="Battleship Potemkin (1925)" />
                  <Figure kind="film" slug="arsenal" caption="Arsenal (1929)" />
                  <Figure kind="film" slug="man-with-a-movie-camera" caption="Man with a Movie Camera (1929)" />
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
                  <PersonLink slug="georgi-vasilyev">the &ldquo;Vasilyev brothers,&rdquo;</PersonLink>{" "}
                  a Civil War tale audiences watched again and again.
                </p>
                <p>
                  The decade also invented the Soviet musical comedy.{" "}
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
                  <Figure kind="film" slug="earth" caption="Earth (1930)" />
                  <Figure kind="film" slug="chapaev" caption="Chapaev (1934)" />
                  <Figure kind="film" slug="jolly-fellows" caption="Jolly Fellows (1934)" />
                  <Figure kind="film" slug="alexander-nevsky" caption="Alexander Nevsky (1938)" />
                </FigureRow>
              </EraSection>

              <EraSection id="war" kicker="1941–1953" title="War & the late Stalin years">
                <p>
                  The German invasion turned the studios toward the front. Crews were
                  evacuated east, with much of Mosfilm and Lenfilm relocated to Alma-Ata
                  in Kazakhstan, and they made morale films and frontline newsreels. The
                  towering work of the period was Eisenstein&rsquo;s{" "}
                  <FilmLink slug="ivan-the-terrible-part-i">Ivan the Terrible, Part I</FilmLink>.
                  Its darker{" "}
                  <FilmLink slug="ivan-the-terrible-part-ii">Part II</FilmLink>, read as a
                  veiled portrait of tyranny, was suppressed and not shown until after
                  Stalin&rsquo;s death.
                </p>
                <p>
                  The post-war years brought a notorious &ldquo;film hunger,&rdquo; when
                  very few features were approved, but also lavish escapism.{" "}
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
                  <Figure kind="film" slug="ivan-the-terrible-part-ii" caption="Ivan the Terrible, Part II (1958)" />
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
                  whose fallible heroine and soaring, restless camera (shot by Sergei
                  Urusevsky) won the Palme d&rsquo;Or in 1958, still the only Soviet film
                  to do so.{" "}
                  <PersonLink slug="grigori-chukhrai">Grigori Chukhrai</PersonLink>&rsquo;s{" "}
                  <FilmLink slug="ballad-of-a-soldier">Ballad of a Soldier</FilmLink> found
                  the same humane register.
                </p>
                <p>
                  It was also a launch pad for new voices. A young{" "}
                  <PersonLink slug="andrei-tarkovsky">Andrei Tarkovsky</PersonLink> debuted
                  with{" "}
                  <FilmLink slug="ivans-childhood">Ivan&rsquo;s Childhood</FilmLink>,
                  winning Venice in 1962, and Kalatozov and Urusevsky pushed their camera
                  to delirious extremes in{" "}
                  <FilmLink slug="i-am-cuba">I Am Cuba</FilmLink>. The era also built the
                  popular comedy Soviet audiences adored, from{" "}
                  <PersonLink slug="eldar-ryazanov">Eldar Ryazanov</PersonLink> to{" "}
                  <PersonLink slug="leonid-gaidai">Leonid Gaidai</PersonLink>.
                </p>
                <p>
                  Crucially, this is where the cinemas of the republics found their own
                  poetry.{" "}
                  <PersonLink slug="sergei-parajanov">Parajanov</PersonLink> announced a
                  wholly different, folkloric language with{" "}
                  <FilmLink slug="shadows-of-forgotten-ancestors">Shadows of Forgotten Ancestors</FilmLink>,
                  shot at the Dovzhenko studio in Kyiv and now seen as the birth of a
                  Ukrainian &ldquo;poetic cinema.&rdquo;
                </p>
                <FigureRow>
                  <Figure kind="film" slug="the-cranes-are-flying" caption="The Cranes Are Flying (1957)" />
                  <Figure kind="film" slug="ballad-of-a-soldier" caption="Ballad of a Soldier (1959)" />
                  <Figure kind="film" slug="ivans-childhood" caption="Ivan's Childhood (1962)" />
                  <Figure kind="film" slug="shadows-of-forgotten-ancestors" caption="Shadows of Forgotten Ancestors (1965)" />
                </FigureRow>
              </EraSection>

              <EraSection id="stagnation" kicker="1968–1985" title="Stagnation-era masters">
                <p>
                  Politically the Brezhnev years were called the era of
                  &ldquo;Stagnation,&rdquo; yet on screen it was astonishingly rich.{" "}
                  <PersonLink slug="andrei-tarkovsky">Tarkovsky</PersonLink> made his
                  signature films in this period. Across the science-fiction meditation{" "}
                  <FilmLink slug="solaris">Solaris</FilmLink>, the autobiographical{" "}
                  <FilmLink slug="the-mirror">The Mirror</FilmLink>, and the haunted{" "}
                  <FilmLink slug="stalker">Stalker</FilmLink>, he built his idea of cinema
                  as &ldquo;sculpting in time&rdquo; out of long, unbroken takes.{" "}
                  <PersonLink slug="larisa-shepitko">Larisa Shepitko</PersonLink> reached a
                  spiritual intensity in{" "}
                  <FilmLink slug="the-ascent">The Ascent</FilmLink>.
                </p>
                <p>
                  The national cinemas were thriving too. In Armenia,{" "}
                  <PersonLink slug="sergei-parajanov">Parajanov</PersonLink> composed the
                  jewel-like tableaux of{" "}
                  <FilmLink slug="the-color-of-pomegranates">The Color of Pomegranates</FilmLink>,
                  and Georgian cinema carried a warm, ironic humour onto screens across
                  the union through the Georgian-born{" "}
                  <PersonLink slug="georgiy-daneliya">Georgiy Daneliya</PersonLink> and
                  films like{" "}
                  <FilmLink slug="mimino">Mimino</FilmLink>. Animation hit its own peak as{" "}
                  <PersonLink slug="yuri-norstein">Yuri Norstein</PersonLink> created{" "}
                  <FilmLink slug="hedgehog-in-the-fog">Hedgehog in the Fog</FilmLink> and{" "}
                  <FilmLink slug="tale-of-tales">Tale of Tales</FilmLink>, films routinely
                  voted among the greatest ever animated.
                </p>
                <p>
                  Popular cinema thrived alongside the art films: the much-loved adventure{" "}
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
                  <Figure kind="film" slug="the-color-of-pomegranates" caption="The Color of Pomegranates (1969)" />
                  <Figure kind="film" slug="tale-of-tales" caption="Tale of Tales (1979)" />
                </FigureRow>
              </EraSection>

              <EraSection id="glasnost" kicker="1985–1991" title="Glasnost & the end of an era">
                <p>
                  Under Gorbachev&rsquo;s policy of glasnost, the vaults opened: films
                  shelved for years finally screened, and new work spoke with startling
                  frankness.{" "}
                  <PersonLink slug="elem-klimov">Elem Klimov</PersonLink>&rsquo;s{" "}
                  <FilmLink slug="come-and-see">Come and See</FilmLink> delivered perhaps
                  the most harrowing war film ever made, while the Georgian director{" "}
                  <PersonLink slug="tengiz-abuladze">Tengiz Abuladze</PersonLink>&rsquo;s{" "}
                  <FilmLink slug="repentance">Repentance</FilmLink> confronted the legacy
                  of Stalinist terror head-on.
                </p>
                <p>
                  A younger, rawer cinema arrived with the candour of{" "}
                  <FilmLink slug="little-vera">Little Vera</FilmLink> and the rock-fuelled
                  youth films{" "}
                  <FilmLink slug="assa">Assa</FilmLink> and{" "}
                  <FilmLink slug="the-needle">The Needle</FilmLink>, the latter an emblem
                  of the &ldquo;Kazakh New Wave&rdquo; at the Kazakhfilm studio, starring
                  the rock idol{" "}
                  <PersonLink slug="viktor-tsoi" role="actors">Viktor Tsoi</PersonLink>.
                  When the USSR dissolved in 1991, the state system that had funded all of
                  this dissolved with it, closing the chapter this guide covers.
                </p>
                <FigureRow>
                  <Figure kind="film" slug="come-and-see" caption="Come and See (1985)" />
                  <Figure kind="film" slug="repentance" caption="Repentance (1987)" />
                  <Figure kind="film" slug="little-vera" caption="Little Vera (1988)" />
                  <Figure kind="film" slug="the-needle" caption="The Needle (1988)" />
                </FigureRow>
              </EraSection>

              <EraSection id="legacy" kicker="Why it matters" title="A global legacy">
                <p>
                  Soviet cinema&rsquo;s influence reaches far beyond its borders. The
                  montage theories of{" "}
                  <PersonLink slug="sergei-eisenstein">Eisenstein</PersonLink>,{" "}
                  <PersonLink slug="vsevolod-pudovkin">Pudovkin</PersonLink>, and{" "}
                  <PersonLink slug="dziga-vertov">Vertov</PersonLink> became foundations of
                  how editing is taught and understood everywhere, and the Kuleshov effect
                  is still day-one material in film schools. The fluid, gravity-defying
                  camera of{" "}
                  <FilmLink slug="i-am-cuba">I Am Cuba</FilmLink> openly astonished later
                  filmmakers, and{" "}
                  <PersonLink slug="andrei-tarkovsky">Tarkovsky</PersonLink>&rsquo;s long
                  take reshaped art cinema for generations.
                </p>
                <p>
                  <PersonLink slug="yuri-norstein">Norstein</PersonLink> is revered by
                  animators worldwide, the poetic cinemas of Ukraine, Armenia, and Georgia
                  shaped how national identity could live on film, and the documentary
                  ideas of Vertov still echo through modern non-fiction. The best way to
                  feel all of this is simply to watch. Start with the{" "}
                  <Link href="/films" className="font-medium text-kot-red underline-offset-4 hover:underline">
                    catalogue
                  </Link>
                  , browse by{" "}
                  <Link href="/directors" className="font-medium text-kot-red underline-offset-4 hover:underline">
                    director
                  </Link>{" "}
                  or{" "}
                  <Link href="/genres" className="font-medium text-kot-red underline-offset-4 hover:underline">
                    genre
                  </Link>
                  , and find a free, legal place to begin.
                </p>
              </EraSection>
            </div>

            <p className="mt-12 border-t border-kot-line pt-6 text-xs leading-relaxed text-kot-char/70">
              Images are freely-licensed or public-domain stills and posters; each carries
              its credit. See{" "}
              <Link href="/sources" className="underline-offset-2 hover:underline">
                Data sources
              </Link>{" "}
              for how Kotfilm handles attribution and copyright.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
