# @krislintigo/eslint-config

Shared ESLint flat config for TypeScript projects.

## Install

```sh
pnpm add -D @krislintigo/eslint-config eslint typescript
```

The package includes its ESLint plugin dependencies. `eslint` and `typescript` are peer dependencies and should be installed in each project that uses the config.

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
- `eslint-plugin-import` recommended TypeScript import rules.
- `eslint-plugin-sonarjs` recommended rules.
- `eslint-config-prettier` as the final config block.

## Options

```ts
type RuntimeGlobals = 'browser' | 'node' | 'mixed'

interface CreateConfigOptions {
  tsconfigRootDir?: string
  globals?: RuntimeGlobals
  files?: string[]
  ignores?: string[]
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

### `globals`

Runtime globals exposed to linted files.

Default: `'node'`.

Available values:

- `'node'` for Node.js projects.
- `'browser'` for browser projects.
- `'mixed'` for projects that expect both browser and Node.js globals.

### `files`

Glob patterns matched by the main type-aware config block.

Default:

```js
['**/*.ts']
```

### `ignores`

Glob patterns ignored before the main config is applied.

Default:

```js
['**/dist/**', '**/node_modules/**']
```

### `extraExtends`

Additional flat config presets appended to the main config block's `extends`.

Use this when a framework preset should share the same files, parser options, globals, resolver settings and base rules.

```js
export default createConfig({
  tsconfigRootDir: import.meta.dirname,
  extraExtends: [frameworkPreset],
})
```

### `extraRules`

Additional rules merged into the main config block after the package defaults.

Use this to override or extend the shared rule set:

```js
export default createConfig({
  tsconfigRootDir: import.meta.dirname,
  extraRules: {
    'sonarjs/todo-tag': 'off',
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
        'sonarjs/no-implicit-dependencies': 'off',
      },
    },
  ],
})
```

## Releases

Releases are automated with semantic-release from the `main` branch.

Use Conventional Commits:

- `fix:` publishes a patch release.
- `feat:` publishes a minor release.
- `feat!:` or `BREAKING CHANGE:` publishes a major release.

GitHub Actions requires an `NPM_TOKEN` repository secret with publish access. `GITHUB_TOKEN` is provided by Actions.
