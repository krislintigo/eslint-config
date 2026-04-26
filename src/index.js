import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import sonarjs from 'eslint-plugin-sonarjs'
import globalsPackage from 'globals'
import tseslint from 'typescript-eslint'

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
    {
      ignores,
    },

    {
      files,
      extends: [
        pluginJs.configs.recommended,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
        pluginImport.flatConfigs.recommended,
        pluginImport.flatConfigs.typescript,
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
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json',
          },
          node: true,
        },
      },
      rules: {
        // IMPORT
        'import/no-unresolved': 'error',
        'import/no-duplicates': 'error',
        'import/newline-after-import': 'error',
        'import/order': [
          'warn',
          {
            groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],

        // TYPESCRIPT
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allowNumber: true,
            allowBoolean: true,
            allowAny: false,
            allowNullish: true,
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            disallowTypeAnnotations: false,
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],

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
