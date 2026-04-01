<template>
  <n-form-item :label="label" :path="path">
    <slot />
  </n-form-item>
</template>

<script setup lang="ts">
import { NFormItem } from 'naive-ui';

defineProps<{
  label: string;
  path: string;
}>();
</script>
