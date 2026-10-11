const ICONS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  trend: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  tag: '<path d="M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.42l8.7 8.7a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  pie: '<path d="M21 12c.55 0 1-.45.95-1A10 10 0 0 0 13 2.05c-.55-.05-1 .4-1 .95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
  box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  door: '<path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/>',
};
const ic = (n, cls = "") => `<svg class="ico ${cls}" viewBox="0 0 24 24">${ICONS[n] || ""}</svg>`;

const GROUP_IDS = ["atharva", "harris", "tanmay", "harsh"];
const SPV_FILL = "#FFFFFF", SPV_EDGE = "#D9C89A";
const S = {
  data: null, view: "market", me: "atharva", asset: null, tab: "buy",
  buy: 10, sellUnits: 5, sellPrice: null, dist: null, verify: null, flash: new Set(),
  calc: { value: 100, parts: 1000, budget: 50000 },
};

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const num = (n) => Number(n).toLocaleString("en-IN");
const inr = (p) => {
  const r = p / 100;
  const whole = Number.isInteger(r);
  return (r < 0 ? "-" : "") + "₹" + Math.abs(r).toLocaleString("en-IN", { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: whole ? 0 : 2 });
};
const inrShort = (p) => {
  const r = p / 100, a = Math.abs(r);
  if (a >= 1e7) return "₹" + +(r / 1e7).toFixed(2) + " Cr";
  if (a >= 1e5) return "₹" + +(r / 1e5).toFixed(2) + " L";
  return inr(p);
};
const fmtPct = (x) => `${x.toFixed(2)}%`;
const inv = (id) => S.data.investors.find((i) => i.id === id);
const assetById = (id) => S.data.assets.find((a) => a.id === id);
const me = () => inv(S.me);
// white initials on dark avatars, navy on the light-gold ones
const onColor = (hex) => { const n = parseInt(hex.slice(1), 16); return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) > 165 ? "#0B1F47" : "#fff"; };
const avatar = (i, cls = "") => `<span class="av ${cls}" style="background:${i.color};color:${onColor(i.color)}" title="${esc(i.name)}">${esc(i.initials)}</span>`;
const fmtTime = (ts) => new Date(ts).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const unitsOf = (a, id) => (a.holders.find((h) => h.id === id) || { units: 0 }).units;

// Hosted (Vercel) mode: the server keeps nothing between requests. It returns the raw state as `save`; we keep it
// in this browser and send it back as `state` with every call. The local server never sends `save`.
const SAVE_KEY = "fractify-save";
let SAVE = null;
try { SAVE = JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (e) { SAVE = null; }

async function api(path, body) {
  if (SAVE) body = { ...body, state: SAVE };
  const opt = body === undefined ? {} : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
  const res = await fetch(path, opt);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Something went wrong");
  if (json.save) {
    SAVE = json.save;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(SAVE)); } catch (e) { /* private mode: keep it in memory */ }
  }
  return json;
}

let artSeq = 0;
function art(kind) {
  const id = `ag${++artSeq}`;
  let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1F3A78"/><stop offset="1" stop-color="#0A1B3F"/></linearGradient></defs>
  <rect width="400" height="220" fill="url(#${id})"/><circle cx="350" cy="10" r="130" fill="none" stroke="#fff" stroke-width="34" opacity=".06"/><circle cx="30" cy="220" r="80" fill="#D4AE57" opacity=".1"/>`;
  if (kind === "office") {
    s += `<rect x="0" y="198" width="400" height="22" fill="#fff" opacity=".14"/>
    <rect x="48" y="106" width="68" height="94" rx="5" fill="#fff" opacity=".35"/>
    <rect x="170" y="16" width="5" height="22" fill="#fff"/>
    <rect x="128" y="34" width="92" height="166" rx="7" fill="#fff"/>
    <rect x="232" y="80" width="78" height="120" rx="7" fill="#F3E7C8"/>
    <rect x="322" y="128" width="44" height="72" rx="5" fill="#fff" opacity=".3"/>`;
    for (let r = 0; r < 9; r++) for (let c = 0; c < 4; c++) s += `<rect x="${140 + c * 19}" y="${48 + r * 16}" width="12" height="9" rx="2" fill="${(r * 3 + c) % 5 === 0 ? "#D4AE57" : "#C9D2E6"}"/>`;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) s += `<rect x="${244 + c * 21}" y="${94 + r * 17}" width="13" height="9" rx="2" fill="#B8892B" opacity=".75"/>`;
  } else if (kind === "villa") {
    s += `<circle cx="320" cy="58" r="24" fill="#E9C46A"/>
    <path d="M330 196 C 326 166 334 134 342 112" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M342 112 q -30 -14 -50 4 M342 112 q 28 -18 48 0 M342 112 q -10 -30 -34 -36 M342 112 q 14 -30 38 -32" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>
    <polygon points="94,112 192,54 290,112" fill="#D4AE57"/>
    <rect x="108" y="108" width="168" height="82" rx="5" fill="#fff"/>
    <rect x="126" y="126" width="38" height="26" rx="4" fill="#14295A"/>
    <rect x="222" y="126" width="38" height="26" rx="4" fill="#14295A"/>
    <rect x="179" y="140" width="28" height="50" rx="4" fill="#D4AE57"/>
    <rect x="30" y="192" width="340" height="18" rx="9" fill="#5B6B8F" opacity=".7"/>
    <path d="M50 201 q 10 -6 20 0 t 20 0 t 20 0 M210 201 q 10 -6 20 0 t 20 0 t 20 0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  } else if (kind === "solar") {
    s += `<circle cx="80" cy="58" r="24" fill="#E9C46A"/>`;
    for (let k = 0; k < 8; k++) {
      const ang = (k * Math.PI) / 4, x1 = 80 + Math.cos(ang) * 32, y1 = 58 + Math.sin(ang) * 32, x2 = 80 + Math.cos(ang) * 42, y2 = 58 + Math.sin(ang) * 42;
      s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#E9C46A" stroke-width="4" stroke-linecap="round"/>`;
    }
    const panel = (x, y) => {
      let p = `<line x1="${x + 30}" y1="${y + 44}" x2="${x + 30}" y2="${y + 58}" stroke="#F3E7C8" stroke-width="3"/><line x1="${x + 70}" y1="${y + 44}" x2="${x + 70}" y2="${y + 58}" stroke="#F3E7C8" stroke-width="3"/>`;
      p += `<polygon points="${x},${y} ${x + 82},${y} ${x + 100},${y + 44} ${x + 18},${y + 44}" fill="#fff"/>`;
      for (const f of [1 / 3, 2 / 3]) p += `<line x1="${x + 82 * f}" y1="${y}" x2="${x + 18 + 82 * f}" y2="${y + 44}" stroke="#E3CB8F" stroke-width="2"/>`;
      p += `<line x1="${x + 9}" y1="${y + 22}" x2="${x + 91}" y2="${y + 22}" stroke="#E3CB8F" stroke-width="2"/>`;
      return p;
    };
    s += panel(150, 70) + panel(262, 70) + panel(90, 140) + panel(202, 140);
    s += `<rect x="0" y="204" width="400" height="16" fill="#fff" opacity=".14"/>`;
  } else {
    s += `<line x1="200" y1="150" x2="156" y2="210" stroke="#F3E7C8" stroke-width="6" stroke-linecap="round"/>
    <line x1="200" y1="150" x2="244" y2="210" stroke="#F3E7C8" stroke-width="6" stroke-linecap="round"/>
    <line x1="200" y1="150" x2="200" y2="214" stroke="#F3E7C8" stroke-width="6" stroke-linecap="round"/>
    <rect x="114" y="30" width="172" height="126" rx="8" fill="#fff"/>
    <rect x="128" y="44" width="144" height="98" rx="4" fill="#0B1F47"/>
    <path d="M128 112 C 156 92, 178 132, 206 108 S 250 94, 272 110" stroke="#E9C46A" stroke-width="5" fill="none"/>
    <path d="M128 128 C 160 112, 182 144, 212 124 S 252 116, 272 126" stroke="#F3E7C8" stroke-width="5" fill="none"/>
    <path d="M128 96 C 152 82, 176 108, 204 92 S 248 80, 272 92" stroke="#FFFFFF" stroke-width="4" fill="none" opacity=".85"/>
    <path d="M150 54 v10 M176 60 v10 M204 52 v10 M232 58 v10 M256 52 v10" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"/>`;
  }
  return `<svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${s}</svg>`;
}

