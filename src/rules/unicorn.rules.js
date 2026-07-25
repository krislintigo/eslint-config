export const UNICORN_RULES = {
  // UNICORN
  'unicorn/comment-content': ['warn', { checkUniformCase: false }], // TODO: check if required
  // 'unicorn/consistent-boolean-name': ['error', { checkProperties: true }], // TODO: should check properties?
  'unicorn/consistent-class-member-order': [
    'error',
    {
      order: [
        'static-block',
        'static-field',
        'static-method',
        'public-field',
        'private-field',
        'constructor',
        'public-method',
        'private-method',
      ],
    },
  ],
  'unicorn/consistent-function-style': [
    'error',
    {
      namedFunctions: 'declaration',
      namedExports: 'declaration',
      callbacks: 'arrow-function',
      objectProperties: 'ignore', // TODO: method vs arrow
      reassignedVariables: 'arrow-function',
      typedVariables: 'arrow-function',
    },
  ],
  'unicorn/custom-error-definition': 'error',
  'unicorn/isolated-functions': 'off', // TODO: consider enabling when example is found
  'unicorn/name-replacements': 'off', // TODO: consider enabling with allowList
  'unicorn/no-array-front-mutation': 'warn',
  'unicorn/no-invalid-file-input-accept': 'error',
  'unicorn/no-manually-wrapped-comments': 'error',
  // 'unicorn/no-missing-local-resource': 'error', // TODO: consider enabling
  'unicorn/no-null': 'off',
  'unicorn/no-negated-comparison': ['error', { checkLogicalExpressions: true }],
  // 'unicorn/prefer-dispose': 'error' // TODO: maybe enable when ready
  // 'unicorn/prefer-dom-node-html-methods': 'error' // TODO: enable when setHTML available
  'unicorn/prefer-error-is-error': 'error',
  // 'unicorn/prefer-explicit-viewport-units': 'error', // TODO: enable after css clarification
  // 'unicorn/prefer-short-arrow-method': 'error', // TODO: consider enabling
  'unicorn/prefer-temporal': 'off', // TODO: enable (with options) when ready
  'unicorn/require-post-message-target-origin': 'error',
}
