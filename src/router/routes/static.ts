import type { AppRouteRecordRaw } from '../types';

import ForbiddenPage from '@/app/pages/ForbiddenPage.vue';
import NotFoundPage from '@/app/pages/NotFoundPage.vue';
import LoginPage from '@/modules/auth/pages/LoginPage.vue';

export const staticRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'RootRedirect',
    redirect: '/dashboard',
    meta: {
      title: '首页',
      hidden: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: ForbiddenPage,
    meta: {
      title: '无权限',
      hidden: true
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundPage,
    meta: {
      title: '页面不存在',
      hidden: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'CatchAll',
    component: NotFoundPage,
    meta: {
      title: '兜底路由',
      hidden: true
    }
  }
];
