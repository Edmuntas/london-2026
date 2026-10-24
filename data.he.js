/* =====================================================================
   נתוני הטיול — עברית. מקביל ל־data.js (אותם שמות משתנים, אותם id/קואורדינטות/קישורים).
   לונדון · 17–21.11.2026 · אדמונט ואמה
   פרטיות: בלי מספר הזמנה, שם משפחה או נתוני דרכון. רק שמות פרטיים.
   התווית [[…]] מוצגת כתג כתום ״לבדוק״.
   ===================================================================== */

const TRIP = {
  title: "לונדון 🎄",
  travellers: "אדמונט ואמה · 2 מבוגרים",
  dates: "ג׳ 17.11 ← שבת 21.11.2026",
  nightsNote: "4 לילות, 3 ימים מלאים",
  version: "v1.0 · 17.10.2026",
  departUTC: "2026-11-17T13:20:00Z",
  returnDepartUTC: "2026-11-21T07:25:00Z",
  homeUTC: "2026-11-21T12:25:00Z"
};

/* ---------- טיסות ---------- */
const FLIGHTS = [
  { dir: "הלוך", date: "ג׳ 17.11.2026", no: "W9 5302", airline: "Wizz Air",
    from: "TLV", fromName: "תל אביב (נתב״ג)", to: "LTN", toName: "London Luton",
    depUTC: "2026-11-17T13:20:00Z", arrUTC: "2026-11-17T18:45:00Z",
    depTz: "Asia/Jerusalem", arrTz: "Europe/London" },
  { dir: "חזור", date: "שבת 21.11.2026", no: "W9 5301", airline: "Wizz Air",
    from: "LTN", fromName: "London Luton", to: "TLV", toName: "תל אביב (נתב״ג)",
    depUTC: "2026-11-21T07:25:00Z", arrUTC: "2026-11-21T12:25:00Z",
    depTz: "Europe/London", arrTz: "Asia/Jerusalem" }
];

const BAGGAGE = [
  { who: "אמה",   what: "מזוודה לבטן <b>26 ק״ג</b> + תיק חינמי מתחת למושב" },
  { who: "אדמונט", what: "רק תיק חינמי מתחת למושב: <b>40×30×20 ס״מ, עד 10 ק״ג</b>" }
];

const FLIGHT_NOTES = [
  "המושבים לא נבחרו. צ׳ק־אין אונליין בלי מושב בתשלום נפתח <b>24 שעות</b> לפני הטיסה ונסגר <b>3 שעות</b> לפני ההמראה (עם מושב בתשלום — 30 יום לפני). <a href='https://www.wizzair.com/en-gb/help-centre/check-in-and-boarding/check-in/check-in-and-baggage-drop-off-times' target='_blank' rel='noopener'>Wizz: צ׳ק־אין</a>",
  "מסירת כבודה ב־Wizz: <b>נתב״ג</b> — נפתחת 180 דק׳ לפני, נסגרת <b>70 דק׳ לפני</b> (17.11 ← עד 14:10); <b>Luton</b> — נפתחת 180 דק׳ לפני, נסגרת <b>60 דק׳ לפני</b> (21.11 ← מ־04:25 עד <b>06:25</b>). בשדות אחרים הסטנדרט הוא 2 שעות / 40 דק׳ — ב־Luton ובנתב״ג הכלל מחמיר יותר."
];

const FLIGHT_WARN = "⚠️ <b>אדמונט טס רק עם תיק מתחת למושב.</b> אם קונים בלונדון את תיק הגב 5.11 Skyweight 36L — הוא <b>לא ייכנס</b> ל־40×30×20 (זה רק ~24 ל׳). לטיסה חזרה צריך <b>לקנות כבודה</b> (Priority/טרולי 10 ק״ג או מזוודה לבטן) — מראש באפליקציה זול יותר מאשר בשדה [[לבדוק מחיר]]. אפשרות: להכניס את הקניות למזוודה של אמה (26 ק״ג), אם המשקל מאפשר.";

/* ---------- LUTON ---------- */
const LUTON_OPTIONS = [
  { name: "<b>Luton Airport Express</b> (EMR) St Pancras ↔ Luton Airport Parkway + שאטל <b>Luton DART</b> לטרמינל",
    time: "מ־~32 דק׳ עד הטרמינל (רכבת 22 דק׳ ללא עצירות + DART ~4 דק׳)",
    note: "כל 30 דק׳, ב׳–שבת. לקנות כרטיס עד התחנה <b>״Luton Airport״ (LUA)</b> — אז ה־DART כלול; בנפרד DART עולה £4.90. Advance מ־~£10 [[לבדוק]]" },
  { name: "<b>Thameslink</b> (St Pancras, Farringdon, City, Blackfriars, London Bridge) ← Parkway + DART",
    time: "24–45 דק׳ מ־St Pancras + DART",
    note: "נוסעת <b>גם בלילה</b>, בערך פעם בשעה. Advance מ־~£6.50 + DART [[לבדוק]]" },
  { name: "<b>National Express</b> A1/A2/A31 (Victoria, Marble Arch, Baker St, Golders Green…)",
    time: "מ־40 דק׳ (Golders Green), מהמרכז ~60–90 דק׳",
    note: "<b>24/7</b>, עד דלת הטרמינל, בלי DART. מ־£7 אונליין. נסיעות לילה: הראשונה מ־Victoria ב־00:01" },
  { name: "<b>Green Line 757</b> (Victoria, Hyde Park Corner, Marble Arch, Baker St…)",
    time: "~60–90 דק׳",
    note: "ביום כל 30 דק׳, <b>בלילה כל שעה</b>, 7 ימים" },
  { name: "<b>מונית / הסעה</b>",
    time: "~שעה+ בלילה",
    note: "Luton מחוץ ל־Greater London — את המחיר <b>לסכם מראש עם הנהג</b>, אחרת לפי מונה (כלל של TfL). אין מחיר רשמי [[לבדוק]]" }
];

const LUTON_SOURCES = "ה־DART פועל 24/7 (בלילה — בערך כל 15 דק׳). מקורות: <a href='https://www.lutonairportexpress.co.uk/routes/london-to-luton-airport' target='_blank' rel='noopener'>Luton Airport Express</a> · <a href='https://www.lutonairportexpress.co.uk/faqs' target='_blank' rel='noopener'>LAE FAQ</a> · <a href='https://www.london-luton.co.uk/to-and-from-lla/trains/luton-dart' target='_blank' rel='noopener'>Luton DART</a> · <a href='https://www.thameslinkrailway.com/travel-information/airport-travel/luton-airport' target='_blank' rel='noopener'>Thameslink</a> · <a href='https://www.nationalexpress.com/en/airports/luton/london-to-luton' target='_blank' rel='noopener'>National Express</a> · <a href='https://www.london-luton.co.uk/to-and-from-lla/bus-and-coach/to-from-london' target='_blank' rel='noopener'>LLA: אוטובוסים</a> · <a href='https://tfl.gov.uk/modes/taxis-and-minicabs/taxi-fares' target='_blank' rel='noopener'>TfL: מוניות</a> · <a href='https://www.nationalrail.co.uk/' target='_blank' rel='noopener'>National Rail (לוח זמנים מדויק)</a>";

