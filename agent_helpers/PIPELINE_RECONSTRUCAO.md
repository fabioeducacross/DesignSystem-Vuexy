# Pipeline de Reconstrução Profissional de Componentes

Processo detalhado para transformar componentes básicos auto-gerados em stories profissionais com documentação Figma-style.

**Status:** Validado com CancelMission e Card  
**Próximos:** 109 componentes restantes  
**Tempo Estimado:** 15-20 minutos por componente

---

## 1. Análise Inicial (3 min)

### 1.1 Ler Arquivo Existente

```bash
# Abrir arquivo no editor
src/stories/educacross-components-v2/[ComponentName].stories.js
```

**Coletar:**
- Source Vue original (path no comentário `@source`)
- CSS classes existentes
- Template HTML atual
- Props/eventos já identificados

### 1.2 Identificar Contexto

**Perguntas:**
- Qual a função do componente?
- Quem usa? (Aluno, Professor, Coordenador, Admin)
- Onde aparece? (Tela/fluxo específico)
- Qual o objetivo de UX?

**Assets Necessários:**
- Verificar referências @/assets
- Mapear para pasta Assets/
- Identificar ícones, logos, imagens

### 1.3 Categorizar Complexidade

**Simples (10 min):**
- Componentes visuais estáticos
- Sem interação JS
- Exemplo: Card, MediaCard, Badge

**Médio (15 min):**
- Interação básica
- Loaders necessários (Bootstrap JS)
- Exemplo: AppCollapseItem, Modal, Tooltip

**Complexo (20+ min):**
- Múltiplas interações
- Vendor libraries (Flatpickr, Select2)
- Exemplo: FilterForm, Calendar, DataTable

---

## 2. Estrutura do Arquivo (Template)

### 2.1 Header (Metadados)

```javascript
/**
 * ComponentName - Título Descritivo
 * =========================================
 * Breve descrição do propósito (1 linha)
 * 
 * @component ComponentName
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\Path\Component.vue
 * @assets Assets/Caminho/relevante/
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Categoria/ComponentName',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // ou 'centered', 'fullscreen'
    docs: {
      description: {
        component: `
          [DOCUMENTAÇÃO COMPLETA AQUI - VER SEÇÃO 3]
        `
      }
    }
  }
};
```

### 2.2 CSS Styles (Inline)

```javascript
const componentStyles = `
<style>
  .component-class {
    /* Estilos do componente */
  }
  
  @media print {
    /* Estilos de impressão se aplicável */
  }
</style>
`;
```

### 2.3 UX Writing Matrix (Comentário)

```javascript
/**
 * Matriz de UX Writing para ComponentName
 * 
 * | Elemento | Tipo | Conteúdo | Tom | Função |
 * |----------|------|----------|-----|--------|
 * | Heading | Heading | "TÍTULO" | Formal | Identificar seção |
 * | Button | CTA | "Ação" | Direto | Acionar função |
 * | ... | ... | ... | ... | ... |
 * 
 * Princípios:
 * - [Princípio 1 de copy]
 * - [Princípio 2 de copy]
 */
```

### 2.4 Stories (Mínimo 3)

```javascript
/**
 * Story: Default - Descrição
 */
export const Default = {
  parameters: {
    docs: {
      description: {
        story: `Descrição específica desta variação`
      }
    }
  },
  render: () => `
    <style>${componentStyles}</style>
    [HTML DO COMPONENTE]
  `
};

/**
 * Story: Variant - Descrição
 */
export const Variant = { /* ... */ };

/**
 * Story: WithInteraction - Descrição
 */
export const WithInteraction = {
  loaders: [/* se necessário */],
  render: () => { /* ... */ }
};
```

---

## 3. Documentação Completa (Figma-Style)

### 3.1 CSS Styling (OBRIGATÓRIO)

Copiar CSS completo do Card.stories.js ou CancelMission.stories.js:

```css
<style>
  /* Base Typography - Figma Professional Style */
  .sbdocs-wrapper {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #1d1d1d;
    line-height: 1.6;
    /* ... resto do CSS ... */
  }
</style>
```

**Fonte:** Lines 24-163 do Card.stories.js

### 3.2 Seções Obrigatórias

#### A. Título e Subtítulo

```markdown
Breve descrição funcional (1-2 linhas).

---
```

**Importante:** Não adicionar `# ComponentName` pois o Storybook já renderiza o título automaticamente a partir do `title` no export default.

#### B. Contexto de Uso

