window.COURSES = window.COURSES || {};
window.COURSES["fundamentals"] = {
  "id": "fundamentals",
  "title": "Fondamentaux",
  "icon": "★",
  "summary": "Les bases transversales que tout développeur web doit maîtriser avant tout : client-serveur, HTTP, API REST/JSON, architecture en couches, POO/SOLID et algorithmique.",
  "chapters": [
    {
      "id": "client-serveur",
      "title": "Le modèle client-serveur",
      "markdown": "## Métaphore\n\nImagine un **restaurant**. Toi, assis à table, tu es le **client**. Tu ne vas pas en cuisine : tu passes commande à un serveur, qui transmet en cuisine, puis te rapporte ton plat. La **cuisine** (le **serveur** informatique) garde les ingrédients, les recettes et les fourneaux. Toi, tu reçois juste le résultat dans ton assiette.\n\nLe web fonctionne exactement comme ça.\n\n## Définition\n\nLe **modèle client-serveur** est une organisation où deux programmes dialoguent :\n\n- Le **client** : le programme qui **demande**. Sur le web, c'est le plus souvent le **navigateur** (Chrome, Firefox, Edge...). Il affiche les pages et envoie des demandes.\n- Le **serveur** : le programme qui **répond**. C'est une machine (souvent dans un datacenter) qui reçoit les demandes, exécute du code, consulte une base de données, et renvoie un résultat.\n\nLe dialogue suit toujours le même cycle :\n\n```\nCLIENT  ---- requête (request) ---->  SERVEUR\nCLIENT  <--- réponse (response) ----  SERVEUR\n```\n\n1. Tu tapes `https://exemple.fr` dans le navigateur.\n2. Le navigateur envoie une **requête** au serveur d'exemple.fr.\n3. Le serveur traite la demande (lit des fichiers, interroge une base de données...).\n4. Le serveur renvoie une **réponse** (le code HTML, une image, des données...).\n5. Le navigateur affiche le résultat.\n\n## Notions clés\n\n- **Adresse / URL** : l'adresse postale du serveur (`https://api.exemple.fr/clients`). Le **DNS** traduit le nom de domaine (`exemple.fr`) en adresse IP (les chiffres réels de la machine, comme `93.184.216.34`).\n- **Frontend** : la partie qui tourne côté client (le navigateur) — HTML, CSS, JavaScript.\n- **Backend** : la partie qui tourne côté serveur — .NET, Spring Boot, Node, etc.\n- **Sans état (stateless)** : par défaut, le serveur ne se « souvient » pas de toi entre deux requêtes. Chaque requête doit transporter ce qu'il faut pour être comprise (c'est là qu'interviennent cookies, tokens, sessions).\n\n## Pourquoi c'est important\n\nSéparer client et serveur permet :\n\n- de **protéger** les données sensibles (elles restent en cuisine, pas dans l'assiette du client) ;\n- de servir **plein de clients** avec un seul serveur ;\n- de faire évoluer le frontend et le backend **indépendamment**.\n\n## Auto-explication (Feynman)\n\nReformule à voix haute : « Le navigateur **demande**, le serveur **répond**. Tout part du client, rien ne s'affiche sans une requête puis une réponse. » Si tu sais réexpliquer la métaphore du restaurant à quelqu'un, c'est gagné.",
      "playground": null,
      "quiz": [
        {
          "question": "Dans le modèle client-serveur du web, qui est généralement le client ?",
          "options": [
            "La base de données",
            "Le navigateur web",
            "Le datacenter",
            "Le câble réseau"
          ],
          "correctIndex": 1,
          "explanation": "Sur le web, le client est le plus souvent le navigateur : c'est lui qui envoie les requêtes et affiche les réponses."
        },
        {
          "question": "Quel est l'ordre correct du cycle de communication ?",
          "options": [
            "Réponse du serveur, puis requête du client",
            "Requête du client, puis réponse du serveur",
            "Le serveur envoie tout seul sans demande",
            "Le client et le serveur n'échangent jamais"
          ],
          "correctIndex": 1,
          "explanation": "Le cycle est toujours : le client envoie une requête, puis le serveur renvoie une réponse."
        },
        {
          "question": "Que signifie que le serveur web est « stateless » par défaut ?",
          "options": [
            "Il ne fonctionne jamais",
            "Il ne mémorise pas le client entre deux requêtes",
            "Il n'a pas d'adresse IP",
            "Il ne peut servir qu'un seul client"
          ],
          "correctIndex": 1,
          "explanation": "Stateless signifie sans état : par défaut le serveur ne retient rien d'une requête à l'autre, d'où l'usage de tokens, cookies ou sessions."
        }
      ]
    },
    {
      "id": "http",
      "title": "Le protocole HTTP",
      "markdown": "## Métaphore\n\nHTTP, c'est la **langue polie** que parlent le client et le serveur. Comme dans une lettre bien rédigée, il y a une **formule de demande** (« Pourriez-vous m'envoyer la fiche du client n°42 ? ½), un **objet** (l'adresse), des **mentions en tête** (expéditeur, langue souhaitée) et un **corps** (le contenu). La réponse arrive avec un **code** qui dit tout de suite si ça s'est bien passé.\n\n## Définition\n\n**HTTP** (HyperText Transfer Protocol) est le protocole qui définit **comment** un client et un serveur échangent des messages sur le web. **HTTPS** est sa version chiffrée (le **S** = Secure, via TLS) : indispensable en production.\n\nUn message HTTP a toujours la même structure :\n\n```\n[ Ligne de départ : méthode + chemin ]   ex: GET /clients/42\n[ Headers (en-têtes) ]                    ex: Content-Type: application/json\n[ Ligne vide ]\n[ Body (corps, optionnel) ]               ex: { \\\"nom\\\": \\\"Dupont\\\" }\n```\n\n## Les méthodes HTTP (les verbes)\n\nLa méthode dit **quelle action** on veut faire :\n\n- **GET** : **lire** une ressource. Ne modifie rien. Ex : afficher la liste des clients.\n- **POST** : **créer** une nouvelle ressource. Ex : ajouter un client.\n- **PUT** : **remplacer / mettre à jour** une ressource existante. Ex : modifier toute la fiche du client 42.\n- **PATCH** : mettre à jour **partiellement** (un seul champ).\n- **DELETE** : **supprimer** une ressource. Ex : effacer le client 42.\n\n> Astuce : on parle de méthodes **idempotentes** quand les rejouer ne change pas le résultat final (GET, PUT, DELETE le sont ; POST ne l'est pas, car deux POST créent deux ressources).\n\n## Les codes de statut\n\nLa réponse commence par un **code à 3 chiffres**. Le premier chiffre donne la catégorie :\n\n- **2xx — Succès** : tout va bien.\n  - `200 OK` : requête réussie.\n  - `201 Created` : ressource créée (typique après un POST).\n  - `204 No Content` : réussi, mais rien à renvoyer (typique après un DELETE).\n- **3xx — Redirection** : la ressource est ailleurs.\n  - `301 Moved Permanently`, `302 Found`.\n- **4xx — Erreur côté client** : c'est **toi** qui as mal demandé.\n  - `400 Bad Request` : requête mal formée.\n  - `401 Unauthorized` : pas authentifié.\n  - `403 Forbidden` : authentifié mais pas le droit.\n  - `404 Not Found` : ressource introuvable.\n- **5xx — Erreur côté serveur** : c'est le **serveur** qui a planté.\n  - `500 Internal Server Error` : bug serveur.\n  - `503 Service Unavailable` : serveur surchargé ou en maintenance.\n\n> Mémo : **4 = ta** faute (client), **5 = sa** faute (serveur).\n\n## Les headers (en-têtes)\n\nLes headers transportent des **métadonnées** sur la requête ou la réponse :\n\n- `Content-Type: application/json` : le format du corps.\n- `Authorization: Bearer <token>` : le jeton d'authentification.\n- `Accept: application/json` : le format que le client souhaite recevoir.\n- `Cache-Control` : la politique de cache.\n\n## Auto-explication (Feynman)\n\nReformule : « Une requête HTTP = un **verbe** (GET/POST/PUT/DELETE) + une **adresse** + des **en-têtes** + parfois un **corps**. La réponse = un **code** (2xx ok, 4xx ma faute, 5xx sa faute) + des en-têtes + un corps. »",
      "playground": null,
      "quiz": [
        {
          "question": "Quelle méthode HTTP utilise-t-on pour créer une nouvelle ressource ?",
          "options": [
            "GET",
            "DELETE",
            "POST",
            "HEAD"
          ],
          "correctIndex": 2,
          "explanation": "POST sert à créer une nouvelle ressource. GET lit, DELETE supprime, PUT remplace."
        },
        {
          "question": "Que signifie un code de statut 404 ?",
          "options": [
            "Le serveur a planté",
            "La ressource demandée est introuvable",
            "La requête a réussi",
            "Tu n'es pas authentifié"
          ],
          "correctIndex": 1,
          "explanation": "404 Not Found fait partie des erreurs 4xx (côté client) : la ressource demandée n'existe pas."
        },
        {
          "question": "Un code 500 indique...",
          "options": [
            "Une erreur côté serveur",
            "Un succès",
            "Une redirection",
            "Une erreur de saisie du client"
          ],
          "correctIndex": 0,
          "explanation": "Les codes 5xx signalent une erreur côté serveur ; 500 = Internal Server Error, un bug du serveur."
        }
      ]
    },
    {
      "id": "api-rest-json",
      "title": "Les API REST & le format JSON",
      "markdown": "## Métaphore\n\nUne **API REST**, c'est le **menu d'un restaurant** standardisé. Chaque plat (ressource) a un nom clair et une adresse précise. Tu n'as pas besoin de connaître la cuisine : tu commandes « le client 42 » avec un verbe (le lire, le modifier...) et on te répond dans un format prévisible. Le **JSON**, c'est la langue écrite sur ce menu : un format que tout le monde sait lire.\n\n## Définition : API et REST\n\nUne **API** (Application Programming Interface) est un **contrat** : une porte d'entrée par laquelle un programme peut demander des services à un autre, sans connaître son fonctionnement interne.\n\n**REST** (REpresentational State Transfer) est un **style d'architecture** pour concevoir des API web. Ses idées clés :\n\n- Tout est une **ressource** (un client, une commande, un produit).\n- Chaque ressource a une **URL** (un **endpoint**) : `/clients`, `/clients/42`.\n- On agit dessus avec les **verbes HTTP** (GET, POST, PUT, DELETE).\n- Les échanges sont **stateless** et utilisent un format standard, presque toujours **JSON**.\n\n## CRUD : les 4 opérations de base\n\n**CRUD** = Create, Read, Update, Delete. C'est le coeur de toute application de gestion. Voici la correspondance classique avec REST/HTTP :\n\n| Action | Verbe HTTP | Endpoint        | Code typique |\n|--------|------------|-----------------|--------------|\n| Lister | GET        | `/clients`      | 200          |\n| Lire 1 | GET        | `/clients/42`   | 200 / 404    |\n| Créer  | POST       | `/clients`      | 201          |\n| Modifier | PUT      | `/clients/42`   | 200          |\n| Supprimer | DELETE  | `/clients/42`   | 204          |\n\n> Bonne pratique : les endpoints désignent des **noms** (ressources) au pluriel, pas des verbes. On écrit `/clients`, pas `/getClients`. Le verbe, c'est la méthode HTTP qui le porte.\n\n## Le format JSON\n\n**JSON** (JavaScript Object Notation) est un format texte **léger** et **lisible** pour représenter des données structurées. Exemple de réponse à `GET /clients/42` :\n\n```json\n{\n  \\\"id\\\": 42,\n  \\\"nom\\\": \\\"Dupont\\\",\n  \\\"actif\\\": true,\n  \\\"interventions\\\": [101, 102],\n  \\\"contact\\\": { \\\"email\\\": \\\"dupont@exemple.fr\\\" }\n}\n```\n\nLes briques du JSON :\n\n- **Objet** : entre accolades `{ }`, des paires **clé : valeur**. Les clés sont **toujours entre guillemets doubles**.\n- **Tableau** : entre crochets `[ ]`, une liste ordonnée.\n- **Types** : chaîne `\\\"...\\\"`, nombre `42`, booléen `true`/`false`, `null`, objet, tableau.\n- Pas de commentaires, pas de virgule finale, guillemets doubles obligatoires.\n\n## Dans le monde maintenance industrielle (SaaS)\n\nPour une appli de maintenance, on aurait par exemple : `GET /equipements`, `POST /interventions`, `PUT /interventions/57`, `DELETE /pieces/12`. Chaque entité métier devient une ressource adressable.\n\n## Auto-explication (Feynman)\n\nReformule : « Une API REST expose des **ressources** à des **URL**, on les manipule avec les **verbes HTTP** selon le schéma **CRUD**, et les données voyagent en **JSON** : des objets `{clé: valeur}` et des tableaux `[...]`. »",
      "playground": null,
      "quiz": [
        {
          "question": "Dans une API REST, comment désigne-t-on correctement un endpoint pour lister les clients ?",
          "options": [
            "GET /getAllClients",
            "GET /clients",
            "POST /listeClients",
            "GET /client/list/all"
          ],
          "correctIndex": 1,
          "explanation": "En REST, l'endpoint désigne une ressource (un nom, au pluriel) et le verbe est porté par la méthode HTTP : GET /clients."
        },
        {
          "question": "Que signifie l'acronyme CRUD ?",
          "options": [
            "Create, Read, Update, Delete",
            "Connect, Run, Use, Deploy",
            "Copy, Read, Undo, Drop",
            "Create, Reset, Upload, Download"
          ],
          "correctIndex": 0,
          "explanation": "CRUD = Create (créer), Read (lire), Update (modifier), Delete (supprimer) : les 4 opérations de base sur une ressource."
        },
        {
          "question": "En JSON, comment doit-on écrire les clés d'un objet ?",
          "options": [
            "Sans guillemets",
            "Entre guillemets simples",
            "Entre guillemets doubles",
            "En majuscules uniquement"
          ],
          "correctIndex": 2,
          "explanation": "En JSON valide, les clés sont toujours entre guillemets doubles, comme les chaînes de caractères."
        }
      ]
    },
    {
      "id": "architecture-couches",
      "title": "Architecture en couches",
      "markdown": "## Métaphore\n\nPense à un **restaurant bien organisé** :\n\n- La **salle** (les serveurs en costume) accueille et parle au client.\n- La **cuisine** prend les commandes et applique les recettes.\n- Le **garde-manger / la cave** stocke les ingrédients.\n\nChacun a **un seul rôle** et ne fait pas le travail des autres. Le serveur de salle ne décide pas des recettes ; le cuisinier ne va pas servir en salle. C'est exactement l'idée de l'**architecture en couches**.\n\n## Définition\n\nL'**architecture en couches** (layered architecture) organise le code en **niveaux superposés**, chacun avec une responsabilité précise. Chaque couche ne parle qu'à la couche juste en dessous. Les trois couches classiques :\n\n1. **Couche présentation** (UI / API)\n   - Son rôle : recevoir les requêtes, afficher/retourner les réponses. C'est la salle.\n   - Exemples : un Controller .NET, un composant Angular, un Controller Spring.\n\n2. **Couche métier** (business / service / logique applicative)\n   - Son rôle : appliquer les **règles métier** (« une intervention ne peut pas être clôturée sans rapport »). C'est la cuisine.\n   - Exemples : des classes `Service`.\n\n3. **Couche d'accès aux données** (data / persistence / repository)\n   - Son rôle : lire et écrire dans la base de données. C'est le garde-manger.\n   - Exemples : des `Repository`, un ORM (Entity Framework, JPA/Hibernate).\n\n```\n[ Présentation ]  <- reçoit la requête HTTP\n      |\n[ Métier ]        <- applique les règles\n      |\n[ Données ]       <- lit/écrit en base\n      |\n[ Base de données ]\n```\n\n## La séparation des responsabilités\n\nLe principe central s'appelle la **séparation des responsabilités** (Separation of Concerns). Chaque partie du code a **une raison d'exister** et **une seule**. Avantages :\n\n- **Lisibilité** : on sait où chercher (un bug d'affichage → présentation ; une règle fausse → métier).\n- **Testabilité** : on peut tester la couche métier sans base de données ni interface.\n- **Évolutivité** : changer de base de données n'impacte que la couche données ; changer l'UI n'impacte que la présentation.\n- **Réutilisabilité** : la même couche métier peut servir un site web ET une appli mobile.\n\n## Un piège classique\n\nMettre une requête SQL ou une règle métier directement dans un Controller. Ça marche... jusqu'au jour où il faut le tester, le réutiliser ou le modifier. On parle de code « spaghetti ». Les couches évitent ça.\n\n## Auto-explication (Feynman)\n\nReformule : « Présentation = parler au client. Métier = les règles. Données = la base. Chaque couche fait UNE chose et appelle seulement celle d'en dessous. »",
      "playground": null,
      "quiz": [
        {
          "question": "Quelle couche contient les règles métier de l'application ?",
          "options": [
            "La couche présentation",
            "La couche métier (service)",
            "La couche d'accès aux données",
            "La base de données"
          ],
          "correctIndex": 1,
          "explanation": "La couche métier (business / service) porte les règles métier de l'application. La présentation gère l'UI, la couche données l'accès à la base."
        },
        {
          "question": "Quel est l'intérêt principal de la séparation des responsabilités ?",
          "options": [
            "Rendre le code plus lent",
            "Tout mettre dans un seul fichier",
            "Rendre le code plus lisible, testable et évolutif",
            "Supprimer la base de données"
          ],
          "correctIndex": 2,
          "explanation": "Séparer les responsabilités rend le code plus lisible, plus facile à tester et à faire évoluer."
        },
        {
          "question": "Mettre une requête SQL directement dans un Controller est...",
          "options": [
            "Une bonne pratique recommandée",
            "Un anti-pattern qui mélange les responsabilités",
            "Obligatoire en architecture en couches",
            "Impossible techniquement"
          ],
          "correctIndex": 1,
          "explanation": "C'est un anti-pattern : le Controller (présentation) ne doit pas accéder directement à la base. Cela revient à la couche données."
        }
      ]
    },
    {
      "id": "poo-solid",
      "title": "Les principes de la POO + introduction à SOLID",
      "markdown": "## Métaphore\n\nUn **plan d'usine** (la **classe**) décrit comment fabriquer une voiture : ses pièces et ce qu'elle sait faire. Chaque voiture qui sort de l'usine est un **objet** (une **instance**) construit à partir de ce plan. La **Programmation Orientée Objet** (POO) consiste à modéliser ton programme avec ces plans et ces objets.\n\n## Définition\n\nLa **POO** organise le code autour d'**objets** qui regroupent :\n\n- des **données** (attributs / propriétés) : ex. la couleur, la vitesse ;\n- des **comportements** (méthodes) : ex. démarrer(), freiner().\n\nUne **classe** est le plan ; un **objet** est une réalisation concrète de ce plan.\n\n## Les 4 piliers de la POO\n\n### 1. Encapsulation\nRegrouper données et méthodes dans un objet, et **cacher les détails internes**. On expose des méthodes publiques et on protège les données (privées). Comme une voiture : tu utilises la pédale de frein, sans toucher directement au système hydraulique. Ça évite qu'on mette l'objet dans un état incohérent.\n\n### 2. Héritage\nCréer une classe à partir d'une autre pour **réutiliser** son code. `VoitureElectrique` hérite de `Voiture` : elle reprend tout ce que sait faire une voiture, et ajoute/spécialise ce qui lui est propre (recharger()). On parle de relation « est un » : une voiture électrique **est une** voiture.\n\n### 3. Polymorphisme\n« Plusieurs formes ». Un même appel de méthode peut se comporter différemment selon l'objet réel. Si `Voiture` et `Moto` ont chacune une méthode `demarrer()`, on peut appeler `vehicule.demarrer()` sans savoir le type exact : chaque objet répond à sa manière.\n\n### 4. Abstraction\nNe montrer que **l'essentiel** et masquer la complexité. Une interface `Vehicule` dit « un véhicule sait démarrer et freiner » sans dire **comment**. Le code qui l'utilise raisonne sur le concept, pas sur les détails.\n\n## Introduction à SOLID\n\n**SOLID** = 5 principes pour écrire du code orienté objet **maintenable**. À connaître en entretien junior :\n\n- **S — Single Responsibility** : une classe = **une seule** raison de changer (une seule responsabilité).\n- **O — Open/Closed** : une classe doit être **ouverte à l'extension** mais **fermée à la modification** (on ajoute du comportement sans casser l'existant).\n- **L — Liskov Substitution** : une sous-classe doit pouvoir **remplacer** sa classe parente sans casser le programme.\n- **I — Interface Segregation** : mieux vaut **plusieurs petites interfaces** spécifiques qu'une grosse interface fourre-tout.\n- **D — Dependency Inversion** : dépendre d'**abstractions** (interfaces), pas d'implémentations concrètes.\n\n> Lien avec l'injection de dépendances (que tu verras en .NET et Spring) : c'est l'application directe du « D » de SOLID.\n\n## Auto-explication (Feynman)\n\nReformule : « Classe = plan, objet = exemplaire. Encapsulation = cacher l'intérieur. Héritage = réutiliser (est-un). Polymorphisme = même appel, comportements différents. Abstraction = montrer le quoi, cacher le comment. SOLID = 5 règles pour du code propre. »",
      "playground": null,
      "quiz": [
        {
          "question": "Quel pilier de la POO consiste à cacher les détails internes d'un objet ?",
          "options": [
            "L'héritage",
            "Le polymorphisme",
            "L'encapsulation",
            "La compilation"
          ],
          "correctIndex": 2,
          "explanation": "L'encapsulation regroupe données et méthodes et cache les détails internes en exposant seulement une interface publique."
        },
        {
          "question": "Le polymorphisme permet...",
          "options": [
            "De supprimer toutes les classes",
            "Qu'un même appel de méthode se comporte différemment selon l'objet",
            "D'écrire le code en plusieurs langages",
            "De copier-coller du code"
          ],
          "correctIndex": 1,
          "explanation": "Polymorphisme = plusieurs formes : un même appel (ex. demarrer()) se comporte différemment selon le type réel de l'objet."
        },
        {
          "question": "Dans SOLID, que dit le principe S (Single Responsibility) ?",
          "options": [
            "Une classe doit avoir une seule responsabilité",
            "Une classe doit tout faire",
            "Il faut un seul fichier par projet",
            "Une méthode ne doit jamais changer"
          ],
          "correctIndex": 0,
          "explanation": "Single Responsibility : une classe ne doit avoir qu'une seule responsabilité, donc une seule raison de changer."
        }
      ]
    },
    {
      "id": "algorithmique",
      "title": "Bases d'algorithmique",
      "markdown": "## Métaphore\n\nUn **algorithme**, c'est une **recette de cuisine** : une suite d'étapes précises pour obtenir un résultat. « Coupe les oignons, fais chauffer, ajoute, attends 10 min. ½ Un ordinateur suit ta recette à la lettre, sans imagination : si une étape est floue ou fausse, le plat est raté.\n\n## Les briques de base\n\n### Variables\nUne **variable** est une **boîte étiquetée** qui stocke une valeur.\n\n```javascript\nlet age = 30;            // un nombre\nlet nom = \\\"Dupont\\\";      // une chaîne\nlet actif = true;        // un booléen\n```\n\n### Conditions\nLa condition (**si... alors... sinon**) permet de **choisir** un chemin.\n\n```javascript\nif (age >= 18) {\n  console.log(\\\"Majeur\\\");\n} else {\n  console.log(\\\"Mineur\\\");\n}\n```\n\n### Boucles\nLa boucle **répète** une action. Évite de copier-coller 100 fois la même ligne.\n\n```javascript\nfor (let i = 0; i < 3; i++) {\n  console.log(\\\"Tour n°\\\" + i);\n}\n```\n\n### Fonctions\nUne **fonction** est une recette réutilisable : on lui donne des **entrées** (paramètres), elle renvoie une **sortie**.\n\n```javascript\nfunction addition(a, b) {\n  return a + b;\n}\naddition(2, 3); // -> 5\n```\n\n## La notion de complexité (Big O)\n\nQuand les données grossissent (10, puis 1 million d'éléments), certaines recettes restent rapides, d'autres deviennent insupportablement lentes. La **complexité** (notation **Big O**) mesure **comment le temps de calcul évolue selon la taille des données** (`n`). On ignore les détails de la machine pour ne garder que la **tendance**.\n\n- **O(1)** — **constant** : pareil quelle que soit la taille. Ex : accéder à `tableau[0]`.\n- **O(n)** — **linéaire** : le temps grossit proportionnellement à `n`. Ex : parcourir une liste une fois.\n- **O(n²)** — **quadratique** : une boucle dans une boucle. 1 000 éléments → 1 000 000 d'opérations. À éviter sur de gros volumes.\n- **O(log n)** — **logarithmique** : très efficace, on divise le problème en deux à chaque étape. Ex : recherche dichotomique dans une liste triée.\n\n> Idée clé : on ne compte pas les secondes, on compte **comment ça grandit**. Un O(n) bat un O(n²) dès que `n` devient grand.\n\n## Le playground\n\nLe code ci-contre combine une **fonction**, une **boucle** et une **condition** pour ne garder que les nombres pairs d'une liste. Lance-le, puis modifie la liste ou la condition pour expérimenter.\n\n## Auto-explication (Feynman)\n\nReformule : « Variable = boîte. Condition = si/sinon. Boucle = répéter. Fonction = recette réutilisable avec entrées/sortie. Big O = comment le temps grandit quand les données grossissent (O(1) < O(log n) < O(n) < O(n²)). »",
      "playground": {
        "language": "javascript",
        "code": "// Algorithmique : fonction + boucle + condition\n// On garde uniquement les nombres pairs d'une liste.\n\nfunction nombresPairs(liste) {\n  let resultat = [];\n  for (let i = 0; i < liste.length; i++) {\n    const n = liste[i];\n    if (n % 2 === 0) {        // condition : pair ?\n      resultat.push(n);\n    }\n  }\n  return resultat;            // sortie de la fonction\n}\n\nconst donnees = [1, 2, 3, 4, 5, 6, 7, 8];\nconst pairs = nombresPairs(donnees);\n\nconsole.log(\"Liste de départ :\", donnees);\nconsole.log(\"Nombres pairs   :\", pairs);\n\n// Bonus : complexité O(n) -> on parcourt la liste une seule fois.\nconsole.log(\"Nombre d'éléments parcourus :\", donnees.length);"
      },
      "quiz": [
        {
          "question": "À quoi sert une boucle (par exemple un for) ?",
          "options": [
            "À répéter une action plusieurs fois",
            "À stocker une seule valeur",
            "À supprimer le programme",
            "À se connecter à internet"
          ],
          "correctIndex": 0,
          "explanation": "Une boucle répète une action, ce qui évite de copier-coller le même code plusieurs fois."
        },
        {
          "question": "Que mesure la notation Big O ?",
          "options": [
            "Le nombre de lignes de code",
            "Comment le temps de calcul évolue selon la taille des données",
            "La couleur de l'interface",
            "Le prix du serveur"
          ],
          "correctIndex": 1,
          "explanation": "Big O décrit la tendance : comment le temps (ou la mémoire) évolue quand la taille des données n augmente."
        },
        {
          "question": "Parmi ces complexités, laquelle est la plus lente pour de grandes données ?",
          "options": [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
          ],
          "correctIndex": 3,
          "explanation": "O(n²) (quadratique, une boucle dans une boucle) croît beaucoup plus vite que O(1), O(log n) ou O(n)."
        }
      ]
    }
  ]
};
