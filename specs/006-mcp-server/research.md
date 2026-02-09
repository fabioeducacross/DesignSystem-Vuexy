# Phase 0: Research - MCP Server Design System

**Período**: Semana 1 (3-5 dias)  
**Objetivo**: Validar viabilidade técnica e definir arquitetura base  
**Status**: 🔄 Em Progresso

---

## 1. MCP Protocol v1.0 e SDK Oficial

### 1.1 Arquitetura MCP

O Model Context Protocol (MCP) é um protocolo aberto que padroniza como aplicações fornecem contexto para LLMs. Desenvolvido pela Anthropic, define:

**Componentes principais**:
- **MCP Hosts**: Aplicações que consomem contexto (ex: Claude Desktop, IDEs)
- **MCP Clients**: Código que se conecta aos servidores (geralmente dentro do host)
- **MCP Servers**: Serviços que expõem recursos, ferramentas e prompts
- **Local Data Sources**: Recursos que o servidor pode acessar

**Transporte**:
- stdio (stdin/stdout) - padrão para processos locais
- HTTP + SSE (Server-Sent Events) - para servidores remotos

**Recursos disponibilizados**:
1. **Resources**: Dados estruturados (nosso caso: metadados de componentes)
2. **Tools**: Funções que o LLM pode invocar (nosso caso: listComponents, searchComponents)
3. **Prompts**: Templates pré-definidos para tarefas comuns

### 1.2 SDK Oficial (@modelcontextprotocol/sdk)

**Instalação**:
```bash
npm install @modelcontextprotocol/sdk
```

**Estrutura básica de um servidor**:
```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  { name: 'design-system-mcp', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// Registrar ferramentas disponíveis
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'listComponents',
      description: 'Lista componentes do Design System',
      inputSchema: {
        type: 'object',
        properties: {
          category: { type: 'string' },
          priority: { type: 'string', enum: ['P0', 'P1', 'P2'] }
        }
      }
    }
  ]
}));

// Implementar lógica das ferramentas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === 'listComponents') {
    const components = await loadComponents(args);
    return { content: [{ type: 'text', text: JSON.stringify(components) }] };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

**Capacidades relevantes**:
- ✅ **Suporte a streaming**: Não nativo, mas pode retornar arrays grandes de forma eficiente
- ✅ **Paginação**: Implementar manualmente nos tools (offset/limit)
- ✅ **Tipagem forte**: TypeScript-first com schemas JSON Schema
- ⚠️ **Cache**: Não gerenciado pelo SDK, responsabilidade do servidor

**Findings**:
- SDK extremamente minimalista (~5 classes principais)
- Foco em transporte e protocolo, não em features avançadas
- Cache, observabilidade e rate limiting precisam ser implementados

---

## 2. Parsers Vue SFC (@vue/compiler-sfc)

### 2.1 Capacidades do @vue/compiler-sfc

**Instalação**:
```bash
npm install @vue/compiler-sfc
```

**API principal**:
```typescript
import { parse } from '@vue/compiler-sfc';

const { descriptor, errors } = parse(sourceCode, { filename: 'Component.vue' });

// descriptor.script (Options API) ou descriptor.scriptSetup (Composition API)
// descriptor.template (HTML template)
// descriptor.styles (array de estilos)
```

**Extração de Props em `<script setup>`**:
```typescript
import { compileScript } from '@vue/compiler-sfc';

const compiled = compileScript(descriptor, { id: 'component' });

// compiled.bindings contém exports/imports/vars
// Para props tipados: analisar AST do TypeScript
import ts from 'typescript';

const sourceFile = ts.createSourceFile(
  'component.ts',
  descriptor.scriptSetup.content,
  ts.ScriptTarget.Latest
);

// Buscar por defineProps<{ ... }>() ou defineProps({ ... })
function extractProps(node: ts.Node): PropMetadata[] {
  // Traverse AST procurando por:
  // - defineProps() com objeto literal
  // - defineProps<Interface>() com tipo genérico
}
```

### 2.2 Desafios Identificados

**1. Props Tipados vs Runtime**:
```vue
<!-- Caso 1: Runtime (fácil extrair) -->
<script setup>
defineProps({
  label: { type: String, required: true },
  size: { type: String, default: 'md' }
});
</script>

