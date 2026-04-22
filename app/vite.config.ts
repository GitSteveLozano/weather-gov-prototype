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
        name: 'NWS Honolulu — Weather',
        short_name: 'NWS Honolulu',
        description: 'Live weather, alerts, and preparedness for Oahu — powered by NWS official data',
        start_url: '/weather-gov-prototype/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#03091a',
        theme_color: '#060e24',
        icons: [
          { src: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
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
