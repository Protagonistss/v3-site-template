export interface AppEnv {
  title: string
  apiBaseUrl: string
  enableMock: boolean
}

export function readAppEnv(source: Record<string, string | undefined>): AppEnv {
  return {
    title: source.VITE_APP_TITLE ?? 'Vue 3 Admin Starter',
    apiBaseUrl: source.VITE_API_BASE_URL ?? '/api',
    enableMock: source.VITE_ENABLE_MOCK === 'true'
  }
}
