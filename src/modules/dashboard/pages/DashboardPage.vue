<template>
  <section class="dashboard-page">
    <div class="dashboard-page__grid">
      <AppCard v-for="metric in metrics" :key="metric.title" :title="metric.title">
        <div class="metric-card">
          <strong>{{ metric.value }}</strong>
          <UiTag :type="tagTypeMap[metric.tone]">{{ metric.trend }}</UiTag>
        </div>
      </AppCard>
    </div>

    <div class="dashboard-page__content">
      <AppCard title="今日重点" description="这里展示模块化目录下的业务数据读取方式。">
        <UiSkeleton :loading="loading" :rows="4">
          <ol class="todo-list">
            <li v-for="todo in todos" :key="todo" class="todo-list__item">
              {{ todo }}
            </li>
          </ol>
        </UiSkeleton>
      </AppCard>

      <AppCard title="当前权限" description="从全局认证状态中读取角色与按钮权限。">
        <div class="permission-panel">
          <UiDescriptions :items="permissionItems" :column="1" bordered />
        </div>
      </AppCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import AppCard from '@/shared/components/AppCard.vue';
import { useLoading } from '@/shared/composables/use-loading';
import { getErrorMessage } from '@/shared/request/client';
import { useAuthStore } from '@/stores/auth';
import UiDescriptions from '@/ui/primitives/UiDescriptions.vue';
import UiSkeleton from '@/ui/primitives/UiSkeleton.vue';
import UiTag from '@/ui/primitives/UiTag.vue';
import { uiMessage } from '@/ui/services/message';

import { useDashboardStore } from '../store';

const authStore = useAuthStore();
const dashboardStore = useDashboardStore();
const { loading, withLoading } = useLoading();

const metrics = computed(() => dashboardStore.overview?.metrics ?? []);
const todos = computed(() => dashboardStore.overview?.todos ?? []);
const permissionItems = computed(() => [
  {
    label: '角色',
    value: authStore.roles.join(', ') || 'guest'
  },
  {
    label: '按钮权限',
    value: authStore.permissions.join(', ') || '无'
  }
]);

const tagTypeMap = {
  primary: 'primary',
  success: 'success',
  warning: 'warning'
} as const;

onMounted(async () => {
  try {
    await withLoading(() => dashboardStore.fetchOverview());
  } catch (error) {
    uiMessage.error(getErrorMessage(error, '加载概览失败'));
  }
});
</script>

<style scoped lang="scss">
.dashboard-page {
  display: grid;
  gap: 24px;
}

.dashboard-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.dashboard-page__content {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 20px;
}

.metric-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.metric-card strong {
  font-size: 36px;
  line-height: 1;
}

.todo-list {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list__item {
  position: relative;
  padding-left: 18px;
  color: var(--color-text-primary);
}

.todo-list__item::before {
  position: absolute;
  top: 8px;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gradient-brand-accent);
  content: '';
}

.permission-panel {
  display: grid;
  gap: 12px;
}

@media (max-width: 960px) {
  .dashboard-page__content {
    grid-template-columns: 1fr;
  }
}
</style>
