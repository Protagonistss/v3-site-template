<template>
  <n-data-table
    :columns="resolvedColumns"
    :data="data"
    :loading="loading"
    :row-key="resolvedRowKey"
    size="large"
  />
</template>

<script setup lang="ts" generic="Row extends Record<string, unknown>">
/* eslint-disable vue/require-default-prop */
import { computed } from 'vue';
import { NDataTable } from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';

import type { UiDataTableColumn } from '@/ui/types/table';

const props = withDefaults(
  defineProps<{
    columns: UiDataTableColumn<Row>[];
    data: Row[];
    loading?: boolean;
    rowKey?: keyof Row | ((row: Row) => string | number);
  }>(),
  {
    loading: false
  }
);

const resolvedColumns = computed<DataTableColumns<Row>>(() =>
  props.columns.map((column) => ({
    key: String(column.key),
    title: column.title,
    width: column.width,
    minWidth: column.minWidth,
    align: column.align,
    render: column.render ? (row) => column.render?.(row) : undefined
  }))
);

const resolvedRowKey = computed(() => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey;
  }

  const rowKey = (props.rowKey ?? 'id') as keyof Row;

  return (row: Row) => {
    const value = row[rowKey];

    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }

    return JSON.stringify(row);
  };
});
</script>
