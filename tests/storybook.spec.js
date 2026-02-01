/**
 * @file Storybook Component Tests - Educacross Design System
 * @description Testes automatizados para validar todos os componentes
 */

const { test, expect } = require('@playwright/test');

// ============================================
// CONFIGURAÇÃO BASE
// ============================================

const STORYBOOK_URL = 'http://localhost:6006';

// Lista de componentes com paths corretos do Storybook
const COMPONENTS = [
  { path: 'educacross-components-accordion--basic', name: 'Accordion' },
  { path: 'educacross-components-avatargroup--default', name: 'Avatar Group' },
  { path: 'educacross-components-breadcrumbs--basic', name: 'Breadcrumbs' },
  { path: 'educacross-components-buttons--color-variants', name: 'Buttons' },
  { path: 'educacross-components-charts--bar-chart-visual', name: 'Charts' },
  { path: 'educacross-components-dividers--basic-dividers', name: 'Dividers' },
  { path: 'educacross-components-dropdowns--basic', name: 'Dropdowns' },
  { path: 'educacross-components-forms--basic-inputs', name: 'Forms' },
  { path: 'educacross-components-lists--basic', name: 'Lists' },
  { path: 'educacross-components-modals--confirmation', name: 'Modals' },
  { path: 'educacross-components-navigation--navbar', name: 'Navigation' },
  { path: 'educacross-components-notifications--toast-types', name: 'Notifications' },
  { path: 'educacross-components-pagination--basic', name: 'Pagination' },
  { path: 'educacross-components-spinners--basic', name: 'Spinners' },
  { path: 'educacross-components-tables--basic-table', name: 'Tables' },
  { path: 'educacross-components-tabs--basic', name: 'Tabs' },
  { path: 'educacross-components-toasts-alerts--basic-alerts', name: 'Toasts & Alerts' },
  { path: 'educacross-components-tooltips--positions', name: 'Tooltips' },
];

// ============================================
// TESTE 1: Storybook carrega corretamente
// ============================================

test.describe('Storybook Setup', () => {
  test('Storybook loads successfully', async ({ page }) => {
    await page.goto(STORYBOOK_URL);
    await expect(page).toHaveTitle(/Storybook/i);
    await page.waitForSelector('[id="storybook-explorer-tree"]', { timeout: 30000 });
  });

  test('CSS files load correctly', async ({ page }) => {
    const response = await page.goto(`${STORYBOOK_URL}/vuexy/css/core.css`);
    expect(response?.status()).toBe(200);
  });

  test('Font files load correctly', async ({ page }) => {
    const response = await page.goto(`${STORYBOOK_URL}/vuexy/fonts/fontawesome.css`);
    expect(response?.status()).toBe(200);
  });
});

// ============================================
// TESTE 2: Cada componente renderiza
// ============================================

test.describe('Component Rendering', () => {
  for (const component of COMPONENTS) {
    test(`${component.name} renders`, async ({ page }) => {
      await page.goto(`${STORYBOOK_URL}/?path=/story/${component.path}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
      
      const iframe = page.locator('#storybook-preview-iframe');
      await expect(iframe).toBeVisible({ timeout: 15000 });
    });
  }
});

// ============================================
// TESTE 3: Navegação funciona
// ============================================

test.describe('Navigation', () => {
  test('Sidebar navigation works', async ({ page }) => {
    await page.goto(STORYBOOK_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Verifica que o sidebar está presente (estrutura do Storybook 8)
    const sidebar = page.locator('#storybook-explorer-tree, [role="tree"]');
    await expect(sidebar.first()).toBeVisible({ timeout: 15000 });
  });
});

// ============================================
// TESTE 4: Bootstrap Integration
// ============================================

test.describe('Bootstrap Integration', () => {
  test('Bootstrap btn-primary class works', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/educacross-components-buttons--color-variants`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const storyFrame = page.frameLocator('#storybook-preview-iframe');
    const primaryBtn = storyFrame.locator('.btn-primary').first();
    await expect(primaryBtn).toBeVisible({ timeout: 10000 });
  });

  test('Bootstrap card class works', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/educacross-components-tables--basic-table`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const storyFrame = page.frameLocator('#storybook-preview-iframe');
    const card = storyFrame.locator('.card').first();
    await expect(card).toBeVisible({ timeout: 10000 });
  });
});

// ============================================
// TESTE 5: Contagem de stories
// ============================================

test.describe('Story Count', () => {
  test('Has expected Educacross stories count', async ({ page }) => {
    const response = await page.goto(`${STORYBOOK_URL}/index.json`);
    const json = await response?.json();
    
    const entries = Object.keys(json.entries);
    const educacrossStories = entries.filter(e => e.includes('educacross'));
    
    expect(educacrossStories.length).toBeGreaterThan(50);
    console.log(`Total Educacross stories: ${educacrossStories.length}`);
  });
});

