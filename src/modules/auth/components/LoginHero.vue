<template>
  <div class="login-hero">
    <div class="login-hero__geo" aria-hidden="true">
      <div class="login-hero__grid"></div>
      <div class="login-hero__ring login-hero__ring--outer"></div>
      <div class="login-hero__ring login-hero__ring--inner"></div>
      <div class="login-hero__dots"></div>
      <div class="login-hero__accent"></div>
    </div>

    <div class="login-hero__content">
      <p class="login-hero__eyebrow">Vue 3 Starter</p>
      <h1 class="login-hero__title">
        给中后台项目<br />一个能直接<br />落地的起点
      </h1>
      <p class="login-hero__description">
        包含目录分层、RBAC、请求层、Mock、测试骨架和可演进的模块组织方式。
      </p>

      <ul class="login-hero__features">
        <li
          v-for="(feature, index) in features"
          :key="feature"
          class="login-hero__feature"
          :style="{ animationDelay: `${800 + index * 100}ms` }"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="3,8 6.5,11.5 13,4.5" />
          </svg>
          {{ feature }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  '应用能力和业务模块解耦',
  '默认支持角色和按钮级权限',
  '可以平滑扩展到 Monorepo'
]
</script>

<style scoped lang="scss">
@keyframes heroEntrance {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ─── Layout ─────────────────────────────────────────────────

.login-hero {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: clamp(40px, 8vw, 96px) clamp(40px, 7vw, 88px);
  overflow: hidden;
}

// ─── Geometric decorations (fixed light-on-dark colors) ─────

.login-hero__geo {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

// Grid pattern — vignette-faded
.login-hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px);
  background-size: 56px 56px;
  opacity: 0.05;
  -webkit-mask-image: radial-gradient(
    ellipse 60% 50% at 65% 50%,
    black 10%,
    transparent 70%
  );
  mask-image: radial-gradient(
    ellipse 60% 50% at 65% 50%,
    black 10%,
    transparent 70%
  );
}

// Double ring
.login-hero__ring {
  position: absolute;
  top: 50%;
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 50%;
  transform: translateY(-50%);
}

.login-hero__ring--outer {
  right: -100px;
  width: 480px;
  height: 480px;
  opacity: 0.08;
}

.login-hero__ring--inner {
  right: -20px;
  width: 320px;
  height: 320px;
  opacity: 0.12;
  animation: subtlePulse 6s ease-in-out infinite;
}

// Dot grid — bottom-left
.login-hero__dots {
  position: absolute;
  bottom: 56px;
  left: 56px;
  width: 84px;
  height: 84px;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 1.2px,
    transparent 1.2px
  );
  background-size: 14px 14px;
  opacity: 0.15;
}

// Accent square — top area
.login-hero__accent {
  position: absolute;
  top: 18%;
  right: 72px;
  width: 14px;
  height: 14px;
  border: 1.5px solid rgba(255, 255, 255, 1);
  border-radius: 2px;
  transform: rotate(45deg);
  opacity: 0.25;
}

// ─── Content (fixed light-on-dark colors) ────────────────────

.login-hero__content {
  position: relative;
  z-index: 1;
  max-width: 540px;
}

.login-hero__eyebrow {
  margin: 0 0 24px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  opacity: 0;
  animation: heroEntrance var(--transition-duration-entrance, 500ms)
    var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;
  animation-delay: 200ms;
}

.login-hero__title {
  margin: 0 0 28px;
  color: #ffffff;
  font-size: clamp(38px, 5vw, 58px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.025em;
  opacity: 0;
  animation: heroEntrance var(--transition-duration-entrance, 500ms)
    var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;
  animation-delay: 400ms;
}

.login-hero__description {
  max-width: 420px;
  margin: 0 0 36px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  line-height: 1.75;
  opacity: 0;
  animation: heroEntrance var(--transition-duration-entrance, 500ms)
    var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;
  animation-delay: 600ms;
}

.login-hero__features {
  display: grid;
  gap: 14px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.login-hero__feature {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 13px;
  letter-spacing: 0.01em;
  opacity: 0;
  animation: heroEntrance var(--transition-duration-entrance, 500ms)
    var(--transition-ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;
}

.login-hero__feature svg {
  flex-shrink: 0;
  opacity: 0.6;
}
</style>
