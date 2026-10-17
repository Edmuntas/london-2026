/* =====================================================================
   ДАННЫЕ ПОЕЗДКИ — единственный файл для редактирования контента.
   Лондон · 17–21.11.2026 · Эдмонт и Эмма
   ---------------------------------------------------------------------
   Правила:
   • Только проверенные факты. Метка [[проверить]] (или [[проверить …]])
     рендерится как оранжевый значок «проверить».
   • В текстовых полях PLACES/DAYS/INFO допускается простой HTML (<b>, <a>).
     Поля HOTELS / SMOKING / KIDS выводятся как обычный текст (экранируются).
   • ПРИВАТНОСТЬ (сайт публичный): без кода брони, фамилии, ссылки на бронь
     Wizz и паспортных данных. Только имена.
   • Язык: весь контент на русском. Для будущего иврита можно добавить
     параллельные поля (например title_he) — UI-строки лежат в app.js (STRINGS).
   ===================================================================== */

const TRIP = {
  title: "Лондон 🎄",
  travellers: "Эдмонт и Эмма · 2 взрослых",
  dates: "Вт 17.11 → Сб 21.11.2026",
  nightsNote: "4 ночи, 3 полных дня",
  version: "v1.0 · 17.10.2026",
  // Моменты в UTC (Израиль в ноябре UTC+2, Лондон UTC+0)
  departUTC: "2026-11-17T13:20:00Z",   // TLV 15:20 по Израилю
  returnDepartUTC: "2026-11-21T07:25:00Z", // LTN 07:25 по Лондону
  homeUTC: "2026-11-21T12:25:00Z"      // TLV 14:25 по Израилю
};

/* ---------- ПЕРЕЛЁТЫ ---------- */
const FLIGHTS = [
  { dir: "Туда", date: "Вт 17.11.2026", no: "W9 5302", airline: "Wizz Air",
    from: "TLV", fromName: "Тель-Авив (Бен-Гурион)", to: "LTN", toName: "London Luton",
    depUTC: "2026-11-17T13:20:00Z", arrUTC: "2026-11-17T18:45:00Z",
    depTz: "Asia/Jerusalem", arrTz: "Europe/London" },
  { dir: "Обратно", date: "Сб 21.11.2026", no: "W9 5301", airline: "Wizz Air",
    from: "LTN", fromName: "London Luton", to: "TLV", toName: "Тель-Авив (Бен-Гурион)",
    depUTC: "2026-11-21T07:25:00Z", arrUTC: "2026-11-21T12:25:00Z",
    depTz: "Europe/London", arrTz: "Asia/Jerusalem" }
];

const BAGGAGE = [
  { who: "Эмма",   what: "Сдаваемый багаж <b>26 кг</b> + бесплатная сумка под сиденье" },
  { who: "Эдмонт", what: "Только бесплатная сумка под сиденье: <b>40×30×20 см, до 10 кг</b>" }
];

const FLIGHT_NOTES = [
  "Места не выбраны. Онлайн-регистрация без купленного места открывается <b>за 24 ч</b> и закрывается <b>за 3 ч</b> до вылета (с купленным местом — за 30 дней). <a href=\"https://www.wizzair.com/en-gb/help-centre/check-in-and-boarding/check-in/check-in-and-baggage-drop-off-times\" target=\"_blank\" rel=\"noopener\">Wizz: регистрация</a>",
  "Сдача багажа Wizz: <b>Бен-Гурион</b> — открывается за 180 мин, закрывается <b>за 70 мин</b> (17.11 → до 14:10); <b>Luton</b> — открывается за 180 мин, закрывается <b>за 60 мин</b> (21.11 → с 04:25 до <b>06:25</b>). Для остальных аэропортов стандарт 2 ч / 40 мин — у Luton и TLV правило строже."
];

const FLIGHT_WARN = "⚠️ <b>Эдмонт летит только с сумкой под сиденье.</b> Если в Лондоне покупаем рюкзак 5.11 Skyweight 36L — он <b>не влезет</b> в 40×30×20 (это всего ~24 л). На обратный рейс нужно <b>докупить багаж</b> (Priority/ручную кладь 10 кг или сдаваемый) — заранее в приложении дешевле, чем в аэропорту [[проверить цену]]. Вариант: положить покупки в 26 кг Эммы, если влезет по весу.";

/* ---------- LUTON ---------- */
const LUTON_OPTIONS = [
  { name: "<b>Luton Airport Express</b> (EMR) St Pancras ↔ Luton Airport Parkway + шаттл <b>Luton DART</b> до терминала",
    time: "от ~32 мин до терминала (поезд 22 мин без остановок + DART ~4 мин)",
    note: "Каждые 30 мин пн–сб. Билет брать до станции <b>«Luton Airport» (LUA)</b> — тогда DART включён; отдельно DART £4.90. Advance от ~£10 [[проверить]]" },
  { name: "<b>Thameslink</b> (St Pancras, Farringdon, City, Blackfriars, London Bridge) → Parkway + DART",
    time: "24–45 мин от St Pancras + DART",
    note: "Ходит <b>и ночью</b>, примерно раз в час. Advance от ~£6.50 + DART [[проверить]]" },
  { name: "<b>National Express</b> A1/A2/A31 (Victoria, Marble Arch, Baker St, Golders Green…)",
    time: "от 40 мин (Golders Green), из центра ~60–90 мин",
    note: "<b>24/7</b>, до двери терминала, без DART. От £7 онлайн. Ночные рейсы: первый из Victoria в 00:01" },
  { name: "<b>Green Line 757</b> (Victoria, Hyde Park Corner, Marble Arch, Baker St…)",
    time: "~60–90 мин",
    note: "Днём каждые 30 мин, <b>ночью каждый час</b>, 7 дней" },
  { name: "<b>Такси / трансфер</b>",
    time: "~1 ч+ ночью",
    note: "Luton вне Greater London — цену <b>согласовать с водителем заранее</b>, иначе по счётчику (правило TfL). Официальной цены нет [[проверить]]" }
];