const LUTON_ARRIVAL = "אחרי ביקורת הדרכונים (~19:30) — DART ← Parkway ← <b>Luton Airport Express</b> עד St Pancras (22 דק׳, כל 30 דק׳, בימי חול עד 23:54) ← <b>קו Piccadilly</b> עד Gloucester Road / South Kensington (~20 דק׳) ← הליכה ~10 דק׳. בבית ~21:00–21:30.";
const HOME_TRANSFERS = {
  arrival: [
    ["<b>רכבת + רכבת תחתית</b> (מומלץ)", "~1 ש׳ 45 דק׳ מהנחיתה עד הדלת", "LAE עד ״Luton Airport״ (DART כלול) מ־£10 לאדם Advance, בכרטיס ללא מגע £12.30 + DART £4.90; רכבת תחתית אזור 1 ~£2.90 לאדם ← <b>~£30–45 לשניים</b>"],
    ["<b>מונית / מיניוואן במחיר קבוע</b>", "~60–75 דק׳ + יציאה מהשדה", "Saloon £91 (Airport Only, Kensington) – £92 (Blackberry Cars) לרכב; מונית בטרמינל לפי מונה — יקר יותר"],
    ["<b>National Express A1</b> עד Victoria + District/Circle או מונית", "~75–90 דק׳ + ~15 דק׳", "אוטובוס מ־~£9.50–13 לאדם + רכבת תחתית ~£2.90 לאדם או מונית ~£15 ← <b>~£30–45 לשניים</b>"]
  ],
  departure: [
    ["<b>מונית מהבית ב־03:45</b> ✅", "~50–60 דק׳ ← טרמינל ~04:45", "מחיר קבוע £83 (Blackberry Cars, SK→Luton) – £91; רכב אחד לשניים; להזמין מראש"],
    ["Night Tube Piccadilly (שישי←שבת) עד King's Cross St Pancras + <b>Thameslink 03:44</b> ← Parkway 04:29 + DART", "יציאה ~03:00 ← טרמינל ~04:40", "רכבת תחתית ~£2.90 לאדם + Thameslink ~£12–17 לאדם + DART ← ~£40 לשניים; לוח זמנים לילי [[לבדוק]]"],
    ["<b>National Express A1</b> Victoria 03:30 ← Luton 04:50 (שבת)", "יציאה ~03:00 + מונית עד Victoria ~10 דק׳", "אוטובוס מ־~£9.50 לאדם + מונית עד Victoria ~£15 ← קצת מאוחר, אבל מספיקים"],
    ["<b>Green Line 757</b> Victoria (24/7, בלילה ~פעם בשעה)", "~70–90 דק׳", "£15 לאדם; השעה המדויקת בלילה של שבת [[לבדוק]]"]
  ],
  sources: "<a href='https://www.lutonairportexpress.co.uk/routes/london-to-luton-airport' target='_blank' rel='noopener'>LAE</a> · <a href='https://www.guide-to-london.net/airports/luton-to-central-london' target='_blank' rel='noopener'>Guide-to-London (תעריפים)</a> · <a href='https://airportonly.co.uk/airport-taxis/luton-airport/prices' target='_blank' rel='noopener'>Airport Only</a> · <a href='https://www.blackberrycars.com/taxisouthkensingtonluton/' target='_blank' rel='noopener'>Blackberry Cars</a> · <a href='https://timetables.nationalexpress.com/routes/NX/A1/London-Luton_Airport/O' target='_blank' rel='noopener'>NX A1</a> · <a href='https://www.arrivabus.co.uk/airport-services/greenline/FAQs' target='_blank' rel='noopener'>Green Line 757</a> · <a href='https://www.london.gov.uk/transport/rail-and-underground/night-tube' target='_blank' rel='noopener'>Night Tube</a>"
};

const LUTON_DEPARTURE = {
  warn: "❌ <b>ה־Luton Airport Express הראשון בשבת — 05:33</b> מ־St Pancras ← Parkway ~05:55 ← טרמינל ~06:00–06:05. מסירת הכבודה של אמה נסגרת ב־<b>06:25</b>. זה <b>כמעט בלי מרווח</b> (תורים בבידוק מוקדם בבוקר), ואנחנו צריכים להיות בשדה ב־<b>05:25–05:45</b>. ← <b>האקספרס הראשון לא מתאים.</b>",
  options: [
    "<b>Thameslink לילי</b> מ־St Pancras בערך פעם בשעה — לפי לוח הזמנים הנוכחי של לילות חול, למשל <b>03:44 ← 04:29</b> או <b>04:44 ← 05:29</b> ל־Parkway, + DART [[לבדוק את השעות המדויקות ל־21.11 ב־National Rail — הלו״ז משתנה בדצמבר ובסופי שבוע יש עבודות]].",
    "<b>National Express</b> מ־Victoria / Marble Arch / Baker St בלילה (נסיעות כל ~30–60 דק׳) — ישר לטרמינל; לבחור נסיעה ספציפית במתכנן.",
    "<b>מונית בהזמנה מראש</b> ~04:00 מהמרכז — האפשרות הפשוטה ביותר, אבל היקרה ביותר."
  ],
  good: "✅ <b>המלצה (גרים ב־South Kensington כל 4 הלילות):</b> <b>מונית בהזמנה מראש ב־03:45</b> מהבית (32 Roland Gardens) עד הטרמינל — מחיר קבוע ~£83–95 לרכב (לשניים), ~50–60 דק׳ בלילה ← בשדה ~04:45, בדיוק לפתיחת מסירת הכבודה 04:25–06:25. גיבוי: Night Tube Piccadilly (לילה שישי←שבת) South Kensington ← King's Cross St Pancras ו־Thameslink לילי 03:44 ← Parkway 04:29 + DART [[לבדוק לו״ז ל־21.11]]."
};

/* ---------- מסמכים ---------- */
const DOCS_WARN = "🛂 <b>UK ETA חובה</b> לאזרחי ישראל (ישראל ברשימה הרשמית). בלי ETA לא יעלו אותנו לטיסה. לכל אחד — ETA משלו.<br>• מחיר: <b>£20</b> לאדם (רשמי, אונליין או באפליקציה ״UK ETA״), לא מוחזר.<br>• ההחלטה בדרך כלל תוך יום, <b>עד 3 ימי עבודה</b> ← להגיש לפחות שבוע לפני, עדיף עכשיו.<br>• בתוקף <b>שנתיים</b> או עד שתוקף הדרכון פג; מקושר לדרכון שאיתו טסים.<br>• להגיש רק ב־gov.uk / באפליקציה הרשמית — אתרים אחרים גובים יותר.<br><a href='https://www.gov.uk/eta' target='_blank' rel='noopener'>gov.uk/eta</a> · <a href='https://www.gov.uk/eta/apply' target='_blank' rel='noopener'>הגשת בקשה</a> · <a href='https://www.gov.uk/guidance/check-when-you-can-get-an-electronic-travel-authorisation-eta' target='_blank' rel='noopener'>רשימת המדינות</a>";

/* ---------- קטגוריות במפה ---------- */
const CATEGORIES = {
  food:  { label: "אוכל",           icon: "🍜", color: "#b8532f" },
  xmas:  { label: "חג המולד/אורות", icon: "🎄", color: "#2f6b4f" },
  shop:  { label: "קניות",          icon: "🛍️", color: "#3b5b9a" },
  stay:  { label: "לינה",           icon: "🏨", color: "#8a4fb0" },
  tr:    { label: "תחבורה",         icon: "🚆", color: "#4a4a4a" }
};

