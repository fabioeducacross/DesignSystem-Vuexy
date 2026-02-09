# Tasks: Design System MCP Server

**Input**: Design documents from `/specs/006-mcp-server/`
**Prerequisites**: plan.md ✅

**Tests**: Incluídos e recomendados para garantir contrato MCP

**Organization**: Tasks agrupadas por funcionalidade para permitir implementação e teste independente

## Format: `[ID] [P?] [Feature] Description`

- **[P]**: Pode executar em paralelo (arquivos diferentes, sem dependências)
- **[Feature]**: Funcionalidade à qual a task pertence
- Caminhos exatos incluídos nas descrições

## Path Conventions

Projeto standalone em `design-system-mcp/`:
- `src/` para código fonte
- `tests/` para testes
- Referências para `../DesignSystem-Vuexy/` quando necessário

---

## Phase 1: Setup (Infraestrutura Compartilhada)

**Purpose**: Inicialização do projeto e estrutura básica

**Checkpoint**: Projeto TypeScript pronto para desenvolvimento

- [ ] T001 Criar estrutura de diretórios conforme plan.md
  ```bash
  design-system-mcp/
    src/{parsers,cache,types,utils}/
    tests/{unit,integration,fixtures}/
  ```

- [ ] T002 [P] Inicializar projeto Node.js + TypeScript
  ```bash
  npm init -y
  npm install -D typescript @types/node vitest
  npm install @modelcontextprotocol/sdk @vue/compiler-sfc gray-matter fast-glob
  ```

- [ ] T003 [P] Configurar tsconfig.json com target ES2022, module NodeNext, strict mode

- [ ] T004 [P] Configurar vitest.config.ts para testes unit + integration

- [ ] T005 [P] Configurar ESLint + Prettier para TypeScript

- [ ] T006 [P] Criar .gitignore (node_modules, dist, .env, coverage)

- [ ] T007 [P] Criar package.json scripts:
  ```json
  {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
  ```

- [ ] T007.1 [P] 🆕 Criar `src/config/paths.ts` com PathConfig interface:
  ```typescript
  export interface PathConfig {
    storiesPath: string;      // ../DesignSystem-Vuexy/src/stories/...
    componentsPath: string;   // ../educacross-frontoffice/src/components
    cacheDir?: string;
  }
  ```

- [ ] T007.2 [P] 🆕 Criar `.env.example` com variáveis de ambiente:
  ```bash
  STORIES_PATH=../DesignSystem-Vuexy/src/stories/educacross-components-v2
  COMPONENTS_PATH=../DesignSystem-Vuexy/educacross-frontoffice/src/components
  CACHE_ENABLED=true
  LOG_LEVEL=info
  ```

- [ ] T007.3 [P] 🆕 Adicionar dotenv dependency e carregar configurações em index.ts

---

## Phase 2: Foundational (Tipos e Estruturas Base)

**Purpose**: Definições de tipos e interfaces que todos os módulos dependem

**⚠️ CRITICAL**: Nenhuma implementação pode começar até esta fase estar completa

**Checkpoint**: Tipos compilam sem erros, contratos MCP definidos

- [ ] T008 [P] Definir tipos base em `src/types/component.ts`:
  ```typescript
  interface Component, Prop, Event, Slot, Story, Example
  ```

- [ ] T009 [P] Definir tipos MCP em `src/types/mcp.ts`:
  ```typescript
  Tool definitions para listComponents, getComponent, searchComponents, getStats
  ```

- [ ] T010 [P] Criar fixtures de teste em `tests/fixtures/`:
  - `sample.stories.js` (ProgressBar completo)
  - `sample.vue` (componente com props/events/slots)
  - `sample-metadata.json` (expected output)

- [ ] T011 [P] Criar constantes em `src/utils/constants.ts`:
  ```typescript
  PATHS, CATEGORIES, PRIORITIES
  ```

---

## Phase 3: Feature - Stories Parser 📖

**Goal**: Extrair metadados de arquivos .stories.js do Storybook

**Independent Test**: Parser deve extrair título, categoria, stories de fixtures

### Tests for Stories Parser

- [ ] T012 [P] [Parser] Test: Parse story header em `tests/unit/stories-parser.test.ts`
  - Input: `tests/fixtures/sample.stories.js`
  - Output: `{ title, category, component }`
  - DEVE FALHAR inicialmente

