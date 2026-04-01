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

Node 版本要求：`^20.19.0 || >=22.12.0`

Sass 运行时：`sass-embedded`，在 Vite 8 下默认走 modern compiler API。

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
├─ styles/     # 样式入口与基础样式
├─ theme/      # 品牌主题单一源与 CSS 变量生成
└─ types/      # 全局类型声明
```

## 运行命令

- `pnpm dev` 启动开发环境
- `pnpm build` 类型检查并打包
- `pnpm lint` 执行 ESLint
- `pnpm test:unit` 执行 Vitest
- `pnpm test:e2e` 执行 Playwright

## 环境变量约定

- `.env`、`.env.development`、`.env.production`、`.env.staging` 用于团队共享的环境配置，可以提交到仓库
- `.env.local`、`.env.development.local`、`.env.production.local` 等本地覆盖文件仅供个人使用，不提交到仓库
- 前端暴露变量统一使用 `VITE_` 前缀，当前项目使用：
  - `VITE_APP_TITLE` 应用标题
  - `VITE_API_BASE_URL` 接口基础地址
  - `VITE_ENABLE_MOCK` 是否启用 Mock
- 不要在可提交的 `.env*` 文件中存放密钥、令牌、密码等敏感信息

## 默认账号

当 `VITE_ENABLE_MOCK=true` 时，可直接使用：

- 管理员：`admin / 123456`
- 运营：`editor / 123456`
