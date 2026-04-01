<template>
  <template v-if="loading">
    <div class="ui-skeleton">
      <n-skeleton v-for="index in rows" :key="index" :sharp="false" text />
    </div>
  </template>
  <slot v-else />
</template>

<script setup lang="ts">
import { NSkeleton } from 'naive-ui';

withDefaults(
  defineProps<{
    loading: boolean;
    rows?: number;
  }>(),
  {
    rows: 3
  }
);
</script>

<style scoped lang="scss">
.ui-skeleton {
  display: grid;
  gap: 14px;
}
</style>
