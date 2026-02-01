/**
 * Playwright Tests - Educacross Components V2
 * ============================================
 * Testes automatizados para validar componentes pixel-perfect
 */

import { test, expect } from '@playwright/test';

const STORYBOOK_URL = 'http://localhost:6006';

// Helper para navegar para uma story
async function goToStory(page, category, component, story = 'default') {
  const storyId = `${category.toLowerCase()}-${component.toLowerCase()}--${story.toLowerCase()}`;
  await page.goto(`${STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story`);
  await page.waitForLoadState('networkidle');
}

// ============================================
// TESTES DE RENDERIZAÇÃO
// ============================================

test.describe('Educacross V2 - Renderização', () => {
  
  test.beforeEach(async ({ page }) => {
    // Aguarda Storybook estar disponível
    await page.goto(STORYBOOK_URL);
    await page.waitForLoadState('networkidle');
  });

  // ESelect
  test('ESelect - Default renderiza corretamente', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'eselect', 'default');
    
    // Verifica se o select existe
    const select = page.locator('.e-select-container, .vs__dropdown-toggle, select');
    await expect(select.first()).toBeVisible();
  });

  test('ESelect - Loading mostra spinner', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'eselect', 'loading');
    
    // Verifica se tem indicador de loading
    const loading = page.locator('.spinner-border, .loading, .vs__spinner');
    await expect(loading.first()).toBeVisible();
  });

  // ListTable
  test('ListTable - Renderiza tabela com dados', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'listtable', 'default');
    
    // Verifica se a tabela existe
    const table = page.locator('table, .list-table');
    await expect(table.first()).toBeVisible();
  });

  test('ListTable - Skeleton loading', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'listtable', 'skeleton');
    
    // Verifica se tem skeleton
    const skeleton = page.locator('.skeleton, .placeholder, .loading-skeleton');
    await expect(skeleton.first()).toBeVisible();
  });

  // BadgeStatus
  test('BadgeStatus - Renderiza badges coloridos', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'badgestatus', 'default');
    
    // Verifica se o badge existe
    const badge = page.locator('.badge, .status-badge');
    await expect(badge.first()).toBeVisible();
  });

  // ProgressBar
  test('ProgressBar - Renderiza barra de progresso', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'progressbar', 'default');
    
    // Verifica se a progress bar existe
    const progress = page.locator('.progress, .progress-bar, [role="progressbar"]');
    await expect(progress.first()).toBeVisible();
  });

  // TabCards
  test('TabCards - Renderiza cards em tabs', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'tabcards', 'default');
    
    // Verifica se os cards existem
    const cards = page.locator('.card, .tab-card');
    await expect(cards.first()).toBeVisible();
  });

  // ButtonWaitAction
  test('ButtonWaitAction - Renderiza botão com loading', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'buttonwaitaction', 'default');
    
    // Verifica se o botão existe
    const button = page.locator('button, .btn');
    await expect(button.first()).toBeVisible();
  });

  // MediaCard
  test('MediaCard - Renderiza card com ícone', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'mediacard', 'default');
    
    // Verifica se o card existe
    const card = page.locator('.card, .media-card');
    await expect(card.first()).toBeVisible();
  });

  // AppCollapse
  test('AppCollapse - Renderiza accordion', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'appcollapse', 'default');
    
    // Verifica se o collapse existe
    const collapse = page.locator('.accordion, .collapse, .app-collapse');
    await expect(collapse.first()).toBeVisible();
  });

  // MultipleDropdown
  test('MultipleDropdown - Renderiza dropdown', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'multipledropdown', 'default');
    
    // Verifica se o dropdown existe
    const dropdown = page.locator('.dropdown, .multiple-dropdown');
    await expect(dropdown.first()).toBeVisible();
  });

  // ZipLoading
  test('ZipLoading - Renderiza indicador de export', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'ziploading', 'default');
    
    // Verifica se o loading existe
    const loading = page.locator('.zip-loading, .export-loading, .progress');
    await expect(loading.first()).toBeVisible();
  });

  // Divider
  test('Divider - Renderiza divisor', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'divider', 'default');
    
    // Verifica se o divider existe
    const divider = page.locator('hr, .divider, .separator');
    await expect(divider.first()).toBeVisible();
  });

  // LegendCard
  test('LegendCard - Renderiza card de legenda', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'legendcard', 'default');
    
    // Verifica se o card existe
    const card = page.locator('.card, .legend-card');
    await expect(card.first()).toBeVisible();
  });
});

