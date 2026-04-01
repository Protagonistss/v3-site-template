<template>
  <UiPopover placement="bottom-end" trigger="click">
    <template #trigger>
      <button class="theme-switcher__trigger" type="button">
        <span class="theme-switcher__trigger-label">主题</span>
        <strong>{{ currentThemeLabel }}</strong>
      </button>
    </template>

    <div class="theme-switcher">
      <section class="theme-switcher__section">
        <div class="theme-switcher__section-header">
          <span>品牌</span>
          <small>切换整体视觉调性</small>
        </div>
        <div class="theme-switcher__options">
          <button
            v-for="option in brandOptions"
            :key="option.value"
            :class="['theme-switcher__option', { 'theme-switcher__option--active': themeStore.brand === option.value }]"
            type="button"
            @click="themeStore.setBrand(option.value)"
          >
            <strong>{{ option.label }}</strong>
            <small>{{ option.description }}</small>
          </button>
        </div>
      </section>

      <section class="theme-switcher__section">
        <div class="theme-switcher__section-header">
          <span>模式</span>
          <small>切换浅色或深色界面</small>
        </div>
        <div class="theme-switcher__options theme-switcher__options--compact">
          <button
            v-for="option in modeOptions"
            :key="option.value"
            :class="['theme-switcher__option', { 'theme-switcher__option--active': themeStore.mode === option.value }]"
            type="button"
            @click="themeStore.setMode(option.value)"
          >
            <strong>{{ option.label }}</strong>
            <small>{{ option.description }}</small>
          </button>
        </div>
      </section>
    </div>
  </UiPopover>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useThemeStore } from '@/stores/theme';
import UiPopover from '@/ui/primitives/UiPopover.vue';
import type { ThemeBrandId, ThemeMode } from '@/theme/brand';

type ThemeOption<T> = {
  label: string;
  description: string;
  value: T;
};

const themeStore = useThemeStore();

const brandOptions: ThemeOption<ThemeBrandId>[] = [
  {
    label: '经典蓝',
    description: '稳健、清晰的管理后台默认风格',
    value: 'classic'
  },
  {
    label: '青绿科技',
    description: '更冷感、更科技导向的品牌方向',
    value: 'aurora'
  }
];

const modeOptions: ThemeOption<ThemeMode>[] = [
  {
    label: '浅色',
    description: '适合日间办公环境',
    value: 'light'
  },
  {
    label: '深色',
    description: '适合低亮度或长时间使用',
    value: 'dark'
  }
];

const brandLabel = computed(
  () => brandOptions.find((option) => option.value === themeStore.brand)?.label ?? '经典蓝'
);
const modeLabel = computed(
  () => modeOptions.find((option) => option.value === themeStore.mode)?.label ?? '浅色'
);
const currentThemeLabel = computed(() => `${brandLabel.value} · ${modeLabel.value}`);
</script>

<style scoped lang="scss">
.theme-switcher__trigger {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 10px 14px;
  background: var(--color-surface-strong);
  color: var(--color-text-primary);
  font: inherit;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.theme-switcher__trigger:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-soft);
  transform: translateY(-1px);
}

.theme-switcher__trigger strong {
  font-size: 14px;
  font-weight: 700;
}

.theme-switcher__trigger-label {
  color: var(--color-text-secondary);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.theme-switcher {
  width: min(360px, calc(100vw - 40px));
  display: grid;
  gap: 18px;
}

.theme-switcher__section {
  display: grid;
  gap: 12px;
}

.theme-switcher__section-header {
  display: grid;
  gap: 2px;
}

.theme-switcher__section-header span {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 700;
}

.theme-switcher__section-header small {
  color: var(--color-text-secondary);
  font-size: 12px;
}

.theme-switcher__options {
  display: grid;
  gap: 10px;
}

.theme-switcher__options--compact {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.theme-switcher__option {
  appearance: none;
  display: grid;
  gap: 4px;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 12px 14px;
  background: var(--color-surface-elevated);
  color: var(--color-text-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.theme-switcher__option:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-soft);
  transform: translateY(-1px);
}

.theme-switcher__option strong {
  font-size: 14px;
  font-weight: 700;
}

.theme-switcher__option small {
  color: var(--color-text-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.theme-switcher__option--active {
  border-color: transparent;
  background: var(--gradient-brand);
  color: var(--color-text-contrast);
}

.theme-switcher__option--active small {
  color: var(--color-text-contrast-secondary);
}
</style>