const LUTON_SOURCES = "DART работает 24/7 (ночью — раз в ~15 мин). Источники: <a href=\"https://www.lutonairportexpress.co.uk/routes/london-to-luton-airport\" target=\"_blank\" rel=\"noopener\">Luton Airport Express</a> · <a href=\"https://www.lutonairportexpress.co.uk/faqs\" target=\"_blank\" rel=\"noopener\">LAE FAQ</a> · <a href=\"https://www.london-luton.co.uk/to-and-from-lla/trains/luton-dart\" target=\"_blank\" rel=\"noopener\">Luton DART</a> · <a href=\"https://www.thameslinkrailway.com/travel-information/airport-travel/luton-airport\" target=\"_blank\" rel=\"noopener\">Thameslink</a> · <a href=\"https://www.nationalexpress.com/en/airports/luton/london-to-luton\" target=\"_blank\" rel=\"noopener\">National Express</a> · <a href=\"https://www.london-luton.co.uk/to-and-from-lla/bus-and-coach/to-from-london\" target=\"_blank\" rel=\"noopener\">LLA: автобусы</a> · <a href=\"https://tfl.gov.uk/modes/taxis-and-minicabs/taxi-fares\" target=\"_blank\" rel=\"noopener\">TfL: такси</a> · <a href=\"https://www.nationalrail.co.uk/\" target=\"_blank\" rel=\"noopener\">National Rail (точное расписание)</a>";

const LUTON_ARRIVAL = "После паспортного контроля — DART → Parkway → Luton Airport Express до St Pancras (по будням до ~23:50). Проблем нет.";

const LUTON_DEPARTURE = {
  warn: "❌ <b>Первый Luton Airport Express в субботу — 05:33</b> из St Pancras → Parkway ~05:55 → терминал ~06:00–06:05. Сдача багажа Эммы закрывается в <b>06:25</b>. Это <b>почти без запаса</b> (очереди на досмотре рано утром), а нам нужно быть в аэропорту в <b>05:25–05:45</b>. → <b>Первый экспресс не подходит.</b>",
  options: [
    "<b>Ночной Thameslink</b> из St Pancras примерно раз в час — по текущему расписанию будних ночей, напр. <b>03:44 → 04:29</b> или <b>04:44 → 05:29</b> на Parkway, + DART [[проверить точные времена на 21.11 в National Rail — расписание меняется в декабре и на выходных бывают работы]].",
    "<b>National Express</b> из Victoria / Marble Arch / Baker St ночью (рейсы каждые ~30–60 мин) — прямо к терминалу; конкретный рейс выбрать в планировщике.",
    "<b>Предзаказанное такси</b> ~04:00 из центра — самый простой, но самый дорогой вариант."
  ],
  good: "✅ <b>Рекомендация:</b> последнюю ночь <b>Пт 20.11 провести в отеле у аэропорта Luton</b> (в пешей доступности от терминала). В пятницу вечером спокойно доехать экспрессом (ходит до ~23:50), утром выйти в ~05:15 пешком. Запасной вариант — отель у <b>St Pancras / King's Cross</b> и ночной Thameslink ~04:44 [[проверить]]."
};

/* ---------- ДОКУМЕНТЫ ---------- */
const DOCS_WARN = "🛂 <b>UK ETA обязателен</b> для граждан Израиля (Израиль в официальном списке). Без ETA не посадят на рейс. Каждому — своё ETA.<br>• Цена: <b>£20</b> на человека (официально, онлайн или в приложении «UK ETA»), не возвращается.<br>• Решение обычно в течение дня, <b>до 3 рабочих дней</b> → подать минимум за неделю, лучше сейчас.<br>• Действует <b>2 года</b> или до окончания срока паспорта; привязано к паспорту, с которым летим.<br>• Подавать только на gov.uk / в официальном приложении — сторонние сайты берут больше.<br><a href=\"https://www.gov.uk/eta\" target=\"_blank\" rel=\"noopener\">gov.uk/eta</a> · <a href=\"https://www.gov.uk/eta/apply\" target=\"_blank\" rel=\"noopener\">Подать заявку</a> · <a href=\"https://www.gov.uk/guidance/check-when-you-can-get-an-electronic-travel-authorisation-eta\" target=\"_blank\" rel=\"noopener\">Список стран</a>";

/* ---------- КАТЕГОРИИ КАРТЫ ---------- */
const CATEGORIES = {
  food:  { label: "Еда",            icon: "🍜", color: "#b8532f" },
  xmas:  { label: "Рождество/огни", icon: "🎄", color: "#2f6b4f" },
  shop:  { label: "Шопинг",         icon: "🛍️", color: "#3b5b9a" },
  stay:  { label: "Жильё",          icon: "🏨", color: "#8a4fb0" },
  tr:    { label: "Транспорт",      icon: "🚆", color: "#4a4a4a" }
};

/* ---------- МЕСТА ----------
   days: в какие дни места входят в план ("2026-11-18" …).
   Координаты: OpenStreetMap Nominatim; для Yuen Kee, Swiss Butter и Burnt —
   центр почтового индекса (postcodes.io), точность ±50–100 м. */
