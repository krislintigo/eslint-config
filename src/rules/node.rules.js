export const NODE_RULES = {
  // NODE
  'n/no-missing-import': 'off', // resolution handled by TypeScript / import-x
  'n/no-unsupported-features/es-syntax': 'off', // TypeScript transpiles modern syntax
  'n/no-unpublished-import': 'off', // config/build files routinely import devDependencies
}
