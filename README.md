# Ferox Page

Personal page for **Ferox** (Juan Martin Granero) — a brutalist/HUD-styled
single-page site built with **React 18**, **Vite** and **Tailwind CSS**, shipped
as an installable PWA.

The whole page is data-driven: edit [`src/data/config.json`](src/data/config.json)
to change the hero, hardware specs, favorites, manifesto, gallery and footer —
no component changes needed. Static assets (images, icons, self-hosted fonts)
live under [`public/`](public/).

## Getting started

```bash
npm install
npm run dev      # start the Vite dev server at http://localhost:3000/Ferox-Page/
```

## Scripts

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Vite dev server with HMR                       |
| `npm run build`   | Production build into `dist/`                  |
| `npm run preview` | Serve the production build locally             |
| `npm run lint`    | ESLint (flat config) over `src/`               |
| `npm run test`    | Vitest — validates `config.json` and its assets |
| `npm run format`  | Prettier across the repo                        |

## Structure

```
src/
  App.jsx              # layout + lightbox/modal state
  components/          # Hero, Setup, Gallery, Favorites, Manifesto, Footer, ...
  data/config.json     # all page content
  index.css            # Tailwind layers + brutalist component styles
public/
  img/                 # profile, gallery (webp), favicons, PWA icons
  icons/               # social SVGs (CSS-masked)
  fonts/               # self-hosted Anton / Share Tech Mono / Space Grotesk
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
site and publishes `dist/` to GitHub Pages. The `base` path in
[`vite.config.js`](vite.config.js) is set to `/Ferox-Page/` to match the Pages
URL; change it if you deploy elsewhere.
