<template>
  <n-form
    ref="formRef"
    class="ui-form"
    :label-placement="labelPlacement"
    :model="model"
    :on-submit="handleSubmit"
    :rules="resolvedRules"
  >
    <slot />
  </n-form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { NForm } from 'naive-ui';
import type { FormInst, FormRules } from 'naive-ui';

import type { UiFormInstance, UiFormRules } from '@/ui/types/form';

const props = withDefaults(
  defineProps<{
    model: Record<string, unknown>;
    rules?: UiFormRules<Record<string, unknown>>;
    labelPosition?: 'top' | 'left';
  }>(),
  {
    rules: () => ({}),
    labelPosition: 'top'
  }
);

const emit = defineEmits<{
  submit: [event: Event];
}>();

const formRef = ref<FormInst | null>(null);

const labelPlacement = computed(() => (props.labelPosition === 'top' ? 'top' : 'left'));
const resolvedRules = computed(() => props.rules as FormRules);

function handleSubmit(event: Event) {
  event.preventDefault();
  emit('submit', event);
}

async function validate() {
  await formRef.value?.validate();
}

defineExpose<UiFormInstance>({
  validate
});
</script>

<style scoped lang="scss">
.ui-form {
  display: contents;
}
</style>