/* ---------- מקומות ---------- */
const PLACES = [
  { id: "home", cat: "stay", name: "🏠 הבית שלנו", lat: 51.4895391, lng: -0.1799673,
    addr: "32 Roland Gardens, London SW7 3PL · South Kensington",
    note: "דירה ״Stunning South Kensington Flat״ (חדר שינה אחד). צ׳ק־אין מ־15:00, צ׳ק־אאוט עד 11:00. ברגל: Gloucester Road ~9 דק׳, South Kensington ~10 דק׳.",
    links: [{ t: "Booking", u: "https://www.booking.com/hotel/gb/stunning-south-kensington-flat-greater-london1.html" }],
    days: ["2026-11-17", "2026-11-18", "2026-11-19", "2026-11-20", "2026-11-21"] },
  { id: "yuenkee", cat: "food", name: "Yuen Kee Dumpling 袁记云饺", lat: 51.518164, lng: -0.078769,
    addr: "122 Middlesex St, London E1 7HY · ליד Liverpool Street",
    note: "הכתובת אומתה במרשם ההיגיינה של FSA (דירוג 5, ביקורת 17.07.2026). שעות 11–22 — לפי אתרי ריכוז [[לבדוק]].",
    links: [{ t: "FSA", u: "https://ratings.food.gov.uk/business/1938752" }],
    days: ["2026-11-18"], approx: true },
  { id: "swissbutter", cat: "food", name: "Swiss Butter", lat: 51.520627, lng: -0.122587,
    addr: "114–118 Southampton Row, Holborn, London WC1B 5AA · רכבת Holborn / Russell Square",
    note: "סטייק ברוטב החמאה של הבית. בלונדון נמצא <b>סניף אחד בלבד</b> (המותג הודיע על כוונה לפתוח עוד שניים, בלי כתובות). בלי הזמנה, walk-in. ב׳–שבת 12:00–00:00, א׳ 12:00–23:00. מנות ״מ־£18״, ~£22 לאדם — לפי האתר swissbutterlondon.online; ״סטייק £19״ מהצ׳אט [[לבדוק מחיר]].",
    links: [{ t: "Swiss Butter London", u: "https://swissbutterlondon.online/faq/" }, { t: "swissbutter.com", u: "https://swissbutter.com/" }],
    days: ["2026-11-20"], approx: true },
  { id: "burnt", cat: "food", name: "Burnt Smokehouse", lat: 51.569293, lng: -0.006382,
    addr: "161a Midland Rd, Leyton, London E10 6JT · מתחת לקשתות הרכבת ליד Leyton Midland Road",
    note: "BBQ טקסני (בריסקט, סמאש בורגרים). חלאל, בלי רישיון לאלכוהול (Time Out). שעות [[לבדוק]].",
    links: [{ t: "burntsmokehouse.com", u: "https://burntsmokehouse.com/pages/contact" }, { t: "Time Out", u: "https://www.timeout.com/london/restaurants/burnt-smokehouse" }],
    days: ["2026-11-18"], approx: true },
  { id: "happy", cat: "food", name: "Happy Bar & Grill", lat: 51.5101646, lng: -0.1324699,
    addr: "25–29 Coventry Street, Piccadilly, London W1D 7AG · בין Piccadilly Circus ל־Leicester Square",
    note: "א׳–ה׳ 12:00–22:30, ו׳–שבת 12:00–00:00. סושי, המבורגרים, אווירה משפחתית. אפשר להזמין מקום.",
    links: [{ t: "happyrestaurants.com", u: "https://happyrestaurants.com/restaurants/25/happy-bar-grill-london" }],
    days: ["2026-11-19"] },

  { id: "regent", cat: "xmas", name: "Regent Street (אורות)", lat: 51.5134778, lng: -0.1408535,
    note: "אורות (מלאכים) — מ־5 בנובמבר. ✅ 17–21.11", days: ["2026-11-19"] },
  { id: "oxford", cat: "xmas", name: "Oxford Circus / Oxford St", lat: 51.5156576, lng: -0.1417687,
    note: "אורות: התאריך לא הוכרז, צפוי ~2 בנובמבר [[לבדוק]]. ✅ כנראה", days: ["2026-11-19"] },
  { id: "carnaby", cat: "xmas", name: "Carnaby Street", lat: 51.5130102, lng: -0.1386688,
    note: "אורות (נושא שנות ה־90) — מ־4 בנובמבר. ✅", days: ["2026-11-19"] },
  { id: "bond", cat: "xmas", name: "New Bond Street", lat: 51.5099625, lng: -0.1419366,
    note: "אורות (כתרים) — מ־12 בנובמבר [[לבדוק]]. ✅", days: ["2026-11-19"] },
  { id: "hydepark", cat: "xmas", name: "Hyde Park Winter Wonderland", lat: 51.5074889, lng: -0.1622074,
    note: "<b>19 בנובמבר</b> – 3 בינואר; 19–20.11 מ־12:00 עד 22:00. ✅ רק ה׳ 19 ו־ו׳ 20. כרטיסים מראש. הנקודה במפה — נקודה כללית של הפארק.",
    links: [{ t: "Winter Wonderland", u: "https://hydeparkwinterwonderland.com/tickets-guide/" }], days: ["2026-11-19"] },
  { id: "leadenhall", cat: "xmas", name: "Leadenhall Market", lat: 51.5127276, lng: -0.0833953,
    note: "אורות — 19 בנובמבר, 18:00 [[לבדוק]]. ✅ מה׳ 19 (אופציה)", days: ["2026-11-19"] },
  { id: "spitalfields", cat: "xmas", name: "Old Spitalfields Market", lat: 51.5196, lng: -0.075363,
    note: "אורות — מ־11 בנובמבר [[לבדוק]]. ✅", days: ["2026-11-18"] },
  { id: "covent", cat: "xmas", name: "Covent Garden", lat: 51.5119791, lng: -0.1227413,
    note: "עץ אשוח 55 ft, יותר מ־300,000 אורות — מ־12 בנובמבר. ✅",
    links: [{ t: "Covent Garden", u: "https://www.coventgarden.london/event/covent-garden-lights-switch-on" }], days: ["2026-11-20"] },
  { id: "leicester", cat: "xmas", name: "Leicester Square — שוק", lat: 51.5103136, lng: -0.1306055,
    note: "שוק (Underbelly): ~31 באוקטובר – 3 בינואר [[לבדוק]]. ✅",
    links: [{ t: "Leicester Square", u: "https://leicestersquare.london/newsletters/christmas-in-leicester-square" }], days: ["2026-11-20"] },
  { id: "trafalgar", cat: "xmas", name: "Trafalgar Square", lat: 51.5084502, lng: -0.1284499,
    note: "את העץ מדליקים <b>בדצמבר</b>; ב־2026 — 3 בדצמבר (לפי מקורות לא רשמיים) [[לבדוק]]. ❌ ב־17–21.11 הוא לא יהיה מואר.",
    links: [{ t: "London.gov: Trafalgar", u: "https://www.london.gov.uk/who-we-are/city-halls-buildings-and-squares/trafalgar-square/christmas" }], days: ["2026-11-20"] },
  { id: "southbank", cat: "xmas", name: "Southbank Winter Market", lat: 51.5057791, lng: -0.116787,
    note: "Queen's Walk, על גדת התמזה. 2 בנובמבר – 4 בינואר, 11:00–22:00. ✅",
    links: [{ t: "Southbank Winter Market", u: "https://southbank.london/whats-on/winter-market" }], days: ["2026-11-20"] },

  { id: "selfridges", cat: "shop", name: "Selfridges", lat: 51.5151766, lng: -0.1523899,
    addr: "400 Oxford St", note: "חלונות ראווה: התאריך ל־2026 לא הוכרז (ב־2025 — 6 בנובמבר) [[לבדוק]]. ❓ כנראה", days: ["2026-11-19"] },
  { id: "fortnum", cat: "shop", name: "Fortnum & Mason", lat: 51.5081856, lng: -0.1381409,
    addr: "181 Piccadilly", note: "חלונות ראווה: בדרך כלל סוף אוקטובר (החנות לא מפרסמת תאריך מדויק). ✅ כנראה",
    links: [{ t: "Fortnum & Mason", u: "https://support.fortnumandmason.com/hc/en-gb/articles/4406498578961-When-do-your-Christmas-windows-appear-in-Piccadilly" }], days: ["2026-11-20"] },
  { id: "silvermans", cat: "shop", name: "Silvermans (5.11)", lat: 51.5229399, lng: -0.0394362,
    addr: "422–426 Mile End Rd, London E1 4PE", note: "ב׳–ו׳ 10:00–17:00. יש 5.11 בחנות, אבל <b>אין</b> Skyweight 36L ו־Utility Chest Pack.",
    links: [{ t: "silvermans.co.uk", u: "https://www.silvermans.co.uk/collections/brand-5-11" }], days: ["2026-11-18"] },

  { id: "stpancras", cat: "tr", name: "St Pancras International", lat: 51.5327196, lng: -0.1270027,
    note: "Luton Airport Express / Thameslink", days: ["2026-11-17", "2026-11-20"] },
  { id: "luton", cat: "tr", name: "London Luton Airport", lat: 51.8781015, lng: -0.3664255,
    note: "LTN · רחוק צפונה מהמרכז — הקטינו את המפה.", days: ["2026-11-17", "2026-11-20", "2026-11-21"], far: true },

  { id: "candella", cat: "food", name: "Candella Tea Room — afternoon tea", lat: 51.5040565, lng: -0.1919758,
    addr: "34 Kensington Church Street, London W8 4HA · רכבת High Street Kensington / Notting Hill Gate",
    note: "💬 <b>המלצה מקבוצת פייסבוק, לא נבדק.</b> Traditional Afternoon Tea — <b>£28.95 לאדם</b> (התפריט הרשמי, 17.10.2026). השעות באתר מופיעות בצורה שונה (11:00–17:00 ו־10:00–18/19:00) [[לבדוק]]; בסופי שבוע עדיף להזמין.",
    links: [{ t: "תפריט (candellatearoom.com)", u: "https://www.candellatearoom.com/afternoon-tea-menu" }, { t: "אתר", u: "https://www.candellatearoom.com/" }],
    tip: true },
  { id: "goring", cat: "food", name: "The Goring — afternoon tea", lat: 51.49754, lng: -0.14558,
    addr: "15 Beeston Place, London SW1W 0JW · רכבת Victoria",
    note: "💬 <b>המלצה מקבוצת פייסבוק, לא נבדק.</b> Traditional Tea — <b>£85 לאדם</b>, עם כוס Bollinger — מ־£90 (התפריט הרשמי, 17.10.2026); דמי שירות בנוסף [[לבדוק]]. Veranda, כל יום 12:00–18:15. להזמין מראש.",
    links: [{ t: "thegoring.com", u: "https://www.thegoring.com/food-drink/afternoon-tea-in-the-veranda/" }, { t: "תפריט (PDF)", u: "https://www.thegoring.com/media/1idddsq1/timeless-style-afternoon-tea-menu.pdf" }],
    tip: true }
];