- [ ] T013 [P] [Parser] Test: Parse argTypes em `tests/unit/stories-parser.test.ts`
  - Input: argTypes do fixture
  - Output: Prop[] com tipos corretos
  - DEVE FALHAR inicialmente

- [ ] T014 [P] [Parser] Test: Parse stories array em `tests/unit/stories-parser.test.ts`
  - Input: exports (Default, Playground, etc)
  - Output: Story[] com nomes e args
  - DEVE FALHAR inicialmente

### Implementation for Stories Parser

- [ ] T015 [Parser] Implementar `src/parsers/stories-parser.ts`:
  - Function `parseStoriesFile(filePath: string): Promise<ComponentMetadata>`
  - Usar regex para extrair exports e default
  - Extrair title usando regex match

- [ ] T016 [Parser] Implementar extração de argTypes:
  - Function `extractArgTypes(content: string): Prop[]`
  - Parse object notation de argTypes
  - Mapear control types para TypeScript types

- [ ] T017 [Parser] Implementar extração de stories:
  - Function `extractStories(content: string): Story[]`
  - Detectar `export const StorryName = {...}`
  - Extrair args de cada story

- [ ] T018 [Parser] Adicionar error handling para arquivos malformados

- [ ] T019 [Parser] Adicionar logging com levels (debug, info, error)

- [ ] T019.1 [Parser] 🆕 Implementar fallback graceful:
  - Se .stories.js não existe ou malformado, usar naming convention
  - Retornar metadata parcial ao invés de throw Error
  - Log warning mas continuar processamento

- [ ] T019.2 [Parser] 🆕 Adicionar retry com exponential backoff para file reads:
  - Retry até 3x em caso de ENOENT ou EACCES
  - Delay: 100ms, 200ms, 400ms
  - Só falhar após todas tentativas

- [ ] T019.3 [Parser] 🆕 Melhorar logs estruturados:
  - Incluir contexto: file path, line number, error type
  - Categorizar erros: PARSE_ERROR, FILE_NOT_FOUND, ACCESS_DENIED
  - Stack trace apenas em debug mode

**Checkpoint**: `npm test -- stories-parser` passa 100%, error handling robusto

---

## Phase 4: Feature - Vue Parser 🎨

**Goal**: Extrair props, events e slots de arquivos .vue

**Independent Test**: Parser deve extrair props TypeScript de fixtures

### Tests for Vue Parser

- [ ] T020 [P] [VueParser] Test: Parse props de `<script setup>` em `tests/unit/vue-parser.test.ts`
  - Input: `tests/fixtures/sample.vue`
  - Output: Prop[] com tipos TypeScript
  - DEVE FALHAR inicialmente

- [ ] T021 [P] [VueParser] Test: Parse emits em `tests/unit/vue-parser.test.ts`
  - Input: `defineEmits<{...}>()`
  - Output: Event[] com payloads
  - DEVE FALHAR inicialmente

- [ ] T022 [P] [VueParser] Test: Parse slots de template em `tests/unit/vue-parser.test.ts`
  - Input: `<slot name="header">`
  - Output: Slot[] com nomes
  - DEVE FALHAR inicialmente

### Implementation for Vue Parser

- [ ] T023 [VueParser] Implementar `src/parsers/vue-parser.ts`:
  - Function `parseVueFile(filePath: string): Promise<VueMetadata>`
  - Usar `@vue/compiler-sfc` para parse SFC
  - Extrair descriptor.script e descriptor.template

- [ ] T024 [VueParser] Implementar extração de props:
  - Function `extractProps(scriptContent: string): Prop[]`
  - Detectar `defineProps<{...}>()` e `withDefaults`
  - Parse TypeScript interface para extrair tipos

- [ ] T025 [VueParser] Implementar extração de events:
  - Function `extractEvents(scriptContent: string): Event[]`
  - Detectar `defineEmits<{...}>()`
  - Extrair event names e payload types

- [ ] T026 [VueParser] Implementar extração de slots:
  - Function `extractSlots(templateContent: string): Slot[]`
  - Regex para `<slot name="...">`
  - Detectar default slot

- [ ] T027 [VueParser] Adicionar fallback para Options API (se necessário)

