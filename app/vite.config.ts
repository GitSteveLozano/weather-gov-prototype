import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/weather-gov-prototype/',
  plugins: [
    react(),
  ],
  build: {
    minify: false,
    chunkSizeWarningLimit: 1200,
  },
})
