import type { AppRouteRecordRaw } from '@/router/types'

import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

export const systemUserRoute: AppRouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: DefaultLayout,
  redirect: '/system/users',
  meta: {
    title: '系统管理',
    icon: 'system',
    roles: ['admin'],
    order: 2
  },
  children: [
    {
      path: 'users',
      name: 'SystemUserList',
      component: () => import('./pages/SystemUserListPage.vue'),
      meta: {
        title: '用户管理',
        roles: ['admin'],
        permissions: ['user:read'],
        order: 1
      }
    }
  ]
}