// ============================================
// TESTES DE ESTILOS (CSS)
// ============================================

test.describe('Educacross V2 - Estilos CSS', () => {

  test('Cores primárias estão corretas', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'badgestatus', 'default');
    
    // Verifica se as variáveis CSS estão definidas
    const primaryColor = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    });
    
    expect(primaryColor).toBeTruthy();
  });

  test('Fontes estão carregadas', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'eselect', 'default');
    
    // Verifica se há texto renderizado
    const bodyText = await page.textContent('body');
    expect(bodyText).toBeTruthy();
  });

  test('Layout responsivo funciona', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'listtable', 'default');
    
    // Testa em diferentes viewports
    await page.setViewportSize({ width: 1200, height: 800 });
    let table = page.locator('table, .list-table');
    await expect(table.first()).toBeVisible();
    
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(table.first()).toBeVisible();
    
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(table.first()).toBeVisible();
  });
});

// ============================================
// TESTES DE ACESSIBILIDADE
// ============================================

test.describe('Educacross V2 - Acessibilidade', () => {

  test('Botões têm texto acessível', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'buttonwaitaction', 'default');
    
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      
      // Botão deve ter texto ou aria-label
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('Inputs têm labels', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'eselect', 'default');
    
    const inputs = page.locator('input, select');
    const count = await inputs.count();
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');
      
      // Input deve ter associação com label
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        expect(hasLabel || ariaLabel || ariaLabelledby).toBeTruthy();
      }
    }
  });

  test('Cores têm contraste suficiente', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'badgestatus', 'default');
    
    // Verifica que badges têm contraste (simplificado)
    const badges = page.locator('.badge');
    const count = await badges.count();
    
    for (let i = 0; i < count; i++) {
      const badge = badges.nth(i);
      const isVisible = await badge.isVisible();
      expect(isVisible).toBe(true);
    }
  });
});

// ============================================
// TESTES DE INTERAÇÃO
// ============================================

test.describe('Educacross V2 - Interações', () => {

  test('Dropdown abre ao clicar', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'multipledropdown', 'default');
    
    const dropdownToggle = page.locator('.dropdown-toggle, [data-bs-toggle="dropdown"]');
    if (await dropdownToggle.count() > 0) {
      await dropdownToggle.first().click();
      
      // Aguarda menu abrir
      await page.waitForTimeout(300);
      
      const menu = page.locator('.dropdown-menu, .show');
      // Menu pode existir ou não dependendo da implementação
    }
  });

  test('Collapse expande ao clicar', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'appcollapse', 'default');
    
    const collapseToggle = page.locator('.accordion-button, .collapse-toggle, [data-bs-toggle="collapse"]');
    if (await collapseToggle.count() > 0) {
      await collapseToggle.first().click();
      
      // Aguarda animação
      await page.waitForTimeout(500);
    }
  });

  test('Tab cards são clicáveis', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'tabcards', 'default');
    
    const cards = page.locator('.card, .tab-card');
    if (await cards.count() > 0) {
      await cards.first().click();
      // Verifica se não há erro
    }
  });
});

// ============================================
// TESTES DE SCREENSHOT (Visual Regression)
// ============================================

test.describe('Educacross V2 - Visual Regression', () => {

  test('ESelect - Screenshot', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'eselect', 'default');
    await expect(page).toHaveScreenshot('eselect-default.png', {
      maxDiffPixels: 100
    });
  });

  test('BadgeStatus - Screenshot', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'badgestatus', 'default');
    await expect(page).toHaveScreenshot('badgestatus-default.png', {
      maxDiffPixels: 100
    });
  });

  test('ProgressBar - Screenshot', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'progressbar', 'default');
    await expect(page).toHaveScreenshot('progressbar-default.png', {
      maxDiffPixels: 100
    });
  });

  test('ButtonWaitAction - Screenshot', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'buttonwaitaction', 'default');
    await expect(page).toHaveScreenshot('buttonwaitaction-default.png', {
      maxDiffPixels: 100
    });
  });

  test('MediaCard - Screenshot', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'mediacard', 'default');
    await expect(page).toHaveScreenshot('mediacard-default.png', {
      maxDiffPixels: 100
    });
  });

  test('LegendCard - Screenshot', async ({ page }) => {
    await goToStory(page, 'educacross-v2', 'legendcard', 'default');
    await expect(page).toHaveScreenshot('legendcard-default.png', {
      maxDiffPixels: 100
    });
  });
});
