<template>
  <section class="system-user-page">
    <AppCard title="用户管理" description="业务模块内自带页面、API 和局部组件。">
      <AppSearchForm class="system-user-page__toolbar" @submit="handleSearch">
        <UiInput
          v-model="query.keyword"
          class="system-user-page__search"
          placeholder="按姓名、角色或邮箱搜索"
          clearable
          @keyup.enter="handleSearch"
        />
        <template #actions>
          <UiButton native-type="submit">查询</UiButton>
          <UiButton v-permission="'user:create'" type="primary">新建用户</UiButton>
        </template>
      </AppSearchForm>

      <AppDataTable
        :columns="columns"
        :data="tableData.list"
        :loading="loading"
        :pagination="{
          page: query.page,
          pageSize: query.pageSize,
          total: tableData.total
        }"
        @page-change="handlePageChange"
      />
    </AppCard>
  </section>
</template>

<script setup lang="ts">
import { h, reactive } from 'vue';

import AppCard from '@/shared/components/AppCard.vue';
import AppDataTable from '@/shared/components/AppDataTable.vue';
import AppSearchForm from '@/shared/components/AppSearchForm.vue';
import AppStatusTag from '@/shared/components/AppStatusTag.vue';
import type { AppDataTableColumn } from '@/shared/components/app-data-table';
import { useLoading } from '@/shared/composables/use-loading';
import UiButton from '@/ui/primitives/UiButton.vue';
import UiInput from '@/ui/primitives/UiInput.vue';
import { uiMessage } from '@/ui/services/message';

import { fetchSystemUsers } from '../api';
import type { SystemUser, SystemUserPageResult } from '../types';

const query = reactive({
  page: 1,
  pageSize: 10,
  keyword: ''
});

const tableData = reactive<SystemUserPageResult>({
  list: [],
  total: 0,
  page: 1,
  pageSize: 10
});

const { loading, withLoading } = useLoading();
const columns: AppDataTableColumn<SystemUser>[] = [
  { key: 'name', title: '姓名', minWidth: 120 },
  { key: 'role', title: '角色', minWidth: 120 },
  { key: 'email', title: '邮箱', minWidth: 220 },
  {
    key: 'status',
    title: '状态',
    width: 120,
    render: (row) => h(AppStatusTag, { status: row.status })
  }
];

async function loadUsers() {
  try {
    const payload = await withLoading(() => fetchSystemUsers(query));
    Object.assign(tableData, payload);
  } catch (error) {
    uiMessage.error(error instanceof Error ? error.message : '查询失败');
  }
}

async function handleSearch() {
  query.page = 1;
  await loadUsers();
}

async function handlePageChange(page: number) {
  query.page = page;
  await loadUsers();
}

loadUsers();
</script>

<style scoped lang="scss">
.system-user-page__toolbar {
  margin-bottom: 16px;
}

.system-user-page__search {
  max-width: 360px;
}

@media (max-width: 840px) {
  .system-user-page__search {
    max-width: none;
  }
}
</style>
