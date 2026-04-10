export type ThemeBrandId = 'monochrome'
export type ThemeMode = 'light' | 'dark'

export interface ThemePreference {
  brand: ThemeBrandId
  mode: ThemeMode
}

export interface ThemeTokens {
  font: {
    sans: string
  }
  color: {
    primary: string
    primaryHover: string
    primaryPressed: string
    primaryAccent: string
    primarySoft: string
    success: string
    warning: string
    error: string
    info: string
    infoHover: string
    infoPressed: string
    textPrimary: string
    textSecondary: string
    textContrast: string
    textContrastSecondary: string
    border: string
    contrastBorder: string
    surface: string
    surfaceStrong: string
    surfaceElevated: string
    surfaceContrast: string
    sidebarBg: string
    sidebarText: string
    sidebarHover: string
  }
  shadow: {
    soft: string
    card: string
    elevated: string
    hover: string
    glow: string
  }
  radius: {
    sm: string
    md: string
    lg: string
    xl: string
    pill: string
  }
  transition: {
    durationFast: string
    durationNormal: string
    durationSlow: string
    durationEntrance: string
    easeOut: string
    easeIn: string
    easeSpring: string
    easeSmooth: string
  }
  gradient: {
    loginShell: string
    layoutShell: string
    forbiddenShell: string
    notFoundShell: string
  }
}

export const THEME_BRANDS = ['monochrome'] as const
export const THEME_MODES = ['light', 'dark'] as const

const sharedThemeScales = {
  font: {
    sans: "'Manrope', 'PingFang SC', 'Microsoft YaHei', sans-serif"
  },
  radius: {
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '24px',
    pill: '999px'
  },
  transition: {
    durationFast: '150ms',
    durationNormal: '250ms',
    durationSlow: '400ms',
    durationEntrance: '500ms',
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeIn: 'cubic-bezier(0.7, 0, 0.84, 0)',
    easeSpring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    easeSmooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
  }
} as const satisfies Pick<ThemeTokens, 'font' | 'radius' | 'transition'>

const monochromeLightTheme: ThemeTokens = {
  ...sharedThemeScales,
  color: {
    primary: '#171717',
    primaryHover: '#262626',
    primaryPressed: '#0a0a0a',
    primaryAccent: '#404040',
    primarySoft: '#f5f5f5',
    success: '#16a34a',
    warning: '#f59e0b',
    error: '#dc2626',
    info: '#52525b',
    infoHover: '#71717a',
    infoPressed: '#3f3f46',
    textPrimary: '#171717',
    textSecondary: '#737373',
    textContrast: '#ffffff',
    textContrastSecondary: 'rgba(255, 255, 255, 0.8)',
    border: 'rgba(0, 0, 0, 0.08)',
    contrastBorder: 'rgba(255, 255, 255, 0.14)',
    surface: 'rgba(255, 255, 255, 0.86)',
    surfaceStrong: 'rgba(255, 255, 255, 0.95)',
    surfaceElevated: '#ffffff',
    surfaceContrast: 'rgba(0, 0, 0, 0.04)',
    sidebarBg: '#ffffff',
    sidebarText: '#52525b',
    sidebarHover: 'rgba(0, 0, 0, 0.04)'
  },
  shadow: {
    soft: '0 24px 60px rgba(0, 0, 0, 0.04)',
    card: '0 24px 60px rgba(0, 0, 0, 0.03)',
    elevated: '0 30px 80px rgba(0, 0, 0, 0.06)',
    hover: '0 8px 24px rgba(0, 0, 0, 0.06)',
    glow: '0 0 0 3px rgba(0, 0, 0, 0.06)'
  },
  gradient: {
    loginShell:
      'radial-gradient(circle at top left, rgba(0, 0, 0, 0.03), transparent 35%), linear-gradient(135deg, #f5f5f5 0%, #ffffff 55%, #e5e5e5 100%)',
    layoutShell:
      'radial-gradient(circle at top left, rgba(0, 0, 0, 0.02), transparent 30%), linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)',
    forbiddenShell:
      'radial-gradient(circle at top left, rgba(0, 0, 0, 0.02), transparent 35%), linear-gradient(180deg, #fafafa 0%, #f4f4f5 100%)',
    notFoundShell:
      'radial-gradient(circle at top right, rgba(0, 0, 0, 0.02), transparent 35%), linear-gradient(180deg, #fafafa 0%, #f4f4f5 100%)'
  }
}

