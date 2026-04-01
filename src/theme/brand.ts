export type ThemeBrandId = 'classic' | 'aurora';
export type ThemeMode = 'light' | 'dark';

export interface ThemePreference {
  brand: ThemeBrandId;
  mode: ThemeMode;
}

export interface ThemeTokens {
  font: {
    sans: string;
  };
  color: {
    primary: string;
    primaryHover: string;
    primaryPressed: string;
    primaryAccent: string;
    primarySoft: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    infoHover: string;
    infoPressed: string;
    textPrimary: string;
    textSecondary: string;
    textContrast: string;
    textContrastSecondary: string;
    border: string;
    contrastBorder: string;
    surface: string;
    surfaceStrong: string;
    surfaceElevated: string;
    surfaceContrast: string;
    sidebarBg: string;
    sidebarText: string;
    sidebarHover: string;
  };
  shadow: {
    soft: string;
    card: string;
    elevated: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    pill: string;
  };
  gradient: {
    loginShell: string;
    layoutShell: string;
    forbiddenShell: string;
    notFoundShell: string;
  };
}

export const THEME_BRANDS = ['classic', 'aurora'] as const;
export const THEME_MODES = ['light', 'dark'] as const;

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
  }
} as const satisfies Pick<ThemeTokens, 'font' | 'radius'>;

const classicLightTheme: ThemeTokens = {
  ...sharedThemeScales,
  color: {
    primary: '#1976d2',
    primaryHover: '#1e88e5',
    primaryPressed: '#145ea8',
    primaryAccent: '#21cbf3',
    primarySoft: '#eaf4ff',
    success: '#16a34a',
    warning: '#f59e0b',
    error: '#dc2626',
    info: '#334155',
    infoHover: '#475569',
    infoPressed: '#1e293b',
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
    textContrast: '#f8fafc',
    textContrastSecondary: 'rgba(248, 250, 252, 0.78)',
    border: 'rgba(15, 23, 42, 0.08)',
    contrastBorder: 'rgba(255, 255, 255, 0.14)',
    surface: 'rgba(255, 255, 255, 0.86)',
    surfaceStrong: 'rgba(255, 255, 255, 0.9)',
    surfaceElevated: 'rgba(255, 255, 255, 0.95)',
    surfaceContrast: 'rgba(255, 255, 255, 0.04)',
    sidebarBg: 'rgba(7, 18, 37, 0.96)',
    sidebarText: 'rgba(248, 250, 252, 0.72)',
    sidebarHover: 'rgba(255, 255, 255, 0.06)'
  },
  shadow: {
    soft: '0 24px 60px rgba(15, 23, 42, 0.08)',
    card: '0 24px 60px rgba(15, 23, 42, 0.06)',
    elevated: '0 30px 80px rgba(15, 23, 42, 0.08)'
  },
  gradient: {
    loginShell:
      'radial-gradient(circle at top left, rgba(24, 144, 255, 0.25), transparent 35%), linear-gradient(135deg, #06162f 0%, #0f274d 55%, #15396b 100%)',
    layoutShell:
      'radial-gradient(circle at top left, rgba(24, 144, 255, 0.08), transparent 30%), linear-gradient(180deg, #f6f8fc 0%, #eef2f8 100%)',
    forbiddenShell:
      'radial-gradient(circle at top left, rgba(25, 118, 210, 0.2), transparent 35%), linear-gradient(180deg, #f6f8fb 0%, #edf1f7 100%)',
    notFoundShell:
      'radial-gradient(circle at top right, rgba(255, 122, 0, 0.18), transparent 35%), linear-gradient(180deg, #f7f8fc 0%, #eef2f8 100%)'
  }
};