function ring(p, color = "#0B1F47") {
  const c = 2 * Math.PI * 16, d = (Math.max(p, 1) / 100) * c;
  return `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="#F3E7C8" stroke-width="6"/><circle cx="20" cy="20" r="16" fill="none" stroke="${color}" stroke-width="6" stroke-dasharray="${d.toFixed(2)} ${c.toFixed(2)}" stroke-linecap="round"/></svg>`;
}

function renderHeader() {
  const views = [["market", "grid", "Marketplace"], ["portfolio", "briefcase", "Portfolio"], ["ledger", "link", "Ledger"], ["learn", "book", "How it works"]];
  $("nav").innerHTML = views.map(([v, i, l]) => `<button class="${S.view === v ? "on" : ""}" data-action="nav" data-view="${v}">${ic(i)}<span>${l}</span></button>`).join("");
  const m = me();
  $("acting").innerHTML = `<div class="acting-label">Acting as<b>${esc(m.short)}</b></div>
    <div class="avatars">${GROUP_IDS.map((id) => { const i = inv(id); return `<button class="av ${id === S.me ? "on" : ""}" style="background:${i.color};color:${onColor(i.color)}" data-action="me" data-id="${id}" title="Act as ${esc(i.name)}">${esc(i.initials)}</button>`; }).join("")}</div>
    <div class="wallet" title="Wallet balance">${ic("wallet")}<span class="num">${inr(m.cash)}</span></div>
    <button class="icon-btn" data-action="reset" title="Reset demo data">${ic("refresh")}</button>`;
}

function pieArt() {
  const cx = 250, cy = 236, rx = 204, ry = 106, d = 56, up = 98;
  const pt = (deg, dy = 0) => { const r = (deg * Math.PI) / 180; return `${(cx + rx * Math.cos(r)).toFixed(1)},${(cy + ry * Math.sin(r) + dy).toFixed(1)}`; };
  const wedge = (s, e, dy = 0) => `M${cx},${cy + dy} L${pt(s, dy)} A${rx},${ry} 0 0 1 ${pt(e, dy)} Z`;
  const face = (deg, dy = 0) => `M${cx},${cy + dy} L${pt(deg, dy)} L${pt(deg, dy + d)} L${cx},${cy + dy + d} Z`;
  const cuts = [22.5, 67.5, 112.5, 157.5];
  let s = `<defs>
    <linearGradient id="pieTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1F3A78"/><stop offset="1" stop-color="#0B1F47"/></linearGradient>
    <linearGradient id="pieWall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0A1B3F"/><stop offset=".45" stop-color="#14295A"/><stop offset="1" stop-color="#071432"/></linearGradient>
    <linearGradient id="goldTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6E2A6"/><stop offset="1" stop-color="#D4AE57"/></linearGradient>
    <linearGradient id="goldSide" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C39A3E"/><stop offset="1" stop-color="#94701F"/></linearGradient>
    <radialGradient id="pieGlow"><stop offset="0" stop-color="#F6E2A6" stop-opacity=".95"/><stop offset="1" stop-color="#F6E2A6" stop-opacity="0"/></radialGradient>
    <filter id="pieBlur" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="16"/></filter></defs>
  <ellipse cx="${cx}" cy="${cy + d + 26}" rx="${rx - 6}" ry="${ry - 26}" fill="#0B1F47" opacity=".3" filter="url(#pieBlur)"/>
  <ellipse cx="${cx}" cy="${cy + d + 8}" rx="${rx + 34}" ry="${ry + 20}" fill="#fff"/>
  <path d="${wedge(-67.5, -22.5, d)}" fill="#F3E7C8"/>
  <ellipse cx="${cx + 70}" cy="${cy - 20}" rx="96" ry="52" fill="url(#pieGlow)"/>
  <path d="${face(-67.5)}" fill="#071432"/>
  <path d="M${pt(0)} A${rx},${ry} 0 0 1 ${pt(180)} L${pt(180, d)} A${rx},${ry} 0 0 0 ${pt(0, d)} Z" fill="url(#pieWall)"/>
  <path d="M${pt(0, d - 13)} A${rx},${ry} 0 0 1 ${pt(180, d - 13)}" fill="none" stroke="#D4AE57" stroke-width="4"/>
  ${cuts.map((c) => `<path d="M${pt(c)} L${pt(c, d)}" stroke="#D4AE57" stroke-width="1.6" opacity=".85"/>`).join("")}`;
  for (let i = 0; i < 7; i++) s += `<path d="${wedge(-22.5 + i * 45, 22.5 + i * 45)}" fill="url(#pieTop)" stroke="#D4AE57" stroke-width="1.8" stroke-linejoin="round"/>`;
  s += `<path d="M338,${cy - 14} V${cy - up + d - 8}" stroke="#B8892B" stroke-width="2.5" stroke-dasharray="3 7" stroke-linecap="round"/>
  <g class="lift"><g transform="translate(0,${-up})">
    <path d="${face(-22.5)}" fill="url(#goldSide)"/>
    <path d="${wedge(-67.5, -22.5)}" fill="url(#goldTop)" stroke="#FBF1CF" stroke-width="2" stroke-linejoin="round"/>
  </g></g>`;
  return `<svg class="pie" viewBox="0 0 500 440" aria-hidden="true">${s}</svg>`;
}

