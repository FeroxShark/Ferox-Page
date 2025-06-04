# Ferox Page

This repository contains a small personal page built with React. The content configuration lives in `js/app.js` and is rendered at runtime. Static assets reside under `img/` and styling is provided via Tailwind CSS.

## Setup

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd Ferox-Page
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Husky will automatically run ESLint and Prettier on staged files before each commit.

## Development

To work locally open `index.html` in a modern browser. No build step is required as the page relies on vanilla React APIs.

Run tests with:

```bash
pytest -q
```

## Deployment

Any static file host can be used. Simply serve the repository contents. For example, build a production bundle and push to GitHub Pages or similar.
