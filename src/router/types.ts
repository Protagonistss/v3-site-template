import type { RouteMeta, RouteRecordRaw } from 'vue-router'

export interface AppRouteMeta {
  title: string
  icon?: string
  roles?: string[]
  permissions?: string[]
  hidden?: boolean
  keepAlive?: boolean
  order?: number
}

export type AppRouteRecordRaw = RouteRecordRaw & {
  name: string
  meta: AppRouteMeta
  children?: AppRouteRecordRaw[]
}

declare module 'vue-router' {
  // RouteMeta is intentionally augmented with the shared app-specific fields.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RouteMeta extends AppRouteMeta {}
}

export type AppRouteAccessSubject = {
  roles: string[]
  permissions: string[]
}

export type AppRouteMetaLike = Partial<RouteMeta> | undefined
