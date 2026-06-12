import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Build timestamp shown in the footer (e.g. "JUN 2026")
const buildDate = new Date()
  .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  .toUpperCase()

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['img/favicon-16.png', 'img/favicon-32.png', 'img/apple-touch-icon.png'],
      manifest: {
        name: 'Ferox Page',
        short_name: 'Ferox',
        start_url: '.',
        display: 'standalone',
        background_color: '#050505',
        description: 'Personal page for Ferox',
        theme_color: '#050505',
        icons: [
          {
            src: 'img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'img/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'img/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,json,woff2}'],
      },
    }),
  ],
  base: '/Ferox-Page/',
  server: {
    port: 3000,
  },
})
