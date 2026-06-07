# Design System — Page de documentation (cours)

Design clean inspiré des meilleures docs open source. Dark mode style GitHub Primer
/ Tokyo Night (fond sombre doux, jamais noir pur), light mode propre style VitePress
/ Tailwind / Stripe.

---

## 1. Variables CSS (à copier-coller)

Le thème se pilote par un attribut `data-theme` sur la balise `<html>`.
Le **light est la valeur par défaut** (`:root`), le **dark** surcharge via
`:root[data-theme="dark"]`.

```css
/* ===========================================================
   LIGHT MODE (par défaut)
   Inspiration : VitePress light, Tailwind docs, Stripe, MDN
   =========================================================== */
:root {
  /* Fonds */
  --bg:            #ffffff;   /* fond principal de la page          */
  --bg-elevated:   #f9fafb;   /* cartes, panneaux surélevés         */
  --surface:       #f3f4f6;   /* surfaces secondaires, hover doux   */
  --sidebar-bg:    #f7f8fa;   /* fond de la sidebar arborescente    */

  /* Bordures */
  --border:        #e5e7eb;   /* bordures standard                  */
  --border-strong: #d0d7de;   /* séparateurs marqués                */

  /* Texte */
  --text:          #1f2328;   /* texte principal (presque noir doux)*/
  --text-muted:    #59636e;   /* texte secondaire, légendes         */
  --text-faint:    #818b98;   /* texte très discret, placeholders   */

  /* Accent (bleu type lien doc) */
  --accent:        #3451b2;   /* couleur d'accent / liens           */
  --accent-hover:  #2a40a0;   /* accent au survol                   */
  --accent-soft:   #e8edff;   /* fond teinté accent (item actif)    */
  --accent-contrast:#ffffff;  /* texte sur fond accent              */

  /* Code */
  --code-bg:       #f3f4f6;   /* fond code inline + blocs           */
  --code-text:     #1f2328;   /* texte code                         */
  --code-border:   #e5e7eb;   /* bordure des blocs de code          */
  --code-inline-bg:#eef0f3;   /* code inline `comme ça`             */

  /* Sélection texte */
  --selection:     #cfe0ff;

  /* Callouts (notes / astuces / attention) */
  --note-bg:       #eef4ff;  --note-border:   #3451b2;  /* info bleu   */
  --tip-bg:        #e9f8ef;  --tip-border:    #1a7f47;  /* astuce vert */
  --warn-bg:       #fff6e6;  --warn-border:   #b06f00;  /* attention orange */
  --danger-bg:     #fdeceb;  --danger-border: #c0362c;  /* danger rouge */

  /* Ombres */
  --shadow:        0 1px 2px rgba(16, 24, 40, .06),
                   0 1px 3px rgba(16, 24, 40, .10);

  color-scheme: light;
}

/* ===========================================================
   DARK MODE
   Inspiration : GitHub Primer (#0d1117) + Tokyo Night (#1a1b26)
   Fond sombre doux, jamais #000. Accent bleu lumineux.
   =========================================================== */
:root[data-theme="dark"] {
  /* Fonds */
  --bg:            #0d1117;   /* GitHub canvas default              */
  --bg-elevated:   #161b22;   /* GitHub canvas subtle (cartes)      */
  --surface:       #1c2128;   /* surfaces secondaires, hover        */
  --sidebar-bg:    #0f141a;   /* sidebar un poil plus sombre que bg */

  /* Bordures */
  --border:        #30363d;   /* GitHub border default              */
  --border-strong: #3d444d;   /* séparateurs marqués                */

  /* Texte */
  --text:          #e6edf3;   /* GitHub fg default                  */
  --text-muted:    #9198a1;   /* fg muted                           */
  --text-faint:    #6e7681;   /* texte très discret                 */

  /* Accent (bleu lumineux) */
  --accent:        #4493f8;   /* lien / accent dark                 */
  --accent-hover:  #6cb0ff;   /* survol plus clair                  */
  --accent-soft:   #18283f;   /* fond teinté accent (item actif)    */
  --accent-contrast:#ffffff;

  /* Code */
  --code-bg:       #161b22;   /* fond blocs de code                 */
  --code-text:     #c9d1d9;
  --code-border:   #30363d;
  --code-inline-bg:#262c36;   /* code inline                        */

  /* Sélection texte */
  --selection:     #2d4f76;

  /* Callouts */
  --note-bg:       #11243e;  --note-border:   #4493f8;
  --tip-bg:        #0f2c1d;  --tip-border:    #3fb950;
  --warn-bg:       #2e2204;  --warn-border:   #d29922;
  --danger-bg:     #2d1413;  --danger-border: #f85149;

  /* Ombres (plus discrètes en dark) */
  --shadow:        0 1px 2px rgba(0, 0, 0, .4),
                   0 2px 6px rgba(0, 0, 0, .35);

  color-scheme: dark;
}
```

