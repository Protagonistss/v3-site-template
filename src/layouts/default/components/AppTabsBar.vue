<template>
  <div class="tabs-bar">
    <el-tag
      v-for="tab in tabsStore.visitedTabs"
      :key="tab.fullPath"
      :effect="tab.fullPath === route.fullPath ? 'dark' : 'plain'"
      :closable="tabsStore.visitedTabs.length > 1"
      class="tabs-bar__tag"
      @click="router.push(tab.fullPath)"
      @close="handleClose(tab.fullPath)"
    >
      {{ tab.title }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import { appConfig } from '@/config/app';
import { useTabsStore } from '@/stores/tabs';

const route = useRoute();
const router = useRouter();
const tabsStore = useTabsStore();

async function handleClose(fullPath: string) {
  tabsStore.removeTab(fullPath);

  if (route.fullPath !== fullPath) {
    return;
  }

  const fallback = tabsStore.visitedTabs[tabsStore.visitedTabs.length - 1];
  await router.push(fallback?.fullPath ?? appConfig.homePath);
}
</script>

<style scoped lang="scss">
.tabs-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 24px 20px;
}

.tabs-bar__tag {
  cursor: pointer;
}
</style>
