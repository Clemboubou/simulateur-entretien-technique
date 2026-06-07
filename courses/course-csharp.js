window.COURSES = window.COURSES || {};
window.COURSES["csharp"] = {
 "id": "csharp",
 "title": "C# / .NET",
 "icon": "C#",
 "summary": "Un cours complet et pédagogique sur le langage C# et la plateforme .NET, de la syntaxe de base au C# moderne.",
 "chapters": [
  {
   "id": "intro-syntaxe",
   "title": "Introduction & syntaxe de base",
   "markdown": "## C'est quoi C# et .NET ?\n\n**C#** (prononcé *\"C Sharp\"*) est un langage de programmation créé par Microsoft en 2000. Il est **typé statiquement** (le compilateur vérifie les types avant l'exécution), **orienté objet**, et très répandu en entreprise (applications web, desktop, jeux avec Unity, API...).\n\n**.NET** est la *plateforme* sur laquelle tourne le C#. Pensez-y comme à un moteur de voiture : le C# est le langage dans lequel vous écrivez, .NET fournit le moteur (le runtime), les milliers de bibliothèques prêtes à l'emploi (la BCL, *Base Class Library*) et les outils. Aujourd'hui on utilise **.NET** tout court (anciennement *.NET Core*, multiplateforme : Windows, Linux, macOS).\n\n> Métaphore : C# est la langue que vous parlez, .NET est le pays avec ses routes, ses magasins et ses services déjà construits.\n\n## Comment un programme s'exécute\n\nLe code C# (`.cs`) est **compilé** en un langage intermédiaire (IL, *Intermediate Language*). Au moment de l'exécution, le **CLR** (*Common Language Runtime*) traduit cet IL en code machine (compilation **JIT**, *Just-In-Time*) et gère la mémoire automatiquement grâce au **garbage collector** (ramasse-miettes) : vous n'avez pas à libérer la mémoire à la main comme en C++.\n\n## Le premier programme\n\nTout programme classique a un point d'entrée : la méthode `Main`.\n\n```csharp\nusing System; // importe l'espace de noms System (Console, etc.)\n\nclass Program\n{\n    // Point d'entrée : le programme démarre ici\n    static void Main()\n    {\n        Console.WriteLine(\"Bonjour le monde !\");\n    }\n}\n```\n\n- `using System;` rend disponibles les types de l'espace de noms `System` (comme `Console`).\n- `class Program` : tout code vit dans une classe.\n- `static void Main()` : la méthode de démarrage. `static` = appartient à la classe, pas à un objet ; `void` = ne retourne rien.\n- `Console.WriteLine(...)` affiche une ligne dans la console.\n\n## Variables et types\n\nUne **variable** est une boîte étiquetée qui stocke une valeur. En C#, chaque variable a un **type**.\n\n```csharp\nint age = 30;            // entier\ndouble prix = 19.99;     // nombre à virgule\nbool estActif = true;    // booléen (vrai/faux)\nchar lettre = 'A';       // un seul caractère\nstring nom = \"Alice\";    // chaîne de caractères\n```\n\nLe mot-clé **`var`** laisse le compilateur **déduire** le type à partir de la valeur (mais le type reste fixe, ce n'est PAS du typage dynamique) :\n\n```csharp\nvar compteur = 0;        // compteur est un int\nvar message = \"Salut\";   // message est un string\n```\n\n### Les principaux types intégrés\n\n| Type | Description | Exemple |\n|------|-------------|---------|\n| `int` | entier 32 bits | `42` |\n| `long` | entier 64 bits | `9000000000L` |\n| `double` | décimal flottant | `3.14` |\n| `decimal` | décimal précis (argent) | `19.99m` |\n| `bool` | vrai ou faux | `true` |\n| `char` | un caractère | `'x'` |\n| `string` | texte | `\"hello\"` |\n\n> Pour les montants d'argent, on utilise **`decimal`** (suffixe `m`) et jamais `double`, car `double` introduit des erreurs d'arrondi.\n\n## Types valeur vs types référence : LA notion clé\n\nC'est l'un des points les plus importants à comprendre, et une question d'entretien classique.\n\n**Type valeur** (`int`, `double`, `bool`, `char`, les `struct`, les `enum`) : la variable **contient directement** la valeur. Quand vous l'affectez à une autre variable ou la passez à une méthode, une **copie** est faite. Stocké sur la *pile* (stack).\n\n**Type référence** (`string`, les classes, les tableaux, les collections) : la variable contient une **référence** (une adresse) vers un objet stocké ailleurs (sur le *tas*, le heap). Copier la variable copie l'adresse, pas l'objet : deux variables peuvent pointer le même objet.\n\n```csharp\n// Type valeur : copie indépendante\nint a = 5;\nint b = a;   // b est une copie\nb = 10;      // a vaut toujours 5\n\n// Type référence : même objet partagé\nint[] tab1 = { 1, 2, 3 };\nint[] tab2 = tab1;   // tab2 pointe le MÊME tableau\ntab2[0] = 99;        // tab1[0] vaut aussi 99 maintenant !\n```\n\n> Métaphore : un type valeur, c'est photocopier un document (chacun le sien). Un type référence, c'est partager un lien Google Doc (tout le monde modifie le même).\n\n### `null` et nullables\n\nUn type référence peut valoir **`null`** (\"rien\", aucune référence). Tenter d'utiliser un objet `null` lève une `NullReferenceException`. Pour autoriser un type valeur à être nul, on ajoute `?` : `int? x = null;`.\n\n## Opérateurs et conditions\n\n```csharp\nint x = 7;\nif (x % 2 == 0)\n    Console.WriteLine(\"pair\");\nelse\n    Console.WriteLine(\"impair\");\n\n// Opérateur ternaire : condition ? siVrai : siFaux\nstring parite = (x % 2 == 0) ? \"pair\" : \"impair\";\n```\n\nPrincipaux opérateurs : `+ - * / %` (arithmétique), `== != < > <= >=` (comparaison), `&& || !` (logique).\n\n## Boucles\n\n```csharp\n// for : quand on connaît le nombre d'itérations\nfor (int i = 0; i < 3; i++)\n    Console.WriteLine(i);   // 0, 1, 2\n\n// while : tant qu'une condition est vraie\nint n = 3;\nwhile (n > 0) { Console.WriteLine(n); n--; }\n\n// foreach : parcourir une collection\nforeach (var fruit in new[] { \"pomme\", \"poire\" })\n    Console.WriteLine(fruit);\n```\n\n## Méthodes\n\nUne **méthode** est un bloc de code réutilisable qui prend des paramètres et peut retourner une valeur.\n\n```csharp\n// retourne un int, prend deux int en paramètres\nint Additionner(int a, int b)\n{\n    return a + b;\n}\n```",
   "playground": {
    "language": "csharp",
    "code": "using System;\n\nclass Program\n{\n    static int Additionner(int a, int b)\n    {\n        return a + b;\n    }\n\n    static void Main()\n    {\n        // Variables et types\n        string nom = \"Alice\";\n        int age = 30;\n        double taille = 1.72;\n        Console.WriteLine($\"{nom}, {age} ans, {taille} m\");\n\n        // Type valeur : copie\n        int a = 5;\n        int b = a;\n        b = 10;\n        Console.WriteLine($\"Valeur -> a={a}, b={b}\"); // a=5, b=10\n\n        // Type reference : partage\n        int[] t1 = { 1, 2, 3 };\n        int[] t2 = t1;\n        t2[0] = 99;\n        Console.WriteLine($\"Reference -> t1[0]={t1[0]}\"); // 99 !\n\n        // Methode + boucle\n        for (int i = 1; i <= 3; i++)\n            Console.WriteLine($\"{i} + {i} = {Additionner(i, i)}\");\n    }\n}"
   },
   "quiz": [
    {
     "question": "Quelle est la différence entre un type valeur et un type référence ?",
     "options": [
      "Aucune, c'est juste une question de vocabulaire",
      "Un type valeur contient directement la donnée (copie à l'affectation), un type référence contient une adresse vers un objet partagé",
      "Un type valeur est toujours plus lent qu'un type référence",
      "Un type référence ne peut pas être null"
     ],
     "correctIndex": 1,
     "explanation": "Un type valeur (int, struct...) est copié lors d'une affectation : chaque variable est indépendante. Un type référence (classe, tableau...) stocke une adresse, donc plusieurs variables peuvent pointer le même objet et le modifier ensemble."
    },
    {
     "question": "Que fait le mot-clé `var` en C# ?",
     "options": [
      "Il rend la variable dynamique, son type peut changer à l'exécution",
      "Il déclare une variable globale",
      "Il laisse le compilateur déduire le type à partir de la valeur ; le type reste fixe",
      "Il déclare une constante"
     ],
     "correctIndex": 2,
     "explanation": "`var` est de l'inférence de type à la compilation. `var x = 0;` crée un `int`. Le type est figé : on ne peut pas réaffecter un string ensuite. Ce n'est PAS du typage dynamique."
    },
    {
     "question": "Quel type utiliser pour représenter un montant d'argent précis ?",
     "options": ["double", "float", "decimal", "int"],
     "correctIndex": 2,
     "explanation": "`decimal` (suffixe m, ex : 19.99m) évite les erreurs d'arrondi binaires de `double`/`float`. C'est le type recommandé pour les calculs financiers."
    }
   ]
  },
  {
   "id": "poo",
   "title": "Programmation orientée objet",
   "markdown": "## L'idée de la POO\n\nLa **programmation orientée objet** (POO) consiste à modéliser le monde sous forme d'**objets** qui regroupent des **données** (état) et des **comportements** (méthodes). Une **classe** est le plan de construction (le moule), un **objet** (ou *instance*) est un exemplaire concret fabriqué à partir de ce plan.\n\n> Métaphore : la classe `Voiture` est le plan de l'usine ; votre Clio dans le garage est un objet, une instance de `Voiture`.\n\n## Classes, champs et propriétés\n\n```csharp\nclass Personne\n{\n    // Propriété auto-implémentée (état accessible et contrôlé)\n    public string Nom { get; set; }\n    public int Age { get; set; }\n\n    // Constructeur : appelé à la création avec 'new'\n    public Personne(string nom, int age)\n    {\n        Nom = nom;\n        Age = age;\n    }\n\n    // Méthode : un comportement\n    public void SePresenter()\n    {\n        Console.WriteLine($\"Je m'appelle {Nom} et j'ai {Age} ans.\");\n    }\n}\n\n// Utilisation\nvar p = new Personne(\"Alice\", 30);\np.SePresenter();\n```\n\nUne **propriété** ressemble à un champ mais expose `get` (lecture) et `set` (écriture). On peut restreindre l'accès :\n\n```csharp\npublic string Nom { get; private set; } // lisible partout, modifiable seulement dans la classe\npublic int Age { get; init; }           // fixé une seule fois à la construction\n```\n\n## L'encapsulation\n\n**Encapsuler**, c'est cacher les détails internes et n'exposer que ce qui est nécessaire, via les modificateurs d'accès :\n\n| Modificateur | Visible depuis |\n|--------------|----------------|\n| `public` | partout |\n| `private` | seulement dans la classe (par défaut) |\n| `protected` | la classe et ses classes filles |\n| `internal` | le même assembly (projet) |\n\nGarder les champs `private` et exposer des propriétés permet de **contrôler** les valeurs :\n\n```csharp\nclass CompteBancaire\n{\n    private decimal _solde; // champ privé\n    public decimal Solde => _solde; // lecture seule (propriété calculée)\n\n    public void Deposer(decimal montant)\n    {\n        if (montant <= 0) throw new ArgumentException(\"Montant invalide\");\n        _solde += montant;\n    }\n}\n```\n\n## L'héritage\n\nL'**héritage** permet à une classe (fille) de réutiliser et spécialiser une classe (mère). On utilise `:`.\n\n```csharp\nclass Animal\n{\n    public string Nom { get; set; }\n    public virtual void Crier() => Console.WriteLine(\"...\"); // virtual = redéfinissable\n}\n\nclass Chien : Animal // Chien hérite d'Animal\n{\n    public override void Crier() => Console.WriteLine(\"Wouf !\"); // override = redéfinit\n}\n```\n\n- `virtual` marque une méthode comme **redéfinissable** dans les classes filles.\n- `override` **redéfinit** cette méthode dans la fille.\n- `base.Methode()` appelle la version de la classe mère.\n\n## Le polymorphisme\n\n**Polymorphisme** = \"plusieurs formes\". On manipule des objets via le type parent, mais c'est la version **réelle** (la classe fille) de la méthode qui s'exécute. Très puissant :\n\n```csharp\nList<Animal> animaux = new() { new Chien(), new Animal() };\nforeach (Animal a in animaux)\n    a.Crier(); // appelle la bonne version selon le type réel : \"Wouf !\" puis \"...\"\n```\n\n## Classes abstraites\n\nUne **classe abstraite** est un plan incomplet : on ne peut pas l'instancier directement. Elle peut imposer des méthodes **abstraites** (sans corps) que les filles DOIVENT implémenter.\n\n```csharp\nabstract class Forme\n{\n    public abstract double Aire(); // pas de corps : obligatoire à implémenter\n    public void Decrire() => Console.WriteLine($\"Aire = {Aire()}\");\n}\n\nclass Cercle : Forme\n{\n    public double Rayon { get; set; }\n    public override double Aire() => Math.PI * Rayon * Rayon;\n}\n```\n\n## Interfaces\n\nUne **interface** est un **contrat** : une liste de membres qu'une classe s'engage à fournir, sans dire comment. Une classe peut implémenter **plusieurs** interfaces (alors qu'elle n'hérite que d'une seule classe).\n\n```csharp\ninterface IVolant\n{\n    void Voler(); // pas de corps : juste le contrat\n}\n\nclass Oiseau : Animal, IVolant // hérite d'Animal ET respecte IVolant\n{\n    public void Voler() => Console.WriteLine(\"Je vole !\");\n}\n```\n\n### Classe abstraite vs interface\n\n| | Classe abstraite | Interface |\n|--|------------------|-----------|\n| Peut contenir du code ? | Oui (méthodes concrètes) | Surtout le contrat (méthodes par défaut possibles) |\n| Champs / état ? | Oui | Non |\n| Héritage multiple ? | Non (une seule mère) | Oui (plusieurs interfaces) |\n| Sert à... | partager du code commun entre classes proches | définir une capacité commune à des classes variées |\n\n> Règle simple : héritage = relation \"**est un**\" (un Chien *est un* Animal). Interface = capacité \"**sait faire**\" (un Oiseau *sait* voler).",
   "playground": {
    "language": "csharp",
    "code": "using System;\nusing System.Collections.Generic;\n\nabstract class Forme\n{\n    public abstract double Aire();\n    public void Decrire() => Console.WriteLine($\"{GetType().Name} -> aire = {Aire():0.00}\");\n}\n\nclass Cercle : Forme\n{\n    public double Rayon { get; set; }\n    public Cercle(double r) { Rayon = r; }\n    public override double Aire() => Math.PI * Rayon * Rayon;\n}\n\nclass Rectangle : Forme\n{\n    public double L { get; set; }\n    public double H { get; set; }\n    public Rectangle(double l, double h) { L = l; H = h; }\n    public override double Aire() => L * H;\n}\n\nclass Program\n{\n    static void Main()\n    {\n        // Polymorphisme : on manipule des Forme, chacune calcule SON aire\n        List<Forme> formes = new()\n        {\n            new Cercle(2),\n            new Rectangle(3, 4)\n        };\n\n        foreach (Forme f in formes)\n            f.Decrire();\n    }\n}"
   },
   "quiz": [
    {
     "question": "Quelle est la différence principale entre une classe abstraite et une interface ?",
     "options": [
      "Aucune, ce sont des synonymes",
      "Une classe abstraite peut contenir du code et de l'état mais n'autorise qu'un seul héritage ; une interface définit surtout un contrat et une classe peut en implémenter plusieurs",
      "Une interface peut être instanciée avec new, pas une classe abstraite",
      "Une classe abstraite ne peut pas avoir de méthodes"
     ],
     "correctIndex": 1,
     "explanation": "La classe abstraite sert à partager du code commun (relation 'est un'), mais une classe ne peut hériter que d'une seule classe. L'interface est un contrat (capacité 'sait faire') et une classe peut en implémenter plusieurs."
    },
    {
     "question": "Que permet le couple de mots-clés `virtual` / `override` ?",
     "options": [
      "Rendre une méthode privée",
      "Empêcher l'héritage",
      "Marquer une méthode comme redéfinissable (virtual) puis la redéfinir dans une classe fille (override), base du polymorphisme",
      "Rendre une méthode statique"
     ],
     "correctIndex": 2,
     "explanation": "`virtual` autorise la redéfinition dans une classe fille, `override` réalise cette redéfinition. Ainsi, via une référence du type parent, c'est la version du type réel qui s'exécute : c'est le polymorphisme."
    },
    {
     "question": "Pourquoi garder les champs `private` et exposer des propriétés ?",
     "options": [
      "Pour le respect de l'encapsulation : cacher l'état interne et contrôler/valider les accès",
      "Pour rendre le code plus lent",
      "Parce que les champs publics sont interdits par le compilateur",
      "Cela n'a aucun intérêt"
     ],
     "correctIndex": 0,
     "explanation": "L'encapsulation cache les détails internes. En passant par des propriétés/méthodes, on peut valider les valeurs (ex : refuser un montant négatif) et changer l'implémentation interne sans casser le code appelant."
    }
   ]
  },
  {
   "id": "collections-linq",
   "title": "Collections & LINQ",
   "markdown": "## Les collections\n\nUne **collection** stocke plusieurs valeurs. Le tableau (`int[]`) est la forme la plus basique mais sa taille est **fixe**. .NET fournit des collections plus souples dans `System.Collections.Generic`.\n\n### List<T> : la liste dynamique\n\n`List<T>` est la collection la plus utilisée. Le `<T>` est un **générique** : `T` est le type des éléments (`List<int>`, `List<Personne>`...). Sa taille s'adapte automatiquement.\n\n```csharp\nvar fruits = new List<string>();\nfruits.Add(\"pomme\");\nfruits.Add(\"poire\");\nfruits.Remove(\"pomme\");\nConsole.WriteLine(fruits.Count); // 1\nConsole.WriteLine(fruits[0]);    // accès par index\n```\n\n### Dictionary<TCle, TValeur> : clé → valeur\n\nUn **dictionnaire** associe une clé unique à une valeur (comme un annuaire : nom → numéro). Accès très rapide par clé.\n\n```csharp\nvar ages = new Dictionary<string, int>();\nages[\"Alice\"] = 30;\nages[\"Bob\"] = 25;\nConsole.WriteLine(ages[\"Alice\"]); // 30\n\nif (ages.TryGetValue(\"Bob\", out int age))\n    Console.WriteLine(age); // 25, sans risque d'exception\n```\n\n### Les principales collections\n\n| Type | Usage |\n|------|-------|\n| `List<T>` | liste ordonnée, accès par index, taille dynamique |\n| `Dictionary<K,V>` | association clé → valeur, recherche rapide |\n| `HashSet<T>` | ensemble de valeurs uniques (pas de doublon) |\n| `Queue<T>` | file (FIFO : premier entré, premier sorti) |\n| `Stack<T>` | pile (LIFO : dernier entré, premier sorti) |\n| `IEnumerable<T>` | abstraction \"quelque chose qu'on peut parcourir\" |\n\n## LINQ : interroger les données\n\n**LINQ** (*Language Integrated Query*) est une syntaxe élégante pour **filtrer, trier, transformer et agréger** des collections, directement dans le langage. C'est l'une des fonctionnalités les plus appréciées de C#.\n\nIl faut `using System.Linq;`. On chaîne des méthodes d'extension qui prennent souvent des **expressions lambda** (`x => ...`, des mini-fonctions).\n\n```csharp\nvar nombres = new List<int> { 5, 2, 8, 1, 9, 3 };\n\n// Filtrer (Where), trier (OrderBy), transformer (Select)\nvar resultat = nombres\n    .Where(n => n > 3)        // garde ceux > 3 : 5, 8, 9\n    .OrderBy(n => n)          // trie : 5, 8, 9\n    .Select(n => n * 10);     // transforme : 50, 80, 90\n```\n\n> Une **lambda** `n => n > 3` se lit : \"pour un n donné, renvoie vrai si n > 3\". C'est une fonction anonyme courte.\n\n### Les opérateurs LINQ les plus utiles\n\n| Méthode | Rôle | Exemple |\n|---------|------|---------|\n| `Where` | filtrer | `.Where(p => p.Age >= 18)` |\n| `Select` | transformer/projeter | `.Select(p => p.Nom)` |\n| `OrderBy` / `OrderByDescending` | trier | `.OrderBy(p => p.Age)` |\n| `First` / `FirstOrDefault` | premier élément (ou défaut) | `.FirstOrDefault(p => p.Nom == \"Bob\")` |\n| `Any` | au moins un correspond ? | `.Any(p => p.Age > 60)` |\n| `All` | tous correspondent ? | `.All(p => p.Age > 0)` |\n| `Count` | compter | `.Count(p => p.Actif)` |\n| `Sum` / `Average` / `Max` / `Min` | agréger | `.Sum(p => p.Salaire)` |\n| `GroupBy` | regrouper | `.GroupBy(p => p.Ville)` |\n| `ToList` | matérialiser en liste | `.ToList()` |\n\n### Exemple concret\n\n```csharp\nvar personnes = new List<Personne>\n{\n    new(\"Alice\", 30), new(\"Bob\", 17), new(\"Carla\", 45)\n};\n\n// Les noms des majeurs, triés par âge\nList<string> majeurs = personnes\n    .Where(p => p.Age >= 18)\n    .OrderBy(p => p.Age)\n    .Select(p => p.Nom)\n    .ToList();\n// -> [\"Alice\", \"Carla\"]\n```\n\n### Exécution différée\n\nPoint subtil et souvent demandé en entretien : LINQ utilise l'**exécution différée** (*lazy*). Une requête `Where(...).Select(...)` n'est **pas** exécutée tant qu'on ne la **parcourt pas** (foreach, `ToList()`, `Count()`...). Cela permet d'enchaîner les opérations efficacement, mais attention : si la source change entre la définition et l'énumération, le résultat reflète l'état au moment du parcours.\n\n## FirstOrDefault vs First\n\n- `First(...)` lève une exception si rien ne correspond.\n- `FirstOrDefault(...)` renvoie la valeur par défaut (`null` pour les objets, `0` pour les `int`) si rien ne correspond. Plus sûr quand l'absence est possible.",
   "playground": {
    "language": "csharp",
    "code": "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nrecord Personne(string Nom, int Age, string Ville);\n\nclass Program\n{\n    static void Main()\n    {\n        var personnes = new List<Personne>\n        {\n            new(\"Alice\", 30, \"Metz\"),\n            new(\"Bob\", 17, \"Nancy\"),\n            new(\"Carla\", 45, \"Metz\"),\n            new(\"David\", 22, \"Nancy\")\n        };\n\n        // Filtrer + trier + projeter\n        var majeurs = personnes\n            .Where(p => p.Age >= 18)\n            .OrderBy(p => p.Age)\n            .Select(p => p.Nom);\n        Console.WriteLine(\"Majeurs : \" + string.Join(\", \", majeurs));\n\n        // Agreger\n        Console.WriteLine($\"Age moyen : {personnes.Average(p => p.Age):0.0}\");\n        Console.WriteLine($\"Y a-t-il un mineur ? {personnes.Any(p => p.Age < 18)}\");\n\n        // Grouper par ville\n        foreach (var groupe in personnes.GroupBy(p => p.Ville))\n            Console.WriteLine($\"{groupe.Key} : {groupe.Count()} personne(s)\");\n    }\n}"
   },
   "quiz": [
    {
     "question": "Quelle méthode LINQ sert à FILTRER une collection selon une condition ?",
     "options": ["Select", "Where", "OrderBy", "Sum"],
     "correctIndex": 1,
     "explanation": "`Where(x => condition)` garde uniquement les éléments qui satisfont la condition. `Select` sert à transformer (projeter) les éléments, pas à filtrer."
    },
    {
     "question": "Quelle est la différence entre `First` et `FirstOrDefault` ?",
     "options": [
      "Aucune",
      "First trie d'abord la collection, pas FirstOrDefault",
      "First lève une exception si aucun élément ne correspond ; FirstOrDefault renvoie la valeur par défaut (null/0)",
      "FirstOrDefault est plus rapide car il ignore la condition"
     ],
     "correctIndex": 2,
     "explanation": "`First` jette une InvalidOperationException quand rien ne correspond. `FirstOrDefault` renvoie la valeur par défaut du type, ce qui est plus sûr lorsque l'absence d'élément est un cas normal."
    },
    {
     "question": "Qu'est-ce que l'exécution différée (lazy) en LINQ ?",
     "options": [
      "La requête s'exécute immédiatement à sa définition",
      "La requête n'est exécutée que lorsqu'on l'énumère (foreach, ToList, Count...)",
      "Cela rend toujours le code plus lent",
      "C'est une erreur de compilation"
     ],
     "correctIndex": 1,
     "explanation": "Les opérateurs comme Where/Select construisent une requête sans l'exécuter. Le calcul réel n'a lieu qu'au parcours (foreach) ou lors d'une matérialisation (ToList, Count, First...)."
    }
   ]
  },
  {
   "id": "exceptions",
   "title": "Gestion des exceptions & fiabilité",
   "markdown": "## Qu'est-ce qu'une exception ?\n\nUne **exception** est un événement anormal qui interrompt le déroulement normal du programme : division par zéro, fichier introuvable, accès à un objet `null`, conversion impossible... Quand une exception est **levée** (*thrown*) et n'est pas gérée, le programme **plante**.\n\n> Métaphore : conduire normalement, c'est le flux nominal. Une exception, c'est un obstacle soudain sur la route ; le `try/catch` est votre plan d'urgence pour ne pas finir dans le fossé.\n\n## try / catch / finally\n\n```csharp\ntry\n{\n    // code susceptible d'échouer\n    int x = int.Parse(\"abc\"); // lève une FormatException\n}\ncatch (FormatException ex)\n{\n    // exécuté SI une FormatException survient\n    Console.WriteLine($\"Format invalide : {ex.Message}\");\n}\nfinally\n{\n    // TOUJOURS exécuté (erreur ou non) : nettoyage\n    Console.WriteLine(\"Fin du traitement\");\n}\n```\n\n- **`try`** : le bloc surveillé.\n- **`catch`** : intercepte un type d'exception et permet de réagir. On peut enchaîner plusieurs `catch`, du plus spécifique au plus général.\n- **`finally`** : s'exécute **dans tous les cas** (succès, erreur, ou même `return`). Idéal pour libérer des ressources.\n\n```csharp\ntry { /* ... */ }\ncatch (DivideByZeroException) { Console.WriteLine(\"Division par zero\"); }\ncatch (Exception ex) { Console.WriteLine($\"Autre erreur : {ex.Message}\"); } // attrape-tout en dernier\n```\n\n## La hiérarchie des exceptions\n\nToutes les exceptions héritent de la classe `System.Exception`. Les plus courantes :\n\n| Exception | Cause typique |\n|-----------|---------------|\n| `NullReferenceException` | utiliser un objet `null` |\n| `ArgumentException` / `ArgumentNullException` | argument invalide passé à une méthode |\n| `FormatException` | conversion de texte impossible (`int.Parse(\"abc\")`) |\n| `IndexOutOfRangeException` | index hors des bornes d'un tableau |\n| `InvalidOperationException` | opération non valide dans l'état actuel |\n| `DivideByZeroException` | division entière par zéro |\n\n## Lever ses propres exceptions\n\nOn utilise `throw` pour signaler une erreur. Validez les entrées tôt :\n\n```csharp\nvoid Deposer(decimal montant)\n{\n    if (montant <= 0)\n        throw new ArgumentException(\"Le montant doit être positif.\", nameof(montant));\n    // ...\n}\n```\n\nPour des erreurs métier, on peut créer ses propres classes :\n\n```csharp\nclass SoldeInsuffisantException : Exception\n{\n    public SoldeInsuffisantException(string message) : base(message) { }\n}\n```\n\n## using et IDisposable : libérer les ressources\n\nCertains objets (fichiers, connexions réseau, connexions base de données) détiennent des ressources qu'il faut **libérer**. Ils implémentent `IDisposable`. Le mot-clé **`using`** garantit l'appel de `Dispose()` même en cas d'exception :\n\n```csharp\nusing (var lecteur = new StreamReader(\"fichier.txt\"))\n{\n    string contenu = lecteur.ReadToEnd();\n    Console.WriteLine(contenu);\n} // Dispose() appelé automatiquement ici, même si une exception survient\n\n// Syntaxe moderne (using declaration) : libéré en fin de portée\nusing var lecteur2 = new StreamReader(\"autre.txt\");\n```\n\n## Bonnes pratiques de fiabilité\n\n- **N'attrapez que ce que vous savez traiter.** Un `catch (Exception)` qui avale tout en silence masque les bugs.\n- **Ne pas utiliser les exceptions pour le flux normal** (ex : tester si une clé existe avec `TryGetValue` plutôt que d'attraper une exception).\n- **Préférez `int.TryParse`** à `int.Parse` quand l'échec est probable : il renvoie `false` au lieu de lever.\n\n```csharp\nif (int.TryParse(saisie, out int valeur))\n    Console.WriteLine($\"OK : {valeur}\");\nelse\n    Console.WriteLine(\"Saisie invalide\");\n```\n\n- **Relancer correctement** : utilisez `throw;` (sans argument) pour préserver la pile d'appels d'origine ; `throw ex;` l'écrase et complique le débogage.\n- **Logguez** l'exception (message + `StackTrace`) avant de la masquer.",
   "playground": {
    "language": "csharp",
    "code": "using System;\n\nclass Program\n{\n    static decimal Diviser(int a, int b)\n    {\n        if (b == 0)\n            throw new DivideByZeroException(\"Division par zero interdite !\");\n        return (decimal)a / b;\n    }\n\n    static void Main()\n    {\n        int[] diviseurs = { 2, 0, 5 };\n\n        foreach (int d in diviseurs)\n        {\n            try\n            {\n                Console.WriteLine($\"10 / {d} = {Diviser(10, d)}\");\n            }\n            catch (DivideByZeroException ex)\n            {\n                Console.WriteLine($\"Erreur : {ex.Message}\");\n            }\n            finally\n            {\n                Console.WriteLine(\"-> tentative terminee\");\n            }\n        }\n\n        // TryParse : pas d'exception, on teste le succes\n        string saisie = \"42x\";\n        if (int.TryParse(saisie, out int n))\n            Console.WriteLine($\"Nombre : {n}\");\n        else\n            Console.WriteLine($\"'{saisie}' n'est pas un entier valide\");\n    }\n}"
   },
   "quiz": [
    {
     "question": "À quoi sert le bloc `finally` ?",
     "options": [
      "Il s'exécute uniquement si aucune exception n'a eu lieu",
      "Il s'exécute uniquement en cas d'exception",
      "Il s'exécute dans TOUS les cas (succès ou erreur), idéal pour le nettoyage des ressources",
      "Il relance automatiquement l'exception"
     ],
     "correctIndex": 2,
     "explanation": "Le bloc `finally` s'exécute toujours, qu'il y ait eu une exception ou non (et même après un return), ce qui en fait l'endroit idéal pour libérer des ressources."
    },
    {
     "question": "Pourquoi préférer `int.TryParse` à `int.Parse` dans certains cas ?",
     "options": [
      "TryParse est toujours plus rapide",
      "TryParse renvoie un booléen (succès/échec) au lieu de lever une exception, ce qui évite d'utiliser les exceptions pour un flux prévisible",
      "Parse n'existe pas en C#",
      "TryParse accepte n'importe quel texte sans erreur de logique"
     ],
     "correctIndex": 1,
     "explanation": "Quand une saisie invalide est un cas normal, TryParse (qui renvoie false et la valeur via out) évite le coût et la lourdeur d'une exception. On ne doit pas utiliser les exceptions pour gérer un flux attendu."
    },
    {
     "question": "Pour relancer une exception en préservant la pile d'appels d'origine, on écrit :",
     "options": ["throw ex;", "throw;", "return ex;", "rethrow ex;"],
     "correctIndex": 1,
     "explanation": "`throw;` (sans argument) relance l'exception courante en conservant sa StackTrace d'origine. `throw ex;` réinitialise la pile et masque l'endroit réel de l'erreur."
    }
   ]
  },
  {
   "id": "async-await",
   "title": "Programmation asynchrone (async/await)",
   "markdown": "## Le problème : ne pas bloquer\n\nCertaines opérations sont **longues** : appel réseau (API HTTP), lecture de fichier, requête base de données. Si on les exécute de façon **synchrone**, le thread reste **bloqué** à attendre — l'interface se fige, ou le serveur ne peut plus traiter d'autres requêtes.\n\nLa **programmation asynchrone** permet de **libérer le thread** pendant l'attente, pour qu'il fasse autre chose, puis de reprendre quand le résultat est prêt.\n\n> Métaphore : au restaurant, le serveur (le thread) ne reste pas planté devant la cuisine en attendant votre plat. Il prend les commandes des autres tables, et revient quand votre plat est prêt. C'est l'asynchrone.\n\n## Task : une promesse de résultat\n\nUn **`Task`** représente une opération en cours qui se terminera plus tard. \n\n- `Task` : opération asynchrone qui ne renvoie **rien**.\n- `Task<T>` : opération asynchrone qui renverra une valeur de type `T`.\n\n## async et await\n\n- **`async`** marque une méthode comme asynchrone (elle peut contenir des `await`).\n- **`await`** \"attend\" la fin d'un `Task` **sans bloquer le thread** : il rend la main, et le code reprend après la ligne `await` une fois le résultat disponible.\n\n```csharp\nasync Task<string> TelechargerAsync(string url)\n{\n    using var client = new HttpClient();\n    // await libère le thread pendant l'appel réseau\n    string contenu = await client.GetStringAsync(url);\n    return contenu;\n}\n\n// Appel\nstring html = await TelechargerAsync(\"https://example.com\");\n```\n\nUne méthode `async` renvoie typiquement `Task` ou `Task<T>`. **Convention** : on suffixe son nom par `Async` (`LireFichierAsync`).\n\n## Le déroulement étape par étape\n\n```csharp\nasync Task ExempleAsync()\n{\n    Console.WriteLine(\"1. Avant l'attente\");\n    await Task.Delay(1000); // simule une opération longue de 1s, sans bloquer\n    Console.WriteLine(\"2. Apres l'attente (1s plus tard)\");\n}\n```\n\nAu `await Task.Delay(...)`, la méthode **rend la main** à l'appelant ; le thread est libre. Quand le délai est écoulé, l'exécution **reprend** à la ligne suivante.\n\n## Exécuter plusieurs tâches en parallèle\n\nGros avantage : lancer plusieurs opérations **en même temps** et attendre qu'elles finissent toutes avec `Task.WhenAll`.\n\n```csharp\nTask<string> t1 = TelechargerAsync(\"https://a.com\");\nTask<string> t2 = TelechargerAsync(\"https://b.com\");\n\n// Les deux téléchargements tournent en parallèle\nstring[] resultats = await Task.WhenAll(t1, t2);\n```\n\nSi on faisait `await t1;` puis `await t2;` ils s'exécuteraient l'un **après** l'autre (séquentiel, plus lent).\n\n## Erreurs à éviter\n\n- **`async void`** : à éviter sauf pour les gestionnaires d'événements. Les exceptions y sont difficiles à attraper. Préférez `async Task`.\n- **Ne pas bloquer avec `.Result` ou `.Wait()`** sur un `Task` : cela peut provoquer un **interblocage** (*deadlock*) et annule tout l'intérêt de l'asynchrone. Restez `async` de bout en bout (\"async all the way\").\n- **Propagation des exceptions** : une exception levée dans une méthode `async Task` est capturée dans le `Task` et relancée au moment du `await`. On l'entoure donc d'un `try/catch` autour du `await`.\n\n```csharp\ntry\n{\n    await TelechargerAsync(\"https://url-invalide\");\n}\ncatch (HttpRequestException ex)\n{\n    Console.WriteLine($\"Echec reseau : {ex.Message}\");\n}\n```\n\n## Async n'est pas multithreading\n\nPoint subtil : `async/await` ne crée **pas** forcément de nouveaux threads. Pour les opérations d'**entrée/sortie** (réseau, disque), aucun thread n'attend : le système notifie quand c'est prêt. C'est différent de `Task.Run(...)` qui, lui, exécute du **calcul** sur un thread du pool. L'asynchrone optimise surtout l'attente d'I/O.",
   "playground": {
    "language": "csharp",
    "code": "using System;\nusing System.Diagnostics;\nusing System.Threading.Tasks;\n\nclass Program\n{\n    // Simule une operation longue (ex: appel reseau)\n    static async Task<string> TelechargerAsync(string nom, int ms)\n    {\n        await Task.Delay(ms); // attend sans bloquer le thread\n        return $\"{nom} pret (en {ms} ms)\";\n    }\n\n    static async Task Main()\n    {\n        var chrono = Stopwatch.StartNew();\n\n        // Sequentiel : on attend chaque tache l'une apres l'autre\n        Console.WriteLine(await TelechargerAsync(\"A\", 300));\n        Console.WriteLine(await TelechargerAsync(\"B\", 300));\n        Console.WriteLine($\"Sequentiel : {chrono.ElapsedMilliseconds} ms\\n\");\n\n        // Parallele : les deux taches tournent en meme temps\n        chrono.Restart();\n        var t1 = TelechargerAsync(\"C\", 300);\n        var t2 = TelechargerAsync(\"D\", 300);\n        string[] res = await Task.WhenAll(t1, t2);\n        foreach (var r in res) Console.WriteLine(r);\n        Console.WriteLine($\"Parallele : {chrono.ElapsedMilliseconds} ms\");\n    }\n}"
   },
   "quiz": [
    {
     "question": "Que fait le mot-clé `await` ?",
     "options": [
      "Il bloque complètement le thread jusqu'à la fin de la tâche",
      "Il attend la fin d'un Task sans bloquer le thread, qui peut faire autre chose pendant l'attente",
      "Il lance un nouveau thread systématiquement",
      "Il annule la tâche"
     ],
     "correctIndex": 1,
     "explanation": "`await` suspend la méthode et rend la main à l'appelant, libérant le thread pendant l'attente. L'exécution reprend après le await une fois le résultat disponible, sans blocage."
    },
    {
     "question": "Comment exécuter deux tâches asynchrones EN PARALLÈLE et attendre les deux ?",
     "options": [
      "await t1; puis await t2;",
      "Lancer les deux Task puis await Task.WhenAll(t1, t2);",
      "t1.Result; t2.Result;",
      "C'est impossible en C#"
     ],
     "correctIndex": 1,
     "explanation": "En démarrant les deux Task d'abord puis en faisant `await Task.WhenAll(...)`, elles tournent simultanément. Faire `await t1;` puis `await t2;` les exécute séquentiellement, c'est plus lent."
    },
    {
     "question": "Pourquoi éviter `.Result` ou `.Wait()` sur un Task dans du code async ?",
     "options": [
      "Cela accélère trop le programme",
      "Cela bloque le thread et peut provoquer un interblocage (deadlock) ; il faut rester async de bout en bout",
      "Ces méthodes n'existent pas",
      "Cela retourne toujours null"
     ],
     "correctIndex": 1,
     "explanation": "Bloquer un Task avec .Result/.Wait() fige le thread et peut causer un deadlock dans certains contextes. La bonne pratique est 'async all the way' : utiliser await jusqu'en haut de la pile d'appels."
    }
   ]
  },
  {
   "id": "csharp-moderne",
   "title": "C# moderne : records, pattern matching, nullable",
   "markdown": "## Pourquoi du C# \"moderne\" ?\n\nLes versions récentes de C# (8 à 12+) ont ajouté des fonctionnalités qui rendent le code plus **court**, plus **sûr** et plus **expressif**. Les connaître est un vrai plus en entretien junior. Voici les incontournables.\n\n## Les records : des objets de données immuables\n\nUn **record** est un type de référence conçu pour **transporter des données**. Comparé à une classe classique, il offre gratuitement : l'**égalité par valeur**, un affichage lisible, et des objets **immuables** (non modifiables après création).\n\n```csharp\n// Une seule ligne ! Nom et Age deviennent des propriétés init-only\npublic record Personne(string Nom, int Age);\n\nvar a = new Personne(\"Alice\", 30);\nvar b = new Personne(\"Alice\", 30);\nConsole.WriteLine(a == b); // True ! égalité par VALEUR (pas par référence)\nConsole.WriteLine(a);      // Personne { Nom = Alice, Age = 30 }\n```\n\n### `with` : copier en modifiant\n\nComme un record est immuable, on crée une **copie modifiée** avec `with` :\n\n```csharp\nvar c = a with { Age = 31 }; // copie de a avec Age changé ; a reste inchangé\n```\n\n> Une **classe** classique compare par référence (deux objets distincts ne sont pas égaux même avec les mêmes valeurs). Un **record** compare par valeur. C'est la différence clé à retenir.\n\n## Pattern matching et switch expressions\n\nLe **pattern matching** permet de tester la forme/le type d'une valeur de façon concise.\n\n```csharp\nobject valeur = 42;\nif (valeur is int n && n > 10)\n    Console.WriteLine($\"Entier > 10 : {n}\"); // teste le type ET capture dans n\n```\n\nLa **switch expression** est une version compacte et qui **renvoie une valeur** (contrairement au switch classique) :\n\n```csharp\nstring Categoriser(int age) => age switch\n{\n    < 0   => \"invalide\",\n    < 18  => \"mineur\",\n    < 65  => \"adulte\",\n    _     => \"senior\"   // _ = cas par défaut\n};\n```\n\nOn peut même filtrer par type :\n\n```csharp\nstring Decrire(object o) => o switch\n{\n    int i      => $\"entier {i}\",\n    string s   => $\"texte de {s.Length} caracteres\",\n    null       => \"rien\",\n    _          => \"inconnu\"\n};\n```\n\n## Les types nullables référence (NRT)\n\nLa redoutée `NullReferenceException` est l'erreur la plus fréquente en .NET. Depuis C# 8, on peut activer les **nullable reference types** pour que le compilateur **avertisse** des `null` potentiels.\n\nLe principe : un type référence est désormais **non-null par défaut**, et on signale explicitement avec `?` qu'une variable peut être `null`.\n\n```csharp\nstring nom = null;     // AVERTISSEMENT : non nullable\nstring? surnom = null; // OK : explicitement nullable\n\n// Le compilateur force à vérifier avant d'utiliser\nif (surnom != null)\n    Console.WriteLine(surnom.Length);\n```\n\n### Opérateurs liés à null\n\n| Opérateur | Rôle | Exemple |\n|-----------|------|---------|\n| `?.` | accès conditionnel : `null` si l'objet est `null` | `personne?.Nom` |\n| `??` | valeur par défaut si à gauche c'est `null` | `nom ?? \"Inconnu\"` |\n| `??=` | affecte seulement si actuellement `null` | `nom ??= \"Defaut\"` |\n| `!` | \"null-forgiving\" : j'assure que ce n'est pas null | `valeur!` |\n\n```csharp\nstring? entree = null;\nint longueur = entree?.Length ?? 0; // si entree null -> 0, sinon sa longueur\n```\n\n## Autres sucres syntaxiques utiles\n\n**Interpolation de chaînes** (`$\"...\"`) : insérer des variables dans du texte.\n\n```csharp\nstring s = $\"Bonjour {nom}, tu as {age} ans\";\n```\n\n**Membres en expression** (`=>`) : pour les méthodes/propriétés courtes.\n\n```csharp\npublic double Aire => Math.PI * Rayon * Rayon;\npublic void Saluer() => Console.WriteLine(\"Salut\");\n```\n\n**Top-level statements** : depuis C# 9, un petit programme peut se passer de `class Program`/`Main` :\n\n```csharp\n// Program.cs entier\nConsole.WriteLine(\"Bonjour sans Main !\");\n```\n\n**Target-typed new** : éviter de répéter le type.\n\n```csharp\nList<int> nombres = new(); // au lieu de new List<int>()\n```",
   "playground": {
    "language": "csharp",
    "code": "using System;\n\n// Record : egalite par valeur + immuable\nrecord Produit(string Nom, decimal Prix);\n\nclass Program\n{\n    // switch expression avec pattern matching\n    static string Categoriser(decimal prix) => prix switch\n    {\n        < 0     => \"invalide\",\n        < 10    => \"bon marche\",\n        < 100   => \"moyen\",\n        _       => \"cher\"\n    };\n\n    static void Main()\n    {\n        var a = new Produit(\"Cafe\", 8.50m);\n        var b = new Produit(\"Cafe\", 8.50m);\n        Console.WriteLine($\"Egalite par valeur : {a == b}\"); // True\n        Console.WriteLine(a); // Produit { Nom = Cafe, Prix = 8.50 }\n\n        // copie modifiee avec 'with'\n        var c = a with { Prix = 12m };\n        Console.WriteLine($\"{c.Nom} -> {Categoriser(c.Prix)}\");\n\n        // Operateurs null\n        string? remarque = null;\n        Console.WriteLine(\"Remarque : \" + (remarque ?? \"(aucune)\"));\n        Console.WriteLine($\"Longueur : {remarque?.Length ?? 0}\");\n    }\n}"
   },
   "quiz": [
    {
     "question": "Quelle est la particularité d'un `record` par rapport à une `class` classique ?",
     "options": [
      "Un record ne peut pas avoir de propriétés",
      "Un record compare par valeur (deux records avec les mêmes données sont égaux) et est conçu pour des données immuables",
      "Un record est plus rapide à l'exécution dans tous les cas",
      "Un record ne peut pas être instancié avec new"
     ],
     "correctIndex": 1,
     "explanation": "Le record fournit l'égalité par valeur (a == b est vrai si les valeurs sont identiques), un ToString lisible et l'immuabilité, là où une classe compare par référence. On copie en modifiant avec 'with'."
    },
    {
     "question": "Que renvoie `entree?.Length ?? 0` si `entree` vaut null ?",
     "options": ["Une NullReferenceException", "0", "null", "-1"],
     "correctIndex": 1,
     "explanation": "L'opérateur `?.` renvoie null au lieu de planter quand entree est null, puis `??` remplace ce null par 0. Combinés, ils donnent une valeur de repli sûre."
    },
    {
     "question": "À quoi servent les nullable reference types (string? activé) ?",
     "options": [
      "À rendre tous les objets nullables sans contrôle",
      "À faire avertir le compilateur des null potentiels : les types référence sont non-null par défaut, et `?` indique explicitement qu'un null est possible",
      "À supprimer complètement la classe NullReferenceException du langage",
      "À convertir les types valeur en types référence"
     ],
     "correctIndex": 1,
     "explanation": "Avec les NRT activés, un type référence est non-null par défaut et le compilateur signale les usages risqués. On marque `?` quand null est attendu, ce qui réduit fortement les NullReferenceException."
    }
   ]
  }
 ]
};
