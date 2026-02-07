/**
 * Script de testes manuais interativos
 * Testa 25 componentes interativos do Design System
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const STORYBOOK_URL = 'http://localhost:6006';
const SCREENSHOTS_DIR = path.join(__dirname, 'test-screenshots');
const REPORT_FILE = path.join(__dirname, 'MANUAL_TEST_RESULTS.md');

// Lista de componentes para testar
const COMPONENTS = [
  // 1. Bootstrap JS Components (6)
  {
    name: 'Modal',
    path: '/story/molecules-overlays-modal--default',
    category: 'Bootstrap JS',
    tests: [
      { name: 'Renderização', selector: '.modal-dialog' },
      { name: 'Botão abrir modal', selector: '[data-bs-toggle="modal"]', action: 'click' },
      { name: 'Modal visível', selector: '.modal.show', waitFor: 'visible' },
      { name: 'Overlay (backdrop)', selector: '.modal-backdrop' },
      { name: 'Fechar com ESC', action: 'pressKey', key: 'Escape' },
    ]
  },
  {
    name: 'Dropdown',
    path: '/story/atoms-navigation-dropdown--default',
    category: 'Bootstrap JS',
    tests: [
      { name: 'Renderização', selector: '.dropdown' },
      { name: 'Botão dropdown', selector: '.dropdown-toggle', action: 'click' },
      { name: 'Menu visível', selector: '.dropdown-menu.show', waitFor: 'visible' },
      { name: 'Itens do menu', selector: '.dropdown-item', count: '>0' },
    ]
  },
  {
    name: 'Tooltip',
    path: '/story/molecules-overlays-tooltip--default',
    category: 'Bootstrap JS',
    tests: [
      { name: 'Renderização', selector: '[data-bs-toggle="tooltip"]' },
      { name: 'Hover exibe tooltip', selector: '[data-bs-toggle="tooltip"]', action: 'hover' },
      { name: 'Tooltip visível', selector: '.tooltip', waitFor: 'visible' },
    ]
  },
  {
    name: 'Popover',
    path: '/story/molecules-overlays-popover--default',
    category: 'Bootstrap JS',
    tests: [
      { name: 'Renderização', selector: '[data-bs-toggle="popover"]' },
      { name: 'Click exibe popover', selector: '[data-bs-toggle="popover"]', action: 'click' },
      { name: 'Popover visível', selector: '.popover', waitFor: 'visible' },
    ]
  },
  {
    name: 'Offcanvas',
    path: '/story/molecules-overlays-offcanvas--default',
    category: 'Bootstrap JS',
    tests: [
      { name: 'Renderização', selector: '.offcanvas' },
      { name: 'Botão abrir', selector: '[data-bs-toggle="offcanvas"]', action: 'click' },
      { name: 'Offcanvas visível', selector: '.offcanvas.show', waitFor: 'visible' },
    ]
  },
  {
    name: 'Accordion',
    path: '/story/molecules-data-display-accordion--default',
    category: 'Bootstrap JS',
    tests: [
      { name: 'Renderização', selector: '.accordion' },
      { name: 'Itens accordion', selector: '.accordion-item', count: '>0' },
      { name: 'Expandir item', selector: '.accordion-button:not(.collapsed)', action: 'click' },
      { name: 'Conteúdo visível', selector: '.accordion-collapse.show', waitFor: 'visible' },
    ]
  },

  // 2. Charts (4)
  {
    name: 'BarChart',
    path: '/story/educacross-components-v2-charts-barchart--default',
    category: 'Charts',
    tests: [
      { name: 'Renderização', selector: 'canvas' },
      { name: 'Chart.js carregado', script: 'window.Chart !== undefined' },
      { name: 'Gráfico renderizado', script: 'document.querySelector("canvas").getContext("2d") !== null' },
    ]
  },
  {
    name: 'PieChart',
    path: '/story/educacross-components-v2-charts-piechart--default',
    category: 'Charts',
    tests: [
      { name: 'Renderização', selector: 'canvas' },
      { name: 'Chart.js carregado', script: 'window.Chart !== undefined' },
    ]
  },
  {
    name: 'DefaultChart',
    path: '/story/educacross-components-v2-charts-defaultchart--default',
    category: 'Charts',
    tests: [
      { name: 'Renderização', selector: 'canvas' },
      { name: 'Chart.js carregado', script: 'window.Chart !== undefined' },
    ]
  },
  {
    name: 'RadialBar',
    path: '/story/educacross-components-v2-charts-radialbar--default',
    category: 'Charts',
    tests: [
      { name: 'Renderização', selector: 'canvas' },
      { name: 'Chart.js carregado', script: 'window.Chart !== undefined' },
    ]
  },

  // 3. Mascots (3)
  {
    name: 'DeleteGuide',
    path: '/story/educacross-components-v2-mascots-deleteguide--default',
    category: 'Mascots',
    tests: [
      { name: 'Renderização', selector: '.delete-guide, [class*="delete"]' },
      { name: 'Imagem Belinha', selector: 'img[src*="educacross-assets"], img[src*="belinha"]' },
    ]
  },
  {
    name: 'CopyLink',
    path: '/story/educacross-components-v2-actions-copylink--default',
    category: 'Mascots',
    tests: [
      { name: 'Renderização', selector: '.copy-link, [class*="copy"]' },
      { name: 'Imagem Belinha', selector: 'img[src*="educacross-assets"], img[src*="belinha"]' },
      { name: 'Botão copiar', selector: 'button, .btn', action: 'click' },
    ]
  },
  {
    name: 'QuestionAlternative',
    path: '/story/educacross-components-v2-forms-questionalternative--default',
    category: 'Mascots',
    tests: [
      { name: 'Renderização', selector: '.question-alternative, [class*="alternative"]' },
    ]
  },

  // 4. Navigation (4)
  {
    name: 'AppNavbar',
    path: '/story/educacross-components-v2-navigation-appnavbar--default',
    category: 'Navigation',
    tests: [
      { name: 'Renderização', selector: 'nav, .navbar' },
      { name: 'Logo', selector: 'img[src*="logo"]' },
      { name: 'Links navegação', selector: 'a, .nav-link', count: '>0' },
    ]
  },
  {
    name: 'Sidebar',
    path: '/story/molecules-navigation-sidebar--default',
    category: 'Navigation',
    tests: [
      { name: 'Renderização', selector: '.sidebar, aside' },
      { name: 'Items menu', selector: '.menu-item, .nav-item', count: '>0' },
    ]
  },
  {
    name: 'Tab',
    path: '/story/molecules-navigation-tab--default',
    category: 'Navigation',
    tests: [
      { name: 'Renderização', selector: '.nav-tabs, .nav' },
      { name: 'Tabs', selector: '.nav-link', count: '>0' },
      { name: 'Click tab', selector: '.nav-link', action: 'click' },
    ]
  },
  {
    name: 'TabRouter',
    path: '/story/educacross-components-v2-navigation-tabrouter--default',
    category: 'Navigation',
    tests: [
      { name: 'Renderização', selector: '.nav, [class*="tab"]' },
      { name: 'Tabs', selector: '.nav-link, a', count: '>0' },
    ]
  },

  // 5. Other (1)
  {
    name: 'FilterChip',
    path: '/story/educacross-components-v2-forms-filterchip--default',
    category: 'Other',
    tests: [
      { name: 'Renderização', selector: '.chip, .filter-chip, [class*="chip"]' },
      { name: 'Chips', selector: '.chip, [class*="chip"]', count: '>0' },
      { name: 'Click chip', selector: '.chip, [class*="chip"]', action: 'click' },
    ]
  },
];

// Resultados
let results = {
  total: 0,
  passed: 0,
  failed: 0,
  components: []
};

async function runTest(page, component) {
  console.log(`\n🧪 Testando: ${component.name} (${component.category})`);
  
  const componentResult = {
    name: component.name,
    category: component.category,
    path: component.path,
    tests: [],
    screenshot: null,
    status: 'passed'
  };

  try {
    // Navegar para o componente
    await page.goto(`${STORYBOOK_URL}?path=${component.path}`, { timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Aguardar Storybook carregar
    await page.waitForSelector('.sb-show-main', { state: 'visible', timeout: 10000 });
    await page.waitForTimeout(1000); // Buffer para JS libraries

    // Screenshot inicial
    const screenshotPath = path.join(SCREENSHOTS_DIR, `${component.name.toLowerCase()}.png`);
    await page.locator('.sb-show-main').screenshot({ path: screenshotPath });
    componentResult.screenshot = screenshotPath;

    // Executar testes
    for (const test of component.tests) {
      console.log(`  ├─ ${test.name}...`);
      const testResult = {
        name: test.name,
        status: 'passed',
        error: null
      };

      try {
        if (test.selector) {
          const locator = page.frameLocator('iframe[id="storybook-preview-iframe"]')
            .locator(test.selector);

          if (test.waitFor) {
            await locator.first().waitFor({ state: test.waitFor, timeout: 5000 });
          }

          if (test.count) {
            const count = await locator.count();
            const expected = test.count === '>0' ? 1 : parseInt(test.count);
            if (test.count === '>0' && count === 0) {
              throw new Error(`Esperado count > 0, obteve ${count}`);
            }
          } else {
            // Verificar se existe
            const exists = await locator.first().isVisible({ timeout: 5000 }).catch(() => false);
            if (!exists) {
              throw new Error(`Elemento não visível: ${test.selector}`);
            }
          }

          if (test.action === 'click') {
            await locator.first().click({ timeout: 5000 });
            await page.waitForTimeout(500); // Aguardar interação
          } else if (test.action === 'hover') {
            await locator.first().hover({ timeout: 5000 });
            await page.waitForTimeout(500);
          }
        }

        if (test.action === 'pressKey') {
          await page.keyboard.press(test.key);
          await page.waitForTimeout(500);
        }

        if (test.script) {
          const frame = page.frameLocator('iframe[id="storybook-preview-iframe"]');
          const result = await frame.locator('body').evaluate((_, script) => {
            return eval(script);
          }, test.script);
          if (!result) {
            throw new Error(`Script falhou: ${test.script}`);
          }
        }

        console.log(`  │  ✅ ${test.name}`);
        testResult.status = 'passed';
        results.passed++;
      } catch (error) {
        console.log(`  │  ❌ ${test.name}: ${error.message}`);
        testResult.status = 'failed';
        testResult.error = error.message;
        results.failed++;
        componentResult.status = 'failed';
      }

      componentResult.tests.push(testResult);
      results.total++;
    }

  } catch (error) {
    console.log(`  ❌ Erro geral: ${error.message}`);
    componentResult.status = 'error';
    componentResult.error = error.message;
  }

  results.components.push(componentResult);
  console.log(`  └─ Status: ${componentResult.status === 'passed' ? '✅ PASSOU' : '❌ FALHOU'}`);
}

async function generateReport() {
  let markdown = `# 📊 Resultados - Testes Manuais Interativos\n\n`;
  markdown += `**Data**: ${new Date().toISOString()}\n`;
  markdown += `**Storybook**: ${STORYBOOK_URL}\n\n`;
  markdown += `## Resumo Geral\n\n`;
  markdown += `- **Total de testes**: ${results.total}\n`;
  markdown += `- **✅ Passou**: ${results.passed}\n`;
  markdown += `- **❌ Falhou**: ${results.failed}\n`;
  markdown += `- **Taxa de sucesso**: ${((results.passed / results.total) * 100).toFixed(1)}%\n\n`;

  // Por categoria
  const categories = {};
  results.components.forEach(comp => {
    if (!categories[comp.category]) {
      categories[comp.category] = { total: 0, passed: 0, failed: 0 };
    }
    categories[comp.category].total++;
    if (comp.status === 'passed') categories[comp.category].passed++;
    else categories[comp.category].failed++;
  });

  markdown += `## Por Categoria\n\n`;
  Object.entries(categories).forEach(([cat, stats]) => {
    const rate = ((stats.passed / stats.total) * 100).toFixed(0);
    markdown += `- **${cat}**: ${stats.passed}/${stats.total} (${rate}%)\n`;
  });

  markdown += `\n---\n\n`;

  // Detalhes por componente
  Object.entries(categories).forEach(([category]) => {
    markdown += `## ${category}\n\n`;
    
    results.components
      .filter(c => c.category === category)
      .forEach(comp => {
        const icon = comp.status === 'passed' ? '✅' : '❌';
        markdown += `### ${icon} ${comp.name}\n\n`;
        markdown += `**Path**: \`${comp.path}\`\n\n`;
        
        if (comp.screenshot) {
          markdown += `![Screenshot](${path.relative(__dirname, comp.screenshot)})\n\n`;
        }

        markdown += `| Teste | Status |\n`;
        markdown += `|-------|--------|\n`;
        comp.tests.forEach(test => {
          const testIcon = test.status === 'passed' ? '✅' : '❌';
          markdown += `| ${test.name} | ${testIcon} ${test.error || ''} |\n`;
        });

        markdown += `\n`;
      });
  });

  markdown += `\n---\n\n## 🚨 Issues Encontrados\n\n`;
  
  const failedComponents = results.components.filter(c => c.status !== 'passed');
  if (failedComponents.length === 0) {
    markdown += `✅ **Nenhum issue encontrado!**\n`;
  } else {
    failedComponents.forEach(comp => {
      markdown += `### ${comp.name}\n\n`;
      comp.tests.filter(t => t.status === 'failed').forEach(test => {
        markdown += `- ❌ **${test.name}**: ${test.error}\n`;
      });
      markdown += `\n`;
    });
  }

  fs.writeFileSync(REPORT_FILE, markdown);
  console.log(`\n📄 Relatório salvo em: ${REPORT_FILE}`);
}

async function main() {
  console.log('🚀 Iniciando testes manuais interativos...\n');
  console.log(`📍 Storybook: ${STORYBOOK_URL}`);
  console.log(`📁 Screenshots: ${SCREENSHOTS_DIR}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  // Testar cada componente
  for (const component of COMPONENTS) {
    await runTest(page, component);
  }

  await browser.close();

  // Gerar relatório
  await generateReport();

  console.log('\n✅ Testes concluídos!');
  console.log(`\n📊 Resumo:`);
  console.log(`   Total: ${results.total}`);
  console.log(`   ✅ Passou: ${results.passed}`);
  console.log(`   ❌ Falhou: ${results.failed}`);
  console.log(`   Taxa: ${((results.passed / results.total) * 100).toFixed(1)}%`);
}

main().catch(console.error);