**Checkpoint**: `npm test -- vue-parser` passa 100%

---

## Phase 5: Feature - Metadata Builder 🔧

**Goal**: Combinar dados de stories + vue em ComponentDetail completo

**Independent Test**: Builder deve mesclar dados de ambos parsers

### Tests for Metadata Builder

- [ ] T028 [P] [Builder] Test: Merge stories + vue metadata em `tests/unit/metadata-builder.test.ts`
  - Input: StoriesMetadata + VueMetadata
  - Output: ComponentDetail completo
  - DEVE FALHAR inicialmente

- [ ] T029 [P] [Builder] Test: Resolver conflitos de props em `tests/unit/metadata-builder.test.ts`
  - Quando prop existe em ambos, preferir tipo de .vue
  - DEVE FALHAR inicialmente

### Implementation for Metadata Builder

- [ ] T030 [Builder] Implementar `src/parsers/metadata-builder.ts`:
  - Function `buildComponentMetadata(stories, vue): ComponentDetail`
  - Merge props de ambas fontes
  - Adicionar events e slots de .vue
  - Adicionar stories de .stories.js

- [ ] T031 [Builder] Implementar lógica de prioridade:
  - Props: .vue > .stories (tipos mais precisos)
  - Stories: apenas de .stories
  - Events/Slots: apenas de .vue

- [ ] T032 [Builder] Adicionar validação de consistência:
  - Warn se prop em stories não existe em .vue
  - Warn se componente não tem stories

- [ ] T032.1 [Builder] 🆕 Implementar graceful degradation:
  - Se .vue não existe, usar apenas .stories metadados
  - Marcar componente com flag: `vueDataAvailable: false`
  - Continuar processamento normalmente

- [ ] T032.2 [Builder] 🆕 Warning ao invés de erro:
  - Se componente incomplete (sem props ou stories), log warning
  - Incluir no resultado mas marcar como incomplete
  - Não bloquear listagem geral

- [ ] T032.3 [Builder] 🆕 Adicionar `completeness` score:
  - 100%: stories + vue + props + events + slots
  - 75%: stories + vue + props
  - 50%: apenas stories
  - 25%: metadata mínimo

**Checkpoint**: `npm test -- metadata-builder` passa 100%, degradation funciona

---

## Phase 6: Feature - Component Cache 💾

**Goal**: Cache em memória com invalidação para performance <100ms

**Independent Test**: Cache deve retornar dados sem re-parse

### Tests for Component Cache

- [ ] T033 [P] [Cache] Test: Cache hit retorna instantâneo em `tests/unit/component-cache.test.ts`
  - Set component → Get component
  - Medir tempo <5ms
  - DEVE FALHAR inicialmente

- [ ] T034 [P] [Cache] Test: Cache miss dispara load em `tests/unit/component-cache.test.ts`
  - Get component não existente
  - Callback de load é chamado
  - DEVE FALHAR inicialmente

- [ ] T035 [P] [Cache] Test: Invalidação por file change em `tests/unit/component-cache.test.ts`
  - Simular mudança de arquivo
  - Cache deve invalidar entrada
  - DEVE FALHAR inicialmente

### Implementation for Component Cache

- [ ] T036 [Cache] Implementar `src/cache/component-cache.ts`:
  - Class ComponentCache com Map interno
  - Methods: get, set, clear, invalidate

- [ ] T037 [Cache] Implementar cache warm-up:
  - Function `warmUp(componentsPath): Promise<void>`
  - Load todos componentes em paralelo
  - Medir tempo total (target <2s para 111 componentes)

- [ ] T038 [Cache] Implementar invalidação inteligente:
  - Opcional: File watchers com chokidar
  - Manual: clear() method para forçar reload

- [ ] T039 [Cache] Adicionar estatísticas:
  - hit rate, miss rate, total size
  - Log periodicamente para debug

**Checkpoint**: `npm test -- component-cache` passa 100%, warm-up <2s

---

## Phase 7: Feature - MCP Server Implementation 🚀

**Goal**: Implementar servidor MCP com 4 tools principais

**Independent Test**: MCP Inspector deve listar e executar todos tools

### Tests for MCP Server

