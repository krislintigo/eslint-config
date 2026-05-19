import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginImportX from 'eslint-plugin-import-x'
import sonarjs from 'eslint-plugin-sonarjs'
import globalsPackage from 'globals'
import tseslint from 'typescript-eslint'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

import { TYPESCRIPT_ESLINT_RULES } from './rules/typescript-eslint.rules.js'
import { IMPORT_RULES } from './rules/import.rules.js'

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
      extends: [
        pluginJs.configs.recommended,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
        pluginImportX.flatConfigs.recommended,
        pluginImportX.flatConfigs.typescript,
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

        // SONAR
        'sonarjs/no-implicit-dependencies': 'error',
        'sonarjs/todo-tag': 'warn',

        ...extraRules,
      },
    },

    ...extraConfigs,

    eslintConfigPrettier,
  )
}
