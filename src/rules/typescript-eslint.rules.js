export const TYPESCRIPT_ESLINT_RULES = {
  // TYPESCRIPT
  'class-method-use-this': 'off',
  'default-param-last': 'off',
  'dot-notation': 'off',
  'max-params': 'off',
  'no-empty-function': 'off',
  'no-loop-func': 'off',
  // 'no-magic-numbers': 'off', // TODO: just think about it
  'no-restricted-imports': 'off',
  'no-shadow': 'off',
  'no-unused-private-class-members': 'off',
  'no-use-before-define': 'off',

  '@typescript-eslint/array-type': ['error', { default: 'generic', readonly: 'generic' }],
  '@typescript-eslint/ban-ts-comment': [
    'error',
    {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': true,
      'ts-nocheck': true,
      'ts-check': true,
      minimumDescriptionLength: 10,
    },
  ],
  '@typescript-eslint/class-methods-use-this': [
    'error',
    {
      ignoreOverrideMethods: true,
      ignoreClassesThatImplementAnInterface: true,
    },
  ],
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    {
      arrayLiteralTypeAssertions: 'never',
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'never',
    },
  ],
  '@typescript-eslint/consistent-type-exports': 'error',
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      disallowTypeAnnotations: true,
      fixStyle: 'separate-type-imports',
      prefer: 'type-imports',
    },
  ],
  '@typescript-eslint/default-param-last': 'error',
  '@typescript-eslint/dot-notation': 'error',
  // '@typescript-eslint/explicit-function-return-type': 'error', // TODO: consider enabling?
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {
      accessibility: 'explicit',
      overrides: {
        constructors: 'no-public',
      },
    },
  ],
  // '@typescript-eslint/explicit-module-boundary-types': 'error', // TODO: consider enabling?
  '@typescript-eslint/max-params': ['error', { max: 4 }],
  // '@typescript-eslint/member-ordering': 'error', // TODO: consider partial enabling?
  '@typescript-eslint/method-signature-style': 'error',
  // '@typescript-eslint/naming-convention': 'error', // TODO: consider rules list
  '@typescript-eslint/no-base-to-string': ['error', { checkUnknown: true }],
  '@typescript-eslint/no-empty-function': [
    'error',
    {
      allow: [
        'constructors',
        'protected-constructors',
        'private-constructors',
        'decoratedFunctions',
        'overrideMethods',
      ],
    },
  ],
  '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
  '@typescript-eslint/no-extraneous-class': 'error',
  '@typescript-eslint/no-import-type-side-effects': 'error',
  '@typescript-eslint/no-inferrable-types': [
    'error',
    {
      ignoreParameters: true,
      ignoreProperties: false,
    },
  ],
  '@typescript-eslint/no-loop-func': 'error',
  // '@typescript-eslint/no-magic-numbers': 'error', // TODO: just think about it
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': [
    'error',
    {
      allowComparingNullableBooleansToFalse: false,
      allowComparingNullableBooleansToTrue: false,
    },
  ],
  '@typescript-eslint/no-unnecessary-condition': [
    'error',
    {
      allowConstantLoopConditions: 'only-allowed-literals',
      checkTypePredicates: true,
    },
  ],
  '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
  '@typescript-eslint/no-unnecessary-qualifier': 'error',
  '@typescript-eslint/no-unnecessary-type-assertion': [
    'error',
    { checkLiteralConstAssertions: true },
  ],
  '@typescript-eslint/no-unsafe-type-assertion': 'error',
  '@typescript-eslint/no-unused-private-class-members': 'error',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      args: 'all',
      ignoreRestSiblings: true,
      argsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/no-use-before-define': [
    'error',
    {
      functions: false,
      classes: true,
      variables: true,
      allowNamedExports: false,
      enums: true,
      typedefs: false,
      ignoreTypeReferences: true,
    },
  ],
  '@typescript-eslint/no-useless-empty-export': 'error',
  '@typescript-eslint/parameter-properties': ['error', { prefer: 'parameter-property' }],
  '@typescript-eslint/prefer-enum-initializers': 'error',
  '@typescript-eslint/prefer-readonly': 'error',
  // '@typescript-eslint/prefer-readonly-parameter-types': 'error', // TODO: consider enabling in libraries?
  '@typescript-eslint/promise-function-async': ['error', { allowAny: true }], // TODO: just think about it
  '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: false }],
  '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
  '@typescript-eslint/strict-boolean-expressions': [
    'error',
    {
      allowAny: false,
      allowNullableBoolean: false,
      allowNullableEnum: false,
      allowNullableNumber: false,
      allowNullableObject: true,
      allowNullableString: false,
      allowNumber: false,
      allowString: true,
    },
  ],
  '@typescript-eslint/strict-void-return': 'error',
  '@typescript-eslint/switch-exhaustiveness-check': [
    'error',
    {
      allowDefaultCaseForExhaustiveSwitch: false,
      considerDefaultExhaustiveForUnions: false,
      requireDefaultForNonUnion: true,
    },
  ],
}
