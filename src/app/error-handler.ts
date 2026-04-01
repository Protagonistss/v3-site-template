import type { App, ComponentPublicInstance } from 'vue'

export function setupErrorHandler(app: App): void {
  app.config.errorHandler = (error, instance, info) => {
    console.error('[AppError]', {
      error,
      info,
      component: resolveComponentName(instance)
    })
  }

  window.addEventListener('unhandledrejection', (event) => {
    console.error('[UnhandledRejection]', event.reason)
  })
}

function resolveComponentName(
  instance: ComponentPublicInstance | null
): string | undefined {
  if (!instance) {
    return undefined
  }

  const optionsName = instance.$options?.name

  if (typeof optionsName === 'string' && optionsName) {
    return optionsName
  }

  const componentName = instance.$?.type?.name
  return typeof componentName === 'string' && componentName
    ? componentName
    : undefined
}
