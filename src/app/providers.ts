import { createApp } from 'vue';

import App from './App.vue';
import { setupErrorHandler } from './error-handler';
import { setupRouterGuards } from './router-guard';
import { router } from '@/router';
import { setupDirectives } from '@/plugins/directives';
import { setupHttpClient } from '@/shared/request/client';
import { pinia } from '@/stores';
import { useAuthStore } from '@/stores/auth';
import { useThemeStore } from '@/stores/theme';
import '@/styles/index.scss';
import 'nprogress/nprogress.css';

export async function createApplication() {
  useThemeStore(pinia).initialize();

  const app = createApp(App);

  app.use(pinia);
  setupHttpClient({
    getToken: () => useAuthStore(pinia).token,
    onUnauthorized: async () => useAuthStore(pinia).logout(router)
  });
  setupDirectives(app);
  setupErrorHandler(app);
  setupRouterGuards(router);
  app.use(router);

  return { app, router };
}
