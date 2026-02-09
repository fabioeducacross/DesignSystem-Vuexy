# Design System MCP Server

MCP Server para expor metadados dos 111 componentes documentados do Design System Educacross.

## 🎯 Objetivo

Fornecer interface MCP (Model Context Protocol) para que LLMs possam consultar:
- Lista de componentes disponíveis
- Metadados detalhados (props, events, slots)
- Stories do Storybook
- Busca semântica por componentes

## 📦 Status

**Phase 0: Research** - ✅ Concluída
- `research.md` com análise técnica completa
- PoCs de parsers (.stories.js + .vue) implementados

**Phase 1: Design** - ⏳ Próxima
- Definir schemas TypeScript completos
- Especificar contratos MCP
- Arquitetura de cache

## 🏗️ Arquitetura

```
design-system-mcp/
├── src/
│   ├── index.ts              # Entry point + MCP setup
│   ├── server/
│   │   ├── handlers.ts       # MCP request handlers
│   │   └── tools.ts          # Tool definitions
│   ├── parsers/
│   │   ├── story-parser.ts   # Parser de .stories.js
│   │   └── vue-parser.ts     # Parser de .vue SFC
│   ├── cache/
│   │   ├── memory-cache.ts   # In-memory cache
│   │   └── invalidator.ts    # File watcher (chokidar)
│   ├── types/
│   │   ├── component.ts      # Component metadata schema
│   │   └── mcp.ts            # MCP-specific types
│   └── utils/
│       ├── logger.ts
│       └── paths.ts
└── tests/
    ├── unit/                 # Testes unitários
    ├── integration/          # Testes de integração MCP
    ├── fixtures/             # Dados de teste
    └── poc/                  # Proofs of Concept
```

## 🔧 Setup

```bash
# Instalar dependências
npm install

# Copiar .env.example
cp .env.example .env

# Rodar PoCs
npx tsx tests/poc/story-parser-poc.ts
npx tsx tests/poc/vue-parser-poc.ts
```

## 🧪 Testes

```bash
# Rodar testes
npm test

# Com coverage
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
- **Language**: TypeScript 5.3+
- **MCP SDK**: @modelcontextprotocol/sdk
- **Parsers**: @vue/compiler-sfc, @babel/parser
- **Testing**: Vitest
- **File watching**: chokidar

## 📄 Licença

MIT - Educacross
