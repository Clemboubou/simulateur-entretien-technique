window.COURSES = window.COURSES || {};
window.COURSES["ef"] = {
  "id": "ef",
  "title": "Entity Framework",
  "icon": "EF",
  "summary": "Cours complet et progressif sur Entity Framework Core, l'ORM de .NET : DbContext et DbSet, modelisation des entites et des relations, migrations, requetes LINQ et chargement des donnees (lazy/eager, AsNoTracking, probleme N+1).",
  "chapters": [
    {
      "id": "orm-dbcontext",
      "title": "Qu'est-ce qu'un ORM et EF Core",
      "markdown": "# Qu'est-ce qu'un ORM et EF Core\n\n## La metaphore : le traducteur\n\nImagine que tu parles francais et que ta base de donnees parle SQL. Un **ORM** (Object-Relational Mapping) est un **traducteur** assis entre vous deux. Tu lui parles avec des objets C# (`Client`, `Facture`, `Equipement`), et lui se charge de traduire ca en requetes SQL (`SELECT`, `INSERT`, `UPDATE`) pour la base, puis de retraduire les lignes de resultat en objets C#.\n\nSans ORM, tu ecrirais du SQL a la main, tu lirais chaque colonne une par une, tu remplirais tes objets manuellement. Avec un ORM, tu manipules des objets et l'outil fait la plomberie.\n\n## La definition\n\n**Entity Framework Core (EF Core)** est l'ORM officiel de Microsoft pour .NET. C'est une bibliotheque open-source, multiplateforme (Windows, Linux, macOS), qui te permet de :\n\n- Decrire ta base de donnees sous forme de **classes C#** (les *entites*).\n- Lire et ecrire des donnees en **LINQ** au lieu de SQL.\n- Generer et faire evoluer le schema de la base via les **migrations**.\n\nEF Core sait parler a plusieurs bases via des *providers* : SQL Server, PostgreSQL, SQLite, MySQL, etc. Tu changes de base en grande partie en changeant de provider, ton code C# reste presque identique.\n\n> Attention au vocabulaire : **EF Core** (moderne, multiplateforme, .NET 5+) est different de l'ancien **EF6 / Entity Framework classique** (Windows, .NET Framework). En 2026, sur un nouveau projet, tu utilises EF Core.\n\n## Les deux pieces centrales : DbContext et DbSet\n\n### Le DbContext : la session de travail\n\nLe **`DbContext`** est la classe centrale d'EF Core. Pense a lui comme a **une session de travail avec la base** : il ouvre la connexion, suit les objets que tu modifies (le *change tracking*), et envoie les changements quand tu appelles `SaveChanges()`.\n\nTu crees ta propre classe qui herite de `DbContext` :\n\n```csharp\nusing Microsoft.EntityFrameworkCore;\n\npublic class MaintenanceDbContext : DbContext\n{\n    // Chaque DbSet represente une table de la base.\n    public DbSet<Equipement> Equipements { get; set; }\n    public DbSet<Intervention> Interventions { get; set; }\n\n    protected override void OnConfiguring(DbContextOptionsBuilder options)\n    {\n        // On indique a quelle base se connecter (ici SQL Server).\n        options.UseSqlServer(\"Server=.;Database=Maintenance;Trusted_Connection=True;\");\n    }\n}\n```\n\n### Le DbSet : la table\n\nUn **`DbSet<T>`** represente **une table** (plus exactement une collection d'entites du type `T`). `DbSet<Equipement> Equipements` correspond a la table des equipements. C'est sur ces `DbSet` que tu vas faire tes requetes LINQ et tes ajouts.\n\n## Un exemple complet de bout en bout\n\nD'abord une entite simple :\n\n```csharp\npublic class Equipement\n{\n    public int Id { get; set; }          // cle primaire (convention : Id ou EquipementId)\n    public string Nom { get; set; }\n    public string Localisation { get; set; }\n}\n```\n\nPuis on l'utilise :\n\n```csharp\nusing (var db = new MaintenanceDbContext())\n{\n    // CREATE : ajouter un equipement\n    var pompe = new Equipement { Nom = \"Pompe hydraulique\", Localisation = \"Atelier A\" };\n    db.Equipements.Add(pompe);\n    db.SaveChanges();   // <-- c'est ICI que le INSERT SQL part vers la base\n\n    // READ : lire les equipements\n    var liste = db.Equipements.ToList();\n\n    // UPDATE : modifier (le change tracking detecte la modification)\n    pompe.Localisation = \"Atelier B\";\n    db.SaveChanges();   // <-- ici part un UPDATE\n\n    // DELETE : supprimer\n    db.Equipements.Remove(pompe);\n    db.SaveChanges();   // <-- ici part un DELETE\n}\n```\n\nPoint cle a retenir : **rien n'est ecrit en base tant que tu n'appelles pas `SaveChanges()`**. Avant cet appel, EF Core garde simplement en memoire la liste des changements a faire.\n\n## Injection de dependances (le cas reel)\n\nEn pratique, dans une application ASP.NET Core, tu ne fais pas `new MaintenanceDbContext()` toi-meme : tu **injectes** le contexte. Tu le configures une fois au demarrage :\n\n```csharp\n// Program.cs\nbuilder.Services.AddDbContext<MaintenanceDbContext>(options =>\n    options.UseSqlServer(builder.Configuration.GetConnectionString(\"Maintenance\")));\n```\n\nPuis tu le recois dans le constructeur de tes services / controleurs :\n\n```csharp\npublic class EquipementService\n{\n    private readonly MaintenanceDbContext _db;\n    public EquipementService(MaintenanceDbContext db) => _db = db;\n}\n```\n\nRetiens que le `DbContext` est concu pour avoir une **duree de vie courte** (une requete HTTP, une unite de travail). On ne garde pas un meme contexte ouvert pendant des heures.\n\n## A toi : explique-le simplement (technique Feynman)\n\nReformule a voix haute, comme si tu l'expliquais a un collegue : *\"Un ORM est un traducteur entre mes objets C# et le SQL. EF Core est l'ORM de .NET. Le `DbContext` est ma session de travail, et chaque `DbSet<T>` est une table. Je modifie des objets en memoire, puis `SaveChanges()` envoie tout en base.\"* Si tu sais dire ca sans regarder, le chapitre est acquis.",
      "playground": null,
      "quiz": [
        {
          "question": "Quel est le role principal d'un ORM comme EF Core ?",
          "options": [
            "Remplacer completement la base de donnees par des fichiers",
            "Faire la correspondance entre des objets C# et les tables d'une base relationnelle",
            "Accelerer le reseau entre le client et le serveur",
            "Compiler le code C# en SQL natif a la place du compilateur"
          ],
          "correctIndex": 1,
          "explanation": "ORM = Object-Relational Mapping. Il fait le pont (la traduction) entre tes objets C# et les tables/colonnes de la base relationnelle, te permettant de manipuler des objets plutot que d'ecrire du SQL a la main."
        },
        {
          "question": "Dans EF Core, que represente un DbSet<Equipement> declare dans le DbContext ?",
          "options": [
            "Une seule ligne de la table Equipement",
            "La chaine de connexion vers la base",
            "Une collection correspondant a la table des equipements",
            "Une migration en attente d'application"
          ],
          "correctIndex": 2,
          "explanation": "Un DbSet<T> represente une table (une collection d'entites de type T). C'est sur lui qu'on ecrit les requetes LINQ et qu'on ajoute/supprime des entites."
        },
        {
          "question": "A quel moment EF Core envoie-t-il reellement les INSERT/UPDATE/DELETE a la base ?",
          "options": [
            "Des qu'on appelle Add, Remove ou qu'on modifie une propriete",
            "Automatiquement toutes les secondes en tache de fond",
            "Uniquement lors de l'appel a SaveChanges()",
            "Seulement au moment ou on cree le DbContext"
          ],
          "correctIndex": 2,
          "explanation": "EF Core suit les changements en memoire (change tracking) mais n'envoie les commandes SQL a la base que lorsqu'on appelle SaveChanges(). Avant cet appel, rien n'est persiste."
        }
      ]
    },
    {
      "id": "modelisation",
      "title": "Modelisation : entites, cles et relations",
      "markdown": "# Modelisation : entites, cles et relations\n\n## La metaphore : le plan de la maison\n\nAvant de construire, un architecte dessine un plan : ou sont les murs, quelles pieces communiquent, par quelle porte. La **modelisation** EF Core, c'est ton plan : tu decris tes entites (les pieces) et tes relations (les portes entre pieces). EF Core construit ensuite la base d'apres ce plan.\n\n## Les entites et les cles\n\nUne **entite** est une classe C# qui correspond a une table. Chaque entite a besoin d'une **cle primaire** : la colonne qui identifie de maniere unique chaque ligne.\n\nPar **convention**, EF Core considere comme cle primaire une propriete nommee `Id` ou `<NomClasse>Id` :\n\n```csharp\npublic class Equipement\n{\n    public int Id { get; set; }        // cle primaire detectee par convention\n    public string Nom { get; set; }\n}\n\npublic class Intervention\n{\n    public int InterventionId { get; set; }  // <NomClasse>Id : aussi reconnu\n    public DateTime Date { get; set; }\n}\n```\n\nSi ta cle a un autre nom, tu dois le declarer explicitement (voir Data Annotations / Fluent API plus bas).\n\n## Deux facons de configurer : Data Annotations vs Fluent API\n\nEF Core te laisse deux styles pour configurer le modele.\n\n### 1. Data Annotations : des attributs sur les proprietes\n\nSimple, lisible, directement sur la classe. Bien pour les cas courants.\n\n```csharp\nusing System.ComponentModel.DataAnnotations;\nusing System.ComponentModel.DataAnnotations.Schema;\n\npublic class Equipement\n{\n    [Key]                          // cette propriete est la cle primaire\n    public int Code { get; set; }\n\n    [Required]                     // colonne NOT NULL\n    [MaxLength(100)]               // varchar(100)\n    public string Nom { get; set; }\n\n    [Column(\"localisation_atelier\")]  // nom de colonne personnalise\n    public string Localisation { get; set; }\n}\n```\n\n### 2. Fluent API : tout dans OnModelCreating\n\nPlus puissante et plus verbeuse. Elle vit dans le `DbContext`, separee des classes d'entites. C'est la seule option pour certaines configurations avancees (cles composites, relations many-to-many explicites, etc.).\n\n```csharp\nprotected override void OnModelCreating(ModelBuilder modelBuilder)\n{\n    modelBuilder.Entity<Equipement>(e =>\n    {\n        e.HasKey(x => x.Code);\n        e.Property(x => x.Nom).IsRequired().HasMaxLength(100);\n        e.Property(x => x.Localisation).HasColumnName(\"localisation_atelier\");\n    });\n}\n```\n\n> Regle pratique : commence avec les **Data Annotations** pour le simple et lisible. Passe a la **Fluent API** quand la config devient complexe, ou quand tu veux garder tes entites \"propres\" sans attributs de persistance. En cas de conflit, **la Fluent API gagne** sur les Data Annotations.\n\n## Les relations\n\nC'est le coeur de la modelisation. Une relation se materialise par une **cle etrangere** (FK) et par des **proprietes de navigation** (les references entre objets).\n\n### One-to-many (un-vers-plusieurs)\n\nLe cas le plus courant. *Un equipement a plusieurs interventions ; chaque intervention concerne un seul equipement.*\n\n```csharp\npublic class Equipement\n{\n    public int Id { get; set; }\n    public string Nom { get; set; }\n\n    // navigation \"plusieurs\" : la collection cote 'un'\n    public List<Intervention> Interventions { get; set; } = new();\n}\n\npublic class Intervention\n{\n    public int Id { get; set; }\n    public DateTime Date { get; set; }\n\n    public int EquipementId { get; set; }        // cle etrangere (convention)\n    public Equipement Equipement { get; set; }    // navigation \"un\"\n}\n```\n\nLa propriete `EquipementId` est reconnue comme cle etrangere par convention (`<Navigation>Id`). EF Core cree la colonne FK et la contrainte automatiquement.\n\n### Many-to-many (plusieurs-vers-plusieurs)\n\n*Un technicien maitrise plusieurs competences ; une competence est maitrisee par plusieurs techniciens.* Depuis EF Core 5, on peut le declarer sans creer la table d'association a la main :\n\n```csharp\npublic class Technicien\n{\n    public int Id { get; set; }\n    public string Nom { get; set; }\n    public List<Competence> Competences { get; set; } = new();\n}\n\npublic class Competence\n{\n    public int Id { get; set; }\n    public string Libelle { get; set; }\n    public List<Technicien> Techniciens { get; set; } = new();\n}\n```\n\nEF Core cree automatiquement la **table de jonction** (par ex. `CompetenceTechnicien`) en coulisses. Si tu as besoin d'attributs sur la liaison (ex. une date d'obtention), tu crees alors une entite de jonction explicite.\n\n### One-to-one (un-vers-un)\n\n*Un equipement a une fiche de garantie unique.* Ici il faut souvent aider EF Core via la Fluent API pour designer le cote dependant :\n\n```csharp\npublic class Equipement\n{\n    public int Id { get; set; }\n    public FicheGarantie Garantie { get; set; }\n}\n\npublic class FicheGarantie\n{\n    public int Id { get; set; }\n    public DateTime DateFin { get; set; }\n    public int EquipementId { get; set; }     // FK + unique\n    public Equipement Equipement { get; set; }\n}\n\n// Dans OnModelCreating :\nmodelBuilder.Entity<Equipement>()\n    .HasOne(e => e.Garantie)\n    .WithOne(g => g.Equipement)\n    .HasForeignKey<FicheGarantie>(g => g.EquipementId);\n```\n\n## A toi : explique-le simplement (technique Feynman)\n\nDis-le avec tes mots : *\"Une entite = une table, avec une cle primaire. Une relation s'exprime par une cle etrangere et des proprietes de navigation. One-to-many : une collection d'un cote, une reference + FK de l'autre. Many-to-many : deux collections, EF cree la table de jonction. Je configure soit avec des attributs (Data Annotations), soit avec la Fluent API dans OnModelCreating, et la Fluent API a le dernier mot.\"*",
      "playground": null,
      "quiz": [
        {
          "question": "Dans une relation one-to-many entre Equipement (un) et Intervention (plusieurs), ou se trouve la cle etrangere ?",
          "options": [
            "Sur l'entite Equipement (le cote 'un')",
            "Sur l'entite Intervention (le cote 'plusieurs')",
            "Dans une table de jonction separee creee par EF Core",
            "Il n'y a pas de cle etrangere dans ce type de relation"
          ],
          "correctIndex": 1,
          "explanation": "Dans une relation one-to-many, la cle etrangere est toujours portee par le cote 'plusieurs'. Ici Intervention possede EquipementId qui pointe vers l'equipement parent."
        },
        {
          "question": "En cas de conflit entre une Data Annotation et une configuration Fluent API sur la meme propriete, laquelle l'emporte ?",
          "options": [
            "La Data Annotation, car elle est plus proche de la classe",
            "La Fluent API, configuree dans OnModelCreating",
            "EF Core leve une exception et refuse de demarrer",
            "Celle qui a ete ecrite en dernier dans le fichier"
          ],
          "correctIndex": 1,
          "explanation": "La Fluent API a la priorite la plus haute : elle surcharge les Data Annotations, qui elles-memes surchargent les conventions par defaut."
        },
        {
          "question": "Pour une relation many-to-many simple (sans donnees supplementaires sur la liaison) en EF Core moderne, que faut-il faire ?",
          "options": [
            "Creer obligatoirement et a la main une entite de jonction",
            "Declarer une collection de chaque cote ; EF Core gere la table de jonction automatiquement",
            "Utiliser une seule cle primaire composite partagee entre les deux tables",
            "C'est impossible, EF Core ne supporte pas le many-to-many"
          ],
          "correctIndex": 1,
          "explanation": "Depuis EF Core 5, une collection de navigation de chaque cote suffit : EF Core cree et gere la table de jonction en coulisses. On ne cree une entite de jonction explicite que si la liaison porte des donnees (ex. une date)."
        }
      ]
    },
    {
      "id": "migrations",
      "title": "Les migrations",
      "markdown": "# Les migrations\n\n## La metaphore : le carnet de chantier\n\nTon modele C# evolue : tu ajoutes une propriete, tu crees une table, tu renommes une colonne. La base, elle, ne change pas toute seule. Les **migrations** sont le **carnet de chantier versionne** : chaque modification du schema est enregistree comme une etape datee, qu'on peut appliquer, empiler, ou annuler, dans l'ordre.\n\n## Le probleme que ca resout\n\nSans migrations, quand ton modele change, tu devrais ecrire toi-meme les `ALTER TABLE`, te souvenir de l'etat de chaque base (la tienne, celle d'un collegue, la prod...), et les garder synchronisees a la main. Les migrations automatisent ca : EF compare ton modele actuel a l'etat precedent et **genere le SQL de difference**.\n\n## Les deux commandes essentielles\n\nIl existe deux outils equivalents : la **Package Manager Console** (Visual Studio) et le **CLI dotnet-ef** (terminal). Memorise les deux, on te demandera les deux en entretien.\n\n### 1. Creer une migration : add-migration\n\nApres avoir modifie ton modele, tu generes une migration en lui donnant un nom parlant :\n\n```bash\n# CLI dotnet (terminal)\ndotnet ef migrations add CreationEquipements\n```\n\n```powershell\n# Package Manager Console (Visual Studio)\nAdd-Migration CreationEquipements\n```\n\nCela cree un fichier de migration C# (dans un dossier `Migrations/`) contenant deux methodes :\n\n```csharp\npublic partial class CreationEquipements : Migration\n{\n    // Up : ce qu'on applique pour avancer (creer la table)\n    protected override void Up(MigrationBuilder migrationBuilder)\n    {\n        migrationBuilder.CreateTable(\n            name: \"Equipements\",\n            columns: table => new\n            {\n                Id = table.Column<int>(nullable: false)\n                    .Annotation(\"SqlServer:Identity\", \"1, 1\"),\n                Nom = table.Column<string>(maxLength: 100, nullable: false)\n            },\n            constraints: table => table.PrimaryKey(\"PK_Equipements\", x => x.Id));\n    }\n\n    // Down : ce qu'on applique pour reculer (annuler la migration)\n    protected override void Down(MigrationBuilder migrationBuilder)\n    {\n        migrationBuilder.DropTable(name: \"Equipements\");\n    }\n}\n```\n\n> Important : `add-migration` **ne touche pas la base**. Il genere seulement le fichier C#. Tu peux (et tu dois) le relire avant de l'appliquer.\n\n### 2. Appliquer a la base : update-database\n\n```bash\n# CLI dotnet\ndotnet ef database update\n```\n\n```powershell\n# Package Manager Console\nUpdate-Database\n```\n\nC'est cette commande qui **execute reellement le SQL** sur la base : elle applique toutes les migrations non encore appliquees, dans l'ordre.\n\n## Comment EF sait ou il en est : __EFMigrationsHistory\n\nA la premiere migration, EF cree dans ta base une table speciale : **`__EFMigrationsHistory`**. Elle liste les migrations deja appliquees. A chaque `update-database`, EF la consulte pour n'appliquer que ce qui manque. C'est ce qui rend les migrations idempotentes et synchronisables entre machines.\n\n## Annuler / revenir en arriere\n\nPour revenir a l'etat d'une migration precedente (cela execute les methodes `Down`) :\n\n```bash\ndotnet ef database update NomDeLaMigrationCible\n```\n\nPour **supprimer la derniere migration non appliquee** (parce que tu t'es trompe avant de l'appliquer) :\n\n```bash\ndotnet ef migrations remove\n```\n\n> Ne supprime jamais a la main un fichier de migration deja appliquee en prod : la base et l'historique seraient desynchronises. Utilise `update-database` pour revenir en arriere, ou cree une nouvelle migration corrective.\n\n## Generer le script SQL (utile en prod)\n\nEn production, on n'execute souvent pas `update-database` directement : on genere le script SQL pour le faire relire/jouer par un DBA :\n\n```bash\ndotnet ef migrations script\n```\n\n## Le cycle de travail typique\n\n1. Je modifie mes entites / mon `DbContext`.\n2. `dotnet ef migrations add MonChangement` -> un fichier C# est cree.\n3. Je relis le fichier genere.\n4. `dotnet ef database update` -> la base est mise a jour.\n5. Je commite le fichier de migration dans Git (les collegues l'appliqueront chez eux).\n\n## A toi : explique-le simplement (technique Feynman)\n\nResume : *\"Une migration, c'est une etape versionnee du schema. `add-migration` genere un fichier C# avec Up (avancer) et Down (reculer), sans toucher la base. `update-database` execute le SQL et met a jour la table `__EFMigrationsHistory` qui memorise ce qui est deja applique. Je commite mes migrations dans Git pour que tout le monde ait le meme schema.\"*",
      "playground": null,
      "quiz": [
        {
          "question": "Que fait exactement la commande add-migration (Add-Migration) ?",
          "options": [
            "Elle applique immediatement les changements de schema sur la base",
            "Elle genere un fichier de migration C# (Up/Down) sans modifier la base",
            "Elle supprime la table __EFMigrationsHistory pour repartir de zero",
            "Elle ouvre une connexion permanente a la base de donnees"
          ],
          "correctIndex": 1,
          "explanation": "add-migration genere seulement le fichier C# decrivant le changement (methodes Up et Down). C'est update-database qui execute reellement le SQL sur la base."
        },
        {
          "question": "A quoi sert la table __EFMigrationsHistory creee dans la base ?",
          "options": [
            "A stocker les donnees metier de l'application",
            "A garder la chaine de connexion chiffree",
            "A memoriser quelles migrations ont deja ete appliquees a cette base",
            "A journaliser toutes les requetes LINQ executees"
          ],
          "correctIndex": 2,
          "explanation": "__EFMigrationsHistory liste les migrations deja appliquees. EF la consulte a chaque update-database pour n'appliquer que les migrations manquantes, ce qui permet de synchroniser les bases entre machines."
        },
        {
          "question": "Dans une migration generee, a quoi sert la methode Down ?",
          "options": [
            "A creer le schema initial de la base",
            "A definir comment annuler (revenir en arriere sur) ce changement de schema",
            "A optimiser les performances des requetes",
            "A telecharger le provider de base de donnees"
          ],
          "correctIndex": 1,
          "explanation": "Up decrit comment appliquer le changement (avancer), Down decrit comment l'annuler (reculer). Quand on revient a une migration anterieure, EF execute les methodes Down des migrations a defaire."
        }
      ]
    },
    {
      "id": "linq-iqueryable",
      "title": "Requetes LINQ et execution differee",
      "markdown": "# Requetes LINQ et execution differee\n\n## La metaphore : la commande au restaurant\n\nQuand tu construis une requete LINQ (`Where`, `OrderBy`, `Select`), tu **passes ta commande** au serveur : tu decris ce que tu veux, mais la cuisine n'a encore rien prepare. Le plat n'est cuisine (la requete SQL n'est envoyee a la base) qu'au moment ou tu **demandes a manger** : `ToList()`, `First()`, une boucle `foreach`. C'est l'**execution differee** (*deferred execution*).\n\n## LINQ avec EF Core\n\n**LINQ** (Language Integrated Query) est la syntaxe de requete integree a C#. Avec EF Core, tu ecris du LINQ et EF le **traduit en SQL** :\n\n```csharp\nvar interventionsRecentes = db.Interventions\n    .Where(i => i.Date >= DateTime.Today.AddDays(-7))\n    .OrderByDescending(i => i.Date)\n    .ToList();\n```\n\nEF Core traduit ca en quelque chose comme :\n\n```sql\nSELECT * FROM Interventions\nWHERE Date >= @date\nORDER BY Date DESC\n```\n\n## IQueryable vs IEnumerable : LA distinction a maitriser\n\nC'est une question classique d'entretien. La difference tient a **ou s'execute le filtrage**.\n\n### IQueryable<T> : le filtrage part en base\n\nUn `IQueryable<T>` represente une requete **pas encore executee**. Tant que tu chaines des operateurs (`Where`, `Select`...) sur un `IQueryable`, tu **construis** la requete SQL. Le filtrage est **traduit en SQL et execute par la base**. La base ne renvoie que les lignes utiles.\n\n```csharp\n// db.Interventions est un IQueryable\nIQueryable<Intervention> requete = db.Interventions\n    .Where(i => i.Cout > 1000);   // traduit en WHERE Cout > 1000 cote base\n\nvar resultat = requete.ToList();  // SQL envoye ICI ; seules les lignes > 1000 reviennent\n```\n\n### IEnumerable<T> : le filtrage se fait en memoire (cote C#)\n\nDes que tu bascules en `IEnumerable<T>` (par exemple via `.AsEnumerable()` ou `.ToList()`), les operateurs suivants s'executent **en memoire dans ton application**, plus en base.\n\n```csharp\n// PIEGE : AsEnumerable() ramene TOUTE la table en memoire,\n// puis filtre cote C# -> tres inefficace !\nvar resultat = db.Interventions\n    .AsEnumerable()                 // bascule en IEnumerable : SELECT * complet\n    .Where(i => i.Cout > 1000)      // filtrage en memoire C#\n    .ToList();\n```\n\n> Regle d'or : garde tes filtres (`Where`), tris et projections **sur l'IQueryable** (avant tout `ToList`/`AsEnumerable`), pour qu'ils partent en SQL. Sinon tu rapatries des tables entieres pour rien.\n\n## L'execution differee en pratique\n\nLa requete n'est executee que lorsqu'on l'**enumere** ou qu'on demande un **resultat materialise** :\n\n- Declenchent l'execution : `ToList()`, `ToArray()`, `First()`, `Single()`, `Count()`, `Any()`, `Sum()`, ou un `foreach`.\n- Ne declenchent PAS l'execution (construisent juste la requete) : `Where()`, `Select()`, `OrderBy()`, `Skip()`, `Take()`, `Include()`.\n\nConsequence pratique : tu peux construire une requete par morceaux, conditionnellement :\n\n```csharp\nIQueryable<Intervention> q = db.Interventions;\n\nif (filtreUrgent)\n    q = q.Where(i => i.EstUrgente);     // ajoute au SQL, toujours pas execute\n\nif (depuisDate is not null)\n    q = q.Where(i => i.Date >= depuisDate);\n\nvar resultat = q.ToList();              // une seule requete SQL, ici\n```\n\n> Piege de l'execution differee : si tu enumeres **deux fois** le meme `IQueryable`, EF envoie **deux requetes SQL**. Materialise une fois avec `ToList()` si tu dois reutiliser le resultat.\n\n## La projection avec Select\n\n`Select` te permet de ne **ramener que les colonnes utiles** au lieu de l'entite entiere. C'est excellent pour la performance et pour ne pas exposer toute ton entite.\n\n```csharp\n// On ne lit que 2 colonnes, dans un type anonyme ou un DTO\nvar resume = db.Interventions\n    .Select(i => new\n    {\n        i.Date,\n        i.Cout\n    })\n    .ToList();\n```\n\nEF traduit en `SELECT Date, Cout FROM Interventions` au lieu de `SELECT *`. Avec un DTO :\n\n```csharp\npublic record InterventionResume(DateTime Date, decimal Cout);\n\nvar resume = db.Interventions\n    .Select(i => new InterventionResume(i.Date, i.Cout))\n    .ToList();\n```\n\nLes objets projetes (type anonyme ou DTO) ne sont **pas suivis** par le change tracking, ce qui les rend legers en lecture seule.\n\n## A toi : explique-le simplement (technique Feynman)\n\nA voix haute : *\"LINQ sur un `IQueryable` construit du SQL execute en base : tant que je reste en IQueryable, mes `Where`/`Select` partent cote serveur. Si je passe en `IEnumerable` (AsEnumerable/ToList), le reste se fait en memoire C#. L'execution est differee : la requete part seulement quand je materialise (ToList, First, foreach). Et `Select` me sert a ne ramener que les colonnes utiles.\"*",
      "playground": null,
      "quiz": [
        {
          "question": "Quelle est la difference cle entre filtrer sur un IQueryable et filtrer sur un IEnumerable avec EF Core ?",
          "options": [
            "Aucune, les deux generent exactement le meme SQL",
            "Sur IQueryable le Where est traduit en SQL (execute en base) ; sur IEnumerable il s'execute en memoire cote application",
            "IQueryable ne fonctionne qu'avec SQLite",
            "IEnumerable est toujours plus rapide car il evite la base"
          ],
          "correctIndex": 1,
          "explanation": "Sur un IQueryable, EF traduit le Where en SQL et la base ne renvoie que les lignes utiles. Sur un IEnumerable (apres AsEnumerable/ToList), le filtrage se fait en memoire C# : on a souvent deja rapatrie toute la table, ce qui est inefficace."
        },
        {
          "question": "Parmi ces appels, lequel declenche reellement l'execution de la requete (envoi du SQL) ?",
          "options": [
            "Where(i => i.Cout > 1000)",
            "OrderBy(i => i.Date)",
            "ToList()",
            "Select(i => i.Nom)"
          ],
          "correctIndex": 2,
          "explanation": "Where, OrderBy et Select ne font que construire la requete (execution differee). C'est la materialisation (ToList, ToArray, First, Count, foreach...) qui envoie reellement le SQL a la base."
        },
        {
          "question": "Quel est l'interet principal d'utiliser Select (projection) dans une requete EF Core ?",
          "options": [
            "Forcer le chargement de toutes les relations",
            "Ne ramener que les colonnes/donnees necessaires au lieu de l'entite entiere",
            "Empecher l'execution differee",
            "Creer automatiquement une migration"
          ],
          "correctIndex": 1,
          "explanation": "Select projette vers un type anonyme ou un DTO : EF genere un SELECT des seules colonnes utiles plutot que SELECT *. C'est plus performant et les objets projetes ne sont pas suivis par le change tracking."
        }
      ]
    },
    {
      "id": "chargement-donnees",
      "title": "Chargement des donnees : lazy, eager, N+1",
      "markdown": "# Chargement des donnees : lazy, eager, N+1\n\n## La metaphore : le sac de courses\n\nTu vas chercher un equipement. Question : ramenes-tu **aussi** ses interventions liees ? Trois strategies :\n\n- **Eager loading** : tu prends l'equipement **et** ses interventions en un seul aller-retour au magasin (`Include`).\n- **Lazy loading** : tu prends juste l'equipement ; tu retournes au magasin **plus tard, automatiquement**, le jour ou tu accedes a ses interventions.\n- **Explicit loading** : comme le lazy, mais tu declenches toi-meme l'aller-retour, explicitement.\n\nLe risque ? Multiplier les allers-retours sans s'en rendre compte. C'est le **probleme N+1**.\n\n## Eager loading : Include\n\nLe **chargement immediat** : tu demandes explicitement de ramener les entites liees dans la **meme requete** (EF fait un JOIN ou des requetes optimisees).\n\n```csharp\nvar equipements = db.Equipements\n    .Include(e => e.Interventions)        // charge aussi les interventions\n    .ToList();\n\n// Pour aller plus loin dans le graphe : ThenInclude\nvar equipements2 = db.Equipements\n    .Include(e => e.Interventions)\n        .ThenInclude(i => i.Technicien)   // puis le technicien de chaque intervention\n    .ToList();\n```\n\nC'est la methode **recommandee par defaut** : tu controles exactement ce que tu charges, en un nombre maitrise de requetes.\n\n## Lazy loading : pratique mais piegeux\n\nLe **chargement paresseux** : les relations ne sont chargees qu'au **moment ou tu y accedes**. EF declenche alors une requete en coulisses. Il faut l'activer (package `Microsoft.EntityFrameworkCore.Proxies`, `UseLazyLoadingProxies()`, et navigations `virtual`).\n\n```csharp\npublic class Equipement\n{\n    public int Id { get; set; }\n    public virtual List<Intervention> Interventions { get; set; }  // virtual = requis pour le lazy\n}\n\n// A l'usage :\nvar equipement = db.Equipements.First();   // 1 requete : juste l'equipement\nvar n = equipement.Interventions.Count;    // 1 requete EN PLUS, declenchee ICI\n```\n\nC'est confortable mais dangereux : un acces dans une boucle peut declencher des dizaines de requetes invisibles.\n\n## Le probleme N+1\n\nC'est **le** piege de performance des ORM, et une question d'entretien tres frequente.\n\nImagine 100 equipements, et pour chacun tu accedes a ses interventions :\n\n```csharp\nvar equipements = db.Equipements.ToList();    // 1 requete (les 100 equipements)\n\nforeach (var e in equipements)\n{\n    // En lazy loading : CHAQUE acces declenche une requete\n    Console.WriteLine(e.Interventions.Count); // 1 requete par equipement -> 100 requetes\n}\n// Total : 1 + 100 = 101 requetes pour ce qui pourrait tenir en 1 ou 2 !\n```\n\nUne requete pour la liste principale (le \"1\"), puis **N** requetes supplementaires (une par element) : d'ou le nom **N+1**.\n\n### La solution : eager loading avec Include\n\n```csharp\nvar equipements = db.Equipements\n    .Include(e => e.Interventions)   // tout en 1 (ou 2) requete(s)\n    .ToList();\n\nforeach (var e in equipements)\n{\n    Console.WriteLine(e.Interventions.Count); // deja en memoire : 0 requete supplementaire\n}\n```\n\n## AsNoTracking : lecture seule plus rapide\n\nPar defaut, EF Core **suit** (track) chaque entite lue pour detecter d'eventuelles modifications a sauvegarder. Ce suivi a un cout (memoire + CPU). Si tu fais de la **lecture seule** (affichage, rapport), desactive-le avec **`AsNoTracking()`** :\n\n```csharp\nvar liste = db.Equipements\n    .AsNoTracking()       // pas de change tracking : plus rapide, moins de memoire\n    .ToList();\n```\n\nA retenir : `AsNoTracking()` pour tout ce qui est lecture seule. Mais si tu comptes **modifier puis sauvegarder** les entites, garde le tracking (ne mets pas AsNoTracking).\n\n## Find, First, Single : quel selecteur d'un seul element ?\n\nPlusieurs methodes ramenent **un** element. Choisis selon l'intention :\n\n```csharp\n// Find : cherche par CLE PRIMAIRE. Regarde d'abord en memoire (cache du contexte)\n// avant d'aller en base. null si introuvable.\nvar e1 = db.Equipements.Find(42);\n\n// First / FirstOrDefault : le PREMIER qui correspond au filtre. Tolere plusieurs resultats.\nvar e2 = db.Equipements.First(e => e.Localisation == \"Atelier A\");        // exception si 0\nvar e3 = db.Equipements.FirstOrDefault(e => e.Localisation == \"Atelier A\"); // null si 0\n\n// Single / SingleOrDefault : exige EXACTEMENT un resultat. Exception s'il y en a plusieurs.\nvar e4 = db.Equipements.Single(e => e.Id == 42);            // exception si 0 ou >1\nvar e5 = db.Equipements.SingleOrDefault(e => e.Id == 42);   // null si 0, exception si >1\n```\n\nResume :\n\n- **`Find(cle)`** : recherche par cle primaire, regarde le cache d'abord. Le plus direct pour un Get-par-Id.\n- **`First` / `FirstOrDefault`** : \"donne-m'en un, le premier\", quand plusieurs sont possibles (souvent avec `OrderBy`).\n- **`Single` / `SingleOrDefault`** : \"il doit y en avoir un seul\", pour exprimer une contrainte d'unicite (leve une exception si ce n'est pas le cas).\n- Variantes **`...OrDefault`** : renvoient `null` au lieu de lever une exception quand il n'y a aucun resultat.\n\n## A toi : explique-le simplement (technique Feynman)\n\nReformule : *\"Eager (Include) ramene les relations en une requete maitrisee. Lazy ramene les relations a la demande, ce qui cause facilement le probleme N+1 (1 requete + N requetes dans une boucle) ; je le corrige avec Include. AsNoTracking pour la lecture seule, plus rapide. Pour un seul element : Find par cle (avec cache), First quand plusieurs sont possibles, Single quand je veux exactement un.\"*",
      "playground": null,
      "quiz": [
        {
          "question": "Qu'est-ce que le probleme N+1 en EF Core ?",
          "options": [
            "Une migration qui echoue parce qu'il manque une colonne",
            "Une requete principale suivie d'une requete supplementaire par element charge, generant un nombre excessif d'allers-retours",
            "Un conflit entre Data Annotations et Fluent API",
            "Le fait que SaveChanges echoue quand il y a N+1 entites"
          ],
          "correctIndex": 1,
          "explanation": "N+1 : une requete ramene une liste de N elements (le 1), puis l'acces a une relation pour chacun declenche N requetes supplementaires (typiquement en lazy loading dans une boucle). On le corrige avec un eager loading via Include."
        },
        {
          "question": "Quand est-il pertinent d'utiliser AsNoTracking() ?",
          "options": [
            "Quand on veut modifier les entites puis appeler SaveChanges()",
            "Quand on fait de la lecture seule et qu'on n'a pas besoin du suivi des modifications",
            "Pour activer le lazy loading",
            "Pour forcer la creation d'une migration"
          ],
          "correctIndex": 1,
          "explanation": "AsNoTracking() desactive le change tracking : c'est plus rapide et moins gourmand en memoire, ideal pour la lecture seule (affichage, rapports). En revanche, si on compte modifier puis sauvegarder les entites, il faut garder le tracking."
        },
        {
          "question": "Quelle methode est la plus adaptee pour recuperer une entite par sa cle primaire en profitant du cache du contexte ?",
          "options": [
            "First(e => e.Id == id)",
            "Single(e => e.Id == id)",
            "Find(id)",
            "Where(e => e.Id == id)"
          ],
          "correctIndex": 2,
          "explanation": "Find(cle) est concu pour la recherche par cle primaire : il regarde d'abord les entites deja chargees en memoire (cache du contexte) avant d'interroger la base, ce qui peut eviter une requete inutile."
        }
      ]
    }
  ]
};
