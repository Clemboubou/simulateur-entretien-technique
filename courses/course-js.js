window.COURSES = window.COURSES || {};
window.COURSES["js"] = {
  "id": "js",
  "title": "JavaScript / TypeScript",
  "icon": "JS",
  "summary": "Un cours complet et progressif pour passer de debutant a junior en JavaScript moderne (ES6+) puis en TypeScript. On part des types et variables, on traverse les fonctions et les closures, la manipulation d'objets et de tableaux, l'asynchrone (promesses et async/await), les nouveautes ES6+ (modules, classes) et enfin TypeScript (types, interfaces, generics, unions, enums). Chaque chapitre contient un vrai cours, des exemples executables et un QCM.",
  "chapters": [
    {
      "id": "types-variables",
      "title": "1. Types et variables",
      "markdown": "# Types et variables\n\n## La metaphore\n\nImagine une etagere avec des boites etiquetees. Une **variable**, c'est une boite avec une etiquette (son nom) dans laquelle tu ranges une valeur. En JavaScript tu as trois facons de creer une boite : `var`, `let` et `const`.\n\n## Definition\n\n### var, let, const\n\n```javascript\nvar ancien = \"a eviter\";   // ancienne syntaxe, portee fonction\nlet modifiable = 10;        // valeur qui peut changer\nconst fixe = 3.14;          // valeur qui NE change PAS (re-affectation interdite)\n```\n\n- `const` : utilise-le **par defaut**. Il interdit la re-affectation.\n- `let` : quand la valeur doit changer (compteur, accumulateur...).\n- `var` : a oublier dans le code moderne (portee de fonction, hoisting piegeux).\n\nAttention : `const` empeche de **re-affecter** la variable, mais le contenu d'un objet reste modifiable :\n\n```javascript\nconst user = { nom: \"Lea\" };\nuser.nom = \"Max\"; // OK : on modifie le contenu\n// user = {};     // ERREUR : on ne peut pas re-affecter\n```\n\n## Les types primitifs\n\nJavaScript a 7 types primitifs :\n\n```javascript\nconst texte = \"bonjour\";      // string\nconst nombre = 42;            // number (entiers ET decimaux)\nconst grand = 9007199254740991n; // bigint\nconst vrai = true;            // boolean\nconst rien = null;            // null (absence volontaire)\nlet pasDefini;               // undefined (pas encore assigne)\nconst id = Symbol(\"id\");     // symbol (identifiant unique)\n```\n\nL'operateur `typeof` revele le type :\n\n```javascript\nconsole.log(typeof \"abc\");   // \"string\"\nconsole.log(typeof 42);      // \"number\"\nconsole.log(typeof true);    // \"boolean\"\nconsole.log(typeof undefined); // \"undefined\"\nconsole.log(typeof null);    // \"object\"  <-- bug historique celebre !\n```\n\n## == vs === : le piege classique\n\n- `===` (egalite **stricte**) : compare la valeur ET le type. **A utiliser presque toujours.**\n- `==` (egalite **laxiste**) : convertit les types avant de comparer (coercition). Source de bugs.\n\n```javascript\nconsole.log(5 === \"5\");  // false (number vs string)\nconsole.log(5 == \"5\");   // true  (\"5\" converti en 5)\nconsole.log(0 == false); // true  (false converti en 0)\nconsole.log(null == undefined); // true\nconsole.log(null === undefined); // false\n```\n\n## La coercition de type\n\nJavaScript convertit automatiquement les types dans certaines operations. C'est pratique mais piegeux :\n\n```javascript\nconsole.log(\"3\" + 1);  // \"31\"  (+ avec une string = concatenation)\nconsole.log(\"3\" - 1);  // 2     (- force la conversion en nombre)\nconsole.log(true + 1); // 2     (true vaut 1)\nconsole.log([] + []);  // \"\"    (deux tableaux vides -> chaine vide)\n```\n\nValeurs **falsy** (considerees comme `false` dans un test) : `false`, `0`, `\"\"`, `null`, `undefined`, `NaN`. Tout le reste est **truthy**.\n\n## Explique-le simplement (technique Feynman)\n\nUne variable est une boite etiquetee. `const` ferme la boite a cle (on ne peut plus la remplacer), `let` la laisse ouverte. Utilise `===` pour comparer sans surprise, car `==` triche en convertissant les types.",
      "playground": {
        "language": "javascript",
        "code": "// Types et coercition en action\nconst texte = \"5\";\nconst nombre = 5;\n\nconsole.log(\"typeof texte :\", typeof texte);\nconsole.log(\"typeof nombre :\", typeof nombre);\n\nconsole.log(\"5 == '5'  ->\", nombre == texte);   // true (coercition)\nconsole.log(\"5 === '5' ->\", nombre === texte);  // false (strict)\n\nconsole.log(\"'3' + 1 ->\", \"3\" + 1); // \"31\"\nconsole.log(\"'3' - 1 ->\", \"3\" - 1); // 2\n\nconst user = { nom: \"Lea\" };\nuser.nom = \"Max\";\nconsole.log(\"const objet modifie :\", user.nom);\n\n// typeof null est un bug historique\nconsole.log(\"typeof null ->\", typeof null);"
      },
      "quiz": [
        {
          "question": "Quel mot-cle faut-il utiliser par defaut pour declarer une variable en JavaScript moderne ?",
          "options": ["var", "let", "const", "function"],
          "correctIndex": 2,
          "explanation": "On prefere const par defaut car il interdit la re-affectation, ce qui rend le code plus sur et plus lisible. On passe a let seulement si la valeur doit changer."
        },
        {
          "question": "Que retourne l'expression 5 === \"5\" ?",
          "options": ["true", "false", "une erreur", "undefined"],
          "correctIndex": 1,
          "explanation": "=== est l'egalite stricte : elle compare la valeur ET le type. Ici un number (5) et une string (\"5\") ont des types differents, donc le resultat est false."
        },
        {
          "question": "Que vaut typeof null en JavaScript ?",
          "options": ["\"null\"", "\"undefined\"", "\"object\"", "\"boolean\""],
          "correctIndex": 2,
          "explanation": "typeof null retourne \"object\", un bug historique conserve pour la compatibilite. C'est un piege classique d'entretien."
        }
      ]
    },
    {
      "id": "fonctions-scope-closures",
      "title": "2. Fonctions, scope, closures, this et hoisting",
      "markdown": "# Fonctions, scope, closures, this et hoisting\n\n## La metaphore\n\nUne **fonction** est une recette de cuisine : tu lui donnes des ingredients (parametres), elle execute des etapes et te rend un plat (valeur de retour). Le **scope** est la cuisine : ce qui est range dedans n'est pas visible depuis la salle a manger.\n\n## Declarer une fonction\n\n```javascript\n// Declaration classique\nfunction additionner(a, b) {\n  return a + b;\n}\n\n// Fonction flechee (arrow function), syntaxe ES6\nconst additionner2 = (a, b) => a + b;\n\n// Avec un corps multi-lignes\nconst saluer = (nom) => {\n  const message = \"Bonjour \" + nom;\n  return message;\n};\n```\n\n## Le scope (portee)\n\nLe scope determine **ou** une variable est accessible.\n\n```javascript\nlet global = \"visible partout\";\n\nfunction test() {\n  let locale = \"visible seulement ici\";\n  console.log(global); // OK\n}\n// console.log(locale); // ERREUR : locale n'existe pas ici\n```\n\n`let` et `const` ont une portee de **bloc** (entre `{ }`), `var` a une portee de **fonction** :\n\n```javascript\nif (true) {\n  let x = 1;\n  var y = 2;\n}\n// console.log(x); // ERREUR\nconsole.log(y);    // 2 (var ignore le bloc)\n```\n\n## Le hoisting (remontee)\n\nJavaScript \"remonte\" les declarations en haut de leur portee avant d'executer le code.\n\n```javascript\nconsole.log(maFonction()); // OK : les declarations de fonction sont hoistees\nfunction maFonction() { return \"ca marche\"; }\n\nconsole.log(a); // undefined (var hoistee mais pas sa valeur)\nvar a = 5;\n\n// console.log(b); // ERREUR : let/const sont dans la \"zone morte temporelle\"\nlet b = 10;\n```\n\n## Les closures (fermetures)\n\nUne **closure** : une fonction qui se souvient des variables de son environnement de creation, meme apres que la fonction parente a fini. C'est l'un des concepts les plus puissants de JavaScript.\n\n```javascript\nfunction creerCompteur() {\n  let compte = 0;          // variable \"capturee\"\n  return function () {\n    compte++;              // la fonction interne se souvient de compte\n    return compte;\n  };\n}\n\nconst compteur = creerCompteur();\nconsole.log(compteur()); // 1\nconsole.log(compteur()); // 2\nconsole.log(compteur()); // 3\n```\n\nLa variable `compte` reste vivante car la fonction retournee garde une reference dessus.\n\n## this : le contexte\n\n`this` designe l'objet courant. Sa valeur depend de **comment** la fonction est appelee.\n\n```javascript\nconst objet = {\n  nom: \"Lea\",\n  direBonjour: function () {\n    return \"Bonjour \" + this.nom; // this = objet\n  }\n};\nconsole.log(objet.direBonjour()); // \"Bonjour Lea\"\n```\n\nPiege important : les **fonctions flechees** n'ont pas leur propre `this`, elles heritent de celui du contexte parent. C'est tres utile dans les callbacks :\n\n```javascript\nconst compteur = {\n  valeur: 0,\n  demarrer: function () {\n    // la fleche garde le this de demarrer (l'objet)\n    setInterval(() => { this.valeur++; }, 1000);\n  }\n};\n```\n\n## Explique-le simplement (Feynman)\n\nUne closure, c'est une fonction qui emporte un sac a dos contenant les variables de l'endroit ou elle est nee. Meme partie ailleurs, elle peut toujours fouiller dans son sac.",
      "playground": {
        "language": "javascript",
        "code": "// Closure : compteur qui garde sa memoire\nfunction creerCompteur() {\n  let compte = 0;\n  return function () {\n    compte++;\n    return compte;\n  };\n}\n\nconst c = creerCompteur();\nconsole.log(\"appel 1 :\", c()); // 1\nconsole.log(\"appel 2 :\", c()); // 2\nconsole.log(\"appel 3 :\", c()); // 3\n\n// Hoisting : la fonction est utilisable avant sa declaration\nconsole.log(\"hoisting :\", carre(4));\nfunction carre(n) { return n * n; }\n\n// this dans un objet\nconst objet = {\n  nom: \"Lea\",\n  bonjour() { return \"Bonjour \" + this.nom; }\n};\nconsole.log(objet.bonjour());"
      },
      "quiz": [
        {
          "question": "Qu'est-ce qu'une closure en JavaScript ?",
          "options": [
            "Une fonction qui ferme le navigateur",
            "Une fonction qui se souvient des variables de son environnement de creation",
            "Une boucle infinie",
            "Une variable globale"
          ],
          "correctIndex": 1,
          "explanation": "Une closure est une fonction qui conserve l'acces aux variables de la portee dans laquelle elle a ete creee, meme apres que la fonction parente a termine son execution."
        },
        {
          "question": "Quelle est la particularite de this dans une fonction flechee ?",
          "options": [
            "Elle pointe toujours sur window",
            "Elle n'a pas de this propre et herite du contexte parent",
            "Elle pointe sur null",
            "Elle cree un nouveau this a chaque appel"
          ],
          "correctIndex": 1,
          "explanation": "Les fonctions flechees n'ont pas leur propre this : elles capturent le this du contexte englobant. C'est pratique pour les callbacks ou l'on veut garder le this d'origine."
        },
        {
          "question": "Quelle est la portee (scope) d'une variable declaree avec let ?",
          "options": [
            "Portee globale uniquement",
            "Portee de fonction",
            "Portee de bloc (entre accolades)",
            "Aucune portee"
          ],
          "correctIndex": 2,
          "explanation": "let (comme const) a une portee de bloc : la variable n'existe qu'entre les accolades { } ou elle est declaree. var, lui, a une portee de fonction."
        }
      ]
    },
    {
      "id": "objets-tableaux",
      "title": "3. Objets, tableaux, map/filter/reduce, destructuration et spread",
      "markdown": "# Objets, tableaux et methodes\n\n## La metaphore\n\nUn **objet** est une fiche client : des paires etiquette/valeur (`nom: \"Lea\"`, `age: 30`). Un **tableau** est une file d'attente numerotee : chaque element a une position (index) commencant a 0.\n\n## Les objets\n\n```javascript\nconst user = {\n  nom: \"Lea\",\n  age: 30,\n  saluer() { return \"Salut \" + this.nom; }\n};\n\nconsole.log(user.nom);       // \"Lea\" (notation point)\nconsole.log(user[\"age\"]);    // 30   (notation crochet)\nconsole.log(user.saluer());  // \"Salut Lea\"\n```\n\n## Les tableaux\n\n```javascript\nconst nombres = [10, 20, 30];\nconsole.log(nombres[0]);     // 10\nconsole.log(nombres.length); // 3\nnombres.push(40);            // ajoute a la fin\n```\n\n## Les trois methodes essentielles\n\n### map : transformer chaque element\n\n```javascript\nconst nombres = [1, 2, 3];\nconst doubles = nombres.map(n => n * 2);\nconsole.log(doubles); // [2, 4, 6]\n```\n\n### filter : garder certains elements\n\n```javascript\nconst nombres = [1, 2, 3, 4, 5];\nconst pairs = nombres.filter(n => n % 2 === 0);\nconsole.log(pairs); // [2, 4]\n```\n\n### reduce : combiner en une seule valeur\n\n```javascript\nconst nombres = [1, 2, 3, 4];\nconst somme = nombres.reduce((acc, n) => acc + n, 0);\nconsole.log(somme); // 10\n```\n\n`reduce` prend un **accumulateur** (`acc`) et une valeur initiale (ici `0`). A chaque tour, on ajoute l'element courant a l'accumulateur.\n\nCes trois methodes ne modifient PAS le tableau d'origine : elles en retournent un nouveau (programmation immutable).\n\n## La destructuration\n\nExtraire des valeurs d'un objet ou d'un tableau en une ligne :\n\n```javascript\n// Sur un objet\nconst user = { nom: \"Lea\", age: 30, ville: \"Metz\" };\nconst { nom, age } = user;\nconsole.log(nom, age); // \"Lea\" 30\n\n// Sur un tableau\nconst [premier, second] = [10, 20, 30];\nconsole.log(premier, second); // 10 20\n\n// Avec valeur par defaut\nconst { pays = \"France\" } = user;\nconsole.log(pays); // \"France\" (absent de user)\n```\n\n## Le spread et le rest (...)\n\nL'operateur `...` etale (spread) ou regroupe (rest).\n\n```javascript\n// Spread : copier/fusionner\nconst a = [1, 2];\nconst b = [3, 4];\nconst fusion = [...a, ...b]; // [1, 2, 3, 4]\n\nconst base = { nom: \"Lea\" };\nconst complet = { ...base, age: 30 }; // { nom: \"Lea\", age: 30 }\n\n// Rest : regrouper les arguments restants\nfunction additionner(...nombres) {\n  return nombres.reduce((acc, n) => acc + n, 0);\n}\nconsole.log(additionner(1, 2, 3, 4)); // 10\n```\n\nLe spread est la maniere idiomatique de **copier sans muter** un objet ou un tableau.\n\n## Explique-le simplement (Feynman)\n\n`map` transforme (3 pommes -> 3 tartes), `filter` trie (je garde les pommes rouges), `reduce` rassemble (je fais une seule grande tarte). Le spread `...` vide le contenu d'un panier dans un autre.",
      "playground": {
        "language": "javascript",
        "code": "const nombres = [1, 2, 3, 4, 5];\n\nconst doubles = nombres.map(n => n * 2);\nconsole.log(\"map (x2) :\", doubles);\n\nconst pairs = nombres.filter(n => n % 2 === 0);\nconsole.log(\"filter (pairs) :\", pairs);\n\nconst somme = nombres.reduce((acc, n) => acc + n, 0);\nconsole.log(\"reduce (somme) :\", somme);\n\n// Destructuration\nconst user = { nom: \"Lea\", age: 30, ville: \"Metz\" };\nconst { nom, age } = user;\nconsole.log(\"destructuration :\", nom, age);\n\n// Spread\nconst complet = { ...user, age: 31 };\nconsole.log(\"spread + override :\", complet);\n\nconst fusion = [...[1, 2], ...[3, 4]];\nconsole.log(\"fusion tableaux :\", fusion);"
      },
      "quiz": [
        {
          "question": "Que retourne [1, 2, 3].map(n => n * 2) ?",
          "options": ["[1, 2, 3]", "[2, 4, 6]", "6", "[1, 4, 9]"],
          "correctIndex": 1,
          "explanation": "map applique la fonction a chaque element et retourne un nouveau tableau. Ici chaque nombre est multiplie par 2, donnant [2, 4, 6]."
        },
        {
          "question": "A quoi sert la methode reduce ?",
          "options": [
            "A filtrer les elements d'un tableau",
            "A combiner tous les elements en une seule valeur",
            "A trier un tableau",
            "A inverser un tableau"
          ],
          "correctIndex": 1,
          "explanation": "reduce reduit un tableau a une seule valeur en accumulant les elements via une fonction, par exemple pour calculer une somme, un produit ou construire un objet."
        },
        {
          "question": "Que fait l'operateur spread dans const b = { ...a, age: 30 } ?",
          "options": [
            "Il supprime les proprietes de a",
            "Il copie les proprietes de a puis ajoute/ecrase age",
            "Il transforme a en tableau",
            "Il provoque une erreur"
          ],
          "correctIndex": 1,
          "explanation": "Le spread ...a copie toutes les proprietes de a dans le nouvel objet, puis age: 30 ajoute (ou ecrase) la propriete age. C'est la facon idiomatique de copier sans muter."
        }
      ]
    },
    {
      "id": "asynchrone",
      "title": "4. Asynchrone : callbacks, promesses, async/await et event loop",
      "markdown": "# La programmation asynchrone\n\n## La metaphore\n\nTu commandes un cafe (operation longue). Plutot que de rester plante a la caisse (bloquer), tu vas t'asseoir ; le barista t'appelle quand c'est pret (callback). JavaScript est mono-thread : il ne fait qu'une chose a la fois, mais delegue les taches longues et continue a travailler.\n\n## Pourquoi l'asynchrone ?\n\nLire un fichier, appeler une API, attendre un timer : ces operations prennent du temps. Si JavaScript attendait bloque, l'interface gelerait. L'asynchrone permet de **lancer** l'operation et de **reagir** quand elle se termine.\n\n## Les callbacks (l'ancienne facon)\n\nUn callback est une fonction passee en argument, appelee plus tard.\n\n```javascript\nsetTimeout(() => {\n  console.log(\"3 secondes plus tard\");\n}, 3000);\n```\n\nProbleme : empiler les callbacks cree le \"callback hell\" (pyramide de la mort) :\n\n```javascript\netape1(() => {\n  etape2(() => {\n    etape3(() => {\n      // illisible et difficile a maintenir\n    });\n  });\n});\n```\n\n## Les promesses (Promise)\n\nUne **Promise** represente une valeur future : elle est `pending` (en attente), puis `fulfilled` (reussie) ou `rejected` (echouee).\n\n```javascript\nconst promesse = new Promise((resolve, reject) => {\n  const ok = true;\n  if (ok) resolve(\"Reussite !\");\n  else reject(\"Echec...\");\n});\n\npromesse\n  .then(resultat => console.log(resultat))  // succes\n  .catch(erreur => console.log(erreur))     // erreur\n  .finally(() => console.log(\"Termine\"));   // dans tous les cas\n```\n\nOn chaine les `.then` pour enchainer proprement les etapes (fini la pyramide).\n\n## async / await (la facon moderne)\n\n`async/await` est du sucre syntaxique au-dessus des promesses : il fait ressembler du code asynchrone a du code synchrone, donc plus lisible.\n\n```javascript\nasync function chargerDonnees() {\n  try {\n    const reponse = await fetch(\"https://api.exemple.com/data\");\n    const data = await reponse.json();\n    return data;\n  } catch (erreur) {\n    console.log(\"Erreur :\", erreur);\n  }\n}\n```\n\n- `async` devant une fonction : elle retourne toujours une promesse.\n- `await` : met en pause la fonction jusqu'a ce que la promesse soit resolue (sans bloquer le reste du programme).\n- On gere les erreurs avec `try / catch`.\n\n## L'event loop (boucle d'evenements)\n\nC'est le mecanisme qui orchestre tout. JavaScript a :\n\n1. Une **pile d'appels** (call stack) : le code synchrone en cours.\n2. Une **file de taches** (callback/task queue) : les callbacks prets (setTimeout, etc.).\n3. Une **file de microtaches** (microtask queue) : les `.then` des promesses, **prioritaires**.\n\nL'event loop verifie : si la pile est vide, il prend d'abord les microtaches, puis les taches. D'ou ce resultat surprenant :\n\n```javascript\nconsole.log(\"1\");\nsetTimeout(() => console.log(\"2\"), 0);\nPromise.resolve().then(() => console.log(\"3\"));\nconsole.log(\"4\");\n// Ordre affiche : 1, 4, 3, 2\n```\n\n`1` et `4` sont synchrones. Puis la microtache `3` (promesse) passe AVANT la tache `2` (setTimeout), meme avec un delai de 0 ms.\n\n## Explique-le simplement (Feynman)\n\nUne promesse est un ticket de pressing : tu repars sans attendre, et tu reviens quand le vetement est pret (.then) ou tu reclames si c'est rate (.catch). `await` c'est attendre poliment ton tour sans bloquer les autres clients.",
      "playground": {
        "language": "javascript",
        "code": "// Ordre d'execution et event loop\nconsole.log(\"1 (synchrone)\");\n\nsetTimeout(() => console.log(\"2 (setTimeout - tache)\"), 0);\n\nPromise.resolve().then(() => console.log(\"3 (promesse - microtache)\"));\n\nconsole.log(\"4 (synchrone)\");\n\n// Une promesse + async/await\nfunction attendre(ms, valeur) {\n  return new Promise(resolve => setTimeout(() => resolve(valeur), ms));\n}\n\nasync function demo() {\n  const r = await attendre(10, \"resultat async\");\n  console.log(\"5 :\", r);\n}\ndemo();\n\n// Ordre attendu : 1, 4, 3, 2, puis 5"
      },
      "quiz": [
        {
          "question": "Que retourne toujours une fonction declaree avec async ?",
          "options": ["undefined", "Une promesse (Promise)", "Une erreur", "Un tableau"],
          "correctIndex": 1,
          "explanation": "Une fonction async retourne toujours une Promise. Meme si elle renvoie une valeur simple, celle-ci est automatiquement enveloppee dans une promesse resolue."
        },
        {
          "question": "Dans l'event loop, qui est traite en priorite quand la pile est vide ?",
          "options": [
            "Les taches (setTimeout) avant les microtaches",
            "Les microtaches (promesses) avant les taches (setTimeout)",
            "Tout en meme temps",
            "Rien, l'ordre est aleatoire"
          ],
          "correctIndex": 1,
          "explanation": "L'event loop vide d'abord la file de microtaches (les .then des promesses) avant de passer aux taches (setTimeout). C'est pourquoi une promesse resolue s'execute avant un setTimeout(0)."
        },
        {
          "question": "Comment gere-t-on une erreur avec async/await ?",
          "options": [
            "Avec un bloc try / catch",
            "Avec .then()",
            "Avec un if/else uniquement",
            "On ne peut pas gerer les erreurs"
          ],
          "correctIndex": 0,
          "explanation": "Avec async/await, on entoure le code await d'un bloc try/catch : si la promesse est rejetee, l'erreur est capturee dans le catch, comme du code synchrone."
        }
      ]
    },
    {
      "id": "es6-plus",
      "title": "5. ES6+ : modules, classes et template literals",
      "markdown": "# Les apports d'ES6 et au-dela\n\n## La metaphore\n\nES6 (ECMAScript 2015) est la grande renovation de JavaScript : nouvelles pieces (classes), meilleur rangement (modules) et outils plus pratiques (template literals). C'est le langage moderne que tu ecriras au quotidien.\n\n## Les template literals\n\nAvant, on concatenait avec `+`. Avec les backticks (\\`), on interpole directement :\n\n```javascript\nconst nom = \"Lea\";\nconst age = 30;\n\n// Ancienne facon\nconst v1 = \"Je suis \" + nom + \" et j'ai \" + age + \" ans.\";\n\n// Template literal (backticks + ${ })\nconst v2 = `Je suis ${nom} et j'ai ${age} ans.`;\n\n// Multi-lignes natives\nconst bloc = `Ligne 1\nLigne 2\nLigne 3`;\n```\n\nLes `${ }` peuvent contenir n'importe quelle expression : `${age * 2}`, `${nom.toUpperCase()}`.\n\n## Les classes\n\nUne **classe** est un plan de construction d'objets. ES6 apporte une syntaxe claire (par-dessus le systeme de prototypes).\n\n```javascript\nclass Animal {\n  constructor(nom, cri) {\n    this.nom = nom;\n    this.cri = cri;\n  }\n\n  parler() {\n    return `${this.nom} fait ${this.cri}`;\n  }\n}\n\nconst chat = new Animal(\"Felix\", \"miaou\");\nconsole.log(chat.parler()); // \"Felix fait miaou\"\n```\n\n### L'heritage\n\n```javascript\nclass Chien extends Animal {\n  constructor(nom) {\n    super(nom, \"wouf\"); // appelle le constructeur parent\n  }\n  rapporter() {\n    return `${this.nom} rapporte la balle`;\n  }\n}\n\nconst rex = new Chien(\"Rex\");\nconsole.log(rex.parler());    // herite : \"Rex fait wouf\"\nconsole.log(rex.rapporter()); // propre : \"Rex rapporte la balle\"\n```\n\n- `extends` : la classe enfant herite de la parente.\n- `super(...)` : appelle le constructeur (ou les methodes) du parent.\n\n## Les modules ES (import / export)\n\nLes modules permettent de decouper le code en fichiers reutilisables.\n\n```javascript\n// fichier maths.js\nexport function additionner(a, b) { return a + b; }\nexport const PI = 3.14159;\nexport default function multiplier(a, b) { return a * b; } // export par defaut\n```\n\n```javascript\n// fichier app.js\nimport multiplier, { additionner, PI } from \"./maths.js\";\n\nconsole.log(additionner(2, 3)); // 5\nconsole.log(multiplier(4, 5));  // 20\nconsole.log(PI);                // 3.14159\n```\n\n- `export` nomme : on importe avec les **accolades** `{ }` et le nom exact.\n- `export default` : un seul par fichier, importe **sans** accolades, avec le nom de ton choix.\n\nAutres apports ES6+ utiles : valeurs par defaut des parametres (`function f(x = 1)`), l'operateur de coalescence `??` (`a ?? b` renvoie b seulement si a est null/undefined) et le chainage optionnel `?.` (`user?.adresse?.ville`).\n\n```javascript\nconst user = { nom: \"Lea\" };\nconsole.log(user?.adresse?.ville); // undefined (pas d'erreur)\nconsole.log(user.surnom ?? \"inconnu\"); // \"inconnu\"\n```\n\n## Explique-le simplement (Feynman)\n\nUne classe est un moule a gateau : `new` produit un gateau (objet). `extends` cree un moule derive (gateau au chocolat a partir du gateau de base), et `super` reprend la recette de base. Les modules sont des tiroirs : `export` range, `import` ressort ce dont tu as besoin.",
      "playground": {
        "language": "javascript",
        "code": "// Template literals\nconst nom = \"Lea\";\nconst age = 30;\nconsole.log(`Je suis ${nom}, ${age} ans, soit ${age * 12} mois.`);\n\n// Classes et heritage\nclass Animal {\n  constructor(nom, cri) {\n    this.nom = nom;\n    this.cri = cri;\n  }\n  parler() { return `${this.nom} fait ${this.cri}`; }\n}\n\nclass Chien extends Animal {\n  constructor(nom) { super(nom, \"wouf\"); }\n  rapporter() { return `${this.nom} rapporte la balle`; }\n}\n\nconst rex = new Chien(\"Rex\");\nconsole.log(rex.parler());\nconsole.log(rex.rapporter());\n\n// Chainage optionnel et coalescence\nconst user = { nom: \"Lea\" };\nconsole.log(\"ville :\", user?.adresse?.ville);\nconsole.log(\"surnom :\", user.surnom ?? \"inconnu\");"
      },
      "quiz": [
        {
          "question": "Comment ecrit-on une chaine avec interpolation (template literal) ?",
          "options": [
            "Avec des guillemets doubles : \"Bonjour $nom\"",
            "Avec des backticks et ${ } : `Bonjour ${nom}`",
            "Avec des apostrophes : 'Bonjour {nom}'",
            "Avec la fonction format()"
          ],
          "correctIndex": 1,
          "explanation": "Un template literal utilise des backticks (`) et la syntaxe ${expression} pour inserer des valeurs. Il permet aussi des chaines sur plusieurs lignes."
        },
        {
          "question": "A quoi sert le mot-cle super dans une classe enfant ?",
          "options": [
            "A creer une nouvelle instance",
            "A appeler le constructeur ou les methodes de la classe parente",
            "A supprimer la classe parente",
            "A rendre la classe privee"
          ],
          "correctIndex": 1,
          "explanation": "super permet d'appeler le constructeur de la classe parente (super(...)) ou ses methodes. C'est indispensable dans un constructeur enfant avant d'utiliser this."
        },
        {
          "question": "Comment importe-t-on un export par defaut ?",
          "options": [
            "import { default } from \"./fichier.js\"",
            "import monNom from \"./fichier.js\" (sans accolades)",
            "import * from \"./fichier.js\"",
            "On ne peut pas importer un export par defaut"
          ],
          "correctIndex": 1,
          "explanation": "Un export default s'importe sans accolades, avec le nom de ton choix : import monNom from \"./fichier.js\". Les exports nommes, eux, s'importent avec des accolades."
        }
      ]
    },
    {
      "id": "typescript",
      "title": "6. TypeScript : types, interfaces, generics, unions et enums",
      "markdown": "# TypeScript\n\n## La metaphore\n\nJavaScript te laisse mettre n'importe quoi dans n'importe quelle boite, et tu decouvres les erreurs a l'execution. **TypeScript** ajoute des etiquettes sur chaque boite et un controleur qui verifie, AVANT l'execution, que tu y mets le bon contenu. TypeScript = JavaScript + un systeme de types verifie a la compilation.\n\nLe code TypeScript est **transpile** en JavaScript : le navigateur ne voit que du JS, les types servent uniquement a t'aider pendant le developpement.\n\n## Les types de base\n\n```typescript\nlet nom: string = \"Lea\";\nlet age: number = 30;\nlet actif: boolean = true;\nlet notes: number[] = [12, 15, 18];\nlet rien: null = null;\n\n// Inference : TypeScript devine le type tout seul\nlet ville = \"Metz\"; // type string deduit automatiquement\n```\n\nLe type `any` desactive la verification (a eviter). Prefere `unknown` quand le type est vraiment inconnu, car il force a verifier avant usage.\n\n## Typer une fonction\n\n```typescript\nfunction additionner(a: number, b: number): number {\n  return a + b;\n}\n\n// Parametre optionnel (?) et valeur par defaut\nfunction saluer(nom: string, formel?: boolean): string {\n  return formel ? `Bonjour ${nom}` : `Salut ${nom}`;\n}\n\n// void : ne retourne rien\nfunction log(message: string): void {\n  console.log(message);\n}\n```\n\n## Les interfaces\n\nUne **interface** decrit la forme d'un objet (un contrat) :\n\n```typescript\ninterface User {\n  nom: string;\n  age: number;\n  email?: string; // optionnel\n}\n\nconst lea: User = { nom: \"Lea\", age: 30 };\n\nfunction afficher(u: User): string {\n  return `${u.nom} (${u.age})`;\n}\n```\n\nSi un objet ne respecte pas l'interface (champ manquant ou mauvais type), TypeScript signale l'erreur avant l'execution. `type` est une alternative proche : `type User = { nom: string; age: number };`.\n\n## Les types union\n\nUn **union** (`|`) autorise plusieurs types possibles :\n\n```typescript\nlet identifiant: string | number;\nidentifiant = \"abc\"; // OK\nidentifiant = 123;   // OK\n// identifiant = true; // ERREUR\n\ntype Statut = \"actif\" | \"inactif\" | \"banni\"; // union de litteraux\nlet s: Statut = \"actif\"; // seules ces 3 valeurs sont permises\n```\n\nPour utiliser un union en securite, on \"retrecit\" le type (narrowing) :\n\n```typescript\nfunction afficherId(id: string | number): string {\n  if (typeof id === \"string\") return id.toUpperCase();\n  return id.toFixed(2); // ici TypeScript sait que id est un number\n}\n```\n\n## Les enums\n\nUn **enum** nomme un ensemble fini de constantes liees :\n\n```typescript\nenum Couleur {\n  Rouge,   // 0\n  Vert,    // 1\n  Bleu     // 2\n}\nlet c: Couleur = Couleur.Vert;\nconsole.log(c); // 1\n\n// Enum a valeurs string (plus lisible)\nenum Role {\n  Admin = \"ADMIN\",\n  User = \"USER\"\n}\n```\n\n## Les generics (types generiques)\n\nUn **generic** est un type \"variable\" : il permet d'ecrire du code reutilisable qui garde l'information de type.\n\n```typescript\n// T est un type passe en parametre\nfunction premier<T>(tableau: T[]): T {\n  return tableau[0];\n}\n\nconst n = premier<number>([1, 2, 3]); // n est de type number\nconst m = premier([\"a\", \"b\"]);        // T deduit : string\n\n// Interface generique\ninterface Reponse<T> {\n  data: T;\n  succes: boolean;\n}\n\nconst r: Reponse<User> = { data: lea, succes: true };\n```\n\nSans generic, on perdrait le type precis (ou on devrait dupliquer la fonction pour chaque type). Le generic garde la coherence : si tu passes des `number`, tu recuperes un `number`.\n\n## Explique-le simplement (Feynman)\n\nTypeScript, c'est un correcteur d'orthographe pour les types : il te previent que tu mets une string la ou un number etait attendu, AVANT que ton programme tourne. Une interface est le formulaire a remplir, un union dit \"l'un de ces choix\", et un generic est un formulaire a trous qui s'adapte au type qu'on lui donne.",
      "playground": {
        "language": "javascript",
        "code": "// Simulation en JS de concepts TypeScript (le JS execute, les types sont retires a la transpilation)\n\n// Equivalent d'un union narrowing\nfunction afficherId(id) {\n  if (typeof id === \"string\") return id.toUpperCase();\n  return id.toFixed(2);\n}\nconsole.log(\"id string :\", afficherId(\"abc\"));\nconsole.log(\"id number :\", afficherId(3.14159));\n\n// Equivalent d'un generic : fonction qui garde le type d'entree\nfunction premier(tableau) { return tableau[0]; }\nconsole.log(\"premier nombre :\", premier([1, 2, 3]));\nconsole.log(\"premier texte  :\", premier([\"a\", \"b\"]));\n\n// Equivalent d'un enum string\nconst Role = { Admin: \"ADMIN\", User: \"USER\" };\nconsole.log(\"role :\", Role.Admin);\n\n// Objet respectant une 'interface' User\nconst lea = { nom: \"Lea\", age: 30 };\nconsole.log(\"user :\", `${lea.nom} (${lea.age})`);"
      },
      "quiz": [
        {
          "question": "A quel moment TypeScript verifie-t-il les types ?",
          "options": [
            "A l'execution dans le navigateur",
            "A la compilation (avant l'execution), puis les types sont retires",
            "Jamais, c'est purement decoratif",
            "Uniquement en production"
          ],
          "correctIndex": 1,
          "explanation": "TypeScript verifie les types a la compilation (transpilation). Le code genere est du JavaScript pur sans types : le navigateur n'execute jamais les annotations de type."
        },
        {
          "question": "Que signifie le type union string | number ?",
          "options": [
            "La valeur doit etre a la fois string et number",
            "La valeur peut etre soit une string, soit un number",
            "La valeur est forcement une string",
            "C'est une erreur de syntaxe"
          ],
          "correctIndex": 1,
          "explanation": "Le symbole | cree un type union : la valeur peut etre de l'un OU l'autre des types listes. Ici, string | number accepte une chaine ou un nombre."
        },
        {
          "question": "A quoi servent les generics (ex : function premier<T>(t: T[]): T) ?",
          "options": [
            "A interdire l'utilisation de types",
            "A ecrire du code reutilisable qui conserve l'information de type",
            "A convertir un type en any",
            "A creer des variables globales"
          ],
          "correctIndex": 1,
          "explanation": "Les generics permettent d'ecrire des fonctions/classes reutilisables avec plusieurs types tout en gardant la coherence : si on passe des number, on recupere un number, sans perdre le typage."
        }
      ]
    }
  ]
};
