import { defineStore } from 'pinia';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

export interface VisitedTab {
  path: string;
  fullPath: string;
  title: string;
}

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    visitedTabs: [] as VisitedTab[]
  }),
  actions: {
    addTab(route: RouteLocationNormalizedLoaded) {
      if (route.meta.hidden || !route.meta.title) {
        return;
      }

      if (this.visitedTabs.some((item) => item.fullPath === route.fullPath)) {
        return;
      }

      this.visitedTabs.push({
        path: route.path,
        fullPath: route.fullPath,
        title: route.meta.title
      });
    },
    removeTab(fullPath: string) {
      this.visitedTabs = this.visitedTabs.filter((item) => item.fullPath !== fullPath);
    }
  }
});
