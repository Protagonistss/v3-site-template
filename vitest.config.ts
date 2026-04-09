import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'
import { createVitePlugins } from './build/vite/plugins'

export default defineConfig({
  plugins: createVitePlugins(),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/unit/**/*.spec.ts']
  }
})