function heroVisual() {
  const villa = assetById("villa");
  const mine = unitsOf(villa, S.me);
  const f2 = mine > 0 ? `${esc(me().short)} owns<b>${fmtPct((mine * 100) / villa.total_units)} of the villa</b>` : `1 villa fraction<b>= 0.10% ownership</b>`;
  return `${pieArt()}
  <div class="float f1"><span class="dot g">${ic("coins")}</span><div>September rent<b>${inr(6000)} per fraction</b></div></div>
  <div class="float f2"><span class="dot">${ic("pie")}</span><div>${f2}</div></div>
  <div class="float f3"><span class="dot">${ic("shield")}</span><div>Ledger<b>${num(S.data.stats.blocks)} hashed records</b></div></div>`;
}

function assetCard(a) {
  const sold = (a.sold_units * 100) / a.total_units;
  const group = a.holders.filter((h) => h.kind === "person");
  const crowd = a.holders.some((h) => h.kind === "crowd");
  return `<article class="acard" data-action="open" data-id="${a.id}">
    <div class="art">${art(a.art)}<span class="glass">${num(a.total_units)} fractions</span></div>
    <div class="acard-body">
      <div class="cat">${esc(a.category)}</div>
      <h3>${esc(a.name)}</h3>
      <div class="loc">${ic("pin")}${esc(a.location)}</div>
      <div class="kv3"><div>Per fraction<b>${inr(a.unit_price)}</b></div><div>Yield<b>${a.yield_pct ? a.yield_pct.toFixed(1) + "%" : "—"}</b></div><div>Value<b>${inrShort(a.valuation)}</b></div></div>
      <div class="bar"><i style="width:${sold}%"></i></div>
      <div class="bar-lbl"><span><b>${sold.toFixed(1)}%</b> sold</span><span>${num(a.total_units - a.sold_units)} left</span></div>
      <div class="acard-foot"><div class="stack">${group.map((h) => avatar(inv(h.id), "sm")).join("")}<small>${group.length ? (crowd ? "+ others" : "") : crowd ? "Other investors" : "Be the first"}</small></div>
      <span class="link-btn">Invest ${ic("arrow")}</span></div>
    </div></article>`;
}

function cta() {
  return `<div class="wrap cta"><div class="cta-in"><div style="position:relative;z-index:1"><h2>Big assets. Small tickets. Shared returns.</h2>
    <p>Fractify is a working model of fractional ownership, built for our FinTech presentation. Every action runs through a Python backend and is recorded on a hash-linked ledger.</p></div>
    <div class="credits-wrap"><div class="credits-lbl">Presented by</div><div class="credits">${GROUP_IDS.map((id) => { const i = inv(id); return `<div class="credit">${avatar(i, "sm")}${esc(i.name)}</div>`; }).join("")}</div></div></div></div>`;
}

function viewMarket() {
  const st = S.data.stats;
  return `
  <section class="hero"><div class="wrap hero-in">
    <div>
      <span class="eyebrow">FinTech demo · Fractional ownership</span>
      <h1>Own a <em>slice</em> of assets you could never buy whole.</h1>
      <span class="rule"></span>
      <p class="lead">A ₹1 crore villa is out of reach for most people. Split it into 1,000 digital fractions of ₹10,000 and anyone can co-own it, earn their share of the rent and sell their slice whenever they want.</p>
      <div class="hero-cta"><button class="btn btn-p" data-action="scroll" data-to="assets">Explore assets ${ic("arrow")}</button><button class="btn btn-o" data-action="nav" data-view="learn">How it works</button></div>
      <div class="hero-facts"><span>${ic("coins")}From ₹5,000 a fraction</span><span>${ic("pie")}Income shared pro-rata</span><span>${ic("shield")}Tamper-evident ledger</span></div>
    </div>
    <div class="hero-vis">${heroVisual()}</div>
  </div></section>
  <section class="band"><div class="wrap band-in">
    <div class="band-title">Live numbers from this demo platform</div>
    <div class="stats">
      <div class="stat"><b>${inrShort(st.tokenized)}</b><span>Asset value tokenized</span></div>
      <div class="stat"><b>${num(st.fractions_owned)}</b><span>Fractions owned by investors</span></div>
      <div class="stat"><b>${inrShort(st.income_paid)}</b><span>Income distributed</span></div>
      <div class="stat"><b>${num(st.blocks)}</b><span>Ledger records</span></div>
    </div></div></section>
  <section class="section" id="assets" style="scroll-margin-top:76px"><div class="wrap">
    <div class="sec-head"><h2>Explore our assets</h2><p>Each asset sits in its own SPV (a company that exists only to hold it) and is split into equal fractions. Open one, buy a few fractions and watch the ownership map change.</p></div>
    <div class="grid-assets">${S.data.assets.map(assetCard).join("")}</div>
  </div></section>
  ${cta()}`;
}

function allocate(holders) {
  const order = [...holders.filter((h) => h.kind === "person"), ...holders.filter((h) => h.kind === "crowd"), ...holders.filter((h) => h.kind === "system")];
  const base = order.map((h) => ({ h, n: Math.floor(h.pct), r: h.pct - Math.floor(h.pct) }));
  const left = 100 - base.reduce((t, b) => t + b.n, 0);
  [...base].sort((x, y) => y.r - x.r).slice(0, left).forEach((b) => b.n++);
  return base.flatMap((b) => Array(b.n).fill(b.h));
}

function holderOrder(holders) {
  return [...holders.filter((h) => h.kind === "person"), ...holders.filter((h) => h.kind === "crowd"), ...holders.filter((h) => h.kind === "system")];
}

