# Vue 3 Admin Starter

一个面向生产环境的 Vue 3 中后台脚手架，默认提供：

- Vite + Vue 3 + TypeScript
- Pinia + Vue Router
- RBAC 路由守卫和按钮级权限指令
- Axios 请求层、Mock 数据目录、全局异常处理
- Vitest / Playwright 测试骨架

## 快速开始

```bash
pnpm install
pnpm dev
```

## 目录约定

```text
src/
├─ app/        # 启动编排
├─ config/     # 应用配置
├─ layouts/    # 布局壳
├─ modules/    # 业务模块
├─ plugins/    # 第三方注册
├─ router/     # 路由装配
├─ shared/     # 跨模块公共能力
├─ stores/     # 全局状态
├─ styles/     # 样式入口与设计令牌
└─ types/      # 全局类型声明
```

## 运行命令

- `pnpm dev` 启动开发环境
- `pnpm build` 类型检查并打包
- `pnpm lint` 执行 ESLint
- `pnpm test:unit` 执行 Vitest
- `pnpm test:e2e` 执行 Playwright

## 默认账号

当 `VITE_ENABLE_MOCK=true` 时，可直接使用：

- 管理员：`admin / 123456`
- 运营：`editor / 123456`
