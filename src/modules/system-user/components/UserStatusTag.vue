<template>
  <AppStatusTag :status="status" />
</template>

<script setup lang="ts">
import AppStatusTag from '@/shared/components/AppStatusTag.vue'

defineProps<{
  status: 'enabled' | 'disabled'
}>()
</script>