### Variables transverses (identiques dans les 2 modes)

```css
:root {
  /* Layout */
  --sidebar-width:   260px;
  --content-max:     780px;
  --header-height:   56px;
  --radius:          8px;
  --radius-sm:       6px;

  /* Typographie */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
               "Helvetica Neue", Arial, system-ui, sans-serif;
  --font-mono: ui-monospace, "SF Mono", "JetBrains Mono", "Fira Code",
               "Cascadia Code", Consolas, "Liberation Mono", monospace;

  --fs-base:    16px;
  --lh-base:    1.7;       /* aération confortable pour la lecture */
  --fs-h1:      2rem;
  --fs-h2:      1.5rem;
  --fs-h3:      1.2rem;
  --fs-code:    0.875em;
  --fs-sidebar: 0.875rem;
}
```

---

## 2. Layout documentation

### Structure générale
```
┌──────────────────────────────────────────────────────┐
│  Header (56px)   logo ........... [ toggle ☀/🌙 ]     │
├───────────────┬──────────────────────────────────────┤
│  Sidebar      │   Contenu                             │
│  260px        │   max-width 780px, centré, padding    │
│  arborescence │   2.5rem                              │
│  scroll indép.│                                       │
└───────────────┴──────────────────────────────────────┘
```

- **Sidebar** : `width: 260px`, `background: var(--sidebar-bg)`,
  `border-right: 1px solid var(--border)`, `position: sticky; top: header`,
  hauteur `100vh - header`, `overflow-y: auto`. Scroll indépendant du contenu.
- **Contenu** : `max-width: 780px` (≈ 70-75 caractères/ligne, optimal lecture),
  centré avec `margin: 0 auto`, `padding: 2.5rem 2rem 6rem`.
- **Responsive** : sous ~960px, sidebar masquée et ouverte par un bouton
  hamburger en overlay (`position: fixed`).

### Sidebar — arborescence repliable (style explorateur de fichiers)
- Items : `padding: 6px 10px`, `border-radius: 6px`, `font-size: 0.875rem`,
  `color: var(--text-muted)`.
- **Hover** : `background: var(--surface)`, `color: var(--text)`.
- **Item actif** : `background: var(--accent-soft)`, `color: var(--accent)`,
  `font-weight: 600`. Option : barre latérale gauche
  `box-shadow: inset 2px 0 0 var(--accent)`.
- **Dossiers** : chevron `▸` qui tourne à 90° quand ouvert
  (`transition: transform .15s`). Indentation des enfants ≈ `12-16px` par niveau
  (utiliser `padding-left`).
- Titres de section : `font-size: 0.75rem`, `text-transform: uppercase`,
  `letter-spacing: .05em`, `color: var(--text-faint)`, `margin-top: 1.2rem`.

### Typographie du contenu
- Corps : `16px`, `line-height: 1.7`, `color: var(--text)`.
- **H1** : `2rem`, `font-weight: 700`, `margin-bottom: .5rem` ;
  bordure basse `1px solid var(--border)` + `padding-bottom: .4rem`.
- **H2** : `1.5rem`, `font-weight: 650`, `margin-top: 2.5rem`,
  séparateur haut `border-top` léger optionnel.
- **H3** : `1.2rem`, `font-weight: 600`, `margin-top: 1.8rem`.
- Ancres : au survol d'un titre, afficher un `#` cliquable à gauche
  (`color: var(--accent)`).
- Paragraphes : `margin: 0 0 1rem`. Liens : `var(--accent)`, soulignement au hover.

### Blocs de code
```css
pre {
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--radius);
  padding: 1rem 1.1rem;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.6;
}
:not(pre) > code {              /* code inline */
  background: var(--code-inline-bg);
  padding: .15em .4em;
  border-radius: 5px;
  font-size: var(--fs-code);
  font-family: var(--font-mono);
}
```
- Optionnel : barre de titre du bloc (nom de fichier) + bouton « Copier » en
  haut à droite (apparaît au hover).

