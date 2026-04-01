<template>
  <n-button
    v-bind="$attrs"
    :attr-type="nativeType"
    :disabled="disabled"
    :loading="loading"
    :text="text"
    :type="resolvedType"
  >
    <slot />
  </n-button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NButton } from 'naive-ui';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(
  defineProps<{
    type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
    text?: boolean;
    loading?: boolean;
    disabled?: boolean;
    nativeType?: 'button' | 'submit' | 'reset';
  }>(),
  {
    type: 'default',
    text: false,
    loading: false,
    disabled: false,
    nativeType: 'button'
  }
);

const resolvedType = computed(() => {
  if (props.type === 'default' || props.type === 'info') {
    return 'default';
  }

  return props.type;
});
</script>
