import { extraFilms } from "./filmsExtra";

export type Watch = {
  platform: string;
  label: string;
  sourceType: "OFFICIAL" | "ARCHIVE" | "PUBLIC_REPOSITORY" | "UNVERIFIED";
  rightsNote?: string;
  url?: string;
};

export type SeedFilm = {
  slug: string;
  title: string;
  original?: string;
  year: number;
  country?: string;
  studio?: string;
  director: string;
  cast: string[];
  genres: string[];
  runtime?: number;
  subs: string[];
  summary: string;
  context?: string;
  /** "Impact on Cinema" — set ONLY when the film had a discernible influence on
   * film history (innovation, influence on later filmmakers). Omit otherwise. */
  impact?: string;
  themes: string[];
  watch: Watch[];
  wikipediaUrl?: string;
  /** Curated "start with classics" entry point. */
  starterClassic?: boolean;
  /** Wikidata Q-id — links a seed film to the ingestion pipeline (idempotency key). */
  wikidataId?: string;
};

// The Kotfilm seed catalogue (~22 well-known Soviet classics). All
// summary/context/impact text is ORIGINAL, written for Kotfilm — never copied or
// closely paraphrased from any source. Studio-released titles are labelled
// OFFICIAL; everything else is UNVERIFIED. Exact video URLs are never fabricated.
// Metadata (years, runtimes, studios, country, principal cast) reconciled against
// Wikidata, with English Wikipedia as a tiebreaker where Wikidata is anomalous.
export const films: SeedFilm[] = [
  {
    slug: "the-cranes-are-flying",
    title: "The Cranes Are Flying",
    original: "Летят журавли",
    year: 1957,
    country: "USSR",
    studio: "Mosfilm",
    director: "Mikhail Kalatozov",
    cast: ["Tatiana Samoilova", "Aleksey Batalov"],
    genres: ["War", "Drama", "Romance"],
    runtime: 97,
    subs: ["English", "Russian"],
    summary:
      "In Moscow on the eve of the German invasion, Veronika and Boris are young and in love. When Boris volunteers for the front, Veronika is left behind to endure bombardment, the loss of her family, and a coerced marriage to his cowardly cousin. As the war grinds on with no word from Boris, she clings to a fading hope while struggling to hold on to her own decency amid the chaos of the home front.",
    context:
      "Made at Mosfilm during the cultural 'Thaw' that followed Stalin's death, the film broke sharply with the heroic, ideologically tidy war pictures of the preceding decades. Kalatozov and cinematographer Sergei Urusevsky built the film around restless, subjective camerawork — handheld runs, spiralling crane shots, and a famous vertiginous staircase sequence — to render private emotion rather than collective triumph. Its heroine is fallible and human rather than a model citizen, a startling choice for Soviet screens of the period.",
    impact:
      "It won the Palme d'Or at Cannes in 1958 — still the only Soviet film to do so — and announced to the world that Soviet cinema had re-emerged as an artistic force. Urusevsky's fluid, emotionally charged camerawork influenced a generation of filmmakers and remains a touchstone for expressive cinematography.",
    themes: ["the home front", "fidelity", "loss"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Cranes_Are_Flying",
    starterClassic: true,
  },
  {
    slug: "solaris",
    title: "Solaris",
    original: "Солярис",
    year: 1972,
    country: "USSR",
    studio: "Mosfilm",
    director: "Andrei Tarkovsky",
    cast: ["Donatas Banionis", "Natalya Bondarchuk"],
    genres: ["Science fiction", "Drama", "Literary adaptation"],
    runtime: 167,
    subs: ["English", "Russian"],
    summary:
      "Psychologist Kris Kelvin travels to a research station orbiting Solaris, a distant planet covered by a sentient ocean. The skeleton crew is unravelling: the ocean has been reaching into their minds and giving physical form to their buried memories and guilt. When Kris's long-dead wife reappears, materialised from his own grief, he must decide whether the apparition is a cruel illusion or a second chance — and what it means to love something the mind itself has made.",
    context:
      "Adapted at Mosfilm from Polish writer Stanisław Lem's 1961 novel, Tarkovsky used the premise less as science fiction than as a vehicle for his abiding concerns: memory, conscience, and faith. He deliberately slowed the film to a contemplative pace and grounded its space-station drama in earthly textures — rain, leaves, a long opening at a country house, and a celebrated drive through city tunnels — pushing back against the cold, hardware-obsessed sci-fi of the era. Lem himself disliked the adaptation's emotional, inward turn, but it became Tarkovsky's most internationally accessible work.",
    impact:
      "Frequently discussed as a philosophical counterweight to Western space epics, Solaris reshaped what serious science fiction on film could attempt, prioritising inner life over spectacle. Its influence runs through later contemplative sci-fi, and it was prominently remade by Steven Soderbergh in 2002.",
    themes: ["memory", "guilt", "contact"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Solaris_(1972_film)",
  },
  {
    slug: "hedgehog-in-the-fog",
    title: "Hedgehog in the Fog",
    original: "Ёжик в тумане",
    year: 1975,
    country: "USSR",
    studio: "Soyuzmultfilm",
    director: "Yuri Norstein",
    cast: [],
    genres: ["Animation", "Children's films", "Fairy tale"],
    runtime: 10,
    subs: ["English", "Russian"],
    summary:
      "A small hedgehog sets out at dusk to visit his friend the bear cub for their nightly ritual of counting stars over tea. Crossing the woods, he is swallowed by a thick fog where familiar things turn strange and frightening — a looming horse, an unseen presence, a fall into a river — and ordinary courage becomes an adventure into the unknown. He emerges shaken and changed, the world quietly larger than before.",
    context:
      "Produced at the Soyuzmultfilm studio, Norstein created the film with a painstaking multi-plane technique, layering translucent paper cutouts and glass to achieve the breathing, atmospheric fog that gives the film its name. Working with art director Francheska Yarbusova and adapting a story by Sergei Kozlov, he spent extraordinary care on only ten minutes of footage, treating animation as a serious poetic medium rather than children's entertainment.",
    impact:
      "Widely regarded as one of the greatest animated films ever made — it topped a 2003 poll of animators and critics as the best animation of all time — and it cemented Norstein's international reputation. Filmmakers including Hayao Miyazaki have cited Norstein's work as an inspiration.",
    themes: ["wonder", "fear", "friendship"],
    watch: [
      {
        platform: "YouTube",
        label: "Soyuzmultfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Hedgehog_in_the_Fog",
    starterClassic: true,
  },
  {
    slug: "battleship-potemkin",
    title: "Battleship Potemkin",
    original: "Броненосец «Потёмкин»",
    year: 1925,
    country: "USSR",
    studio: "Mosfilm", // Wikidata attributes Mosfilm (with the State Committee for Cinematography).
    director: "Sergei Eisenstein",
    cast: ["Aleksandr Antonov", "Vladimir Barsky", "Grigori Aleksandrov"],
    genres: ["Silent cinema", "Historical epic", "Drama"],
    runtime: 74, // Wikidata (varies by restoration, ~66–75 min).
    subs: ["English", "Russian"],
    summary:
      "Aboard a tsarist battleship in 1905, sailors pushed past endurance by rotten food and brutal officers rise up and seize the ship, at the cost of the life of their leader, Vakulinchuk. When his body is laid out in the port of Odessa, the city rallies to the mutineers in grief and solidarity — until tsarist troops descend the great harbour steps in a massacre of unarmed civilians. The uprising swells into a question of whether the rest of the fleet will fire on its own.",
    context:
      "Commissioned for the twentieth anniversary of the 1905 revolution, the silent film was conceived by Eisenstein as a demonstration of cinema's capacity to move masses. He cast largely non-professionals as types rather than individuals and structured the film as a five-act tragedy. Above all it was a laboratory for his theory of montage — the idea that meaning and emotion are generated by the collision of shots rather than by any single image — most famously in the rhythmic, terrifying Odessa Steps sequence, which was a cinematic invention rather than a literal historical event.",
    impact:
      "One of the most influential films ever made: its montage techniques and the Odessa Steps sequence have been studied, imitated, and homaged for a century (from De Palma's The Untouchables to Woody Allen). It helped establish editing as the central expressive tool of cinema and remains a fixture of film education worldwide.",
    themes: ["revolt", "solidarity", "montage"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Battleship_Potemkin",
    starterClassic: true,
  },
  {
    slug: "man-with-a-movie-camera",
    title: "Man with a Movie Camera",
    original: "Человек с киноаппаратом",
    year: 1929,
    country: "USSR",
    studio: "VUFKU",
    director: "Dziga Vertov",
    cast: [],
    genres: ["Silent cinema", "Documentary"],
    runtime: 68, // Wikidata.
    subs: [], // No intertitles or dialogue.
    summary:
      "From dawn to night, a cameraman roams a Soviet city — composited from Moscow, Kyiv, Kharkiv and Odessa — filming people waking, working, marrying, divorcing, giving birth, playing sport and relaxing. There is no story and no intertitles; the 'character' is the act of filming itself, and the film repeatedly shows its own making, including the editor at her bench cutting the very images we watch.",
    context:
      "Produced by the Ukrainian studio VUFKU, the film was the manifesto of Vertov's 'Kino-Eye' movement, which rejected scripted, theatrical fiction ('film-drama') in favour of capturing life unstaged. With his brother, cinematographer Mikhail Kaufman, and editor Elizaveta Svilova, Vertov assembled a dizzying catalogue of techniques — split screens, freeze frames, jump cuts, slow motion, stop-motion, Dutch angles, extreme close-ups — to celebrate both modern urban life and the machinery of cinema.",
    impact:
      "A foundational work of documentary and avant-garde film, it pioneered or popularised a huge range of editing and camera techniques still in use today. Its reputation has only grown — in 2012 a Sight & Sound poll of critics named it the greatest documentary of all time.",
    themes: ["the city", "labor", "the camera-eye"],
    watch: [
      {
        platform: "YouTube",
        label: "Online copy (unverified)",
        sourceType: "UNVERIFIED",
        rightsNote:
          "Public-domain and archival copies circulate online; verify the source and rights before linking. Do not present as official.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Man_with_a_Movie_Camera",
  },
  {
    slug: "ballad-of-a-soldier",
    title: "Ballad of a Soldier",
    original: "Баллада о солдате",
    year: 1959,
    country: "USSR",
    studio: "Mosfilm",
    director: "Grigori Chukhrai",
    cast: ["Vladimir Ivashov", "Zhanna Prokhorenko"],
    genres: ["War", "Drama", "Romance"],
    runtime: 88,
    subs: ["English", "Russian"],
    summary:
      "Nineteen-year-old signalman Alyosha knocks out two German tanks in a moment of panic and is offered a medal; he asks instead for a few days' leave to visit his mother and repair the roof of their home. His journey across a war-torn country becomes a series of brief, tender encounters — with a disabled veteran afraid to go home, with strangers' kindness and pettiness, and with a girl named Shura, with whom he falls in love on a freight train — as the leave dwindles away and the front waits.",
    context:
      "A landmark of Thaw-era cinema made at Mosfilm, Chukhrai's film deliberately turned away from generals and grand strategy to find the war's meaning in the goodness and frailty of ordinary people. The framing device — the audience knows from the opening that Alyosha will not survive the war — lends the gentle road movie an air of elegy, mourning a whole generation through one boy.",
    impact:
      "Internationally celebrated and awarded at Cannes and beyond, it helped define the humane, intimate strain of Soviet war cinema and broadened Western audiences' sense of Soviet film during the Thaw.",
    themes: ["youth", "kindness", "wartime"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Ballad_of_a_Soldier",
    starterClassic: true,
  },
  {
    slug: "war-and-peace",
    title: "War and Peace",
    original: "Война и мир",
    year: 1966, // Released in parts 1966–1967; 1966 is the standard catalogue year.
    country: "USSR",
    studio: "Mosfilm",
    director: "Sergei Bondarchuk",
    cast: ["Lyudmila Savelyeva", "Sergei Bondarchuk", "Vyacheslav Tikhonov"],
    genres: ["Historical epic", "War", "Drama", "Literary adaptation"],
    runtime: 432, // Wikidata; total across four parts.
    subs: ["English", "Russian"],
    summary:
      "Tolstoy's panorama of Russian society during the Napoleonic Wars follows three figures: the searching, illegitimate heir Pierre Bezukhov; his friend Prince Andrei Bolkonsky, who seeks meaning in love and on the battlefield; and the young Natasha Rostova, whose coming-of-age threads through balls, betrayals and bereavement. Their private fortunes play out against the catastrophe of the 1812 French invasion, the burning of Moscow, and the ruinous retreat that consumes the Grande Armée.",
    context:
      "Released in four parts over 1966–67, the film was a vast state undertaking — mounted partly as a Soviet answer to a 1956 Hollywood adaptation — with budgets, sets and crowd scenes on a scale rarely attempted before or since. Director Sergei Bondarchuk, who also played Pierre, drew on thousands of Soviet Army soldiers as extras and pioneering large-format cinematography to stage the Battle of Borodino. The production stretched across years and reportedly endangered Bondarchuk's health.",
    impact:
      "Often cited as one of the most expensive and logistically ambitious films ever made, its enormous, meticulously choreographed battle sequences set a benchmark for epic filmmaking. It won the Academy Award for Best Foreign Language Film and a Golden Globe.",
    themes: ["history", "love", "war"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/War_and_Peace_(film_series)",
  },
  {
    slug: "stalker",
    title: "Stalker",
    original: "Сталкер",
    year: 1979,
    country: "USSR",
    studio: "Mosfilm",
    director: "Andrei Tarkovsky",
    cast: ["Alexander Kaidanovsky", "Anatoly Solonitsyn", "Nikolai Grinko"],
    genres: ["Science fiction", "Drama", "Literary adaptation"],
    runtime: 162,
    subs: ["English", "Russian"],
    summary:
      "In a bleak near-future, a forbidden, militarised area called the Zone is said to contain a room that grants a person's deepest, truest wish. A guide known as the Stalker — one of the few willing to risk the Zone's shifting, lethal traps — leads two clients, a disillusioned Writer and a rationalist Professor, on a slow pilgrimage toward the room. As they approach, the journey becomes less about the Zone's dangers than about whether any of them dares to know what he actually desires.",
    context:
      "Loosely adapted at Mosfilm from the Strugatsky brothers' novel Roadside Picnic, the film was a famously tortured production: an initial version was lost or ruined in processing, forcing a near-complete reshoot, and the toxic locations in Estonia have been linked to the later illnesses of Tarkovsky and members of the crew. Tarkovsky stripped the source novel's action almost entirely, rendering the Zone through long takes, subtly shifting color, and an atmosphere of ruined, waterlogged landscapes.",
    impact:
      "A profoundly influential work whose imagery and central conceit of 'the Zone' permeated later culture, from literature and cinema to the S.T.A.L.K.E.R. video game series. It remains a defining reference for slow, atmospheric, philosophically dense science fiction.",
    themes: ["faith", "desire", "the unknown"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Stalker_(1979_film)",
  },
  {
    slug: "ivans-childhood",
    title: "Ivan's Childhood",
    original: "Иваново детство",
    year: 1962,
    country: "USSR",
    studio: "Mosfilm",
    director: "Andrei Tarkovsky",
    cast: ["Nikolay Burlyaev", "Valentin Zubkov", "Evgeny Zharikov"],
    genres: ["War", "Drama"],
    runtime: 95,
    subs: ["English", "Russian"],
    summary:
      "Twelve-year-old Ivan, his mother and sister killed by the Germans, works as a reconnaissance scout for the Red Army, slipping behind enemy lines because his small size makes him invaluable. Hardened and driven by hatred, he resists the officers who want to send him to safety in a military school. Only in dreams does the lost, sunlit world of his childhood return, in radiant contrast to the ruined, nocturnal landscape of the war.",
    context:
      "Tarkovsky's feature debut, made at Mosfilm when he was in his late twelve, was adapted from a Vladimir Bogomolov story. He transformed conventional war material into something lyrical and dreamlike, intercutting the grim realism of the front with luminous dream sequences, and using stark, expressive imagery of water, fire and dead forests. It established the visual and thematic preoccupations — memory, childhood, a ravaged natural world — that would define his career.",
    impact:
      "It won the Golden Lion at the 1962 Venice Film Festival, launching Tarkovsky internationally, and its poetic approach to wartime trauma influenced filmmakers worldwide; admirers from Ingmar Bergman to Krzysztof Kieślowski praised his work.",
    themes: ["lost childhood", "war", "memory"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Ivan%27s_Childhood",
  },
  {
    slug: "the-mirror",
    title: "The Mirror",
    original: "Зеркало",
    year: 1975,
    country: "USSR",
    studio: "Mosfilm",
    director: "Andrei Tarkovsky",
    cast: ["Margarita Terekhova", "Ignat Daniltsev", "Alla Demidova"],
    genres: ["Drama"],
    runtime: 107,
    subs: ["English", "Russian"],
    summary:
      "A dying, unseen narrator drifts through the fragments of his life: a prewar childhood at a country dacha, his mother at a printing house in the Stalin years, the absence of his father, his own faltering marriage, and his troubled relationship with his son. Personal recollection blurs with dream and with documentary newsreel of the century's upheavals, so that one woman (played by the same actress as both mother and ex-wife) and one boy seem to recur across time.",
    context:
      "Tarkovsky's most personal and formally radical film, produced at Mosfilm, draws directly on his own childhood, his mother's life, and poems written and read by his father, Arseny Tarkovsky. He abandoned linear storytelling entirely, organising the film by the logic of memory and feeling rather than chronology, and weaving in archival footage of the Spanish Civil War, World War II and other events to bind private and national history. Soviet authorities were baffled by it and gave it limited release.",
    impact:
      "Its associative, non-linear structure expanded the vocabulary of autobiographical and 'memory' cinema, and it is now regularly ranked among the greatest films ever made, widely studied for its fusion of personal and historical time.",
    themes: ["memory", "family", "time"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Mirror_(1975_film)",
  },
  {
    slug: "come-and-see",
    title: "Come and See",
    original: "Иди и смотри",
    year: 1985,
    country: "USSR",
    studio: "Mosfilm", // Mosfilm–Belarusfilm co-production (Wikidata); Mosfilm credited as primary.
    director: "Elem Klimov",
    cast: ["Aleksei Kravchenko", "Olga Mironova"],
    genres: ["War", "Drama"],
    runtime: 142, // Criterion full version (Wikidata lists 146).
    subs: ["English", "Russian"],
    summary:
      "A teenage boy named Flyora digs up a rifle and joins the Belarusian partisans against his mother's wishes, eager for the adventure of war. What follows is not adventure but a descent into atrocity: shelling that leaves him half-deaf, the slaughter of his village, and finally the methodical massacre of an entire community herded into a burning barn by an SS punitive unit. By the end his boyish face has aged into something ancient with horror.",
    context:
      "A co-production involving Mosfilm and the Belarusian studio Belarusfilm, released for the fortieth anniversary of the Soviet victory, the film was drawn from survivor testimony of the Nazi destruction of Belarusian villages, in which hundreds of communities were annihilated. Klimov used long takes, near-documentary immediacy, Steadicam, and reportedly live ammunition to immerse the viewer in the boy's experience, refusing any heroic or redemptive framing of combat.",
    impact:
      "Regarded as one of the most harrowing and powerful war films ever made, it is frequently cited by critics and filmmakers — its unflinching, subjective depiction of atrocity is often invoked in discussions of later war cinema such as Saving Private Ryan.",
    themes: ["atrocity", "innocence lost", "witness"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Come_and_See",
  },
  {
    slug: "the-ascent",
    title: "The Ascent",
    original: "Восхождение",
    year: 1977,
    country: "USSR",
    studio: "Mosfilm",
    director: "Larisa Shepitko",
    cast: ["Boris Plotnikov", "Vladimir Gostyukhin"],
    genres: ["War", "Drama"],
    runtime: 111,
    subs: ["English", "Russian"],
    summary:
      "Two Soviet partisans, the steadfast Sotnikov and the pragmatic Rybak, set out across a frozen Belarusian landscape to find food for their hidden unit. Captured by the Germans and their collaborators, the two men face interrogation and the gallows, and their responses diverge: one moves toward sacrifice and a kind of transcendence, the other toward survival at any moral cost. Their final reckoning turns a wartime errand into a parable of conscience.",
    context:
      "Adapted from a Vasil Bykaŭ novella and shot at Mosfilm in punishing real winter conditions, Shepitko's final film before her death in a car accident invests the partisan-war genre with overt spiritual and Christian imagery — the prisoners' ordeal explicitly evokes martyrdom and betrayal. Its stark, snow-blinded close-ups and moral seriousness set it apart from conventional Soviet war pictures.",
    impact:
      "It won the Golden Bear at the 1977 Berlin Film Festival and is held up as one of the finest works by a Soviet woman director, admired for bringing a transcendental, morally searching dimension to war cinema.",
    themes: ["conscience", "endurance", "betrayal"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Ascent_(1977_film)",
  },
  {
    slug: "dersu-uzala",
    title: "Dersu Uzala",
    original: "Дерсу Узала",
    year: 1975,
    country: "USSR / Japan", // Soviet–Japanese co-production (Wikidata); Mosfilm production.
    studio: "Mosfilm",
    director: "Akira Kurosawa",
    cast: ["Maksim Munzuk", "Yuri Solomin"],
    genres: ["Drama", "Adventure", "Literary adaptation"],
    runtime: 142,
    subs: ["English", "Russian"],
    summary:
      "Surveying the wild Ussuri region of the Russian Far East in the early 1900s, the army explorer Vladimir Arsenyev is guided by Dersu Uzala, an aging Nanai hunter who reads the forest, weather and animals like a language and lives by a code of respect for the natural world. Over two expeditions a deep friendship forms between the educated officer and the woodsman. As Dersu's eyesight and his way of life fail, Arsenyev tries to bring him into the city, with quietly tragic results.",
    context:
      "A Soviet–Japanese co-production shot for Mosfilm on location in Siberia, the film gave the great Japanese director Akira Kurosawa a path back to work after a difficult period and a suicide attempt. Adapting Arsenyev's memoirs, Kurosawa used the vast Siberian landscape and his first widescreen 70mm photography to dwell on humanity's small place within nature, a meditative register distinct from his earlier samurai films.",
    impact:
      "It won the Academy Award for Best Foreign Language Film in 1976 and marked a celebrated revival of Kurosawa's career; it is also frequently cited as a landmark of ecological, nature-centered cinema.",
    themes: ["friendship", "nature", "loss"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Dersu_Uzala_(1975_film)",
  },
  {
    slug: "the-irony-of-fate",
    title: "The Irony of Fate",
    original: "Ирония судьбы, или С лёгким паром!",
    year: 1976,
    country: "USSR",
    studio: "Mosfilm",
    director: "Eldar Ryazanov",
    cast: ["Andrei Myagkov", "Barbara Brylska", "Yury Yakovlev"],
    genres: ["Comedy", "Romance"],
    runtime: 184, // Wikidata; two-part television film.
    subs: ["English", "Russian"],
    summary:
      "On New Year's Eve a group of friends get drunk at a Moscow bathhouse and put the wrong man, Zhenya, on a plane to Leningrad. Still insensible, he gives a taxi his Moscow address — and because Soviet cities were built with identical streets, buildings and apartments, his key opens an identical flat in Leningrad belonging to a woman named Nadya. The collision of two strangers, each with a fiancé waiting, turns over one long, snowy night into an unlikely romance.",
    context:
      "A two-part television film made at Mosfilm and first broadcast on New Year's Eve, Ryazanov's gentle comedy built its entire premise on a sly satire of Soviet urban uniformity — the mass-produced apartment blocks that made one city interchangeable with another. Warm, melancholy and song-filled, it captured a particular late-Soviet mood of private life and small wonders.",
    themes: ["chance", "love", "home"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Irony_of_Fate",
    starterClassic: true,
  },
  {
    slug: "moscow-does-not-believe-in-tears",
    title: "Moscow Does Not Believe in Tears",
    original: "Москва слезам не верит",
    year: 1980,
    country: "USSR",
    studio: "Mosfilm",
    director: "Vladimir Menshov",
    cast: ["Vera Alentova", "Aleksey Batalov", "Irina Muravyova"],
    genres: ["Drama", "Romance"],
    runtime: 150, // Two-part film, full total (Wikidata lists 140).
    subs: ["English", "Russian"],
    summary:
      "Three young women share a Moscow workers' dormitory in the late 1950s, each chasing a different idea of happiness. Katerina, abandoned and pregnant after a brief affair with a self-absorbed cameraman, raises her daughter alone while quietly working her way up to become a factory director. Two decades later, settled but lonely, she meets Gosha, a confident, old-fashioned tradesman — and her hard-won independence is tested by love and wounded pride.",
    context:
      "A hugely popular two-part melodrama made at Mosfilm, the film spans the Khrushchev 'Thaw' and the later Brezhnev years, using its heroine's rise to chart changing Soviet ideas about work, womanhood and success. Menshov framed it as a frank, sentimental crowd-pleaser rather than an art film, and its blend of social realism and romance struck a deep chord with domestic audiences.",
    themes: ["ambition", "resilience", "love"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Moscow_Does_Not_Believe_in_Tears",
    starterClassic: true,
  },
  {
    slug: "office-romance",
    title: "Office Romance",
    original: "Служебный роман",
    year: 1977,
    country: "USSR",
    studio: "Mosfilm",
    director: "Eldar Ryazanov",
    cast: ["Andrei Myagkov", "Alisa Freindlich"],
    genres: ["Comedy", "Romance"],
    runtime: 159, // Two-part film, full total (Wikidata lists 151).
    subs: ["English", "Russian"],
    summary:
      "Anatoly Novoseltsev, a meek, divorced statistician raising two sons, is urged by an ambitious old classmate to cozy up to their boss — the severe, joyless 'old maid' who runs their drab statistical bureau — to win a promotion. His clumsy, insincere campaign goes comically wrong, but as the brittle director slowly reveals a lonely, hopeful woman beneath the armor, mutual contempt thaws into genuine, awkward affection.",
    context:
      "Adapted by Ryazanov from his own stage play and shot at Mosfilm, the comedy is set entirely within the grey routine of a Soviet office, gently satirising bureaucracy, careerism and the conformity of working life. Its humor is character-driven and bittersweet, and its evocation of late-1970s Moscow office culture made it one of the most quoted Soviet comedies.",
    themes: ["loneliness", "transformation", "love"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Office_Romance",
  },
  {
    slug: "the-diamond-arm",
    title: "The Diamond Arm",
    original: "Бриллиантовая рука",
    year: 1969,
    country: "USSR",
    studio: "Mosfilm",
    director: "Leonid Gaidai",
    cast: ["Yuri Nikulin", "Andrei Mironov", "Anatoli Papanov"],
    genres: ["Comedy", "Crime"],
    runtime: 100,
    subs: ["English", "Russian"],
    summary:
      "On a cruise abroad, mild-mannered family man Semyon Gorbunkov slips on a sidewalk and is mistaken by smugglers for their courier; they encase his arm in a plaster cast packed with gold and jewels. Back home, the smugglers — a smooth operator and his bumbling henchman — scheme to recover the loot, while Gorbunkov is recruited by the police to help catch them, leading to a cascade of slapstick, disguises and farce.",
    context:
      "One of the most beloved comedies made at Mosfilm, Gaidai's caper paired broad physical comedy and elaborate set pieces with sly digs at consumerism, respectability and Soviet officialdom that slipped past the censors. Built around a trio of the era's most popular comic actors, it became one of the most-watched and most-quoted films in Soviet history.",
    themes: ["mistaken identity", "farce", "temptation"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Diamond_Arm",
    starterClassic: true,
  },
  {
    slug: "operation-y-and-shuriks-other-adventures",
    title: "Operation Y and Shurik's Other Adventures",
    original: "Операция «Ы» и другие приключения Шурика",
    year: 1965,
    country: "USSR",
    studio: "Mosfilm",
    director: "Leonid Gaidai",
    cast: [
      "Aleksandr Demyanenko",
      "Natalya Selezneva",
      "Yuri Nikulin",
      "Georgy Vitsin",
      "Yevgeny Morgunov",
    ],
    genres: ["Comedy"],
    runtime: 95,
    subs: ["English", "Russian"],
    summary:
      "Three self-contained comic stories follow Shurik, an earnest, bespectacled student who keeps stumbling into trouble. In the first he clashes with a loutish bully on a construction site; in the second he crams for an exam and accidentally shares a night of frantic studying with a fellow student; in the third, he is hired as a night watchman and foils a trio of inept crooks plotting a staged 'robbery' of a warehouse.",
    context:
      "A sketch-style comedy made at Mosfilm, the film introduced Gaidai's enduring everyman hero Shurik and the bungling criminal trio (the Coward, the Fool and the Pro) who would recur in his work. Its gentle, knockabout humor mined everyday Soviet life — exams, work brigades, petty corruption — for broad, affectionate laughs.",
    themes: ["everyday life", "mischief", "the underdog"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl:
      "https://en.wikipedia.org/wiki/Operation_Y_and_Shurik%27s_Other_Adventures",
  },
  {
    slug: "kin-dza-dza",
    title: "Kin-dza-dza!",
    original: "Кин-дза-дза!",
    year: 1986,
    country: "USSR",
    studio: "Mosfilm",
    director: "Georgi Daneliya",
    cast: [
      "Stanislav Lyubshin",
      "Yevgeny Leonov",
      "Yuri Yakovlev",
      "Levan Gabriadze",
    ],
    genres: ["Science fiction", "Comedy"],
    runtime: 135, // Two-part film, full total (Wikidata lists 127).
    subs: ["English", "Russian"],
    summary:
      "A gruff Moscow foreman and a young Georgian student press a stranger's odd device and are instantly teleported to Pluke, a desert planet in the Kin-dza-dza galaxy. There society runs on absurd rituals and a near-empty vocabulary: matches ('KTs') are precious currency, a squat-and-utter-'ku' is the required mark of deference, and people are sorted into castes distinguished by who must grovel to whom. Stranded and broke, the pair scheme to get home through this dust-blown, bureaucratic cosmos.",
    context:
      "Made at Mosfilm in the final years of the USSR, Daneliya's shabby, low-budget science-fiction comedy turned its threadbare production design into the point: Pluke is a wasteland of rust and sand, a deadpan parody of social hierarchy, scarcity and meaningless ritual that audiences readily read as a mirror of late-Soviet life. Its invented slang and gestures became instantly recognisable.",
    impact:
      "It became an enduring cult film whose nonsense language and imagery entered the post-Soviet cultural vocabulary; Daneliya later returned to the material with an animated feature reworking, Ku! Kin-dza-dza (2013).",
    themes: ["absurdity", "hierarchy", "humanity"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Kin-dza-dza!",
  },
  {
    slug: "the-color-of-pomegranates",
    title: "The Color of Pomegranates",
    original: "Цвет граната",
    year: 1969,
    country: "USSR",
    studio: "Armenfilm",
    director: "Sergei Parajanov",
    cast: ["Sofiko Chiaureli", "Melkon Aleksanyan"],
    genres: ["Biographical", "Drama"],
    runtime: 79, // Wikidata (Parajanov/restored cut; the Yutkevich Soviet cut is ~73 min).
    subs: ["English", "Russian"],
    summary:
      "Rather than narrating the life of the 18th-century Armenian poet-musician Sayat-Nova, the film evokes it through a series of nearly static, richly symbolic tableaux: childhood among dyers' vats and drying carpets, a monastery, a doomed love at court, the taking of holy orders, old age and death. Costumes, ritual objects, animals and the poet's own verse stand in for biography, so that a life is rendered as a sequence of living paintings.",
    context:
      "Made at the Armenian studio Armenfilm, Parajanov abandoned conventional storytelling for a hermetic, emblematic visual language rooted in Armenian, Georgian and Persian miniature art, religious iconography and folk ritual. Soviet authorities found it incomprehensible and politically suspect; the film was re-edited by another director, Sergei Yutkevich, for wider Soviet release, and Parajanov was later imprisoned, his career repeatedly suppressed.",
    impact:
      "Now celebrated as a singular masterpiece of poetic cinema, its tableau aesthetic has influenced filmmakers, photographers and music-video makers alike; it was restored under Martin Scorsese's World Cinema Project, which renewed global interest in Parajanov's work.",
    themes: ["poetry", "faith", "memory"],
    watch: [
      {
        platform: "YouTube",
        label: "Online copy (unverified)",
        sourceType: "UNVERIFIED",
        rightsNote:
          "Copies circulate online; verify the source and rights before linking. Do not present as official.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Color_of_Pomegranates",
  },
  {
    slug: "the-snow-queen",
    title: "The Snow Queen",
    original: "Снежная королева",
    year: 1957,
    country: "USSR",
    studio: "Soyuzmultfilm",
    director: "Lev Atamanov",
    cast: [],
    genres: ["Animation", "Fairy tale", "Children's films", "Literary adaptation"],
    runtime: 64,
    subs: ["English", "Russian"],
    summary:
      "When a shard of a goblin's cursed mirror lodges in the boy Kai's eye and heart, he turns cold and cruel and is carried off by the icy Snow Queen to her frozen palace in the far north. His devoted friend Gerda sets out to find him, and her long journey — through enchanted gardens, royal courts, a band of robbers and the frozen wastes — is sustained by a warmth and loyalty strong enough to thaw the queen's spell.",
    context:
      "A hand-drawn feature from the Soyuzmultfilm studio adapting Hans Christian Andersen's tale, the film showcased the studio's lush, fluid 'realistic' animation, in places achieved with rotoscoping. Released in the Thaw years, it travelled internationally and was dubbed into many languages, becoming one of the best-known works of Soviet animation abroad.",
    impact:
      "It left a lasting mark on animators internationally; Hayao Miyazaki has spoken of the film as an inspiration that affirmed his commitment to a career in animation.",
    themes: ["friendship", "courage", "warmth vs. cold"],
    watch: [
      {
        platform: "YouTube",
        label: "Soyuzmultfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Snow_Queen_(1957_film)",
  },
  {
    slug: "the-tale-of-tsar-saltan",
    title: "The Tale of Tsar Saltan",
    original: "Сказка о царе Салтане",
    year: 1966, // Aleksandr Ptushko live-action film (Wikidata Q1169922); premiered Jan 1967.
    country: "USSR",
    studio: "Mosfilm",
    director: "Aleksandr Ptushko",
    cast: ["Vladimir Andreyev", "Larisa Golubkina", "Oleg Vidov", "Kseniya Ryabinkina"], // Wikidata P161.
    genres: ["Fairy tale", "Fantasy", "Literary adaptation"],
    runtime: 86, // English Wikipedia infobox (Wikidata lists an outlier 122).
    subs: ["English", "Russian"],
    summary:
      "Tsar Saltan marries the youngest of three sisters, but while he is away at war her jealous siblings forge letters and have the young tsaritsa and her newborn son sealed in a barrel and cast into the sea. Mother and son wash ashore on a deserted island, where the boy — grown miraculously to manhood — rescues a magical swan-princess and conjures a gleaming city. Through her enchantments he wins back his father and exposes the sisters' treachery.",
    context:
      "Adapted from Alexander Pushkin's verse fairy tale and made at Mosfilm by Aleksandr Ptushko, a master of Soviet fantasy filmmaking, the film renders the poem as lavish storybook spectacle: ornate costumes, painted sets, and elaborate practical special effects bring the swan-princess, the squirrel that cracks golden nuts, and the city-from-nothing to vivid life.",
    impact:
      "Ptushko was a pioneer of large-scale fantasy and special-effects cinema in the USSR, and his richly designed fairy-tale films — this among them — were widely seen abroad and helped shape the look of the fantasy genre in Soviet and Eastern European film.",
    themes: ["fairy tale", "justice", "wonder"],
    watch: [
      {
        platform: "YouTube",
        label: "Mosfilm official channel",
        sourceType: "OFFICIAL",
        rightsNote:
          "Released free & legal by the studio — confirm the exact video link before production.",
      },
    ],
    wikipediaUrl: "https://en.wikipedia.org/wiki/The_Tale_of_Tsar_Saltan_(1966_film)",
  },
  // Tier 1–4 catalogue expansion (72 films); see scripts/newFilmsData.ts and
  // lib/filmsExtra.ts. Editorial text is ORIGINAL; metadata enriched from Wikidata.
  ...extraFilms,
];
