<template>
  <UiTag :type="tagType">
    {{ label }}
  </UiTag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import UiTag from '@/ui/primitives/UiTag.vue'

const props = defineProps<{
  status: 'enabled' | 'disabled'
}>()

const label = computed(() => (props.status === 'enabled' ? '启用' : '停用'))
const tagType = computed(() =>
  props.status === 'enabled' ? 'success' : 'default'
)
</script>
