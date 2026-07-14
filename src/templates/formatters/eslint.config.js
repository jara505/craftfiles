import prettier from 'eslint-config-prettier'

export default [
  prettier,
  {
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['warn', 'multi-line'],
      'no-duplicate-imports': 'error',
      'no-undef': 'error',
      'no-redeclare': 'error',
      'no-unreachable': 'error',
    },
  },
  {
    ignores: ['dist/', 'node_modules/'],
  },
]
