import type { ProxyOptions } from 'vite'

import type { AppEnv } from './env'

export function createProxy(
  env: AppEnv
): Record<string, ProxyOptions> | undefined {
  if (env.enableMock || !env.apiBaseUrl.startsWith('http')) {
    return undefined
  }

  return {
    '/api': {
      target: env.apiBaseUrl,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