const PLACES = [
  { id: "yuenkee", cat: "food", name: "Yuen Kee Dumpling 袁记云饺", lat: 51.518164, lng: -0.078769,
    addr: "122 Middlesex St, London E1 7HY · у Liverpool Street",
    note: "Адрес подтверждён в реестре гигиены FSA (рейтинг 5, проверка 17.07.2026). Часы 11–22 — по агрегаторам [[проверить]].",
    links: [{ t: "FSA", u: "https://ratings.food.gov.uk/business/1938752" }],
    days: ["2026-11-18"], approx: true },
  { id: "swissbutter", cat: "food", name: "Swiss Butter", lat: 51.520627, lng: -0.122587,
    addr: "114–118 Southampton Row, Holborn, London WC1B 5AA · м. Holborn / Russell Square",
    note: "Стейк в фирменном масляном соусе. В Лондоне найден <b>только один филиал</b> (бренд заявлял о планах открыть ещё два, адресов нет). Без брони, walk-in. Пн–сб 12:00–00:00, вс 12:00–23:00. Блюда «от £18», ~£22 на человека — по сайту swissbutterlondon.online; «стейк £19» из чата [[проверить цену]].",
    links: [{ t: "Swiss Butter London", u: "https://swissbutterlondon.online/faq/" }, { t: "swissbutter.com", u: "https://swissbutter.com/" }],
    days: ["2026-11-20"], approx: true },
  { id: "burnt", cat: "food", name: "Burnt Smokehouse", lat: 51.569293, lng: -0.006382,
    addr: "161a Midland Rd, Leyton, London E10 6JT · под ж/д арками у Leyton Midland Road",
    note: "Техасское BBQ (брискет, смэш-бургеры). Халяль, без алкогольной лицензии (Time Out). Часы [[проверить]].",
    links: [{ t: "burntsmokehouse.com", u: "https://burntsmokehouse.com/pages/contact" }, { t: "Time Out", u: "https://www.timeout.com/london/restaurants/burnt-smokehouse" }],
    days: ["2026-11-18"], approx: true },
  { id: "happy", cat: "food", name: "Happy Bar & Grill", lat: 51.5101646, lng: -0.1324699,
    addr: "25–29 Coventry Street, Piccadilly, London W1D 7AG · между Piccadilly Circus и Leicester Square",
    note: "Вс–чт 12:00–22:30, пт–сб 12:00–00:00. Суши, бургеры, семейный формат. Можно бронировать.",
    links: [{ t: "happyrestaurants.com", u: "https://happyrestaurants.com/restaurants/25/happy-bar-grill-london" }],
    days: ["2026-11-19"] },

  { id: "regent", cat: "xmas", name: "Regent Street (огни)", lat: 51.5134778, lng: -0.1408535,
    note: "Огни (ангелы) — с 5 ноября. ✅ 17–21.11", days: ["2026-11-19"] },
  { id: "oxford", cat: "xmas", name: "Oxford Circus / Oxford St", lat: 51.5156576, lng: -0.1417687,
    note: "Огни: дата не объявлена, ожидают ~2 ноября [[проверить]]. ✅ скорее всего", days: ["2026-11-19"] },
  { id: "carnaby", cat: "xmas", name: "Carnaby Street", lat: 51.5130102, lng: -0.1386688,
    note: "Огни (тема 90-х) — с 4 ноября. ✅", days: ["2026-11-19"] },
  { id: "bond", cat: "xmas", name: "New Bond Street", lat: 51.5099625, lng: -0.1419366,
    note: "Огни (короны) — с 12 ноября [[проверить]]. ✅", days: ["2026-11-19"] },
  { id: "hydepark", cat: "xmas", name: "Hyde Park Winter Wonderland", lat: 51.5074889, lng: -0.1622074,
    note: "<b>19 ноября</b> – 3 января; 19–20.11 с 12:00 до 22:00. ✅ только Чт 19 и Пт 20. Билеты заранее. Точка на карте — общая точка парка.",
    links: [{ t: "Winter Wonderland", u: "https://hydeparkwinterwonderland.com/tickets-guide/" }], days: ["2026-11-19"] },
  { id: "leadenhall", cat: "xmas", name: "Leadenhall Market", lat: 51.5127276, lng: -0.0833953,
    note: "Огни — 19 ноября, 18:00 [[проверить]]. ✅ с Чт 19 (опция)", days: ["2026-11-19"] },
  { id: "spitalfields", cat: "xmas", name: "Old Spitalfields Market", lat: 51.5196, lng: -0.075363,
    note: "Огни — с 11 ноября [[проверить]]. ✅", days: ["2026-11-18"] },
  { id: "covent", cat: "xmas", name: "Covent Garden", lat: 51.5119791, lng: -0.1227413,
    note: "Ёлка 55 ft, 300 000+ огней — с 12 ноября. ✅",
    links: [{ t: "Covent Garden", u: "https://www.coventgarden.london/event/covent-garden-lights-switch-on" }], days: ["2026-11-20"] },
  { id: "leicester", cat: "xmas", name: "Leicester Square — рынок", lat: 51.5103136, lng: -0.1306055,
    note: "Рынок (Underbelly): ~31 октября – 3 января [[проверить]]. ✅",
    links: [{ t: "Leicester Square", u: "https://leicestersquare.london/newsletters/christmas-in-leicester-square" }], days: ["2026-11-20"] },
  { id: "trafalgar", cat: "xmas", name: "Trafalgar Square", lat: 51.5084502, lng: -0.1284499,
    note: "Ёлку зажигают <b>в декабре</b>; в 2026 — 3 декабря (по сторонним источникам) [[проверить]]. ❌ 17–21.11 гореть не будет.",
    links: [{ t: "London.gov: Trafalgar", u: "https://www.london.gov.uk/who-we-are/city-halls-buildings-and-squares/trafalgar-square/christmas" }], days: ["2026-11-20"] },
  { id: "southbank", cat: "xmas", name: "Southbank Winter Market", lat: 51.5057791, lng: -0.116787,
    note: "Queen's Walk, у Темзы. 2 ноября – 4 января, 11:00–22:00. ✅",
    links: [{ t: "Southbank Winter Market", u: "https://southbank.london/whats-on/winter-market" }], days: ["2026-11-20"] },

  { id: "selfridges", cat: "shop", name: "Selfridges", lat: 51.5151766, lng: -0.1523899,
    addr: "400 Oxford St", note: "Витрины: дата 2026 не объявлена (в 2025 — 6 ноября) [[проверить]]. ❓ скорее всего", days: ["2026-11-19"] },
  { id: "fortnum", cat: "shop", name: "Fortnum & Mason", lat: 51.5081856, lng: -0.1381409,
    addr: "181 Piccadilly", note: "Витрины: обычно конец октября (точную дату магазин не публикует). ✅ скорее всего",
    links: [{ t: "Fortnum & Mason", u: "https://support.fortnumandmason.com/hc/en-gb/articles/4406498578961-When-do-your-Christmas-windows-appear-in-Piccadilly" }], days: ["2026-11-20"] },
  { id: "silvermans", cat: "shop", name: "Silvermans (5.11)", lat: 51.5229399, lng: -0.0394362,
    addr: "422–426 Mile End Rd, London E1 4PE", note: "Пн–пт 10:00–17:00. Есть 5.11 вживую, но <b>нет</b> Skyweight 36L и Utility Chest Pack.",
    links: [{ t: "silvermans.co.uk", u: "https://www.silvermans.co.uk/collections/brand-5-11" }], days: ["2026-11-18"] },

  { id: "stpancras", cat: "tr", name: "St Pancras International", lat: 51.5327196, lng: -0.1270027,
    note: "Luton Airport Express / Thameslink", days: ["2026-11-17", "2026-11-20"] },
  { id: "luton", cat: "tr", name: "London Luton Airport", lat: 51.8781015, lng: -0.3664255,
    note: "LTN · далеко на севере от центра — отдалите карту.", days: ["2026-11-17", "2026-11-20", "2026-11-21"], far: true }
];

