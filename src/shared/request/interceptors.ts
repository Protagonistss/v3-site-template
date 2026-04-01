import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { normalizeRequestError } from './errors';

export interface HttpClientRuntimeHooks {
  getToken: () => string;
  onUnauthorized?: () => Promise<void> | void;
}

function appendAuthorization(
  config: InternalAxiosRequestConfig,
  getToken: () => string
): InternalAxiosRequestConfig {
  const token = getToken();

  if (token) {
    if (typeof config.headers.set === 'function') {
      config.headers.set('Authorization', `Bearer ${token}`);
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}

export function attachInterceptors(client: AxiosInstance, hooks: HttpClientRuntimeHooks): void {
  let unauthorizedTask: Promise<void> | null = null;

  client.interceptors.request.use((config) => appendAuthorization(config, hooks.getToken));

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const normalizedError = normalizeRequestError(error);

      if (normalizedError.status === 401 && hooks.getToken()) {
        unauthorizedTask ??= Promise.resolve(hooks.onUnauthorized?.()).finally(() => {
          unauthorizedTask = null;
        });

        await unauthorizedTask;
      }

      return Promise.reject(normalizedError);
    }
  );
}
