/* ============================================================
   Page Cours — documentation interactive
   ============================================================ */
(function () { // ==== SPA : portée isolée (cohabite avec app.js) ====

const $ = s => document.querySelector(s);
const COURSES = window.COURSES || {};
const ORDER = ['fundamentals', 'csharp', 'aspnet', 'ef', 'java', 'spring', 'angular', 'js', 'css', 'sql', 'git', 'docker', 'agile', 'testing'];
const courseIds = ORDER.filter(id => COURSES[id]).concat(Object.keys(COURSES).filter(id => ORDER.indexOf(id) === -1));

let currentEditor = null;

/* ---------- Monaco ---------- */
let monacoReady = null;
function loadMonaco() {
  if (monacoReady) return monacoReady;
  monacoReady = new Promise(resolve => {
    if (typeof require === 'undefined') { resolve(false); return; }
    try {
      require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
      require(['vs/editor/editor.main'], () => resolve(true), () => resolve(false));
      setTimeout(() => resolve(false), 7000);
    } catch (e) { resolve(false); }
  });
  return monacoReady;
}
const LANG = { csharp: 'csharp', java: 'java', sql: 'sql', javascript: 'javascript', html: 'html' };
async function mountEditor(host, code, lang) {
  const ok = await loadMonaco();
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (ok && window.monaco) {
    const ed = monaco.editor.create(host, {
      value: code, language: LANG[lang] || 'plaintext', theme: dark ? 'vs-dark' : 'vs',
      minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false, automaticLayout: true, tabSize: 2
    });
    return { getValue: () => ed.getValue(), setValue: v => ed.setValue(v), dispose: () => ed.dispose() };
  }
  const ta = document.createElement('textarea'); ta.className = 'pg-fallback'; ta.value = code; host.appendChild(ta);
  return { getValue: () => ta.value, setValue: v => { ta.value = v; }, dispose: () => {} };
}

/* ---------- sql.js ---------- */
let sqlReady = null;
function loadSql() {
  if (sqlReady) return sqlReady;
  if (typeof initSqlJs === 'undefined') { sqlReady = Promise.resolve(null); return sqlReady; }
  let cfg = {};
  if (window.SQL_WASM_BASE64) { try { cfg.wasmBinary = Uint8Array.from(atob(window.SQL_WASM_BASE64), c => c.charCodeAt(0)); } catch (e) {} }
  if (!cfg.wasmBinary) cfg.locateFile = f => f;
  sqlReady = initSqlJs(cfg).catch(() => null);
  return sqlReady;
}
async function runSqlRaw(code) {
  const SQL = await loadSql();
  if (!SQL) return { error: 'Moteur SQL indisponible (connexion ?).' };
  let db;
  try { db = new SQL.Database(); const res = db.exec(code); db.close(); return { result: res }; }
  catch (e) { if (db) db.close(); return { error: e.message }; }
}

/* ---------- Wandbox (C# / Java) ---------- */
async function runWandboxRaw(source, compiler) {
  let j;
  try {
    const r = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: source, compiler, options: '', stdin: '', 'compiler-option-raw': '', 'runtime-option-raw': '' })
    });
    j = await r.json();
  } catch (e) { return { error: "Connexion à l'API d'exécution impossible (vérifie ta connexion internet)." }; }
  return { output: j.program_output || '', compileError: (j.compiler_error || '').trim(), runError: (j.program_error || '').trim() };
}

/* ---------- JS local ---------- */
function fmtVal(v) { if (typeof v === 'string') return v; try { return JSON.stringify(v); } catch (e) { return String(v); } }
function runJsRaw(code) {
  const logs = [];
  const c = {
    log: (...a) => logs.push(a.map(fmtVal).join(' ')),
    error: (...a) => logs.push(a.map(fmtVal).join(' ')),
    warn: (...a) => logs.push(a.map(fmtVal).join(' ')),
    info: (...a) => logs.push(a.map(fmtVal).join(' '))
  };
  try { (new Function('console', code))(c); }
  catch (e) { return { output: logs.join('\n'), error: e.message }; }
  return { output: logs.join('\n') || '(aucune sortie — utilise console.log pour afficher)', error: null };
}

