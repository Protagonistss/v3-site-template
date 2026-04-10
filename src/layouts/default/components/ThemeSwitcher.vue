<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="
      themeStore.mode === 'light' ? '切换到深色模式' : '切换到浅色模式'
    "
    @click="themeStore.toggleMode()"
  >
    <Transition name="theme-icon" mode="out-in">
      <!-- Sun icon (shown in light mode → click to switch to dark) -->
      <svg
        v-if="themeStore.mode === 'light'"
        key="sun"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      <!-- Moon icon (shown in dark mode → click to switch to light) -->
      <svg
        v-else
        key="moon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </Transition>
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped lang="scss">
.theme-toggle {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition:
    background var(--transition-duration-fast, 150ms) ease,
    color var(--transition-duration-fast, 150ms) ease,
    transform var(--transition-duration-fast, 150ms)
      var(--transition-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.theme-toggle:hover {
  background: var(--color-surface-contrast);
  color: var(--color-text-primary);
  transform: scale(1.08);
}

.theme-toggle:active {
  transform: scale(0.92);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

// Icon transition
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition:
    opacity var(--transition-duration-fast, 150ms) ease,
    transform var(--transition-duration-fast, 150ms)
      var(--transition-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}
</style>