/* ---------- אזורים (שכבה במפה, כבויה כברירת מחדל) ---------- */
const AREAS_NOTE = "לפי תמונה מקבוצת הפייסבוק ״London & UK Tourist Advanced״, לא נתונים רשמיים";
const AREAS = [
  { id: "jewish", color: "#1f6fd1", label: "אזורים עם קהילה יהודית",
    stations: "Edgware, Burnt Oak, Mill Hill Broadway, Colindale, Hendon, Hendon Central, Brent Cross, Golders Green",
    pts: [[51.624, -0.283], [51.627, -0.252], [51.618, -0.222], [51.596, -0.201], [51.578, -0.182], [51.565, -0.190],
          [51.566, -0.212], [51.574, -0.236], [51.585, -0.258], [51.598, -0.282], [51.611, -0.292]] },
  { id: "central", color: "#d4b000", label: "אזורים טובים במרכז",
    stations: "Baker Street, Great Portland Street, Euston, King's Cross St Pancras, Russell Square, Holborn, Covent Garden, Leicester Square, Tottenham Court Road, Oxford Circus, Bond Street, Green Park, Piccadilly Circus, Charing Cross, Embankment, Westminster, Waterloo, St James's Park, Victoria, Sloane Square, Knightsbridge, South Kensington, Gloucester Road, Earl's Court",
    pts: [[51.5262, -0.1595], [51.5305, -0.1405], [51.5342, -0.1240], [51.5292, -0.1145], [51.5180, -0.1125], [51.5112, -0.1110],
          [51.5065, -0.1055], [51.4990, -0.1080], [51.4985, -0.1205], [51.4935, -0.1330], [51.4918, -0.1425], [51.4895, -0.1560],
          [51.4895, -0.1730], [51.4885, -0.1955], [51.4950, -0.1990], [51.4990, -0.1860], [51.5005, -0.1700], [51.5035, -0.1560],
          [51.5100, -0.1555], [51.5148, -0.1600], [51.5205, -0.1625]] },
  { id: "careful", color: "#d0312d", label: "כותב הפוסט ממליץ לישראלים להיזהר",
    stations: "Paddington, Edgware Road, Bayswater, Royal Oak (בסביבה: Warwick Avenue, Lancaster Gate, Queensway)",
    pts: [[51.5250, -0.1915], [51.5258, -0.1760], [51.5225, -0.1655], [51.5168, -0.1640], [51.5118, -0.1710],
          [51.5102, -0.1840], [51.5112, -0.1965], [51.5180, -0.1990]] }
];

/* ---------- תוכנית לפי ימים (טיוטה) ---------- */
const DAYS = [
  { id: "2026-11-17", short: "ג׳ 17", title: "נחיתה", area: "TLV ← Luton ← St Pancras ← 🏠 South Kensington", items: [
    { time: "~12:20", tz: "IL", text: "בנתב״ג עד ~12:20; מסירת הכבודה של אמה עד 14:10." },
    { time: "15:20", tz: "IL", text: "המראה W9 5302 TLV ← LTN.", flight: 0 },
    { time: "18:45", text: "נחיתה ב־Luton ← DART ← Luton Airport Express ← St Pancras ~20:00–20:30.", places: ["luton", "stpancras"] },
    { time: "~20:30", text: "קו Piccadilly מ־St Pancras ← <b>Gloucester Road</b> או <b>South Kensington</b> (~20 דק׳) ← הליכה ~10 דק׳ עד הבית. בבית ~21:00–21:30. (גיבוי: מונית מ־Luton ~£90 מחיר קבוע.)", places: ["stpancras", "home"] },
    { text: "כניסה ל<b>בית שלנו</b> (32 Roland Gardens), ארוחת ערב בסביבה.", places: ["home"] }
  ]},
  { id: "2026-11-18", short: "ד׳ 18", title: "המזרח וה־City", area: "Liverpool St · Spitalfields · Mile End · Leyton", items: [
    { label: "צהריים", text: "<b>Yuen Kee Dumplings</b> (Middlesex St, ליד Liverpool St).", places: ["yuenkee"] },
    { text: "Old Spitalfields Market (אורות חג המולד נדלקים ב־11.11).", places: ["spitalfields"] },
    { text: "אדמונט: <b>Silvermans</b>, Mile End Rd (ב׳–ו׳ 10–17) — 5.11 בחנות.", places: ["silvermans"] },
    { label: "ערב", text: "<b>Burnt Smokehouse</b>, Leyton (BBQ טקסני) [[שעות פתיחה]].", places: ["burnt"] }
  ]},
  { id: "2026-11-19", short: "ה׳ 19", title: "West End ו־Winter Wonderland", area: "Oxford St · Bond St/Mayfair · Hyde Park · Regent St · Carnaby · Piccadilly", items: [
    { label: "בוקר", text: "Oxford St, חלונות הראווה של <b>Selfridges</b>, Bond St / Mayfair.", places: ["oxford", "selfridges", "bond"] },
    { time: "12:00", text: "<b>Hyde Park Winter Wonderland — יום פתיחת העונה!</b> (כרטיסים מראש).", places: ["hydepark"] },
    { label: "ערב", text: "האורות של <b>Regent St</b> ו־<b>Carnaby</b>.", places: ["regent", "carnaby"] },
    { label: "ארוחת ערב", text: "<b>Happy Bar &amp; Grill</b>, Piccadilly Circus.", places: ["happy"] },
    { time: "18:00", text: "אופציה: הדלקת האורות ב־Leadenhall Market (ה־City).", places: ["leadenhall"], optional: true }
  ]},
  { id: "2026-11-20", short: "ו׳ 20", title: "Holborn, Covent Garden, התמזה", area: "Holborn · Covent Garden · Leicester Sq · Trafalgar · Piccadilly · South Bank", items: [
    { time: "12:00", label: "צהריים", text: "<b>Swiss Butter</b>, Holborn (נפתח ב־12:00, בלי הזמנה — עדיף להגיע לפתיחה).", places: ["swissbutter"] },
    { text: "Covent Garden (העץ והקישוטים מ־12.11) ← השוק ב־Leicester Square ← Trafalgar Square (את העץ ידליקו רק בדצמבר).", places: ["covent", "leicester", "trafalgar"] },
    { text: "חלונות הראווה של <b>Fortnum &amp; Mason</b> ב־Piccadilly.", places: ["fortnum"] },
    { label: "ערב", text: "<b>Southbank Winter Market</b> על גדת התמזה.", places: ["southbank"] },
    { time: "ערב", text: "לחזור הביתה, לארוז, להזמין מונית ל־03:45 (אם עוד לא הוזמנה).", places: ["home"] }
  ]},
  { id: "2026-11-21", short: "שבת 21", title: "המראה", area: "🏠 SW7 ← מונית ← Luton ← TLV", items: [
    { time: "~03:15", text: "השכמה." },
    { time: "03:45", text: "<b>מונית מהבית</b> (בהזמנה מראש, מחיר קבוע ~£83–95) ← Luton ~50–60 דק׳ בלילה. בטרמינל ~04:40–04:50.", places: ["home", "luton"] },
    { time: "עד 06:25", text: "מסירת כבודה (החלון של Wizz ב־Luton: 04:25–06:25).", places: ["luton"] },
    { time: "07:25", text: "המראה W9 5301 ← 14:25 תל אביב.", flight: 1 }
  ]}
];

