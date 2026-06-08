/* ============================================================
   Shell SPA — navbar persistante, thème, bascule Examen / Cours
   (app.js et cours.js tournent chacun dans leur propre portée)
   ============================================================ */
(function () {
  const root = document.documentElement;

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
    if (name !== 'cours') {
      const sb = document.getElementById('sidebar'), bd = document.getElementById('backdrop');
      if (sb) sb.classList.remove('open');
      if (bd) bd.classList.remove('show');
    }
    try { localStorage.setItem('view', name); } catch (e) {}
    window.scrollTo(0, 0);
  }
  tabs.forEach(t => t.addEventListener('click', () => setView(t.dataset.view)));

  /* ---------- Vue initiale ---------- */
  function isCourseHash() {
    const id = location.hash.replace(/^#/, '').split('/')[0];
    return id && window.COURSES && window.COURSES[id];
  }
  let initial = 'examen';
  if (isCourseHash()) initial = 'cours';
  else { try { if (localStorage.getItem('view') === 'cours') initial = 'cours'; } catch (e) {} }
  setView(initial);

  /* ---------- Si on ouvre un lien de chapitre, basculer sur Cours ---------- */
  window.addEventListener('hashchange', () => { if (isCourseHash()) setView('cours'); });
})();
