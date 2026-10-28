// Ship-Safe Kit landing page + Repo Roast GitHub Action page
module.exports = ({ B, shell, write, cfg }) => {
  const kitUrl = cfg.kitUrl || cfg.newsletterUrl || 'https://davids-newsletter-d2600e.beehiiv.com/subscribe';
  const kitCta = cfg.kitUrl ? 'Get the kit ($9)' : 'Get early access (free newsletter)';
  write('kit/index.html', shell('The Vibe Coder Ship-Safe Kit: 25 Security Checks + 30 Fix Prompts', 'A checklist and prompt pack for apps built with Cursor, Claude Code, Lovable, Bolt and v0: leaked keys, IDOR, Supabase RLS, Stripe webhooks, AI spend caps.', `${B}/kit/`,
`<p class="bc"><a href="../">Home</a> › Ship-Safe Kit</p><h1>The Vibe Coder Ship-Safe Kit</h1>
<p class="lead">25 security checks and 30 copy-paste fix prompts for apps built with Cursor, Claude Code, Lovable, Bolt and v0. Each prompt is scoped so your AI fixes the hole without rewriting your app, and each ends with a <code>Done =</code> line.</p>
<p><a class="btn btn-p" href="${kitUrl}" rel="noopener">${kitCta}</a> <a class="btn btn-g" href="../guides/vibe-coding-security-checklist.html">Read the free checklist</a></p>
<div class="grid g2"><div class="card"><h2>What's inside (6-page PDF)</h2><ul><li>25-point Ship-Safe checklist: secrets, auth/IDOR, Supabase RLS, Firebase rules, input validation, Stripe webhooks, AI spend caps, ops</li><li>30 fix and review prompts, grouped by problem</li><li>A pre-merge "roast" prompt and a 5-minute threat-model prompt</li></ul></div>
<div class="card"><h2>Free sample prompt: IDOR hunt</h2><pre>List every API route or server action that takes an id from the request. For each one, say whether it checks that the record belongs to the logged-in user. Then fix only the ones that don't, by adding an ownership check against [SESSION USER FIELD].
Done = every id-based route checks ownership, and the diff touches only those routes.</pre></div></div>
<div class="card"><h2>Automate it for free</h2><p>Add the <a href="../github-action/">Repo Roast GitHub Action</a> to score every pull request, or run <code>/roast</code> in Discord.</p></div>`, { '@context': 'https://schema.org', '@type': 'Product', name: 'The Vibe Coder Ship-Safe Kit', description: '25 security checks + 30 fix prompts for AI-built apps', brand: 'Prompt Medic' }));
  write('github-action/index.html', shell('Repo Roast GitHub Action: Free AI PR Review for Vibe Coders', 'A free, open-source GitHub Action that scores every pull request 0-10 and flags leaked secrets, IDOR, missing RLS, bugs and quick wins. Bring your own OpenAI-compatible key.', `${B}/github-action/`,
`<p class="bc"><a href="../">Home</a> › GitHub Action</p><h1>Repo Roast GitHub Action</h1>
<p class="lead">This free, open-source action gives every pull request a 0-10 score plus the security holes AI-written code tends to ship: secrets in <code>NEXT_PUBLIC_</code> vars, missing ownership checks, Supabase tables with RLS off, and injection. It works with any OpenAI-compatible key (OpenAI, OpenRouter, Groq, local).</p>
<p><a class="btn btn-p" href="https://github.com/promptmedic-media/repo-roast-action" rel="noopener">View on GitHub</a> <a class="btn btn-g" href="https://github.com/promptmedic-media/repo-roast-action/pull/1" rel="noopener">See a live demo PR</a></p>
<div class="card"><h2>2-minute setup</h2><p>Add a repo secret named <code>ROAST_API_KEY</code>, then create <code>.github/workflows/repo-roast.yml</code>:</p><pre>name: Repo Roast
on: pull_request
permissions:
  contents: read
  pull-requests: write
jobs:
  roast:
    runs-on: ubuntu-latest
    steps:
      - uses: promptmedic-media/repo-roast-action@v1
        with:
          api-key: \${{ secrets.ROAST_API_KEY }}</pre></div>
<div class="card"><h2>What the demo PR got</h2><p><b>🔴 1/10</b>: "This vibe-coded API is a masterclass in how to leak your entire database." It flagged a service_role key in a NEXT_PUBLIC_ var, an IDOR on /api/orders/:id, an unauthenticated admin delete route, and RLS being bypassed.</p></div>`,
  { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Repo Roast GitHub Action', applicationCategory: 'DeveloperApplication', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url: 'https://github.com/promptmedic-media/repo-roast-action' }));
  return { urls: [`${B}/github-action/`, `${B}/kit/`], llms: `\n## Free tools & products\n- [Repo Roast GitHub Action](${B}/github-action/): free open-source GitHub Action for AI PR review (score 0-10, leaked secrets, IDOR, RLS). uses: promptmedic-media/repo-roast-action@v1\n- [Vibe Coder Ship-Safe Kit](${B}/kit/): 25 security checks + 30 fix prompts for AI-built apps.\n` };
};
