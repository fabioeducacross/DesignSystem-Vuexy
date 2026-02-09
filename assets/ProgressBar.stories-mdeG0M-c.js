const O={title:"Educacross Components V2/Feedback/ProgressBar",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
<style>
  /* Base Typography - Figma Professional Style */
  .sbdocs-wrapper {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    color: #1d1d1d;
    line-height: 1.6;
    font-size: 15px;
    max-width: 880px;
    margin: 0 auto;
  }

  .sbdocs h1 {
    font-size: 2.75rem;
    font-weight: 700;
    color: #000;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .sbdocs h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #000;
    margin: 3.5rem 0 1.25rem 0;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .sbdocs h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1d1d1d;
    margin: 2.5rem 0 1rem 0;
    line-height: 1.4;
  }

  .sbdocs h4 {
    font-size: 1.05rem;
    font-weight: 600;
    color: #333;
    margin: 2rem 0 0.75rem 0;
    line-height: 1.4;
  }

  .sbdocs p {
    margin-bottom: 1.25rem;
    color: #333;
    font-size: 15px;
    line-height: 1.7;
  }

  .sbdocs p strong {
    color: #000;
    font-weight: 600;
  }

  .sbdocs ul {
    margin: 1.5rem 0;
    padding-left: 0;
    list-style: none;
  }

  .sbdocs ul li {
    position: relative;
    padding-left: 1.75rem;
    margin-bottom: 0.875rem;
    color: #333;
    line-height: 1.7;
  }

  .sbdocs ul li::before {
    content: '•';
    position: absolute;
    left: 0.5rem;
    color: #6e63e8;
    font-weight: bold;
    font-size: 1.25em;
  }

  .sbdocs table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 14px;
  }

  .sbdocs thead {
    background: #fff;
    border-bottom: 2px solid #e5e5e5;
  }

  .sbdocs thead th {
    color: #1d1d1d;
    font-weight: 600;
    text-align: left;
    padding: 0.875rem 1rem;
    font-size: 13px;
    letter-spacing: 0.02em;
  }

  .sbdocs tbody tr {
    border-bottom: 1px solid #f1f3f5;
  }

  .sbdocs tbody tr:hover {
    background-color: #fafbfc;
  }

  .sbdocs tbody td {
    padding: 0.875rem 1rem;
    color: #333;
    line-height: 1.6;
  }

  .sbdocs tbody td:first-child {
    font-weight: 500;
    color: #1d1d1d;
  }

  .sbdocs code {
    background: #f1f3f5;
    color: #6e63e8;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
    font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
    font-weight: 500;
  }

  .sbdocs pre {
    background: #f8f9fa;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 2rem 0;
    font-size: 13px;
    line-height: 1.6;
  }

  .sbdocs pre code {
    background: transparent;
    padding: 0;
    color: #1d1d1d;
    font-size: 13px;
    font-weight: 400;
  }
</style>

Indicador visual de progresso do estudante com sistema inteligente de cores baseado em níveis de proficiência educacional.

---

## Contexto de Uso

### Jornada do Usuário

**Persona:** Professor / Coordenador Pedagógico  
**Tela:** Dashboards de Desempenho → Relatórios de Alunos  
**Fluxo:** Acessar Turma → Ver Alunos → Visualizar Desempenho Individual → Analisar Progresso por Disciplina

### Casos de Uso

1. **Dashboard de Turma:** Visualização rápida do desempenho médio de múltiplos alunos em diferentes disciplinas
2. **Relatório Individual:** Acompanhamento detalhado do progresso de um aluno ao longo do tempo
3. **Comparação de Disciplinas:** Identificar matérias com melhor e pior desempenho para intervenção pedagógica
4. **Feedback para Aluno:** Interface visual clara para o estudante entender seu próprio progresso

---

## Arquitetura da Informação

### Estrutura do Componente

