window.COURSES = window.COURSES || {};
window.COURSES["agile"] = {
  "id": "agile",
  "title": "Agile / Scrum",
  "icon": "AGL",
  "summary": "Comprendre l'agilite (Manifeste Agile, valeurs et principes) puis maitriser Scrum de bout en bout : les 3 roles, les evenements, les artefacts, les user stories et l'estimation, et enfin la comparaison Kanban vs Scrum. Un cours debutant vers junior, oriente entretien d'embauche et pratique en equipe.",
  "chapters": [
    {
      "id": "manifeste-agile",
      "title": "Le Manifeste Agile : valeurs et principes",
      "markdown": "# Le Manifeste Agile\n\n## Pourquoi l'agilite est nee\n\nAvant l'agilite, beaucoup de projets logiciels suivaient le modele dit **cycle en V** ou **waterfall** (cascade) : on specifiait TOUT au debut, puis on developpait, puis on testait, puis on livrait, en une seule grande passe qui pouvait durer des mois ou des annees.\n\nLe probleme : quand on livrait enfin, le besoin du client avait souvent change, ou bien la specification initiale contenait des erreurs invisibles au depart. On decouvrait les problemes trop tard, quand ils coutaient le plus cher a corriger.\n\n> Metaphore : construire en cascade, c'est commander un costume sur mesure par courrier en envoyant ses mesures une seule fois, sans essayage, et en decouvrant le resultat 6 mois plus tard. L'agilite, c'est passer chez le tailleur toutes les deux semaines pour essayer, ajuster les manches, et repartir avec une version un peu plus juste a chaque fois.\n\nEn fevrier 2001, 17 experts du developpement logiciel se reunissent a Snowbird (Utah) et signent le **Manifeste pour le developpement Agile de logiciels** (Agile Manifesto). Ce n'est pas une methode, mais un **etat d'esprit** : un ensemble de valeurs et de principes.\n\n## Les 4 valeurs\n\nLe Manifeste tient en quatre phrases. Chacune oppose deux elements : ce qui est **a gauche** a plus de valeur que ce qui est **a droite**, sans pour autant rejeter la droite.\n\n| On valorise davantage... | ...que... |\n|---|---|\n| Les **individus et leurs interactions** | les processus et les outils |\n| Des **logiciels operationnels** | une documentation exhaustive |\n| La **collaboration avec les clients** | la negociation contractuelle |\n| L'**adaptation au changement** | le suivi d'un plan |\n\nLa phrase officielle se termine par : *\"Nous reconnaissons la valeur des seconds elements, mais privilegions les premiers.\"* C'est crucial pour un entretien : l'agilite ne dit pas \"pas de documentation\" ou \"pas de plan\", elle dit \"pas QUE ca, et pas au detriment de la valeur livree\".\n\n## Les 12 principes\n\nDerriere les 4 valeurs, le Manifeste detaille 12 principes. En voici une formulation synthetique :\n\n1. Satisfaire le client en livrant tot et regulierement de la valeur.\n2. Accueillir positivement les changements de besoins, meme tard dans le projet.\n3. Livrer frequemment un logiciel operationnel (de quelques semaines a quelques mois).\n4. Faire collaborer quotidiennement metier et developpeurs.\n5. Batir les projets autour de personnes motivees, leur donner confiance et soutien.\n6. Privilegier la conversation en face a face pour transmettre l'information.\n7. Mesurer l'avancement avec le logiciel qui fonctionne (pas avec des rapports).\n8. Maintenir un rythme de developpement **soutenable** indefiniment.\n9. Porter une attention continue a l'excellence technique et a la qualite du design.\n10. Rechercher la **simplicite** : maximiser la quantite de travail qu'on ne fait pas.\n11. Faire emerger les meilleures architectures via des equipes **auto-organisees**.\n12. A intervalles reguliers, l'equipe **reflechit** a comment devenir plus efficace et s'ajuste.\n\n> A retenir : le principe 12 (l'introspection reguliere) donnera la Retrospective dans Scrum ; le principe 1 et 3 (livrer tot et souvent) donneront les Sprints courts ; le principe 11 (auto-organisation) explique pourquoi un Scrum Master n'est pas un chef.\n\n## Agile n'est pas une methode\n\nPoint de vocabulaire souvent pris en piege en entretien :\n\n- **Agile** = un etat d'esprit, une philosophie (le Manifeste).\n- **Scrum, Kanban, XP (eXtreme Programming), SAFe...** = des **cadres** (frameworks) ou methodes qui *appliquent* l'agilite.\n\nDire \"on fait de l'Agile\" ne veut donc rien dire de precis ; dire \"on fait du Scrum\" decrit un cadre concret.\n\n## En resume\n\n- L'agilite repond a l'echec des projets en cascade : livrer souvent pour s'adapter au changement.\n- 4 valeurs : individus, logiciel qui marche, collaboration client, adaptation au changement.\n- 12 principes qui declinent ces valeurs (livraison frequente, rythme soutenable, simplicite, auto-organisation, introspection).\n- Agile = etat d'esprit ; Scrum = un cadre qui le met en oeuvre.",
      "playground": null,
      "quiz": [
        {
          "question": "Selon le Manifeste Agile, qu'est-ce qui a le plus de valeur ?",
          "options": [
            "Une documentation exhaustive plutot qu'un logiciel operationnel",
            "Le suivi d'un plan plutot que l'adaptation au changement",
            "Les individus et leurs interactions plutot que les processus et les outils",
            "La negociation contractuelle plutot que la collaboration avec le client"
          ],
          "correctIndex": 2,
          "explanation": "La premiere valeur du Manifeste privilegie les individus et leurs interactions par rapport aux processus et outils. Les trois autres propositions inversent les valeurs reelles."
        },
        {
          "question": "Que signifie la phrase finale du Manifeste sur les elements 'de droite' (processus, documentation, plan) ?",
          "options": [
            "Ils sont inutiles et doivent etre supprimes",
            "Ils ont de la valeur, mais on privilegie les elements de gauche",
            "Ils ont strictement la meme valeur que les elements de gauche",
            "Ils ne concernent que les chefs de projet"
          ],
          "correctIndex": 1,
          "explanation": "Le Manifeste reconnait explicitement la valeur des seconds elements, mais privilegie les premiers. L'agilite ne rejette donc ni la documentation ni la planification."
        },
        {
          "question": "Quelle affirmation est correcte sur le vocabulaire ?",
          "options": [
            "Agile est une methode precise avec des reunions imposees",
            "Scrum et Kanban sont des synonymes du mot Agile",
            "Agile est un etat d'esprit, et Scrum est un cadre qui l'applique",
            "Le Manifeste Agile impose d'utiliser Scrum"
          ],
          "correctIndex": 2,
          "explanation": "Agile est une philosophie (le Manifeste : valeurs et principes). Scrum, Kanban ou XP sont des cadres concrets qui mettent l'agilite en pratique."
        }
      ]
    },
    {
      "id": "scrum-roles",
      "title": "Scrum : les 3 roles",
      "markdown": "# Scrum : les 3 roles (Accountabilities)\n\n## Qu'est-ce que Scrum ?\n\n**Scrum** est le cadre agile le plus utilise au monde. Il a ete formalise par Ken Schwaber et Jeff Sutherland (le *Scrum Guide*, mis a jour pour la derniere fois en 2020). Scrum organise le travail en cycles courts et reguliers appeles **Sprints**, et repose sur une petite equipe pluridisciplinaire.\n\nDans le Scrum Guide 2020, on parle officiellement d'un seul **Scrum Team** compose de trois **responsabilites** (accountabilities) : le Product Owner, le Scrum Master et les Developpeurs. Il n'y a **pas de sous-equipes ni de hierarchie** interne. L'equipe est typiquement de **10 personnes ou moins**.\n\n> Metaphore : pensez a une equipe de cuisine pour un service. Le **Product Owner** est le chef de salle qui sait ce que veulent les clients et dans quel ordre servir. Les **Developpeurs** sont les cuisiniers qui preparent les plats. Le **Scrum Master** est le responsable d'organisation qui s'assure que la cuisine tourne sans accroc, que personne ne bloque les autres, et que les regles du service sont respectees.\n\n## Le Product Owner (PO)\n\nLe Product Owner est responsable de **maximiser la valeur** du produit. C'est la voix du metier et du client dans l'equipe.\n\nSes responsabilites :\n\n- **Gerer le Product Backlog** : creer les elements (user stories), les exprimer clairement, et surtout les **ordonner** (prioriser).\n- Definir et communiquer l'**objectif produit** (Product Goal).\n- S'assurer que le backlog est **visible et compris** de tous.\n- Decider de ce qui sera fait... et de ce qui ne le sera pas.\n\nPoints cles : le PO est **une seule personne**, pas un comite. Il peut deleguer la redaction des items, mais il en reste responsable. Pour que Scrum fonctionne, toute l'organisation doit **respecter ses decisions** de priorisation.\n\n## Le Scrum Master (SM)\n\nLe Scrum Master est responsable de l'**efficacite de l'equipe Scrum**. Attention : ce n'est **pas un chef de projet** et **pas un manager**. C'est un **leader-serviteur** (servant leader) et un coach.\n\nSes responsabilites :\n\n- Aider l'equipe a **comprendre et appliquer Scrum** (theorie et pratique).\n- **Lever les obstacles** (impediments) qui ralentissent les Developpeurs.\n- **Faciliter** les evenements Scrum quand c'est utile, en respectant le timebox.\n- **Proteger l'equipe** des interruptions externes et coacher l'auto-organisation.\n- Aider l'organisation entiere a adopter l'agilite.\n\n> A retenir : le Scrum Master ne distribue PAS les taches et n'evalue PAS les gens. Il enleve les cailloux du chemin pour que l'equipe avance seule.\n\n## Les Developpeurs (Developers)\n\nLes Developpeurs sont les personnes qui **construisent l'increment** a chaque Sprint. Le terme \"Developpeurs\" est large : il inclut developpeurs, testeurs (QA), designers UX, architectes... toute competence necessaire pour livrer le produit.\n\nLeurs responsabilites :\n\n- Creer un **plan de Sprint** (le Sprint Backlog).\n- Garantir la **qualite** en respectant la Definition of Done.\n- **Adapter** leur plan chaque jour vers l'objectif de Sprint.\n- Se tenir **mutuellement responsables** en tant que professionnels.\n\nLes Developpeurs sont **auto-organises** : ils decident eux-memes qui fait quoi et comment. Personne (pas meme le PO ou le SM) ne leur dicte la maniere de transformer le backlog en increment.\n\n## Tableau recapitulatif\n\n| Role | Question centrale | Responsable de |\n|---|---|---|\n| Product Owner | QUOI et POURQUOI ? | La valeur, le backlog, la priorisation |\n| Scrum Master | COMMENT mieux travailler ensemble ? | L'efficacite, lever les obstacles, le cadre |\n| Developpeurs | COMMENT le construire ? | L'increment, la qualite, le \"comment\" technique |\n\n## Pieges classiques en entretien\n\n- Non, le Scrum Master n'est pas le \"chef\" de l'equipe.\n- Non, le Product Owner ne donne pas les taches techniques aux developpeurs.\n- Oui, l'equipe est **pluridisciplinaire** (cross-functional) : elle doit posseder en interne toutes les competences pour livrer, sans dependre d'une equipe externe.\n\n## En resume\n\n- Une seule Scrum Team, trois responsabilites, pas de hierarchie, <= 10 personnes.\n- Product Owner = la valeur et la priorisation (le QUOI).\n- Scrum Master = leader-serviteur qui leve les obstacles (le COMMENT s'organiser).\n- Developpeurs = construisent l'increment, auto-organises (le COMMENT technique).",
      "playground": null,
      "quiz": [
        {
          "question": "Qui est responsable d'ordonner (prioriser) le Product Backlog ?",
          "options": [
            "Le Scrum Master",
            "Les Developpeurs collectivement",
            "Le Product Owner",
            "Le manager de l'equipe"
          ],
          "correctIndex": 2,
          "explanation": "Le Product Owner est responsable de la gestion et de la priorisation du Product Backlog afin de maximiser la valeur du produit."
        },
        {
          "question": "Quelle description correspond le mieux au Scrum Master ?",
          "options": [
            "Un chef de projet qui assigne les taches et evalue les developpeurs",
            "Un leader-serviteur qui leve les obstacles et coache l'equipe",
            "La personne qui redige toutes les user stories",
            "Le representant du client qui valide le budget"
          ],
          "correctIndex": 1,
          "explanation": "Le Scrum Master est un servant leader : il aide l'equipe a appliquer Scrum, leve les obstacles et facilite, mais il n'assigne pas les taches et n'est pas un manager."
        },
        {
          "question": "Que signifie le fait que l'equipe Scrum soit 'pluridisciplinaire' (cross-functional) ?",
          "options": [
            "Chaque membre sait tout faire de maniere identique",
            "L'equipe possede en interne toutes les competences pour livrer l'increment",
            "L'equipe est composee uniquement de developpeurs back-end",
            "L'equipe depend d'une equipe de test externe a chaque Sprint"
          ],
          "correctIndex": 1,
          "explanation": "Cross-functional signifie que l'equipe reunit toutes les competences necessaires (dev, test, design...) pour produire un increment sans dependre d'autres equipes."
        }
      ]
    },
    {
      "id": "scrum-evenements",
      "title": "Les evenements Scrum",
      "markdown": "# Les evenements Scrum\n\nScrum definit cinq evenements. Le premier, le **Sprint**, est un conteneur qui englobe les quatre autres. Tous sont **timeboxes** : ils ont une duree maximale fixee a l'avance, ce qui evite les reunions qui s'eternisent et cree un rythme regulier.\n\n> Metaphore : un Sprint est comme un episode de serie. Il a une duree fixe, raconte une histoire complete (un increment utilisable), et a la fin on fait le point avant de tourner le prochain episode.\n\n## 1. Le Sprint\n\nLe **Sprint** est le coeur de Scrum : une periode de longueur fixe, **d'un mois maximum** (souvent 2 semaines), pendant laquelle l'equipe transforme une partie du backlog en increment utilisable.\n\nCaracteristiques :\n\n- Des qu'un Sprint se termine, le suivant commence immediatement : **pas de pause** entre les Sprints.\n- Pendant le Sprint : **pas de changement** qui mettrait en peril l'objectif de Sprint (Sprint Goal), la qualite ne baisse pas, et le primetre peut etre renegocie entre PO et Developpeurs si besoin.\n- Une duree **courte et constante** rend le travail previsible et limite le risque a un seul cycle.\n\n## 2. La Sprint Planning (planification de Sprint)\n\nC'est la reunion qui **ouvre** le Sprint. Toute l'equipe Scrum y participe. Timebox : **maximum 8 heures pour un Sprint d'un mois** (proportionnellement moins pour un Sprint plus court, ex. ~4h pour 2 semaines).\n\nElle repond a trois questions :\n\n1. **Pourquoi** ce Sprint a-t-il de la valeur ? -> on definit le **Sprint Goal**.\n2. **Quoi** peut-on livrer ? -> on selectionne les items du Product Backlog.\n3. **Comment** le travail sera-t-il fait ? -> les Developpeurs decoupent en taches.\n\nLe resultat est le **Sprint Backlog** (objectif + items selectionnes + plan).\n\n## 3. Le Daily Scrum (melee quotidienne)\n\nReunion **quotidienne** des Developpeurs, timeboxee a **15 minutes maximum**, a la meme heure et au meme endroit chaque jour.\n\nObjectif : **inspecter l'avancement** vers le Sprint Goal et **adapter** le plan du jour. Ce n'est PAS un reporting au manager. Un format classique (mais non obligatoire) pose trois questions par personne :\n\n- Qu'ai-je fait hier qui aide a atteindre l'objectif ?\n- Que vais-je faire aujourd'hui ?\n- Quels obstacles me bloquent ?\n\n> A retenir : le Daily appartient aux Developpeurs. Le Scrum Master veille au timebox mais ne le dirige pas. Les discussions detaillees se poursuivent apres la melee, en petit comite.\n\n## 4. La Sprint Review (revue de Sprint)\n\nElle a lieu **a la fin** du Sprint. Timebox : **4 heures maximum pour un Sprint d'un mois**. L'equipe Scrum **et les parties prenantes** (stakeholders) y participent.\n\nObjectif : **inspecter l'increment** produit et **adapter le Product Backlog**. On montre ce qui a ete fait (idealement une demonstration du logiciel qui marche), on recueille les retours, on discute de ce qui a change sur le marche ou le besoin, et on ajuste la suite. C'est un moment de collaboration, **pas une simple demo de validation**.\n\n## 5. La Retrospective de Sprint\n\nC'est le **dernier evenement** du Sprint, apres la Review. Timebox : **3 heures maximum pour un Sprint d'un mois**. Seule l'equipe Scrum y participe.\n\nObjectif : ameliorer la **maniere de travailler** (le \"comment\"), pas le produit. L'equipe examine ce qui s'est bien passe, ce qui a pose probleme, et decide **d'ameliorations concretes** a tenter au prochain Sprint. C'est l'application directe du 12e principe agile.\n\n## Tableau des evenements\n\n| Evenement | Quand | Timebox (Sprint d'1 mois) | Qui | Objet |\n|---|---|---|---|---|\n| Sprint | Conteneur | <= 1 mois | Scrum Team | Produire un increment |\n| Sprint Planning | Debut | <= 8 h | Scrum Team | Definir le quoi et le comment |\n| Daily Scrum | Chaque jour | <= 15 min | Developpeurs | Inspecter/adapter le plan du jour |\n| Sprint Review | Fin | <= 4 h | Scrum Team + parties prenantes | Inspecter l'increment, ajuster le backlog |\n| Retrospective | Apres la Review | <= 3 h | Scrum Team | Ameliorer la facon de travailler |\n\n## En resume\n\n- 5 evenements, tous timeboxes ; le Sprint contient les 4 autres.\n- Planning ouvre le Sprint (Pourquoi/Quoi/Comment), Daily le rythme chaque jour (15 min), Review montre l'increment aux parties prenantes, Retrospective ameliore l'equipe.\n- Review = on inspecte le **produit** ; Retrospective = on inspecte le **processus**.",
      "playground": null,
      "quiz": [
        {
          "question": "Quelle est la duree maximale (timebox) d'un Daily Scrum ?",
          "options": [
            "5 minutes",
            "15 minutes",
            "1 heure",
            "Il n'y a pas de limite"
          ],
          "correctIndex": 1,
          "explanation": "Le Daily Scrum est timeboxe a 15 minutes maximum. C'est une courte synchronisation quotidienne des Developpeurs pour adapter le plan vers le Sprint Goal."
        },
        {
          "question": "Quelle est la difference essentielle entre la Sprint Review et la Retrospective ?",
          "options": [
            "Il n'y a aucune difference, ce sont deux noms pour la meme reunion",
            "La Review inspecte le produit (l'increment) ; la Retrospective ameliore la facon de travailler",
            "La Review est quotidienne, la Retrospective est mensuelle",
            "La Retrospective sert a montrer l'increment aux clients"
          ],
          "correctIndex": 1,
          "explanation": "La Sprint Review porte sur le produit et le backlog avec les parties prenantes ; la Retrospective porte sur le processus et l'amelioration de l'equipe."
        },
        {
          "question": "Que se passe-t-il entre la fin d'un Sprint et le debut du suivant ?",
          "options": [
            "Une pause obligatoire d'une semaine",
            "Une phase de test separee hors Sprint",
            "Le Sprint suivant demarre immediatement, sans pause",
            "Une reunion de validation budgetaire avec la direction"
          ],
          "correctIndex": 2,
          "explanation": "Dans Scrum, un nouveau Sprint commence immediatement apres la fin du precedent. Il n'y a pas de pause entre les Sprints."
        }
      ]
    },
    {
      "id": "artefacts-stories",
      "title": "Artefacts, user stories, estimation",
      "markdown": "# Les artefacts Scrum et la matiere du travail\n\n## Les 3 artefacts\n\nUn **artefact** represente du travail ou de la valeur, sous une forme visible pour favoriser la transparence. Scrum en definit trois, chacun associe a un **engagement** (commitment) qui lui donne un focus.\n\n| Artefact | Ce que c'est | Engagement associe |\n|---|---|---|\n| Product Backlog | Liste ordonnee de tout ce qui pourrait ameliorer le produit | Product Goal (objectif produit) |\n| Sprint Backlog | Ce que l'equipe vise pour CE Sprint + le plan | Sprint Goal (objectif de Sprint) |\n| Increment | Une version utilisable et terminee du produit | Definition of Done |\n\n### Product Backlog\n\nC'est la **source unique** du travail. Une liste vivante, ordonnee par priorite, qui evolue en permanence. Les items du haut sont plus precis et plus petits que ceux du bas (on les **affine** au fil du temps, c'est le *backlog refinement*). Le PO en est responsable.\n\n### Sprint Backlog\n\nC'est le sous-ensemble du Product Backlog que les Developpeurs s'engagent a realiser pendant le Sprint, **plus le Sprint Goal**, **plus le plan** (les taches). Il appartient aux Developpeurs et evolue tout au long du Sprint.\n\n### Increment\n\nC'est le **resultat concret et utilisable** d'un Sprint : un increment s'additionne aux precedents. Il n'est considere comme un increment que s'il respecte la **Definition of Done**. On peut produire plusieurs increments dans un meme Sprint.\n\n## Les User Stories\n\nLes items du backlog sont souvent ecrits sous forme de **user stories** (recits utilisateur). Ce n'est pas impose par Scrum, mais c'est la pratique la plus repandue. Le format classique :\n\n> **En tant que** [type d'utilisateur], **je veux** [un objectif], **afin de** [un benefice].\n\nExemple : *\"En tant que client, je veux filtrer les produits par prix, afin de trouver plus vite ce qui rentre dans mon budget.\"*\n\nUne bonne user story suit le memo **INVEST** :\n\n- **I**ndependent : independante des autres autant que possible.\n- **N**egotiable : ouverte a la discussion, pas un contrat fige.\n- **V**aluable : apporte de la valeur a l'utilisateur.\n- **E**stimable : assez claire pour etre estimee.\n- **S**mall : assez petite pour tenir dans un Sprint.\n- **T**estable : on sait dire si elle est terminee.\n\nLes **criteres d'acceptation** completent la story : ce sont les conditions concretes qui prouvent qu'elle fonctionne (ex. \"si je saisis un prix max de 50, seuls les produits <= 50 s'affichent\").\n\n## Story points, estimation et velocite\n\n### Les story points\n\nPlutot que d'estimer en heures (peu fiable), beaucoup d'equipes estiment en **story points** : une mesure **relative** de l'effort, qui combine complexite, volume de travail et incertitude. On compare les stories entre elles (\"celle-ci est deux fois plus grosse que celle-la\") plutot que de predire un temps absolu.\n\nOn utilise souvent une suite proche de **Fibonacci** (1, 2, 3, 5, 8, 13, 20...) : plus une story est grosse, plus l'incertitude est grande, donc plus les paliers s'ecartent.\n\n### Le Planning Poker\n\nTechnique d'estimation collaborative : chaque developpeur choisit une carte (un chiffre) en secret, tout le monde la revele en meme temps. Si les ecarts sont grands, on en discute (souvent celui qui a mis le plus et le moins s'expliquent), puis on revote. Cela evite l'effet de groupe et fait emerger les incomprehensions.\n\n### La velocite\n\nLa **velocite** est le nombre de story points qu'une equipe termine **en moyenne par Sprint**. Elle sert a **prevoir** combien de travail tiendra dans les prochains Sprints.\n\nPoints importants pour un entretien :\n\n- La velocite est un **outil de prevision pour l'equipe**, pas un indicateur de performance individuelle.\n- Elle n'est **pas comparable** d'une equipe a l'autre (les points sont relatifs a chaque equipe).\n- Elle se stabilise apres quelques Sprints.\n\n## La Definition of Done (DoD)\n\nLa **Definition of Done** est la liste partagee des criteres qu'un increment doit remplir pour etre considere comme **\"termine\"** (et donc potentiellement livrable). Exemple : code revu, tests ecrits et passants, documentation a jour, deploye en environnement de recette.\n\n- Elle garantit la **qualite** et une comprehension commune de \"fini\".\n- Tant qu'un item ne respecte pas la DoD, il **ne fait pas partie** de l'increment et ne peut pas etre presente comme termine.\n- A ne pas confondre avec les **criteres d'acceptation** : la DoD s'applique a TOUT le travail (qualite generale), les criteres d'acceptation sont **specifiques a une story**.\n\n## En resume\n\n- 3 artefacts : Product Backlog (Product Goal), Sprint Backlog (Sprint Goal), Increment (Definition of Done).\n- Les user stories (En tant que... je veux... afin de...) decrivent la valeur ; INVEST en juge la qualite.\n- On estime en story points (effort relatif, suite de Fibonacci) souvent via le Planning Poker.\n- La velocite = points termines par Sprint en moyenne, un outil de prevision pour l'equipe.\n- La Definition of Done definit \"termine\" pour garantir la qualite ; differente des criteres d'acceptation d'une story.",
      "playground": null,
      "quiz": [
        {
          "question": "Que representent les story points ?",
          "options": [
            "Le nombre exact d'heures necessaires pour une tache",
            "Une mesure relative de l'effort (complexite, volume, incertitude)",
            "La note de performance d'un developpeur",
            "Le budget en euros alloue a une story"
          ],
          "correctIndex": 1,
          "explanation": "Les story points sont une estimation relative de l'effort, combinant complexite, volume de travail et incertitude. On compare les stories entre elles plutot que d'estimer un temps absolu."
        },
        {
          "question": "Quel artefact est associe a la Definition of Done ?",
          "options": [
            "Le Product Backlog",
            "Le Sprint Backlog",
            "L'Increment",
            "Le Daily Scrum"
          ],
          "correctIndex": 2,
          "explanation": "L'Increment a pour engagement la Definition of Done : un travail n'est un increment que s'il respecte cette definition de 'termine'."
        },
        {
          "question": "Quelle affirmation sur la velocite est correcte ?",
          "options": [
            "Elle permet de comparer la performance entre deux equipes differentes",
            "C'est le nombre moyen de story points termines par Sprint, utile pour prevoir",
            "Elle mesure la productivite individuelle de chaque developpeur",
            "Elle doit toujours augmenter a chaque Sprint, sinon l'equipe a echoue"
          ],
          "correctIndex": 1,
          "explanation": "La velocite est une moyenne de points termines par Sprint, servant a prevoir la charge future. Elle n'est ni un indicateur individuel ni comparable entre equipes."
        }
      ]
    },
    {
      "id": "kanban-vs-scrum",
      "title": "Kanban vs Scrum et autres pratiques",
      "markdown": "# Kanban vs Scrum et autres pratiques agiles\n\n## Kanban en bref\n\n**Kanban** (mot japonais signifiant \"panneau\" / \"signal visuel\") vient du systeme de production Toyota. Applique au logiciel, c'est une methode de gestion de flux **continu**, sans Sprints ni roles imposes.\n\nSes principes essentiels :\n\n- **Visualiser le travail** sur un tableau (le *Kanban board*) avec des colonnes : par exemple *A faire -> En cours -> En revue -> Termine*.\n- **Limiter le travail en cours** (WIP, *Work In Progress*) : on fixe un maximum de cartes par colonne. C'est LE coeur de Kanban : on arrete de commencer et on commence a terminer.\n- **Gerer le flux** : reduire le temps de traversee (lead time) et reperer les goulots d'etranglement.\n- **Amelioration continue** et evolutive : on n'impose pas un grand changement, on ameliore par petites touches.\n\n> Metaphore : Scrum, c'est un train qui part a heure fixe toutes les deux semaines, qu'il soit plein ou non. Kanban, c'est un tapis roulant continu : on pose un colis quand une place se libere, et on regule la cadence pour eviter l'embouteillage.\n\n## Scrum vs Kanban : le comparatif\n\n| Critere | Scrum | Kanban |\n|---|---|---|\n| Cadence | Iterations fixes (Sprints) | Flux continu, pas de Sprint |\n| Roles | PO, Scrum Master, Developpeurs | Aucun role impose |\n| Evenements | Planning, Daily, Review, Retro | Aucun impose (cadences optionnelles) |\n| Engagement | Sprint Goal pour le Sprint | Pas d'engagement par iteration |\n| Limite de charge | Le contenu du Sprint | Limites de WIP par colonne |\n| Changement en cours | Evite pendant le Sprint | Possible a tout moment |\n| Metrique typique | Velocite (points/Sprint) | Lead time, cycle time, debit (throughput) |\n| Convient bien a... | Produits avec evolution planifiable par cycle | Support, maintenance, flux imprevisible |\n\nIl n'y a pas de \"meilleur\" : tout depend du contexte. Certaines equipes combinent les deux en **Scrumban** (un cadre Scrum auquel on ajoute des limites de WIP et un flux plus continu).\n\n## Le timeboxing\n\nLe **timeboxing** consiste a fixer a l'avance une **duree maximale** pour une activite, puis a s'y tenir. C'est un principe transversal de l'agilite (tous les evenements Scrum sont timeboxes).\n\nPourquoi c'est utile :\n\n- Cree un **rythme** previsible.\n- Force a se **concentrer sur l'essentiel** (on adapte le primetre au temps, pas l'inverse).\n- Evite les reunions qui s'eternisent et la sur-analyse (*analysis paralysis*).\n\n## Estimation : recapitulatif des pratiques\n\nAu-dela des story points et du Planning Poker (vus au chapitre precedent), retenez :\n\n- **T-shirt sizing** : estimer en tailles (S, M, L, XL) pour des estimations grossieres et rapides, utile tres en amont.\n- **Estimation relative** : le principe commun a la plupart des techniques agiles : comparer les items entre eux plutot que chercher une duree absolue, car l'humain compare mieux qu'il ne predit.\n- **#NoEstimates** : un courant qui propose de se passer d'estimations chiffrees en decoupant le travail en items tres petits et homogenes, puis en comptant simplement le nombre d'items livres.\n\n## Quelques autres cadres a connaitre (culture generale)\n\n- **XP (eXtreme Programming)** : centre sur l'excellence technique (TDD, pair programming, integration continue, refactoring). Souvent combine avec Scrum.\n- **SAFe (Scaled Agile Framework)** : pour faire de l'agile a grande echelle, sur plusieurs equipes et plusieurs produits.\n- **Lean** : reduire le gaspillage et maximiser la valeur ; Kanban en est proche.\n\n## En resume\n\n- Kanban = flux continu, visualisation, limites de WIP, pas de role ni d'evenement impose.\n- Scrum = iterations fixes (Sprints), roles et evenements definis, engagement par Sprint.\n- On choisit selon le contexte ; Scrumban combine les deux.\n- Le timeboxing fixe une duree max pour creer du rythme et du focus.\n- L'estimation agile est surtout **relative** (story points, T-shirt sizing) ; #NoEstimates propose de s'en passer.",
      "playground": null,
      "quiz": [
        {
          "question": "Quel est le mecanisme central de Kanban ?",
          "options": [
            "Les Sprints de deux semaines",
            "La limitation du travail en cours (WIP) par colonne",
            "Le Planning Poker obligatoire",
            "La nomination d'un Scrum Master"
          ],
          "correctIndex": 1,
          "explanation": "Kanban repose sur la visualisation du flux et surtout la limitation du Work In Progress (WIP) par colonne, afin de fluidifier le travail et reperer les goulots."
        },
        {
          "question": "Quelle difference majeure existe entre Scrum et Kanban ?",
          "options": [
            "Scrum n'a pas de roles, Kanban impose trois roles",
            "Scrum fonctionne par iterations fixes (Sprints) tandis que Kanban est un flux continu",
            "Kanban interdit toute visualisation du travail",
            "Scrum se mesure uniquement avec le lead time"
          ],
          "correctIndex": 1,
          "explanation": "Scrum organise le travail en Sprints de duree fixe avec roles et evenements ; Kanban gere un flux continu sans iterations ni roles imposes."
        },
        {
          "question": "Qu'est-ce que le timeboxing ?",
          "options": [
            "Fixer a l'avance une duree maximale pour une activite et s'y tenir",
            "Ranger les taches dans des boites physiques",
            "Estimer les stories en tailles de t-shirt",
            "Interdire toute reunion dans l'equipe"
          ],
          "correctIndex": 0,
          "explanation": "Le timeboxing consiste a allouer une duree maximale fixe a une activite. Il cree un rythme previsible et force a se concentrer sur l'essentiel ; tous les evenements Scrum sont timeboxes."
        }
      ]
    }
  ]
};
