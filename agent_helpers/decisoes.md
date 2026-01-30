# Log de Decisões Técnicas

## Data: 2026-01-30

### Decisão 1: Estado Inicial do Repositório
**Situação**: Ao explorar o repositório, foi identificado que ele contém apenas um README.md inicial.

**Problema**: A instrução solicita localizar "a versão HTML do Vuexy que já está dentro do repositório", porém não existe nenhum template Vuexy no repositório atual.

**Decisão**: 
- Documentar esta situação como ponto de partida
- Criar a estrutura necessária para quando o template Vuexy for adicionado
- Prosseguir com a inicialização do Storybook primeiro
- Preparar a estrutura de pacote de tema que receberá os assets do Vuexy

**Alternativas Consideradas**:
1. ~~Baixar o Vuexy de fonte externa~~ - Não fazer pois pode violar licença
2. ~~Prosseguir sem o Vuexy~~ - Não atende o objetivo do projeto
3. **[ESCOLHIDA]** Criar estrutura preparatória e documentar a necessidade

**Próximos Passos**:
- Quando o template Vuexy HTML for adicionado ao repositório, deverá ser colocado em um local identificável
- Atualizar este documento com o caminho escolhido
- Executar a cópia dos assets conforme Parte C

---

### Decisão 2: Estrutura de Diretórios
**Contexto**: Necessidade de organizar o projeto com Storybook e tema Vuexy.

**Decisão**: 
- Criar `agent_helpers/` na raiz para documentação de workflow
- Criar `packages/vuexy_theme/` para isolamento do tema
- Usar `packages/vuexy_theme/public/vuexy` para assets estáticos

**Justificativa**: 
- Separação clara entre código do Storybook e assets do tema
- Facilita manutenção e não interfere com arquivos originais do Vuexy
- Permite servir assets via diretório estático do Storybook

---

### Decisão 3: Renderizador do Storybook
**Data**: 2026-01-30
**Decisão**: Usar `@storybook/html-vite` como framework

**Contexto**: 
- Tentativa inicial de usar `@storybook/html` resultou em erro de configuração
- Storybook v8 requer um builder específico (Vite ou Webpack)

**Justificativa**: 
- HTML puro mantém fidelidade ao template Vuexy original
- Vite é mais rápido e moderno que Webpack
- Permite renderizar componentes usando markup HTML direto do Vuexy

**Versões Instaladas**:
- @storybook/core: 8.6.15
- @storybook/html-vite: 8.6.15
- @storybook/addon-essentials: 8.6.14
- @storybook/addon-interactions: 8.6.14
- @storybook/addon-links: 8.6.15

**Impacto**: Sucesso! Storybook rodando em http://localhost:6006

---

### Decisão 4: Placeholder CSS do Vuexy
**Data**: 2026-01-30
**Contexto**: Template Vuexy HTML não existe no repositório ainda

**Decisão**: Criar CSS placeholder inspirado em Vuexy com:
- Variáveis CSS para cores baseadas na paleta Vuexy conhecida
- Estilos básicos para Button, Input, Card, Table
- Estrutura preparada para ser substituída pelo CSS real

**Localização**: `packages/vuexy_theme/public/vuexy/css/vuexy-theme.css`

**Próximos Passos**: 
Quando o template Vuexy for adicionado:
1. Substituir vuexy-theme.css pelos arquivos CSS reais
2. Copiar todos os assets (fonts, vendors, js)
3. Atualizar preview.js com os links CSS corretos na ordem original

---

## Template para Novas Decisões

### Decisão N: [Título]
**Data**: YYYY-MM-DD
**Contexto**: [Descrição do problema/situação]
**Decisão**: [O que foi decidido]
**Justificativa**: [Por que esta decisão foi tomada]
**Alternativas**: [Outras opções consideradas]
**Impacto**: [Consequências da decisão]
