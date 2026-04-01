import { createPinia, setActivePinia } from 'pinia';
import type { Router } from 'vue-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { appConfig } from '@/config/app';
import { useAuthStore } from '@/stores/auth';
import { useTabsStore } from '@/stores/tabs';

describe('session cleanup', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    window.localStorage.clear();
  });

  it('resetAuth clears auth state, dynamic routes and tabs', () => {
    const authStore = useAuthStore();
    const tabsStore = useTabsStore();

    authStore.token = 'token_admin';
    authStore.userInfo = {
      id: 'u_admin',
      name: '管理员',
      avatar: 'A',
      roles: ['admin'],
      permissions: ['dashboard:view']
    };
    authStore.roles = ['admin'];
    authStore.permissions = ['dashboard:view'];
    authStore.dynamicRouteNames = ['Dashboard'];
    authStore.routesLoaded = true;
    tabsStore.visitedTabs = [
      {
        path: '/dashboard',
        fullPath: '/dashboard',
        title: '工作台'
      }
    ];

    const removedRouteNames: string[] = [];
    const router = {
      hasRoute: (routeName: string) => routeName === 'Dashboard',
      removeRoute: (routeName: string) => removedRouteNames.push(routeName)
    } as Pick<Router, 'hasRoute' | 'removeRoute'> as Router;

    authStore.resetAuth(router);

    expect(authStore.token).toBe('');
    expect(authStore.userInfo).toBeNull();
    expect(authStore.roles).toEqual([]);
    expect(authStore.permissions).toEqual([]);
    expect(authStore.dynamicRouteNames).toEqual([]);
    expect(authStore.routesLoaded).toBe(false);
    expect(removedRouteNames).toEqual(['Dashboard']);
    expect(tabsStore.visitedTabs).toEqual([]);
  });

  it('logout redirects to login path', async () => {
    const authStore = useAuthStore();
    const router = {
      replace: vi.fn().mockResolvedValue(undefined)
    } as Pick<Router, 'replace'> as Router;

    await authStore.logout(router);

    expect(router.replace).toHaveBeenCalledWith(appConfig.loginPath);
  });
});
