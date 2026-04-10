<template>
  <div class="tabs-bar">
    <UiTag
      v-for="tab in tabsStore.visitedTabs"
      :key="tab.fullPath"
      :closable="tabsStore.visitedTabs.length > 1"
      :selected="tab.fullPath === route.fullPath"
      class="tabs-bar__tag"
      @click="router.push(tab.fullPath)"
      @close="handleClose(tab.fullPath)"
    >
      {{ tab.title }}
    </UiTag>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { appConfig } from '@/config/app'
import { useTabsStore } from '@/stores/tabs'
import UiTag from '@/ui/primitives/UiTag.vue'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()

async function handleClose(fullPath: string) {
  tabsStore.removeTab(fullPath)

  if (route.fullPath !== fullPath) {
    return
  }

  const fallback = tabsStore.visitedTabs[tabsStore.visitedTabs.length - 1]
  await router.push(fallback?.fullPath ?? appConfig.homePath)
}
</script>

<style scoped lang="scss">
.tabs-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 24px 20px;
  border-bottom: 1px solid var(--color-border);
}

.tabs-bar__tag {
  cursor: pointer;
  transition:
    transform var(--transition-duration-fast, 150ms)
      var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)),
    box-shadow var(--transition-duration-fast, 150ms) ease;
}

.tabs-bar__tag:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-soft);
}
</style>
