<template>
  <aside
    :class="[
      'app-sidebar',
      { 'app-sidebar--collapsed': appStore.sidebarCollapsed }
    ]"
  >
    <RouterLink class="app-sidebar__brand" to="/dashboard">
      <img :src="logoUrl" alt="logo" />
      <span v-show="!appStore.sidebarCollapsed">Admin Starter</span>
    </RouterLink>

    <UiScrollbar class="app-sidebar__scroll">
      <UiMenu
        :collapsed="appStore.sidebarCollapsed"
        :inverted="true"
        :options="menuOptions"
        :value="activeMenuKey"
        @select="handleSelect"
      />
    </UiScrollbar>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import logoUrl from '@/assets/logo-mark.svg'
import type { AppRouteRecordRaw } from '@/router/types'
import { resolveRoutePath } from '@/shared/utils/route'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import UiMenu from '@/ui/primitives/UiMenu.vue'
import UiScrollbar from '@/ui/primitives/UiScrollbar.vue'
import type { UiMenuOption } from '@/ui/types/menu'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()

const menuOptions = computed(() =>
  authStore.menuRoutes
    .map((routeRecord) => createMenuOption(routeRecord))
    .filter((option): option is UiMenuOption => option !== null)
)

const activeMenuKey = computed(() => {
  const availableKeys = new Set(collectMenuKeys(menuOptions.value))
  const matchedPath = [...route.matched]
    .map((record) => record.path)
    .reverse()
    .find((path) => availableKeys.has(path))

  return matchedPath ?? route.path
})

function createMenuOption(
  routeRecord: AppRouteRecordRaw,
  parentPath = ''
): UiMenuOption | null {
  if (routeRecord.meta.hidden) {
    return null
  }

  const currentPath = routeRecord.path.startsWith('/')
    ? routeRecord.path
    : resolveRoutePath(parentPath, routeRecord.path)
  const visibleChildren = ((routeRecord.children ?? []) as AppRouteRecordRaw[])
    .map((child) => createMenuOption(child, currentPath))
    .filter((option): option is UiMenuOption => option !== null)

  if (visibleChildren.length <= 1) {
    return {
      key: visibleChildren[0]?.key ?? currentPath,
      label: routeRecord.meta.title
    }
  }

  return {
    key: currentPath,
    label: routeRecord.meta.title,
    children: visibleChildren
  }
}

function collectMenuKeys(options: UiMenuOption[]): string[] {
  return options.flatMap((option) => [
    option.key,
    ...collectMenuKeys(option.children ?? [])
  ])
}

async function handleSelect(key: string) {
  if (key === route.path) {
    return
  }

  await router.push(key)
}
</script>

<style scoped lang="scss">
.app-sidebar {
  position: sticky;
  top: 0;
  display: flex;
  width: 248px;
  height: 100vh;
  flex-direction: column;
  border-right: 1px solid var(--color-border);
  background: var(--color-sidebar-bg);
  overflow: hidden;
  transition: width var(--transition-duration-normal, 250ms)
    var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1));
}

.app-sidebar::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(to top, var(--color-sidebar-bg), transparent);
  content: '';
  pointer-events: none;
  z-index: 1;
}

.app-sidebar--collapsed {
  width: 76px;
}

.app-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  color: var(--color-text-contrast);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 4px;
}

.app-sidebar__brand img {
  width: 32px;
  height: 32px;
  transition: transform var(--transition-duration-normal, 250ms)
    var(--transition-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.app-sidebar__brand:hover img {
  transform: rotate(-5deg) scale(1.05);
}

.app-sidebar__scroll {
  flex: 1;
  animation: fadeIn var(--transition-duration-entrance, 500ms)
    var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;
  animation-delay: 100ms;
}

:deep(.n-menu) {
  border-right: 0;
  background: transparent;
}

:deep(.n-menu-item-content),
:deep(.n-submenu .n-menu-item-content-header) {
  margin: 4px 12px;
  border-radius: var(--radius-sm);
  width: calc(100% - 24px);
  color: var(--color-sidebar-text);
  transition:
    background var(--transition-duration-fast, 150ms) ease,
    color var(--transition-duration-fast, 150ms) ease,
    transform var(--transition-duration-fast, 150ms)
      var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1));
}

:deep(.n-menu-item-content:not(.n-menu-item-content--selected):hover) {
  transform: translateX(4px);
}

:deep(.n-menu-item-content--selected) {
  background: var(--gradient-brand);
  color: var(--color-text-contrast);
}
</style>
