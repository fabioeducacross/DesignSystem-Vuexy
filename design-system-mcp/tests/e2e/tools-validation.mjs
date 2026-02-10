#!/usr/bin/env node
/**
 * E2E Test - MCP Tools
 * 
 * Testa todas as 7 tools do servidor MCP via protocolo real.
 * Valida requests, responses e edge cases.
 */

import { spawn } from 'child_process';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Iniciando E2E test das MCP Tools...\n');

const serverPath = join(__dirname, '..', '..', 'dist', 'index.js');
let testResults = {
  passed: 0,
  failed: 0,
  errors: []
};

async function runTests() {
  // Criar cliente MCP
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath],
    env: {
      ...process.env,
      LOG_LEVEL: 'error' // Reduzir ruído nos logs
    }
  });
  
  const client = new Client({
    name: 'e2e-test-client',
    version: '1.0.0'
  }, {
    capabilities: {}
  });
  
  try {
    // Conectar ao servidor
    console.log('📡 Conectando ao servidor MCP...');
    await client.connect(transport);
    console.log('✅ Conectado!\n');
    
    // Test 1: ListTools
    await testListTools(client);
    
    // Test 2: listComponents
    await testListComponents(client);
    
    // Test 3: getComponent
    await testGetComponent(client);
    
    // Test 4: searchComponents
    await testSearchComponents(client);
    
    // Test 5: getStats
    await testGetStats(client);
    
    // Test 6: getComponentsByCategory
    await testGetComponentsByCategory(client);
    
    // Test 7: getCacheStats
    await testGetCacheStats(client);
    
    // Test 8: getSearchIndexStats
    await testGetSearchIndexStats(client);
    
    // Resumo
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMO DOS TESTES');
    console.log('='.repeat(60));
    console.log(`✅ Passou: ${testResults.passed}`);
    console.log(`❌ Falhou: ${testResults.failed}`);
    
    if (testResults.failed > 0) {
      console.log('\n❌ Erros encontrados:');
      testResults.errors.forEach(err => {
        console.log(`  - ${err}`);
      });
      process.exit(1);
    } else {
      console.log('\n🎉 Todos os testes passaram!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  } finally {
    try {
      await client.close();
    } catch (e) {
      // Ignorar erros ao fechar
    }
  }
}

async function testListTools(client) {
  console.log('🔧 Test 1: ListTools');
  try {
    const result = await client.listTools();
    
    // Validações
    if (!result.tools || !Array.isArray(result.tools)) {
      throw new Error('Response should have tools array');
    }
    
    if (result.tools.length !== 7) {
      throw new Error(`Expected 7 tools, got ${result.tools.length}`);
    }
    
    // Verificar nomes esperados
    const expectedTools = [
      'listComponents',
      'getComponent',
      'searchComponents',
      'getStats',
      'getComponentsByCategory',
      'getCacheStats',
      'getSearchIndexStats'
    ];
    
    const toolNames = result.tools.map(t => t.name);
    for (const expected of expectedTools) {
      if (!toolNames.includes(expected)) {
        throw new Error(`Missing tool: ${expected}`);
      }
    }
    
    console.log(`  ✅ ${result.tools.length} tools disponíveis`);
    testResults.passed++;
    
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}`);
    testResults.failed++;
    testResults.errors.push(`ListTools: ${error.message}`);
  }
}

async function testListComponents(client) {
  console.log('🔧 Test 2: listComponents');
  try {
    const result = await client.callTool({
      name: 'listComponents',
      arguments: {}
    });
    
    const data = JSON.parse(result.content[0].text);
    
    if (!Array.isArray(data.components)) {
      throw new Error('Response should have components array');
    }
    
    if (data.components.length === 0) {
      throw new Error('Should return at least 1 component');
    }
    
    // Validar estrutura do primeiro componente
    const comp = data.components[0];
    if (!comp.name || !comp.metadata || !comp.stats) {
      throw new Error('Component missing required fields');
    }
    
    console.log(`  ✅ ${data.components.length} componentes retornados`);
    testResults.passed++;
    
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}`);
    testResults.failed++;
    testResults.errors.push(`listComponents: ${error.message}`);
  }
}