function payout(a) {
  const d = S.data.last_distribution;
  if (!d || d.asset !== a.id) return "";
  const rank = (id) => (id === "spv" ? 2 : id === "others" ? 1 : 0);
  const rows = [...d.rows].sort((x, y) => rank(x.investor) - rank(y.investor) || y.units - x.units);
  return `<div class="payout"><h4>${ic("check")}Just paid: ${esc(d.label)} of ${inr(d.amount)}</h4><p class="sub">${inr(Math.round(d.per_unit))} per fraction · each owner gets fractions × ${inr(Math.round(d.per_unit))}</p>
    <table class="tbl"><tr><th>Owner</th><th class="r">Fractions</th><th class="r">Share</th><th class="r">Paid</th></tr>
    ${rows.map((r) => { const i = inv(r.investor); const nm = r.investor === "spv" ? "SPV (unsold)" : r.investor === "others" ? "Other investors" : i.short; return `<tr><td><span class="who"><i style="${r.investor === "spv" ? `background:${SPV_FILL};box-shadow:inset 0 0 0 1.5px ${SPV_EDGE}` : `background:${i.color}`}"></i>${esc(nm)}${r.investor === S.me ? '<span class="you">YOU</span>' : ""}</span></td><td class="r num">${num(r.units)}</td><td class="r num">${fmtPct((r.units * 100) / a.total_units)}</td><td class="r num"><b>${inr(r.amount)}</b></td></tr>`; }).join("")}</table></div>`;
}

function ownership(a) {
  const cells = allocate(a.holders);
  const legendName = (h) => (h.kind === "person" ? `<b>${esc(h.short)}</b>` : h.kind === "system" ? "Unsold (held by SPV)" : esc(h.name));
  const sw = (h) => (h.kind === "system" ? `background:${SPV_FILL};box-shadow:inset 0 0 0 1.5px ${SPV_EDGE}` : `background:${h.color}`);
  return `<h3>${ic("grid")}Who owns this asset?</h3><p class="sub">Each square = 1% of the asset = ${num(a.total_units / 100)} fractions</p>
    <div class="own"><div class="cells">${cells.map((h) => `<i class="cell ${S.flash.has(h.id) ? "pop" : ""}" style="${sw(h)}" title="${esc(h.kind === "system" ? "Unsold" : h.name)}"></i>`).join("")}</div>
    <div class="legend">${holderOrder(a.holders).map((h) => `<div class="lg"><i style="${sw(h)}"></i><span>${legendName(h)}${h.id === S.me ? '<span class="you">YOU</span>' : ""}</span><small class="num">${num(h.units)} · ${fmtPct(h.pct)}</small></div>`).join("")}
    ${unitsOf(a, S.me) ? "" : `<div class="lg"><i style="background:${me().color};opacity:.25"></i><span><b>${esc(me().short)}</b><span class="you">YOU</span></span><small>0 · 0.00%</small></div>`}</div></div>${payout(a)}`;
}

function buySummary(a) {
  const u = S.buy, after = unitsOf(a, S.me) + u;
  const income = a.yield_pct ? `${inr(Math.round((a.monthly_income * after) / a.total_units))}` : "None · value growth only";
  return `<div><span>Price per fraction</span><b class="num">${inr(a.unit_price)}</b></div>
    <div class="big"><span>Total cost</span><b class="num">${inr(u * a.unit_price)}</b></div>
    <div><span>Your ownership after</span><b class="num">${fmtPct((after * 100) / a.total_units)} <span class="muted">(${num(after)} of ${num(a.total_units)})</span></b></div>
    <div><span>Expected ${esc(a.income_label.toLowerCase())} / month</span><b class="num">${income}</b></div>`;
}

function sellSummary(a) {
  const u = S.sellUnits || 0, price = (S.sellPrice ?? a.unit_price / 100) * 100;
  const prem = ((price - a.unit_price) * 100) / a.unit_price;
  return `<div class="big"><span>You receive if fully bought</span><b class="num">${inr(Math.round(u * price))}</b></div>
    <div><span>Asking price vs current value</span><b class="num">${prem >= 0 ? "+" : ""}${prem.toFixed(1)}%</b></div>`;
}

