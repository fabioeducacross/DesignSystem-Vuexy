/**
 * @file Storybook Component Tests - Educacross Design System
 * @description Testes automatizados para validar todos os componentes
 */

const { test, expect } = require('@playwright/test');

// ============================================
// CONFIGURAÇÃO BASE
// ============================================

const STORYBOOK_URL = 'http://localhost:6006';

// Lista de componentes com paths verificados contra storybook-static/index.json (formato v2)
const COMPONENTS = [
  { path: 'educacross-components-v2-navigation-appcollapse--default', name: 'AppCollapse' },
  { path: 'educacross-components-v2-studentavatar--default', name: 'Student Avatar' },
  { path: 'educacross-components-v2-layout-verticaldivider--default', name: 'Vertical Divider' },
  { path: 'educacross-components-v2-forms-buttonwaitaction--default', name: 'Button Wait Action' },
  { path: 'educacross-components-v2-charts-barchart--default', name: 'Bar Chart' },
  { path: 'educacross-components-v2-layout-divider--default', name: 'Divider' },
  { path: 'educacross-components-v2-forms-multipledropdown--default', name: 'Multiple Dropdown' },
  { path: 'educacross-components-v2-forms-einput--playground', name: 'EInput' },
  { path: 'educacross-components-v2-lists-cardslist--default', name: 'Cards List' },
  { path: 'educacross-components-v2-modals-cancelmission--default', name: 'Modal Cancel Mission' },
  { path: 'educacross-components-v2-navigation-appnavbar--default', name: 'App Navbar' },
  { path: 'educacross-components-v2-feedback-ziploading--processing', name: 'Zip Loading' },
  { path: 'educacross-components-v2-tables-listtablepagination--default', name: 'ListTable Pagination' },
  { path: 'educacross-components-v2-feedback-emptystate--default', name: 'Empty State' },
  { path: 'educacross-components-v2-data-display-listtable--default', name: 'ListTable' },
  { path: 'educacross-components-v2-navigation-tab--default', name: 'Tab' },
  { path: 'educacross-components-v2-feedback-guideslimitalert--default', name: 'Guides Limit Alert' },
  { path: 'educacross-components-v2-cards-dynamicmediacard--default', name: 'Dynamic Media Card' },
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

      // Gate: story não pode ter erro de render
      const storyFrame = page.frameLocator('#storybook-preview-iframe');
      const renderErrors = storyFrame.locator('.sb-errordisplay');
      await expect(renderErrors).toHaveCount(0);
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
    await page.goto(`${STORYBOOK_URL}/?path=/story/educacross-components-v2-forms-buttonwaitaction--default`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    const storyFrame = page.frameLocator('#storybook-preview-iframe');
    const primaryBtn = storyFrame.locator('.btn-primary, [class*="btn-"]').first();
    await expect(primaryBtn).toBeVisible({ timeout: 10000 });
  });

  test('Bootstrap card class works', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/educacross-components-v2-data-display-listtable--default`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    const storyFrame = page.frameLocator('#storybook-preview-iframe');
    const card = storyFrame.locator('.card, table, [class*="table"]').first();
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

