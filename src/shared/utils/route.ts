import type { AppRouteRecordRaw } from '@/router/types'

export function resolveRoutePath(parentPath: string, childPath = ''): string {
  if (!childPath) {
    return parentPath
  }

  if (childPath.startsWith('/')) {
    return childPath
  }

  return `${parentPath.replace(/\/$/, '')}/${childPath}`.replace(/\/{2,}/g, '/')
}

export function hasKnownRoutePath(
  routes: AppRouteRecordRaw[],
  targetPath: string,
  parentPath = ''
): boolean {
  return routes.some((route) => {
    const currentPath = route.path.startsWith('/')
      ? route.path
      : resolveRoutePath(parentPath, route.path)

    if (currentPath === targetPath) {
      return true
    }

    if (!route.children?.length) {
      return false
    }

    return hasKnownRoutePath(route.children, targetPath, currentPath)
  })
}
