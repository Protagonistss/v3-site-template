<template>
  <header class="app-header">
    <div class="app-header__left">
      <el-button text @click="appStore.toggleSidebar()">
        {{ appStore.sidebarCollapsed ? '展开菜单' : '收起菜单' }}
      </el-button>
      <div>
        <p class="app-header__eyebrow">生产级 Vue 3 脚手架</p>
        <h1>{{ pageTitle }}</h1>
      </div>
    </div>

    <el-dropdown>
      <div class="app-header__user">
        <span class="app-header__avatar">{{ userInitial }}</span>
        <div>
          <p>{{ authStore.userInfo?.name ?? '未登录' }}</p>
          <small>{{ authStore.roles.join(', ') || 'guest' }}</small>
        </div>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';

const appStore = useAppStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const pageTitle = computed(() => route.meta.title ?? '工作台');
const userInitial = computed(() => authStore.userInfo?.avatar ?? 'A');

async function handleLogout() {
  await authStore.logout(router);
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
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.88);
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
  background: linear-gradient(135deg, #1976d2 0%, #21cbf3 100%);
  color: #ffffff;
  font-weight: 700;
}
</style>