<!-- Caso 2: Tipado (requer parse TypeScript) -->
<script setup>
defineProps<{
  label: string;
  size?: 'sm' | 'md' | 'lg';
}>();
</script>
```

**Estratégia**: 
- Para props tipados: usar TypeScript Compiler API
- Fallback: extrair apenas nomes (sem tipos) se análise falhar

**2. Events & Slots**:
```typescript
// Events: buscar por defineEmits
const emits = defineEmits<{
  'update:modelValue': [value: string];
  'submit': [];
}>();

// Slots: buscar por <slot> no template
import { parse as parseTemplate } from '@vue/compiler-core';

const ast = parseTemplate(descriptor.template.content);
// Traverse AST procurando por nodes do tipo ELEMENT com tag 'slot'
```

### 2.3 Limitações

⚠️ **Não extrai**:
- Comentários de documentação (JSDoc)
- Exemplos de uso
- Estados internos (refs, computed)

✅ **Extrai com sucesso**:
- Props (nome, tipo, required, default)
- Events (nome, payload type)
- Slots (nome, props do slot)

**Conclusão**: @vue/compiler-sfc é suficiente para estrutura básica. Metadados avançados (descrições, exemplos) virão dos stories.

---

## 3. Exemplos de MCP Servers

### 3.1 Análise de Estruturas Existentes

**1. mcp-server-filesystem** (referência oficial):
```
src/
  index.ts         # Entry point + transport setup
  handlers/        # Request handlers separados
  utils/           # File operations, security
```

**Padrões observados**:
- Validação estrita de inputs (evita path traversal)
- Rate limiting para operações pesadas
- Logs estruturados (JSON) para debugging

**2. mcp-server-git** (exemplo complexo):
```
src/
  git/             # Git operations wrapper
  cache/           # Cache de resultados
  types/           # TypeScript definitions
  server.ts        # MCP server setup
```

**Features relevantes**:
- Cache em memória para comandos git lentos
- Retry logic para operações de rede
- Graceful degradation se .git/ não existe

### 3.2 Padrões Aplicáveis ao Nosso Caso

**Estrutura proposta**:
```
design-system-mcp/
  src/
    index.ts              # Setup + transport
    server/
      handlers.ts         # MCP request handlers
      tools.ts            # Tool definitions
    parsers/
      story-parser.ts     # Parse .stories.js
      vue-parser.ts       # Parse .vue SFC
    cache/
      memory-cache.ts     # In-memory cache
      invalidator.ts      # File watcher
    types/
      component.ts        # Component metadata schema
      mcp.ts              # MCP-specific types
    utils/
      logger.ts
      paths.ts
```

**Anti-patterns a evitar**:
- ❌ Parse síncrono de todos arquivos no startup
- ❌ Cache sem TTL ou invalidação
- ❌ Erros não tratados que quebram o servidor
- ❌ Logs verbosos que poluem stdout (quebra stdio transport)

---

## 4. Schema de Metadados do Component

### 4.1 Interface TypeScript Proposta

```typescript
export interface Component {
  // Identificação
  name: string;                    // "ProgressBar"
  category: string;                // "DataDisplay"
  priority: 'P0' | 'P1' | 'P2';   // Prioridade no Design System
  
  // Localização
  paths: {
    story: string;                 // src/stories/educacross-components-v2/ProgressBar.stories.js
    component: string;             // educacross-frontoffice/src/components/ProgressBar.vue
  };
  
  // Metadados extraídos do .stories.js
  metadata: {
    title: string;                 // "Educacross Components V2/DataDisplay/ProgressBar"
    description?: string;          // Do comentário JSDoc ou args
    tags: string[];                // ['autodocs', 'responsive', etc]
  };
  
  // Stories disponíveis
  stories: Story[];
  
  // Metadados extraídos do .vue
  props: Prop[];
  events: Event[];
  slots: Slot[];
}

export interface Story {
  name: string;                    // "Default"
  description?: string;
  args?: Record<string, unknown>; // Argumentos padrão
  parameters?: {
    viewport?: string;
    backgrounds?: unknown;
  };
}

export interface Prop {
  name: string;
  type: string;                    // "String", "Number", "Boolean", union types
  required: boolean;
  default?: unknown;
  description?: string;            // Extraído de JSDoc se disponível
}

