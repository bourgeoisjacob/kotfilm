// Second expansion tranche (Tiers A+B, 20 films) chosen to deepen links to
// directors and actors already in the catalogue. Same shape as newFilmsData.ts;
// scripts/buildExtraFilms2.ts enriches each with Wikidata facts and writes
// lib/filmsExtra2.ts. All prose is ORIGINAL, written for Kotfilm. No em dashes.

import type { NewFilm } from "./newFilmsData";

export const newFilms2: NewFilm[] = [
  // ─────────── Tier A: Mosfilm / Gorky / Soyuzmultfilm ───────────
  {
    slug: "beware-of-the-car",
    title: "Beware of the Car",
    year: 1966,
    director: "Eldar Ryazanov",
    studio: "Mosfilm",
    source: "mosfilm",
    starter: true,
    genres: ["Comedy", "Crime", "Satire"],
    themes: ["justice and the law", "the holy fool", "modern morality"],
    cast: ["Innokenty Smoktunovsky", "Anatoly Papanov", "Andrei Mironov", "Oleg Yefremov"],
    summary:
      "Yuri Detochkin, a gentle, scrupulously honest insurance agent, leads a secret double life as a car thief, but he steals only from crooks and profiteers and gives the proceeds to orphanages. A friend who happens to be a traffic detective slowly closes in on him, torn between duty and admiration. The film follows this Soviet Robin Hood toward an arrest and trial that ask whether the law can quite reach a man who breaks it only to do good.",
    context:
      "One of Eldar Ryazanov's best-loved comedies, written with Emil Braginsky, it blends gentle farce with sharp satire of the petty corruption of the consumer-minded 1960s. Innokenty Smoktunovsky plays Detochkin as a kind of holy fool, and the cast is a roll-call of comic talent, from Anatoly Papanov to a young Andrei Mironov. Its mix of warmth, melancholy and social critique set the template for Ryazanov's later tragicomedies.",
  },
  {
    slug: "the-forty-first",
    title: "The Forty-First",
    year: 1956,
    director: "Grigori Chukhrai",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["War", "Drama", "Romance"],
    themes: ["love across enemy lines", "duty vs. feeling", "the Civil War"],
    cast: ["Izolda Izvitskaya", "Oleg Strizhenov"],
    summary:
      "During the Russian Civil War, a crack Red Army sniper named Maryutka, who has killed forty White soldiers, is charged with guarding a captured White officer as her unit crosses the desert and a deserted Caspian island. Marooned alone together, the two enemies fall in love. When a White ship finally appears, her loyalty and her heart collide, and the officer becomes her forty-first shot.",
    context:
      "Grigori Chukhrai's debut feature, a remake of a 1927 silent, was a landmark of the Thaw for daring to give a White officer genuine humanity and to put private love above ideological duty. Its lyrical colour photography and island setting won it a special prize at Cannes. The film helped open Soviet cinema to a more humane, ambiguous treatment of the Civil War.",
  },
  {
    slug: "clear-sky",
    title: "Clear Sky",
    year: 1961,
    director: "Grigori Chukhrai",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama", "War", "Romance"],
    themes: ["loyalty", "rehabilitation", "the Thaw"],
    cast: ["Yevgeny Urbansky", "Nina Drobysheva"],
    summary:
      "A celebrated test pilot is shot down and taken prisoner during the war, and on his return home he is stripped of his Party card and his standing, treated as a suspect rather than a hero. The woman who loves him stands by him through years of disgrace. Only after Stalin's death does the thaw finally restore his honour and his wings.",
    context:
      "Made at the height of the cultural Thaw, Chukhrai's film was unusually direct in condemning the suspicion heaped on former prisoners of war and the wider climate of fear under Stalin. Yevgeny Urbansky gave one of his signature performances as the grounded pilot. Its imagery of ice breaking on a river became a famous metaphor for the era's loosening grip.",
  },
  {
    slug: "agony",
    title: "Agony",
    year: 1981,
    director: "Elem Klimov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Historical epic", "Drama", "Biography"],
    themes: ["decadence", "power and superstition", "the fall of an empire"],
    cast: ["Aleksei Petrenko", "Anatoly Romashin", "Velta Line"],
    summary:
      "On the eve of the 1917 revolution, the peasant mystic Grigori Rasputin holds a strange power over the Tsarina and, through her, over the crumbling court of Nicholas II. The film charts his drunken, ecstatic excesses and the desperate conspiracy of noblemen who set out to murder him. Around this grotesque central figure, the Romanov dynasty slides toward its end.",
    context:
      "Elem Klimov shot the film in the mid-1970s, but its lurid portrait of the imperial court and its near-sympathetic complexity unsettled the authorities, who held it back for years before a limited release. Aleksei Petrenko's volcanic performance as Rasputin anchors a feverish, almost hallucinatory historical canvas. It stands among the boldest Soviet films about the end of the old regime.",
  },
  {
    slug: "uncle-vanya",
    title: "Uncle Vanya",
    year: 1970,
    director: "Andrei Konchalovsky",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama", "Literary adaptation"],
    themes: ["wasted lives", "longing", "disillusion"],
    cast: ["Innokenty Smoktunovsky", "Sergei Bondarchuk", "Irina Kupchenko"],
    summary:
      "On a decaying country estate, the long-suffering Vanya and his niece Sonya have sacrificed their lives to support a self-important retired professor, only to realize how little he was worth. The arrival of the professor, his beautiful young wife, and a world-weary local doctor stirs up frustrated love and bitter regret among them all. By the end the visitors leave and the two who remain face a future of endurance.",
    context:
      "Andrei Konchalovsky's faithful, finely acted adaptation of Chekhov's play gathers a remarkable cast, with Innokenty Smoktunovsky as the doctor Astrov and Sergei Bondarchuk as Vanya. Konchalovsky uses shifts between colour and monochrome and close, searching camerawork to bring out the play's mood of thwarted lives. It is regarded as one of the finest screen Chekhovs.",
  },
  {
    slug: "nine-days-of-one-year",
    title: "Nine Days of One Year",
    year: 1962,
    director: "Mikhail Romm",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama"],
    themes: ["science and sacrifice", "friendship", "the atomic age"],
    cast: ["Aleksey Batalov", "Innokenty Smoktunovsky", "Tatyana Lavrova"],
    summary:
      "Two nuclear physicists, the idealistic Gusev and the sceptical, witty Kulikov, are close friends and rivals for the same woman. Gusev keeps working despite a dangerous dose of radiation that may cost him his life, convinced the research is worth the risk. The film follows their friendship, their debates about the meaning of science, and the quiet courage of a man facing his own mortality.",
    context:
      "Mikhail Romm's spare, modernist drama captured the optimism and anxiety of the early atomic age and the prestige of physics during the Thaw. Its cool, intellectual style and the sparkling performances of Aleksey Batalov and Innokenty Smoktunovsky made it hugely influential on a younger generation of Soviet filmmakers, several of whom were Romm's students.",
    impact:
      "Widely admired for its restrained, intellectual approach, it influenced the look and tone of 1960s Soviet cinema, and Romm's teaching at VGIK shaped directors such as Tarkovsky, Shukshin and Konchalovsky.",
  },
  {
    slug: "five-evenings",
    title: "Five Evenings",
    year: 1979,
    director: "Nikita Mikhalkov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Drama", "Romance"],
    themes: ["second chances", "lost time", "tenderness"],
    cast: ["Lyudmila Gurchenko", "Stanislav Lyubshin"],
    summary:
      "Over five evenings, a middle-aged man and the woman he loved and left eighteen years earlier, before the war separated them, cautiously rediscover one another in a cramped Moscow apartment. Old wounds, pride and small deceptions get in the way before they reach a fragile reconciliation. The whole drama unfolds in a handful of rooms.",
    context:
      "Nikita Mikhalkov shot this intimate chamber piece quickly, between larger productions, adapting a play by Aleksandr Volodin. Its warmth and restraint, and the finely matched performances of Lyudmila Gurchenko and Stanislav Lyubshin, made it one of the most beloved Soviet films about ordinary love and the passage of time.",
  },
  {
    slug: "kinfolk",
    title: "Kinfolk",
    year: 1981,
    director: "Nikita Mikhalkov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Comedy", "Drama"],
    themes: ["family", "town and country", "modern alienation"],
    cast: ["Nonna Mordyukova", "Svetlana Kryuchkova", "Yuri Bogatyryov"],
    summary:
      "A hearty, bewildered village woman travels to the city to visit her daughter, hoping to mend the young woman's broken marriage, and collides with a modern urban life she cannot fathom. Her well-meaning interference upends everyone around her. Beneath the comedy runs a sharp look at the gulf between the old rural world and the restless, fractured city.",
    context:
      "A change of register for Nikita Mikhalkov, this satirical tragicomedy is carried by Nonna Mordyukova's towering performance as the mother. Its grotesque, almost absurdist touches and its portrait of late-Soviet social drift gave it a bite unusual for a popular comedy, and it featured the screen debut of a young Oleg Menshikov.",
  },
  {
    slug: "dont-grieve",
    title: "Don't Grieve!",
    year: 1969,
    director: "Georgiy Daneliya",
    studio: "Mosfilm",
    country: "USSR (Georgian SSR)",
    source: "mosfilm",
    genres: ["Comedy", "Drama"],
    themes: ["joy and sorrow", "community", "the fullness of life"],
    cast: ["Vakhtang Kikabidze", "Sofiko Chiaureli", "Sergo Zakariadze"],
    summary:
      "In a Georgian town at the turn of the twentieth century, a warm-hearted young doctor moves among his neighbours through a string of feasts, quarrels, romances and funerals, embracing life in all its comedy and grief. The film is less a plot than a garland of episodes celebrating friendship, music and the bittersweet flavour of existence.",
    context:
      "Georgiy Daneliya, himself Georgian, transplanted a French novel to his homeland for this sun-warmed tragicomedy, full of song and feeling. Vakhtang Kikabidze, later the star of Mimino, leads a vivid Georgian cast. The film distils Daneliya's gift for finding sorrow inside laughter and laughter inside sorrow.",
  },
  {
    slug: "the-stone-flower",
    title: "The Stone Flower",
    year: 1946,
    director: "Aleksandr Ptushko",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Fantasy", "Fairy tale", "Drama"],
    themes: ["art and obsession", "nature's magic", "true love"],
    cast: ["Vladimir Druzhnikov", "Tamara Makarova", "Mikhail Troyanovsky"],
    summary:
      "A gifted young stonecutter in the Ural mountains becomes obsessed with carving a malachite flower of perfect, living beauty, and is lured into the underground domain of the Mistress of the Copper Mountain, who tests his art and his heart. His faithful betrothed waits above, fearing she has lost him to the mountain's enchantment.",
    context:
      "Drawn from Pavel Bazhov's Ural folk tales, The Stone Flower was one of the first Soviet films shot in colour, and its rich palette won Aleksandr Ptushko a prize at the first postwar Cannes festival. It launched his long career of bringing Russian folklore to the screen with lavish craft and spectacle.",
  },
  {
    slug: "white-bim-black-ear",
    title: "White Bim Black Ear",
    year: 1977,
    director: "Stanislav Rostotsky",
    studio: "Gorky Film Studio",
    source: "gorky",
    starter: true,
    genres: ["Drama", "Family"],
    themes: ["loyalty", "kindness and cruelty", "devotion"],
    cast: ["Vyacheslav Tikhonov", "Valentina Vladimirova", "Mikhail Dadyko"],
    summary:
      "When his gentle, ailing owner is taken to hospital, a loyal setter named Bim sets out across the city to find him, encountering kindness and cruelty in turn from the people he meets. The dog's search becomes a moving portrait of human decency and indifference. Its quiet heartbreak has reduced generations of viewers to tears.",
    context:
      "Stanislav Rostotsky adapted Gavriil Troyepolsky's novel into one of the most beloved Soviet family dramas, anchored by Vyacheslav Tikhonov as Bim's devoted master. The film was nominated for the Academy Award for Best Foreign Language Film and remains a fixture of childhood viewing across the former Soviet world.",
  },
  {
    slug: "well-live-till-monday",
    title: "We'll Live Till Monday",
    year: 1968,
    director: "Stanislav Rostotsky",
    studio: "Gorky Film Studio",
    source: "gorky",
    genres: ["Drama"],
    themes: ["teaching and conscience", "generations", "honesty"],
    cast: ["Vyacheslav Tikhonov", "Olga Ostroumova", "Nina Menshikova"],
    summary:
      "Over three days at a Moscow school, a thoughtful, demanding history teacher questions his vocation and his place among colleagues and pupils, while a young teacher and the students wrestle with honesty, first love and what it means to live decently. A schoolchild's essay on happiness becomes the film's quiet moral centre.",
    context:
      "Stanislav Rostotsky's sensitive school drama struck a deep chord during the Thaw's later years for taking young people and their moral questions seriously. Vyacheslav Tikhonov's restrained teacher and Olga Ostroumova's screen debut helped make it a touchstone, and it won the top prize at the Moscow International Film Festival.",
  },
  {
    slug: "kingdom-of-crooked-mirrors",
    title: "Kingdom of Crooked Mirrors",
    year: 1963,
    director: "Aleksandr Rou",
    studio: "Gorky Film Studio",
    source: "gorky",
    genres: ["Fantasy", "Fairy tale", "Family"],
    themes: ["seeing clearly", "courage", "self-knowledge"],
    cast: ["Olga Yukina", "Tatyana Yukina", "Andrei Stapran"],
    summary:
      "A careless, lazy girl named Olya steps through a magic mirror and meets her own reversed reflection, Yalo, in a topsy-turvy kingdom where crooked mirrors hide the truth and the people are kept from seeing how they really live. Together the two girls help free an imprisoned mirror-maker and learn to face their own faults.",
    context:
      "Aleksandr Rou's inventive fairy-tale film, with its playful doubling of twin actresses and its sly allegory about distorted truth, became a children's favourite. It is a fine example of the rich tradition of Soviet fantasy filmmaking that Rou did so much to shape.",
  },
  {
    slug: "fire-water-and-brass-pipes",
    title: "Fire, Water and Brass Pipes",
    year: 1968,
    director: "Aleksandr Rou",
    studio: "Gorky Film Studio",
    source: "gorky",
    genres: ["Fantasy", "Fairy tale", "Family"],
    themes: ["constancy", "temptation", "true love"],
    cast: ["Natalya Sedykh", "Aleksei Katyshev", "Georgy Millyar"],
    summary:
      "A young charcoal-burner and his sweetheart are parted when she is carried off by the wicked sorcerer Kashchei, and he must pass through fire, water and the 'brass pipes' of fame and flattery to win her back. The trials test not only his courage but his faithfulness and his head.",
    context:
      "One of Aleksandr Rou's exuberant later fairy tales, it reunites him with the young Natalya Sedykh of Morozko and the great character actor Georgy Millyar, long the studio's favourite Baba Yaga and Kashchei. Its folk creatures, songs and gentle moral lessons place it firmly in the beloved Soviet fairy-tale tradition.",
  },
  {
    slug: "the-golden-antelope",
    title: "The Golden Antelope",
    year: 1954,
    director: "Lev Atamanov",
    studio: "Soyuzmultfilm",
    source: "soyuzmultfilm",
    genres: ["Animation", "Fairy tale", "Family"],
    themes: ["greed", "kindness", "freedom"],
    cast: [],
    summary:
      "A magical antelope whose hooves strike gold from the ground befriends a poor orphan boy and protects him from a greedy raja who wants endless riches. When the raja's lust for gold overwhelms him, the antelope grants his wish in a way that destroys him. Set in an Indian fairy-tale world, the film is a fable about the difference between need and greed.",
    context:
      "Lev Atamanov's beautifully drawn film, made at Soyuzmultfilm in the lush style of the studio's golden age, is admired for its graceful animation and its stylised Indian setting. It stands alongside his Snow Queen and Scarlet Flower as a high point of classic Soviet animation.",
  },
  {
    slug: "to-kill-a-dragon",
    title: "To Kill a Dragon",
    year: 1988,
    director: "Mark Zakharov",
    studio: "Mosfilm",
    source: "mosfilm",
    genres: ["Fantasy", "Drama", "Satire"],
    themes: ["tyranny and freedom", "complicity", "the dragon within"],
    cast: ["Oleg Yankovsky", "Aleksandr Abdulov", "Yevgeny Leonov"],
    summary:
      "A wandering knight named Lancelot arrives in a town that has lived for centuries under the rule of a shape-shifting Dragon, and resolves to free its people, only to find that the townsfolk have grown comfortable with their servitude. Even after the Dragon is slain, a new tyrant rises from among them, and Lancelot learns that the hardest dragon to kill is the one inside ordinary hearts.",
    context:
      "Mark Zakharov's dark, carnivalesque fantasy, adapted from Yevgeny Schwartz's allegorical play, arrived at the height of perestroika and was widely read as a parable about tyranny and the people's complicity in it. Reuniting Zakharov's regular players Oleg Yankovsky, Aleksandr Abdulov and Yevgeny Leonov, it is a fitting capstone to his cycle of philosophical fairy tales.",
  },

  // ─────────────── Tier B: Lenfilm (Channel Five) ───────────────
  {
    slug: "don-quixote",
    title: "Don Quixote",
    year: 1957,
    director: "Grigori Kozintsev",
    studio: "Lenfilm",
    source: "lenfilm",
    genres: ["Drama", "Literary adaptation", "Adventure"],
    themes: ["idealism", "madness and nobility", "illusion"],
    cast: ["Nikolai Cherkasov", "Yuri Tolubeyev"],
    summary:
      "The gaunt, gentle country gentleman Don Quixote, his head turned by tales of chivalry, sets out with his earthy squire Sancho Panza to right the world's wrongs as a knight errant. He tilts at windmills and mistakes inns for castles, mocked by all yet somehow nobler than the sane world around him. His doomed idealism is both absurd and deeply moving.",
    context:
      "Grigori Kozintsev's widescreen colour adaptation of Cervantes, made before his celebrated Shakespeare films, gave Nikolai Cherkasov one of his great late roles as the knight of the sorrowful countenance. Sympathetic and humane, it reads Quixote's madness as a kind of grace, and ranks among the finest screen versions of the novel.",
  },
  {
    slug: "trial-on-the-road",
    title: "Trial on the Road",
    year: 1971,
    director: "Aleksei German",
    studio: "Lenfilm",
    source: "lenfilm",
    genres: ["War", "Drama"],
    themes: ["redemption", "guilt", "moral ambiguity"],
    cast: ["Rolan Bykov", "Anatoly Solonitsyn", "Vladimir Zamansky"],
    summary:
      "During the war, a Soviet soldier who had surrendered and served with the Germans gives himself up to a partisan band and begs the chance to redeem himself. The wary partisan commander must decide whether to trust him, while his hard-line commissar wants the defector shot. A dangerous raid on a German supply train becomes the man's trial and his chance at atonement.",
    context:
      "Aleksei German's early feature dared to take a former collaborator as its sympathetic hero, and its morally complex view of the war led the authorities to ban it for fifteen years before its release during glasnost. Its gritty, unheroic realism and fine ensemble, including Rolan Bykov and Anatoly Solonitsyn, mark it as an early work of one of Russia's most uncompromising directors.",
  },
  {
    slug: "the-star-of-captivating-happiness",
    title: "The Star of Captivating Happiness",
    year: 1975,
    director: "Vladimir Motyl",
    studio: "Lenfilm",
    source: "lenfilm",
    genres: ["Historical epic", "Drama", "Romance"],
    themes: ["devotion", "sacrifice", "conscience"],
    cast: ["Irina Kupchenko", "Oleg Strizhenov", "Oleg Yankovsky"],
    summary:
      "After the failed Decembrist uprising of 1825, several noblewomen give up their titles, wealth and comfort to follow their condemned husbands into Siberian exile and hard labour. The film interweaves the doomed revolt with the women's extraordinary acts of loyalty, tracing love and conscience against the machinery of the autocratic state.",
    context:
      "Vladimir Motyl, fresh from the popular White Sun of the Desert, turned to history for this lavish, romantic epic about the Decembrists and the wives who shared their fate. Its sweeping period staging and a starry cast, including Oleg Yankovsky and Innokenty Smoktunovsky, made it a much-loved film about idealism and sacrifice.",
  },
  {
    slug: "dead-season",
    title: "Dead Season",
    year: 1968,
    director: "Savva Kulish",
    studio: "Lenfilm",
    source: "lenfilm",
    genres: ["Drama", "Crime"],
    themes: ["espionage", "conscience", "the Cold War"],
    cast: ["Donatas Banionis", "Rolan Bykov", "Svetlana Korkoshko"],
    summary:
      "A Soviet intelligence officer is sent into the West on a dangerous mission to track down a former Nazi scientist who experimented with nerve agents, and to arrange a spy exchange. Cool and methodical, he navigates a shadow world of surveillance and betrayal where a single mistake means death. The film is a sober, intelligent portrait of the loneliness of the secret agent.",
    context:
      "Savva Kulish's restrained spy thriller, loosely inspired by real intelligence operations and introduced on screen by the famous spy Rudolf Abel, was a major popular success and a more thoughtful, melancholy answer to Western spy films. Donatas Banionis, later the lead of Tarkovsky's Solaris, gives the agent a quiet, weary humanity.",
  },
];