function actions(a) {
  const m = me();
  const tabs = [["buy", "plus", "Buy"], ["sell", "tag", "Sell"], ["mgr", "building", "SPV manager"]];
  let body = "";
  if (S.tab === "buy") {
    const avail = a.total_units - a.sold_units, afford = Math.floor(m.cash / a.unit_price);
    body = `<div class="as-who">${avatar(m)}<div>Buying as<br><b>${esc(m.name)}</b></div><div class="w">Wallet<b class="num">${inr(m.cash)}</b></div></div>
      <label class="field-lbl" for="buyUnits">Number of fractions</label>
      <div class="stepper"><button data-action="buy-step" data-d="-1" aria-label="Less">${ic("minus")}</button><input class="inp num" id="buyUnits" type="number" min="1" value="${S.buy}"><button data-action="buy-step" data-d="1" aria-label="More">${ic("plus")}</button>
      <div class="quick">${[1, 10, 25, 50, 100].map((q) => `<button data-action="buy-q" data-q="${q}" class="${S.buy === q ? "on" : ""}">${q}</button>`).join("")}</div></div>
      <div class="summary" id="buySummary">${buySummary(a)}</div>
      <button class="btn btn-p btn-block" data-action="buy">${ic("plus")}<span class="btn-lbl">Buy <span id="buyN">${num(S.buy)}</span> fractions</span></button>
      <p class="cells-note">${num(avail)} unsold fractions left · ${esc(m.short)} can afford up to ${num(afford)}</p>`;
  } else if (S.tab === "sell") {
    const h = m.holdings.find((x) => x.asset === a.id && x.units > 0);
    const mineOpen = a.orders.filter((o) => o.seller === S.me);
    if (!h) {
      body = `<div class="empty">${esc(m.short)} doesn't own any fractions of this asset yet.<br>Buy some first, or switch to another group member at the top.</div>
        <button class="btn btn-o btn-block" data-action="tab" data-tab="buy">Go to Buy</button>`;
    } else {
      if (S.sellUnits > h.free) S.sellUnits = Math.max(1, h.free);
      body = `<div class="as-who">${avatar(m)}<div>${esc(m.short)} owns<br><b class="num">${num(h.units)} fractions · ${fmtPct(h.pct)}</b></div><div class="w">Worth now<b class="num">${inr(h.value)}</b></div></div>
        <div class="two"><div><label class="field-lbl" for="sellUnits">Fractions to sell</label><input class="inp num" id="sellUnits" type="number" min="1" max="${h.free}" value="${S.sellUnits}"></div>
        <div><label class="field-lbl" for="sellPrice">Asking price each (₹)</label><input class="inp num" id="sellPrice" type="number" min="1" value="${S.sellPrice ?? a.unit_price / 100}"></div></div>
        <div class="summary" id="sellSummary">${sellSummary(a)}</div>
        <button class="btn btn-p btn-block" data-action="list" ${h.free ? "" : "disabled"}>${ic("tag")}List on secondary market</button>
        <p class="cells-note">${num(h.free)} fractions free to sell${h.units - h.free ? ` · ${num(h.units - h.free)} already listed` : ""}</p>
        ${mineOpen.map((o) => `<div class="order">${avatar(m, "sm")}<div>Your listing <b>${o.id}</b><br><span class="muted">${num(o.remaining)} at ${inr(o.price)}</span></div><span></span><button class="btn btn-o btn-sm" data-action="cancel" data-id="${o.id}">Cancel</button></div>`).join("")}`;
    }
  } else {
    const d = S.data.last_distribution;
    const def = S.dist ?? (Math.round(a.monthly_income / 100) || 10000);
    body = `<div class="note">${ic("info")}<span>In real life the asset manager / SPV does these, not investors. Trigger them here to see what happens to every owner at once.</span></div>
      <div class="mgr-block"><h4>Distribute ${esc(a.income_label.toLowerCase())}</h4>
        <div class="row-input"><input class="inp num" id="distAmt" type="number" min="1" value="${def}"><button class="btn btn-p" data-action="distribute">${ic("coins")}Distribute</button></div>
        <p class="cells-note">${a.yield_pct ? `Default = one month's ${esc(a.income_label.toLowerCase())} at ${a.yield_pct}% a year.` : "This asset has no regular income, so any amount here is a one-off fee."}</p></div>
      <div class="mgr-block"><h4>Revalue the asset</h4><div class="quick">${[-5, 5, 10].map((p) => `<button data-action="revalue" data-p="${p}">${p > 0 ? "+" : ""}${p}% value</button>`).join("")}</div>
        <p class="cells-note">An independent valuer updates the asset price. Every fraction's value moves by the same %.</p></div>
      ${d && d.asset === a.id ? `<div class="note" style="margin-top:6px">${ic("arrow")}<span>The payout split for this asset is shown on the left, under the ownership map.</span></div>` : ""}`;
  }
  return `<h3>${ic("wallet")}Invest in this asset</h3><p class="sub">Every action runs on the Python backend and is written to the ledger</p>
    <div class="seg">${tabs.map(([t, i, l]) => `<button class="${S.tab === t ? "on" : ""}" data-action="tab" data-tab="${t}">${ic(i)}${l}</button>`).join("")}</div>${body}`;
}

function chart(a) {
  const pts = a.history, W = 520, H = 200, L = 70, R = 18, T = 18, B = 30;
  const ys = pts.map((p) => p.price);
  let lo = Math.min(...ys), hi = Math.max(...ys);
  const pad = (hi - lo) * 0.18 || hi * 0.05;
  lo -= pad; hi += pad;
  const x = (i) => L + (pts.length === 1 ? 0 : (i * (W - L - R)) / (pts.length - 1));
  const y = (v) => T + ((hi - v) * (H - T - B)) / (hi - lo);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.price).toFixed(1)}`).join(" ");
  const area = `${line} L${x(pts.length - 1).toFixed(1)},${H - B} L${x(0).toFixed(1)},${H - B} Z`;
  const ticks = [0, 0.5, 1].map((f) => lo + f * (hi - lo));
  const lbl = (t) => new Date(t).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const step = Math.ceil(pts.length / 6);
  const change = ((ys[ys.length - 1] - ys[0]) * 100) / ys[0];
  return `<h3>${ic("trend")}Value per fraction</h3><p class="sub">${change >= 0 ? "+" : ""}${change.toFixed(1)}% since ${lbl(pts[0].t)} · moves when the asset is revalued</p>
    <svg viewBox="0 0 ${W} ${H}"><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D4AE57" stop-opacity=".45"/><stop offset="1" stop-color="#D4AE57" stop-opacity="0"/></linearGradient></defs>
    ${ticks.map((t) => `<line x1="${L}" x2="${W - R}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}" stroke="#E9E1CD"/><text x="${L - 10}" y="${(y(t) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#7C8498">${inr(Math.round(t / 1000) * 1000)}</text>`).join("")}
    <path d="${area}" fill="url(#cg)"/><path d="${line}" fill="none" stroke="#0B1F47" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    ${pts.map((p, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(p.price).toFixed(1)}" r="${i === pts.length - 1 ? 6 : 4}" fill="#fff" stroke="#B8892B" stroke-width="3"/>`).join("")}
    ${pts.map((p, i) => (i % step === 0 || i === pts.length - 1 ? `<text x="${x(i).toFixed(1)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="#7C8498">${lbl(p.t)}</text>` : "")).join("")}
    </svg>`;
}

function market(a) {
  const rows = a.orders.map((o) => {
    const s = inv(o.seller), prem = ((o.price - a.unit_price) * 100) / a.unit_price, own = o.seller === S.me;
    return `<div class="order">${avatar(s)}<div><b>${esc(s.short)}</b> is selling <b>${num(o.remaining)}</b> fractions<br><span class="muted">${o.id} · ${inr(o.price)} each</span></div>
      <span class="prem ${prem >= 0 ? "up" : "down"}">${prem >= 0 ? "+" : ""}${prem.toFixed(1)}%</span>
      ${own ? `<button class="btn btn-o btn-sm" data-action="cancel" data-id="${o.id}">Cancel</button>` : `<button class="btn btn-p btn-sm" data-action="fill" data-id="${o.id}">${esc(me().short)} buys · ${inrShort(o.remaining * o.price)}</button>`}</div>`;
  });
  return `<h3>${ic("tag")}Secondary market</h3><p class="sub">Owners selling to other investors · this is how a fractional owner exits</p>
    ${rows.length ? rows.join("") : `<div class="empty">No fractions listed for sale right now.<br>Use the Sell tab as an owner to list some.</div>`}`;
}

function renderModal() {
  const el = $("modal");
  if (!S.asset) { el.hidden = true; el.innerHTML = ""; document.body.style.overflow = ""; return; }
  const a = assetById(S.asset);
  const top = el.scrollTop;
  el.hidden = false;
  document.body.style.overflow = "hidden";
  el.innerHTML = `<div class="modal" role="dialog" aria-label="${esc(a.name)}">
    <div class="m-head">
      <div class="art">${art(a.art)}<span class="glass">Held by its own SPV</span></div>
      <div>
        <div class="cat">${esc(a.category)}</div><h2>${esc(a.name)}</h2><div class="loc">${ic("pin")}${esc(a.location)}</div>
        <p class="desc">${esc(a.description)}</p>
        <div class="tiles">
          <div class="tile"><span>Asset value</span><b>${inrShort(a.valuation)}</b></div>
          <div class="tile"><span>Split into</span><b>${num(a.total_units)} fractions</b></div>
          <div class="tile"><span>Value per fraction</span><b>${inr(a.unit_price)}</b></div>
          <div class="tile"><span>Expected yield</span><b>${a.yield_pct ? a.yield_pct + "% a year" : "Growth only"}</b></div>
        </div>
      </div>
      <button class="icon-btn m-close" data-action="close" aria-label="Close">${ic("x")}</button>
    </div>
    <div class="m-body">
      <div class="card">${ownership(a)}</div>
      <div class="card">${actions(a)}</div>
      <div class="card chart">${chart(a)}</div>
      <div class="card">${market(a)}</div>
    </div></div>`;
  el.scrollTop = top;
}

function viewPortfolio() {
  const m = me();
  const held = m.holdings.filter((h) => h.units > 0);
  const units = held.reduce((t, h) => t + h.units, 0);
  const list = GROUP_IDS.map(inv).sort((x, y) => y.net_worth - x.net_worth);
  const max = Math.max(...list.map((i) => i.net_worth));
  const rows = m.holdings.map((h) => {
    const a = assetById(h.asset);
    return `<div class="hold"><div class="thumb">${art(a.art)}</div><div><h4>${esc(a.name)}</h4><div class="loc">${ic("pin")}${esc(a.location)}</div></div>
      <div><div class="k">Fractions</div><div class="v ring">${ring(h.pct, m.color)}<span class="num">${num(h.units)}<br><span class="k">${fmtPct(h.pct)}</span></span></div></div>
      <div><div class="k">Invested</div><div class="v num">${inr(h.cost)}</div></div>
      <div><div class="k">Value now</div><div class="v num">${inr(h.value)}</div></div>
      <div><div class="k">Income received</div><div class="v num">${inr(h.income)}</div></div>
      <button class="btn btn-o btn-sm" data-action="open" data-id="${a.id}">Open</button></div>`;
  });
  return `<section class="section"><div class="wrap">
    <div class="sec-head"><h2>Investor portfolios</h2><p>Pick a group member to act as. Every number is calculated from their fractions, the latest valuation and the income they've received.</p></div>
    <div class="picker">${GROUP_IDS.map((id) => { const i = inv(id); return `<button class="pick ${id === S.me ? "on" : ""}" data-action="me" data-id="${id}">${avatar(i, "xl")}<span class="nm">${esc(i.name)}</span><span class="nw">Net worth ${inrShort(i.net_worth)}</span></button>`; }).join("")}</div>
    <div class="navy"><div class="navy-top">${avatar(m, "xl")}<div><h2>${esc(m.short)}'s portfolio</h2><p>${held.length} asset${held.length === 1 ? "" : "s"} · ${num(units)} fractions owned</p></div></div>
      <div class="pstats">
        <div class="pstat"><span>Wallet cash</span><b class="num">${inr(m.cash)}</b></div>
        <div class="pstat"><span>Invested</span><b class="num">${inr(m.invested)}</b></div>
        <div class="pstat"><span>Value of fractions</span><b class="num">${inr(m.value)}</b></div>
        <div class="pstat"><span>Income received</span><b class="num">${inr(m.income)}</b></div>
        <div class="pstat"><span>Total gain</span><b class="num ${m.gain >= 0 ? "pos" : "neg"}">${m.gain >= 0 ? "+" : "−"}${inr(Math.abs(m.gain))}</b></div>
      </div></div>
    <div class="holdings">${rows.length ? rows.join("") : `<div class="card empty">${esc(m.short)} doesn't own any fractions yet.<br><br><button class="btn btn-p" data-action="nav" data-view="market">Go to the marketplace ${ic("arrow")}</button></div>`}</div>
    <div class="board card"><h3>${ic("users")}Group leaderboard</h3><p class="sub">Net worth = wallet cash + current value of fractions</p>
      ${list.map((i) => `<div class="brow"><div class="who">${avatar(i, "sm")}<b style="color:var(--ink)">${esc(i.name)}</b>${i.id === S.me ? '<span class="you">YOU</span>' : ""}</div><div class="bar"><i style="width:${(i.net_worth * 100) / max}%;background:${i.color}"></i></div><div class="num" style="text-align:right;font-weight:800;color:var(--ink)">${inr(i.net_worth)}</div></div>`).join("")}
    </div>
  </div></section>`;
}

const BLOCK_STYLE = {
  GENESIS: ["#0B1F47", "#D4AE57", "GENESIS"], TOKENIZE: ["#F3E7C8", "#7A5A12", "TOKENIZE"], PRIMARY_BUY: ["#E4F5EC", "#0F7A54", "BUY"],
  SECONDARY_TRADE: ["#5B6B8F", "#fff", "TRADE"], LISTING: ["#EFECE3", "#3B4763", "LISTING"], CANCEL: ["#EFECE3", "#3B4763", "CANCEL"],
  INCOME: ["#D4AE57", "#0B1F47", "PAYOUT"], REVALUE: ["#0B1F47", "#fff", "REVALUE"],
};

function blockRow(b) {
  const [bg, fg, label] = BLOCK_STYLE[b.type] || ["#eee", "#333", b.type];
  const bad = S.verify && !S.verify.valid && S.verify.broken_at === b.index;
  const a = b.asset ? assetById(b.asset) : null;
  return `<div class="blk ${bad ? "bad" : ""}"><div class="bnum">#${b.index}</div>
    <div><div class="bmemo"><span class="btype" style="background:${bg};color:${fg}">${label}</span>${esc(b.memo)}</div>
    <div class="bmeta">${a ? esc(a.name) + " · " : ""}${fmtTime(b.ts)}</div>
    <div class="hash"><span>hash <b>${b.hash.slice(0, 16)}…</b></span><span>prev <b>${b.prev_hash.slice(0, 16)}…</b></span></div>
    ${bad ? `<div class="badflag">${ic("alert")}${esc(S.verify.reason)}</div>` : ""}</div>
    <div class="bamt num">${b.amount ? inrShort(b.amount) : ""}<small>${b.units ? num(b.units) + " fractions" : ""}</small></div></div>`;
}

function viewLedger() {
  const v = S.verify, tampered = S.data.tampered;
  let cls = "", icon = ic("info"), title = "Not checked yet", sub = "Click Verify chain to re-compute every hash and check the links.";
  if (v && v.valid) { cls = "ok"; icon = ic("check"); title = `Chain valid · ${num(v.checked)} records checked`; sub = v.reason; }
  else if (v) { cls = "bad"; icon = ic("alert"); title = `Tampering detected at record #${v.broken_at}`; sub = v.reason; }
  else if (tampered) { title = "A record was quietly edited"; sub = "Nothing looks different yet. Click Verify chain to catch it."; }
  return `<section class="section"><div class="wrap">
    <div class="navy" style="margin-top:0"><div class="ledger-head"><div style="position:relative;z-index:1"><span class="eyebrow on-navy">Trust layer</span>
      <h2>Tamper-evident ledger</h2>
      <p>Every buy, sale, payout and revaluation becomes a record. Each record stores the SHA-256 hash of the one before it, so editing any old record breaks the chain. Tokenized assets use the same idea on a blockchain.</p></div>
      <div class="ledger-actions"><button class="btn btn-w" data-action="verify">${ic("shield")}Verify chain</button>
      ${tampered ? `<button class="btn btn-ghost-w" data-action="restore">${ic("refresh")}Restore record</button>` : `<button class="btn btn-ghost-w" data-action="tamper">${ic("alert")}Tamper with a record</button>`}</div></div>
      <div class="status ${cls}"><span class="dot">${icon}</span><div><b>${title}</b><span>${esc(sub)}</span></div></div></div>
    <div class="chain">${[...S.data.ledger].reverse().map(blockRow).join("")}</div>
  </div></section>`;
}