### Tableaux
```css
table { border-collapse: collapse; width: 100%; margin: 1.2rem 0;
        font-size: .925rem; }
th, td { border: 1px solid var(--border); padding: .55rem .8rem;
         text-align: left; }
th { background: var(--bg-elevated); font-weight: 600; }
tr:nth-child(even) td { background: var(--bg-elevated); } /* zébrage doux */
```

### Callouts (note / astuce / attention / danger)
Bloc avec `border-left: 4px solid`, fond teinté, `border-radius: 8px`,
`padding: .8rem 1rem`. Une variante par type :
```css
.callout            { border-left: 4px solid; border-radius: var(--radius);
                      padding: .8rem 1rem; margin: 1.2rem 0; }
.callout-note   { background: var(--note-bg);   border-color: var(--note-border); }
.callout-tip    { background: var(--tip-bg);    border-color: var(--tip-border); }
.callout-warn   { background: var(--warn-bg);   border-color: var(--warn-border); }
.callout-danger { background: var(--danger-bg); border-color: var(--danger-border); }
```
Titre du callout en gras + icône (ℹ️ note, 💡 astuce, ⚠️ attention, 🚫 danger).

### Sélection de texte
```css
::selection { background: var(--selection); }
```

---

## 3. Toggle dark / light

### Bonnes pratiques
1. **`data-theme` sur `<html>`** (pas sur `<body>`) → permet de styler dès le
   `:root` et d'éviter tout reflow.
2. **`localStorage`** pour mémoriser le choix : clé `theme` = `"light"` | `"dark"`.
3. **Pas de flash (FOUC)** : appliquer le thème **avant le rendu**, via un petit
   script **inline et synchrone dans le `<head>`**, AVANT le CSS / le `<body>`.
4. **Respect du système** : si aucun choix mémorisé, suivre
   `prefers-color-scheme: dark`.

### Script anti-flash (à mettre tout en haut du `<head>`)
```html
<script>
  (function () {
    var saved = localStorage.getItem('theme');
    var theme = saved
      || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

### Bouton toggle (HTML)
```html
<button id="theme-toggle" class="theme-toggle"
        aria-label="Changer de thème" title="Changer de thème">
  <svg class="icon-sun"  viewBox="0 0 24 24" width="18" height="18"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19
             M19 5l-1.5 1.5M6.5 17.5L5 19"/>
  </svg>
  <svg class="icon-moon" viewBox="0 0 24 24" width="18" height="18"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
  </svg>
</button>
```

### JS du toggle
```js
const root = document.documentElement;
document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
```

### CSS du toggle (affiche la bonne icône selon le thème)
```css
.theme-toggle {
  display: inline-grid; place-items: center;
  width: 36px; height: 36px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-elevated);
  color: var(--text-muted);
  cursor: pointer;
  transition: background .15s, color .15s, border-color .15s;
}
.theme-toggle:hover { color: var(--text); border-color: var(--border-strong); }

/* light : on montre la lune (pour passer en dark) ; dark : on montre le soleil */
.icon-moon { display: block; }
.icon-sun  { display: none; }
:root[data-theme="dark"] .icon-moon { display: none; }
:root[data-theme="dark"] .icon-sun  { display: block; }
```

> Astuce : ajouter `transition: background-color .2s, color .2s;` sur `body`
> pour un fondu doux au changement de thème (mais le désactiver pendant le
> premier paint si besoin pour éviter une transition au chargement).

---

## Sources
- GitHub Primer — Color foundations & primitives : https://primer.style/foundations/color/overview/ et https://github.com/primer/primitives
- Tokyo Night theme palette : https://github.com/tokyo-night/tokyo-night-vscode-theme et https://www.color-hex.com/color-palette/91636
- VitePress — CSS variables / dark mode : https://vitepress.dev/guide/extending-default-theme
- Tailwind CSS docs (layout doc, typographie) : https://tailwindcss.com/docs
- Stripe docs (layout, accent bleu, lisibilité) : https://docs.stripe.com
- Radix UI Colors (échelles accessibles light/dark) : https://www.radix-ui.com/colors
- Vercel / Geist design system : https://vercel.com/geist/colors
- Docusaurus (Infima, structure sidebar) : https://docusaurus.io/docs/styling-layout
- MDN Web Docs (typographie, largeur de contenu) : https://developer.mozilla.org
- Nextra (docs Next.js, layout) : https://nextra.site
