<template>
  <el-menu-item v-if="isSingleLevel" :index="targetPath">
    <span>{{ routeRecord.meta.title }}</span>
  </el-menu-item>

  <el-sub-menu v-else :index="routeRecord.path">
    <template #title>
      <span>{{ routeRecord.meta.title }}</span>
    </template>

    <SidebarMenuItem
      v-for="child in visibleChildren"
      :key="child.path || child.name"
      :route-record="normalizeChildRoute(child)"
    />
  </el-sub-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { AppRouteRecordRaw } from '@/router/types';
import { resolveRoutePath } from '@/shared/utils/route';

const props = defineProps<{
  routeRecord: AppRouteRecordRaw;
}>();

const visibleChildren = computed<AppRouteRecordRaw[]>(() =>
  ((props.routeRecord.children ?? []) as AppRouteRecordRaw[]).filter((item) => !item.meta?.hidden)
);

const isSingleLevel = computed(() => visibleChildren.value.length <= 1);

const targetPath = computed(() => {
  const child = visibleChildren.value[0];

  if (!child) {
    return props.routeRecord.path;
  }

  return resolveRoutePath(props.routeRecord.path, child.path);
});

function normalizeChildRoute(routeRecord: AppRouteRecordRaw): AppRouteRecordRaw {
  if (routeRecord.path.startsWith('/')) {
    return routeRecord;
  }

  return {
    ...routeRecord,
    path: resolveRoutePath(props.routeRecord.path, routeRecord.path)
  };
}
</script>
