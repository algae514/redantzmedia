# Hosting — GitHub Pages

**Primary site:** https://www.redantzmedia.com  
**Repo:** https://github.com/algae514/redantzmedia  
**DNS registrar:** GoDaddy (`redantzmedia.com`)  
**Deploy:** every push to `main` → GitHub Actions → Pages  
**Workflow:** [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)  
**Last updated:** September 2026

---

## Architecture

```text
Push to main
    → GitHub Actions (npm ci → npm run build → copy 404.html)
    → GitHub Pages

Browser
    → www.redantzmedia.com  (CNAME → algae514.github.io) → Pages
    → redantzmedia.com      (A → GitHub IPs) → Pages (redirects to www when cert/DNS settled)
```

Cost: **$0** for hosting (public repo). Domain renewal is paid to GoDaddy separately.

---

## How deploys work

1. Push (or merge) to `main` on `algae514/redantzmedia`
2. Workflow runs `npm ci` → `npm run build`
3. Copies `build/index.html` → `build/404.html` so React Router paths work on refresh
4. Uploads `build/` and deploys to the `github-pages` environment

Manual re-run: **Actions → Deploy GitHub Pages → Run workflow**

Local check:

```bash
npm ci
npm run build
```

---

## Custom domain (current production DNS)

Configured in GoDaddy. **Do not change email-related records.**

### Website records (as configured)

| Type | Name | Value | Purpose |
|---|---|---|---|
| `CNAME` | `www` | `algae514.github.io` | Primary site |
| `A` | `@` | `185.199.108.153` | Apex → GitHub Pages |
| `A` | `@` | `185.199.109.153` | Apex → GitHub Pages |
| `A` | `@` | `185.199.110.153` | Apex → GitHub Pages |
| `A` | `@` | `185.199.111.153` | Apex → GitHub Pages |

Repo file [`public/CNAME`](../public/CNAME) contains: `www.redantzmedia.com`  
[`package.json`](../package.json) `"homepage"`: `https://www.redantzmedia.com`

### Leave alone (email / GoDaddy)

| Type | Name | Notes |
|---|---|---|
| `MX` | `@` | `smtp.secureserver.net` / `mailstore1.secureserver.net` |
| `TXT` | `@` | SPF (`secureserver.net`) |
| `TXT` | `_dmarc` | DMARC |
| `CNAME` | `email` | GoDaddy email |
| `CNAME` | `secureserver1._domainkey` / `secureserver2._domainkey` | DKIM |
| `SRV` | `_autodiscover._tcp` | Autodiscover |
| `NS` | `@` | `ns47` / `ns48.domaincontrol.com` |
| `CNAME` | `_domainconnect` | GoDaddy helper |

### GitHub Pages settings

- **Source:** GitHub Actions
- **Custom domain:** `www.redantzmedia.com`
- **Enforce HTTPS:** On
- If DNS check shows red but dig/live site is correct, click **Check again** and wait (propagation / checker lag). Apex HTTPS may lag until GitHub issues a cert that includes the apex.

### Migration note (historical)

Previously the site was on **Vercel** (`www` → `cname.vercel-dns.com`, apex `A` → `76.76.21.21`). Those records were replaced with the GitHub values above. Other domains / other GitHub Pages sites were not affected.

---

## What not to do

- Do **not** put a hostname in an **A** record Value (A records need IPs only)
- Do **not** delete MX / SPF / DKIM / DMARC when editing website DNS
- Do **not** add a second conflicting `www` CNAME
- Apex redirect via GoDaddy **Forwarding** was considered but **not** used; apex uses GitHub **A** records instead

---

## Remotes

| Remote | URL | Role |
|---|---|---|
| `origin` | `https://github.com/algae514/redantzmedia.git` | Active (push here) |
| `upstream` | `https://github.com/sreenusreenivas/redantz.git` | Original fork source (optional) |

---

## Future hosting (when backend is needed)

GitHub Pages only serves the static SPA. For real client auth, gallery APIs, and large photo storage, add pay-per-use AWS (API Gateway + Lambda + DynamoDB + S3) later. Until then, keep hosting on Pages.
