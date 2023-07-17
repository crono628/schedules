/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/schedules/',
  // above is for github pages
  // keeping this here for future reference
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true
  }
})
