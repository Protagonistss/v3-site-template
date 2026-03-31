import type { App } from 'vue';

export function setupErrorHandler(app: App): void {
  app.config.errorHandler = (error, instance, info) => {
    console.error('[AppError]', { error, instance, info });
  };

  window.addEventListener('unhandledrejection', (event) => {
    console.error('[UnhandledRejection]', event.reason);
  });
}
