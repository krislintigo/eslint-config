import type { Linter } from 'eslint'

/** Runtime global variable sets available for generated ESLint configs. */
export type RuntimeGlobals = 'browser' | 'node' | 'mixed'

/** Options for creating the shared ESLint flat config. */
export interface CreateConfigOptions {
  /**
   * Absolute path to the project root used by typescript-eslint's project service.
   *
   * In an `eslint.config.js` file this is usually `import.meta.dirname`.
   */
  tsconfigRootDir?: string

  /**
   * Runtime globals exposed to linted files.
   *
   * Use `browser` for browser-only projects, `node` for server/tooling projects,
   * and `mixed` when both browser and Node.js globals are expected.
   *
   * @defaultValue 'node'
   */
  globals?: RuntimeGlobals

  /**
   * Glob patterns matched by the main type-aware TypeScript config block.
   *
   * @defaultValue /.ts glob
   */
  files?: string[]

  /**
   * Glob patterns ignored by ESLint before applying the generated config.
   *
   * @defaultValue dist, node_modules glob
   */
  ignores?: string[]

  /**
   * Additional flat config presets to append to the main config block's `extends`.
   *
   * This is useful for framework presets that should share the same files,
   * parser options, globals, settings, and base rule overrides.
   */
  extraExtends?: Linter.Config[]

  /**
   * Additional rules merged into the main config block after the built-in rules.
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
 * typescript-eslint rules, import rules, SonarJS rules, and Prettier compatibility.
 */
export declare const createConfig: (options?: CreateConfigOptions) => Linter.Config[]
