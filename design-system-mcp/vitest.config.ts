import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Mapeia imports de ../src para usar os arquivos TypeScript diretamente
      '../src': path.resolve(__dirname, './src'),
    }
  },
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
