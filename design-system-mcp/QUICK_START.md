# Guia Rápido - MCP Server

Guia de uso rápido do servidor MCP para Design System Educacross.

---

## 🚀 Quick Start

### 1. Instalação e Build
```bash
cd design-system-mcp
npm install
npm run build
```

### 2. Configuração
```bash
# Copiar .env.example para .env
cp .env.example .env

# Ajustar paths se necessário
nano .env
```

### 3. Teste Rápido
```bash
# Smoke test
node tests/smoke/server-init.mjs

# Todos os testes
npm test
```

---

## 🧪 Teste com MCP Inspector

### Instalação
```bash
npm install -g @modelcontextprotocol/inspector
```

### Uso
```bash
# Build primeiro
npm run build

# Iniciar inspector
npx @modelcontextprotocol/inspector dist/index.js
```

### Interface
- Navegador abre automaticamente em `http://localhost:5173`
- Lista de tools disponíveis à esquerda
- Formulário de parâmetros ao centro
- Resposta JSON à direita

### Exemplos de Testes

#### 1. Listar Componentes
**Tool**: `listComponents`  
**Parâmetros**: `{}` (vazio)  
**Esperado**: Array com 123 componentes

#### 2. Buscar Componente
**Tool**: `getComponent`  
**Parâmetros**:
```json
{
  "name": "ProgressBar"
}
```
**Esperado**: Objeto com metadados completos

#### 3. Busca por Query
**Tool**: `searchComponents`  
**Parâmetros**:
```json
{
  "query": "modal dialog popup"
}
```
**Esperado**: Componentes relacionados a modais

#### 4. Filtrar por Categoria
**Tool**: `listComponents`  
**Parâmetros**:
```json
{
  "filters": {
    "category": "Forms"
  }
}
```
**Esperado**: Apenas componentes de formulários

#### 5. Estatísticas
**Tool**: `getStats`  
**Parâmetros**: `{}`  
**Esperado**: Objeto com contagens e distribuições

---

## 🤖 Integração com Claude Desktop

### Localização do Config
**Windows**:
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Mac**:
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

### Configuração
```json
{
  "mcpServers": {
    "design-system": {
      "command": "node",
      "args": [
        "C:/Users/Educacross/Documents/Educacross/DesignSystem-Vuexy/design-system-mcp/dist/index.js"
      ],
      "env": {
        "LOG_LEVEL": "info",
        "LOG_OUTPUT": "stderr"
      }
    }
  }
}
```

**⚠️ Importante**:
- Use **path absoluto** para `dist/index.js`
- Use barras normais `/` (mesmo no Windows)
- Ajuste o path conforme seu ambiente

### Reiniciar Claude
1. Fechar completamente Claude Desktop
2. Reabrir aplicação
3. Verificar que servidor aparece na lista de MCPs

### Exemplos de Uso no Claude

#### Perguntas simples
```
"Liste todos os componentes do design system"
"Mostre detalhes do componente ProgressBar"
"Busque componentes relacionados a tabelas"
```

#### Perguntas com filtros
```
"Quais são os componentes de alta prioridade (P0)?"
"Liste componentes da categoria Forms"
"Mostre componentes com a tag 'responsive'"
```

#### Perguntas complexas
```
"Quais componentes têm mais de 5 props?"
"Compare os componentes Modal e Dialog"
"Sugira qual componente usar para exibir progresso de upload"
```

---

## 🔧 Desenvolvimento

### Watch Mode
```bash
npm run dev  # Recompila automaticamente
```

### Testes
```bash
npm test              # Watch mode
npm test -- --run     # Single run
npm run test:coverage # Com cobertura
```

### Logs
```bash
# Modo debug (mais verboso)
LOG_LEVEL=debug npm run dev

# Logs em arquivo
LOG_OUTPUT=file LOG_FILE=/tmp/mcp.log npm run dev
```

---

## 📦 Tools Disponíveis

### 1. `listComponents`
Lista componentes com filtros opcionais.

**Parâmetros**:
```typescript
{
  filters?: {
    category?: string;
    priority?: 'P0' | 'P1' | 'P2';
    tags?: string[];
  };
  limit?: number;
  offset?: number;
}
```

### 2. `getComponent`
Busca componente por nome.

**Parâmetros**:
```typescript
{
  name: string;
}
```

### 3. `searchComponents`
Busca semântica por query.

**Parâmetros**:
```typescript
{
  query: string;
  limit?: number;
}
```

### 4. `getStats`
Estatísticas agregadas.

**Parâmetros**: `{}`

### 5. `getComponentsByCategory`
Componentes de uma categoria.

**Parâmetros**:
```typescript
{
  category: string;
}
```

### 6. `getCacheStats`
Estatísticas de cache.

**Parâmetros**: `{}`

### 7. `getSearchIndexStats`
Estatísticas do índice de busca.

**Parâmetros**: `{}`

---

## 🐛 Troubleshooting

### Servidor não inicia
```bash
# Verificar paths no .env
cat .env

# Verificar se diretórios existem
ls ../src/stories/educacross-components-v2
ls ../educacross-frontoffice/src/components
```

### Componentes não carregam
```bash
# Verificar logs com debug
LOG_LEVEL=debug node dist/index.js 2>&1 | tee mcp.log
```

### Claude não reconhece servidor
1. Verificar path absoluto no config
2. Verificar que `dist/index.js` existe
3. Reiniciar Claude completamente
4. Verificar logs em:
   - Windows: `%APPDATA%\Claude\logs\`
   - Mac: `~/Library/Logs/Claude/`

### Erros de parsing
```bash
# Testar parsing de arquivo individual
node -e "
import { parseStoryFile } from './dist/parsers/story-parser.js';
const result = await parseStoryFile('path/to/file.stories.js');
console.log(JSON.stringify(result, null, 2));
"
```

---

## 📊 Métricas Esperadas

### Inicialização
- **Tempo**: ~700-1000ms
- **Componentes**: 123
- **Stories**: 967
- **Erros**: 0

### Cache
- **TTL**: 3600s (1 hora)
- **Hit rate**: > 80% após warmup
- **Memória**: < 100MB

### Performance
- `listComponents`: < 10ms
- `getComponent`: < 5ms
- `searchComponents`: < 50ms

---

## 🔗 Links Úteis

- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [Claude Desktop](https://claude.ai/download)
- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-dev)
- [Documentação Completa](./README.md)
- [Phase 3 Testing](./docs/PHASE3_E2E_TESTING.md)
