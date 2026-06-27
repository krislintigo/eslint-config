export const NODE_RULES = {
  // NODE
  'n/no-missing-import': 'off', // resolution handled by TypeScript / import-x
  'n/no-process-env': 'error',
  // 'n/no-sync': 'error', // TODO: consider enabling
  'n/no-unsupported-features/es-syntax': 'off', // TypeScript transpiles modern syntax
  'n/no-unpublished-import': 'off', // config/build files routinely import devDependencies
  'n/prefer-global/buffer': ['error', 'always'],
  'n/prefer-global/console': ['error', 'always'],
  'n/prefer-global/crypto': ['error', 'always'],
  'n/prefer-global/process': ['error', 'always'],
  'n/prefer-global/text-decoder': ['error', 'always'],
  'n/prefer-global/text-encoder': ['error', 'always'],
  'n/prefer-global/timers': ['error', 'always'],
  'n/prefer-global/url': ['error', 'always'],
  'n/prefer-global/url-search-params': ['error', 'always'],
  'n/prefer-node-protocol': 'error',
  'n/prefer-promises/dns': 'error',
  'n/prefer-promises/fs': 'error',
}
