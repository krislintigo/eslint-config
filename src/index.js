import { defineConfig } from 'eslint/config'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginImportX from 'eslint-plugin-import-x'
import pluginStylistic from '@stylistic/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import globalsPackage from 'globals'

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

import { ESLINT_RULES } from './rules/eslint.rules.js'
import { TYPESCRIPT_ESLINT_RULES } from './rules/typescript-eslint.rules.js'
import { UNICORN_RULES } from './rules/unicorn.rules.js'
import { IMPORT_RULES } from './rules/import.rules.js'
import { STYLISTIC_RULES } from './rules/stylistic.rules.js'

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

  return defineConfig(
    { ignores },

    {
      files,
      plugins: {
        '@stylistic': pluginStylistic,
        unicorn: pluginUnicorn,
      },
      extends: [
        pluginJs.configs.recommended,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
        pluginImportX.flatConfigs.recommended,
        pluginImportX.flatConfigs.typescript,
        pluginUnicorn.configs.recommended,
        ...extraExtends,
      ],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: globalsMap[globals] ?? globalsMap.node,
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
      settings: {
        'import-x/resolver-next': [createTypeScriptImportResolver({ alwaysTryTypes: true })],
      },
      rules: {
        ...ESLINT_RULES,
        ...TYPESCRIPT_ESLINT_RULES,
        ...IMPORT_RULES,
        ...UNICORN_RULES,
        ...STYLISTIC_RULES,

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
        '@stylistic/no-tabs': 'error',
        'unicorn/template-indent': [
          'error',
          {
            tags: ['outdent', 'dedent', 'sql', 'styled'],
            functions: ['dedent', 'stripIndent'],
            selectors: [],
            comments: ['indent'],
          },
        ],
        // 'vue/html-self-closing': ['error', { // TODO: enable
        //   html: {
        //     'void': 'always',
        //     'normal': 'always',
        //     'component': 'always',
        //   },
        //   svg: 'always',
        //   math: 'always',
        // }],
      }
    }
  )
}
