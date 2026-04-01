<template>
  <n-tag
    v-bind="$attrs"
    :bordered="!selected"
    :class="{ 'ui-tag--selected': selected }"
    :closable="closable"
    :type="resolvedType"
    round
    @close="emit('close')"
  >
    <slot />
  </n-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NTag } from 'naive-ui'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(
  defineProps<{
    type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
    selected?: boolean
    closable?: boolean
  }>(),
  {
    type: 'default',
    selected: false,
    closable: false
  }
)

const emit = defineEmits<{
  close: []
}>()

const resolvedType = computed(() => {
  if (props.type === 'default' || props.type === 'info') {
    return 'default'
  }

  return props.type
})
</script>

<style scoped lang="scss">
:deep(.ui-tag--selected) {
  background: var(--gradient-brand);
  border-color: transparent;
  color: var(--color-text-contrast);
}
</style>