/* ---------- ПЛАН ПО ДНЯМ (черновик) ----------
   items: time (необязательно), tz ("IL" | "UK", по умолчанию UK), text, places: [id…] */
const DAYS = [
  { id: "2026-11-17", short: "Вт 17", title: "Прилёт", area: "TLV → Luton → St Pancras", items: [
    { time: "~12:20", tz: "IL", text: "В Бен-Гурион к ~12:20; сдача багажа Эммы до 14:10." },
    { time: "15:20", tz: "IL", text: "Вылет W9 5302 TLV → LTN.", flight: 0 },
    { time: "18:45", text: "Посадка в Luton → DART → экспресс → St Pancras ~20:00–20:30.", places: ["luton", "stpancras"] },
    { text: "Заселение, ужин рядом с отелем, лёгкая прогулка." }
  ]},
  { id: "2026-11-18", short: "Ср 18", title: "Восток и Сити", area: "Liverpool St · Spitalfields · Mile End · Leyton", items: [
    { label: "Обед", text: "<b>Yuen Kee Dumplings</b> (Middlesex St, у Liverpool St).", places: ["yuenkee"] },
    { text: "Old Spitalfields Market (рождественские огни включают 11.11).", places: ["spitalfields"] },
    { text: "Эдмонт: <b>Silvermans</b>, Mile End Rd (пн–пт 10–17) — 5.11 вживую.", places: ["silvermans"] },
    { label: "Ужин", text: "<b>Burnt Smokehouse</b>, Leyton (техасское BBQ) [[часы работы]].", places: ["burnt"] }
  ]},
  { id: "2026-11-19", short: "Чт 19", title: "West End и Winter Wonderland", area: "Oxford St · Bond St/Mayfair · Hyde Park · Regent St · Carnaby · Piccadilly", items: [
    { label: "Утро", text: "Oxford St, витрины <b>Selfridges</b>, Bond St / Mayfair.", places: ["oxford", "selfridges", "bond"] },
    { time: "12:00", text: "<b>Hyde Park Winter Wonderland — день открытия сезона!</b> (билеты заранее).", places: ["hydepark"] },
    { label: "Вечер", text: "Огни <b>Regent St</b> и <b>Carnaby</b>.", places: ["regent", "carnaby"] },
    { label: "Ужин", text: "<b>Happy Bar &amp; Grill</b>, Piccadilly Circus.", places: ["happy"] },
    { time: "18:00", text: "Опция: включение огней Leadenhall Market (Сити).", places: ["leadenhall"], optional: true }
  ]},
  { id: "2026-11-20", short: "Пт 20", title: "Holborn, Covent Garden, Темза", area: "Holborn · Covent Garden · Leicester Sq · Trafalgar · Piccadilly · South Bank", items: [
    { time: "12:00", label: "Обед", text: "<b>Swiss Butter</b>, Holborn (открытие 12:00, без брони — лучше прийти к открытию).", places: ["swissbutter"] },
    { text: "Covent Garden (ёлка и украшения с 12.11) → рынок на Leicester Square → Trafalgar Square (ёлку зажгут только в декабре).", places: ["covent", "leicester", "trafalgar"] },
    { text: "Витрины <b>Fortnum &amp; Mason</b> на Piccadilly.", places: ["fortnum"] },
    { label: "Вечер", text: "<b>Southbank Winter Market</b> у Темзы.", places: ["southbank"] },
    { time: "~21:00–22:00", text: "Забрать вещи → поезд в Luton → отель у аэропорта.", places: ["stpancras", "luton"] }
  ]},
  { id: "2026-11-21", short: "Сб 21", title: "Вылет", area: "Luton → TLV", items: [
    { time: "~04:45", text: "Подъём; ~05:15 выход, в терминале 05:25–05:45." },
    { time: "до 06:25", text: "Сдача багажа (окно Wizz в Luton: 04:25–06:25).", places: ["luton"] },
    { time: "07:25", text: "Вылет W9 5301 → 14:25 Тель-Авив.", flight: 1 }
  ]}
];

/* ---------- ЖИЛЬЁ ----------
   ⚠️ ПОКА ПУСТО — заполнить реальными данными. НЕ выдумывать отели.
   Шаблон одной записи (все поля):
   {
     name: "Название отеля",
     area: "King's Cross",            // район
     tier: "эконом" | "средний" | "премиум",
     rating: 8.6,                     // оценка (например, Booking /10)
     reviews: 1234,                   // число отзывов
     totalGBP: 540,                   // итого за все ночи на двоих, £
     nights: 3,
     room: "Double, 18 м²",
     breakfast: "включён" | "нет" | "£15/чел",
     cancellation: "бесплатная отмена до 15.11",
     tube: "King's Cross St Pancras — 3 мин пешком",
     url: "https://…",
     photo: "https://…/photo.jpg",    // или локальный путь assets/…
     lat: 51.53, lng: -0.12,
     smokingRule: "Курить можно только на балконе номера" , // правило отеля о курении
     balcony: true,                   // есть ли балкон (ключевой критерий для Эдмонта)
     pros: ["…"], cons: ["…"],
     lastNight: false                 // true = вариант на ночь 20→21 (у Luton)
   }
*/
const HOTELS = [];

/* Рекомендации по жилью из черновика (показываются, пока HOTELS пуст и всегда как справка) */
const STAY_ADVICE = {
  slots: ["Ночи 17→18, 18→19, 19→20: ____________ (адрес / бронь / цена)", "Ночь 20→21: ____________"],
  areas: [
    "<b>King's Cross / St Pancras</b> — прямой поезд в Luton в обе стороны, Piccadilly/Victoria/Northern линии метро, удобно до West End и Сити.",
    "Альтернатива: <b>Holborn / Bloomsbury</b> — пешком до Swiss Butter, Covent Garden, Oxford St; 1–2 остановки до St Pancras."
  ],
  lastNight: "Аэропорт сам называет отели «в комфортной пешей доступности» от терминала: <b>Ibis / Ibis Budget London Luton Airport, Holiday Inn, Holiday Inn Express, Hampton by Hilton London Luton Airport</b> (<a href=\"https://www.london-luton.co.uk/to-and-from-lla/transit-passengers\" target=\"_blank\" rel=\"noopener\">london-luton.co.uk</a>). У Hampton by Hilton на сайте Hilton указано ~1 миля до терминала, рядом со станцией DART — пешком далековато с багажом [[проверить, какой ближе всего]]. <a href=\"https://www.hilton.com/en/hotels/ltnlahx-hampton-london-luton-airport/\" target=\"_blank\" rel=\"noopener\">Hampton by Hilton</a>"
};

