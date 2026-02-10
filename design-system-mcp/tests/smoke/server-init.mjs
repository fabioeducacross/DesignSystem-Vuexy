#!/usr/bin/env node
/**
 * Smoke Test - MCP Server
 * 
 * Testa se o servidor consegue inicializar e carregar componentes
 * sem erros fatais.
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Iniciando smoke test do MCP Server...\n');

// Path correto: sobe 2 níveis (smoke/ e tests/) e vai para dist/
const rootDir = join(__dirname, '..', '..');
const serverPath = join(rootDir, 'dist', 'index.js');

console.log(`📂 Server path: ${serverPath}\n`);

const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
  cwd: rootDir
});

let stdout = '';
let stderr = '';
let initTimeout = null;

// Timeout de 10s para inicialização
initTimeout = setTimeout(() => {
  console.log('❌ Timeout: Servidor não inicializou em 10s\n');
  console.log('=== STDOUT ===');
  console.log(stdout);
  console.log('\n=== STDERR ===');
  console.log(stderr);
  server.kill();
  process.exit(1);
}, 10000);

server.stdout.on('data', (data) => {
  stdout += data.toString();
});

server.stderr.on('data', (data) => {
  const text = data.toString();
  stderr += text;
  
  // Detectar sucesso na inicialização
  if (text.includes('System initialized') || 
      text.includes('MCP Server running and ready')) {
    clearTimeout(initTimeout);
    console.log('✅ Servidor inicializado com sucesso!\n');
    console.log('=== LOG OUTPUT (últimas 50 linhas) ===');
    const lines = stderr.split('\n');
    console.log(lines.slice(-50).join('\n'));
    
    // Encerrar servidor
    server.kill();
    
    console.log('\n✅ Smoke test passou!\n');
    process.exit(0);
  }
  
  // Detectar erros fatais
  if (text.includes('ERROR') && text.includes('process.exit')) {
    clearTimeout(initTimeout);
    console.log('❌ Erro fatal detectado:\n');
    console.log(stderr);
    server.kill();
    process.exit(1);
  }
});

server.on('error', (error) => {
  clearTimeout(initTimeout);
  console.error('❌ Erro ao iniciar servidor:', error);
  process.exit(1);
});

server.on('exit', (code) => {
  clearTimeout(initTimeout);
  if (code !== 0 && code !== null) {
    console.log(`❌ Servidor encerrou com código ${code}\n`);
    console.log('=== STDERR ===');
    console.log(stderr);
    process.exit(1);
  }
});
