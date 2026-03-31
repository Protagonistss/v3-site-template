import type { App } from 'vue';
import {
  ElButton,
  ElDescriptions,
  ElDescriptionsItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElInput,
  ElLoadingDirective,
  ElMenu,
  ElMenuItem,
  ElPagination,
  ElScrollbar,
  ElSkeleton,
  ElSubMenu,
  ElTable,
  ElTableColumn,
  ElTag,
  ElTimeline,
  ElTimelineItem
} from 'element-plus';

import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/descriptions/style/css';
import 'element-plus/es/components/descriptions-item/style/css';
import 'element-plus/es/components/dropdown/style/css';
import 'element-plus/es/components/dropdown-item/style/css';
import 'element-plus/es/components/dropdown-menu/style/css';
import 'element-plus/es/components/form/style/css';
import 'element-plus/es/components/form-item/style/css';
import 'element-plus/es/components/input/style/css';
import 'element-plus/es/components/loading/style/css';
import 'element-plus/es/components/menu/style/css';
import 'element-plus/es/components/menu-item/style/css';
import 'element-plus/es/components/pagination/style/css';
import 'element-plus/es/components/scrollbar/style/css';
import 'element-plus/es/components/skeleton/style/css';
import 'element-plus/es/components/sub-menu/style/css';
import 'element-plus/es/components/table/style/css';
import 'element-plus/es/components/table-column/style/css';
import 'element-plus/es/components/tag/style/css';
import 'element-plus/es/components/timeline/style/css';
import 'element-plus/es/components/timeline-item/style/css';
import 'element-plus/es/components/message/style/css';

const components = [
  ElButton,
  ElDescriptions,
  ElDescriptionsItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElInput,
  ElMenu,
  ElMenuItem,
  ElPagination,
  ElScrollbar,
  ElSkeleton,
  ElSubMenu,
  ElTable,
  ElTableColumn,
  ElTag,
  ElTimeline,
  ElTimelineItem
] as const;

export function setupUi(app: App): void {
  components.forEach((component) => {
    app.use(component);
  });

  app.directive('loading', ElLoadingDirective);
}
