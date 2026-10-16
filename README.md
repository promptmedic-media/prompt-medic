# Prompt Medic landing page

A static site for GitHub Pages. No frameworks.

- **Config:** `site.config.json` → `baseUrl` (currently the placeholder `https://USERNAME.github.io/prompt-medic`). You can also pass the `BASE_URL` env var.
- **Build:** run `node scripts/build.js`. It regenerates index.html, patches/*.html, sitemap.xml, robots.txt and llms.txt.
- **OG image:** `python3 scripts/make-og.py` (needs Pillow).
- **Refresh patch data:** `cd ../prompt-medic && DB_PATH=/tmp/export.db node ../prompt-medic-site/scripts/export-summaries.js`, then build.
