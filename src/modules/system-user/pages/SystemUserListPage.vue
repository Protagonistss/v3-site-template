<template>
  <section class="system-user-page">
    <AppCard title="用户管理" description="业务模块内自带页面、API 和局部组件。">
      <div class="system-user-page__toolbar">
        <el-input
          v-model="query.keyword"
          class="system-user-page__search"
          placeholder="按姓名、角色或邮箱搜索"
          clearable
          @keyup.enter="loadUsers"
        />

        <div class="system-user-page__actions">
          <el-button @click="loadUsers">查询</el-button>
          <el-button v-permission="'user:create'" type="primary">新建用户</el-button>
        </div>
      </div>

      <el-table v-loading="loading" :data="tableData.list">
        <el-table-column prop="name" label="姓名" min-width="120" />
        <el-table-column prop="role" label="角色" min-width="120" />
        <el-table-column prop="email" label="邮箱" min-width="220" />
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <UserStatusTag :status="row.status" />
          </template>
        </el-table-column>
      </el-table>

      <div class="system-user-page__pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.page"
          :page-size="query.pageSize"
          :total="tableData.total"
          @current-change="handlePageChange"
        />
      </div>
    </AppCard>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';

import AppCard from '@/shared/components/AppCard.vue';
import { useLoading } from '@/shared/composables/use-loading';

import { fetchSystemUsers } from '../api';
import type { SystemUserPageResult } from '../types';
import UserStatusTag from '../components/UserStatusTag.vue';

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

async function loadUsers() {
  try {
    const payload = await withLoading(() => fetchSystemUsers(query));
    Object.assign(tableData, payload);
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '查询失败');
  }
}

async function handlePageChange(page: number) {
  query.page = page;
  await loadUsers();
}

loadUsers();
</script>

<style scoped lang="scss">
.system-user-page__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.system-user-page__search {
  max-width: 360px;
}

.system-user-page__actions {
  display: flex;
  gap: 12px;
}

.system-user-page__pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

@media (max-width: 840px) {
  .system-user-page__toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .system-user-page__search {
    max-width: none;
  }

  .system-user-page__actions {
    justify-content: flex-end;
  }
}
</style>
