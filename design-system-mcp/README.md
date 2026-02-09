# Design System MCP Server

Servidor MCP (Model Context Protocol) que expõe metadados dos **111 componentes** documentados no Storybook do Design System Educacross.

## 🎯 Features

- **5 Tools MCP** implementadas
- **Parsers** para `.stories.js` (Babel) e `.vue` (@vue/compiler-sfc)
- **Cache em memória** com TTL e invalidação automática (chokidar)
- **Search index** com scoring TF-IDF
- **Component loader** que agrega metadata de stories + implementação Vue
- **TypeScript 5.7** com types completos
- **Vitest** com 400+ linhas de testes

## 📊 Stats

- **3193 linhas** de código (Phase 2)
- **11 módulos** (parsers, cache, search, loader, handlers)
- **10 arquivos de teste** (unit + integration)
- **Performance targets**: <100ms listComponents, <50ms getComponent, <200ms search

## 📦 Status

**Phase 0: Research** - ✅ Concluída  
**Phase 1: Design** - ✅ Concluída (types, config, scaffold)  
**Phase 2: Implementation** - ✅ Concluída (parsers, cache, search, loader, handlers)  
**Phase 3: Testing & Docs** - ⏳ Próxima

## 🛠️ Tools Disponíveis

### 1. `listComponents`
Lista componentes com paginação e filtros.

**Parâmetros:**
```json
{
  "page": 1,
  "limit": 20,
  "category": "Forms",
  "priority": "P0",
  "tags": ["interactive", "form"]
}
```

**Resposta:**
```json
{
  "components": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 111,
    "totalPages": 6
  }
}
```

### 2. `getComponent`
Obtém detalhes completos de um componente.

**Parâmetros:**
```json
{
  "name": "Button"
}
```

**Resposta:**
```json
{
  "name": "Button",
  "category": "Forms",
  "priority": "P0",
  "metadata": {
    "title": "Educacross Components V2/Forms/Button",
    "description": "...",
    "tags": ["interactive", "form"]
  },
  "stories": [...],
  "props": [...],
  "events": [...],
  "slots": [...],
  "paths": {
    "storyFile": "...",
    "vueFile": "...",
    "storybookUrl": "..."
  },
  "stats": {
    "storiesCount": 5,
    "propsCount": 8,
    "eventsCount": 3,
    "slotsCount": 1
  }
}
```

### 3. `searchComponents`
Busca textual em componentes com scoring de relevância.

**Parâmetros:**
```json
{
  "query": "button form interactive",
  "limit": 10
}
```

**Resposta:**
```json
{
  "query": "button form interactive",
  "results": [
    {
      "component": {...},
      "score": 0.95,
      "matchedTerms": ["button", "form", "interactive"],
      "matchedFields": ["name", "category", "tags"]
    }
  ],
  "total": 5
}
```

### 4. `getStats`
Estatísticas agregadas do Design System.

**Resposta:**
```json
{
  "components": {
    "total": 111,
    "byCategory": {
      "Forms": 23,
      "Layout": 15,
      ...
    },
    "byPriority": {
      "P0": 40,
      "P1": 50,
      "P2": 21
    }
  },
  "cache": {
    "itemsCount": 111,
    "totalHits": 1523,
    "totalMisses": 42,
    "hitRate": 0.973,
    "memoryUsage": 2456789
  },
  "search": {
    "totalDocuments": 111,
    "totalTokens": 3421,
    "averageTokensPerDocument": 30.8
  },
  "topTags": [
    { "tag": "interactive", "count": 45 },
    { "tag": "form", "count": 38 },
    ...
  ]
}
```

### 5. `getComponentsByCategory`
Obtém todos os componentes de uma categoria.

**Parâmetros:**
```json
{
  "category": "Forms"
}
```

**Resposta:**
```json
{
  "category": "Forms",
  "components": [...],
  "total": 23
}
```

## 🏗️ Arquitetura