\`\`\`
ProgressBar (Container)
│
├── Header Section
│   ├── Label (left) - Nome da disciplina/métrica
│   └── Value (right) - Porcentagem numérica
│
├── Progress Section
│   ├── Background Bar (cor clara do nível)
│   └── Fill Bar (cor sólida do nível)
│       └── Width dinâmica (0-100%)
│
└── Footer Section (opcional)
    └── Sufix Text - Informação adicional
\`\`\`

### Hierarquia Visual (DOM)

\`\`\`
.progress-bar-container
├── .progress-bar-header
│   ├── .progress-bar-label [text]
│   └── .progress-bar-value [class:text-{variant}]
│
├── .progress-bar-bg [class:bg-progress-bar-{variant}]
│   └── .progress
│       └── .progress-bar [class:bg-{variant}]
│           └── style="width: {value}%"
│
└── .progress-bar-sufix [optional]
\`\`\`

---

## Especificações de Design

### Dimensões do Componente

| Propriedade | Valor | Uso |
|-------------|-------|-----|
| Height (barra) | 5px | Altura fixa da barra de progresso |
| Border Radius | 0.357rem (~5.7px) | Arredondamento suave |
| Margin Bottom | 1rem (16px) | Espaçamento entre múltiplas barras |
| Header Gap | 0.5rem (8px) | Espaço entre header e barra |

### Sistema Tipográfico

| Elemento | Size | Weight | Color |
|----------|------|--------|-------|
| Label | Default (15px) | 600 | #5e5873 |
| Value | Default (15px) | 600 | Dinâmica (variant) |
| Sufix | 0.857rem (~13.7px) | normal | #6e6b7b |

### Sistema de Cores por Proficiência

| Nível | Range | Cor Sólida | Cor Background | Uso |
|-------|-------|------------|----------------|-----|
| Abaixo do Básico | 0-30% | #EA5455 (vermelho) | rgba(234, 84, 85, 0.12) | Aluno precisa intervenção urgente |
| Básico | 30-70% | #FF9F43 (amarelo) | rgba(255, 159, 67, 0.12) | Aluno em desenvolvimento |
| Proficiente | 70-100% | #28C76F (verde) | rgba(40, 199, 111, 0.12) | Aluno domina o conteúdo |
| Avançado | (futuro) | #6E63E8 (roxo) | rgba(110, 99, 232, 0.12) | Aluno supera expectativas |

### Layout e Espaçamento

| Propriedade | Valor | Aplicação |
|-------------|-------|-----------|
| Container Padding | 0 | Sem padding interno |
| Header Flex | space-between | Label à esquerda, value à direita |
| Progress Transition | 0.6s ease | Animação suave na mudança de valor |
| Sufix Margin Top | 0.25rem | Espaço acima do texto adicional |

---

## Comportamento e Estados

### Sistema de Cor Dinâmica

**Lógica de getColors():**

\`\`\`javascript
function getColors(value, progressBarEnum) {
  const range = progressBarEnum.find(r => value >= r.min && value <= r.max);
  return {
    textVariant: range.textVariant,    // ex: 'text-legend-proficient'
    variant: range.variant,             // ex: 'legend-proficient'
    background: range.background,       // ex: 'bg-progress-bar-legend-proficient'
    min: range.min,
    max: range.max
  };
}
\`\`\`

**progressBarEnum:**

\`\`\`javascript
[
  { min: 0, max: 30, variant: 'legend-below-basic', ... },
  { min: 30, max: 70, variant: 'legend-basic', ... },
  { min: 70, max: 100, variant: 'legend-proficient', ... }
]
\`\`\`

### Estados Visuais

| Estado | Descrição | Visual |
|--------|-----------|--------|
| 0% | Barra vazia | Apenas background visível |
| 1-29% | Abaixo do Básico | Vermelho com alerta visual |
| 30-69% | Básico | Amarelo indicando desenvolvimento |
| 70-100% | Proficiente | Verde sinalizando sucesso |
| 100% | Completo | Barra totalmente preenchida |

### Animação

| Propriedade | Valor | Comportamento |
|-------------|-------|---------------|
| Width transition | 0.6s ease | Barra cresce suavemente ao atualizar valor |
| Color transition | Instantânea | Cor muda imediatamente ao cruzar threshold |

---

## Regras de Negócio

### Cálculo de Proficiência

**Fórmulas:**
- Progresso = (Questões Corretas / Total de Questões) × 100
- Progresso = (Habilidades Dominadas / Total de Habilidades) × 100
- Progresso = (Nota Obtida / Nota Máxima) × 100

**Arredondamento:** Sem casas decimais (inteiro)

### Thresholds de Intervenção

| Nível | Ação Pedagógica Recomendada |
|-------|----------------------------|
| 0-30% | Intervenção imediata - Recuperação intensiva |
| 30-50% | Atenção - Reforço nas dificuldades |
| 50-70% | Acompanhamento - Consolidar aprendizado |
| 70-100% | Manutenção - Desafios adicionais |

### Cores WCAG Compliant

Todas as cores do sistema atendem contraste mínimo:
- Vermelho sobre fundo claro: 4.5:1 (AA)
- Amarelo sobre fundo claro: 4.5:1 (AA)
- Verde sobre fundo claro: 4.5:1 (AA)

---

## Acessibilidade

### Considerações

| Aspecto | Implementação |
|---------|---------------|
| ARIA role | \`role="progressbar"\` |
| ARIA attributes | \`aria-valuenow\`, \`aria-valuemin="0"\`, \`aria-valuemax="100"\` |
| Contraste | WCAG AA (mínimo 4.5:1) |
| Texto alternativo | Label descritivo + valor em % |

### Screen Reader

\`\`\`html
<div role="progressbar" 
     aria-valuenow="75" 
     aria-valuemin="0" 
     aria-valuemax="100"
     aria-label="Progresso em Matemática: 75 por cento">
</div>
\`\`\`

---

## Exemplo de Integração

### Vue 2 Component

\`\`\`vue
<template>
  <div>
    <ProgressBar
      v-for="subject in subjects"
      :key="subject.id"
      :value="subject.progress"
      :label="subject.name"
      :sufix="\`\${subject.correct} de \${subject.total} questões\`"
    />
  </div>
</template>

<script>
import ProgressBar from '@/components/progessBar/ProgressBarHorizontal.vue'
import { getColors, progressBarEnum } from '@/consts/rangeColors'

export default {
  components: { ProgressBar },
  
  data() {
    return {
      subjects: [
        { id: 1, name: 'Matemática', progress: 75, correct: 15, total: 20 },
        { id: 2, name: 'Português', progress: 45, correct: 9, total: 20 }
      ]
    }
  },
  
  methods: {
    getProgressColor(value) {
      return getColors(value, progressBarEnum)
    }
  }
}
<\/script>
\`\`\`

### Props API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| value | Number | 0 | Yes | Valor do progresso (0-100) |
| label | String | '' | No | Label exibido acima da barra |
| sufix | String | '' | No | Texto adicional abaixo da barra |
| positionBottom | Boolean | false | No | Se true, valor vai abaixo da barra |
| progressBarColors | Array | progressBarEnum | No | Sistema de cores customizado |
| progressBarContainerClass | String | 'mb-2' | No | Classe CSS do container |
| labelClass | String | '' | No | Classe CSS do label |
| sufixClass | String | '' | No | Classe CSS do sufix |

---

## Performance

### Otimizações

| Métrica | Target | Implementação |
|---------|--------|---------------|
| Render Time | < 16ms | CSS puro, sem JS pesado |
| Animation | 60fps | GPU-accelerated (width transform) |
| Rerender | Otimizado | Atualiza apenas width, não re-monta |

### Boas Práticas

- Usar CSS variables para cores (fácil theming)
- Transition apenas na propriedade width
- Evitar recalcular cores a cada render (cache)

---

## Variações

### ProgressBarVertical

Versão vertical para layouts em coluna (ex: sidebar).

### ProgressBarTopInfo

Valor e label no topo, útil para dashboards compactos.

### RainbowProgressBar

Gradiente multi-cores para gamificação visual.

---

## Componentes Relacionados

- **RainbowProgressBar** - Versão com gradiente arco-íris para gamificação
- **ProgressBarVertical** - Orientação vertical para sidebars
- **ProgressBarTopInfo** - Layout alternativo com info no topo
- **PerformanceCell** - Célula de tabela com progress embutido
- **SubjectBand** - Badge com cor de proficiência
        `}}}},s=`
<style>
  /* === ProgressBar - CSS Pixel Perfect do Frontoffice === */
  
  /* Variáveis de cores do sistema de proficiência */
  :root {
    --legend-below-basic: #EA5455;
    --legend-basic: #FF9F43;
    --legend-proficient: #28c76f;
    --legend-advanced: #6e63e8;
  }

  /* Container */
  .progress-bar-container {
    margin-bottom: 1rem;
  }

  .progress-bar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .progress-bar-label {
    font-weight: 600;
    color: #5e5873;
  }

  .progress-bar-value {
    font-weight: 600;
  }

  /* Background wrapper */
  .progress-bar-bg {
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .bg-progress-bar-legend-below-basic {
    background-color: rgba(234, 84, 85, 0.12);
  }

  .bg-progress-bar-legend-basic {
    background-color: rgba(255, 159, 67, 0.12);
  }

  .bg-progress-bar-legend-proficient {
    background-color: rgba(40, 199, 111, 0.12);
  }

  .bg-progress-bar-legend-advanced {
    background-color: rgba(110, 99, 232, 0.12);
  }

  /* Progress bar */
  .progress {
    display: flex;
    height: 5px;
    overflow: hidden;
    font-size: 0.75rem;
    background-color: transparent;
    border-radius: 0.357rem;
  }

  .progress-bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    transition: width 0.6s ease;
    border-radius: 0.357rem;
  }

  .progress-bar.bg-legend-below-basic {
    background-color: var(--legend-below-basic);
  }

  .progress-bar.bg-legend-basic {
    background-color: var(--legend-basic);
  }

  .progress-bar.bg-legend-proficient {
    background-color: var(--legend-proficient);
  }

  .progress-bar.bg-legend-advanced {
    background-color: var(--legend-advanced);
  }

  /* Text variants */
  .text-legend-below-basic {
    color: var(--legend-below-basic) !important;
  }

  .text-legend-basic {
    color: var(--legend-basic) !important;
  }

  .text-legend-proficient {
    color: var(--legend-proficient) !important;
  }

  .text-legend-advanced {
    color: var(--legend-advanced) !important;
  }

  /* Sufix */
  .progress-bar-sufix {
    font-size: 0.857rem;
    color: #6e6b7b;
    margin-top: 0.25rem;
  }
</style>
`,a={render:()=>`
    ${s}
    <div class="p-4" style="max-width: 400px;">
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Progresso</span>
          <span class="progress-bar-value text-legend-proficient">75%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-proficient" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  `},o={render:()=>`
    ${s}
    <div class="p-4" style="max-width: 500px;">
      <h6 class="mb-4">Sistema de Cores por Faixa de Valor</h6>
      
      <!-- 0-30%: Abaixo do Básico (Vermelho) -->
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Aluno 1 - Abaixo do Básico</span>
          <span class="progress-bar-value text-legend-below-basic">15%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-below-basic rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-below-basic" style="width: 15%;"></div>
          </div>
        </div>
        <div class="progress-bar-sufix">Range: 0-30%</div>
      </div>

      <!-- 30-70%: Básico (Amarelo) -->
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Aluno 2 - Básico</span>
          <span class="progress-bar-value text-legend-basic">45%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-basic rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-basic" style="width: 45%;"></div>
          </div>
        </div>
        <div class="progress-bar-sufix">Range: 30-70%</div>
      </div>

      <!-- 70-100%: Proficiente (Verde) -->
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Aluno 3 - Proficiente</span>
          <span class="progress-bar-value text-legend-proficient">85%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-proficient" style="width: 85%;"></div>
          </div>
        </div>
        <div class="progress-bar-sufix">Range: 70-100%</div>
      </div>
    </div>
  `},i={render:()=>`
    ${s}
    <div class="p-4" style="max-width: 400px;">
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Acertos</span>
          <span class="progress-bar-value text-legend-proficient">72%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-proficient" style="width: 72%;"></div>
          </div>
        </div>
        <div class="progress-bar-sufix">72 de 100 questões</div>
      </div>
    </div>
  `},n={render:()=>`
    ${s}
    <div class="p-4" style="max-width: 400px;">
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Matemática</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-basic rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-basic" style="width: 55%;"></div>
          </div>
        </div>
        <h6 class="font-weight-bold text-legend-basic mt-1">55%</h6>
      </div>
    </div>
  `},d={render:()=>`
    ${s}
    <style>
      .demo-card {
        background:;
        border-radius: 0.428rem;
        box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
        padding: 1.5rem;
        max-width: 350px;
      }
      .demo-card-title {
        font-weight: 600;
        font-size: 1.1rem;
        color: #5e5873;
        margin-bottom: 1rem;
      }
    </style>
    <div class="p-4">
      <div class="demo-card">
        <div class="demo-card-title">Desempenho por Disciplina</div>
        
        <div class="progress-bar-container">
          <div class="progress-bar-header">
            <span class="progress-bar-label">Português</span>
            <span class="progress-bar-value text-legend-proficient">82%</span>
          </div>
          <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
            <div class="progress">
              <div class="progress-bar bg-legend-proficient" style="width: 82%;"></div>
            </div>
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar-header">
            <span class="progress-bar-label">Matemática</span>
            <span class="progress-bar-value text-legend-basic">58%</span>
          </div>
          <div class="progress-bar-bg bg-progress-bar-legend-basic rounded-lg">
            <div class="progress">
              <div class="progress-bar bg-legend-basic" style="width: 58%;"></div>
            </div>
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar-header">
            <span class="progress-bar-label">Ciências</span>
            <span class="progress-bar-value text-legend-below-basic">23%</span>
          </div>
          <div class="progress-bar-bg bg-progress-bar-legend-below-basic rounded-lg">
            <div class="progress">
              <div class="progress-bar bg-legend-below-basic" style="width: 23%;"></div>
            </div>
          </div>
        </div>

        <div class="progress-bar-container mb-0">
          <div class="progress-bar-header">
            <span class="progress-bar-label">História</span>
            <span class="progress-bar-value text-legend-proficient">91%</span>
          </div>
          <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
            <div class="progress">
              <div class="progress-bar bg-legend-proficient" style="width: 91%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},l={render:()=>`
    ${s}
    <div class="p-4" style="max-width: 500px;">
      <h6 class="mb-3">Todos os Estados</h6>
      
      ${[0,10,25,30,45,60,70,80,90,100].map(e=>{let r="legend-below-basic";return e>=70?r="legend-proficient":e>=30&&(r="legend-basic"),`
          <div class="progress-bar-container" style="margin-bottom: 0.75rem;">
            <div class="progress-bar-header">
              <span class="progress-bar-label" style="font-size: 0.875rem;">${e}%</span>
              <span class="progress-bar-value text-${r}" style="font-size: 0.875rem;">${e}%</span>
            </div>
            <div class="progress-bar-bg bg-progress-bar-${r} rounded-lg">
              <div class="progress">
                <div class="progress-bar bg-${r}" style="width: ${e}%;"></div>
              </div>
            </div>
          </div>
        `}).join("")}
    </div>
  `},t={render:()=>`
    ${s}
    <style>
      .progress-compact {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .progress-compact .progress-bar-bg {
        flex: 1;
      }
      .progress-compact .progress-value {
        min-width: 40px;
        text-align: right;
        font-weight: 600;
        font-size: 0.875rem;
      }
    </style>
    <div class="p-4" style="max-width: 300px;">
      <h6 class="mb-3">Progresso Compacto</h6>
      
      <div class="progress-compact mb-2">
        <span style="min-width: 80px;">Português</span>
        <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg flex-grow-1">
          <div class="progress">
            <div class="progress-bar bg-legend-proficient" style="width: 85%;"></div>
          </div>
        </div>
        <span class="progress-value text-legend-proficient">85%</span>
      </div>
      
      <div class="progress-compact mb-2">
        <span style="min-width: 80px;">Matemática</span>
        <div class="progress-bar-bg bg-progress-bar-legend-basic rounded-lg flex-grow-1">
          <div class="progress">
            <div class="progress-bar bg-legend-basic" style="width: 52%;"></div>
          </div>
        </div>
        <span class="progress-value text-legend-basic">52%</span>
      </div>
      
      <div class="progress-compact">
        <span style="min-width: 80px;">Ciências</span>
        <div class="progress-bar-bg bg-progress-bar-legend-below-basic rounded-lg flex-grow-1">
          <div class="progress">
            <div class="progress-bar bg-legend-below-basic" style="width: 18%;"></div>
          </div>
        </div>
        <span class="progress-value text-legend-below-basic">18%</span>
      </div>
    </div>
  `};var c,g,p,b,v;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => \`
    \${progressBarStyles}
    <div class="p-4" style="max-width: 400px;">
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Progresso</span>
          <span class="progress-bar-value text-legend-proficient">75%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-proficient" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(p=(g=a.parameters)==null?void 0:g.docs)==null?void 0:p.source},description:{story:"Default - Exemplo básico",...(v=(b=a.parameters)==null?void 0:b.docs)==null?void 0:v.description}}};var m,u,f,x,h;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => \`
    \${progressBarStyles}
    <div class="p-4" style="max-width: 500px;">
      <h6 class="mb-4">Sistema de Cores por Faixa de Valor</h6>
      
      <!-- 0-30%: Abaixo do Básico (Vermelho) -->
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Aluno 1 - Abaixo do Básico</span>
          <span class="progress-bar-value text-legend-below-basic">15%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-below-basic rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-below-basic" style="width: 15%;"></div>
          </div>
        </div>
        <div class="progress-bar-sufix">Range: 0-30%</div>
      </div>

      <!-- 30-70%: Básico (Amarelo) -->
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Aluno 2 - Básico</span>
          <span class="progress-bar-value text-legend-basic">45%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-basic rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-basic" style="width: 45%;"></div>
          </div>
        </div>
        <div class="progress-bar-sufix">Range: 30-70%</div>
      </div>

      <!-- 70-100%: Proficiente (Verde) -->
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Aluno 3 - Proficiente</span>
          <span class="progress-bar-value text-legend-proficient">85%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-proficient" style="width: 85%;"></div>
          </div>
        </div>
        <div class="progress-bar-sufix">Range: 70-100%</div>
      </div>
    </div>
  \`
}`,...(f=(u=o.parameters)==null?void 0:u.docs)==null?void 0:f.source},description:{story:"ColorRanges - Demonstração das faixas de cores",...(h=(x=o.parameters)==null?void 0:x.docs)==null?void 0:h.description}}};var w,y,C,A,B;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    \${progressBarStyles}
    <div class="p-4" style="max-width: 400px;">
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Acertos</span>
          <span class="progress-bar-value text-legend-proficient">72%</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-proficient" style="width: 72%;"></div>
          </div>
        </div>
        <div class="progress-bar-sufix">72 de 100 questões</div>
      </div>
    </div>
  \`
}`,...(C=(y=i.parameters)==null?void 0:y.docs)==null?void 0:C.source},description:{story:"WithSufix - Com sufixo",...(B=(A=i.parameters)==null?void 0:A.docs)==null?void 0:B.description}}};var S,P,E,z,V;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => \`
    \${progressBarStyles}
    <div class="p-4" style="max-width: 400px;">
      <div class="progress-bar-container">
        <div class="progress-bar-header">
          <span class="progress-bar-label">Matemática</span>
        </div>
        <div class="progress-bar-bg bg-progress-bar-legend-basic rounded-lg">
          <div class="progress">
            <div class="progress-bar bg-legend-basic" style="width: 55%;"></div>
          </div>
        </div>
        <h6 class="font-weight-bold text-legend-basic mt-1">55%</h6>
      </div>
    </div>
  \`
}`,...(E=(P=n.parameters)==null?void 0:P.docs)==null?void 0:E.source},description:{story:"PositionBottom - Valor abaixo da barra",...(V=(z=n.parameters)==null?void 0:z.docs)==null?void 0:V.description}}};var $,D,R,k,T;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    \${progressBarStyles}
    <style>
      .demo-card {
        background:;
        border-radius: 0.428rem;
        box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
        padding: 1.5rem;
        max-width: 350px;
      }
      .demo-card-title {
        font-weight: 600;
        font-size: 1.1rem;
        color: #5e5873;
        margin-bottom: 1rem;
      }
    </style>
    <div class="p-4">
      <div class="demo-card">
        <div class="demo-card-title">Desempenho por Disciplina</div>
        
        <div class="progress-bar-container">
          <div class="progress-bar-header">
            <span class="progress-bar-label">Português</span>
            <span class="progress-bar-value text-legend-proficient">82%</span>
          </div>
          <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
            <div class="progress">
              <div class="progress-bar bg-legend-proficient" style="width: 82%;"></div>
            </div>
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar-header">
            <span class="progress-bar-label">Matemática</span>
            <span class="progress-bar-value text-legend-basic">58%</span>
          </div>
          <div class="progress-bar-bg bg-progress-bar-legend-basic rounded-lg">
            <div class="progress">
              <div class="progress-bar bg-legend-basic" style="width: 58%;"></div>
            </div>
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar-header">
            <span class="progress-bar-label">Ciências</span>
            <span class="progress-bar-value text-legend-below-basic">23%</span>
          </div>
          <div class="progress-bar-bg bg-progress-bar-legend-below-basic rounded-lg">
            <div class="progress">
              <div class="progress-bar bg-legend-below-basic" style="width: 23%;"></div>
            </div>
          </div>
        </div>

        <div class="progress-bar-container mb-0">
          <div class="progress-bar-header">
            <span class="progress-bar-label">História</span>
            <span class="progress-bar-value text-legend-proficient">91%</span>
          </div>
          <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg">
            <div class="progress">
              <div class="progress-bar bg-legend-proficient" style="width: 91%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(R=(D=d.parameters)==null?void 0:D.docs)==null?void 0:R.source},description:{story:"InCard - Dentro de um card",...(T=(k=d.parameters)==null?void 0:k.docs)==null?void 0:T.description}}};var I,F,M,j,N;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => \`
    \${progressBarStyles}
    <div class="p-4" style="max-width: 500px;">
      <h6 class="mb-3">Todos os Estados</h6>
      
      \${[0, 10, 25, 30, 45, 60, 70, 80, 90, 100].map(value => {
    let variant = 'legend-below-basic';
    if (value >= 70) variant = 'legend-proficient';else if (value >= 30) variant = 'legend-basic';
    return \`
          <div class="progress-bar-container" style="margin-bottom: 0.75rem;">
            <div class="progress-bar-header">
              <span class="progress-bar-label" style="font-size: 0.875rem;">\${value}%</span>
              <span class="progress-bar-value text-\${variant}" style="font-size: 0.875rem;">\${value}%</span>
            </div>
            <div class="progress-bar-bg bg-progress-bar-\${variant} rounded-lg">
              <div class="progress">
                <div class="progress-bar bg-\${variant}" style="width: \${value}%;"></div>
              </div>
            </div>
          </div>
        \`;
  }).join('')}
    </div>
  \`
}`,...(M=(F=l.parameters)==null?void 0:F.docs)==null?void 0:M.source},description:{story:"AllStates - Todos os estados possíveis",...(N=(j=l.parameters)==null?void 0:j.docs)==null?void 0:N.description}}};var H,L,U,W,q;t.parameters={...t.parameters,docs:{...(H=t.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => \`
    \${progressBarStyles}
    <style>
      .progress-compact {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .progress-compact .progress-bar-bg {
        flex: 1;
      }
      .progress-compact .progress-value {
        min-width: 40px;
        text-align: right;
        font-weight: 600;
        font-size: 0.875rem;
      }
    </style>
    <div class="p-4" style="max-width: 300px;">
      <h6 class="mb-3">Progresso Compacto</h6>
      
      <div class="progress-compact mb-2">
        <span style="min-width: 80px;">Português</span>
        <div class="progress-bar-bg bg-progress-bar-legend-proficient rounded-lg flex-grow-1">
          <div class="progress">
            <div class="progress-bar bg-legend-proficient" style="width: 85%;"></div>
          </div>
        </div>
        <span class="progress-value text-legend-proficient">85%</span>
      </div>
      
      <div class="progress-compact mb-2">
        <span style="min-width: 80px;">Matemática</span>
        <div class="progress-bar-bg bg-progress-bar-legend-basic rounded-lg flex-grow-1">
          <div class="progress">
            <div class="progress-bar bg-legend-basic" style="width: 52%;"></div>
          </div>
        </div>
        <span class="progress-value text-legend-basic">52%</span>
      </div>
      
      <div class="progress-compact">
        <span style="min-width: 80px;">Ciências</span>
        <div class="progress-bar-bg bg-progress-bar-legend-below-basic rounded-lg flex-grow-1">
          <div class="progress">
            <div class="progress-bar bg-legend-below-basic" style="width: 18%;"></div>
          </div>
        </div>
        <span class="progress-value text-legend-below-basic">18%</span>
      </div>
    </div>
  \`
}`,...(U=(L=t.parameters)==null?void 0:L.docs)==null?void 0:U.source},description:{story:"Compact - Versão compacta",...(q=(W=t.parameters)==null?void 0:W.docs)==null?void 0:q.description}}};const G=["Default","ColorRanges","WithSufix","PositionBottom","InCard","AllStates","Compact"];export{l as AllStates,o as ColorRanges,t as Compact,a as Default,d as InCard,n as PositionBottom,i as WithSufix,G as __namedExportsOrder,O as default};