function calcOut() {
  const c = S.calc, value = c.value * 1e5, price = value / c.parts, own = Math.floor(c.budget / price);
  const share = (own * 100) / c.parts, rent = ((value * 0.072) / 12) * (own / c.parts);
  const r = (x) => inr(Math.round(x) * 100);
  return `<div class="whole"><h4>Buy it whole</h4><b>${r(value)}</b><small>You need the full amount and carry all the risk alone.</small></div>
    <div class="frac"><h4>Buy fractions</h4><b>${own ? num(own) + " fractions" : "Not enough"}</b><small>${own ? `= ${fmtPct(share)} of the asset · about ${r(rent)} rent a month at 7.2%` : `One fraction costs ${r(price)}`}</small></div>`;
}

function viewLearn() {
  const steps = [
    ["Buy & value the asset", "An SPV, a company made only for this asset, buys it and gets an independent valuation."],
    ["Split into fractions", "Value ÷ number of fractions = price of one fraction. ₹1 Cr ÷ 1,000 = ₹10,000."],
    ["Investors buy slices", "Anyone buys as many fractions as they can afford. Ownership is recorded on a ledger."],
    ["Share the income", "Rent and other income are paid pro-rata. Own 5% of the fractions, get 5% of the rent."],
    ["Exit any time", "Sell your fractions to another investor on the secondary market. The asset itself stays."],
  ];
  const gloss = [
    ["box", "SPV", "Special Purpose Vehicle: a separate company that legally owns the asset. Investors own the SPV, not the bricks."],
    ["layers", "Tokenization", "Representing each fraction as a digital token on a ledger or blockchain so it can be tracked and traded."],
    ["pie", "Pro-rata", "In proportion to what you own. It decides your share of income, costs and any gain."],
    ["trend", "Valuation / NAV", "What the asset is worth today. It changes the value of every fraction together."],
    ["tag", "Secondary market", "Where owners sell fractions to other investors, which gives liquidity without selling the asset."],
    ["scale", "SM REIT", "SEBI's 2024 framework that brings India's fractional-ownership platforms under regulation."],
  ];
  const c = S.calc;
  return `<section class="section"><div class="wrap">
    <div class="sec-head"><h2>How fractional ownership works</h2><p>Five steps take one expensive asset and turn it into many small, affordable pieces.</p><span class="pill-tag">The model behind this demo</span></div>
    <div class="steps">${steps.map(([h, p], i) => `<div class="step"><div class="n">0${i + 1}</div><h4>${h}</h4><p>${p}</p></div>`).join("")}</div>
  </div></section>
  <section class="section soft"><div class="wrap">
    <div class="sec-head"><h2>Whole vs fractional</h2><p>Move the sliders to see how fractions lower the entry ticket.</p></div>
    <div class="calc"><div class="card">
      <label class="field-lbl" for="calcValue">Asset value</label><input class="range" id="calcValue" type="range" min="10" max="1000" step="10" value="${c.value}">
      <div class="rlbl"><span>₹10 L</span><b id="cv">${inrShort(c.value * 1e7)}</b><span>₹10 Cr</span></div>
      <label class="field-lbl" for="calcParts">Number of fractions</label><input class="range" id="calcParts" type="range" min="100" max="10000" step="100" value="${c.parts}">
      <div class="rlbl"><span>100</span><b id="cp">${num(c.parts)}</b><span>10,000</span></div>
      <label class="field-lbl" for="calcBudget">Your budget</label><input class="range" id="calcBudget" type="range" min="5000" max="1000000" step="5000" value="${c.budget}">
      <div class="rlbl"><span>₹5,000</span><b id="cb">${inr(c.budget * 100)}</b><span>₹10 L</span></div>
    </div>
    <div class="card"><h3>${ic("scale")}What your budget gets you</h3><p class="sub">Assumes 7.2% yearly rent, like the Goa villa</p><div class="vs" id="calcOut">${calcOut()}</div></div></div>
  </div></section>
  <section class="section dark"><div class="wrap">
    <div class="sec-head"><h2>Key terms</h2></div>
    <div class="gloss">${gloss.map(([i, h, p]) => `<div class="gl"><div class="gi">${ic(i)}</div><h4>${h}</h4><p>${p}</p></div>`).join("")}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <div class="sec-head"><h2>Fractional ownership in India today</h2><p>This demo uses ₹10,000 fractions to keep the maths simple. Regulated Indian products start higher.</p></div>
    <div class="facts">
      <div class="fact"><b>Mar 2024</b><span>SEBI notified the Small & Medium REIT (SM REIT) framework for fractional real estate</span></div>
      <div class="fact"><b>₹10 lakh</b><span>Minimum investment per investor in an SM REIT</span></div>
      <div class="fact"><b>₹50–500 Cr</b><span>Asset size allowed for one SM REIT scheme</span></div>
      <div class="fact"><b>Dec 2024</b><span>PropShare Platina, India's first SM REIT, raised ₹353 Cr for a Bengaluru office</span></div>
    </div>
    <p class="src">Sources: SEBI SM REIT framework (2024); Business Standard, Dec 2024.</p>
  </div></section>`;
}

