<template>
  <section class="login-page">
    <div class="login-page__hero">
      <LoginHero />
    </div>

    <div class="login-page__panel">
      <div class="login-form">
        <div class="login-form__header">
          <div class="login-form__logo" aria-hidden="true">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14 2L2 8v12l12 6 12-6V8L14 2z" />
              <path d="M2 8l12 6m0 0l12-6m-12 6v12" />
            </svg>
          </div>
          <h2 class="login-form__title">欢迎回来</h2>
          <p class="login-form__subtitle">
            使用 Mock 账号即可直接进入后台示例。
          </p>
        </div>

        <UiForm
          ref="formRef"
          :model="formState"
          :rules="rules"
          label-position="top"
          @submit="handleSubmit"
        >
          <UiFormItem label="账号" path="username">
            <UiInput
              v-model="formState.username"
              placeholder="admin / editor"
            />
          </UiFormItem>

          <UiFormItem label="密码" path="password">
            <UiInput
              v-model="formState.password"
              placeholder="请输入密码"
              show-password
              @keyup.enter="handleSubmit"
            />
          </UiFormItem>

          <UiButton
            class="login-form__submit"
            type="primary"
            :loading="loading"
            native-type="submit"
          >
            登录系统
          </UiButton>
        </UiForm>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { appConfig } from '@/config/app'
import { useLoading } from '@/shared/composables/use-loading'
import { useAuthStore } from '@/stores/auth'
import { getErrorMessage } from '@/shared/request/client'
import UiButton from '@/ui/primitives/UiButton.vue'
import UiForm from '@/ui/primitives/UiForm.vue'
import UiFormItem from '@/ui/primitives/UiFormItem.vue'
import UiInput from '@/ui/primitives/UiInput.vue'
import type { UiFormInstance, UiFormRules } from '@/ui/types/form'
import { uiMessage } from '@/ui/services/message'

import LoginHero from '../components/LoginHero.vue'

type LoginFormState = {
  username: string
  password: string
}

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const formRef = ref<UiFormInstance | null>(null)
const { loading, withLoading } = useLoading()

const formState = reactive<LoginFormState>({
  username: 'admin',
  password: '123456'
})

const rules: UiFormRules<LoginFormState> = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

async function handleSubmit() {
  try {
    await formRef.value?.validate()
  } catch {
    return
  }

  try {
    await withLoading(async () => {
      await authStore.login(formState)
      await authStore.ensureRoutes(router)

      const redirect = route.query.redirect
      const nextPath =
        typeof redirect === 'string' ? redirect : appConfig.homePath
      await router.replace(nextPath)
    })

    uiMessage.success('登录成功')
  } catch (error) {
    uiMessage.error(getErrorMessage(error, '登录失败'))
  }
}
</script>

<style scoped lang="scss">
// ─── Page layout ────────────────────────────────────────────

.login-page {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1.15fr 0.85fr;
}

// ─── Hero panel (always dark) ───────────────────────────────

.login-page__hero {
  position: relative;
  background: #0a0a0a;
  color: #ffffff;
}

// ─── Form panel ─────────────────────────────────────────────

.login-page__panel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(48px, 8vw, 96px) clamp(40px, 7vw, 88px);
  background: var(--gradient-login-shell);
  overflow: hidden;
}

// Subtle glow behind the form card
.login-page__panel::before {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    var(--color-text-primary, #171717) 0%,
    transparent 70%
  );
  opacity: 0.05;
  transform: translate(-50%, -50%);
  content: '';
  pointer-events: none;
}

// ─── Form card ──────────────────────────────────────────────

.login-form {
  position: relative;
  width: min(420px, 100%);
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 48px 44px;
  box-shadow:
    var(--shadow-elevated),
    0 0 0 1px var(--color-border);
  opacity: 0;
  animation: fadeInUp var(--transition-duration-entrance, 500ms)
    var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;
  animation-delay: 300ms;
}

// Top accent bar
.login-form::before {
  position: absolute;
  top: 0;
  left: 32px;
  right: 32px;
  height: 3px;
  background: var(--gradient-brand);
  border-radius: 0 0 3px 3px;
  content: '';
}

.login-form__header {
  margin-bottom: 36px;
}

.login-form__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  border-radius: var(--radius-md);
  background: var(--color-surface-contrast);
  color: var(--color-text-primary);
}

.login-form__title {
  margin: 0 0 8px;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}

.login-form__subtitle {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

// ─── Submit button ──────────────────────────────────────────

.login-form__submit {
  width: 100%;
  margin-top: 12px;
  height: 46px;
  font-size: 15px;
  font-weight: 700;
  border-radius: var(--radius-lg);
  letter-spacing: 0.02em;
  background: var(--gradient-brand);
  transition:
    transform var(--transition-duration-fast, 150ms)
      var(--transition-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
    box-shadow var(--transition-duration-fast, 150ms) ease,
    filter var(--transition-duration-fast, 150ms) ease;
}

.login-form__submit:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover, 0 8px 24px rgba(0, 0, 0, 0.06));
  filter: brightness(1.08);
}

.login-form__submit:active {
  transform: translateY(0) scale(0.98);
}

// ─── Responsive ─────────────────────────────────────────────

// ─── Responsive ─────────────────────────────────────────────

@media (max-width: 960px) {
  .login-page {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .login-page__panel {
    padding: clamp(32px, 6vw, 48px) clamp(20px, 5vw, 40px);
  }

  .login-form {
    padding: 36px 28px;
  }

  .login-form::before {
    left: 20px;
    right: 20px;
  }
}
</style>
