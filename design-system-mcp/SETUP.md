# ⚡ Configuração Rápida - MCP Server no VS Code

## ✅ **CONFIGURAÇÃO AUTOMÁTICA APLICADA!**

O arquivo `.vscode/settings.json` já foi criado com a configuração do MCP Server.

---

## 🚀 Próximos Passos

### 1. **Recarregar o VS Code**
```
Ctrl+Shift+P → "Developer: Reload Window"
```

Ou feche e abra o VS Code novamente.

### 2. **Testar no GitHub Copilot Chat**

Abra o Copilot Chat (`Ctrl+Shift+I`) e digite:

```
@workspace Liste os primeiros 5 componentes do Design System
```

**Resposta esperada**: O Copilot deve retornar a lista com:
- AcceptOrRejectAccess
- AlbumCover  
- AppCollapse
- AttachedFilesViewer
- Badge

---

## 🎯 Exemplos de Uso

### Listar Componentes por Categoria
```
@workspace Quais componentes temos na categoria "Forms"?
```

### Buscar Componentes
```
@workspace Busque componentes relacionados a "modal" ou "dialog"
```

### Detalhes de Componente
```
@workspace Me mostre detalhes completos do componente AcceptOrRejectAccess 
incluindo props, events e slots
```

### Estatísticas
```
@workspace Quantos componentes temos no total? Mostre a distribuição por categoria
```

### Análise
```
@workspace Quais são os 10 componentes com mais stories? Mostre em tabela
```

---

## 🧪 Testar com MCP Inspector (Interface Visual)

Se preferir uma interface visual para testar:

```bash
# Terminal no VS Code
cd design-system-mcp
npx @modelcontextprotocol/inspector dist/index.js
```

Isso abre uma interface web em `http://localhost:6000` onde você pode:
- ✅ Ver as 7 tools disponíveis
- ✅ Testar cada tool com parâmetros
- ✅ Ver respostas em tempo real
- ✅ Explorar a estrutura de dados

---

## 📊 O Que Você Tem Acesso

### 7 MCP Tools Disponíveis
1. **listComponents** - Lista com paginação e filtros
2. **getComponent** - Detalhes completos de um componente
3. **searchComponents** - Busca textual com relevância
4. **getStats** - Estatísticas agregadas
5. **getComponentsByCategory** - Filtrar por categoria
6. **getCacheStats** - Métricas de cache
7. **getSearchIndexStats** - Métricas do índice de busca

### 123 Componentes Reais
Do seu **educacross-frontoffice**, incluindo:
- Modals (8 componentes)
- Feedback (14 componentes)
- Navigation (12 componentes)
- Forms (7 componentes)
- E mais 82 componentes em 28 categorias!

### 967 Stories Documentadas
Todas as stories do Storybook processadas e indexadas.

---

## ⚙️ Configuração Aplicada

O arquivo `.vscode/settings.json` contém:

```json
{
  "github.copilot.chat.mcp.servers": {
    "design-system": {
      "command": "node",
      "args": [
        "${workspaceFolder}/design-system-mcp/dist/index.js"
      ],
      "env": {
        "NODE_ENV": "production",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

---

## 🐛 Se Algo Não Funcionar

### 1. Verificar se está compilado
```bash
cd design-system-mcp
npm run build
# Deve compilar sem erros
```

### 2. Testar manualmente
```bash
node dist/index.js
# Deve mostrar logs de inicialização
# Ctrl+C para parar
```

### 3. Executar testes
```bash
npm test
# 70/70 testes devem passar
```

### 4. Reload VS Code novamente
```
Ctrl+Shift+P → "Developer: Reload Window"
```

---

## 📚 Documentação Completa

Para mais detalhes, veja:
- **[VSCODE_USAGE.md](VSCODE_USAGE.md)** - Guia completo de uso no VS Code
- **[QUICK_START.md](QUICK_START.md)** - Guia de início rápido geral
- **[README.md](README.md)** - Overview do projeto

---

## ✨ Pronto para Usar!

**Tudo configurado!** Agora é só:
1. Reload do VS Code (`Ctrl+Shift+P` → Reload Window)
2. Abrir Copilot Chat (`Ctrl+Shift+I`)
3. Começar a perguntar com `@workspace`

**Dica**: Comece com uma pergunta simples como:
```
@workspace Quantos componentes temos no Design System?
```

🚀 **Aproveite seu Design System MCP Server no VS Code!**
