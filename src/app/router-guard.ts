import NProgress from 'nprogress'
import type { Router } from 'vue-router'

import { appConfig } from '@/config/app'
import { permissionConfig } from '@/config/permission'
import { asyncRoutes } from '@/router/routes/modules'
import { hasRouteAccess } from '@/shared/permissions/access'
import { hasKnownRoutePath } from '@/shared/utils/route'
import { pinia } from '@/stores'
import { useAuthStore } from '@/stores/auth'
import { useTabsStore } from '@/stores/tabs'

NProgress.configure({ showSpinner: false })

export function setupRouterGuards(router: Router): void {
  router.beforeEach(async (to) => {
    NProgress.start()

    const authStore = useAuthStore(pinia)
    const hadDynamicRoutes = authStore.routesLoaded
    const isTemporaryCatchAll = to.name === 'CatchAll'

    try {
      if (authStore.token && !authStore.userInfo) {
        await authStore.hydrateProfile()
      }
    } catch (error) {
      if (!authStore.isAuthenticated) {
        return {
          path: appConfig.loginPath,
          query: { redirect: to.fullPath }
        }
      }

      throw error
    }

    if (!authStore.isAuthenticated) {
      if (permissionConfig.whiteList.includes(to.path)) {
        return true
      }

      return {
        path: appConfig.loginPath,
        query: { redirect: to.fullPath }
      }
    }

    if (to.path === appConfig.loginPath) {
      return appConfig.homePath
    }

    try {
      await authStore.ensureRoutes(router)
    } catch (error) {
      if (!authStore.isAuthenticated) {
        return {
          path: appConfig.loginPath,
          query: { redirect: to.fullPath }
        }
      }

      throw error
    }

    if (isTemporaryCatchAll && hasKnownRoutePath(asyncRoutes, to.path)) {
      return {
        path: to.fullPath,
        replace: true
      }
    }

    if (!to.name) {
      if (!hadDynamicRoutes) {
        return {
          path: to.fullPath,
          replace: true
        }
      }

      const fallbackPath = hasKnownRoutePath(asyncRoutes, to.path)
        ? permissionConfig.forbiddenPath
        : '/404'

      return {
        path: fallbackPath,
        replace: true
      }
    }

    if (
      !permissionConfig.whiteList.includes(to.path) &&
      !hasRouteAccess(to.meta, {
        roles: authStore.roles,
        permissions: authStore.permissions
      })
    ) {
      return permissionConfig.forbiddenPath
    }

    return true
  })

  router.afterEach((to) => {
    NProgress.done()

    const tabsStore = useTabsStore(pinia)
    tabsStore.addTab(to)

    if (to.meta.title) {
      document.title = `${to.meta.title} - ${appConfig.title}`
      return
    }

    document.title = appConfig.title
  })

  router.onError(() => {
    NProgress.done()
  })
}
