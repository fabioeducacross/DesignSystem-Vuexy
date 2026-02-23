module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ['plugin:vue/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  plugins: ['prettier', 'import'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    semi: ['error', 'never'],
    'max-len': 'off',
    'linebreak-style': 'error',
    // camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }],
    camelcase: 'off',
    'arrow-parens': ['error', 'as-needed'],
    'vue/multiline-html-element-content-newline': 'error',
    'vue/order-in-components': 'off',
    'import/order': 'off', // recomendado off
    'class-methods-use-this': 'off', // recomendado error
    'prettier/prettier': 'error',
    'import/no-cycle': 'off', // recomendado error
    'no-param-reassign': 'off', // recomendado error
    'import/prefer-default-export': 'off', // recomandado error
    'import/no-dynamic-require': 'off', // recomendado error
    'global-require': 'off', // recomendado error
    'vue/no-mutating-props': 'off', // recomendado error
    'prefer-destructuring': 'off', // recomendado error
    'func-names': 'off', // recomendado error
    'vue/no-v-html': 'off', // recomendado error
    'vue/no-unused-components': 'off', // recomendado error
    'no-unused-vars': 'warn', // recomendado error
    'no-plusplus': 'off', // recomendado error
    'no-empty': 'off', // recomendado error
    'no-use-before-define': 'off', // recomendado error
    'no-useless-return': 'off', // recomendado error
    radix: 'off', // recomendado error
    'no-shadow': 'off', // recomendado error
    'vue/no-template-shadow': 'off', // recomendado warn
    'no-return-assign': 'off', // recomendado error
    'import/extensions': 'off', // recomendado error
    'consistent-return': 'off', // recomendado error
    'default-case': 'off', // recomendado error
    'vue/require-prop-types': 'off', // recomendado warn
    'vue/require-default-prop': 'off', // recomendado warn
    'vue/no-lone-template': 'off', // recomendado warn
    'no-bitwise': 'off', // recomendado off
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '*.config.js',
          '**/*.config.js',
          '**/scripts/**',
          '**/*.test.js',
          '**/*.spec.js',
          '**/tests/**',
        ],
      },
    ],
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'vue/no-v-model-argument': 'off',
  },
}