/* ---------- Sidebar ---------- */
function buildTree() {
  const tree = $('#tree');
  tree.innerHTML = courseIds.map(id => {
    const c = COURSES[id];
    const items = c.chapters.map((ch, i) =>
      `<a class="tree-item" data-course="${id}" data-idx="${i}" href="#${id}/${ch.id}">${esc(ch.title)}</a>`
    ).join('');
    return `<div class="tree-group" data-course="${id}">
      <button class="tree-head"><span class="chev">▶</span><span class="tag">${esc(c.icon)}</span><span>${esc(c.title)}</span></button>
      <div class="tree-children">${items}</div>
    </div>`;
  }).join('');
  tree.querySelectorAll('.tree-head').forEach(h => {
    h.addEventListener('click', () => h.closest('.tree-group').classList.toggle('open'));
  });
  tree.querySelectorAll('.tree-item').forEach(a => {
    a.addEventListener('click', () => closeMobileSidebar());
  });
}
function highlightTree(courseId, idx) {
  document.querySelectorAll('.tree-item').forEach(a => a.classList.remove('active'));
  document.querySelectorAll('.tree-group').forEach(g => g.classList.toggle('open', g.dataset.course === courseId));
  const active = document.querySelector(`.tree-item[data-course="${courseId}"][data-idx="${idx}"]`);
  if (active) { active.classList.add('active'); active.scrollIntoView({ block: 'nearest' }); }
}

/* ---------- Accueil ---------- */
function renderWelcome() {
  highlightTree(null, null);
  const toc = document.getElementById('toc'); if (toc) { toc.classList.add('hidden'); toc.innerHTML = ''; }
  teardownSpy();
  const cards = courseIds.map(id => {
    const c = COURSES[id];
    return `<div class="course-card" data-course="${id}">
      <div class="cc-icon">${esc(c.icon)}</div>
      <div class="cc-title">${esc(c.title)}</div>
      <div class="cc-sub">${c.chapters.length} chapitres · ${esc(c.summary || '')}</div>
    </div>`;
  }).join('');
  $('#content').innerHTML = `<div class="welcome">
    <h1>📚 Les cours</h1>
    <p style="color:var(--text-muted);font-size:16px">Révise les fondamentaux avant de passer l'examen. ${courseIds.length} cours, organisés en chapitres, avec des exemples exécutables et un quiz à la fin de chaque chapitre.</p>
    <div class="cards-grid">${cards}</div>
  </div>`;
  $('#content').querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => { const id = card.dataset.course; location.hash = `#${id}/${COURSES[id].chapters[0].id}`; });
  });
}

/* ---------- Rendu d'un chapitre ---------- */
function renderChapter(courseId, chapterId) {
  const c = COURSES[courseId];
  if (!c) { renderWelcome(); return; }
  let idx = c.chapters.findIndex(ch => ch.id === chapterId);
  if (idx < 0) idx = 0;
  const ch = c.chapters[idx];

  if (currentEditor) { try { currentEditor.dispose(); } catch (e) {} currentEditor = null; }

  const html = marked.parse(ch.markdown || '');
  const root = $('#content');
  root.innerHTML = `
    <div class="crumb"><b>${esc(c.title)}</b> &nbsp;›&nbsp; Chapitre ${idx + 1} / ${c.chapters.length}</div>
    <article class="md">${html}</article>
    <div id="pgZone"></div>
    <div id="quizZone"></div>
    <nav class="chap-nav" id="chapNav"></nav>`;

  // Coloration syntaxique des blocs de code
  highlightCode(root);
  // Playground
  if (ch.playground && ch.playground.code) renderPlayground(ch.playground);
  // Quiz
  if (ch.quiz && ch.quiz.length) renderQuiz(ch.quiz);
  // Navigation chapitre
  renderChapNav(c, idx);
  // Table des matières "Sur cette page"
  buildToc();

  highlightTree(courseId, idx);
  window.scrollTo(0, 0);
}