```
design-system-mcp/
├── src/
│   ├── cache/
│   │   ├── memory-cache.ts      # Cache em memória com TTL
│   │   └── invalidator.ts        # File watcher (chokidar)
│   ├── loader/
│   │   └── component-loader.ts   # Agrega stories + vue
│   ├── parsers/
│   │   ├── story-parser.ts       # Babel AST parser
│   │   └── vue-parser.ts         # @vue/compiler-sfc parser
│   ├── search/
│   │   └── index.ts              # Inverted index com TF-IDF
│   ├── types/
│   │   ├── component.ts          # Component schema
│   │   ├── story.ts              # Story metadata
│   │   ├── vue.ts                # Vue SFC types
│   │   └── mcp.ts                # MCP protocol types
│   ├── utils/
│   │   ├── logger.ts             # Structured logging
│   │   └── paths.ts              # Path resolution
│   ├── config/
│   │   └── index.ts              # Config management
│   └── index.ts                  # MCP Server entry point
├── tests/
│   ├── unit/                     # Unit tests
│   │   ├── cache.test.ts
│   │   ├── story-parser.test.ts
│   │   ├── vue-parser.test.ts
│   │   └── types.test.ts
│   └── integration/              # Integration tests
│       └── handlers.test.ts
├── specs/
│   └── 006-mcp-server/
│       ├── research.md           # Phase 0 technical analysis
│       ├── plan.md               # Architecture & phases
│       └── tasks.md              # 79 detailed tasks
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

### Parser Flow
```
.stories.js → Babel Parser → AST → Story Metadata
.vue → @vue/compiler-sfc → SFC Descriptor → Vue Metadata
```

### Component Loading Flow
```
Scan stories dir
  ↓
Parse .stories.js (Babel)
  ↓
Find matching .vue
  ↓
Parse .vue (@vue/compiler-sfc)
  ↓
Aggregate Component
  ↓
Cache + Search Index
```

### MCP Request Flow
```
MCP Client → stdio → Server Handler → Cache/Search → Response
```

### Cache Invalidation Flow
```
File change (chokidar)
  ↓
Debounce 500ms
  ↓
Invalidate cache entry
  ↓
Next request → cache miss → reload component
```

## 🔧 Setup

```bash
# Instalar dependências
npm install

# Copiar configuração
cp .env.example .env

# Compilar TypeScript
npm run build

# Executar testes
npm test

# Rodar servidor
npm start
```

## 🚀 Execução

### Modo Desenvolvimento
```bash
npm run dev
```

### Modo Produção
```bash
npm start
```

### Com MCP Inspector
```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

## 🧪 Testes

```bash
# Todos os testes
npm test

# Testes unitários
npm run test:unit

# Testes de integração
npm run test:integration

# Coverage
npm run test:coverage

# Watch mode
npm run test -- --watch
```

## 📚 Documentação Técnica

Ver `specs/006-mcp-server/` no projeto principal:
- `plan.md` - Arquitetura e fases do projeto
- `tasks.md` - 79 tasks detalhadas para implementação
- `research.md` - Análise técnica e PoCs da Phase 0

## 🔗 Integração

O servidor será integrado ao Claude Desktop via `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "design-system": {
      "command": "node",
      "args": ["/caminho/para/design-system-mcp/dist/index.js"]
    }
  }
}
```

## 📊 Performance Targets

- `listComponents()`: <100ms (warm cache)
- `getComponent()`: <50ms (warm cache)
- `searchComponents()`: <200ms
- Startup: <2s
- Memória: <100MB

## 🛠️ Stack

- **Runtime**: Node.js 18+ LTS
- **Language**: TypeScript 5.7+
- **MCP SDK**: @modelcontextprotocol/sdk
- **Parsers**: @vue/compiler-sfc, @babel/parser
- **Testing**: Vitest
- **File watching**: chokidar

## 🐛 Troubleshooting

### Erro: "Cannot find module..."
```bash
# Recompilar TypeScript
npm run build
```

### Cache não invalida
```bash
# Verificar se chokidar está instalado
npm list chokidar

# Verificar logs
LOG_LEVEL=debug npm start
```

### Parser errors
```bash
# Verificar sintaxe do arquivo
# Logs mostrarão linha/coluna do erro
LOG_LEVEL=debug npm test
```

## 📝 Contributing

1. Fork o repositório
2. Criar branch: `git checkout -b feature/minha-feature`
3. Commit alterações: `git commit -m 'feat: minha feature'`
4. Push: `git push origin feature/minha-feature`
5. Abrir Pull Request

## 📄 License

MIT

## 🔗 Links

- [MCP Protocol](https://github.com/modelcontextprotocol/protocol)
- [Storybook Design System](http://localhost:6006)
- [Issue #6](https://github.com/fabioeducacross/DesignSystem-Vuexy/issues/6)
- [Docs completos](./specs/006-mcp-server/)

## 👥 Authors

- **Fabio Silva** - [@fabioeducacross](https://github.com/fabioeducacross)

---

**Status**: ✅ Phase 2 Complete (Parsers, Cache, Search, Loader, Handlers)  
**Next**: Phase 3 (End-to-end tests, Documentation, Performance benchmarks)

## 📄 Licença

MIT - Educacross
