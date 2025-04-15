import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@stripe/react-stripe-js': '/node_modules/@stripe/react-stripe-js/dist/react-stripe.js',
      '@stripe/stripe-js': '/node_modules/@stripe/stripe-js/dist/stripe.js',
    },
  },
})
