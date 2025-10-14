import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon/logo.png', 'icons.png'],
      manifest: {
        name: 'Beyond The Brush Lite',
        short_name: 'btblite',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          { src: '/icons.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
