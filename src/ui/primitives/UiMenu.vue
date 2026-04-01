<template>
  <n-menu
    :collapsed="collapsed"
    :collapsed-width="76"
    :inverted="inverted"
    :options="resolvedOptions"
    :value="value"
    @update:value="handleUpdate"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

import type { UiMenuOption } from '@/ui/types/menu'

const props = withDefaults(
  defineProps<{
    options: UiMenuOption[]
    value?: string
    collapsed?: boolean
    inverted?: boolean
  }>(),
  {
    value: undefined,
    collapsed: false,
    inverted: false
  }
)

const emit = defineEmits<{
  'update:value': [key: string]
  select: [key: string]
}>()

const resolvedOptions = computed<MenuOption[]>(() =>
  props.options.map((option) => normalizeOption(option))
)

function normalizeOption(option: UiMenuOption): MenuOption {
  return {
    key: option.key,
    label: option.label,
    disabled: option.disabled,
    children: option.children?.map((child) => normalizeOption(child))
  }
}

function handleUpdate(key: string) {
  emit('update:value', key)
  emit('select', key)
}
</script>
