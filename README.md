# Ferox Page

This repository contains a small personal page built with React and bundled with [Vite](https://vitejs.dev/). The runtime configuration lives in `data/config.json` and is loaded dynamically by the app in `src/App.jsx`. Static assets reside under `img/` and styling is provided via Tailwind CSS.

The site is a minimal PWA thanks to `manifest.json` and a small service worker (`sw.js`) that caches key assets for offline usage.

## Getting started

Clone the repo and install the development dependencies:

```bash
git clone <repo-url>
cd Ferox-Page
npm install
```

During development run the Vite dev server:

```bash
npm run dev
```

For a production build execute:

```bash
npm run build
```

### Project structure

```
src/         # React components and entry point
data/        # Runtime configuration
img/         # Static images
css/         # Stylesheets
```

Update values in `data/config.json` to customize texts, links and gallery images.

Use the contrast toggle button in the hero section to enable a high contrast color scheme.

### Development tasks

- **Lint:** `npm run lint`
- **Format:** `npm run format`
- **Tests:** `pytest -q`

### Deployment

Any static hosting service will work. Upload the contents of this directory to your preferred provider (GitHub Pages, Netlify, etc.).

## Running locally

Install dependencies and start the Express server which serves the site with security headers enabled:

```bash
npm install
npm start
```

## Footer year

The footer displays the current year dynamically using `new Date().getFullYear()` directly in the React component. The `initializeFooterYear()` function remains as a no-op placeholder for any future footer logic.

## Building CSS

Run `npm run build:css` to generate a purged Tailwind CSS file before deployment.