const monochromeDarkTheme: ThemeTokens = {
  ...sharedThemeScales,
  color: {
    primary: '#f5f5f5',
    primaryHover: '#ffffff',
    primaryPressed: '#e5e5e5',
    primaryAccent: '#d4d4d8',
    primarySoft: '#171717',
    success: '#22c55e',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#a1a1aa',
    infoHover: '#d4d4d8',
    infoPressed: '#71717a',
    textPrimary: '#f5f5f5',
    textSecondary: '#a1a1aa',
    textContrast: '#171717',
    textContrastSecondary: 'rgba(0, 0, 0, 0.7)',
    border: 'rgba(255, 255, 255, 0.12)',
    contrastBorder: 'rgba(255, 255, 255, 0.16)',
    surface: 'rgba(23, 23, 23, 0.8)',
    surfaceStrong: 'rgba(23, 23, 23, 0.9)',
    surfaceElevated: '#171717',
    surfaceContrast: 'rgba(255, 255, 255, 0.06)',
    sidebarBg: '#0a0a0a',
    sidebarText: '#a1a1aa',
    sidebarHover: 'rgba(255, 255, 255, 0.08)'
  },
  shadow: {
    soft: '0 24px 60px rgba(0, 0, 0, 0.4)',
    card: '0 24px 60px rgba(0, 0, 0, 0.35)',
    elevated: '0 30px 80px rgba(0, 0, 0, 0.5)',
    hover: '0 8px 24px rgba(0, 0, 0, 0.5)',
    glow: '0 0 0 3px rgba(255, 255, 255, 0.08)'
  },
  gradient: {
    loginShell:
      'radial-gradient(circle at top left, rgba(255, 255, 255, 0.04), transparent 35%), linear-gradient(135deg, #0a0a0a 0%, #171717 52%, #000000 100%)',
    layoutShell:
      'radial-gradient(circle at top left, rgba(255, 255, 255, 0.02), transparent 28%), linear-gradient(180deg, #0a0a0a 0%, #171717 100%)',
    forbiddenShell:
      'radial-gradient(circle at top left, rgba(255, 255, 255, 0.03), transparent 32%), linear-gradient(180deg, #0a0a0a 0%, #171717 100%)',
    notFoundShell:
      'radial-gradient(circle at top right, rgba(255, 255, 255, 0.03), transparent 32%), linear-gradient(180deg, #0a0a0a 0%, #171717 100%)'
  }
}

export const DEFAULT_THEME_PREFERENCE: ThemePreference = {
  brand: 'monochrome',
  mode: 'light'
}

export const themeCatalog: Record<
  ThemeBrandId,
  Record<ThemeMode, ThemeTokens>
> = {
  monochrome: {
    light: monochromeLightTheme,
    dark: monochromeDarkTheme
  }
}

export function isThemeBrandId(value: unknown): value is ThemeBrandId {
  return (
    typeof value === 'string' &&
    (THEME_BRANDS as readonly string[]).includes(value)
  )
}

export function isThemeMode(value: unknown): value is ThemeMode {
  return (
    typeof value === 'string' &&
    (THEME_MODES as readonly string[]).includes(value)
  )
}

export function normalizeThemePreference(
  value: Partial<ThemePreference> | null | undefined,
  fallback: ThemePreference = DEFAULT_THEME_PREFERENCE
): ThemePreference {
  return {
    brand: isThemeBrandId(value?.brand) ? value.brand : fallback.brand,
    mode: isThemeMode(value?.mode) ? value.mode : fallback.mode
  }
}

export function resolveThemeTokens(preference: ThemePreference): ThemeTokens {
  const normalizedPreference = normalizeThemePreference(preference)
  return themeCatalog[normalizedPreference.brand][normalizedPreference.mode]
}

