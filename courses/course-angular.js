window.COURSES = window.COURSES || {};
window.COURSES["angular"] = {
  "id": "angular",
  "title": "Angular",
  "icon": "NG",
  "summary": "Cours complet sur Angular moderne (v17/18) : composants standalone, cycle de vie, data binding et nouveau control flow @if/@for, services & injection de dependances, RxJS/Observables et HttpClient, routing avec guards, formulaires (template-driven vs reactive) et Signals.",
  "chapters": [
    {
      "id": "intro-composants",
      "title": "1. Qu'est-ce qu'Angular ? Composants standalone & cycle de vie",
      "markdown": "## Angular en une phrase\n\n**Angular** est un *framework* front-end developpe par Google pour construire des applications web. Contrairement a une simple bibliotheque (comme React), un framework t'impose une structure complete : routing, formulaires, injection de dependances, appels HTTP... tout est fourni et integre.\n\nAngular s'ecrit en **TypeScript** (du JavaScript avec des types) et utilise massivement les **decorateurs** (les `@Component`, `@Injectable` que tu vas croiser partout).\n\n> Attention au piege de vocabulaire : on dit **\"Angular\"** pour les versions modernes (2+, aujourd'hui v17/18). **\"AngularJS\"** (avec le JS) designe l'ancienne version 1.x, totalement differente et abandonnee. Ne confonds pas les deux en entretien.\n\n## SPA : Single Page Application\n\nAngular produit une **SPA** (*Single Page Application*). Le principe :\n\n- Le navigateur charge **une seule page HTML** (`index.html`) au depart.\n- Ensuite, Angular **reecrit dynamiquement le DOM** quand tu navigues, sans jamais recharger toute la page.\n- Les changements d'URL et l'affichage des ecrans sont geres **cote client** par le *router* Angular.\n\nResultat : l'application reagit instantanement (pas de rechargement complet du serveur a chaque clic), comme une application de bureau.\n\n## Le composant : la brique de base\n\nUne application Angular est un **arbre de composants**. Un composant = un morceau d'interface autonome (un bouton, une carte produit, une page entiere...). Chaque composant a trois parties :\n\n1. Une **classe TypeScript** (la logique, les donnees).\n2. Un **template HTML** (ce qui s'affiche).\n3. Des **styles CSS** (l'apparence).\n\n```typescript\nimport { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-bonjour',        // balise <app-bonjour></app-bonjour>\n  standalone: true,               // composant autonome (voir plus bas)\n  template: '<h1>Bonjour {{ nom }} !</h1>',\n  styles: ['h1 { color: teal; }']\n})\nexport class BonjourComponent {\n  nom = 'Laurent';\n}\n```\n\nLe decorateur `@Component({...})` transforme une classe ordinaire en composant Angular. Le `selector` est le nom de la balise HTML que tu ecriras pour afficher ce composant ailleurs.\n\n## Composants standalone (la nouveaute v17/18)\n\nHistoriquement, chaque composant devait etre declare dans un **NgModule** (`@NgModule`). C'etait verbeux et source de confusion pour les debutants.\n\nDepuis Angular 17, les **composants standalone** sont la norme par defaut (`ng new` les genere automatiquement). Un composant standalone :\n\n- porte `standalone: true`,\n- importe **lui-meme** ses dependances via la propriete `imports`,\n- **n'a plus besoin de NgModule**.\n\n```typescript\nimport { Component } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { BonjourComponent } from './bonjour.component';\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  imports: [CommonModule, BonjourComponent], // dependances importees ici\n  template: '<app-bonjour></app-bonjour>'\n})\nexport class AppComponent {}\n```\n\nLe demarrage de l'application se fait alors sans module racine, via `bootstrapApplication` dans `main.ts` :\n\n```typescript\nimport { bootstrapApplication } from '@angular/platform-browser';\nimport { AppComponent } from './app/app.component';\n\nbootstrapApplication(AppComponent);\n```\n\n## Le cycle de vie d'un composant\n\nAngular cree, met a jour, puis detruit chaque composant. A chaque etape, il appelle des methodes speciales appelees **hooks de cycle de vie** que tu peux implementer. Les plus importants :\n\n| Hook | Quand ? | Usage typique |\n|------|---------|---------------|\n| `ngOnInit` | Une fois, apres la creation et l'init des donnees | Charger des donnees, appels HTTP initiaux |\n| `ngOnChanges` | A chaque changement d'une donnee `@Input` | Reagir aux changements de proprietes entrantes |\n| `ngOnDestroy` | Juste avant la destruction du composant | Se desabonner, nettoyer (eviter les fuites memoire) |\n| `ngAfterViewInit` | Apres l'init de la vue (template rendu) | Manipuler le DOM, acceder aux `@ViewChild` |\n\n```typescript\nimport { Component, OnInit, OnDestroy } from '@angular/core';\n\n@Component({\n  selector: 'app-profil',\n  standalone: true,\n  template: '<p>Profil charge</p>'\n})\nexport class ProfilComponent implements OnInit, OnDestroy {\n\n  ngOnInit(): void {\n    // Appele une seule fois, juste apres la creation du composant.\n    // C'est ICI qu'on charge les donnees (pas dans le constructeur !).\n    console.log('Composant initialise');\n  }\n\n  ngOnDestroy(): void {\n    // Appele avant la destruction : on nettoie ce qui doit l'etre.\n    console.log('Composant detruit');\n  }\n}\n```\n\n> Regle d'or : le **constructeur** sert a l'injection de dependances, pas a la logique d'initialisation. On charge les donnees dans **`ngOnInit`**, car a ce moment les `@Input` sont disponibles et le composant est pret.\n\n## A retenir\n\n- Angular = framework complet (≠ AngularJS 1.x).\n- Une app Angular est une **SPA** : une page, le DOM est reecrit cote client.\n- La brique de base est le **composant** (`@Component`).\n- Les **composants standalone** (`standalone: true`) remplacent les NgModules depuis v17.\n- Les **hooks** comme `ngOnInit` (init/chargement) et `ngOnDestroy` (nettoyage) jalonnent le cycle de vie.",
      "playground": null,
      "quiz": [
        {
          "question": "Quelle affirmation decrit le mieux une SPA (Single Page Application) Angular ?",
          "options": [
            "Le serveur renvoie une nouvelle page HTML complete a chaque clic de l'utilisateur",
            "Le navigateur charge une page initiale, puis Angular reecrit le DOM cote client sans rechargement complet",
            "L'application ne peut afficher qu'un seul ecran, sans navigation possible",
            "Toute la logique s'execute sur le serveur et le client n'affiche que des images"
          ],
          "correctIndex": 1,
          "explanation": "Une SPA charge une seule page HTML au depart ; ensuite Angular met a jour dynamiquement le DOM et gere la navigation cote client, sans rechargement complet du serveur."
        },
        {
          "question": "Que change l'approche \"standalone\" introduite par defaut dans Angular 17 ?",
          "options": [
            "Les composants doivent obligatoirement etre declares dans un NgModule",
            "Les composants importent eux-memes leurs dependances et n'ont plus besoin de NgModule",
            "Les composants ne peuvent plus avoir de template HTML",
            "Le TypeScript est remplace par du JavaScript pur"
          ],
          "correctIndex": 1,
          "explanation": "Un composant standalone (standalone: true) declare ses propres dependances via 'imports' et se passe completement de NgModule. C'est le mode par defaut depuis Angular 17."
        },
        {
          "question": "Dans quel hook de cycle de vie charge-t-on classiquement les donnees initiales d'un composant ?",
          "options": [
            "ngOnDestroy",
            "ngAfterViewInit",
            "ngOnInit",
            "Dans le constructeur uniquement"
          ],
          "correctIndex": 2,
          "explanation": "ngOnInit est appele une fois apres la creation du composant, quand les @Input sont disponibles : c'est l'endroit recommande pour l'initialisation et les appels de chargement. Le constructeur, lui, sert a l'injection de dependances."
        }
      ]
    },
    {
      "id": "templates-binding",
      "title": "2. Templates & data binding (+ control flow @if/@for)",
      "markdown": "## Le template : du HTML enrichi\n\nLe **template** d'un composant est du HTML, mais Angular y ajoute une syntaxe speciale pour **lier** (binder) les donnees de la classe a l'affichage, et l'affichage aux actions de l'utilisateur. C'est le **data binding**.\n\nIl existe quatre formes de binding. Une bonne facon de les memoriser : regarde les **symboles** (`{{ }}`, `[ ]`, `( )`, `[( )]`).\n\n## 1. Interpolation : `{{ }}`\n\nAffiche la valeur d'une propriete de la classe dans le texte HTML. C'est le binding le plus simple, **lecture seule**, de la classe vers la vue.\n\n```typescript\nexport class ProfilComponent {\n  prenom = 'Laurent';\n  age = 28;\n}\n```\n\n```html\n<p>Bonjour {{ prenom }}, tu as {{ age }} ans.</p>\n<p>Dans 5 ans : {{ age + 5 }} ans.</p>\n```\n\nTu peux mettre des expressions simples (`age + 5`), mais **pas** d'instructions complexes (pas de `if`, pas d'affectation).\n\n## 2. Property binding : `[ ]`\n\nLie une **propriete d'un element HTML** (ou d'un composant) a une valeur de la classe. Les crochets `[ ]` veulent dire : *\"la valeur vient de la classe\"*.\n\n```typescript\nexport class ImageComponent {\n  urlImage = 'https://exemple.com/photo.jpg';\n  estDesactive = true;\n}\n```\n\n```html\n<img [src]=\"urlImage\" alt=\"photo\">\n<button [disabled]=\"estDesactive\">Valider</button>\n```\n\nDifference cle avec l'interpolation : `[disabled]=\"estDesactive\"` passe un **booleen** (true/false), alors que `disabled=\"{{ estDesactive }}\"` passerait une **chaine de caracteres** (\"true\"), ce qui n'est pas pareil.\n\n## 3. Event binding : `( )`\n\nReagit a un **evenement** de l'utilisateur (clic, saisie, survol...). Les parentheses `( )` veulent dire : *\"on ecoute un evenement\"*.\n\n```typescript\nexport class CompteurComponent {\n  total = 0;\n\n  incrementer(): void {\n    this.total++;\n  }\n}\n```\n\n```html\n<button (click)=\"incrementer()\">Ajouter</button>\n<p>Total : {{ total }}</p>\n```\n\nL'objet evenement natif est accessible via la variable speciale `$event` :\n\n```html\n<input (input)=\"onSaisie($event)\">\n```\n\n## 4. Two-way binding : `[( )]`\n\nCombine property binding **et** event binding : la donnee circule dans les **deux sens** (la vue met a jour la classe, et la classe met a jour la vue). La syntaxe `[( )]` est surnommee *\"banana in a box\"* (la banane `( )` dans la boite `[ ]`).\n\nIl faut importer `FormsModule` pour utiliser `[(ngModel)]` :\n\n```typescript\nimport { Component } from '@angular/core';\nimport { FormsModule } from '@angular/forms';\n\n@Component({\n  selector: 'app-recherche',\n  standalone: true,\n  imports: [FormsModule],\n  template: `\n    <input [(ngModel)]=\"terme\">\n    <p>Tu cherches : {{ terme }}</p>\n  `\n})\nexport class RechercheComponent {\n  terme = '';\n}\n```\n\nQuand l'utilisateur tape dans le champ, `terme` se met a jour automatiquement, et inversement.\n\n## Le nouveau control flow : @if / @for / @switch (v17)\n\nAvant Angular 17, on utilisait des **directives structurelles** : `*ngIf`, `*ngFor`, `*ngSwitch`. Elles fonctionnent encore mais Angular 17 a introduit un **control flow integre** au langage de template, plus lisible, plus rapide, et qui **n'a pas besoin d'import** (`CommonModule` n'est plus requis pour ca).\n\n### @if (remplace *ngIf)\n\n```html\n@if (utilisateur.estConnecte) {\n  <p>Bienvenue {{ utilisateur.nom }}</p>\n} @else if (utilisateur.estInvite) {\n  <p>Mode invite</p>\n} @else {\n  <p>Merci de vous connecter</p>\n}\n```\n\n### @for (remplace *ngFor) — `track` est OBLIGATOIRE\n\n```html\n@for (produit of produits; track produit.id) {\n  <li>{{ produit.nom }} - {{ produit.prix }} EUR</li>\n} @empty {\n  <li>Aucun produit disponible</li>\n}\n```\n\nLe `track produit.id` est **obligatoire** : il dit a Angular comment identifier chaque element pour optimiser le re-rendu (ne re-dessiner que ce qui change). Le bloc `@empty` s'affiche quand la liste est vide — bien pratique.\n\n### @switch (remplace *ngSwitch)\n\n```html\n@switch (role) {\n  @case ('admin') { <p>Acces total</p> }\n  @case ('user')  { <p>Acces limite</p> }\n  @default        { <p>Aucun acces</p> }\n}\n```\n\n## Ancienne syntaxe (a reconnaitre)\n\nTu rencontreras encore l'ancienne syntaxe dans du code existant :\n\n```html\n<p *ngIf=\"estConnecte\">Bienvenue</p>\n<li *ngFor=\"let p of produits\">{{ p.nom }}</li>\n```\n\nElle reste valide, mais pour du code neuf en v17/18, prefere `@if` et `@for`.\n\n## A retenir\n\n- `{{ }}` interpolation (classe → vue, texte).\n- `[ ]` property binding (classe → propriete d'element).\n- `( )` event binding (vue → classe, evenements).\n- `[( )]` two-way binding (les deux sens, ex. `[(ngModel)]`).\n- Nouveau control flow v17 : `@if`, `@for` (avec `track` obligatoire et `@empty`), `@switch` — plus besoin d'importer `CommonModule` pour ces blocs.",
      "playground": null,
      "quiz": [
        {
          "question": "Quel binding utiliser pour lier une propriete de la classe a un attribut HTML, par exemple [src] d'une image, dans le sens classe vers vue ?",
          "options": [
            "L'interpolation {{ }}",
            "Le property binding [ ]",
            "L'event binding ( )",
            "Le two-way binding [( )]"
          ],
          "correctIndex": 1,
          "explanation": "Le property binding avec des crochets [ ] lie une propriete d'un element a une valeur de la classe (classe vers vue). [(ngModel)] serait du two-way, et ( ) serait pour ecouter un evenement."
        },
        {
          "question": "Dans le nouveau control flow d'Angular 17, qu'est-ce qui est OBLIGATOIRE dans un bloc @for ?",
          "options": [
            "L'import de CommonModule",
            "Un bloc @empty",
            "L'expression track pour identifier chaque element",
            "Un attribut *ngFor"
          ],
          "correctIndex": 2,
          "explanation": "Le bloc @for impose la clause 'track' (ex. track item.id) pour permettre a Angular d'identifier chaque element et d'optimiser le rendu. @empty est optionnel, et CommonModule n'est plus necessaire pour le control flow integre."
        },
        {
          "question": "Quelle syntaxe correspond au two-way binding (banana in a box) ?",
          "options": [
            "{{ valeur }}",
            "[valeur]",
            "(valeur)",
            "[(ngModel)]"
          ],
          "correctIndex": 3,
          "explanation": "Le two-way binding combine crochets et parentheses [( )], la fameuse 'banane dans la boite'. Avec ngModel cela donne [(ngModel)] (necessite l'import de FormsModule)."
        }
      ]
    },
    {
      "id": "services-di",
      "title": "3. Services & injection de dependances",
      "markdown": "## Pourquoi des services ?\n\nUn **composant** doit gerer l'affichage et l'interaction. Mais la logique metier (appels a une API, calculs, acces a des donnees partagees) ne doit **pas** vivre dans le composant : sinon le code est duplique et difficile a tester.\n\nLa solution Angular : le **service**. Un service est une classe TypeScript qui regroupe une logique reutilisable, que plusieurs composants peuvent partager.\n\n```typescript\nimport { Injectable } from '@angular/core';\n\n@Injectable({\n  providedIn: 'root'\n})\nexport class PanierService {\n  private articles: string[] = [];\n\n  ajouter(article: string): void {\n    this.articles.push(article);\n  }\n\n  lister(): string[] {\n    return this.articles;\n  }\n}\n```\n\nLe decorateur `@Injectable()` indique a Angular que cette classe peut etre **injectee** dans d'autres classes.\n\n## L'injection de dependances (DI)\n\nL'**injection de dependances** (*Dependency Injection*, DI) est un patron central d'Angular. Au lieu qu'un composant **cree lui-meme** ses dependances (`new PanierService()`), c'est **Angular qui les fournit** automatiquement.\n\n> Metaphore : tu ne construis pas ta propre voiture quand tu veux te deplacer ; tu demandes un taxi, et il arrive deja pret. Tu \"declares ton besoin\", Angular \"livre\" l'instance.\n\nAvantages : code decouple, instances partagees (un seul `PanierService` pour toute l'app), et tests faciles (on peut injecter une fausse version).\n\n## Deux facons d'injecter\n\n### Via le constructeur (classique)\n\n```typescript\nimport { Component } from '@angular/core';\nimport { PanierService } from './panier.service';\n\n@Component({ /* ... */ })\nexport class BoutiqueComponent {\n  // Angular voit le type PanierService et fournit l'instance automatiquement\n  constructor(private panier: PanierService) {}\n\n  ajouterPomme(): void {\n    this.panier.ajouter('Pomme');\n  }\n}\n```\n\n### Via la fonction inject() (moderne, v14+)\n\nDepuis Angular 14, on peut utiliser la fonction `inject()`, tres pratique avec les composants standalone et les Signals :\n\n```typescript\nimport { Component, inject } from '@angular/core';\nimport { PanierService } from './panier.service';\n\n@Component({ /* ... */ })\nexport class BoutiqueComponent {\n  private panier = inject(PanierService);\n\n  ajouterPomme(): void {\n    this.panier.ajouter('Pomme');\n  }\n}\n```\n\nLes deux approches font la meme chose ; `inject()` est souvent plus concise et est devenue tres courante en v17/18.\n\n## providedIn: 'root' et les singletons\n\nLa propriete `providedIn: 'root'` dans `@Injectable` est la facon moderne d'**enregistrer** un service. Elle signifie :\n\n- Le service est disponible **dans toute l'application** (au niveau racine).\n- Angular cree **une seule instance** partagee : c'est un **singleton**. Tous les composants qui injectent ce service partagent le **meme** objet.\n- Bonus : le *tree-shaking* fonctionne — si aucun composant n'utilise le service, il est retire du bundle final.\n\n```typescript\n@Injectable({ providedIn: 'root' }) // <- singleton global, recommande par defaut\nexport class AuthService {\n  utilisateurConnecte = false;\n}\n```\n\nAinsi, si le composant A met `utilisateurConnecte = true`, le composant B verra aussi `true` : ils partagent l'instance.\n\nOn peut aussi fournir un service de facon plus locale (par exemple a un composant precis via `providers: [...]`), ce qui cree alors une **nouvelle instance** par composant. Mais `providedIn: 'root'` couvre la grande majorite des cas.\n\n## A retenir\n\n- Un **service** = logique reutilisable et partagee, decoree par `@Injectable`.\n- L'**injection de dependances** : Angular fournit les instances, tu ne fais pas de `new`.\n- Deux styles : injection par **constructeur** ou via **`inject()`** (moderne).\n- `providedIn: 'root'` enregistre le service globalement en **singleton** (une seule instance partagee) et permet le tree-shaking.",
      "playground": null,
      "quiz": [
        {
          "question": "Que signifie providedIn: 'root' dans un decorateur @Injectable ?",
          "options": [
            "Le service est accessible uniquement dans le composant racine et nulle part ailleurs",
            "Le service est disponible dans toute l'application en une seule instance partagee (singleton)",
            "Le service cree une nouvelle instance pour chaque composant qui l'injecte",
            "Le service est desactive tant qu'on ne l'importe pas dans un NgModule"
          ],
          "correctIndex": 1,
          "explanation": "providedIn: 'root' enregistre le service au niveau racine : il est disponible partout et Angular en cree une seule instance partagee (singleton), avec en bonus le tree-shaking."
        },
        {
          "question": "Quel est l'interet principal de l'injection de dependances dans Angular ?",
          "options": [
            "Forcer chaque composant a creer ses services avec new",
            "Laisser Angular fournir les instances, ce qui decouple le code et facilite les tests",
            "Empecher tout partage de donnees entre composants",
            "Remplacer le HTML par du TypeScript"
          ],
          "correctIndex": 1,
          "explanation": "La DI fait qu'Angular fournit lui-meme les dependances (pas de new manuel) : le code est decouple, les instances peuvent etre partagees et on peut injecter de fausses versions pour les tests."
        },
        {
          "question": "Quelle fonction, introduite en Angular 14, permet d'injecter un service sans passer par le constructeur ?",
          "options": [
            "provide()",
            "resolve()",
            "inject()",
            "useService()"
          ],
          "correctIndex": 2,
          "explanation": "La fonction inject() permet de recuperer une dependance directement (ex. private panier = inject(PanierService)). Elle est tres utilisee avec les composants standalone et les Signals depuis la v14+."
        }
      ]
    },
    {
      "id": "rxjs-http",
      "title": "4. RxJS & Observables, HttpClient",
      "markdown": "## Le probleme : l'asynchrone\n\nQuand ton app appelle une API, la reponse n'arrive pas tout de suite : c'est **asynchrone**. Angular gere ca avec **RxJS**, une bibliotheque de *programmation reactive* basee sur les **Observables**.\n\n> Metaphore : un **Observable** est comme un abonnement a une chaine YouTube. Tant que tu ne t'**abonnes** pas (`subscribe`), rien n'arrive. Une fois abonne, tu recois les nouvelles videos (les valeurs) au fur et a mesure qu'elles sortent (dans le temps).\n\nUn Observable est donc un **flux de valeurs dans le temps** : 0, 1 ou plusieurs valeurs, eventuellement une erreur, puis une completion.\n\n## subscribe : declencher le flux\n\nUn Observable est **paresseux** : il ne fait rien tant que personne ne s'abonne. C'est `subscribe()` qui demarre le travail et recoit les valeurs.\n\n```typescript\nimport { of } from 'rxjs';\n\nconst flux$ = of(1, 2, 3); // $ a la fin du nom = convention pour un Observable\n\nflux$.subscribe({\n  next:  (valeur) => console.log('Recu :', valeur), // appele pour chaque valeur\n  error: (err)   => console.error('Erreur :', err),\n  complete: ()   => console.log('Termine')\n});\n// Affiche : Recu : 1 / Recu : 2 / Recu : 3 / Termine\n```\n\n## pipe et les operateurs (map, filter...)\n\nLa puissance de RxJS vient des **operateurs** : des fonctions qui transforment le flux. On les enchaine dans `pipe()`.\n\n- `map` : transforme chaque valeur (comme `Array.map`).\n- `filter` : ne garde que les valeurs qui passent un test.\n- `tap` : execute un effet de bord (log, debug) sans modifier le flux.\n\n```typescript\nimport { of } from 'rxjs';\nimport { map, filter } from 'rxjs/operators';\n\nof(1, 2, 3, 4)\n  .pipe(\n    filter(n => n % 2 === 0),  // garde 2 et 4\n    map(n => n * 10)           // transforme en 20 et 40\n  )\n  .subscribe(v => console.log(v)); // Affiche : 20 puis 40\n```\n\n## HttpClient : appeler une API\n\nLe service `HttpClient` d'Angular fait les requetes HTTP et **renvoie des Observables**. Pour l'activer dans une app standalone, on l'enregistre dans `main.ts` :\n\n```typescript\nimport { bootstrapApplication } from '@angular/platform-browser';\nimport { provideHttpClient } from '@angular/common/http';\nimport { AppComponent } from './app/app.component';\n\nbootstrapApplication(AppComponent, {\n  providers: [provideHttpClient()]\n});\n```\n\nEnsuite on l'injecte dans un service :\n\n```typescript\nimport { Injectable, inject } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\nimport { Observable } from 'rxjs';\n\ninterface Utilisateur { id: number; nom: string; }\n\n@Injectable({ providedIn: 'root' })\nexport class UtilisateurService {\n  private http = inject(HttpClient);\n  private url = 'https://api.exemple.com/users';\n\n  getUtilisateurs(): Observable<Utilisateur[]> {\n    return this.http.get<Utilisateur[]>(this.url);\n  }\n}\n```\n\nNote : `http.get<Utilisateur[]>(...)` renvoie un **Observable** ; la requete part seulement quand on s'abonne (directement ou via l'`async` pipe).\n\n## L'async pipe : s'abonner sans effort (et sans fuite)\n\nDans le composant, tu pourrais faire `subscribe()` a la main... mais il faudrait penser a te **desabonner** dans `ngOnDestroy` pour eviter les **fuites memoire**. Angular propose mieux : l'**`async` pipe** dans le template.\n\nL'`async` pipe s'abonne **automatiquement** a l'Observable, affiche la derniere valeur, et se **desabonne automatiquement** quand le composant est detruit.\n\n```typescript\nimport { Component, inject } from '@angular/core';\nimport { AsyncPipe } from '@angular/common';\nimport { UtilisateurService } from './utilisateur.service';\n\n@Component({\n  selector: 'app-liste',\n  standalone: true,\n  imports: [AsyncPipe],\n  template: `\n    @if (utilisateurs$ | async; as users) {\n      <ul>\n        @for (u of users; track u.id) {\n          <li>{{ u.nom }}</li>\n        }\n      </ul>\n    } @else {\n      <p>Chargement...</p>\n    }\n  `\n})\nexport class ListeComponent {\n  private service = inject(UtilisateurService);\n  utilisateurs$ = this.service.getUtilisateurs(); // Observable, pas subscribe ici\n}\n```\n\nIci, **on ne fait pas de `subscribe()` manuel** : l'`async` pipe gere tout. C'est la facon recommandee d'afficher des donnees asynchrones.\n\n## A retenir\n\n- Un **Observable** = flux de valeurs dans le temps ; paresseux, il demarre au `subscribe()`.\n- `pipe()` enchaine des **operateurs** : `map` (transforme), `filter` (filtre), `tap` (effet de bord).\n- `HttpClient` fait les requetes et **renvoie des Observables** ; on l'active via `provideHttpClient()`.\n- L'**`async` pipe** s'abonne et se desabonne tout seul dans le template : evite les fuites memoire et le `subscribe` manuel.",
      "playground": null,
      "quiz": [
        {
          "question": "Pourquoi dit-on qu'un Observable est 'paresseux' (lazy) ?",
          "options": [
            "Il execute son code immediatement a sa creation",
            "Il ne produit aucune valeur tant que personne ne s'y abonne avec subscribe",
            "Il ne peut emettre qu'une seule valeur au maximum",
            "Il bloque le thread principal pendant son execution"
          ],
          "correctIndex": 1,
          "explanation": "Un Observable ne fait rien tant qu'aucun abonne n'appelle subscribe() (ou que l'async pipe ne s'abonne). C'est l'abonnement qui declenche reellement le flux."
        },
        {
          "question": "Quel operateur RxJS utilise-t-on dans pipe() pour transformer chaque valeur emise (par exemple multiplier par 10) ?",
          "options": [
            "filter",
            "subscribe",
            "map",
            "complete"
          ],
          "correctIndex": 2,
          "explanation": "map transforme chaque valeur du flux, comme Array.map. filter ne fait que retenir certaines valeurs, et subscribe declenche l'abonnement (ce n'est pas un operateur de pipe)."
        },
        {
          "question": "Quel est l'avantage principal de l'async pipe dans un template Angular ?",
          "options": [
            "Il transforme un Observable en tableau JavaScript classique de facon synchrone",
            "Il s'abonne et se desabonne automatiquement, evitant les fuites memoire",
            "Il remplace HttpClient pour faire les requetes HTTP",
            "Il empeche tout affichage tant que le composant n'est pas detruit"
          ],
          "correctIndex": 1,
          "explanation": "L'async pipe s'abonne automatiquement a l'Observable, affiche sa derniere valeur, et se desabonne quand le composant est detruit : plus besoin de subscribe/unsubscribe manuel, ce qui evite les fuites memoire."
        }
      ]
    },
    {
      "id": "routing",
      "title": "5. Routing : routes, routerLink & guards",
      "markdown": "## Naviguer dans une SPA\n\nComme Angular est une **SPA** (une seule page), changer d'ecran ne recharge pas le navigateur. C'est le **Router** Angular qui associe une **URL** a un **composant** a afficher, sans rechargement.\n\n## Definir les routes\n\nOn declare un tableau de **routes** : chaque route fait correspondre un chemin (`path`) a un composant. En v17/18 (standalone), on les enregistre via `provideRouter` dans `main.ts`.\n\n```typescript\n// app.routes.ts\nimport { Routes } from '@angular/router';\nimport { AccueilComponent } from './accueil.component';\nimport { ProfilComponent } from './profil.component';\n\nexport const routes: Routes = [\n  { path: '',        component: AccueilComponent },       // page d'accueil\n  { path: 'profil',  component: ProfilComponent },        // /profil\n  { path: 'profil/:id', component: ProfilComponent },     // parametre :id\n  { path: '**',      component: AccueilComponent }        // route 404 (wildcard)\n];\n```\n\n```typescript\n// main.ts\nimport { bootstrapApplication } from '@angular/platform-browser';\nimport { provideRouter } from '@angular/router';\nimport { AppComponent } from './app/app.component';\nimport { routes } from './app/app.routes';\n\nbootstrapApplication(AppComponent, {\n  providers: [provideRouter(routes)]\n});\n```\n\n- `:id` est un **parametre de route** (ex. `/profil/42`).\n- `**` est la route **wildcard**, attrapee en dernier (typiquement pour une page 404). L'ordre compte : `**` doit etre **a la fin**.\n\n## router-outlet : ou s'affiche le composant\n\nLe composant racine doit contenir `<router-outlet>` : c'est l'emplacement ou Angular **injecte** le composant correspondant a l'URL.\n\n```typescript\nimport { Component } from '@angular/core';\nimport { RouterOutlet, RouterLink } from '@angular/router';\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  imports: [RouterOutlet, RouterLink],\n  template: `\n    <nav>\n      <a routerLink=\"/\">Accueil</a>\n      <a routerLink=\"/profil\">Profil</a>\n    </nav>\n    <router-outlet></router-outlet>\n  `\n})\nexport class AppComponent {}\n```\n\n## routerLink : naviguer sans recharger\n\nPour creer des liens de navigation, on utilise la directive **`routerLink`** au lieu de `href`. Avec `href`, le navigateur rechargerait toute la page (on perdrait l'avantage SPA). `routerLink` navigue **cote client**.\n\n```html\n<a routerLink=\"/profil\">Mon profil</a>\n\n<!-- avec un parametre dynamique -->\n<a [routerLink]=\"['/profil', utilisateur.id]\">Voir le profil</a>\n```\n\nPour naviguer depuis le code TypeScript, on injecte le `Router` :\n\n```typescript\nimport { inject } from '@angular/core';\nimport { Router } from '@angular/router';\n\nexport class ConnexionComponent {\n  private router = inject(Router);\n\n  apresConnexion(): void {\n    this.router.navigate(['/profil']);\n  }\n}\n```\n\n## Guards : proteger une route avec CanActivate\n\nUn **guard** est une fonction qui decide si on **a le droit** d'acceder a une route. Le plus courant est **`CanActivate`** : il renvoie `true` (acces autorise) ou `false` (acces refuse, souvent avec redirection).\n\nUsage typique : empecher un utilisateur non connecte d'acceder a une page privee.\n\nDepuis Angular 15+, les guards s'ecrivent comme de **simples fonctions** (functional guards), plus legeres que les anciennes classes :\n\n```typescript\nimport { inject } from '@angular/core';\nimport { CanActivateFn, Router } from '@angular/router';\nimport { AuthService } from './auth.service';\n\nexport const authGuard: CanActivateFn = (route, state) => {\n  const auth = inject(AuthService);\n  const router = inject(Router);\n\n  if (auth.estConnecte()) {\n    return true; // acces autorise\n  }\n  // sinon, redirige vers la page de connexion\n  return router.createUrlTree(['/connexion']);\n};\n```\n\nOn branche le guard sur la route via `canActivate` :\n\n```typescript\nexport const routes: Routes = [\n  {\n    path: 'admin',\n    component: AdminComponent,\n    canActivate: [authGuard]   // route protegee\n  }\n];\n```\n\nMaintenant, acceder a `/admin` sans etre connecte declenche le guard, qui renvoie une redirection vers `/connexion`.\n\n## A retenir\n\n- Le **Router** associe une URL a un composant, sans recharger la page (SPA).\n- Les **routes** (`{ path, component }`) sont enregistrees via `provideRouter` ; `:id` = parametre, `**` = wildcard (en dernier).\n- `<router-outlet>` marque l'endroit ou le composant de la route s'affiche.\n- `routerLink` cree des liens de navigation cote client (pas `href`).\n- Un **guard** `CanActivate` autorise (`true`) ou bloque l'acces a une route ; ecrit comme une fonction depuis v15+.",
      "playground": null,
      "quiz": [
        {
          "question": "Pourquoi utilise-t-on routerLink plutot que href pour naviguer dans une application Angular ?",
          "options": [
            "href ne fonctionne pas du tout dans un navigateur moderne",
            "routerLink navigue cote client sans recharger toute la page, preservant l'avantage SPA",
            "routerLink est obligatoire pour tous les liens, meme externes",
            "href est reserve aux images et routerLink au texte"
          ],
          "correctIndex": 1,
          "explanation": "routerLink declenche la navigation interne du Router, cote client, sans rechargement complet. Un href provoquerait un rechargement de page et ferait perdre l'etat de la SPA."
        },
        {
          "question": "A quoi sert un guard CanActivate sur une route ?",
          "options": [
            "A definir le style CSS de la page de destination",
            "A decider si l'utilisateur a le droit d'acceder a la route (renvoie true ou bloque/redirige)",
            "A charger les donnees HTTP avant l'affichage",
            "A declarer le composant racine de l'application"
          ],
          "correctIndex": 1,
          "explanation": "Un guard CanActivate autorise l'acces (return true) ou le refuse (return false ou une redirection via createUrlTree). C'est typiquement utilise pour proteger des pages reservees aux utilisateurs connectes."
        },
        {
          "question": "Que represente la route { path: '**', component: PageIntrouvableComponent } et ou doit-elle figurer ?",
          "options": [
            "La page d'accueil, a placer en premier",
            "Une route avec parametre, a placer n'importe ou",
            "La route wildcard (404), a placer en dernier car elle attrape toutes les URLs non reconnues",
            "Une route protegee par un guard, placee au milieu"
          ],
          "correctIndex": 2,
          "explanation": "** est la route wildcard qui capture toute URL non reconnue (typiquement une page 404). Comme le Router prend la premiere route qui correspond, elle doit etre declaree en dernier."
        }
      ]
    },
    {
      "id": "formulaires-signals",
      "title": "6. Formulaires (template-driven vs reactive) & Signals",
      "markdown": "## Deux approches pour les formulaires\n\nAngular propose **deux facons** de gerer les formulaires. Elles repondent au meme besoin (saisir et valider des donnees) mais avec des philosophies differentes.\n\n### 1. Template-driven (pilote par le template)\n\nLa logique vit dans le **HTML**. Simple et rapide pour de petits formulaires. On importe `FormsModule` et on utilise `[(ngModel)]`.\n\n```typescript\nimport { Component } from '@angular/core';\nimport { FormsModule } from '@angular/forms';\n\n@Component({\n  selector: 'app-contact',\n  standalone: true,\n  imports: [FormsModule],\n  template: `\n    <form #f=\"ngForm\" (ngSubmit)=\"envoyer()\">\n      <input name=\"email\" [(ngModel)]=\"email\" required email>\n      <button [disabled]=\"f.invalid\">Envoyer</button>\n    </form>\n  `\n})\nexport class ContactComponent {\n  email = '';\n  envoyer(): void { console.log(this.email); }\n}\n```\n\nLes validations (`required`, `email`) s'ecrivent comme des attributs HTML. Pratique, mais difficile a tester et a faire grandir.\n\n### 2. Reactive (pilote par le code)\n\nLa logique vit dans la **classe TypeScript** : on construit explicitement le formulaire avec `FormGroup` et `FormControl`. Plus verbeux, mais plus puissant, testable et adapte aux gros formulaires. On importe `ReactiveFormsModule`.\n\n```typescript\nimport { Component, inject } from '@angular/core';\nimport { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';\n\n@Component({\n  selector: 'app-inscription',\n  standalone: true,\n  imports: [ReactiveFormsModule],\n  template: `\n    <form [formGroup]=\"form\" (ngSubmit)=\"envoyer()\">\n      <input formControlName=\"email\">\n      <input formControlName=\"motDePasse\" type=\"password\">\n      <button [disabled]=\"form.invalid\">S'inscrire</button>\n    </form>\n  `\n})\nexport class InscriptionComponent {\n  private fb = inject(FormBuilder);\n\n  form = this.fb.group({\n    email:     ['', [Validators.required, Validators.email]],\n    motDePasse: ['', [Validators.required, Validators.minLength(8)]]\n  });\n\n  envoyer(): void {\n    if (this.form.valid) {\n      console.log(this.form.value);\n    }\n  }\n}\n```\n\n### Lequel choisir ?\n\n| | Template-driven | Reactive |\n|---|---|---|\n| Logique | Dans le HTML (`ngModel`) | Dans le code (`FormGroup`) |\n| Module | `FormsModule` | `ReactiveFormsModule` |\n| Ideal pour | Petits formulaires simples | Formulaires complexes, validations dynamiques |\n| Testabilite | Faible | Forte |\n\nEn entreprise, l'approche **reactive** est souvent preferee pour sa robustesse.\n\n## Les Signals (la grande nouveaute v16/17)\n\nLes **Signals** sont un nouveau systeme de **reactivite** introduit en Angular 16 et stabilise en v17. Un *signal* est une valeur **reactive** : quand sa valeur change, Angular sait exactement quoi mettre a jour dans la vue, **sans tout re-verifier**. C'est plus performant et plus simple a comprendre que les Observables pour l'etat local.\n\n### signal() : creer une valeur reactive\n\n```typescript\nimport { signal } from '@angular/core';\n\nconst compteur = signal(0);   // creation\n\nconsole.log(compteur());      // LECTURE : on APPELLE le signal -> 0\ncompteur.set(5);              // remplace la valeur -> 5\ncompteur.update(n => n + 1); // calcule a partir de l'ancienne -> 6\n```\n\nPoint cle : pour **lire** un signal, on **l'appelle comme une fonction** : `compteur()`. Pour le **modifier**, on utilise `.set()` (nouvelle valeur) ou `.update()` (a partir de l'ancienne).\n\n### computed() : valeur derivee automatique\n\nUn `computed` est un signal **calcule** a partir d'autres signals. Il se recalcule **automatiquement** quand ses dependances changent.\n\n```typescript\nimport { signal, computed } from '@angular/core';\n\nconst prix     = signal(100);\nconst quantite = signal(3);\nconst total    = computed(() => prix() * quantite()); // derive\n\nconsole.log(total()); // 300\nquantite.set(4);\nconsole.log(total()); // 400 -> recalcule tout seul\n```\n\n### Dans un composant\n\n```typescript\nimport { Component, signal, computed } from '@angular/core';\n\n@Component({\n  selector: 'app-panier',\n  standalone: true,\n  template: `\n    <p>Articles : {{ quantite() }}</p>\n    <p>Total : {{ total() }} EUR</p>\n    <button (click)=\"ajouter()\">+1</button>\n  `\n})\nexport class PanierComponent {\n  quantite = signal(1);\n  prixUnitaire = signal(20);\n  total = computed(() => this.quantite() * this.prixUnitaire());\n\n  ajouter(): void {\n    this.quantite.update(n => n + 1);\n  }\n}\n```\n\nDans le template, on appelle simplement `quantite()` et `total()` : Angular met a jour **uniquement** ce qui depend du signal modifie. Les Signals sont au coeur de la strategie de performance d'Angular (vers une detection de changements plus fine, dite *zoneless*).\n\n## A retenir\n\n- Deux types de formulaires : **template-driven** (`FormsModule`, `ngModel`, simple) vs **reactive** (`ReactiveFormsModule`, `FormGroup`, robuste et testable).\n- Un **signal** est une valeur reactive : on la **lit en l'appelant** (`compteur()`), on la modifie avec `.set()` / `.update()`.\n- `computed()` derive une valeur d'autres signals et se recalcule automatiquement.\n- Les Signals (v16/17) ameliorent la performance en mettant a jour uniquement ce qui change.",
      "playground": null,
      "quiz": [
        {
          "question": "Quelle est la difference fondamentale entre formulaires template-driven et reactive ?",
          "options": [
            "Le template-driven ne permet aucune validation, le reactive si",
            "Le template-driven place la logique dans le HTML (ngModel), le reactive la place dans le code (FormGroup)",
            "Le reactive fonctionne uniquement sans TypeScript",
            "Il n'y a aucune difference, ce sont deux noms pour la meme chose"
          ],
          "correctIndex": 1,
          "explanation": "Dans l'approche template-driven, la logique vit dans le template via ngModel (FormsModule). Dans l'approche reactive, on construit le formulaire dans la classe avec FormGroup/FormControl (ReactiveFormsModule), ce qui est plus robuste et testable."
        },
        {
          "question": "Comment lit-on la valeur d'un signal Angular dans le code ou le template ?",
          "options": [
            "En accedant a .value, comme monSignal.value",
            "En l'appelant comme une fonction : monSignal()",
            "En s'y abonnant avec subscribe()",
            "En utilisant l'async pipe obligatoirement"
          ],
          "correctIndex": 1,
          "explanation": "On lit un signal en l'appelant comme une fonction, par exemple compteur(). Pour le modifier, on utilise .set(nouvelleValeur) ou .update(ancienne => ...)."
        },
        {
          "question": "Que fait computed() en Angular ?",
          "options": [
            "Il cree une requete HTTP asynchrone",
            "Il cree une valeur derivee d'autres signals qui se recalcule automatiquement quand ses dependances changent",
            "Il transforme un Observable en signal une seule fois sans mise a jour",
            "Il remplace ngOnInit pour le chargement des donnees"
          ],
          "correctIndex": 1,
          "explanation": "computed() definit un signal calcule a partir d'autres signals (ex. total = computed(() => prix() * quantite())). Il se recalcule automatiquement des qu'une de ses dependances change."
        }
      ]
    }
  ]
};
