import { describe, expect, it } from 'vitest';

import { filterRoutesByAccess, hasRouteAccess } from '@/shared/permissions/access';
import type { AppRouteRecordRaw } from '@/router/types';

describe('access helpers', () => {
  it('grants access when role and permission both match', () => {
    const result = hasRouteAccess(
      {
        roles: ['admin'],
        permissions: ['user:read']
      },
      {
        roles: ['admin'],
        permissions: ['user:read', 'user:create']
      }
    );

    expect(result).toBe(true);
  });

  it('filters routes by role', () => {
    const routes = [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { title: 'Dashboard', roles: ['admin', 'editor'] }
      },
      {
        path: '/system',
        name: 'System',
        meta: { title: 'System', roles: ['admin'] }
      }
    ] as AppRouteRecordRaw[];

    const result = filterRoutesByAccess(routes, {
      roles: ['editor'],
      permissions: []
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('Dashboard');
  });
});
