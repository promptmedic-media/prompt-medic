// Vibe Code Roast Leaderboard + Roast Card generator
const fs = require('fs'), path = require('path');
module.exports = ({ B, shell, esc, write, invite }) => {
  const d = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/leaderboard.json'), 'utf8'));
  const rows = [...d.results].sort((a, b) => b.score - a.score);
  const date = d.date.slice(0, 10);
  const li = a => a.length ? `<ul>${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '<p>Nothing major found.</p>';
  const cards = rows.map((r, n) => `<div class="card" id="${esc(r.label.replace('/', '-'))}"><h2>#${n + 1} <a href="${esc(r.url)}" rel="noopener">${esc(r.label)}</a>: ${r.score}/10</h2><p><em>${esc(r.verdict)}</em></p><h3>🔒 Security</h3>${li(r.security)}<h3>🐛 Bugs</h3>${li(r.bugs)}<h3>⚡ Quick wins</h3>${li(r.quickWins)}<p><small>Reviewed ${r.files.length} files.</small></p></div>`).join('');
  const table = `<table><tr><th>#</th><th>Template</th><th>Score</th></tr>${rows.map((r, n) => `<tr><td>${n + 1}</td><td><a href="#${esc(r.label.replace('/', '-'))}">${esc(r.label)}</a></td><td>${r.score}/10</td></tr>`).join('')}</table>`;
  const title = 'Vibe Code Roast Leaderboard: Popular AI & Next.js Starter Templates Scored';
  const desc = 'Prompt Medic’s Repo Roast reviewed popular open-source starters (Vercel AI Chatbot, Next.js Subscription Payments, Bolt.new, Taxonomy, create-t3-app) for security issues, bugs and quick wins.';
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: title, itemListElement: rows.map((r, n) => ({ '@type': 'ListItem', position: n + 1, name: `${r.label} (${r.score}/10)`, url: r.url })) };
  write('roast/leaderboard.html', shell(title, desc, `${B}/roast/leaderboard.html`, `<p class="bc"><a href="../">Home</a> › Roast Leaderboard</p><h1>Vibe Code Roast Leaderboard</h1>
<p>We ran Prompt Medic’s <b>/roast</b> on popular open-source starter templates that people build AI apps on. These are well-made projects from teams we respect. The point is to show what an automated review catches, and which quick wins are worth copying into your own fork. Roasted ${date} on the default branch, sampling up to 15 key files per repo.</p>
<p><b>Caveat:</b> this is an automated AI review of a sample of files, not a security audit. Findings can be wrong or already fixed. Maintainers who spot a mistake can reach us on X <a href="https://x.com/PromptMedicAI">@PromptMedicAI</a> and we’ll correct it.</p>
${table}${cards}
<div class="card"><h2>Roast your own repo</h2><p>Add Prompt Medic to Discord and run <code>/roast repo:https://github.com/you/your-app</code>. You get 1 free roast a day. Then <a href="card.html">make a shareable roast card</a>.</p><p><a class="btn btn-p" href="${invite}" rel="noopener">Add to Discord, free</a></p></div>`, ld));
  write('roast/card.html', shell('Roast Card Generator: Share Your Repo Roast Score', 'Make a shareable image card of your Repo Roast score and post it to X.', `${B}/roast/card.html`, `<p class="bc"><a href="../">Home</a> › Roast Card</p><h1>Roast Card Generator</h1>
<p>Got a <b>/roast</b> score in Discord? Turn it into an image and flex it (or own it). Everything runs in your browser and nothing is uploaded.</p>
<div class="card"><p><label>Repo <input id="r" value="you/your-app" style="width:100%"></label></p><p><label>Score (0-10) <input id="s" type="number" min="0" max="10" value="7"></label></p><p><label>Verdict <input id="v" value="Ships fast, leaks faster." style="width:100%"></label></p><p><label>Top fix <input id="w" value="Move secrets out of NEXT_PUBLIC_ vars" style="width:100%"></label></p>
<p><button class="btn btn-p" id="dl">Download PNG</button> <a class="btn btn-g" id="tw" target="_blank" rel="noopener">Share on X</a></p></div>
<canvas id="c" width="1200" height="630" style="width:100%;max-width:720px;border-radius:12px"></canvas>
<p>No score yet? <a href="${invite}" rel="noopener">Add Prompt Medic</a> and run <code>/roast</code>. Or see the <a href="leaderboard.html">leaderboard</a>.</p>
<script>
const $=id=>document.getElementById(id),c=$('c'),x=c.getContext('2d');
function wrap(t,X,Y,W,L){let line='';for(const w of t.split(' ')){if(x.measureText(line+w).width>W){x.fillText(line,X,Y);line='';Y+=L}line+=w+' '}x.fillText(line,X,Y)}
function draw(){const s=Math.max(0,Math.min(10,+$('s').value||0)),col=s>=8?'#57f287':s>=5?'#fee75c':'#ed4245';
x.fillStyle='#0b0f14';x.fillRect(0,0,1200,630);x.fillStyle=col;x.fillRect(0,0,16,630);
x.fillStyle='#9aa4b2';x.font='32px system-ui';x.fillText('🔥 REPO ROAST',70,90);
x.fillStyle='#fff';x.font='bold 54px system-ui';x.fillText($('r').value.slice(0,40),70,170);
x.fillStyle=col;x.font='bold 170px system-ui';x.fillText(s+'/10',70,370);
x.fillStyle='#e6e6e6';x.font='italic 36px system-ui';wrap('“'+$('v').value.slice(0,120)+'”',560,250,580,46);
x.fillStyle='#00e5a0';x.font='30px system-ui';wrap('⚡ '+$('w').value.slice(0,90),70,470,1060,40);
x.fillStyle='#9aa4b2';x.font='26px system-ui';x.fillText('🩺 Prompt Medic · /roast in Discord · promptmedic-media.github.io/prompt-medic',70,590);
$('tw').href='https://x.com/intent/post?text='+encodeURIComponent('My repo got roasted: '+s+'/10 🔥\\n"'+$('v').value+'"\\n\\nRoast yours free with @PromptMedicAI:')+'&url='+encodeURIComponent('${B}/roast/card.html')}
['r','s','v','w'].forEach(i=>$(i).oninput=draw);const q=new URLSearchParams(location.search);['r','s','v','w'].forEach(i=>{if(q.get(i))$(i).value=q.get(i)});draw();
$('dl').onclick=()=>{const a=document.createElement('a');a.download='roast-card.png';a.href=c.toDataURL('image/png');a.click()};
</script>`, null));
  return { urls: [`${B}/roast/leaderboard.html`, `${B}/roast/card.html`], llms: `\n## Repo Roast\n- [Vibe Code Roast Leaderboard](${B}/roast/leaderboard.html): ${desc}\n- [Roast Card Generator](${B}/roast/card.html): turn a /roast score into a shareable image.\n` };
};
