<template>
  <section class="exception-page">
    <div class="exception-card">
      <p class="exception-code">404</p>
      <h1>页面不存在</h1>
      <p>当前地址没有对应页面，可能是菜单配置有误或链接已失效。</p>
      <RouterLink class="exception-link" to="/dashboard">返回工作台</RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.exception-page {
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 24px;
  background: var(--gradient-notfound-shell);
}

.exception-card {
  width: min(480px, 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface-elevated);
  padding: 40px;
  text-align: center;
  box-shadow: var(--shadow-elevated);
}

.exception-code {
  margin: 0 0 12px;
  color: var(--color-warning);
  font-size: 56px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.exception-link {
  display: inline-flex;
  margin-top: 24px;
  color: var(--color-primary);
  text-decoration: none;
}
</style>