/* ---------- КУРЕНИЕ ----------
   Формат: [{ title: "Заголовок раздела", items: [{ text: "Факт", sourceUrl: "https://…" }] }]
   Заполнено из smoking.json (проверенные источники; русский текст как есть). */
const SMOKING = [
  {
    title: "1. Где курить запрещено",
    items: [
      {
        text: "Закрытые общественные места и рабочие помещения: нельзя курить ни в каком закрытом рабочем помещении, общественном здании и в общественном транспорте.",
        sourceUrl: "https://www.gov.uk/smoking-at-work-the-law"
      },
      {
        text: "Health Act 2006, s.2: запрет действует в местах, открытых для публики, и в рабочих помещениях, но только в зонах, которые являются «enclosed» (закрытыми) или «substantially enclosed» (в основном закрытыми).",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/2006/28/section/2"
      },
      {
        text: "Что значит «substantially enclosed» (Smoke-free (Premises and Enforcement) Regulations 2006, reg.2; в силе с 1.7.2007): есть потолок или крыша, а проёмы в стенах в сумме занимают меньше половины площади стен. Проёмы, где стоят двери, окна и другие открывающиеся конструкции, в расчёт не идут. «Крышей» считается и навес, в том числе тканевая маркиза. Для веранды паба или кафе это значит: если над ней навес, а стены открыты меньше чем наполовину, курить там нельзя. Под открытым небом или при стенах, открытых наполовину и больше, курить можно, если заведение не против.",
        sourceUrl: "https://www.legislation.gov.uk/uksi/2006/3368/regulation/2"
      },
      {
        text: "Транспорт и такси: закрытый транспорт, которым пользуется публика (за плату или бесплатно, в том числе такси и миникэбы), или которым по работе пользуются несколько человек, является smoke-free (Smoke-free (Exemptions and Vehicles) Regulations 2007, reg.11(1)).",
        sourceUrl: "https://www.legislation.gov.uk/uksi/2007/765/regulation/11"
      },
      {
        text: "Машина с детьми: курить нельзя в закрытой машине, где больше одного человека и хотя бы одному меньше 18 лет (reg.11(1A), действует с 1.10.2015). Штраф £50 могут выписать и водителю, и курящему.",
        sourceUrl: "https://www.gov.uk/government/news/smoking-in-vehicles"
      },
      {
        text: "TfL: в автобусах, трамваях и поездах, на автобусных и железнодорожных станциях и на трамвайных платформах нельзя курить и пользоваться электронными сигаретами (TfL Conditions of Carriage, п.2.4; редакция действует с 24.09.2026). Отдельно про открытые наземные платформы там не сказано: запрет сформулирован для всей станции («in our bus and rail stations»).",
        sourceUrl: "https://content.tfl.gov.uk/tfl-conditions-of-carriage.pdf"
      },
      {
        text: "TfL Railway Byelaws (метро, Overground, DLR), byelaw 3: нельзя курить и держать в руках зажжённую сигарету, зажигалку или спичку на любом участке железной дороги, где висит знак о запрете курения.",
        sourceUrl: "https://content.tfl.gov.uk/railway-byelaws.pdf"
      },
      {
        text: "Национальные железнодорожные правила (National Rail): с 26.12.2025 там, где висит знак о запрете курения, нельзя пользоваться и электронными сигаретами.",
        sourceUrl: "https://www.gov.uk/government/publications/railway-byelaws"
      },
      {
        text: "Закон о запрете курения в помещениях на электронные сигареты не распространяется, решение принимает владелец заведения.",
        sourceUrl: "https://www.gov.uk/smoking-at-work-the-law"
      },
    ]
  },
  {
    title: "2. Tobacco and Vapes Act 2026 (бывший Tobacco and Vapes Bill)",
    items: [
      {
        text: "Статус: закон получил Royal Assent 29.04.2026 и теперь называется Tobacco and Vapes Act 2026 (2026 c. 18).",
        sourceUrl: "https://bills-api.parliament.uk/api/v1/Bills/3879"
      },
      {
        text: "Объявление правительства от 29.04.2026: законопроект стал законом, продажа табака людям, родившимся 1.01.2009 или позже, запрещается.",
        sourceUrl: "https://www.gov.uk/government/news/tobacco-and-vapes-bill-becomes-law"
      },
      {
        text: "Поколенческий запрет (s.1): запрещено продавать табачные изделия, курительные травяные смеси и сигаретную бумагу людям, родившимся 1.01.2009 или позже. Вступает в силу 1.01.2027 (s.175(3)). Эдмонта это не касается.",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/2026/18/section/1"
      },
      {
        text: "Сроки вступления в силу (s.175): части 1–4 вступают в силу через 6 месяцев с даты принятия. По нашему подсчёту от 29.04.2026 это конец октября 2026. Поколенческий запрет начинает действовать 1.01.2027, лицензирование розницы начнётся с даты, которую назначат отдельными регуляциями.",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/2026/18/section/175"
      },
      {
        text: "Расширение запрета на открытые места: s.142 даёт министру право регуляциями объявлять smoke-free любое место в Англии, которое открыто для публики или является рабочим местом, включая улицу. Статус: Prospective, то есть пока не в силе. Дату вступления назначат регуляциями (s.176(3)(a)).",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/2026/18/section/142"
      },
      {
        text: "Предложения правительства (консультация DHSC с 13.02 по 8.05.2026): запретить курение на детских площадках и у медицинских, социальных и учебных учреждений, ввести зоны без вейпов и нагреваемого табака. Летние веранды и прочие открытые зоны общепита, а также пляжи, правительство прямо исключает: «not considering extending the indoor smoking ban to outdoor hospitality settings». Между принятием регуляций и их вступлением в силу предлагается не меньше 6 месяцев.",
        sourceUrl: "https://www.gov.uk/government/consultations/smoke-free-heated-tobacco-free-and-vape-free-places-in-england/smoke-free-heated-tobacco-free-and-vape-free-places-in-england"
      },
      {
        text: "На 17.10.2026 на странице консультации написано «We are analysing your feedback», итогов пока нет. В ноябре 2026 запретов на улице (у школ, больниц, на площадках, на верандах) нет: это пока только предложения.",
        sourceUrl: "https://www.gov.uk/government/consultations/smoke-free-heated-tobacco-free-and-vape-free-places-in-england"
      },
    ]
  },
  {
    title: "3. Штрафы",
    items: [
      {
        text: "Курение в smoke-free месте является правонарушением (Health Act 2006, s.7).",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/2006/28/section/7"
      },
      {
        text: "Фиксированный штраф (FPN) за курение в smoke-free месте составляет £50, а при быстрой оплате снижается до £30 (Smoke-free (Penalties and Discounted Amounts) Regulations 2007, reg.2(5)). Если дело дойдёт до суда, штраф будет уровня 1 по стандартной шкале.",
        sourceUrl: "https://www.legislation.gov.uk/uksi/2007/764/regulation/2/made"
      },
      {
        text: "По данным gov.uk, суд может назначить работнику, закурившему на рабочем месте, штраф до £200.",
        sourceUrl: "https://www.gov.uk/smoking-at-work-the-law"
      },
      {
        text: "Окурки по закону считаются мусором: «litter» включает выброшенные окурки сигарет и сигар (Environmental Protection Act 1990, s.98(5A)).",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/1990/43/section/98"
      },
      {
        text: "Размер штрафа за мусор устанавливает местный совет (EPA 1990, s.88(6A)). Если совет сумму не установил, в Англии действует £100.",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/1990/43/section/88"
      },
      {
        text: "Допустимый диапазон для советов в Англии с 1.09.2026 составляет от £65 до £750 (Environmental Offences (Fixed Penalties) (England) Regulations 2017, reg.5, в редакции SI 2026/816).",
        sourceUrl: "https://www.legislation.gov.uk/uksi/2017/1050/regulation/5"
      },
      {
        text: "Westminster (Сохо, Вест-Энд и т. д.): за мусор, код CN1 (EPA s.87/88), штраф £200, а при оплате в течение 10 дней £120. В суде можно получить до £2,500. Таблица датирована апрелем 2024, но сейчас именно она висит на странице совета.",
        sourceUrl: "https://www.westminster.gov.uk/sites/default/files/media/documents/Offence%20Codes%2C%20Description%20of%20Offences%20and%20Penalties%20Apr%2024_1.pdf"
      },
      {
        text: "Совет Westminster подтверждает, что выписывает штрафы и за обычный мусор, и за мусор от курения («littering - both general and smoking litter»).",
        sourceUrl: "https://www.westminster.gov.uk/recycling-and-rubbish/waste-strategy-and-enforcement/fixed-penalty-notice-fpns"
      },
    ]
  },
  {
    title: "4. Беспошлинный ввоз из Израиля в Великобританию",
    items: [
      {
        text: "Табак: можно ввезти что-то одно из списка: 200 сигарет, 100 сигарилл, 50 сигар, 250 г табака или 200 стиков для нагреваемого табака. Нормы можно делить: например, 100 сигарет и 25 сигар (по половине каждой нормы). Если вы превысили норму, платите пошлину и налог за весь табак этой категории.",
        sourceUrl: "https://www.gov.uk/bringing-goods-into-uk-personal-use/arriving-in-Great-Britain"
      },
      {
        text: "Жидкость для вейпа: до 50 мл. Если больше, пошлина берётся со всего объёма.",
        sourceUrl: "https://www.gov.uk/bringing-goods-into-uk-personal-use/arriving-in-Great-Britain"
      },
      {
        text: "Возраст: на gov.uk указано, что беспошлинных норм нет для лиц младше 17 лет (а не 18). Ограничения в 18 лет на этой странице нет.",
        sourceUrl: "https://www.gov.uk/bringing-goods-into-uk-personal-use/arriving-in-Great-Britain"
      },
      {
        text: "Всё, что сверх нормы, нужно задекларировать. Задекларировать онлайн можно за 5 дней (120 часов) до прилёта. Если нарушить правила, товар могут изъять и выписать штраф.",
        sourceUrl: "https://www.gov.uk/bringing-goods-into-uk-personal-use"
      },
    ]
  },
  {
    title: "5. Цена пачки (20 шт.)",
    items: [
      {
        text: "ONS (RPI, средняя цена пачки 20 king size с фильтром): средняя за 2024 год 1585 пенсов, то есть £15.85. Последнее значение в ряду, январь 2025, равно £16.60. Более свежих данных в этом ряду нет, хотя страница обновлена 16.09.2026.",
        sourceUrl: "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/czmp/mm23"
      },
      {
        text: "Акциз HMRC на сигареты с 1.10.2026: £394.09 за 1000 штук плюс 16.5% от розничной цены. По оценке gov.uk, пачка из 20 подорожает на £1.21. Минимальный акциз составляет £518.75 за 1000 штук, по нашему подсчёту около £10.38 на пачку из 20 без НДС. Официальной средней цены пачки на ноябрь 2026 мы не нашли.",
        sourceUrl: "https://www.gov.uk/government/publications/rates-and-allowances-excise-duty-tobacco-duty/excise-duty-tobacco-duty-rates"
      },
    ]
  },
  {
    title: "Практические советы",
    items: [
      {
        text: "Курите только на улице или там, где над вами нет навеса или стены открыты хотя бы наполовину. Если на веранде висит знак «No smoking», он обязателен и для вас. Не курите и не парите нигде на территории TfL, включая наземные платформы. Окурки бросайте только в урну или карманную пепельницу: в Westminster за брошенный окурок штраф £200.",
        sourceUrl: "https://content.tfl.gov.uk/tfl-conditions-of-carriage.pdf"
      },
      {
        text: "Из Израиля везите не больше 200 сигарет (или эквивалента по другим нормам) и 50 мл жидкости для вейпа. Сигареты в Великобритании дорогие: в 2024 году пачка в среднем стоила £15.85.",
        sourceUrl: "https://www.gov.uk/bringing-goods-into-uk-personal-use/arriving-in-Great-Britain"
      },
    ]
  },
];

