import axios from 'axios';

import { envConfig } from '@/config/env';
import { attachInterceptors } from './interceptors';
import type { ApiResponse } from './types';

export const httpClient = axios.create({
  baseURL: envConfig.apiBaseUrl,
  timeout: 10_000
});

attachInterceptors(httpClient);

export function unwrapResponse<T>(payload: ApiResponse<T>): T {
  if (payload.code !== 0) {
    throw new Error(payload.message || '请求失败');
  }

  return payload.data;
}
