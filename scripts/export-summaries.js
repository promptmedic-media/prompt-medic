// Run from the bot project to refresh data/summaries.json with the latest summaries (needs the bot's .env with LLM_API_KEY):
//   cd /workspace/prompt-medic && DB_PATH=/tmp/export.db node ../prompt-medic-site/scripts/export-summaries.js
const path = require('path');
const bot = process.cwd();
require(path.join(bot, 'node_modules/dotenv')).config({ path: path.join(bot, '.env') });
const p = require(path.join(bot, 'src/patches'));
const out = path.join(__dirname, '..', 'data/summaries.json');
(async () => {
  const res = {};
  await Promise.all(Object.keys(p.GAMES).map(async k => {
    try { const g = p.GAMES[k]; const it = (await g.src.list())[0]; res[k] = { title: it.title, url: it.url, date: it.date, s: await p.summarize(k, it, await g.src.body(it)) }; }
    catch (e) { console.error(k, e.message); }
  }));
  require('fs').writeFileSync(out, JSON.stringify(res, null, 1)); console.log('wrote', out);
})();
