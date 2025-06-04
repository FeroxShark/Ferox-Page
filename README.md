# Ferox Page

This repository contains a small personal page built with React. The content configuration lives in `js/app.js` and is rendered at runtime. Static assets reside under `img/` and styling is provided via Tailwind CSS.

## Running locally

Install dependencies and start the Express server which serves the site with security headers enabled:

```bash
npm install
npm start
```

## Footer year

The footer displays the current year dynamically using `new Date().getFullYear()` directly in the React component. The `initializeFooterYear()` function remains as a no-op placeholder for any future footer logic.
