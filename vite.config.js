import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['favicon.png'],
      manifest: {
        "name": "Web Code Playground",
        "short_name": "Playground",
        "icons": [
          {
            "src": "/pwa/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/pwa/icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ],
        "start_url": "/index.html",
        "display": "standalone",
        "theme_color": "#282c34",
        "background_color": "#282c34"
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    port: 3000,
  },
})
