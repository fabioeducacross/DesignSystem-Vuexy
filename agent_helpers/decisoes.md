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

**Atualização 2026-01-30 16:11**:
- ✅ Template identificado: `themeforest-lV6WYTyr-vuexy-vuejs-html-laravel-admin-dashboard-template/vuexy-admin-v10.9.0`
- ✅ Versão do template: **v10.9.0**
- ✅ Assets integrados em `packages/vuexy_theme/public/vuexy/` (750+ arquivos, ~30MB)
- ✅ Criado guia de integração em INTEGRACAO_VUEXY.md

**Atualização 2026-01-30 (Catalogação)**:
- ✅ Template fonte: ASP.NET Core Razor Pages (não HTML estático)
- ✅ Fonte alternativa: CSS/JS assets + documentação conhecida do Vuexy
- ✅ Inventário criado: 26 page CSS files + ~60 componentes identificados
- ✅ Classificação Atomic Design aplicada: Atoms/Molecules/Organisms/Templates

---

### Decisão 2: Estrutura de Diretórios
**Contexto**: Necessidade de organizar o projeto com Storybook e tema Vuexy.

**Decisão**: 
- Criar `agent_helpers/` na raiz para documentação de workflow
- Criar `packages/vuexy_theme/` para isolamento do tema
- Usar `packages/vuexy_theme/public/vuexy` para assets estáticos
- Estrutura Atomic Design em `src/stories/{atoms,molecules,organisms,templates,foundations}/`

**Justificativa**: 
- Separação clara entre código do Storybook e assets do tema
- Facilita manutenção e não interfere com arquivos originais do Vuexy
- Permite servir assets via diretório estático do Storybook
- Atomic Design fornece escalabilidade e organização consistente

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

---

### Decisão 5: Estratégia de Catalogação do Template
**Data**: 2026-01-30
**Contexto**: Template fonte é ASP.NET Core Razor Pages, não HTML estático puro

**Decisão**: Catalogar baseado em CSS files de páginas (26 arquivos), JS files, documentação conhecida do Vuexy, e classes CSS no core.css

**Resultado**:
- ✅ Inventário criado: vuexy_pages_index.md (26 page CSS + ~60 componentes)
- ✅ Backlog priorizado: component_backlog.md (66 componentes classificados)
- ✅ Dashboard de progresso: catalog_progress.md

**Critérios de Classificação Atomic Design**:
- **ATOM**: Não decomponível (Input, Button, Badge, Avatar)
- **MOLECULE**: Composição de 2-3 atoms (SearchField, FormGroup)
- **ORGANISM**: Estrutura complexa reutilizável (DataTable, Navbar, Modal)
- **TEMPLATE**: Layout completo de página (DashboardLayout, LoginPage)

**Heurística de Priorização**:
- **P0 (27)**: Componentes críticos (Button, Input, Card, Modal, Table, Navbar, Sidebar)
- **P1 (28)**: Componentes importantes (Dropdown, Tooltip, Accordion, Datepicker)
- **P2 (11)**: Nice-to-have (Charts, Maps, WYSIWYG, Color Picker)

**Referências**: [component_backlog.md](./component_backlog.md), [vuexy_pages_index.md](./vuexy_pages_index.md)

---

### Decisão 6: Estrutura de Skeleton Stories
**Data**: 2026-01-30
**Contexto**: Criar padrão para 17 stories não implementados ainda

**Decisão**: Todo skeleton story tem:
1. Comentário header (componente, source, priority)
2. Documentação com TODOs, fonte Vuexy, controles esperados, stories planejadas
3. argTypes planejados (contrato da API)
4. Template básico com placeholder "TODO: Implement..."
5. Overview story indicando status

**Benefícios**:
- Sidebar mostra estrutura completa
- Equipe vê o que falta implementar
- Contratos documentados antecipadamente
- Evita duplicação

**Exemplo**: [Input.stories.js](../src/stories/atoms/forms/Input.stories.js)