const classicDarkTheme: ThemeTokens = {
  ...sharedThemeScales,
  color: {
    primary: '#5fa8ff',
    primaryHover: '#84beff',
    primaryPressed: '#3b82f6',
    primaryAccent: '#38bdf8',
    primarySoft: '#020817',
    success: '#22c55e',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#cbd5e1',
    infoHover: '#e2e8f0',
    infoPressed: '#94a3b8',
    textPrimary: '#e2e8f0',
    textSecondary: '#94a3b8',
    textContrast: '#f8fafc',
    textContrastSecondary: 'rgba(248, 250, 252, 0.78)',
    border: 'rgba(148, 163, 184, 0.18)',
    contrastBorder: 'rgba(255, 255, 255, 0.16)',
    surface: 'rgba(15, 23, 42, 0.72)',
    surfaceStrong: 'rgba(15, 23, 42, 0.84)',
    surfaceElevated: 'rgba(15, 23, 42, 0.92)',
    surfaceContrast: 'rgba(255, 255, 255, 0.06)',
    sidebarBg: 'rgba(2, 6, 23, 0.98)',
    sidebarText: 'rgba(226, 232, 240, 0.72)',
    sidebarHover: 'rgba(255, 255, 255, 0.08)'
  },
  shadow: {
    soft: '0 24px 60px rgba(2, 6, 23, 0.34)',
    card: '0 24px 60px rgba(2, 6, 23, 0.3)',
    elevated: '0 30px 80px rgba(2, 6, 23, 0.38)'
  },
  gradient: {
    loginShell:
      'radial-gradient(circle at top left, rgba(95, 168, 255, 0.22), transparent 35%), linear-gradient(135deg, #020617 0%, #081427 52%, #10213f 100%)',
    layoutShell:
      'radial-gradient(circle at top left, rgba(95, 168, 255, 0.14), transparent 28%), linear-gradient(180deg, #020617 0%, #0b1120 100%)',
    forbiddenShell:
      'radial-gradient(circle at top left, rgba(95, 168, 255, 0.18), transparent 32%), linear-gradient(180deg, #020617 0%, #111827 100%)',
    notFoundShell:
      'radial-gradient(circle at top right, rgba(251, 191, 36, 0.14), transparent 32%), linear-gradient(180deg, #020617 0%, #111827 100%)'
  }
};

const auroraLightTheme: ThemeTokens = {
  ...sharedThemeScales,
  color: {
    primary: '#0f766e',
    primaryHover: '#0d9488',
    primaryPressed: '#115e59',
    primaryAccent: '#2dd4bf',
    primarySoft: '#ecfdf8',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#155e75',
    infoHover: '#0e7490',
    infoPressed: '#164e63',
    textPrimary: '#0f172a',
    textSecondary: '#58727e',
    textContrast: '#f0fdfa',
    textContrastSecondary: 'rgba(240, 253, 250, 0.8)',
    border: 'rgba(15, 118, 110, 0.12)',
    contrastBorder: 'rgba(236, 253, 250, 0.18)',
    surface: 'rgba(255, 255, 255, 0.88)',
    surfaceStrong: 'rgba(255, 255, 255, 0.92)',
    surfaceElevated: 'rgba(255, 255, 255, 0.97)',
    surfaceContrast: 'rgba(255, 255, 255, 0.08)',
    sidebarBg: 'rgba(5, 37, 41, 0.97)',
    sidebarText: 'rgba(236, 253, 250, 0.74)',
    sidebarHover: 'rgba(255, 255, 255, 0.07)'
  },
  shadow: {
    soft: '0 24px 60px rgba(8, 47, 46, 0.08)',
    card: '0 24px 60px rgba(8, 47, 46, 0.07)',
    elevated: '0 30px 80px rgba(8, 47, 46, 0.1)'
  },
  gradient: {
    loginShell:
      'radial-gradient(circle at top left, rgba(45, 212, 191, 0.24), transparent 35%), linear-gradient(135deg, #022c22 0%, #0b4b46 55%, #136f63 100%)',
    layoutShell:
      'radial-gradient(circle at top left, rgba(45, 212, 191, 0.1), transparent 30%), linear-gradient(180deg, #f2fbf8 0%, #e7f7f3 100%)',
    forbiddenShell:
      'radial-gradient(circle at top left, rgba(15, 118, 110, 0.18), transparent 35%), linear-gradient(180deg, #f3faf8 0%, #e7f3f0 100%)',
    notFoundShell:
      'radial-gradient(circle at top right, rgba(45, 212, 191, 0.16), transparent 35%), linear-gradient(180deg, #f2fbf9 0%, #e4f4f0 100%)'
  }
};

