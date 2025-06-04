# Ferox Page

This repository contains a small personal page built with React. The content configuration lives in `js/app.js` and is rendered at runtime. Static assets reside under `img/` and styling is provided via Tailwind CSS.

## Getting started

Clone the repo and install the development dependencies:

```bash
git clone <repo-url>
cd Ferox-Page
npm install
```

The page is entirely static, so you can open `index.html` directly in your browser or serve the folder using a simple HTTP server:

```bash
npx http-server .
```

Use the theme toggle button in the hero section to switch between dark and light modes.

### Development tasks

- **Lint:** `npm run lint`
- **Format:** `npm run format`
- **Tests:** `pytest -q`

### Deployment

Any static hosting service will work. Upload the contents of this directory to your preferred provider (GitHub Pages, Netlify, etc.).

## Footer year

The footer displays the current year dynamically using `new Date().getFullYear()` directly in the React component. The `initializeFooterYear()` function remains as a no-op placeholder for any future footer logic.
