<template>
  <form class="app-search-form" @submit.prevent="emit('submit')">
    <div class="app-search-form__fields">
      <slot />
    </div>
    <div v-if="$slots.actions" class="app-search-form__actions">
      <slot name="actions" />
    </div>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  submit: []
}>()
</script>

<style scoped lang="scss">
.app-search-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.app-search-form__fields {
  flex: 1;
}

.app-search-form__actions {
  display: flex;
  gap: 12px;
}

@media (max-width: 840px) {
  .app-search-form {
    flex-direction: column;
    align-items: stretch;
  }

  .app-search-form__actions {
    justify-content: flex-end;
  }
}
</style>
