<template>
  <header class="app-header">
    <div class="app-header__left">
      <UiButton text @click="appStore.toggleSidebar()">
        {{ appStore.sidebarCollapsed ? '展开菜单' : '收起菜单' }}
      </UiButton>
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
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import UiButton from '@/ui/primitives/UiButton.vue';
import UiDropdown from '@/ui/primitives/UiDropdown.vue';
import type { UiDropdownOption } from '@/ui/types/dropdown';

import ThemeSwitcher from './ThemeSwitcher.vue';

const appStore = useAppStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const pageTitle = computed(() => route.meta.title ?? '工作台');
const userInitial = computed(() => authStore.userInfo?.avatar ?? 'A');
const userMenuOptions: UiDropdownOption[] = [{ label: '退出登录', key: 'logout' }];

async function handleLogout() {
  await authStore.logout(router);
}

async function handleMenuSelect(key: string) {
  if (key !== 'logout') {
    return;
  }

  await handleLogout();
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
