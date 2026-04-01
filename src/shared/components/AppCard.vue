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
  title?: string
  description?: string
}>()
</script>

<style scoped lang="scss">
.app-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface-strong);
  padding: 24px;
  box-shadow: var(--shadow-card);
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
