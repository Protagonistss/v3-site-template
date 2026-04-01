<template>
  <n-descriptions :bordered="bordered" :column="column">
    <n-descriptions-item v-for="item in items" :key="item.label" :label="item.label">
      {{ item.value }}
    </n-descriptions-item>
  </n-descriptions>
</template>

<script setup lang="ts">
import { NDescriptions, NDescriptionsItem } from 'naive-ui';

defineProps<{
  items: Array<{
    label: string;
    value: string;
  }>;
  column?: number;
  bordered?: boolean;
}>();
</script>
