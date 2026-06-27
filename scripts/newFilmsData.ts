// One-time generation input for the Tier 1–4 catalogue expansion (72 films).
// I author the editorial fields (summary/context/impact/themes/genres) and the
// principal cast here; scripts/buildExtraFilms.ts enriches each entry with
// verified Wikidata facts (original title, runtime, Q-id, Wikipedia URL) and
// emits lib/filmsExtra.ts. scripts/mergeEditorial.ts re-applies just the
// editorial text to lib/filmsExtra.ts without re-querying Wikidata.
//
// All prose is ORIGINAL, written for Kotfilm. Editorial note: no em dashes.
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
      "Loosely structured as a series of episodes set across the brutal early fifteenth century, the film follows the icon painter Andrei Rublev as he travels a Russia torn by Tatar raids, famine, and the cruelty of feuding princes. A monk and an artist, he wrestles with whether beauty has any place in such a world, and after witnessing a massacre and killing a man to save another, he takes a vow of silence and abandons his art. Years pass before a final episode, in which a young boy bluffs his way into casting an enormous bronze bell, rekindles Rublev's belief that creation is worth the risk. Only at the very end does the film break from black and white into colour, lingering on the actual surviving icons Rublev painted.",
    context:
      "Made when Tarkovsky was still in his early thirties, his second feature was completed in 1966 but held back and trimmed by the authorities, who were uneasy with its bleakness, its violence, and its frank treatment of religious faith. It reached audiences abroad before it was properly released at home. Rather than a tidy biography, Tarkovsky built a meditation on the place of the artist in a violent age, shooting in long, searching takes and filling the frame with mud, rain, fire, and the textures of medieval life. The famous bell-casting episode, in which neither the boy nor the viewer knows whether the bell will ring, becomes a parable for the act of creation itself.",
    impact:
      "Widely ranked among the greatest films ever made, it expanded what cinema could do with history, faith, and the creative act. Its contemplative long takes and tactile sense of the past influenced generations of filmmakers who looked to Tarkovsky as a model of cinema as serious art.",
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
      "In the year 1242, the prince Alexander Nevsky is called on to defend the Russian lands against an invading army of Teutonic Knights pushing in from the west. Refusing to bow to the heavily armoured crusaders, he rallies the merchants and common people of Novgorod into a citizen army. The film builds toward the celebrated Battle on the Ice, in which Nevsky lures the German knights onto the frozen surface of Lake Peipus, where the ice gives way beneath their weight. Victory affirms a simple, ringing warning to any future invader.",
    context:
      "This was Eisenstein's first completed sound film, made after years in which his projects had been blocked or abandoned, and it marked his return to official favour. It was produced as the threat of Nazi Germany grew, and its story of repelling Teutonic invaders carried an unmistakable contemporary message. When the Soviet Union and Germany signed their non-aggression pact in 1939 the film was quietly withdrawn, then rushed back into circulation after the German invasion of 1941. Sergei Prokofiev composed the score in unusually close partnership with Eisenstein, the music and images shaped to fit one another.",
    impact:
      "The collaboration between Eisenstein and Prokofiev, above all in the Battle on the Ice, became a textbook example of how music and image can be composed together. It is studied in film schools to this day and stands as a foundational work of the historical epic.",
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
      "The first part of Eisenstein's planned trilogy opens with the young Ivan IV crowned as the first Tsar of all Russia, determined to unite the country and break the power of the scheming boyar nobility. Surrounded by intrigue, poisoned in spirit by the murder of his wife, and tested by war and betrayal, he hardens into the autocrat history would remember as Ivan the Terrible. When his authority falters he withdraws from Moscow and waits, gambling that the people will beg him to return with absolute power. The film ends with that triumphant, ominous return.",
    context:
      "Commissioned under Stalin and filmed during the Second World War after the studios were evacuated east to Alma-Ata, the project was conceived as a flattering portrait of a strong ruler unifying the nation. Eisenstein staged it less as realism than as operatic theatre, with towering shadows, stylised gestures, and faces held in extreme close-up. Part I pleased the authorities and won a Stalin Prize. The more critical second part, which followed Ivan into tyranny and terror, would be banned.",
    impact:
      "Its expressionist lighting and graphic, almost frozen compositions remain a high point of stylised historical cinema. The film is a standard reference in studies of how images can convey the psychology of power.",
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
      "Told in four loosely linked stories, the film traces Cuba on the eve of and during its revolution. A young woman is forced into sex work amid the casinos and tourists of decadent Havana; a tenant farmer burns his own sugar-cane field rather than hand it to a landowner; a student is radicalised by police violence; and a peasant is drawn into the armed uprising. A narrating voice, the island itself, binds the episodes together.",
    context:
      "A Soviet and Cuban co-production made soon after the revolution, it reunited director Mikhail Kalatozov with the cinematographer Sergei Urusevsky, his partner on The Cranes Are Flying. Conceived as revolutionary propaganda, it satisfied neither government on release and was largely forgotten for thirty years. What makes it extraordinary is its camerawork, including astonishing unbroken takes that descend the side of a building, plunge into a swimming pool, and float above a funeral procession through a crowd. Such shots were decades ahead of the technology usually associated with them.",
    impact:
      "Rediscovered in the 1990s and championed by Martin Scorsese and Francis Ford Coppola, it found the audience it never had on release. Its bravura long takes directly influenced later filmmakers drawn to ambitious, gravity-defying camerawork.",
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
      "A weary Red Army soldier named Sukhov is crossing the Central Asian desert on his long way home from the Civil War when he is handed an unwanted duty: protecting a harem of women abandoned by a fleeing local warlord. Saddled with this strange family, and joined by a grizzled old customs officer and a doomed young fighter, he digs in for a stand against the bandit Abdullah and his men. Sukhov longs only for his wife and home, but his stubborn decency will not let him walk away.",
    context:
      "Often described as the original Soviet 'Eastern,' it transplants the shape of an American Western to the deserts of Soviet Central Asia in the early 1920s. The production was troubled and nearly shut down more than once, and it owes much of its texture to improvisation, a wry script, and a famous song by Bulat Okudzhava. Released in 1970, it became one of the most quoted and rewatched films in the culture. Pavel Luspekayev played the beloved customs officer Vereshchagin while gravely ill, completing the role not long before his death.",
    impact:
      "By long-standing tradition, Soviet and later Russian cosmonauts watch the film together before every launch, a ritual that has carried it far beyond the cinema and made it a permanent part of the culture.",
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
      "An eccentric Moscow inventor switches on his homemade time machine and accidentally swaps two men from the present, a timid apartment-building superintendent and a small-time burglar, with Tsar Ivan the Terrible from the sixteenth century. While the bewildered Tsar blunders through 1970s Moscow, the meek superintendent, who happens to be the Tsar's double, must sit on the throne and rule the Kremlin without giving himself away. The misunderstandings pile up on both sides of the centuries before everyone is restored to their proper time.",
    context:
      "Gaidai adapted the film from a comic play by Mikhail Bulgakov that had gone unperformed for decades, updating its setting to the present day. It arrived at the height of Gaidai's popularity and became one of the most rewatched comedies in Soviet history. Beneath the farce sits a gentle double satire, poking fun both at the petty frustrations of Soviet daily life and at the pretensions of absolute power. Its lines are quoted constantly in Russian to this day.",
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
      "A gentle kindergarten director happens to be the exact double of a hardened gangster known as Docent, so the police persuade him to impersonate the criminal, get himself locked up, and coax three fellow crooks into revealing where they hid a stolen artefact. Posing as the fearsome boss, the mild-mannered teacher finds himself leading a jailbreak and a treasure hunt. Almost without meaning to, he begins to civilise his thuggish charges along the way.",
    context:
      "Co-written by Georgiy Daneliya and Viktoriya Tokareva, the comedy pairs slapstick with surprising warmth and a streak of real tenderness. Its dialogue, including a string of prison-slang lines, passed straight into everyday speech. It was among the biggest box-office successes of its year and remains a fixture of Russian television, its central performance by Yevgeny Leonov beloved by audiences of every generation.",
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
      "A Georgian helicopter pilot nicknamed Mimino, who ferries passengers and cargo between remote mountain villages, dreams of flying big international jets out of Moscow. He chases that dream to the capital, where he shares a hotel room with a good-natured Armenian truck driver and stumbles through a string of culture-clash misadventures. As he edges closer to the wider world, a growing homesickness for his mountains and his old life begins to tug him back.",
    context:
      "A signature Daneliya tragicomedy, the film is built on the warmth and bickering between its Georgian and Armenian leads, a portrait of friendship across the Soviet Union's many nationalities. Daneliya, himself Georgian, gave it an affectionate, gently melancholy tone beneath the comedy. It was a major popular success and won a top prize at the Moscow International Film Festival, and its songs and lines remain widely loved.",
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
      "A kind, talented, and hopelessly indecisive Leningrad translator cannot bring himself to choose between the patient wife he no longer loves and the younger mistress who is tired of waiting. Unable to say no to anyone, he is pulled in every direction by colleagues, neighbours, and visitors, forever running late and forever apologising. His decency, which he imagines as a virtue, slowly exhausts everyone around him and traps him most of all.",
    context:
      "Daneliya called the film a 'sad comedy,' and it captures the quiet drift of late-Soviet middle age with rueful precision. There are no villains, only a good man undone by his inability to cause anyone disappointment. Praised for its honesty and its finely observed performances, it won prizes at Venice and elsewhere and became one of the most admired Soviet films abroad, where its melancholy comedy translated easily.",
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
      "The young staff at a House of Culture are determined to throw a lively, music-filled New Year's Eve celebration, but a pompous, newly installed acting director wants to replace the fun with earnest lectures and dreary approved programming. As the clock ticks toward midnight, the youngsters scheme to outwit him and smuggle their joyful show past his nose. The result is a battle between officious gloom and irrepressible high spirits.",
    context:
      "Eldar Ryazanov's debut feature became a sensation of the cultural Thaw that followed Stalin's death, its lightness and its mockery of stuffy officialdom feeling like fresh air. It made an instant star of the young Lyudmila Gurchenko, whose songs from the film were sung across the country. The picture established the brand of warm, satirical comedy that Ryazanov would refine over the following decades, and it remains a New Year viewing tradition.",
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
      "In a Hutsul village high in the Carpathian mountains, a young man named Ivan falls in love with Marichka, a girl from the family that killed his father. When she drowns, his grief is bottomless. He eventually marries another woman, but he cannot free himself from the memory of his lost love or from the pull of the folk world around him, and he drifts toward a fate steeped in mountain belief and ritual.",
    context:
      "This was Sergei Parajanov's breakthrough, the film in which he abandoned conventional storytelling for an intoxicating swirl of colour, folk music, ethnographic ritual, and restless, spinning camerawork. Shot in the Carpathians with local Hutsul customs woven throughout, it announced the arrival of one of cinema's great visual poets. Its boldness drew official suspicion, an early sign of the conflicts with the authorities that would shadow Parajanov for the rest of his life.",
    impact:
      "A landmark of the 'poetic cinema' movement, it influenced filmmakers across the Soviet republics and beyond, and its sensuous, ritualistic style pointed the way to Parajanov's later The Color of Pomegranates.",
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
      "There is no plot in the ordinary sense. Instead the film drifts, like memory itself, between recurring images: a poet facing a blank page, couples dancing before the men vanish to war, a child and an apple in the snow, and a small grey wolf cub drawn from an old Russian lullaby. These fragments of postwar Soviet life and private recollection gather into a wordless poem about what is remembered and what is lost.",
    context:
      "Yuri Norstein made the film over years using painstaking cutout and multi-plane techniques, moving paper figures under glass to achieve its soft, layered, almost breathing surfaces. It distils the texture of memory and the long shadow of the Second World War, which took so many of the men of his parents' generation. The film circulated quietly at first before its reputation grew steadily around the world.",
    impact:
      "In repeated international polls of animators and critics it has been voted the greatest animated film ever made. It stands as the clearest proof that animation can be a vehicle for serious, personal, poetic art.",
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
      "The bright, fearless girl Alisa, her scientist father Professor Seleznyov, and a nervous, accident-prone spaceship captain set off across the galaxy to collect rare and wonderful creatures for a Moscow zoo. Their journey from planet to planet turns into a mystery when they cross the trail of space pirates and a missing crew. Alisa's curiosity steadily uncovers the truth behind the disappearances.",
    context:
      "Adapted from the popular children's science-fiction books of Kir Bulychov, this feature-length animation is treasured for its inventive alien worlds, its psychedelic colour palette, and its gentle humour. It represents a high point of Soviet science-fiction animation, imagining a future of curiosity and exploration rather than conflict. Generations of children grew up on it, and its imagery and music remain instantly familiar in Russia.",
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
      "Shakespeare's prince returns to a cold, stone Elsinore to find his father dead, his mother hastily remarried to his uncle, and the kingdom rotten beneath its ceremonies. Played with brooding inwardness, this Hamlet is a thinking man crushed between his conscience and the corrupt court around him. Drawn toward revenge, he moves through doubt and feigned madness to a ruin that takes nearly everyone down with him.",
    context:
      "Grigori Kozintsev built the film on Boris Pasternak's celebrated Russian translation and a thunderous score by Dmitri Shostakovich, setting the tragedy against crashing seas and oppressive fortress walls. He read the play as the story of a sensitive individual conscience crushed by a tyrannical state, a reading that carried quiet weight in the Soviet 1960s. The result is conceived as cinema rather than filmed theatre, with the landscape and the elements doing much of the dramatic work.",
    impact:
      "Internationally acclaimed and admired by figures such as Laurence Olivier, it remains one of the most respected screen versions of Shakespeare and a model for treating the plays as fully cinematic works.",
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
      "The second part follows Ivan as he builds his own loyal guard, the oprichnina, and turns it against the boyars who plot to unseat him. Haunted by memories of his childhood and the murder of his mother, the Tsar slides from defending his crown into outright vengeance and terror. The intrigue tightens toward a deadly banquet, staged in startling bursts of colour, where a planned assassination is turned back on the plotters.",
    context:
      "Eisenstein completed Part II in 1946, but Stalin saw an unflattering reflection in its portrait of a ruler consumed by suspicion and protected by a brutal secret police, and the film was banned. It was released only in 1958, after both Eisenstein and Stalin were dead. Its sudden shift into colour for the banquet sequence is among the earliest uses of colour in Soviet narrative cinema, deployed for shock and symbolism rather than realism.",
    impact:
      "Its expressionist excess and the celebrated colour banquet are landmarks of stylised filmmaking, endlessly cited in studies of cinema and of the relationship between artists and political power.",
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
      "A poor but spirited young woman without a dowry is courted, flattered, and sung over by a circle of wealthier men who treat her as a prize to be won rather than a person to be loved. Caught between a dashing, careless gentleman and a dull but respectable suitor, she is toyed with, compromised, and ultimately betrayed. A pleasure cruise on the Volga carries the romance to its tragic end.",
    context:
      "Eldar Ryazanov stepped away from his usual comedy for this lavish adaptation of Alexander Ostrovsky's play 'Without a Dowry,' set among the merchant class of the late nineteenth century. He filled it with period detail, riverboats, and popular songs, several of which became hits in their own right. The film was a huge success and was voted the best film of its year by Soviet audiences, with Nikita Mikhalkov memorable as the charming, faithless gentleman.",
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
      "A mild pianist, stranded at a provincial railway station while awaiting trial for a crime he did not commit, crosses paths with a brash, quick-tempered station waitress. Their first encounters are all friction, but over a series of missed trains and small kindnesses the antagonism turns to tenderness. When he must report to a labour camp, the depth of what has grown between them is tested on a frozen road.",
    context:
      "A characteristic Ryazanov tragicomedy, the film moves between bustling, farcical station life and genuine pathos, ending on a bleak yet hopeful note in the camps of the north. Lyudmila Gurchenko and Oleg Basilashvili anchor it as a mismatched pair the audience comes to love. It was one of the most popular films of its year and confirmed Ryazanov's gift for finding warmth and sorrow in ordinary lives.",
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
      "On the eve of the 1812 war against Napoleon, a spirited young noblewoman disguises herself as a cavalry officer and rides off to fight the French invaders. Her masquerade leads to a tangle of comic confusions, not least with the officer to whom she had been betrothed, who fails to recognise her in uniform. Courage, mistaken identity, and romance carry the story to a happy resolution.",
    context:
      "Eldar Ryazanov made this buoyant verse-and-song operetta on film for the hundred and fiftieth anniversary of the campaign against Napoleon. Loosely inspired by the real cavalry-maiden Nadezhda Durova, it blends patriotic spectacle with light comedy and a playful game of disguise. Its wit, music, and cross-dressing humour made it a perennial holiday favourite that has never left the screen.",
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
      "The members of a garage cooperative gather for what should be a routine evening meeting, only to learn that four of them must lose the parking spaces they were promised. Locked in the room overnight, the polite façade of the collective collapses into a savage comedy of cowardice, favouritism, and bare self-interest, until the meekest members stage a small revolt against the well-connected.",
    context:
      "Set almost entirely in a single room, Ryazanov's chamber satire turns a petty dispute over parking into a sharp dissection of Soviet committee culture and quiet privilege. The biting humour was unusually pointed for its time, and the ensemble cast plays out a recognisable drama of how fast civility dissolves under pressure. It became one of the most quoted of all Ryazanov's films.",
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
      "A celebrated former fighter pilot, decorated for her service in the war, now runs a vocational school and struggles to find meaning in peacetime. Stiff and out of step with a younger generation that does not share her sense of duty, and estranged from the daughter she adopted, she aches for the freedom and purpose she knew in the sky. Small humiliations of ordinary life press in on a woman built for something larger.",
    context:
      "Larisa Shepitko's early feature is a quietly radical study of a heroine whose wartime valour has left her stranded in the present. Rather than celebrate her as a monument, the film looks honestly at her loneliness and rigidity, a sympathetic but unsentimental portrait of a difficult woman. Anchored by Maya Bulgakova's superb performance, it pairs naturally with Shepitko's later masterpiece The Ascent.",
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
      "At a strictly regimented Young Pioneer summer camp run by a self-important director, a boy is expelled over a trivial rule about swimming. Rather than go home and disappoint his grandmother, he sneaks back in and hides, and the children's small conspiracies and rebellions steadily expose the absurdity of the rules imposed on them. The camp's pompous order edges toward delightful chaos.",
    context:
      "Elem Klimov's debut feature is a sharp, affectionate satire of Soviet officiousness dressed up as a children's comedy. Its mockery of petty authority and empty ceremony was pointed enough that the film nearly went unreleased before reportedly winning favour at the top. It marked the arrival of a major directorial talent who would go on to make Come and See.",
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
      "A Soviet driver recounts how the war stripped everything from him. Taken prisoner, he survives the brutality of a German camp and a desperate escape, only to learn that his wife and daughters were killed in a bombing and his son fell on the last day of fighting. Broken but unbowed, he meets an orphaned boy and, on an impulse of grace, tells the child he is his father, choosing to begin life again.",
    context:
      "Sergei Bondarchuk's directorial debut, adapted from a story by Mikhail Sholokhov, was among the first Soviet films to treat a former prisoner of war with sympathy rather than suspicion, a notable shift in the Thaw's handling of the war. Bondarchuk himself played the lead with weathered restraint. The film was widely honoured at home and abroad and launched the directing career that would lead to War and Peace.",
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
      "In 1942, a gruff sergeant commands a quiet anti-aircraft post in the northern forests, staffed entirely by young women soldiers. When they discover a party of German paratroopers moving through the woods, the small, outmatched unit sets out to stop them, and one by one the women fall in a desperate fight. The film cuts between the harsh present and tender, colour-drenched memories of the peacetime lives the war is destroying.",
    context:
      "Stanislav Rostotsky, himself a wounded veteran, adapted Boris Vasilyev's novella as a tribute to those lost in the war, dedicating it in part to a nurse who had saved his life. The contrast between monochrome combat and colour flashbacks underlines everything the young women will never have. One of the most beloved of all Soviet war films, it was nominated for an Academy Award and remains a fixture of remembrance.",
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
      "The minstrel and merchant-adventurer Sadko of old Novgorod sets out to find happiness for his people, sailing across the world in search of a fabled bird of joy. His voyage takes him through distant lands and down into the glittering underwater kingdom of the Sea Tsar, where his music wins him favour and danger alike. In the end he learns that the happiness he sought was waiting at home all along.",
    context:
      "Aleksandr Ptushko built this spectacular fairy-tale epic from Russian bylina legend and the music of Rimsky-Korsakov's opera, filling it with lavish sets, costumes, and effects. It won a major prize at the Venice Film Festival, and a re-edited, dubbed version later circulated in the West. The film exemplifies Ptushko's lifelong project of bringing Russian folklore to the screen on a grand scale.",
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
      "Healed of a lifelong paralysis by wandering pilgrims, the peasant Ilya Muromets rises to become the mightiest of the bogatyrs, the legendary warrior-heroes of old Rus. He devotes his enormous strength to defending the land against the invading Tugar horde and the monsters that serve it, including a fearsome multi-headed dragon. Folk legend and patriotic spectacle combine in his battles.",
    context:
      "Drawn from the epic poems of Russian folklore, the film was a milestone of Soviet technical ambition, the country's first feature shot in widescreen with stereophonic sound. Ptushko mounted enormous battle scenes with thousands of extras and elaborate creature effects, pushing the spectacle of the era to a new scale. It stands as one of the grand showcases of Soviet fantasy cinema.",
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
      "A young seminarian, after a deadly nighttime encounter with a witch, is summoned to a remote village and ordered to read prayers over the corpse of a beautiful young woman for three nights alone in a country church. Each night the dead woman rises and calls up ever more terrifying spirits, and on the third night she summons Viy, a monstrous demon whose gaze the seminarian has been warned never to meet.",
    context:
      "Adapted from a horror story by Nikolai Gogol, Viy is essentially the only outright horror film of the entire Soviet era, a rare excursion into the supernatural for a cinema that usually avoided it. Its imaginative practical effects, flying coffin, and folk-gothic atmosphere have given it lasting cult status. The former circus performer Natalya Varley brought an eerie physicality to the risen witch.",
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
      "A small, soft, big-eared creature of no known species is discovered in a crate of oranges and given the name Cheburashka. Lonely and looking for friends, he meets Gena, a gentle crocodile who works at the zoo and plays the accordion, and together they set out to build a house where the friendless can come together. Their kindness gathers an unlikely little community, despite the meddling of the cranky old Shapoklyak.",
    context:
      "Roman Kachanov's stop-motion shorts, written with the children's author Eduard Uspensky, introduced one of the most cherished characters in all of Soviet culture. Cheburashka, with his huge eyes and gentle bewilderment, became a national mascot, later embraced internationally and even adopted as a beloved figure in Japan. The films' warmth and craft set a high standard for Soviet puppet animation.",
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
      "A round, philosophical brown bear with an endless fondness for honey ambles through small adventures with his anxious friend Piglet, composing little hums and grumbles as he goes. He floats up to a beehive under a balloon, gets comically stuck in a rabbit's burrow after eating too much, and ponders the puzzles of his small wooded world. Each misadventure is gentle, funny, and quietly wise.",
    context:
      "Fyodor Khitruk's interpretation of A. A. Milne's bear is strikingly different from the Disney version, with a flat, graphic design and a gruff, beloved voice provided by Yevgeny Leonov. Made without reference to the American films, it became the definitive Winnie-the-Pooh for Russian audiences. Khitruk's modern, expressive style helped renew the art of Soviet animation.",
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
      "In a Ukrainian village, the arrival of the first tractor and the push toward collective farming sets the young against the old and the poor against the prosperous kulaks. When a young activist who has championed the new ways is shot dead, the grief and anger of the community answer the killing with a defiant, life-affirming funeral. Around this slender story the film unfolds images of fields, fruit, rain, and faces that turn it into a meditation on the cycles of nature.",
    context:
      "The final part of Aleksandr Dovzhenko's so-called Ukraine Trilogy, Earth was attacked at home as politically ambiguous and even defeatist, while critics abroad hailed it as a masterpiece. Dovzhenko cared less for the collectivisation plot than for the rhythms of birth, death, and the soil, which he rendered in some of the most rapturous imagery of the silent era. It survives as a high point of poetic, associative montage.",
    impact:
      "Regularly named among the greatest films ever made, it shaped the lyrical, image-driven strain of cinema that later filmmakers such as Tarkovsky and Parajanov would carry forward.",
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
      "Against the chaos of the First World War and the upheavals that followed in Ukraine, the film follows a soldier who returns home and is drawn into the 1918 Bolshevik uprising at the Arsenal munitions factory in Kyiv. Chronology fractures into bold, symbolic images of suffering, futility, and revolt. The hero emerges as an almost mythic figure who cannot be killed.",
    context:
      "The second of Dovzhenko's Ukraine films, Arsenal abandons straightforward narrative for a montage of charged, poetic images, from a gas attack at the front to a runaway troop train. Its anti-war passages and surreal flourishes mark it as one of the most formally daring works of the Soviet silent avant-garde. The film confirmed Dovzhenko as a major voice alongside Eisenstein and Pudovkin.",
    impact:
      "Its associative editing and dense symbolism were widely influential on montage cinema and helped establish the distinctive poetic tradition of Ukrainian film.",
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
      "Workers at a Tsarist-era factory walk off the job after a comrade, wrongly accused of theft, takes his own life. They organise against brutal managers, informers, and police spies, holding out as conditions worsen, until the authorities answer the strike with a savage crackdown. There is no single hero; the mass of workers is the protagonist.",
    context:
      "Strike was Sergei Eisenstein's first feature, the film in which he introduced his theory of montage and the idea of the collective as the central character. Its agitational energy and inventive cutting announced a new kind of revolutionary cinema. The most famous sequence intercuts the massacre of the strikers with footage from a slaughterhouse, a jolting juxtaposition meant to force a connection in the viewer's mind.",
    impact:
      "It pioneered what Eisenstein called the 'montage of attractions,' building meaning through the shock of juxtaposed images, a technique that became foundational to the theory of film editing.",
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
      "A dramatized reconstruction of the 1917 October Revolution in Petrograd, the film moves from the fall of the Provisional Government to the storming of the Winter Palace, staged on an enormous scale with crowds of extras at the actual locations. Rather than follow individuals, it presents history as a vast collective event, punctuated by sequences in which images are cut together to convey abstract ideas.",
    context:
      "Commissioned for the tenth anniversary of the revolution, October gave Eisenstein the resources to restage the events where they had happened, a decade earlier. His experiments with 'intellectual montage,' cutting between unrelated images to suggest a concept, proved divisive even among his contemporaries, and the film was re-edited under political pressure. It remains a daring, demanding work of the silent avant-garde.",
    impact:
      "Its staged assault on the Winter Palace became so iconic that it is often mistaken for documentary footage of the real event, and its montage experiments remain central to film theory.",
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
      "During the failed revolution of 1905, a worn-down mother unwittingly betrays her revolutionary son to the police, believing she is protecting him. His arrest and imprisonment transform her, and grief turns to commitment as she takes up his cause and joins the workers' uprising herself. Her political awakening is the emotional heart of the film.",
    context:
      "Adapted from Maxim Gorky's novel, Vsevolod Pudovkin's film offered a warmer, more character-driven counterpoint to Eisenstein's mass-hero montage. Where Eisenstein favoured collision, Pudovkin built feeling through the patient accumulation of human detail and expressive faces, an approach he called linkage. The film became a cornerstone of Soviet silent cinema.",
    impact:
      "A model of montage built on emotional linkage rather than shock, Mother became a key reference text in the development of editing theory and influenced political filmmaking for decades.",
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
      "A poor peasant lad arrives in the imperial capital looking for work and is pulled, bewildered, through the machinery of the old order: strike-breaking, the stock exchange, and the trenches of the First World War. His slow education in injustice carries him at last into the revolution that topples the regime and renames the city. The nameless young man stands in for a whole generation.",
    context:
      "Made, like Eisenstein's October, for the tenth anniversary of the revolution, Pudovkin's epic personalises history through one confused young protagonist. It pointedly cuts between the greed of the wartime stock exchange and the misery of soldiers at the front, drawing the connection between profit and slaughter. The film confirmed Pudovkin's mastery of montage on a grand historical canvas.",
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
      "A young Mongol trapper, cheated of a valuable fur by a European merchant, drifts into the orbit of Soviet partisans fighting the occupying forces in Central Asia. Captured and nearly executed, he is found to carry a document suggesting he descends from Genghis Khan, and the occupiers prop him up as a puppet ruler. The indignity finally drives him to rise against them in a sweeping storm of revolt.",
    context:
      "Shot largely in Buryat-Mongolia, Pudovkin's anti-imperialist epic combines ethnographic spectacle with the montage techniques he had perfected. Its visionary final sequence, in which a literal and figurative storm sweeps the occupiers away, is among the most striking endings in silent cinema. The film extended Soviet montage into a story of colonial subjugation and national awakening.",
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
      "A restless Moscow engineer, dissatisfied with his ordinary life after the revolution, becomes obsessed with the idea of Mars and its queen, Aelita. In his daydreams he travels to the red planet, romances its ruler, and leads its oppressed workers in revolt. The Martian fantasy, with its angular sets and exotic court, gradually gives way to the more pressing dramas of his life back on Earth.",
    context:
      "One of the first feature-length science-fiction films, Aelita is famous for the Constructivist costumes and geometric sets that defined its vision of Mars. Yet its real subject is post-revolutionary Moscow, and the Martian adventure is finally revealed as escapist fantasy, a dream the hero must wake from to face his real responsibilities. The film was a notable popular success on release.",
    impact:
      "Its avant-garde production design left a lasting imprint on the visual imagination of science fiction, and it occupies an important place in the genre's early history.",
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
      "In a cramped single room in overcrowded Moscow, a married couple takes in the husband's old army friend, who must sleep on the sofa. Neglected and ordered about by both men, the wife drifts into an affair with the lodger, and the household settles into an uneasy arrangement. When she becomes pregnant and neither man is sure he wants the responsibility, she finally claims the right to decide her own life.",
    context:
      "Abram Room's drama was startlingly frank for its time, taking on the Soviet housing shortage, casual male chauvinism, and the question of abortion with unusual directness. Its sympathy for the woman's independence, and its refusal of easy moralising, made it controversial. The film remains one of the most quietly daring works of the silent Soviet cinema.",
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
      "During the Civil War, the charismatic and untutored Red commander Vasily Chapaev leads his division against the White armies on the eastern front. Brave and quick-witted but undisciplined, he is steadied by a level-headed Bolshevik commissar, and the friction and respect between the two men drive the story. Their partnership ends in tragedy, but the legend of Chapaev endures.",
    context:
      "Directed by the unrelated colleagues known as the Vasilyev brothers, Chapaev was one of the first major Soviet sound films and an enormous popular success, watched again and again by millions. Stalin is said to have screened it dozens of times. Accessible, heroic, and emotionally direct, it became the template that countless Soviet films would follow.",
    impact:
      "Chapaev set the model for Socialist Realist cinema and shaped Soviet popular storytelling for decades, its hero so familiar that he became the subject of an entire genre of folk jokes.",
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
      "A cheerful village shepherd with a natural gift for music is mistaken for a famous foreign conductor, and the confusion launches a chain of slapstick mishaps, including a herd of animals running amok at a smart party. Through luck, talent, and persistence, he and a hard-working housemaid with a fine voice make their way from the countryside to the concert stage.",
    context:
      "Made by Grigori Aleksandrov after a study trip to Hollywood, Jolly Fellows was the Soviet Union's first true musical comedy. It launched the stardom of Lyubov Orlova and the bandleader Leonid Utyosov, and it set off a wave of upbeat song-and-dance films officially encouraged as wholesome mass entertainment. Its breezy energy made it a defining popular film of the 1930s.",
    impact:
      "It established the Soviet musical-comedy genre and the long, successful partnership between Aleksandrov and Orlova that would dominate it for years to come.",
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
      "A busy municipal official and the young country woman who comes to work as her housekeeper are both, in their different ways, bound to the same man, a restless, guitar-playing geologist who keeps leaving to roam the wider world. Through fractured flashbacks the film pieces together the two women's longing and the spaces left by his absence. Little is resolved, and that irresolution is the point.",
    context:
      "Kira Muratova's early feature, in which she also plays the leading role, is a delicate and unconventional study of female desire built from non-linear fragments. Its rough texture and refusal of tidy storytelling made the authorities uneasy, and it was quietly kept from wide release for years. It later gained recognition as the early work of one of the most original and uncompromising directors of the post-Soviet era, with Vladimir Vysotsky memorable as the wanderer.",
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
      "Shurik, an earnest young student collecting folklore in the Caucasus, is tricked into helping a corrupt local official carry out a 'bride kidnapping,' the abduction of a spirited young woman the official intends to marry against her will. Believing he is taking part in a quaint old custom, Shurik only slowly realises the scheme. Once he does, he sets out to rescue her and turn the tables on the plotters.",
    context:
      "This was the third of Gaidai's wildly popular comedies featuring the bumbling student Shurik, and it again deployed his trio of comic crooks, played by Vitsin, Morgunov, and Nikulin. The brisk slapstick and quotable lines made it one of the best-loved films in the country. Its playful treatment of an old custom and modern manners struck a chord that has never faded.",
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
      "The smooth-talking con man Ostap Bender teams up with a ruined former nobleman to chase a set of twelve dining chairs scattered across the early Soviet Union, one of which is rumoured to hide a fortune in jewels sewn into its upholstery. Their pursuit becomes a picaresque tour of 1920s opportunists, swindlers, and dreamers. The treasure proves more elusive, and more ironic, than either rogue expects.",
    context:
      "Gaidai adapted the classic satirical novel by Ilf and Petrov, a much-filmed story whose hero, the irrepressible Ostap Bender, is one of the great rogues of Russian literature. The film follows Bender through the freewheeling years of the New Economic Policy, mocking the era's get-rich schemes. Gaidai's energetic comic style fit the material naturally.",
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
      "Over a single summer day in Moscow, a young writer from Siberia, in town for only a few hours, falls in with a carefree local teenager and the people they meet along the way. Flirtations bloom and fade, small dramas come and go, and the city itself, freshly washed by a sudden rain, becomes the real subject. Nothing momentous happens, and that lightness is its charm.",
    context:
      "A quintessential film of the Thaw, light as air and gently lyrical, it caught a hopeful, open-hearted mood in Soviet youth culture of the early 1960s. It gave the teenage Nikita Mikhalkov a breakout role and ended with a song that became a standard. Daneliya's warm, unforced style is already fully present here, in one of the most beloved films of its decade.",
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
      "A charming but feckless plumber coasts through life on petty scams, easy drink, and a smile, cutting corners at work and letting down everyone who cares about him. His emptiness catches up with him as old friends fall away and his habits sour into something sadder. A devoted young nurse who sees something worth saving in him offers a last chance at change.",
    context:
      "One of the biggest box-office hits of its era, Daneliya's tragicomedy mixes broad laughs with an unsentimental look at aimlessness and quiet moral decay in everyday Soviet life. Leonid Kuravlyov makes the wastrel likeable even as the film refuses to excuse him. The open, ambiguous ending leaves his fate, and the possibility of his redemption, hanging.",
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
      "A good-natured village family man who keeps a loft of doves is sent off to a southern seaside resort to recover from an injury, where a glamorous, worldly city woman sweeps him off his feet. He leaves his wife and children to follow her, only to find that the new life does not fit him. Homesickness and second thoughts soon pull him back toward the family he abandoned.",
    context:
      "Vladimir Menshov, fresh off the Oscar-winning Moscow Does Not Believe in Tears, adapted this warm-hearted village comedy from a stage play. Its broad humour, folk texture, and affection for ordinary rural life made it an enormous crowd-pleaser. It has remained a fixture of Russian television, its characters and catchphrases widely known.",
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
      "A wizard, for his own amusement and instruction, has long ago turned a bear into a young man who can become a bear again only if a princess kisses him. When the wizard arranges for exactly such a princess to arrive, the two young people fall genuinely in love, and the spell that was meant as a game becomes a real and painful test. Even the wizard who wrote the story can only watch how it ends.",
    context:
      "Mark Zakharov's whimsical two-part television film, adapted from Yevgeny Schwartz's allegorical play, blends fairy-tale fantasy with sparkling dialogue and songs by Gennady Gladkov. Beneath the magic lies a meditation on love, free will, and the courage to risk transformation. Its starry cast and quotable wit made it an enduring favourite that returns to Russian screens every holiday season.",
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
      "The legendary Baron Munchausen insists on living by his own extraordinary truth, dating his calendar by personal events and recounting impossible feats, in a town that would much prefer him to be ordinary and quiet. The pressure to recant his deeds, and even to fake his own death to win a peaceful life, becomes a quiet tragedy. To stay himself, the Baron must refuse every comfortable compromise on offer.",
    context:
      "Mark Zakharov's philosophical television comedy turns the tall-tale Baron into a parable of the free spirit under pressure to conform, a theme widely understood in the context of Soviet intellectual life. Oleg Yankovsky's Baron, witty and melancholy, is among his most cherished roles. The film's blend of humour and sadness, and its famous closing line about a serious face being no sign of intelligence, gave it a lasting place in the culture.",
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
      "A distinguished Moscow professor transplants a man's glands into a stray dog as a scientific experiment, and to his astonishment the animal slowly becomes human. But the new man, christened Sharikov, is crude, drunken, and grasping, and as a committee gives him papers and a job hounding stray cats, he turns the professor's elegant apartment and life upside down. The experiment in remaking a creature becomes a disaster the scientist must undo.",
    context:
      "Vladimir Bortko's faithful, sepia-toned adaptation of Mikhail Bulgakov's once-banned satirical novella arrived during glasnost, when its biting allegory of the revolution's attempt to engineer a 'new man' could finally be spoken aloud. Yevgeny Yevstigneev and Vladimir Tolokonnikov gave career-defining performances. It became an instant classic, endlessly quoted and rebroadcast.",
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
      "A sweeping cycle of films dramatises the Eastern Front from the great tank battle at Kursk in 1943 through to the fall of Berlin. It cuts constantly between two scales: the experience of ordinary soldiers in the mud and fire of combat, and the strategic decisions taken by generals and heads of state in their headquarters. The whole forms a panoramic account of the war's final, decisive years.",
    context:
      "Yuri Ozerov mounted this enormous state-backed epic with the full resources of the Soviet army, staging vast battles with real tanks and thousands of troops. Conceived as the definitive Soviet record of the road to victory, the cycle is monumental in scale and official in tone, presenting the war from the high command down to the front line. It drew massive audiences and shaped the popular memory of the conflict.",
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
      "In the bleak summer of 1942, during the long retreat toward Stalingrad, a battered Soviet infantry unit fights rear-guard actions and clings to its shrinking ranks. Between the bombardments, the men joke, argue, eat, and grieve, their banter and loyalty the thin line holding them together. The film stays at ground level, among exhausted soldiers far from any headquarters.",
    context:
      "Sergei Bondarchuk adapted the film from Mikhail Sholokhov's novel, and it is notable for its unglamorous, ground-level view of defeat and survival rather than triumph. It was the final screen role of the writer, director, and actor Vasily Shukshin, who died during production. The realism of its combat scenes and the warmth of its ensemble made it one of the most respected later Soviet war films.",
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
      "Four veterans who served together reunite in 1960s Moscow for the funeral of a comrade and spend a long day and night in each other's company. Beneath their settled civilian lives, as accountants, factory managers, and workers, the old wartime bond resurfaces, along with everything it cost them. By morning they have rediscovered who they were to one another.",
    context:
      "Andrei Smirnov's restrained, humane drama looks at how the wartime generation carried its experience into peacetime, and at the quiet gulf between then and now. It is remembered above all for Bulat Okudzhava's song 'We Need One Victory,' performed at the film's close, which became an anthem in its own right. The film's understated emotion made it a lasting favourite.",
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
      "A war correspondent takes twenty days of leave from the fighting at Stalingrad and travels to Tashkent, far from the front. He visits a film set loosely based on his own writing, delivers a dead soldier's last words to a grieving family, and begins a tentative, fragile romance, before the leave ends and he returns to the war. The film stays entirely in the spaces between combat.",
    context:
      "Aleksei German's spare, documentary-textured drama deliberately avoids battle scenes to show the emotional undertow of the war in rear-area life. Casting the beloved circus clown and comic actor Yuri Nikulin against type, as a weary, dignified correspondent, gave the restraint unusual weight. German's exacting realism, which often troubled the censors, marks the film as the work of a major and uncompromising director.",
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
      "At a faded country estate one long summer day, a gathering of provincial gentry drinks, flirts, and reminisces, until old feelings resurface between a disillusioned schoolteacher and a woman he once loved. His mounting despair finally erupts in a confrontation that lays bare the smallness and self-deception of all their lives. By evening the outburst has passed, and everyone retreats back into comfortable illusion.",
    context:
      "Nikita Mikhalkov drew this elegant ensemble piece from the early writings of Anton Chekhov, distilling the playwright's recurring themes of stagnation and missed chances into a single bittersweet day. The film is praised for its luminous period atmosphere and finely tuned performances. It won major international prizes and helped establish Mikhalkov's reputation abroad.",
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
      "During the Civil War, a silent-film crew shoots a frivolous melodrama at a sunny southern resort, blissfully detached from the revolution convulsing the country. The pampered leading lady drifts through the shoot until she falls for a cameraman who is secretly filming evidence for the Bolsheviks. Drawn out of her dream world, she is forced at last to take a side, with tragic consequences.",
    context:
      "Nikita Mikhalkov's nostalgic, sun-drenched homage to the early days of cinema turns abruptly serious as history closes in on its sheltered characters. The film contrasts the make-believe of the movies with the violence of the world outside the studio gates. Yelena Solovey's performance as the awakening diva became one of her signature roles.",
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
    cast: ["Oleg Tabakov", "Yuri Bogatyryov", "Yelena Solovey"],
    summary:
      "A gentle, hopelessly indolent nobleman can barely rouse himself from his dressing gown and sofa, content to dream and drift while life passes by. His energetic, practical friend Stoltz and a spirited young woman named Olga briefly draw him toward activity and love. But Oblomov's deep nature reclaims him, and the film treats his retreat with tenderness rather than scorn.",
    context:
      "Nikita Mikhalkov's warm adaptation of Ivan Goncharov's celebrated novel finds in its famously inert hero not just a figure of satire but an object of real affection. The languid Oblomov becomes a lens on a whole Russian temperament, weighed against the brisk, Westernised efficiency of his friend. Oleg Tabakov's performance is among the most beloved in the Mikhalkov canon.",
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
      "In the early 1920s, a shipment of gold meant to buy grain for the starving young Soviet republic is stolen, and a loyal Cheka officer falls under suspicion of the theft. To clear his name he must hunt down the bandits and White officers behind the robbery, his old comrades unsure whether to trust him. Shifting allegiances and a train heist drive the chase across the steppe.",
    context:
      "Nikita Mikhalkov's debut feature is a stylish Civil-War 'Ostern,' a Soviet Western complete with shootouts, ambushes, and a brooding Eduard Artemyev score. Beneath the action lies a story about trust and loyalty in a world where old certainties have dissolved. The confident, energetic filmmaking announced the arrival of a major directorial talent.",
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
      "Across much of the twentieth century, two families in a remote Siberian village, one poor, one well-to-do, love, feud, and bury their dead as the outside world slowly reaches them. Their fates become bound up with the oil exploration that promises to transform the taiga and tear it open. The personal saga unfolds against the vast, indifferent forest and the upheavals of Soviet history.",
    context:
      "Andrei Konchalovsky's sprawling generational epic weaves intimate family drama together with archival footage of the century's wars and revolutions, set to a driving Eduard Artemyev score. The film balances reverence for the wilderness against the relentless push of industrial progress. It shared the Grand Prix at the Cannes Film Festival, confirming Konchalovsky's international standing.",
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
      "At a Black Sea resort, a jaded married banker from Moscow strikes up a casual affair with a young married woman walking her little dog. What begins as an idle dalliance deepens, against the expectations of both, into a love they cannot shake once they return to their separate, settled lives. They are left meeting in secret, longing for a future neither can quite imagine.",
    context:
      "Iosif Kheifits's exquisitely restrained adaptation of Anton Chekhov's short story captures the writer's mood of quiet yearning and irresolution. The film trusts glances, weather, and silence to carry feeling, and it refuses any neat conclusion. Widely praised abroad, it was honoured at Cannes and is often held up as a model of how to bring Chekhov to the screen.",
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
      "An aging king decides to divide his realm among his daughters according to who flatters him most, and banishes the one who loves him truly but will not perform her devotion. His vanity sets off a chain of betrayal and cruelty that drives him to madness on a storm-blasted heath, while the kingdom collapses into war. Stripped of everything, he finds clarity only when it is too late.",
    context:
      "Grigori Kozintsev's companion to his earlier Hamlet again used Boris Pasternak's translation and a Dmitri Shostakovich score, staging the tragedy amid bleak, elemental landscapes and crowds of the dispossessed. He read the play as the story of a whole society unravelling, not merely one man's fall. The Estonian actor Jüri Järvet gave a remarkable, frail performance in the title role.",
    impact:
      "Together with his Hamlet, the film is regarded as one of the finest screen adaptations of Shakespeare, admired internationally for its fully cinematic conception of the plays.",
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
      "In a shabby provincial town in 1935, a dedicated police investigator pursues a violent criminal gang while a tangle of unspoken loves plays out among his close circle of friends. The events are recalled decades later through the eyes of a boy who lived among them, half-remembered and tinged with loss. Daily life crowds the frame, ordinary and teeming, just before history darkens.",
    context:
      "Aleksei German's densely textured, near-documentary recreation of mid-1930s life is set on the eve of the Great Terror, whose shadow the characters cannot yet see. Its immersive realism, overlapping voices, and roving camera made it difficult for the censors and slow to reach the screen. It is now frequently cited among the greatest of all Russian films.",
    impact:
      "Its layered soundscapes and lived-in, roaming mise-en-scène were hugely influential on later Russian cinema and on German's own singular late style.",
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
      "A small team of geologists searches the remote Siberian taiga for diamonds, enduring isolation, exhaustion, and a quiet love triangle. Just as they finally strike a deposit, a vast forest fire traps them in the wilderness, and their struggle becomes one of simple survival against nature. One by one they are tested past their limits as they try to carry their discovery home.",
    context:
      "Reuniting director Mikhail Kalatozov with cinematographer Sergei Urusevsky after The Cranes Are Flying, this is a visually astonishing survival drama in which the fire and forest become overwhelming presences. The camerawork pushes expressive, handheld technique to extremes, immersing the viewer in smoke, water, and snow. The film was admired more abroad than at home on release.",
    impact:
      "Its bravura, elemental photography later drew the admiration of filmmakers such as Francis Ford Coppola and Martin Scorsese, who helped bring Kalatozov's work to wider attention in the West.",
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
      "A woman keeps digging up the buried corpse of a dead small-town dictator, refusing to let him rest in the ground. Put on trial, she tells the surreal, nightmarish story of the terror he inflicted on her family and her town, and of the neighbours who looked away. Her act of defiance forces the community, and the dictator's own descendants, to confront a past they would rather forget.",
    context:
      "Made in Georgia in 1984 but shelved until the perestroika thaw, Tengiz Abuladze's allegory of Stalinist repression became one of the defining films of the late 1980s. Its dictator is a composite of the century's tyrants, and its nightmare logic let it say what realism could not. Its eventual release was a cultural earthquake, opening the way for an open public reckoning with the crimes of the Soviet past.",
    impact:
      "The film's release helped legitimise the public confrontation with Stalinism and signalled the new openness that would reshape Soviet cinema and society in its final years.",
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
      "A restless young woman in a grim industrial port city drifts through a future that seems to offer her nothing, chafing against her cramped flat and her drunken, quarrelsome parents. She takes up with a student, and bringing him home detonates the simmering tensions in the household. What follows is a raw portrait of a family, and a generation, with nowhere to go.",
    context:
      "A sensation of the glasnost years, Vasili Pichul's bleak, unsparing film broke long-standing taboos, including the first frank depiction of sex in mainstream Soviet cinema, which made it notorious overnight. Audiences and critics read it as an honest verdict on the dead end of late-Soviet life. Natalya Negoda's fearless lead performance made her the face of the era.",
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
      "A laconic drifter returns to Alma-Ata to collect an old debt and finds the woman he once loved addicted to morphine and entangled with the dealers who supply her. Cool and unhurried, he sets out to pull her free and to confront the people controlling her. The deadpan, music-driven tale moves toward a stark and open-ended reckoning.",
    context:
      "A cult landmark of the Kazakh New Wave and of perestroika youth cinema, the film owes much of its enduring power to its star, the rock idol Viktor Tsoi of the band Kino. His magnetic, understated presence and his songs made it a generational touchstone across the Soviet Union. Tsoi's death in a car crash two years later turned the film into a memorial.",
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
      "In wintry, off-season Yalta, a young musician nicknamed Bananan and an aging, sharp-suited gangster are drawn to the same young woman, and their rivalry simmers toward violence. Around them swirls the colourful, unofficial world of Soviet rock and youth culture just beginning to surface. The film famously breaks open at its close into a Viktor Tsoi concert and the song that became an anthem of change.",
    context:
      "Sergei Solovyov's stylish, music-soaked film smuggled the once-marginal Leningrad rock underground onto big screens at the dawn of perestroika. Its mix of crime drama, pop art, and live music caught the restless energy of a country on the verge of transformation. The closing performance of Tsoi's 'We Want Changes!' turned the film into a rallying cry for a generation.",
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
      "A sweet, hardworking girl, tormented by her cruel stepmother, and a vain, boastful young man are each sent out into a magical winter world where they meet Father Frost and the witch Baba Yaga. Their true natures are tested: the kind-hearted girl is rewarded with warmth and treasure, while the selfish boastful one is comically humbled and, for a time, given the head of a bear.",
    context:
      "Aleksandr Rou's exuberant fairy-tale film overflows with folk creatures, talking trees, and inventive practical magic. It became a perennial children's favourite at home and, in dubbed versions, a cult holiday staple abroad, especially in the Czech lands and across Europe. The film distils the moral simplicity and visual delight of the Russian wonder-tale tradition.",
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
      "On the night of her wedding to the knight Ruslan, the princess Lyudmila is snatched away by an evil sorcerer. Ruslan sets out to win her back, journeying across a land of giants, witches, and a colossal living severed head that guards a magic sword. Rival suitors, enchantments, and trials stand between him and his bride before love and courage prevail.",
    context:
      "Adapted from Alexander Pushkin's mock-epic poem, this lavish two-part fantasy was Aleksandr Ptushko's final film, a fitting crown to a career devoted to bringing Russian folklore to the screen. He filled it with elaborate effects, giant figures, and storybook spectacle. It stands as one of the grandest of all Soviet fairy-tale productions.",
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
      "A girl in a hostile, superstitious fishing village clings to an old wanderer's prophecy that a ship with scarlet sails will one day come to carry her away to happiness. Mocked by her neighbours, she keeps her faith through a lonely childhood. A passing sea captain, learning of her dream, quietly resolves to make the impossible promise come true.",
    context:
      "Aleksandr Ptushko's tender adaptation of Alexander Grin's beloved romantic novella became a lasting symbol of youthful hope and the courage to believe in a dream. The luminous young Anastasiya Vertinskaya played the dreaming heroine. In St. Petersburg, a 'Scarlet Sails' festival, complete with a tall ship sailing the Neva, still marks the end of the school year in the film's honour.",
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
      "A scruffy, cigarette-smoking Wolf endlessly pursues a clever, good-natured Hare through parks, beaches, museums, building sites, and city streets. Every elaborate scheme to catch his quarry backfires, leaving the Wolf battered and the Hare unruffled, as the Wolf snarls his catchphrase, 'Well, just you wait!' The wordless chases play out as pure visual comedy.",
    context:
      "Soyuzmultfilm's long-running answer to Tom and Jerry grew into a national institution, its episodes beloved across generations and packed with affectionate detail of everyday Soviet life. The Wolf and Hare became among the most recognisable characters in Russian popular culture, and new episodes appeared over many years. Its gentle, knockabout humour needs no translation.",
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
      "A merchant about to sail abroad asks each of his three daughters what gift she would like, and his youngest wishes only for a single scarlet flower. Plucking it in an enchanted garden binds him to a fearsome, hidden beast, and to save him the daughter takes his place in the beast's magical palace. Her growing love sees past the monstrous form and breaks the curse to reveal the prince beneath.",
    context:
      "Lev Atamanov's hand-drawn retelling of the Russian version of the 'Beauty and the Beast' story was made with the lush, rotoscoped realism of early Soyuzmultfilm features. Its rich colour and graceful movement set a standard for Soviet feature animation. The film remains a treasured classic of the studio's golden age.",
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
      "A wandering troubadour and his band of animal friends, a donkey, a dog, a cat, and a rooster, travel the roads making music and living free. When the troubadour falls for a princess, the friends scheme to outwit her foolish father the king and his blundering guards. With disguises, songs, and high spirits, they win the day and the princess's heart.",
    context:
      "A loose, hip riff on the Brothers Grimm tale, the cartoon is driven by Gennady Gladkov's catchy, beat-flavoured songs, which became enormously popular hits on their own. Its long-haired, guitar-slinging troubadour and its celebration of footloose freedom gave it an unlikely countercultural cool. It grew into a cult favourite and spawned beloved sequels.",
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
      "A Soviet expedition reaches Venus and sets down on its surface, where the cosmonauts and their walking robot must survive a hostile prehistoric world of erupting volcanoes, dinosaur-like beasts, and strange storms. As one craft is lost and rescue grows uncertain, the explorers press on and find hints that an intelligent civilisation once existed on the planet.",
    context:
      "Pavel Klushantsev came from popular-science filmmaking, and his inventive special effects and spacecraft designs were remarkably advanced for their time, blending adventure with a serious vision of space travel. The film was a showcase of Soviet effects artistry in the early years of the space race.",
    impact:
      "American producers bought the footage and re-edited it into more than one English-language science-fiction film in the 1960s, and its effects and imagery influenced filmmakers and effects artists in the West.",
  },
];
