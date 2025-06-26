import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'nanostores-vendor': ['nanostores', '@nanostores/react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
}) 