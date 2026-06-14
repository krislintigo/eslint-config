import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginImportX from 'eslint-plugin-import-x'
import sonarjs from 'eslint-plugin-sonarjs'
import globalsPackage from 'globals'
import tseslint from 'typescript-eslint'
import pluginUnicorn from 'eslint-plugin-unicorn'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

import { TYPESCRIPT_ESLINT_RULES } from './rules/typescript-eslint.rules.js'
import { IMPORT_RULES } from './rules/import.rules.js'
import { UNICORN_RULES } from './rules/unicorn.rules.js'

export { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

const globalsMap = {
  browser: globalsPackage.browser,
  node: globalsPackage.node,
  mixed: {
    ...globalsPackage.browser,
    ...globalsPackage.node,
  },
}

export const createConfig = (options = {}) => {
  const {
    tsconfigRootDir,
    globals = 'node',
    files = ['**/*.ts'],
    ignores = ['**/dist/**', '**/node_modules/**'],
    extraExtends = [],
    extraRules = {},
    extraConfigs = [],
  } = options

  return tseslint.config(
    { ignores },

    {
      files,
      plugins: {
        unicorn: pluginUnicorn,
      },
      extends: [
        pluginJs.configs.recommended,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
        pluginImportX.flatConfigs.recommended,
        pluginImportX.flatConfigs.typescript,
        pluginUnicorn.configs.recommended,
        sonarjs.configs.recommended,
        ...extraExtends,
      ],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: globalsMap[globals] ?? globalsMap.node,
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
          parser: tseslint.parser,
        },
      },
      settings: {
        'import-x/resolver-next': [createTypeScriptImportResolver({ alwaysTryTypes: true })],
      },
      rules: {
        ...TYPESCRIPT_ESLINT_RULES,
        ...IMPORT_RULES,
        ...UNICORN_RULES,

        'no-warning-comments': [
          'warn',
          {
            terms: ['todo', 'fixme', 'xxx'],
            location: 'start',
          },
        ],

        // SONAR
        'sonarjs/no-implicit-dependencies': 'error',
        'sonarjs/todo-tag': 'off',

        ...extraRules,
      },
    },

    ...extraConfigs,

    eslintConfigPrettier,

    // Re-enable some rules that turned off by prettier
    {
      files,
      rules: {
        curly: 'error',
        'unicorn/template-indent': [
          'error',
          {
            tags: ['outdent', 'dedent', 'sql', 'styled'],
            functions: ['dedent', 'stripIndent'],
            selectors: [],
            comments: ['indent'],
          },
        ],
        'vue/html-self-closing': ['error', {
          html: {
            'void': 'always',
            'normal': 'always',
            'component': 'always',
          },
          svg: 'always',
          math: 'always',
        }],
      }
    }
  )
}
