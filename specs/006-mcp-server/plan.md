# Implementation Plan: Design System MCP Server

**Branch**: `feature/006-mcp-server` | **Date**: 09/02/2026 | **Spec**: [#6 MCP Server]
**Input**: Servidor MCP para expor metadados dos 111 componentes documentados via API padronizada

## Summary

Implementar servidor Model Context Protocol (MCP) que expõe metadados estruturados dos 111 componentes do Design System Educacross. O servidor permitirá que AI agents (Claude, Copilot) consultem documentação, props, exemplos e casos de uso de forma programática, melhorando developer experience e possibilitando automações futuras.

## Technical Context

**Language/Version**: TypeScript 5.3+, Node.js 18 LTS  
**Primary Dependencies**: `@modelcontextprotocol/sdk`, `@vue/compiler-sfc`, `gray-matter`, `fast-glob`  
**Storage**: File-based (leitura de `.stories.js` e `.vue` files)  
**Testing**: Vitest + MCP Inspector  
**Target Platform**: Local development (Claude Desktop, VSCode) + opcional npm package  
**Project Type**: Single service (servidor MCP standalone)  
**Performance Goals**: 
  - Listagem de componentes: <100ms
  - Detalhes de componente: <50ms
  - Busca semântica: <200ms
  - Startup do servidor: <2s
**Constraints**: 
  - Payload total <5MB
  - Uso de memória <100MB
  - Compatível com MCP Protocol v1.0
  - Sem dependências pesadas (evitar bundlers)
**Scale/Scope**: 111 componentes, 444+ stories, 229 arquivos .vue no educacross-frontoffice

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**✅ Passes Constitution**:
- Single project com escopo bem definido
- Arquitetura simples (Parser → Cache → MCP Server)
- Sem abstrações prematuras
- File-based, sem banco de dados
- Testes focados em contrato MCP

**⚠️ Justificativas**:
- **Parser de Vue SFC**: Necessário para extrair props/events/slots reais do código-fonte
- **Cache em memória**: Performance crítica - evita re-parse a cada query
- **Busca semântica básica**: Apenas string matching, sem embeddings complexos inicialmente

## Project Structure

### Documentation (this feature)

```text
specs/006-mcp-server/
├── plan.md              # Este arquivo
├── research.md          # Fase 0: Análise MCP SDK, parsers, exemplos
├── data-model.md        # Fase 1: Schema de Component, Tool definitions
├── quickstart.md        # Fase 1: Setup Claude Desktop + VSCode
├── contracts/           # Fase 1: Contratos MCP (listComponents, getComponent, etc.)
│   ├── list-components.md
│   ├── get-component.md
│   └── search-components.md
└── tasks.md             # Fase 2: Breakdown de implementação
```

### Source Code (repository root)

```text
# Criar novo projeto standalone
design-system-mcp/
├── src/
│   ├── index.ts                    # Entry point do MCP Server
│   ├── server.ts                   # Implementação do ComponentMCPServer
│   ├── parsers/
│   │   ├── stories-parser.ts       # Parse de .stories.js
│   │   ├── vue-parser.ts           # Parse de .vue com @vue/compiler-sfc
│   │   └── metadata-builder.ts     # Combina dados de stories + .vue
│   ├── cache/
│   │   └── component-cache.ts      # Cache em memória com invalidação
│   ├── types/
│   │   ├── component.ts            # Type Component, Prop, Event, Slot
│   │   └── mcp.ts                  # MCP Protocol types
│   └── utils/
│       ├── file-reader.ts          # Leitura de arquivos
│       └── search.ts               # Busca simples por nome/categoria
├── tests/
│   ├── unit/
│   │   ├── parsers.test.ts
│   │   ├── cache.test.ts
│   │   └── search.test.ts
│   ├── integration/
│   │   └── server.test.ts          # Testa MCP tools
│   └── fixtures/
│       ├── sample.stories.js
│       └── sample.vue
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md

# Integração com DesignSystem-Vuexy (path references)
../DesignSystem-Vuexy/
├── src/stories/educacross-components-v2/  # Source de stories
└── educacross-frontoffice/src/components/ # Source de .vue files
```

**Structure Decision**: Projeto standalone separado do DesignSystem-Vuexy para manter separação de responsabilidades. MCP Server referencia paths relativos para ler stories e componentes Vue, mas não depende do build do Storybook.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Parser de Vue SFC | Extrair props/events/slots do código-fonte | Apenas stories não tem metadados completos de tipos |
| Cache em memória | Performance <100ms obrigatória | Re-parse a cada query seria 10x mais lento |
| Busca semântica | Requisito para queries de AI natural | Apenas getComponent(name) não resolve "componente para upload" |

## Phase 0: Research (Estimativa: 3-5 dias)

**Objetivos**:
1. Entender MCP Protocol v1.0 e SDK oficial
2. Analisar parsers existentes (@vue/compiler-sfc)
3. Estudar exemplos de MCP Servers (filesystem, git)
4. Definir schema de metadados do Component

**Entregáveis**:
- `research.md` com findings técnicos
- Proof of concept de parser de 1 .stories.js
- Proof of concept de parser de 1 .vue
- Validação de performance de parsing (benchmark)

**Perguntas a Responder**:
- Como @vue/compiler-sfc extrai props de `<script setup>`?
- MCP SDK suporta streaming de resultados grandes?
- Como invalidar cache quando arquivos mudam?
- Busca semântica: usar Fuse.js ou implementar simples?

## Phase 1: Design (Estimativa: 4-6 dias)

**Objetivos**:
1. Definir schema completo de Component
2. Especificar contratos MCP (tools)
3. Desenhar arquitetura de cache
4. Criar quickstart para Claude Desktop

**Entregáveis**:
- `data-model.md`: TypeScript interfaces de Component
- `contracts/`: Specs de cada MCP tool
- `quickstart.md`: Guia de configuração Claude Desktop/VSCode

**Contratos MCP a Definir**:

```typescript
// Tool: listComponents
input: { category?: string, priority?: 'P0' | 'P1' | 'P2' }
output: Component[]

// Tool: getComponent
input: { name: string }
output: ComponentDetail

// Tool: searchComponents
input: { query: string, limit?: number }
output: Component[]

// Tool: getStats
input: {}
output: { totalComponents, totalStories, categories }
```

## Phase 2: Implementation (Estimativa: 8-10 dias)

**Será detalhado em `tasks.md` via `/speckit.tasks`**

Breakdown preliminar:
1. Setup projeto TypeScript + MCP SDK
2. Implementar parsers (stories + vue)
3. Implementar cache com invalidação
4. Implementar MCP Server com tools
5. Testes unitários (parsers, cache, search)
6. Testes de integração (MCP Inspector)
7. Validação com Claude Desktop
8. Documentação (README, API reference)

## Phase 3: Validation (Estimativa: 5-7 dias)

**Critérios de Sucesso**:

**Performance**:
- [ ] `listComponents()` <100ms (warm cache)
- [ ] `getComponent()` <50ms (warm cache)
- [ ] `searchComponents()` <200ms
- [ ] Startup <2s
- [ ] Uso de memória <100MB

**Funcionalidade**:
- [ ] Todos 111 componentes listados
- [ ] Props/events/slots extraídos corretamente
- [ ] Stories linkadas funcionam
- [ ] Busca retorna resultados relevantes

**Integração**:
- [ ] Claude Desktop conecta sem erros
- [ ] MCP Inspector mostra todos tools
- [ ] 10 queries reais testadas com sucesso

**Qualidade**:
- [ ] Cobertura de testes >80%
- [ ] 0 erros TypeScript
- [ ] README completo com exemplos

## Success Metrics

**Semana 1-2 pós-lançamento**:
- 3-5 desenvolvedores testando ativamente
- Tempo de resposta médio <1s
- Taxa de erro <5%
- Feedback positivo >80%

**Longo prazo (3 meses)**:
- Adoção por 100% do time frontend
- >50 queries/dia
- Developer satisfaction score >8/10
- Base para Issue #5 (automação) se validado

## Risks & Mitigations

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Parser Vue quebra com syntax nova | Alto | Médio | Usar @vue/compiler-sfc oficial + testes |
| Performance abaixo do target | Alto | Baixo | Cache agressivo + lazy loading |
| MCP Protocol muda | Médio | Baixo | Usar SDK oficial + pin de versão |
| Stories sem metadata suficiente | Médio | Médio | Fallback para parsing de .vue |
| Manutenção contínua cara | Médio | Médio | Automatizar ou aceitar eventual desatualização |

## Dependencies & Blockers

**Depende de**:
- ✅ PR #7 merged (111 componentes documentados)
- ✅ Storybook rodando localmente
- ⏳ Claude Desktop instalado (validação)

**Bloqueia**:
- Issue #5 (automação) - MCP pode ser data source
- Futuras integrações (VSCode extension, CLI)

## Timeline

```
Semana 1:   Phase 0 - Research
Semana 2:   Phase 1 - Design  
Semana 3-4: Phase 2 - Implementation
Semana 5:   Phase 3 - Validation + Ajustes
```

**Total**: 5 semanas (25 dias úteis)  
**Início**: Após merge de PR #7  
**Conclusão esperada**: Março 2026

## Next Steps

1. ✅ Merge PR #7 (DesignSystem-Vuexy)
2. ✅ Criar branch `feature/006-mcp-server`
3. ✅ Executar `/speckit.plan` em Phase 0 (research)
4. ⏳ Criar `research.md` após 3-5 dias de investigação
5. ⏳ Executar `/speckit.plan` em Phase 1 (design)
6. ⏳ Executar `/speckit.tasks` para breakdown Phase 2

---

**Autor**: AI Agent (Fullstack Programmer Mode)  
**Reviewers**: @fabioeducacross  
**Status**: DRAFT - Aguardando merge PR #7
