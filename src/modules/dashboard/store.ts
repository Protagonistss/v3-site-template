import { defineStore } from 'pinia';

import { fetchDashboardOverview } from './api';
import type { DashboardOverview } from './types';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    overview: null as DashboardOverview | null
  }),
  actions: {
    async fetchOverview() {
      this.overview = await fetchDashboardOverview();
    }
  }
});
