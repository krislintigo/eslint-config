import type { Linter } from 'eslint'

export { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

/** Runtime global variable sets available for generated ESLint configs. */
export type RuntimeGlobals = 'browser' | 'node'

/**
 * A single development environment within the project.
 *
 * Each environment becomes its own main config block, scoped to `files` and
 * wired up for the given runtime `env`.
 */
export interface Environment {
  /** Glob patterns matched by this environment's main config block. */
  files: string[]

  /**
   * Runtime this environment targets.
   *
   * Drives `languageOptions.globals` and whether `eslint-plugin-n` is applied:
   * it is included for `node` and skipped for `browser`.
   */
  env: RuntimeGlobals
}

/**
 * Project-dependent presets that enable rules for plugins supplied by the
 * consuming project (e.g. `eslint-plugin-vue`), which are not bundled here.
 */
export type ConfigPreset = 'vue'

/** Options for creating the shared ESLint flat config. */
export interface CreateConfigOptions {
  /**
   * Absolute path to the project root used by typescript-eslint's project service.
   *
   * In an `eslint.config.js` file this is usually `import.meta.dirname`.
   */
  tsconfigRootDir?: string

  /**
   * Development environments that make up the project.
   *
   * Each entry produces its own main config block scoped to its `files`, with
   * globals and `eslint-plugin-n` selected from its `env`. This is what enables
   * per-package runtime splits in a monorepo (e.g. a browser app and a Node.js
   * server in one config), each with narrow, explicit globals.
   *
   * @defaultValue [{ files: ['**\/*.ts'], env: 'node' }]
   */
  environments?: Environment[]

  /**
   * Glob patterns ignored by ESLint before applying the generated config.
   *
   * @defaultValue dist, node_modules glob
   */
  ignores?: string[]

  /**
   * Project-dependent presets to enable.
   *
   * Each preset turns on rules for a plugin the consuming project provides on
   * its own (this config does not bundle those plugins). For example, `'vue'`
   * enables `vue/html-self-closing`; the project is still responsible for
   * adding `eslint-plugin-vue` itself, usually via `extraExtends`.
   *
   * @defaultValue []
   */
  presets?: ConfigPreset[]

  /**
   * Additional flat config presets to append to every environment's `extends`.
   *
   * This is useful for framework presets that should share the same files,
   * parser options, globals, settings, and base rule overrides.
   */
  extraExtends?: Linter.Config[]

  /**
   * Additional rules merged into every environment's config block after the
   * built-in rules.
   *
   * Values here override the package defaults when rule names overlap.
   */
  extraRules?: Linter.RulesRecord

  /**
   * Additional flat config objects appended.
   *
   * Use this for file-specific overrides, framework-only blocks, or project
   * exceptions that should still run.
   */
  extraConfigs?: Linter.Config[]
}

/**
 * Creates the shared ESLint flat config for TypeScript projects.
 *
 * The returned config includes ESLint recommended rules, strict type-checked
 * typescript-eslint rules, import rules, unicorn rules, Node.js rules
 * (`eslint-plugin-n`, for node environments), and Prettier compatibility.
 */
export declare const createConfig: (options?: CreateConfigOptions) => Linter.Config[]