```markdown
## Contexto de Uso

### Jornada do Usuário

**Persona:** [Aluno/Professor/Coordenador/etc]  
**Tela:** [Nome da Tela] → [Submenu]  
**Fluxo:** Passo 1 → Passo 2 → Passo 3

### Casos de Uso

1. **Caso 1:** Descrição
2. **Caso 2:** Descrição
3. **Caso 3:** Descrição
```

#### C. Arquitetura da Informação

```markdown
## Arquitetura da Informação

### Estrutura do Componente

\`\`\`
ComponentContainer
│
├── Section 1
│   ├── Element A
│   └── Element B
│
└── Section 2
    └── Element C
\`\`\`

### Hierarquia Visual (DOM)

\`\`\`
.component-root
└── .child-element
    ├── .grandchild-1
    └── .grandchild-2
\`\`\`
```

#### D. Especificações de Design

**Tabelas Obrigatórias:**

1. **Dimensões** (se aplicável)
2. **Sistema Tipográfico** (sempre)
3. **Cores** (sempre)
4. **Layout e Espaçamento** (sempre)
5. **Assets Utilizados** (se tiver imagens/ícones)
6. **Comportamento e Estados** (se interativo)

**Formato:**

```markdown
## Especificações de Design

### Sistema Tipográfico

| Elemento | Size | Weight | Transform | Color |
|----------|------|--------|-----------|-------|
| Heading | 24px | bold | none | #000 |
| Body | 16px | normal | none | #333 |
```

#### E. Regras de Negócio (se aplicável)

```markdown
## Regras de Negócio

### Validação de Input

**Campo X:**
- Formato: YYYY-MM-DD
- Obrigatório: Sim
- Validação: Data futura apenas

### Cálculos

**Métrica Y:**
- Fórmula: (A + B) / C × 100
- Arredondamento: 2 casas decimais
```

#### F. Acessibilidade (sempre)

```markdown
## Acessibilidade

### Considerações

| Aspecto | Implementação |
|---------|---------------|
| Contraste | WCAG AAA (7:1) |
| Teclado | Tab navigation + Enter |
| Screen Reader | aria-label em todos os botões |
```

#### G. Exemplo de Integração

```markdown
## Exemplo de Integração

### Vue 2 Component

\`\`\`vue
<template>
  <ComponentName
    :prop1="value1"
    @event="handler"
  />
</template>

<script>
export default {
  methods: {
    handler() { /* ... */ }
  }
}
</script>
\`\`\`
```

#### H. Performance (se relevante)

```markdown
## Performance

### Otimizações

| Métrica | Target | Implementação |
|---------|--------|---------------|
| Load Time | < 500ms | Lazy loading |
| Bundle Size | < 50KB | Tree shaking |
```

#### I. Variações (se houver)

```markdown
## Variações

### Variant 1: Nome

Descrição da variação e quando usar.

### Variant 2: Nome

Descrição da variação e quando usar.
```

#### J. Componentes Relacionados

```markdown
## Componentes Relacionados

- **ComponentA** - Relação/uso conjunto
- **ComponentB** - Alternativa para caso X
- **ComponentC** - Usado internamente
```

---

## 4. Assets e Recursos

### 4.1 Mapeamento de Assets

**Padrão Vue Original:**
```javascript
@/assets/images/gamification/star.svg
```

**Mapear Para:**
```javascript
Assets/Gamificação/Estrelas.svg
```

**Pastas Disponíveis:**
- `Assets/Gamificação/` - Estrelas, Moedas, Troféus, Insignias
- `Assets/ícones de ação/` - delete, edit, badge, trophy
- `Assets/Áreas de conhecimento/` - Matemática, Língua Portuguesa
- `Assets/Típos de usuários/` - Aluno, Professor, Coordenador
- `Assets/Logos/` - Principal, Variações, Dark mode
- `Assets/Interface/` - Acesso, Group 9555
- `Assets/Proficiência/` - abaixo do básico, básico, proficiente

### 4.2 Estratégia de Inclusão

**Ícones Pequenos (< 5KB):**
- Inline SVG direto no template
- Melhor performance
- Exemplo: Ícones de ação, badges

**Imagens Médias (5-50KB):**
- Referência direta por path
- `<img src="/path/to/asset.svg">`
- Exemplo: Logos, ilustrações

**Imagens Grandes (> 50KB):**
- Placeholder SVG simplificado
- Link para asset real nos docs
- Exemplo: Mascotes, backgrounds complexos