/* ---------- РОЖДЕСТВО: что работает 17–21.11 ---------- */
const XMAS = [
  ["Огни <b>Regent St</b> (ангелы)", "5 ноября", "✅"],
  ["Огни <b>Carnaby St</b> (тема 90-х)", "4 ноября", "✅"],
  ["Огни <b>Oxford St</b>", "дата не объявлена, ожидают ~2 ноября [[проверить]]", "✅ скорее всего"],
  ["<b>Covent Garden</b>: ёлка 55 ft, 300 000+ огней", "12 ноября", "✅"],
  ["Огни <b>Bond St</b> (короны)", "12 ноября [[проверить]]", "✅"],
  ["Огни West End: Piccadilly, Leicester Sq, St Martin's Lane", "~1 ноября (оценка) [[проверить]]", "✅ скорее всего"],
  ["Рынок <b>Leicester Square</b> (Underbelly)", "~31 октября – 3 января [[проверить]]", "✅"],
  ["<b>Southbank Winter Market</b> (Queen's Walk, Темза)", "2 ноября – 4 января, 11:00–22:00", "✅"],
  ["<b>Hyde Park Winter Wonderland</b>", "<b>19 ноября</b> – 3 января; 19–20.11 с 12:00 до 22:00", "✅ только Чт 19 и Пт 20"],
  ["Old Spitalfields — огни", "11 ноября [[проверить]]", "✅"],
  ["Leadenhall Market — огни", "19 ноября, 18:00 [[проверить]]", "✅ с Чт 19"],
  ["Витрины <b>Fortnum &amp; Mason</b>", "обычно конец октября (точную дату магазин не публикует)", "✅ скорее всего"],
  ["Витрины <b>Selfridges</b>", "дата 2026 не объявлена (в 2025 — 6 ноября) [[проверить]]", "❓ скорее всего"],
  ["Ёлка на <b>Trafalgar Square</b>", "зажигают <b>в декабре</b>; в 2026 — 3 декабря (по сторонним источникам) [[проверить]]", "❌ не будет гореть"]
];
const XMAS_SOURCES = "Источники: <a href=\"https://www.regentstreetonline.com/events/switch-on-2026\" target=\"_blank\" rel=\"noopener\">Regent Street</a> · <a href=\"https://www.coventgarden.london/event/covent-garden-lights-switch-on\" target=\"_blank\" rel=\"noopener\">Covent Garden</a> · <a href=\"https://www.shaftesburycapital.com/getContentAsset/543c3303-0b2e-4612-8398-e9a6acc7b428/a7351c63-0bbb-4a79-a8a6-3c91dee7f00a/cg-and-carnaby-combined-switch-on-announcement.pdf?language=en\" target=\"_blank\" rel=\"noopener\">пресс-релиз Carnaby/Covent Garden</a> · <a href=\"https://hydeparkwinterwonderland.com/tickets-guide/\" target=\"_blank\" rel=\"noopener\">Winter Wonderland</a> · <a href=\"https://southbank.london/whats-on/winter-market\" target=\"_blank\" rel=\"noopener\">Southbank Winter Market</a> · <a href=\"https://leicestersquare.london/newsletters/christmas-in-leicester-square\" target=\"_blank\" rel=\"noopener\">Leicester Square</a> · <a href=\"https://support.fortnumandmason.com/hc/en-gb/articles/4406498578961-When-do-your-Christmas-windows-appear-in-Piccadilly\" target=\"_blank\" rel=\"noopener\">Fortnum &amp; Mason</a> · <a href=\"https://www.london.gov.uk/who-we-are/city-halls-buildings-and-squares/trafalgar-square/christmas\" target=\"_blank\" rel=\"noopener\">London.gov: Trafalgar</a> · <a href=\"https://londonist.com/london/christmas-in-london/when-are-london-s-christmas-lights-switched-on\" target=\"_blank\" rel=\"noopener\">Londonist: даты огней</a>";
const XMAS_ROUTE = "Маршрут огней: Oxford Circus → Regent St → Carnaby → Piccadilly (Fortnum &amp; Mason) → Leicester Sq → Covent Garden → Trafalgar Sq → по Hungerford Bridge на South Bank.";
const XMAS_ROUTE_PLACES = ["oxford", "regent", "carnaby", "fortnum", "leicester", "covent", "trafalgar", "southbank"];

