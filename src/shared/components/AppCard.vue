<template>
  <article class="app-card">
    <header v-if="title || $slots.header" class="app-card__header">
      <slot name="header">
        <div>
          <h3>{{ title }}</h3>
          <p v-if="description">{{ description }}</p>
        </div>
      </slot>
    </header>
    <div class="app-card__body">
      <slot />
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<style scoped lang="scss">
.app-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.9);
  padding: 24px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.06);
}

.app-card__header {
  margin-bottom: 16px;
}

.app-card__header h3,
.app-card__header p {
  margin: 0;
}

.app-card__header p {
  margin-top: 6px;
  color: var(--color-text-secondary);
}
</style>
