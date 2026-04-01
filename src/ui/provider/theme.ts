import type { GlobalThemeOverrides } from 'naive-ui';

import type { ThemeTokens } from '@/theme/brand';

export function createUiThemeOverrides(theme: ThemeTokens): GlobalThemeOverrides {
  return {
    common: {
      primaryColor: theme.color.primary,
      primaryColorHover: theme.color.primaryHover,
      primaryColorPressed: theme.color.primaryPressed,
      primaryColorSuppl: theme.color.primaryAccent,
      infoColor: theme.color.info,
      infoColorHover: theme.color.infoHover,
      infoColorPressed: theme.color.infoPressed,
      successColor: theme.color.success,
      warningColor: theme.color.warning,
      errorColor: theme.color.error,
      borderRadius: theme.radius.lg,
      borderColor: theme.color.border,
      fontFamily: theme.font.sans
    },
    Button: {
      borderRadiusMedium: theme.radius.md,
      borderRadiusSmall: theme.radius.sm
    },
    Card: {
      borderRadius: theme.radius.xl
    },
    Input: {
      borderRadius: theme.radius.md
    },
    Menu: {
      borderRadius: theme.radius.sm,
      itemTextColorInverted: theme.color.sidebarText,
      itemTextColorActiveInverted: theme.color.textContrast,
      itemTextColorChildActiveInverted: theme.color.textContrast,
      itemIconColorInverted: theme.color.sidebarText,
      itemIconColorActiveInverted: theme.color.textContrast,
      itemIconColorChildActiveInverted: theme.color.textContrast,
      itemColorActiveInverted: `linear-gradient(135deg, ${theme.color.primary} 0%, ${theme.color.primaryHover} 100%)`,
      itemColorActiveCollapsedInverted: `linear-gradient(135deg, ${theme.color.primary} 0%, ${theme.color.primaryHover} 100%)`,
      itemColorHoverInverted: theme.color.sidebarHover,
      itemColorHoverCollapsedInverted: theme.color.sidebarHover
    },
    Tag: {
      borderRadius: theme.radius.pill
    }
  };
}
