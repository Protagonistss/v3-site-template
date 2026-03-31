import { envConfig } from '@/config/env';
import { httpClient, unwrapResponse } from '@/shared/request/client';
import type { ApiResponse, PageQuery } from '@/shared/request/types';
import { mockFetchUsers } from '../../../mock/system-user';

import type { SystemUserPageResult } from './types';

export async function fetchSystemUsers(query: PageQuery): Promise<SystemUserPageResult> {
  if (envConfig.enableMock) {
    return mockFetchUsers(query);
  }

  const { data } = await httpClient.get<ApiResponse<SystemUserPageResult>>('/system/users', {
    params: query
  });

  return unwrapResponse(data);
}