### 4.3 SVG Inline Pattern

```javascript
render: () => `
  <div class="icon-container">
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="currentColor"/>
    </svg>
  </div>
`
```

---

## 5. Stories: Tipos e Padrões

### 5.1 Default Story (OBRIGATÓRIA)

**Propósito:** Mostrar estado básico funcional

```javascript
export const Default = {
  parameters: {
    docs: {
      description: {
        story: `Estado padrão com dados de exemplo.`
      }
    }
  },
  render: () => `
    <style>${componentStyles}</style>
    [HTML BÁSICO]
  `
};
```

### 5.2 WithData Story (OBRIGATÓRIA)

**Propósito:** Mostrar com dados realistas

```javascript
export const WithRealData = {
  parameters: {
    docs: {
      description: {
        story: `Exemplo com dados reais de produção.`
      }
    }
  },
  render: () => `[HTML COM DADOS REALISTAS]`
};
```

### 5.3 Interactive Story (se aplicável)

**Propósito:** Demonstrar interações

```javascript
export const Interactive = {
  loaders: [
    async () => {
      if (typeof window !== 'undefined' && !window.bootstrap) {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = '/vuexy/js/bootstrap.js';
          script.onload = () => resolve({ bootstrapLoaded: true });
          document.head.appendChild(script);
        });
      }
      return {};
    }
  ],
  render: () => {
    setTimeout(() => {
      // Inicialização de JS libraries
      if (window.bootstrap?.Modal) {
        document.querySelectorAll('[data-bs-toggle="modal"]').forEach(el => {
          new bootstrap.Modal(el);
        });
      }
    }, 100);
    
    return `[HTML COM INTERAÇÃO]`;
  }
};
```

### 5.4 Stories Específicas por Tipo

**Componentes de Formulário:**
- Default
- WithValidation
- WithError
- Disabled

**Componentes de Feedback:**
- Default
- Success
- Warning
- Error
- Loading

**Componentes de Layout:**
- Default
- WithContent
- Responsive
- Nested

**Componentes de Impressão:**
- Default
- PrintReady
- BatchPrint

---

## 6. Checklist de Qualidade

### Antes de Commitar

- [ ] CSS Figma-style aplicado (lines 24-163)
- [ ] Mínimo 3 stories criadas
- [ ] UX Writing Matrix documentada
- [ ] Arquitetura da Informação com ASCII tree
- [ ] Tabelas de especificações completas
- [ ] Assets mapeados e funcionando
- [ ] Exemplo de integração Vue 2
- [ ] Sem emojis na documentação
- [ ] Build do Storybook sem erros
- [ ] Visual check no navegador

### Validação Visual

```bash
npm run build-storybook
python -m http.server 6006 --directory storybook-static
# Abrir http://localhost:6006
```

**Verificar:**
1. Documentação renderiza corretamente
2. Tabelas formatadas (não quebradas)
3. CSS profissional aplicado (Inter font, spacing clean)
4. Stories todas funcionais
5. Assets carregando (não broken images)

---

## 7. Automação e Scripts

### 7.1 Script de Extração de Props (Futuro)

```bash
# Extrair props do arquivo Vue original
node scripts/extract-vue-props.js src/path/to/Component.vue
```

**Output esperado:**
```json
{
  "props": {
    "studentName": { "type": "String", "required": true },
    "age": { "type": "Number", "default": 0 }
  },
  "events": ["click", "update"],
  "slots": ["default", "header"]
}
```

### 7.2 Template Generator (Futuro)

```bash
# Gerar estrutura básica do .stories.js
node scripts/generate-story-template.js ComponentName
```

**Output:**
- Arquivo .stories.js com estrutura completa
- Placeholders para preencher
- CSS Figma-style incluído

### 7.3 Asset Mapper (Futuro)

```bash
# Mapear @/assets para Assets/
node scripts/map-assets.js src/stories/educacross-components-v2/
```

**Funcionalidade:**
- Scan de todos os `src=""` e `@/assets`
- Sugestão de path em Assets/
- Replace automático

---

## 8. Workflow Recomendado

### Para Componente Individual (15 min)

1. **Read (2 min):** Ler arquivo existente completo
2. **Analyze (3 min):** Identificar contexto, assets, complexidade
3. **Plan (2 min):** Decidir número de stories, seções de docs
4. **Write (6 min):** Reescrever arquivo com template
5. **Test (2 min):** Build + visual check

