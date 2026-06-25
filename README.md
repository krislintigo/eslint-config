# @krislintigo/eslint-config

Shared ESLint flat config for TypeScript projects.

## Install

```sh
pnpm add -D @krislintigo/eslint-config eslint typescript
```

The package includes its ESLint plugin dependencies. `eslint` and `typescript` are peer dependencies and should be installed in each project that uses the config.

Requires ESLint 10.0.0 or newer.

## Usage

Create `eslint.config.js`:

```js
import { createConfig } from '@krislintigo/eslint-config'

export default createConfig({
  tsconfigRootDir: import.meta.dirname,
})
```

The config is type-aware by default and expects a `tsconfig.json` in the project root.

## Included Rules

The generated config combines:

- ESLint recommended JavaScript rules.
- Strict and stylistic type-checked `typescript-eslint` rules.
- `eslint-plugin-import-x` recommended TypeScript import rules.
- `eslint-plugin-unicorn` recommended rules.
- `eslint-plugin-n` recommended rules (Node.js environments only — see `environments`).
- `eslint-config-prettier` as the final config block.

## Options

```ts
type RuntimeGlobals = 'browser' | 'node'

interface Environment {
  files: string[]
  env?: RuntimeGlobals
}

type ConfigPreset = 'vue'

interface CreateConfigOptions {
  tsconfigRootDir?: string
  environments?: Environment[]
  ignores?: string[]
  presets?: ConfigPreset[]
  extraExtends?: Linter.Config[]
  extraRules?: Linter.RulesRecord
  extraConfigs?: Linter.Config[]
}
```

### `tsconfigRootDir`

Absolute path to the project root used by `typescript-eslint`'s project service.

In `eslint.config.js`, pass `import.meta.dirname`:

```js
export default createConfig({
  tsconfigRootDir: import.meta.dirname,
})
```

### `environments`

The development environments that make up the project. Each entry produces its
own main config block, scoped to its `files`, with globals and `eslint-plugin-n`
selected from its `env`.

Default:

```js
[{ files: ['**/*.ts'], env: 'node' }]
```

Each entry:

- `files` — glob patterns matched by this environment's config block.
- `env` — the runtime it targets (default `'node'`):
  - `'node'` for Node.js code.
  - `'browser'` for browser code.

`env` drives both `languageOptions.globals` and the runtime split for
`eslint-plugin-n`: its rules are applied for `'node'` and skipped for
`'browser'`.

This is what makes monorepos work — a browser app and a Node.js server can be
linted by a single config, each with narrow, explicit globals:

```js
export default createConfig({
  tsconfigRootDir: import.meta.dirname,
  environments: [
    { files: ['apps/web/**/*.ts'], env: 'browser' },
    { files: ['apps/server/**/*.ts', 'tooling/**/*.ts'], env: 'node' },
  ],
})
```

### `presets`

Project-dependent presets that enable rules for plugins the consuming project
supplies itself. This config does not bundle those plugins — a preset is just
the marker that the corresponding rules should be turned on.

Default: `[]`.

Available presets:

- `'vue'` — enables `vue/html-self-closing` for `**/*.vue` files. The project
  must still add `eslint-plugin-vue` itself (usually via `extraExtends`).

```js
import { createConfig } from '@krislintigo/eslint-config'
import pluginVue from 'eslint-plugin-vue'

export default createConfig({
  tsconfigRootDir: import.meta.dirname,
  environments: [{ files: ['**/*.ts', '**/*.vue'], env: 'browser' }],
  presets: ['vue'],
  extraExtends: [...pluginVue.configs['flat/recommended']],
})
```

### `ignores`

Glob patterns ignored before the main config is applied.

Default:

```js
['**/dist/**', '**/node_modules/**']
```

### `extraExtends`

Additional flat config presets appended to every environment's `extends`.

Use this when a framework preset should share the same files, parser options, globals, resolver settings and base rules.

```js
export default createConfig({
  tsconfigRootDir: import.meta.dirname,
  extraExtends: [frameworkPreset],
})
```

### `extraRules`

Additional rules merged into every environment's config block after the package defaults.

Use this to override or extend the shared rule set:

```js
export default createConfig({
  tsconfigRootDir: import.meta.dirname,
  extraRules: {
    'unicorn/prevent-abbreviations': 'off',
  },
})
```

### `extraConfigs`

Additional flat config objects appended before `eslint-config-prettier`.

Use this for file-specific overrides:

```js
export default createConfig({
  tsconfigRootDir: import.meta.dirname,
  extraConfigs: [
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
})
```
