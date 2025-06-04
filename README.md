# Ferox Page

This repository contains a small personal page built with React. The content configuration lives in `js/app.js` and is rendered at runtime. Static assets reside under `img/` and styling is provided via Tailwind CSS.

## Footer year

The footer displays the current year dynamically. Historically this value was set in a function called `loadDynamicContent()` which populated various elements. The call to `initializeFooterYear()` remains in the codebase as a placeholder in case additional logic is needed in the future. At runtime the year is already injected through `loadDynamicContent()` so the placeholder call performs no work.