/* ---------- לינה ---------- */
const HOTELS = [
  { chosen: true,
    name: "Stunning South Kensington Flat — 32 Roland Gardens",
    area: "South Kensington (SW7 3PL)",
    tier: "הבית שלנו",
    rating: 8.6, reviews: 21,
    nights: 4,
    room: "דירה, חדר שינה אחד (מיטה זוגית), מטבח",
    breakfast: "לא (מטבח פרטי)",
    cancellation: "לא ידוע [[לבדוק בהזמנה]]",
    tube: "Gloucester Road ~9 דק׳ · South Kensington ~10 דק׳ הליכה",
    url: "https://www.booking.com/hotel/gb/stunning-south-kensington-flat-greater-london1.html",
    photo: "assets/img/home-roland32.jpg",
    lat: 51.4895391, lng: -0.1799673,
    smokingRule: "העישון אסור בכל השטח (smoke-free); האם מותר במרפסת — לברר עם המארח",
    balcony: true,
    pros: ["רחוב שקט ב־South Kensington, קרוב למוזיאונים, ל־Harrods ול־Brompton Cross", "מטבח פרטי, מכונת כביסה, Wi-Fi", "שתי תחנות רכבת תחתית במרחק 10 דק׳: Piccadilly, District, Circle", "יש מרפסת (לפי תיאור המודעות)"],
    cons: ["רחוק מ־Luton (~שעה ברכב) — לטיסה המוקדמת ב־21.11 רק מונית/תחבורת לילה", "צ׳ק־אין מ־15:00, צ׳ק־אאוט עד 11:00", "מעט ביקורות (≈13–21), דירוגים 4.0/5 – 8.6/10 באתרים שונים"]
  }
];

const STAY_ADVICE = {
  slots: ["כל 4 הלילות 17→21: 32 Roland Gardens, South Kensington SW7 3PL (אמה בחרה)"],
  areas: [
    "<b>King's Cross / St Pancras</b> — רכבת ישירה ל־Luton בשני הכיוונים, קווי Piccadilly/Victoria/Northern, נוח ל־West End ול־City.",
    "חלופה: <b>Holborn / Bloomsbury</b> — ברגל ל־Swiss Butter, Covent Garden, Oxford St; 1–2 תחנות עד St Pancras."
  ],
  lastNight: "שדה התעופה עצמו מציין מלונות ״במרחק הליכה נוח״ מהטרמינל: <b>Ibis / Ibis Budget London Luton Airport, Holiday Inn, Holiday Inn Express, Hampton by Hilton London Luton Airport</b> (<a href='https://www.london-luton.co.uk/to-and-from-lla/transit-passengers' target='_blank' rel='noopener'>london-luton.co.uk</a>). לגבי Hampton by Hilton באתר Hilton כתוב ~1 מייל מהטרמינל, ליד תחנת ה־DART — ברגל עם מזוודות זה רחוק [[לבדוק מה הכי קרוב]]. <a href='https://www.hilton.com/en/hotels/ltnlahx-hampton-london-luton-airport/' target='_blank' rel='noopener'>Hampton by Hilton</a>"
};

