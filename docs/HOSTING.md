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
    → www.redantzmedia.com  (CNAME → algae514.github.io) → Pages (primary; working HTTPS)
    → redantzmedia.com      Use GoDaddy HTTPS forward → https://www.redantzmedia.com
```

**Why apex is not the GitHub custom domain:** GitHub was slow/stuck issuing an apex certificate (`dns_changed`). With apex as primary, `www` redirected to apex and both showed `NET::ERR_CERT_COMMON_NAME_INVALID`. Keeping **www** as the Pages custom domain restores a working site. Apex HTTPS must use **GoDaddy domain forwarding** (GoDaddy terminates TLS and redirects), not a bare GitHub A-record visit, until/unless GitHub later issues an apex cert.

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
| `CNAME` | `www` | `algae514.github.io` | Primary site (GitHub Pages) |
| `A` | `@` | *(see apex note below)* | Prefer GoDaddy **Forwarding**; A→GitHub alone breaks HTTPS until a cert exists |

Repo file [`public/CNAME`](../public/CNAME) contains: `www.redantzmedia.com`  
[`package.json`](../package.json) `"homepage"`: `https://www.redantzmedia.com`

### Apex (`redantzmedia.com`) — required for HTTPS without cert errors

Browsers need a valid cert **before** any redirect. Pointing apex `A` records at GitHub without a GitHub cert for `redantzmedia.com` causes **NET::ERR_CERT_COMMON_NAME_INVALID**.

**Recommended (GoDaddy Forwarding):**

1. GoDaddy → domain → **Forwarding**
2. Forward `redantzmedia.com` → `https://www.redantzmedia.com`
3. Type: permanent (301), **masking off**, enable HTTPS if offered
4. GoDaddy may replace the four GitHub `A` records on `@` when forwarding is enabled — that is expected

Do **not** rely on visiting `https://redantzmedia.com` via GitHub A records until Pages shows a certificate that lists `redantzmedia.com`.

### Why not apex as the GitHub custom domain?

Setting Pages custom domain to `redantzmedia.com` made `www` redirect to apex. While the new cert stayed in `dns_changed`, **both** URLs failed. www-as-primary + GoDaddy apex forward avoids that.

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
- **Enforce HTTPS:** On (for www)
- Use **https://www.redantzmedia.com** as the public URL
- Apex: configure **GoDaddy Forwarding** → www (see above)

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
