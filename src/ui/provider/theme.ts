import type { GlobalThemeOverrides } from 'naive-ui';

export const uiThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1976d2',
    primaryColorHover: '#1e88e5',
    primaryColorPressed: '#145ea8',
    primaryColorSuppl: '#21cbf3',
    infoColor: '#334155',
    infoColorHover: '#475569',
    infoColorPressed: '#1e293b',
    successColor: '#16a34a',
    warningColor: '#f59e0b',
    errorColor: '#dc2626',
    borderRadius: '16px',
    borderColor: 'rgba(15, 23, 42, 0.08)',
    fontFamily: "'Manrope', 'PingFang SC', 'Microsoft YaHei', sans-serif"
  },
  Button: {
    borderRadiusMedium: '14px',
    borderRadiusSmall: '12px'
  },
  Card: {
    borderRadius: '24px'
  },
  Input: {
    borderRadius: '14px'
  },
  Menu: {
    borderRadius: '12px',
    itemTextColorInverted: 'rgba(248, 250, 252, 0.72)',
    itemTextColorActiveInverted: '#ffffff',
    itemTextColorChildActiveInverted: '#ffffff',
    itemIconColorInverted: 'rgba(248, 250, 252, 0.72)',
    itemIconColorActiveInverted: '#ffffff',
    itemIconColorChildActiveInverted: '#ffffff',
    itemColorActiveInverted: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
    itemColorActiveCollapsedInverted: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
    itemColorHoverInverted: 'rgba(255, 255, 255, 0.06)',
    itemColorHoverCollapsedInverted: 'rgba(255, 255, 255, 0.06)'
  },
  Tag: {
    borderRadius: '999px'
  }
};
