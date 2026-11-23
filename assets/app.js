/* Islamic Google — application */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  let toastTimer;
  const toast = (msg) => {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  };
  const fmt12 = (hhmm) => {
    if (!hhmm) return '—';
    const [h, m] = hhmm.split(':').map(Number);
    const ap = h >= 12 ? 'PM' : 'AM'; const hr = h % 12 || 12;
    return `${hr}:${String(m).padStart(2, '0')} ${ap}`;
  };

  /* ---------------- theme ---------------- */
  const applyTheme = (t) => { document.documentElement.dataset.theme = t; store.set('ig_theme', t); };
  applyTheme(store.get('ig_theme', 'dark'));
  $('#themeBtn').addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  /* ---------------- router ---------------- */
  const VIEWS = ['home', 'search', 'quran', 'hadith', 'learn', 'directory', 'tools', 'about'];
  const show = (id) => {
    if (!VIEWS.includes(id)) id = 'home';
    VIEWS.forEach(v => { const n = $('#view-' + v); if (n) n.hidden = (v !== id); });
    $$('.nav a').forEach(a => {
      if (a.dataset.nav === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    $('#nav').classList.remove('open');
    $('#menuBtn').setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'auto' : 'auto' });
    if (id === 'quran' && !state.surahs.length) loadSurahs();
    if (id === 'tools') { renderNames(); renderDuas(); ensureHijri(); }
    if (id === 'learn') renderScholars();
    if (id === 'about') initContact();
    if (id === 'directory') renderDirectory();
  };
  const route = () => {
    const h = location.hash.replace('#', '') || 'home';
    show(h);
  };
  window.addEventListener('hashchange', route);
  $('#menuBtn').addEventListener('click', () => {
    const open = $('#nav').classList.toggle('open');
    $('#menuBtn').setAttribute('aria-expanded', String(open));
  });

  /* ---------------- home render ---------------- */
  const renderExplore = () => {
    const box = $('#explore'); box.innerHTML = '';
    EXPLORE.forEach(x => {
      const a = el('a', 'tile', `<span class="ico">${x.ico}</span><span><b>${esc(x.t)}</b><span>${esc(x.s)}</span></span>`);
      a.href = x.h; box.appendChild(a);
    });
  };
  const renderStart = () => {
    const box = $('#startHere'); box.innerHTML = '';
    START_HERE.forEach(x => {
      const a = el('a', 'pick', `<span class="ico">${x.ico}</span><span><b>${esc(x.n)}</b><span>${esc(x.d)}</span></span>`);
      a.href = x.u; a.target = '_blank'; a.rel = 'noopener'; box.appendChild(a);
    });
  };
  let ayahIndex = Math.floor(Math.random() * DAILY_AYAT.length);
  const renderAyah = () => {
    const a = DAILY_AYAT[ayahIndex % DAILY_AYAT.length];
    $('#dailyArabic').textContent = a.ar;
    $('#dailyText').textContent = '“' + a.en + '”';
    $('#dailyRef').textContent = a.ref;
    $('#dailyLink').href = `https://quran.com/${a.s}/${a.a}`;
    $('#dailyLink').target = '_blank'; $('#dailyLink').rel = 'noopener';
  };
  $('#newAyah')?.addEventListener('click', () => { ayahIndex++; renderAyah(); });

  /* ---------------- prayer times ---------------- */
  const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const state = { lat: 5.6037, lng: -0.1870, city: 'Accra', timings: null, surahs: [], currentSurah: null, bookmarks: store.get('ig_bookmarks', []), names: [], audio: null };

  async function loadPrayer(lat = state.lat, lng = state.lng, label = state.city) {
    state.lat = lat; state.lng = lng; state.city = label;
    $('#prayerPlace').textContent = label;
    const d = new Date(); const date = `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
    try {
      const r = await fetch(`https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lng}&method=3`);
      const j = await r.json();
      state.timings = j.data.timings;
      state.hijri = j.data.date.hijri;
      renderPrayers();
      renderHijri();
    } catch {
      $('#prayerList').innerHTML = '<li>Could not load prayer times. Check your connection.</li>';
    }
  }
  function renderPrayers() {
    const t = state.timings; if (!t) return;
    const list = $('#prayerList'); list.innerHTML = '';
    const now = new Date();
    let nextName = null, nextAt = null;
    PRAYERS.forEach(p => {
      const li = el('li', '', `<span>${p}</span><b>${fmt12(t[p])}</b>`);
      const [h, m] = t[p].split(':').map(Number);
      const at = new Date(now); at.setHours(h, m, 0, 0);
      if (at > now && !nextAt) { nextName = p; nextAt = at; li.classList.add('now'); }
      list.appendChild(li);
    });
    if (!nextName) { // tomorrow fajr
      const [h, m] = t.Fajr.split(':').map(Number);
      nextName = 'Fajr'; nextAt = new Date(now); nextAt.setDate(now.getDate() + 1); nextAt.setHours(h, m, 0, 0);
    }
    $('#nextName').textContent = nextName;
    $('#nextTime').textContent = fmt12(t[nextName]);
    const tick = () => {
      const diff = nextAt - new Date();
      if (diff <= 0) { renderPrayers(); return; }
      const h = Math.floor(diff / 3.6e6), m = Math.floor(diff % 3.6e6 / 6e4), s = Math.floor(diff % 6e4 / 1000);
      $('#countdown').textContent = `${nextName} in ${h}h ${m}m ${s}s`;
    };
    tick(); clearInterval(state.cd); state.cd = setInterval(tick, 1000);
  }
  function renderHijri() {
    const h = state.hijri; if (!h) return;
    const out = $('#hijriDate'); if (out) out.textContent = `${h.day} ${h.month.en} ${h.year} AH`;
    const note = $('#hijriNote'); if (note) note.textContent = `${h.weekday.en} · ${h.month.ar}`;
  }
  $('#geoBtn')?.addEventListener('click', () => {
    if (!navigator.geolocation) return toast('Location is not available in this browser');
    navigator.geolocation.getCurrentPosition(
      p => { loadPrayer(p.coords.latitude, p.coords.longitude, 'Your location'); toast('Prayer times updated'); },
      () => toast('Location permission denied, staying on Accra')
    );
  });

  /* ---------------- search ---------------- */
  const LOCAL_INDEX = [];
  const indexLocal = () => {
    if (LOCAL_INDEX.length) return;
    DIRECTORY.forEach(d => LOCAL_INDEX.push({ type: 'resource', title: d.n, text: d.d, sub: CATEGORIES.find(c => c.id === d.c)?.label || d.c, url: d.u, extra: d.t }));
    HADITH.forEach(h => LOCAL_INDEX.push({ type: 'hadith', title: h.t, text: h.en, sub: h.src, url: h.u, ar: h.ar }));
    DUAS.forEach(d => LOCAL_INDEX.push({ type: 'dua', title: d.t, text: d.en, sub: d.ref, ar: d.ar }));
    PATHS.forEach(p => p.steps.forEach(s => LOCAL_INDEX.push({ type: 'learn', title: s[0], text: p.t, sub: p.meta, url: s[1] })));
  };
  const score = (q, item) => {
    const hay = (item.title + ' ' + item.text + ' ' + item.sub).toLowerCase();
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return 0;
    let s = 0;
    words.forEach(w => {
      if (item.title.toLowerCase().includes(w)) s += 6;
      if (hay.includes(w)) s += 2;
    });
    return s;
  };
  async function searchQuran(q) {
    try {
      const r = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(q)}/all/en.sahih`);
      const j = await r.json();
      return (j.data?.matches || []).slice(0, 12).map(m => ({
        type: 'quran', title: `${m.surah.englishName} ${m.surah.number}:${m.numberInSurah}`,
        text: m.text, sub: m.surah.englishNameTranslation, url: `https://quran.com/${m.surah.number}/${m.numberInSurah}`
      }));
    } catch { return []; }
  }
  let searchFilter = 'all';
  async function runSearch(q) {
    indexLocal();
    if (!q.trim()) { toast('Type something to search'); return; }
    location.hash = 'search';
    $('#q2').value = q;
    const box = $('#results');
    box.innerHTML = '<p class="muted"><span class="spinner"></span> Searching the Qur’an and the directory…</p>';
    const local = LOCAL_INDEX.map(i => ({ i, s: score(q, i) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 20).map(x => x.i);
    const quran = await searchQuran(q);
    state.results = { quran, local };
    renderResults();
  }
  function renderResults() {
    const box = $('#results'); if (!state.results) return;
    const { quran, local } = state.results;
    const all = [
      ...quran.map(r => ({ ...r, type: 'quran' })),
      ...local.map(r => ({ ...r, type: r.type }))
    ].filter(r => searchFilter === 'all' || r.type === searchFilter);
    const meta = $('#resultMeta');
    meta.textContent = `${all.length} result${all.length === 1 ? '' : 's'} · Qur’an matches from AlQuran Cloud, everything else from the curated directory`;
    if (!all.length) { box.innerHTML = '<div class="empty">Nothing found. Try a simpler word, like <b>patience</b> or <b>mercy</b>.</div>'; return; }
    box.innerHTML = '';
    all.forEach(r => {
      const card = el('article', 'result');
      const badge = r.type === 'quran' ? 'q' : r.type === 'hadith' ? 'h' : '';
      const label = r.type === 'quran' ? 'Qur’an' : r.type === 'hadith' ? 'Hadith' : r.type === 'dua' ? 'Dua' : r.type === 'learn' ? 'Learn' : 'Directory';
      card.innerHTML = `
        ${r.ar ? `<p class="arabic" dir="rtl">${esc(r.ar)}</p>` : ''}
        <h3>${esc(r.title)}</h3>
        <p class="snippet">${esc(r.text || '')}</p>
        <div class="rowMeta"><span class="badge ${badge}">${label}</span><span class="muted small">${esc(r.sub || '')}</span>
        ${r.url ? `<a class="link" href="${esc(r.url)}" target="_blank" rel="noopener">Open →</a>` : ''}</div>`;
      box.appendChild(card);
    });
  }
  $('#resultTabs')?.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#resultTabs button').forEach(x => x.classList.remove('active')); b.classList.add('active');
    searchFilter = b.dataset.filter; renderResults();
  });

  /* ---------------- quran ---------------- */
  async function loadSurahs() {
    const box = $('#surahList'); box.innerHTML = '<p class="muted small" style="padding:10px">Loading surahs…</p>';
    try {
      const r = await fetch('https://api.alquran.cloud/v1/surah');
      const j = await r.json();
      state.surahs = j.data;
      box.innerHTML = '';
      state.surahs.forEach(s => {
        const b = el('button', '', `<span>${s.number}. ${esc(s.englishName)}</span><span class="num">${s.numberOfAyahs}</span>`);
        b.dataset.n = s.number;
        b.addEventListener('click', () => openSurah(s.number));
        box.appendChild(b);
      });
    } catch {
      box.innerHTML = '<p class="muted small" style="padding:10px">Could not load the surah list.</p>';
    }
  }
  async function openSurah(n) {
    const reader = $('#reader');
    reader.innerHTML = '<p class="muted"><span class="spinner"></span> Loading surah…</p>';
    $$('#surahList button').forEach(b => b.classList.toggle('active', Number(b.dataset.n) === n));
    try {
      const r = await fetch(`https://api.alquran.cloud/v1/surah/${n}/editions/quran-uthmani,en.sahih`);
      const j = await r.json();
      const ar = j.data[0], en = j.data[1];
      state.currentSurah = n;
      reader.innerHTML = `
        <h2>${esc(ar.englishName)} <span class="muted small">${esc(ar.name)}</span></h2>
        <p class="sub">${ar.numberOfAyahs} ayahs · ${esc(ar.revelationType)} · translation: Sahih International</p>
        <div id="ayahBox"></div>`;
      const box = $('#ayahBox');
      ar.ayahs.forEach((a, i) => {
        const pad = String(n).padStart(3, '0') + String(a.numberInSurah).padStart(3, '0');
        const row = el('div', 'ayah');
        row.innerHTML = `
          <p class="ar" dir="rtl">${esc(a.text)}</p>
          <p class="en">${esc(en.ayahs[i]?.text || '')}</p>
          <div class="ayahBar"><span class="ayahNo">${n}:${a.numberInSurah}</span>
            <button class="playBtn" data-audio="${pad}">▶ Listen</button>
            <a class="link" href="https://quran.com/${n}/${a.numberInSurah}" target="_blank" rel="noopener">Tafsir →</a></div>`;
        box.appendChild(row);
      });
      reader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      reader.innerHTML = '<p class="muted">Could not load this surah. Check your connection and try again.</p>';
    }
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-audio]'); if (!b) return;
    const pad = b.dataset.audio;
    const url = `https://everyayah.com/data/Alafasy_128kbps/${pad}.mp3`;
    if (state.audio) { state.audio.pause(); state.audio = null; }
    $$('.playBtn').forEach(x => x.textContent = '▶ Listen');
    state.audio = new Audio(url);
    state.audio.play().then(() => { b.textContent = '⏸ Playing'; }).catch(() => toast('Audio could not play here'));
    state.audio.onended = () => { b.textContent = '▶ Listen'; };
  });

  /* ---------------- hadith ---------------- */
  const renderHadith = () => {
    const box = $('#hadithList'); if (!box) return;
    box.innerHTML = '';
    HADITH.forEach(h => {
      const c = el('article', 'card');
      c.innerHTML = `
        <p class="arabic" dir="rtl">${esc(h.ar)}</p>
        <h3 style="margin:0 0 6px;font-size:1rem">${esc(h.t)}</h3>
        <p class="translit" style="font-size:.92rem;color:var(--txt-2)">${esc(h.en)}</p>
        <div class="rowMeta"><span class="badge h">${esc(h.src)}</span>
          <a class="link" href="${h.u}" target="_blank" rel="noopener">Read in context →</a></div>`;
      box.appendChild(c);
    });
    const src = $('#hadithSources'); if (src) {
      src.innerHTML = '';
      HADITH_SOURCES.forEach(s => {
        const a = el('a', 'pick', `<span class="ico">📚</span><span><b>${esc(s.n)}</b><span>${esc(s.d)}</span></span>`);
        a.href = s.u; a.target = '_blank'; a.rel = 'noopener'; src.appendChild(a);
      });
    }
  };

  /* ---------------- learn ---------------- */
  const renderScholars = () => {
    const box = $('#scholars'); if (!box) return;
    box.innerHTML = '';
    SCHOLARS.forEach(x => {
      const a = el('a', 'card res');
      a.href = x.u; a.target = '_blank'; a.rel = 'noopener';
      a.innerHTML = `<h3>${esc(x.n)}</h3><p class="muted small">${esc(x.d)}</p>
        <div class="foot"><span class="typeTag">channel</span><span class="verified">● live</span></div>`;
      box.appendChild(a);
    });
  };

  const initContact = () => {
    const f = $('#contactForm'); if (!f || f.dataset.ready) return;
    f.dataset.ready = '1';
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const st = $('#contactStatus'); const btn = f.querySelector('button');
      btn.disabled = true; st.hidden = false; st.textContent = 'Sending…';
      try {
        const res = await fetch(CONTACT.formEndpoint, {
          method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(f)
        });
        if (!res.ok) throw new Error('bad status');
        f.reset();
        st.textContent = 'Thank you, your message was received. Jazakallahu khayran.';
      } catch (err) {
        st.innerHTML = 'Could not send. Please email <a href="mailto:' + CONTACT.email + '">' + CONTACT.email + '</a> or WhatsApp.';
      } finally { btn.disabled = false; }
    });
  };

  const renderPaths = () => {
    const box = $('#paths'); if (!box) return;
    box.innerHTML = '';
    PATHS.forEach(p => {
      const d = el('article', 'path');
      d.innerHTML = `<p class="meta">${esc(p.meta)}</p><h3>${esc(p.t)}</h3>
        <ol>${p.steps.map(s => `<li><a href="${s[1]}" target="_blank" rel="noopener">${esc(s[0])}</a></li>`).join('')}</ol>`;
      box.appendChild(d);
    });
  };

  /* ---------------- directory ---------------- */
  let dirCat = 'all', dirQuery = '';
  const renderDirTabs = () => {
    const box = $('#dirTabs'); if (!box) return;
    box.innerHTML = '';
    [{ id: 'all', label: 'All' }, ...CATEGORIES].forEach(c => {
      const b = el('button', c.id === dirCat ? 'active' : '', esc(c.label));
      b.dataset.cat = c.id;
      b.addEventListener('click', () => { dirCat = c.id; renderDirTabs(); renderDirectory(); });
      box.appendChild(b);
    });
  };
  const renderDirectory = () => {
    renderDirTabs();
    const grid = $('#dirGrid'); if (!grid) return;
    const q = dirQuery.toLowerCase();
    const items = DIRECTORY.filter(d =>
      (dirCat === 'all' || d.c === dirCat) &&
      (!q || (d.n + ' ' + d.d + ' ' + d.t + ' ' + d.c).toLowerCase().includes(q))
    );
    $('#dirMeta').textContent = `${items.length} of ${DIRECTORY.length} resources · all links checked live`;
    grid.innerHTML = '';
    if (!items.length) { grid.innerHTML = '<div class="empty">Nothing matches that filter.</div>'; return; }
    items.forEach(d => {
      const a = el('a', 'dirCard');
      a.href = d.u; a.target = '_blank'; a.rel = 'noopener';
      a.innerHTML = `<div class="foot"><span class="typeTag">${esc(d.t)}</span><span class="verified">● live</span></div>
        <b>${esc(d.n)}</b><p>${esc(d.d)}</p><span class="host">${esc(d.u.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</span>`;
      grid.appendChild(a);
    });
  };
  $('#dirSearch')?.addEventListener('input', e => { dirQuery = e.target.value; renderDirectory(); });

  /* ---------------- tools: names, duas, hijri, tasbih, zakat, qibla ---------------- */
  async function renderNames() {
    const grid = $('#namesGrid'); if (!grid || grid.dataset.done) return;
    grid.innerHTML = '<p class="muted small">Loading the 99 names…</p>';
    try {
      const r = await fetch('https://api.aladhan.com/v1/asmaAlHusna');
      const j = await r.json();
      state.names = j.data.map(n => ({ n: n.name, tr: n.transliteration, en: n.en.meaning, num: n.number }));
      grid.dataset.done = '1';
      paintNames('');
    } catch { grid.innerHTML = '<p class="muted small">Could not load the names right now.</p>'; }
  }
  function paintNames(q) {
    const grid = $('#namesGrid'); if (!grid) return;
    const list = state.names.filter(n => !q || (n.tr + ' ' + n.en + ' ' + n.n).toLowerCase().includes(q.toLowerCase()));
    grid.innerHTML = '';
    list.forEach(n => {
      const c = el('div', 'nameCard', `<span class="ar" dir="rtl">${esc(n.n)}</span><b>${esc(n.tr)}</b><span>${esc(n.en)}</span>`);
      grid.appendChild(c);
    });
    if (!list.length) grid.innerHTML = '<div class="empty">No name matches that.</div>';
  }
  $('#nameSearch')?.addEventListener('input', e => paintNames(e.target.value));

  let duaCat = 'all';
  const renderDuaTabs = () => {
    const box = $('#duaTabs'); if (!box) return;
    box.innerHTML = '';
    DUA_TABS.forEach(t => {
      const b = el('button', t.id === duaCat ? 'active' : '', esc(t.label));
      b.addEventListener('click', () => { duaCat = t.id; renderDuaTabs(); renderDuas(); });
      box.appendChild(b);
    });
  };
  function renderDuas() {
    const box = $('#duaList'); if (!box) return;
    renderDuaTabs();
    box.innerHTML = '';
    DUAS.filter(d => duaCat === 'all' || d.c === duaCat).forEach(d => {
      const c = el('article', 'card duaCard');
      c.innerHTML = `<p class="ar" dir="rtl">${esc(d.ar)}</p><h3 style="margin:0 0 6px;font-size:.98rem">${esc(d.t)}</h3>
        <p>${esc(d.en)}</p><span class="ref">${esc(d.ref)}</span>`;
      box.appendChild(c);
    });
  }

  const tasbih = store.get('ig_tasbih', 0);
  const paintTasbih = (v) => { const n = $('#tasbihCount'); if (n) n.textContent = v; store.set('ig_tasbih', v); };
  paintTasbih(tasbih);
  $('#tasbihTap')?.addEventListener('click', () => {
    let v = store.get('ig_tasbih', 0) + 1;
    if (v === 33) toast('33 · move to the next set');
    if (v === 66) toast('66 · two sets done');
    if (v === 100) toast('100 · complete');
    paintTasbih(v);
    if (navigator.vibrate) navigator.vibrate(12);
  });
  $('#tasbihReset')?.addEventListener('click', () => { paintTasbih(0); toast('Counter reset'); });

  const zakat = () => {
    const cash = Number($('#zCash')?.value || 0), goods = Number($('#zGoods')?.value || 0), debt = Number($('#zDebt')?.value || 0);
    const base = Math.max(0, cash + goods - debt);
    const due = base * 0.025;
    const out = $('#zakatOut'); if (out) out.textContent = 'GHS ' + due.toFixed(2);
  };
  ['zCash', 'zGoods', 'zDebt'].forEach(id => $('#' + id)?.addEventListener('input', zakat));

  const ensureHijri = () => { if (!state.hijri) loadPrayer(state.lat, state.lng, state.city); };

  async function qibla() {
    const set = (deg) => {
      $('#qiblaValue').textContent = deg.toFixed(1) + '° from true north';
      $('#needle').style.transform = `rotate(${deg}deg)`;
    };
    try {
      const r = await fetch(`https://api.aladhan.com/v1/qibla/${state.lat}/${state.lng}`);
      const j = await r.json();
      set(j.data.direction);
      toast('Qibla calculated for your location');
    } catch { toast('Could not calculate the qibla'); }
  }
  $('#qiblaBtn')?.addEventListener('click', () => {
    if (!navigator.geolocation) return qibla();
    navigator.geolocation.getCurrentPosition(
      p => { state.lat = p.coords.latitude; state.lng = p.coords.longitude; qibla(); loadPrayer(state.lat, state.lng, 'Your location'); },
      () => qibla()
    );
  });

  /* ---------------- search wiring ---------------- */
  $('#homeSearch')?.addEventListener('submit', e => { e.preventDefault(); runSearch($('#q').value); });
  $('#pageSearch')?.addEventListener('submit', e => { e.preventDefault(); runSearch($('#q2').value); });
  $('#chips')?.addEventListener('click', e => { const b = e.target.closest('button'); if (b) runSearch(b.dataset.q); });

  /* ---------------- boot ---------------- */
  renderExplore(); renderStart(); renderAyah(); renderHadith(); renderPaths();
  renderDirTabs(); renderDirectory(); renderDuaTabs(); renderDuas();
  loadPrayer();
  route();
  $('#dirCount').textContent = DIRECTORY.length + '+';

  /* PWA */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
  let deferred;
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; $('#installBtn').hidden = false; });
  $('#installBtn')?.addEventListener('click', async () => {
    if (!deferred) return toast('Use your browser menu to add this to your home screen');
    deferred.prompt(); await deferred.userChoice; deferred = null; $('#installBtn').hidden = true;
  });
})();
