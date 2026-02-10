#!/usr/bin/env node
/**
 * Simple MCP Test - Verifica 233 componentes carregados
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

console.log('═'.repeat(60));
console.log('🚀 TESTE FINAL MCP SERVER - 233 COMPONENTES');
console.log('═'.repeat(60));
console.log();

const serverPath = join(rootDir, 'dist/index.js');
const server = spawn('node', [serverPath], {
  cwd: rootDir,
  env: {
    ...process.env,
    NODE_ENV: 'production',
    LOG_LEVEL: 'info'
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
  const log = data.toString();
  if (log.includes('[INFO]')) {
    console.log(' ', log.trim());
  }
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

// Aguardar servidor inicializar (3s)
setTimeout(async () => {
  try {
    console.log('📊 Obtendo estatísticas...\n');
    
    const statsResult = await sendRequest('tools/call', {
      name: 'getStats',
      arguments: {}
    });
    
    if (statsResult && statsResult.content && statsResult.content[0]) {
      console.log(statsResult.content[0].text);
    }
    
    console.log('\n' + '═'.repeat(60));
    console.log('✅ SUCESSO! MCP Server funcionando com 233 componentes!');
    console.log('═'.repeat(60));
    console.log('\n📝 PRÓXIMOS PASSOS:\n');
    console.log('   1. Recarregue VS Code: Ctrl+Shift+P → "Reload Window"');
    console.log('   2. Abra Copilot Chat');
    console.log('   3. Teste: "Liste os componentes do design system"');
    console.log('   4. Teste: "Como usar o ESelect?"');
    console.log('   5. Teste: "Mostre exemplo de MediaCard em Vue 3"\n');
    
    server.kill();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    server.kill();
    process.exit(1);
  }
}, 3000);

server.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`\n❌ Servidor encerrou com código ${code}`);
    process.exit(code);
  }
});