/* ---------- ШОПИНГ 5.11 / UF Pro ---------- */
const SHOP = {
  intro: "Официальных магазинов 5.11 и UF Pro в Великобритании нет.",
  silvermans: "<b>Silvermans</b> — Лондон<br>422–426 Mile End Rd, London E1 4PE · пн–пт 10:00–17:00<br><span class=\"small\">Есть 5.11 вживую, но <b>нет</b> Skyweight 36L и Utility Chest Pack.</span> <a href=\"https://www.silvermans.co.uk/collections/brand-5-11\" target=\"_blank\" rel=\"noopener\">silvermans.co.uk</a>",
  tactreeTitle: "<b>TacTree</b> — флагманский дилер 5.11 в UK (Телфорд, онлайн)",
  tactree: [
    { item: "Skyweight 36L Pack", url: "https://tactree.co.uk/products/511-skyweight-36l-pack", color: "Volcanic (S/M, L/XL в наличии)", price: "£180.50" },
    { item: "Skyweight Utility Chest Pack", url: "https://tactree.co.uk/products/511-skyweight-utility-chest-pack", color: "Volcanic (в наличии)", price: "£61.75" }
  ],
  priceDate: "17.10.2026",
  tactreeNote: "Вариант: заказать доставку на лондонский адрес (отель) — когда будет бронь; сроки доставки [[проверить]].",
  more: [
    "<b>Оранжевый Chest Pack</b> — только на сайте 5.11 США: <b>$70</b>. <a href=\"https://www.511tactical.com/skyweight-utility-chest-pack.html\" target=\"_blank\" rel=\"noopener\">511tactical.com</a>",
    "<b>UF Pro</b> — онлайн в UK Tactical. <a href=\"https://www.uktactical.com/uf-pro/clothing-and-footwear/tactical-clothing\" target=\"_blank\" rel=\"noopener\">uktactical.com</a>"
  ],
  warn: "⚠️ Рюкзак 36L = нужен доп. багаж для Эдмонта на обратный рейс (см. «Перелёт»)."
};

