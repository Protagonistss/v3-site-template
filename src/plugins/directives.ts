import type { App } from 'vue'

import { setupPermissionDirective } from '@/shared/directives/permission'

export function setupDirectives(app: App): void {
  setupPermissionDirective(app)
}