/* ---------- עישון ---------- */
const SMOKING = [
  {
    title: "1. איפה אסור לעשן",
    items: [
      { text: "מקומות ציבוריים סגורים ומקומות עבודה: אסור לעשן בשום מקום עבודה סגור, בבניין ציבורי ובתחבורה ציבורית.",
        sourceUrl: "https://www.gov.uk/smoking-at-work-the-law" },
      { text: "Health Act 2006, s.2: האיסור חל במקומות הפתוחים לציבור ובמקומות עבודה, אבל רק באזורים שהם ״enclosed״ (סגורים) או ״substantially enclosed״ (סגורים ברובם).",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/2006/28/section/2" },
      { text: "מה זה ״substantially enclosed״ (Smoke-free (Premises and Enforcement) Regulations 2006, reg.2; בתוקף מ־1.7.2007): יש תקרה או גג, והפתחים בקירות תופסים יחד פחות ממחצית שטח הקירות. פתחים שיש בהם דלתות, חלונות ומבנים אחרים שנפתחים — לא נספרים. גם סוכך, כולל סוכך מבד, נחשב ״גג״. למרפסת של פאב או בית קפה זה אומר: אם יש מעליה סוכך והקירות פתוחים פחות ממחצית — אסור לעשן שם. תחת כיפת השמיים, או כשהקירות פתוחים במחצית ויותר, מותר לעשן אם המקום לא מתנגד.",
        sourceUrl: "https://www.legislation.gov.uk/uksi/2006/3368/regulation/2" },
      { text: "תחבורה ומוניות: כלי רכב סגור שמשמש את הציבור (בתשלום או בחינם, כולל מוניות ומיניקאבים), או שכמה אנשים משתמשים בו לצורכי עבודה, הוא smoke-free (Smoke-free (Exemptions and Vehicles) Regulations 2007, reg.11(1)).",
        sourceUrl: "https://www.legislation.gov.uk/uksi/2007/765/regulation/11" },
      { text: "רכב עם ילדים: אסור לעשן ברכב סגור שיש בו יותר מאדם אחד ולפחות אחד מהם מתחת לגיל 18 (reg.11(1A), בתוקף מ־1.10.2015). קנס של £50 יכול להינתן גם לנהג וגם למעשן.",
        sourceUrl: "https://www.gov.uk/government/news/smoking-in-vehicles" },
      { text: "TfL: באוטובוסים, בחשמליות וברכבות, בתחנות אוטובוס ורכבת וברציפי החשמלית אסור לעשן ולהשתמש בסיגריות אלקטרוניות (TfL Conditions of Carriage, סעיף 2.4; הנוסח בתוקף מ־24.09.2026). על רציפים פתוחים מעל הקרקע לא נאמר שם דבר בנפרד: האיסור מנוסח לכל התחנה (״in our bus and rail stations״).",
        sourceUrl: "https://content.tfl.gov.uk/tfl-conditions-of-carriage.pdf" },
      { text: "TfL Railway Byelaws (רכבת תחתית, Overground, DLR), byelaw 3: אסור לעשן ולהחזיק ביד סיגריה דולקת, מצית או גפרור בכל חלק של מסילת הברזל שתלוי בו שלט איסור עישון.",
        sourceUrl: "https://content.tfl.gov.uk/railway-byelaws.pdf" },
      { text: "כללי הרכבות הארציים (National Rail): מ־26.12.2025, במקום שתלוי בו שלט איסור עישון, אסור להשתמש גם בסיגריות אלקטרוניות.",
        sourceUrl: "https://www.gov.uk/government/publications/railway-byelaws" },
      { text: "החוק נגד עישון במקומות סגורים לא חל על סיגריות אלקטרוניות; ההחלטה בידי בעל המקום.",
        sourceUrl: "https://www.gov.uk/smoking-at-work-the-law" }
    ]
  },
  {
    title: "2. Tobacco and Vapes Act 2026 (לשעבר Tobacco and Vapes Bill)",
    items: [
      { text: "סטטוס: החוק קיבל Royal Assent ב־29.04.2026 ושמו כעת Tobacco and Vapes Act 2026 (2026 c. 18).",
        sourceUrl: "https://bills-api.parliament.uk/api/v1/Bills/3879" },
      { text: "הודעת הממשלה מ־29.04.2026: הצעת החוק הפכה לחוק; מכירת טבק לאנשים שנולדו ב־1.01.2009 ואילך נאסרת.",
        sourceUrl: "https://www.gov.uk/government/news/tobacco-and-vapes-bill-becomes-law" },
      { text: "איסור דורי (s.1): אסור למכור מוצרי טבק, תערובות צמחים לעישון ונייר סיגריות לאנשים שנולדו ב־1.01.2009 ואילך. נכנס לתוקף ב־1.01.2027 (s.175(3)). זה לא נוגע לאדמונט.",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/2026/18/section/1" },
      { text: "מועדי כניסה לתוקף (s.175): חלקים 1–4 נכנסים לתוקף 6 חודשים מיום החקיקה. לפי החישוב שלנו מ־29.04.2026, זה סוף אוקטובר 2026. האיסור הדורי מתחיל ב־1.01.2027; רישוי הקמעונאים יתחיל במועד שייקבע בתקנות נפרדות.",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/2026/18/section/175" },
      { text: "הרחבת האיסור למקומות פתוחים: s.142 מסמיך את השר להכריז בתקנות על כל מקום באנגליה שפתוח לציבור או שהוא מקום עבודה, כולל רחוב, כ־smoke-free. סטטוס: Prospective, כלומר עדיין לא בתוקף. מועד הכניסה לתוקף ייקבע בתקנות (s.176(3)(a)).",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/2026/18/section/142" },
      { text: "הצעות הממשלה (התייעצות DHSC מ־13.02 עד 8.05.2026): לאסור עישון במגרשי משחקים וליד מוסדות רפואה, רווחה וחינוך, ולהגדיר אזורים ללא וייפ וטבק מחומם. מרפסות קיץ ושאר אזורי הסעדה הפתוחים, וגם חופים, הממשלה מחריגה במפורש: ״not considering extending the indoor smoking ban to outdoor hospitality settings״. בין קבלת התקנות לכניסתן לתוקף מוצע פרק זמן של 6 חודשים לפחות.",
        sourceUrl: "https://www.gov.uk/government/consultations/smoke-free-heated-tobacco-free-and-vape-free-places-in-england/smoke-free-heated-tobacco-free-and-vape-free-places-in-england" },
      { text: "נכון ל־17.10.2026 בעמוד ההתייעצות כתוב ״We are analysing your feedback״, עדיין אין מסקנות. בנובמבר 2026 אין איסורים ברחוב (ליד בתי ספר, בתי חולים, במגרשי משחקים, במרפסות): אלה בינתיים רק הצעות.",
        sourceUrl: "https://www.gov.uk/government/consultations/smoke-free-heated-tobacco-free-and-vape-free-places-in-england" }
    ]
  },
  {
    title: "3. קנסות",
    items: [
      { text: "עישון במקום smoke-free הוא עבירה (Health Act 2006, s.7).",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/2006/28/section/7" },
      { text: "קנס קבוע (FPN) על עישון במקום smoke-free הוא £50, ובתשלום מהיר יורד ל־£30 (Smoke-free (Penalties and Discounted Amounts) Regulations 2007, reg.2(5)). אם העניין יגיע לבית משפט, הקנס יהיה ברמה 1 בסולם הסטנדרטי.",
        sourceUrl: "https://www.legislation.gov.uk/uksi/2007/764/regulation/2/made" },
      { text: "לפי gov.uk, בית משפט יכול להטיל על עובד שעישן במקום העבודה קנס של עד £200.",
        sourceUrl: "https://www.gov.uk/smoking-at-work-the-law" },
      { text: "בדלי סיגריות נחשבים לפי החוק לפסולת: ״litter״ כולל בדלי סיגריות וסיגרים שהושלכו (Environmental Protection Act 1990, s.98(5A)).",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/1990/43/section/98" },
      { text: "את גובה הקנס על השלכת פסולת קובעת המועצה המקומית (EPA 1990, s.88(6A)). אם המועצה לא קבעה סכום, באנגליה חל £100.",
        sourceUrl: "https://www.legislation.gov.uk/ukpga/1990/43/section/88" },
      { text: "הטווח המותר למועצות באנגליה מ־1.09.2026 הוא בין £65 ל־£750 (Environmental Offences (Fixed Penalties) (England) Regulations 2017, reg.5, בנוסח SI 2026/816).",
        sourceUrl: "https://www.legislation.gov.uk/uksi/2017/1050/regulation/5" },
      { text: "Westminster (סוהו, ווסט אנד וכו׳): על השלכת פסולת, קוד CN1 (EPA s.87/88), קנס £200, ובתשלום תוך 10 ימים £120. בבית משפט אפשר לקבל עד £2,500. הטבלה מתוארכת לאפריל 2024, אבל זו שמופיעה כעת בעמוד המועצה.",
        sourceUrl: "https://www.westminster.gov.uk/sites/default/files/media/documents/Offence%20Codes%2C%20Description%20of%20Offences%20and%20Penalties%20Apr%2024_1.pdf" },
      { text: "מועצת Westminster מאשרת שהיא נותנת קנסות גם על פסולת רגילה וגם על פסולת עישון (״littering - both general and smoking litter״).",
        sourceUrl: "https://www.westminster.gov.uk/recycling-and-rubbish/waste-strategy-and-enforcement/fixed-penalty-notice-fpns" }
    ]
  },
  {
    title: "4. ייבוא פטור ממכס מישראל לבריטניה",
    items: [
      { text: "טבק: מותר להכניס פריט אחד מהרשימה: 200 סיגריות, 100 סיגרילות, 50 סיגרים, 250 גרם טבק או 200 מקלות לטבק מחומם. אפשר לחלק את המכסות: למשל 100 סיגריות ו־25 סיגרים (חצי מכל מכסה). אם חרגתם מהמכסה, משלמים מכס ומס על כל הטבק בקטגוריה הזו.",
        sourceUrl: "https://www.gov.uk/bringing-goods-into-uk-personal-use/arriving-in-Great-Britain" },
      { text: "נוזל לווייפ: עד 50 מ״ל. אם יותר — המכס נגבה על כל הכמות.",
        sourceUrl: "https://www.gov.uk/bringing-goods-into-uk-personal-use/arriving-in-Great-Britain" },
      { text: "גיל: ב־gov.uk כתוב שאין מכסות פטורות ממכס למי שמתחת לגיל 17 (ולא 18). הגבלת גיל 18 לא מופיעה בעמוד הזה.",
        sourceUrl: "https://www.gov.uk/bringing-goods-into-uk-personal-use/arriving-in-Great-Britain" },
      { text: "כל מה שמעבר למכסה צריך להצהיר. אפשר להצהיר אונליין עד 5 ימים (120 שעות) לפני הנחיתה. בהפרת הכללים אפשר להחרים את הסחורה ולתת קנס.",
        sourceUrl: "https://www.gov.uk/bringing-goods-into-uk-personal-use" }
    ]
  },
  {
    title: "5. מחיר חפיסה (20 יח׳)",
    items: [
      { text: "ONS (RPI, מחיר ממוצע לחפיסת 20 king size עם פילטר): הממוצע לשנת 2024 — 1585 פני, כלומר £15.85. הערך האחרון בסדרה, ינואר 2025, הוא £16.60. אין בסדרה הזו נתונים עדכניים יותר, למרות שהעמוד עודכן ב־16.09.2026.",
        sourceUrl: "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/czmp/mm23" },
      { text: "הבלו של HMRC על סיגריות מ־1.10.2026: £394.09 ל־1000 יחידות ועוד 16.5% מהמחיר לצרכן. לפי הערכת gov.uk, חפיסה של 20 תתייקר ב־£1.21. הבלו המינימלי הוא £518.75 ל־1000 יחידות, לפי החישוב שלנו כ־£10.38 לחפיסה של 20 בלי מע״מ. מחיר ממוצע רשמי לחפיסה לנובמבר 2026 לא מצאנו.",
        sourceUrl: "https://www.gov.uk/government/publications/rates-and-allowances-excise-duty-tobacco-duty/excise-duty-tobacco-duty-rates" }
    ]
  },
  {
    title: "טיפים מעשיים",
    items: [
      { text: "לעשן רק ברחוב או במקום שאין מעליכם סוכך או שהקירות פתוחים לפחות במחצית. אם במרפסת תלוי שלט ״No smoking״, הוא מחייב גם אתכם. לא לעשן ולא לעשות וייפ בשום מקום בשטח של TfL, כולל רציפים מעל הקרקע. בדלים לזרוק רק לפח או למאפרה ניידת: ב־Westminster על בדל שנזרק — קנס של £200.",
        sourceUrl: "https://content.tfl.gov.uk/tfl-conditions-of-carriage.pdf" },
      { text: "מישראל לא להביא יותר מ־200 סיגריות (או מקבילה לפי מכסות אחרות) ו־50 מ״ל נוזל לווייפ. סיגריות בבריטניה יקרות: ב־2024 חפיסה עלתה בממוצע £15.85.",
        sourceUrl: "https://www.gov.uk/bringing-goods-into-uk-personal-use/arriving-in-Great-Britain" }
    ]
  }
];

/* ---------- חג המולד: מה פתוח ב־17–21.11 ---------- */
const XMAS = [
  ["האורות של <b>Regent St</b> (מלאכים)", "5 בנובמבר", "✅"],
  ["האורות של <b>Carnaby St</b> (נושא שנות ה־90)", "4 בנובמבר", "✅"],
  ["האורות של <b>Oxford St</b>", "התאריך לא הוכרז, צפוי ~2 בנובמבר [[לבדוק]]", "✅ כנראה"],
  ["<b>Covent Garden</b>: עץ 55 ft, יותר מ־300,000 אורות", "12 בנובמבר", "✅"],
  ["האורות של <b>Bond St</b> (כתרים)", "12 בנובמבר [[לבדוק]]", "✅"],
  ["אורות West End: Piccadilly, Leicester Sq, St Martin's Lane", "~1 בנובמבר (הערכה) [[לבדוק]]", "✅ כנראה"],
  ["השוק ב־<b>Leicester Square</b> (Underbelly)", "~31 באוקטובר – 3 בינואר [[לבדוק]]", "✅"],
  ["<b>Southbank Winter Market</b> (Queen's Walk, התמזה)", "2 בנובמבר – 4 בינואר, 11:00–22:00", "✅"],
  ["<b>Hyde Park Winter Wonderland</b>", "<b>19 בנובמבר</b> – 3 בינואר; 19–20.11 מ־12:00 עד 22:00", "✅ רק ה׳ 19 ו־ו׳ 20"],
  ["Old Spitalfields — אורות", "11 בנובמבר [[לבדוק]]", "✅"],
  ["Leadenhall Market — אורות", "19 בנובמבר, 18:00 [[לבדוק]]", "✅ מה׳ 19"],
  ["חלונות הראווה של <b>Fortnum &amp; Mason</b>", "בדרך כלל סוף אוקטובר (החנות לא מפרסמת תאריך מדויק)", "✅ כנראה"],
  ["חלונות הראווה של <b>Selfridges</b>", "התאריך ל־2026 לא הוכרז (ב־2025 — 6 בנובמבר) [[לבדוק]]", "❓ כנראה"],
  ["העץ ב־<b>Trafalgar Square</b>", "מדליקים <b>בדצמבר</b>; ב־2026 — 3 בדצמבר (לפי מקורות לא רשמיים) [[לבדוק]]", "❌ לא יהיה מואר"]
];
const XMAS_SOURCES = "מקורות: <a href='https://www.regentstreetonline.com/events/switch-on-2026' target='_blank' rel='noopener'>Regent Street</a> · <a href='https://www.coventgarden.london/event/covent-garden-lights-switch-on' target='_blank' rel='noopener'>Covent Garden</a> · <a href='https://www.shaftesburycapital.com/getContentAsset/543c3303-0b2e-4612-8398-e9a6acc7b428/a7351c63-0bbb-4a79-a8a6-3c91dee7f00a/cg-and-carnaby-combined-switch-on-announcement.pdf?language=en' target='_blank' rel='noopener'>הודעה לעיתונות Carnaby/Covent Garden</a> · <a href='https://hydeparkwinterwonderland.com/tickets-guide/' target='_blank' rel='noopener'>Winter Wonderland</a> · <a href='https://southbank.london/whats-on/winter-market' target='_blank' rel='noopener'>Southbank Winter Market</a> · <a href='https://leicestersquare.london/newsletters/christmas-in-leicester-square' target='_blank' rel='noopener'>Leicester Square</a> · <a href='https://support.fortnumandmason.com/hc/en-gb/articles/4406498578961-When-do-your-Christmas-windows-appear-in-Piccadilly' target='_blank' rel='noopener'>Fortnum &amp; Mason</a> · <a href='https://www.london.gov.uk/who-we-are/city-halls-buildings-and-squares/trafalgar-square/christmas' target='_blank' rel='noopener'>London.gov: Trafalgar</a> · <a href='https://londonist.com/london/christmas-in-london/when-are-london-s-christmas-lights-switched-on' target='_blank' rel='noopener'>Londonist: תאריכי האורות</a>";
const XMAS_ROUTE = "מסלול האורות: Oxford Circus ← Regent St ← Carnaby ← Piccadilly (Fortnum &amp; Mason) ← Leicester Sq ← Covent Garden ← Trafalgar Sq ← דרך Hungerford Bridge ל־South Bank.";
const XMAS_ROUTE_PLACES = ["oxford", "regent", "carnaby", "fortnum", "leicester", "covent", "trafalgar", "southbank"];

/* ---------- קניות 5.11 / UF Pro ---------- */
const SHOP = {
  intro: "אין בבריטניה חנויות רשמיות של 5.11 ו־UF Pro.",
  silvermans: "<b>Silvermans</b> — לונדון<br>422–426 Mile End Rd, London E1 4PE · ב׳–ו׳ 10:00–17:00<br><span class='small'>יש 5.11 בחנות, אבל <b>אין</b> Skyweight 36L ו־Utility Chest Pack.</span> <a href='https://www.silvermans.co.uk/collections/brand-5-11' target='_blank' rel='noopener'>silvermans.co.uk</a>",
  tactreeTitle: "<b>TacTree</b> — סוחר הדגל של 5.11 בבריטניה (טלפורד, אונליין)",
  tactree: [
    { item: "Skyweight 36L Pack", url: "https://tactree.co.uk/products/511-skyweight-36l-pack", color: "Volcanic (S/M, L/XL במלאי)", price: "£180.50" },
    { item: "Skyweight Utility Chest Pack", url: "https://tactree.co.uk/products/511-skyweight-utility-chest-pack", color: "Volcanic (במלאי)", price: "£61.75" }
  ],
  priceDate: "17.10.2026",
  tactreeNote: "אפשרות: להזמין משלוח לכתובת בלונדון (המלון) — כשתהיה הזמנה; זמני משלוח [[לבדוק]].",
  more: [
    "<b>Chest Pack כתום</b> — רק באתר 5.11 בארה״ב: <b>$70</b>. <a href='https://www.511tactical.com/skyweight-utility-chest-pack.html' target='_blank' rel='noopener'>511tactical.com</a>",
    "<b>UF Pro</b> — אונליין ב־UK Tactical. <a href='https://www.uktactical.com/uf-pro/clothing-and-footwear/tactical-clothing' target='_blank' rel='noopener'>uktactical.com</a>"
  ],
  warn: "⚠️ תיק גב 36L = צריך כבודה נוספת לאדמונט בטיסה חזרה (ראו ״טיסות״)."
};

/* ---------- הסרטונים של אמה (קישורים מהצ׳אט, כמו שהם) ---------- */
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

/* ---------- ילדים (בבית) — אותם key כמו בגרסה הרוסית, כדי שהערכים השמורים יישארו ---------- */
const KIDS = [
  { key: "who",       label: "מי נשאר עם הילדים" },
  { key: "when",      label: "מתי (תאריכים / לו״ז)" },
  { key: "contact",   label: "אנשי קשר" },
  { key: "school",    label: "בית ספר / חוגים 17–21.11 (מי מסיע)" },
  { key: "home",      label: "מפתחות / אוכל / כסף" },
  { key: "emergency", label: "איש קשר לחירום" }
];

/* ---------- רשימות (אותם id — הסימונים נשמרים בין השפות) ---------- */
const CHECKLISTS = [
  { id: "docs", title: "📄 מסמכים", items: [
    { id: "eta-ed", text: "ETA UK — אדמונט (£20) — לקבל אישור במייל" },
    { id: "eta-em", text: "ETA UK — אמה (£20) — לקבל אישור במייל" },
    { id: "pass",   text: "דרכונים (אותם דרכונים שעליהם הוצא ה־ETA) — תוקף [[לבדוק]]" },
    { id: "ins",    text: "ביטוח — TBD (איזה ועל מי)" },
    { id: "ci-out", text: "צ׳ק־אין אונליין Wizz הלוך: מ־16.11 15:20 (שעון ישראל), עד 3 שעות לפני ההמראה" },
    { id: "ci-back",text: "צ׳ק־אין אונליין Wizz חזור: מ־20.11 07:25 (שעון לונדון), עד 3 שעות לפני ההמראה" },
    { id: "bp",     text: "כרטיסי עלייה למטוס Wizz — אחרי הצ׳ק־אין האונליין (24 שעות לפני)" },
    { id: "ww",     text: "כרטיסים ל־Winter Wonderland (ה׳ 19.11)" },
    { id: "luton",  text: "להזמין מונית לשבת 21.11 03:45 מ־32 Roland Gardens ל־Luton (מחיר קבוע)" },
    { id: "drive",  text: "תיקייה ב־Google Drive למסמכים (עוד לא נוצרה)" }
  ]},
  { id: "pack", title: "🧳 אריזה", items: [
    { id: "bag",    text: "תיק מתחת למושב ≤ <b>40×30×20 ס״מ, 10 ק״ג</b> (לכל אחד) — <a href='https://www.wizzair.com/en-gb/help-centre/booking-information-and-services/baggage/baggage-allowance/cabin-baggage' target='_blank' rel='noopener'>Wizz</a>" },
    { id: "26kg",   text: "המזוודה של אמה ≤ 26 ק״ג — לשקול בבית" },
    { id: "extra",  text: "כבודה נוספת לאדמונט בטיסה חזרה (אם קונים את התיק)" },
    { id: "plug",   text: "מתאם <b>UK סוג G</b> (שלושה פינים שטוחים), 230V; בשקעים יש מתג — <a href='https://www.visitlondon.com/traveller-information/essential-information/electricity' target='_blank' rel='noopener'>Visit London</a>" },
    { id: "card",   text: "כרטיס ללא מגע / טלפון (Apple/Google Pay) לרכבת התחתית ולאוטובוסים — אותו כרטיס בכניסה וביציאה; תקרה יומית (capping). ייתכנו עמלות מט״ח של הבנק. — <a href='https://tfl.gov.uk/travel-information/visiting-london/getting-around-london/best-ways-for-visitors-to-pay' target='_blank' rel='noopener'>TfL</a>" },
    { id: "cash",   text: "קצת לירות שטרלינג במזומן (לפי הרצון)" },
    { id: "jacket", text: "מעיל חם" },
    { id: "rain",   text: "שכבה עמידה למים + מטרייה" },
    { id: "shoes",  text: "נעליים נוחות" },
    { id: "hat",    text: "כובע / כפפות לבוקר" }
  ]}
];

const WEATHER = "<b>האקלים באמצע נובמבר</b> (Met Office, נורמה 1991–2020, Heathrow): ביום בממוצע <b>~11.5 °C</b> (מקס׳ 11.47), בלילה <b>~5 °C</b> (מינ׳ 5.26), משקעים <b>~67 מ״מ</b> בחודש, <b>~11 ימים</b> עם גשם ≥1 מ״מ, מעט שמש (~71 שעות בחודש). סביב תאריכי הטיול 17–21.11: זריחה בערך <b>07:21–07:28</b>, שקיעה <b>16:03–16:08</b>, אור יום <b>~8 ש׳ 35 דק׳ – 8 ש׳ 47 דק׳</b> (שעון לונדון). ← מעיל חם, שכבה עמידה למים, מטרייה, נעליים נוחות, כובע/כפפות לבוקר (במיוחד ליציאה המוקדמת ל־Luton). <a href='https://www.metoffice.gov.uk/research/climate/maps-and-data/location-specific-long-term-averages/gcpsvg3nc' target='_blank' rel='noopener'>Met Office: Heathrow</a> · <a href='https://www.timeanddate.com/sun/uk/london?month=11&amp;year=2026' target='_blank' rel='noopener'>timeanddate: זריחה/שקיעה, נובמבר 2026</a>.";

/* ---------- שאלות פתוחות ---------- */
const QUESTIONS = [
  "לינה 17–20.11: אזור (King's Cross / Holborn?), תקציב, הזמנה.",
  "הלילה האחרון: מלון ליד Luton (איזה הכי קרוב לטרמינל?) או מרכז העיר + רכבת לילה/מונית.",
  "קונים את תיק הגב 36L? אם כן — לקנות כבודה לאדמונט ולהחליט: הזמנה מ־TacTree עם משלוח למלון או לא.",
  "לבחור מושבים במטוס (ואז צ׳ק־אין אונליין 30 יום לפני)?",
  "מי עם הילדים, לו״ז, אנשי קשר.",
  "ביטוח — איזה ועל מי.",
  "ליצור תיקייה ב־Google Drive למסמכים.",
  "Swiss Butter: המחיר העדכני של הסטייק (£18? £19?).",
  "שעות הפתיחה של Burnt Smokehouse ו־Yuen Kee בנובמבר.",
  "לוח הזמנים המדויק של Thameslink בלילה של 21.11 (National Rail, קרוב לתאריך)."
];
