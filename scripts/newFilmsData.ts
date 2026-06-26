// One-time generation input for the Tier 1–4 catalogue expansion (72 films).
// I author the editorial fields (summary/context/impact/themes/genres) and the
// principal cast here; scripts/buildExtraFilms.ts enriches each entry with
// verified Wikidata facts (original title, runtime, Q-id, Wikipedia URL) and
// emits lib/filmsExtra.ts. All prose is ORIGINAL, written for Kotfilm.
//
// `source` selects the free & legal watch link + default subtitle set; no exact
// video URLs are ever fabricated (links are confirmed at production time).

export type NewSource =
  | "mosfilm"
  | "soyuzmultfilm"
  | "lenfilm"
  | "gorky"
  | "dovzhenko"
  | "georgiafilm"
  | "kazakhfilm"
  | "odessa"
  | "archive";

export type NewFilm = {
  slug: string;
  title: string;
  year: number;
  director: string;
  studio?: string;
  country?: string;
  source: NewSource;
  /** Override the default subtitle set for the chosen source. */
  subs?: string[];
  starter?: boolean;
  genres: string[];
  themes: string[];
  cast: string[];
  summary: string;
  context: string;
  impact?: string;
};

export const newFilms: NewFilm[] = [
  // ─────────────────────────── TIER 1 ───────────────────────────
  {
    slug: "andrei-rublev",
    title: "Andrei Rublev",
    year: 1966,
    director: "Andrei Tarkovsky",
    studio: "Mosfilm",
    source: "mosfilm",
    starter: true,
    genres: ["Historical epic", "Drama", "Biography"],
    themes: ["faith and doubt", "the artist under power", "violence and grace"],
    cast: ["Anatoly Solonitsyn", "Ivan Lapikov", "Nikolai Grinko", "Nikolai Sergeyev"],
    summary:
      "In a series of loosely linked chapters spanning the brutal early-fifteenth century, the icon painter Andrei Rublev wanders a Russia torn by Tatar raids, famine, and princely cruelty. Witnessing cruelty and despair, he falls silent and renounces his art, until a boy's reckless casting of a great bronze bell restores his faith in creation. The film closes by bursting into color to reveal Rublev's surviving icons.",
    context:
      "Tarkovsky's second feature was shelved and cut by Soviet authorities for years over its bleakness and its frank depiction of cruelty and faith, reaching Western audiences before a full domestic release. It reimagines the historical-biographical film as a meditation on the artist's place in a violent world rather than a tidy life story.",
    impact:
      "Widely regarded as one of the greatest films ever made, it reshaped how cinema could treat history, faith, and the creative act, and influenced generations of filmmakers drawn to its long, contemplative takes and tactile sense of the medieval past.",
  },
  {
    slug: "alexander-nevsky",
    title: "Alexander Nevsky",
    year: 1938,
    director: "Sergei Eisenstein",
    studio: "Mosfilm",
    source: "mosfilm",
    starter: true,
    genres: ["Historical epic", "War", "Drama"],
    themes: ["national defense", "leadership", "myth-making"],
    cast: ["Nikolai Cherkasov", "Nikolai Okhlopkov", "Andrei Abrikosov"],
    summary:
      "In 1242, the prince Alexander Nevsky rallies the people of Novgorod to repel an invading force of Teutonic Knights. The film builds to the famous Battle on the Ice, where the armoured crusaders are lured onto the cracking surface of a frozen lake.",
    context:
      "Made as the threat of Nazi Germany loomed, Eisenstein's first sound film is openly patriotic, pairing stylized medieval pageantry with a stirring Sergei Prokofiev score. It was briefly suppressed during the 1939 Soviet–German pact, then revived as wartime propaganda after the 1941 invasion.",
    impact:
      "Its fusion of music and image — especially Prokofiev's score cut to the visuals of the ice battle — became a textbook model of audiovisual counterpoint, studied and imitated in film schools and epic cinema ever since.",
  },
  {
    slug: "ivan-the-terrible-part-i",
    title: "Ivan the Terrible, Part I",
    year: 1944,
    director: "Sergei Eisenstein",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Historical epic", "Drama"],
    themes: ["power and paranoia", "statecraft", "isolation"],
    cast: ["Nikolai Cherkasov", "Lyudmila Tselikovskaya", "Serafima Birman"],
    summary:
      "The first part of Eisenstein's unfinished trilogy follows the young Tsar Ivan IV as he is crowned, consolidates power against scheming boyars, and is hardened by betrayal and the death of his wife into the autocrat who would unify — and terrorize — Russia.",
    context:
      "Commissioned under Stalin and shot during the war, the film turns history into operatic theatre — chiaroscuro lighting, looming shadows, and stylized, almost frozen performances. Part I won a Stalin Prize; the more critical Part II would be banned.",
    impact:
      "Its expressionist staging and graphic, painterly compositions remain a high-water mark of stylized historical cinema and a key reference for directors exploring the visual language of power.",
  },
  {
    slug: "i-am-cuba",
    title: "I Am Cuba",
    year: 1964,
    director: "Mikhail Kalatozov",
    studio: "Mosfilm",
    country: "USSR / Cuba",
    source: "mosfilm",
    genres: ["Drama", "Propaganda"],
    themes: ["revolution", "inequality", "national awakening"],
    cast: ["Sergio Corrieri", "Luz María Collazo", "José Gallardo"],
    summary:
      "Four loosely connected stories trace Cuba on the eve of and during its revolution: a sex worker in decadent Havana, a peasant burning his own cane field, a radicalized student, and a farmer drawn into the uprising.",
    context:
      "A Soviet–Cuban co-production reuniting Kalatozov with cinematographer Sergei Urusevsky after The Cranes Are Flying, it underperformed in both countries and was nearly forgotten. Its astonishing, gravity-defying long takes — cameras descending buildings and floating through crowds — were decades ahead of their time.",
    impact:
      "Rediscovered and championed by Martin Scorsese and Francis Ford Coppola in the 1990s, its bravura camerawork directly influenced filmmakers like Paul Thomas Anderson and a wave of ambitious long-take cinema.",
  },
  {
    slug: "white-sun-of-the-desert",
    title: "White Sun of the Desert",
    year: 1970,
    director: "Vladimir Motyl",
    studio: "Mosfilm",
    source: "mosfilm",
    starter: true,
    genres: ["Adventure", "Action", "Comedy"],
    themes: ["duty", "loyalty", "the lone hero"],
    cast: ["Anatoly Kuznetsov", "Pavel Luspekayev", "Spartak Mishulin"],
    summary:
      "A weary Red Army soldier crossing the Central Asian desert on his way home is saddled with protecting a harem abandoned by a fleeing warlord. With a grizzled customs officer and a doomed local fighter, he makes a stand against the bandit Abdullah.",
    context:
      "Often called the original Soviet 'Eastern' — a Western transplanted to the deserts of the Civil War — it blends action, deadpan humour, and a beloved Bulat Okudzhava song. It became one of the most quoted films in Russian culture.",
    impact:
      "By tradition, Soviet and later Russian cosmonauts watch it before every launch — a ritual that has made the film a durable cultural touchstone far beyond the cinema.",
  },
  {
    slug: "ivan-vasilievich-changes-profession",
    title: "Ivan Vasilievich Changes Profession",
    year: 1973,
    director: "Leonid Gaidai",
    studio: "Mosfilm",
    source: "mosfilm",
    starter: true,
    genres: ["Comedy", "Science fiction", "Fantasy"],
    themes: ["mistaken identity", "bureaucracy", "time travel"],
    cast: ["Yuri Yakovlev", "Leonid Kuravlyov", "Aleksandr Demyanenko"],
    summary:
      "An eccentric inventor's time machine swaps a bumbling building superintendent and a petty burglar with Tsar Ivan the Terrible. While the Tsar blunders through 1970s Moscow, the superintendent must impersonate him in the sixteenth-century Kremlin.",
    context:
      "Adapted by Gaidai from a Mikhail Bulgakov play, it is among the most beloved Soviet comedies, endlessly rewatched and quoted. Its farce gently satirized both Soviet daily life and the trappings of absolute power.",
  },
  {
    slug: "gentlemen-of-fortune",
    title: "Gentlemen of Fortune",
    year: 1971,
    director: "Aleksandr Seryy",
    studio: "Mosfilm",
    source: "mosfilm",
    starter: true,
    genres: ["Comedy", "Crime"],
    themes: ["mistaken identity", "redemption", "second chances"],
    cast: ["Yevgeny Leonov", "Georgy Vitsin", "Saveli Kramarov"],
    summary:
      "A mild-mannered kindergarten director happens to be the double of a hardened gangster, so police recruit him to pose as the criminal and infiltrate his gang to recover a stolen artefact. The gentle impostor slowly civilizes his thuggish charges.",
    context:
      "Co-written by Georgiy Daneliya and Viktoriya Tokareva, it pairs slapstick with surprising warmth, and its prison-slang one-liners entered everyday Russian speech. It was one of the top box-office hits of its year.",
  },
  {
    slug: "mimino",
    title: "Mimino",
    year: 1977,
    director: "Georgiy Daneliya",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Drama"],
    themes: ["home and belonging", "friendship", "ambition"],
    cast: ["Vakhtang Kikabidze", "Frunzik Mkrtchyan", "Yelena Proklova"],
    summary:
      "A Georgian helicopter pilot from a mountain village dreams of flying international jets. His pursuit of the big city and the wider world leads to comic culture-clash misadventures in Moscow — and a growing homesickness for the life he left behind.",
    context:
      "A signature Daneliya tragicomedy, its affectionate portrait of friendship across Soviet nationalities — Georgian and Armenian leads bickering and bonding — gave it an enduring, gently melancholic charm.",
  },
  {
    slug: "autumn-marathon",
    title: "Autumn Marathon",
    year: 1979,
    director: "Georgiy Daneliya",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Drama"],
    themes: ["indecision", "midlife", "kindness as a trap"],
    cast: ["Oleg Basilashvili", "Natalya Gundareva", "Yevgeny Leonov"],
    summary:
      "A kind, chronically indecisive Leningrad translator can commit neither to his patient wife nor to his younger mistress, and his inability to say no to anyone leaves everyone — including himself — exhausted and unhappy.",
    context:
      "A wry, bittersweet 'sad comedy,' it captures the quiet drift of late-Soviet middle age. Its precise observation of a decent man undone by his own conflict-avoidance made it a critical favourite and an arthouse export.",
  },
  {
    slug: "carnival-night",
    title: "Carnival Night",
    year: 1956,
    director: "Eldar Ryazanov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Musical"],
    themes: ["youth vs. bureaucracy", "joy", "satire"],
    cast: ["Lyudmila Gurchenko", "Igor Ilyinsky", "Yuri Belov"],
    summary:
      "Young staff at a House of Culture scheme to put on a lively, festive New Year's Eve show, dodging a pompous, killjoy acting director who wants to replace fun with dreary lectures.",
    context:
      "Ryazanov's debut feature was a sensation of the Thaw, its lightness and mockery of stuffy officialdom feeling like a breath of fresh air. It made a star of Lyudmila Gurchenko and established the warm satirical comedy Ryazanov would perfect.",
  },
  {
    slug: "shadows-of-forgotten-ancestors",
    title: "Shadows of Forgotten Ancestors",
    year: 1965,
    director: "Sergei Parajanov",
    studio: "Dovzhenko Film Studios",
    country: "USSR (Ukrainian SSR)",
    source: "dovzhenko",
    genres: ["Drama", "Romance", "Folklore"],
    themes: ["fate", "grief", "folk ritual"],
    cast: ["Ivan Mykolaichuk", "Larisa Kadochnikova"],
    summary:
      "In the Carpathian highlands, a young Hutsul man loves a girl from a rival family. After tragedy parts them, he marries another but cannot escape his grief, sliding toward a fate steeped in folk belief and the rhythms of the mountains.",
    context:
      "Parajanov's breakthrough abandoned conventional storytelling for an intoxicating swirl of colour, ethnographic ritual, swirling camerawork, and folk music. It signalled the arrival of one of cinema's great visual poets.",
    impact:
      "A landmark of 'poetic cinema,' it influenced filmmakers across the Soviet republics and abroad, and its sensuous, ritualistic style anticipated Parajanov's own The Color of Pomegranates.",
  },
  {
    slug: "tale-of-tales",
    title: "Tale of Tales",
    year: 1979,
    director: "Yuri Norstein",
    studio: "Soyuzmultfilm",
    source: "soyuzmultfilm",
    starter: true,
    genres: ["Animation", "Drama"],
    themes: ["memory", "wartime loss", "childhood"],
    cast: [],
    summary:
      "A wistful, non-linear animated reverie drifts between images of postwar Soviet life, a poet's blank page, and a little grey wolf cub from a Russian lullaby, weaving private memory and collective wartime grief into a poem without words.",
    context:
      "Made by Norstein with painstaking multi-plane and cutout techniques, it distils the texture of memory itself. It circulated quietly before being widely recognized as a masterpiece.",
    impact:
      "Repeatedly voted the greatest animated film of all time in international polls of animators and critics, it set a benchmark for animation as serious, poetic art.",
  },
  {
    slug: "the-mystery-of-the-third-planet",
    title: "The Mystery of the Third Planet",
    year: 1981,
    director: "Roman Kachanov",
    studio: "Soyuzmultfilm",
    source: "soyuzmultfilm",
    genres: ["Animation", "Science fiction", "Adventure"],
    themes: ["curiosity", "exploration", "wonder"],
    cast: [],
    summary:
      "The girl Alisa, her professor father, and a bumbling captain set off across the galaxy to collect rare creatures for a Moscow zoo, uncovering a mystery involving space pirates and a vanished crew along the way.",
    context:
      "Adapted from Kir Bulychov's children's books, this feature-length animation is cherished for its inventive alien designs, psychedelic colour, and gentle humour — a high point of Soviet science-fiction animation.",
  },
  {
    slug: "hamlet",
    title: "Hamlet",
    year: 1964,
    director: "Grigori Kozintsev",
    studio: "Lenfilm",
    source: "lenfilm",
    genres: ["Drama", "Literary adaptation", "Historical"],
    themes: ["doubt", "corruption", "conscience"],
    cast: ["Innokenty Smoktunovsky", "Mikhail Nazvanov", "Anastasiya Vertinskaya"],
    summary:
      "Shakespeare's prince, played with brooding interiority, returns to a cold stone Elsinore to find his father dead, his mother remarried to his uncle, and the kingdom rotten — and is drawn toward revenge and ruin.",
    context:
      "Using Boris Pasternak's celebrated Russian translation and a thunderous Dmitri Shostakovich score, Kozintsev set the tragedy amid crashing seas and oppressive fortress stone, reading it as a study of an individual conscience crushed by a tyrannical state.",
    impact:
      "Internationally acclaimed — admired by Laurence Olivier among others — it remains one of the most respected screen Shakespeares and a model for treating the plays as cinema rather than filmed theatre.",
  },

  // ─────────────────────────── TIER 2 ───────────────────────────
  {
    slug: "ivan-the-terrible-part-ii",
    title: "Ivan the Terrible, Part II",
    year: 1958,
    director: "Sergei Eisenstein",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Historical epic", "Drama"],
    themes: ["tyranny", "paranoia", "betrayal"],
    cast: ["Nikolai Cherkasov", "Pavel Kadochnikov", "Serafima Birman"],
    summary:
      "Ivan, now ruthless, builds his personal guard and moves against the boyars who plot his downfall, descending into vengeance and a deadly banquet — the latter rendered in startling bursts of colour.",
    context:
      "Completed in 1946 but banned by Stalin, who saw an unflattering mirror in its portrait of a paranoid ruler and his secret police, it was only released in 1958 after both men were dead. It contains some of the earliest colour footage in Soviet narrative cinema.",
    impact:
      "Its expressionist excess and the famous colour banquet sequence are landmarks of stylized filmmaking, endlessly cited in studies of cinema and political art.",
  },
  {
    slug: "a-cruel-romance",
    title: "A Cruel Romance",
    year: 1984,
    director: "Eldar Ryazanov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama", "Romance", "Literary adaptation"],
    themes: ["class and money", "betrayal", "doomed love"],
    cast: ["Larisa Guzeyeva", "Nikita Mikhalkov", "Andrei Myagkov", "Alisa Freindlich"],
    summary:
      "A poor but spirited young woman, courted for her charm and sung over by suitors, is treated as a prize by wealthier men who toy with her affections, leading to heartbreak and tragedy on a Volga steamer.",
    context:
      "Ryazanov's lavish adaptation of Ostrovsky's play 'Without a Dowry' traded his usual comedy for romantic melodrama, with lush period detail and popular songs. It was a huge hit and named the year's best film by Soviet audiences.",
  },
  {
    slug: "a-railway-station-for-two",
    title: "A Railway Station for Two",
    year: 1982,
    director: "Eldar Ryazanov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Drama", "Romance"],
    themes: ["chance", "sacrifice", "second chances"],
    cast: ["Lyudmila Gurchenko", "Oleg Basilashvili", "Nikita Mikhalkov"],
    summary:
      "A pianist stranded at a provincial railway station, awaiting trial for a crime he didn't commit, strikes up a prickly, then tender, romance with a brash station waitress as their separate troubles draw them together.",
    context:
      "A characteristic Ryazanov tragicomedy, it balances bustling station farce with real pathos and ends on a bleakly hopeful note in the camps. Gurchenko and Basilashvili anchor it with a beloved central pairing.",
  },
  {
    slug: "hussar-ballad",
    title: "Hussar Ballad",
    year: 1962,
    director: "Eldar Ryazanov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Musical", "War"],
    themes: ["disguise", "patriotism", "gender play"],
    cast: ["Larisa Golubkina", "Yuri Yakovlev", "Igor Ilyinsky"],
    summary:
      "During the 1812 war against Napoleon, a spirited young noblewoman disguises herself as a cavalry officer to fight the French, complicating a romance with the officer she had been betrothed to.",
    context:
      "A buoyant verse-and-song operetta on film, released for the 150th anniversary of the 1812 campaign, it became a perennial holiday favourite for its wit, music, and cross-dressing comedy of manners.",
  },
  {
    slug: "the-garage",
    title: "The Garage",
    year: 1979,
    director: "Eldar Ryazanov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Satire"],
    themes: ["bureaucracy", "conformity", "self-interest"],
    cast: ["Liya Akhedzhakova", "Valentin Gaft", "Iya Savvina"],
    summary:
      "Members of a garage cooperative are locked in an all-night meeting to decide which four of them will lose their promised parking spaces, and the polite façade collapses into a savage comedy of self-interest, cowardice, and revolt.",
    context:
      "Set almost entirely in one room, Ryazanov's chamber satire skewers Soviet committee culture and petty privilege with unusual bite — a sharp, claustrophobic farce about how quickly civility dissolves under pressure.",
  },
  {
    slug: "wings",
    title: "Wings",
    year: 1966,
    director: "Larisa Shepitko",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama"],
    themes: ["aging", "purpose", "the cost of heroism"],
    cast: ["Maya Bulgakova", "Zhanna Bolotova"],
    summary:
      "A celebrated former fighter pilot, now a school headmistress, struggles to find meaning in peacetime. Estranged from her daughter and out of step with a younger generation, she aches for the freedom of the sky she has lost.",
    context:
      "Shepitko's early feature is a quietly radical portrait of a woman whose wartime heroism has left her stranded in ordinary life. Its sympathetic, unsentimental study of a difficult heroine pairs naturally with her later The Ascent.",
  },
  {
    slug: "welcome-or-no-trespassing",
    title: "Welcome, or No Trespassing",
    year: 1964,
    director: "Elem Klimov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Satire"],
    themes: ["authority", "childhood", "rebellion"],
    cast: ["Yevgeny Yevstigneev", "Arina Aleynikova"],
    summary:
      "At a regimented Young Pioneer summer camp run by a self-important director, a boy expelled for a minor infraction secretly sneaks back in, and the children's small rebellions expose the absurdity of the rules imposed on them.",
    context:
      "Klimov's debut is a sharp, affectionate satire of Soviet officiousness disguised as a children's comedy. Its mockery of petty authority nearly got it shelved before it found an audience.",
  },
  {
    slug: "fate-of-a-man",
    title: "Fate of a Man",
    year: 1959,
    director: "Sergei Bondarchuk",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["War", "Drama"],
    themes: ["endurance", "loss", "dignity"],
    cast: ["Sergei Bondarchuk", "Pavel Boriskin", "Zinaida Kiriyenko"],
    summary:
      "A Soviet driver recounts how the war took everything from him — capture, a brutal POW camp, the deaths of his wife and children — and how, broken but unbowed, he chooses to adopt an orphaned boy and begin again.",
    context:
      "Bondarchuk's directorial debut, adapted from Sholokhov, was among the first Soviet films to portray a former prisoner of war sympathetically rather than as a suspect — a notable softening in the Thaw's treatment of the war.",
  },
  {
    slug: "the-dawns-here-are-quiet",
    title: "The Dawns Here Are Quiet",
    year: 1972,
    director: "Stanislav Rostotsky",
    studio: "Gorky Film Studio",
    source: "gorky",
    genres: ["War", "Drama"],
    themes: ["sacrifice", "women at war", "innocence lost"],
    cast: ["Andrei Martynov", "Olga Ostroumova", "Yelena Drapeko"],
    summary:
      "In 1942, a gruff sergeant commands a remote anti-aircraft post staffed by young women. When they discover German paratroopers in the forest, the small unit makes a desperate, costly stand.",
    context:
      "Adapted from Boris Vasilyev's novella, it intercuts the women's peacetime dreams — in colour — with the grim monochrome of the fighting. One of the most beloved Soviet war films, it was nominated for an Academy Award.",
  },
  {
    slug: "sadko",
    title: "Sadko",
    year: 1953,
    director: "Aleksandr Ptushko",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Fantasy", "Adventure", "Musical"],
    themes: ["the quest", "homeland", "wonder"],
    cast: ["Sergei Stolyarov", "Alla Larionova"],
    summary:
      "The minstrel-hero Sadko of old Novgorod sets sail across the world in search of happiness for his people, braving foreign lands and the underwater kingdom of the Sea Tsar before realizing the treasure he sought lay at home.",
    context:
      "A spectacular fairy-tale epic drawing on Russian bylina legend and Rimsky-Korsakov's music, Ptushko's film showcased lavish sets and effects. It won a major prize at Venice and was later dubbed and re-edited for the West.",
  },
  {
    slug: "ilya-muromets",
    title: "Ilya Muromets",
    year: 1956,
    director: "Aleksandr Ptushko",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Fantasy", "Adventure", "Historical epic"],
    themes: ["heroism", "defending the land", "legend"],
    cast: ["Boris Andreyev", "Andrei Abrikosov", "Shukur Burkhanov"],
    summary:
      "The legendary bogatyr Ilya Muromets rises from a crippled peasant to Russia's mightiest warrior, defending the land of Rus against the Tugar horde and a three-headed dragon.",
    context:
      "Adapted from Russian epic folklore, it was the Soviet Union's first widescreen film with stereophonic sound, and its huge battle scenes and creature effects pushed the era's spectacle to new scale.",
  },
  {
    slug: "viy",
    title: "Viy",
    year: 1967,
    director: "Konstantin Yershov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Horror", "Fantasy", "Folklore"],
    themes: ["fear", "the supernatural", "temptation"],
    cast: ["Leonid Kuravlyov", "Natalya Varley"],
    summary:
      "A young seminarian is forced to stand watch over the corpse of a beautiful witch for three nights in a remote church, where each night summons ever more terrifying demons — culminating in the monstrous Viy.",
    context:
      "Adapted from Gogol's horror tale, it is essentially the only outright horror film of the Soviet era, its imaginative practical effects and folk-gothic atmosphere giving it lasting cult status.",
  },
  {
    slug: "cheburashka-and-gena-the-crocodile",
    title: "Cheburashka and Gena the Crocodile",
    year: 1969,
    director: "Roman Kachanov",
    studio: "Soyuzmultfilm",
    source: "soyuzmultfilm",
    genres: ["Animation", "Family"],
    themes: ["friendship", "loneliness", "community"],
    cast: [],
    summary:
      "A small, big-eared creature of unknown species and a gentle, accordion-playing crocodile named Gena set out to build a 'house of friendship' for the lonely, gathering an unlikely community along the way.",
    context:
      "Roman Kachanov's stop-motion shorts, written with Eduard Uspensky, introduced one of the most cherished characters in Soviet culture. Cheburashka became a national mascot, later embraced internationally.",
  },
  {
    slug: "winnie-the-pooh",
    title: "Winnie-the-Pooh",
    year: 1969,
    director: "Fyodor Khitruk",
    studio: "Soyuzmultfilm",
    source: "soyuzmultfilm",
    genres: ["Animation", "Family", "Comedy"],
    themes: ["friendship", "play", "appetite"],
    cast: [],
    summary:
      "A round, philosophical brown bear with a fondness for honey ambles through a series of small adventures with his anxious friend Piglet, composing little songs and getting comically stuck.",
    context:
      "Khitruk's distinctive, flat-graphic interpretation of A. A. Milne's bear, with Yevgeny Leonov's gruff, beloved voice, became the definitive version for Russian audiences — quite distinct from the Disney design.",
  },

  // ─────────────────────────── TIER 3 ───────────────────────────
  {
    slug: "earth",
    title: "Earth",
    year: 1930,
    director: "Aleksandr Dovzhenko",
    studio: "VUFKU",
    country: "USSR (Ukrainian SSR)",
    source: "archive",
    subs: ["English"],
    genres: ["Silent cinema", "Drama"],
    themes: ["life and death", "the land", "modernity"],
    cast: ["Stepan Shkurat", "Semyon Svashenko", "Yuliya Solntseva"],
    summary:
      "In a Ukrainian village, the arrival of a tractor and the push for collective farming set the young against the old and the poor against the kulaks. When a young activist is murdered, the community answers with a defiant, life-affirming funeral.",
    context:
      "The final part of Dovzhenko's 'Ukraine Trilogy,' it was attacked at home as politically ambiguous even as it was hailed abroad as a masterpiece. Its rhapsodic images of fields, faces, and fruit elevate a collectivization story into a meditation on nature's cycles.",
    impact:
      "A landmark of poetic, associative montage, it is regularly named among the greatest films ever made and shaped the lyrical strain of cinema that later filmmakers, including Tarkovsky and Parajanov, would draw on.",
  },
  {
    slug: "arsenal",
    title: "Arsenal",
    year: 1929,
    director: "Aleksandr Dovzhenko",
    studio: "VUFKU",
    country: "USSR (Ukrainian SSR)",
    source: "archive",
    subs: ["English"],
    genres: ["Silent cinema", "War", "Drama"],
    themes: ["revolution", "war's futility", "national identity"],
    cast: ["Semyon Svashenko", "Amvrosii Buchma"],
    summary:
      "Against the chaos of World War I and the Ukrainian struggles that followed, the film follows a soldier-turned-worker through the 1918 Bolshevik uprising at the Arsenal factory in Kyiv.",
    context:
      "The second of Dovzhenko's Ukraine films fractures chronology into bold, symbolic images. Its anti-war passages and surreal flourishes mark it as one of the most formally daring works of the Soviet silent avant-garde.",
    impact:
      "Its associative editing and poetic symbolism were widely influential on montage cinema and confirmed Dovzhenko as a major voice alongside Eisenstein and Pudovkin.",
  },
  {
    slug: "strike",
    title: "Strike",
    year: 1925,
    director: "Sergei Eisenstein",
    studio: "Goskino",
    source: "archive",
    subs: ["English"],
    genres: ["Silent cinema", "Drama"],
    themes: ["labor and capital", "collective action", "repression"],
    cast: ["Grigori Aleksandrov", "Maksim Shtraukh"],
    summary:
      "Workers at a Tsarist-era factory walk out after a comrade's suicide, organizing against brutal management and police spies until the strike is crushed in a savage crackdown.",
    context:
      "Eisenstein's feature debut introduced his theory of montage and the idea of the masses, rather than an individual, as the hero. Its agitational energy and inventive cutting announced a new kind of revolutionary cinema.",
    impact:
      "It pioneered the 'montage of attractions,' juxtaposing shocking images — most famously intercutting a massacre with slaughterhouse footage — a technique foundational to film editing theory.",
  },
  {
    slug: "october-ten-days-that-shook-the-world",
    title: "October: Ten Days That Shook the World",
    year: 1927,
    director: "Sergei Eisenstein",
    studio: "Sovkino",
    source: "archive",
    subs: ["English"],
    genres: ["Silent cinema", "Historical epic"],
    themes: ["revolution", "history as spectacle", "the masses"],
    cast: ["Vasili Nikandrov", "Nikolai Popov"],
    summary:
      "A dramatized reconstruction of the 1917 October Revolution in Petrograd, from the fall of the Provisional Government to the storming of the Winter Palace, staged on a vast scale with crowds of extras.",
    context:
      "Commissioned for the revolution's tenth anniversary, Eisenstein restaged events at the actual locations. Its experiments with 'intellectual montage' — cutting to convey abstract ideas — proved divisive even among his peers.",
    impact:
      "Its reconstruction of the Winter Palace assault became so iconic it is often mistaken for documentary footage, and its montage experiments remain central to film theory.",
  },
  {
    slug: "mother",
    title: "Mother",
    year: 1926,
    director: "Vsevolod Pudovkin",
    studio: "Mezhrabpom-Rus",
    source: "archive",
    subs: ["English"],
    genres: ["Silent cinema", "Drama"],
    themes: ["awakening", "family and politics", "sacrifice"],
    cast: ["Vera Baranovskaya", "Nikolai Batalov"],
    summary:
      "A downtrodden mother inadvertently betrays her revolutionary son to the authorities, then is transformed by his imprisonment into a committed participant in the 1905 workers' uprising.",
    context:
      "Adapted from Gorky's novel, Pudovkin's film offered a more emotional, character-driven counterpoint to Eisenstein's mass-hero montage, building feeling through accumulation of detail and human faces.",
    impact:
      "A model of Soviet montage built on emotional 'linkage' rather than collision, it became a key reference text in the development of editing theory.",
  },
  {
    slug: "the-end-of-st-petersburg",
    title: "The End of St. Petersburg",
    year: 1927,
    director: "Vsevolod Pudovkin",
    studio: "Mezhrabpom-Rus",
    source: "archive",
    subs: ["English"],
    genres: ["Silent cinema", "Historical epic", "Drama"],
    themes: ["exploitation", "war", "revolution"],
    cast: ["Ivan Chuvelyov", "Vera Baranovskaya", "Aleksandr Chistyakov"],
    summary:
      "A peasant lad arriving in the capital to find work is drawn through strike-breaking, the trenches of World War I, and finally the revolution that topples the old order.",
    context:
      "Made, like October, for the revolution's tenth anniversary, Pudovkin's epic personalizes history through one bewildered young man, contrasting stock-market greed with the misery of the front.",
  },
  {
    slug: "storm-over-asia",
    title: "Storm Over Asia",
    year: 1928,
    director: "Vsevolod Pudovkin",
    studio: "Mezhrabpom",
    source: "archive",
    subs: ["English"],
    genres: ["Silent cinema", "Drama", "Adventure"],
    themes: ["colonialism", "identity", "uprising"],
    cast: ["Valéry Inkijinoff", "Aleksandr Chistyakov"],
    summary:
      "A Mongol trapper, cheated by a European fur merchant, joins Soviet partisans against occupying forces. Captured and nearly executed, he is propped up by the occupiers as a puppet 'descendant of Genghis Khan' — until he rises in fury.",
    context:
      "Shot largely in Buryat-Mongolia, Pudovkin's anti-imperialist epic blends ethnographic spectacle with montage. Its visionary final 'storm' sweeping away the occupiers is among silent cinema's most striking endings.",
  },
  {
    slug: "aelita",
    title: "Aelita: Queen of Mars",
    year: 1924,
    director: "Yakov Protazanov",
    studio: "Mezhrabpom-Rus",
    source: "archive",
    subs: ["English"],
    genres: ["Silent cinema", "Science fiction"],
    themes: ["fantasy vs. reality", "revolution", "longing"],
    cast: ["Yuliya Solntseva", "Nikolai Tsereteli", "Igor Ilyinsky"],
    summary:
      "A daydreaming Moscow engineer, imagining a journey to Mars and a romance with its queen Aelita, fantasizes leading a revolution among the planet's oppressed workers — a reverie entangled with his troubled life on Earth.",
    context:
      "One of the first feature-length science-fiction films, it is famous for its angular Constructivist Martian sets and costumes. Its real subject, though, is post-revolutionary Moscow, with the Mars story revealed as escapist fantasy.",
    impact:
      "Its avant-garde production design influenced the visual imagination of science fiction, and the film is a touchstone in the genre's early history.",
  },
  {
    slug: "bed-and-sofa",
    title: "Bed and Sofa",
    year: 1927,
    director: "Abram Room",
    studio: "Sovkino",
    source: "archive",
    subs: ["English"],
    genres: ["Silent cinema", "Drama"],
    themes: ["the housing crisis", "marriage", "women's autonomy"],
    cast: ["Lyudmila Semyonova", "Nikolai Batalov", "Vladimir Fogel"],
    summary:
      "In cramped Moscow housing, a married couple takes in the husband's old army friend, and the wife — neglected by both men — drifts into an affair, then must decide her own fate when she becomes pregnant.",
    context:
      "A startlingly frank domestic drama for its time, Room's film tackled the Soviet housing shortage, casual male chauvinism, and abortion. Its sympathy for the woman's independence made it controversial and ahead of its era.",
  },
  {
    slug: "chapaev",
    title: "Chapaev",
    year: 1934,
    director: "Georgi Vasilyev",
    studio: "Lenfilm",
    source: "lenfilm",
    genres: ["War", "Drama", "Biography"],
    themes: ["leadership", "revolution", "loyalty"],
    cast: ["Boris Babochkin", "Leonid Kmit", "Varvara Myasnikova"],
    summary:
      "During the Civil War, the charismatic, untutored Red commander Vasily Chapaev leads his division against White forces, his rough instinct tempered by a Bolshevik commissar, in a partnership that ends in tragedy.",
    context:
      "Directed by the unrelated 'Vasilyev brothers,' it was one of the first major Soviet sound films and a colossal popular hit, watched repeatedly by millions. Stalin reportedly screened it dozens of times.",
    impact:
      "It became the model of Socialist Realist cinema — accessible, heroic, emotionally direct — and set the template that countless Soviet films would follow for decades.",
  },
  {
    slug: "jolly-fellows",
    title: "Jolly Fellows",
    year: 1934,
    director: "Grigori Aleksandrov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Musical", "Comedy"],
    themes: ["talent and luck", "joy", "self-invention"],
    cast: ["Leonid Utyosov", "Lyubov Orlova"],
    summary:
      "A cheerful shepherd with a gift for music is mistaken for a famous conductor, setting off a chain of slapstick mix-ups that carry him and a talented housemaid from the countryside to the concert stage.",
    context:
      "The Soviet Union's first true musical comedy, made by Aleksandrov after studying Hollywood, it launched the stardom of Lyubov Orlova and a wave of upbeat song-and-dance films sanctioned as wholesome mass entertainment.",
    impact:
      "It established the Soviet musical-comedy genre and the Aleksandrov–Orlova partnership that would dominate it through the 1930s and 40s.",
  },
  {
    slug: "brief-encounters",
    title: "Brief Encounters",
    year: 1967,
    director: "Kira Muratova",
    studio: "Odessa Film Studio",
    source: "odessa",
    genres: ["Drama", "Romance"],
    themes: ["longing", "domestic life", "the wandering man"],
    cast: ["Kira Muratova", "Vladimir Vysotsky", "Nina Ruslanova"],
    summary:
      "A busy municipal official and the young woman who becomes her housekeeper are both, in different ways, in love with the same restless, guitar-playing geologist who drifts in and out of their lives.",
    context:
      "Muratova's early feature, in which she also stars, is a delicate, fragmented study of female longing built from flashbacks. Quietly suppressed for years, it later gained recognition as an early work by one of the most original post-Soviet auteurs.",
  },

  // ─────────────────────────── TIER 4 ───────────────────────────
  {
    slug: "kidnapping-caucasian-style",
    title: "Kidnapping, Caucasian Style",
    year: 1967,
    director: "Leonid Gaidai",
    studio: "Mosfilm",
    source: "mosfilm",
    starter: true,
    genres: ["Comedy"],
    themes: ["tradition vs. modernity", "farce", "romance"],
    cast: ["Aleksandr Demyanenko", "Natalya Varley", "Yuri Nikulin"],
    summary:
      "A naïve student collecting folklore in the Caucasus is duped into helping a corrupt official 'kidnap a bride' — the spirited young woman the official wants to marry off — before realizing the scheme and turning the tables.",
    context:
      "The third of Gaidai's hugely popular 'Shurik' comedies, it deployed his bumbling-trio comic villains and brisk slapstick. Endlessly quoted, it remains one of the best-loved Soviet comedies.",
  },
  {
    slug: "the-twelve-chairs",
    title: "The Twelve Chairs",
    year: 1971,
    director: "Leonid Gaidai",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Adventure", "Literary adaptation"],
    themes: ["greed", "the hunt", "satire of the NEP era"],
    cast: ["Archil Gomiashvili", "Sergei Filippov", "Mikhail Pugovkin"],
    summary:
      "A smooth con man and a former nobleman chase a set of twelve dining chairs across the 1920s Soviet Union, one of which is rumoured to hide a fortune in jewels sewn into its upholstery.",
    context:
      "Gaidai's adaptation of the classic Ilf and Petrov satirical novel follows the rogue Ostap Bender through a picaresque comedy of post-revolutionary opportunism, a much-filmed story Gaidai rendered with his trademark verve.",
  },
  {
    slug: "walking-the-streets-of-moscow",
    title: "Walking the Streets of Moscow",
    year: 1964,
    director: "Georgiy Daneliya",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Drama", "Romance"],
    themes: ["youth", "the city", "fleeting connection"],
    cast: ["Nikita Mikhalkov", "Aleksey Loktev", "Galina Polskikh"],
    summary:
      "Over a single summer day in Moscow, a young Siberian writer in town for a few hours, a carefree local teenager, and the people they meet drift through small encounters, flirtations, and the simple pleasure of the city.",
    context:
      "A quintessential film of the Thaw, light as air and gently lyrical, it captured a hopeful, open-hearted mood in Soviet youth culture and gave the teenage Nikita Mikhalkov a breakout role and a famous closing song.",
  },
  {
    slug: "afonya",
    title: "Afonya",
    year: 1975,
    director: "Georgiy Daneliya",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Drama"],
    themes: ["drift", "loneliness", "redemption"],
    cast: ["Leonid Kuravlyov", "Yevgenia Simonova", "Yevgeny Leonov"],
    summary:
      "A charming but feckless plumber coasts through life on small scams, drink, and easy charm, alienating those around him — until a devoted young woman's patient affection offers him a chance to change.",
    context:
      "One of the biggest box-office hits of its era, Daneliya's tragicomedy paired laughs with an honest look at aimlessness and casual moral decay in everyday Soviet life, anchored by Kuravlyov's likeable wastrel.",
  },
  {
    slug: "love-and-doves",
    title: "Love and Doves",
    year: 1985,
    director: "Vladimir Menshov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Drama", "Romance"],
    themes: ["family", "temptation", "forgiveness"],
    cast: ["Aleksandr Mikhailov", "Nina Doroshina", "Lyudmila Gurchenko"],
    summary:
      "A rural family man who keeps doves is swept off to a southern resort by a glamorous city woman, abandoning his wife and children — before homesickness and second thoughts pull him back toward the family he left.",
    context:
      "Menshov's warm-hearted village comedy, adapted from a stage play, became a much-loved crowd-pleaser, its broad humour and folk texture making it a fixture of Russian television ever since.",
  },
  {
    slug: "an-ordinary-miracle",
    title: "An Ordinary Miracle",
    year: 1978,
    director: "Mark Zakharov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Fantasy", "Romance", "Musical"],
    themes: ["love and transformation", "free will", "magic"],
    cast: ["Oleg Yankovsky", "Yevgeny Leonov", "Andrei Mironov"],
    summary:
      "A wizard, for his own amusement and instruction, turns a bear into a young man who can only become a bear again if a princess kisses him — and then, having engineered exactly that love story, can only watch as it unfolds.",
    context:
      "Zakharov's whimsical two-part television film, adapted from Yevgeny Schwartz's allegorical play, mixes fairy-tale fantasy, sparkling dialogue, and Gennady Gladkov songs into a beloved meditation on love disguised as a children's tale.",
  },
  {
    slug: "that-same-munchausen",
    title: "That Same Munchausen",
    year: 1979,
    director: "Mark Zakharov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Fantasy", "Drama"],
    themes: ["truth vs. conformity", "imagination", "integrity"],
    cast: ["Oleg Yankovsky", "Inna Churikova", "Leonid Bronevoy"],
    summary:
      "The fabled Baron Munchausen insists on living by his own extraordinary truth in a town that would much prefer he be ordinary, and the pressure to renounce his impossible deeds — even to fake his own death — becomes a quiet tragedy of the free spirit.",
    context:
      "A philosophical television comedy by Zakharov, its tale of a dreamer crushed by demands to conform was widely read as a sly parable of intellectual life under Soviet conformism. Yankovsky's Baron is among his signature roles.",
  },
  {
    slug: "heart-of-a-dog",
    title: "Heart of a Dog",
    year: 1988,
    director: "Vladimir Bortko",
    studio: "Lenfilm",
    source: "lenfilm",
    genres: ["Drama", "Satire", "Science fiction"],
    themes: ["nature vs. nurture", "revolution's excesses", "hubris"],
    cast: ["Yevgeny Yevstigneev", "Vladimir Tolokonnikov", "Roman Kartsev"],
    summary:
      "A celebrated Moscow professor transplants human glands into a stray dog, which gradually becomes a crude, belligerent man — a 'new Soviet citizen' whose vulgarity and opportunism turn the scientist's experiment into a disaster.",
    context:
      "Bortko's faithful, sepia-toned adaptation of Bulgakov's once-banned satirical novella arrived during glasnost and became an instant classic, its biting allegory of the revolution's social engineering newly speakable.",
  },
  {
    slug: "liberation",
    title: "Liberation",
    year: 1969,
    director: "Yuri Ozerov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["War", "Historical epic"],
    themes: ["total war", "command", "the road to victory"],
    cast: ["Nikolai Olyalin", "Larisa Golubkina", "Bukhuti Zakariadze"],
    summary:
      "A sweeping five-film cycle dramatizing the Eastern Front from the 1943 Battle of Kursk to the fall of Berlin, intercutting the experiences of ordinary soldiers with the strategic decisions of generals and heads of state.",
    context:
      "An enormous state-backed epic mounted with real tanks, thousands of troops, and vast staged battles, Ozerov's cycle aimed to be the definitive Soviet account of the war's final years — monumental in scale and official in tone.",
  },
  {
    slug: "they-fought-for-their-country",
    title: "They Fought for Their Country",
    year: 1975,
    director: "Sergei Bondarchuk",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["War", "Drama"],
    themes: ["comradeship", "retreat", "endurance"],
    cast: ["Vasily Shukshin", "Vyacheslav Tikhonov", "Sergei Bondarchuk"],
    summary:
      "During the grim 1942 retreat toward Stalingrad, a battered Soviet infantry unit fights rear-guard actions and clings to its dwindling ranks, the men's banter and bonds holding them together amid exhaustion and loss.",
    context:
      "Adapted from Sholokhov, Bondarchuk's film is notable for its unglamorous, ground-level view of defeat and survival, and for being the final screen role of the writer-director-actor Vasily Shukshin, who died during production.",
  },
  {
    slug: "belorussian-station",
    title: "Belorussian Station",
    year: 1971,
    director: "Andrei Smirnov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama"],
    themes: ["veterans", "memory", "brotherhood"],
    cast: ["Yevgeny Leonov", "Anatoly Papanov", "Nina Urgant"],
    summary:
      "Four veterans reunite in 1960s Moscow for a comrade's funeral and spend a long day and night rediscovering, beneath their ordinary civilian lives, the bond forged in the war.",
    context:
      "A restrained, humane drama about how the war's generation carried its experience into peacetime, it is remembered especially for Bulat Okudzhava's song 'We Need One Victory,' which became an anthem in its own right.",
  },
  {
    slug: "twenty-days-without-war",
    title: "Twenty Days Without War",
    year: 1976,
    director: "Aleksei German",
    studio: "Lenfilm",
    source: "lenfilm",
    genres: ["War", "Drama", "Romance"],
    themes: ["the home front", "weariness", "quiet love"],
    cast: ["Yuri Nikulin", "Lyudmila Gurchenko", "Aleksei Petrenko"],
    summary:
      "A war correspondent on leave from Stalingrad spends twenty days far from the front — visiting a film set based on his writing, comforting the bereaved, and beginning a tentative romance — before returning to the fighting.",
    context:
      "German's spare, documentary-textured drama deliberately avoids combat to show the war's emotional undertow in rear-area life. Casting the beloved comic Yuri Nikulin against type lent its restraint unusual weight.",
  },
  {
    slug: "an-unfinished-piece-for-mechanical-piano",
    title: "An Unfinished Piece for Mechanical Piano",
    year: 1977,
    director: "Nikita Mikhalkov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama", "Literary adaptation"],
    themes: ["wasted lives", "self-deception", "lost youth"],
    cast: ["Aleksandr Kalyagin", "Yelena Solovey", "Yevgenia Glushenko"],
    summary:
      "At a faded country estate, a summer gathering of provincial gentry simmers with old flirtations and regrets until a disillusioned schoolteacher erupts, confronting them all — and himself — with the smallness of their lives.",
    context:
      "Mikhalkov's elegant ensemble piece, drawn from early Chekhov, distils the playwright's themes of stagnation and self-delusion into a single bittersweet day, and won major international prizes.",
  },
  {
    slug: "a-slave-of-love",
    title: "A Slave of Love",
    year: 1976,
    director: "Nikita Mikhalkov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama", "Romance", "Historical"],
    themes: ["art vs. politics", "awakening", "revolution"],
    cast: ["Yelena Solovey", "Rodion Nakhapetov", "Aleksandr Kalyagin"],
    summary:
      "During the Civil War, a silent-film company shoots a frivolous melodrama at a southern resort, oblivious to the revolution around them, until the pampered leading lady falls for a cameraman secretly aiding the Bolsheviks and is forced to take sides.",
    context:
      "A nostalgic, sun-drenched homage to early cinema that turns abruptly serious, Mikhalkov's film contrasts the dreamworld of the movies with the violence of history closing in.",
  },
  {
    slug: "oblomov",
    title: "A Few Days from the Life of I.I. Oblomov",
    year: 1980,
    director: "Nikita Mikhalkov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama", "Literary adaptation"],
    themes: ["inertia", "friendship", "the Russian soul"],
    cast: ["Oleg Tabakov", "Yuri Bogatyryov", "Elena Solovey"],
    summary:
      "A gentle, hopelessly indolent nobleman who can barely rouse himself from his sofa is drawn briefly toward life and love by his energetic friend and a spirited young woman, before his nature reclaims him.",
    context:
      "Mikhalkov's warm adaptation of Goncharov's novel treats its famously inert hero with affection rather than scorn, finding in Oblomov's languor a critique of, and a tenderness for, a whole Russian temperament.",
  },
  {
    slug: "at-home-among-strangers",
    title: "At Home Among Strangers",
    year: 1974,
    director: "Nikita Mikhalkov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Adventure", "Action", "Drama"],
    themes: ["loyalty under suspicion", "friendship", "the new order"],
    cast: ["Yuri Bogatyryov", "Anatoly Solonitsyn", "Sergei Shakurov"],
    summary:
      "In the early 1920s, gold shipped to feed the starving Soviet republic is stolen, and a Cheka officer falls under suspicion as he hunts the bandits and White officers behind the theft, his loyalty tested at every turn.",
    context:
      "Mikhalkov's debut feature is a stylish Civil-War 'Ostern' — a Soviet Western — full of train heists, shifting allegiances, and a brooding Eduard Artemyev score, marking the arrival of a major directorial talent.",
  },
  {
    slug: "siberiade",
    title: "Siberiade",
    year: 1979,
    director: "Andrei Konchalovsky",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama", "Historical epic"],
    themes: ["progress and nature", "family saga", "the century's sweep"],
    cast: ["Nikita Mikhalkov", "Lyudmila Gurchenko", "Vitaly Solonitsyn"],
    summary:
      "Across much of the twentieth century, two families — one poor, one well-off — live, feud, and love in a remote Siberian village, their fates bound up with the oil exploration that will transform the taiga.",
    context:
      "Konchalovsky's sprawling generational epic interweaves intimate drama with archival footage of the century's upheavals, set to a pulsing Artemyev score. It shared the Grand Prix at Cannes.",
  },
  {
    slug: "the-lady-with-the-dog",
    title: "The Lady with the Dog",
    year: 1960,
    director: "Iosif Kheifits",
    studio: "Lenfilm",
    source: "lenfilm",
    genres: ["Drama", "Romance", "Literary adaptation"],
    themes: ["adultery", "longing", "self-discovery"],
    cast: ["Aleksey Batalov", "Iya Savvina"],
    summary:
      "At a Black Sea resort, a jaded married Moscow banker and a young married woman begin a casual affair that, to their own surprise, deepens into a love neither can abandon once they return to their separate, ordinary lives.",
    context:
      "Kheifits's exquisitely restrained adaptation of Chekhov's story captures the writer's mood of quiet yearning and irresolution. Widely praised abroad, it was honoured at Cannes for its delicacy.",
  },
  {
    slug: "king-lear",
    title: "King Lear",
    year: 1971,
    director: "Grigori Kozintsev",
    studio: "Lenfilm",
    source: "lenfilm",
    genres: ["Drama", "Literary adaptation", "Historical"],
    themes: ["pride and madness", "power", "nature and ruin"],
    cast: ["Jüri Järvet", "Elza Radziņa", "Oleg Dal"],
    summary:
      "An aging king divides his realm by flattery, banishing the one daughter who truly loves him, and is driven to madness on a storm-blasted heath as his kingdom collapses into cruelty and war.",
    context:
      "Kozintsev's companion to his Hamlet again used Pasternak's translation and a Shostakovich score, staging the tragedy with bleak, elemental landscapes and a strong sense of a whole society unravelling.",
    impact:
      "Together with his Hamlet, it is regarded as one of the finest screen adaptations of Shakespeare, admired internationally for its cinematic rather than theatrical conception.",
  },
  {
    slug: "my-friend-ivan-lapshin",
    title: "My Friend Ivan Lapshin",
    year: 1985,
    director: "Aleksei German",
    studio: "Lenfilm",
    source: "lenfilm",
    genres: ["Drama", "Crime"],
    themes: ["memory", "the 1930s", "disillusion"],
    cast: ["Andrei Boltnev", "Nina Ruslanova", "Andrei Mironov"],
    summary:
      "In a shabby provincial town in 1935, a police investigator pursues a criminal gang while navigating a tangle of unspoken loves among his circle of friends — all recalled decades later through the eyes of a boy who lived among them.",
    context:
      "German's densely textured, near-documentary recreation of mid-1930s life, made before the Terror's full shadow, is prized for its immersive realism and elliptical storytelling, and is often cited among the greatest Russian films.",
    impact:
      "Its dense, layered soundscapes and roving, lived-in mise-en-scène became hugely influential on later Russian cinema and on German's own singular late style.",
  },
  {
    slug: "letter-never-sent",
    title: "Letter Never Sent",
    year: 1960,
    director: "Mikhail Kalatozov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama", "Adventure"],
    themes: ["survival", "duty", "human frailty"],
    cast: ["Tatiana Samoilova", "Innokenty Smoktunovsky", "Yevgeny Urbansky"],
    summary:
      "A small team of geologists searching for diamonds in the Siberian taiga finally strikes a find, only to be trapped by a raging forest fire and the wilderness, struggling to survive long enough to bring their discovery home.",
    context:
      "Reuniting Kalatozov and cinematographer Sergei Urusevsky after The Cranes Are Flying, it is a visually astonishing survival drama whose fire and forest imagery pushed expressive camerawork to extremes.",
    impact:
      "Its bravura handheld and elemental photography later drew the admiration of filmmakers such as Francis Ford Coppola and Martin Scorsese, who helped bring it to Western attention.",
  },
  {
    slug: "repentance",
    title: "Repentance",
    year: 1987,
    director: "Tengiz Abuladze",
    studio: "Georgian Film",
    country: "USSR (Georgian SSR)",
    source: "georgiafilm",
    genres: ["Drama", "Satire"],
    themes: ["memory of terror", "guilt", "reckoning"],
    cast: ["Avtandil Makharadze", "Zeinab Botsvadze", "Ketevan Abuladze"],
    summary:
      "A woman repeatedly digs up the corpse of a dead small-town dictator, refusing to let him rest, and her trial unspools the surreal, nightmarish story of the terror he inflicted — and the town's complicity in forgetting it.",
    context:
      "Made in Georgia in 1984 but shelved until glasnost, Abuladze's allegory of Stalinist repression became a landmark of the perestroika era, openly confronting the buried crimes of the past for the first time on Soviet screens.",
    impact:
      "Its release was a cultural watershed, helping to legitimize public reckoning with Stalinism and signalling the new openness that would reshape Soviet cinema and society.",
  },
  {
    slug: "little-vera",
    title: "Little Vera",
    year: 1988,
    director: "Vasili Pichul",
    studio: "Gorky Film Studio",
    source: "gorky",
    genres: ["Drama"],
    themes: ["generational conflict", "disillusion", "stifled youth"],
    cast: ["Natalya Negoda", "Andrei Sokolov", "Yuri Nazarov"],
    summary:
      "A restless young woman in a grim industrial port city chafes against her drunken, quarrelsome family and a future that offers her little, drifting into a fraught romance that detonates the household's tensions.",
    context:
      "A sensation of the glasnost years, Pichul's bleak, frank portrait of provincial family dysfunction broke taboos — including the first overt sex scene in mainstream Soviet film — and was read as an unsparing verdict on late-Soviet malaise.",
  },
  {
    slug: "the-needle",
    title: "The Needle",
    year: 1988,
    director: "Rashid Nugmanov",
    studio: "Kazakhfilm",
    country: "USSR (Kazakh SSR)",
    source: "kazakhfilm",
    genres: ["Drama", "Crime"],
    themes: ["addiction", "youth subculture", "the lone outsider"],
    cast: ["Viktor Tsoi", "Marina Smirnova", "Pyotr Mamonov"],
    summary:
      "A laconic drifter returns to Alma-Ata to collect a debt and finds his old girlfriend addicted to morphine, setting out to free her from the dealers who control her in a deadpan, music-driven anti-hero tale.",
    context:
      "A cult landmark of the 'Kazakh New Wave' and perestroika youth cinema, it owes its enduring status largely to its star, the rock idol Viktor Tsoi of the band Kino, whose cool screen presence and songs made it a generational touchstone.",
  },
  {
    slug: "assa",
    title: "Assa",
    year: 1987,
    director: "Sergei Solovyov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama", "Crime", "Musical"],
    themes: ["the old vs. the new", "rock culture", "change"],
    cast: ["Sergei Bugaev", "Tatyana Drubich", "Stanislav Govorukhin"],
    summary:
      "In wintry Yalta, a young musician and an aging gangster vie for the same woman, their clash set against the emerging Soviet rock underground — and erupting, in the famous finale, into a Viktor Tsoi concert.",
    context:
      "Solovyov's stylish, music-soaked film became an anthem of perestroika youth, smuggling the once-marginal Leningrad rock scene onto big screens and ending with Tsoi's 'We Want Changes!' as a generational rallying cry.",
  },
  {
    slug: "morozko",
    title: "Morozko",
    year: 1965,
    director: "Aleksandr Rou",
    studio: "Gorky Film Studio",
    source: "gorky",
    starter: true,
    genres: ["Fantasy", "Fairy tale", "Family"],
    themes: ["kindness rewarded", "vanity punished", "magic"],
    cast: ["Aleksandr Khvylya", "Natalya Sedykh", "Inna Churikova"],
    summary:
      "A sweet, mistreated girl and a vain, boastful young man are each tested by the wintry wizard Father Frost and the witch Baba Yaga, with the kind-hearted rewarded and the selfish comically humbled.",
    context:
      "Rou's exuberant fairy-tale film, full of folk creatures and practical magic, became a perennial children's favourite at home and, dubbed, a cult holiday staple abroad — especially in Czech and other European traditions.",
  },
  {
    slug: "ruslan-and-lyudmila",
    title: "Ruslan and Lyudmila",
    year: 1972,
    director: "Aleksandr Ptushko",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Fantasy", "Adventure", "Literary adaptation"],
    themes: ["the quest", "true love", "enchantment"],
    cast: ["Valery Kozinets", "Natalya Petrova", "Vladimir Fyodorov"],
    summary:
      "On their wedding night, the bride Lyudmila is spirited away by an evil sorcerer, and the knight Ruslan sets out across a land of giants, witches, and a colossal living severed head to win her back.",
    context:
      "Adapted from Pushkin's mock-epic poem, Ptushko's final film is a lavish two-part fantasy spectacle, crowning a career devoted to bringing Russian folklore and fairy tale to the screen with elaborate effects.",
  },
  {
    slug: "scarlet-sails",
    title: "Scarlet Sails",
    year: 1961,
    director: "Aleksandr Ptushko",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Romance", "Fantasy", "Drama"],
    themes: ["hope", "dreams come true", "faith"],
    cast: ["Anastasiya Vertinskaya", "Vasily Lanovoy"],
    summary:
      "A girl in a hostile fishing village clings to an old prophecy that a ship with scarlet sails will one day carry her away to happiness, and a passing captain, learning of her dream, resolves to make it come true.",
    context:
      "Ptushko's tender adaptation of Alexander Grin's beloved romantic novella became a symbol of youthful hope; in St. Petersburg, a 'Scarlet Sails' festival with a tall ship still marks the end of the school year.",
  },
  {
    slug: "nu-pogodi",
    title: "Nu, Pogodi!",
    year: 1969,
    director: "Vyacheslav Kotyonochkin",
    studio: "Soyuzmultfilm",
    source: "soyuzmultfilm",
    starter: true,
    genres: ["Animation", "Comedy", "Family"],
    themes: ["the chase", "rivalry", "slapstick"],
    cast: [],
    summary:
      "A scruffy, cigarette-smoking Wolf endlessly chases a clever, good-natured Hare through parks, beaches, and city streets, and is endlessly, slapstickly foiled — barking his catchphrase, 'Well, just you wait!'",
    context:
      "Soyuzmultfilm's long-running answer to Tom and Jerry became a national institution, its wordless chases beloved across generations and its characters among the most recognizable in Russian popular culture.",
  },
  {
    slug: "the-scarlet-flower",
    title: "The Scarlet Flower",
    year: 1952,
    director: "Lev Atamanov",
    studio: "Soyuzmultfilm",
    source: "soyuzmultfilm",
    genres: ["Animation", "Fairy tale", "Romance"],
    themes: ["love beyond appearance", "sacrifice", "enchantment"],
    cast: [],
    summary:
      "A merchant's youngest daughter, asked only for a scarlet flower, ends up bound to a fearsome enchanted beast in his magical palace, and her growing love breaks the curse to reveal the prince beneath.",
    context:
      "Atamanov's hand-drawn Russian retelling of the 'Beauty and the Beast' story, made with the lush, rotoscoped realism of early Soyuzmultfilm features, remains a touchstone of classic Soviet animation.",
  },
  {
    slug: "the-bremen-town-musicians",
    title: "The Bremen Town Musicians",
    year: 1969,
    director: "Inessa Kovalevskaya",
    studio: "Soyuzmultfilm",
    source: "soyuzmultfilm",
    genres: ["Animation", "Musical", "Comedy"],
    themes: ["freedom", "friendship", "rebellion"],
    cast: [],
    summary:
      "A wandering troubadour and his band of animal friends — donkey, dog, cat, and rooster — outwit a foolish king and his guards to rescue the princess the troubadour loves, all in song.",
    context:
      "A loose, hip musical riff on the Brothers Grimm, its catchy beat-influenced songs by Gennady Gladkov became enormously popular, turning the cartoon into a cult favourite and an unlikely emblem of countercultural cool.",
  },
  {
    slug: "planet-of-storms",
    title: "Planet of Storms",
    year: 1962,
    director: "Pavel Klushantsev",
    studio: "Lennauchfilm",
    source: "archive",
    genres: ["Science fiction", "Adventure"],
    themes: ["exploration", "man and machine", "the unknown"],
    cast: ["Vladimir Yemelyanov", "Gennadi Vernov", "Georgi Zhzhonov"],
    summary:
      "A Soviet expedition lands on Venus, where the cosmonauts and their robot encounter a hostile prehistoric world of monsters, eruptions, and hints of a vanished civilization while waiting for rescue.",
    context:
      "Klushantsev's inventive science-fiction film was celebrated for its then-advanced special effects and design, blending adventure with a serious vision of space travel.",
    impact:
      "Its footage and effects were bought, re-edited, and reused in several American science-fiction films of the 1960s, and its imagery influenced Western filmmakers and effects artists.",
  },
];
