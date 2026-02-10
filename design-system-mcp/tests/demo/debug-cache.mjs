#!/usr/bin/env node
/**
 * Debug MCP Server Cache
 * Verifica se cache está sendo carregado corretamente
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

console.log('🔍 DEBUG: Cache Loading\n');

const serverPath = join(rootDir, 'dist/index.js');
const server = spawn('node', [serverPath], {
  cwd: rootDir,
  env: {
    ...process.env,
    NODE_ENV: 'production',
    LOG_LEVEL: 'debug' // Mostrar todos os logs
  }
});

let jsonRpcId = 1;
const pendingRequests = new Map();

// Capturar STDERR (logs)
server.stderr.on('data', (data) => {
  const log = data.toString();
  if (log.includes('[INFO]') || log.includes('[DEBUG]') || log.includes('[WARN]')) {
    console.log('📝 LOG:', log.trim());
  }
});

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
    
    // Timeout de 10s
    setTimeout(() => {
      if (pendingRequests.has(id)) {
        pendingRequests.delete(id);
        reject(new Error('Request timeout'));
      }
    }, 10000);
  });
}

// Aguardar servidor inicializar
setTimeout(async () => {
  try {
    console.log('\n🧪 Testando getStats()...\n');
    
    const statsResult = await sendRequest('tools/call', {
      name: 'getStats',
      arguments: {}
    });
    
    console.log('📊 Stats Response:\n');
    console.log(statsResult.content[0].text);
    
    console.log('\n✅ Sucesso!\n');
    
    server.kill();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    server.kill();
    process.exit(1);
  }
}, 5000); // Aguardar 5s para inicialização

server.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`\n❌ Servidor encerrou com código ${code}`);
    process.exit(code);
  }
});
