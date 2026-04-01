import type { AppRouteRecordRaw } from '@/router/types'

import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

export const dashboardRoute: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: DefaultLayout,
  redirect: '/dashboard',
  meta: {
    title: '仪表盘',
    icon: 'dashboard',
    roles: ['admin', 'editor'],
    order: 1
  },
  children: [
    {
      path: '',
      name: 'DashboardOverview',
      component: () => import('./pages/DashboardPage.vue'),
      meta: {
        title: '工作台',
        roles: ['admin', 'editor'],
        order: 1,
        keepAlive: true
      }
    }
  ]
}
