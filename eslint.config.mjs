import vueConfig from '@ithinku/eslint-config-vue'

export default [
  ...vueConfig,
  {
    ignores: ['playwright-report/**', 'test-results/**']
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-undef-components': 'off',
      'vue/component-name-in-template-casing': 'off',
      'vue/define-macros-order': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/html-indent': 'off'
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      'import/order': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      'require-await': 'off',
      'promise/no-promise-in-callback': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prefer-dom-node-dataset': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prefer-at': 'off',
      'unicorn/no-negated-condition': 'off',
      'unicorn/prefer-export-from': 'off',
      'unicorn/explicit-length-check': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/no-useless-promise-resolve-reject': 'off',
      'unicorn/prefer-string-replace-all': 'off',
      'unicorn/relative-url-style': 'off'
    }
  },
  {
    files: ['src/**/*.ts', 'src/**/*.vue'],
    ignores: ['src/ui/**'],
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
  }
]