export interface Event {
  name: string;                    // "update:modelValue"
  payload?: string;                // Tipo do payload
  description?: string;
}

export interface Slot {
  name: string;                    // "default", "header", "footer"
  props?: Record<string, string>; // Scoped slot props
  description?: string;
}
```

### 4.2 Exemplo de Metadados Completos

```json
{
  "name": "ProgressBar",
  "category": "DataDisplay",
  "priority": "P1",
  "paths": {
    "story": "src/stories/educacross-components-v2/ProgressBar.stories.js",
    "component": "educacross-frontoffice/src/components/ProgressBar.vue"
  },
  "metadata": {
    "title": "Educacross Components V2/DataDisplay/ProgressBar",
    "description": "Exibe progresso visual de tarefas ou carregamentos",
    "tags": ["autodocs", "responsive"]
  },
  "stories": [
    { "name": "Default", "args": { "value": 50, "max": 100 } },
    { "name": "WithLabel", "args": { "value": 75, "showLabel": true } },
    { "name": "Variants", "args": { "variant": "success" } }
  ],
  "props": [
    {
      "name": "value",
      "type": "Number",
      "required": true,
      "description": "Valor atual do progresso"
    },
    {
      "name": "max",
      "type": "Number",
      "required": false,
      "default": 100,
      "description": "Valor máximo"
    },
    {
      "name": "variant",
      "type": "'primary' | 'success' | 'danger'",
      "required": false,
      "default": "primary"
    }
  ],
  "events": [
    {
      "name": "complete",
      "payload": "void",
      "description": "Emitido quando value === max"
    }
  ],
  "slots": []
}
```

---

## 5. Proof of Concept: Parser de .stories.js

### 5.1 Análise de Estrutura Real

**Arquivo exemplo**: `src/stories/educacross-components-v2/ProgressBar.stories.js`

```javascript
export default {
  title: 'Educacross Components V2/DataDisplay/ProgressBar',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    variant: { control: 'select', options: ['primary', 'success', 'danger'] }
  }
};

export const Default = {
  args: { value: 50 },
  render: (args) => `<progress-bar :value="${args.value}"></progress-bar>`
};

export const WithLabel = {
  args: { value: 75, showLabel: true }
};
```

### 5.2 Estratégia de Parsing

**Opção 1: Regex (limitado)**
```typescript
// Extrair apenas export default e nomes de stories
const titleMatch = content.match(/title:\s*['"](.+?)['"]/);
const storyNames = [...content.matchAll(/export const (\w+)/g)].map(m => m[1]);
```

**Opção 2: Babel Parser (robusto)**
```bash
npm install @babel/parser @babel/traverse
```

```typescript
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

function parseStory(filepath: string): StoryMetadata {
  const code = fs.readFileSync(filepath, 'utf-8');
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] });
  
  let defaultExport = null;
  const stories: Story[] = [];
  
  traverse(ast, {
    ExportDefaultDeclaration(path) {
      defaultExport = extractObjectProperties(path.node.declaration);
    },
    ExportNamedDeclaration(path) {
      if (path.node.declaration?.type === 'VariableDeclaration') {
        const name = path.node.declaration.declarations[0].id.name;
        const init = path.node.declaration.declarations[0].init;
        stories.push({ name, ...extractObjectProperties(init) });
      }
    }
  });
  
  return {
    title: defaultExport.title,
    tags: defaultExport.tags || [],
    argTypes: defaultExport.argTypes || {},
    stories
  };
}
```

**Decisão**: Usar Babel Parser para robustez (suporta JSX, spread operators, etc).

### 5.3 Implementação PoC

**Arquivo**: `tests/poc/story-parser-poc.ts`

```typescript
import { parse } from '@babel/parser';
import * as t from '@babel/types';

interface StoryFile {
  title: string;
  tags: string[];
  stories: { name: string; args?: Record<string, unknown> }[];
}

