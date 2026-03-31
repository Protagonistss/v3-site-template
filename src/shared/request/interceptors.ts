import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { pinia } from '@/stores';
import { useAuthStore } from '@/stores/auth';

function appendAuthorization(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const authStore = useAuthStore(pinia);

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }

  return config;
}

export function attachInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use(appendAuthorization);

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        const authStore = useAuthStore(pinia);
        authStore.resetAuth();
      }

      return Promise.reject(error);
    }
  );
}
