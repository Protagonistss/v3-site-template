<template>
  <section class="dashboard-page">
    <div class="dashboard-page__grid">
      <AppCard v-for="metric in metrics" :key="metric.title" :title="metric.title">
        <div class="metric-card">
          <strong>{{ metric.value }}</strong>
          <el-tag :type="tagTypeMap[metric.tone]" effect="plain">{{ metric.trend }}</el-tag>
        </div>
      </AppCard>
    </div>

    <div class="dashboard-page__content">
      <AppCard title="今日重点" description="这里展示模块化目录下的业务数据读取方式。">
        <el-skeleton :rows="4" :loading="loading" animated>
          <el-timeline>
            <el-timeline-item v-for="todo in todos" :key="todo" type="primary">
              {{ todo }}
            </el-timeline-item>
          </el-timeline>
        </el-skeleton>
      </AppCard>

      <AppCard title="当前权限" description="从全局认证状态中读取角色与按钮权限。">
        <div class="permission-panel">
          <el-descriptions :column="1" border>
            <el-descriptions-item label="角色">{{ authStore.roles.join(', ') }}</el-descriptions-item>
            <el-descriptions-item label="按钮权限">
              {{ authStore.permissions.join(', ') }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </AppCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import AppCard from '@/shared/components/AppCard.vue';
import { useLoading } from '@/shared/composables/use-loading';
import { useAuthStore } from '@/stores/auth';

import { useDashboardStore } from '../store';

const authStore = useAuthStore();
const dashboardStore = useDashboardStore();
const { loading, withLoading } = useLoading();

const metrics = computed(() => dashboardStore.overview?.metrics ?? []);
const todos = computed(() => dashboardStore.overview?.todos ?? []);

const tagTypeMap = {
  primary: 'primary',
  success: 'success',
  warning: 'warning'
} as const;

onMounted(async () => {
  await withLoading(() => dashboardStore.fetchOverview());
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