export function parseStoryFile(code: string): StoryFile {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  
  let title = '';
  let tags: string[] = [];
  const stories: { name: string; args?: Record<string, unknown> }[] = [];
  
  // Traverse AST
  for (const node of ast.program.body) {
    // export default { title, tags, ... }
    if (t.isExportDefaultDeclaration(node) && t.isObjectExpression(node.declaration)) {
      const props = node.declaration.properties;
      for (const prop of props) {
        if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
          if (prop.key.name === 'title' && t.isStringLiteral(prop.value)) {
            title = prop.value.value;
          }
          if (prop.key.name === 'tags' && t.isArrayExpression(prop.value)) {
            tags = prop.value.elements
              .filter(t.isStringLiteral)
              .map(el => el.value);
          }
        }
      }
    }
    
    // export const StoryName = { args, ... }
    if (t.isExportNamedDeclaration(node) && t.isVariableDeclaration(node.declaration)) {
      const decl = node.declaration.declarations[0];
      if (t.isVariableDeclarator(decl) && t.isIdentifier(decl.id)) {
        const name = decl.id.name;
        let args: Record<string, unknown> | undefined;
        
        if (t.isObjectExpression(decl.init)) {
          const argsProperty = decl.init.properties.find(
            p => t.isObjectProperty(p) && t.isIdentifier(p.key) && p.key.name === 'args'
          );
          if (argsProperty && t.isObjectProperty(argsProperty)) {
            // Simplificação: apenas extrair estrutura, não avaliar valores
            args = {}; // TODO: extrair valores literais
          }
        }
        
        stories.push({ name, args });
      }
    }
  }
  
  return { title, tags, stories };
}
```

**Teste**:
```typescript
import { describe, it, expect } from 'vitest';
import { parseStoryFile } from './story-parser-poc';

describe('Story Parser PoC', () => {
  it('extrai metadata básico', () => {
    const code = `
      export default {
        title: 'Components/Button',
        tags: ['autodocs']
      };
      
      export const Default = {
        args: { label: 'Click' }
      };
    `;
    
    const result = parseStoryFile(code);
    
    expect(result.title).toBe('Components/Button');
    expect(result.tags).toEqual(['autodocs']);
    expect(result.stories).toHaveLength(1);
    expect(result.stories[0].name).toBe('Default');
  });
});
```

---

## 6. Proof of Concept: Parser de .vue

### 6.1 Implementação PoC

**Arquivo**: `tests/poc/vue-parser-poc.ts`

```typescript
import { parse, compileScript } from '@vue/compiler-sfc';
import ts from 'typescript';

interface VueComponent {
  props: Array<{ name: string; type: string; required: boolean }>;
  events: Array<{ name: string }>;
  slots: Array<{ name: string }>;
}

export function parseVueComponent(code: string, filename: string): VueComponent {
  const { descriptor, errors } = parse(code, { filename });
  
  if (errors.length > 0) {
    throw new Error(`Parse errors: ${errors.map(e => e.message).join(', ')}`);
  }
  
  const props: VueComponent['props'] = [];
  const events: VueComponent['events'] = [];
  const slots: VueComponent['slots'] = [];
  
  // Extrair props do <script setup>
  if (descriptor.scriptSetup) {
    const compiled = compileScript(descriptor, { id: filename });
    
    // Buscar defineProps no código
    const propsMatch = descriptor.scriptSetup.content.match(
      /defineProps<\{([^}]+)\}>\(\)/
    );
    
    if (propsMatch) {
      // Parse TypeScript interface
      const propsInterface = `interface Props {${propsMatch[1]}}`;
      const sourceFile = ts.createSourceFile(
        'temp.ts',
        propsInterface,
        ts.ScriptTarget.Latest,
        true
      );
      
      // Traverse TypeScript AST
      ts.forEachChild(sourceFile, node => {
        if (ts.isInterfaceDeclaration(node)) {
          node.members.forEach(member => {
            if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
              props.push({
                name: member.name.text,
                type: member.type?.getText(sourceFile) || 'unknown',
                required: !member.questionToken
              });
            }
          });
        }
      });
    }
  }
  
  // Extrair events (buscar defineEmits)
  if (descriptor.scriptSetup) {
    const emitsMatch = descriptor.scriptSetup.content.match(
      /defineEmits<\{([^}]+)\}>\(\)/
    );
    
    if (emitsMatch) {
      const emitsContent = emitsMatch[1];
      const eventNames = [...emitsContent.matchAll(/'([^']+)':/g)];
      events.push(...eventNames.map(m => ({ name: m[1] })));
    }
  }
  
  // Extrair slots do template
  if (descriptor.template) {
    const slotMatches = [...descriptor.template.content.matchAll(/<slot\s+name="([^"]+)"/g)];
    slots.push(...slotMatches.map(m => ({ name: m[1] })));
    
    // Slot default (sem name)
    if (descriptor.template.content.includes('<slot>')) {
      slots.push({ name: 'default' });
    }
  }
  
  return { props, events, slots };
}
```

**Teste**:
```typescript
describe('Vue Parser PoC', () => {
  it('extrai props tipados', () => {
    const code = `
      <template>
        <div>{{ label }}</div>
      </template>
      
      <script setup>
      defineProps<{
        label: string;
        size?: 'sm' | 'md' | 'lg';
      }>();
      </script>
    `;
    
    const result = parseVueComponent(code, 'Button.vue');
    
    expect(result.props).toHaveLength(2);
    expect(result.props[0]).toEqual({
      name: 'label',
      type: 'string',
      required: true
    });
    expect(result.props[1]).toEqual({
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false
    });
  });
  
  it('extrai events', () => {
    const code = `
      <script setup>
      defineEmits<{
        'update:modelValue': [value: string];
        'submit': [];
      }>();
      </script>
    `;
    
    const result = parseVueComponent(code, 'Input.vue');
    
    expect(result.events).toEqual([
      { name: 'update:modelValue' },
      { name: 'submit' }
    ]);
  });
});
```

---

## 7. Benchmark de Performance

### 7.1 Cenários de Teste

**Setup**:
```typescript
import { performance } from 'perf_hooks';

