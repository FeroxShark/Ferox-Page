# Ferox Page

This repository contains a small personal page built with React. The content configuration lives in `js/app.js` and is rendered at runtime. Static assets reside under `img/`. Tailwind CSS utilities are precompiled during a build step.

## Footer year

The footer displays the current year dynamically using `new Date().getFullYear()` directly in the React component. The `initializeFooterYear()` function remains as a no-op placeholder for any future footer logic.

## Building CSS

Run `npx tailwindcss-cli build css/tailwind.input.css -o css/tailwind.css --minify --content index.html js/app.js` to generate a purged Tailwind CSS file before deployment.
