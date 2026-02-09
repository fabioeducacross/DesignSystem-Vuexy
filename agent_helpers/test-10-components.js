// Script para testar 10 componentes automaticamente
const { chromium } = require('playwright');

const components = [
  { name: 'Accordion', url: 'http://localhost:6006/?path=/story/vuexy-organisms-content-accordion--interactive', selector: '.accordion', screenshot: '01-accordion' },
  { name: 'Select2', url: 'http://localhost:6006/?path=/story/vuexy-atoms-forms-select--interactive-select2', selector: '.select2', screenshot: '02-select2' },
  { name: 'Quill Editor', url: 'http://localhost:6006/?path=/story/vuexy-organisms-forms-wysiwgeditor--basic-toolbar', selector: '.ql-toolbar', screenshot: '03-quill' },
  { name: 'DataTable', url: 'http://localhost:6006/?path=/story/vuexy-organisms-data-display-datatable--basic', selector: 'table', screenshot: '04-datatable' },
  { name: 'Calendar', url: 'http://localhost:6006/?path=/story/vuexy-organisms-productivity-calendar--basic', selector: '.fc', screenshot: '05-calendar' },
  { name: 'PieChart', url: 'http://localhost:6006/?path=/story/vuexy-organisms-charts-piechart--default', selector: '.apexcharts-canvas', screenshot: '06-piechart' },
  { name: 'Datepicker', url: 'http://localhost:6006/?path=/story/vuexy-molecules-forms-datepicker--basic', selector: '.flatpickr-input', screenshot: '07-datepicker' },
  { name: 'Stepper', url: 'http://localhost:6006/?path=/story/vuexy-molecules-navigation-stepper--default', selector: '.bs-stepper', screenshot: '08-stepper' },
  { name: 'Sidebar', url: 'http://localhost:6006/?path=/story/vuexy-molecules-navigation-sidebar--default', selector: '.menu', screenshot: '09-sidebar' },
  { name: 'TabRouter', url: 'http://localhost:6006/?path=/story/vuexy-molecules-navigation-tabrouter--default', selector: '[role="tablist"]', screenshot: '10-tabrouter' },
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  console.log('🚀 Iniciando testes de 10 componentes...\n');

  const results = [];

  for (const comp of components) {
    try {
      console.log(`📍 Testando: ${comp.name}`);
      
      await page.goto(comp.url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(3000); // Aguarda loaders JS
      
      const iframe = page.frameLocator('iframe[title="storybook-preview-iframe"]');
      const element = iframe.locator(comp.selector).first();
      
      const isVisible = await element.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (isVisible) {
        await page.screenshot({
          path: `agent_helpers/screenshots/${comp.screenshot}.png`,
          fullPage: true,
        });
        
        results.push({ name: comp.name, status: '✅ PASSOU', visible: true });
        console.log(`  ✅ ${comp.name} renderizado corretamente!\n`);
      } else {
        results.push({ name: comp.name, status: '⚠️ Não visível', visible: false });
        console.log(`  ⚠️ ${comp.name} não visível\n`);
      }
      
    } catch (error) {
      results.push({ name: comp.name, status: `❌ ERRO: ${error.message}`, visible: false });
      console.log(`  ❌ ${comp.name} falhou: ${error.message}\n`);
    }
  }

  console.log('\n📊 RESUMO DOS TESTES:\n');
  results.forEach(r => console.log(`  ${r.status.padEnd(30)} ${r.name}`));
  
  const passed = results.filter(r => r.visible).length;
  console.log(`\n🎯 Total: ${passed}/10 componentes validados (${(passed/10*100).toFixed(0)}%)\n`);

  await browser.close();
})();
