<template>
  <n-popover v-bind="$attrs">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <slot />
  </n-popover>
</template>

<script setup lang="ts">
import { NPopover } from 'naive-ui';

defineOptions({
  inheritAttrs: false
});
</script>
