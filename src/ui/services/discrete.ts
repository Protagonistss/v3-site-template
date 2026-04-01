import { createDiscreteApi } from 'naive-ui';

import { uiThemeOverrides } from '@/ui/provider/theme';

export const { message, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'loadingBar'],
  {
    configProviderProps: {
      themeOverrides: uiThemeOverrides
    }
  }
);
