import type { App } from 'vue';
import dayjs from 'dayjs';

export function setupDayjs(app: App): void {
  app.config.globalProperties.$dayjs = dayjs;
}
