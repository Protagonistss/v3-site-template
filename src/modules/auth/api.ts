import { envConfig } from '@/config/env';
import { httpClient, unwrapResponse } from '@/shared/request/client';
import type { ApiResponse } from '@/shared/request/types';
import { mockFetchProfile, mockLogin } from '../../../mock/auth';

import type { LoginCommand, LoginResult, UserProfile } from './types';

export async function login(payload: LoginCommand): Promise<LoginResult> {
  if (envConfig.enableMock) {
    return mockLogin(payload);
  }

  const { data } = await httpClient.post<ApiResponse<LoginResult>>('/auth/login', payload);
  return unwrapResponse(data);
}

export async function fetchProfile(token: string): Promise<UserProfile> {
  if (envConfig.enableMock) {
    return mockFetchProfile(token);
  }

  const { data } = await httpClient.get<ApiResponse<UserProfile>>('/auth/profile');
  return unwrapResponse(data);
}