/* ---------- РОЛИКИ ЭММЫ (ссылки из чата, как есть, не проверялись) ---------- */
const REELS = [
  "https://vt.tiktok.com/ZSqNnttfK/",
  "https://www.facebook.com/share/r/1C8m7M7ANc/",
  "https://www.facebook.com/share/r/1DPhEoZgGF/",
  "https://www.instagram.com/reel/DZ-e-aPo4ak/",
  "https://www.instagram.com/reel/DcjNbA_qgYo/",
  "https://www.instagram.com/reel/DbiUDuygQTc/",
  "https://www.instagram.com/reel/Da8u0y_s8F9/",
  "https://www.instagram.com/reel/DXRo3NHBC7B/",
  "https://londoncitybustours.com/londons-best-christmas-markets.html",
  "https://www.facebook.com/share/p/1hJNffLMBY/",
  "https://vt.tiktok.com/ZSqCB5wNe/",
  "https://www.facebook.com/share/p/1ByZmXLDu8/",
  "https://www.facebook.com/share/p/19ZeLyrpUx/"
];

/* ---------- ДЕТИ (дома) ----------
   Пустые поля для заполнения. Значения можно вписать прямо на сайте —
   они сохраняются только в этом браузере (localStorage), на сайт не публикуются.
   Можно также задать value: "…" здесь (но помните: сайт публичный). */
const KIDS = [
  { key: "who",       label: "Кто остаётся с детьми" },
  { key: "when",      label: "Когда (даты / график)" },
  { key: "contact",   label: "Контакты" },
  { key: "school",    label: "Школа / кружки 17–21.11 (кто возит)" },
  { key: "home",      label: "Ключи / еда / деньги" },
  { key: "emergency", label: "Экстренный контакт" }
];

/* ---------- ЧЕК-ЛИСТЫ (галочки сохраняются в localStorage) ---------- */
const CHECKLISTS = [
  { id: "docs", title: "📄 Документы", items: [
    { id: "eta-ed", text: "ETA UK — Эдмонт (£20) — получить подтверждение по email" },
    { id: "eta-em", text: "ETA UK — Эмма (£20) — получить подтверждение по email" },
    { id: "pass",   text: "Паспорта (те же, на которые оформлено ETA) — срок действия [[проверить]]" },
    { id: "ins",    text: "Страховка — TBD (какая и на кого)" },
    { id: "ci-out", text: "Онлайн-регистрация Wizz туда: с 16.11 15:20 (время Израиля), до 3 ч до вылета" },
    { id: "ci-back",text: "Онлайн-регистрация Wizz обратно: с 20.11 07:25 (время Лондона), до 3 ч до вылета" },
    { id: "bp",     text: "Посадочные Wizz — после онлайн-регистрации (за 24 ч)" },
    { id: "ww",     text: "Билеты на Winter Wonderland (Чт 19.11)" },
    { id: "luton",  text: "Билет на поезд в Luton вечером 20.11 и бронь отеля у аэропорта" },
    { id: "drive",  text: "Папка в Google Drive для документов (ещё не создана)" }
  ]},
  { id: "pack", title: "🧳 Сборы", items: [
    { id: "bag",    text: "Сумка под сиденье ≤ <b>40×30×20 см, 10 кг</b> (каждому) — <a href=\"https://www.wizzair.com/en-gb/help-centre/booking-information-and-services/baggage/baggage-allowance/cabin-baggage\" target=\"_blank\" rel=\"noopener\">Wizz</a>" },
    { id: "26kg",   text: "Сдаваемый Эммы ≤ 26 кг — взвесить дома" },
    { id: "extra",  text: "Доп. багаж для Эдмонта на обратный рейс (если покупаем рюкзак)" },
    { id: "plug",   text: "Переходник <b>UK тип G</b> (три плоских штыря), 230 В; у розеток есть выключатель — <a href=\"https://www.visitlondon.com/traveller-information/essential-information/electricity\" target=\"_blank\" rel=\"noopener\">Visit London</a>" },
    { id: "card",   text: "Бесконтактная карта / телефон (Apple/Google Pay) для метро и автобусов — одна и та же карта на вход и выход; дневной лимит (capping). Комиссия банка за иностранную валюту возможна. — <a href=\"https://tfl.gov.uk/travel-information/visiting-london/getting-around-london/best-ways-for-visitors-to-pay\" target=\"_blank\" rel=\"noopener\">TfL</a>" },
    { id: "cash",   text: "Немного фунтов наличными (по желанию)" },
    { id: "jacket", text: "Тёплая куртка" },
    { id: "rain",   text: "Непромокаемый слой + зонт" },
    { id: "shoes",  text: "Удобная обувь" },
    { id: "hat",    text: "Шапка / перчатки на утро" }
  ]}
];

const WEATHER = "<b>Климат середины ноября</b> (Met Office, норма 1991–2020, Heathrow): днём в среднем <b>~11.5 °C</b> (макс. 11.47), ночью <b>~5 °C</b> (мин. 5.26), осадки <b>~67 мм</b> за месяц, <b>~11 дней</b> с дождём ≥1 мм, солнца мало (~71 ч за месяц). Вокруг дат поездки 17–21.11: восход примерно <b>07:21–07:28</b>, закат <b>16:03–16:08</b>, световой день <b>~8 ч 35 мин – 8 ч 47 мин</b> (время Лондона). → тёплая куртка, непромокаемый слой, зонт, удобная обувь, шапка/перчатки на утро (особенно к раннему выезду в Luton). <a href=\"https://www.metoffice.gov.uk/research/climate/maps-and-data/location-specific-long-term-averages/gcpsvg3nc\" target=\"_blank\" rel=\"noopener\">Met Office: Heathrow</a> · <a href=\"https://www.timeanddate.com/sun/uk/london?month=11&amp;year=2026\" target=\"_blank\" rel=\"noopener\">timeanddate: восход/закат, ноябрь 2026</a>.";

/* ---------- ОТКРЫТЫЕ ВОПРОСЫ ---------- */
const QUESTIONS = [
  "Жильё 17–20.11: район (King's Cross / Holborn?), бюджет, бронь.",
  "Последняя ночь: отель у Luton (какой ближе к терминалу?) или центр + ночной поезд/такси.",
  "Покупаем ли рюкзак 36L? Если да — докупить багаж Эдмонту и решить: заказ в TacTree с доставкой в отель или нет.",
  "Выбирать ли места в самолёте (тогда онлайн-регистрация за 30 дней)?",
  "Кто с детьми, график, контакты.",
  "Страховка — какая и на кого.",
  "Создать папку в Google Drive для документов.",
  "Swiss Butter: актуальная цена стейка (£18? £19?).",
  "Часы работы Burnt Smokehouse и Yuen Kee на ноябрь.",
  "Точное расписание ночных Thameslink на 21.11 (National Rail, ближе к дате)."
];
