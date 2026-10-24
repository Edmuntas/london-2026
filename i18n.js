/* i18n: язык сайта (ru по умолчанию, he = иврит, RTL).
   Выбор: ?lang=he|ru в URL → localStorage "ldn26.lang" → ru.
   Контент на иврите лежит в data.he.js / xmas-data.he.js (параллельные файлы с теми же именами переменных);
   index.html подключает нужный файл. Здесь — строки интерфейса. */
(function () {
  "use strict";
  var KEY = "ldn26.lang", OK = { ru: 1, he: 1 };
  var lang = "ru";
  try {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && OK[q]) { lang = q; localStorage.setItem(KEY, q); }
    else { var s = localStorage.getItem(KEY); if (s && OK[s]) lang = s; }
  } catch (e) {}

  var S = {
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
      forecastUpdated: "обновлено", precipProb: "осадки",
      kidsNote: "Заполняется на этом устройстве (сохраняется только в браузере, на сайт не публикуется).",
      reelsNote: "Ссылки из чата, как есть (не проверялись).",
      footCheck: "Всё с пометкой {check} не подтверждено официальным источником.",
      checkWord: "проверить", lastNightTag: "последняя ночь", stayCrit: "Для Эдмонта ключевой критерий — балкон, где разрешено курить.",
      docTitle: "Лондон · 17–21.11.2026 · Эдмонт и Эмма",
      fromHomeWalk: "От дома", fromHomeTransit: "Маршрут от дома",
      stayChosenShort: "🏠 32 Roland Gardens, SW7", stayVariants: "вариант(ов)", stayNone: "не забронировано (TBD)",
      heroStay: "Жильё", heroEta: "нужно оформить, £20/чел.",
      timeOfIL: "время Израиля", timeOfUK: "время Лондона",
      baggage: "Багаж", passenger: "Пассажир", included: "Что включено",
      option: "Вариант", time: "Время", priceNotes: "Цена / заметки", price: "Цена",
      arrHead: "Прилёт Вт 17.11 (18:45)", homeTransfers: "🏠 Luton ↔ Наш дом (SW7), на двоих",
      arrSub: "Прилёт Вт 17.11", depSub: "Вылет Сб 21.11 (07:25, сдача багажа 04:25–06:25)",
      sources: "Источники:", depHead: "Вылет Сб 21.11 (07:25) — что реально успевает",
      docsNote: "Отметки — в чек-листе «Документы» ниже.",
      wx0: "ясно", wx1: "переменная облачность", wx45: "туман", wx51: "морось", wx61: "дождь", wx71: "снег", wx80: "ливни", wx85: "снегопад", wx95: "гроза",
      homeChosen: "<b>Наш дом</b> — выбрано", balconyUnknown: "балкон — ?",
      stayH: "🏨 Жильё", stayChosen: "🏠 Наш дом выбран.", stayTbd: "TBD — не забронировано.", allShort: "Все",
      stayAreaH: "Рекомендация по району (17–20.11)", stayLastH: "Последняя ночь (20→21.11)",
      xmasFail: "Раздел не загрузился.",
      areas: "Районы", markets: "Ярмарки",
      coordsNote: "Координаты: OpenStreetMap Nominatim; для Yuen Kee, Swiss Butter и Burnt — центр почтового индекса (postcodes.io), точность ±50–100 м.",
      areasApprox: "Контуры приблизительные.", showOnMap: "🗺 Показать на карте",
      xmasH: "🎄 Рождественский Лондон: что работает 17–21.11", what: "Что", fromDate: "С какого числа", inDates: "17–21.11?",
      lightsRoute: "🗺 Маршрут огней на карте", allMarkets: "🎪 Все ярмарки и катки",
      shopH: "🎒 Шопинг 5.11 / UF Pro (для Эдмонта)", item: "Товар", color: "Цвет",
      kidsH: "👧 Дети (дома)", kidsTbd: "TBD — договорённости неизвестны.", questionsH: "❓ Открытые вопросы",
      stations: "Станции:", mapFail: "Карта не загрузилась. Адреса — во вкладке «Ещё → Все места».",
      locate: "Где я", close: "Закрыть", langLabel: "Язык",
      /* xmas.js */
      xStOpen: "Открыто в наши даты", xStOpenS: "Открыто", xStCheck: "Уточнить", xStCheckS: "Проверить",
      xStClosed: "Ещё закрыто / нет в наши даты", xStClosedS: "Закрыто", xClosed: "закрыто",
      xWhen: "Когда", xEntry: "Вход", xTube: "Метро", xRoute: "Маршрут", xSite: "Сайт", xOnMap: "На карте",
      xDates: "Даты", xHours: "Часы", xBooking: "Бронь", xAddr: "Адрес",
      xHeroH: "Рождественские ярмарки", xHeroP: "Ярмарки, огни, катки и световые тропы Лондона — что работает 18–20 ноября 2026",
      xDay: "День", xAllDays: "Все дни", xWalkShow: "Показать прогулку по огням", xWalkHide: "Скрыть прогулку",
      xKm: "км", xWalkMin: "мин чистой ходьбы, 2–2,5 ч с остановками. Старт",
      xFoot: "Данные сверены с официальными сайтами 17.10.2026. {check} — даты/часы 2026 ещё не опубликованы.",
      xNone: "Ничего не выбрано", xCount: "Мест: {n} · открыто: {o}"
    },
    he: {
      tabPlan: "תוכנית", tabMap: "מפה", tabTrip: "הטיסה", tabStay: "לינה", tabXmas: "שווקים", tabMore: "עוד",
      israel: "ישראל", london: "לונדון", toDepart: "עד ההמראה", toReturn: "עד טיסת החזור",
      flyingHome: "טסים הביתה ✈️", tripOver: "הטיול הסתיים 🏠", day: "יום", of: "מתוך",
      d: "י׳", h: "ש׳", m: "דק׳", all: "כל הימים", route: "מסלול", citymapper: "Citymapper",
      onMap: "במפה", details: "פרטים", site: "אתר", inPlan: "בתוכנית", approx: "הקואורדינטות הן מרכז המיקוד, ±50–100 מ׳.",
      planTitle: "תוכנית לפי ימים", draft: "טיוטה", today: "היום", showDayMap: "🗺 היום במפה",
      flights: "טיסות", luton: "הדרך מ/אל Luton", docs: "מסמכים", checklists: "רשימות", weather: "מזג אוויר",
      places: "כל המקומות", xmas: "חג המולד 17–21.11", shop: "5.11 / UF Pro", reels: "הסרטונים של אמה", kids: "ילדים",
      smoking: "עישון", questions: "שאלות", dep: "המראה", arr: "נחיתה", inAir: "בדרך",
      timeIL: "ישראל", timeUK: "לונדון", reset: "איפוס", resetQ: "להסיר את כל הסימונים ברשימה הזו?",
      install: "📲 התקנה למסך הבית", iosHint: "iPhone: ״שיתוף״ ← ״הוסף למסך הבית״",
      offlineReady: "מוכן לעבודה ללא רשת ✓", offline: "אין רשת — מוצג המידע השמור",
      noGeo: "המיקום אינו זמין", stayEmpty: "רשימת המלונות עדיין ריקה — הנתונים יתווספו בהמשך.",
      onlyBalcony: "🚬 רק עם מרפסת", sortPrice: "מחיר ↑", sortRating: "דירוג ↓",
      main3: "17→20.11", lastNight: "הלילה האחרון 20→21", total: "סה״כ", perNight: "/לילה",
      nights: "לילות", room: "חדר", breakfast: "ארוחת בוקר", cancel: "ביטול", tube: "רכבת תחתית",
      balconyYes: "יש מרפסת", balconyNo: "אין מרפסת", smokingRule: "עישון", reviews: "ביקורות",
      pros: "יתרונות", cons: "חסרונות", smokingEmpty: "הפרק ימולא ממקורות רשמיים מאומתים.",
      source: "מקור",
      forecastTitle: "תחזית (Open-Meteo)",
      forecastTrip: "תחזית לתאריכי הטיול 17–21.11.2026",
      forecastNear: "תאריכי הטיול עדיין מחוץ לטווח של 16 יום. למטה — הימים הקרובים; התחזית ל־17–21.11 תופיע בערך מ־1–2.11.",
      forecastCached: "אין רשת — מוצגת התחזית האחרונה שנשמרה",
      forecastFail: "התחזית אינה זמינה כרגע (אין רשת ואין נתונים שמורים).",
      forecastUpdated: "עודכן", precipProb: "משקעים",
      kidsNote: "ממולא במכשיר הזה (נשמר רק בדפדפן ואינו מתפרסם באתר).",
      reelsNote: "קישורים מהצ׳אט, כמו שהם (לא נבדקו).",
      footCheck: "כל מה שמסומן {check} לא אומת במקור רשמי.",
      checkWord: "לבדוק", lastNightTag: "הלילה האחרון", stayCrit: "הקריטריון המרכזי לאדמונט — מרפסת שמותר לעשן בה.",
      docTitle: "לונדון · 17–21.11.2026 · אדמונט ואמה",
      fromHomeWalk: "מהבית", fromHomeTransit: "מסלול מהבית",
      stayChosenShort: "🏠 32 Roland Gardens, SW7", stayVariants: "אפשרויות", stayNone: "לא הוזמן (TBD)",
      heroStay: "לינה", heroEta: "צריך להוציא, £20 לאדם.",
      timeOfIL: "שעון ישראל", timeOfUK: "שעון לונדון",
      baggage: "כבודה", passenger: "נוסע/ת", included: "מה כלול",
      option: "אפשרות", time: "זמן", priceNotes: "מחיר / הערות", price: "מחיר",
      arrHead: "נחיתה ג׳ 17.11 (18:45)", homeTransfers: "🏠 Luton ↔ הבית שלנו (SW7), לשניים",
      arrSub: "נחיתה ג׳ 17.11", depSub: "המראה שבת 21.11 (07:25, מסירת כבודה 04:25–06:25)",
      sources: "מקורות:", depHead: "המראה שבת 21.11 (07:25) — מה באמת מספיקים",
      docsNote: "הסימונים — ברשימת ״מסמכים״ למטה.",
      wx0: "בהיר", wx1: "מעונן חלקית", wx45: "ערפל", wx51: "טפטוף", wx61: "גשם", wx71: "שלג", wx80: "ממטרים", wx85: "שלג כבד", wx95: "סופת רעמים",
      homeChosen: "<b>הבית שלנו</b> — נבחר", balconyUnknown: "מרפסת — ?",
      stayH: "🏨 לינה", stayChosen: "🏠 הבית שלנו נבחר.", stayTbd: "TBD — לא הוזמן.", allShort: "הכול",
      stayAreaH: "המלצה לאזור (17–20.11)", stayLastH: "הלילה האחרון (20→21.11)",
      xmasFail: "הפרק לא נטען.",
      areas: "אזורים", markets: "שווקים",
      coordsNote: "קואורדינטות: OpenStreetMap Nominatim; עבור Yuen Kee, Swiss Butter ו־Burnt — מרכז המיקוד (postcodes.io), דיוק ±50–100 מ׳.",
      areasApprox: "הגבולות משוערים.", showOnMap: "🗺 הצגה במפה",
      xmasH: "🎄 לונדון של חג המולד: מה פתוח ב־17–21.11", what: "מה", fromDate: "מאיזה תאריך", inDates: "17–21.11?",
      lightsRoute: "🗺 מסלול האורות במפה", allMarkets: "🎪 כל השווקים ומשטחי ההחלקה",
      shopH: "🎒 קניות 5.11 / UF Pro (לאדמונט)", item: "מוצר", color: "צבע",
      kidsH: "👧 הילדים (בבית)", kidsTbd: "TBD — הסידורים עדיין לא ידועים.", questionsH: "❓ שאלות פתוחות",
      stations: "תחנות:", mapFail: "המפה לא נטענה. הכתובות — בלשונית ״עוד ← כל המקומות״.",
      locate: "איפה אני", close: "סגירה", langLabel: "שפה",
      xStOpen: "פתוח בתאריכים שלנו", xStOpenS: "פתוח", xStCheck: "לבירור", xStCheckS: "לבדוק",
      xStClosed: "עדיין סגור / לא בתאריכים שלנו", xStClosedS: "סגור", xClosed: "סגור",
      xWhen: "מתי", xEntry: "כניסה", xTube: "רכבת", xRoute: "מסלול", xSite: "אתר", xOnMap: "במפה",
      xDates: "תאריכים", xHours: "שעות", xBooking: "הזמנה", xAddr: "כתובת",
      xHeroH: "שווקי חג המולד", xHeroP: "שווקים, אורות, משטחי החלקה ושבילי אור בלונדון — מה פתוח ב־18–20 בנובמבר 2026",
      xDay: "יום", xAllDays: "כל הימים", xWalkShow: "הצגת סיור האורות", xWalkHide: "הסתרת הסיור",
      xKm: "ק״מ", xWalkMin: "דק׳ הליכה נטו, 2–2.5 שעות עם עצירות. יציאה",
      xFoot: "הנתונים הוצלבו עם האתרים הרשמיים ב־17.10.2026. {check} — התאריכים/השעות ל־2026 עוד לא פורסמו.",
      xNone: "לא נבחר דבר", xCount: "מקומות: {n} · פתוחים: {o}"
    }
  };

  function t(k, vars) {
    var v = (S[lang] && S[lang][k] != null) ? S[lang][k] : (S.ru[k] != null ? S.ru[k] : k);
    if (vars) Object.keys(vars).forEach(function (x) { v = v.split("{" + x + "}").join(vars[x]); });
    return v;
  }
  function setLang(l) {
    if (!OK[l] || l === lang) return;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    var u = new URL(location.href);
    if (u.searchParams.has("lang")) { u.searchParams.delete("lang"); location.replace(u.pathname + u.search + u.hash); }
    else location.reload();
  }
  function switcherHtml() {
    return '<div class="langsw" role="group" aria-label="' + t("langLabel") + '">' +
      '<button type="button" data-lang="ru" lang="ru" aria-pressed="' + (lang === "ru") + '">RU</button>' +
      '<button type="button" data-lang="he" lang="he" aria-pressed="' + (lang === "he") + '">עב</button></div>';
  }

  var html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "he" ? "rtl" : "ltr";
  window.I18N = { lang: lang, rtl: lang === "he", locale: lang === "he" ? "he-IL" : "ru-RU", t: t, setLang: setLang, switcherHtml: switcherHtml, strings: S };
})();
