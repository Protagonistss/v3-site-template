<template>
  <div class="login-hero">
    <p class="login-hero__eyebrow">Vue 3 Starter</p>
    <h1>给中后台项目一个能直接落地的起点</h1>
    <p class="login-hero__description">
      这套模板默认包含目录分层、RBAC、请求层、Mock、测试骨架和可演进的模块组织方式。
    </p>

    <ul class="login-hero__list">
      <li>应用能力和业务模块解耦</li>
      <li>默认支持角色和按钮级权限</li>
      <li>可以平滑扩展到 Monorepo</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.login-hero {
  padding: 12px 0;
}

.login-hero__eyebrow {
  margin: 0 0 12px;
  color: var(--color-primary);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.login-hero h1 {
  margin: 0 0 16px;
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.05;
}

.login-hero__description {
  max-width: 540px;
  margin: 0 0 24px;
  color: rgba(248, 250, 252, 0.78);
  font-size: 18px;
  line-height: 1.7;
}

.login-hero__list {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.login-hero__list li {
  width: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.04);
}
</style>
