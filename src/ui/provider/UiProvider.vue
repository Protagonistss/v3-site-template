<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-global-style />
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider
} from 'naive-ui';

import { useThemeStore } from '@/stores/theme';

import { createUiThemeOverrides } from './theme';

const themeStore = useThemeStore();
const themeOverrides = computed(() => createUiThemeOverrides(themeStore.resolvedTokens));
</script>
