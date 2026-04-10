<template>
  <section class="dashboard-page">
    <div class="dashboard-page__grid">
      <AppCard
        v-for="(metric, index) in metrics"
        :key="metric.title"
        :title="metric.title"
        :stagger-index="index"
        class="dashboard-page__metric-card"
      >
        <div class="metric-card">
          <div class="metric-card__left">
            <span class="metric-card__value">{{ metric.value }}</span>
            <span
              class="metric-card__trend"
              :class="`metric-card__trend--${metric.tone}`"
            >
              {{ metric.trend }}
            </span>
          </div>
          <div
            class="metric-card__icon"
            :class="`metric-card__icon--${metric.tone}`"
          >
            <svg
              v-if="metric.icon === 'orders'"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <line x1="7" y1="9" x2="17" y2="9" />
              <line x1="7" y1="13" x2="14" y2="13" />
            </svg>
            <svg
              v-else-if="metric.icon === 'conversion'"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
            </svg>
            <svg
              v-else
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="12" x2="15" y2="14" />
            </svg>
          </div>
        </div>
      </AppCard>
    </div>

    <div class="dashboard-page__content">
      <AppCard
        title="今日重点"
        description="这里展示模块化目录下的业务数据读取方式。"
      >
        <UiSkeleton :loading="loading" :rows="4">
          <ul class="todo-list">
            <li v-for="todo in todos" :key="todo" class="todo-list__item">
              {{ todo }}
            </li>
          </ul>
        </UiSkeleton>
      </AppCard>

      <AppCard
        title="当前权限"
        description="从全局认证状态中读取角色与按钮权限。"
      >
        <div class="permission-panel">
          <UiDescriptions :items="permissionItems" :column="1" bordered />
        </div>
      </AppCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import AppCard from '@/shared/components/AppCard.vue'
import { useLoading } from '@/shared/composables/use-loading'
import { getErrorMessage } from '@/shared/request/client'
import { useAuthStore } from '@/stores/auth'
import UiDescriptions from '@/ui/primitives/UiDescriptions.vue'
import UiSkeleton from '@/ui/primitives/UiSkeleton.vue'
import { uiMessage } from '@/ui/services/message'

import { useDashboardStore } from '../store'

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const { loading, withLoading } = useLoading()

const metrics = computed(() => dashboardStore.overview?.metrics ?? [])
const todos = computed(() => dashboardStore.overview?.todos ?? [])
const permissionItems = computed(() => [
  {
    label: '角色',
    value: authStore.roles.join(', ') || 'guest'
  },
  {
    label: '按钮权限',
    value: authStore.permissions.join(', ') || '无'
  }
])

onMounted(async () => {
  try {
    await withLoading(() => dashboardStore.fetchOverview())
  } catch (error) {
    uiMessage.error(getErrorMessage(error, '加载概览失败'))
  }
})
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

.metric-card__left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.metric-card__value {
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
}

.metric-card__trend {
  font-size: 13px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  width: fit-content;
}

.metric-card__trend--success {
  color: var(--color-success);
  background: rgba(22, 163, 74, 0.08);
}

.metric-card__trend--warning {
  color: var(--color-warning);
  background: rgba(245, 158, 11, 0.08);
}

.metric-card__trend--primary {
  color: var(--color-primary);
  background: var(--color-surface-contrast);
}

.metric-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-surface-contrast);
  color: var(--color-text-secondary);
  flex-shrink: 0;
  transition:
    transform var(--transition-duration-fast, 150ms)
      var(--transition-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
    background var(--transition-duration-fast, 150ms) ease;
}

.dashboard-page__metric-card:hover .metric-card__icon {
  transform: scale(1.08);
}

.todo-list {
  display: grid;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list__item {
  position: relative;
  padding: 10px 12px 10px 40px;
  color: var(--color-text-primary);
  border-radius: var(--radius-sm);
  transition: background var(--transition-duration-fast, 150ms) ease;
}

.todo-list__item:hover {
  background: var(--color-surface-contrast);
}

.todo-list__item::before {
  position: absolute;
  top: 50%;
  left: 12px;
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-border);
  border-radius: 4px;
  transform: translateY(-50%);
  content: '';
  transition:
    border-color var(--transition-duration-fast, 150ms) ease,
    background var(--transition-duration-fast, 150ms) ease;
}

.todo-list__item:hover::before {
  border-color: var(--color-primary);
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
