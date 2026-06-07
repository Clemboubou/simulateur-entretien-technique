# Simulateur d'entretien technique — .NET / Angular

Un quiz technique chronométré, dans le style des plateformes de recrutement (Tests4Geeks / TestDome), avec **exécution réelle du code dans le navigateur**. Aucun logiciel à installer : tout tourne sur une page web.

➡️ **Pour l'utiliser : ouvre simplement `index.html`** (ou via le lien GitHub Pages une fois activé).

## Ce qu'il contient

- **174 questions** vérifiées : C#, ASP.NET Core, Entity Framework Core, Angular, JavaScript/TypeScript, CSS, Git, SQL, Agile, **Java, Spring Boot, Docker**.
- **IDE intégré** (Monaco, le moteur de VS Code) pour les exercices de code.
- **Exécution réelle du code :**
  - **SQL** → vrai moteur SQLite (sql.js / WebAssembly), embarqué, fonctionne **hors-ligne**.
  - **JavaScript** → exécuté en local, instantané.
  - **C# et Java** → réellement **compilés et exécutés** via l'API publique [Wandbox](https://wandbox.org) (nécessite une connexion).
- **Rapport final détaillé** : score par catégorie et sous-compétence (barres vert/rouge), temps passé, explications de chaque réponse, export PDF.

## Stack

Site 100 % statique : HTML / CSS / JavaScript. Aucune dépendance à installer.

| Fichier | Rôle |
|---|---|
| `index.html` | Page principale |
| `style.css` | Apparence |
| `questions.js` | Banque de 125 questions |
| `app.js` | Logique (timer, IDE, exécution, scoring, rapport) |
| `sql-wasm.js` / `sql-wasm-binary.js` | Moteur SQLite embarqué |

## Crédits techniques

[Monaco Editor](https://github.com/microsoft/monaco-editor) · [sql.js](https://github.com/sql-js/sql.js) · [Wandbox API](https://wandbox.org)
