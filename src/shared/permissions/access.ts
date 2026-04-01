import type {
  AppRouteAccessSubject,
  AppRouteMetaLike,
  AppRouteRecordRaw
} from '@/router/types'

export function hasRoles(
  requiredRoles: string[] | undefined,
  ownedRoles: string[]
): boolean {
  if (!requiredRoles?.length) {
    return true
  }

  return requiredRoles.some((role) => ownedRoles.includes(role))
}

export function hasPermissions(
  requiredPermissions: string[] | string | undefined,
  ownedPermissions: string[]
): boolean {
  if (
    !requiredPermissions ||
    (Array.isArray(requiredPermissions) && !requiredPermissions.length)
  ) {
    return true
  }

  const normalized = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions]

  return normalized.some((permission) => ownedPermissions.includes(permission))
}

export function hasRouteAccess(
  meta: AppRouteMetaLike,
  accessSubject: AppRouteAccessSubject
): boolean {
  return (
    hasRoles(meta?.roles, accessSubject.roles) &&
    hasPermissions(meta?.permissions, accessSubject.permissions)
  )
}

export function filterRoutesByAccess(
  routes: AppRouteRecordRaw[],
  accessSubject: AppRouteAccessSubject
): AppRouteRecordRaw[] {
  return routes.reduce<AppRouteRecordRaw[]>((accumulator, route) => {
    if (!hasRouteAccess(route.meta, accessSubject)) {
      return accumulator
    }

    const nextRoute: AppRouteRecordRaw = {
      ...route
    }

    if (route.children?.length) {
      nextRoute.children = filterRoutesByAccess(route.children, accessSubject)

      if (!nextRoute.children.length && route.redirect) {
        return accumulator
      }
    }

    accumulator.push(nextRoute)
    return accumulator
  }, [])
}
