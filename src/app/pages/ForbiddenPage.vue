<template>
  <section class="exception-page">
    <div class="exception-card">
      <p class="exception-code">403</p>
      <h1>无权限访问</h1>
      <p>当前账号没有访问此页面的权限，请联系管理员开通。</p>
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
  background: var(--gradient-forbidden-shell);
}

.exception-card {
  width: min(480px, 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface-strong);
  padding: 40px;
  text-align: center;
  box-shadow: var(--shadow-elevated);
  animation: scaleIn var(--transition-duration-entrance, 500ms)
    var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;
}

.exception-card h1 {
  margin: 0 0 8px;
}

.exception-card p {
  margin: 0;
  color: var(--color-text-secondary);
}

.exception-code {
  margin: 0 0 12px;
  color: var(--color-primary);
  font-size: 80px;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1;
  animation: fadeInUp var(--transition-duration-entrance, 500ms)
    var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;
  cursor: default;
  transition: color var(--transition-duration-fast, 150ms) ease;
}

.exception-code:hover {
  animation: glitch 0.3s ease;
}

.exception-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 24px;
  padding: 10px 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-strong);
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: 600;
  transition:
    border-color var(--transition-duration-fast, 150ms) ease,
    transform var(--transition-duration-fast, 150ms)
      var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)),
    box-shadow var(--transition-duration-fast, 150ms) ease;

  &::before {
    content: '\2190';
    transition: transform var(--transition-duration-fast, 150ms)
      var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1));
  }

  &:hover {
    border-color: var(--color-primary);
    transform: translateX(-4px);
    box-shadow: var(--shadow-hover, 0 8px 24px rgba(0, 0, 0, 0.06));
  }

  &:hover::before {
    transform: translateX(-3px);
  }
}
</style>
