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
          manualChunks(id) {
            if (id.includes('node_modules/vue/') || id.includes('node_modules/vue-router/') || id.includes('node_modules/pinia/')) {
              return 'framework';
            }

            if (
              id.includes('node_modules/naive-ui/') ||
              id.includes('node_modules/vueuc/') ||
              id.includes('node_modules/vooks/') ||
              id.includes('node_modules/vdirs/') ||
              id.includes('node_modules/treemate/') ||
              id.includes('node_modules/seemly/') ||
              id.includes('node_modules/evtd/') ||
              id.includes('node_modules/css-render/') ||
              id.includes('node_modules/@css-render/')
            ) {
              return 'ui';
            }

            if (id.includes('node_modules/axios/') || id.includes('node_modules/nprogress/')) {
              return 'vendor';
            }
          }
        }
      }
    },
    preview: {
      port: 4173
    }
  };
});
