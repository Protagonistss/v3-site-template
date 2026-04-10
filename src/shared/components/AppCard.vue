<template>
  <article
    :class="['app-card', { 'app-card--animated': animate }]"
    :style="staggerStyle"
  >
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
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    animate?: boolean
    staggerIndex?: number
  }>(),
  {
    animate: true,
    staggerIndex: undefined
  }
)

const staggerStyle = computed(() => {
  if (props.staggerIndex == null) return undefined
  return { animationDelay: `${props.staggerIndex * 80}ms` }
})
</script>

<style scoped lang="scss">
.app-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface-strong);
  padding: 24px;
  box-shadow: var(--shadow-card);
  transition:
    transform var(--transition-duration-normal, 250ms)
      var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)),
    box-shadow var(--transition-duration-normal, 250ms)
      var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)),
    border-color var(--transition-duration-fast, 150ms) ease;
}

.app-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover, 0 8px 24px rgba(0, 0, 0, 0.06));
  border-color: var(--color-primary-accent, #404040);
}

.app-card--animated {
  animation: cardEntrance var(--transition-duration-entrance, 500ms)
    var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;
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
