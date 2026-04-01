import { defineStore } from 'pinia';
import type { Router } from 'vue-router';

import { appConfig } from '@/config/app';
import { asyncRoutes } from '@/router/routes/modules';
import type { AppRouteRecordRaw } from '@/router/types';
import { filterRoutesByAccess } from '@/shared/permissions/access';
import { STORAGE_KEYS } from '@/shared/constants/app';
import { storage } from '@/shared/utils/storage';
import { fetchProfile, login as loginRequest } from '@/modules/auth/api';
import { useTabsStore } from '@/stores/tabs';
import type { LoginCommand, UserProfile } from '@/modules/auth/types';

type AuthSnapshot = Pick<UserProfile, 'roles' | 'permissions'>;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: storage.getString(STORAGE_KEYS.token),
    userInfo: storage.getObject<UserProfile>(STORAGE_KEYS.user),
    roles: [] as string[],
    permissions: [] as string[],
    menuRoutes: [] as AppRouteRecordRaw[],
    dynamicRouteNames: [] as string[],
    routesLoaded: false
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token)
  },
  actions: {
    syncAccess(userInfo: AuthSnapshot) {
      this.roles = userInfo.roles;
      this.permissions = userInfo.permissions;
    },
    setUser(userInfo: UserProfile) {
      this.userInfo = userInfo;
      this.syncAccess(userInfo);
      storage.setObject(STORAGE_KEYS.user, userInfo);
    },
    async login(payload: LoginCommand) {
      const result = await loginRequest(payload);

      this.token = result.token;
      storage.setString(STORAGE_KEYS.token, result.token);
      this.setUser(result.userInfo);
      this.routesLoaded = false;
    },
    async hydrateProfile() {
      if (!this.token) {
        return;
      }

      if (this.userInfo) {
        this.syncAccess(this.userInfo);
        return;
      }

      const userInfo = await fetchProfile(this.token);
      this.setUser(userInfo);
    },
    async ensureRoutes(router: Router) {
      if (this.routesLoaded) {
        return;
      }

      await this.hydrateProfile();

      const nextRoutes = filterRoutesByAccess(asyncRoutes, {
        roles: this.roles,
        permissions: this.permissions
      });

      nextRoutes.forEach((route) => {
        if (!router.hasRoute(route.name)) {
          router.addRoute(route);
          this.dynamicRouteNames.push(route.name);
        }
      });

      this.menuRoutes = nextRoutes;
      this.routesLoaded = true;
    },
    resetAuth(router?: Router) {
      const tabsStore = useTabsStore();

      this.dynamicRouteNames.forEach((routeName) => {
        if (router?.hasRoute(routeName)) {
          router.removeRoute(routeName);
        }
      });

      this.token = '';
      this.userInfo = null;
      this.roles = [];
      this.permissions = [];
      this.menuRoutes = [];
      this.dynamicRouteNames = [];
      this.routesLoaded = false;
      tabsStore.reset();

      storage.remove(STORAGE_KEYS.token);
      storage.remove(STORAGE_KEYS.user);
    },
    async logout(router?: Router) {
      this.resetAuth(router);

      if (router) {
        await router.replace(appConfig.loginPath);
      }
    }
  }
});
