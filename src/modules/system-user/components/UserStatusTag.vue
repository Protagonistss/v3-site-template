<template>
  <el-tag :type="status === 'enabled' ? 'success' : 'info'" effect="plain">
    {{ status === 'enabled' ? '启用' : '停用' }}
  </el-tag>
</template>

<script setup lang="ts">
defineProps<{
  status: 'enabled' | 'disabled';
}>();
</script>
