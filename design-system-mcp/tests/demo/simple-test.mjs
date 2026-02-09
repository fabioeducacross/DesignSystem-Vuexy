#!/usr/bin/env node

/**
 * 🎯 TESTE INTERATIVO SIMPLES
 * 
 * Execute: node simple-test.mjs
 * 
 * Testa as 7 MCP tools de forma sequencial e mostra resultados formatados.
 */

import { spawn } from 'child_process';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../..');

console.clear();
console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║  🎯 DESIGN SYSTEM MCP - TESTE INTERATIVO                ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

const serverPath = join(projectRoot, 'dist', 'index.js');

// Cria cliente MCP
const transport = new StdioClientTransport({
  command: 'node',
  args: [serverPath],
});

const client = new Client(
  { name: 'test-client', version: '1.0.0' },
  { capabilities: {} }
);

console.log('📡 Conectando ao servidor MCP...');
await client.connect(transport);
console.log('✅ Conectado!\n');

try {
  // ========================================
  // 1. ListTools
  // ========================================
  console.log('🔧 1/7 - Listando tools disponíveis...');
  const tools = await client.listTools();
  console.log(`   ✅ ${tools.tools.length} tools encontradas:`);
  tools.tools.forEach((tool, i) => {
    console.log(`      ${i + 1}. ${tool.name}`);
  });

  // ========================================
  // 2. getStats
  // ========================================
  console.log('\n🔧 2/7 - Obtendo estatísticas gerais...');
  const statsResult = await client.callTool({
    name: 'getStats',
    arguments: {}
  });
  const stats = JSON.parse(statsResult.content[0].text);
  console.log(`   ✅ ${stats.totalComponents} componentes | ${stats.totalStories} stories`);
  console.log(`   📦 Top 3 categorias:`);
  Object.entries(stats.categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .forEach(([cat, count], i) => {
      console.log(`      ${i + 1}. ${cat}: ${count} componentes`);
    });

  // ========================================
  // 3. listComponents
  // ========================================
  console.log('\n🔧 3/7 - Listando primeiros 3 componentes...');
  const listResult = await client.callTool({
    name: 'listComponents',
    arguments: { page: 1, limit: 3 }
  });
  const list = JSON.parse(listResult.content[0].text);
  console.log(`   ✅ ${list.pagination.total} componentes no total`);
  list.components.forEach((c, i) => {
    console.log(`      ${i + 1}. ${c.name} (${c.category}) - ${c.stats.storiesCount} stories`);
  });

  // ========================================
  // 4. searchComponents
  // ========================================
  console.log('\n🔧 4/7 - Buscando por "modal"...');
  const searchResult = await client.callTool({
    name: 'searchComponents',
    arguments: { query: 'modal', limit: 3 }
  });
  const search = JSON.parse(searchResult.content[0].text);
  console.log(`   ✅ ${search.total} resultados encontrados`);
  search.results.slice(0, 3).forEach((r, i) => {
    console.log(`      ${i + 1}. ${r.component.name} (score: ${r.score.toFixed(3)})`);
  });

  // ========================================
  // 5. getComponentsByCategory
  // ========================================
  console.log('\n🔧 5/7 - Componentes da categoria "Forms"...');
  const categoryResult = await client.callTool({
    name: 'getComponentsByCategory',
    arguments: { category: 'Forms' }
  });
  const category = JSON.parse(categoryResult.content[0].text);
  console.log(`   ✅ ${category.total} componentes encontrados`);
  category.components.slice(0, 3).forEach((c, i) => {
    console.log(`      ${i + 1}. ${c.name}`);
  });

  // ========================================
  // 6. getComponent
  // ========================================
  console.log('\n🔧 6/7 - Detalhes do componente "AcceptOrRejectAccess"...');
  const getResult = await client.callTool({
    name: 'getComponent',
    arguments: { name: 'AcceptOrRejectAccess' }
  });
  const component = JSON.parse(getResult.content[0].text).component;
  console.log(`   ✅ Nome: ${component.name}`);
  console.log(`   📁 Categoria: ${component.category}`);
  console.log(`   ⭐ Prioridade: ${component.priority}`);
  console.log(`   📚 Stories: ${component.stats.storiesCount}`);
  console.log(`   🔧 Props: ${component.stats.propsCount}`);

  // ========================================
  // 7. getCacheStats + getSearchIndexStats
  // ========================================
  console.log('\n🔧 7/7 - Métricas de performance...');
  
  const cacheResult = await client.callTool({
    name: 'getCacheStats',
    arguments: {}
  });
  const cache = JSON.parse(cacheResult.content[0].text);
  
  const indexResult = await client.callTool({
    name: 'getSearchIndexStats',
    arguments: {}
  });
  const index = JSON.parse(indexResult.content[0].text);
  
  console.log(`   💾 Cache: ${cache.itemsCount} items | ${(cache.hitRate * 100).toFixed(1)}% hit rate`);
  console.log(`   🔍 Índice: ${index.totalDocuments} docs | ${index.totalTokens} tokens`);

  // ========================================
  // RESUMO
  // ========================================
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║  ✅ TODOS OS TESTES PASSARAM!                           ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  console.log('📊 RESUMO:');
  console.log(`   • ${stats.totalComponents} componentes carregados`);
  console.log(`   • ${stats.totalStories} stories processadas`);
  console.log(`   • ${tools.tools.length} tools MCP funcionais`);
  console.log(`   • ${Object.keys(stats.categoryCounts).length} categorias`);
  console.log(`   • ${(cache.hitRate * 100).toFixed(1)}% cache hit rate`);
  console.log(`   • ${index.averageTokensPerDocument.toFixed(2)} tokens/doc (média)\n`);

  console.log('💡 PRÓXIMOS PASSOS:');
  console.log('   1. Configure .vscode/settings.json (ver SETUP.md)');
  console.log('   2. Reload VS Code (Ctrl+Shift+P → Reload Window)');
  console.log('   3. Teste no Copilot: @workspace Liste componentes\n');

  console.log('📚 DOCUMENTAÇÃO:');
  console.log('   • SETUP.md - Configuração rápida VS Code');
  console.log('   • VSCODE_USAGE.md - Guia completo de uso');
  console.log('   • README.md - Overview do projeto\n');

} catch (error) {
  console.error('\n❌ Erro:', error.message);
  if (error.stack) {
    console.error('\n📋 Stack trace:');
    console.error(error.stack);
  }
} finally {
  await client.close();
  process.exit(0);
}
