import type { App, Directive } from 'vue';

import { pinia } from '@/stores';
import { useAuthStore } from '@/stores/auth';
import { hasPermissions } from '@/shared/permissions/access';

const permissionDirective: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    const authStore = useAuthStore(pinia);

    if (!hasPermissions(binding.value, authStore.permissions)) {
      el.remove();
    }
  }
};

export function setupPermissionDirective(app: App): void {
  app.directive('permission', permissionDirective);
}
