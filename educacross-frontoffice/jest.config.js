module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js'],
  // collectCoverage: true,
  // collectCoverageFrom: [
  //  'src/**/*.{js,vue}',
  //  '!src/main.js', // No need to cover main file
  // ],
  testMatch: ['**/__tests__/**/*.spec.js', '**/*.spec.js'],
  transformIgnorePatterns: ['node_modules/(?!(axios|vee-validate)/)'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/@core/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@root(.*)$': '<rootDir>/src$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '@themeConfig': '<rootDir>/themeConfig.js',
    '@core': '<rootDir>/src/@core',
    '@validations': '<rootDir>/src/@core/utils/validations/validations.js',
    '@axios': '<rootDir>/src/libs/axios',
    '@components': '<rootDir>/src/layouts/components',
  },
}