const auroraDarkTheme: ThemeTokens = {
  ...sharedThemeScales,
  color: {
    primary: '#2dd4bf',
    primaryHover: '#5eead4',
    primaryPressed: '#14b8a6',
    primaryAccent: '#67e8f9',
    primarySoft: '#021312',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#67e8f9',
    infoHover: '#a5f3fc',
    infoPressed: '#22d3ee',
    textPrimary: '#e6fffb',
    textSecondary: '#93c5c0',
    textContrast: '#ecfeff',
    textContrastSecondary: 'rgba(236, 254, 255, 0.82)',
    border: 'rgba(94, 234, 212, 0.16)',
    contrastBorder: 'rgba(236, 254, 255, 0.16)',
    surface: 'rgba(6, 20, 20, 0.76)',
    surfaceStrong: 'rgba(6, 20, 20, 0.86)',
    surfaceElevated: 'rgba(6, 20, 20, 0.94)',
    surfaceContrast: 'rgba(255, 255, 255, 0.06)',
    sidebarBg: 'rgba(2, 12, 11, 0.98)',
    sidebarText: 'rgba(214, 255, 249, 0.74)',
    sidebarHover: 'rgba(255, 255, 255, 0.08)'
  },
  shadow: {
    soft: '0 24px 60px rgba(2, 12, 11, 0.34)',
    card: '0 24px 60px rgba(2, 12, 11, 0.32)',
    elevated: '0 30px 80px rgba(2, 12, 11, 0.4)'
  },
  gradient: {
    loginShell:
      'radial-gradient(circle at top left, rgba(45, 212, 191, 0.22), transparent 35%), linear-gradient(135deg, #021312 0%, #052927 52%, #0a403a 100%)',
    layoutShell:
      'radial-gradient(circle at top left, rgba(45, 212, 191, 0.12), transparent 28%), linear-gradient(180deg, #021312 0%, #081816 100%)',
    forbiddenShell:
      'radial-gradient(circle at top left, rgba(45, 212, 191, 0.16), transparent 32%), linear-gradient(180deg, #021312 0%, #0a201d 100%)',
    notFoundShell:
      'radial-gradient(circle at top right, rgba(251, 191, 36, 0.14), transparent 32%), linear-gradient(180deg, #021312 0%, #0a201d 100%)'
  }
};

export const DEFAULT_THEME_PREFERENCE: ThemePreference = {
  brand: 'classic',
  mode: 'light'
};

export const themeCatalog: Record<ThemeBrandId, Record<ThemeMode, ThemeTokens>> = {
  classic: {
    light: classicLightTheme,
    dark: classicDarkTheme
  },
  aurora: {
    light: auroraLightTheme,
    dark: auroraDarkTheme
  }
};

export function isThemeBrandId(value: unknown): value is ThemeBrandId {
  return typeof value === 'string' && (THEME_BRANDS as readonly string[]).includes(value);
}

export function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === 'string' && (THEME_MODES as readonly string[]).includes(value);
}

export function normalizeThemePreference(
  value: Partial<ThemePreference> | null | undefined,
  fallback: ThemePreference = DEFAULT_THEME_PREFERENCE
): ThemePreference {
  return {
    brand: isThemeBrandId(value?.brand) ? value.brand : fallback.brand,
    mode: isThemeMode(value?.mode) ? value.mode : fallback.mode
  };
}

export function resolveThemeTokens(preference: ThemePreference): ThemeTokens {
  const normalizedPreference = normalizeThemePreference(preference);
  return themeCatalog[normalizedPreference.brand][normalizedPreference.mode];
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
    '--radius-sm': theme.radius.sm,
    '--radius-md': theme.radius.md,
    '--radius-lg': theme.radius.lg,
    '--radius-xl': theme.radius.xl,
    '--radius-pill': theme.radius.pill,
    '--gradient-brand': `linear-gradient(135deg, ${theme.color.primary} 0%, ${theme.color.primaryHover} 100%)`,
    '--gradient-brand-accent': `linear-gradient(135deg, ${theme.color.primary} 0%, ${theme.color.primaryAccent} 100%)`,
    '--gradient-progress': `linear-gradient(90deg, ${theme.color.primary}, ${theme.color.primaryAccent})`,
    '--gradient-login-shell': theme.gradient.loginShell,
    '--gradient-layout-shell': theme.gradient.layoutShell,
    '--gradient-forbidden-shell': theme.gradient.forbiddenShell,
    '--gradient-notfound-shell': theme.gradient.notFoundShell
  };
}

export function applyThemeCssVars(
  theme: ThemeTokens,
  target: HTMLElement | null = typeof document !== 'undefined' ? document.documentElement : null
): void {
  if (!target) {
    return;
  }

  Object.entries(createThemeCssVars(theme)).forEach(([name, value]) => {
    target.style.setProperty(name, value);
  });
}

export function applyThemePreference(
  preference: ThemePreference,
  target: HTMLElement | null = typeof document !== 'undefined' ? document.documentElement : null
): void {
  if (!target) {
    return;
  }

  const normalizedPreference = normalizeThemePreference(preference);
  applyThemeCssVars(resolveThemeTokens(normalizedPreference), target);
  target.dataset.themeBrand = normalizedPreference.brand;
  target.dataset.themeMode = normalizedPreference.mode;
  target.style.colorScheme = normalizedPreference.mode;
}
