import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['img/favicon-16.png', 'img/favicon-32.png', 'img/profile.jpg'],
      manifest: {
        name: 'Ferox Page',
        short_name: 'Ferox',
        start_url: '.',
        display: 'standalone',
        background_color: '#000000',
        description: 'Personal page for Ferox',
        theme_color: '#000000',
        icons: [
          {
            src: 'img/profile.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,json}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024 // 10MB to match bg1.jpg size
      }
    })
  ],
  base: '/Ferox-Page/',
  server: {
    port: 3000,
  },
})
