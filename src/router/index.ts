import { createRouter, createWebHistory } from 'vue-router';

import { staticRoutes } from './routes/static';

export const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes
});
