#!/usr/bin/env node
/**
 * Test MCP Server Tools
 * Testa todas as 7 ferramentas do MCP Server
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

console.log('🚀 Iniciando MCP Server...\n');

const serverPath = join(rootDir, 'dist/index.js');
const server = spawn('node', [serverPath], {
  cwd: rootDir,
  env: {
    ...process.env,
    NODE_ENV: 'production',
    LOG_LEVEL: 'error' // Silenciar logs internos
  }
});

let jsonRpcId = 1;
const pendingRequests = new Map();

// Processar linhas do servidor
const rl = readline.createInterface({
  input: server.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (!line.trim()) return;
  
  try {
    const response = JSON.parse(line);
    
    if (response.id && pendingRequests.has(response.id)) {
      const { resolve } = pendingRequests.get(response.id);
      pendingRequests.delete(response.id);
      resolve(response.result);
    }
  } catch (e) {
    // Ignorar linhas que não são JSON
  }
});

server.stderr.on('data', (data) => {
  // Silenciar stderr para logs internos
});

// Função para enviar request
function sendRequest(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = jsonRpcId++;
    const request = {
      jsonrpc: '2.0',
      id,
      method,
      params
    };
    
    pendingRequests.set(id, { resolve, reject });
    server.stdin.write(JSON.stringify(request) + '\n');
    
    // Timeout de 5s
    setTimeout(() => {
      if (pendingRequests.has(id)) {
        pendingRequests.delete(id);
        reject(new Error('Request timeout'));
      }
    }, 5000);
  });
}

// Aguardar servidor inicializar
setTimeout(async () => {
  try {
    console.log('📋 Listando ferramentas disponíveis...\n');
    
    // 1. List Tools
    const tools = await sendRequest('tools/list');
    console.log(`✅ ${tools.tools.length} ferramentas encontradas:\n`);
    tools.tools.forEach((tool, i) => {
      console.log(`   ${i+1}. ${tool.name}`);
      console.log(`      ${tool.description.split('\n')[0]}`);
    });
    
    console.log('\n🧪 Testando ferramentas...\n');
    
    // 2. Search Components
    console.log('1️⃣  searchComponents("select")');
    const searchResult = await sendRequest('tools/call', {
      name: 'searchComponents',
      arguments: { query: 'select' }
    });
    const components = searchResult.content[0].text;
    const componentCount = (components.match(/##\s/g) || []).length;
    console.log(`   ✅ ${componentCount} componentes encontrados\n`);
    
    // 3. List Components
    console.log('2️⃣  listComponents({ category: "Forms" })');
    const listResult = await sendRequest('tools/call', {
      name: 'listComponents',
      arguments: { category: 'Forms' }
    });
    const listText = listResult.content[0].text;
    const formComponents = (listText.match(/##\s/g) || []).length;
    console.log(`   ✅ ${formComponents} componentes na categoria Forms\n`);
    
    // 4. Get Component
    console.log('3️⃣  getComponent("ESelect")');
    const componentResult = await sendRequest('tools/call', {
      name: 'getComponent',
      arguments: { name: 'ESelect' }
    });
    const eselectData = componentResult.content[0].text;
    const hasProps = eselectData.includes('## Props');
    const hasSnippets = eselectData.includes('## Code Examples');
    console.log(`   ✅ ESelect carregado (${hasProps ? 'com props' : 'sem props'}, ${hasSnippets ? 'com snippets' : 'sem snippets'})\n`);
    
    // 5. Get Stats
    console.log('4️⃣  getStats()');
    const statsResult = await sendRequest('tools/call', {
      name: 'getStats',
      arguments: {}
    });
    
    if (!statsResult.content || !statsResult.content[0]) {
      console.error('   ❌ Erro ao obter stats:', JSON.stringify(statsResult, null, 2));
      throw new Error('Stats result inválido');
    }
    
    const statsText = statsResult.content[0].text;
    console.log(`   ✅ Estatísticas obtidas\n`);
    
    // 6. Get Cache Stats
    console.log('5️⃣  getCacheStats()');
    const cacheResult = await sendRequest('tools/call', {
      name: 'getCacheStats',
      arguments: {}
    });
    console.log(`   ✅ Cache stats obtidos\n`);
    
    // 7. Get Search Index Stats
    console.log('6️⃣  getSearchIndexStats()');
    const indexResult = await sendRequest('tools/call', {
      name: 'getSearchIndexStats',
      arguments: {}
    });
    console.log(`   ✅ Search index stats obtidos\n`);
    
    console.log('═'.repeat(60));
    console.log('✅ TODOS OS TESTES PASSARAM!');
    console.log('═'.repeat(60));
    console.log('\n📝 PRÓXIMOS PASSOS:\n');
    console.log('   1. VS Code já está configurado (.vscode/settings.json)');
    console.log('   2. Recarregue o VS Code: Ctrl+Shift+P → "Reload Window"');
    console.log('   3. Abra o Copilot Chat e teste:');
    console.log('      • "Liste componentes de formulário"');
    console.log('      • "Como usar o ESelect?"');
    console.log('      • "Mostre exemplo de MediaCard em Vue 3"\n');
    
    server.kill();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    server.kill();
    process.exit(1);
  }
}, 2000);

server.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`\n❌ Servidor encerrou com código ${code}`);
    process.exit(code);
  }
});
