import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/weather-gov-prototype/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Skybureau — Weather, redesigned',
        short_name: 'Skybureau',
        description: 'A modern public-service forecast. Official NWS data, designed for how you live.',
        start_url: '/weather-gov-prototype/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#f6f2ea',
        theme_color: '#f6f2ea',
        icons: [
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.weather\.gov\/.*/,
            handler: 'NetworkFirst',
            options: { cacheName: 'nws-api', expiration: { maxAgeSeconds: 300 } },
          },
          {
            urlPattern: /^https:\/\/.*open-meteo\.com\/.*/,
            handler: 'NetworkFirst',
            options: { cacheName: 'meteo-api', expiration: { maxAgeSeconds: 300 } },
          },
          {
            urlPattern: /^https:\/\/waterservices\.usgs\.gov\/.*/,
            handler: 'NetworkFirst',
            options: { cacheName: 'usgs-api', expiration: { maxAgeSeconds: 300 } },
          },
          {
            urlPattern: /^https:\/\/.*basemaps\.cartocdn\.com\/.*/,
            handler: 'CacheFirst',
            options: { cacheName: 'map-tiles', expiration: { maxEntries: 500, maxAgeSeconds: 86400 } },
          },
        ],
      },
    }),
  ],
})