### Para Lote de Componentes (1 dia = 6-8 componentes)

**Manhã (3-4 componentes):**
1. Componente 1 (15 min)
2. Build + check (5 min)
3. Componente 2 (15 min)
4. Build + check (5 min)
5. Componente 3 (15 min)
6. Build + check (5 min)
7. Componente 4 (15 min)
8. Build final + review (10 min)

**Tarde (3-4 componentes):**
- Repetir processo

**Commit Strategy:**
- Commit individual por componente
- Mensagem: `feat(stories): reconstruct ComponentName with professional docs`

---

## 9. Componentes por Prioridade

### Fase 1 - P0 Critical (18 componentes - 2 dias)

**Broken Images/Assets:**
1. MediaCard - Ícones de mídia quebrados
2. AlbumCover - SVG de música
3. AppCollapseItem - Ícones de Assets/
4. StudentAvatar - Avatar padrão
5. ProfilePicture - Imagem de perfil

**Empty Slots/Props:**
6. QuestionAlternative - Alternativas vazias
7. ESelect - Options vazias
8. FilterChip - Chips sem conteúdo
9. BadgeList - Lista vazia

**Documentation Critical:**
10. CancelMission - FEITO ✓
11. Card - FEITO ✓
12. ExpiredMission - Missão expirada
13. MissionDetailsPlus - Detalhes missão
14. ProgressBar - Barras de progresso
15. RainbowProgressBar - Barra arco-íris
16. ProgressBarHorizontalV2 - Progress horizontal
17. ProgressBarVertical - Progress vertical
18. ProgressBarTopInfo - Progress com info

### Fase 2 - P1 Core UI (25 componentes - 3 dias)

**Forms:**
1. EFormCheck - Checkbox/radio
2. EInput - Input básico
3. ETextarea - Textarea
4. SelectInfinityScroll - Select infinito
5. SelectLocale - Seletor de idioma

**Cards:**
6. MediaCard - Card de mídia
7. MediaCardIcon - Card com ícone
8. DynamicMediaCard - Card dinâmico
9. SubjectCard - Card de matéria

**Navigation:**
10. AppLanguageSelector - FEITO (anteriormente)
11. SimpleTab - Tabs simples
12. TabRouter - Tabs com router
13. VerticalDivider - Divisor vertical

**Data Display:**
14. DescriptorTag - Tag descritivo
15. SubjectBand - Banda de matéria
16. QuestionStatus - Status questão
17. ExerciseType - Tipo de exercício
18. PerformanceCell - Célula de performance

**Feedback:**
19. BackgroundSpace - FEITO (anteriormente)
20. ConditionalValueDisplay - Display condicional
21. QuestionContent - Conteúdo questão
22. StudentsDetail - Detalhes aluno
23. StudentActivityDetail - Detalhe atividade

**Overlays:**
24. ModalStudentActivityDetails - Modal atividade
25. ModalStudentRoundDetails - Modal rodada

### Fase 3 - P2 Specialized (68 componentes - 5 dias)

**Tables:**
1. ListTableLocalSorting - Ordenação local
2. ListTablePagination - Paginação
3. ListTableRanking - Ranking
4. [demais 15 componentes de tables]

**PDFs:**
1. CardsList - Lista de cards
2. CertificateList - Lista certificados
3. PerformancePDFList - Lista performance
4. [demais 8 componentes PDFs]

**Charts:**
1. BarChart - FEITO (anteriormente)
2. PieChart - FEITO (anteriormente)
3. [demais 3 charts]

**Templates:**
1. Template1 até Template9 - Templates de layout
2. FilterForm - Formulário de filtro complexo
3. Stepper - Wizard steps

**Modals/Overlays:**
1. ExpandableFilterArea - Área expansível
2. FixedStickyFooter - Footer fixo
3. [demais overlays]

---

## 10. Padrões de Commit

### Mensagens

```bash
# Componente individual
git commit -m "feat(stories): reconstruct Card with professional docs

- Add Figma-style CSS documentation
- Create 3 stories (Default, WithData, PrintReady)
- Map assets from Assets/Logos and Assets/Gamificação
- Add UX Writing matrix
- Add Architecture diagrams
- Add complete spec tables"

# Lote de componentes
git commit -m "feat(stories): reconstruct 5 form components with professional docs

Components:
- EFormCheck
- EInput
- ETextarea
- SelectInfinityScroll
- SelectLocale

All include:
- Professional documentation
- 3+ stories each
- UX Writing matrices
- Asset mapping
- Spec tables"
```

