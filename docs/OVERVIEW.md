# RedAntz Media — Product Overview

**Live site:** [https://www.redantzmedia.com](https://www.redantzmedia.com)  
**Repo:** [github.com/algae514/redantzmedia](https://github.com/algae514/redantzmedia)  
**Stack:** Create React App (React 19) + React Router  
**Hosting:** GitHub Pages (free) — see [HOSTING.md](./HOSTING.md)  
**Last reviewed:** September 2026

---

## What this app is about

**RedAntz Media** is the marketing and delivery website for a creative agency with three specialised divisions:

| Division | Focus |
|---|---|
| **RedAntz Studios** | Wedding photography, cinematic films, pre-wedding shoots, destination weddings |
| **RedAntz Media** | Event production, celebrity / movie / audio launches, corporate experiences |
| **RedAntz Digitals** | Branding, social media, digital marketing, content & performance campaigns |

Offices are listed in **Bengaluru**, **Hyderabad**, and **Visakhapatnam**.

The product has two sides:

1. **Public marketing site** — brand homepage, division pages, portfolio browsing, contact / quotation flows.
2. **Client delivery gallery** — password-protected private galleries where couples/clients can browse, favourite, select, and (eventually) download their photos.

There is **no backend yet**. Pages and galleries run on static / mock data (`picsum.photos` placeholders, hardcoded credentials, localStorage for favourites and auth flags). Client “login” is browser-only (not server-side auth).

---

## Site map (routes)

| Route | Purpose | Status |
|---|---|---|
| `/` | Primary homepage (hero, divisions, stats, work, social, clients, CTA) | Complete (UI) |
| `/home` | Alternate homepage (`Home2`) | Complete (UI); unused in main nav |
| `/studios` | Studios division landing | Stub (SEO + heading only) |
| `/media` | Media division landing | Stub (SEO + heading only) |
| `/digitals` | Digitals division landing | Stub (SEO + heading only) |
| `/about` | About Us | Stub placeholder |
| `/contact` | Contact | Stub placeholder |
| `/wedding-quotation` | Interactive wedding quote estimator | Complete (client-side estimate only) |
| `/portfolio` | Public portfolio grid with category filters | Complete (mock data) |
| `/portfolio/:slug` | Individual public gallery (masonry + lightbox) | Complete (mock data; slug not wired to unique data) |
| `/client` / `/client/:galleryId` | Private client gallery (login → browse) | Complete (demo auth + mock photos) |

---

## What is completed

### Hosting & delivery
- Public repo under `algae514/redantzmedia`
- GitHub Pages + Actions CI/CD on every push to `main`
- Custom domain `www.redantzmedia.com` (apex DNS pointed at GitHub Pages A records)
- SPA `404.html` fallback for client-side routes
- Docs: [HOSTING.md](./HOSTING.md)

### Marketing homepage (`/`)
- Full-screen hero slider for Studios / Media / Digitals (Ken Burns, autoplay, dots)
- Three division cards with service lists and “Learn More” links
- Animated stats (years, projects, clients, professionals)
- Featured work grid with category tabs
- YouTube wedding-film strip
- Instagram “Social Buzz” carousel (real IG links + local thumbnails)
- Client / brand logo carousel
- Bottom CTA + footer with offices, phone, email, socials
- Page loader, scroll-reveal animations, WhatsApp CTA
- SEO via `react-helmet-async` + structured data on division pages

### Shared chrome
- Responsive header (desktop + mobile), services dropdown, dark-on-hero behaviour
- Footer with three city addresses and social links
- SEO component and shared SEO copy for home / studios / media / digitals / about / contact

### Public portfolio
- `/portfolio` list with filter chips (Weddings, Pre-Wedding, Engagements, Events, Portraits)
- Nine sample projects with cover, location, date, photo count
- `/portfolio/:slug` gallery: hero, category nav, masonry grid, skeleton loading, lightbox (zoom / thumbnails / fullscreen / counter), empty states, CTA, back-to-top

### Client gallery (private delivery UX)
- Login screen with branded card, show/hide password, demo credentials UI
- Auth gate persisted in `localStorage` per gallery id (**not** server-side)
- Category filters, search, favourites-only view
- Favourites persisted in `localStorage`
- Multi-select + selection bar (favourite selected / download selected — download is stubbed)
- Masonry grid with blur-up placeholders
- Lightbox with zoom, thumbnails, fullscreen, counter, download plugin
- Logout, skeleton loading, empty states, back-to-top

### Wedding quotation tool
- Form for couple name, event type, guest count, service categories, premium toggle
- Live estimated total (client-side formula)

### Gallery component library
Reusable pieces under `src/components/gallery/`:
`GalleryHero`, `MasonryGrid`, `CategoryNav`, `ClientHeader`, `SelectionBar`, `SkeletonGrid`, `EmptyState`, `GalleryCTA`, `BackToTop`

---

## What is pending

### Content & page builds (high priority)
- **About Us** — replace placeholder (“This page explains your app purpose.”) with real story, team, vision
- **Contact** — real form (name, email, service interest, message), map/office details, success/error states; currently a one-line stub
- **Studios / Media / Digitals** landings — full marketing pages (services, process, work samples, CTAs); today only title + SEO/schema
- Replace **placeholder / stock images** (`picsum.photos`) across home portfolio tiles, portfolio covers, and gallery photos with real RedAntz assets / CDN URLs
- Wire nav **Work / Clients / Blog** anchors (and Services submenu items that only deep-link home sections) to real pages or remove until ready
- Privacy Policy & Terms of Use footer links (currently undeveloped destinations)

### Backend & data (blocking production galleries)
- API for portfolio projects and public galleries (list + per-slug photo sets)
- API for client galleries (metadata, categories, photo URLs, expiry)
- Real authentication for `/client` (replace hardcoded `client@redantz.com` / `gallery@2025`)
- Photo download pipeline (selected + download-all currently show `alert(...)` stubs)
- Admin / CMS workflow to create galleries and issue client credentials
- CDN / storage for full-res images and thumbs (blur-up already designed for this)

### Product features still incomplete
- Portfolio `:slug` does not load gallery-specific data — all slugs share one mock set (`GALLERY_META` / `PHOTOS`)
- Client `galleryId` param is accepted but data is still a single hardcoded `CLIENT_META` / `CLIENT_PHOTOS`
- Wedding quotation does not submit leads (no email/CRM integration)
- Contact / enquiry capture and lead routing
- Blog (linked in nav, no route/content)
- Real phone number verification (site shows `+91 88787878787` — looks like a placeholder)

### Engineering / polish
- Choose one homepage (`/` vs `/home`) and remove or clearly deprecate the other
- Remove demo credentials UI from client login before production
- Tests beyond the CRA smoke test
- Production env config, error boundaries, 404 page
- Accessibility / performance pass on large galleries (lazy load is partial; real CDN sizing needed)
- Confirm apex `https://redantzmedia.com` HTTPS cert / GitHub DNS check fully green (www already live)

---

## Suggested near-term priorities

1. Build **About** and **Contact** (forms + lead capture).
2. Flesh out **Studios / Media / Digitals** landings.
3. Swap mock images for real assets on homepage and portfolio.
4. Introduce a thin backend (or headless CMS) for portfolio + client galleries, then real auth and downloads.
5. Clean nav: blog / work / clients either ship or hide until ready.

---

## Tech stack (current)

- React 19, React Router 6, Create React App (`react-scripts` 5)
- Framer Motion, react-intersection-observer
- react-photo-album, yet-another-react-lightbox
- react-helmet-async (SEO)
- Static assets under `public/images/`
- Hosting: GitHub Pages + GitHub Actions (see [HOSTING.md](./HOSTING.md))
