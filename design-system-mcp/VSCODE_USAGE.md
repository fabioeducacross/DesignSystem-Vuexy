# 🎯 Usando Design System MCP no VS Code

Este guia mostra como usar o **Design System MCP Server** diretamente no **VS Code** através do GitHub Copilot.

---

## ⚡ Quick Start

### 1. Pré-requisitos
- ✅ VS Code 1.109.0+ instalado
- ✅ GitHub Copilot ativo
- ✅ Node.js 18+ instalado
- ✅ MCP Server compilado (`npm run build`)

### 2. Configuração Automática (Recomendado)

O arquivo `.vscode-mcp.json` já está configurado! Apenas certifique-se de que o servidor está compilado:

```bash
cd design-system-mcp
npm install
npm run build
```

### 3. Ativar no VS Code

#### Opção A: Configuração Global
Adicione ao seu `settings.json` do VS Code:

**Windows**: `%APPDATA%\Code\User\settings.json`  
**Mac/Linux**: `~/.config/Code/User/settings.json`

```json
{
  "github.copilot.chat.mcp.servers": {
    "design-system": {
      "command": "node",
      "args": [
        "C:/Users/Educacross/Documents/Educacross/DesignSystem-Vuexy/design-system-mcp/dist/index.js"
      ],
      "env": {
        "NODE_ENV": "production",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

#### Opção B: Configuração do Workspace
No seu workspace, crie/edite `.vscode/settings.json`:

```json
{
  "github.copilot.chat.mcp.servers": {
    "design-system": {
      "command": "node",
      "args": [
        "${workspaceFolder}/design-system-mcp/dist/index.js"
      ]
    }
  }
}
```

### 4. Reinicie o VS Code
```bash
# Ctrl+Shift+P → "Developer: Reload Window"
# Ou feche e abra o VS Code
```

---

## 🎬 Como Usar

### No GitHub Copilot Chat

Abra o Copilot Chat (`Ctrl+Shift+I` ou `Cmd+Shift+I`) e:

#### Exemplo 1: Listar Componentes
```
@workspace Quais componentes de formulário temos no Design System?
```

O Copilot vai usar `listComponents` automaticamente para responder.

#### Exemplo 2: Buscar Componentes
```
@workspace Busque componentes relacionados a "modal" ou "dialog"
```

O Copilot vai usar `searchComponents`.

#### Exemplo 3: Detalhes de Componente
```
@workspace Me mostre detalhes completos do componente AcceptOrRejectAccess
```

O Copilot vai usar `getComponent`.

#### Exemplo 4: Estatísticas
```
@workspace Quantos componentes temos por categoria? Mostre um resumo.
```

O Copilot vai usar `getStats`.

---

## 🔧 Comandos Diretos (Terminal Integrado)

Você também pode usar o servidor diretamente via CLI:

### Iniciar Servidor Interativo
```bash
node dist/index.js
```

### Testar com MCP Inspector
```bash
npx @modelcontextprotocol/inspector dist/index.js
```

Abre uma interface web em `http://localhost:6000` para testar as tools.

---

## 🧪 Testar Instalação

### 1. Verificar se o Copilot reconhece o servidor
No Copilot Chat, digite:
```
@workspace Você tem acesso ao Design System MCP? Liste as tools disponíveis.
```

**Resposta esperada**: O Copilot deve mencionar as 7 tools (listComponents, getComponent, searchComponents, getStats, getComponentsByCategory, getCacheStats, getSearchIndexStats).

### 2. Teste Rápido de Funcionalidade
```
@workspace Use o Design System MCP para listar os primeiros 5 componentes.
```

**Resposta esperada**: Lista com AcceptOrRejectAccess, AlbumCover, AppCollapse, etc.

---

## 📚 Exemplos de Perguntas para o Copilot

### Descoberta de Componentes
```
@workspace Quais componentes relacionados a navegação existem?
@workspace Mostre todos os componentes da categoria "Forms"
@workspace Quais são os 10 componentes mais usados (por número de stories)?
```

### Documentação
```
@workspace Como usar o componente MediaCard? Mostre suas props.
@workspace Quais eventos o componente ProgressBar emite?
@workspace O componente ListTable tem slots? Quais?
```

### Análise
```
@workspace Quantos componentes temos de prioridade P0?
@workspace Qual categoria tem mais componentes?
@workspace Mostre estatísticas de cache e índice de busca
```

### Comparação
```
@workspace Compare os componentes Button e ButtonEdit
@workspace Quais componentes têm mais props: Card ou MediaCard?
```

---

## 🎯 7 Tools MCP Disponíveis

### 1. `listComponents`
Lista componentes com paginação e filtros
- **Filtros**: categoria, prioridade, tags
- **Paginação**: page, limit

### 2. `getComponent`
Detalhes completos de um componente específico
- Metadata (title, description, tags)
- Stories (nome, args, código)
- Props (nome, tipo, default, required)
- Events (nome, payload)
- Slots (nome, bindings)
- Paths (arquivos e Storybook URL)
- Stats (contadores)

### 3. `searchComponents`
Busca textual com scoring TF-IDF
- Busca em: nome, categoria, descrição, tags
- Relevância automática
- Limit configurável

