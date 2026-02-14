import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/marketstack': {
        target: 'https://api.marketstack.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/marketstack/, ''),
      },
    },
  },
})
