import type { VNodeChild } from 'vue';

export interface UiDataTableColumn<Row = Record<string, unknown>> {
  key: keyof Row | string;
  title: string;
  width?: number;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  render?: (row: Row) => VNodeChild;
}
