window.COURSES = window.COURSES || {};
window.COURSES["java"] = {
  "id": "java",
  "title": "Java",
  "icon": "JV",
  "summary": "Cours complet Java pour passer de débutant à junior : bases du langage, programmation orientée objet, collections et generics, gestion des exceptions, streams et lambdas, puis les fonctionnalités du Java moderne (records, var, switch expressions, equals/hashCode).",
  "chapters": [
    {
      "id": "bases",
      "title": "1. Les bases du langage",
      "markdown": "# Les bases de Java\n\nJava est un langage **compilé** et **fortement typé**. Ton code source (`.java`) est d'abord transformé par le compilateur (`javac`) en **bytecode** (`.class`), puis exécuté par la **JVM** (Java Virtual Machine). C'est ce qui rend Java portable : *write once, run anywhere*.\n\n## Structure minimale d'un programme\n\nTout code Java vit dans une **classe**. Le point d'entrée d'un programme est la méthode `main` :\n\n```java\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Bonjour Java !\");\n    }\n}\n```\n\n- `public class HelloWorld` : la classe doit avoir le même nom que le fichier (`HelloWorld.java`).\n- `public static void main(String[] args)` : signature exacte attendue par la JVM. `static` = pas besoin de créer un objet, `void` = ne retourne rien, `String[] args` = arguments de la ligne de commande.\n- `System.out.println(...)` : affiche une ligne sur la sortie standard. `print` n'ajoute pas de retour à la ligne, `println` oui.\n\n## Les types primitifs\n\nJava distingue les **types primitifs** (valeurs brutes, en minuscule) des **objets** (en majuscule). Il y a 8 types primitifs :\n\n| Type | Taille | Exemple | Usage |\n|------|--------|---------|-------|\n| `byte` | 8 bits | `byte b = 100;` | très petits entiers |\n| `short` | 16 bits | `short s = 30000;` | petits entiers |\n| `int` | 32 bits | `int age = 30;` | entier par défaut |\n| `long` | 64 bits | `long pop = 8_000_000_000L;` | grands entiers (suffixe `L`) |\n| `float` | 32 bits | `float f = 3.14f;` | décimal (suffixe `f`) |\n| `double` | 64 bits | `double pi = 3.14159;` | décimal par défaut |\n| `char` | 16 bits | `char c = 'A';` | un caractère (quotes simples) |\n| `boolean` | 1 bit | `boolean ok = true;` | vrai/faux |\n\n```java\nint quantite = 5;\ndouble prix = 19.99;\nboolean enStock = true;\nchar initiale = 'M';\n```\n\nLe `String` (chaîne de caractères) n'est **pas** un primitif : c'est un objet, écrit avec des guillemets doubles `\"...\"`.\n\n## Variables et constantes\n\n```java\nint compteur = 0;           // variable modifiable\nfinal double TVA = 0.20;    // constante : final empêche la réaffectation\n```\n\nLe mot-clé `final` rend une variable **immuable** (sa valeur ne peut plus changer après affectation). Par convention, les constantes s'écrivent en MAJUSCULES.\n\n## Opérateurs et structures de contrôle\n\n```java\nint a = 10, b = 3;\nint somme = a + b;       // 13\nint reste = a % b;       // 1 (modulo)\n\n// Condition\nif (a > b) {\n    System.out.println(\"a est plus grand\");\n} else {\n    System.out.println(\"b est plus grand ou egal\");\n}\n\n// Boucle for\nfor (int i = 0; i < 3; i++) {\n    System.out.println(\"Iteration \" + i);\n}\n\n// Boucle while\nint n = 0;\nwhile (n < 3) {\n    n++;\n}\n```\n\nLe `+` sur des chaînes fait de la **concaténation** : `\"Iteration \" + i` colle le texte et le nombre.\n\n## Lire un nombre dans une variable\n\nJava convertit automatiquement un `int` vers un `double` (élargissement) mais pas l'inverse sans **cast** explicite :\n\n```java\nint entier = 7;\ndouble d = entier;          // OK, conversion implicite\nint tronque = (int) 9.99;   // cast explicite -> 9 (partie entière)\n```\n\n## Ce qu'il faut retenir\n\n- Tout vit dans une classe, le programme démarre dans `main`.\n- 8 types primitifs ; `String` est un objet.\n- `final` = constante. Les casts vers un type plus petit sont explicites.\n- `System.out.println` pour afficher.",
      "playground": {
        "language": "java",
        "code": "class Main {\n    public static void main(String[] args) {\n        int quantite = 5;\n        double prix = 19.99;\n        final double TVA = 0.20;\n\n        double totalHT = quantite * prix;\n        double totalTTC = totalHT * (1 + TVA);\n\n        System.out.println(\"Quantite : \" + quantite);\n        System.out.println(\"Total HT  : \" + totalHT + \" EUR\");\n        System.out.println(\"Total TTC : \" + totalTTC + \" EUR\");\n\n        for (int i = 1; i <= quantite; i++) {\n            System.out.println(\"Article \" + i + \" ajoute au panier\");\n        }\n    }\n}"
      },
      "quiz": [
        {
          "question": "Quelle est la signature exacte du point d'entrée d'un programme Java ?",
          "options": [
            "public void main(String args)",
            "public static void main(String[] args)",
            "static int main(String[] args)",
            "public main(String... args) void"
          ],
          "correctIndex": 1,
          "explanation": "La JVM cherche exactement public static void main(String[] args). static permet de l'appeler sans instancier la classe, void car elle ne retourne rien."
        },
        {
          "question": "Lequel de ces éléments n'est PAS un type primitif en Java ?",
          "options": [
            "int",
            "boolean",
            "String",
            "double"
          ],
          "correctIndex": 2,
          "explanation": "String est un objet (classe), pas un type primitif. Les 8 primitifs sont byte, short, int, long, float, double, char et boolean."
        },
        {
          "question": "Que fait le mot-clé final devant une variable ?",
          "options": [
            "Il rend la variable globale",
            "Il empêche sa réaffectation (constante)",
            "Il la rend statique",
            "Il l'initialise à zéro"
          ],
          "correctIndex": 1,
          "explanation": "final interdit de réaffecter la variable après sa première affectation : elle devient une constante."
        }
      ]
    },
    {
      "id": "poo",
      "title": "2. Programmation orientée objet",
      "markdown": "# La POO en Java\n\nJava est un langage **orienté objet** : on modélise le monde avec des **classes** (les plans) et des **objets** (les instances créées à partir du plan).\n\n## Classe, attributs, constructeur\n\n```java\npublic class Compte {\n    private String titulaire;   // attribut (encapsulé)\n    private double solde;\n\n    // Constructeur : initialise un nouvel objet\n    public Compte(String titulaire, double soldeInitial) {\n        this.titulaire = titulaire;\n        this.solde = soldeInitial;\n    }\n\n    // Méthode\n    public void deposer(double montant) {\n        this.solde += montant;\n    }\n\n    // Getter\n    public double getSolde() {\n        return this.solde;\n    }\n}\n```\n\n- `private` cache l'attribut : c'est l'**encapsulation**. On y accède via des méthodes publiques (getters/setters).\n- `this` désigne l'objet courant.\n- On crée un objet avec `new` : `Compte c = new Compte(\"Alice\", 100.0);`\n\n## L'héritage\n\nUne classe peut **hériter** d'une autre avec `extends` : elle récupère ses attributs et méthodes, et peut en ajouter ou en **redéfinir** (`@Override`).\n\n```java\npublic class CompteEpargne extends Compte {\n    private double tauxInteret;\n\n    public CompteEpargne(String titulaire, double solde, double taux) {\n        super(titulaire, solde);  // appelle le constructeur parent\n        this.tauxInteret = taux;\n    }\n\n    public void appliquerInterets() {\n        deposer(getSolde() * tauxInteret);\n    }\n}\n```\n\n`super(...)` appelle le constructeur de la classe parente. Java n'autorise **qu'un seul** parent (pas d'héritage multiple de classes).\n\n## Classes abstraites\n\nUne classe **abstraite** ne peut pas être instanciée directement ; elle sert de base commune et peut contenir des méthodes **abstraites** (sans corps) que les sous-classes doivent implémenter.\n\n```java\npublic abstract class Animal {\n    public abstract String crier();   // pas de corps\n\n    public void presenter() {         // méthode concrète partagée\n        System.out.println(\"Je dis : \" + crier());\n    }\n}\n\npublic class Chien extends Animal {\n    @Override\n    public String crier() { return \"Wouf\"; }\n}\n```\n\n## Les interfaces\n\nUne **interface** est un contrat : une liste de méthodes qu'une classe s'engage à fournir. Une classe peut implémenter **plusieurs** interfaces (`implements`), ce qui contourne l'absence d'héritage multiple.\n\n```java\npublic interface Volant {\n    void voler();   // implicitement public abstract\n}\n\npublic interface Nageur {\n    void nager();\n}\n\npublic class Canard extends Animal implements Volant, Nageur {\n    @Override public String crier() { return \"Coin\"; }\n    @Override public void voler() { System.out.println(\"Je vole\"); }\n    @Override public void nager() { System.out.println(\"Je nage\"); }\n}\n```\n\nDepuis Java 8, une interface peut avoir des méthodes `default` (avec corps).\n\n## Le polymorphisme\n\nLe **polymorphisme** permet de manipuler un objet via le type de son parent ou d'une interface, et d'appeler la version réelle à l'exécution :\n\n```java\nAnimal a = new Chien();   // un Chien vu comme un Animal\na.presenter();            // affiche \"Je dis : Wouf\"\n```\n\nMême si la variable est de type `Animal`, c'est la méthode `crier()` de `Chien` qui s'exécute. C'est le cœur de la flexibilité en POO.\n\n## Les 4 piliers de la POO\n\n1. **Encapsulation** : cacher l'état interne (`private`).\n2. **Héritage** : réutiliser via `extends`.\n3. **Polymorphisme** : un même appel, plusieurs comportements.\n4. **Abstraction** : exposer l'essentiel via classes abstraites et interfaces.",
      "playground": {
        "language": "java",
        "code": "class Main {\n    public static void main(String[] args) {\n        Animal[] zoo = { new Chien(), new Chat() };\n        for (Animal a : zoo) {\n            a.presenter();   // polymorphisme : chaque animal crie a sa facon\n        }\n    }\n}\n\nabstract class Animal {\n    public abstract String crier();\n    public void presenter() {\n        System.out.println(getClass().getSimpleName() + \" dit : \" + crier());\n    }\n}\n\nclass Chien extends Animal {\n    public String crier() { return \"Wouf\"; }\n}\n\nclass Chat extends Animal {\n    public String crier() { return \"Miaou\"; }\n}"
      },
      "quiz": [
        {
          "question": "À quoi sert le mot-clé super dans un constructeur ?",
          "options": [
            "À créer un objet statique",
            "À appeler le constructeur de la classe parente",
            "À rendre une méthode abstraite",
            "À implémenter une interface"
          ],
          "correctIndex": 1,
          "explanation": "super(...) invoque le constructeur de la classe parente pour initialiser la partie héritée de l'objet."
        },
        {
          "question": "Quelle affirmation est vraie en Java ?",
          "options": [
            "Une classe peut hériter de plusieurs classes",
            "Une classe peut implémenter plusieurs interfaces",
            "Une interface ne peut jamais avoir de méthode avec corps",
            "Une classe abstraite peut être instanciée avec new"
          ],
          "correctIndex": 1,
          "explanation": "Java interdit l'héritage multiple de classes mais autorise l'implémentation de plusieurs interfaces. Depuis Java 8, les interfaces peuvent avoir des méthodes default avec corps."
        },
        {
          "question": "Avec Animal a = new Chien(); a.crier(); quelle méthode s'exécute ?",
          "options": [
            "Celle d'Animal car la variable est de type Animal",
            "Aucune, le code ne compile pas",
            "Celle de Chien car c'est le type réel de l'objet",
            "Les deux successivement"
          ],
          "correctIndex": 2,
          "explanation": "C'est le polymorphisme : la méthode appelée dépend du type réel de l'objet à l'exécution (Chien), pas du type de la variable."
        }
      ]
    },
    {
      "id": "collections",
      "title": "3. Collections et Generics",
      "markdown": "# Collections et Generics\n\nLes **collections** sont des structures de données dynamiques du *Java Collections Framework* (package `java.util`). Contrairement aux tableaux (`int[]`), elles grandissent et rétrécissent automatiquement.\n\n## Les Generics : le `<...>`\n\nLes **generics** permettent de typer le contenu d'une collection. `List<String>` est une liste qui ne contient que des `String`. Le compilateur vérifie le type : plus de cast manuel, moins d'erreurs.\n\n```java\nList<String> noms = new ArrayList<>();\nnoms.add(\"Alice\");\nnoms.add(42);  // ERREUR de compilation : 42 n'est pas un String\n```\n\nNote : les generics n'acceptent que des **objets**, pas des primitifs. On utilise les classes *wrapper* : `Integer` pour `int`, `Double` pour `double`, etc. L'**autoboxing** convertit automatiquement `int` ↔ `Integer`.\n\n## List et ArrayList\n\nUne `List` est une séquence **ordonnée** qui autorise les doublons et l'accès par index.\n\n```java\nList<String> fruits = new ArrayList<>();\nfruits.add(\"pomme\");\nfruits.add(\"banane\");\nfruits.add(\"pomme\");          // doublon autorisé\n\nString premier = fruits.get(0);   // \"pomme\"\nint taille = fruits.size();       // 3\nboolean contient = fruits.contains(\"banane\");  // true\nfruits.remove(\"banane\");\n\nfor (String f : fruits) {\n    System.out.println(f);\n}\n```\n\nOn programme contre l'**interface** `List` et on choisit l'implémentation (`ArrayList`, `LinkedList`...). `ArrayList` est le choix par défaut (accès par index rapide).\n\n## Set et HashSet\n\nUn `Set` est une collection **sans doublon**. `HashSet` ne garantit pas l'ordre ; `LinkedHashSet` garde l'ordre d'insertion ; `TreeSet` trie.\n\n```java\nSet<String> tags = new HashSet<>();\ntags.add(\"java\");\ntags.add(\"poo\");\ntags.add(\"java\");   // ignoré, déjà présent\nSystem.out.println(tags.size());   // 2\n```\n\n## Map et HashMap\n\nUne `Map<K, V>` associe des **clés** à des **valeurs** (comme un dictionnaire). Les clés sont uniques.\n\n```java\nMap<String, Integer> stock = new HashMap<>();\nstock.put(\"pomme\", 50);\nstock.put(\"banane\", 30);\nstock.put(\"pomme\", 60);            // remplace l'ancienne valeur\n\nint nb = stock.get(\"pomme\");       // 60\nint defaut = stock.getOrDefault(\"kiwi\", 0);  // 0 si absent\nboolean a = stock.containsKey(\"banane\");     // true\n\n// Parcourir une Map\nfor (Map.Entry<String, Integer> e : stock.entrySet()) {\n    System.out.println(e.getKey() + \" => \" + e.getValue());\n}\n```\n\n`getOrDefault` évite un `null` quand la clé n'existe pas. `HashMap` n'a pas d'ordre garanti ; `TreeMap` trie par clé.\n\n## Tableau récapitulatif\n\n| Interface | Implémentation courante | Doublons ? | Ordonné ? |\n|-----------|------------------------|------------|-----------|\n| `List` | `ArrayList` | oui | oui (index) |\n| `Set` | `HashSet` | non | non |\n| `Map` | `HashMap` | clés uniques | non |\n\n## Bon réflexe junior\n\nDéclare avec l'interface, instancie avec l'implémentation :\n\n```java\nList<Integer> l = new ArrayList<>();   // bien\nMap<String, Integer> m = new HashMap<>();\n```\n\nCela rend ton code plus souple : tu peux changer d'implémentation sans toucher au reste.",
      "playground": {
        "language": "java",
        "code": "import java.util.*;\n\nclass Main {\n    public static void main(String[] args) {\n        List<String> commande = new ArrayList<>();\n        commande.add(\"pomme\");\n        commande.add(\"banane\");\n        commande.add(\"pomme\");\n        commande.add(\"kiwi\");\n\n        // Compter chaque fruit avec une Map\n        Map<String, Integer> compte = new HashMap<>();\n        for (String fruit : commande) {\n            compte.put(fruit, compte.getOrDefault(fruit, 0) + 1);\n        }\n\n        for (Map.Entry<String, Integer> e : compte.entrySet()) {\n            System.out.println(e.getKey() + \" : \" + e.getValue());\n        }\n\n        // Set : liste des fruits uniques\n        Set<String> uniques = new HashSet<>(commande);\n        System.out.println(\"Fruits differents : \" + uniques.size());\n    }\n}"
      },
      "quiz": [
        {
          "question": "Quelle collection garantit l'absence de doublons ?",
          "options": [
            "ArrayList",
            "LinkedList",
            "HashSet",
            "List"
          ],
          "correctIndex": 2,
          "explanation": "Un Set (par exemple HashSet) n'accepte pas les doublons. Une List en accepte."
        },
        {
          "question": "Que fait stock.getOrDefault(\"kiwi\", 0) si la clé kiwi n'existe pas ?",
          "options": [
            "Lance une exception",
            "Retourne null",
            "Retourne 0 (la valeur par défaut fournie)",
            "Ajoute kiwi avec la valeur 0"
          ],
          "correctIndex": 2,
          "explanation": "getOrDefault retourne la valeur par défaut passée en second argument quand la clé est absente, sans modifier la Map."
        },
        {
          "question": "Pourquoi écrit-on List<Integer> et pas List<int> ?",
          "options": [
            "Parce que int est trop lent",
            "Parce que les generics n'acceptent que des objets, pas des primitifs",
            "Parce que List n'existe pas pour les nombres",
            "C'est une simple convention de style"
          ],
          "correctIndex": 1,
          "explanation": "Les generics travaillent avec des types objets. On utilise les wrappers (Integer, Double...) ; l'autoboxing convertit automatiquement entre int et Integer."
        }
      ]
    },
    {
      "id": "exceptions",
      "title": "4. La gestion des exceptions",
      "markdown": "# Les exceptions\n\nUne **exception** est un événement anormal qui interrompt le flux normal du programme (division par zéro, fichier introuvable, accès `null`...). Java fournit un mécanisme pour les **attraper** et y réagir proprement.\n\n## try / catch / finally\n\n```java\ntry {\n    int resultat = 10 / 0;       // lève ArithmeticException\n} catch (ArithmeticException e) {\n    System.out.println(\"Erreur : \" + e.getMessage());\n} finally {\n    System.out.println(\"Toujours exécuté\");\n}\n```\n\n- `try` : le code qui peut échouer.\n- `catch` : capture un type d'exception et réagit. On peut enchaîner plusieurs `catch`.\n- `finally` : s'exécute **toujours**, qu'il y ait erreur ou non (utile pour libérer des ressources).\n\n## Checked vs Unchecked\n\nC'est la distinction clé en Java :\n\n- **Checked** (vérifiées) : héritent de `Exception` (mais pas de `RuntimeException`). Le compilateur **oblige** à les gérer (`try/catch`) ou à les déclarer avec `throws`. Exemples : `IOException`, `SQLException`. Elles représentent des erreurs prévisibles et récupérables.\n- **Unchecked** (non vérifiées) : héritent de `RuntimeException`. Le compilateur ne force rien. Exemples : `NullPointerException`, `ArrayIndexOutOfBoundsException`, `IllegalArgumentException`. Elles signalent souvent un bug de programmation.\n\n```java\n// Checked : doit être gérée ou déclarée\npublic void lire() throws IOException {\n    // ...\n}\n\n// Unchecked : aucune obligation\npublic int diviser(int a, int b) {\n    return a / b;   // ArithmeticException possible, non imposée\n}\n```\n\n## Hiérarchie simplifiée\n\n```\nThrowable\n├── Error            (graves, ne pas attraper : OutOfMemoryError...)\n└── Exception\n    ├── IOException, SQLException...   (CHECKED)\n    └── RuntimeException               (UNCHECKED)\n        ├── NullPointerException\n        └── IllegalArgumentException\n```\n\n## Lever une exception : throw\n\n```java\npublic void retirer(double montant) {\n    if (montant <= 0) {\n        throw new IllegalArgumentException(\"Le montant doit être positif\");\n    }\n    // ...\n}\n```\n\n`throw` lève l'exception ; `throws` (dans la signature) déclare qu'une méthode peut en propager une.\n\n## try-with-resources\n\nPour les ressources qui doivent être **fermées** (fichiers, connexions...), Java propose le *try-with-resources*. Toute ressource déclarée dans les parenthèses du `try` est **fermée automatiquement** à la fin, même en cas d'exception. La ressource doit implémenter `AutoCloseable`.\n\n```java\ntry (BufferedReader br = new BufferedReader(new FileReader(\"data.txt\"))) {\n    System.out.println(br.readLine());\n}\n// br.close() est appelé automatiquement ici, plus besoin de finally\ncatch (IOException e) {\n    System.out.println(\"Lecture impossible : \" + e.getMessage());\n}\n```\n\nC'est la façon moderne et recommandée : plus sûr qu'un `finally` manuel où l'on risque d'oublier le `close()`.\n\n## Bonnes pratiques\n\n- N'attrape que ce que tu sais gérer ; évite `catch (Exception e) {}` vide qui masque les bugs.\n- Préfère les messages explicites.\n- Utilise try-with-resources dès qu'une ressource est fermable.",
      "playground": {
        "language": "java",
        "code": "class Main {\n    public static void main(String[] args) {\n        int[] valeurs = {10, 0, 5};\n        int diviseur = 100;\n\n        for (int v : valeurs) {\n            try {\n                int r = diviseur / v;\n                System.out.println(diviseur + \" / \" + v + \" = \" + r);\n            } catch (ArithmeticException e) {\n                System.out.println(diviseur + \" / \" + v + \" : impossible (\" + e.getMessage() + \")\");\n            } finally {\n                System.out.println(\"  -> tentative terminee\");\n            }\n        }\n\n        try {\n            verifierAge(-3);\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"Validation : \" + e.getMessage());\n        }\n    }\n\n    static void verifierAge(int age) {\n        if (age < 0) {\n            throw new IllegalArgumentException(\"l'age ne peut pas etre negatif\");\n        }\n        System.out.println(\"Age valide : \" + age);\n    }\n}"
      },
      "quiz": [
        {
          "question": "Quelle est la différence entre une exception checked et unchecked ?",
          "options": [
            "Les checked sont plus rapides à l'exécution",
            "Le compilateur oblige à gérer ou déclarer les checked, pas les unchecked",
            "Les unchecked ne peuvent jamais être attrapées",
            "Il n'y a aucune différence pratique"
          ],
          "correctIndex": 1,
          "explanation": "Les exceptions checked (sous Exception, hors RuntimeException) doivent être gérées par try/catch ou déclarées avec throws. Les unchecked (sous RuntimeException) n'imposent rien."
        },
        {
          "question": "Quand le bloc finally est-il exécuté ?",
          "options": [
            "Uniquement si une exception est levée",
            "Uniquement si aucune exception n'est levée",
            "Toujours, qu'il y ait une exception ou non",
            "Jamais, il est obsolète"
          ],
          "correctIndex": 2,
          "explanation": "finally s'exécute systématiquement après le try (et le catch éventuel), ce qui en fait l'endroit idéal pour libérer des ressources."
        },
        {
          "question": "Quel est l'intérêt principal du try-with-resources ?",
          "options": [
            "Il accélère le programme",
            "Il ferme automatiquement les ressources AutoCloseable, même en cas d'erreur",
            "Il transforme les exceptions checked en unchecked",
            "Il empêche toute exception de se produire"
          ],
          "correctIndex": 1,
          "explanation": "Les ressources déclarées dans le try (implémentant AutoCloseable) sont fermées automatiquement à la sortie du bloc, ce qui évite les fuites et les finally manuels oubliés."
        }
      ]
    },
    {
      "id": "streams-lambdas",
      "title": "5. Streams, lambdas et Optional",
      "markdown": "# Streams, lambdas et Optional\n\nDepuis Java 8, on peut traiter des collections de façon **déclarative** : on décrit *quoi* faire plutôt que *comment* boucler. Les outils : les **lambdas**, les **streams** et `Optional`.\n\n## Les expressions lambda\n\nUne **lambda** est une fonction anonyme courte. Syntaxe : `(paramètres) -> corps`.\n\n```java\n// Avant (classe anonyme)\nRunnable r1 = new Runnable() {\n    public void run() { System.out.println(\"Hello\"); }\n};\n\n// Avec lambda\nRunnable r2 = () -> System.out.println(\"Hello\");\n\n// Lambda avec paramètres\nComparator<String> parLongueur = (a, b) -> a.length() - b.length();\n```\n\nUne lambda implémente une **interface fonctionnelle** (une interface avec une seule méthode abstraite), comme `Runnable`, `Comparator`, `Predicate<T>`, `Function<T,R>`...\n\n## Les références de méthode\n\nQuand une lambda ne fait qu'appeler une méthode existante, on peut la raccourcir avec `::` :\n\n```java\nnoms.forEach(System.out::println);   // équivaut à x -> System.out.println(x)\n```\n\n## Les Streams\n\nUn **stream** est un flux d'éléments sur lequel on enchaîne des opérations. On part d'une collection avec `.stream()`, on enchaîne des opérations **intermédiaires** (qui renvoient un stream) puis une opération **terminale** (qui produit un résultat).\n\n```java\nList<String> mots = List.of(\"java\", \"python\", \"go\", \"rust\", \"c\");\n\nList<String> resultat = mots.stream()\n    .filter(m -> m.length() > 2)        // intermédiaire : garde > 2 lettres\n    .map(String::toUpperCase)           // intermédiaire : transforme\n    .sorted()                           // intermédiaire : trie\n    .collect(Collectors.toList());      // terminale : récupère une liste\n\nSystem.out.println(resultat);   // [JAVA, PYTHON, RUST]\n```\n\nOpérations clés :\n\n- `filter(predicate)` : ne garde que les éléments qui valident la condition.\n- `map(function)` : transforme chaque élément.\n- `sorted()` : trie.\n- `collect(...)` : ramasse le résultat (liste, set, map...).\n- `count()`, `forEach()`, `reduce()`, `anyMatch()` : autres opérations terminales.\n\n```java\nlong nb = mots.stream().filter(m -> m.startsWith(\"j\")).count();   // 1\n\nint sommeLongueurs = mots.stream()\n    .mapToInt(String::length)\n    .sum();\n```\n\nUn stream est **paresseux** (lazy) : rien ne s'exécute tant qu'il n'y a pas d'opération terminale. Et il ne se consomme **qu'une fois**.\n\n## Optional : en finir avec le null\n\n`Optional<T>` est une boîte qui contient soit une valeur, soit rien. Il rend explicite l'absence possible de valeur et évite les `NullPointerException`.\n\n```java\nOptional<String> trouve = mots.stream()\n    .filter(m -> m.length() == 4)\n    .findFirst();\n\nif (trouve.isPresent()) {\n    System.out.println(\"Trouvé : \" + trouve.get());\n}\n\n// Plus idiomatique :\nString valeur = trouve.orElse(\"aucun\");          // valeur par défaut\ntrouve.ifPresent(m -> System.out.println(m));    // n'agit que si présent\n```\n\nMéthodes utiles : `orElse(defaut)`, `orElseThrow()`, `map(...)`, `ifPresent(...)`. Évite `get()` sans vérifier : il lève une exception si vide.\n\n## Pourquoi c'est puissant\n\nLe code devient plus court, plus lisible, et l'intention saute aux yeux : *filtrer, transformer, collecter*. C'est un standard attendu d'un développeur junior moderne.",
      "playground": {
        "language": "java",
        "code": "import java.util.*;\nimport java.util.stream.*;\n\nclass Main {\n    public static void main(String[] args) {\n        List<String> langages = List.of(\"java\", \"python\", \"go\", \"rust\", \"c\", \"kotlin\");\n\n        // Filtrer (> 2 lettres), transformer en majuscules, trier, collecter\n        List<String> resultat = langages.stream()\n            .filter(l -> l.length() > 2)\n            .map(String::toUpperCase)\n            .sorted()\n            .collect(Collectors.toList());\n        System.out.println(\"Resultat : \" + resultat);\n\n        // Compter ceux commencant par une voyelle\n        long voyelles = langages.stream()\n            .filter(l -> \"aeiou\".indexOf(l.charAt(0)) >= 0)\n            .count();\n        System.out.println(\"Commencent par une voyelle : \" + voyelles);\n\n        // Optional : trouver le premier langage de 4 lettres\n        Optional<String> premier = langages.stream()\n            .filter(l -> l.length() == 4)\n            .findFirst();\n        System.out.println(\"Premier de 4 lettres : \" + premier.orElse(\"aucun\"));\n    }\n}"
      },
      "quiz": [
        {
          "question": "Que fait l'opération map dans un stream ?",
          "options": [
            "Elle filtre les éléments selon une condition",
            "Elle transforme chaque élément en un autre",
            "Elle trie les éléments",
            "Elle compte les éléments"
          ],
          "correctIndex": 1,
          "explanation": "map applique une fonction à chaque élément pour le transformer (ex : String::toUpperCase). C'est filter qui sélectionne selon une condition."
        },
        {
          "question": "Quelle est la nature d'une opération comme collect ou count ?",
          "options": [
            "Une opération intermédiaire qui renvoie un stream",
            "Une opération terminale qui produit un résultat et termine le stream",
            "Une lambda",
            "Une interface fonctionnelle"
          ],
          "correctIndex": 1,
          "explanation": "collect, count, forEach, reduce sont des opérations terminales : elles déclenchent le traitement et produisent un résultat. filter, map, sorted sont intermédiaires."
        },
        {
          "question": "Pourquoi utiliser Optional<T> ?",
          "options": [
            "Pour accélérer les boucles",
            "Pour rendre explicite l'absence possible de valeur et éviter les NullPointerException",
            "Pour stocker plusieurs valeurs à la fois",
            "Pour remplacer les collections"
          ],
          "correctIndex": 1,
          "explanation": "Optional représente explicitement une valeur potentiellement absente. Avec orElse, ifPresent ou orElseThrow, on gère proprement le cas vide sans risquer un NullPointerException."
        }
      ]
    },
    {
      "id": "java-moderne",
      "title": "6. Java moderne",
      "markdown": "# Java moderne\n\nDepuis Java 8 puis surtout Java 14-21, le langage s'est modernisé pour réduire le code répétitif (*boilerplate*) et gagner en clarté.\n\n## var : inférence de type local\n\nDepuis Java 10, `var` laisse le compilateur **deviner** le type d'une variable locale d'après sa valeur. Le typage reste **statique** : `var` n'est pas du typage dynamique.\n\n```java\nvar message = \"Bonjour\";          // String inféré\nvar nombre = 42;                  // int inféré\nvar liste = new ArrayList<String>();   // ArrayList<String> inféré\n```\n\nRègles : utilisable uniquement pour des variables **locales** initialisées, pas pour les attributs, paramètres ni retours de méthode. À utiliser quand le type est évident à la lecture.\n\n## Les records\n\nUn **record** (Java 16) est une classe **immuable** porteuse de données. En une ligne, le compilateur génère le constructeur, les getters (accesseurs), `equals()`, `hashCode()` et `toString()`.\n\n```java\npublic record Point(int x, int y) {}\n\nvar p = new Point(3, 4);\nSystem.out.println(p.x());        // 3 (accesseur, pas getX())\nSystem.out.println(p);            // Point[x=3, y=4]\n```\n\nIdéal pour les DTO et objets de transport de données. Un record est `final`, ses champs sont `final` : on ne peut pas le modifier après création.\n\n## Switch expressions\n\nDepuis Java 14, le `switch` peut être une **expression** qui renvoie une valeur, avec la flèche `->` et sans `break` (plus de *fall-through* accidentel).\n\n```java\nint jour = 3;\nString nom = switch (jour) {\n    case 1, 7 -> \"week-end\";\n    case 2, 3, 4, 5, 6 -> \"semaine\";\n    default -> \"inconnu\";\n};\nSystem.out.println(nom);   // semaine\n```\n\nPlusieurs valeurs par cas (`case 1, 7`), pas de `break`, et chaque branche peut renvoyer une valeur affectée directement à une variable.\n\n## L'immutabilité des String\n\nUn `String` est **immuable** : une fois créé, son contenu ne change jamais. Les méthodes comme `toUpperCase()` ou `concat()` retournent un **nouveau** String sans modifier l'original.\n\n```java\nString s = \"java\";\ns.toUpperCase();             // crée \"JAVA\" mais ne modifie pas s\nSystem.out.println(s);       // \"java\" (inchangé !)\n\nString s2 = s.toUpperCase(); // il faut récupérer le résultat\nSystem.out.println(s2);      // \"JAVA\"\n```\n\nPour construire une chaîne par concaténation dans une boucle, préfère `StringBuilder` (mutable, plus efficace) :\n\n```java\nvar sb = new StringBuilder();\nfor (int i = 0; i < 3; i++) sb.append(i);\nString res = sb.toString();   // \"012\"\n```\n\n## equals() et hashCode()\n\nL'opérateur `==` compare les **références** (deux objets sont-ils le même en mémoire ?). Pour comparer le **contenu**, on utilise `equals()`.\n\n```java\nString a = new String(\"hi\");\nString b = new String(\"hi\");\nSystem.out.println(a == b);        // false (objets différents)\nSystem.out.println(a.equals(b));   // true (même contenu)\n```\n\n**Le contrat à connaître** : si tu redéfinis `equals()`, tu **dois** redéfinir `hashCode()`. Deux objets égaux selon `equals()` doivent avoir le même `hashCode()`. Sinon, les `HashMap` et `HashSet` se comportent mal (un objet \"perdu\" dans la table de hachage).\n\n```java\npublic class Produit {\n    private String ref;\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Produit p)) return false;   // pattern matching (Java 16)\n        return ref.equals(p.ref);\n    }\n\n    @Override\n    public int hashCode() {\n        return Objects.hash(ref);\n    }\n}\n```\n\nBonne nouvelle : un **record** génère automatiquement un `equals()`/`hashCode()` corrects basés sur ses champs. C'est une raison de plus de les utiliser.\n\n## Ce qu'il faut retenir\n\n- `var` : type inféré pour les variables locales (typage statique conservé).\n- `record` : classe de données immuable, boilerplate généré.\n- `switch` expression : renvoie une valeur, syntaxe `->`, sans `break`.\n- `String` immuable : récupère toujours le résultat des méthodes.\n- `equals`/`hashCode` vont toujours ensemble.",
      "playground": {
        "language": "java",
        "code": "import java.util.*;\n\nclass Main {\n    record Article(String nom, double prix) {}\n\n    public static void main(String[] args) {\n        var articles = List.of(\n            new Article(\"clavier\", 45.0),\n            new Article(\"souris\", 25.0),\n            new Article(\"ecran\", 199.0)\n        );\n\n        for (var a : articles) {\n            String categorie = switch ((int) (a.prix() / 50)) {\n                case 0 -> \"abordable\";\n                case 1, 2 -> \"moyen\";\n                default -> \"premium\";\n            };\n            System.out.println(a.nom() + \" (\" + a.prix() + \" EUR) -> \" + categorie);\n        }\n\n        // String immuable : il faut recuperer le resultat\n        String s = \"java\";\n        System.out.println(s.toUpperCase() + \" mais s reste \" + s);\n\n        // record : equals base sur le contenu\n        var a1 = new Article(\"souris\", 25.0);\n        var a2 = new Article(\"souris\", 25.0);\n        System.out.println(\"a1.equals(a2) ? \" + a1.equals(a2));\n    }\n}"
      },
      "quiz": [
        {
          "question": "Que génère automatiquement un record ?",
          "options": [
            "Rien, c'est juste un mot-clé décoratif",
            "Le constructeur, les accesseurs, equals, hashCode et toString",
            "Uniquement un constructeur vide",
            "Des méthodes de sérialisation réseau"
          ],
          "correctIndex": 1,
          "explanation": "Un record génère automatiquement le constructeur canonique, les accesseurs (nom du champ), equals, hashCode et toString. Il est immuable et final."
        },
        {
          "question": "Après String s = \"java\"; s.toUpperCase(); que vaut s ?",
          "options": [
            "\"JAVA\"",
            "\"java\" (inchangé, car String est immuable)",
            "null",
            "Le code ne compile pas"
          ],
          "correctIndex": 1,
          "explanation": "String est immuable : toUpperCase() retourne un NOUVEAU String sans modifier s. Il faut écrire s = s.toUpperCase() pour récupérer le résultat."
        },
        {
          "question": "Quelle règle s'applique quand on redéfinit equals() ?",
          "options": [
            "Il faut aussi redéfinir toString()",
            "Il ne faut jamais le faire",
            "Il faut aussi redéfinir hashCode() de façon cohérente",
            "Il faut rendre la classe abstraite"
          ],
          "correctIndex": 2,
          "explanation": "Le contrat exige que deux objets égaux selon equals() aient le même hashCode(). Redéfinir equals sans hashCode casse le fonctionnement des HashMap et HashSet."
        }
      ]
    }
  ]
};
