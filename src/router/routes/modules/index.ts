import type { AppRouteRecordRaw } from '@/router/types';

import { dashboardRoute } from '@/modules/dashboard/routes';
import { systemUserRoute } from '@/modules/system-user/routes';

export const asyncRoutes: AppRouteRecordRaw[] = [dashboardRoute, systemUserRoute].sort(
  (left, right) => (left.meta.order ?? 0) - (right.meta.order ?? 0)
);
