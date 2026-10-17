/* «Рождественские ярмарки» — самостоятельный модуль (Leaflet 1.9, без сборки).
   Использование: XmasMarkets.mount(document.getElementById('xmas-root'));
   Для категории на главной карте: XmasMarkets.addToMap(mainMap) → L.LayerGroup */
(function () {
  'use strict';
  var PLACES = window.XMAS_PLACES || [], TYPES = window.XMAS_TYPES || {},
      DAYS = window.XMAS_TRIP_DAYS || [], WALK = window.XMAS_WALK;

  var ICONS = {
    market: '<path d="M3 10h18l-2.2-5H5.2z"/><path d="M5 10v9h14v-9"/><path d="M10 19v-5h4v5"/><path d="M7.5 10V5M12 10V5M16.5 10V5"/>',
    lights: '<path d="M12 2.8l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.6l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/>',
    rink: '<path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2L3.8 16.8"/><path d="M9.6 4.4L12 6.6l2.4-2.2M9.6 19.6L12 17.4l2.4 2.2"/>',
    trail: '<path d="M12 2.5l5 6.5h-3l4 5.5h-4l3 5H7l3-5H6l4-5.5H7z"/><path d="M12 19.5v2"/>',
    windows: '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5.5 12v8.5h13V12M12 8v12.5"/><path d="M12 8C10.5 4.5 7 4.3 7 6.4 7 8 12 8 12 8zM12 8c1.5-3.5 5-3.7 5-1.6C17 8 12 8 12 8z"/>'
  };
  var STATUS = {
    open:   { label: 'Открыто в наши даты', short: 'Открыто', color: '#1d8f55' },
    check:  { label: 'Уточнить [[проверить]]', short: 'Проверить', color: '#d99a06' },
    closed: { label: 'Ещё закрыто / нет в наши даты', short: 'Закрыто', color: '#8b919c' }
  };

  var state = { day: 'all', types: Object.keys(TYPES).reduce(function (o, k) { o[k] = true; return o; }, {}), walk: false };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function mark(s) { return esc(s).replace(/\[\[(.+?)\]\]/g, '<span class="xm-flag">$1</span>'); }
  function svg(type, size) { return '<svg viewBox="0 0 24 24" width="' + (size || 18) + '" height="' + (size || 18) + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">' + (ICONS[type] || ICONS.market) + '</svg>'; }

  function statusFor(p, day) {
    if (p.cancelled) return 'closed';
    var keys = day === 'all' ? DAYS.map(function (d) { return d.key; }) : [day];
    var any = keys.some(function (k) { return p.days && p.days[k]; });
    if (!any) return 'closed';
    return p.check ? 'check' : 'open';
  }
  function hoursFor(p, day) {
    if (day === 'all') return DAYS.map(function (d) { return d.label + ': ' + (p.days[d.key] || 'закрыто'); }).join(' · ');
    var lbl = (DAYS.filter(function (d) { return d.key === day; })[0] || {}).label;
    return lbl + ': ' + (p.days[day] || 'закрыто');
  }
  function routeUrl(p) { return 'https://www.google.com/maps/dir/?api=1&destination=' + p.lat + ',' + p.lng + '&travelmode=transit'; }

  function icon(p, st) {
    return L.divIcon({
      className: 'xm-pin-wrap',
      html: '<div class="xm-pin xm-' + st + '" style="--st:' + STATUS[st].color + ';--ty:' + (TYPES[p.type] || {}).color + '">' + svg(p.type, 18) + '</div>',
      iconSize: [34, 42], iconAnchor: [17, 40], popupAnchor: [0, -38]
    });
  }
  function popupHtml(p, day) {
    var st = statusFor(p, day);
    return '<div class="xm-pop">' +
      '<div class="xm-pop-type" style="color:' + TYPES[p.type].color + '">' + svg(p.type, 14) + ' ' + esc(TYPES[p.type].label) + '</div>' +
      '<div class="xm-pop-name">' + esc(p.name) + '</div>' +
      '<span class="xm-badge xm-' + st + '">' + STATUS[st].short + '</span>' +
      '<dl><dt>Когда</dt><dd>' + mark(hoursFor(p, day)) + '</dd>' +
      '<dt>Вход</dt><dd>' + mark(p.price) + '</dd>' +
      '<dt>Метро</dt><dd>' + esc(p.tube) + '</dd></dl>' +
      '<div class="xm-btns"><a class="xm-btn xm-btn-main" target="_blank" rel="noopener" href="' + routeUrl(p) + '">Маршрут</a>' +
      '<a class="xm-btn" target="_blank" rel="noopener" href="' + esc(p.url) + '">Сайт</a></div></div>';
  }
  function cardHtml(p, day) {
    var st = statusFor(p, day), t = TYPES[p.type];
    return '<article class="xm-card xm-c-' + st + '" data-id="' + p.id + '" tabindex="0">' +
      '<header><span class="xm-card-ico" style="background:' + t.color + '">' + svg(p.type, 16) + '</span>' +
      '<div class="xm-card-h"><h3>' + esc(p.name) + '</h3><span class="xm-card-type">' + esc(t.label) + '</span></div>' +
      '<span class="xm-badge xm-' + st + '">' + STATUS[st].short + '</span></header>' +
      '<p class="xm-what">' + esc(p.what) + '</p>' +
      '<ul class="xm-facts">' +
      '<li><b>Даты</b>' + mark(p.dates) + '</li>' +
      '<li><b>Часы</b>' + mark(p.hours) + '</li>' +
      '<li><b>18–20.11</b>' + mark(hoursFor(p, 'all')) + '</li>' +
      '<li><b>Вход</b>' + mark(p.price) + '</li>' +
      '<li><b>Бронь</b>' + mark(p.booking) + '</li>' +
      '<li><b>Адрес</b>' + esc(p.address) + '</li>' +
      '<li><b>Метро</b>' + esc(p.tube) + '</li></ul>' +
      '<p class="xm-tip">' + mark(p.tip) + '</p>' +
      (p.note ? '<p class="xm-note">' + mark(p.note) + '</p>' : '') +
      '<div class="xm-btns"><a class="xm-btn xm-btn-main" target="_blank" rel="noopener" href="' + routeUrl(p) + '">Маршрут</a>' +
      '<a class="xm-btn" target="_blank" rel="noopener" href="' + esc(p.url) + '">Сайт</a>' +
      '<button class="xm-btn xm-btn-ghost" data-show="' + p.id + '" type="button">На карте</button></div></article>';
  }

  function walkStats() {
    var R = 6371, d = 0, pts = WALK.path;
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i], dLat = (b[0] - a[0]) * Math.PI / 180, dLng = (b[1] - a[1]) * Math.PI / 180;
      var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a[0] * Math.PI / 180) * Math.cos(b[0] * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      d += 2 * R * Math.asin(Math.sqrt(h));
    }
    return { km: d, min: Math.round(d / 4.5 * 60 / 5) * 5 };
  }

  function mount(root) {
    if (!root || !window.L) return;
    var ws = walkStats();
    root.classList.add('xm');
    root.innerHTML =
      '<div class="xm-hero"><div class="xm-snow" aria-hidden="true"></div>' +
      '<h2>Рождественские ярмарки</h2><p>Ярмарки, огни, катки и световые тропы Лондона — что работает 18–20 ноября 2026</p></div>' +
      '<div class="xm-controls">' +
      '<div class="xm-seg" role="tablist" aria-label="День">' +
      '<button type="button" data-day="all" class="on">Все дни</button>' +
      DAYS.map(function (d) { return '<button type="button" data-day="' + d.key + '">' + d.label + '</button>'; }).join('') + '</div>' +
      '<div class="xm-chips">' + Object.keys(TYPES).map(function (k) {
        return '<button type="button" class="xm-chip on" data-type="' + k + '" style="--ty:' + TYPES[k].color + '">' + svg(k, 15) + '<span>' + TYPES[k].label + '</span></button>';
      }).join('') + '</div></div>' +
      '<div class="xm-layout"><div class="xm-mapcol"><div class="xm-map" id="xm-map"></div>' +
      '<div class="xm-legend">' + ['open', 'check', 'closed'].map(function (s) { return '<span><i style="background:' + STATUS[s].color + '"></i>' + STATUS[s].label.replace(/\[\[.*\]\]/, '') + '</span>'; }).join('') + '</div>' +
      '<div class="xm-walk"><button type="button" class="xm-walk-btn" aria-pressed="false">' + svg('lights', 16) + '<span>Показать прогулку по огням</span></button>' +
      '<div class="xm-walk-info"><b>' + esc(WALK.name) + '</b> · ~' + ws.km.toFixed(1).replace('.', ',') + ' км, ~' + ws.min + ' мин чистой ходьбы, 2–2,5 ч с остановками. Старт ' + esc(WALK.start) + '.' +
      '<ol>' + WALK.stops.map(function (s) { return '<li>' + esc(s.name) + '</li>'; }).join('') + '</ol></div></div></div>' +
      '<div class="xm-listcol"><div class="xm-count"></div><div class="xm-list"></div></div></div>' +
      '<p class="xm-foot">Данные сверены с официальными сайтами 17.10.2026. <span class="xm-flag">проверить</span> — даты/часы 2026 ещё не опубликованы.</p>';

    var map = L.map(root.querySelector('#xm-map'), { zoomControl: true, scrollWheelZoom: false }).setView([51.509, -0.128], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, crossOrigin: true, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var markers = {}, walkLayer = L.layerGroup();
    L.polyline(WALK.path, { color: '#fff', weight: 9, opacity: .9 }).addTo(walkLayer);
    L.polyline(WALK.path, { color: '#c8102e', weight: 5, opacity: .95, dashArray: '1 10', lineCap: 'round' }).addTo(walkLayer);
    L.polyline(WALK.path, { color: '#d4a017', weight: 3, opacity: 1 }).addTo(walkLayer);
    WALK.stops.forEach(function (s, i) {
      L.marker(s.at, { icon: L.divIcon({ className: 'xm-step-wrap', html: '<div class="xm-step">' + (i + 1) + '</div>', iconSize: [22, 22], iconAnchor: [11, 11] }), zIndexOffset: 1000 })
        .bindTooltip(esc(s.name), { direction: 'top', offset: [0, -10] }).addTo(walkLayer);
    });

    function visible(p) { return state.types[p.type]; }
    function render() {
      var list = root.querySelector('.xm-list'), shown = PLACES.filter(visible);
      var order = { open: 0, check: 1, closed: 2 };
      shown.sort(function (a, b) { return order[statusFor(a, state.day)] - order[statusFor(b, state.day)]; });
      list.innerHTML = shown.map(function (p) { return cardHtml(p, state.day); }).join('') || '<p class="xm-empty">Ничего не выбрано</p>';
      var nOpen = shown.filter(function (p) { return statusFor(p, state.day) === 'open'; }).length;
      root.querySelector('.xm-count').textContent = 'Мест: ' + shown.length + ' · открыто: ' + nOpen;
      PLACES.forEach(function (p) {
        var m = markers[p.id], st = statusFor(p, state.day);
        if (!m) { m = markers[p.id] = L.marker([p.lat, p.lng], { title: p.name, riseOnHover: true }); m.bindPopup('', { maxWidth: 280, autoPanPadding: [20, 70] }); }
        m.setIcon(icon(p, st)); m.setZIndexOffset(st === 'open' ? 500 : st === 'check' ? 200 : 0);
        m.setPopupContent(popupHtml(p, state.day));
        if (visible(p)) m.addTo(map); else map.removeLayer(m);
      });
    }
    function show(id) {
      var m = markers[id], p = PLACES.filter(function (x) { return x.id === id; })[0]; if (!m || !p) return;
      var r = root.querySelector('#xm-map').getBoundingClientRect();
      if (r.top < 0 || r.bottom > window.innerHeight) root.querySelector('#xm-map').scrollIntoView({ behavior: 'smooth', block: 'center' });
      map.flyTo([p.lat, p.lng], Math.max(map.getZoom(), 15), { duration: .6 });
      setTimeout(function () { m.openPopup(); }, 650);
    }

    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || !root.contains(b)) {
        var c = e.target.closest('.xm-card'); if (c && !e.target.closest('a')) show(c.dataset.id); return;
      }
      if (b.dataset.day) { state.day = b.dataset.day; root.querySelectorAll('.xm-seg button').forEach(function (x) { x.classList.toggle('on', x === b); }); render(); }
      else if (b.dataset.type) { state.types[b.dataset.type] = !state.types[b.dataset.type]; b.classList.toggle('on', state.types[b.dataset.type]); render(); }
      else if (b.dataset.show) { show(b.dataset.show); }
      else if (b.classList.contains('xm-walk-btn')) {
        state.walk = !state.walk; b.setAttribute('aria-pressed', state.walk);
        b.querySelector('span').textContent = state.walk ? 'Скрыть прогулку' : 'Показать прогулку по огням';
        root.querySelector('.xm-walk').classList.toggle('on', state.walk);
        if (state.walk) { walkLayer.addTo(map); map.flyToBounds(L.latLngBounds(WALK.path).pad(0.15), { duration: .6 }); } else map.removeLayer(walkLayer);
      }
    });
    root.addEventListener('keydown', function (e) { var c = e.target.closest('.xm-card'); if (c && e.key === 'Enter') show(c.dataset.id); });
    render();
    // Если вкладка была скрыта при инициализации — пересчитать размер карты при показе
    root._xmMap = map;
    return { map: map, refresh: function () { map.invalidateSize(); } };
  }

  /* Слой для главной карты сайта (категория «Рождество») */
  function addToMap(mainMap, opts) {
    opts = opts || {};
    var g = L.layerGroup();
    PLACES.forEach(function (p) {
      if (p.cancelled) return;
      var st = statusFor(p, 'all');
      L.marker([p.lat, p.lng], { icon: icon(p, st), title: p.name }).bindPopup(popupHtml(p, 'all'), { maxWidth: 280 }).addTo(g);
    });
    if (mainMap && opts.show !== false) g.addTo(mainMap);
    return g;
  }

  window.XmasMarkets = { mount: mount, addToMap: addToMap, statusFor: statusFor, icon: icon, popupHtml: popupHtml, places: PLACES, types: TYPES };
})();
