export const envConfig = {
  title: import.meta.env.VITE_APP_TITLE ?? 'Vue 3 Admin Starter',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  enableMock: import.meta.env.VITE_ENABLE_MOCK === 'true'
} as const
