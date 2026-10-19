import ithinku from '@ithinku/oxlint-config'
import { defineConfig } from 'oxlint'

export default defineConfig({
  extends: [ithinku],
  ignorePatterns: [
    'dist/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    '.pnpm-store/**'
  ],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.vue'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'element-plus',
                message: '请通过 src/ui 适配层访问 UI 能力。'
              },
              {
                name: 'naive-ui',
                message: '请通过 src/ui 适配层访问 UI 能力。'
              }
            ]
          }
        ]
      }
    },
    {
      // UI 适配层是唯一允许直接依赖组件库的位置
      files: ['src/ui/**/*.ts', 'src/ui/**/*.vue'],
      rules: {
        'no-restricted-imports': 'off'
      }
    }
  ]
})
