window.COURSES = window.COURSES || {};
window.COURSES["testing"] = {
  "id": "testing",
  "title": "Tests & Qualité",
  "icon": "QA",
  "summary": "Un cours complet et progressif sur les tests logiciels et la qualité : pourquoi tester, les types de tests et la pyramide, le cycle de vie d'un bug, les cas de test et le cahier de recette, le TDD et l'automatisation, et enfin la certification ISTQB avec le vocabulaire du métier. Idéal pour préparer un poste de testeur ou recetteur logiciel.",
  "chapters": [
    {
      "id": "pourquoi-tester",
      "title": "1. Pourquoi tester ? Le coût des bugs et la qualité",
      "markdown": "# Pourquoi tester ?\n\n## La métaphore : le contrôle qualité d'une usine\n\nImagine une usine qui fabrique des voitures. Avant qu'une voiture sorte du garage, des contrôleurs vérifient les freins, les phares, la direction. Pourquoi ? Parce qu'une voiture livrée avec des freins défectueux peut provoquer un accident. Le **test logiciel**, c'est exactement ça : le contrôle qualité avant la livraison du produit.\n\nUn logiciel non testé, c'est comme une voiture sortie d'usine sans vérification : elle roulera peut-être, mais personne ne sait quand elle tombera en panne, ni à quel point ce sera grave.\n\n## La définition\n\n**Tester un logiciel**, c'est exécuter le programme (ou l'analyser) avec l'intention de **trouver des défauts** et de **vérifier qu'il répond aux besoins**. Le but n'est PAS de prouver que tout marche : c'est de trouver ce qui ne marche pas, avant que le client ne le trouve à votre place.\n\nDeux notions importantes :\n\n- **Vérification** : « Construit-on le produit correctement ? » (conforme aux spécifications)\n- **Validation** : « Construit-on le bon produit ? » (conforme au besoin réel de l'utilisateur)\n\n## Le coût des bugs : la règle qui change tout\n\nLe principe le plus connu du métier : **plus un bug est détecté tard, plus il coûte cher à corriger.**\n\nUn bug trouvé pendant l'écriture du code coûte quelques minutes. Le même bug trouvé en production peut coûter des milliers d'euros : intervention en urgence, données corrompues, clients mécontents, image de marque dégradée.\n\nOn parle souvent d'une progression en facteur 10 à chaque étape :\n\n| Phase de détection | Coût relatif |\n|---|---|\n| Conception / spécification | 1x |\n| Développement | 10x |\n| Recette / tests | 100x |\n| Production (chez le client) | 1000x |\n\nCes chiffres sont des ordres de grandeur, pas une loi exacte, mais l'idée est juste : **tester tôt fait économiser énormément d'argent.** C'est le principe du *shift left* (« décaler vers la gauche » = tester le plus tôt possible dans le projet).\n\n## Des bugs célèbres qui ont coûté cher\n\n- **Ariane 5 (1996)** : une erreur de conversion de nombre (64 bits vers 16 bits) fait exploser la fusée 37 secondes après le décollage. Coût : ~370 millions de dollars.\n- **Mars Climate Orbiter (1999)** : une équipe travaille en unités impériales, l'autre en unités métriques. La sonde se désintègre dans l'atmosphère de Mars. ~125 millions de dollars perdus.\n- **Therac-25 (années 1980)** : une machine de radiothérapie délivre des surdoses mortelles à cause d'un bug logiciel. Plusieurs patients sont décédés.\n\nLeçon : un bug n'est pas qu'un détail technique. Il peut détruire de l'argent, une réputation, voire des vies.\n\n## Qu'est-ce que la qualité logicielle ?\n\nLa qualité, ce n'est pas seulement « zéro bug ». La norme **ISO 25010** définit plusieurs caractéristiques d'un logiciel de qualité :\n\n- **Fonctionnalité** : fait ce qu'on attend de lui\n- **Fiabilité** : ne plante pas, supporte les erreurs\n- **Performance** : rapide, économe en ressources\n- **Utilisabilité** : facile à utiliser\n- **Sécurité** : protège les données\n- **Maintenabilité** : facile à faire évoluer et corriger\n- **Portabilité** : fonctionne dans différents environnements\n\nUn testeur ne traque pas seulement les plantages : il vérifie aussi la lenteur, la sécurité, l'ergonomie.\n\n## Le principe des 7 principes du test (ISTQB)\n\nLe référentiel ISTQB (qu'on verra au dernier chapitre) énonce 7 principes fondamentaux. Deux à retenir dès maintenant :\n\n1. **Le test montre la présence de défauts, pas leur absence.** On ne peut jamais prouver qu'un logiciel est parfait : on peut seulement trouver des bugs ou ne pas en trouver (ce qui ne veut pas dire qu'il n'y en a pas).\n2. **Les tests exhaustifs sont impossibles.** On ne peut pas tester toutes les combinaisons possibles. Il faut donc **prioriser** : tester ce qui est le plus risqué et le plus utilisé.\n\n## Exercice : réfléchis\n\nUn site e-commerce livre une nouvelle fonctionnalité de paiement sans la tester. Un bug fait que 1 commande sur 50 débite le client deux fois.\n\n1. À quelle phase ce bug aurait-il coûté le moins cher à corriger ?\n2. Cite trois conséquences au-delà du simple coût technique.\n3. Quelle caractéristique de qualité (ISO 25010) est en cause ?\n\n*Réponses : 1) En développement ou en recette, avant la mise en production. 2) Remboursements, perte de confiance des clients, litiges/réputation, support client surchargé. 3) La fiabilité (et la fonctionnalité : le paiement ne fait pas ce qu'on attend).*\n\n## Explique-le simplement (technique Feynman)\n\nSi tu devais expliquer à un ami non technicien pourquoi on teste les logiciels, tu pourrais dire : « C'est comme relire une dictée avant de la rendre. Si tu corriges tes fautes toi-même, ça ne coûte rien. Si le prof les trouve, tu perds des points. Si elles sont imprimées dans un livre, c'est la catastrophe. Plus on attend, plus une erreur coûte cher. »",
      "playground": null,
      "quiz": [
        {
          "question": "Quel est le but principal d'un test logiciel ?",
          "options": [
            "Prouver que le logiciel est parfait et sans défaut",
            "Trouver des défauts et vérifier que le logiciel répond aux besoins",
            "Faire plaisir au chef de projet",
            "Augmenter le nombre de lignes de code"
          ],
          "correctIndex": 1,
          "explanation": "Tester sert à trouver des défauts et à vérifier la conformité au besoin. Un test ne peut jamais prouver l'absence totale de bugs, seulement révéler leur présence."
        },
        {
          "question": "Selon le principe du coût des bugs, quand un bug coûte-t-il le plus cher à corriger ?",
          "options": [
            "Pendant la conception",
            "Pendant le développement",
            "Pendant la recette",
            "En production, chez le client"
          ],
          "correctIndex": 3,
          "explanation": "Plus un bug est détecté tard, plus il coûte cher. En production, il faut une intervention d'urgence, parfois réparer des données corrompues et gérer des clients mécontents."
        },
        {
          "question": "Que signifie le principe ISTQB « le test montre la présence de défauts, pas leur absence » ?",
          "options": [
            "Si les tests passent, le logiciel est garanti sans bug",
            "Les tests ne servent à rien",
            "Trouver zéro bug ne prouve pas qu'il n'y en a aucun",
            "Il faut tester toutes les combinaisons possibles"
          ],
          "correctIndex": 2,
          "explanation": "Des tests réussis ne garantissent pas l'absence de défauts : ils montrent seulement qu'on n'en a pas trouvé dans les cas testés. Les tests exhaustifs étant impossibles, on ne peut jamais tout couvrir."
        }
      ]
    },
    {
      "id": "types-de-tests",
      "title": "2. Les types de tests et la pyramide",
      "markdown": "# Les types de tests et la pyramide\n\n## La métaphore : construire une maison\n\nQuand on construit une maison, on vérifie à plusieurs niveaux :\n\n- chaque **brique** est-elle solide ? (test unitaire)\n- les briques tiennent-elles bien **ensemble** dans un mur ? (test d'intégration)\n- la maison **entière** est-elle habitable : portes, électricité, eau ? (test fonctionnel / système)\n- le **client** est-il satisfait quand il visite ? (test de recette / acceptation)\n\nChaque niveau teste quelque chose de différent. Aucun ne remplace l'autre.\n\n## Les niveaux de test\n\n### Test unitaire (TU)\n\nOn teste **la plus petite unité de code** isolément : une fonction, une méthode. Exemple : la fonction `additionner(2, 3)` renvoie-t-elle bien `5` ?\n\n- Écrits par les **développeurs**.\n- Très **rapides** (millisecondes), automatisés.\n- Outils : JUnit (Java), NUnit/xUnit (.NET), Jest (JavaScript), pytest (Python).\n\n### Test d'intégration\n\nOn vérifie que **plusieurs composants fonctionnent ensemble** : le code parle-t-il correctement à la base de données ? Le service A appelle-t-il bien le service B ?\n\n- Plus lent qu'un test unitaire car il mobilise plusieurs briques.\n- Détecte les problèmes d'interface entre modules.\n\n### Test système / fonctionnel\n\nOn teste **l'application complète**, du point de vue de ce qu'elle doit faire (les fonctionnalités). Exemple : « un utilisateur peut créer un compte, se connecter, passer une commande ».\n\n- On se base sur les **spécifications fonctionnelles**.\n- Souvent réalisé par une **équipe de test/QA** dédiée.\n\n### Test de recette / acceptation\n\nC'est le test fait (ou validé) par le **client ou la maîtrise d'ouvrage (MOA)** pour dire « OK, ça correspond à ce que j'ai demandé, je l'accepte ». On parle aussi de **UAT** (User Acceptance Testing).\n\n- Valide le **besoin métier**, pas seulement la technique.\n- C'est l'étape clé d'un poste de **recetteur** : on déroule un cahier de recette et on prononce un avis (accepté / refusé).\n\n## Les types de tests transverses\n\nEn plus des niveaux, il existe des tests selon **ce qu'on cherche** :\n\n- **Test de non-régression** : après une modification ou une correction, on revérifie que **ce qui marchait avant marche toujours**. On évite ainsi de « casser » l'existant. C'est souvent le gros du travail d'un testeur, et c'est très automatisable.\n- **Test de performance** : le logiciel est-il assez rapide ? On y trouve :\n  - **test de charge** : comportement sous une charge normale/attendue,\n  - **test de stress** : on pousse au-delà des limites pour voir quand ça casse,\n  - **test d'endurance** : tient-il dans la durée (fuites mémoire) ?\n  - Outils : JMeter, k6, Gatling.\n- **Test de sécurité** : résiste-t-il aux attaques (injection SQL, etc.) ?\n- **Test d'utilisabilité** : est-il agréable et clair à utiliser ?\n- **Test d'accessibilité** : utilisable par des personnes en situation de handicap ?\n\n## Boîte noire vs boîte blanche\n\n- **Boîte noire** : on teste sans connaître le code interne, en se basant sur les entrées/sorties attendues. C'est l'approche du testeur fonctionnel et du recetteur.\n- **Boîte blanche** : on teste en connaissant le code, pour couvrir les chemins internes (conditions, boucles). C'est plutôt l'approche du développeur.\n\n## La pyramide des tests\n\nLa **pyramide des tests** (popularisée par Mike Cohn) donne la bonne proportion de chaque type :\n\n```\n          /\\\\\n         /  \\\\      TESTS UI / E2E  (peu nombreux)\n        /----\\\\\n       /      \\\\    TESTS D'INTEGRATION (quantite moyenne)\n      /--------\\\\\n     /          \\\\  TESTS UNITAIRES (tres nombreux)\n    /____________\\\\\n```\n\n- **Beaucoup de tests unitaires** en bas : rapides, peu coûteux, faciles à maintenir.\n- **Moins de tests d'intégration** au milieu.\n- **Très peu de tests E2E (end-to-end / UI)** en haut : ils simulent un vrai utilisateur dans un navigateur, mais ils sont **lents, fragiles et coûteux** à maintenir.\n\n### L'anti-pattern : le cornet de glace\n\nQuand on inverse la pyramide (beaucoup de tests UI lents, peu de tests unitaires), on obtient le **« cornet de glace »** (*ice cream cone*) : des suites de tests lentes, instables et chères. À éviter.\n\n## Exercice : classe ces situations\n\nPour chaque cas, dis de quel type/niveau de test il s'agit :\n\n1. Vérifier que la fonction `calculerTVA(100)` renvoie `20`.\n2. Le client déroule les scénarios pour valider la livraison avant de signer.\n3. Après avoir corrigé le panier, on revérifie que la connexion fonctionne toujours.\n4. On simule 5 000 utilisateurs simultanés pour voir si le site tient.\n5. On vérifie que le module de commande communique bien avec la base de données.\n\n*Réponses : 1) Test unitaire. 2) Test de recette / acceptation (UAT). 3) Test de non-régression. 4) Test de performance (charge/stress). 5) Test d'intégration.*\n\n## Explique-le simplement (Feynman)\n\n« Les tests unitaires vérifient chaque brique, l'intégration vérifie que les briques tiennent ensemble, le fonctionnel vérifie que la maison entière marche, et la recette c'est le client qui visite et dit « c'est bon, j'achète ». On met beaucoup de petits tests rapides en bas et très peu de gros tests lents en haut : c'est la pyramide. »",
      "playground": null,
      "quiz": [
        {
          "question": "Qu'est-ce qu'un test de non-régression ?",
          "options": [
            "Un test qui vérifie une nouvelle fonctionnalité",
            "Un test qui vérifie que ce qui marchait avant marche toujours après une modification",
            "Un test de la vitesse du logiciel",
            "Un test fait uniquement par le client"
          ],
          "correctIndex": 1,
          "explanation": "Le test de non-régression revérifie l'existant après un changement, pour s'assurer qu'on n'a rien cassé. Il est souvent automatisé car il est répété fréquemment."
        },
        {
          "question": "Dans la pyramide des tests, quels tests doivent être les plus nombreux ?",
          "options": [
            "Les tests end-to-end (UI)",
            "Les tests de performance",
            "Les tests unitaires",
            "Les tests de recette manuels"
          ],
          "correctIndex": 2,
          "explanation": "La base de la pyramide est constituée de nombreux tests unitaires : rapides, peu coûteux et stables. Au sommet, peu de tests UI, car ils sont lents et fragiles."
        },
        {
          "question": "Le test de recette (acceptation) est typiquement réalisé ou validé par :",
          "options": [
            "Le développeur qui a écrit le code",
            "Le compilateur automatiquement",
            "Le client ou la maîtrise d'ouvrage (MOA)",
            "Personne, il est facultatif"
          ],
          "correctIndex": 2,
          "explanation": "La recette valide que le logiciel répond au besoin métier. C'est le client / la MOA qui prononce l'acceptation, souvent en déroulant un cahier de recette."
        }
      ]
    },
    {
      "id": "cycle-de-vie-bug",
      "title": "3. Le cycle de vie d'une anomalie (bug)",
      "markdown": "# Le cycle de vie d'une anomalie (bug)\n\n## La métaphore : le dossier médical d'un patient\n\nQuand un patient arrive à l'hôpital, on ouvre un **dossier** : symptômes, diagnostic, gravité, traitement, guérison vérifiée. Un bug suit exactement le même parcours. On ouvre un **ticket** (le dossier du bug) et on le suit jusqu'à sa « guérison » confirmée.\n\n## Définition : anomalie, défaut, erreur, panne\n\nLe vocabulaire précis du métier (ISTQB) :\n\n- **Erreur (error/mistake)** : l'action humaine qui se trompe (le développeur écrit `+` au lieu de `-`).\n- **Défaut / anomalie (defect/bug)** : la trace de cette erreur dans le code.\n- **Défaillance / panne (failure)** : ce qu'on observe quand le défaut se manifeste (l'application affiche un mauvais total).\n\nUne erreur crée un défaut, qui provoque une défaillance. Un testeur observe d'abord une **défaillance**, puis on cherche le **défaut** qui en est la cause.\n\n## Les étapes du cycle de vie\n\n### 1. Détection\n\nOn observe un comportement anormal pendant un test (ou un utilisateur le signale en production).\n\n### 2. Reproduction\n\nÉtape cruciale : on doit pouvoir **refaire apparaître le bug** de façon fiable. Un bug qu'on ne sait pas reproduire est très difficile à corriger. On note précisément :\n\n- les **étapes** pour le reproduire (1, 2, 3...),\n- les **données** utilisées,\n- l'**environnement** (navigateur, version, OS),\n- le **résultat attendu** vs le **résultat obtenu**.\n\n### 3. Qualification : criticité et priorité\n\nOn évalue deux choses distinctes :\n\n- **Gravité / sévérité (severity)** : l'impact technique du bug. Exemples d'échelle :\n  - **Bloquant** : impossible de continuer (l'appli plante au démarrage).\n  - **Majeur / critique** : une fonctionnalité importante est inutilisable.\n  - **Mineur** : gênant mais contournable.\n  - **Cosmétique** : faute d'orthographe, couleur, alignement.\n- **Priorité (priority)** : l'urgence de la correction d'un point de vue business.\n\nAttention : gravité et priorité sont **indépendantes**. Une faute d'orthographe (gravité faible) sur la page d'accueil vue par des millions de gens peut être de priorité haute. Un bug bloquant dans une fonction utilisée par 1 personne par an peut être de priorité basse.\n\n### 4. Affectation et correction\n\nLe bug est **assigné** à un développeur qui le corrige. Il passe par des statuts :\n\n```\nNouveau -> Affecté -> En cours -> Résolu/Corrigé -> A retester -> Fermé\n                                        |\n                                        v\n                                   Réouvert (si le re-test échoue)\n```\n\nD'autres statuts possibles : **Rejeté** (ce n'est pas un bug, c'est le comportement attendu), **Doublon** (déjà signalé), **Différé** (corrigé plus tard).\n\n### 5. Re-test (test de confirmation)\n\nLe testeur **revérifie** que le bug est bien corrigé, en suivant les mêmes étapes de reproduction.\n\n### 6. Test de non-régression\n\nOn vérifie aussi que la correction **n'a pas cassé autre chose**. Si tout est bon, le ticket passe à **Fermé**.\n\n## Anatomie d'un bon ticket de bug\n\nUn ticket utile contient :\n\n- **Titre** clair et court (« Le bouton Payer reste inactif après ajout au panier »)\n- **Environnement** (version, navigateur, OS, données de test)\n- **Étapes de reproduction** numérotées\n- **Résultat attendu**\n- **Résultat obtenu**\n- **Gravité** et **priorité**\n- **Pièces jointes** : capture d'écran, vidéo, logs\n\nUn mauvais ticket dit juste « ça marche pas ». Un bon ticket permet au développeur de reproduire et corriger sans poser de question.\n\n## Les outils de suivi (bug tracking)\n\nLes anomalies sont suivies dans des outils dédiés : **Jira**, **Azure DevOps**, **Redmine**, **Mantis**, **Bugzilla**, **GitHub/GitLab Issues**. Ils gèrent les statuts, l'historique, les affectations et les rapports.\n\n## Exercice : qualifie ces bugs\n\nPour chacun, propose une **gravité** et explique :\n\n1. L'application bancaire affiche un solde faux (trop élevé).\n2. Le logo est légèrement décalé de 2 pixels.\n3. Impossible de se connecter : personne ne peut utiliser l'appli.\n4. Un message d'erreur contient une faute d'orthographe.\n\n*Réponses : 1) Majeur/critique (données financières fausses, risque réel). 2) Cosmétique. 3) Bloquant (rien ne fonctionne). 4) Cosmétique en gravité — mais la priorité peut être haute si le message est très visible.*\n\n## Explique-le simplement (Feynman)\n\n« Un bug, c'est comme un patient : on le détecte (symptôme), on le diagnostique (reproduction + gravité), un médecin le soigne (le dev corrige), puis on revérifie qu'il est guéri (re-test) et qu'on n'a pas créé un autre problème (non-régression). Tant qu'on n'a pas vérifié la guérison, le dossier reste ouvert. »",
      "playground": null,
      "quiz": [
        {
          "question": "Quelle est la différence entre gravité (sévérité) et priorité d'un bug ?",
          "options": [
            "Ce sont deux mots pour la même chose",
            "La gravité mesure l'impact technique, la priorité mesure l'urgence business de la correction",
            "La priorité concerne le code, la gravité concerne le client",
            "La gravité est toujours plus importante que la priorité"
          ],
          "correctIndex": 1,
          "explanation": "La gravité décrit l'impact technique (bloquant, majeur, mineur, cosmétique), la priorité décrit l'urgence à corriger côté business. Elles sont indépendantes : un bug cosmétique très visible peut être prioritaire."
        },
        {
          "question": "Après qu'un développeur a corrigé un bug, que doit faire le testeur ?",
          "options": [
            "Fermer le ticket immédiatement sans vérifier",
            "Re-tester le bug (confirmation) puis vérifier la non-régression",
            "Supprimer le ticket",
            "Réécrire le code lui-même"
          ],
          "correctIndex": 1,
          "explanation": "On confirme que le bug est corrigé (re-test) puis on vérifie que la correction n'a rien cassé d'autre (non-régression). Seulement ensuite le ticket peut être fermé."
        },
        {
          "question": "Dans le vocabulaire ISTQB, qu'est-ce qu'une 'défaillance' (failure) ?",
          "options": [
            "L'action humaine erronée du développeur",
            "La ligne de code défectueuse",
            "Le comportement incorrect observé quand le défaut se manifeste",
            "Le ticket de suivi du bug"
          ],
          "correctIndex": 2,
          "explanation": "L'erreur (humaine) crée un défaut (dans le code), qui provoque une défaillance (le comportement incorrect observé). Le testeur observe d'abord la défaillance."
        }
      ]
    },
    {
      "id": "cas-de-test-cahier-recette",
      "title": "4. Cas de test et cahier de recette",
      "markdown": "# Cas de test et cahier de recette\n\n## La métaphore : la recette de cuisine\n\nUn **cas de test**, c'est comme une recette de cuisine très précise. On indique les ingrédients (les données), les étapes à suivre, et le plat attendu à la fin (le résultat attendu). Si le plat obtenu ressemble au plat attendu, c'est **OK**. Sinon, c'est **KO** (et on ouvre un bug).\n\nN'importe qui doit pouvoir suivre la recette et obtenir le même résultat : un cas de test doit être **reproductible** par quelqu'un d'autre que son auteur.\n\n## Définition : le cas de test\n\nUn **cas de test (test case)** décrit une situation précise à vérifier. Il contient au minimum :\n\n- un **identifiant** unique (ex. `TC-LOGIN-001`)\n- un **titre / objectif** (« Connexion avec identifiants valides »)\n- les **préconditions** (état de départ : « l'utilisateur existe en base »)\n- les **données de test** (login, mot de passe utilisés)\n- les **étapes** numérotées à exécuter\n- le **résultat attendu**\n- le **résultat obtenu** (rempli pendant l'exécution)\n- le **statut** : **OK (passé)** / **KO (échoué)** / **bloqué** / **non exécuté**\n\n## Exemple concret de cas de test\n\n| Champ | Valeur |\n|---|---|\n| ID | TC-LOGIN-001 |\n| Objectif | Connexion avec identifiants valides |\n| Préconditions | Le compte `alice@mail.com` existe et est actif |\n| Étapes | 1. Ouvrir la page de connexion. 2. Saisir `alice@mail.com`. 3. Saisir le mot de passe `Test1234`. 4. Cliquer sur « Se connecter ». |\n| Résultat attendu | L'utilisateur est redirigé vers son tableau de bord ; son nom s'affiche en haut à droite. |\n| Résultat obtenu | *(à remplir)* |\n| Statut | OK / KO |\n\n## Tester aussi les cas qui doivent échouer\n\nUn bon jeu de tests ne vérifie pas seulement que « tout va bien ». On distingue :\n\n- **Cas passants (positifs)** : l'utilisateur fait ce qu'il faut, ça doit marcher.\n- **Cas non passants (négatifs)** : l'utilisateur fait une erreur (mauvais mot de passe, champ vide), le logiciel doit réagir **proprement** (message d'erreur clair, pas de plantage).\n\nExemple : `TC-LOGIN-002 — Connexion avec mauvais mot de passe` → résultat attendu : « Message *Identifiants incorrects* affiché, pas de connexion ».\n\n## Techniques pour choisir les bonnes données\n\nComme on ne peut pas tout tester, on choisit intelligemment :\n\n- **Classes d'équivalence** : on regroupe les valeurs qui se comportent pareil. Pour un champ « âge accepté entre 18 et 99 », tester un seul nombre dans `[18-99]` suffit pour la classe valide.\n- **Valeurs limites (boundary)** : les bugs se cachent souvent aux frontières. On teste 17, 18, 19, 98, 99, 100. (« Juste avant, pile sur, juste après ».)\n- **Tables de décision** : pour combiner plusieurs conditions (ex. client VIP + montant > 100 € → livraison gratuite).\n\n## Le cahier de recette\n\nLe **cahier de recette** est le document qui rassemble **tous les cas de test** à dérouler pour valider une livraison. C'est l'outil central du **recetteur**.\n\nIl sert à :\n\n- organiser les scénarios par fonctionnalité,\n- enregistrer les résultats (OK/KO) lors de la **campagne de recette**,\n- calculer un **taux de réussite** (ex. 47/50 cas OK),\n- décider de **prononcer la recette** : acceptée, acceptée avec réserves, ou refusée.\n\n### Un PV de recette\n\nÀ la fin de la campagne, on rédige souvent un **procès-verbal (PV) de recette** : il liste les cas passés/échoués, les anomalies ouvertes avec leur gravité, et la décision finale (VA = Vérification d'Aptitude, VSR = Vérification de Service Régulier dans certains contextes).\n\n## La traçabilité\n\nChaque cas de test doit être **rattaché à une exigence** (un besoin du cahier des charges). On parle de **matrice de traçabilité** : elle relie « exigence ↔ cas de test ↔ résultat ». Elle garantit que **chaque besoin est bien couvert par au moins un test**, et qu'aucun test ne teste « dans le vide ».\n\n## Outils\n\nLes cas de test et campagnes se gèrent dans : **Xray** ou **Zephyr** (plugins Jira), **TestRail**, **Azure Test Plans**, **Squash TM** (open source, très répandu en France), ou plus simplement Excel pour les petits projets.\n\n## Exercice : écris un cas de test\n\nRédige un cas de test complet (ID, objectif, préconditions, données, étapes, résultat attendu) pour : « Ajouter un produit au panier ». Ajoute ensuite un cas **non passant** lié.\n\n*Piste de réponse : TC-CART-001, objectif « Ajouter un produit en stock au panier ». Précondition : produit P123 en stock. Étapes : aller sur la fiche P123, cliquer « Ajouter au panier ». Attendu : le panier affiche 1 article, le total est mis à jour. Cas non passant TC-CART-002 : ajouter un produit en rupture de stock → attendu : message « Produit indisponible », panier inchangé.*\n\n## Explique-le simplement (Feynman)\n\n« Un cas de test, c'est une recette : ingrédients (données), étapes, plat attendu. Si le plat obtenu correspond, c'est OK ; sinon KO et j'ouvre un bug. Le cahier de recette, c'est le livre de toutes les recettes à goûter avant de dire au client : « c'est prêt, vous pouvez accepter ». Et la traçabilité, c'est vérifier que chaque plat commandé au menu a bien sa recette. »",
      "playground": null,
      "quiz": [
        {
          "question": "Que doit obligatoirement contenir un bon cas de test ?",
          "options": [
            "Uniquement le résultat obtenu",
            "Des étapes, des données et un résultat attendu",
            "Le code source de la fonctionnalité",
            "Seulement le nom du testeur"
          ],
          "correctIndex": 1,
          "explanation": "Un cas de test décrit les étapes à suivre, les données à utiliser et le résultat attendu. On y compare ensuite le résultat obtenu pour conclure OK ou KO."
        },
        {
          "question": "Pourquoi teste-t-on aussi des cas 'non passants' (négatifs) ?",
          "options": [
            "Pour perdre du temps",
            "Pour vérifier que le logiciel réagit proprement aux erreurs de l'utilisateur",
            "Parce que c'est obligatoire légalement",
            "Pour augmenter le nombre de bugs"
          ],
          "correctIndex": 1,
          "explanation": "Les cas négatifs (mauvais mot de passe, champ vide, donnée invalide) vérifient que le logiciel gère bien les erreurs : message clair, pas de plantage. C'est essentiel pour la robustesse."
        },
        {
          "question": "À quoi sert la matrice de traçabilité ?",
          "options": [
            "À mesurer la vitesse du logiciel",
            "À relier chaque exigence à au moins un cas de test pour garantir la couverture du besoin",
            "À stocker les mots de passe de test",
            "À remplacer le cahier de recette"
          ],
          "correctIndex": 1,
          "explanation": "La traçabilité relie exigence ↔ cas de test ↔ résultat. Elle prouve que chaque besoin est couvert par un test et qu'aucun test n'est inutile."
        }
      ]
    },
    {
      "id": "tdd-automatisation",
      "title": "5. TDD et automatisation des tests",
      "markdown": "# TDD et automatisation des tests\n\n## La métaphore : poser le cadre du puzzle d'abord\n\nQuand tu fais un puzzle, beaucoup commencent par le **cadre** (les bords) avant de remplir l'intérieur. Le **TDD** fait pareil avec le code : on définit d'abord le « cadre » (le test qui décrit le résultat attendu), puis on remplit le code pour qu'il rentre dedans. On sait toujours où on va.\n\n## Définition : le TDD (Test Driven Development)\n\nLe **TDD** (développement piloté par les tests) consiste à **écrire le test AVANT le code**. Le cycle s'appelle **Rouge - Vert - Refactor** :\n\n1. **Rouge** : on écrit un test pour une fonctionnalité qui n'existe pas encore. Il **échoue** (rouge), c'est normal.\n2. **Vert** : on écrit le **minimum de code** pour que le test passe (vert).\n3. **Refactor** : on **améliore** le code (le nettoie, le simplifie) sans changer son comportement — le test garantit qu'on n'a rien cassé.\n\nPuis on recommence pour la fonctionnalité suivante. Petits pas, en boucle.\n\n```\n   +-----------+\n   |   ROUGE   |  écrire un test qui échoue\n   +-----------+\n         |\n         v\n   +-----------+\n   |   VERT    |  écrire le code minimal qui passe\n   +-----------+\n         |\n         v\n   +-----------+\n   | REFACTOR  |  nettoyer sans casser\n   +-----------+\n         |\n         +------> on recommence\n```\n\n## Pourquoi faire du TDD ?\n\n- On **réfléchit au besoin** avant de coder (le test EST la spécification).\n- On obtient automatiquement une **couverture de tests** élevée.\n- On a un **filet de sécurité** : on peut refactorer sans peur.\n- Ça **force un code testable**, donc mieux découpé.\n\nInconvénient : ça demande de la discipline et c'est déroutant au début.\n\n## L'anatomie d'un test automatisé : AAA\n\nUn test unitaire suit le schéma **AAA** :\n\n- **Arrange** : on prépare les données et le contexte.\n- **Act** : on exécute l'action à tester.\n- **Assert** : on **vérifie** que le résultat est celui attendu (l'**assertion**).\n\nUne **assertion**, c'est l'affirmation « je m'attends à ce que X soit égal à Y ». Si c'est faux, le test échoue. C'est le cœur de tout test automatisé. Regarde le playground ci-dessous : il montre une petite fonction de test maison avec des assertions, comme le ferait un vrai framework.\n\n## L'automatisation des tests\n\n**Automatiser**, c'est faire exécuter les tests par la machine plutôt qu'à la main. Avantages : rapide, répétable, sans erreur d'inattention, exécutable des milliers de fois.\n\n### Quoi automatiser en priorité ?\n\n- Les **tests unitaires** : presque toujours automatisés.\n- Les **tests de non-régression** : répétés à chaque livraison, gros gain de temps.\n- Les parcours critiques **end-to-end** : automatisés mais avec parcimonie (rappel de la pyramide).\n\n### Quoi laisser en manuel ?\n\n- Les **tests exploratoires** (on explore librement l'appli pour trouver l'inattendu).\n- L'**utilisabilité**, le ressenti visuel, les cas rares et complexes à scripter.\n\n## Les frameworks et outils\n\n- **Tests unitaires** : JUnit (Java), xUnit/NUnit/MSTest (.NET), Jest/Vitest (JS), pytest (Python).\n- **Tests E2E / navigateur** : Selenium, Cypress, Playwright.\n- **API** : Postman, REST Assured.\n- **Performance** : JMeter, k6, Gatling.\n\n## L'intégration continue (CI/CD)\n\nLes tests automatisés prennent toute leur valeur dans une chaîne d'**intégration continue (CI)** : à chaque modification de code (push), un serveur (**GitHub Actions, GitLab CI, Jenkins, Azure Pipelines**) **lance automatiquement tous les tests**. Si un test échoue, l'équipe est prévenue immédiatement et le code n'est pas livré. C'est le *shift left* en action : on attrape les bugs en quelques minutes.\n\n## Couverture de code (coverage)\n\nLa **couverture de code** mesure le pourcentage de lignes/branches du code exécutées par les tests. Utile pour repérer le code non testé, MAIS : **100 % de couverture ne garantit pas l'absence de bugs** (on peut exécuter une ligne sans vraiment vérifier son résultat). C'est un indicateur, pas un objectif absolu.\n\n## Exercice : applique le TDD\n\nTu dois créer une fonction `estPair(n)`. Décris :\n\n1. Le test que tu écris en premier (phase rouge).\n2. Le code minimal pour le faire passer (phase verte).\n3. Une amélioration possible (refactor).\n\n*Réponse : 1) `assert(estPair(4) === true)` et `assert(estPair(3) === false)` — échoue car la fonction n'existe pas. 2) `function estPair(n){ return n % 2 === 0; }`. 3) Refactor : ajouter la gestion des nombres négatifs ou un test sur 0, renommer, documenter — les tests existants garantissent qu'on ne casse rien.*\n\n## Explique-le simplement (Feynman)\n\n« Le TDD, c'est écrire d'abord la question d'un contrôle (le test), puis la réponse (le code) pour avoir 20/20. Rouge : la question sans réponse. Vert : la réponse juste minimale. Refactor : on rend la copie propre. Et l'automatisation, c'est demander à un robot de repasser tout le contrôle à chaque changement, en quelques secondes. »",
      "playground": {
        "language": "javascript",
        "code": "// Mini-framework de test maison pour comprendre les assertions (AAA)\nfunction assertEqual(actual, expected, message) {\n  if (actual === expected) {\n    console.log('OK   : ' + message);\n  } else {\n    console.log('KO   : ' + message + ' (attendu ' + expected + ', obtenu ' + actual + ')');\n  }\n}\n\n// La fonction qu'on veut tester\nfunction estPair(n) {\n  return n % 2 === 0;\n}\n\n// --- Cas passants (positifs) ---\nassertEqual(estPair(4), true,  'estPair(4) doit etre true');\nassertEqual(estPair(0), true,  'estPair(0) doit etre true');\n\n// --- Cas non passants (negatifs) ---\nassertEqual(estPair(3), false, 'estPair(3) doit etre false');\nassertEqual(estPair(-2), true, 'estPair(-2) doit etre true (valeur limite negative)');\n\n// Exemple d'un test qui ECHOUE volontairement pour voir un KO :\nassertEqual(estPair(5), true, 'estPair(5) : test volontairement faux');"
      },
      "quiz": [
        {
          "question": "Quel est l'ordre correct du cycle TDD ?",
          "options": [
            "Écrire le code, puis le test, puis refactorer",
            "Rouge (test qui échoue) → Vert (code minimal qui passe) → Refactor",
            "Refactor → Vert → Rouge",
            "On écrit seulement le test, jamais le code"
          ],
          "correctIndex": 1,
          "explanation": "Le TDD suit Rouge-Vert-Refactor : on écrit d'abord un test qui échoue, puis le minimum de code pour le faire passer, puis on nettoie le code en gardant les tests verts."
        },
        {
          "question": "Dans un test unitaire au format AAA, que fait la partie 'Assert' ?",
          "options": [
            "Elle prépare les données de test",
            "Elle exécute l'action à tester",
            "Elle vérifie que le résultat correspond au résultat attendu",
            "Elle supprime les données après le test"
          ],
          "correctIndex": 2,
          "explanation": "Assert contient l'assertion : l'affirmation que le résultat obtenu est égal au résultat attendu. Si c'est faux, le test échoue. Arrange prépare, Act agit, Assert vérifie."
        },
        {
          "question": "Que peut-on dire d'une couverture de code de 100 % ?",
          "options": [
            "Le logiciel est garanti sans aucun bug",
            "Toutes les exigences métier sont validées",
            "Toutes les lignes sont exécutées par les tests, mais cela ne garantit pas l'absence de bugs",
            "Les tests sont inutiles"
          ],
          "correctIndex": 2,
          "explanation": "La couverture indique quelles lignes sont exécutées par les tests, mais on peut exécuter une ligne sans vraiment vérifier son comportement. C'est un indicateur utile, pas une preuve d'absence de défauts."
        }
      ]
    },
    {
      "id": "istqb-vocabulaire",
      "title": "6. ISTQB et vocabulaire du métier",
      "markdown": "# ISTQB et vocabulaire du métier\n\n## La métaphore : le permis de conduire du testeur\n\nPour conduire, on passe un permis qui prouve qu'on connaît le code de la route et un vocabulaire commun. L'**ISTQB**, c'est le « permis » reconnu mondialement du testeur logiciel : il atteste qu'on maîtrise les fondamentaux et le **vocabulaire partagé** du métier. Sur beaucoup d'offres de testeur/recetteur, il est un vrai plus.\n\n## Qu'est-ce que l'ISTQB ?\n\n**ISTQB** = *International Software Testing Qualifications Board*. C'est un organisme international qui délivre des **certifications** standardisées en test logiciel.\n\nLa certification d'entrée s'appelle **ISTQB Foundation Level (CTFL)** :\n\n- C'est le **niveau débutant**, idéal pour un poste de testeur/recetteur junior.\n- Examen : **QCM** (généralement ~40 questions, environ 1 h, seuil de réussite souvent autour de 65 %).\n- Pas de prérequis obligatoire.\n- Ensuite, des niveaux avancés existent (Advanced : Test Analyst, Test Manager, Technical Test Analyst) et des spécialités (Agile Tester, Automation, Performance, Security...).\n\n## Les 7 principes fondamentaux du test (ISTQB)\n\nUn classique de l'examen, à connaître par cœur :\n\n1. **Les tests montrent la présence de défauts**, pas leur absence.\n2. **Les tests exhaustifs sont impossibles** : il faut prioriser par le risque.\n3. **Tester tôt** fait gagner du temps et de l'argent (*shift left*).\n4. **Regroupement des défauts** : une petite partie des modules concentre la majorité des bugs (loi de Pareto, ~80/20).\n5. **Paradoxe du pesticide** : répéter toujours les mêmes tests finit par ne plus rien trouver ; il faut **faire évoluer les tests**.\n6. **Les tests dépendent du contexte** : on ne teste pas un jeu mobile comme un logiciel médical.\n7. **L'illusion de l'absence d'erreurs** : un logiciel sans bug mais qui ne répond pas au besoin reste inutile.\n\n## Le glossaire indispensable\n\nVoici le vocabulaire qu'un recruteur peut attendre :\n\n- **Recette** : phase de validation où l'on vérifie que le logiciel répond au besoin métier avant de l'accepter. La personne qui la mène est le **recetteur**.\n- **Qualification** : action de vérifier qu'un produit satisfait aux exigences spécifiées (proche de la recette ; on \"qualifie\" une version, un environnement).\n- **VA / VSR** : **Vérification d'Aptitude** (le logiciel est apte à être mis en service) puis **Vérification de Service Régulier** (il fonctionne bien dans la durée en conditions réelles). Vocabulaire fréquent dans les marchés et les ESN françaises.\n- **MOA / MOE** : **Maîtrise d'Ouvrage** (le client, qui exprime le besoin) et **Maîtrise d'Œuvre** (le prestataire, qui réalise). La recette est souvent prononcée par la MOA.\n- **Plan de tests (test plan)** : document qui définit la **stratégie** : quoi tester, comment, avec quels moyens, dans quels délais, quels critères d'entrée/sortie, quels risques.\n- **Stratégie de test** : approche globale (niveaux, types, automatisation, environnements).\n- **Campagne de test** : exécution organisée d'un ensemble de cas de test sur une version donnée.\n- **Cas de test / scénario de test** : voir chapitre 4.\n- **Jeu de données (jeu d'essai)** : les données préparées pour exécuter les tests.\n- **Exigence** : un besoin précis et vérifiable du cahier des charges.\n- **Traçabilité** : lien entre exigences, cas de test et résultats (voir chapitre 4).\n- **Critères d'entrée / de sortie** : conditions pour démarrer ou terminer une phase de test (ex. « la recette démarre quand 100 % des tests d'intégration sont passés »).\n- **Environnement de test** : l'infrastructure (serveur, base, données) où l'on teste, distincte de la production (souvent : DEV, RECETTE/UAT, PREPROD, PROD).\n- **Smoke test** : test rapide et superficiel pour vérifier que la version « démarre » et que les fonctions vitales marchent, avant de tester en profondeur.\n- **Sanity test** : vérification rapide et ciblée après une petite correction.\n- **Bug / anomalie / défaut** : voir chapitre 3.\n- **Régression** : un bug réapparu ou introduit par une modification.\n\n## Le testeur dans les méthodes Agile\n\nAujourd'hui beaucoup d'équipes travaillent en **Agile / Scrum**. Le testeur y est intégré dans l'équipe (et non en bout de chaîne). On y trouve :\n\n- les **critères d'acceptation** d'une *user story* (« Étant donné... Quand... Alors... » = format **Gherkin / BDD**),\n- le **BDD (Behavior Driven Development)** : on décrit le comportement attendu en langage quasi naturel (outils Cucumber, SpecFlow), proche du métier,\n- la **DoD (Definition of Done)** : une story n'est « terminée » que si elle est testée.\n\n## Le rôle au quotidien d'un testeur / recetteur\n\nConcrètement, on attend de toi :\n\n- comprendre les **exigences** et les spécifications,\n- **rédiger** des cas de test et un cahier de recette,\n- **exécuter** les campagnes (manuelles et/ou automatisées),\n- **détecter, qualifier et suivre** les anomalies dans Jira/Azure DevOps,\n- **communiquer** clairement avec les développeurs et la MOA,\n- produire des **rapports** (taux de réussite, anomalies ouvertes, avis de recette).\n\nLes qualités appréciées : rigueur, sens du détail, esprit critique (« et si l'utilisateur faisait l'inverse ? »), bonne communication.\n\n## Exercice : relie le terme à sa définition\n\n1. Recette — 2. Plan de tests — 3. Smoke test — 4. MOA — 5. Traçabilité\n\nA. Le client qui exprime le besoin. B. Test rapide vérifiant que la version démarre. C. Lien entre exigences et cas de test. D. Validation du besoin métier avant acceptation. E. Document définissant la stratégie de test.\n\n*Réponses : 1-D, 2-E, 3-B, 4-A, 5-C.*\n\n## Explique-le simplement (Feynman)\n\n« L'ISTQB, c'est le permis de conduire du testeur : il prouve que je connais les règles et le vocabulaire. La recette, c'est le moment où le client essaie le produit et dit « OK, je l'accepte ». Le plan de tests, c'est mon itinéraire : quoi tester, comment, quand. Et la traçabilité, c'est ma garantie que je n'ai oublié aucun besoin en route. »",
      "playground": null,
      "quiz": [
        {
          "question": "Que valide la certification ISTQB Foundation Level (CTFL) ?",
          "options": [
            "La maîtrise d'un langage de programmation",
            "Les fondamentaux et le vocabulaire commun du test logiciel",
            "La capacité à gérer une équipe de 50 personnes",
            "Le droit légal de tester des logiciels"
          ],
          "correctIndex": 1,
          "explanation": "L'ISTQB Foundation est la certification d'entrée : elle atteste la maîtrise des concepts fondamentaux et du vocabulaire partagé du test. C'est un atout reconnu pour un poste de testeur/recetteur junior."
        },
        {
          "question": "Que signifie le 'paradoxe du pesticide' parmi les principes ISTQB ?",
          "options": [
            "Les tests automatisés sont toxiques pour le code",
            "Répéter toujours les mêmes tests finit par ne plus trouver de nouveaux bugs ; il faut faire évoluer les tests",
            "Il faut tester moins pour trouver plus de bugs",
            "Les bugs se reproduisent comme des insectes"
          ],
          "correctIndex": 1,
          "explanation": "Comme un pesticide qui n'agit plus sur les insectes devenus résistants, des tests inchangés cessent de révéler de nouveaux défauts. Il faut régulièrement réviser et enrichir les cas de test."
        },
        {
          "question": "Dans le vocabulaire français du test, qui prononce généralement la recette ?",
          "options": [
            "Le développeur (MOE)",
            "La maîtrise d'ouvrage (MOA), c'est-à-dire le client",
            "Le serveur d'intégration continue",
            "Le testeur unitaire"
          ],
          "correctIndex": 1,
          "explanation": "La recette valide le besoin métier ; c'est donc la MOA (maîtrise d'ouvrage, le client qui a exprimé le besoin) qui prononce l'acceptation, en s'appuyant sur le cahier de recette."
        }
      ]
    }
  ]
};
