const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
cfg.baseUrl = (process.env.BASE_URL || cfg.baseUrl).replace(/\/+$/, '');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const GAMES = {
  valorant: { name: 'Valorant', slug: 'valorant', dev: 'Riot Games' },
  lol: { name: 'League of Legends', slug: 'league-of-legends', dev: 'Riot Games' },
  apex: { name: 'Apex Legends', slug: 'apex-legends', dev: 'Respawn / EA' },
  rivals: { name: 'Marvel Rivals', slug: 'marvel-rivals', dev: 'NetEase Games' },
  fortnite: { name: 'Fortnite', slug: 'fortnite', dev: 'Epic Games' },
};
const write = (rel, s) => { const p = path.join(ROOT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); console.log('wrote', rel); };
module.exports = { ROOT, cfg, esc, GAMES, write };