/* ---------- "Sur cette page" (TOC droite + scroll-spy) ---------- */
function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40); }
function buildToc() {
  const toc = document.getElementById('toc');
  const heads = Array.from(document.querySelectorAll('.md h2, .md h3'));
  if (heads.length < 2) { toc.classList.add('hidden'); toc.innerHTML = ''; teardownSpy(); return; }
  heads.forEach((h, i) => { h.id = 'sec-' + i + '-' + slug(h.textContent); });
  toc.classList.remove('hidden');
  toc.innerHTML = '<div class="toc-title">Sur cette page</div>' + heads.map(h =>
    `<a href="#${h.id}" class="${h.tagName === 'H3' ? 'lvl3' : ''}" data-id="${h.id}">${esc(h.textContent)}</a>`
  ).join('');
  toc.querySelectorAll('a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const el = document.getElementById(a.dataset.id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' });
  }));
  setupSpy(heads);
}
function teardownSpy() { if (window.__spy) { window.removeEventListener('scroll', window.__spy); window.__spy = null; } }
function setupSpy(heads) {
  teardownSpy();
  const fn = () => {
    let cur = heads[0];
    for (const h of heads) { if (h.getBoundingClientRect().top <= 100) cur = h; else break; }
    document.querySelectorAll('#toc a').forEach(a => a.classList.toggle('active', a.dataset.id === cur.id));
  };
  window.__spy = fn;
  window.addEventListener('scroll', fn, { passive: true });
  fn();
}

function renderPlayground(pg) {
  const labels = { csharp: 'Exécuter (C#)', java: 'Exécuter (Java)', sql: 'Exécuter (SQL)', javascript: 'Exécuter (JS)', html: 'Aperçu' };
  const zone = $('#pgZone');
  zone.innerHTML = `<div class="playground">
    <div class="pg-head">
      <span class="pg-lang">${esc(pg.language)}</span>
      <span class="pg-title">🛠️ Bidouille le code et lance-le</span>
      <span class="pg-btns">
        <button class="btn btn-ghost" id="pgReset" title="Restaurer le code d'origine">↺ Réinitialiser</button>
        <button class="btn btn-accent" id="pgRun">▶ ${labels[pg.language] || 'Exécuter'}</button>
      </span>
    </div>
    <div class="pg-host" id="pgHost"></div>
    <div class="pg-out" id="pgOut" style="display:none"></div>
  </div>`;
  mountEditor($('#pgHost'), pg.code, pg.language).then(ed => {
    currentEditor = ed;
    if (pg.language === 'html') runPlayground(pg); // aperçu immédiat pour le HTML/CSS
  });
  $('#pgRun').addEventListener('click', () => runPlayground(pg));
  $('#pgReset').addEventListener('click', () => {
    if (currentEditor) currentEditor.setValue(pg.code);
    if (pg.language === 'html') runPlayground(pg); else $('#pgOut').style.display = 'none';
  });
}

