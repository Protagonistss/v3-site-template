import { dashboardRoute } from '@/modules/dashboard/routes'
import { systemUserRoute } from '@/modules/system-user/routes'
import type { AppRouteRecordRaw } from '@/router/types'

export const asyncRoutes: AppRouteRecordRaw[] = [dashboardRoute, systemUserRoute].toSorted(
  (left, right) => (left.meta.order ?? 0) - (right.meta.order ?? 0)
)
