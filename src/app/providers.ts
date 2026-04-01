import { createApp } from 'vue';

import App from './App.vue';
import { setupErrorHandler } from './error-handler';
import { setupRouterGuards } from './router-guard';
import { router } from '@/router';
import { setupDayjs } from '@/plugins/dayjs';
import { setupDirectives } from '@/plugins/directives';
import { pinia } from '@/stores';
import '@/styles/index.scss';
import 'nprogress/nprogress.css';

export async function createApplication() {
  const app = createApp(App);

  app.use(pinia);
  setupDayjs(app);
  setupDirectives(app);
  setupErrorHandler(app);
  setupRouterGuards(router);
  app.use(router);

  return { app, router };
}