function footer() {
  return `<div class="foot"><b>Fractify</b> a simulation for education, not a real investment platform · Introduction of Financial Technology (316Z04C301), K J Somaiya School of Engineering</div>`;
}

function render() {
  renderHeader();
  const view = { market: viewMarket, portfolio: viewPortfolio, ledger: viewLedger, learn: viewLearn }[S.view];
  $("main").innerHTML = view() + footer();
  renderModal();
}

function toast(r, err = false) {
  if (!r) return;
  const t = document.createElement("div");
  t.className = "toast" + (err ? " err" : "");
  t.innerHTML = `<div class="ti">${ic(err ? "alert" : "check")}</div><div><b>${esc(r.title)}</b><p>${esc(r.explain || "")}</p></div>`;
  $("toasts").prepend(t);
  while ($("toasts").children.length > 2) $("toasts").lastChild.remove();
  setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 300); }, err ? 5000 : 7000);
}

async function act(path, body, flash = []) {
  try {
    const r = await api(path, body);
    S.data = r.state;
    S.verify = null;
    S.flash = new Set(flash);
    render();
    toast(r.result);
    setTimeout(() => S.flash.clear(), 800);
  } catch (e) {
    toast({ title: "Not allowed", explain: e.message }, true);
  }
}

document.addEventListener("click", async (e) => {
  if (e.target.id === "modal") { S.asset = null; renderModal(); return; }
  const t = e.target.closest("[data-action]");
  if (!t) return;
  const d = t.dataset;
  switch (d.action) {
    case "nav": e.preventDefault(); S.view = d.view; S.asset = null; render(); window.scrollTo({ top: 0 }); break;
    case "scroll": $(d.to).scrollIntoView({ behavior: "smooth" }); break;
    case "me": S.me = d.id; render(); break;
    case "open": Object.assign(S, { asset: d.id, tab: "buy", buy: 10, sellUnits: 5, sellPrice: null, dist: null }); renderModal(); break;
    case "close": S.asset = null; renderModal(); break;
    case "tab": S.tab = d.tab; renderModal(); break;
    case "buy-step": S.buy = Math.max(1, S.buy + Number(d.d)); renderModal(); break;
    case "buy-q": S.buy = Number(d.q); renderModal(); break;
    case "buy": await act("/api/buy", { investor: S.me, asset: S.asset, units: S.buy }, [S.me]); break;
    case "list": await act("/api/list", { investor: S.me, asset: S.asset, units: S.sellUnits, price: S.sellPrice ?? assetById(S.asset).unit_price / 100 }); break;
    case "fill": await act("/api/fill", { investor: S.me, order: d.id }, [S.me]); break;
    case "cancel": await act("/api/cancel", { investor: S.me, order: d.id }); break;
    case "distribute": await act("/api/distribute", { asset: S.asset, amount: Number($("distAmt").value) }); break;
    case "revalue": await act("/api/revalue", { asset: S.asset, pct: Number(d.p) }); break;
    case "tamper": await act("/api/tamper", {}); break;
    case "restore": await act("/api/restore", {}); break;
    case "verify":
      try {
        const r = await api("/api/verify", {});
        S.data = r.state; S.verify = r.result; render();
        toast(r.result.valid ? { title: "Chain verified", explain: `${num(r.result.checked)} records re-hashed. Nothing has been changed.` } : { title: `Tampering found at record #${r.result.broken_at}`, explain: r.result.reason }, !r.result.valid);
        if (!r.result.valid) document.querySelector(".blk.bad")?.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (err) { toast({ title: "Could not verify", explain: err.message }, true); }
      break;
    case "reset":
      if (confirm("Reset all demo data back to the start?")) { S.asset = null; await act("/api/reset", {}); }
      break;
  }
});

document.addEventListener("input", (e) => {
  const id = e.target.id, a = S.asset && assetById(S.asset);
  if (id === "buyUnits") {
    S.buy = Math.max(1, parseInt(e.target.value, 10) || 1);
    $("buySummary").innerHTML = buySummary(a);
    $("buyN").textContent = num(S.buy);
  } else if (id === "sellUnits" || id === "sellPrice") {
    S.sellUnits = Math.max(1, parseInt($("sellUnits").value, 10) || 1);
    S.sellPrice = Math.max(1, parseFloat($("sellPrice").value) || 1);
    $("sellSummary").innerHTML = sellSummary(a);
  } else if (id === "distAmt") {
    S.dist = Number(e.target.value);
  } else if (id.startsWith("calc")) {
    S.calc = { value: Number($("calcValue").value), parts: Number($("calcParts").value), budget: Number($("calcBudget").value) };
    $("cv").textContent = inrShort(S.calc.value * 1e7);
    $("cp").textContent = num(S.calc.parts);
    $("cb").textContent = inr(S.calc.budget * 100);
    $("calcOut").innerHTML = calcOut();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && S.asset) { S.asset = null; renderModal(); }
  if (e.key === "Enter" && e.target.id === "buyUnits") document.querySelector('[data-action="buy"]')?.click();
});

(async function init() {
  try {
    S.data = await api("/api/state");
    const start = decodeURIComponent(location.hash.slice(1));
    if (["market", "portfolio", "ledger", "learn"].includes(start)) S.view = start;
    else if (assetById(start)) S.asset = start;
    render();
  } catch (e) {
    $("main").innerHTML = `<div class="wrap section"><div class="card empty"><b>Can't reach the Fractify server.</b><br>Start it with <code>python server.py</code> (or double-click run.bat) and open the address it prints.</div></div>`;
  }
})();