- [ ] T040 [P] [MCP] Contract test: listComponents em `tests/integration/server.test.ts`
  - Call tool sem args → retorna 111 componentes
  - Call tool com category → filtra corretamente
  - DEVE FALHAR inicialmente

- [ ] T041 [P] [MCP] Contract test: getComponent em `tests/integration/server.test.ts`
  - Call tool com name='ProgressBar'
  - Retorna ComponentDetail completo
  - DEVE FALHAR inicialmente

- [ ] T042 [P] [MCP] Contract test: searchComponents em `tests/integration/server.test.ts`
  - Query 'table' → retorna ListTable, DataTable
  - Query 'upload' → retorna componentes relacionados
  - DEVE FALHAR inicialmente

- [ ] T043 [P] [MCP] Contract test: getStats em `tests/integration/server.test.ts`
  - Retorna totalComponents=111
  - Retorna totalStories=444+
  - DEVE FALHAR inicialmente

### Implementation for MCP Server

- [ ] T044 [MCP] Implementar `src/server.ts`:
  - Class ComponentMCPServer extends MCPServer
  - Constructor inicializa cache e paths
  - Register dos 4 tools

- [ ] T045 [MCP] Implementar tool: listComponents
  ```typescript
  async listComponents(args: { category?, priority? }) {
    // Get from cache, filter, return
  }
  ```

- [ ] T046 [MCP] Implementar tool: getComponent
  ```typescript
  async getComponent(args: { name: string }) {
    // Get from cache, throw if not found
  }
  ```

- [ ] T047 [MCP] Implementar tool: searchComponents
  ```typescript
  async searchComponents(args: { query: string, limit? }) {
    // Busca em name, category, description
    // Return sorted by relevance
  }
  ```

- [ ] T048 [MCP] Implementar tool: getStats
  ```typescript
  async getStats() {
    // Aggregate from cache
  }
  ```

- [ ] T049 [MCP] Adicionar error handling global:
  - Try/catch em cada tool
  - Return MCP error responses padronizados

- [ ] T050 [MCP] Implementar `src/index.ts` (entry point):
  ```typescript
  const server = new ComponentMCPServer({
    storiesPath: '../DesignSystem-Vuexy/src/stories/educacross-components-v2',
    componentsPath: '../DesignSystem-Vuexy/educacross-frontoffice/src/components'
  });
  await server.start();
  ```

**Checkpoint**: `npm test -- server` passa 100%, MCP Inspector conecta

---

## Phase 8: Feature - Search Utilities 🔍

**Goal**: Busca semântica simples por string matching

**Independent Test**: Busca deve ranquear resultados por relevância

### Tests for Search

- [ ] T051 [P] [Search] Test: Busca exata por nome em `tests/unit/search.test.ts`
  - Query 'ProgressBar' → rank 1.0
  - DEVE FALHAR inicialmente

- [ ] T052 [P] [Search] Test: Busca por categoria em `tests/unit/search.test.ts`
  - Query 'feedback' → múltiplos resultados
  - DEVE FALHAR inicialmente

- [ ] T053 [P] [Search] Test: Busca fuzzy em `tests/unit/search.test.ts`
  - Query 'progres' → encontra 'ProgressBar'
  - DEVE FALHAR inicialmente

### Implementation for Search

- [ ] T054 [Search] Implementar `src/utils/search.ts`:
  - Function `searchComponents(query, components): Component[]`
  - Score por: exact match (1.0), starts with (0.8), contains (0.5)
  - Score por categoria (0.3)

- [ ] T055 [Search] Implementar fuzzy matching básico:
  - Levenshtein distance ou similar
  - Threshold de similaridade

- [ ] T056 [Search] Implementar sorting por relevância:
  - Ordenar por score descendente
  - Limit de resultados (default 10)

**Checkpoint**: `npm test -- search` passa 100%

---

## Phase 9: File Utilities 📁

**Goal**: Leitura de arquivos e glob patterns

**Independent Test**: Deve listar todos .stories.js e .vue corretamente

### Tests for File Reader

- [ ] T057 [P] [Files] Test: Glob pattern para stories em `tests/unit/file-reader.test.ts`
  - Pattern '**/*.stories.js' → 111 arquivos
  - DEVE FALHAR inicialmente

- [ ] T058 [P] [Files] Test: Glob pattern para vue em `tests/unit/file-reader.test.ts`
  - Pattern '**/*.vue' → 229 arquivos
  - DEVE FALHAR inicialmente

