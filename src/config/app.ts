import type { ThemeBrandId, ThemeMode } from '@/theme/brand'

import { envConfig } from './env'

export const appConfig = {
  title: envConfig.title,
  homePath: '/dashboard',
  loginPath: '/login',
  defaultThemeBrand: 'classic',
  defaultThemeMode: 'light'
} as const satisfies {
  title: string
  homePath: string
  loginPath: string
  defaultThemeBrand: ThemeBrandId
  defaultThemeMode: ThemeMode
}
