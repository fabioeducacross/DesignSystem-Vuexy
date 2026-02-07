// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration for Educacross Design System
 * Otimizado para validação PIXEL-PERFECT com 4 workers
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  // Paralelização com 4 workers para 222 testes
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  
  // Retries para lidar com flakiness
  retries: process.env.CI ? 2 : 1,
  
  // Timeout maior para screenshots
  timeout: 30000,
  expect: {
    timeout: 10000,
    // Configuração PIXEL-PERFECT com tolerância para anti-aliasing e diferenças mínimas
    // maxDiffPixels: 100 permite pequenas diferenças de renderização entre runs
    // threshold: 0.2 permite 0.2% de diferença (evita false positives)
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.2,
    },
  },
  
  // Reporters
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  
  forbidOnly: !!process.env.CI,
  
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run local server before tests */
  webServer: {
    command: 'npx http-server storybook-static -p 6006 -c-1',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
