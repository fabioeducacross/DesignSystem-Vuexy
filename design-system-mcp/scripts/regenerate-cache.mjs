#!/usr/bin/env node
/**
 * Regenerate Component Cache
 * Regenera o cache com todos os 233 componentes
 */

import { ComponentLoader } from '../dist/loader/component-loader.js';
import { loadPathConfig, resolvePaths } from '../dist/utils/paths.js';
import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('═'.repeat(60));
console.log('🔄 REGENERANDO CACHE DE COMPONENTES');
console.log('═'.repeat(60));
console.log();

// Carregar configuração de paths
const pathConfig = loadPathConfig();
const resolved = resolvePaths(pathConfig);

console.log('📂 Paths detectados:');
console.log(`   • Stories: ${resolved.stories}`);
console.log(`   • Components: ${resolved.components}`);
console.log(`   • Root: ${resolved.root}`);
console.log();

// Criar loader com config correto
const loader = new ComponentLoader({
  storiesPath: resolved.stories,
  componentsPath: resolved.components,
  storybookBaseUrl: 'http://localhost:6006'
});

console.log('📦 Carregando componentes...\n');
const startTime = Date.now();

try {
  const result = await loader.loadAll();
  const { components, errors, stats } = result;
  const loadTime = Date.now() - startTime;
  
  console.log(`✅ ${components.length} componentes carregados em ${(loadTime/1000).toFixed(2)}s\n`);
  
  if (errors.length > 0) {
    console.log(`⚠️  ${errors.length} erros durante carregamento\n`);
  }
  
  // Estatísticas
  const withProps = components.filter(c => c.props && c.props.length > 0).length;
  const withEvents = components.filter(c => c.events && c.events.length > 0).length;
  const withSlots = components.filter(c => c.slots && c.slots.length > 0).length;
  const withStories = components.filter(c => c.storiesCount > 0).length;
  
  console.log('📊 Estatísticas:');
  console.log(`   • Com props: ${withProps}/${components.length} (${(withProps/components.length*100).toFixed(1)}%)`);
  console.log(`   • Com events: ${withEvents}/${components.length} (${(withEvents/components.length*100).toFixed(1)}%)`);
  console.log(`   • Com slots: ${withSlots}/${components.length} (${(withSlots/components.length*100).toFixed(1)}%)`);
  console.log(`   • Com stories: ${withStories}/${components.length} (${(withStories/components.length*100).toFixed(1)}%)`);
  console.log();
  
  // Categorias
  const categories = {};
  components.forEach(c => {
    if (!categories[c.category]) categories[c.category] = 0;
    categories[c.category]++;
  });
  
  console.log(`📂 ${Object.keys(categories).length} categorias:\n`);
  Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([cat, count]) => {
      console.log(`   • ${cat}: ${count}`);
    });
  
  if (Object.keys(categories).length > 10) {
    console.log(`   ... e mais ${Object.keys(categories).length - 10} categorias`);
  }
  console.log();
  
  // Criar objeto de cache
  const cache = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    totalComponents: components.length,
    categories: Object.keys(categories).length,
    components: components.map(c => ({
      name: c.name,
      displayName: c.displayName,
      description: c.description,
      category: c.category,
      tags: c.tags,
      props: c.props,
      events: c.events,
      slots: c.slots,
      examples: c.examples,
      storiesCount: c.storiesCount,
      storybookUrl: c.storybookUrl,
      snippets: c.snippets,
      filePath: c.filePath
    }))
  };
  
  // Salvar cache
  const cachePath = join(__dirname, '../data/component-cache.json');
  await writeFile(cachePath, JSON.stringify(cache, null, 2));
  
  console.log('💾 Cache salvo em data/component-cache.json');
  console.log(`   • Tamanho: ${(JSON.stringify(cache).length / 1024).toFixed(1)} KB`);
  console.log();
  
  console.log('═'.repeat(60));
  console.log('✅ CACHE REGENERADO COM SUCESSO!');
  console.log('═'.repeat(60));
  console.log();
  console.log('📝 Próximos passos:');
  console.log('   1. Restart MCP Server (se estiver rodando)');
  console.log('   2. Reload VS Code: Ctrl+Shift+P → "Reload Window"');
  console.log('   3. Teste @workspace queries no Copilot Chat\n');
  
  process.exit(0);
} catch (error) {
  console.error('❌ Erro ao carregar componentes:', error.message);
  console.error(error.stack);
  process.exit(1);
}
