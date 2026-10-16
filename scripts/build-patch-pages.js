// Generates patches/<game>.html + patches/index.html from data/summaries.json (the bot's latest summaries).
// Refresh data/summaries.json with scripts/export-summaries.js (runs in the bot project), then rerun this.
const fs = require('fs'); const path = require('path');
const { ROOT, cfg, esc, GAMES, write } = require('./lib');
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/summaries.json'), 'utf8'));
const li = a => (a && a.length ? `<ul>${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '<p class="meta">None in this patch.</p>');
const shell = ({ title, desc, canon, body, jsonld }) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${canon}">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${canon}"><meta property="og:image" content="${cfg.baseUrl}/assets/og.png">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${cfg.baseUrl}/assets/og.png">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🩺</text></svg>">
<link rel="stylesheet" href="../assets/style.css">${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>` : ''}</head>
<body><header class="nav"><div class="wrap"><a class="logo" href="../">🩺 Prompt<span>Medic</span></a><nav><a href="../#features">Features</a><a href="../#pricing">Pricing</a><a href="./">Patch notes</a></nav><a class="btn btn-p btn-s" href="${cfg.discordInvite}" rel="noopener">Join Discord</a></div></header>
<main class="patch"><section><div class="wrap">${body}</div></section></main>
<footer><div class="wrap"><span>© 2026 Prompt Medic · AI-generated summaries of official patch notes. Always check the official source. Not affiliated with the game publishers.</span><span class="games">${Object.values(GAMES).map(g => `<a href="${g.slug}.html">${g.name}</a>`).join(' · ')}</span></div></footer></body></html>`;

const pages = [];
for (const [key, g] of Object.entries(GAMES)) {
  const d = data[key]; if (!d || !d.s) { console.warn('no summary for', key); continue; }
  const s = d.s; const date = (d.date || '').slice(0, 10);
  const canon = `${cfg.baseUrl}/patches/${g.slug}.html`;
  const title = `${g.name} Patch Notes Summary: ${d.title.replace(/^.*?:\s*/, '') || d.title} (${date}) | Prompt Medic`;
  const desc = `${g.name} latest patch, summarized: ${s.top_changes.slice(0, 3).join('; ')}. Buffs, nerfs, and meta impact.`.slice(0, 300);
  const body = `<p class="bc"><a href="../">Home</a> › <a href="./">Patch notes</a> › ${esc(g.name)}</p>
<h1>${esc(g.name)} patch notes: ${esc(s.headline)}</h1>
<p class="meta">Source: <a href="${esc(d.url)}" rel="noopener nofollow">${esc(d.title)}</a> · Published ${esc(date)} · Summarized by the Prompt Medic Discord bot</p>
<div class="card"><h2>TL;DR: top changes</h2>${li(s.top_changes)}</div>
<div class="grid g2" style="margin-top:18px"><div class="card"><h2>⬆️ Buffs</h2>${li(s.buffs)}</div><div class="card"><h2>⬇️ Nerfs</h2>${li(s.nerfs)}</div></div>
<div class="card" style="margin-top:18px"><h2>Meta impact</h2><p>${esc(s.meta_impact)}</p></div>
<div class="card" style="margin-top:18px"><h2>Breakdown</h2><ul>${s.breakdown.map(b => `<li><b>${esc(b.name)}</b>: ${esc(b.change)}</li>`).join('')}</ul></div>
<div class="card" style="margin-top:18px;text-align:center"><h2>Get ${esc(g.name)} patch notes in Discord</h2><p class="meta">New ${esc(g.name)} patches are summarized in #patch-notes as soon as they drop. Premium adds full breakdowns and DMs when your mains change.</p><div class="cta"><a class="btn btn-p" href="${cfg.discordInvite}" rel="noopener">Join Discord</a><a class="btn btn-g" href="${cfg.kofiUrl}" rel="noopener">Premium $5/mo</a></div></div>`;
  const jsonld = { '@context': 'https://schema.org', '@type': 'Article', headline: `${g.name} patch notes: ${s.headline}`.slice(0, 110), description: desc, datePublished: d.date, dateModified: new Date().toISOString(),
    mainEntityOfPage: canon, image: `${cfg.baseUrl}/assets/og.png`, about: { '@type': 'VideoGame', name: g.name, publisher: g.dev }, author: { '@type': 'Organization', name: 'Prompt Medic' }, isBasedOn: d.url };
  write(`patches/${g.slug}.html`, shell({ title, desc, canon, body, jsonld }));
  pages.push({ g, d, s, date, canon });
}
write('patches/index.html', shell({ title: 'Latest Game Patch Notes Summaries: Valorant, LoL, Apex, Marvel Rivals, Fortnite | Prompt Medic',
  desc: 'Short AI summaries of the latest official patch notes for Valorant, League of Legends, Apex Legends, Marvel Rivals and Fortnite.', canon: `${cfg.baseUrl}/patches/`,
  body: `<p class="bc"><a href="../">Home</a> › Patch notes</p><h1>Latest patch notes, summarized</h1><p class="meta">Updated ${new Date().toISOString().slice(0, 10)} from official sources.</p><div class="grid g2">${pages.map(p => `<a class="card" style="text-decoration:none;color:inherit" href="${p.g.slug}.html"><h2>${esc(p.g.name)}</h2><p class="meta">${esc(p.date)} · ${esc(p.d.title)}</p><p>${esc(p.s.headline)}</p></a>`).join('')}</div>` }));
module.exports = { pages };
