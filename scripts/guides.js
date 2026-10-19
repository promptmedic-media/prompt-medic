// Evergreen guide pages. Each entry: slug, title, desc, body (HTML), faq [[q,a]].
const D = 'https://discord.gg/bWZcuZx4AF';
const cta = `<div class="card" style="margin:2rem 0"><h2>Let the bot do it</h2><p>Paste your prompt into <code>/fix</code> in the free Prompt Medic Discord and get a diagnosis plus a rewrite in seconds. 3 free fixes a day.</p><p><a class="btn btn-p" href="${D}" rel="noopener">Join the Discord</a></p></div>`;
module.exports = [
{ slug: 'why-is-chatgpt-ignoring-my-prompt', title: 'Why Is ChatGPT (or Cursor, Claude, Grok) Ignoring My Prompt? 7 Causes and Fixes',
  desc: 'The 7 most common reasons an AI ignores parts of your prompt, with a fix for each: buried instructions, conflicting rules, vague goals, overloaded tasks and more.',
  faq: [['Why does ChatGPT ignore some of my instructions?', 'Usually because the instruction is buried in a long prompt, conflicts with another instruction, is phrased vaguely, or is one of too many tasks in one request. Put the most important rule first, remove conflicts, and split big asks into steps.'],
        ['Does yelling in ALL CAPS help?', 'Rarely. A specific, testable instruction ("respond in under 100 words") works far better than emphasis ("BE CONCISE!!!").'],
        ['Why does the AI forget instructions later in a chat?', 'Long conversations push early instructions out of focus. Restate key constraints, or start a fresh chat with a consolidated prompt.']],
  body: `<p>You wrote clear instructions. The AI did something else. This is almost never random: it is nearly always one of these seven causes.</p>
<h2>1. The key instruction is buried</h2><p>Models weight the start and end of a prompt most. A rule hidden in paragraph four of a wall of context gets skimmed. <strong>Fix:</strong> put the task and hard constraints first, context after.</p>
<h2>2. Two instructions conflict</h2><p>"Be thorough" plus "keep it short" forces the model to pick one. <strong>Fix:</strong> resolve it yourself: "Max 150 words; cover only the top 3 issues."</p>
<h2>3. The goal is not checkable</h2><p>"Make it better" or "clean this up" has no finish line, so the model invents one. <strong>Fix:</strong> define done: "Done = all functions have type hints and no function exceeds 40 lines."</p>
<h2>4. Too many tasks in one prompt</h2><p>Refactor, add tests, update docs, and fix the bug, all at once, means something gets dropped. <strong>Fix:</strong> one task per prompt, or a numbered list with "do step 1 only, then stop."</p>
<h2>5. Negative instructions only</h2><p>"Don't use jargon" tells the model what to avoid, not what to do. <strong>Fix:</strong> pair it with a positive: "Write for a 12-year-old; use everyday words."</p>
<h2>6. No example of the output</h2><p>If format matters, show it. One short example beats three sentences describing a format.</p>
<h2>7. The chat is too long</h2><p>In long sessions, especially in Cursor or ChatGPT, early instructions fade. <strong>Fix:</strong> start a new chat with a single consolidated prompt, or restate the rules.</p>
<h2>Before and after</h2><p><strong>Before:</strong> <code>write a blog post about our app, make it engaging, not too long, SEO friendly, mention features</code></p><p><strong>After:</strong> <code>Write a 600-word blog post announcing [App] to indie developers. Goal: get signups. Structure: hook, problem, 3 features (A, B, C) with one sentence each, CTA. Include the phrase "free invoice tool" in the title and first paragraph. Tone: casual, no buzzwords.</code></p>${cta}` },
{ slug: 'prompt-debugging-checklist', title: 'The Prompt Debugging Checklist: 10 Checks Before You Rewrite Anything',
  desc: 'A practical 10-point checklist for debugging AI prompts that are not working, for ChatGPT, Claude, Cursor, Lovable, Bolt, v0 and agents.',
  faq: [['What is prompt debugging?', 'Systematically finding why a prompt produces the wrong output (missing context, vague goal, conflicting rules, wrong format) and fixing that specific cause instead of rewriting blindly.'],
        ['How do I test if a prompt fix worked?', 'Run the old and new prompt on the same input 2-3 times and compare against a written definition of done.']],
  body: `<p>When a prompt fails, most people rewrite the whole thing and hope. Debug it instead. Run through these checks in order.</p>
<ol>
<li><strong>Is the task in the first sentence?</strong> If the model has to read 200 words to learn what you want, move it up.</li>
<li><strong>Is "done" defined?</strong> Write one sentence that a stranger could use to grade the output.</li>
<li><strong>Is there one task, not five?</strong> Split compound requests.</li>
<li><strong>Did you give the context it can't guess?</strong> Stack, versions, audience, file names, what already exists.</li>
<li><strong>Are there conflicting instructions?</strong> Short vs. thorough, creative vs. exact. Pick one.</li>
<li><strong>Is the output format specified?</strong> JSON schema, bullet count, word limit, code-only.</li>
<li><strong>Is there an example?</strong> One input/output pair fixes most format problems.</li>
<li><strong>Are boundaries set?</strong> For coding tools: which files it may touch, and "don't change anything else."</li>
<li><strong>Did you say what went wrong last time?</strong> "Last attempt rewrote my CSS; only change the JS" is gold.</li>
<li><strong>Is the chat too long?</strong> Start fresh with the consolidated prompt.</li>
</ol>
<h2>Copy-paste template</h2><pre><code>Task: [one sentence]
Context: [stack / audience / what exists]
Constraints: [limits, files allowed, things to avoid]
Output format: [exact shape]
Done when: [testable condition]
Example: [optional input -> output]</code></pre>${cta}` },
{ slug: 'prompt-fix-examples', title: 'Free Prompt Fix Examples: 8 Broken Prompts, Diagnosed and Rewritten',
  desc: 'A gallery of real-world style broken AI prompts for coding, writing and image tools, with the diagnosis and a rewritten prompt you can steal.',
  faq: [['Can I use these prompts?', 'Yes. Copy and adapt any of the rewritten prompts. Swap in your own stack, audience and constraints.']],
  body: `<p>Each example shows a prompt that underperforms, why, and a rewrite. These are illustrative examples in the style of Prompt Medic <code>/fix</code> output.</p>
${[
['Vibe coding: vague feature','make the dashboard look better and add dark mode','"Better" is uncheckable, so the model redesigns everything.','Add a dark mode toggle to the dashboard header (React + Tailwind). Use dark: classes, persist in localStorage. Only change colors, not layout. Done = every card and chart switches without reload. Only edit /components/dashboard and tailwind.config.js.'],
['Bug fix with no evidence','my login is broken fix it','No error, no file, no expected behavior.','Login fails with "401 invalid token" after a successful POST /auth/login. Relevant files: auth.ts, middleware.ts. Expected: redirect to /home with a session cookie. Find the root cause, explain it in 2 sentences, then give the minimal diff.'],
['Lovable/Bolt app spec','build me an app like airbnb','Huge scope, no MVP boundary.','Build an MVP listing page for short-term rentals: grid of 12 mock listings (photo, title, price/night, rating), a city search filter, and a detail page. No auth, no payments yet. Use Supabase for listings table with the fields above.'],
['Summaries that ramble','summarize this article','No length, audience or purpose.','Summarize this article in 5 bullets for a busy product manager. Each bullet under 20 words. End with one line: "Why it matters:".'],
['Email that sounds robotic','write an email asking for a refund','No facts, no tone.','Write a polite but firm 120-word email to Acme support requesting a refund for order #4821 (charged twice on Oct 3). Ask for confirmation within 5 business days. No apologies, no exclamation marks.'],
['Code review that is useless','review my code','No focus, so you get generic advice.','Review this Express route for security issues only: injection, auth bypass, secrets in code. List each issue with line number, severity (high/med/low), and a one-line fix. Skip style comments.'],
['Image prompt mush','cool gaming logo','No subject, style, or constraints.','Flat vector logo for a gaming Discord called "Night Shift": a crescent moon wearing a headset, purple and teal, thick outlines, readable at 64px, no text, transparent background.'],
['Agent that loops','research competitors and make a report','No stopping rule or sources.','Find 5 direct competitors to [product] using their official sites. For each: pricing, main feature, target user, one weakness. Output a markdown table. Stop after 5; do not browse more than 10 pages.'],
].map(([t,b,d,a])=>`<div class="card" style="margin:1rem 0"><h2>${t}</h2><p><strong>Before:</strong> <code>${b}</code></p><p><strong>Diagnosis:</strong> ${d}</p><p><strong>After:</strong> <code>${a}</code></p></div>`).join('\n')}${cta}` },
{ slug: 'best-discord-bot-for-patch-notes', title: 'Best Discord Bot for Game Patch Notes (Valorant, LoL, Apex, Marvel Rivals, Fortnite)',
  desc: 'Want patch notes posted to your Discord automatically? How patch-note bots work, what to look for, and how Prompt Medic posts short summaries for 5 games.',
  faq: [['Is there a Discord bot that posts patch notes?', 'Yes. Prompt Medic auto-posts short summaries of official patch notes for Valorant, League of Legends, Apex Legends, Marvel Rivals and Fortnite to a #patch-notes channel, and /patch fetches the latest on demand.'],
        ['Is it free?', 'Public summaries and /patch are free. Premium ($5/month) adds full breakdowns and /mybuild DMs when a patch touches your mains.']],
  body: `<p>Official patch notes are long. Most players want three things: what got buffed, what got nerfed, and whether their main is affected.</p>
<h2>What to look for in a patch-notes bot</h2><ul><li><strong>Official sources</strong> with a link back, so you can verify.</li><li><strong>Short summaries</strong>, not a raw copy-paste of 4,000 words.</li><li><strong>Auto-posting</strong> to a channel when a new patch drops.</li><li><strong>Per-character alerts</strong> so you only get pinged when it matters.</li></ul>
<h2>How Prompt Medic does it</h2><p>Prompt Medic checks official sources every 30 minutes and posts a TL;DR to <code>#patch-notes</code>: headline changes, buffs, nerfs, and a meta take. Run <code>/patch game:valorant</code> anytime. Premium members can set <code>/mybuild</code> to get a DM when a patch touches their agents, champions, legends, heroes or weapons.</p>
<p>See current examples: <a href="../patches/">latest patch summaries</a>.</p>
<div class="card" style="margin:2rem 0"><h2>Get patch TL;DRs in Discord</h2><p>Join free and follow #patch-notes.</p><p><a class="btn btn-p" href="${D}" rel="noopener">Join the Discord</a></p></div>` },
{ slug: 'cursor-prompting-tips', title: 'Vibe Coding Prompts That Work: 9 Tips for Cursor, Lovable, Bolt and v0',
  desc: 'Practical prompting tips for AI coding tools: scope files, define done, ask for a plan first, paste errors verbatim, and stop the AI from rewriting working code.',
  faq: [['How do I stop Cursor from changing files I did not ask about?', 'Name the files it may edit and add "do not modify any other files." Ask for a plan first and approve it before edits.'],
        ['Should I paste the full error?', 'Yes. Paste the exact error and stack trace verbatim; paraphrasing removes the clues the model needs.']],
  body: `<ol>
<li><strong>Ask for a plan first.</strong> "List the changes you will make, then wait." Approve, then let it code.</li>
<li><strong>Fence the files.</strong> "Only edit src/api/users.ts."</li>
<li><strong>Paste errors verbatim.</strong> Full stack trace, not "it crashes."</li>
<li><strong>Define done as a test.</strong> "Done = npm test passes and /users returns 200."</li>
<li><strong>One feature per chat.</strong> Fresh context beats a 90-message thread.</li>
<li><strong>Say what already works.</strong> "Auth works; don't touch it."</li>
<li><strong>Name versions.</strong> Next.js 15 app router vs pages router changes everything.</li>
<li><strong>Ask for the minimal diff.</strong> Prevents surprise rewrites.</li>
<li><strong>Get a security pass before shipping.</strong> Ask specifically about secrets, auth and input validation, or run <code>/roast</code> on your repo.</li>
</ol>${cta}` },
{ slug: 'vibe-coding-security-checklist', title: 'Vibe Coding Security Checklist: 12 Checks Before You Ship an AI-Built App',
  desc: 'A practical security checklist for apps built with Cursor, Lovable, Bolt, v0 or Claude: leaked keys, missing auth checks, open database rules, unvalidated input and more.',
  faq: [['Is AI-generated code secure?', 'Not by default. AI coding tools optimize for "it works," so they often skip authorization checks, hardcode secrets, or leave database rules open. Review those areas yourself or ask the AI for a dedicated security pass before you ship.'],
        ['How do I check my vibe-coded app for security issues?', 'Search the repo for API keys, confirm every server route checks who the user is and whether they own the data, lock down database rules, validate input on the server, and run a dependency audit. A quick AI review such as Prompt Medic /roast can flag the obvious problems, but verify each finding.'],
        ['Can I ask Cursor or Claude to do a security review?', 'Yes. Ask for a review only, not edits: "List security issues in these files, ranked by severity, with the line and a one-line fix. Do not change any code." Then fix them one at a time.']],
  body: `<p>AI tools make it easy to ship an app in a weekend. They also make it easy to ship your API keys to the whole internet. Run through these 12 checks before you share the link.</p>
<h2>Secrets</h2><ol>
<li><strong>No keys in the frontend.</strong> Anything in client code (React, Next.js client components, Vite <code>VITE_</code> vars) is public. Move paid API calls behind a server route.</li>
<li><strong>No keys in git history.</strong> Search the repo for <code>sk-</code>, <code>api_key</code>, <code>secret</code> and <code>.env</code>. If a key was ever committed, rotate it; deleting the file is not enough.</li>
<li><strong><code>.env</code> is in <code>.gitignore</code>.</strong> Check before your first push, not after.</li>
</ol>
<h2>Auth and data access</h2><ol start="4">
<li><strong>Every server route checks the user.</strong> Not just "is someone logged in" but "does this user own this record."</li>
<li><strong>Database rules are not wide open.</strong> Supabase row-level security on, Firebase rules not set to <code>allow read, write: if true</code>.</li>
<li><strong>Admin pages are protected on the server.</strong> Hiding a button in the UI is not access control.</li>
<li><strong>IDs in URLs are not trusted.</strong> Changing <code>/invoice/41</code> to <code>/invoice/42</code> should not show someone else's invoice.</li>
</ol>
<h2>Input and output</h2><ol start="8">
<li><strong>Validate input on the server.</strong> Client-side validation is a UX feature, not a security one.</li>
<li><strong>No raw SQL built from strings.</strong> Use parameterized queries or your ORM.</li>
<li><strong>No unsanitized HTML.</strong> Search for <code>dangerouslySetInnerHTML</code> and <code>innerHTML</code>.</li>
</ol>
<h2>Shipping</h2><ol start="11">
<li><strong>Rate-limit anything that costs money.</strong> An AI endpoint with no limit is an open tab on your card.</li>
<li><strong>Audit dependencies.</strong> Run <code>npm audit</code> (or your package manager's equivalent) and check that every package the AI added actually exists and is the one you meant.</li>
</ol>
<h2>A prompt for an AI security pass</h2><p>Paste this into Cursor, Claude or ChatGPT with your server files attached:</p>
<pre><code>Review these files for security issues only. Do not edit code.
Check: exposed secrets, missing auth or ownership checks, open database rules,
unvalidated input, SQL or HTML injection, and unmetered paid API calls.
Output: a list ranked by severity, each with file, line, why it matters,
and a one-line fix. If you are unsure, say so instead of guessing.</code></pre>
<div class="card" style="margin:2rem 0"><h2>Get a quick roast first</h2><p>Run <code>/roast</code> with a public GitHub URL in the free Prompt Medic Discord. It reads your README, file tree and key files and returns a score out of 10, the top security issues, bugs and quick wins. AI reviews can miss things or be wrong, so treat it as a first pass, not a pentest. 1 free roast a day.</p><p><a class="btn btn-p" href="${D}" rel="noopener">Join the Discord</a></p></div>` },
];
