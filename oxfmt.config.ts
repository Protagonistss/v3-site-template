import ithinku from '@ithinku/oxfmt-config'
import { defineConfig } from 'oxfmt'

// 共享格式化规则来自 @ithinku/oxfmt-config，项目只追加本地产物目录
export default defineConfig({
  ...ithinku,
  ignorePatterns: [
    ...ithinku.ignorePatterns,
    'playwright-report/**',
    'test-results/**',
    '.pnpm-store/**'
  ]
})
