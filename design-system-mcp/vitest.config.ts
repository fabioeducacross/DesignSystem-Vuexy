import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    exclude: ['tests/poc/**', 'node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'tests/**',
        'dist/**',
        '**/node_modules/**',
        '**/*.config.{js,ts}',
        '**/types/**'
      ]
    }
  }
});
