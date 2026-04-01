<template>
  <aside :class="['app-sidebar', { 'app-sidebar--collapsed': appStore.sidebarCollapsed }]">
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
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import logoUrl from '@/assets/logo-mark.svg';
import type { AppRouteRecordRaw } from '@/router/types';
import { resolveRoutePath } from '@/shared/utils/route';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import UiMenu from '@/ui/primitives/UiMenu.vue';
import UiScrollbar from '@/ui/primitives/UiScrollbar.vue';
import type { UiMenuOption } from '@/ui/types/menu';

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const authStore = useAuthStore();

const menuOptions = computed(() =>
  authStore.menuRoutes
    .map((routeRecord) => createMenuOption(routeRecord))
    .filter((option): option is UiMenuOption => option !== null)
);

const activeMenuKey = computed(() => {
  const availableKeys = new Set(collectMenuKeys(menuOptions.value));
  const matchedPath = [...route.matched]
    .map((record) => record.path)
    .reverse()
    .find((path) => availableKeys.has(path));

  return matchedPath ?? route.path;
});

function createMenuOption(
  routeRecord: AppRouteRecordRaw,
  parentPath = ''
): UiMenuOption | null {
  if (routeRecord.meta.hidden) {
    return null;
  }

  const currentPath = routeRecord.path.startsWith('/')
    ? routeRecord.path
    : resolveRoutePath(parentPath, routeRecord.path);
  const visibleChildren = ((routeRecord.children ?? []) as AppRouteRecordRaw[])
    .map((child) => createMenuOption(child, currentPath))
    .filter((option): option is UiMenuOption => option !== null);

  if (visibleChildren.length <= 1) {
    return {
      key: visibleChildren[0]?.key ?? currentPath,
      label: routeRecord.meta.title
    };
  }

  return {
    key: currentPath,
    label: routeRecord.meta.title,
    children: visibleChildren
  };
}

function collectMenuKeys(options: UiMenuOption[]): string[] {
  return options.flatMap((option) => [option.key, ...collectMenuKeys(option.children ?? [])]);
}

async function handleSelect(key: string) {
  if (key === route.path) {
    return;
  }

  await router.push(key);
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
  border-right: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(7, 18, 37, 0.96);
  transition: width 0.2s ease;
}

.app-sidebar--collapsed {
  width: 76px;
}

.app-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  color: #f8fafc;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
}

.app-sidebar__brand img {
  width: 32px;
  height: 32px;
}

.app-sidebar__scroll {
  flex: 1;
}

:deep(.n-menu) {
  border-right: 0;
  background: transparent;
}

:deep(.n-menu-item-content),
:deep(.n-submenu .n-menu-item-content-header) {
  margin: 4px 12px;
  border-radius: 12px;
  width: calc(100% - 24px);
  color: rgba(248, 250, 252, 0.72);
}

:deep(.n-menu-item-content--selected) {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
  color: #ffffff;
}
</style>
