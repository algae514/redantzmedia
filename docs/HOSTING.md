# Hosting — GitHub Pages

**Primary site:** https://redantzmedia.com (www redirects here)  
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
    → redantzmedia.com      (A → GitHub IPs) → Pages (primary custom domain)
    → www.redantzmedia.com  (CNAME → algae514.github.io) → Pages (GitHub redirects to apex)
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
| `CNAME` | `www` | `algae514.github.io` | www → GitHub (redirects to apex) |
| `A` | `@` | `185.199.108.153` | Apex → GitHub Pages (primary) |
| `A` | `@` | `185.199.109.153` | Apex → GitHub Pages |
| `A` | `@` | `185.199.110.153` | Apex → GitHub Pages |
| `A` | `@` | `185.199.111.153` | Apex → GitHub Pages |

Repo file [`public/CNAME`](../public/CNAME) contains: `redantzmedia.com`  
[`package.json`](../package.json) `"homepage"`: `https://redantzmedia.com`

### Why not `www` as the GitHub custom domain?

If Pages custom domain is only `www.redantzmedia.com`, GitHub’s TLS cert often covers **www only**. Then `https://redantzmedia.com` shows **NET::ERR_CERT_COMMON_NAME_INVALID** (browser gets `*.github.io` cert). Setting the custom domain to the **apex** (`redantzmedia.com`) makes GitHub issue a cert for the apex (and usually www → apex redirect).

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
- **Custom domain:** `redantzmedia.com` (apex)
- **Enforce HTTPS:** On (may need to wait until the new certificate is **approved** for the apex)
- After changing the custom domain, wait up to ~1 hour for a new cert. Click **Check again** if DNS still shows red. Until the cert lists `redantzmedia.com`, apex HTTPS can show `NET::ERR_CERT_COMMON_NAME_INVALID`.

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
