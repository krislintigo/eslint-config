import type { Linter } from 'eslint'

export type RuntimeGlobals = 'browser' | 'node' | 'mixed'

export interface CreateConfigOptions {
  tsconfigRootDir?: string
  globals?: RuntimeGlobals
  files?: string[]
  ignores?: string[]
  extraExtends?: Linter.Config[]
  extraRules?: Linter.RulesRecord
  extraConfigs?: Linter.Config[]
}

export declare const createConfig: (options?: CreateConfigOptions) => Linter.Config[]
