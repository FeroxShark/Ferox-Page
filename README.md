# Ferox Page

This repository contains a small personal page built with React. The runtime configuration now lives in `data/config.json` and is loaded dynamically by the app in `js/app.js`. Static assets reside under `img/` and styling is provided via Tailwind CSS.

The site is a minimal PWA thanks to `manifest.json` and a small service worker (`sw.js`) that caches key assets for offline usage.

## Footer year

The footer displays the current year dynamically using `new Date().getFullYear()` directly in the React component. The `initializeFooterYear()` function remains as a no-op placeholder for any future footer logic.