async function testGetComponent(client) {
  console.log('🔧 Test 3: getComponent');
  try {
    // Primeiro, listar para pegar um componente válido
    const listResult = await client.callTool({
      name: 'listComponents',
      arguments: { limit: 1 }
    });
    
    const listData = JSON.parse(listResult.content[0].text);
    const componentName = listData.components[0].name;
    
    // Agora buscar esse componente
    const result = await client.callTool({
      name: 'getComponent',
      arguments: { name: componentName }
    });
    
    const data = JSON.parse(result.content[0].text);
    
    if (!data.component) {
      throw new Error('Response should have component field');
    }
    
    if (data.component.name !== componentName) {
      throw new Error(`Expected component ${componentName}, got ${data.component.name}`);
    }
    
    console.log(`  ✅ Componente "${componentName}" retornado`);
    testResults.passed++;
    
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}`);
    testResults.failed++;
    testResults.errors.push(`getComponent: ${error.message}`);
  }
}

async function testSearchComponents(client) {
  console.log('🔧 Test 4: searchComponents');
  try {
    const result = await client.callTool({
      name: 'searchComponents',
      arguments: { query: 'modal dialog' }
    });
    
    const data = JSON.parse(result.content[0].text);
    
    if (!Array.isArray(data.results)) {
      throw new Error('Response should have results array');
    }
    
    // Validar que tem scores
    if (data.results.length > 0) {
      const firstResult = data.results[0];
      if (!firstResult.component || typeof firstResult.score !== 'number') {
        throw new Error('Result should have component and score');
      }
    }
    
    console.log(`  ✅ ${data.results.length} resultados para "modal dialog"`);
    testResults.passed++;
    
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}`);
    testResults.failed++;
    testResults.errors.push(`searchComponents: ${error.message}`);
  }
}

async function testGetStats(client) {
  console.log('🔧 Test 5: getStats');
  try {
    const result = await client.callTool({
      name: 'getStats',
      arguments: {}
    });
    
    const data = JSON.parse(result.content[0].text);
    
    if (typeof data.totalComponents !== 'number') {
      throw new Error('Missing totalComponents');
    }
    
    if (typeof data.totalStories !== 'number') {
      throw new Error('Missing totalStories');
    }
    
    if (!data.categoryCounts || !data.priorityCounts) {
      throw new Error('Missing counts');
    }
    
    console.log(`  ✅ Stats: ${data.totalComponents} componentes, ${data.totalStories} stories`);
    testResults.passed++;
    
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}`);
    testResults.failed++;
    testResults.errors.push(`getStats: ${error.message}`);
  }
}

async function testGetComponentsByCategory(client) {
  console.log('🔧 Test 6: getComponentsByCategory');
  try {
    // Pegar stats para saber uma categoria válida
    const statsResult = await client.callTool({
      name: 'getStats',
      arguments: {}
    });
    
    const stats = JSON.parse(statsResult.content[0].text);
    const categories = Object.keys(stats.categoryCounts);
    
    if (categories.length === 0) {
      throw new Error('No categories found');
    }
    
    const categoryToTest = categories[0];
    
    const result = await client.callTool({
      name: 'getComponentsByCategory',
      arguments: { category: categoryToTest }
    });
    
    const data = JSON.parse(result.content[0].text);
    
    if (!Array.isArray(data.components)) {
      throw new Error('Response should have components array');
    }
    
    console.log(`  ✅ ${data.components.length} componentes na categoria "${categoryToTest}"`);
    testResults.passed++;
    
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}`);
    testResults.failed++;
    testResults.errors.push(`getComponentsByCategory: ${error.message}`);
  }
}

async function testGetCacheStats(client) {
  console.log('🔧 Test 7: getCacheStats');
  try {
    const result = await client.callTool({
      name: 'getCacheStats',
      arguments: {}
    });
    
    const data = JSON.parse(result.content[0].text);
    
    if (typeof data.itemsCount !== 'number') {
      throw new Error('Missing itemsCount field');
    }
    
    if (typeof data.totalHits !== 'number' || typeof data.totalMisses !== 'number') {
      throw new Error('Missing totalHits/totalMisses fields');
    }
    
    console.log(`  ✅ Cache: ${data.itemsCount} items, ${data.totalHits} hits, ${data.totalMisses} misses`);
    testResults.passed++;
    
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}`);
    testResults.failed++;
    testResults.errors.push(`getCacheStats: ${error.message}`);
  }
}

async function testGetSearchIndexStats(client) {
  console.log('🔧 Test 8: getSearchIndexStats');
  try {
    const result = await client.callTool({
      name: 'getSearchIndexStats',
      arguments: {}
    });
    
    const data = JSON.parse(result.content[0].text);
    
    if (typeof data.totalDocuments !== 'number') {
      throw new Error('Missing totalDocuments field');
    }
    
    if (typeof data.totalTokens !== 'number') {
      throw new Error('Missing totalTokens field');
    }
    
    console.log(`  ✅ Index: ${data.totalDocuments} documentos, ${data.totalTokens} tokens`);
    testResults.passed++;
    
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}`);
    testResults.failed++;
    testResults.errors.push(`getSearchIndexStats: ${error.message}`);
  }
}

// Executar testes
runTests().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