### Branches

```bash
# Branch por fase
git checkout -b feature/reconstruct-p0-critical
git checkout -b feature/reconstruct-p1-core-ui
git checkout -b feature/reconstruct-p2-specialized

# Ou branch por componente (componentes complexos)
git checkout -b feature/reconstruct-filterfform
```

---

## 11. Troubleshooting

### Erro: "Unterminated template"

**Causa:** Template string não fechada

**Fix:**
```javascript
// Errado
render: () => `
  <div>content</div>
`

// Correto
render: () => `
  <div>content</div>
`
};
```

### Erro: "Parse error"

**Causa:** Sintaxe inválida em template literal

**Fix:**
- Verificar aspas escapadas `\``
- Verificar ${} em strings normais
- Verificar fechamento de tags HTML

### Build Warning: "Chunk size > 500KB"

**Causa:** Assets inline grandes

**Fix:**
- Usar referência em vez de inline
- Otimizar SVGs (remover metadados)
- Lazy load vendor libraries

### Assets 404

**Causa:** Path incorreto

**Fix:**
```javascript
// Errado
src="/assets/logo.png"

// Correto (servido de packages/vuexy_theme/public/)
src="/vuexy/images/logo.png"

// Assets Educacross (copiar para .storybook/public/)
src="/Assets/Gamificação/Estrelas.svg"
```

---

## 12. Referências

### Arquivos de Referência

1. **CancelMission.stories.js** - Componente complexo com interação
   - 900+ linhas
   - 3 stories (Confirmacao, Loading, Sucesso)
   - Assets inline (Belinha SVG)
   - Máximo de documentação

2. **Card.stories.js** - Componente visual com print
   - 1200+ linhas
   - 3 stories (Default, WithData, PrintReady)
   - SVGs inline de frutas
   - Layout de impressão A4

### CSS Figma-Style

**Source:** Lines 24-163 do Card.stories.js

**Features:**
- Typography system (h1-h4, p, code)
- Table styling profissional
- List markers customizados
- Link hover states
- Blockquote styling
- Selection color
- Responsive breakpoints

### Vendor Libraries Loaders

**Bootstrap JS:**
```javascript
loaders: [
  async () => {
    if (!window.bootstrap) {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = '/vuexy/js/bootstrap.js';
        script.onload = () => resolve({ bootstrapLoaded: true });
        document.head.appendChild(script);
      });
    }
  }
]
```

**Padrão Similar Para:**
- Flatpickr (`/vuexy/vendors/libs/flatpickr/flatpickr.js`)
- Select2 (`/vuexy/vendors/libs/select2/select2.js`)
- FullCalendar (`/vuexy/vendors/libs/fullcalendar/fullcalendar.js`)
- ApexCharts (`/vuexy/vendors/libs/apex-charts/apexcharts.js`)

---

## 13. Próximos Passos

### Imediato (Esta Sprint)

1. **Validação do Card** - Coletar feedback
2. **Ajustar Pipeline** - Refinar processo baseado em feedback
3. **Iniciar P0 Critical** - 18 componentes prioritários

### Curto Prazo (2-3 Semanas)

1. **Completar Fase 1** - P0 (18 componentes)
2. **Completar Fase 2** - P1 (25 componentes)
3. **Scripts de Automação** - Template generator, asset mapper

### Médio Prazo (1-2 Meses)

1. **Completar Fase 3** - P2 (68 componentes)
2. **Separação Vuexy/Educacross** - Categorizar base vs custom
3. **Playwright Tests** - Visual regression completo

### Longo Prazo (3+ Meses)

1. **Component Generator** - CLI para criar novos componentes
2. **Design Tokens** - Extrair cores/spacing para tokens
3. **Storybook Addons** - Accessibility checker, design sync

---

## Resumo Executivo

**Pipeline validado com sucesso em 2 componentes:**
- CancelMission (complexo, 900 linhas)
- Card (visual, 1200 linhas)

**Processo:**
1. Read (2 min)
2. Analyze (3 min)
3. Plan (2 min)
4. Write (6 min)
5. Test (2 min)
**Total: 15 min/componente**

**Elementos Obrigatórios:**
- CSS Figma-style professional
- Mínimo 3 stories
- UX Writing matrix
- Arquitetura da informação
- Especificações completas
- Assets mapeados

**Próximo:** Coletar feedback do Card e iniciar P0 (18 componentes)
