"use strict";

const APP_VERSION = "v12.2";
const CLOUDINARY_PREFIX = "https://res.cloudinary.com/sgn99usk/";
const FALLBACK_LOGO_URL = "https://res.cloudinary.com/sgn99usk/image/upload/v1795549736/r2hnfddyonxj127l8uop.jpg";
const AVATAR_LOGO_URL = "https://res.cloudinary.com/sgn99usk/image/upload/w_96,h_96,c_fill,r_max,f_auto,q_auto/v1795549736/r2hnfddyonxj127l8uop.jpg";
const DEFAULT_LIVE_STORY_PHOTO = "https://res.cloudinary.com/sgn99usk/image/upload/v1795715001/laparrilla_canva/canva_story_marco_logo.jpg";
const WA_BASE = "https://wa.me/523330723340?text=";
const AUTO_SYNC_MIN_MS = 60 * 1000;
const STALE_AFTER_MS = 5 * 60 * 1000;

const INITIAL_GALLERY = [
  { id: "1", cat: "Burritos", desc: "Burrito de camarón", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549726/dwwndaog2uqtspzguc8x.jpg" },
  { id: "2", cat: "Promo_Flyer", desc: "Flyer Noche de Parrilla", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549728/kjgmbt8clkx9zzmkfpwq.jpg" },
  { id: "3", cat: "Promo_Flyer", desc: "Story Parrilla Cenital", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549729/dpogosacyxs2zrqgbv23.jpg" },
  { id: "4", cat: "Hamburguesas", desc: "Hamburguesa Doble", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549730/igeqrqqwrshgngpzfvbg.jpg" },
  { id: "5", cat: "Hamburguesas", desc: "Hamburguesa Hawaiana", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549731/hwclncghfq1rcwexnoeq.jpg" },
  { id: "6", cat: "Tacos", desc: "Orden 3 Tacos", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549733/uhexz0z5dl7amgkj8ssg.jpg" },
  { id: "7", cat: "Tacos", desc: "Story Gringas Parrilleras", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549734/zyguqxpumpwgycc1jjil.jpg" },
  { id: "8", cat: "Hamburguesas", desc: "Hamburguesa Parrillera", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549735/oaivtu53xrfmcaosswa5.jpg" },
  { id: "9", cat: "Local", desc: "Logo Oficial La Parrilla", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549736/r2hnfddyonxj127l8uop.jpg" },
  { id: "10", cat: "Promo_Flyer", desc: "Story Noches de Parrilla", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549737/ag53u4xmnirzs1zmvebu.jpg" },
  { id: "11", cat: "Botanas", desc: "Boneless Búfalo", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549739/yasdg9jlqcwq7zrwi8j9.jpg" },
  { id: "12", cat: "Hamburguesas", desc: "Pollo Crispy + Papas", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549740/hthkfxn3sojgfqjshyjp.jpg" },
  { id: "13", cat: "Tacos", desc: "Tacos al Carbón HD", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549741/xmtrbteuvcivz84jgqw7.jpg" },
  { id: "14", cat: "Menu", desc: "Menú Oficial Completo", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549742/tdfyo1hnfrdrffezkjhx.jpg" },
  { id: "15", cat: "Canva", desc: "Canva: Jueves Burgers al Carbón", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795714992/laparrilla_canva/canva_jueves_burgers_carbon.jpg" },
  { id: "16", cat: "Canva", desc: "Canva: Miércoles de Boneless", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795736337/laparrilla_canva/canva_miercoles_boneless.jpg" },
  { id: "17", cat: "Canva", desc: "Canva: Sábado de Parrillada", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795714999/laparrilla_canva/canva_sabado_parrillada.jpg" },
  { id: "18", cat: "Canva", desc: "Canva: Plantilla Historia 9:16", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795715001/laparrilla_canva/canva_story_marco_logo.jpg" },
  { id: "19", cat: "Canva", desc: "Canva: Menú Mié–Jue", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795715003/laparrilla_canva/canva_menu_mie_jue.jpg" },
  { id: "20", cat: "Canva", desc: "Canva: Menú Vie–Dom", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795715005/laparrilla_canva/canva_menu_vie_dom.jpg" },
  { id: "21", cat: "Canva", desc: "Canva: Viernes Tacos al Carbón", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795736332/laparrilla_canva/canva_viernes_tacos_carbon.jpg" },
  { id: "22", cat: "Canva", desc: "Canva: Domingo Gringa Parrillera", url: "https://res.cloudinary.com/sgn99usk/image/upload/v1795736335/laparrilla_canva/canva_domingo_gringa_parrillera.jpg" }
];

const SVG_ICONS = {
  check: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  edit: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  photo: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
  copy: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  sync: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>',
  flame: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  alert: '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  lock: '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  cloud: '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>'
};

function icon(name) { return SVG_ICONS[name] || ""; }

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isAllowedMedia(url) {
  const s = String(url || "").trim();
  return s.startsWith(CLOUDINARY_PREFIX) && !/[\s"'<>`\\]/.test(s);
}

function safeCloudinaryUrl(url, fallback = FALLBACK_LOGO_URL) {
  return isAllowedMedia(url) ? String(url).trim() : fallback;
}

function getTodayMx() {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Mexico_City",
      year: "numeric", month: "2-digit", day: "2-digit"
    }).format(new Date());
  } catch {
    return new Date(Date.now() - 6 * 3600 * 1000).toISOString().slice(0, 10);
  }
}

function getNowTimeMx() {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Mexico_City",
      hour: "2-digit", minute: "2-digit", hour12: false
    }).format(new Date());
  } catch {
    return "19:30";
  }
}

function getNextWeekDatesMx() {
  const today = getTodayMx();
  const [y, m, d] = today.split("-").map(Number);
  const base = new Date(y, m - 1, d, 12, 0, 0);
  const dow = base.getDay();
  let daysToWed = (3 - dow + 7) % 7;
  if (daysToWed === 0) daysToWed = 7;
  const fmt = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  return {
    "Mié": fmt(new Date(base.getTime() + daysToWed * 86400000)),
    "Jue": fmt(new Date(base.getTime() + (daysToWed + 1) * 86400000)),
    "Vie": fmt(new Date(base.getTime() + (daysToWed + 2) * 86400000)),
    "Sáb": fmt(new Date(base.getTime() + (daysToWed + 3) * 86400000)),
    "Dom": fmt(new Date(base.getTime() + (daysToWed + 4) * 86400000))
  };
}

function getDiaFromFecha(fechaStr) {
  const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const m = String(fechaStr || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return days[d.getDay()] || "";
}

function formatReadableDate(fechaStr, horaStr) {
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const m = String(fechaStr || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  const dia = getDiaFromFecha(fechaStr);
  const datePart = m ? `${dia} ${Number(m[3])} ${months[Number(m[2]) - 1]}` : String(fechaStr || "");
  const hm = String(horaStr || "18:00").match(/^(\d{1,2}):(\d{2})/);
  let timePart = horaStr || "18:00";
  if (hm) {
    const h24 = Number(hm[1]);
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    const ampm = h24 >= 12 ? "pm" : "am";
    timePart = `${h12}:${hm[2]} ${ampm}`;
  }
  return `${datePart} · ${timePart}`;
}

function getRelativeTimeForToday(fechaStr, horaStr) {
  if (fechaStr !== getTodayMx()) return "";
  const hm = String(horaStr || "").match(/^(\d{1,2}):(\d{2})/);
  if (!hm) return "";
  const nowHm = getNowTimeMx().split(":").map(Number);
  const diffMin = (Number(hm[1]) * 60 + Number(hm[2])) - (nowHm[0] * 60 + nowHm[1]);
  if (diffMin <= 0) return diffMin > -120 ? "en cola hoy" : "";
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return h > 0 ? `en ${h} h ${m} min` : `en ${m} min`;
}

function normalizeRed(red) {
  const r = String(red || "AMBAS").trim().toUpperCase();
  if (r === "FACEBOOK" || r === "FB") return "FB";
  if (r === "INSTAGRAM" || r === "IG") return "IG";
  return "AMBAS";
}

function isErrorEstado(est) {
  const e = String(est || "").toUpperCase();
  return e === "ERROR" || e === "ERROR_IG" || e === "ERROR_FB" || e === "PARCIAL";
}

const FORBIDDEN_PRICE_RE = /(\$|\bprecio(?:s)?\b|\bpesitos?\b|\b2\s*x\s*1\b|\bpromo\s+de\b)/gi;
const MIE_JUE_FORBIDDEN_RE = /\b(tacos?|gringas?|burritos?|quesadillas?|volc[aá]n|parrilladas?)\b/gi;

function hasForbiddenPriceWords(txt) {
  FORBIDDEN_PRICE_RE.lastIndex = 0;
  return FORBIDDEN_PRICE_RE.test(String(txt || ""));
}

function highlightForbiddenHtml(txt, dia) {
  const raw = String(txt || "");
  const parts = [];
  if (hasForbiddenPriceWords(raw)) {
    const highlighted = escapeHtml(raw).replace(FORBIDDEN_PRICE_RE, (m) => `<mark>${m}</mark>`);
    parts.push(`<div>⛔ <strong>Bloqueado (precio/promo):</strong> ${highlighted}</div>`);
  }
  if ((dia === "Mié" || dia === "Jue") && MIE_JUE_FORBIDDEN_RE.test(raw)) {
    MIE_JUE_FORBIDDEN_RE.lastIndex = 0;
    const highlighted = escapeHtml(raw).replace(MIE_JUE_FORBIDDEN_RE, (m) => `<mark>${m}</mark>`);
    parts.push(`<div style="color:#fde68a;">⚠️ <strong>Regla ${escapeHtml(dia)}:</strong> solo hamburguesas, boneless, papas y bebidas → ${highlighted}</div>`);
  }
  return parts.join("");
}

function buildAutoStoryCopy(fullCopy) {
  const clean = String(fullCopy || "").replace(/https?:\/\/\S+/g, "").replace(/#\S+/g, "").replace(/\s+/g, " ").trim();
  if (!clean) return "🔥 ¡Hoy toca La Parrilla! Pide por WhatsApp o ven desde 7:30 pm 👇";
  if (clean.length <= 90) return clean;
  return clean.slice(0, 72).trim() + "… Pide por WA 👇";
}

function getEffectiveStoryCopy(post) {
  const cs = String(post.copy_story || "").trim();
  if (cs) return cs;
  if (post.formato === "STORY" && String(post.copy || "").trim().length <= 90) return String(post.copy).trim();
  return buildAutoStoryCopy(post.copy);
}

function isGraphicOrFlyerUrl(url) {
  const u = String(url || "");
  return u.includes("/laparrilla_canva/") ||
    /kjgmbt8clkx9zzmkfpwq|dpogosacyxs2zrqgbv23|igeqrqqwrshgngpzfvbg|hwclncghfq1rcwexnoeq|zyguqxpumpwgycc1jjil|oaivtu53xrfmcaosswa5|r2hnfddyonxj127l8uop|ag53u4xmnirzs1zmvebu|hthkfxn3sojgfqjshyjp|tdfyo1hnfrdrffezkjhx/i.test(u);
}

function applyCloudinaryTransform(url, cropMode) {
  const safe = safeCloudinaryUrl(url, "");
  if (!safe) return "";
  const clean = safe.replace(/\/image\/upload\/(?:[^/]+,[^/]+\/)?/, "/image/upload/");
  const pad = isGraphicOrFlyerUrl(clean);
  if (cropMode === "FEED") {
    return clean.replace("/image/upload/", pad
      ? "/image/upload/c_pad,b_rgb:0d0b0a,ar_4:5,w_1080,q_auto,f_auto/"
      : "/image/upload/c_fill,g_auto,ar_4:5,w_1080,q_auto,f_auto/");
  }
  if (cropMode === "STORY") {
    return clean.replace("/image/upload/", pad
      ? "/image/upload/c_pad,b_rgb:0d0b0a,ar_9:16,w_1080,h_1920,q_auto,f_auto/"
      : "/image/upload/c_fill,g_auto,ar_9:16,w_1080,h_1920,q_auto,f_auto/");
  }
  return clean;
}

const INITIAL_POSTS = [
  {
    id: 3, fecha: "2026-11-25", dia: "Mié", hora: "18:00", red: "AMBAS", formato: "POST", estado: "PUBLICADO", version: 1, editado_por: "",
    copy: "🔥 ¡Mitad de semana se cura con unos boneless búfalo bien calientitos! Pásale hoy a La Parrilla por los tuyos, recién salidos y con todo el sabor. Te esperamos de 7:30 pm a 11:30 pm en Filiberto Ruvalcaba Sánchez 503, Col. La Garita, Ixtlahuacán del Río. Pide también para llevar por WhatsApp al 33 3072 3340. #LaParrilla #IxtlahuacanDelRio #Boneless",
    copy_story: "🔥 Miércoles de Boneless búfalo recién salidos. Pide por WhatsApp hoy 7:30 pm 👇",
    foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795736337/laparrilla_canva/canva_miercoles_boneless.jpg"
  },
  {
    id: 4, fecha: "2026-11-26", dia: "Jue", hora: "18:00", red: "AMBAS", formato: "POST", estado: "BORRADOR", version: 1, editado_por: "Esposa",
    copy: "Llegó el gran debate de jueves en Ixtlahuacán del Río. ¿Eres del equipo Hamburguesa Doble con doble dosis de carne al carbón o prefieres el toque dulce de la Hawaiana con su piña asada? Deja en los comentarios tu favorita y etiqueta a la persona que te va a acompañar hoy por la suya. Te esperamos con el carbón encendido de 7:30 pm a 11:30 pm en Filiberto Ruvalcaba Sánchez 503, colonia La Garita. #IxtlahuacanDelRio #LaParrilla #HamburguesasAlCarbon",
    copy_story: "🍔 Debate de jueves: ¿Hamburguesa Doble o Hawaiana al carbón? Vota y pide hoy 👇",
    foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795714992/laparrilla_canva/canva_jueves_burgers_carbon.jpg"
  },
  {
    id: 5, fecha: "2026-11-27", dia: "Vie", hora: "18:00", red: "AMBAS", formato: "POST", estado: "APROBADO", version: 1, editado_por: "",
    copy: "🔥 ¡Ya es viernes y hoy prendemos el carbón con TODO nuestro menú completo! Ven por tus tacos al carbón, parrilladas para compartir, hamburguesas o gringas recién hechas. Te esperamos hoy de 7:30 pm a 11:30 pm en Filiberto Ruvalcaba Sánchez 503, Col. La Garita, Ixtlahuacán del Río, o haz tu pedido por WhatsApp al 33 3072 3340. #ViernesDeParrilla #IxtlahuacanDelRio #LaParrilla",
    copy_story: "🌮 ¡Viernes de menú completo al carbón! Tacos, gringas y parrilladas desde 7:30 👇",
    foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795736332/laparrilla_canva/canva_viernes_tacos_carbon.jpg"
  },
  {
    id: 6, fecha: "2026-11-28", dia: "Sáb", hora: "18:00", red: "AMBAS", formato: "POST", estado: "APROBADO", version: 1, editado_por: "",
    copy: "El sábado se disfruta mejor en familia y con el auténtico sabor al carbón. Hoy tenemos lista la parrilla con nuestro menú completo: deliciosas parrilladas para compartir con arrachera, diezmillo, chorizo, quesadillas y tortillas recién hechas a mano. Pedidos por WhatsApp al 33 3072 3340. #IxtlahuacanDelRio #LaParrilla #CenasIxtlahuacan",
    copy_story: "🥩 Sábado de Parrillada familiar al carbón con tortillas a mano. Aparta por WA 👇",
    foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795714999/laparrilla_canva/canva_sabado_parrillada.jpg"
  },
  {
    id: 7, fecha: "2026-11-29", dia: "Dom", hora: "19:30", red: "AMBAS", formato: "STORY", estado: "APROBADO", version: 1, editado_por: "",
    copy: "🧀 Domingo de Gringa Parrillera con queso fundido al carbón. Pide la tuya hoy 👇",
    copy_story: "🧀 Domingo de Gringa Parrillera con queso fundido al carbón. Pide la tuya hoy 👇",
    foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549734/zyguqxpumpwgycc1jjil.jpg"
  }
];

function buildDefaultSuggestions() {
  const nw = getNextWeekDatesMx();
  return [
    { sid: "S1", titulo: "Miércoles · A: Boneless crujientes recién bañados", fecha: nw["Mié"], dia: "Mié", hora: "18:00", red: "AMBAS", formato: "POST", copy: "🔥 Escucha ese crujido: hoy toca cortar la semana con unos Boneless bien bañados en salsa y papas doraditas al momento. Ven a La Parrilla de 7:30 pm a 11:30 pm en Col. La Garita, o pide directo 👉 https://wa.me/523330723340?text=Hola%20La%20Parrilla%2C%20quiero%20pedir%20unos%20Boneless #LaParrilla #MiercolesDeBoneless", copy_story: "🔥 Miércoles de Boneless crujientes. ¿Búfalo o Mango Habanero? Pide por WA 👇", foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795736337/laparrilla_canva/canva_miercoles_boneless.jpg" },
    { sid: "S2", titulo: "Miércoles · B: Encuesta rápida de salsas y papas", fecha: nw["Mié"], dia: "Mié", hora: "18:30", red: "AMBAS", formato: "STORY", copy: "🌶️ ¿Con qué salsa se disfrutan mejor tus boneless este miércoles: Búfalo clásico o Mango Habanero? Pide los tuyos desde las 7:30 pm 👉 https://wa.me/523330723340?text=Hola%20La%20Parrilla%2C%20quiero%20boneless", copy_story: "🌶️ ¿Qué salsa manda hoy en tus boneless? Vota aquí y pide desde las 7:30 pm 🔥", foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549739/yasdg9jlqcwq7zrwi8j9.jpg" },
    { sid: "S3", titulo: "Jueves · A: Burgers al carbón jugosas al momento", fecha: nw["Jue"], dia: "Jue", hora: "18:00", red: "AMBAS", formato: "POST", copy: "🍔 Carne jugosa sellada al carbón, queso derretido y pan suavecito recién salido de la parrilla. Te esperamos de 7:30 pm a 11:30 pm en Col. La Garita. Pide por WhatsApp 👉 https://wa.me/523330723340?text=Hola%20La%20Parrilla%2C%20quiero%20una%20hamburguesa #JuevesDeBurgers #LaParrilla", copy_story: "🍔 Jueves de Burgers al carbón recién salidas. ¿Doble o Hawaiana? Pide hoy 👇", foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795714992/laparrilla_canva/canva_jueves_burgers_carbon.jpg" },
    { sid: "S4", titulo: "Jueves · B: Reto Burger + Pollo Crispy con papas", fecha: nw["Jue"], dia: "Jue", hora: "18:30", red: "AMBAS", formato: "STORY", copy: "🔥 Etiqueta a quien te debe una hamburguesa al carbón o crispy de pollo con papas hoy jueves. Prendemos brasas de 7:30 pm a 11:30 pm 👉 https://wa.me/523330723340?text=Hola%20La%20Parrilla%2C%20quiero%20burgers", copy_story: "🔥 Huele a burger al carbón en La Garita. Etiqueta a quien te invita hoy por WA!", foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549740/hthkfxn3sojgfqjshyjp.jpg" },
    { sid: "S5", titulo: "Viernes · A: Viernes de Tacos al Carbón (menú completo)", fecha: nw["Vie"], dia: "Vie", hora: "18:00", red: "AMBAS", formato: "POST", copy: "🌮 ¡Arranca el fin de semana con el olor inconfundible del carbón encendido! Hoy viernes tenemos MENÚ COMPLETO: tacos al carbón de arrachera, diezmillo y chorizo. Pide ya 👉 https://wa.me/523330723340?text=Hola%20La%20Parrilla%2C%20quiero%20tacos%20al%20carbon #ViernesDeTacos #LaParrilla", copy_story: "🌮 ¡Viernes de menú completo! Tacos al carbón desde 7:30 pm. ¿Asada o adobada? 👇", foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795736332/laparrilla_canva/canva_viernes_tacos_carbon.jpg" },
    { sid: "S6", titulo: "Viernes · B: Ya prendimos las brasas (Historia en vivo)", fecha: nw["Vie"], dia: "Vie", hora: "19:15", red: "AMBAS", formato: "STORY", copy: "🔥 ¡El carbón ya está al rojo vivo en La Parrilla! Ven por tacos, gringas, parrilladas o hamburguesas desde las 7:30 pm 👉 https://wa.me/523330723340?text=Hola%20La%20Parrilla%2C%20quiero%20pedir%20hoy", copy_story: "🔥 ¡Ya prendimos el carbón! Menú completo listo hoy en La Parrilla. Pide aquí 👇", foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795715001/laparrilla_canva/canva_story_marco_logo.jpg" },
    { sid: "S7", titulo: "Sábado · A: Parrillada familiar al carbón para compartir", fecha: nw["Sáb"], dia: "Sáb", hora: "18:00", red: "AMBAS", formato: "POST", copy: "🥩 Sábado de reunir a la familia alrededor del sabor al carbón. Nuestra Parrillada llega humeante con arrachera, diezmillo, chorizo, quesadillas y tortillas hechas a mano. Aparta por WA 👉 https://wa.me/523330723340?text=Hola%20La%20Parrilla%2C%20quiero%20una%20parrillada #SabadoDeParrillada #LaParrilla", copy_story: "🥩 Sábado de Parrillada para compartir con tortillas a mano. Aparta por WhatsApp 👇", foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795714999/laparrilla_canva/canva_sabado_parrillada.jpg" },
    { sid: "S8", titulo: "Sábado · B: Noche de parrilla con amigos en La Garita", fecha: nw["Sáb"], dia: "Sáb", hora: "18:30", red: "AMBAS", formato: "STORY", copy: "🔥 ¿Sin plan para cenar hoy sábado? Menú completo al carbón de 7:30 pm a 11:30 pm. Pide aquí 👉 https://wa.me/523330723340?text=Hola%20La%20Parrilla%2C%20quiero%20cenar%20hoy", copy_story: "🔥 ¿Sin plan hoy sábado? Arma la mesa en La Parrilla desde las 7:30 pm. ¡Ven!", foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549729/dpogosacyxs2zrqgbv23.jpg" },
    { sid: "S9", titulo: "Domingo · A: Cierre de semana con Gringa Parrillera", fecha: nw["Dom"], dia: "Dom", hora: "18:00", red: "AMBAS", formato: "POST", copy: "🧀 Nada cierra mejor el domingo que una Gringa Parrillera en tortilla de harina doradita, queso fundido y carne recién salida de las brasas. Pide en un toque 👉 https://wa.me/523330723340?text=Hola%20La%20Parrilla%2C%20quiero%20una%20Gringa%20Parrillera #DomingoDeGringa #LaParrilla", copy_story: "🧀 Domingo de Gringa Parrillera con queso fundido al carbón. Pide la tuya hoy 👇", foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795736335/laparrilla_canva/canva_domingo_gringa_parrillera.jpg" },
    { sid: "S10", titulo: "Domingo · B: Domingo sin cocinar, pide por WhatsApp", fecha: nw["Dom"], dia: "Dom", hora: "18:30", red: "AMBAS", formato: "STORY", copy: "🙌 Hoy domingo descansa de la cocina: tacos al carbón, gringas, parrilladas y hamburguesas recién hechas de 7:30 pm a 11:30 pm 👉 https://wa.me/523330723340?text=Hola%20La%20Parrilla%2C%20pedido%20de%20domingo", copy_story: "🙌 Hoy domingo no cocines: pide tacos, gringas o burgers por WhatsApp desde 7:30", foto: "https://res.cloudinary.com/sgn99usk/image/upload/v1795549734/zyguqxpumpwgycc1jjil.jpg" }
  ];
}

// ===== ESTADO GLOBAL =====
const KEYS = { posts: "lp_studio_posts_v2", sugs: "lp_studio_sugs_v4", sync: "lp_studio_sync_v2", seen: "lp_seen_v1" };
function loadJson(k, fallback) {
  try { const r = localStorage.getItem(k); if (r) return JSON.parse(r); } catch {}
  return JSON.parse(JSON.stringify(fallback));
}

let syncCfg = loadJson(KEYS.sync, { url: "", pin: "", preset: "", editor: "Ale" });
if (!syncCfg.editor) syncCfg.editor = "Ale";
// Con Sheets conectado, nunca mostrar posts demo (evita pisar filas reales)
let posts = syncCfg.url ? loadJson(KEYS.posts, []) : loadJson(KEYS.posts, INITIAL_POSTS);
let suggestions = loadJson(KEYS.sugs, buildDefaultSuggestions());
let seenVersions = loadJson(KEYS.seen, {});
let gallery = INITIAL_GALLERY.slice();
let metrics = [];
let errorLogs = [];
let featureFlags = { insightsSyncEnabled: false, autoCommentsEnabled: false };

let currentView = "CALENDAR";     // CALENDAR | SUGGESTIONS | PULSE
let currentFilter = "PENDING";    // PENDING | APROBADO | PUBLICADO | ALL | ERRORS | NEW_OTHER
let dayFilter = null;
let sugDayFilter = "Todos";
let compactMode = true;           // Vista compacta predeterminada (~108 px por fila)
const expandedCards = {};         // id -> true si expandida en vista compacta
const expandedCaptions = {};      // id -> true si expandió "...más" en IG
const expandedSugs = {};          // sid -> true si se abrió "Personalizar"
const previewMode = {};           // key -> IG | STORY | FB
const showSafeZones = {};         // key -> true/false
const destState = {};
const sugInitialEstado = {};

let galleryTarget = null;         // { type: "post"|"sug"|"new"|"live"|"edit", id? }
let galleryCropMode = "ORIG";
let galleryCatFilter = "Todas";
let newPostEstado = "BORRADOR";
let newPostPhoto = INITIAL_GALLERY[3].url;
let liveShotEstado = "APROBADO";
let liveShotPhoto = DEFAULT_LIVE_STORY_PHOTO;
let liveShotConfirmPending = false;
let editingPostId = null;
let editPreviewMode = "IG";
let editPhotoUrl = "";
let conflictPendingForce = null;

let lastSyncAt = 0;
let lastSyncOk = null;
let sessionSynced = false;
let isSyncing = false;
let seenObserver = null;

function saveLocal() {
  try {
    localStorage.setItem(KEYS.posts, JSON.stringify(posts));
    localStorage.setItem(KEYS.sugs, JSON.stringify(suggestions));
    localStorage.setItem(KEYS.sync, JSON.stringify(syncCfg));
    localStorage.setItem(KEYS.seen, JSON.stringify(seenVersions));
  } catch {}
}

// ===== TOASTS CON VARIANTES Y DESHACER =====
let toastActionHandler = null;
function showToast(msg, opts = {}) {
  const { type = "info", duration, actionLabel = "", onAction = null } = typeof opts === "string" ? { type: opts } : opts;
  const el = document.getElementById("toast");
  const msgEl = document.getElementById("toastMsg");
  const actBtn = document.getElementById("toastActionBtn");
  el.classList.remove("success", "error", "warn");
  if (type === "success" || type === "error" || type === "warn") el.classList.add(type);
  msgEl.textContent = String(msg || "");
  toastActionHandler = onAction;
  if (actionLabel && onAction) {
    actBtn.textContent = actionLabel;
    actBtn.style.display = "inline-block";
  } else {
    actBtn.style.display = "none";
  }
  el.classList.add("show");
  clearTimeout(showToast._t);
  const ms = duration || (type === "error" ? 6000 : (onAction ? 5000 : 3000));
  showToast._t = setTimeout(() => el.classList.remove("show"), ms);
}

// ===== BOTONES ANTI DOBLE TOQUE =====
async function withLoading(btn, fn) {
  if (!btn) return await fn();
  if (btn.classList.contains("loading") || btn.disabled) return;
  btn.classList.add("loading");
  btn.disabled = true;
  try {
    return await fn();
  } finally {
    btn.classList.remove("loading");
    btn.disabled = false;
  }
}

// ===== DESTINOS =====
function getDefaultDest(formato, red) {
  const r = normalizeRed(red);
  const isP = String(formato || "POST").toUpperCase() === "POST";
  const isS = String(formato || "").toUpperCase() === "STORY";
  return {
    postFb: isP && r !== "IG",
    postIg: isP && r !== "FB",
    storyFb: isS && r !== "IG",
    storyIg: isS && r !== "FB"
  };
}

function getDest(key, formato, red) {
  if (!destState[key]) destState[key] = getDefaultDest(formato, red);
  return destState[key];
}

function groupDestinations(d) {
  const groups = [];
  if (d.postFb || d.postIg) groups.push({ formato: "POST", red: (d.postFb && d.postIg) ? "AMBAS" : (d.postFb ? "FB" : "IG") });
  if (d.storyFb || d.storyIg) groups.push({ formato: "STORY", red: (d.storyFb && d.storyIg) ? "AMBAS" : (d.storyFb ? "FB" : "IG") });
  return groups;
}

function renderDestSelector(key, d) {
  const groups = groupDestinations(d);
  const isAll = d.postFb && d.postIg && d.storyFb && d.storyIg;
  const isPosts = d.postFb && d.postIg && !d.storyFb && !d.storyIg;
  const isStories = !d.postFb && !d.postIg && d.storyFb && d.storyIg;
  const summary = groups.length
    ? "Sheets: " + groups.map(g => `${g.formato} (${g.red})`).join(" + ")
    : "⚠️ Selecciona al menos 1 destino";
  return `
    <div class="dest-box" data-dest-key="${escapeHtml(key)}">
      <div class="dest-seg">
        <button type="button" class="dest-shortcut-btn ${isAll ? "active" : ""}" data-shortcut="ALL">Todo</button>
        <button type="button" class="dest-shortcut-btn ${isPosts ? "active" : ""}" data-shortcut="POSTS">Posts</button>
        <button type="button" class="dest-shortcut-btn ${isStories ? "active" : ""}" data-shortcut="STORIES">Historias</button>
      </div>
      <div class="dest-grid">
        <label class="dest-chip ${d.postFb ? "checked" : ""}">
          <input type="checkbox" data-dest-field="postFb" ${d.postFb ? "checked" : ""} /> Post FB
        </label>
        <label class="dest-chip ${d.postIg ? "checked" : ""}">
          <input type="checkbox" data-dest-field="postIg" ${d.postIg ? "checked" : ""} /> Post IG
        </label>
        <label class="dest-chip ${d.storyFb ? "checked" : ""}">
          <input type="checkbox" data-dest-field="storyFb" ${d.storyFb ? "checked" : ""} /> Historia FB
        </label>
        <label class="dest-chip ${d.storyIg ? "checked" : ""}">
          <input type="checkbox" data-dest-field="storyIg" ${d.storyIg ? "checked" : ""} /> Historia IG
        </label>
      </div>
      <div class="dest-summary">${escapeHtml(summary)}</div>
    </div>`;
}

// ===== REGLAS SEPARADAS (BLOQUEANTES VS CONSEJOS) =====
function getPostRules(post) {
  const blocks = [];
  const tips = [];
  const dia = post.dia || getDiaFromFecha(post.fecha);
  const txt = String(post.copy || "");
  const stTxt = getEffectiveStoryCopy(post);

  if (hasForbiddenPriceWords(txt) || hasForbiddenPriceWords(post.copy_story || "")) {
    blocks.push("Quita $, 'precio', 'pesitos', '2x1' o 'promo de' para poder aprobar.");
  }
  if (!isAllowedMedia(post.foto)) {
    blocks.push("La imagen debe pertenecer a Cloudinary oficial (sgn99usk).");
  }
  if ((dia === "Mié" || dia === "Jue") && MIE_JUE_FORBIDDEN_RE.test(txt)) {
    MIE_JUE_FORBIDDEN_RE.lastIndex = 0;
    tips.push(`Regla ${dia}: evita mencionar tacos, gringas, burritos o parrilladas.`);
  }
  if (post.formato === "STORY" && stTxt.length > 90) {
    tips.push(`Copy_Story supera 90 caracteres (${stTxt.length}/90).`);
  }
  if (isErrorEstado(post.estado)) {
    blocks.push(`Error de publicación (${post.estado})${post.nota_error ? ": " + post.nota_error : ""}`);
  }
  return { blocks, tips };
}

async function validateBeforeApprove(post) {
  if (!String(post.copy || "").trim()) return { ok: false, error: "Falta Copy_Final antes de aprobar" };
  if (!String(post.fecha || "").trim()) return { ok: false, error: "Falta Fecha antes de aprobar" };
  if (!String(post.hora || "").trim()) return { ok: false, error: "Falta Hora antes de aprobar" };
  if (!String(post.red || "AMBAS").trim()) return { ok: false, error: "Falta Red antes de aprobar" };
  if (!String(post.formato || "").trim()) return { ok: false, error: "Falta Formato antes de aprobar" };
  if (hasForbiddenPriceWords(post.copy) || hasForbiddenPriceWords(post.copy_story || "")) {
    return { ok: false, error: "Aprobación bloqueada: quita $, 'precio', 'pesitos', '2x1' o 'promo de'." };
  }
  const imgUrl = String(post.foto || "").trim();
  if (!isAllowedMedia(imgUrl)) {
    return { ok: false, error: "URL_Media debe iniciar con https://res.cloudinary.com/sgn99usk/" };
  }
  try {
    let res = await fetch(imgUrl, { method: "HEAD" });
    if (!res.ok) res = await fetch(imgUrl, { method: "GET" });
    if (!res.ok) return { ok: false, error: `La imagen respondió HTTP ${res.status}` };
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (ct && !ct.startsWith("image/")) return { ok: false, error: `URL_Media no es imagen (${ct})` };
    return { ok: true };
  } catch {
    return { ok: false, error: "No se pudo verificar que URL_Media sea accesible (HTTP 200)" };
  }
}

function resolveEffectiveEstado(r) {
  const est = String(r.Estado || "BORRADOR").toUpperCase();
  const red = normalizeRed(r.Red || "AMBAS");
  const hasFb = !!String(r.ID_FB || "").trim();
  const hasIg = !!String(r.ID_IG || "").trim();
  if (est === "PUBLICADO" && red === "AMBAS") {
    if (hasFb && !hasIg) return "ERROR_IG";
    if (!hasFb && hasIg) return "ERROR_FB";
    if (!hasFb && !hasIg) return "PARCIAL";
  }
  return est;
}

function formatHora(val) {
  const s = String(val || "").trim();
  if (!s) return "18:00";
  if (/^\d{1,2}:\d{2}/.test(s)) return s.slice(0, 5);
  const d = new Date(s);
  if (!isNaN(d.getTime())) return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return "18:00";
}

function buildTrackableWaUrl(postId) {
  if (syncCfg.url && postId) {
    return `${syncCfg.url}?wa=${encodeURIComponent(String(postId))}`;
  }
  return WA_BASE + encodeURIComponent("Hola La Parrilla, vi su publicación y quiero hacer un pedido 🔥");
}

function mapSheetPostRow(r) {
  const fechaClean = String(r.Fecha || "").slice(0, 10);
  const copyLong = String(r.Copy_Final || "");
  const copyStoryRaw = String(r.Copy_Story || "").trim();
  return {
    id: Number(r.ID),
    fecha: fechaClean,
    dia: getDiaFromFecha(fechaClean),
    hora: formatHora(r.Hora),
    red: normalizeRed(r.Red || "AMBAS"),
    formato: String(r.Formato || "POST").toUpperCase(),
    estado: resolveEffectiveEstado(r),
    copy: copyLong,
    copy_story: copyStoryRaw || (String(r.Formato || "").toUpperCase() === "STORY" && copyLong.length <= 90 ? copyLong : ""),
    foto: safeCloudinaryUrl(r.URL_Media, ""),
    id_fb: String(r.ID_FB || ""),
    id_ig: String(r.ID_IG || ""),
    nota_error: String(r.Nota_Error || ""),
    fecha_pub_real: String(r.Fecha_Publicacion_Real || ""),
    version: Math.max(1, Number(r.Version) || 1),
    editado_por: String(r.Editado_Por || ""),
    clics_wa: Number(r.Clics_WA) || 0,
    alcance: Number(r.Alcance) || 0,
    interacciones: Number(r.Interacciones) || 0,
    guardados: Number(r.Guardados) || 0
  };
}

function isUnseenFromOther(post) {
  const other = String(post.editado_por || "").trim();
  if (!other || other === syncCfg.editor || other === "MotorMeta") return false;
  return Number(post.version || 1) > Number(seenVersions[post.id] || 0);
}

function markPostSeen(post) {
  if (!post) return;
  const v = Number(post.version || 1);
  if (Number(seenVersions[post.id] || 0) < v) {
    seenVersions[post.id] = v;
    saveLocal();
  }
}

// ===== RED Y SINCRONIZACIÓN (POST-ONLY) =====
function formatAgo(ms) {
  const min = Math.floor(ms / 60000);
  if (min < 1) return "ahora";
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  return h < 24 ? `hace ${h} h` : `hace ${Math.floor(h / 24)} d`;
}

function updateSyncPillAndOffline() {
  const pill = document.getElementById("syncPill");
  const banner = document.getElementById("offlineBanner");
  const isOffline = navigator.onLine === false;

  if (banner) {
    if (isOffline) {
      const ago = lastSyncAt ? formatAgo(Date.now() - lastSyncAt) : "local";
      banner.textContent = `📴 Sin conexión · viendo copia (${ago}) · los cambios no se guardarán`;
      banner.classList.add("show");
    } else {
      banner.classList.remove("show");
    }
  }

  ["saveNewPostBtn", "saveLiveShotBtn", "saveEditPostBtn"].forEach(id => {
    const b = document.getElementById(id);
    if (b && !b.classList.contains("loading")) b.disabled = isOffline && !!syncCfg.url;
  });

  if (!pill) return;
  pill.classList.remove("live", "stale", "offline");
  if (!syncCfg.url) {
    pill.textContent = "⚙️ Conectar";
    return;
  }
  if (isSyncing) {
    pill.textContent = "⟳ sincronizando…";
    pill.classList.add("stale");
    return;
  }
  if (isOffline || (lastSyncAt > 0 && lastSyncOk === false)) {
    pill.textContent = "⚠️ sin conexión";
    pill.classList.add("offline");
    return;
  }
  const editor = syncCfg.editor || "Ale";
  if (!lastSyncAt) {
    pill.textContent = `☁️ ${editor}`;
    pill.classList.add("live");
    return;
  }
  const diff = Date.now() - lastSyncAt;
  pill.textContent = `✓ ${formatAgo(diff)} · ${editor}`;
  pill.classList.add(diff < STALE_AFTER_MS ? "live" : "stale");
}

async function pushToSheets(payload) {
  if (!syncCfg.url) return { ok: false, offline: true };
  if (navigator.onLine === false) {
    updateSyncPillAndOffline();
    return { ok: false, error: "Sin conexión a internet: no se guardó en Sheets" };
  }
  try {
    const res = await fetch(syncCfg.url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ pin: syncCfg.pin, editor: syncCfg.editor || "Ale", ...payload })
    });
    const data = await res.json();
    return data && typeof data === "object" ? data : { ok: false, error: "Respuesta inválida del servidor" };
  } catch {
    lastSyncOk = false;
    updateSyncPillAndOffline();
    return { ok: false, error: "Sin conexión con Google Apps Script" };
  }
}

async function syncFromSheets(silent = false) {
  if (!syncCfg.url || isSyncing) return false;
  isSyncing = true;
  updateSyncPillAndOffline();
  if (!sessionSynced && !posts.length) render();
  try {
    const prevById = new Map(posts.map(p => [p.id, p]));
    const data = await pushToSheets({ action: "getAll" });
    if (!data || !data.ok) {
      lastSyncOk = false;
      if (!silent) showToast("⚠️ " + (data?.error || "Error al sincronizar con Sheets"), { type: "error" });
      return false;
    }
    lastSyncAt = Date.now();
    lastSyncOk = true;
    sessionSynced = true;

    const remoteChanges = [];
    if (Array.isArray(data.publicaciones)) {
      // Si la hoja viene vacía, mostramos estado vacío limpio (NUNCA rellenar con demo)
      posts = data.publicaciones
        .filter(r => Number(r.ID) >= 3)
        .map(mapSheetPostRow);

      posts.forEach(p => {
        const prev = prevById.get(p.id);
        if (prev && p.editado_por && p.editado_por !== syncCfg.editor && p.version > (prev.version || 1)) {
          const verb = prev.estado !== p.estado && p.estado === "APROBADO" ? "aprobó" : "editó";
          remoteChanges.push(`${p.editado_por} ${verb} ID ${p.id}`);
        }
      });
    }

    if (Array.isArray(data.galeria) && data.galeria.length) {
      const mapped = data.galeria
        .filter(g => isAllowedMedia(g.URL_Cloudinary))
        .map(g => ({
          id: String(g.ID_Foto || ""),
          cat: String(g.Categoria || "Otros"),
          desc: String(g.Nombre_Archivo || g.Categoria || "Imagen"),
          url: String(g.URL_Cloudinary).trim()
        }));
      if (mapped.length) gallery = mapped;
    }

    if (Array.isArray(data.sugerencias)) {
      const nw = getNextWeekDatesMx();
      suggestions = data.sugerencias
        .filter(s => String(s.Estado_Sug || "PENDIENTE").toUpperCase() === "PENDIENTE")
        .map(s => ({
          sid: String(s.ID_Sug || ""),
          titulo: String(s.Titulo || ""),
          fecha: String(s.Fecha_Dinamica || nw[s.Dia] || nw["Mié"]).slice(0, 10),
          dia: String(s.Dia || "Mié"),
          hora: formatHora(s.Hora),
          red: normalizeRed(s.Red || "AMBAS"),
          formato: String(s.Formato || "POST").toUpperCase(),
          copy: String(s.Copy_Final || ""),
          copy_story: String(s.Copy_Story || buildAutoStoryCopy(s.Copy_Final || "")),
          foto: safeCloudinaryUrl(s.URL_Media, FALLBACK_LOGO_URL)
        }));
    }

    if (Array.isArray(data.metricas)) metrics = data.metricas;
    if (Array.isArray(data.errores)) errorLogs = data.errores;
    if (data.featureFlags && typeof data.featureFlags === "object") {
      featureFlags.insightsSyncEnabled = !!data.featureFlags.insightsSyncEnabled;
      featureFlags.autoCommentsEnabled = !!data.featureFlags.autoCommentsEnabled;
    }

    saveLocal();
    render();
    if (remoteChanges.length) {
      showToast(`✍️ ${remoteChanges.slice(0, 2).join(" · ")}`, { type: "warn", duration: 5000 });
    } else if (!silent) {
      showToast("☁️ Sincronizado con Google Sheets", { type: "success" });
    }
    return true;
  } finally {
    isSyncing = false;
    updateSyncPillAndOffline();
  }
}

function maybeAutoSync() {
  if (!syncCfg.url || navigator.onLine === false) return;
  if (Date.now() - lastSyncAt >= AUTO_SYNC_MIN_MS) syncFromSheets(true);
}

// ===== HOJA DE CONFLICTO LADO A LADO =====
function openConflictModal(post, res, onForceCallback) {
  const actual = res && res.actual ? mapSheetPostRow(res.actual) : null;
  const who = (actual && actual.editado_por) ? actual.editado_por : "El otro celular";
  document.getElementById("conflictTitle").textContent = `⚠️ Conflicto en ID ${post.id}`;
  document.getElementById("conflictSubtitle").textContent = `${who} guardó la versión v${actual ? actual.version : "?"} antes que tú. Elige qué versión conservar:`;
  document.getElementById("conflictLocalLabel").textContent = `Tu versión (${syncCfg.editor})`;
  document.getElementById("conflictLocalText").textContent = `[${post.estado}] ${post.copy}`;
  document.getElementById("conflictRemoteLabel").textContent = `Versión de ${who} (v${actual ? actual.version : "?"})`;
  document.getElementById("conflictRemoteText").textContent = actual ? `[${actual.estado}] ${actual.copy}` : "(sin detalle)";
  const forceBtn = document.getElementById("conflictForceLocalBtn");
  conflictPendingForce = onForceCallback || null;
  forceBtn.style.display = onForceCallback ? "inline-flex" : "none";

  if (actual) {
    const idx = posts.findIndex(p => p.id === post.id);
    if (idx >= 0) posts[idx] = actual;
    saveLocal();
    render();
  }
  document.getElementById("conflictModal").classList.add("open");
}

// ===== RENDERIZADO DE PREVIEWS FIELES 4:5 Y 9:16 =====
function renderCopyMetaStrip(post, mode, key) {
  if (mode === "STORY") {
    const st = getEffectiveStoryCopy(post);
    const len = st.length;
    const cls = len <= 80 ? "ok" : (len <= 90 ? "warn" : "over");
    const safeActive = !!showSafeZones[key];
    return `
      <div class="copy-meta-strip ${cls}">
        <span>📱 Copy_Story · ${len}/90</span>
        <button type="button" class="safe-zone-toggle ${safeActive ? "active" : ""}" data-toggle-safe="${escapeHtml(key)}">📐 Zonas seguras</button>
      </div>`;
  }
  const len = String(post.copy || "").length;
  return `
    <div class="copy-meta-strip">
      <span>📝 Copy largo · ${len} car. · corte en 125 ("…más")</span>
    </div>`;
}

function renderMockup(post, mode, key, isFullscreen = false) {
  const safeFoto = escapeHtml(safeCloudinaryUrl(post.foto, FALLBACK_LOGO_URL));
  const needsCropHint = !String(post.foto || "").includes("ar_4:5") && !String(post.foto || "").includes("laparrilla_canva/canva_");
  const fechaLabel = escapeHtml(formatReadableDate(post.fecha, post.hora));
  const pid = escapeHtml(post.id);

  if (mode === "STORY") {
    const stCopy = escapeHtml(getEffectiveStoryCopy(post));
    const safeOn = !!showSafeZones[key];
    const fsStyle = isFullscreen ? ' style="width:min(320px, calc((90dvh - 100px) * 9 / 16));cursor:default;"' : "";
    return `
      <div class="story-frame ${safeOn ? "show-safe" : ""}" data-fullscreen-key="${escapeHtml(key)}" data-fullscreen-mode="STORY"${fsStyle}>
        <img class="story-bg" src="${escapeHtml(applyCloudinaryTransform(post.foto, "STORY") || safeFoto)}" alt="La Parrilla ID ${pid}" loading="lazy" />
        <div class="story-safe-top">Zona superior IG (14%)</div>
        <div class="story-top">
          <div class="story-bars"><span class="done"></span><span class="curr"></span><span></span></div>
          <div class="story-user-row">
            <div class="story-user-left">
              <img class="story-avatar" src="${AVATAR_LOGO_URL}" alt="" />
              <span>laparrilla_ixtla · 2 h</span>
            </div>
            <span>✕</span>
          </div>
        </div>
        <div class="story-mid">
          <div class="story-pill-text">${stCopy}</div>
          <div class="story-wa-sticker">🔗 PEDIR POR WHATSAPP</div>
        </div>
        <div class="story-bottom-bar">
          <div class="story-reply-pill">Enviar mensaje…</div>
          <span>♡</span><span>✈️</span>
        </div>
        <div class="story-safe-bottom">Zona inferior IG (20%)</div>
      </div>`;
  }

  const fullCopy = String(post.copy || "");
  if (isFullscreen && (mode === "IG" || mode === "FB")) {
    const origUrl = escapeHtml(applyCloudinaryTransform(post.foto, "ORIG") || safeFoto);
    return `
      <div class="fullscreen-img-wrap">
        <img class="fullscreen-img-contain" src="${origUrl}" alt="Vista completa ID ${pid}" />
        <div style="font-size:var(--fs-xs);color:var(--muted);text-align:center;">Imagen completa sin recortes (<code>object-fit: contain</code>)</div>
        <div style="width:100%;padding:10px 12px;border-radius:12px;background:var(--surface);border:1px solid var(--border);font-size:var(--fs-xs);white-space:pre-wrap;word-break:break-word;">${escapeHtml(fullCopy)}</div>
      </div>`;
  }

  const isExpandedCap = !!expandedCaptions[key] || fullCopy.length <= 125;
  const captionHtml = fullCopy.length <= 125
    ? escapeHtml(fullCopy)
    : (isExpandedCap
      ? `${escapeHtml(fullCopy)} <button type="button" class="ig-more-btn" data-toggle-caption="${escapeHtml(key)}">ver menos</button>`
      : `${escapeHtml(fullCopy.slice(0, 125).trim())}… <button type="button" class="ig-more-btn" data-toggle-caption="${escapeHtml(key)}">más</button>`);

  if (mode === "FB") {
    return `
      <div class="phone-frame fb">
        <div class="social-header">
          <div class="avatar-ring"><img src="${AVATAR_LOGO_URL}" alt="" /></div>
          <div class="social-user">
            <strong>La Parrilla (Ixtlahuacán del Río)</strong>
            <span>${fechaLabel}</span>
          </div>
        </div>
        <div class="fb-text">${captionHtml}</div>
        <div class="media-box" data-fullscreen-key="${escapeHtml(key)}" data-fullscreen-mode="FB">
          <img src="${safeFoto}" alt="La Parrilla ID ${pid}" loading="lazy" />
          ${needsCropHint ? '<span class="crop-hint-badge">✂️ 4:5 · Toca para ver completa</span>' : '<span class="crop-hint-badge">🔍 Toca para ver completa</span>'}
        </div>
        <div class="ig-actions" style="font-size:12px;color:#4b5563;padding:8px 12px;border-top:1px solid #e5e7eb;">
          <span>👍 Me gusta</span><span>💬 Comentar</span><span>↗️ Compartir</span>
        </div>
      </div>`;
  }

  return `
    <div class="phone-frame">
      <div class="social-header">
        <div class="avatar-ring"><img src="${AVATAR_LOGO_URL}" alt="" /></div>
        <div class="social-user">
          <strong>laparrilla_ixtla</strong>
          <span>📍 Ixtlahuacán del Río, Jalisco</span>
        </div>
      </div>
      <div class="media-box" data-fullscreen-key="${escapeHtml(key)}" data-fullscreen-mode="IG">
        <img src="${safeFoto}" alt="La Parrilla ID ${pid}" loading="lazy" />
        ${needsCropHint ? '<span class="crop-hint-badge">✂️ 4:5 · Toca para ver completa</span>' : '<span class="crop-hint-badge">🔍 Toca para ver completa</span>'}
      </div>
      <div class="ig-actions"><span>❤️ 💬 ✈️</span><span>🔖</span></div>
      <div class="ig-caption"><strong>laparrilla_ixtla</strong> ${captionHtml}</div>
    </div>`;
}

// ===== TIRA SEMANAL CON FECHA + PUNTOS =====
function renderWeekStripHtml(activePosts) {
  const days = ["Mié", "Jue", "Vie", "Sáb", "Dom"];
  const nw = getNextWeekDatesMx();
  return `
    <div class="week-strip" id="weekStrip">
      ${days.map(d => {
        const dayPosts = activePosts.filter(p => (p.dia || getDiaFromFecha(p.fecha)) === d);
        const sampleFecha = (dayPosts[0] && dayPosts[0].fecha) || nw[d] || "";
        const dayNum = sampleFecha.match(/-(\d{2})$/) ? Number(sampleFecha.slice(-2)) : "";
        const dots = dayPosts.map(p => {
          const cls = isErrorEstado(p.estado) ? "error" : (p.estado === "PUBLICADO" ? "published" : (p.estado === "APROBADO" ? "approved" : "draft"));
          return `<span class="dot ${cls}" title="${escapeHtml(p.estado)}"></span>`;
        }).join("");
        return `
          <button type="button" class="day-pill ${dayFilter === d ? "active" : ""}" data-day="${escapeHtml(d)}">
            <span>${escapeHtml(d)}${dayNum ? " " + dayNum : ""}</span>
            <div class="day-dots">${dots}</div>
          </button>`;
      }).join("")}
    </div>`;
}

// ===== PULSO (P2: ERRORES Y ALCANCE SEPARADOS + BARRA SEMANAL) =====
function renderPulse() {
  const active = posts.filter(p => p.estado !== "CANCELADO");
  const approved = active.filter(p => p.estado === "APROBADO").length;
  const drafts = active.filter(p => p.estado === "BORRADOR").length;
  const published = active.filter(p => p.estado === "PUBLICADO").length;
  const errs = active.filter(p => isErrorEstado(p.estado)).length;
  const totalWaClicks = active.reduce((acc, p) => acc + (Number(p.clics_wa) || 0), 0);
  const topWaPosts = active.filter(p => (Number(p.clics_wa) || 0) > 0).sort((a, b) => b.clics_wa - a.clics_wa).slice(0, 4);
  const postsReach = active.reduce((acc, p) => acc + (Number(p.alcance) || 0), 0);
  const postsInt = active.reduce((acc, p) => acc + (Number(p.interacciones) || 0), 0);
  const postsSaved = active.reduce((acc, p) => acc + (Number(p.guardados) || 0), 0);
  const totalReach = postsReach || metrics.reduce((acc, m) => acc + (Number(m.Alcance) || 0), 0);
  const totalInt = postsInt || metrics.reduce((acc, m) => acc + (Number(m.Interacciones) || 0), 0);
  const waTestUrl = WA_BASE + encodeURIComponent("Hola La Parrilla, vi su publicación y quiero hacer un pedido para hoy 🔥");
  const insOn = !!featureFlags.insightsSyncEnabled;
  const comOn = !!featureFlags.autoCommentsEnabled;

  const days = ["Mié", "Jue", "Vie", "Sáb", "Dom"];
  const reachByDay = days.map(d => ({
    dia: d,
    val: active.filter(p => (p.dia || getDiaFromFecha(p.fecha)) === d).reduce((a, p) => a + (Number(p.alcance) || 0), 0) ||
      metrics.filter(m => String(m.Dia_Semana || "").startsWith(d.slice(0, 2))).reduce((a, m) => a + (Number(m.Alcance) || 0), 0)
  }));
  const maxReach = Math.max(1, ...reachByDay.map(x => x.val));

  return `
    <div class="kpi-grid">
      <div class="kpi-card"><small>Por aprobar</small><strong style="color:var(--amber);">${drafts}</strong></div>
      <div class="kpi-card"><small>Aprobadas listas</small><strong style="color:var(--green);">${approved}</strong></div>
      <div class="kpi-card"><small>Publicadas</small><strong style="color:var(--blue);">${published}</strong></div>
      <div class="kpi-card"><small>💬 Clics WA rastreados</small><strong style="color:#86efac;">${totalWaClicks}</strong></div>
    </div>
    <div class="kpi-grid">
      <div class="kpi-card"><small>Errores</small><strong style="color:${errs ? "var(--red)" : "#86efac"};">${errs}</strong></div>
      <div class="kpi-card"><small>Alcance / Interacc. / Guard.</small><strong>${totalReach} / ${totalInt} / ${postsSaved}</strong></div>
    </div>
    <div class="card" style="padding:14px;display:flex;flex-direction:column;gap:8px;">
      <h3 style="margin:0;font-size:var(--fs-md);">🌱 Crecimiento orgánico (interruptores)</h3>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:var(--fs-xs);padding:6px 10px;border-radius:10px;background:#15110e;border:1px solid var(--border);">
        <span>📊 Métricas Meta (nocturno)</span>
        <span class="status-badge ${insOn ? "approved" : "draft"}">${insOn ? "ON" : "OFF"}</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:var(--fs-xs);padding:6px 10px;border-radius:10px;background:#15110e;border:1px solid var(--border);">
        <span>💬 Auto-respuesta comentarios</span>
        <span class="status-badge ${comOn ? "approved" : "draft"}">${comOn ? "ON" : "OFF"}</span>
      </div>
      ${!insOn ? `<div style="font-size:var(--fs-xs);color:var(--muted);">💤 Métricas en espera de activación (<code>ENABLE_INSIGHTS_SYNC = true</code> en ScriptProperties).</div>` : ""}
      <button class="btn" data-action="dry-run-comment" type="button" style="border-color:rgba(167,139,250,0.55);color:#ddd6fe;">▶️ Probar en seco (1 comentario)</button>
      <div id="dryRunResultBox" style="display:none;padding:10px;border-radius:10px;background:#120f0d;border:1px solid var(--border);font-size:var(--fs-xs);"></div>
    </div>
    <div class="kpi-card">
      <small>💬 Clics a WhatsApp por publicación</small>
      ${topWaPosts.length ? topWaPosts.map(p => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--border);font-size:var(--fs-xs);">
          <span><strong>ID ${escapeHtml(p.id)}</strong> · ${escapeHtml(formatReadableDate(p.fecha, p.hora))}</span>
          <span style="color:#86efac;font-weight:800;">💬 ${p.clics_wa} clics WA</span>
        </div>`).join("") : `<p style="margin:6px 0 0;font-size:var(--fs-xs);color:var(--muted);">Aún no hay clics registrados. Usa el botón <strong>🔗 Link WA</strong> en tus tarjetas para medir pedidos por publicación.</p>`}
    </div>
    <div class="kpi-card">
      <small>Alcance semanal por día</small>
      <div class="reach-bars">
        ${reachByDay.map(x => {
          const pct = Math.max(10, Math.round((x.val / maxReach) * 100));
          return `<div class="reach-col"><div class="reach-fill" style="height:${x.val ? pct : 10}%;opacity:${x.val ? 1 : 0.25};"></div><span>${x.dia}</span></div>`;
        }).join("")}
      </div>
    </div>
    <div class="card" style="padding:14px;display:flex;flex-direction:column;gap:8px;">
      <h3 style="margin:0;font-size:var(--fs-md);">⚡ Accesos rápidos y pruebas</h3>
      <button class="btn" data-action="copy-approved-all" type="button">${icon("copy")} Copiar aprobadas (${approved})</button>
      <button class="btn" data-action="test-meta" type="button" style="border-color:var(--accent);color:#fdba74;">${icon("cloud")} Probar conexión Meta FB/IG</button>
      <a class="btn btn-wa" href="${escapeHtml(waTestUrl)}" target="_blank" rel="noopener">💬 Probar enlace WhatsApp</a>
      <a class="btn" href="https://www.facebook.com/La-Parrilla-106299351752487" target="_blank" rel="noopener" style="border-color:#1877f2;color:#93c5fd;">🚀 Abrir Página FB (grupos)</a>
      <button class="btn" data-action="test-telegram" type="button" style="border-color:#38bdf8;color:#7dd3fc;">📲 Probar alertas (Telegram / Correo)</button>
    </div>
    <div class="card" style="padding:14px;">
      <h3 style="margin:0 0 8px;font-size:var(--fs-md);">🚨 Registro de errores (Log_Errores)</h3>
      ${errorLogs.length ? errorLogs.slice(-5).reverse().map(e => `
        <div style="padding:8px 0;border-bottom:1px solid var(--border);font-size:var(--fs-xs);">
          <strong>${escapeHtml(e.Fecha_Hora)} · ${escapeHtml(e.Origen)} (ID ${escapeHtml(e.ID_Publicacion || "-")})</strong><br>
          <span style="color:#fca5a5;">${escapeHtml(e.Detalle_Error)}</span>
        </div>`).join("") : `<p style="margin:0;font-size:var(--fs-xs);color:#86efac;">✅ Sin errores registrados.</p>`}
    </div>`;
}

// ===== RENDERIZADO PRINCIPAL =====
function render() {
  updateSyncPillAndOffline();

  const activePosts = posts.filter(p => p.estado !== "CANCELADO");
  const draftCount = activePosts.filter(p => p.estado === "BORRADOR").length;
  const errorCount = activePosts.filter(p => isErrorEstado(p.estado)).length;
  const pendingCount = draftCount + errorCount;
  const approvedCount = activePosts.filter(p => p.estado === "APROBADO").length;
  const publishedCount = activePosts.filter(p => p.estado === "PUBLICADO").length;
  const unseenCount = activePosts.filter(isUnseenFromOther).length;
  const otherLabel = syncCfg.editor === "Ale" ? "Esposa" : "Ale";

  // Actualizar pestañas de vista y filtros
  document.getElementById("viewCalendar").classList.toggle("active", currentView === "CALENDAR");
  document.getElementById("viewSug").classList.toggle("active", currentView === "SUGGESTIONS");
  document.getElementById("viewSug").textContent = `💡 Ideas (${suggestions.length})`;
  document.getElementById("viewPulse").classList.toggle("active", currentView === "PULSE");

  const filtersEl = document.getElementById("statusFilters");
  filtersEl.classList.toggle("hidden", currentView !== "CALENDAR");

  const pendingBtn = document.getElementById("tabPending");
  pendingBtn.innerHTML = errorCount > 0
    ? `Pend. (${pendingCount}) <span class="err-pill">${errorCount}</span>`
    : `Pend. (${pendingCount})`;
  pendingBtn.classList.toggle("has-errors", errorCount > 0);
  pendingBtn.classList.toggle("active", currentFilter === "PENDING" || currentFilter === "ERRORS");

  document.getElementById("tabApproved").textContent = `Aprob. (${approvedCount})`;
  document.getElementById("tabApproved").classList.toggle("active", currentFilter === "APROBADO");
  document.getElementById("tabPublished").textContent = `Publ. (${publishedCount})`;
  document.getElementById("tabPublished").classList.toggle("active", currentFilter === "PUBLICADO");
  document.getElementById("tabAll").textContent = `Todas (${activePosts.length})`;
  document.getElementById("tabAll").classList.toggle("active", currentFilter === "ALL" || currentFilter === "NEW_OTHER");

  const feed = document.getElementById("feed");

  if (currentView === "PULSE") {
    feed.innerHTML = renderPulse();
    return;
  }

  if (currentView === "SUGGESTIONS") {
    renderSuggestionsView(feed);
    return;
  }

  // Skeleton inicial mientras sincroniza por primera vez
  if (syncCfg.url && isSyncing && !sessionSynced && !posts.length) {
    feed.innerHTML = renderWeekStripHtml([]) + '<div class="skeleton-row"></div><div class="skeleton-row"></div><div class="skeleton-row"></div>';
    return;
  }

  // Barra de resumen + toggle vista compacta
  const summaryHtml = `
    <div class="summary-bar">
      <div class="summary-chips">
        <button type="button" class="sum-chip warn" data-sum-filter="PENDING">⏳ ${draftCount} por aprobar</button>
        ${errorCount > 0 ? `<button type="button" class="sum-chip err" data-sum-filter="ERRORS">🔴 ${errorCount} error${errorCount > 1 ? "es" : ""}</button>` : ""}
        ${unseenCount > 0 ? `<button type="button" class="sum-chip new-other" data-sum-filter="NEW_OTHER">✍️ ${unseenCount} de ${escapeHtml(otherLabel)}</button>` : ""}
        ${currentFilter === "APROBADO" && approvedCount > 0 ? `<button type="button" class="sum-chip" data-action="copy-approved-all">📋 Copiar (${approvedCount})</button>` : ""}
      </div>
      <button type="button" class="sum-chip" id="toggleCompactBtn">${compactMode ? "🗂️ Tarjetas" : "☰ Lista"}</button>
    </div>`;

  const visible = activePosts.filter(p => {
    const matchTab = currentFilter === "ALL"
      ? true
      : currentFilter === "PENDING"
        ? (p.estado === "BORRADOR" || isErrorEstado(p.estado))
        : currentFilter === "ERRORS"
          ? isErrorEstado(p.estado)
          : currentFilter === "NEW_OTHER"
            ? isUnseenFromOther(p)
            : p.estado === currentFilter;
    const matchDay = !dayFilter || (p.dia || getDiaFromFecha(p.fecha)) === dayFilter;
    return matchTab && matchDay;
  });

  if (!visible.length) {
    const isOfflineEmpty = syncCfg.url && !sessionSynced && lastSyncOk === false;
    const msg = isOfflineEmpty
      ? "No se pudo conectar a Google Sheets. Revisa tu señal y toca 🔄."
      : (currentFilter === "PENDING"
        ? "¡Todo al día! No tienes borradores ni errores pendientes 🎉"
        : `No hay publicaciones en este filtro${dayFilter ? " para " + escapeHtml(dayFilter) : ""}.`);
    feed.innerHTML = renderWeekStripHtml(activePosts) + summaryHtml + `
      <div class="empty-state">
        <div class="empty-state-icon">${isOfflineEmpty ? "📴" : "🔥"}</div>
        <p>${msg}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
          ${dayFilter ? '<button type="button" class="btn" data-action="clear-day-filter">Ver toda la semana</button>' : ""}
          <button type="button" class="btn-primary" data-action="open-new-from-empty">➕ Crear publicación</button>
        </div>
      </div>`;
    return;
  }

  feed.innerHTML = renderWeekStripHtml(activePosts) + summaryHtml + visible.map(post => {
    const isExpanded = !compactMode || !!expandedCards[post.id];
    return isExpanded ? renderFullCard(post) : renderCompactRow(post);
  }).join("");

  observeUnseenCards();
}

function renderCompactRow(post) {
  const isApproved = post.estado === "APROBADO";
  const isPublished = post.estado === "PUBLICADO";
  const isError = isErrorEstado(post.estado);
  const unseen = isUnseenFromOther(post);
  const { blocks } = getPostRules(post);
  const canApprove = isApproved || (!blocks.length && !isPublished && !(navigator.onLine === false && syncCfg.url));
  const cls = isError ? "error" : (isPublished ? "published" : (isApproved ? "approved" : ""));
  const badgeCls = isError ? "error" : (isPublished ? "published" : (isApproved ? "approved" : "draft"));
  const isSt = post.formato === "STORY";
  const thumbUrl = escapeHtml(applyCloudinaryTransform(post.foto, isSt ? "STORY" : "FEED") || safeCloudinaryUrl(post.foto));
  const rel = getRelativeTimeForToday(post.fecha, post.hora);
  const excerpt = isSt ? getEffectiveStoryCopy(post) : post.copy;

  return `
    <article class="compact-row ${cls} ${unseen ? "is-unseen" : ""}" data-id="${escapeHtml(post.id)}" data-observe-seen="${unseen ? "1" : "0"}">
      <div class="compact-thumb ${isSt ? "is-story" : ""}">
        <img src="${thumbUrl}" alt="ID ${escapeHtml(post.id)}" loading="lazy" />
      </div>
      <div class="compact-body">
        <div class="compact-meta">
          <span class="compact-date">${escapeHtml(formatReadableDate(post.fecha, post.hora))}</span>
          ${rel ? `<span class="rel-time">${escapeHtml(rel)}</span>` : ""}
        </div>
        <div class="compact-sub">
          <span class="id-chip">ID ${escapeHtml(post.id)}</span>
          <span class="format-chip">${escapeHtml(post.red)} · ${escapeHtml(post.formato)}</span>
          <span class="status-badge ${badgeCls}">${escapeHtml(post.estado)}</span>
          ${(Number(post.clics_wa) || 0) > 0 ? `<span class="editor-chip" style="background:rgba(34,197,94,0.16);color:#86efac;">💬 ${Number(post.clics_wa)}</span>` : ""}
          ${unseen ? `<span class="new-badge">NUEVO · ${escapeHtml(post.editado_por)}</span>` : ""}
        </div>
        <div class="compact-excerpt">${blocks.length ? "🔒 " + escapeHtml(blocks[0]) : escapeHtml(excerpt)}</div>
      </div>
      ${isPublished ? "" : `
        <button type="button" class="quick-approve-btn ${isApproved ? "is-approved" : ""}" data-action="toggle-approve" ${canApprove ? "" : "disabled"} title="${canApprove ? (isApproved ? "Regresar a borrador" : "Aprobar") : escapeHtml(blocks[0] || "Bloqueado")}">
          ${canApprove ? icon("check") : icon("lock")}
        </button>`}
    </article>`;
}

function renderFullCard(post) {
  const key = "P_" + post.id;
  const mode = previewMode[key] || (post.formato === "STORY" ? "STORY" : "IG");
  const isApproved = post.estado === "APROBADO";
  const isPublished = post.estado === "PUBLICADO";
  const isError = isErrorEstado(post.estado);
  const unseen = isUnseenFromOther(post);
  const { blocks, tips } = getPostRules(post);
  const isBlockedForApprove = !isApproved && (blocks.length > 0 || (navigator.onLine === false && !!syncCfg.url));
  const badgeCls = isError ? "error" : (isPublished ? "published" : (isApproved ? "approved" : "draft"));
  const cardCls = isError ? "error" : (isPublished ? "published" : (isApproved ? "approved" : ""));
  const rel = getRelativeTimeForToday(post.fecha, post.hora);

  const guardItemsHtml = [
    ...blocks.map(b => `<div class="guard-item block">${icon("lock")} <span>${escapeHtml(b)}</span></div>`),
    ...tips.map(t => `<div class="guard-item tip">${icon("alert")} <span>${escapeHtml(t)}</span></div>`)
  ].join("") || `<div class="guard-item ok">${icon("check")} <span>Reglas de marca y Cloudinary OK</span></div>`;

  const storyKitHtml = post.formato === "STORY" ? `
    <div class="story-kit">
      <div class="story-kit-hint">🎯 <strong>Kit Historia 9:16:</strong> copia el <code>Copy_Story</code> corto + descarga 9:16.</div>
      <div class="story-kit-btns">
        <button class="btn" type="button" data-action="story-kit">${icon("copy")} Foto + Copy_Story</button>
        <button class="btn btn-approve ${isPublished ? "is-approved" : ""}" type="button" data-action="mark-published">${isPublished ? "↩ Desmarcar" : "✅ Historia subida"}</button>
      </div>
    </div>` : "";

  const retryLabel = post.estado === "ERROR_FB" ? "solo FB" : (post.estado === "ERROR_IG" ? "solo IG" : "publicación");
  const retryErrorHtml = isError ? `
    <div style="padding:10px 12px;background:rgba(239,68,68,0.12);border-top:1px solid rgba(239,68,68,0.4);display:flex;flex-direction:column;gap:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
        <span style="font-size:var(--fs-xs);color:#fca5a5;font-weight:800;">⚠️ ${escapeHtml(post.estado)}</span>
        <button class="btn" type="button" data-action="retry-missing" style="border-color:#ef4444;color:#fecaca;">🔄 Reintentar ${escapeHtml(retryLabel)}</button>
      </div>
      ${post.nota_error ? `<div style="font-size:var(--fs-xs);color:#fecaca;background:rgba(0,0,0,0.3);padding:6px 8px;border-radius:8px;word-break:break-word;"><strong>Motivo:</strong> ${escapeHtml(post.nota_error)}</div>` : ""}
    </div>` : "";

  const hasPostInsights = (Number(post.alcance) || 0) > 0 || (Number(post.interacciones) || 0) > 0 || (Number(post.guardados) || 0) > 0;
  const insightsStripHtml = isPublished
    ? (hasPostInsights
      ? `<div style="padding:7px 12px;background:#12171d;border-top:1px solid var(--border);font-size:var(--fs-xs);color:#93c5fd;font-weight:700;">👁️ ${Number(post.alcance)} alcance · ❤️ ${Number(post.interacciones)} interacc. · 🔖 ${Number(post.guardados)} guardados</div>`
      : (!featureFlags.insightsSyncEnabled
        ? `<div style="padding:6px 12px;background:#15110e;border-top:1px solid var(--border);font-size:var(--fs-xs);color:var(--muted);">💤 Métricas en espera de activación</div>`
        : ""))
    : "";

  const shareGroupsHtml = isPublished ? `
    ${insightsStripHtml}
    <div style="padding:8px 12px;background:#161310;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
      <span style="font-size:var(--fs-xs);color:#93c5fd;font-weight:700;">${post.fecha_pub_real ? `✅ Publicado el ${escapeHtml(post.fecha_pub_real)}` : "🚀 Comparte en grupos locales:"}</span>
      <button class="btn" type="button" data-action="share-fb-groups" style="border-color:#1877f2;color:#93c5fd;">Compartir FB</button>
    </div>` : "";

  const approveBtnText = isApproved
    ? "↩ Borrador"
    : (blocks.length ? `${icon("lock")} Bloqueado` : `${icon("check")} Aprobar`);

  return `
    <article class="card ${cardCls} ${unseen ? "is-unseen" : ""}" data-id="${escapeHtml(post.id)}" data-observe-seen="${unseen ? "1" : "0"}">
      <div class="card-top">
        <div class="meta-left">
          <span class="id-chip">ID ${escapeHtml(post.id)}</span>
          <span class="date-label">${escapeHtml(formatReadableDate(post.fecha, post.hora))}</span>
          ${rel ? `<span class="rel-time">${escapeHtml(rel)}</span>` : ""}
          <span class="format-chip">${escapeHtml(post.red)} · ${escapeHtml(post.formato)}</span>
          ${unseen ? `<span class="new-badge">NUEVO · ${escapeHtml(post.editado_por)}</span>` : (post.editado_por ? `<span class="editor-chip">✍️ ${escapeHtml(post.editado_por)} v${escapeHtml(post.version)}</span>` : "")}
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <span class="status-badge ${badgeCls}">${escapeHtml(post.estado)}</span>
          ${compactMode ? '<button type="button" class="quick-chip" data-action="collapse-card" style="height:28px;padding:0 8px;">▲</button>' : ""}
        </div>
      </div>
      <div class="guardrail-list">${guardItemsHtml}</div>
      <div class="mode-bar">
        <div class="mode-seg">
          <button type="button" class="mode-btn ${mode === "IG" ? "active" : ""}" data-mode="IG">IG 4:5</button>
          <button type="button" class="mode-btn ${mode === "STORY" ? "active" : ""}" data-mode="STORY">Historia 9:16</button>
          <button type="button" class="mode-btn ${mode === "FB" ? "active" : ""}" data-mode="FB">FB</button>
        </div>
      </div>
      ${renderCopyMetaStrip(post, mode, key)}
      <div class="preview-stage">${renderMockup(post, mode, key)}</div>
      <div style="padding:8px 12px;background:#15110e;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
        <span style="font-size:var(--fs-xs);color:#86efac;font-weight:800;">💬 ${Number(post.clics_wa) || 0} clics WA</span>
        <button class="quick-chip" type="button" data-action="copy-wa-link" style="height:34px;border-color:rgba(34,197,94,0.5);color:#86efac;">🔗 Copiar link WA</button>
      </div>
      ${storyKitHtml}
      ${retryErrorHtml}
      ${shareGroupsHtml}
      <div class="card-actions">
        <button class="btn btn-approve ${isApproved ? "is-approved" : ""}" type="button" data-action="toggle-approve" ${isBlockedForApprove ? "disabled" : ""} title="${blocks.length ? escapeHtml(blocks[0]) : ""}">
          ${approveBtnText}
        </button>
        <button class="btn" type="button" data-action="open-edit">${icon("edit")} Editar</button>
        <button class="btn" type="button" data-action="open-gallery">${icon("photo")} Foto</button>
        <button class="btn" type="button" data-action="copy-one">${icon("copy")} Copiar</button>
      </div>
    </article>`;
}

// ===== VISTA SUGERENCIAS (COLAPSADAS POR DEFECTO + COMPARTIDA VIOLETA) =====
function renderSuggestionsView(feed) {
  const sugDays = ["Todos", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const sugBar = `
    <div class="chip-row">
      ${sugDays.map(d => `<button type="button" class="quick-chip ${sugDayFilter === d ? "active" : ""}" data-sug-day="${escapeHtml(d)}">${escapeHtml(d)}</button>`).join("")}
    </div>`;
  const filtered = suggestions.filter(s => sugDayFilter === "Todos" || s.dia === sugDayFilter);
  if (!filtered.length) {
    feed.innerHTML = sugBar + `
      <div class="empty-state">
        <div class="empty-state-icon">💡</div>
        <p>No hay ideas pendientes${sugDayFilter !== "Todos" ? " para " + escapeHtml(sugDayFilter) : ""}.</p>
        <button type="button" class="btn-primary" data-action="restore-sugs-inline">💡 Reactivar banco de ideas</button>
      </div>`;
    return;
  }

  feed.innerHTML = sugBar + filtered.map(sug => {
    const key = "S_" + sug.sid;
    const isCustom = !!expandedSugs[sug.sid];
    const mode = previewMode[key] || (sug.formato === "STORY" ? "STORY" : "IG");
    const dest = getDest(key, sug.formato, sug.red);
    const initEst = sugInitialEstado[sug.sid] || "BORRADOR";
    const storyText = sug.copy_story || buildAutoStoryCopy(sug.copy);
    const thumb = escapeHtml(applyCloudinaryTransform(sug.foto, sug.formato === "STORY" ? "STORY" : "FEED") || safeCloudinaryUrl(sug.foto));

    const customHtml = isCustom ? `
      <div class="mode-bar">
        <div class="mode-seg">
          <button type="button" class="mode-btn ${mode === "IG" ? "active" : ""}" data-mode="IG">IG 4:5</button>
          <button type="button" class="mode-btn ${mode === "STORY" ? "active" : ""}" data-mode="STORY">Historia 9:16</button>
          <button type="button" class="mode-btn ${mode === "FB" ? "active" : ""}" data-mode="FB">FB</button>
        </div>
      </div>
      ${renderCopyMetaStrip(sug, mode, key)}
      <div class="preview-stage">${renderMockup(sug, mode, key)}</div>
      <div style="padding:10px 12px;display:flex;flex-direction:column;gap:8px;border-top:1px solid var(--border);">
        <div class="story-copy-box">
          <div class="story-copy-head">
            <span>📱 Copy_Story (máx. 90)</span>
            <span>${storyText.length}/90</span>
          </div>
          <textarea class="story-textarea" rows="2" maxlength="90" data-sug-story="${escapeHtml(sug.sid)}">${escapeHtml(storyText)}</textarea>
        </div>
        ${renderDestSelector(key, dest)}
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <button type="button" class="btn" data-action="open-gallery-sug" style="min-height:38px;">🖼️ Cambiar foto</button>
          <button type="button" class="filter-btn ${initEst === "APROBADO" ? "active" : ""}" data-action="toggle-sug-estado" style="width:auto;padding:0 12px;">Al aceptar: ${escapeHtml(initEst)}</button>
        </div>
      </div>` : "";

    return `
      <article class="card" data-sid="${escapeHtml(sug.sid)}">
        <div class="sug-compact">
          <div class="compact-thumb ${sug.formato === "STORY" ? "is-story" : ""}">
            <img src="${thumb}" alt="${escapeHtml(sug.sid)}" loading="lazy" />
          </div>
          <div class="sug-compact-body">
            <div class="compact-meta">
              <span class="id-chip">${escapeHtml(sug.sid)}</span>
              <span class="status-badge shared">COMPARTIDA</span>
              <span class="format-chip">${escapeHtml(sug.formato)}</span>
            </div>
            <div class="sug-compact-title">${escapeHtml(sug.titulo)}</div>
            <div class="compact-sub">${escapeHtml(formatReadableDate(sug.fecha, sug.hora))}</div>
            <div class="sug-story-preview">${escapeHtml(storyText)}</div>
          </div>
        </div>
        ${customHtml}
        <div class="sug-actions">
          <button class="btn btn-approve" type="button" data-action="accept-sug">${icon("check")} Aceptar</button>
          <button class="btn" type="button" data-action="toggle-sug-custom">${isCustom ? "▲ Cerrar" : "⚙️ Personalizar"}</button>
          <button class="btn btn-decline" type="button" data-action="decline-sug" aria-label="Declinar">✕</button>
        </div>
      </article>`;
  }).join("");
}

function observeUnseenCards() {
  if (seenObserver) seenObserver.disconnect();
  if (typeof IntersectionObserver === "undefined") return;
  const timers = new WeakMap();
  seenObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        const t = setTimeout(() => {
          const p = posts.find(x => x.id === Number(el.dataset.id));
          if (p) markPostSeen(p);
          seenObserver.unobserve(el);
        }, 2000);
        timers.set(el, t);
      } else {
        const t = timers.get(el);
        if (t) clearTimeout(t);
      }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-observe-seen="1"]').forEach(el => seenObserver.observe(el));
}

// ===== GALERÍA (CUADRÍCULA CON RECORTES REALES + TILE CÁMARA + ✓ NARANJA) =====
function getCurrentTargetPhoto() {
  if (!galleryTarget) return "";
  if (galleryTarget.type === "live") return liveShotPhoto;
  if (galleryTarget.type === "new") return newPostPhoto;
  if (galleryTarget.type === "edit") return editPhotoUrl;
  if (galleryTarget.type === "sug") {
    const s = suggestions.find(x => x.sid === galleryTarget.id);
    return s ? s.foto : "";
  }
  const p = posts.find(x => x.id === galleryTarget.id);
  return p ? p.foto : "";
}

function renderGalleryModal() {
  const cats = ["Todas", ...new Set(gallery.map(g => g.cat))];
  document.getElementById("galCatTabs").innerHTML = cats.map(c =>
    `<button type="button" class="quick-chip ${galleryCatFilter === c ? "active" : ""}" data-gal-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`
  ).join("");

  const grid = document.getElementById("galleryGrid");
  grid.classList.remove("crop-feed", "crop-story");
  if (galleryCropMode === "FEED") grid.classList.add("crop-feed");
  if (galleryCropMode === "STORY") grid.classList.add("crop-story");

  const currentFotoClean = applyCloudinaryTransform(getCurrentTargetPhoto(), "ORIG");
  const list = gallery.filter(g => galleryCatFilter === "Todas" || g.cat === galleryCatFilter);
  const uploadTile = `
    <button type="button" class="gal-upload-tile" id="galUploadTileBtn">
      <span style="font-size:24px;">📸</span>
      <span>Subir foto</span>
    </button>`;

  grid.innerHTML = uploadTile + list.map(g => {
    const safeUrl = safeCloudinaryUrl(g.url, FALLBACK_LOGO_URL);
    const previewUrl = applyCloudinaryTransform(safeUrl, galleryCropMode === "ORIG" ? "ORIG" : galleryCropMode);
    const isSel = currentFotoClean && applyCloudinaryTransform(safeUrl, "ORIG") === currentFotoClean;
    return `
      <button type="button" class="gal-item ${isSel ? "selected" : ""}" data-pick-url="${escapeHtml(safeUrl)}">
        ${isSel ? '<span class="gal-check">✓</span>' : ""}
        <div class="gal-img-wrap">
          <img src="${escapeHtml(previewUrl)}" alt="${escapeHtml(g.desc)}" loading="lazy" />
        </div>
        <span class="gal-label">${escapeHtml(g.desc)}</span>
      </button>`;
  }).join("");
}

function openGalleryFor(target, defaultCrop = "ORIG") {
  galleryTarget = target;
  galleryCropMode = defaultCrop;
  document.querySelectorAll("#cropTabs .mode-btn").forEach(b => b.classList.toggle("active", b.dataset.crop === galleryCropMode));
  renderGalleryModal();
  document.getElementById("galleryModal").classList.add("open");
}

// ===== HOJA DE EDICIÓN CON PREVIEW FIJA =====
function refreshEditPreview() {
  const copy = document.getElementById("editCopy").value;
  const copyStory = document.getElementById("editCopyStory").value;
  const fecha = document.getElementById("editFecha").value;
  const dia = getDiaFromFecha(fecha);
  const isSt = editPreviewMode === "STORY";

  const thumbWrap = document.getElementById("editMiniThumbWrap");
  thumbWrap.classList.toggle("is-story", isSt);
  document.getElementById("editMiniThumb").src = applyCloudinaryTransform(editPhotoUrl, isSt ? "STORY" : "FEED") || safeCloudinaryUrl(editPhotoUrl);
  document.getElementById("editMiniText").textContent = isSt ? (copyStory || buildAutoStoryCopy(copy)) : (copy || "Escribe el copy…");

  document.getElementById("editCopyCounter").textContent = `${copy.length} car. · corte en 125`;
  document.getElementById("editStoryCounter").textContent = `${copyStory.length}/90`;

  const warnHtml = highlightForbiddenHtml(copy + " " + copyStory, dia);
  const warnBox = document.getElementById("editRuleWarn");
  warnBox.innerHTML = warnHtml;
  warnBox.classList.toggle("show", !!warnHtml);
}

function openEditModal(post) {
  editingPostId = post.id;
  editPreviewMode = post.formato === "STORY" ? "STORY" : "IG";
  editPhotoUrl = safeCloudinaryUrl(post.foto);
  document.getElementById("editModalTitle").textContent = `✏️ Editar ID ${post.id}`;
  document.getElementById("editFecha").value = post.fecha || getTodayMx();
  document.getElementById("editHora").value = post.hora || "18:00";
  document.getElementById("editCopy").value = post.copy || "";
  document.getElementById("editCopyStory").value = post.copy_story || buildAutoStoryCopy(post.copy);
  document.getElementById("editAiVariants").style.display = "none";
  document.getElementById("editAiVariants").innerHTML = "";
  destState["EDIT_MODAL"] = getDefaultDest(post.formato, post.red || "AMBAS");
  document.getElementById("editDestContainer").innerHTML = renderDestSelector("EDIT_MODAL", destState["EDIT_MODAL"]);
  document.querySelectorAll("[data-edit-preview]").forEach(b => b.classList.toggle("active", b.dataset.editPreview === editPreviewMode));
  refreshEditPreview();
  document.getElementById("editPostModal").classList.add("open");
}

// ===== EVENT LISTENERS =====
// Encabezado fijo estable (sin colapso dinámico que cause rebote/temblor de scroll)

// Pull-to-refresh en feed
let ptrStartY = 0;
let ptrPulling = false;
document.addEventListener("touchstart", (e) => {
  if (window.scrollY === 0 && !document.querySelector(".modal-backdrop.open")) {
    ptrStartY = e.touches[0].clientY;
    ptrPulling = true;
  }
}, { passive: true });
document.addEventListener("touchmove", (e) => {
  if (!ptrPulling) return;
  const dy = e.touches[0].clientY - ptrStartY;
  const ind = document.getElementById("ptrIndicator");
  if (dy > 20 && dy < 130) {
    ind.style.height = Math.min(30, dy - 20) + "px";
  }
}, { passive: true });
document.addEventListener("touchend", (e) => {
  if (!ptrPulling) return;
  ptrPulling = false;
  const ind = document.getElementById("ptrIndicator");
  const dy = (e.changedTouches[0] ? e.changedTouches[0].clientY : ptrStartY) - ptrStartY;
  ind.style.height = "0px";
  if (dy > 75 && syncCfg.url) syncFromSheets(false);
}, { passive: true });

// Vistas principales (Calendario | Ideas | Pulso)
document.querySelectorAll(".view-tab").forEach(btn => {
  btn.addEventListener("click", () => {
    currentView = btn.dataset.view;
    dayFilter = null;
    render();
  });
});

// 4 filtros de estado
document.querySelectorAll("#statusFilters .filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    dayFilter = null;
    render();
  });
});

// Toast botones
document.getElementById("toastCloseBtn").addEventListener("click", () => {
  document.getElementById("toast").classList.remove("show");
});
document.getElementById("toastActionBtn").addEventListener("click", () => {
  document.getElementById("toast").classList.remove("show");
  if (typeof toastActionHandler === "function") toastActionHandler();
});

// Feed delegado (click, change, input)
document.getElementById("feed").addEventListener("change", (e) => {
  const cb = e.target.closest("input[data-dest-field]");
  if (!cb) return;
  const box = cb.closest("[data-dest-key]");
  if (!box) return;
  const d = destState[box.dataset.destKey];
  if (!d) return;
  d[cb.dataset.destField] = cb.checked;
  render();
});

document.getElementById("feed").addEventListener("input", (e) => {
  const sugSt = e.target.closest("[data-sug-story]");
  if (sugSt) {
    const s = suggestions.find(x => x.sid === sugSt.dataset.sugStory);
    if (s) {
      s.copy_story = sugSt.value.slice(0, 90);
      const counter = sugSt.parentElement.querySelector(".story-copy-head span:last-child");
      if (counter) counter.textContent = `${s.copy_story.length}/90`;
      saveLocal();
    }
  }
});

document.getElementById("feed").addEventListener("click", async (e) => {
  // Tira semanal
  const dayBtn = e.target.closest("[data-day]");
  if (dayBtn) {
    dayFilter = dayFilter === dayBtn.dataset.day ? null : dayBtn.dataset.day;
    render();
    return;
  }
  // Chips de barra resumen
  const sumBtn = e.target.closest("[data-sum-filter]");
  if (sumBtn) {
    currentFilter = sumBtn.dataset.sumFilter;
    dayFilter = null;
    render();
    return;
  }
  if (e.target.closest("#toggleCompactBtn")) {
    compactMode = !compactMode;
    render();
    return;
  }
  if (e.target.closest("[data-action='clear-day-filter']")) {
    dayFilter = null;
    render();
    return;
  }
  if (e.target.closest("[data-action='open-new-from-empty']")) {
    document.getElementById("newPostBtn").click();
    return;
  }
  if (e.target.closest("[data-action='copy-approved-all']")) {
    const approved = posts.filter(p => p.estado === "APROBADO");
    if (!approved.length) { showToast("No hay aprobadas para copiar", { type: "warn" }); return; }
    const text = approved.map(p => `[ID ${p.id} · ${p.fecha} ${p.hora} · ${p.formato}]\n${p.formato === "STORY" ? getEffectiveStoryCopy(p) : p.copy}\nFoto: ${p.foto}`).join("\n\n---\n\n");
    try { await navigator.clipboard.writeText(text); showToast(`📋 ${approved.length} aprobada(s) copiada(s)`, { type: "success" }); }
    catch { showToast("No se pudo copiar", { type: "error" }); }
    return;
  }

  // Zonas seguras / expandir-contraer caption ("… más" / "ver menos") / fullscreen preview
  const safeBtn = e.target.closest("[data-toggle-safe]");
  if (safeBtn) {
    const k = safeBtn.dataset.toggleSafe;
    showSafeZones[k] = !showSafeZones[k];
    render();
    return;
  }
  const togCapBtn = e.target.closest("[data-toggle-caption]");
  if (togCapBtn) {
    e.stopPropagation();
    const k = togCapBtn.dataset.toggleCaption;
    expandedCaptions[k] = !expandedCaptions[k];
    render();
    return;
  }
  const fsEl = e.target.closest("[data-fullscreen-key]");
  if (fsEl && !e.target.closest("button")) {
    const k = fsEl.dataset.fullscreenKey;
    const mode = fsEl.dataset.fullscreenMode;
    let obj = null;
    if (k.startsWith("P_")) obj = posts.find(p => p.id === Number(k.slice(2)));
    else if (k.startsWith("S_")) obj = suggestions.find(s => s.sid === k.slice(2));
    if (obj) {
      document.getElementById("fullscreenTitle").textContent = mode === "STORY" ? "Historia 9:16 (pantalla completa)" : "Imagen completa sin recortes";
      document.getElementById("fullscreenBody").innerHTML = renderMockup(obj, mode, k, true);
      document.getElementById("fullscreenModal").classList.add("open");
    }
    return;
  }

  // Atajos de destino
  const shortcutBtn = e.target.closest("[data-shortcut]");
  if (shortcutBtn) {
    const box = shortcutBtn.closest("[data-dest-key]");
    if (!box) return;
    const sc = shortcutBtn.dataset.shortcut;
    destState[box.dataset.destKey] = sc === "ALL"
      ? { postFb: true, postIg: true, storyFb: true, storyIg: true }
      : sc === "POSTS"
        ? { postFb: true, postIg: true, storyFb: false, storyIg: false }
        : { postFb: false, postIg: false, storyFb: true, storyIg: true };
    render();
    return;
  }

  const sugDayBtn = e.target.closest("[data-sug-day]");
  if (sugDayBtn) {
    sugDayFilter = sugDayBtn.dataset.sugDay;
    render();
    return;
  }

  const restoreSugsBtn = e.target.closest("[data-action='restore-sugs-inline']");
  if (restoreSugsBtn) {
    await withLoading(restoreSugsBtn, async () => {
      if (syncCfg.url) {
        const r = await pushToSheets({ action: "resetSuggestions" });
        if (r && r.ok) await syncFromSheets(true);
        else { showToast("⚠️ " + (r?.error || "Error al reactivar"), { type: "error" }); return; }
      } else {
        suggestions = buildDefaultSuggestions();
        saveLocal();
        render();
      }
      showToast("💡 Banco de ideas reactivado", { type: "success" });
    });
    return;
  }

  // Pulso: Probar en seco (1 comentario)
  const dryRunBtn = e.target.closest("[data-action='dry-run-comment']");
  if (dryRunBtn) {
    if (!syncCfg.url) { showToast("Conecta Google Sheets primero", { type: "warn" }); return; }
    await withLoading(dryRunBtn, async () => {
      const d = await pushToSheets({ action: "dryRunComment" });
      const box = document.getElementById("dryRunResultBox");
      if (d && d.disabled) {
        if (box) {
          box.style.display = "block";
          box.innerHTML = `<span style="color:#fcd34d;">💤 ${escapeHtml(d.error || "Auto-respuesta está en OFF.")}</span>`;
        }
        showToast("Auto-respuesta está en OFF (ENABLE_AUTO_COMMENTS=false)", { type: "warn" });
      } else if (d && d.ok && d.sinPendientes) {
        if (box) {
          box.style.display = "block";
          box.innerHTML = `<span style="color:#86efac;">✅ ${escapeHtml(d.mensaje)}</span>`;
        }
        showToast("Sin comentarios nuevos pendientes", { type: "success" });
      } else if (d && d.ok && d.dryRun) {
        if (box) {
          box.style.display = "block";
          box.innerHTML = `<div><strong>[${escapeHtml(d.red)} · ID ${escapeHtml(d.postId)}] ${escapeHtml(d.autor)}:</strong> "${escapeHtml(d.comentario)}"</div><div style="margin-top:6px;color:#86efac;"><strong>Respuesta propuesta (NO enviada):</strong> ${escapeHtml(d.respuestaPropuesta)}</div>`;
        }
        showToast("▶️ Simulación lista (no se publicó en Meta)", { type: "success" });
      } else {
        showToast("⚠️ " + ((d && d.error) || "Error probando comentarios"), { type: "error" });
      }
    });
    return;
  }

  // Pulso: test Meta & Telegram
  const testMetaBtn = e.target.closest("[data-action='test-meta']");
  if (testMetaBtn) {
    if (!syncCfg.url) { showToast("Conecta Google Sheets primero", { type: "warn" }); return; }
    await withLoading(testMetaBtn, async () => {
      const d = await pushToSheets({ action: "testMeta" });
      if (d.ok) showToast(`✅ Meta OK: ${d.pagina?.name || "FB"} · @${d.instagram?.username || "IG"}`, { type: "success" });
      else showToast("⚠️ " + ((d.errores && d.errores[0]) || d.error || "Revisa credenciales Meta"), { type: "error" });
    });
    return;
  }
  const testTgBtn = e.target.closest("[data-action='test-telegram']");
  if (testTgBtn) {
    if (!syncCfg.url) { showToast("Conecta Google Sheets primero", { type: "warn" }); return; }
    await withLoading(testTgBtn, async () => {
      const d = await pushToSheets({ action: "sendTelegramTest" });
      const via = d.channel === "telegram+email" ? "Telegram y Correo" : (d.channel === "email" ? "Correo de respaldo" : "Telegram");
      showToast(d.ok ? `✅ Alerta enviada vía ${via}` : ("⚠️ " + (d.error || "No se pudo enviar alerta")), { type: d.ok ? "success" : "error" });
    });
    return;
  }

  // ===== TARJETAS DE SUGERENCIAS =====
  const sugCard = e.target.closest("article[data-sid]");
  if (sugCard) {
    const sid = sugCard.dataset.sid;
    const idx = suggestions.findIndex(s => s.sid === sid);
    if (idx === -1) return;
    const sug = suggestions[idx];
    const modeBtn = e.target.closest("[data-mode]");
    if (modeBtn) { previewMode["S_" + sid] = modeBtn.dataset.mode; render(); return; }
    const actionBtn = e.target.closest("[data-action]");
    if (!actionBtn) return;
    const action = actionBtn.dataset.action;

    if (action === "toggle-sug-custom") {
      expandedSugs[sid] = !expandedSugs[sid];
      render();
    } else if (action === "toggle-sug-estado") {
      sugInitialEstado[sid] = (sugInitialEstado[sid] || "BORRADOR") === "BORRADOR" ? "APROBADO" : "BORRADOR";
      render();
    } else if (action === "open-gallery-sug") {
      openGalleryFor({ type: "sug", id: sid }, sug.formato === "STORY" ? "STORY" : "FEED");
    } else if (action === "accept-sug") {
      await withLoading(actionBtn, async () => {
        const dest = getDest("S_" + sid, sug.formato, sug.red);
        const groups = groupDestinations(dest);
        if (!groups.length) { showToast("Marca al menos 1 destino", { type: "warn" }); return; }
        const estado = sugInitialEstado[sid] || "BORRADOR";
        const storyCopyClean = String(sug.copy_story || buildAutoStoryCopy(sug.copy)).slice(0, 90);

        for (const grp of groups) {
          const isSt = grp.formato === "STORY";
          const copyForGrp = isSt ? storyCopyClean : sug.copy;
          const fotoForGrp = applyCloudinaryTransform(sug.foto, isSt ? "STORY" : "FEED");
          if (estado === "APROBADO") {
            const v = await validateBeforeApprove({ copy: copyForGrp, copy_story: storyCopyClean, fecha: sug.fecha, hora: sug.hora, red: grp.red, formato: grp.formato, foto: fotoForGrp });
            if (!v.ok) { showToast("⛔ " + v.error, { type: "error" }); return; }
          }
        }

        const createdPosts = [];
        for (const grp of groups) {
          const isSt = grp.formato === "STORY";
          const copyForGrp = isSt ? storyCopyClean : sug.copy;
          const fotoForGrp = applyCloudinaryTransform(sug.foto, isSt ? "STORY" : "FEED");
          if (syncCfg.url) {
            const res = await pushToSheets({
              action: "create", fecha: sug.fecha, hora: sug.hora,
              red: grp.red, formato: grp.formato, estado, copy: copyForGrp, copy_story: storyCopyClean,
              foto: fotoForGrp, idea: sug.titulo, titulo: sug.titulo
            });
            // Cero publicaciones fantasma: si falla Sheets, detener y dejar sugerencia intacta
            if (!res || !res.ok || !res.id) {
              showToast("⛔ No se pudo crear en Sheets: " + ((res && res.error) || "Error de red"), { type: "error" });
              return;
            }
            createdPosts.push({
              id: Number(res.id), fecha: sug.fecha, dia: sug.dia, hora: sug.hora,
              red: grp.red, formato: grp.formato, estado, copy: copyForGrp, copy_story: storyCopyClean,
              foto: fotoForGrp, nota_error: "", fecha_pub_real: "", version: 1, editado_por: syncCfg.editor
            });
          } else {
            const localId = posts.reduce((m, p) => Math.max(m, p.id), 0) + 1 + createdPosts.length;
            createdPosts.push({
              id: localId, fecha: sug.fecha, dia: sug.dia, hora: sug.hora,
              red: grp.red, formato: grp.formato, estado, copy: copyForGrp, copy_story: storyCopyClean,
              foto: fotoForGrp, nota_error: "", fecha_pub_real: "", version: 1, editado_por: syncCfg.editor
            });
          }
        }

        createdPosts.forEach(np => posts.push(np));
        if (syncCfg.url) await pushToSheets({ action: "updateSuggestion", sid, estado_sug: "ACEPTADA" });
        sugCard.classList.add("slide-out");
        const removedSug = suggestions.splice(idx, 1)[0];
        saveLocal();
        setTimeout(() => render(), 240);

        const idsStr = createdPosts.map(x => `ID ${x.id}`).join(" + ");
        showToast(`✅ Programada ${idsStr}`, {
          type: "success",
          actionLabel: "Deshacer",
          onAction: async () => {
            for (const cp of createdPosts) {
              if (syncCfg.url) await pushToSheets({ action: "updatePost", id: cp.id, estado: "CANCELADO", version: 1 });
              cp.estado = "CANCELADO";
            }
            if (syncCfg.url) await pushToSheets({ action: "updateSuggestion", sid, estado_sug: "PENDIENTE" });
            suggestions.unshift(removedSug);
            saveLocal();
            render();
            showToast("↩ Idea restaurada", { type: "warn" });
          }
        });
      });
    } else if (action === "decline-sug") {
      await withLoading(actionBtn, async () => {
        if (syncCfg.url) {
          const r = await pushToSheets({ action: "updateSuggestion", sid, estado_sug: "DECLINADA" });
          if (!r || !r.ok) { showToast("⚠️ " + (r?.error || "No se pudo declinar"), { type: "error" }); return; }
        }
        suggestions.splice(idx, 1);
        saveLocal();
        render();
        showToast("Idea declinada", { type: "warn" });
      });
    }
    return;
  }

  // ===== TARJETAS DE PUBLICACIONES (COMPACTA O EXPANDIDA) =====
  const postEl = e.target.closest("article[data-id]");
  if (!postEl) return;
  const id = Number(postEl.dataset.id);
  const post = posts.find(p => p.id === id);
  if (!post) return;

  // Tocar fila compacta (fuera del botón aprobar) -> expandir tarjeta y marcar vista
  if (postEl.classList.contains("compact-row") && !e.target.closest("[data-action]")) {
    expandedCards[id] = true;
    markPostSeen(post);
    render();
    return;
  }

  const modeBtn = e.target.closest("[data-mode]");
  if (modeBtn) {
    previewMode["P_" + id] = modeBtn.dataset.mode;
    render();
    return;
  }

  const actionBtn = e.target.closest("[data-action]");
  if (!actionBtn) return;
  const action = actionBtn.dataset.action;

  if (action === "collapse-card") {
    delete expandedCards[id];
    render();
    return;
  }

  if (action === "open-edit") {
    markPostSeen(post);
    openEditModal(post);
    return;
  }

  if (action === "open-gallery") {
    markPostSeen(post);
    openGalleryFor({ type: "post", id }, post.formato === "STORY" ? "STORY" : "FEED");
    return;
  }

  if (action === "copy-wa-link") {
    const waTrackUrl = buildTrackableWaUrl(post.id);
    try {
      await navigator.clipboard.writeText(waTrackUrl);
      showToast(syncCfg.url ? `🔗 Link WA rastreable de ID ${post.id} copiado` : "🔗 Link WhatsApp copiado (conecta Sheets para rastreo)", { type: "success" });
    } catch {
      showToast("No se pudo copiar el link WA", { type: "error" });
    }
    return;
  }

  if (action === "copy-one") {
    const mode = previewMode["P_" + id] || (post.formato === "STORY" ? "STORY" : "IG");
    const textToCopy = (mode === "STORY" || post.formato === "STORY") ? getEffectiveStoryCopy(post) : post.copy;
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast(mode === "STORY" || post.formato === "STORY" ? `📋 Copy_Story de ID ${id} copiado` : `📋 Copy largo de ID ${id} copiado`, { type: "success" });
    } catch {
      showToast("No se pudo copiar", { type: "error" });
    }
    return;
  }

  if (action === "story-kit") {
    const stCopy = getEffectiveStoryCopy(post);
    try { await navigator.clipboard.writeText(stCopy); } catch {}
    const a = document.createElement("a");
    a.href = applyCloudinaryTransform(post.foto, "STORY");
    a.target = "_blank";
    a.rel = "noopener";
    a.download = `laparrilla_story_${post.id}.jpg`;
    a.click();
    showToast("📥 Copy_Story copiado y foto 9:16 lista", { type: "success" });
    return;
  }

  if (action === "share-fb-groups") {
    try { await navigator.clipboard.writeText(post.copy); } catch {}
    window.open("https://www.facebook.com/La-Parrilla-106299351752487", "_blank", "noopener");
    showToast("Copy copiado · Abriendo Facebook", { type: "success" });
    return;
  }

  if (action === "retry-missing") {
    await withLoading(actionBtn, async () => {
      const missingRed = post.estado === "ERROR_FB" ? "FB" : (post.estado === "ERROR_IG" ? "IG" : normalizeRed(post.red || "AMBAS"));
      const res = await pushToSheets({ action: "retryNetwork", id, missingRed });
      if (res && res.ok) {
        post.red = missingRed;
        post.estado = "APROBADO";
        post.nota_error = "";
        if (res.version) post.version = Number(res.version);
        post.editado_por = res.editado_por || syncCfg.editor;
        markPostSeen(post);
        saveLocal();
        render();
        showToast(`🔄 ID ${id} listo para reintentar en ${missingRed}`, { type: "success" });
      } else {
        showToast("⚠️ " + ((res && res.error) || "No se pudo reintentar"), { type: "error" });
      }
    });
    return;
  }

  if (action === "toggle-approve") {
    await withLoading(actionBtn, async () => {
      const prevEstado = post.estado;
      const nextEstado = post.estado === "APROBADO" ? "BORRADOR" : "APROBADO";
      if (nextEstado === "APROBADO") {
        const v = await validateBeforeApprove(post);
        if (!v.ok) { showToast("⛔ " + v.error, { type: "error" }); return; }
      }
      if (syncCfg.url) {
        const res = await pushToSheets({ action: "updatePost", id, estado: nextEstado, version: post.version || 1 });
        if (res && res.conflict) { openConflictModal(post, res, null); return; }
        if (!res || !res.ok) { showToast("⛔ " + ((res && res.error) || "Error al actualizar en Sheets"), { type: "error" }); return; }
        if (res.version) post.version = Number(res.version);
        if (res.editado_por) post.editado_por = res.editado_por;
      }
      post.estado = nextEstado;
      markPostSeen(post);
      saveLocal();
      render();
      if (nextEstado === "APROBADO") {
        if (navigator.vibrate) navigator.vibrate(15);
        const cardNode = document.querySelector(`article[data-id="${id}"]`);
        if (cardNode) cardNode.classList.add("flash-green");
      }
      showToast(nextEstado === "APROBADO" ? `✅ ID ${id} aprobada` : `↩ ID ${id} en borrador`, {
        type: "success",
        actionLabel: "Deshacer",
        onAction: async () => {
          if (syncCfg.url) {
            const r = await pushToSheets({ action: "updatePost", id, estado: prevEstado, version: post.version || 1 });
            if (!r || !r.ok) { showToast("⚠️ No se pudo deshacer", { type: "error" }); return; }
            if (r.version) post.version = Number(r.version);
          }
          post.estado = prevEstado;
          saveLocal();
          render();
        }
      });
    });
    return;
  }

  if (action === "mark-published") {
    await withLoading(actionBtn, async () => {
      const nextEstado = post.estado === "PUBLICADO" ? "BORRADOR" : "PUBLICADO";
      if (syncCfg.url) {
        const res = await pushToSheets({ action: "updatePost", id, estado: nextEstado, version: post.version || 1 });
        if (res && res.conflict) { openConflictModal(post, res, null); return; }
        // §6: Nunca marcar localmente si Sheets rechazó el cambio
        if (!res || !res.ok) { showToast("⛔ " + ((res && res.error) || "Sheets rechazó el cambio"), { type: "error" }); return; }
        if (res.version) post.version = Number(res.version);
        if (res.editado_por) post.editado_por = res.editado_por;
      }
      post.estado = nextEstado;
      markPostSeen(post);
      saveLocal();
      render();
      showToast(`✅ Historia ID ${id} → ${nextEstado}`, { type: "success" });
    });
  }
});

// ===== MODAL EDITAR =====
document.getElementById("closeEditModalBtn").addEventListener("click", () => document.getElementById("editPostModal").classList.remove("open"));
document.getElementById("editCopy").addEventListener("input", refreshEditPreview);
document.getElementById("editCopyStory").addEventListener("input", refreshEditPreview);
document.getElementById("editFecha").addEventListener("change", refreshEditPreview);
document.querySelectorAll("[data-edit-preview]").forEach(btn => {
  btn.addEventListener("click", () => {
    editPreviewMode = btn.dataset.editPreview;
    document.querySelectorAll("[data-edit-preview]").forEach(b => b.classList.toggle("active", b === btn));
    refreshEditPreview();
  });
});
document.getElementById("editPickPhotoBtn").addEventListener("click", () => {
  openGalleryFor({ type: "edit", id: editingPostId }, editPreviewMode === "STORY" ? "STORY" : "FEED");
});
document.getElementById("editDestContainer").addEventListener("click", (e) => {
  const sc = e.target.closest("[data-shortcut]");
  if (!sc) return;
  const v = sc.dataset.shortcut;
  destState["EDIT_MODAL"] = v === "ALL"
    ? { postFb: true, postIg: true, storyFb: true, storyIg: true }
    : v === "POSTS"
      ? { postFb: true, postIg: true, storyFb: false, storyIg: false }
      : { postFb: false, postIg: false, storyFb: true, storyIg: true };
  document.getElementById("editDestContainer").innerHTML = renderDestSelector("EDIT_MODAL", destState["EDIT_MODAL"]);
});
document.getElementById("editDestContainer").addEventListener("change", (e) => {
  const cb = e.target.closest("input[data-dest-field]");
  if (!cb) return;
  destState["EDIT_MODAL"][cb.dataset.destField] = cb.checked;
  document.getElementById("editDestContainer").innerHTML = renderDestSelector("EDIT_MODAL", destState["EDIT_MODAL"]);
});
// ✨ Redactor rápido con IA en Editar + Insertar link WA rastreable
document.getElementById("editQuickAiBtn").addEventListener("click", async (e) => {
  if (!syncCfg.url) { showToast("Conecta Google Sheets para usar el redactor IA", { type: "warn" }); return; }
  await withLoading(e.currentTarget, async () => {
    const idea = document.getElementById("editCopy").value.trim();
    const fecha = document.getElementById("editFecha").value;
    const d = await pushToSheets({ action: "generateCopy", mode: "quick", idea, fecha, formato: "POST" });
    if (d && d.ok && d.copy) {
      document.getElementById("editCopy").value = d.copy;
      if (d.copyStory) document.getElementById("editCopyStory").value = String(d.copyStory).slice(0, 90);
      refreshEditPreview();
      showToast("✨ Copy y Copy_Story redactados con Gemini", { type: "success" });
    } else if (d && d.missingGeminiKey) {
      showToast("⚠️ Falta GEMINI_API_KEY en Propiedades de script (Apps Script)", { type: "warn", duration: 6000 });
    } else {
      showToast("⚠️ " + ((d && d.error) || "No se pudo redactar con IA"), { type: "error" });
    }
  });
});

document.getElementById("editInsertWaBtn").addEventListener("click", () => {
  const url = buildTrackableWaUrl(editingPostId);
  const ta = document.getElementById("editCopy");
  if (!ta.value.includes(url)) {
    ta.value = (ta.value.trim() ? ta.value.trim() + " 👉 " : "Pide por WhatsApp 👉 ") + url;
    refreshEditPreview();
  }
  showToast(syncCfg.url ? `🔗 Link WA rastreable (ID ${editingPostId}) insertado` : "🔗 Link WhatsApp insertado", { type: "success" });
});

document.getElementById("editPostModal").addEventListener("click", async (e) => {
  const aiBtn = e.target.closest("[data-edit-ai]");
  if (aiBtn) {
    if (!syncCfg.url) { showToast("Conecta Google Sheets para usar IA", { type: "warn" }); return; }
    await withLoading(aiBtn, async () => {
      const d = await pushToSheets({
        action: "generateCopy",
        tono: aiBtn.dataset.editAi,
        fecha: document.getElementById("editFecha").value,
        formato: editPreviewMode === "STORY" ? "STORY" : "POST",
        copy: document.getElementById("editCopy").value
      });
      const box = document.getElementById("editAiVariants");
      if (d.ok && Array.isArray(d.variantes)) {
        box.style.display = "flex";
        box.innerHTML = d.variantes.map((v, i) =>
          `<button type="button" class="btn" data-pick-edit-ai="${i}" style="text-align:left;justify-content:flex-start;white-space:normal;min-height:40px;font-size:var(--fs-xs);padding:6px 10px;">✨ ${i + 1}: ${escapeHtml(v.slice(0, 105))}${v.length > 105 ? "…" : ""}</button>`
        ).join("");
        box._variants = d.variantes;
      } else {
        showToast("⚠️ " + (d.error || "Falta GEMINI_API_KEY"), { type: "error" });
      }
    });
    return;
  }
  const pickAi = e.target.closest("[data-pick-edit-ai]");
  if (pickAi) {
    const v = (document.getElementById("editAiVariants")._variants || [])[Number(pickAi.dataset.pickEditAi)];
    if (v) {
      document.getElementById("editCopy").value = v;
      refreshEditPreview();
      showToast("Opción aplicada", { type: "success" });
    }
  }
});

document.getElementById("saveEditPostBtn").addEventListener("click", async (e) => {
  const post = posts.find(p => p.id === editingPostId);
  if (!post) return;
  const groups = groupDestinations(destState["EDIT_MODAL"] || getDefaultDest(post.formato, post.red));
  if (!groups.length) { showToast("Marca al menos 1 destino", { type: "warn" }); return; }
  const newFecha = document.getElementById("editFecha").value;
  const newHora = document.getElementById("editHora").value || "18:00";
  const newCopy = document.getElementById("editCopy").value.trim();
  const newCopyStory = document.getElementById("editCopyStory").value.trim().slice(0, 90);
  if (!newFecha || !newCopy) { showToast("Escribe fecha y copy", { type: "warn" }); return; }

  const doSave = async (force = false) => {
    const btn = document.getElementById("saveEditPostBtn");
    await withLoading(btn, async () => {
      const primary = groups[0];
      const primaryFoto = groups.length > 1 ? applyCloudinaryTransform(editPhotoUrl, primary.formato === "STORY" ? "STORY" : "FEED") : safeCloudinaryUrl(editPhotoUrl);
      if (syncCfg.url) {
        const r1 = await pushToSheets({
          action: "updatePost", id: post.id,
          fecha: newFecha, hora: newHora, formato: primary.formato, red: primary.red,
          copy: newCopy, copy_story: newCopyStory, foto: primaryFoto,
          version: post.version || 1, force
        });
        if (r1 && r1.conflict && !force) {
          openConflictModal({ ...post, copy: newCopy }, r1, () => doSave(true));
          return;
        }
        if (!r1 || !r1.ok) {
          showToast("⛔ " + ((r1 && r1.error) || "No se pudo guardar en Sheets"), { type: "error" });
          return;
        }
        if (r1.version) post.version = Number(r1.version);
        if (r1.editado_por) post.editado_por = r1.editado_por;
      }

      post.fecha = newFecha;
      post.dia = getDiaFromFecha(newFecha);
      post.hora = newHora;
      post.formato = primary.formato;
      post.red = primary.red;
      post.copy = newCopy;
      post.copy_story = newCopyStory;
      post.foto = primaryFoto;

      if (groups.length > 1) {
        const extra = groups[1];
        const extraCopy = extra.formato === "STORY" ? (newCopyStory || buildAutoStoryCopy(newCopy)) : newCopy;
        const extraFoto = applyCloudinaryTransform(editPhotoUrl, extra.formato === "STORY" ? "STORY" : "FEED");
        if (syncCfg.url) {
          const r2 = await pushToSheets({
            action: "create", fecha: newFecha, hora: newHora,
            red: extra.red, formato: extra.formato, estado: post.estado,
            copy: extraCopy, copy_story: newCopyStory, foto: extraFoto,
            idea: `Copia ${extra.formato} de ID ${post.id}`
          });
          if (!r2 || !r2.ok || !r2.id) {
            showToast("⚠️ Principal guardada, pero falló copia extra: " + (r2?.error || "red"), { type: "warn" });
          } else {
            posts.push({
              id: Number(r2.id), fecha: newFecha, dia: post.dia, hora: newHora,
              red: extra.red, formato: extra.formato, estado: post.estado,
              copy: extraCopy, copy_story: newCopyStory, foto: extraFoto,
              nota_error: "", fecha_pub_real: "", version: 1, editado_por: syncCfg.editor
            });
          }
        } else {
          const nextLocal = posts.reduce((m, p) => Math.max(m, p.id), 0) + 1;
          posts.push({
            id: nextLocal, fecha: newFecha, dia: post.dia, hora: newHora,
            red: extra.red, formato: extra.formato, estado: post.estado,
            copy: extraCopy, copy_story: newCopyStory, foto: extraFoto,
            nota_error: "", fecha_pub_real: "", version: 1, editado_por: syncCfg.editor
          });
        }
      }

      markPostSeen(post);
      saveLocal();
      document.getElementById("editPostModal").classList.remove("open");
      render();
      showToast(`☁️ ID ${post.id} guardada`, { type: "success" });
    });
  };
  await doSave(false);
});

document.getElementById("cancelEditPostBtn").addEventListener("click", async (e) => {
  const post = posts.find(p => p.id === editingPostId);
  if (!post) return;
  if (!confirm(`¿Cancelar definitivamente la publicación ID ${post.id}?`)) return;
  await withLoading(e.currentTarget, async () => {
    if (syncCfg.url) {
      const res = await pushToSheets({ action: "updatePost", id: post.id, estado: "CANCELADO", version: post.version || 1 });
      if (res && res.conflict) { openConflictModal(post, res, null); return; }
      if (!res || !res.ok) { showToast("⛔ " + (res?.error || "Error al cancelar"), { type: "error" }); return; }
    }
    post.estado = "CANCELADO";
    saveLocal();
    document.getElementById("editPostModal").classList.remove("open");
    render();
    showToast(`🗑️ ID ${post.id} cancelada`, { type: "warn" });
  });
});

// ===== MODAL + NUEVA =====
function refreshNewPostLive() {
  const copy = document.getElementById("newPostCopy").value;
  const copyStory = document.getElementById("newPostCopyStory").value;
  const fecha = document.getElementById("newPostFecha").value;
  const dia = getDiaFromFecha(fecha);
  const groups = groupDestinations(getDest("NEW_POST", "POST", "AMBAS"));
  const hasStory = groups.some(g => g.formato === "STORY");

  document.getElementById("newPostStoryCopyBox").style.display = hasStory ? "flex" : "none";
  document.getElementById("newPostStoryCounter").textContent = `${copyStory.length}/90`;
  document.getElementById("newPostCopyCounter").textContent = `${copy.length} car. · corte en 125`;
  document.getElementById("newPostMiniCopy").textContent = copy.trim() ? copy.slice(0, 125) + (copy.length > 125 ? "…" : "") : "Escribe tu texto abajo…";
  document.getElementById("newPostThumb").src = applyCloudinaryTransform(newPostPhoto, "FEED") || safeCloudinaryUrl(newPostPhoto);

  const warnHtml = highlightForbiddenHtml(copy + " " + copyStory, dia);
  const warnBox = document.getElementById("newPostRuleWarn");
  warnBox.innerHTML = warnHtml;
  warnBox.classList.toggle("show", !!warnHtml);
}

function renderNewPostDayChips(selectedDate) {
  const nw = getNextWeekDatesMx();
  const days = ["Mié", "Jue", "Vie", "Sáb", "Dom"];
  document.getElementById("newPostDayChips").innerHTML = days.map(d => {
    const dt = nw[d];
    const num = Number(dt.slice(-2));
    return `<button type="button" class="quick-chip ${selectedDate === dt ? "active" : ""}" data-quick-date="${dt}">${d} ${num}</button>`;
  }).join("");
}

document.getElementById("newPostBtn").addEventListener("click", () => {
  const nw = getNextWeekDatesMx();
  const defaultFecha = getTodayMx();
  document.getElementById("newPostFecha").value = defaultFecha;
  document.getElementById("newPostHora").value = "18:00";
  document.getElementById("newPostCopy").value = "";
  document.getElementById("newPostCopyStory").value = "";
  document.getElementById("newPostAiVariants").style.display = "none";
  document.getElementById("newPostEstadoBtn").textContent = newPostEstado;
  document.getElementById("newPostEstadoBtn").classList.toggle("active", newPostEstado === "APROBADO");
  destState["NEW_POST"] = { postFb: true, postIg: true, storyFb: false, storyIg: false };
  document.getElementById("newPostDestContainer").innerHTML = renderDestSelector("NEW_POST", destState["NEW_POST"]);
  renderNewPostDayChips(defaultFecha);
  document.querySelectorAll("#newPostTimeChips .quick-chip").forEach(b => b.classList.toggle("active", b.dataset.quickTime === "18:00"));
  refreshNewPostLive();
  document.getElementById("newPostModal").classList.add("open");
});

document.getElementById("closeNewPostBtn").addEventListener("click", () => document.getElementById("newPostModal").classList.remove("open"));
document.getElementById("newPostCopy").addEventListener("input", refreshNewPostLive);
document.getElementById("newPostCopyStory").addEventListener("input", refreshNewPostLive);
document.getElementById("newPostFecha").addEventListener("change", () => {
  renderNewPostDayChips(document.getElementById("newPostFecha").value);
  refreshNewPostLive();
});
document.getElementById("newPostDayChips").addEventListener("click", (e) => {
  const b = e.target.closest("[data-quick-date]");
  if (!b) return;
  document.getElementById("newPostFecha").value = b.dataset.quickDate;
  renderNewPostDayChips(b.dataset.quickDate);
  refreshNewPostLive();
});
document.getElementById("newPostTimeChips").addEventListener("click", (e) => {
  const b = e.target.closest("[data-quick-time]");
  if (!b) return;
  document.getElementById("newPostHora").value = b.dataset.quickTime;
  document.querySelectorAll("#newPostTimeChips .quick-chip").forEach(x => x.classList.toggle("active", x === b));
});
document.getElementById("newPostEstadoBtn").addEventListener("click", (e) => {
  newPostEstado = newPostEstado === "BORRADOR" ? "APROBADO" : "BORRADOR";
  e.target.textContent = newPostEstado;
  e.target.classList.toggle("active", newPostEstado === "APROBADO");
});
document.getElementById("newPostDestContainer").addEventListener("click", (e) => {
  const sc = e.target.closest("[data-shortcut]");
  if (!sc) return;
  const v = sc.dataset.shortcut;
  destState["NEW_POST"] = v === "ALL"
    ? { postFb: true, postIg: true, storyFb: true, storyIg: true }
    : v === "POSTS"
      ? { postFb: true, postIg: true, storyFb: false, storyIg: false }
      : { postFb: false, postIg: false, storyFb: true, storyIg: true };
  document.getElementById("newPostDestContainer").innerHTML = renderDestSelector("NEW_POST", destState["NEW_POST"]);
  refreshNewPostLive();
});
document.getElementById("newPostDestContainer").addEventListener("change", (e) => {
  const cb = e.target.closest("input[data-dest-field]");
  if (!cb) return;
  destState["NEW_POST"][cb.dataset.destField] = cb.checked;
  document.getElementById("newPostDestContainer").innerHTML = renderDestSelector("NEW_POST", destState["NEW_POST"]);
  refreshNewPostLive();
});
document.getElementById("newPostPickPhotoBtn").addEventListener("click", () => openGalleryFor({ type: "new" }, "FEED"));

// ✨ Redactor rápido con IA en + Nueva
document.getElementById("newQuickAiBtn").addEventListener("click", async (e) => {
  if (!syncCfg.url) { showToast("Conecta Google Sheets para usar el redactor IA", { type: "warn" }); return; }
  await withLoading(e.currentTarget, async () => {
    const idea = document.getElementById("newPostCopy").value.trim();
    const fecha = document.getElementById("newPostFecha").value;
    const d = await pushToSheets({ action: "generateCopy", mode: "quick", idea, fecha, formato: "POST" });
    if (d && d.ok && d.copy) {
      document.getElementById("newPostCopy").value = d.copy;
      if (d.copyStory) document.getElementById("newPostCopyStory").value = String(d.copyStory).slice(0, 90);
      refreshNewPostLive();
      showToast("✨ Copy y Copy_Story redactados con Gemini", { type: "success" });
    } else if (d && d.missingGeminiKey) {
      showToast("⚠️ Falta GEMINI_API_KEY en Propiedades de script (Apps Script)", { type: "warn", duration: 6000 });
    } else {
      showToast("⚠️ " + ((d && d.error) || "No se pudo redactar con IA"), { type: "error" });
    }
  });
});

document.getElementById("newPostModal").addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-new-ai]");
  if (btn) {
    if (!syncCfg.url) { showToast("Conecta Google Sheets para usar IA", { type: "warn" }); return; }
    await withLoading(btn, async () => {
      const fecha = document.getElementById("newPostFecha").value;
      const idea = document.getElementById("newPostCopy").value.trim();
      const groups = groupDestinations(getDest("NEW_POST", "POST", "AMBAS"));
      const formato = (groups[0] && groups[0].formato) || "POST";
      const d = await pushToSheets({ action: "generateCopy", tono: btn.dataset.newAi, fecha, formato, idea });
      const box = document.getElementById("newPostAiVariants");
      if (d.ok && Array.isArray(d.variantes)) {
        box.style.display = "flex";
        box.innerHTML = d.variantes.map((v, i) =>
          `<button type="button" class="btn" data-pick-new-ai="${i}" style="text-align:left;justify-content:flex-start;white-space:normal;min-height:40px;font-size:var(--fs-xs);padding:6px 10px;">✨ ${i + 1}: ${escapeHtml(v.slice(0, 105))}${v.length > 105 ? "…" : ""}</button>`
        ).join("");
        box._variants = d.variantes;
      } else {
        showToast("⚠️ " + (d.error || "Falta GEMINI_API_KEY"), { type: "error" });
      }
    });
    return;
  }
  const pick = e.target.closest("[data-pick-new-ai]");
  if (pick) {
    const v = (document.getElementById("newPostAiVariants")._variants || [])[Number(pick.dataset.pickNewAi)];
    if (v) {
      document.getElementById("newPostCopy").value = v;
      if (!document.getElementById("newPostCopyStory").value.trim()) {
        document.getElementById("newPostCopyStory").value = buildAutoStoryCopy(v);
      }
      refreshNewPostLive();
      showToast("Opción aplicada", { type: "success" });
    }
  }
});

document.getElementById("saveNewPostBtn").addEventListener("click", async (e) => {
  await withLoading(e.currentTarget, async () => {
    const fecha = document.getElementById("newPostFecha").value;
    const hora = document.getElementById("newPostHora").value || "18:00";
    const copy = document.getElementById("newPostCopy").value.trim();
    const copyStoryRaw = document.getElementById("newPostCopyStory").value.trim();
    if (!fecha || (!copy && !copyStoryRaw)) { showToast("Escribe fecha y texto", { type: "warn" }); return; }
    const groups = groupDestinations(getDest("NEW_POST", "POST", "AMBAS"));
    if (!groups.length) { showToast("Marca al menos 1 destino", { type: "warn" }); return; }
    const copyStory = (copyStoryRaw || buildAutoStoryCopy(copy)).slice(0, 90);
    const isSplit = groups.length > 1;

    for (const grp of groups) {
      const isSt = grp.formato === "STORY";
      const grpCopy = isSt ? copyStory : (copy || copyStory);
      const grpFoto = isSplit ? applyCloudinaryTransform(newPostPhoto, isSt ? "STORY" : "FEED") : safeCloudinaryUrl(newPostPhoto);
      if (newPostEstado === "APROBADO") {
        const v = await validateBeforeApprove({ fecha, hora, red: grp.red, formato: grp.formato, copy: grpCopy, copy_story: copyStory, foto: grpFoto });
        if (!v.ok) { showToast("⛔ " + v.error, { type: "error" }); return; }
      }
    }

    const dia = getDiaFromFecha(fecha);
    const created = [];
    for (const grp of groups) {
      const isSt = grp.formato === "STORY";
      const grpCopy = isSt ? copyStory : (copy || copyStory);
      const grpFoto = isSplit ? applyCloudinaryTransform(newPostPhoto, isSt ? "STORY" : "FEED") : safeCloudinaryUrl(newPostPhoto);
      if (syncCfg.url) {
        const res = await pushToSheets({
          action: "create", fecha, hora, red: grp.red, formato: grp.formato,
          estado: newPostEstado, copy: grpCopy, copy_story: copyStory, foto: grpFoto,
          idea: "Creada desde La Parrilla Studio"
        });
        if (!res || !res.ok || !res.id) {
          showToast("⛔ No se pudo guardar en Sheets: " + (res?.error || "Error de red"), { type: "error" });
          return;
        }
        created.push({
          id: Number(res.id), fecha, dia, hora, red: grp.red, formato: grp.formato,
          estado: newPostEstado, copy: grpCopy, copy_story: copyStory, foto: grpFoto,
          nota_error: "", fecha_pub_real: "", version: 1, editado_por: syncCfg.editor
        });
      } else {
        const localId = posts.reduce((m, p) => Math.max(m, p.id), 0) + 1 + created.length;
        created.push({
          id: localId, fecha, dia, hora, red: grp.red, formato: grp.formato,
          estado: newPostEstado, copy: grpCopy, copy_story: copyStory, foto: grpFoto,
          nota_error: "", fecha_pub_real: "", version: 1, editado_por: syncCfg.editor
        });
      }
    }

    created.forEach(np => posts.push(np));
    saveLocal();
    document.getElementById("newPostModal").classList.remove("open");
    render();
    showToast(`☁️ Creada (${created.map(x => "ID " + x.id).join(", ")})`, { type: "success" });
  });
});

// ===== MODAL 🔥 DISPARO EN VIVO (CONFIRMACIÓN + ÉXITO ANIMADO) =====
function refreshLiveShotUI() {
  const inp = document.getElementById("liveShotCopy");
  const txt = inp.value;
  document.getElementById("liveShotCounter").textContent = `${txt.length}/90`;
  document.getElementById("liveShotOverlayText").textContent = txt.trim() || "🔥 ¡YA PRENDIMOS EL CARBÓN!";
  const warnHtml = highlightForbiddenHtml(txt, getDiaFromFecha(getTodayMx()));
  const warnBox = document.getElementById("liveShotRuleWarn");
  warnBox.innerHTML = warnHtml;
  warnBox.classList.toggle("show", !!warnHtml);
  const nowH = getNowTimeMx();
  const btn = document.getElementById("saveLiveShotBtn");
  btn.textContent = liveShotConfirmPending
    ? `✅ Confirmar envío ahora (${nowH})`
    : `🚀 Publicar en FB + IG (${nowH})`;
}

document.getElementById("liveShotCopy").addEventListener("input", () => {
  liveShotConfirmPending = false;
  document.getElementById("liveShotConfirmBox").style.display = "none";
  refreshLiveShotUI();
});

document.getElementById("liveShotBtn").addEventListener("click", () => {
  liveShotEstado = "APROBADO";
  liveShotConfirmPending = false;
  document.getElementById("liveShotFormBody").style.display = "flex";
  document.getElementById("liveShotFooter").style.display = "flex";
  document.getElementById("liveShotSuccessBox").classList.remove("show");
  document.getElementById("liveShotConfirmBox").style.display = "none";
  const estBtn = document.getElementById("liveShotEstadoBtn");
  estBtn.textContent = liveShotEstado;
  estBtn.classList.add("active");
  document.getElementById("liveShotThumb").src = applyCloudinaryTransform(liveShotPhoto, "STORY");
  refreshLiveShotUI();
  document.getElementById("liveShotModal").classList.add("open");
});

document.getElementById("closeLiveShotBtn").addEventListener("click", () => document.getElementById("liveShotModal").classList.remove("open"));
document.getElementById("liveShotDoneBtn").addEventListener("click", () => document.getElementById("liveShotModal").classList.remove("open"));
document.getElementById("liveShotEstadoBtn").addEventListener("click", (e) => {
  liveShotEstado = liveShotEstado === "APROBADO" ? "BORRADOR" : "APROBADO";
  e.target.textContent = liveShotEstado;
  e.target.classList.toggle("active", liveShotEstado === "APROBADO");
  liveShotConfirmPending = false;
  document.getElementById("liveShotConfirmBox").style.display = "none";
  refreshLiveShotUI();
});
document.getElementById("liveShotPickPhotoBtn").addEventListener("click", () => openGalleryFor({ type: "live" }, "STORY"));

document.getElementById("saveLiveShotBtn").addEventListener("click", async (e) => {
  const copy = document.getElementById("liveShotCopy").value.trim().slice(0, 90);
  if (!copy) { showToast("Escribe el texto corto para la historia", { type: "warn" }); return; }
  const fecha = getTodayMx();
  const hora = getNowTimeMx();
  const foto = applyCloudinaryTransform(liveShotPhoto, "STORY");

  if (liveShotEstado === "APROBADO" && !liveShotConfirmPending) {
    const v = await validateBeforeApprove({ fecha, hora, red: "AMBAS", formato: "STORY", copy, copy_story: copy, foto });
    if (!v.ok) { showToast("⛔ " + v.error, { type: "error" }); return; }
    liveShotConfirmPending = true;
    const cBox = document.getElementById("liveShotConfirmBox");
    cBox.textContent = `⚡ Se publicará en Historia FB + IG hoy (${hora}). Toca de nuevo para confirmar.`;
    cBox.style.display = "block";
    refreshLiveShotUI();
    return;
  }

  await withLoading(e.currentTarget, async () => {
    if (liveShotEstado === "APROBADO") {
      const v = await validateBeforeApprove({ fecha, hora, red: "AMBAS", formato: "STORY", copy, copy_story: copy, foto });
      if (!v.ok) { showToast("⛔ " + v.error, { type: "error" }); return; }
    }
    let finalId = posts.reduce((m, p) => Math.max(m, p.id), 0) + 1;
    if (syncCfg.url) {
      const res = await pushToSheets({
        action: "create", fecha, hora, red: "AMBAS", formato: "STORY",
        estado: liveShotEstado, copy, copy_story: copy, foto,
        idea: "🔥 Disparo en vivo (Historia FB+IG)"
      });
      if (!res || !res.ok || !res.id) {
        showToast("⛔ No se pudo guardar en Sheets: " + (res?.error || "Error de red"), { type: "error" });
        return;
      }
      finalId = Number(res.id);
    }
    posts.push({
      id: finalId, fecha, dia: getDiaFromFecha(fecha), hora, red: "AMBAS", formato: "STORY",
      estado: liveShotEstado, copy, copy_story: copy, foto,
      nota_error: "", fecha_pub_real: "", version: 1, editado_por: syncCfg.editor
    });
    saveLocal();
    render();
    if (navigator.vibrate) navigator.vibrate([15, 40, 20]);
    document.getElementById("liveShotFormBody").style.display = "none";
    document.getElementById("liveShotFooter").style.display = "none";
    document.getElementById("liveShotSuccessDetail").textContent = `ID ${finalId} · Historia FB + IG (${hora}). Te avisamos por Telegram cuando Meta confirme.`;
    document.getElementById("liveShotSuccessBox").classList.add("show");
  });
});

// ===== GALERÍA LISTENERS =====
document.getElementById("closeGalleryBtn").addEventListener("click", () => document.getElementById("galleryModal").classList.remove("open"));
document.getElementById("cropTabs").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-crop]");
  if (!btn) return;
  galleryCropMode = btn.dataset.crop;
  document.querySelectorAll("#cropTabs .mode-btn").forEach(b => b.classList.toggle("active", b === btn));
  renderGalleryModal();
});
document.getElementById("galCatTabs").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-gal-cat]");
  if (!btn) return;
  galleryCatFilter = btn.dataset.galCat;
  renderGalleryModal();
});
document.getElementById("galleryGrid").addEventListener("click", async (e) => {
  if (e.target.closest("#galUploadTileBtn")) {
    if (!syncCfg.preset) {
      showToast("Configura primero tu Upload Preset en ⚙️ Conectar", { type: "warn" });
      return;
    }
    document.getElementById("camUploadInput").click();
    return;
  }
  const btn = e.target.closest("[data-pick-url]");
  if (!btn || !galleryTarget) return;
  const pickedSafe = safeCloudinaryUrl(btn.dataset.pickUrl, FALLBACK_LOGO_URL);
  const newUrl = applyCloudinaryTransform(pickedSafe, galleryCropMode);
  document.getElementById("galleryModal").classList.remove("open");

  if (galleryTarget.type === "live") {
    liveShotPhoto = applyCloudinaryTransform(pickedSafe, "STORY");
    document.getElementById("liveShotThumb").src = liveShotPhoto;
    showToast("Foto 9:16 lista para En vivo", { type: "success" });
    return;
  }
  if (galleryTarget.type === "new") {
    newPostPhoto = newUrl;
    refreshNewPostLive();
    showToast("Foto seleccionada", { type: "success" });
    return;
  }
  if (galleryTarget.type === "edit") {
    editPhotoUrl = newUrl;
    refreshEditPreview();
    showToast("Foto actualizada en editor", { type: "success" });
    return;
  }
  if (galleryTarget.type === "sug") {
    const sug = suggestions.find(s => s.sid === galleryTarget.id);
    if (sug) { sug.foto = newUrl; saveLocal(); render(); showToast(`Foto actualizada en ${sug.sid}`, { type: "success" }); }
    return;
  }
  const post = posts.find(p => p.id === galleryTarget.id);
  if (!post) return;
  if (syncCfg.url) {
    const res = await pushToSheets({ action: "updatePost", id: post.id, foto: newUrl, version: post.version || 1 });
    if (res && res.conflict) { openConflictModal(post, res, null); return; }
    if (!res || !res.ok) { showToast("⛔ " + (res?.error || "Error al guardar foto"), { type: "error" }); return; }
    if (res.version) post.version = Number(res.version);
    if (res.editado_por) post.editado_por = res.editado_por;
  }
  post.foto = newUrl;
  saveLocal();
  render();
  showToast(`☁️ Foto actualizada (ID ${post.id})`, { type: "success" });
});

document.getElementById("camUploadInput").addEventListener("change", async (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  showToast("Subiendo foto a Cloudinary…", { type: "info" });
  try {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", syncCfg.preset);
    const res = await fetch("https://api.cloudinary.com/v1_1/sgn99usk/image/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!data.secure_url || !isAllowedMedia(data.secure_url)) {
      showToast("Error Cloudinary: " + (data.error?.message || "preset inválido"), { type: "error" });
      return;
    }
    gallery.unshift({ id: String(Date.now()), cat: "Local", desc: file.name, url: data.secure_url });
    renderGalleryModal();
    if (syncCfg.url) await pushToSheets({ action: "addMedia", nombre: file.name, url: data.secure_url, categoria: "Local" });
    showToast("📸 Foto subida a Cloudinary", { type: "success" });
  } catch {
    showToast("No se pudo subir la foto", { type: "error" });
  } finally {
    e.target.value = "";
  }
});

// ===== CONEXIÓN, DIAGNÓSTICO (v10), CONFLICTO Y FULLSCREEN =====
document.getElementById("syncPill").addEventListener("click", () => {
  document.getElementById("gasEditorSelect").value = syncCfg.editor || "Ale";
  document.getElementById("gasUrlInput").value = syncCfg.url || "";
  document.getElementById("gasPinInput").value = syncCfg.pin || "";
  document.getElementById("cldPresetInput").value = syncCfg.preset || "";
  document.getElementById("syncModal").classList.add("open");
});
document.getElementById("closeSyncBtn").addEventListener("click", () => document.getElementById("syncModal").classList.remove("open"));
document.getElementById("saveSyncBtn").addEventListener("click", async (e) => {
  await withLoading(e.currentTarget, async () => {
    syncCfg.editor = document.getElementById("gasEditorSelect").value || "Ale";
    syncCfg.url = document.getElementById("gasUrlInput").value.trim();
    syncCfg.pin = document.getElementById("gasPinInput").value.trim();
    syncCfg.preset = document.getElementById("cldPresetInput").value.trim();
    if (syncCfg.url && !sessionSynced) posts = [];
    saveLocal();
    document.getElementById("syncModal").classList.remove("open");
    render();
    if (syncCfg.url) await syncFromSheets(false);
  });
});
document.getElementById("disconnectSyncBtn").addEventListener("click", () => {
  syncCfg.url = "";
  lastSyncAt = 0;
  lastSyncOk = null;
  sessionSynced = false;
  saveLocal();
  document.getElementById("syncModal").classList.remove("open");
  render();
  showToast("Modo local activado", { type: "warn" });
});
document.getElementById("openHealthFromSyncBtn").addEventListener("click", () => {
  document.getElementById("syncModal").classList.remove("open");
  document.getElementById("healthModal").classList.add("open");
  runHealthCheck();
});

async function runHealthCheck() {
  const box = document.getElementById("healthResults");
  const row = (iconStr, title, detail) => `
    <div style="padding:10px 12px;border-radius:12px;background:#16120f;border:1px solid var(--border);">
      <div style="font-weight:800;">${escapeHtml(iconStr)} ${escapeHtml(title)}</div>
      <div style="font-size:var(--fs-xs);color:var(--muted);margin-top:2px;">${escapeHtml(detail)}</div>
    </div>`;

  box.innerHTML = row("⏳", "Comprobando v12.2…", "Verificando app.js, CSP estricta, Service Worker, alertas, banderas y Google Apps Script…");

  let swOk = true;
  try {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) await reg.update().catch(() => {});
    }
  } catch { swOk = false; }

  const appHtml = swOk
    ? row("✅", `App ${APP_VERSION} · Celular: ${syncCfg.editor || "Ale"}`, "JS externo (app.js), CSP sin unsafe-inline y caché offline v12.2.")
    : row("⚠️", `App ${APP_VERSION} (revisa caché)`, "Toca 'Recarga limpia' si notas algo desactualizado.");

  let serverHtml = "";
  let alertsHtml = "";
  let flagsHtml = "";
  let sheetHtml = "";
  if (!syncCfg.url) {
    serverHtml = row("❌", "Falta conectar Google Sheets", "Configura tu Web App URL + PIN en ⚙️.");
    alertsHtml = row("⚠️", "Alertas automáticas (sin conexión)", "Conecta Sheets para ver estado de Telegram y Correo.");
    flagsHtml = row("💤", "Crecimiento orgánico (modo local)", "Métricas Meta: OFF · Auto-respuesta comentarios: OFF");
    sheetHtml = row("⚠️", "Modo local", "Mostrando datos locales hasta conectar Sheets.");
  } else {
    const hc = await pushToSheets({ action: "healthCheck" });
    if (hc && hc.ok && Number(hc.bridgeVersion) >= 4) {
      featureFlags.insightsSyncEnabled = !!hc.insightsSyncEnabled;
      featureFlags.autoCommentsEnabled = !!hc.autoCommentsEnabled;
      serverHtml = row(
        "✅",
        `Servidor Google conectado (v${hc.bridgeVersion})`,
        `PIN POST-only ${hc.pinPostOnly ? "✅" : "⚠️"} · Meta FB/IG ${hc.metaConfigured ? "✅" : "⚠️"} · Redactor IA ${hc.geminiConfigured ? "✅" : "⚠️ falta GEMINI_API_KEY"}`
      );
      const alertIcon = (hc.telegramConfigured || hc.emailAlertsEnabled) ? "✅" : "⚠️";
      alertsHtml = row(
        alertIcon,
        `Alertas automáticas: ${hc.alertsMode || (hc.telegramConfigured ? "Telegram" : "Correo automático")}`,
        `Telegram: ${hc.telegramConfigured ? "✅ activo" : "opcional"} · Correo respaldo: ${hc.emailAlertsEnabled ? "✅ activo" : "pendiente"} · Archivado 45d listo`
      );
      flagsHtml = row(
        (hc.insightsSyncEnabled || hc.autoCommentsEnabled) ? "🌱" : "💤",
        `Métricas Meta: ${hc.insightsSyncEnabled ? "ON" : "OFF"} · Auto-respuesta comentarios: ${hc.autoCommentsEnabled ? "ON" : "OFF"}`,
        "Controlados desde ScriptProperties (ENABLE_INSIGHTS_SYNC y ENABLE_AUTO_COMMENTS)."
      );
      sheetHtml = row(
        "✅",
        "Calendario_LaParrilla conectado",
        `${hc.approvedCount || 0} aprobada(s) · ${hc.publishedCount || 0} publicada(s) · ${hc.errorCount || 0} error(es) · 💬 ${hc.totalWaClicks || 0} clics WA.`
      );
    } else {
      serverHtml = row("❌", "Error en servidor Google", (hc && hc.error) || "Revisa conexión o PIN.");
      alertsHtml = row("⚠️", "Alertas no verificadas", "Revisa la conexión con Apps Script.");
      flagsHtml = row("💤", "Banderas no verificadas", "Métricas Meta: OFF · Auto-respuesta comentarios: OFF");
      sheetHtml = row("⚠️", "No se pudo verificar Sheets", "Comprueba tu conexión a internet.");
    }
  }
  box.innerHTML = appHtml + serverHtml + alertsHtml + flagsHtml + sheetHtml;
}

document.getElementById("closeHealthBtn").addEventListener("click", () => document.getElementById("healthModal").classList.remove("open"));
document.getElementById("recheckHealthBtn").addEventListener("click", runHealthCheck);
document.getElementById("forceReloadBtn").addEventListener("click", async () => {
  try {
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    }
  } catch {}
  location.replace(location.pathname + "?v=" + Date.now());
});
document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("⚠️ ¿Restaurar datos demo locales en ESTE celular? (No borra Google Sheets).")) return;
  if (!confirm("Segunda confirmación: se perderán borradores locales no sincronizados. ¿Continuar?")) return;
  posts = syncCfg.url ? [] : JSON.parse(JSON.stringify(INITIAL_POSTS));
  suggestions = buildDefaultSuggestions();
  seenVersions = {};
  saveLocal();
  render();
  document.getElementById("healthModal").classList.remove("open");
  showToast("Datos locales restaurados", { type: "warn" });
});
document.getElementById("resetSugsBtn").addEventListener("click", async (e) => {
  if (!confirm("¿Reactivar todas las ideas en Sheets para ambos celulares?")) return;
  await withLoading(e.currentTarget, async () => {
    if (syncCfg.url) {
      const r = await pushToSheets({ action: "resetSuggestions" });
      if (r && r.ok) await syncFromSheets(true);
    } else {
      suggestions = buildDefaultSuggestions();
      saveLocal();
      render();
    }
    document.getElementById("healthModal").classList.remove("open");
    showToast("💡 Ideas reactivadas", { type: "success" });
  });
});

document.getElementById("syncNowBtn").addEventListener("click", async (e) => {
  if (!syncCfg.url) {
    document.getElementById("syncPill").click();
  } else {
    await withLoading(e.currentTarget, () => syncFromSheets(false));
  }
});

// Conflicto modal
document.getElementById("closeConflictBtn").addEventListener("click", () => document.getElementById("conflictModal").classList.remove("open"));
document.getElementById("conflictKeepRemoteBtn").addEventListener("click", () => {
  document.getElementById("conflictModal").classList.remove("open");
  showToast("📥 Versión de Sheets conservada", { type: "success" });
});
document.getElementById("conflictForceLocalBtn").addEventListener("click", () => {
  document.getElementById("conflictModal").classList.remove("open");
  if (typeof conflictPendingForce === "function") conflictPendingForce();
});

// Fullscreen modal
document.getElementById("closeFullscreenBtn").addEventListener("click", () => document.getElementById("fullscreenModal").classList.remove("open"));
document.getElementById("fullscreenModal").addEventListener("click", (e) => {
  if (e.target.id === "fullscreenModal") document.getElementById("fullscreenModal").classList.remove("open");
});

// Auto-sync al volver a la app (máx 1 vez cada 60 s)
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") maybeAutoSync();
});
window.addEventListener("focus", maybeAutoSync);
window.addEventListener("online", () => { updateSyncPillAndOffline(); maybeAutoSync(); });
window.addEventListener("offline", updateSyncPillAndOffline);
setInterval(updateSyncPillAndOffline, 30000);

if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
render();
if (syncCfg.url) syncFromSheets(true);