async function benchmark(name: string, fn: () => Promise<void>) {
  const start = performance.now();
  await fn();
  const end = performance.now();
  console.log(`${name}: ${(end - start).toFixed(2)}ms`);
}
```

**Testes propostos**:

1. **Parse de 1 arquivo .stories.js**: <10ms esperado
2. **Parse de 1 arquivo .vue**: <20ms esperado
3. **Parse de 111 componentes (cold)**: <2000ms esperado
4. **Busca em 111 componentes (warm cache)**: <50ms esperado

### 7.2 Resultados Esperados

| Operação | Target | Estratégia |
|----------|--------|------------|
| Parse story | <10ms | Babel parser é rápido para arquivos pequenos |
| Parse Vue SFC | <20ms | @vue/compiler-sfc otimizado |
| Scan completo | <2s startup | Paralellizar com Promise.all() |
| Cache hit | <5ms | Map lookup O(1) |
| Busca textual | <100ms | Implementar índice invertido simples |

**Implementação de busca eficiente**:
```typescript
class ComponentIndex {
  private byName = new Map<string, Component>();
  private byCategory = new Map<string, Component[]>();
  private invertedIndex = new Map<string, Set<string>>(); // term -> component names
  
  add(component: Component) {
    this.byName.set(component.name, component);
    
    // Index por categoria
    if (!this.byCategory.has(component.category)) {
      this.byCategory.set(component.category, []);
    }
    this.byCategory.get(component.category)!.push(component);
    
    // Índice invertido para busca
    const terms = [
      component.name.toLowerCase(),
      component.category.toLowerCase(),
      ...component.metadata.tags.map(t => t.toLowerCase()),
      component.metadata.description?.toLowerCase() || ''
    ].flatMap(t => t.split(/\s+/));
    
    terms.forEach(term => {
      if (!this.invertedIndex.has(term)) {
        this.invertedIndex.set(term, new Set());
      }
      this.invertedIndex.get(term)!.add(component.name);
    });
  }
  
