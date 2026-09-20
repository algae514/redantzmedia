# RedAntz Media

Marketing and client-gallery website for **RedAntz Media** (Studios · Media · Digitals).

- **Live:** [https://redantzmedia.com](https://redantzmedia.com)
- **Repo:** [algae514/redantzmedia](https://github.com/algae514/redantzmedia)

## Docs

| Doc | Contents |
|---|---|
| [docs/OVERVIEW.md](docs/OVERVIEW.md) | What the app is, completed vs pending |
| [docs/HOSTING.md](docs/HOSTING.md) | GitHub Pages, CI/CD, GoDaddy DNS (as configured) |

## Local development

```bash
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build → build/
npm test        # CRA test runner
```

## Deploy

Pushes to `main` publish automatically via GitHub Actions to GitHub Pages. Details: [docs/HOSTING.md](docs/HOSTING.md).

## Stack

Create React App · React 19 · React Router 6 · Framer Motion · yet-another-react-lightbox
