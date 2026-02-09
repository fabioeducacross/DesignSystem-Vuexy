/**
 * Testes dos 10 componentes pendentes para 100%
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const STORYBOOK_URL = 'http://localhost:6006';
const REPORT_FILE = path.join(__dirname, 'FINAL_10_COMPONENTS_RESULTS.md');

const COMPONENTS = [
  // Grupo 1: Componentes Simples (3)
  {
    name: 'Accordion',
    path: '/story/molecules-data-display-accordion--default',
    category: 'Grupo 1: Simples',
    tests: [
      { name: 'Renderiza accordion', selector: '.accordion' },
      { name: 'Tem items', selector: '.accordion-item', count: '>0' },
      { name: 'Accordion button existe', selector: '.accordion-button' },
      { name: 'Click expande item', selector: '.accordion-button:not(.collapsed)', action: 'click' },
    ]
  },
  {
    name: 'Sidebar',
    path: '/story/molecules-navigation-sidebar--default',
    category: 'Grupo 1: Simples',
    tests: [
      { name: 'Renderiza sidebar', selector: '.sidebar, aside, .menu-vertical' },
      { name: 'Tem menu items', selector: '.menu-item, .nav-item, a', count: '>0' },
      { name: 'Link clicável', selector: '.menu-item, .nav-item, a', action: 'click' },
    ]
  },
  {
    name: 'TabRouter',
    path: '/story/educacross-components-v2-navigation-tabrouter--default',
    category: 'Grupo 1: Simples',
    tests: [
      { name: 'Renderiza tabs', selector: '.nav, [class*="tab"]' },
      { name: 'Tem tabs', selector: '.nav-link, a, [role="tab"]', count: '>0' },
      { name: 'Tab clicável', selector: '.nav-link, a', action: 'click' },
    ]
  },

  // Grupo 2: Vendor Libraries P1 (4)
  {
    name: 'Flatpickr',
    path: '/story/molecules-forms-datepicker--default',
    category: 'Grupo 2: Vendor P1',
    tests: [
      { name: 'Input renderiza', selector: 'input[type="text"]' },
      { name: 'Flatpickr carregado', script: 'typeof window.flatpickr !== "undefined"' },
    ]
  },
  {
    name: 'Select2',
    path: '/story/molecules-forms-select--default',
    category: 'Grupo 2: Vendor P1',
    tests: [
      { name: 'Select renderiza', selector: 'select' },
      { name: 'jQuery carregado', script: 'typeof window.jQuery !== "undefined"' },
    ]
  },
  {
    name: 'Quill',
    path: '/story/molecules-forms-texteditor--default',
    category: 'Grupo 2: Vendor P1',
    tests: [
      { name: 'Editor renderiza', selector: '.ql-editor, .ql-container' },
      { name: 'Quill carregado', script: 'typeof window.Quill !== "undefined"' },
      { name: 'Toolbar existe', selector: '.ql-toolbar' },
    ]
  },
  {
    name: 'DataTables',
    path: '/story/organisms-data-display-datatable--default',
    category: 'Grupo 2: Vendor P1',
    tests: [
      { name: 'Tabela renderiza', selector: 'table' },
      { name: 'DataTables carregado', script: 'typeof window.jQuery !== "undefined" && typeof window.jQuery.fn.DataTable !== "undefined"' },
    ]
  },

  // Grupo 3: Vendor Libraries P2 (3)
  {
    name: 'FullCalendar',
    path: '/story/organisms-productivity-calendar--default',
    category: 'Grupo 3: Vendor P2',
    tests: [
      { name: 'Calendar renderiza', selector: '.fc, .calendar' },
      { name: 'FullCalendar carregado', script: 'typeof window.FullCalendar !== "undefined"' },
    ]
  },
  {
    name: 'ApexCharts',
    path: '/story/organisms-charts-apexchart--default',
    category: 'Grupo 3: Vendor P2',
    tests: [
      { name: 'Chart renderiza', selector: '.apexcharts-canvas, svg' },
      { name: 'ApexCharts carregado', script: 'typeof window.ApexCharts !== "undefined"' },
    ]
  },
  {
    name: 'BSStepper',
    path: '/story/molecules-navigation-stepper--default',
    category: 'Grupo 3: Vendor P2',
    tests: [
      { name: 'Stepper renderiza', selector: '.bs-stepper, .stepper' },
      { name: 'Steps existem', selector: '.step, [data-target]', count: '>0' },
    ]
  },
];

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
    status: 'passed'
  };

  try {
    await page.goto(`${STORYBOOK_URL}?path=${component.path}`, { timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    await page.waitForTimeout(2000); // Buffer para vendor libraries

    for (const test of component.tests) {
      console.log(`  ├─ ${test.name}...`);
      const testResult = { name: test.name, status: 'passed', error: null };

      try {
        const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

        if (test.selector) {
          const locator = frame.locator(test.selector);

          if (test.count === '>0') {
            const count = await locator.count();
            if (count === 0) throw new Error(`Esperado count > 0, obteve ${count}`);
          } else {
            const exists = await locator.first().isVisible({ timeout: 5000 }).catch(() => false);
            if (!exists) throw new Error(`Elemento não visível: ${test.selector}`);
          }

          if (test.action === 'click') {
            await locator.first().click({ timeout: 5000 });
            await page.waitForTimeout(500);
          }
        }

        if (test.script) {
          const result = await frame.locator('body').evaluate((_, script) => {
            return eval(script);
          }, test.script);
          if (!result) throw new Error(`Script falhou: ${test.script}`);
        }

        console.log(`  │  ✅ ${test.name}`);
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
  let markdown = `# ✅ Resultados - 10 Componentes Finais para 100%\n\n`;
  markdown += `**Data**: ${new Date().toISOString()}\n\n`;
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

  markdown += `## Por Grupo\n\n`;
  Object.entries(categories).forEach(([cat, stats]) => {
    const rate = ((stats.passed / stats.total) * 100).toFixed(0);
    markdown += `- **${cat}**: ${stats.passed}/${stats.total} (${rate}%)\n`;
  });

  markdown += `\n---\n\n`;

  // Detalhes
  Object.entries(categories).forEach(([category]) => {
    markdown += `## ${category}\n\n`;
    
    results.components
      .filter(c => c.category === category)
      .forEach(comp => {
        const icon = comp.status === 'passed' ? '✅' : '❌';
        markdown += `### ${icon} ${comp.name}\n\n`;
        markdown += `**Path**: \`${comp.path}\`\n\n`;
        
        markdown += `| Teste | Status |\n`;
        markdown += `|-------|--------|\n`;
        comp.tests.forEach(test => {
          const testIcon = test.status === 'passed' ? '✅' : '❌';
          markdown += `| ${test.name} | ${testIcon} ${test.error || ''} |\n`;
        });

        markdown += `\n`;
      });
  });

  // Status final
  const passedComponents = results.components.filter(c => c.status === 'passed').length;
  const totalComponents = results.components.length;
  const finalRate = ((passedComponents / totalComponents) * 100).toFixed(0);

  markdown += `\n---\n\n## 🎯 Status Final\n\n`;
  markdown += `**Componentes aprovados**: ${passedComponents}/${totalComponents} (${finalRate}%)\n\n`;
  
  if (passedComponents === totalComponents) {
    markdown += `### 🎉 100% COMPLETO!\n\n`;
    markdown += `Todos os 10 componentes pendentes foram validados com sucesso!\n\n`;
    markdown += `**Total geral**: 25/25 componentes interativos = 100% ✅\n`;
  } else {
    markdown += `**Faltam**: ${totalComponents - passedComponents} componentes\n`;
  }

  fs.writeFileSync(REPORT_FILE, markdown);
  console.log(`\n📄 Relatório salvo em: ${REPORT_FILE}`);
}

async function main() {
  console.log('🚀 Testando 10 componentes finais para 100%...\n');
  console.log(`📍 Storybook: ${STORYBOOK_URL}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  for (const component of COMPONENTS) {
    await runTest(page, component);
  }

  await browser.close();
  await generateReport();

  console.log('\n✅ Testes concluídos!');
  console.log(`\n📊 Resumo:`);
  console.log(`   Total: ${results.total}`);
  console.log(`   ✅ Passou: ${results.passed}`);
  console.log(`   ❌ Falhou: ${results.failed}`);
  console.log(`   Taxa: ${((results.passed / results.total) * 100).toFixed(1)}%`);
  
  const passedComponents = results.components.filter(c => c.status === 'passed').length;
  console.log(`\n🎯 Componentes: ${passedComponents}/10`);
  console.log(`   Status geral: ${15 + passedComponents}/25 (${(((15 + passedComponents) / 25) * 100).toFixed(0)}%)`);
}

main().catch(console.error);
