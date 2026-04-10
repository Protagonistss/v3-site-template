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
          :class="{
            'app-header__toggle-icon--collapsed': appStore.sidebarCollapsed
          }"
          width="18"
          height="18"
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

      <nav v-if="breadcrumbs.length" class="app-header__breadcrumb">
        <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
          <span v-if="index > 0" class="app-header__breadcrumb-sep" aria-hidden="true">/</span>
          <router-link
            v-if="index < breadcrumbs.length - 1"
            :to="crumb.path"
            class="app-header__breadcrumb-link"
          >
            {{ crumb.title }}
          </router-link>
          <span v-else class="app-header__breadcrumb-current">
            {{ crumb.title }}
          </span>
        </template>
      </nav>
    </div>

    <div class="app-header__right">
      <ThemeSwitcher />
      <UiDropdown :options="userMenuOptions" @select="handleMenuSelect">
        <button class="app-header__avatar-btn" type="button">
          <span class="app-header__avatar">{{ userInitial }}</span>
        </button>
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

const userInitial = computed(() => authStore.userInfo?.avatar ?? 'A')
const userMenuOptions: UiDropdownOption[] = [
  { label: '退出登录', key: 'logout' }
]

const breadcrumbs = computed(() => {
  let accumulated = ''
  const entries: { path: string; title: string }[] = []

  for (const record of route.matched) {
    if (!record.meta?.title || record.meta?.hidden) continue

    const segment = record.path.startsWith('/')
      ? record.path
      : `${accumulated.replace(/\/$/, '')}/${record.path}`.replace(
          /\/{2,}/g,
          '/'
        )
    accumulated = segment

    if (
      entries.length > 0 &&
      entries[entries.length - 1].path === segment
    ) {
      entries[entries.length - 1].title = record.meta.title as string
      continue
    }

    entries.push({ path: segment, title: record.meta.title as string })
  }

  return entries
})

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
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
}

.app-header__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-header__right {
  display: flex;
  align-items: center;
  gap: 8px;
}

// ─── Toggle (ghost icon) ────────────────────────────────────

.app-header__toggle {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
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

.app-header__toggle:hover {
  background: var(--color-surface-contrast);
  color: var(--color-text-primary);
}

.app-header__toggle:active {
  transform: scale(0.92);
}

.app-header__toggle:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.app-header__toggle-icon {
  transition: transform var(--transition-duration-normal, 250ms)
    var(--transition-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.app-header__toggle-icon--collapsed {
  transform: scaleX(0.8);
}

// ─── Breadcrumb ─────────────────────────────────────────────

.app-header__breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  min-width: 0;
}

.app-header__breadcrumb-sep {
  color: var(--color-border);
  font-size: 12px;
  user-select: none;
}

.app-header__breadcrumb-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--transition-duration-fast, 150ms) ease;
}

.app-header__breadcrumb-link:hover {
  color: var(--color-text-primary);
}

.app-header__breadcrumb-current {
  color: var(--color-text-primary);
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

// ─── Avatar (compact) ───────────────────────────────────────

.app-header__avatar-btn {
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: transparent;
  padding: 0;
  cursor: pointer;
  transition:
    transform var(--transition-duration-fast, 150ms)
      var(--transition-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.app-header__avatar-btn:hover {
  transform: scale(1.1);
}

.app-header__avatar-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.app-header__avatar {
  display: inline-flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--gradient-brand-accent);
  color: var(--color-text-contrast);
  font-weight: 700;
  font-size: 14px;
}
</style>