export function createThemeCssVars(theme: ThemeTokens): Record<string, string> {
  return {
    '--font-sans': theme.font.sans,
    '--color-primary': theme.color.primary,
    '--color-primary-hover': theme.color.primaryHover,
    '--color-primary-pressed': theme.color.primaryPressed,
    '--color-primary-accent': theme.color.primaryAccent,
    '--color-primary-soft': theme.color.primarySoft,
    '--color-success': theme.color.success,
    '--color-warning': theme.color.warning,
    '--color-error': theme.color.error,
    '--color-info': theme.color.info,
    '--color-info-hover': theme.color.infoHover,
    '--color-info-pressed': theme.color.infoPressed,
    '--color-text-primary': theme.color.textPrimary,
    '--color-text-secondary': theme.color.textSecondary,
    '--color-text-contrast': theme.color.textContrast,
    '--color-text-contrast-secondary': theme.color.textContrastSecondary,
    '--color-border': theme.color.border,
    '--color-contrast-border': theme.color.contrastBorder,
    '--color-surface': theme.color.surface,
    '--color-surface-strong': theme.color.surfaceStrong,
    '--color-surface-elevated': theme.color.surfaceElevated,
    '--color-surface-contrast': theme.color.surfaceContrast,
    '--color-sidebar-bg': theme.color.sidebarBg,
    '--color-sidebar-text': theme.color.sidebarText,
    '--color-sidebar-hover': theme.color.sidebarHover,
    '--shadow-soft': theme.shadow.soft,
    '--shadow-card': theme.shadow.card,
    '--shadow-elevated': theme.shadow.elevated,
    '--shadow-hover': theme.shadow.hover,
    '--shadow-glow': theme.shadow.glow,
    '--radius-sm': theme.radius.sm,
    '--radius-md': theme.radius.md,
    '--radius-lg': theme.radius.lg,
    '--radius-xl': theme.radius.xl,
    '--radius-pill': theme.radius.pill,
    '--transition-duration-fast': theme.transition.durationFast,
    '--transition-duration-normal': theme.transition.durationNormal,
    '--transition-duration-slow': theme.transition.durationSlow,
    '--transition-duration-entrance': theme.transition.durationEntrance,
    '--transition-ease-out': theme.transition.easeOut,
    '--transition-ease-in': theme.transition.easeIn,
    '--transition-ease-spring': theme.transition.easeSpring,
    '--transition-ease-smooth': theme.transition.easeSmooth,
    '--gradient-brand': `linear-gradient(135deg, ${theme.color.primary} 0%, ${theme.color.primaryHover} 100%)`,
    '--gradient-brand-accent': `linear-gradient(135deg, ${theme.color.primary} 0%, ${theme.color.primaryAccent} 100%)`,
    '--gradient-progress': `linear-gradient(90deg, ${theme.color.primary}, ${theme.color.primaryAccent})`,
    '--gradient-login-shell': theme.gradient.loginShell,
    '--gradient-layout-shell': theme.gradient.layoutShell,
    '--gradient-forbidden-shell': theme.gradient.forbiddenShell,
    '--gradient-notfound-shell': theme.gradient.notFoundShell
  }
}

export function applyThemeCssVars(
  theme: ThemeTokens,
  target: HTMLElement | null = typeof document !== 'undefined'
    ? document.documentElement
    : null
): void {
  if (!target) {
    return
  }

  Object.entries(createThemeCssVars(theme)).forEach(([name, value]) => {
    target.style.setProperty(name, value)
  })
}

export function applyThemePreference(
  preference: ThemePreference,
  target: HTMLElement | null = typeof document !== 'undefined'
    ? document.documentElement
    : null
): void {
  if (!target) {
    return
  }

  const normalizedPreference = normalizeThemePreference(preference)
  applyThemeCssVars(resolveThemeTokens(normalizedPreference), target)
  target.dataset.themeBrand = normalizedPreference.brand
  target.dataset.themeMode = normalizedPreference.mode
  target.style.colorScheme = normalizedPreference.mode
}
