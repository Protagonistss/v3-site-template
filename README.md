# Vue 3 Admin Starter

面向生产环境的 Vue 3 中后台脚手架。状态用 Pinia 4，界面通过 `src/ui` 适配层访问 Naive UI，权限、主题和请求层都有独立边界。

Node `^20.19.0 || >=22.12.0` · 包管理器 pnpm 9

## 技术栈

| 层 | 选型 |
| --- | --- |
| 运行时 | Vue 3.5 · Vue Router 4 · Pinia 4 |
| 构建 | Vite 8 · TypeScript · `sass-embedded`（modern compiler） |
| 界面 | Naive UI，业务代码只经过 `src/ui` |
| 质量 | Oxlint · oxfmt · vue-tsc · Vitest · Playwright |
| 规范 | `@ithinku/oxlint-config` · `@ithinku/oxfmt-config` · `@ithinku/tsconfig` |

## 快速开始

```bash
pnpm install
pnpm dev
```

开发服务默认在 `http://localhost:5173`。Mock 开启时可用：

| 角色 | 账号 |
| --- | --- |
| 管理员 | `admin` / `123456` |
| 运营 | `editor` / `123456` |

## 命令

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 启动开发服务 |
| `pnpm build` | 类型检查后打包 |
| `pnpm preview` | 预览构建产物 |
| `pnpm typecheck` | 只跑 `vue-tsc` |
| `pnpm lint` | Oxlint |
| `pnpm lint:fix` | Oxlint 并自动修复 |
| `pnpm format` | oxfmt 写回 |
| `pnpm format:check` | oxfmt 只检查 |
| `pnpm test:unit` | Vitest |
| `pnpm test:e2e` | Playwright |

## 目录

```text
src/
├─ app/        启动、路由守卫、全局异常
├─ modules/    按业务切分的页面、接口和路由
├─ layouts/    默认壳与空白壳
├─ ui/         Naive UI 适配层，业务代码的唯一 UI 入口
├─ theme/      品牌色与 CSS 变量
├─ stores/     Pinia
├─ router/     静态路由与动态路由装配
├─ shared/     请求、权限、通用组件
└─ styles/     全局样式
```

业务模块放在 `src/modules/<name>/`，自行提供 `routes`、`api` 和页面。组件库引用留在 `src/ui`，Oxlint 会拦住 `src/ui` 以外对 `naive-ui`、`element-plus` 的直接导入。

## 环境变量

共享配置：`.env`、`.env.development`、`.env.production`、`.env.staging`。  
个人覆盖：`.env.local` 及 `*.local`，不提交。不要把密钥放进可提交的 `.env*`。

| 变量 | 作用 |
| --- | --- |
| `VITE_APP_TITLE` | 应用标题 |
| `VITE_APP_BASE` | 部署基础路径，默认 `/` |
| `VITE_API_BASE_URL` | 接口前缀，默认 `/api` |
| `VITE_ENABLE_MOCK` | `true` 时启用 Mock |
