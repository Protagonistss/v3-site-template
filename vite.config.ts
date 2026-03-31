import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';

import { createProxy } from './build/vite/proxy';
import { readAppEnv } from './build/vite/env';
import { createVitePlugins } from './build/vite/plugins';

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), '');
  const appEnv = readAppEnv(viteEnv);

  return {
    plugins: createVitePlugins(),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 5173,
      proxy: createProxy(appEnv)
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            framework: ['vue', 'vue-router', 'pinia'],
            vendor: ['axios', 'dayjs', 'nprogress']
          }
        }
      }
    },
    preview: {
      port: 4173
    }
  };
});
