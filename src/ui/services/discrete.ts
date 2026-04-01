import { createDiscreteApi } from 'naive-ui';

import { pinia } from '@/stores';
import { useThemeStore } from '@/stores/theme';
import { createUiThemeOverrides } from '@/ui/provider/theme';

type ThemedDiscreteApi = Pick<
  ReturnType<typeof createDiscreteApi>,
  'message' | 'dialog' | 'loadingBar'
>;

let cachedThemeKey = '';
let cachedDiscreteApi: ThemedDiscreteApi | null = null;

function getThemedDiscreteApi(): ThemedDiscreteApi {
  const themeStore = useThemeStore(pinia);
  const nextThemeKey = `${themeStore.brand}:${themeStore.mode}`;

  if (cachedDiscreteApi && cachedThemeKey === nextThemeKey) {
    return cachedDiscreteApi;
  }

  cachedThemeKey = nextThemeKey;
  cachedDiscreteApi = createDiscreteApi(['message', 'dialog', 'loadingBar'], {
    configProviderProps: {
      themeOverrides: createUiThemeOverrides(themeStore.resolvedTokens)
    }
  });

  return cachedDiscreteApi;
}

export function getDiscreteApi() {
  return getThemedDiscreteApi();
}

export function getMessageApi() {
  return getThemedDiscreteApi().message;
}

export function getDialogApi() {
  return getThemedDiscreteApi().dialog;
}

export function getLoadingBarApi() {
  return getThemedDiscreteApi().loadingBar;
}
