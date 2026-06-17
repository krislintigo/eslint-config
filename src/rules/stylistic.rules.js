export const STYLISTIC_RULES = {
  // TODO: check jsx rules
  '@stylistic/jsx-curly-brace-presence': [
    'error',
    {
      props: 'never',
      children: 'never',
      propElementValues: 'always',
    },
  ],
  '@stylistic/jsx-function-call-newline': 'error',
  '@stylistic/jsx-pascal-case': 'error',
  // '@stylistic/jsx-props-style': 'off' // TODO: consider enabling when stable
  '@stylistic/jsx-self-closing-comp': ['error', { component: true, html: true }],
  '@stylistic/jsx-shorthand-boolean': 'error',
  '@stylistic/jsx-shorthand-fragment': 'error',
  '@stylistic/lines-between-class-members': [
    'error',
    'always',
    {
      exceptAfterSingleLine: true,
      exceptAfterOverload: true,
    },
  ],
  // '@stylistic/list-style': 'off' // TODO: consider enabling when stable
  '@stylistic/multiline-comment-style': ['error', 'separate-lines'],
  '@stylistic/padding-line-between-statements': [
    'error',
    // declarations
    { blankLine: 'always', prev: '*', next: ['const', 'let'] },
    { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },

    // functions/classes as semantic blocks
    { blankLine: 'always', prev: '*', next: ['function', 'class'] },
    { blankLine: 'always', prev: ['function', 'class'], next: '*' },

    // control flow blocks
    { blankLine: 'always', prev: '*', next: ['if', 'for', 'while', 'switch', 'try'] },
    { blankLine: 'always', prev: ['if', 'for', 'while', 'switch', 'try'], next: '*' },

    // exits
    { blankLine: 'always', prev: '*', next: ['return', 'throw', 'break', 'continue'] },

    // exports
    { blankLine: 'always', prev: '*', next: 'export' },
  ],
  '@stylistic/spaced-comment': [
    'error',
    'always',
    {
      line: {
        markers: ['/'],
      },
      block: {
        balanced: true,
        markers: ['!'],
        exceptions: ['*'],
      },
    },
  ],
}