async function runPlayground(pg) {
  const btn = $('#pgRun'); const out = $('#pgOut');
  const code = currentEditor ? currentEditor.getValue() : pg.code;
  const old = btn.innerHTML; btn.disabled = true; btn.textContent = '⏳ Exécution...';
  out.style.display = 'block'; out.className = 'pg-out'; out.innerHTML = `<div class="pg-out-head">Sortie</div><pre>...</pre>`;
  try {
    if (pg.language === 'javascript') {
      const r = runJsRaw(code);
      showText(out, r.error ? (r.output + '\n⛔ ' + r.error) : r.output, !!r.error);
    } else if (pg.language === 'sql') {
      const r = await runSqlRaw(code);
      if (r.error) showText(out, '⛔ ' + r.error, true); else showSql(out, r.result);
    } else if (pg.language === 'csharp') {
      const r = await runWandboxRaw(code, 'mono-6.12.0.199');
      showWb(out, r);
    } else if (pg.language === 'java') {
      const stripped = code.replace(/\bpublic\s+(class|interface|enum)\b/g, '$1');
      const r = await runWandboxRaw(stripped, 'openjdk-jdk-21+35');
      showWb(out, r);
    } else if (pg.language === 'html') {
      showPreview(out, code);
    }
  } catch (e) { showText(out, '⛔ ' + e.message, true); }
  btn.disabled = false; btn.innerHTML = old;
}
function showText(out, text, isErr) {
  out.className = 'pg-out' + (isErr ? ' err' : '');
  out.innerHTML = `<div class="pg-out-head">Sortie</div><pre>${esc(text || '(vide)')}</pre>`;
}
function showWb(out, r) {
  if (r.error) { showText(out, '⛔ ' + r.error, true); return; }
  if (r.compileError) {
    if (/OCI runtime|Resource temporarily|crun:|cannot allocate/i.test(r.compileError)) {
      showText(out, '⚠️ Le service d\'exécution est momentanément surchargé. Réessaie dans quelques secondes.', true); return;
    }
    showText(out, '⛔ Erreur de compilation :\n' + r.compileError, true); return;
  }
  let txt = r.output || '(aucune sortie)';
  if (r.runError) txt += '\n⚠️ ' + r.runError;
  showText(out, txt, false);
}
function showPreview(out, code) {
  out.className = 'pg-out';
  out.innerHTML = `<div class="pg-out-head">Aperçu en direct</div><iframe class="pg-preview" sandbox="allow-same-origin"></iframe>`;
  out.querySelector('iframe').srcdoc = code;
}
function showSql(out, res) {
  out.className = 'pg-out';
  if (!res || !res.length) { out.innerHTML = `<div class="pg-out-head">Résultat</div><pre>(aucune ligne retournée)</pre>`; return; }
  const t = res[res.length - 1];
  const head = t.columns.map(c => `<th>${esc(c)}</th>`).join('');
  const rows = t.values.map(r => `<tr>${r.map(v => `<td>${esc(v === null ? 'NULL' : v)}</td>`).join('')}</tr>`).join('');
  out.innerHTML = `<div class="pg-out-head">Résultat (${t.values.length} ligne${t.values.length > 1 ? 's' : ''})</div>
    <div style="padding:6px 14px 12px"><table class="pg-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

/* ---------- Quiz ---------- */
function renderQuiz(quiz) {
  const zone = $('#quizZone');
  const qs = quiz.map((q, qi) => {
    const opts = q.options.map((o, oi) =>
      `<button class="quiz-opt" data-q="${qi}" data-o="${oi}"><span class="letter">${String.fromCharCode(65 + oi)}</span><span>${esc(o)}</span></button>`
    ).join('');
    return `<div class="quiz-q" data-q="${qi}">
      <div class="qq-text">${qi + 1}. ${esc(q.question)}</div>
      <div class="quiz-opts">${opts}</div>
      <div class="quiz-expl">💡 ${esc(q.explanation || '')}</div>
    </div>`;
  }).join('');
  zone.innerHTML = `<section class="quiz">
    <h3>🎯 Quiz de fin de chapitre</h3>
    <div class="q-sub">Vérifie que tu as bien compris avant de passer au chapitre suivant.</div>
    ${qs}
    <div style="display:flex;gap:10px;align-items:center;margin-top:8px">
      <button class="btn btn-accent" id="quizCheck">Valider mes réponses</button>
      <button class="btn btn-ghost" id="quizReset" style="display:none">Recommencer</button>
    </div>
    <div class="quiz-result" id="quizResult"></div>
  </section>`;

  const answers = {};
  zone.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      if (zone.dataset.done === '1') return;
      const qi = btn.dataset.q;
      zone.querySelectorAll(`.quiz-opt[data-q="${qi}"]`).forEach(b => b.classList.remove('sel'));
      btn.classList.add('sel');
      answers[qi] = parseInt(btn.dataset.o, 10);
    });
  });

  $('#quizCheck').addEventListener('click', () => {
    let good = 0;
    quiz.forEach((q, qi) => {
      const qEl = zone.querySelector(`.quiz-q[data-q="${qi}"]`);
      qEl.classList.add('answered');
      zone.querySelectorAll(`.quiz-opt[data-q="${qi}"]`).forEach(b => {
        const oi = parseInt(b.dataset.o, 10);
        if (oi === q.correctIndex) b.classList.add('correct');
        else if (answers[qi] === oi) b.classList.add('wrong');
      });
      if (answers[qi] === q.correctIndex) good++;
    });
    zone.dataset.done = '1';
    const res = $('#quizResult');
    const pct = Math.round((good / quiz.length) * 100);
    res.className = 'quiz-result show ' + (pct >= 60 ? 'ok' : 'ko');
    res.textContent = `${good} / ${quiz.length} bonnes réponses (${pct}%) ${pct >= 100 ? '— parfait ! 🎉' : pct >= 60 ? '— bien joué !' : '— relis le chapitre 😉'}`;
    $('#quizCheck').style.display = 'none';
    $('#quizReset').style.display = 'inline-flex';
  });
  $('#quizReset').addEventListener('click', () => renderQuiz(quiz));
}

/* ---------- Navigation chapitre ---------- */
function renderChapNav(c, idx) {
  const nav = $('#chapNav');
  let html = '';
  if (idx > 0) {
    const p = c.chapters[idx - 1];
    html += `<a class="prev" href="#${c.id}/${p.id}"><span class="cn-label">← Précédent</span><span class="cn-title">${esc(p.title)}</span></a>`;
  }
  if (idx < c.chapters.length - 1) {
    const n = c.chapters[idx + 1];
    html += `<a class="next" href="#${c.id}/${n.id}"><span class="cn-label">Suivant →</span><span class="cn-title">${esc(n.title)}</span></a>`;
  }
  nav.innerHTML = html;
}

/* ---------- Recherche ---------- */
$('#search').addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll('.tree-group').forEach(g => {
    let any = false;
    g.querySelectorAll('.tree-item').forEach(it => {
      const match = it.textContent.toLowerCase().indexOf(q) > -1;
      it.style.display = match ? '' : 'none';
      if (match) any = true;
    });
    g.style.display = any || !q ? '' : 'none';
    if (q && any) g.classList.add('open');
  });
});

/* ---------- Mobile ---------- */
function closeMobileSidebar() { $('#sidebar').classList.remove('open'); $('#backdrop').classList.remove('show'); }
$('#menuBtn').addEventListener('click', () => { $('#sidebar').classList.toggle('open'); $('#backdrop').classList.toggle('show'); });
$('#backdrop').addEventListener('click', closeMobileSidebar);

/* ---------- Routage ---------- */
function route() {
  const h = location.hash.replace(/^#/, '');
  if (!h) { renderWelcome(); return; }
  const [courseId, chapterId] = h.split('/');
  if (COURSES[courseId]) renderChapter(courseId, chapterId);
  else renderWelcome();
}
window.addEventListener('hashchange', route);

/* ---------- Init ---------- */
buildTree();
loadMonaco();
loadSql();
if (typeof marked !== 'undefined' && marked.use) marked.use({ gfm: true, breaks: false });
route();

/* ---------- Coloration syntaxique ---------- */
function highlightCode(scope) {
  if (typeof hljs === 'undefined') return;
  const alias = { ts: 'typescript', js: 'javascript', cs: 'csharp', 'c#': 'csharp', sh: 'bash', shell: 'bash', console: 'bash', html: 'xml', xhtml: 'xml', yml: 'yaml', docker: 'dockerfile' };
  scope.querySelectorAll('.md pre code').forEach(block => {
    const m = (block.className || '').match(/language-([\w#+-]+)/i);
    const lang = m ? m[1].toLowerCase() : null;
    const real = lang ? (alias[lang] || lang) : null;
    try {
      if (real && hljs.getLanguage(real)) { block.className = 'language-' + real; hljs.highlightElement(block); }
      else if (!lang) { hljs.highlightElement(block); }
    } catch (e) {}
  });
}

function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

})(); // ==== fin portée cours.js ====
