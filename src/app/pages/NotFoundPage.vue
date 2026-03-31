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
  background:
    radial-gradient(circle at top right, rgba(255, 122, 0, 0.18), transparent 35%),
    linear-gradient(180deg, #f7f8fc 0%, #eef2f8 100%);
}

.exception-card {
  width: min(480px, 100%);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  text-align: center;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.08);
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
