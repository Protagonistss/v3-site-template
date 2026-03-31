import { envConfig } from '@/config/env';
import { httpClient, unwrapResponse } from '@/shared/request/client';
import type { ApiResponse } from '@/shared/request/types';
import { mockFetchDashboardOverview } from '../../../mock/dashboard';

import type { DashboardOverview } from './types';

export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  if (envConfig.enableMock) {
    return mockFetchDashboardOverview();
  }

  const { data } = await httpClient.get<ApiResponse<DashboardOverview>>('/dashboard/overview');
  return unwrapResponse(data);
}