### 4. `getStats`
Estatísticas agregadas do Design System
- Total de componentes e stories
- Distribuição por categoria
- Distribuição por prioridade
- Top tags
- Cache stats
- Search index stats

### 5. `getComponentsByCategory`
Filtra componentes por categoria específica

### 6. `getCacheStats`
Métricas do cache de componentes
- Items, hits, misses, hit rate
- Uso de memória
- Top items mais acessados

### 7. `getSearchIndexStats`
Métricas do índice de busca
- Documentos indexados
- Tokens únicos
- Média de tokens por documento

---

## 🐛 Troubleshooting

### Copilot não reconhece o servidor

**Solução 1**: Verificar se está compilado
```bash
cd design-system-mcp
npm run build
ls dist/index.js  # Deve existir
```

**Solução 2**: Verificar path no settings.json
- Use path absoluto: `C:/Users/.../dist/index.js`
- Use forward slashes `/` (não `\`)

**Solução 3**: Reload Window
```
Ctrl+Shift+P → "Developer: Reload Window"
```

### Servidor não inicia

**Verificar Node.js**:
```bash
node --version  # Deve ser 18+
```

**Testar manualmente**:
```bash
node dist/index.js
# Deve imprimir logs de inicialização
```

### Respostas lentas

**Cache está frio**. Após algumas queries, o cache esquenta e fica ~10x mais rápido.

**Verificar performance**:
```bash
node tests/smoke/server-init.mjs
# Deve mostrar init time < 1s
```

### Erros de parsing

**Verificar componentes**:
```bash
npm test
# Todos os 70 testes devem passar
```

---

## 📊 Métricas de Performance

Com o servidor configurado no VS Code:

| Operação | Tempo Esperado |
|----------|----------------|
| Primeira query (cold start) | 0.5-1s |
| Queries subsequentes (warm) | <10ms |
| listComponents (20 items) | <5ms |
| getComponent (1 item) | <5ms |
| searchComponents | <50ms |
| getStats (agregação) | <20ms |

---

## 🔄 Atualizações

Quando houver mudanças nos componentes:

1. **Hot-reload automático**: O servidor detecta mudanças e invalida cache
2. **Rebuild manual**: `npm run build` se houver mudanças no código do servidor
3. **Restart VS Code**: Apenas se mudou o settings.json

---

## 💡 Dicas de Uso

### 1. Use @workspace para contexto
Sempre inicie com `@workspace` para que o Copilot use as tools MCP.

### 2. Seja específico
```
❌ "Me fale sobre componentes"
✅ "Liste os componentes da categoria Forms"
```

### 3. Combine tools
```
@workspace Busque componentes de modal, pegue detalhes do primeiro resultado, 
e me mostre suas props e events.
```

### 4. Peça formatação
```
@workspace Liste componentes de Forms e mostre em formato de tabela markdown.
```

### 5. Use para documentação
```
@workspace Gere documentação completa do componente MediaCard em markdown.
```

---

## 🎓 Exemplos Avançados

### Workflow de Desenvolvimento
```
@workspace Estou criando uma página de perfil. Que componentes do DS 
posso usar para cards, formulários e navegação?
```

### Code Review
```
@workspace Estou usando o componente ProgressBar. Verifique se estou 
passando as props corretas e se está atualizado.
```

### Refactoring
```
@workspace Quero substituir meu componente customizado de modal pelo 
AcceptOrRejectAccess. Mostre a API dele e como migrar.
```

### Análise de Design System
```
@workspace Analise nosso Design System: quantos componentes temos, 
qual a distribuição por categoria, e identifique possíveis gaps.
```

---

## 📖 Recursos Adicionais

### Documentação
- [README.md](README.md) - Overview completo
- [QUICK_START.md](QUICK_START.md) - Guia de início rápido
- [docs/PHASE3_E2E_TESTING.md](docs/PHASE3_E2E_TESTING.md) - Testes e validação
- [docs/PHASE3_COMPLETA.md](docs/PHASE3_COMPLETA.md) - Resumo executivo

### Testes
```bash
npm test                              # 70 testes (unit + integration)
node tests/e2e/tools-validation.mjs   # 8 testes E2E via MCP
node tests/smoke/server-init.mjs      # Smoke test rápido
node tests/demo/interactive-demo.mjs  # Demo com dados reais
```

### MCP Inspector (Debug Visual)
```bash
npx @modelcontextprotocol/inspector dist/index.js
```

Abre interface web para testar tools manualmente.

---

## ✨ Conclusão

Com o **Design System MCP** configurado no VS Code, você tem:

✅ **Acesso instantâneo** a 123 componentes  
✅ **Busca inteligente** com relevância  
✅ **Documentação sempre atualizada**  
✅ **Integração nativa** com GitHub Copilot  
✅ **Performance excepcional** (<10ms queries)  
✅ **7 tools poderosas** para explorar o DS  

**Próximos passos**:
1. Configure o settings.json
2. Reload VS Code
3. Teste com `@workspace Liste os componentes`
4. Explore as possibilidades! 🚀

---

**Dúvidas?** Veja [QUICK_START.md](QUICK_START.md) ou execute os testes para validar a instalação.
