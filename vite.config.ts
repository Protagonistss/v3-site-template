import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import { createProxy } from './build/vite/proxy'
import { readAppEnv } from './build/vite/env'
import { createVitePlugins } from './build/vite/plugins'

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), '')
  const appEnv = readAppEnv(viteEnv)

  return {
    base: viteEnv.VITE_APP_BASE ?? '/',
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    server: {
      port: 5173,
      proxy: createProxy(appEnv)
    },
    build: {
      target: 'es2020',
      sourcemap: mode === 'staging' ? 'hidden' : false,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (
              id.includes('node_modules/vue/') ||
              id.includes('node_modules/vue-router/') ||
              id.includes('node_modules/pinia/')
            ) {
              return 'framework'
            }

            if (
              id.includes('node_modules/naive-ui/') ||
              id.includes('node_modules/vueuc/') ||
              id.includes('node_modules/vooks/') ||
              id.includes('node_modules/vdirs/') ||
              id.includes('node_modules/treemate/')
            ) {
              return 'ui'
            }

            if (
              id.includes('node_modules/axios/') ||
              id.includes('node_modules/nprogress/')
            ) {
              return 'vendor'
            }

            return undefined
          }
        }
      }
    },
    preview: {
      port: 4173
    }
  }
})
