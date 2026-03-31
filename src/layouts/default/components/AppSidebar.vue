<template>
  <aside :class="['app-sidebar', { 'app-sidebar--collapsed': appStore.sidebarCollapsed }]">
    <RouterLink class="app-sidebar__brand" to="/dashboard">
      <img :src="logoUrl" alt="logo" />
      <span v-show="!appStore.sidebarCollapsed">Admin Starter</span>
    </RouterLink>

    <el-scrollbar class="app-sidebar__scroll">
      <el-menu
        :collapse="appStore.sidebarCollapsed"
        :default-active="route.path"
        :collapse-transition="false"
        router
      >
        <SidebarMenuItem
          v-for="routeRecord in authStore.menuRoutes"
          :key="routeRecord.path"
          :route-record="routeRecord"
        />
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import logoUrl from '@/assets/logo-mark.svg';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';

import SidebarMenuItem from './SidebarMenuItem.vue';

const route = useRoute();
const appStore = useAppStore();
const authStore = useAuthStore();
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

:deep(.el-menu) {
  border-right: 0;
  background: transparent;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  margin: 4px 12px;
  border-radius: 12px;
  color: rgba(248, 250, 252, 0.72);
}

:deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
  color: #ffffff;
}
</style>
