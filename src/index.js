import { defineConfig } from 'eslint/config'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginImportX from 'eslint-plugin-import-x'
import pluginStylistic from '@stylistic/eslint-plugin'
import pluginNode from 'eslint-plugin-n'
import eslintConfigPrettier from 'eslint-config-prettier'
import globalsPackage from 'globals'

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

import { ESLINT_RULES } from './rules/eslint.rules.js'
import { TYPESCRIPT_ESLINT_RULES } from './rules/typescript-eslint.rules.js'
import { UNICORN_RULES } from './rules/unicorn.rules.js'
import { IMPORT_RULES } from './rules/import.rules.js'
import { STYLISTIC_RULES } from './rules/stylistic.rules.js'
import { NODE_RULES } from './rules/node.rules.js'

export { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

const globalsMap = {
  browser: globalsPackage.browser,
  node: globalsPackage.node,
}

const DEFAULT_ENVIRONMENTS = [{ files: ['**/*.ts'], env: 'node' }]

export const createConfig = (options = {}) => {
  const {
    tsconfigRootDir,
    environments = DEFAULT_ENVIRONMENTS,
    ignores = ['**/dist/**', '**/node_modules/**'],
    presets = [],
    extraExtends = [],
    extraRules = {},
    extraConfigs = [],
  } = options

  // Build one main config block per environment, each scoped to its own globs.
  // eslint-plugin-n targets the Node.js runtime, so it is included only for
  // `node` environments and skipped for browser ones. This also keeps
  // `languageOptions.globals` narrow and explicit per glob.
  const mainConfigs = environments.map(({ files, env }) => {
    const isNodeEnv = env === 'node'

    return {
      files,
      plugins: {
        '@stylistic': pluginStylistic,
      },
      extends: [
        pluginJs.configs.recommended,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
        pluginImportX.flatConfigs.recommended,
        pluginImportX.flatConfigs.typescript,
        pluginUnicorn.configs.recommended,

        ...(isNodeEnv ? [pluginNode.configs['flat/recommended-module']] : []),

        ...extraExtends,
      ],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: globalsMap[env] ?? globalsMap.node,
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
        ...ESLINT_RULES,
        ...TYPESCRIPT_ESLINT_RULES,
        ...IMPORT_RULES,
        ...UNICORN_RULES,
        ...STYLISTIC_RULES,

        ...(isNodeEnv ? NODE_RULES : {}),

        ...extraRules,
      },
    }
  })

  // Files covered by any environment, used for environment-agnostic blocks.
  const allFiles = environments.flatMap(({ files }) => files)

  return defineConfig(
    { ignores },

    ...mainConfigs,

    ...extraConfigs,

    eslintConfigPrettier,

    // Re-enable some rules that turned off by prettier
    {
      files: allFiles,
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
        ...(presets.includes('vue') && {
          'vue/html-self-closing': [
            'error',
            {
              html: {
                void: 'always',
                normal: 'always',
                component: 'always',
              },
              svg: 'always',
              math: 'always',
            },
          ],
        }),
      },
    },
  )
}
