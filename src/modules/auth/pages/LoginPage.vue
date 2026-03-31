<template>
  <section class="login-page">
    <div class="login-page__hero">
      <LoginHero />
    </div>

    <div class="login-page__panel">
      <AppCard title="欢迎回来" description="使用 Mock 账号即可直接进入后台示例。">
        <el-form ref="formRef" :model="formState" :rules="rules" label-position="top" @submit.prevent>
          <el-form-item label="账号" prop="username">
            <el-input v-model="formState.username" placeholder="admin / editor" />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formState.password"
              placeholder="请输入密码"
              show-password
              @keyup.enter="handleSubmit"
            />
          </el-form-item>

          <el-button class="login-page__submit" type="primary" :loading="loading" @click="handleSubmit">
            登录系统
          </el-button>
        </el-form>

        <div class="login-page__tips">
          <p>管理员：admin / 123456</p>
          <p>运营：editor / 123456</p>
        </div>
      </AppCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

import { appConfig } from '@/config/app';
import AppCard from '@/shared/components/AppCard.vue';
import { useLoading } from '@/shared/composables/use-loading';
import { useAuthStore } from '@/stores/auth';

import LoginHero from '../components/LoginHero.vue';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const formRef = ref<FormInstance>();
const { loading, withLoading } = useLoading();

const formState = reactive({
  username: 'admin',
  password: '123456'
});

const rules: FormRules<typeof formState> = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

async function handleSubmit() {
  const isValid = await formRef.value?.validate().catch(() => false);

  if (!isValid) {
    return;
  }

  try {
    await withLoading(async () => {
      await authStore.login(formState);
      await authStore.ensureRoutes(router);

      const redirect = route.query.redirect;
      const nextPath = typeof redirect === 'string' ? redirect : appConfig.homePath;
      await router.replace(nextPath);
    });

    ElMessage.success('登录成功');
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '登录失败');
  }
}
</script>

<style scoped lang="scss">
.login-page {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1.2fr 0.8fr;
  background:
    radial-gradient(circle at top left, rgba(24, 144, 255, 0.25), transparent 35%),
    linear-gradient(135deg, #06162f 0%, #0f274d 55%, #15396b 100%);
  color: #f8fafc;
}

.login-page__hero,
.login-page__panel {
  display: flex;
  padding: clamp(32px, 6vw, 72px);
}

.login-page__hero {
  align-items: center;
}

.login-page__panel {
  align-items: center;
  justify-content: center;
}

.login-page__panel :deep(.app-card) {
  width: min(420px, 100%);
  color: var(--color-text-primary);
}

.login-page__submit {
  width: 100%;
  margin-top: 8px;
}

.login-page__tips {
  margin-top: 18px;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.login-page__tips p {
  margin: 0 0 6px;
}

@media (max-width: 960px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .login-page__hero {
    padding-bottom: 0;
  }
}
</style>