### Implementation for File Reader

- [ ] T059 [Files] Implementar `src/utils/file-reader.ts`:
  - Function `findStories(basePath): Promise<string[]>`
  - Function `findVueFiles(basePath): Promise<string[]>`
  - Usar fast-glob para performance

- [ ] T060 [Files] Adicionar cache de file paths:
  - Evitar re-scan em cada query
  - Invalidar quando necessário

- [ ] T060.1 [P] 🆕 Criar `examples/basic-query.ts`:
  ```typescript
  // Exemplo de uso programático do MCP Server
  import { ComponentMCPServer } from 'design-system-mcp';
  const server = new ComponentMCPServer({...});
  const components = await server.listComponents();
  ```

- [ ] T060.2 [P] 🆕 Criar `examples/claude-desktop-config.json`:
  ```json
  // Config completa para Claude Desktop
  {
    "mcpServers": {
      "educacross-design-system": {
        "command": "npx",
        "args": ["-y", "design-system-mcp"]
      }
    }
  }
  ```

- [ ] T060.3 [P] 🆕 Criar `examples/test-queries.txt` com 10 queries reais:
  - "Quais componentes de feedback temos?"
  - "Como usar o ProgressBar?"
  - "Qual componente para upload de arquivos?"
  - etc.

- [ ] T060.4 [P] 🆕 Adicionar exemplos práticos ao README.md:
  - Seção "Quick Start" com copy-paste pronto
  - Seção "Common Queries" com exemplos
  - Troubleshooting guide com erros comuns

**Checkpoint**: `npm test -- file-reader` passa 100%, examples completos

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Melhorias que afetam múltiplas features

- [ ] T061 [P] Criar README.md completo:
  - Instalação via npm
  - Configuração Claude Desktop
  - Exemplos de uso
  - API reference dos 4 tools

- [ ] T062 [P] Criar QUICKSTART.md:
  - Setup passo a passo
  - Teste com MCP Inspector
  - Validação com Claude Desktop

- [ ] T063 [P] Adicionar logging estruturado:
  - Winston ou Pino
  - Levels: debug, info, warn, error
  - Log para stdout (MCP padrão)

- [ ] T064 [P] Adicionar benchmarks de performance:
  - Script `npm run benchmark`
  - Medir todos tools
  - Validar targets (<100ms, <50ms, <200ms)

- [ ] T065 [P] Code cleanup e refatoração:
  - Remover código duplicado
  - Extrair constantes mágicas
  - Melhorar nomes de variáveis

- [ ] T066 [P] Adicionar CI no GitHub Actions (opcional):
  - Run tests em PR
  - Type check
  - Lint

- [ ] T067 Rodar validação completa conforme quickstart.md:
  - Setup local
  - MCP Inspector
  - Claude Desktop
  - 10 queries reais testadas

- [ ] T068 [P] Criar CHANGELOG.md inicial (v0.1.0)

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Setup (Phase 1)**: Sem dependências - pode começar imediatamente
2. **Foundational (Phase 2)**: Depende de Setup - BLOQUEIA todas features
3. **Features (Phase 3-9)**: Todas dependem de Foundational
   - Stories Parser (P3) → Independente
   - Vue Parser (P4) → Independente
   - Metadata Builder (P5) → Depende de P3 e P4
   - Component Cache (P6) → Depende de P5
   - MCP Server (P7) → Depende de P6
   - Search (P8) → Independente
   - Files (P9) → Independente
4. **Polish (Phase 10)**: Depende de todas features desejadas

### Critical Path (MVP)

```
Setup → Foundational → Stories Parser → Metadata Builder → 
Component Cache → MCP Server → Validation
```

**Mínimo viável**: Phases 1, 2, 3, 5, 6, 7 (sem Vue parser inicialmente)

### Parallel Opportunities

**Durante Setup (Phase 1)**:
- T002, T003, T004, T005, T006, T007 podem rodar em paralelo

**Durante Foundational (Phase 2)**:
- T008, T009, T010, T011 podem rodar em paralelo

**Features Independentes**:
- Stories Parser (P3) || Vue Parser (P4) || Search (P8) || Files (P9)

