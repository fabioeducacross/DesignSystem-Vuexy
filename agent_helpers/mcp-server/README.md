# MCP Server - Design System Educacross

Servidor **Model Context Protocol (MCP)** para expor os componentes do Design System Educacross V2 para IAs (Claude, GitHub Copilot, etc.).

## Instalação

```bash
cd agent_helpers/mcp-server
npm install
```

## Execução

```bash
npm start
```

O servidor utiliza **StdioServerTransport**, comunicando-se via stdin/stdout para compatibilidade com ferramentas MCP.

## Recursos Disponíveis

### Resources

1. **design-system://production/components**
   - Componentes Educacross V2 validados em produção
   - Localização: `src/stories/educacross-components-v2/`
   - Branch de referência: `v1.2`

2. **design-system://reference/vuexy-core**
   - Componentes base do template Vuexy
   - Localização: `src/stories/{atoms,molecules,organisms}/`
   - Branch de referência: `main`

### Tools

#### `get_component_context`

Busca o código, stories e documentação de um componente específico.

**Parâmetros:**
- `library` (enum: "production" | "reference"): Biblioteca do componente
- `componentName` (string): Nome do componente (ex: "ProgressBar", "Button")

**Exemplo de resposta:**
```
[MCP] Contexto solicitado para ProgressBar na biblioteca production.
```

*Nota: A implementação atual retorna uma mensagem placeholder. Futuramente, fará fetch dos arquivos `.stories.js` via GitHub API.*

## Estrutura de Arquivos

```
agent_helpers/mcp-server/
├── index.js          # Implementação do servidor MCP
├── package.json      # Dependências e scripts
├── .gitignore        # Arquivos ignorados pelo git
└── README.md         # Esta documentação
```

## Dependências

- `@modelcontextprotocol/sdk@^1.6.0`: SDK oficial do MCP
- `axios@^1.7.9`: Cliente HTTP para futuras integrações com GitHub API

## Próximos Passos

- [ ] Implementar fetch real de arquivos `.stories.js` via GitHub API
- [ ] Adicionar cache de componentes
- [ ] Expandir metadados retornados (props, exemplos, screenshots)
- [ ] Adicionar suporte a busca e filtros
