# @krislintigo/eslint-config

Shared ESLint flat config for TypeScript projects.

## Install

```sh
pnpm add -D @krislintigo/eslint-config eslint typescript
```

Install the peer ESLint packages used by the config:

```sh
pnpm add -D @eslint/js eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-sonarjs globals typescript-eslint
```

## Usage

Create `eslint.config.js`:

```js
import { createConfig } from '@krislintigo/eslint-config'

export default createConfig({
  tsconfigRootDir: import.meta.dirname,
})
```

The config is type-aware by default and expects a `tsconfig.json` in the project root.

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

## Releases

Releases are automated with semantic-release from the `main` branch.

Use Conventional Commits:

- `fix:` publishes a patch release.
- `feat:` publishes a minor release.
- `feat!:` or `BREAKING CHANGE:` publishes a major release.

GitHub Actions requires an `NPM_TOKEN` repository secret with publish access. `GITHUB_TOKEN` is provided by Actions.
