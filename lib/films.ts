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
  interpretation?: string;
  themes: string[];
  watch: Watch[];
  wikipediaUrl?: string;
  /** Curated "start with classics" entry point. */
  starterClassic?: boolean;
  /** Wikidata Q-id — links a seed film to the ingestion pipeline (idempotency key). */
  wikidataId?: string;
};

// The Kotfilm seed catalogue (~22 well-known Soviet classics). All
// summary/context/interpretation text is ORIGINAL, written for Kotfilm — never
// copied or closely paraphrased from any source. Studio-released titles are
// labelled OFFICIAL; everything else is UNVERIFIED. Exact video URLs are never
// fabricated. `// TODO` marks values that should be double-checked before use.
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
      "A young woman waits for her fiancé through the upheaval of war, her hope tested by loss and circumstance.",
    context:
      "Part of the cultural thaw after Stalin, it traded heroic clichés for intimate, fallible characters.",
    interpretation:
      "Its fluid, soaring camerawork turns private grief into something universal.",
    themes: ["the home front", "fidelity", "loss"],
    starterClassic: true,
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
      "Scientists aboard a station orbiting a strange ocean-planet find it conjuring their guilt and memory into living form.",
    context:
      "Tarkovsky's meditative reply to colder, hardware-focused science fiction.",
    interpretation:
      "Less about space than about conscience, love, and what it means to be human.",
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
      "A small hedgehog crossing the woods at dusk becomes lost in fog and wonder on his way to visit a friend.",
    context: "A landmark of hand-crafted Soviet animation.",
    interpretation:
      "A few minutes that turn a simple errand into a meditation on the unknown.",
    themes: ["wonder", "fear", "friendship"],
    starterClassic: true,
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
  },
  {
    slug: "battleship-potemkin",
    title: "Battleship Potemkin",
    original: "Броненосец «Потёмкин»",
    year: 1925,
    country: "USSR",
    studio: "Mosfilm", // TODO: produced by Goskino (Mosfilm's predecessor) — verify studio attribution.
    director: "Sergei Eisenstein",
    cast: ["Aleksandr Antonov", "Vladimir Barsky", "Grigori Aleksandrov"],
    genres: ["Silent cinema", "Historical epic", "Drama"],
    runtime: 75, // TODO: runtime varies by restoration (~66–75 min).
    subs: ["English", "Russian"],
    summary:
      "A 1905 mutiny aboard a tsarist warship swells into a citywide uprising, ending in a massacre on the Odessa steps.",
    context:
      "Made for the twentieth anniversary of the 1905 revolution, this silent landmark was built to showcase the power of montage.",
    interpretation:
      "Its rhythmic cutting makes the crowd the true protagonist and turns editing itself into an emotional weapon.",
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
    runtime: 68, // TODO: runtime varies by edition (~68 min).
    subs: [], // No intertitles or dialogue.
    summary:
      "A plotless 'city symphony' follows a cameraman through a single Soviet day, stitching work, leisure, and machinery into pure motion.",
    context:
      "Vertov rejected scripted fiction, treating the camera as a new kind of eye that could capture life unstaged.",
    interpretation:
      "It is cinema about cinema — every split screen and freeze-frame flaunts what the medium alone can do.",
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
      "Granted brief leave for an act of battlefield courage, a young soldier travels home, meeting ordinary people the war has touched.",
    context:
      "A Thaw-era film that found heroism in tenderness rather than combat, and travelled widely abroad.",
    interpretation:
      "The road home becomes a portrait of a generation, its gentleness sharpened by what waits back at the front.",
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
    year: 1966, // TODO: released in parts across 1966–1967.
    country: "USSR",
    studio: "Mosfilm",
    director: "Sergei Bondarchuk",
    cast: ["Lyudmila Savelyeva", "Sergei Bondarchuk", "Vyacheslav Tikhonov"],
    genres: ["Historical epic", "War", "Drama", "Literary adaptation"],
    runtime: 431, // TODO: total across four parts (~427–431 min); verify exact figure.
    subs: ["English", "Russian"],
    summary:
      "Tolstoy's sweep of Russian society through the Napoleonic Wars, following intertwined families across love, disillusion, and the 1812 invasion.",
    context:
      "A state-backed production of staggering scale, mounted partly as a Soviet answer to a Hollywood adaptation.",
    interpretation:
      "Its vast battlefields and intimate drawing rooms together argue that history is made of countless private moments.",
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
      "A guide leads a writer and a scientist into the forbidden 'Zone' toward a room said to grant one's deepest wish.",
    context:
      "Loosely drawn from a Strugatsky brothers novel, Tarkovsky reshaped it into a slow, metaphysical pilgrimage.",
    interpretation:
      "The journey tests not the Zone's dangers but each man's faith, desire, and willingness to know himself.",
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
      "A twelve-year-old orphan works as a scout for the Red Army, his lost childhood surfacing only in dreams.",
    context:
      "Tarkovsky's feature debut won the top prize at Venice and announced his lyrical, dream-laced style.",
    interpretation:
      "War is measured by what it steals from the young, contrasting luminous memory with a ruined present.",
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
      "A dying man's memories, dreams, and newsreels fold together into a non-linear meditation on family and a century of upheaval.",
    context:
      "Tarkovsky's most personal film draws on his own childhood and his mother's life.",
    interpretation:
      "Time here is emotional rather than chronological — the past returns whenever feeling, not sequence, demands it.",
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
    studio: "Mosfilm", // TODO: co-production with Belarusfilm — verify primary studio credit.
    director: "Elem Klimov",
    cast: ["Aleksei Kravchenko", "Olga Mironova"],
    genres: ["War", "Drama"],
    runtime: 142, // TODO: sources cite ~136–142 min; verify.
    subs: ["English", "Russian"],
    summary:
      "A boy joins the partisans in occupied Belarus and witnesses the Nazi destruction of his world in unbearable detail.",
    context:
      "Made for the fortieth anniversary of victory, it draws on survivor testimony of village massacres.",
    interpretation:
      "It refuses heroism, showing war as something that hollows out a child's face frame by frame.",
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
      "Two partisans set out across a frozen landscape for supplies, are captured, and face interrogation and the choice between survival and conscience.",
    context:
      "Shepitko's stark final film won the top prize at the Berlin festival.",
    interpretation:
      "Its snow-blinded imagery turns a wartime errand into a near-spiritual test of integrity.",
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
    country: "USSR", // TODO: Soviet–Japanese co-production.
    studio: "Mosfilm",
    director: "Akira Kurosawa",
    cast: ["Maksim Munzuk", "Yuri Solomin"],
    genres: ["Drama", "Adventure", "Literary adaptation"],
    runtime: 142,
    subs: ["English", "Russian"],
    summary:
      "A Russian surveyor in the Siberian wilderness forms a deep friendship with an aging native hunter who reads the forest like a language.",
    context:
      "Kurosawa directed this Soviet production, adapting explorer Vladimir Arsenyev's memoirs.",
    interpretation:
      "It mourns a way of life attuned to nature, and the loneliness that follows when that world fades.",
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
    runtime: 184, // TODO: two-part television film (~184 min total); verify.
    subs: ["English", "Russian"],
    summary:
      "A drunken mix-up sends a man to an identical apartment in another city, where he stumbles into the life — and love — of a stranger.",
    context:
      "A two-part television comedy that became an inescapable Soviet New Year's tradition.",
    interpretation:
      "Its gentle joke about cookie-cutter housing blocks blossoms into a warm argument for chance over routine.",
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
    runtime: 150, // TODO: two-part film (~150 min total); verify.
    subs: ["English", "Russian"],
    summary:
      "Across two decades, three young women chase work and love in the capital, one rebuilding her life after early heartbreak.",
    context:
      "A hugely popular melodrama that won the Academy Award for Best Foreign Language Film.",
    interpretation:
      "It argues that dignity and happiness are built slowly, through work and self-respect rather than luck.",
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
    runtime: 159, // TODO: two-part film (~159 min total); verify.
    subs: ["English", "Russian"],
    summary:
      "A timid statistician is coached into courting his severe, lonely boss, and unexpected feeling grows between them.",
    context:
      "Ryazanov's workplace comedy gently satirizes Soviet bureaucracy and office life.",
    interpretation:
      "Beneath the farce is a tender case that warmth can thaw even the most armored person.",
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
      "An ordinary tourist is mistaken for a smuggler when jewels are hidden in his plaster cast, dragging him into a bumbling criminal scheme.",
    context:
      "Gaidai's caper became one of the most-watched and most-quoted Soviet comedies.",
    interpretation:
      "Its slapstick hides sly mockery of respectability, vanity, and the everyday absurdities of Soviet life.",
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
      "Three comic episodes follow the earnest student Shurik through a construction site, a frantic exam, and a foiled warehouse robbery.",
    context:
      "Gaidai's sketch-style comedy launched the beloved bespectacled everyman Shurik.",
    interpretation:
      "Each vignette turns small Soviet routines — study, work, security — into bright physical comedy.",
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
    runtime: 135, // TODO: two-part film (~135 min total); verify.
    subs: ["English", "Russian"],
    summary:
      "Two Muscovites are teleported to a desert planet ruled by absurd hierarchy, where matches are treasure and status is bought with a squat and a nonsense word.",
    context:
      "Daneliya's cult science-fiction comedy built a whole shabby cosmos on a tiny budget.",
    interpretation:
      "Its ramshackle dystopia is a deadpan parody of status, scarcity, and social ritual.",
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
    runtime: 78, // TODO: multiple cuts exist (~73–79 min); verify which version.
    subs: ["English", "Russian"],
    summary:
      "The life of the poet Sayat-Nova told not as a story but as a series of living tableaux drawn from his verse and Armenian ritual.",
    context:
      "Parajanov abandoned conventional narrative for a procession of symbolic images, and the film was later recut by the authorities.",
    interpretation:
      "Meaning arrives through emblem and texture rather than plot, making poetry visible as motion and color.",
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
      "A brave girl sets out across a frozen world to rescue her friend from the cold-hearted Snow Queen.",
    context:
      "Atamanov's hand-drawn Soyuzmultfilm feature adapts Hans Christian Andersen and influenced later animators.",
    interpretation:
      "It frames warmth and loyalty as the only forces strong enough to melt the queen's icy reason.",
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
    year: 1966, // TODO: this entry assumes the 1966 Ptushko live-action film; a 1984 Soyuzmultfilm animated version also exists — confirm which is intended.
    country: "USSR",
    studio: "Mosfilm",
    director: "Aleksandr Ptushko",
    cast: ["Larisa Golubkina", "Oleg Vidov"], // TODO: verify full principal cast.
    genres: ["Fairy tale", "Fantasy", "Literary adaptation"],
    runtime: 83, // TODO: verify runtime.
    subs: ["English", "Russian"],
    summary:
      "Slandered by jealous sisters, a banished tsaritsa and her son rise to rule a magical island and reunite their family.",
    context:
      "Ptushko's lavish fantasy adapts Pushkin's verse fairy tale with elaborate sets and effects.",
    interpretation:
      "Its storybook spectacle celebrates wonder, justice, and the righting of envy's wrongs.",
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
];
