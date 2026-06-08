/* ============================================================
   Simulateur d'entretien technique — logique applicative
   ============================================================ */
(function () { // ==== SPA : portée isolée (cohabite avec cours.js) ====

/* Filtre le warning cosmétique et inoffensif du loader AMD de Monaco
   ("Duplicate definition of module 'vs/editor/editor.main'"). Sans impact. */
(function () {
  ['warn', 'error'].forEach(function (level) {
    const original = console[level];
    console[level] = function () {
      if (arguments.length && typeof arguments[0] === 'string' &&
          arguments[0].indexOf('Duplicate definition of module') !== -1) return;
      return original.apply(console, arguments);
    };
  });
})();

/* ---------- Préparation des données ---------- */
QUESTIONS.forEach((q, i) => { q.id = i; });

function pointsFor(q) {
  if (q.type === 'code') return 25;
  const d = (q.difficulty || '').toLowerCase();
  if (d.includes('hard')) return 20;
  if (d.includes('easy') || d.includes('junior')) return 10;
  return 15;
}
function timeFor(q) { return q.type === 'code' ? 240 : 60; } // secondes allouées

const CATEGORIES = [...new Set(QUESTIONS.map(q => q.category))];

/* ---------- État ---------- */
const state = {
  name: '',
  list: [],          // questions du test en cours
  idx: 0,
  answers: {},       // id -> { selectedIndex, optsOrder, codeRun, selfGrade, score, max }
  totalSeconds: 0,
  remaining: 0,
  timerInt: null,
  editors: {}        // id -> { getValue }
};

/* ---------- Helpers DOM ---------- */
const $ = sel => document.querySelector(sel);
function show(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $('#' + screenId).classList.add('active');
  window.scrollTo(0, 0);
}
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
/* Coloration syntaxique (mêmes couleurs que la page Cours) */
function catLang(cat) {
  return { 'C#': 'csharp', 'ASP.NET Core': 'csharp', 'Entity Framework': 'csharp', 'Java': 'java', 'Spring Boot': 'java', 'JavaScript': 'javascript', 'Angular': 'typescript', 'CSS': 'css', 'SQL': 'sql', 'Git': 'bash', 'Docker': 'dockerfile' }[cat] || null;
}
function codeBlock(code, lang) {
  const cls = lang ? ' class="language-' + lang + '"' : '';
  return '<pre class="code"><code' + cls + '>' + esc(code) + '</code></pre>';
}
function highlightAll(scope) {
  if (typeof hljs === 'undefined') return;
  (scope || document).querySelectorAll('pre.code code[class]').forEach(b => {
    try { const m = (b.className || '').match(/language-([\w#+-]+)/); if (m && hljs.getLanguage(m[1])) hljs.highlightElement(b); } catch (e) {}
  });
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function fmtTime(sec) {
  sec = Math.max(0, Math.round(sec));
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/* ---------- Monaco (IDE) ---------- */
let monacoReady = null;
function loadMonaco() {
  if (monacoReady) return monacoReady;
  monacoReady = new Promise(resolve => {
    if (typeof require === 'undefined') { resolve(false); return; }
    try {
      require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
      require(['vs/editor/editor.main'], () => resolve(true), () => resolve(false));
      setTimeout(() => resolve(false), 6000); // filet de sécurité si hors-ligne
    } catch (e) { resolve(false); }
  });
  return monacoReady;
}
const LANG_MAP = { csharp: 'csharp', sql: 'sql', javascript: 'javascript', typescript: 'typescript', java: 'java' };

/* ---------- sql.js (SQLite WebAssembly, exécution dans le navigateur) ---------- */
let sqlReady = null;
function loadSql() {
  if (sqlReady) return sqlReady;
  if (typeof initSqlJs === 'undefined') { sqlReady = Promise.resolve(null); return sqlReady; }
  // Le binaire wasm est embarqué en base64 (sql-wasm-binary.js) -> aucune requête réseau,
  // fonctionne même en double-clic (file://) et hors-ligne.
  let config = {};
  if (typeof window !== 'undefined' && window.SQL_WASM_BASE64) {
    try { config.wasmBinary = Uint8Array.from(atob(window.SQL_WASM_BASE64), c => c.charCodeAt(0)); }
    catch (e) { /* fallback ci-dessous */ }
  }
  if (!config.wasmBinary) config.locateFile = f => f; // cherche sql-wasm.wasm à côté de la page
  sqlReady = initSqlJs(config).catch(() => null);
  return sqlReady;
}
// Exécute du SQL sur une base fraîche (setup puis requête). Renvoie {ok, result|error}.
async function runSqlQuery(setup, query) {
  const SQL = await loadSql();
  if (!SQL) return { ok: false, error: 'Moteur SQL indisponible (vérifie ta connexion).' };
  let db;
  try { db = new SQL.Database(); if (setup) db.run(setup); }
  catch (e) { if (db) db.close(); return { ok: false, error: 'Erreur du jeu de données : ' + e.message }; }
  let result;
  try { result = db.exec(query); }
  catch (e) { db.close(); return { ok: false, error: 'Erreur SQL : ' + e.message }; }
  db.close();
  return { ok: true, result };
}
// Normalise un résultat sql.js (dernier SELECT) pour comparaison
function normalizeSql(res) {
  if (!res || !res.length) return '[]';
  const last = res[res.length - 1];
  return JSON.stringify(last.values);
}

async function mountEditor(hostEl, code, lang) {
  const ok = await loadMonaco();
  if (ok && window.monaco) {
    const ed = monaco.editor.create(hostEl, {
      value: code,
      language: LANG_MAP[lang] || 'plaintext',
      theme: 'vs-dark',
      minimap: { enabled: false },
      fontSize: 13.5,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2
    });
    return { getValue: () => ed.getValue() };
  }
  // Fallback : textarea simple (mode hors-ligne)
  const ta = document.createElement('textarea');
  ta.className = 'code-fallback';
  ta.value = code;
  hostEl.appendChild(ta);
  return { getValue: () => ta.value };
}

/* ---------- Accueil ---------- */
function buildHome() {
  // Catégories
  const wrap = $('#cats');
  wrap.innerHTML = CATEGORIES.map(cat => {
    const n = QUESTIONS.filter(q => q.category === cat).length;
    return `<label class="cat-chip sel">
      <input type="checkbox" value="${esc(cat)}" checked>
      <span class="c-name">${esc(cat)}</span>
      <span class="c-count">${n}</span>
    </label>`;
  }).join('');
  wrap.querySelectorAll('.cat-chip input').forEach(cb => {
    cb.addEventListener('change', () => cb.closest('.cat-chip').classList.toggle('sel', cb.checked));
  });
  // Conseils
  $('#tipsList').innerHTML = TIPS.map(t => `<li>${esc(t)}</li>`).join('');
}
function selectedCategories() {
  return [...document.querySelectorAll('#cats input:checked')].map(cb => cb.value);
}

/* ---------- Démarrage du test ---------- */
function startTest() {
  const name = $('#name').value.trim();
  state.name = name || 'Candidat';
  const cats = selectedCategories();
  if (cats.length === 0) { alert('Choisis au moins une catégorie.'); return; }

  const incCode = $('#incCode').checked;
  let pool = QUESTIONS.filter(q => cats.includes(q.category));
  if (!incCode) pool = pool.filter(q => q.type !== 'code');
  if (pool.length === 0) { alert('Aucune question pour cette sélection.'); return; }

  const wanted = parseInt($('#count').value, 10);
  let list = shuffle(pool).slice(0, Math.min(wanted, pool.length));

  // Pré-mélange des options pour les QCM
  list.forEach(q => {
    if (q.type === 'mcq') {
      const order = shuffle(q.options.map((_, i) => i));
      state.answers[q.id] = { optsOrder: order, selectedIndex: null, score: 0, max: pointsFor(q) };
    } else {
      state.answers[q.id] = { codeRun: null, selfGrade: null, score: 0, max: pointsFor(q) };
    }
  });

  state.list = list;
  state.idx = 0;
  state.totalSeconds = list.reduce((s, q) => s + timeFor(q), 0);
  state.remaining = state.totalSeconds;
  state.editors = {};

  show('screen-test');
  startTimer();
  renderQuestion();
}

/* ---------- Timer ---------- */
function startTimer() {
  clearInterval(state.timerInt);
  updateTimer();
  state.timerInt = setInterval(() => {
    state.remaining--;
    updateTimer();
    if (state.remaining <= 0) { clearInterval(state.timerInt); finishTest(); }
  }, 1000);
}
function updateTimer() {
  const el = $('#timer');
  el.textContent = fmtTime(state.remaining);
  el.classList.toggle('warn', state.remaining <= 60);
}

/* ---------- Rendu d'une question ---------- */
function renderQuestion() {
  const q = state.list[state.idx];
  const a = state.answers[q.id];

  $('#qCat').textContent = q.category;
  $('#qSub').textContent = q.subcategory;
  const pct = ((state.idx) / state.list.length) * 100;
  $('#prog').style.width = pct + '%';
  $('#progLbl').textContent = `Question ${state.idx + 1} / ${state.list.length}`;

  $('#prevBtn').disabled = state.idx === 0;
  $('#nextBtn').textContent = (state.idx === state.list.length - 1) ? 'Terminer ✓' : 'Suivant ▶';

  const card = $('#qCard');
  if (q.type === 'mcq') {
    renderMcq(card, q, a);
  } else {
    renderCode(card, q, a);
  }
  highlightAll(card);
}

function renderMcq(card, q, a) {
  const codeBlock = q.code ? `${codeBlock(q.code, catLang(q.category))}` : '';
  const opts = a.optsOrder.map((origIdx, pos) => {
    const letter = String.fromCharCode(65 + pos);
    const selCls = a.selectedIndex === origIdx ? ' sel' : '';
    return `<button class="opt${selCls}" data-orig="${origIdx}">
      <span class="letter">${letter}</span>
      <span>${esc(q.options[origIdx])}</span>
    </button>`;
  }).join('');
  card.innerHTML = `
    <p class="q-text">${esc(q.question)}</p>
    ${codeBlock}
    <div class="options">${opts}</div>`;
  card.querySelectorAll('.opt').forEach(btn => {
    btn.addEventListener('click', () => {
      a.selectedIndex = parseInt(btn.dataset.orig, 10);
      card.querySelectorAll('.opt').forEach(b => b.classList.remove('sel'));
      btn.classList.add('sel');
    });
  });
}

function renderCode(card, q, a) {
  const isJs = q.language === 'javascript';
  const isSql = q.language === 'sql';
  const isCs = q.language === 'csharp';
  const isJava = q.language === 'java';
  const isCompiled = isCs || isJava; // exécutés à distance via Wandbox
  const ext = isJs ? 'js' : (isSql ? 'sql' : (isJava ? 'java' : 'cs'));

  // Bloc "jeu de données" pour le SQL
  const datasetBlock = isSql && q.setup
    ? `<div class="results"><div class="result-line" style="font-weight:700">📦 Jeu de données (déjà chargé en mémoire)</div><div class="result-line"><code>${esc(q.setup)}</code></div></div>`
    : '';
  // Cas de test attendus (affichés pour le C#)
  const testList = (q.tests || []).map(t =>
    `<div class="result-line"><span class="result-icon">•</span><code>${esc(t.input)}</code> → attendu <code>${esc(t.expected)}</code></div>`
  ).join('');

  card.innerHTML = `
    <p class="q-text">${esc(q.prompt)}</p>
    ${datasetBlock}
    <div class="ide">
      <div class="ide-head">
        <span class="ide-dot" style="background:#ff5f56"></span>
        <span class="ide-dot" style="background:#ffbd2e"></span>
        <span class="ide-dot" style="background:#27c93f"></span>
        <span style="margin-left:6px">solution.${ext}</span>
      </div>
      <div class="ide-host" id="ide-${q.id}"></div>
    </div>
    <div class="run-zone">
      ${isJs ? `<button class="btn btn-vert" id="runBtn">▶ Exécuter les tests</button>` : ''}
      ${isSql ? `<button class="btn btn-vert" id="runBtn">▶ Exécuter la requête</button>` : ''}
      ${isCompiled ? `<button class="btn btn-vert" id="runBtn">▶ Compiler &amp; exécuter (${isJava ? 'Java' : 'C#'})</button>` : ''}
      <button class="btn btn-ghost" id="solBtn">Voir la solution</button>
    </div>
    <div id="resultsZone"></div>
    ${isCompiled ? `<div class="self-grade" id="selfGrade" style="display:none">
        <span class="muted" style="font-size:12px;width:100%">Si l'exécution échoue (hors-ligne), auto-évalue-toi :</span>
        <button class="sg-btn" data-g="1">✅ Réussi</button>
        <button class="sg-btn" data-g="0.5">🟠 Partiel</button>
        <button class="sg-btn" data-g="0">❌ Échoué</button>
      </div>` : ''}
  `;

  // Monte l'éditeur
  mountEditor($('#ide-' + q.id), q.starterCode, q.language).then(ed => { state.editors[q.id] = ed; });

  // Bouton solution
  $('#solBtn').addEventListener('click', () => {
    const zone = $('#resultsZone');
    zone.insertAdjacentHTML('beforeend', `<div class="ide"><div class="ide-head"><span style="margin-left:2px">✓ Solution proposée</span></div>${codeBlock(q.solution, q.language)}</div>
      <div class="detail-body" style="display:block"><div class="expl">${esc(q.explanation)}</div></div>`);
    highlightAll(zone);
  });

  if (isJs) {
    // JS : exécution réelle en local
    $('#runBtn').addEventListener('click', () => {
      const code = state.editors[q.id] ? state.editors[q.id].getValue() : q.starterCode;
      const res = runJs(code, q);
      a.codeRun = res;
      renderJsResults(res);
    });
    if (a.codeRun) renderJsResults(a.codeRun);
  } else if (isSql) {
    // SQL : exécution réelle via sql.js (SQLite WASM)
    $('#runBtn').addEventListener('click', async () => {
      const btn = $('#runBtn');
      const code = state.editors[q.id] ? state.editors[q.id].getValue() : q.starterCode;
      btn.disabled = true; btn.textContent = '⏳ Exécution...';
      const res = await gradeSql(q, code);
      btn.disabled = false; btn.textContent = '▶ Exécuter la requête';
      a.codeRun = res;
      renderSqlResults(res);
    });
    if (a.codeRun) renderSqlResults(a.codeRun);
  } else if (isCompiled) {
    // C# / Java : compilation + exécution réelle via l'API Wandbox (CORS ouvert)
    const sg = $('#selfGrade');
    const lang = isJava ? 'Java' : 'C#';
    const showSelfGrade = () => {
      sg.style.display = 'flex';
      sg.querySelectorAll('.sg-btn').forEach(b => {
        if (a.selfGrade !== null && parseFloat(b.dataset.g) === a.selfGrade) b.classList.add('sel');
        b.addEventListener('click', () => {
          a.selfGrade = parseFloat(b.dataset.g);
          sg.querySelectorAll('.sg-btn').forEach(x => x.classList.remove('sel'));
          b.classList.add('sel');
        });
      });
    };
    $('#runBtn').addEventListener('click', async () => {
      const harness = isJava ? javaHarnessFor(q) : csHarnessFor(q);
      if (!harness) { renderCsResults({ ok: false, error: 'Harness de test introuvable pour cet exercice.' }); return; }
      const btn = $('#runBtn');
      const code = state.editors[q.id] ? state.editors[q.id].getValue() : q.starterCode;
      btn.disabled = true; btn.textContent = '⏳ Compilation & exécution...';
      const res = isJava ? await runJava(code, harness) : await runCsharp(code, harness);
      btn.disabled = false; btn.innerHTML = '▶ Compiler &amp; exécuter (' + lang + ')';
      a.codeRun = res;
      renderCsResults(res);
      if (!res.ok) showSelfGrade(); // repli si l'API est injoignable (hors-ligne)
    });
    if (a.codeRun) { renderCsResults(a.codeRun); if (!a.codeRun.ok) showSelfGrade(); }
    if (a.selfGrade !== null) showSelfGrade();
  }
}

// Exécute la requête de l'utilisateur ET la solution, puis compare
async function gradeSql(q, userQuery) {
  const got = await runSqlQuery(q.setup, userQuery);
  if (!got.ok) return { ok: false, error: got.error };
  const ref = await runSqlQuery(q.setup, q.solution);
  const pass = ref.ok && normalizeSql(got.result) === normalizeSql(ref.result);
  return { ok: true, result: got.result, expected: ref.ok ? ref.result : null, pass, passed: pass ? 1 : 0, total: 1 };
}

// Rend un tableau de résultats sql.js en HTML
function sqlTable(res) {
  if (!res || !res.length) return '<div class="result-line muted">(aucune ligne retournée)</div>';
  const t = res[res.length - 1];
  const head = t.columns.map(c => `<th style="text-align:left;padding:6px 10px;border-bottom:2px solid var(--gris-bord)">${esc(c)}</th>`).join('');
  const rows = t.values.map(r =>
    `<tr>${r.map(v => `<td style="padding:6px 10px;border-bottom:1px solid var(--gris-bord)"><code>${esc(v === null ? 'NULL' : v)}</code></td>`).join('')}</tr>`
  ).join('');
  return `<table style="border-collapse:collapse;width:100%;font-size:13.5px"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`;
}

function renderSqlResults(res) {
  const zone = $('#resultsZone');
  if (!res.ok) {
    zone.innerHTML = `<div class="results"><div class="result-line fail"><span class="result-icon">✗</span> ${esc(res.error)}</div></div>`;
    return;
  }
  const head = res.pass
    ? `<div class="result-line pass"><span class="result-icon">✓</span> Correct — ton résultat correspond à la solution.</div>`
    : `<div class="result-line fail"><span class="result-icon">✗</span> Le résultat ne correspond pas encore à la solution attendue.</div>`;
  zone.innerHTML = `<div class="results">${head}<div style="padding:10px 13px"><div class="muted" style="font-size:12px;margin-bottom:6px">Résultat de ta requête :</div>${sqlTable(res.result)}</div></div>`;
}

/* ---------- Exécution C# via l'API paiza.io (compilateur Mono dans le cloud) ----------
   Harnesses validés sur paiza : chaque solution correcte donne 100%.
   Le code de l'utilisateur (classe complète) + le harness sont envoyés et compilés. */
const CS_HARNESS = {
  Palindrome: `
public class __Runner {
  static int __p=0,__t=0;
  static void A(string l,bool ok,string g){__t++;if(ok){__p++;System.Console.WriteLine("CASE|"+l+"|PASS");}else System.Console.WriteLine("CASE|"+l+"|FAIL|"+g);}
  public static void Main(){
    try{
      bool g1=Palindrome.IsPalindrome("kayak");A("IsPalindrome(kayak) -> true",g1==true,"obtenu="+g1);
      bool g2=Palindrome.IsPalindrome("bonjour");A("IsPalindrome(bonjour) -> false",g2==false,"obtenu="+g2);
      bool g3=Palindrome.IsPalindrome("A man a plan");A("IsPalindrome(A man a plan) -> false",g3==false,"obtenu="+g3);
      bool g4=Palindrome.IsPalindrome("radar");A("IsPalindrome(radar) -> true",g4==true,"obtenu="+g4);
    }catch(System.Exception e){System.Console.WriteLine("CASE|execution|FAIL|"+e.Message);}
    System.Console.WriteLine("SCORE|"+__p+"|"+__t);
  }
}`,
  FizzBuzz: `
public class __Runner {
  static int __p=0,__t=0;
  static void A(string l,bool ok,string g){__t++;if(ok){__p++;System.Console.WriteLine("CASE|"+l+"|PASS");}else System.Console.WriteLine("CASE|"+l+"|FAIL|"+g);}
  public static void Main(){
    try{
      var r3=FizzBuzz.Convert(3);A("Convert(3) -> 1,2,Fizz",string.Join(",",r3.ToArray())=="1,2,Fizz","obtenu="+string.Join(",",r3.ToArray()));
      var r5=FizzBuzz.Convert(5);A("Convert(5) -> 1,2,Fizz,4,Buzz",string.Join(",",r5.ToArray())=="1,2,Fizz,4,Buzz","obtenu="+string.Join(",",r5.ToArray()));
      var r15=FizzBuzz.Convert(15);A("Convert(15)[14] -> FizzBuzz",r15[14]=="FizzBuzz","obtenu="+r15[14]);
      var r0=FizzBuzz.Convert(0);A("Convert(0).Count -> 0",r0.Count==0,"obtenu="+r0.Count);
    }catch(System.Exception e){System.Console.WriteLine("CASE|execution|FAIL|"+e.Message);}
    System.Console.WriteLine("SCORE|"+__p+"|"+__t);
  }
}`,
  Anagram: `
public class __Runner {
  static int __p=0,__t=0;
  static void A(string l,bool ok,string g){__t++;if(ok){__p++;System.Console.WriteLine("CASE|"+l+"|PASS");}else System.Console.WriteLine("CASE|"+l+"|FAIL|"+g);}
  public static void Main(){
    try{
      bool a1=Anagram.AreAnagrams("chien","niche");A("chien/niche -> true",a1==true,"obtenu="+a1);
      bool a2=Anagram.AreAnagrams("Marie","aimer");A("Marie/aimer -> true",a2==true,"obtenu="+a2);
      bool a3=Anagram.AreAnagrams("abc","abd");A("abc/abd -> false",a3==false,"obtenu="+a3);
      bool a4=Anagram.AreAnagrams("abc","ab");A("abc/ab -> false",a4==false,"obtenu="+a4);
    }catch(System.Exception e){System.Console.WriteLine("CASE|execution|FAIL|"+e.Message);}
    System.Console.WriteLine("SCORE|"+__p+"|"+__t);
  }
}`,
  CharFrequency: `
public class __Runner {
  static int __p=0,__t=0;
  static void A(string l,bool ok,string g){__t++;if(ok){__p++;System.Console.WriteLine("CASE|"+l+"|PASS");}else System.Console.WriteLine("CASE|"+l+"|FAIL|"+g);}
  public static void Main(){
    try{
      char c1=CharFrequency.MostFrequent("aabbbc");A("aabbbc -> b",c1=='b',"obtenu="+c1);
      char c2=CharFrequency.MostFrequent("abcabc");A("abcabc -> a",c2=='a',"obtenu="+c2);
      char c3=CharFrequency.MostFrequent("x");A("x -> x",c3=='x',"obtenu="+c3);
      char c4=CharFrequency.MostFrequent("");A("vide -> caractere nul",c4=='\\0',"obtenu code="+((int)c4));
    }catch(System.Exception e){System.Console.WriteLine("CASE|execution|FAIL|"+e.Message);}
    System.Console.WriteLine("SCORE|"+__p+"|"+__t);
  }
}`,
  Analytics: `
public class __Runner {
  static int __p=0,__t=0;
  static void A(string l,bool ok,string g){__t++;if(ok){__p++;System.Console.WriteLine("CASE|"+l+"|PASS");}else System.Console.WriteLine("CASE|"+l+"|FAIL|"+g);}
  public static void Main(){
    try{
      var orders=new System.Collections.Generic.List<Order>();
      orders.Add(new Order{CustomerId=1,Amount=200m,IsPaid=true});
      orders.Add(new Order{CustomerId=2,Amount=500m,IsPaid=true});
      orders.Add(new Order{CustomerId=3,Amount=100m,IsPaid=true});
      var top=Analytics.TopCustomers(orders);
      string s1="";for(int i=0;i<top.Count;i++){if(i>0)s1+=",";s1+=top[i].ToString();}
      A("TopCustomers -> 2,1,3",s1=="2,1,3","obtenu="+s1);
      var o2=new System.Collections.Generic.List<Order>();
      o2.Add(new Order{CustomerId=1,Amount=100m,IsPaid=false});
      var t2=Analytics.TopCustomers(o2);
      A("toutes impayees -> liste vide",t2.Count==0,"obtenu count="+t2.Count);
    }catch(System.Exception e){System.Console.WriteLine("CASE|execution|FAIL|"+e.Message);}
    System.Console.WriteLine("SCORE|"+__p+"|"+__t);
  }
}`,
  Statistics: `
public class __Runner {
  static int __p=0,__t=0;
  static void A(string l,bool ok,string g){__t++;if(ok){__p++;System.Console.WriteLine("CASE|"+l+"|PASS");}else System.Console.WriteLine("CASE|"+l+"|FAIL|"+g);}
  public static void Main(){
    try{
      double d1=Statistics.Average(new int[]{2,4,6});A("avg{2,4,6} -> 4",d1==4.0,"obtenu="+d1);
      double d2=Statistics.Average(new int[]{});A("avg vide -> 0",d2==0,"obtenu="+d2);
      double d3=Statistics.Average(null);A("avg null -> 0",d3==0,"obtenu="+d3);
      double d4=Statistics.Average(new int[]{1,2});A("avg{1,2} -> 1.5",d4==1.5,"obtenu="+d4);
    }catch(System.Exception e){System.Console.WriteLine("CASE|execution|FAIL|"+e.Message);}
    System.Console.WriteLine("SCORE|"+__p+"|"+__t);
  }
}`,
  ShoppingCart: `
public class __Runner {
  static int __p=0,__t=0;
  static void A(string l,bool ok,string g){__t++;if(ok){__p++;System.Console.WriteLine("CASE|"+l+"|PASS");}else System.Console.WriteLine("CASE|"+l+"|FAIL|"+g);}
  public static void Main(){
    try{
      var cart=new ShoppingCart();
      cart.Add("Pomme",2.5m);
      A("Total apres Add Pomme -> 2.5",cart.Total()==2.5m,"obtenu="+cart.Total());
      cart.Add("Pain",1m);cart.Remove("Pain");
      A("Total apres Remove Pain -> 2.5",cart.Total()==2.5m,"obtenu="+cart.Total());
      bool rem=cart.Remove("Inexistant");
      A("Remove inexistant -> false",rem==false,"obtenu="+rem);
      bool threw=false;try{cart.Add("",1m);}catch(System.ArgumentException){threw=true;}
      A("Add nom vide -> ArgumentException",threw==true,"pas d'exception");
    }catch(System.Exception e){System.Console.WriteLine("CASE|execution|FAIL|"+e.Message);}
    System.Console.WriteLine("SCORE|"+__p+"|"+__t);
  }
}`
};
function csHarnessFor(q) { for (const k in CS_HARNESS) if (q.starterCode.indexOf(k) > -1) return CS_HARNESS[k]; return null; }

/* ---------- Java : harnesses de test (classes non-public, exécutées par Wandbox/OpenJDK) ---------- */
const JAVA_HARNESS = {
  Palindrome: `
class __JavaRunner {
  static int p=0,t=0;
  static void A(String l,boolean ok,String g){t++;if(ok){p++;System.out.println("CASE|"+l+"|PASS");}else System.out.println("CASE|"+l+"|FAIL|"+g);}
  public static void main(String[] a){
    try{
      boolean g1=Palindrome.isPalindrome("Level");A("Level -> true",g1,"obtenu="+g1);
      boolean g2=Palindrome.isPalindrome("hello");A("hello -> false",!g2,"obtenu="+g2);
      boolean g3=Palindrome.isPalindrome("Anna");A("Anna -> true",g3,"obtenu="+g3);
      boolean g4=Palindrome.isPalindrome("a");A("a -> true",g4,"obtenu="+g4);
    }catch(Exception e){System.out.println("CASE|execution|FAIL|"+e);}
    System.out.println("SCORE|"+p+"|"+t);
  }
}`,
  FizzBuzz: `
class __JavaRunner {
  static int p=0,t=0;
  static void A(String l,boolean ok,String g){t++;if(ok){p++;System.out.println("CASE|"+l+"|PASS");}else System.out.println("CASE|"+l+"|FAIL|"+g);}
  public static void main(String[] a){
    try{
      String r1=FizzBuzz.fizzBuzz(15);A("15 -> FizzBuzz",r1.equals("FizzBuzz"),"obtenu="+r1);
      String r2=FizzBuzz.fizzBuzz(9);A("9 -> Fizz",r2.equals("Fizz"),"obtenu="+r2);
      String r3=FizzBuzz.fizzBuzz(10);A("10 -> Buzz",r3.equals("Buzz"),"obtenu="+r3);
      String r4=FizzBuzz.fizzBuzz(7);A("7 -> 7",r4.equals("7"),"obtenu="+r4);
    }catch(Exception e){System.out.println("CASE|execution|FAIL|"+e);}
    System.out.println("SCORE|"+p+"|"+t);
  }
}`,
  Anagram: `
class __JavaRunner {
  static int p=0,t=0;
  static void A(String l,boolean ok,String g){t++;if(ok){p++;System.out.println("CASE|"+l+"|PASS");}else System.out.println("CASE|"+l+"|FAIL|"+g);}
  public static void main(String[] a){
    try{
      boolean a1=Anagram.areAnagrams("listen","silent");A("listen/silent -> true",a1,"obtenu="+a1);
      boolean a2=Anagram.areAnagrams("Triangle","Integral");A("Triangle/Integral -> true",a2,"obtenu="+a2);
      boolean a3=Anagram.areAnagrams("hello","world");A("hello/world -> false",!a3,"obtenu="+a3);
      boolean a4=Anagram.areAnagrams("abc","ab");A("abc/ab -> false",!a4,"obtenu="+a4);
    }catch(Exception e){System.out.println("CASE|execution|FAIL|"+e);}
    System.out.println("SCORE|"+p+"|"+t);
  }
}`,
  CharFrequency: `
class __JavaRunner {
  static int p=0,t=0;
  static void A(String l,boolean ok,String g){t++;if(ok){p++;System.out.println("CASE|"+l+"|PASS");}else System.out.println("CASE|"+l+"|FAIL|"+g);}
  public static void main(String[] a){
    try{
      char c1=CharFrequency.mostFrequentChar("aabbbc");A("aabbbc -> b",c1=='b',"obtenu="+c1);
      char c2=CharFrequency.mostFrequentChar("abcabc");A("abcabc -> a",c2=='a',"obtenu="+c2);
      char c3=CharFrequency.mostFrequentChar("x");A("x -> x",c3=='x',"obtenu="+c3);
      char c4=CharFrequency.mostFrequentChar("aaabbbb");A("aaabbbb -> b",c4=='b',"obtenu="+c4);
    }catch(Exception e){System.out.println("CASE|execution|FAIL|"+e);}
    System.out.println("SCORE|"+p+"|"+t);
  }
}`,
  ArrayUtils: `
class __JavaRunner {
  static int p=0,t=0;
  static void A(String l,boolean ok,String g){t++;if(ok){p++;System.out.println("CASE|"+l+"|PASS");}else System.out.println("CASE|"+l+"|FAIL|"+g);}
  public static void main(String[] a){
    try{
      int s1=ArrayUtils.secondLargest(new int[]{3,1,4,1,5});A("{3,1,4,1,5} -> 4",s1==4,"obtenu="+s1);
      int s2=ArrayUtils.secondLargest(new int[]{10,10,9});A("{10,10,9} -> 9",s2==9,"obtenu="+s2);
      int s3=ArrayUtils.secondLargest(new int[]{2,1});A("{2,1} -> 1",s3==1,"obtenu="+s3);
      int s4=ArrayUtils.secondLargest(new int[]{-1,-2,-3});A("{-1,-2,-3} -> -2",s4==-2,"obtenu="+s4);
    }catch(Exception e){System.out.println("CASE|execution|FAIL|"+e);}
    System.out.println("SCORE|"+p+"|"+t);
  }
}`,
  SafeString: `
class __JavaRunner {
  static int p=0,t=0;
  static void A(String l,boolean ok,String g){t++;if(ok){p++;System.out.println("CASE|"+l+"|PASS");}else System.out.println("CASE|"+l+"|FAIL|"+g);}
  public static void main(String[] a){
    try{
      int l1=SafeString.safeLength("hello");A("hello -> 5",l1==5,"obtenu="+l1);
      int l2=SafeString.safeLength(null);A("null -> 0",l2==0,"obtenu="+l2);
      int l3=SafeString.safeLength("");A("vide -> 0",l3==0,"obtenu="+l3);
      int l4=SafeString.safeLength("a b");A("a b -> 3",l4==3,"obtenu="+l4);
    }catch(Exception e){System.out.println("CASE|execution|FAIL|"+e);}
    System.out.println("SCORE|"+p+"|"+t);
  }
}`
};
function javaHarnessFor(q) { return JAVA_HARNESS[q.className] || null; }

/* ---------- Exécution distante via l'API Wandbox (CORS ouvert : marche depuis le web) ----------
   Compilateurs : C# = mono-6.12.0.199, Java = openjdk-jdk-21+35. Appel synchrone (un seul POST). */
function parseRunnerOutput(stdout) {
  const lines = (stdout || '').split('\n');
  const results = []; let passed = 0, total = 0;
  lines.forEach(line => {
    if (line.indexOf('CASE|') === 0) { const p = line.split('|'); results.push({ label: p[1], pass: p[2] === 'PASS', got: p[3] || '' }); }
    else if (line.indexOf('SCORE|') === 0) { const p = line.split('|'); passed = parseInt(p[1], 10) || 0; total = parseInt(p[2], 10) || 0; }
  });
  if (total === 0 && results.length) { total = results.length; passed = results.filter(r => r.pass).length; }
  return { results, passed, total };
}

async function runWandbox(source, compiler) {
  let json;
  try {
    const r = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: source, compiler: compiler, options: '', stdin: '', 'compiler-option-raw': '', 'runtime-option-raw': '' })
    });
    json = await r.json();
  } catch (e) { return { ok: false, error: "Connexion à l'API d'exécution impossible (vérifie ta connexion internet)." }; }
  const parsed = parseRunnerOutput(json.program_output || '');
  if (parsed.total === 0 && parsed.results.length === 0) {
    const err = (json.compiler_error || '').trim() || (json.program_error || '').trim() || 'Aucune sortie produite. Vérifie ton code.';
    return { ok: true, build: false, buildError: err, results: [], passed: 0, total: 0 };
  }
  return { ok: true, build: true, results: parsed.results, passed: parsed.passed, total: parsed.total, runtimeError: (json.program_error || '').trim() };
}

async function runCsharp(userCode, harness) {
  return runWandbox(userCode + '\n\n' + harness, 'mono-6.12.0.199');
}
async function runJava(userCode, harness) {
  // Wandbox compile dans prog.java : les classes ne doivent pas être public. Imports en tête, harness à la fin.
  const stripped = userCode.replace(/\bpublic\s+(class|interface|enum)\b/g, '$1');
  return runWandbox(stripped + '\n\n' + harness, 'openjdk-jdk-21+35');
}

function renderCsResults(res) {
  const zone = $('#resultsZone');
  if (!res.ok) {
    zone.innerHTML = `<div class="results"><div class="result-line fail"><span class="result-icon">✗</span> ${esc(res.error)}</div></div>`;
    return;
  }
  if (res.build === false) {
    zone.innerHTML = `<div class="results"><div class="result-line fail"><span class="result-icon">✗</span> Erreur de compilation :</div></div><pre class="code">${esc(res.buildError)}</pre>`;
    return;
  }
  const head = `<div class="result-line" style="font-weight:700">${res.passed}/${res.total} tests réussis (compilé & exécuté)</div>`;
  const lines = res.results.map(r =>
    `<div class="result-line ${r.pass ? 'pass' : 'fail'}"><span class="result-icon">${r.pass ? '✓' : '✗'}</span> ${esc(r.label)}${r.pass ? '' : ` <span class="muted" style="margin-left:auto">${esc(r.got)}</span>`}</div>`
  ).join('');
  const extra = res.runtimeError ? `<pre class="code">${esc(res.runtimeError)}</pre>` : '';
  zone.innerHTML = `<div class="results">${head}${lines}</div>${extra}`;
}

function renderJsResults(res) {
  const zone = $('#resultsZone');
  if (!res.ok) {
    zone.innerHTML = `<div class="results"><div class="result-line fail"><span class="result-icon">✗</span> ${esc(res.error)}</div></div>`;
    return;
  }
  const lines = res.results.map(r =>
    `<div class="result-line ${r.pass ? 'pass' : 'fail'}">
      <span class="result-icon">${r.pass ? '✓' : '✗'}</span>
      <code>solve(${esc(r.input)})</code> → <code>${esc(r.got)}</code>
      ${r.pass ? '' : `<span class="muted" style="margin-left:auto">attendu <code>${esc(r.expected)}</code></span>`}
    </div>`
  ).join('');
  const head = `<div class="result-line" style="font-weight:700">${res.passed}/${res.total} tests réussis</div>`;
  zone.innerHTML = `<div class="results">${head}${lines}</div>`;
}

/* ---------- Exécution JS en bac à sable ---------- */
function fmtVal(v) {
  try { return JSON.stringify(v); } catch (e) { return String(v); }
}
function runJs(userCode, q) {
  let fn;
  try {
    const factory = new Function(userCode + `\n; return (typeof ${q.functionName} === 'function') ? ${q.functionName} : null;`);
    fn = factory();
  } catch (e) {
    return { ok: false, error: 'Erreur de syntaxe : ' + e.message };
  }
  if (typeof fn !== 'function') {
    return { ok: false, error: `La fonction "${q.functionName}" est introuvable. Vérifie son nom.` };
  }
  const results = (q.tests || []).map(t => {
    let input, expected, got, pass = false, err = null;
    try { input = eval('(' + t.input + ')'); } catch (e) { input = undefined; }
    try { expected = eval('(' + t.expected + ')'); } catch (e) { expected = t.expected; }
    try { got = fn(input); pass = fmtVal(got) === fmtVal(expected); }
    catch (e) { err = e.message; }
    return { input: t.input, expected: t.expected, got: err ? ('Erreur: ' + err) : fmtVal(got), pass };
  });
  return { ok: true, results, passed: results.filter(r => r.pass).length, total: results.length };
}

/* ---------- Navigation ---------- */
function goNext() {
  if (state.idx === state.list.length - 1) { finishTest(); return; }
  state.idx++; renderQuestion();
}
function goPrev() { if (state.idx > 0) { state.idx--; renderQuestion(); } }

/* ---------- Calcul des scores ---------- */
function computeScores() {
  state.list.forEach(q => {
    const a = state.answers[q.id];
    if (q.type === 'mcq') {
      a.score = (a.selectedIndex === q.correctIndex) ? a.max : 0;
    } else if (q.language === 'javascript' || q.language === 'sql') {
      const r = a.codeRun;
      a.score = (r && r.ok && r.total) ? a.max * (r.passed / r.total) : 0;
    } else if (q.language === 'csharp' || q.language === 'java') {
      const r = a.codeRun;
      if (r && r.ok && r.build !== false && r.total) a.score = a.max * (r.passed / r.total);
      else a.score = (a.selfGrade != null) ? a.max * a.selfGrade : 0;
    } else {
      a.score = (a.selfGrade != null) ? a.max * a.selfGrade : 0;
    }
  });
}

/* ---------- Fin du test & rapport ---------- */
function finishTest() {
  clearInterval(state.timerInt);
  computeScores();
  buildReport();
  show('screen-report');
}

function segBar(pct) {
  const N = 10;
  const filled = Math.round(pct * N);
  let cls = 'f-rouge';
  if (pct >= 0.7) cls = 'f-vert'; else if (pct >= 0.4) cls = 'f-orange';
  let html = '';
  for (let i = 0; i < N; i++) html += `<span class="seg ${i < filled ? cls : ''}"></span>`;
  return `<div class="segbar">${html}</div>`;
}

function buildReport() {
  $('#hello').textContent = `Bonjour ${state.name}, votre rapport de test est ci-dessous.`;
  $('#reportDate').textContent = 'Test : ' + state.list.length + ' questions · stack .NET / Angular';

  // Totaux
  let pts = 0, max = 0;
  state.list.forEach(q => { pts += state.answers[q.id].score; max += state.answers[q.id].max; });
  const globalPct = max ? pts / max : 0;
  $('#kPoints').textContent = `${Math.round(pts)} / ${max}`;
  $('#kPointsPct').textContent = Math.round(globalPct * 100) + '% de réussite';

  const used = state.totalSeconds - state.remaining;
  $('#kTime').textContent = fmtTime(used);
  $('#kTimePct').textContent = `sur ${fmtTime(state.totalSeconds)} (${Math.round((used / state.totalSeconds) * 100)}%)`;

  const v = $('#verdict');
  if (globalPct >= 0.6) { v.className = 'verdict ok'; v.textContent = '✅ Test réussi — au-dessus du seuil de 60 %'; }
  else { v.className = 'verdict ko'; v.textContent = '❌ En dessous du seuil de 60 % — continue à t\'entraîner !'; }

  // Petit clin d'œil de fin d'examen : image aléatoire + message rigolo
  const celeb = $('#celebration');
  if (celeb) {
    const msgs = globalPct >= 0.6 ? [
      '✊ Insoumis face aux bugs, et vainqueur !',
      '« Qu\'ils s\'en aillent tous »… sauf toi, t\'as géré !',
      'Place au peuple… des développeurs ! 🔥',
      'La planification écologique ET celle des tests : validées ! 🌍',
      'On lâche rien, surtout pas la non-régression !',
      'Allez, candidate chez efluid, c\'est validé !'
    ] : [
      'On ne lâche rien ! La révolution (du code) est en marche.',
      'Un petit revers, mais l\'Insoumis se relève toujours. Recommence !',
      '« Résistance ! » — relis le cours et reviens plus fort.',
      'Le grand soir du 100 % arrivera. Persévère, camarade !',
      'Même Jean-Luc a dû réviser ses classiques. À toi de jouer !'
    ];
    const WIN = ['win-1.webp', 'win-2.png', 'win-3.png', 'win-4.webp', 'win-5.png'];
    const file = WIN[Math.floor(Math.random() * WIN.length)];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    celeb.innerHTML = `<img class="celeb-img" src="img/${file}" alt=""
      onload="this.closest('.celebration').classList.add('show')"
      onerror="this.closest('.celebration').classList.remove('show')">
      <div class="celeb-msg">🎉 ${msg}</div>`;
  }

  // Agrégation par catégorie / sous-catégorie
  const cats = {};
  state.list.forEach(q => {
    const a = state.answers[q.id];
    const c = cats[q.category] || (cats[q.category] = { pts: 0, max: 0, subs: {} });
    c.pts += a.score; c.max += a.max;
    const s = c.subs[q.subcategory] || (c.subs[q.subcategory] = { pts: 0, max: 0 });
    s.pts += a.score; s.max += a.max;
  });

  $('#catReport').innerHTML = Object.keys(cats).map(cat => {
    const c = cats[cat];
    const cpct = c.max ? c.pts / c.max : 0;
    const subs = Object.keys(c.subs).map(sn => {
      const s = c.subs[sn];
      const spct = s.max ? s.pts / s.max : 0;
      return `<div class="sub-row">
        <span class="s-name">${esc(sn)}</span>
        ${segBar(spct)}
        <span class="s-val">${Math.round(s.pts)}/${s.max}</span>
      </div>`;
    }).join('');
    return `<div class="cat-block">
      <div class="cat-block-head">
        <span class="name">${esc(cat)}</span>
        <span class="score">${Math.round(c.pts)} / ${c.max}</span>
        <span class="pct">(${Math.round(cpct * 100)}%)</span>
      </div>
      ${subs}
    </div>`;
  }).join('');

  // Détail par question
  $('#detailReport').innerHTML = state.list.map((q, i) => {
    const a = state.answers[q.id];
    const ratio = a.max ? a.score / a.max : 0;
    let cls = 'fail', ico = '✗';
    if (ratio >= 0.99) { cls = 'pass'; ico = '✓'; }
    else if (ratio > 0) { cls = 'partial'; ico = '◐'; }

    let body = '';
    if (q.type === 'mcq') {
      const yourTxt = a.selectedIndex != null ? q.options[a.selectedIndex] : '(non répondu)';
      const goodTxt = q.options[q.correctIndex];
      const right = a.selectedIndex === q.correctIndex;
      body = `
        ${q.code ? `${codeBlock(q.code, catLang(q.category))}` : ''}
        <div class="ans ${right ? 'good' : 'bad'}">Ta réponse : ${esc(yourTxt)}</div>
        ${right ? '' : `<div class="ans good">Bonne réponse : ${esc(goodTxt)}</div>`}
        <div class="expl">${esc(q.explanation)}</div>`;
    } else {
      let got;
      if (q.language === 'javascript' && a.codeRun && a.codeRun.ok) got = `${a.codeRun.passed}/${a.codeRun.total} tests réussis`;
      else if (q.language === 'sql' && a.codeRun && a.codeRun.ok) got = a.codeRun.pass ? 'Requête correcte ✓' : 'Requête incorrecte';
      else if ((q.language === 'csharp' || q.language === 'java') && a.codeRun && a.codeRun.ok && a.codeRun.build !== false) got = `${a.codeRun.passed}/${a.codeRun.total} tests réussis (compilé)`;
      else if ((q.language === 'csharp' || q.language === 'java') && a.codeRun && a.codeRun.build === false) got = 'Erreur de compilation';
      else if (a.selfGrade != null) got = `Auto-évaluation : ${a.selfGrade === 1 ? 'Réussi' : a.selfGrade === 0.5 ? 'Partiel' : 'Échoué'}`;
      else got = '(non évalué)';
      body = `
        <div class="ans">${esc(got)}</div>
        <div class="ide"><div class="ide-head"><span style="margin-left:2px">Solution</span></div>${codeBlock(q.solution, q.language)}</div>
        <div class="expl">${esc(q.explanation)}</div>`;
    }

    const title = q.type === 'mcq' ? q.question : q.prompt;
    return `<div class="detail-item">
      <div class="detail-head ${cls}" data-i="${i}">
        <span class="d-ico">${ico}</span>
        <span class="d-q">${esc(title)}</span>
        <span class="d-cat">${esc(q.category)} · ${esc(q.subcategory)}</span>
      </div>
      <div class="detail-body">${body}</div>
    </div>`;
  }).join('');

  $('#detailReport').querySelectorAll('.detail-head').forEach(h => {
    h.addEventListener('click', () => h.closest('.detail-item').classList.toggle('open'));
  });
  highlightAll($('#detailReport'));
}

/* ---------- Branchements ---------- */
document.addEventListener('DOMContentLoaded', () => {
  buildHome();
  loadMonaco(); // préchargement de l'IDE
  loadSql();    // préchargement du moteur SQLite (WASM)

  $('#startBtn').addEventListener('click', startTest);
  $('#selAll').addEventListener('click', () => document.querySelectorAll('#cats input').forEach(c => { c.checked = true; c.closest('.cat-chip').classList.add('sel'); }));
  $('#selNone').addEventListener('click', () => document.querySelectorAll('#cats input').forEach(c => { c.checked = false; c.closest('.cat-chip').classList.remove('sel'); }));

  $('#nextBtn').addEventListener('click', goNext);
  $('#skipBtn').addEventListener('click', goNext);
  $('#prevBtn').addEventListener('click', goPrev);

  $('#printBtn').addEventListener('click', () => window.print());
  $('#restartBtn').addEventListener('click', () => location.reload());
});
})(); // ==== fin portée app.js ====