  search(query: string): Component[] {
    const terms = query.toLowerCase().split(/\s+/);
    const matches = new Set<string>();
    
    terms.forEach(term => {
      const componentNames = this.invertedIndex.get(term);
      if (componentNames) {
        componentNames.forEach(name => matches.add(name));
      }
    });
    
    return Array.from(matches).map(name => this.byName.get(name)!);
  }
}
```

---

## 8. Perguntas Respondidas

### 8.1 Como @vue/compiler-sfc extrai props de `<script setup>`?

✅ **Resposta**: 
- Props tipados (`defineProps<Interface>()`) requerem parse do TypeScript AST
- Props runtime (`defineProps({ ... })`) são extraídos diretamente do objeto
-策Estratégia: usar TypeScript Compiler API para casos tipados
- Fallback: extrair apenas nomes se análise falhar

### 8.2 MCP SDK suporta streaming de resultados grandes?

⚠️ **Resposta**: 
- Não há suporte nativo a streaming
- Solução: retornar arrays completos (performance OK para 111 componentes)
- Alternativa futura: implementar paginação nos tools (offset/limit)

### 8.3 Como invalidar cache quando arquivos mudam?

✅ **Resposta**: 
- Usar `chokidar` para watch de arquivos
- Invalidar entrada específica no cache quando arquivo muda
- Alternativa light: não usar watch, re-parse sob demanda com TTL

**Implementação proposta**:
```typescript
import chokidar from 'chokidar';

class CacheInvalidator {
  constructor(private cache: Map<string, Component>) {}
  
  watch(paths: string[]) {
    chokidar.watch(paths).on('change', (filepath) => {
      // Invalidar cache do componente associado
      const componentName = extractComponentName(filepath);
      this.cache.delete(componentName);
      console.log(`[Cache] Invalidated: ${componentName}`);
    });
  }
}
```

### 8.4 Busca semântica: usar Fuse.js ou implementar simples?

✅ **Resposta**:
- Para MVP: índice invertido simples (implementação acima) é suficiente
- Fuse.js adiciona ~40KB e fuzzy search complexo (overkill para 111 componentes)
- Futuro: se precisar de busca fuzzy ("ProgressBra" → "ProgressBar"), considerar Fuse.js

---

## 9. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Parser falha em props complexos | Média | Médio | Fallback para extração básica (apenas nomes) |
| Performance <100ms não atingida | Baixa | Alto | Benchmark contínuo + cache agressivo |
| MCP SDK depreca API | Baixa | Alto | Monitorar releases, versão pinada no package.json |
| Arquivos .stories.js com sintaxe não-padrão | Média | Baixo | Parser robusto (Babel) + testes com casos reais |

---

## 10. Decisões Técnicas

### 10.1 Parser de Stories

**Decisão**: Babel Parser (@babel/parser + @babel/traverse)

**Alternativas consideradas**:
- ❌ Regex: Insuficiente para JSX e spread operators
- ❌ Acorn: Menos usado, menos suporte a plugins
- ✅ Babel: Padrão da indústria, suporte completo a JSX

### 10.2 Parser de Vue

**Decisão**: @vue/compiler-sfc + TypeScript Compiler API

**Alternativas consideradas**:
- ❌ Regex: Impossível para tipos complexos
- ❌ vue-docgen-api: Overhead desnecessário (103KB)
- ✅ @vue/compiler-sfc: Oficial, bem mantido, leve

### 10.3 Cache

**Decisão**: In-memory Map com file watcher (chokidar)

**Alternativas consideradas**:
- ❌ Redis: Overkill para servidor local
- ❌ Filesystem cache: I/O overhead
- ✅ In-memory: Rápido, simples, suficiente para <1000 componentes

### 10.4 Busca

**Decisão**: Índice invertido customizado

**Alternativas consideradas**:
- ❌ Fuse.js: Overhead para dataset pequeno
- ❌ ElasticSearch: Absurdamente overkill
- ✅ Custom: Performance ótima, controle total

---

## 11. Próximos Passos (Phase 1: Design)

**Após conclusão deste research.md**:

1. ✅ Criar schema completo de TypeScript interfaces (`types/component.ts`)
2. ✅ Especificar contratos MCP detalhados (tools + schemas)
3. ✅ Desenhar arquitetura de cache com invalidação
4. ✅ Criar quickstart para Claude Desktop

**Checkpoint de Phase 0**:
- [ ] PoCs de parsers funcionando com testes
- [ ] Benchmark mostrando <100ms warm cache
- [ ] Decisões técnicas documentadas
- [ ] Aprovação para iniciar Phase 1

---

## Referências

- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [@modelcontextprotocol/sdk NPM](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
- [Vue SFC Compiler Docs](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)
- [Babel Parser Docs](https://babeljs.io/docs/babel-parser)
- [TypeScript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API)
