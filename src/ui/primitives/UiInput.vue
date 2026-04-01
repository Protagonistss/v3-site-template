<template>
  <n-input
    v-bind="$attrs"
    v-model:value="modelValueProxy"
    :clearable="clearable"
    :placeholder="placeholder"
    :show-password-on="showPassword ? 'click' : undefined"
    :type="resolvedType"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NInput } from 'naive-ui';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    clearable?: boolean;
    type?: 'text' | 'password' | 'textarea';
    showPassword?: boolean;
  }>(),
  {
    placeholder: '',
    clearable: false,
    type: 'text',
    showPassword: false
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
});

const resolvedType = computed(() => {
  if (props.showPassword) {
    return 'password';
  }

  return props.type;
});
</script>
