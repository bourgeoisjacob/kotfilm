// Curated, original short biographies keyed by person slug. Written for Kotfilm,
// never copied from any source. People without an entry here fall back to a
// filmography-based line generated in PersonProfile, so no page is ever empty.
// Editorial note: no em dashes, by request.

export const personBios: Record<string, string> = {
  // ── Directors ──────────────────────────────────────────────
  "andrei-tarkovsky":
    "One of the most influential filmmakers of the twentieth century, Andrei Tarkovsky made just seven features, each a dense, slow-moving meditation on memory, faith, and time. His style, built on long takes and a painterly use of landscape and the elements, shaped art cinema far beyond the Soviet Union. Frustrated by state interference, he spent his final years working in the West.",
  "sergei-eisenstein":
    "Sergei Eisenstein was the great theorist of montage, the idea that meaning in cinema is created by the collision of shots. From his silent landmarks of the 1920s to his late historical epics, he treated film as a tool for thought as much as emotion. His writing and teaching made him one of the most studied figures in film history.",
  "mikhail-kalatozov":
    "Mikhail Kalatozov is remembered above all for the soaring, restless camerawork he developed with cinematographer Sergei Urusevsky. After years of administrative work in Soviet cinema, he returned to directing during the Thaw and produced a run of visually daring films that won international acclaim.",
  "grigori-kozintsev":
    "A founder of the radical FEKS group in the 1920s, Grigori Kozintsev matured into one of the Soviet Union's most respected literary adapters. His later Shakespeare films, made at Lenfilm with Pasternak translations and Shostakovich scores, are considered among the finest screen versions of the plays.",
  "vsevolod-pudovkin":
    "Vsevolod Pudovkin was, with Eisenstein, a pioneer of Soviet montage, though he favoured emotional 'linkage' and strong central characters over pure collision. His silent trilogy of the late 1920s became foundational texts for the theory of film editing.",
  "dziga-vertov":
    "Dziga Vertov was a radical documentary theorist who rejected fiction in favour of the 'film-eye,' the camera as a tool for revealing everyday life. His experiments with editing and self-reflexive technique, above all in Man with a Movie Camera, influenced documentary and avant-garde cinema for decades.",
  "aleksandr-dovzhenko":
    "Aleksandr Dovzhenko was the great poet of Ukrainian cinema, weaving folklore, nature, and revolutionary upheaval into rhapsodic, image-driven films. His associative style and feeling for the land left a lasting mark on later lyrical filmmakers.",
  "yakov-protazanov":
    "Yakov Protazanov was a prolific director whose career bridged pre-revolutionary Russian cinema and the Soviet era. He is best known abroad for the science-fiction fantasy Aelita, with its striking Constructivist designs.",
  "sergei-bondarchuk":
    "Sergei Bondarchuk was an actor turned director famous for vast historical epics mounted on a scale few studios could match. His adaptation of War and Peace remains one of the largest productions in film history and won the Academy Award for Best Foreign Language Film.",
  "sergei-parajanov":
    "Sergei Parajanov was a visionary of poetic cinema whose films abandon conventional narrative for dense tableaux of ritual, colour, and folk art. His independence and unorthodox life led to repeated persecution and imprisonment, yet his work profoundly influenced art filmmakers worldwide.",
  "larisa-shepitko":
    "Larisa Shepitko was among the most gifted directors of her generation, drawn to questions of conscience, sacrifice, and moral testing. Her career was cut short when she died in a car accident at thirty-eight, soon after winning the top prize at Berlin for The Ascent.",
  "elem-klimov":
    "Elem Klimov began with sharp satirical comedies before turning to harrowing drama. His final film, Come and See, is widely regarded as one of the most powerful war films ever made. He directed little afterward, saying he had said all he wished to say.",
  "grigori-chukhrai":
    "A frontline veteran of the Second World War, Grigori Chukhrai brought a humane, unheroic view of the conflict to the screen during the Thaw. Ballad of a Soldier, his best-known film, was honoured around the world for its tenderness.",
  "eldar-ryazanov":
    "Eldar Ryazanov was the master of the Soviet tragicomedy, blending warm humour with melancholy and gentle social satire. Across several decades his films, many of them perennial television favourites, captured the texture of ordinary Soviet life with great affection.",
  "leonid-gaidai":
    "Leonid Gaidai was the most popular comedy director in Soviet history, a brilliant constructor of slapstick whose films drew enormous audiences. His recurring characters and rapid-fire visual gags entered the common culture, quoted to this day.",
  "georgiy-daneliya":
    "Georgiy Daneliya was a Georgian-born director celebrated for bittersweet comedies that balance laughter with quiet sadness. His films often turn on friendship, longing, and the warmth between people across the Soviet Union's many nationalities.",
  "vladimir-menshov":
    "Vladimir Menshov was an actor and director whose crowd-pleasing dramas struck a deep chord with audiences. Moscow Does Not Believe in Tears, his biggest success, won the Academy Award for Best Foreign Language Film.",
  "nikita-mikhalkov":
    "Nikita Mikhalkov is a leading actor and director of late-Soviet and Russian cinema, known for elegant literary adaptations and ensemble dramas. He later won an Academy Award for Burnt by the Sun and became a prominent, and sometimes controversial, public figure.",
  "andrei-konchalovsky":
    "Andrei Konchalovsky, Mikhalkov's elder brother, co-wrote early Tarkovsky scripts before directing sweeping dramas such as Siberiade. He went on to a Hollywood career and continued making acclaimed films in Russia.",
  "aleksei-german":
    "Aleksei German was a Lenfilm perfectionist whose dense, near-documentary recreations of the Soviet past took years to make and often clashed with the censors. His immersive, layered style made him one of the most admired Russian directors.",
  "tengiz-abuladze":
    "Tengiz Abuladze was a Georgian director whose allegorical trilogy culminated in Repentance, a daring confrontation with the legacy of Stalinist terror. Its release became a landmark moment of the perestroika years.",
  "sergei-solovyov":
    "Sergei Solovyov moved from refined literary films to capturing the energy of late-Soviet youth culture. Assa, with its rock soundtrack, became an anthem for a changing country.",
  "vladimir-bortko":
    "Vladimir Bortko is a director best known for faithful, atmospheric adaptations of Russian literature. His version of Bulgakov's Heart of a Dog became an instant classic on its glasnost-era release.",
  "vasili-pichul":
    "Vasili Pichul made one of the defining films of the glasnost era with Little Vera, a frank, unsparing portrait of provincial family life that broke long-standing taboos in Soviet cinema.",
  "rashid-nugmanov":
    "Rashid Nugmanov was a key figure of the Kazakh New Wave whose cult film The Needle, starring the rock idol Viktor Tsoi, captured the restless mood of late-Soviet youth.",
  "vladimir-motyl":
    "Vladimir Motyl directed White Sun of the Desert, the much-loved adventure that founded the Soviet 'Eastern.' Independent-minded and often at odds with officialdom, he built a devoted following on a handful of films.",
  "stanislav-rostotsky":
    "A wounded veteran of the war, Stanislav Rostotsky returned to it repeatedly in humane, emotional dramas. The Dawns Here Are Quiet, about young women soldiers, became one of the most beloved Soviet war films.",
  "andrei-smirnov":
    "Andrei Smirnov directed Belorussian Station, a quietly powerful drama about veterans reckoning with peacetime. Censorship difficulties limited his output, and he later became known again as an actor.",
  "yuri-ozerov":
    "Yuri Ozerov specialised in vast war epics mounted with the full resources of the state, including real tanks and thousands of troops. His multi-film cycle Liberation aimed to be the definitive Soviet account of the war's final years.",
  "akira-kurosawa":
    "Akira Kurosawa was one of Japan's and the world's greatest directors. He made Dersu Uzala in the Soviet Union with Mosfilm during a difficult period in his career, and the film won the Academy Award for Best Foreign Language Film.",
  "grigori-aleksandrov":
    "Grigori Aleksandrov began as Eisenstein's close collaborator before creating the Soviet musical comedy. His glossy, upbeat films of the 1930s, several starring his wife Lyubov Orlova, were sanctioned as wholesome mass entertainment.",
  "iosif-kheifits":
    "Iosif Kheifits was a Lenfilm veteran admired for his sensitive, restrained dramas. His adaptation of Chekhov's The Lady with the Dog is considered a model of literary screen adaptation.",
  "abram-room":
    "Abram Room was a bold director of the silent and early sound era whose Bed and Sofa tackled marriage, the housing crisis, and women's autonomy with a frankness well ahead of its time.",
  "georgi-vasilyev":
    "Georgi Vasilyev, with his namesake Sergei (the so-called Vasilyev brothers, though unrelated), directed Chapaev, an enormously popular early sound film that became the model for Socialist Realist cinema.",
  "konstantin-yershov":
    "Konstantin Yershov co-directed Viy, the imaginative adaptation of Gogol's horror tale that stands as essentially the only outright horror film of the Soviet era.",
  "kira-muratova":
    "Kira Muratova was a singular, uncompromising director whose elliptical, idiosyncratic films were repeatedly shelved by the authorities. She gained wide recognition only later as one of the most original voices in post-Soviet cinema.",
  "mark-zakharov":
    "Mark Zakharov was a celebrated theatre director whose witty, musical television films, often adapted from literary fables, became enduring favourites for their sparkling dialogue and philosophical undertow.",
  "aleksandr-ptushko":
    "Aleksandr Ptushko devoted his career to bringing Russian folklore and fairy tale to the screen with elaborate effects and grand spectacle. He is sometimes called the Soviet answer to the great fantasy showmen of Hollywood.",
  "aleksandr-rou":
    "Aleksandr Rou specialised in exuberant fairy-tale films full of folk creatures and practical magic. Several, like Morozko, became perennial children's favourites and gained a following abroad.",
  "aleksandr-seryy":
    "Aleksandr Seryy directed the beloved comedy Gentlemen of Fortune, co-written by Georgiy Daneliya. His career was marked by personal hardship, and he made only a few films.",
  "yuri-norstein":
    "Yuri Norstein is widely regarded as the greatest of all animators. Working in painstaking cutout and multi-plane techniques, he made short masterpieces, including Hedgehog in the Fog and Tale of Tales, that treat animation as serious poetic art.",
  "fyodor-khitruk":
    "Fyodor Khitruk was a leading Soviet animator and teacher whose flat-graphic, expressive style modernised the art form. His version of Winnie-the-Pooh became the definitive one for Russian audiences.",
  "lev-atamanov":
    "Lev Atamanov was a pioneer of Soviet feature animation whose lush, hand-drawn films, including The Snow Queen and The Scarlet Flower, set a standard for the studio Soyuzmultfilm.",
  "roman-kachanov":
    "Roman Kachanov was a master of stop-motion animation who, with writer Eduard Uspensky, created Cheburashka, one of the most cherished characters in Soviet culture.",
  "vyacheslav-kotyonochkin":
    "Vyacheslav Kotyonochkin directed Nu, Pogodi!, the long-running wolf-and-hare chase cartoon that became a national institution and one of the most recognisable works of Soviet animation.",
  "inessa-kovalevskaya":
    "Inessa Kovalevskaya was an animation director who specialised in musical cartoons. Her hip, beat-driven The Bremen Town Musicians became a cult favourite.",
  "pavel-klushantsev":
    "Pavel Klushantsev was a pioneer of science-fiction and popular-science filmmaking whose inventive special effects, especially in Planet of Storms, influenced filmmakers in the Soviet Union and the West.",

  // ── Actors ─────────────────────────────────────────────────
  "anatoly-solonitsyn":
    "Anatoly Solonitsyn was Andrei Tarkovsky's favourite actor, appearing in most of his films, including the title role in Andrei Rublev. He brought a haunted intensity to intellectual and spiritual roles before his early death from cancer.",
  "innokenty-smoktunovsky":
    "Innokenty Smoktunovsky was one of the great Soviet stage and screen actors, equally at home in tragedy and comedy. His brooding Hamlet for Kozintsev brought him international recognition.",
  "yevgeny-leonov":
    "Yevgeny Leonov was one of the most beloved actors in Soviet cinema, a rotund, warm presence who could move effortlessly between broad comedy and deep pathos. His voice also brought to life many animated characters.",
  "andrei-mironov":
    "Andrei Mironov was a charismatic, elegant comic actor and singer adored by Soviet audiences. A fixture of stage and screen, he died suddenly at forty-six while performing.",
  "lyudmila-gurchenko":
    "Lyudmila Gurchenko was a glamorous star and singer whose career spanned from the Thaw comedy Carnival Night to acclaimed dramatic roles decades later. She remained a fixture of Soviet and Russian popular culture for half a century.",
  "oleg-yankovsky":
    "Oleg Yankovsky was a magnetic leading man of late-Soviet cinema, equally compelling in Tarkovsky's art films and in popular television fables such as That Same Munchausen.",
  "oleg-tabakov":
    "Oleg Tabakov was a hugely respected actor and theatre administrator with a warm, sly screen presence, memorable as the languid hero of Oblomov. He later led the Moscow Art Theatre.",
  "yuri-nikulin":
    "Yuri Nikulin was a legendary circus clown who became one of the country's most loved film actors, ranging from broad comedy in Gaidai's films to restrained drama in Twenty Days Without War.",
  "georgy-vitsin":
    "Georgy Vitsin was a gifted comic actor best known as one of the bumbling trio of crooks in Leonid Gaidai's comedies.",
  "leonid-kuravlyov":
    "Leonid Kuravlyov was a versatile, everyman actor of great charm, memorable as the feckless plumber in Afonya and the seminarian in Viy.",
  "aleksandr-demyanenko":
    "Aleksandr Demyanenko became a household face as Shurik, the bespectacled student hero of Leonid Gaidai's most popular comedies.",
  "yuri-yakovlev":
    "Yuri Yakovlev was a distinguished actor of stage and screen, equally adept at comedy and drama, indelible in the dual role of the building manager and Ivan the Terrible in Gaidai's time-travel farce.",
  "yevgeny-yevstigneev":
    "Yevgeny Yevstigneev was a subtle, much-admired character actor whose Professor Preobrazhensky in Heart of a Dog is among the most celebrated performances in Russian cinema.",
  "anatoly-papanov":
    "Anatoly Papanov was a beloved actor and voice artist who moved easily between sharp comedy and serious drama on stage and screen.",
  "oleg-basilashvili":
    "Oleg Basilashvili was a leading Lenfilm-era actor known for intelligent, melancholy roles, including the indecisive translator of Autumn Marathon.",
  "vasily-shukshin":
    "Vasily Shukshin was a rare triple talent as writer, director, and actor, celebrated for his earthy portraits of rural Russian life. He died at forty-five during the filming of They Fought for Their Country.",
  "vladimir-vysotsky":
    "Vladimir Vysotsky was a magnetic actor and, above all, the most famous bard of the Soviet era, whose raw, unofficial songs were known by heart across the country. His early death sealed his status as a folk hero.",
  "viktor-tsoi":
    "Viktor Tsoi was the leader of the rock band Kino and a generational icon whose songs became anthems of change in the late 1980s. His starring role in The Needle and his death in a car crash at twenty-eight cemented his legend.",
  "nikolai-cherkasov":
    "Nikolai Cherkasov was a towering presence in Soviet historical cinema, embodying national heroes in Eisenstein's Alexander Nevsky and Ivan the Terrible.",
  "aleksey-batalov":
    "Aleksey Batalov was an actor of quiet integrity who became the face of Thaw-era cinema in The Cranes Are Flying and later won wide affection as the steadfast hero of Moscow Does Not Believe in Tears.",
  "tatiana-samoilova":
    "Tatiana Samoilova became an international sensation as the heroine of The Cranes Are Flying, her expressive performance helping the film win the top prize at Cannes.",
  "frunzik-mkrtchyan":
    "Frunzik Mkrtchyan was a much-loved Armenian comic actor whose warm, woebegone presence lit up films such as Mimino and Kidnapping, Caucasian Style.",
  "vakhtang-kikabidze":
    "Vakhtang Kikabidze was a popular Georgian actor and singer, indelible as the dreaming helicopter pilot of Mimino.",
  "natalya-varley":
    "Natalya Varley, a former circus performer, became a star as the spirited heroine of Kidnapping, Caucasian Style and the doomed witch of Viy.",
  "anastasiya-vertinskaya":
    "Anastasiya Vertinskaya was a luminous actress of the 1960s, memorable as Ophelia in Kozintsev's Hamlet and the dreaming girl of Scarlet Sails.",
  "larisa-golubkina":
    "Larisa Golubkina became a star as the cross-dressing heroine of the musical Hussar Ballad and remained a popular stage and screen actress.",
  "vyacheslav-tikhonov":
    "Vyacheslav Tikhonov was one of the Soviet Union's most popular leading men, beloved for his quiet authority on screen.",
  "inna-churikova":
    "Inna Churikova was a singular dramatic actress of great range, admired for her work on stage and in the films of her husband, Gleb Panfilov, as well as popular fables.",
  "alisa-freindlich":
    "Alisa Freindlich was a celebrated stage and screen actress, equally affecting as the transformed manager of Office Romance and the wife in Tarkovsky's Stalker.",
  "andrei-myagkov":
    "Andrei Myagkov was a gentle, everyman leading man indelibly associated with Eldar Ryazanov's comedies The Irony of Fate and Office Romance.",
  "valentin-gaft":
    "Valentin Gaft was a sharp, commanding character actor and noted writer of satirical epigrams, a fixture of Ryazanov's ensembles.",
  "liya-akhedzhakova":
    "Liya Akhedzhakova was a beloved character actress whose small, vivid roles in Ryazanov's comedies made her a recognisable and cherished presence.",
  "natalya-gundareva":
    "Natalya Gundareva was one of the most popular actresses of late-Soviet cinema, warm and natural in a long run of leading roles.",
  "vera-alentova":
    "Vera Alentova gave the central performance in Moscow Does Not Believe in Tears, the self-made heroine whose story won the film an Academy Award.",
  "lyubov-orlova":
    "Lyubov Orlova was the first great star of Soviet sound cinema, the radiant singing heroine of the 1930s musical comedies directed by her husband, Grigori Aleksandrov.",
  "leonid-utyosov":
    "Leonid Utyosov was a pioneering Soviet jazz bandleader and singer who starred in Jolly Fellows, the country's first major musical comedy.",
  "igor-ilyinsky":
    "Igor Ilyinsky was a leading comic actor from the silent era onward, a master of physical comedy on stage and screen.",
  "boris-babochkin":
    "Boris Babochkin created one of Soviet cinema's most iconic roles as the Red commander in Chapaev, a performance watched and loved by millions.",
  "maya-bulgakova":
    "Maya Bulgakova was a powerful dramatic actress, unforgettable as the grounded former fighter pilot in Larisa Shepitko's Wings.",
  "margarita-terekhova":
    "Margarita Terekhova was a striking, enigmatic actress best known for her dual role as the mother and wife in Tarkovsky's The Mirror.",
  "donatas-banionis":
    "Donatas Banionis was a leading Lithuanian actor of contemplative intensity, internationally known as the psychologist Kris Kelvin in Tarkovsky's Solaris.",
  "juri-jarvet":
    "Jüri Järvet was an Estonian actor of remarkable expressiveness, memorable as the title figure in Kozintsev's King Lear and in Tarkovsky's Solaris.",
  "yelena-solovey":
    "Yelena Solovey was a delicate, expressive actress associated with Nikita Mikhalkov's films, indelible as the silent-film diva of A Slave of Love.",
  "yuri-bogatyryov":
    "Yuri Bogatyryov was a gifted, soft-spoken actor and painter, a regular in Nikita Mikhalkov's early ensemble films.",
  "aleksandr-kalyagin":
    "Aleksandr Kalyagin was a versatile actor of stage and screen, memorable in Mikhalkov's Chekhov adaptation An Unfinished Piece for Mechanical Piano.",
  "pavel-luspekayev":
    "Pavel Luspekayev gave a beloved, larger-than-life performance as the customs officer Vereshchagin in White Sun of the Desert, completed despite serious illness near the end of his life.",
  "anatoly-kuznetsov":
    "Anatoly Kuznetsov starred as the steadfast Red Army soldier Sukhov in White Sun of the Desert, one of the most quoted heroes in Russian cinema.",
  "spartak-mishulin":
    "Spartak Mishulin was a popular comic actor, widely remembered as the resourceful Saïd in White Sun of the Desert.",
  "saveli-kramarov":
    "Saveli Kramarov was a hugely popular comic actor with an unmistakable face, beloved for his crooks and fools before he emigrated to the United States.",
  "mikhail-pugovkin":
    "Mikhail Pugovkin was a prolific comic character actor whose broad, good-natured roles made him a familiar face in dozens of beloved films.",
  "vladimir-tolokonnikov":
    "Vladimir Tolokonnikov achieved lasting fame for his startling performance as Sharikov, the dog turned man, in Heart of a Dog.",
  "tatyana-drubich":
    "Tatyana Drubich was a leading actress of Sergei Solovyov's films, including the perestroika landmark Assa, who also trained and worked as a physician.",
  "pyotr-mamonov":
    "Pyotr Mamonov was a charismatic rock musician turned actor, an eccentric, riveting screen presence from The Needle onward.",
  "stanislav-govorukhin":
    "Stanislav Govorukhin was a popular director who also acted, bringing a worldly menace to his role as the older rival in Assa.",
  "avtandil-makharadze":
    "Avtandil Makharadze was a leading Georgian actor who gave the central, dual performance in Abuladze's Repentance.",
  "natalya-negoda":
    "Natalya Negoda became the face of glasnost-era cinema with her fearless lead performance in Little Vera.",
  "vasily-lanovoy":
    "Vasily Lanovoy was a handsome, classically trained leading man of stage and screen, an icon of romantic and heroic roles from Scarlet Sails onward.",
  "nikolay-burlyaev":
    "Nikolay Burlyaev was a notable child and young actor, unforgettable as the boy soldier in Tarkovsky's Ivan's Childhood and the bell-caster's son in Andrei Rublev.",
  "zhanna-prokhorenko":
    "Zhanna Prokhorenko made a tender screen debut as the young woman in Ballad of a Soldier and went on to a long career.",
  "vladimir-ivashov":
    "Vladimir Ivashov became famous overnight as the gentle soldier Alyosha in Ballad of a Soldier, one of the defining faces of Thaw cinema.",
  "lyudmila-savelyeva":
    "Lyudmila Savelyeva, trained as a ballerina, gave a celebrated performance as Natasha Rostova in Bondarchuk's War and Peace.",
  "yuri-solomin":
    "Yuri Solomin was a respected actor of stage and screen, internationally known as the surveyor Arseniev in Kurosawa's Dersu Uzala, who later led the Maly Theatre.",
  "oleg-dal":
    "Oleg Dal was an intense, restless actor of great gifts whose roles on stage and screen, cut short by his early death, earned a devoted following.",
  "rodion-nakhapetov":
    "Rodion Nakhapetov was a romantic leading man of the 1970s who later became a director, working both in Russia and the United States.",
  "barbara-brylska":
    "Barbara Brylska was a Polish actress who became a New Year's institution across the Soviet world as the heroine of The Irony of Fate.",
  "boris-andreyev":
    "Boris Andreyev was a powerful, broad-shouldered star of Soviet cinema, well suited to the folk hero of Ilya Muromets.",
  "sergei-stolyarov":
    "Sergei Stolyarov was a handsome leading man of the 1930s and after, a natural fit for the noble heroes of fairy-tale epics like Sadko.",
};
