/* ============================================================
   Shell SPA — navbar persistante, thème, bascule Examen / Cours
   (app.js et cours.js tournent chacun dans leur propre portée)
   ============================================================ */
(function () {
  const root = document.documentElement;

  /* ---------- Lazy-loading : injecte un script à la demande ---------- */
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src; s.async = false;
      s.onload = resolve; s.onerror = () => reject(new Error('échec chargement ' + src));
      document.head.appendChild(s);
    });
  }
  // Charge le moteur SQLite (sql.js + binaire 853 Ko) une seule fois, à la demande
  window.ensureSqlAssets = function () {
    if (window.__sqlAssetsP) return window.__sqlAssetsP;
    window.__sqlAssetsP = loadScript('sql-wasm.js').then(() => loadScript('sql-wasm-binary.js'));
    return window.__sqlAssetsP;
  };

  // Charge le bundle Cours (marked + 14 cours + cours.js) une seule fois, à la demande
  let coursP = null;
  function ensureCours() {
    if (coursP) return coursP;
    const files = ['marked.min.js',
      'courses/course-fundamentals.js', 'courses/course-csharp.js', 'courses/course-aspnet.js',
      'courses/course-ef.js', 'courses/course-java.js', 'courses/course-spring.js',
      'courses/course-angular.js', 'courses/course-js.js', 'courses/course-css.js',
      'courses/course-sql.js', 'courses/course-git.js', 'courses/course-docker.js',
      'courses/course-agile.js', 'courses/course-testing.js', 'cours.js'];
    coursP = files.reduce((p, src) => p.then(() => loadScript(src)), Promise.resolve());
    return coursP;
  }

  /* ---------- Thème clair / sombre (un seul handler) ---------- */
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    if (window.monaco) { try { monaco.editor.setTheme(t === 'dark' ? 'vs-dark' : 'vs'); } catch (e) {} }
  }
  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.addEventListener('click', () => {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ---------- Bascule de vue Examen / Cours ---------- */
  const tabs = Array.from(document.querySelectorAll('.tab[data-view]'));
  function setView(name) {
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + name));
    tabs.forEach(t => t.classList.toggle('active', t.dataset.view === name));
    document.body.classList.toggle('cours-mode', name === 'cours');
    if (name === 'cours') ensureCours();        // charge le bundle Cours si pas encore fait
    else {
      const sb = document.getElementById('sidebar'), bd = document.getElementById('backdrop');
      if (sb) sb.classList.remove('open');
      if (bd) bd.classList.remove('show');
    }
    try { localStorage.setItem('view', name); } catch (e) {}
    window.scrollTo(0, 0);
  }
  tabs.forEach(t => t.addEventListener('click', () => setView(t.dataset.view)));

  /* ---------- Vue initiale (sans dépendre des cours, pas encore chargés) ---------- */
  const COURSE_IDS = ['fundamentals', 'csharp', 'aspnet', 'ef', 'java', 'spring', 'angular', 'js', 'css', 'sql', 'git', 'docker', 'agile', 'testing'];
  function isCourseHash() {
    const id = location.hash.replace(/^#/, '').split('/')[0];
    return id && COURSE_IDS.indexOf(id) > -1;
  }
  let initial = 'examen';
  if (isCourseHash()) initial = 'cours';
  else { try { if (localStorage.getItem('view') === 'cours') initial = 'cours'; } catch (e) {} }
  setView(initial);

  // Si on ouvre un lien de chapitre, basculer sur Cours
  window.addEventListener('hashchange', () => { if (isCourseHash()) setView('cours'); });

  // Préchargement discret du bundle Cours en arrière-plan (pour que le 1er clic soit instantané)
  setTimeout(ensureCours, 2500);
})();
