<template>
  <n-dropdown :options="resolvedOptions" trigger="click" @select="handleSelect">
    <slot />
  </n-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NDropdown } from 'naive-ui';
import type { DropdownOption } from 'naive-ui';

import type { UiDropdownOption } from '@/ui/types/dropdown';

const props = defineProps<{
  options: UiDropdownOption[];
}>();

const emit = defineEmits<{
  select: [key: string];
}>();

const resolvedOptions = computed<DropdownOption[]>(() =>
  props.options.map((option) => ({
    label: option.label,
    key: option.key,
    disabled: option.disabled
  }))
);

function handleSelect(key: string | number) {
  emit('select', String(key));
}
</script>