**Depois de Foundational**:
```bash
# Time com 3 desenvolvedores
Dev A: Stories Parser (P3) → Metadata Builder (P5) → Cache (P6)
Dev B: Vue Parser (P4) → Metadata Builder (P5)
Dev C: Search (P8) + Files (P9) → MCP Server (P7)
```

---

## Implementation Strategy

### MVP First (MCP Server Robusto) ✅ Opção A

**Sprint 1 (Semana 1)**:
1. Complete Phase 1: Setup + Config (T001-T007.3) 🆕
2. Complete Phase 2: Foundational (T008-T011)

**Sprint 2 (Semana 2)**:
3. Complete Phase 3: Stories Parser + Error Handling (T012-T019.3) 🆕
4. Skip Vue Parser temporariamente
5. Complete Phase 5: Metadata Builder + Graceful Degradation (T030-T032.3) 🆕

**Sprint 3 (Semana 3)**:
6. Complete Phase 6: Component Cache (T033-T039)
7. Complete Phase 7: MCP Server (T040-T050)
8. Complete Phase 9: Files + Examples (T057-T060.4) 🆕

**Sprint 4 (Semana 3.5)**:
9. Complete Phase 10: Polish básico (T061-T062, T067)
10. **STOP and VALIDATE**: Teste com Claude Desktop usando examples

### Incremental Delivery

**v0.1.0 - MVP Robusto** (3.5 semanas) 🆕:
- Stories Parser + Error Handling robusto
- Cache + MCP Server
- Configuration management (paths + env)
- Examples & troubleshooting guide
- Graceful degradation + completeness score
- 4 tools funcionando com fallbacks
- Metadados de stories apenas (sem .vue)

**v0.2.0 - Feature Complete** (+1.5 semanas):
- Adicionar Vue Parser
- Props/events/slots completos
- Performance otimizada
- Observability & metrics

**v0.3.0 - Production Ready** (+1 semana):
- Search melhorado
- Schema validation (Zod)
- CI/CD completo
- NPM package publishing

---

## Parallel Example: Parsers

```bash
# Após Foundational completo, launch em paralelo:
Task: "Implementar Stories Parser (T015-T019)"
Task: "Implementar Vue Parser (T023-T027)"
Task: "Implementar Search utilities (T054-T056)"

# Depois que parsers completam:
Task: "Implementar Metadata Builder (T030-T032)"
```

---

## Success Metrics

### Development Metrics

- [ ] Todos testes passando (target >80% coverage)
- [ ] Build sem erros TypeScript
- [ ] ESLint 0 warnings
- [ ] Tempo de startup <2s
- [ ] Warm-up cache <2s para 111 componentes

### Performance Metrics (validar em T064)

- [ ] `listComponents()` <100ms (warm cache)
- [ ] `getComponent()` <50ms (warm cache)
- [ ] `searchComponents()` <200ms
- [ ] Uso de memória <100MB
- [ ] Payload total <5MB

### Integration Metrics (validar em T067)

- [ ] MCP Inspector conecta e lista 4 tools
- [ ] Claude Desktop recebe respostas <2s
- [ ] 10 queries reais testadas com sucesso
- [ ] 0 erros em logs durante queries

---

## Notes

- [P] = Pode executar em paralelo
- Tests marcados "DEVE FALHAR inicialmente" = TDD approach
- Commit após cada task ou grupo lógico de tasks
- Stop em qualquer checkpoint para validar independentemente
- MVP (v0.1.0) pode ser entregue em 3 semanas sem Vue Parser
- Full version (v0.2.0) adiciona +1 semana
- Priorize MCP Server funcionando > props completos de .vue

---

**Total Estimated Tasks**: 79 tasks (68 originais + 11 críticas adicionadas)  
**MVP Path**: ~40 tasks críticas (51%) - includes config, error handling, examples  
**Timeline**: 3.5-5 semanas dependendo de estratégia (MVP vs Complete)  
**Team Size**: Optimal = 2-3 desenvolvedores (parallel features)

**🆕 Tasks Críticas Adicionadas**:
- T007.1-T007.3: Configuration management (paths + env)
- T019.1-T019.3: Error handling robusto com retry e fallback
- T032.1-T032.3: Graceful degradation + completeness score
- T060.1-T060.4: Examples, demos e troubleshooting guide
