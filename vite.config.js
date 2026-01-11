import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request starting with /api will be sent to wger.de
      '/api': {
        target: 'https://wger.de',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})