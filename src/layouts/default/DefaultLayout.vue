<template>
  <div class="layout-shell">
    <AppSidebar />
    <div class="layout-main">
      <AppHeader />
      <main class="layout-content">
        <RouterView v-slot="{ Component, route: currentRoute }">
          <Transition name="route-fade-slide" mode="out-in">
            <component :is="Component" :key="currentRoute.fullPath" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
</script>

<style scoped lang="scss">
.layout-shell {
  display: flex;
  min-height: 100vh;
  background: var(--gradient-layout-shell);
}

.layout-main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.layout-content {
  flex: 1;
  padding: 24px;
}
</style>
