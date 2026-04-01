<template>
  <div class="app-data-table">
    <UiDataTable :columns="columns" :data="data" :loading="loading" :row-key="rowKey" />
    <div v-if="pagination" class="app-data-table__pagination">
      <UiPagination
        :page="pagination.page"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @update:page="(page) => emit('page-change', page)"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="Row extends Record<string, unknown>">
import UiDataTable from '@/ui/primitives/UiDataTable.vue';
import UiPagination from '@/ui/primitives/UiPagination.vue';
import type { UiDataTableColumn } from '@/ui/types/table';

defineProps<{
  columns: UiDataTableColumn<Row>[];
  data: Row[];
  loading?: boolean;
  rowKey?: keyof Row | ((row: Row) => string | number);
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  };
}>();

const emit = defineEmits<{
  'page-change': [page: number];
}>();
</script>

<style scoped lang="scss">
.app-data-table {
  display: grid;
  gap: 20px;
}

.app-data-table__pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
