# Hosting — GitHub Pages

**Site:** https://www.redantzmedia.com  
**Repo:** https://github.com/algae514/redantzmedia  
**Deploy:** every push to `main` via GitHub Actions (`.github/workflows/deploy-pages.yml`)

## How deploys work

1. Push (or merge) to `main`
2. Action runs `npm ci` → `npm run build`
3. Copies `build/index.html` → `build/404.html` so React Router paths work on refresh
4. Publishes the `build/` folder to GitHub Pages

Manual re-run: **Actions → Deploy GitHub Pages → Run workflow**

## Custom domain

- Primary: `www.redantzmedia.com` (`public/CNAME`)
- Apex `redantzmedia.com` should **forward** to `https://www.redantzmedia.com` (configured in GoDaddy)

### GoDaddy DNS checklist

1. Open GoDaddy → **My Products** → Domains → **redantzmedia.com** → **DNS** / **Manage DNS**.
2. **WWW record**
   - Type: `CNAME`
   - Name: `www`
   - Value: `algae514.github.io`
   - TTL: 1 hour (or default)
   - Remove any old `www` A/CNAME that pointed at the previous host.
3. **Apex forward**
   - Use **Domain Forwarding** / **Forwarding**:
     - Forward `redantzmedia.com` → `https://www.redantzmedia.com`
     - Prefer permanent (301) if offered
     - Forward with path masking **off** (redirect, don’t mask)
   - If GoDaddy requires removing apex A records for forwarding to work, remove conflicting apex A records that pointed at the old host (do not leave both an old A and forwarding fighting each other).
4. In GitHub: **Settings → Pages → Custom domain** = `www.redantzmedia.com`  
   Wait until DNS check is green, then enable **Enforce HTTPS**.
5. Wait 5–60 minutes for DNS/propagation, then verify:
   - https://www.redantzmedia.com
   - https://redantzmedia.com (should land on www)

## Local build check

```bash
npm ci
npm run build
```

## Future (not hosted here yet)

Real client auth, gallery APIs, and large photo storage need a backend (e.g. AWS Lambda + S3). GitHub Pages only serves the static SPA.
