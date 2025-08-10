# Onion Labs Website

Static site for Onion Labs, ready for GitHub Pages with custom domain.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo (e.g., `onionlabsorg/website`).
2. In GitHub → Settings → Pages:
   - Source: Deploy from a branch
   - Branch: `main` (or `gh-pages`), folder: `/ (root)`
3. In Settings → Pages → Custom domain, set `onionlabs.org` and enforce HTTPS.
4. Point DNS `onionlabs.org` and `www.onionlabs.org` to GitHub Pages:
   - A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME for `www`: `onionlabs.github.io` (or your org/user Pages domain)

This repo includes:
- `CNAME` for onionlabs.org
- `.nojekyll` to serve files as-is
- `404.html` custom not-found page
- `robots.txt` and `sitemap.xml`

## Local preview
Open `index.html` in a browser, or use a static server.
