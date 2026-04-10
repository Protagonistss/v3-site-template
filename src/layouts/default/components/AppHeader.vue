<template>
  <header class="app-header">
    <div class="app-header__left">
      <button
        class="app-header__toggle"
        type="button"
        :aria-label="appStore.sidebarCollapsed ? '展开菜单' : '收起菜单'"
        @click="appStore.toggleSidebar()"
      >
        <svg
          class="app-header__toggle-icon"
          :class="{ 'app-header__toggle-icon--collapsed': appStore.sidebarCollapsed }"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        >
          <line x1="3" y1="5" x2="17" y2="5" />
          <line x1="3" y1="10" x2="17" y2="10" />
          <line x1="3" y1="15" x2="13" y2="15" />
        </svg>
      </button>
      <div>
        <p class="app-header__eyebrow">生产级 Vue 3 脚手架</p>
        <h1>{{ pageTitle }}</h1>
      </div>
    </div>

    <div class="app-header__right">
      <ThemeSwitcher />
      <UiDropdown :options="userMenuOptions" @select="handleMenuSelect">
        <div class="app-header__user">
          <span class="app-header__avatar">{{ userInitial }}</span>
          <div>
            <p>{{ authStore.userInfo?.name ?? '未登录' }}</p>
            <small>{{ authStore.roles.join(', ') || 'guest' }}</small>
          </div>
        </div>
      </UiDropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import UiDropdown from '@/ui/primitives/UiDropdown.vue'
import type { UiDropdownOption } from '@/ui/types/dropdown'

import ThemeSwitcher from './ThemeSwitcher.vue'

const appStore = useAppStore()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const pageTitle = computed(() => route.meta.title ?? '工作台')
const userInitial = computed(() => authStore.userInfo?.avatar ?? 'A')
const userMenuOptions: UiDropdownOption[] = [
  { label: '退出登录', key: 'logout' }
]

async function handleLogout() {
  await authStore.logout(router)
}

async function handleMenuSelect(key: string) {
  if (key !== 'logout') {
    return
  }

  await handleLogout()
}
</script>

<style scoped lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 24px 12px;
}

.app-header__left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.app-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-header__toggle {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-strong);
  color: var(--color-text-primary);
  cursor: pointer;
  transition:
    background var(--transition-duration-fast, 150ms) ease,
    border-color var(--transition-duration-fast, 150ms) ease,
    transform var(--transition-duration-fast, 150ms)
      var(--transition-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.app-header__toggle:hover {
  background: var(--color-surface-contrast);
  border-color: var(--color-primary-accent);
  transform: scale(1.05);
}

.app-header__toggle:active {
  transform: scale(0.95);
}

.app-header__toggle-icon {
  transition: transform var(--transition-duration-normal, 250ms)
    var(--transition-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.app-header__toggle-icon--collapsed {
  transform: scaleX(0.8);
}

.app-header__left h1 {
  margin: 0;
  font-size: 24px;
}

.app-header__eyebrow {
  margin: 0 0 4px;
  color: var(--color-text-secondary);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-header__user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-strong);
  cursor: pointer;
  transition:
    border-color var(--transition-duration-fast, 150ms) ease,
    box-shadow var(--transition-duration-fast, 150ms) ease,
    transform var(--transition-duration-fast, 150ms)
      var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1));
}

.app-header__user:hover {
  border-color: var(--color-primary-accent);
  box-shadow: var(--shadow-hover, 0 8px 24px rgba(0, 0, 0, 0.06));
  transform: translateY(-1px);
}

.app-header__user p,
.app-header__user small {
  margin: 0;
}

.app-header__avatar {
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--gradient-brand-accent);
  color: var(--color-text-contrast);
  font-weight: 700;
}
</style>
