# Ferox Page

This repository contains a small personal page built with React. The content configuration lives in `js/app.js` and is rendered at runtime. Static assets reside under `img/` and styling is provided via Tailwind CSS.

## Getting started

Open `index.html` in a modern browser. No build step is required. React 18 is loaded from a CDN.

Use the theme toggle button in the hero section to switch between dark and light modes.

## Footer year

The footer displays the current year dynamically using `new Date().getFullYear()` directly in the React component. The `initializeFooterYear()` function remains as a no-op placeholder for any future footer logic.
