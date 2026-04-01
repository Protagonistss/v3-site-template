import axios from 'axios'

import { envConfig } from '@/config/env'
import { AppRequestError, getErrorMessage } from './errors'
import { attachInterceptors } from './interceptors'
import type { HttpClientRuntimeHooks } from './interceptors'
import type { ApiResponse } from './types'

export const httpClient = axios.create({
  baseURL: envConfig.apiBaseUrl,
  timeout: 10_000
})

let isHttpClientConfigured = false

export function setupHttpClient(hooks: HttpClientRuntimeHooks): void {
  if (isHttpClientConfigured) {
    return
  }

  attachInterceptors(httpClient, hooks)
  isHttpClientConfigured = true
}

export function unwrapResponse<T>(payload: ApiResponse<T>): T {
  if (payload.code !== 0) {
    throw new AppRequestError({
      message: payload.message || '请求失败',
      kind: 'business',
      code: payload.code
    })
  }

  return payload.data
}

export { AppRequestError, getErrorMessage }
