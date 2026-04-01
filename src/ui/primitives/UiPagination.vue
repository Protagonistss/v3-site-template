<template>
  <n-pagination
    :item-count="total"
    :page="page"
    :page-size="pageSize"
    @update:page="(value) => emit('update:page', value)"
  />
</template>

<script setup lang="ts">
import { NPagination } from 'naive-ui'

defineProps<{
  page: number
  pageSize: number
  total: number
}>()

const emit = defineEmits<{
  'update:page': [page: number]
}>()
</script>
