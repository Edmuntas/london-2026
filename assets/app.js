/* London 2026 — trip app. Vanilla JS, data in ../data.js */
(function () {
  "use strict";

  /* ---------- i18n: UI strings (add `he` later + set dir="rtl") ---------- */
  const STRINGS = {
    ru: {
      tabPlan: "План", tabMap: "Карта", tabTrip: "Поездка", tabStay: "Жильё", tabXmas: "Ярмарки", tabMore: "Ещё",
      israel: "Израиль", london: "Лондон", toDepart: "До вылета", toReturn: "До обратного рейса",
      flyingHome: "Летим домой ✈️", tripOver: "Поездка завершена 🏠", day: "День", of: "из",
      d: "д", h: "ч", m: "мин", all: "Все дни", route: "Маршрут", citymapper: "Citymapper",
      onMap: "На карте", details: "Подробнее", site: "Сайт", inPlan: "В плане", approx: "Координаты — центр почтового индекса, ±50–100 м.",
      planTitle: "План по дням", draft: "черновик", today: "сегодня", showDayMap: "🗺 День на карте",
      flights: "Перелёт", luton: "Дорога из/в Luton", docs: "Документы", checklists: "Чек-листы", weather: "Погода",
      places: "Все места", xmas: "Рождество 17–21.11", shop: "5.11 / UF Pro", reels: "Ролики Эммы", kids: "Дети",
      smoking: "Курение", questions: "Вопросы", dep: "Вылет", arr: "Прилёт", inAir: "в пути",
      timeIL: "изр.", timeUK: "Лонд.", reset: "Сбросить", resetQ: "Снять все галочки в этом списке?",
      install: "📲 Установить на экран", iosHint: "iPhone: «Поделиться» → «На экран «Домой»»",
      offlineReady: "Готово к работе офлайн ✓", offline: "Нет сети — показываю сохранённое",
      noGeo: "Геолокация недоступна", stayEmpty: "Список отелей пока пуст — данные будут добавлены позже.",
      onlyBalcony: "🚬 Только с балконом", sortPrice: "Цена ↑", sortRating: "Рейтинг ↓",
      main3: "17→20.11", lastNight: "Последняя ночь 20→21", total: "итого", perNight: "/ночь",
      nights: "ноч.", room: "Номер", breakfast: "Завтрак", cancel: "Отмена", tube: "Метро",
      balconyYes: "Балкон есть", balconyNo: "Балкона нет", smokingRule: "Курение", reviews: "отзывов",
      pros: "Плюсы", cons: "Минусы", smokingEmpty: "Раздел будет заполнен из проверенных официальных источников.",
      source: "источник",
      forecastTitle: "Прогноз (Open-Meteo)",
      forecastTrip: "Прогноз на даты поездки 17–21.11.2026",
      forecastNear: "Даты поездки ещё вне 16-дневного горизонта. Ниже — ближайшие дни; прогноз на 17–21.11 появится примерно с 1–2.11.",
      forecastCached: "Нет сети — показан последний сохранённый прогноз",
      forecastFail: "Прогноз сейчас недоступен (офлайн и нет сохранённых данных).",
      forecastUpdated: "обновлено",
      precipProb: "осадки",
      kidsNote: "Заполняется на этом устройстве (сохраняется только в браузере, на сайт не публикуется).",
      reelsNote: "Ссылки из чата, как есть (не проверялись).", footCheck: "Всё с пометкой «проверить» не подтверждено официальным источником.",
      checkWord: "проверить", lastNightTag: "последняя ночь", stayCrit: "Для Эдмонта ключевой критерий — балкон, где разрешено курить."
    }
  };
  const LANG = "ru";
  /* Рождественские ярмарки (xmas-data.js + assets/xmas.js): категория на главной карте */
  const XM = window.XmasMarkets || null;
  if (XM) CATEGORIES.markets = { label: "Ярмарки", icon: "🎪", color: "#c8102e" };
  const t = (k) => (STRINGS[LANG] && STRINGS[LANG][k]) || STRINGS.ru[k] || k;

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rich = (s) => String(s || "").replace(/\[\[(.+?)\]\]/g, '<span class="check">$1</span>');
  const safeUrl = (u) => (/^https?:\/\//i.test(u || "") ? u : "");
  const TZ = { IL: "Asia/Jerusalem", UK: "Europe/London" };
  const fmt = (iso, tz, opt) => new Intl.DateTimeFormat("ru-RU", Object.assign({ timeZone: tz }, opt || { hour: "2-digit", minute: "2-digit", hour12: false })).format(new Date(iso));
  const tzLabel = (tz) => (tz === TZ.IL ? t("timeIL") : t("timeUK"));
  const ymd = (d, tz) => new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
  const placeById = Object.fromEntries(PLACES.map((p) => [p.id, p]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem("ldn26." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("ldn26." + k, JSON.stringify(v)); } catch (e) {} }
  };
  const isDesktop = () => window.matchMedia("(min-width:900px)").matches;
  const gmaps = (lat, lng) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=transit`;
  const cmapper = (lat, lng, name) => `https://citymapper.com/directions?endcoord=${lat},${lng}&endname=${encodeURIComponent(name)}`;
  function toast(msg) { const el = $("#toast"); el.textContent = msg; el.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => (el.hidden = true), 2600); }
  function navBtns(p, opts) {
    opts = opts || {};
    let h = `<div class="btns"><a class="btn primary" href="${gmaps(p.lat, p.lng)}" target="_blank" rel="noopener">🧭 ${t("route")}</a>`;
    h += `<a class="btn" href="${cmapper(p.lat, p.lng, p.name)}" target="_blank" rel="noopener">🚇 ${t("citymapper")}</a>`;
    if (!opts.noMap) h += `<button class="btn" type="button" data-focus="${esc(p.id)}">📍 ${t("onMap")}</button>`;
    if (opts.more) h += `<button class="btn ghost" type="button" data-open="${esc(p.id)}">${t("details")}</button>`;
    return h + "</div>";
  }

  /* ---------- tabs / routing ---------- */
  const TABS = [
    { id: "plan", i: "🗓", k: "tabPlan" }, { id: "map", i: "🗺", k: "tabMap" }, { id: "trip", i: "✈️", k: "tabTrip" },
    { id: "stay", i: "🏨", k: "tabStay" }, { id: "xmas", i: "🎄", k: "tabXmas" }, { id: "more", i: "☰", k: "tabMore" }
  ];
  let current = "plan";
  function renderTabs() {
    $("#tabs").innerHTML = TABS.map((x) => `<button class="tab" role="tab" data-tab="${x.id}" aria-selected="false"><span class="i">${x.i}</span><span>${t(x.k)}</span></button>`).join("");
    $("#tabs").addEventListener("click", (e) => { const b = e.target.closest(".tab"); if (b) go(b.dataset.tab); });
  }
  function go(tab, anchor) {
    if (tab === "map" && isDesktop()) tab = current === "map" ? "plan" : current;
    current = tab;
    document.querySelectorAll(".tab").forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === tab));
    document.querySelectorAll(".pane").forEach((p) => p.classList.toggle("on", p.id === "pane-" + tab));
    document.body.classList.toggle("tab-map", tab === "map");
    const h = "#" + tab + (anchor ? "/" + anchor : "");
    if (location.hash !== h) history.replaceState(null, "", h);
    if (tab === "xmas") mountXmas();
    if (tab === "map") { if (!map) initMap(); else setTimeout(() => { map.invalidateSize(); if (needFit) applyFilters(true); }, 30); }
    if (anchor) setTimeout(() => { const el = document.getElementById(anchor); if (el) scrollToEl(el); }, 30);
    else if (!isDesktop()) window.scrollTo(0, 0); else $("#side").scrollTop = 0;
  }
  function scrollToEl(el) {
    const off = (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--subtop")) || 60) + 50;
    if (isDesktop()) { const side = $("#side"); side.scrollTo({ top: el.offsetTop - off + 0, behavior: "smooth" }); }
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off, behavior: "smooth" });
  }
  function subnav(items) {
    return `<div class="subnav"><div class="chips">${items.map((x) => `<button class="chip" type="button" data-jump="${x[0]}">${x[1]}</button>`).join("")}</div></div>`;
  }
  function layoutVars() {
    const top = $(".top").offsetHeight;
    const r = document.documentElement.style;
    r.setProperty("--toph", top + "px");
    r.setProperty("--subtop", (isDesktop() ? top + $("#tabs").offsetHeight : top) + "px");
  }

  /* ---------- header: clocks + countdown ---------- */
  function renderHeader() {
    $("#t-title").textContent = TRIP.title;
    $("#t-sub").textContent = TRIP.travellers;
    document.title = "Лондон · 17–21.11.2026 · Эдмонт и Эмма";
  }
  function countdownState(now) {
    const dep = Date.parse(TRIP.departUTC), ret = Date.parse(TRIP.returnDepartUTC), home = Date.parse(TRIP.homeUTC);
    if (now < dep) return { label: t("toDepart"), target: dep };
    if (now < ret) {
      const idx = DAYS.findIndex((d) => d.id === ymd(new Date(now), TZ.UK));
      return { label: t("toReturn") + (idx >= 0 ? ` · ${t("day")} ${idx + 1} ${t("of")} ${DAYS.length}` : ""), target: ret };
    }
    if (now < home) return { label: t("flyingHome"), target: null };
    return { label: t("tripOver"), target: null };
  }
  function dur(ms, withSec) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return (d ? `${d} ${t("d")} ` : "") + `${pad(h)}:${pad(m)}` + (withSec ? `:${pad(sec)}` : "");
  }
  function tick() {
    const now = Date.now();
    const c = (tz, name) => `<div class="clock"><div class="z">${name}</div><div class="t">${fmt(now, tz)}</div></div>`;
    $("#clocks").innerHTML = c(TZ.IL, "🇮🇱 " + t("israel")) + c(TZ.UK, "🇬🇧 " + t("london"));
    const st = countdownState(now);
    const val = st.target ? dur(st.target - now, true) : "";
    $("#countdown").innerHTML = `<span class="cd-l">${st.label}</span><span class="cd-v">${val}</span>`;
    const big = $("#cdBig"); if (big) { big.textContent = val || st.label; $("#cdLabel").textContent = st.target ? st.label : ""; }
  }

  /* ---------- PLAN ---------- */
  let selectedDay = null;
  function renderPlan() {
    const todayId = ymd(new Date(), TZ.UK);
    const stayTxt = HOTELS.length ? `${HOTELS.length} вариант(ов)` : "не забронировано (TBD)";
    let h = `<div class="card hero">
      <div class="small" id="cdLabel"></div><div class="cd-big" id="cdBig"></div>
      <div class="hero-grid" style="margin-top:10px">
        <div><b>${esc(TRIP.dates)}</b>${esc(TRIP.nightsNote)}</div>
        <div><b>Wizz Air</b>Confirmed ✅</div>
        <div><b>Жильё</b>${esc(stayTxt)}</div>
        <div><b>ETA UK</b>нужно оформить, £20/чел.</div>
      </div></div>`;
    h += `<div class="subnav"><div class="chips" id="planDays">` +
      DAYS.map((d) => `<button class="chip" type="button" data-day="${d.id}" aria-pressed="false">${esc(d.short)}${d.id === todayId ? " •" : ""}</button>`).join("") + `</div></div>`;
    DAYS.forEach((d) => {
      h += `<article class="card day" id="day-${d.id}">
        <div class="dayhead"><h2 class="daytitle">${esc(d.short)} · ${esc(d.title)}</h2>
        <span class="daydate${d.id === todayId ? " today" : ""}">${d.id === todayId ? t("today") : d.id.slice(8) + ".11"}</span></div>
        <div class="area">${esc(d.area)}</div><ol class="timeline">`;
      d.items.forEach((it, i) => {
        const tap = (it.places && it.places.length) || it.flight != null;
        const tzs = it.tz === "IL" ? `<small>${t("timeIL")}</small>` : "";
        h += `<li class="ti${tap ? " tap" : ""}${it.optional ? " opt" : ""}" data-d="${d.id}" data-i="${i}">
          <div class="when">${esc(it.time || it.label || "")}${it.time ? tzs : ""}</div>
          <div class="body">${it.time && it.label ? `<b>${esc(it.label)}:</b> ` : ""}${rich(it.text)}`;
        if (it.places && it.places.length) h += `<div class="pl">` + it.places.map((id) => { const p = placeById[id]; return p ? `<span class="pchip" data-open="${id}">${CATEGORIES[p.cat].icon} ${esc(p.name)}</span>` : ""; }).join("") + `</div>`;
        h += `</div></li>`;
      });
      h += `</ol><div class="btns"><button class="btn" type="button" data-daymap="${d.id}">${t("showDayMap")}</button></div></article>`;
    });
    const pane = $("#pane-plan"); pane.innerHTML = h;
    pane.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-day]");
      if (chip) { selectDay(chip.dataset.day, true); return; }
      const dm = e.target.closest("[data-daymap]");
      if (dm) { setDayFilter(dm.dataset.daymap); if (!isDesktop()) go("map"); return; }
      if (e.target.closest("[data-open],[data-focus],a")) return;
      const li = e.target.closest(".ti.tap");
      if (li) {
        const it = DAYS.find((x) => x.id === li.dataset.d).items[+li.dataset.i];
        if (it.flight != null) openFlight(it.flight); else openPlaces(it.places, it.text);
      }
    });
    if (DAYS.some((d) => d.id === todayId)) selectedDay = todayId;
  }
  function selectDay(id, scroll) {
    selectedDay = id;
    document.querySelectorAll("#planDays .chip").forEach((c) => c.setAttribute("aria-pressed", c.dataset.day === id));
    if (scroll) scrollToEl(document.getElementById("day-" + id));
    setDayFilter(id, true);
  }

  /* ---------- SHEET ---------- */
  function openSheet(html) {
    $("#sheetBody").innerHTML = html;
    $("#sheet").hidden = false; $("#sheetBackdrop").hidden = false;
    $("#sheet").scrollTop = 0;
  }
  function closeSheet() { $("#sheet").hidden = true; $("#sheetBackdrop").hidden = true; }
  function placeHtml(p, compact) {
    const cat = CATEGORIES[p.cat];
    let h = `<div class="small" style="color:${cat.color};font-weight:700">${cat.icon} ${cat.label}</div><h2 style="margin:2px 0 4px">${esc(p.name)}</h2>`;
    if (p.addr) h += `<div>${esc(p.addr)}</div>`;
    if (p.note) h += `<p class="small" style="color:var(--ink)">${rich(p.note)}</p>`;
    if (p.links && p.links.length) h += `<p class="small">${p.links.map((l) => `<a href="${esc(l.u)}" target="_blank" rel="noopener">${esc(l.t)}</a>`).join(" · ")}</p>`;
    if (!compact && p.days && p.days.length) h += `<p class="small">${t("inPlan")}: ${p.days.map((id) => { const d = DAYS.find((x) => x.id === id); return d ? `${esc(d.short)} · ${esc(d.title)}` : id; }).join("; ")}</p>`;
    if (p.approx) h += `<p class="small">${t("approx")}</p>`;
    return h + navBtns(p);
  }
  function openPlace(id) { const p = placeById[id] || hotelPlace(id); if (p) openSheet(placeHtml(p)); }
  function openPlaces(ids, text) {
    if (ids.length === 1) return openPlace(ids[0]);
    openSheet(`<p>${rich(text)}</p>` + ids.map((id) => placeById[id] ? `<div class="card" style="margin:10px 0">${placeHtml(placeById[id], true)}</div>` : "").join(""));
  }
  function openFlight(i) { openSheet(flightHtml(FLIGHTS[i])); }

  /* ---------- TRIP (flights, Luton, docs, checklists, weather) ---------- */
  function flightHtml(f) {
    const other = (tz) => (tz === TZ.IL ? TZ.UK : TZ.IL);
    const mins = (Date.parse(f.arrUTC) - Date.parse(f.depUTC)) / 60000;
    const d = fmt(f.depUTC, f.depTz, { weekday: "short", day: "numeric", month: "long" });
    return `<div class="flight"><span class="num">${esc(f.no)}</span>
      <div class="meta">${esc(f.dir)} · ${esc(d)} · ${esc(f.airline)}</div>
      <div class="route">
        <div><div class="ap">${esc(f.from)}</div><div class="tm">${fmt(f.depUTC, f.depTz)} <small class="alt">${tzLabel(f.depTz)}</small></div>
          <div class="alt">= ${fmt(f.depUTC, other(f.depTz))} ${tzLabel(other(f.depTz))}</div></div>
        <div class="plane">✈︎<div class="alt">${Math.floor(mins / 60)} ${t("h")} ${String(mins % 60).padStart(2, "0")}</div></div>
        <div class="end"><div class="ap">${esc(f.to)}</div><div class="tm">${fmt(f.arrUTC, f.arrTz)} <small class="alt">${tzLabel(f.arrTz)}</small></div>
          <div class="alt">= ${fmt(f.arrUTC, other(f.arrTz))} ${tzLabel(other(f.arrTz))}</div></div>
      </div>
      <div class="meta">${esc(f.fromName)} (время ${f.depTz === TZ.IL ? "Израиля" : "Лондона"}) → ${esc(f.toName)} (время ${f.arrTz === TZ.IL ? "Израиля" : "Лондона"})</div></div>`;
  }
  function renderTrip() {
    let h = subnav([["s-flights", "✈️ " + t("flights")], ["s-luton", "🚆 Luton"], ["s-docs", "📄 " + t("docs")], ["s-check", "✅ " + t("checklists")], ["s-weather", "🌧 " + t("weather")]]);
    h += `<div class="card" id="s-flights"><h2>✈️ ${t("flights")}</h2><p>Wizz Air <span class="tag">Confirmed</span></p>` + FLIGHTS.map(flightHtml).join("");
    h += `<h3>Багаж</h3><table><tr><th>Пассажир</th><th>Что включено</th></tr>${BAGGAGE.map((b) => `<tr><td>${esc(b.who)}</td><td>${rich(b.what)}</td></tr>`).join("")}</table>`;
    h += FLIGHT_NOTES.map((n) => `<p>${rich(n)}</p>`).join("") + `<div class="warn">${rich(FLIGHT_WARN)}</div></div>`;

    const lu = placeById.luton;
    h += `<div class="card" id="s-luton"><h2>🚆 ${t("luton")}</h2>
      <div class="warn">${rich(LUTON_DEPARTURE.warn)}</div>
      <div class="good">${rich(LUTON_DEPARTURE.good)}</div>
      <table class="stack-table"><thead><tr><th>Вариант</th><th>Время</th><th>Цена / заметки</th></tr></thead>
      ${LUTON_OPTIONS.map((o) => `<tr><td>${rich(o.name)}</td><td data-h="⏱">${rich(o.time)}</td><td>${rich(o.note)}</td></tr>`).join("")}</table>
      <p class="small">${rich(LUTON_SOURCES)}</p>
      <h3>Прилёт Вт 17.11 (18:45)</h3><p>${rich(LUTON_ARRIVAL)}</p>
      <h3>Вылет Сб 21.11 (07:25) — что реально успевает</h3><ul>${LUTON_DEPARTURE.options.map((o) => `<li>${rich(o)}</li>`).join("")}</ul>
      ${navBtns(lu)}</div>`;

    h += `<div class="card" id="s-docs"><h2>📄 ${t("docs")}</h2><div class="warn">${rich(DOCS_WARN)}</div>
      <p class="small">Отметки — в чек-листе «Документы» ниже.</p></div>`;
    h += `<div id="s-check">` + CHECKLISTS.map(checklistHtml).join("") + `</div>`;
    h += `<div class="card" id="s-weather"><h2>🌧 ${t("weather")}</h2><p>${rich(WEATHER)}</p>
      <h3>${t("forecastTitle")}</h3>
      <div id="wxForecast" class="wx-box"><p class="small">…</p></div>
      <p class="small"><a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a> · London 51.5074, −0.1278 · Europe/London</p></div>`;
    const pane = $("#pane-trip"); pane.innerHTML = h;
    pane.addEventListener("change", onCheck);
    pane.addEventListener("click", onReset);
    CHECKLISTS.forEach((c) => updateProgress(c.id));
    loadForecast();
  }

  /* ---------- weather forecast (Open-Meteo, no key) ---------- */
  const WX_TRIP = ["2026-11-17", "2026-11-18", "2026-11-19", "2026-11-20", "2026-11-21"];
  const WX_URL = "https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=Europe%2FLondon&forecast_days=16";
  function wxLabel(code) {
    const c = Number(code);
    if (c === 0) return ["☀️", "ясно"];
    if (c <= 3) return ["🌤", "переменная облачность"];
    if (c === 45 || c === 48) return ["🌫", "туман"];
    if (c >= 51 && c <= 57) return ["🌦", "морось"];
    if (c >= 61 && c <= 67) return ["🌧", "дождь"];
    if (c >= 71 && c <= 77) return ["❄️", "снег"];
    if (c >= 80 && c <= 82) return ["🌧", "ливни"];
    if (c >= 85 && c <= 86) return ["❄️", "снегопад"];
    if (c >= 95) return ["⛈", "гроза"];
    return ["🌡", "—"];
  }
  function wxDayName(ymdStr) {
    try {
      return new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/London", weekday: "short", day: "numeric", month: "short" }).format(new Date(ymdStr + "T12:00:00Z"));
    } catch (e) { return ymdStr; }
  }
  function renderForecast(data, meta) {
    const box = $("#wxForecast"); if (!box || !data || !data.daily) return;
    const d = data.daily;
    const times = d.time || [];
    const tripIdx = times.map((x, i) => (WX_TRIP.includes(x) ? i : -1)).filter((i) => i >= 0);
    const useTrip = tripIdx.length > 0;
    const idxs = useTrip ? tripIdx : times.map((_, i) => i).slice(0, 7);
    let note = useTrip ? t("forecastTrip") : t("forecastNear");
    if (meta && meta.cached) note += " · " + t("forecastCached");
    if (meta && meta.at) note += ` · ${t("forecastUpdated")} ${esc(meta.at)}`;
    let h = `<p class="small">${esc(note)}</p><div class="wx-grid">`;
    idxs.forEach((i) => {
      const [ico, lab] = wxLabel(d.weathercode[i]);
      const hi = d.temperature_2m_max[i], lo = d.temperature_2m_min[i], pp = d.precipitation_probability_max[i];
      const trip = WX_TRIP.includes(times[i]) ? " trip" : "";
      h += `<div class="wx-day${trip}"><div class="wx-date">${esc(wxDayName(times[i]))}</div>
        <div class="wx-ico">${ico}</div><div class="wx-lab">${esc(lab)}</div>
        <div class="wx-temp"><b>${hi != null ? Math.round(hi) : "?"}°</b> / ${lo != null ? Math.round(lo) : "?"}°</div>
        <div class="wx-pp">${t("precipProb")} ${pp != null ? pp : "?"}%</div></div>`;
    });
    box.innerHTML = h + "</div>";
  }
  async function loadForecast() {
    const box = $("#wxForecast"); if (!box) return;
    const cached = store.get("wx.forecast", null);
    const paintCached = () => {
      if (cached && cached.data) renderForecast(cached.data, { cached: true, at: cached.at || "" });
      else box.innerHTML = `<p class="small">${esc(t("forecastFail"))}</p>`;
    };
    try {
      const res = await fetch(WX_URL);
      if (!res.ok) throw new Error("http " + res.status);
      const data = await res.json();
      if (!data.daily || !data.daily.time) throw new Error("bad payload");
      const at = new Intl.DateTimeFormat("ru-RU", { timeZone: "Asia/Jerusalem", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
      store.set("wx.forecast", { data, at });
      renderForecast(data, { cached: false, at });
    } catch (e) {
      paintCached();
    }
  }
  function checklistHtml(c) {
    const st = store.get("cl." + c.id, {});
    return `<div class="card" data-cl="${c.id}"><h2>${esc(c.title)}</h2>
      <div class="small"><span class="pg-t"></span></div><div class="progress"><i></i></div>
      <ul class="cl">${c.items.map((it) => `<li><label><input type="checkbox" data-cl="${c.id}" data-id="${it.id}"${st[it.id] ? " checked" : ""}><span>${rich(it.text)}</span></label></li>`).join("")}</ul>
      <div class="btns"><button class="btn ghost" type="button" data-reset="${c.id}">↺ ${t("reset")}</button></div></div>`;
  }
  function onCheck(e) {
    const cb = e.target.closest("input[type=checkbox][data-cl]"); if (!cb) return;
    const st = store.get("cl." + cb.dataset.cl, {}); st[cb.dataset.id] = cb.checked; store.set("cl." + cb.dataset.cl, st);
    updateProgress(cb.dataset.cl);
  }
  function onReset(e) {
    const b = e.target.closest("[data-reset]"); if (!b) return;
    if (!confirm(t("resetQ"))) return;
    store.set("cl." + b.dataset.reset, {});
    document.querySelectorAll(`input[data-cl="${b.dataset.reset}"]`).forEach((i) => (i.checked = false));
    updateProgress(b.dataset.reset);
  }
  function updateProgress(id) {
    const box = document.querySelector(`.card[data-cl="${id}"]`); if (!box) return;
    const all = box.querySelectorAll("input"), done = box.querySelectorAll("input:checked").length;
    box.querySelector(".pg-t").textContent = `${done} / ${all.length}`;
    box.querySelector(".progress i").style.width = (all.length ? (100 * done) / all.length : 0) + "%";
  }

  /* ---------- STAY ---------- */
  const stayState = { group: "all", balcony: false, sort: "price" };
  function hotelPlace(id) {
    const m = /^hotel-(\d+)$/.exec(id || ""); if (!m) return null;
    const x = HOTELS[+m[1]]; if (!x) return null;
    return { id, cat: "stay", name: x.name, lat: x.lat, lng: x.lng, addr: [x.area, x.tube].filter(Boolean).join(" · "),
      note: esc([x.totalGBP != null ? `£${x.totalGBP} ${t("total")}` : "", x.smokingRule ? `🚬 ${x.smokingRule}` : "", x.balcony ? t("balconyYes") : ""].filter(Boolean).join(" · ")),
      links: safeUrl(x.url) ? [{ t: t("site"), u: x.url }] : [], days: x.lastNight ? ["2026-11-20"] : ["2026-11-17", "2026-11-18", "2026-11-19"] };
  }
  function hotelCard(x, i) {
    const per = x.totalGBP && x.nights ? Math.round(x.totalGBP / x.nights) : null;
    const bal = x.balcony === true ? "yes" : x.balcony === false ? "no" : "";
    const fact = (k, v) => (v != null && v !== "" ? `<div><span>${t(k)}</span>${esc(v)}</div>` : "");
    const hasGeo = typeof x.lat === "number" && typeof x.lng === "number";
    let h = `<article class="hotel"><div class="ph" data-photo="${esc(safeUrl(x.photo) || (x.photo && !/^\w+:/.test(x.photo) ? x.photo : ""))}">
      ${x.tier ? `<span class="tier">${esc(x.tier)}${x.lastNight ? " · " + t("lastNightTag") : ""}</span>` : x.lastNight ? `<span class="tier">${t("lastNightTag")}</span>` : ""}
      ${x.totalGBP != null ? `<span class="price">£${esc(x.totalGBP)}<small>${t("total")} · ${esc(x.nights || "?")} ${t("nights")}${per ? ` · £${per}${t("perNight")}` : ""}</small></span>` : ""}</div>
      <div class="hb"><h3>${esc(x.name)}</h3><div class="small">${esc(x.area || "")}${x.rating != null ? ` · ★ ${esc(x.rating)}` : ""}${x.reviews != null ? ` (${esc(x.reviews)} ${t("reviews")})` : ""}</div>
      <div class="smoke ${bal}">${bal === "yes" ? "✅ " + t("balconyYes") : bal === "no" ? "❌ " + t("balconyNo") : "❓ балкон — ?"}<br>🚬 ${t("smokingRule")}: ${esc(x.smokingRule || "?")}</div>
      <div class="facts">${fact("room", x.room)}${fact("breakfast", x.breakfast)}${fact("cancel", x.cancellation)}${fact("tube", x.tube)}</div>`;
    if ((x.pros && x.pros.length) || (x.cons && x.cons.length))
      h += `<div class="pc"><div class="pro"><b>${t("pros")}</b><ul>${(x.pros || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div><div class="con"><b>${t("cons")}</b><ul>${(x.cons || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div></div>`;
    h += `<div class="btns">${safeUrl(x.url) ? `<a class="btn primary" href="${esc(x.url)}" target="_blank" rel="noopener">🔗 ${t("site")}</a>` : ""}`;
    if (hasGeo) h += `<button class="btn" type="button" data-focus="hotel-${i}">📍 ${t("onMap")}</button><a class="btn" href="${gmaps(x.lat, x.lng)}" target="_blank" rel="noopener">🧭 ${t("route")}</a>`;
    return h + `</div></div></article>`;
  }
  function renderStayList() {
    let list = HOTELS.map((x, i) => ({ x, i }));
    if (stayState.group === "main") list = list.filter((o) => !o.x.lastNight);
    if (stayState.group === "last") list = list.filter((o) => o.x.lastNight);
    if (stayState.balcony) list = list.filter((o) => o.x.balcony === true);
    list.sort(stayState.sort === "price" ? (a, b) => (a.x.totalGBP ?? 1e9) - (b.x.totalGBP ?? 1e9) : (a, b) => (b.x.rating ?? -1) - (a.x.rating ?? -1));
    const box = $("#hotelList");
    box.innerHTML = HOTELS.length ? (list.length ? list.map((o) => hotelCard(o.x, o.i)).join("") : `<p class="small">—</p>`) : `<div class="tbd"><b>TBD.</b> ${t("stayEmpty")}</div>`;
    box.querySelectorAll(".ph[data-photo]").forEach((el) => { const u = el.dataset.photo; if (u) el.style.backgroundImage = `url("${u.replace(/"/g, "%22")}")`; });
  }
  function renderStay() {
    const chip = (attr, val, label, on) => `<button class="chip" type="button" ${attr}="${val}" aria-pressed="${on}">${label}</button>`;
    let h = `<div class="card"><h2>🏨 Жильё</h2><div class="tbd"><b>TBD — не забронировано.</b><br>${STAY_ADVICE.slots.map(esc).join("<br>")}</div>
      <p class="small">${t("stayCrit")} <a href="#more/s-smoking" data-goto="more/s-smoking">🚬 ${t("smoking")}</a></p>
      <div class="toolbar chips">${chip("data-grp", "all", "Все", true)}${chip("data-grp", "main", t("main3"), false)}${chip("data-grp", "last", t("lastNight"), false)}</div>
      <div class="toolbar chips">${chip("data-bal", "1", t("onlyBalcony"), false)}${chip("data-sort", "price", t("sortPrice"), true)}${chip("data-sort", "rating", t("sortRating"), false)}</div>
      <div class="hotels" id="hotelList"></div></div>
      <div class="card"><h2>Рекомендация по району (17–20.11)</h2><ul>${STAY_ADVICE.areas.map((a) => `<li>${rich(a)}</li>`).join("")}</ul>
      <h3>Последняя ночь (20→21.11)</h3><p>${rich(STAY_ADVICE.lastNight)}</p></div>`;
    const pane = $("#pane-stay"); pane.innerHTML = h;
    pane.addEventListener("click", (e) => {
      const g = e.target.closest("[data-grp]"), b = e.target.closest("[data-bal]"), s = e.target.closest("[data-sort]");
      if (g) { stayState.group = g.dataset.grp; pane.querySelectorAll("[data-grp]").forEach((c) => c.setAttribute("aria-pressed", c === g)); }
      else if (b) { stayState.balcony = !stayState.balcony; b.setAttribute("aria-pressed", stayState.balcony); }
      else if (s) { stayState.sort = s.dataset.sort; pane.querySelectorAll("[data-sort]").forEach((c) => c.setAttribute("aria-pressed", c === s)); }
      else return;
      renderStayList();
    });
    renderStayList();
  }

  /* ---------- РОЖДЕСТВЕНСКИЕ ЯРМАРКИ (отдельная вкладка) ---------- */
  let xmasView = null;
  function mountXmas() {
    const root = $("#xmas-root");
    if (!XM || !root || !window.L) { if (root && !root.innerHTML) root.innerHTML = `<div class="card">Раздел не загрузился.</div>`; return; }
    if (!xmasView) xmasView = XM.mount(root);
    else setTimeout(() => xmasView.refresh(), 30);
  }

  /* ---------- MORE ---------- */
  function reelSrc(u) {
    if (/tiktok/.test(u)) return ["TikTok", "#111"];
    if (/facebook/.test(u)) return ["Facebook", "#1877f2"];
    if (/instagram/.test(u)) return ["Instagram", "#d62976"];
    return ["Web", "#777"];
  }
  function renderMore() {
    let h = subnav([["s-places", "📍 " + t("places")], ["s-areas", "🏘 Районы"], ["s-xmas", "🎄 " + t("xmas")], ["xm-go", "🎪 Ярмарки"], ["s-shop", "🎒 " + t("shop")], ["s-reels", "📱 " + t("reels")], ["s-kids", "👧 " + t("kids")], ["s-smoking", "🚬 " + t("smoking")], ["s-q", "❓ " + t("questions")]]);
    h += `<div class="card" id="s-places"><h2>📍 ${t("places")}</h2>`;
    Object.keys(CATEGORIES).forEach((c) => {
      const ps = PLACES.filter((p) => p.cat === c); if (!ps.length) return;
      h += `<h3>${CATEGORIES[c].icon} ${CATEGORIES[c].label}</h3>` + ps.map((p) => `<div class="place" data-open="${p.id}"><span class="ic" style="background:${CATEGORIES[c].color}">${CATEGORIES[c].icon}</span><div><b>${esc(p.name)}</b><div class="small">${esc(p.addr || "")}${p.addr ? " · " : ""}${rich(p.note || "")}</div></div></div>`).join("");
    });
    h += `<p class="small">Координаты: OpenStreetMap Nominatim; для Yuen Kee, Swiss Butter и Burnt — центр почтового индекса (postcodes.io), точность ±50–100 м.</p></div>`;

    if (typeof AREAS !== "undefined" && AREAS.length) h += `<div class="card" id="s-areas"><h2>🏘 Районы</h2>
      <ul class="areas-list">${AREAS.map((a) => `<li><span class="sw" style="background:${a.color}"></span>${esc(a.label)}</li>`).join("")}</ul>
      <p class="small">${esc(AREAS_NOTE)}. Контуры приблизительные.</p>
      <div class="btns"><button class="btn primary" type="button" data-areas="on">🗺 Показать на карте</button></div></div>`;

    h += `<div class="card" id="s-xmas"><h2>🎄 Рождественский Лондон: что работает 17–21.11</h2>
      <table><tr><th>Что</th><th>С какого числа</th><th>17–21.11?</th></tr>${XMAS.map((r) => `<tr><td>${rich(r[0])}</td><td>${rich(r[1])}</td><td>${rich(r[2])}</td></tr>`).join("")}</table>
      <p class="small">${rich(XMAS_SOURCES)}</p><p>${rich(XMAS_ROUTE)}</p>
      <div class="btns"><button class="btn" type="button" data-route="xmas">🗺 Маршрут огней на карте</button><a class="btn primary" href="#xmas" data-goto="xmas">🎪 Все ярмарки и катки</a></div></div>`;

    h += `<div class="card" id="s-shop"><h2>🎒 Шопинг 5.11 / UF Pro (для Эдмонта)</h2><p>${rich(SHOP.intro)}</p>
      <div class="place" style="cursor:default;display:block">${rich(SHOP.silvermans)}${navBtns(placeById.silvermans)}</div>
      <div class="place" style="cursor:default;display:block">${rich(SHOP.tactreeTitle)}
      <table><tr><th>Товар</th><th>Цвет</th><th>Цена (${esc(SHOP.priceDate)})</th></tr>${SHOP.tactree.map((x) => `<tr><td><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.item)}</a></td><td>${esc(x.color)}</td><td><b>${esc(x.price)}</b></td></tr>`).join("")}</table>
      <span class="small">${rich(SHOP.tactreeNote)}</span></div>
      ${SHOP.more.map((m) => `<div class="place" style="cursor:default;display:block">${rich(m)}</div>`).join("")}
      <div class="warn">${rich(SHOP.warn)}</div></div>`;

    h += `<div class="card" id="s-reels"><h2>📱 ${t("reels")}</h2><p class="small">${t("reelsNote")}</p><div class="reels">` +
      REELS.map((u) => { const s = reelSrc(u); return `<a href="${esc(u)}" target="_blank" rel="noopener"><span class="src" style="background:${s[1]}">${s[0]}</span><span>${esc(u.replace(/^https?:\/\//, ""))}</span></a>`; }).join("") + `</div></div>`;

    h += `<div class="card" id="s-kids"><h2>👧 Дети (дома)</h2><div class="tbd"><b>TBD — договорённости неизвестны.</b>` +
      KIDS.map((k) => `<label class="field"><span>${esc(k.label)}</span><input type="text" data-kid="${esc(k.key)}" placeholder="____________" value="${esc(store.get("kids." + k.key, k.value || ""))}"></label>`).join("") +
      `</div><p class="small">${t("kidsNote")}</p></div>`;

    h += `<div class="card" id="s-smoking"><h2>🚬 ${t("smoking")}</h2>`;
    if (!SMOKING.length) h += `<div class="tbd"><b>TBD.</b> ${t("smokingEmpty")}</div>`;
    else SMOKING.forEach((s) => {
      h += `<h3>${esc(s.title)}</h3><ul>${(s.items || []).map((it) => `<li>${esc(it.text)}${safeUrl(it.sourceUrl) ? ` <a class="small" href="${esc(it.sourceUrl)}" target="_blank" rel="noopener">[${t("source")}]</a>` : ""}</li>`).join("")}</ul>`;
    });
    h += `</div>`;

    h += `<div class="card" id="s-q"><h2>❓ Открытые вопросы</h2><ul>${QUESTIONS.map((q) => `<li>${rich(q)}</li>`).join("")}</ul></div>`;
    const pane = $("#pane-more"); pane.innerHTML = h;
    pane.addEventListener("input", (e) => { const i = e.target.closest("[data-kid]"); if (i) store.set("kids." + i.dataset.kid, i.value); });
    pane.addEventListener("click", (e) => {
      const r = e.target.closest("[data-route]");
      if (r) showRoute(XMAS_ROUTE_PLACES);
      if (e.target.closest("[data-areas]")) showAreas();
    });
  }

  /* ---------- MAP ---------- */
  let map = null, markers = [], routeLine = null, meMarker = null, needFit = false, fitted = false;
  let areasLayer = null, areasLegend = null, areasOn = false;
  const HAS_AREAS = typeof AREAS !== "undefined" && AREAS.length > 0;
  /* Chaikin smoothing for closed polygons */
  function smooth(pts, n) {
    for (let k = 0; k < n; k++) {
      const out = [];
      pts.forEach((p, i) => { const q = pts[(i + 1) % pts.length];
        out.push([0.75 * p[0] + 0.25 * q[0], 0.75 * p[1] + 0.25 * q[1]], [0.25 * p[0] + 0.75 * q[0], 0.25 * p[1] + 0.75 * q[1]]); });
      pts = out;
    }
    return pts;
  }
  function areaPopup(a) {
    return `<b style="color:${a.color === "#d4b000" ? "#8a7300" : a.color}">${esc(a.label)}</b><div class="small" style="color:var(--ink);margin-top:3px">Станции: ${esc(a.stations)}</div><div class="small" style="margin-top:4px"><i>${esc(AREAS_NOTE)}</i></div>`;
  }
  function buildAreas() {
    areasLayer = L.layerGroup(AREAS.map((a) => L.polygon(smooth(a.pts, 3), { color: a.color, weight: 2, opacity: .8, fillColor: a.color, fillOpacity: .2, smoothFactor: 1.5 })
      .bindPopup(areaPopup(a), { maxWidth: 280 })));
    areasLegend = L.control({ position: "bottomright" });
    areasLegend.onAdd = () => {
      const d = L.DomUtil.create("div", "areas-legend");
      d.innerHTML = AREAS.map((a) => `<div><span class="sw" style="background:${a.color}"></span>${esc(a.label)}</div>`).join("") + `<div class="src">${esc(AREAS_NOTE)}</div>`;
      L.DomEvent.disableClickPropagation(d);
      return d;
    };
  }
  function setAreas(on, fit) {
    areasOn = on;
    document.querySelectorAll("[data-farea]").forEach((c) => c.setAttribute("aria-pressed", on));
    if (!map || !HAS_AREAS) return;
    if (!areasLayer) buildAreas();
    if (on) { areasLayer.addTo(map); areasLegend.addTo(map); } else { areasLayer.remove(); areasLegend.remove(); }
    if (on && fit) {
      const b = L.latLngBounds([]); areasLayer.eachLayer((l) => b.extend(l.getBounds()));
      setTimeout(() => {
        map.invalidateSize();
        const lg = areasLegend.getContainer(), lh = lg ? lg.offsetHeight + 90 : 40;
        map.fitBounds(b, { paddingTopLeft: [16, isDesktop() ? 90 : 120], paddingBottomRight: [16, lh] });
      }, 120);
    }
  }
  function showAreas() {
    if (!isDesktop()) go("map");
    if (!map) initMap();
    needFit = false;
    setAreas(true, true);
    const cf = $("#catFilter"); if (cf) cf.scrollLeft = cf.scrollWidth;
  }
  const filt = { day: "all", cats: new Set(Object.keys(CATEGORIES)) };
  const isFar = (p) => p.far || Math.hypot((p.lat - 51.51) * 111, (p.lng + 0.12) * 69) > 15;
  function allPoints() {
    const hs = HOTELS.map((x, i) => (typeof x.lat === "number" && typeof x.lng === "number" ? hotelPlace("hotel-" + i) : null)).filter(Boolean);
    return PLACES.concat(hs);
  }
  function icon(cat) {
    const c = CATEGORIES[cat];
    return L.divIcon({ className: "", html: `<div class="mk" style="background:${c.color}"><span>${c.icon}</span></div>`, iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -28] });
  }
  function popupHtml(p) {
    return `<b>${esc(p.name)}</b>${p.addr ? `<br><span class="small">${esc(p.addr)}</span>` : ""}${p.note ? `<div class="small" style="color:var(--ink);margin-top:3px">${rich(p.note)}</div>` : ""}${navBtns(p, { noMap: true, more: true })}`;
  }
  function initMap() {
    if (map) return;
    const el = $("#map");
    if (!window.L) { el.innerHTML = `<div class="offline-map">Карта не загрузилась. Адреса — во вкладке «Ещё → Все места».</div>`; return; }
    map = L.map(el, { zoomControl: false, zoomSnap: 0.25 }).setView([51.514, -0.11], 12);
    L.control.zoom({ position: "bottomleft" }).addTo(map);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, crossOrigin: true, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
    markers = allPoints().map((p) => ({ p, m: L.marker([p.lat, p.lng], { icon: icon(p.cat), title: p.name }).bindPopup(popupHtml(p), { maxWidth: 280 }) }));
    if (XM) XM.places.filter((x) => !x.cancelled).forEach((x) => {
      const p = { id: "xm-" + x.id, cat: "markets", name: x.name, lat: x.lat, lng: x.lng, far: x.id === "kew",
        days: Object.keys(x.days || {}).filter((k) => x.days[k]) };
      markers.push({ p, m: L.marker([x.lat, x.lng], { icon: XM.icon(x, XM.statusFor(x, "all")), title: x.name }).bindPopup(XM.popupHtml(x, "all"), { maxWidth: 280 }) });
    });
    $("#dayFilter").innerHTML = `<button class="chip" type="button" data-fday="all" aria-pressed="${filt.day === "all"}">${t("all")}</button>` + DAYS.map((d) => `<button class="chip" type="button" data-fday="${d.id}" aria-pressed="${filt.day === d.id}">${esc(d.short)}</button>`).join("");
    $("#catFilter").innerHTML = Object.entries(CATEGORIES).map(([k, c]) => `<button class="chip cat" type="button" data-fcat="${k}" aria-pressed="true" style="color:${c.color}"><span class="dot" style="background:${c.color}"></span><span style="color:var(--ink)">${c.label}</span></button>`).join("") +
      (HAS_AREAS ? `<button class="chip cat" type="button" data-farea="1" aria-pressed="${areasOn}" style="color:#1f6fd1"><span class="dot" style="background:linear-gradient(90deg,#1f6fd1 33%,#d4b000 33% 66%,#d0312d 66%)"></span><span style="color:var(--ink)">🏘 Районы</span></button>` : "");
    $("#mapbar").addEventListener("click", (e) => {
      const d = e.target.closest("[data-fday]"), c = e.target.closest("[data-fcat]");
      if (d) setDayFilter(d.dataset.fday);
      if (e.target.closest("[data-farea]")) { setAreas(!areasOn); return; }
      if (c) { const k = c.dataset.fcat; filt.cats.has(k) ? filt.cats.delete(k) : filt.cats.add(k); c.setAttribute("aria-pressed", filt.cats.has(k)); applyFilters(true); }
    });
    $("#locate").addEventListener("click", locate);
    applyFilters(true);
    if (areasOn) setAreas(true);
  }
  function setDayFilter(day, quiet) {
    filt.day = day;
    document.querySelectorAll("[data-fday]").forEach((c) => c.setAttribute("aria-pressed", c.dataset.fday === day));
    if (routeLine) { routeLine.remove(); routeLine = null; }
    applyFilters(true);
  }
  function visible(p) { return filt.cats.has(p.cat) && (filt.day === "all" || (p.days || []).includes(filt.day)); }
  function applyFilters(fit) {
    if (!map) return;
    const vis = [];
    markers.forEach((o) => { if (visible(o.p)) { o.m.addTo(map); vis.push(o.p); } else o.m.remove(); });
    if (!fit || !vis.length) return;
    if (!map.getSize().x) { needFit = true; return; }  // container hidden (phone, other tab)
    needFit = false;
    const near = vis.filter((p) => !isFar(p));
    const pts = (filt.day !== "all" && near.length < 3 ? vis : near.length ? near : vis).map((p) => [p.lat, p.lng]);
    const anim = fitted; fitted = true;
    if (pts.length === 1) map.setView(pts[0], 14, { animate: anim }); else map.fitBounds(pts, { paddingTopLeft: [30, 100], paddingBottomRight: [40, 30], maxZoom: 15, animate: anim });
  }
  function showRoute(ids) {
    if (!isDesktop()) go("map");
    if (!map) return;
    setDayFilter("all");
    const pts = ids.map((id) => placeById[id]).filter(Boolean).map((p) => [p.lat, p.lng]);
    routeLine = L.polyline(pts, { color: "#b8532f", weight: 4, opacity: .8, dashArray: "6 8" }).addTo(map);
    setTimeout(() => { map.invalidateSize(); map.fitBounds(routeLine.getBounds(), { paddingTopLeft: [40, 120], paddingBottomRight: [40, 40] }); }, 60);
  }
  function focusPlace(id) {
    closeSheet();
    if (!isDesktop()) go("map");
    if (!map) initMap();
    const o = markers.find((x) => x.p.id === id); if (!o || !map) return;
    if (!visible(o.p)) { filt.cats.add(o.p.cat); document.querySelector(`[data-fcat="${o.p.cat}"]`)?.setAttribute("aria-pressed", "true"); setDayFilter("all"); }
    needFit = false;
    setTimeout(() => { map.invalidateSize(); map.setView([o.p.lat, o.p.lng], 16); o.m.openPopup(); }, 80);
  }
  function locate() {
    if (!navigator.geolocation || !map) return toast(t("noGeo"));
    navigator.geolocation.getCurrentPosition((pos) => {
      const ll = [pos.coords.latitude, pos.coords.longitude];
      if (meMarker) meMarker.remove();
      meMarker = L.circleMarker(ll, { radius: 8, color: "#fff", weight: 3, fillColor: "#1a73e8", fillOpacity: 1 }).addTo(map);
      map.setView(ll, 15);
    }, () => toast(t("noGeo")), { enableHighAccuracy: true, timeout: 10000 });
  }

  /* ---------- footer / PWA ---------- */
  let deferredInstall = null;
  function renderFoot() {
    $("#foot").innerHTML = `${esc(TRIP.version)} · ${t("footCheck").replace("«проверить»", `<span class="check">${t("checkWord")}</span>`)}
      <div class="btns" style="justify-content:center"><button class="btn" id="installBtn" type="button" hidden>${t("install")}</button></div>
      <div id="netState"></div>${/iphone|ipad/i.test(navigator.userAgent) ? `<div>${t("iosHint")}</div>` : ""}`;
    $("#installBtn").addEventListener("click", async () => { if (!deferredInstall) return; deferredInstall.prompt(); deferredInstall = null; $("#installBtn").hidden = true; });
  }
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredInstall = e; const b = $("#installBtn"); if (b) b.hidden = false; });
  function netState() { const n = $("#netState"); if (n) n.textContent = navigator.onLine ? "" : t("offline"); }
  window.addEventListener("online", netState); window.addEventListener("offline", netState);

  /* ---------- global events ---------- */
  document.addEventListener("click", (e) => {
    const f = e.target.closest("[data-focus]"); if (f) { e.preventDefault(); focusPlace(f.dataset.focus); return; }
    const o = e.target.closest("[data-open]"); if (o) { e.preventDefault(); o.closest(".leaflet-popup") && map.closePopup(); openPlace(o.dataset.open); return; }
    const j = e.target.closest("[data-jump]"); if (j && j.dataset.jump === "xm-go") { go("xmas"); return; }
    if (j) { const el = document.getElementById(j.dataset.jump); if (el) scrollToEl(el); return; }
    const g = e.target.closest("[data-goto]"); if (g) { e.preventDefault(); const [tb, an] = g.dataset.goto.split("/"); go(tb, an); }
  });
  $("#sheetClose").addEventListener("click", closeSheet);
  $("#sheetBackdrop").addEventListener("click", closeSheet);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });
  window.addEventListener("resize", () => { layoutVars(); if (isDesktop() && !map) initMap(); if (map) map.invalidateSize(); if (isDesktop() && current === "map") go("plan"); });

  /* ---------- boot ---------- */
  document.documentElement.lang = LANG;
  renderHeader(); renderTabs(); renderPlan(); renderTrip(); renderStay(); renderMore(); renderFoot();
  tick(); setInterval(tick, 1000);
  layoutVars();
  if (isDesktop()) initMap();
  const [h0, a0] = (location.hash.slice(1) || "plan").split("/");
  go(TABS.some((x) => x.id === h0) ? h0 : "plan", a0);
  if (selectedDay && h0 !== "map" && !a0) selectDay(selectedDay, true);
  netState();
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").then((reg) => {
      if (!navigator.serviceWorker.controller) reg.addEventListener("updatefound", () => { const w = reg.installing; w && w.addEventListener("statechange", () => { if (w.state === "activated") toast(t("offlineReady")); }); });
    }).catch(() => {});
  }
})();
