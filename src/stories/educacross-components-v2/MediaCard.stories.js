/**
 * MediaCard - Card de Métrica com Ícone
 * =========================================
 * Card informativo com ícone lateral para exibir métricas e estatísticas
 * 
 * @component MediaCard
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\card\MediaCard.vue
 * @assets Material Symbols icons
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Cards/MediaCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
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

Card de métrica com ícone lateral para exibir estatísticas e informações resumidas em dashboards.

---

## Contexto de Uso

### Personas

**Professor** (Usuário Principal)
- Visualiza métricas da turma no dashboard (Total Alunos, Atividades Concluídas, Pendentes)
- Monitora progresso geral da turma
- Identifica rapidamente números que precisam de atenção

**Coordenador** (Usuário Secundário)
- Visualiza métricas da escola (Total Turmas, Total Professores, Desempenho Geral)
- Acompanha indicadores consolidados
- Exporta relatórios baseados em métricas

### Jornada do Usuário

**Tela**: Dashboard Principal  
**Fluxo**: Login → Dashboard → Visualizar Métricas → (Opcional) Clicar para Detalhes  
**Frequência**: Diária (início de expediente)

### Casos de Uso

1. **Dashboard Professor - Visão Geral da Turma**
   - Total de alunos ativos (ícone \`school\`, cor primary)
   - Atividades concluídas (ícone \`task_alt\`, cor success)
   - Atividades pendentes (ícone \`pending\`, cor warning)
   - Alunos com dificuldade (ícone \`warning\`, cor danger)

2. **Dashboard Coordenador - Visão Geral da Escola**
   - Total de turmas (ícone \`groups\`, cor info)
   - Total de professores (ícone \`person\`, cor primary)
   - Taxa de conclusão (ícone \`trending_up\`, cor success)
   - Alertas pendentes (ícone \`notifications\`, cor warning)

3. **Dashboard com Ação de Drill-Down**
   - Card clicável redireciona para detalhes
   - Ícone \`visibility\` indica possibilidade de ver mais
   - Tooltip exibe "Ver detalhes" no hover

---

## Arquitetura da Informação

### Estrutura do Componente

\`\`\`
MediaCard (b-card wrapper)
├── Skeleton Loading (opcional)
│   └── b-skeleton-img (75px height)
├── b-media (Bootstrap Vue media object)
│   ├── #aside slot
│   │   └── MediaCardIcon (ícone circular 48x48px)
│   ├── Título (h5)
│   │   ├── Texto traduzido ($t)
│   │   ├── Ícone visibility (se eventClick)
│   │   └── Ícone info (se tooltipText)
│   └── Descrição (#description slot)
│       └── Valor numérico / texto principal
\`\`\`

### Fluxo de Dados

\`\`\`
Props → MediaCard
├── icon + variant → MediaCardIcon (componente filho)
├── title → Tradução $t() → h5
├── tooltipText → b-tooltip → info icon
├── eventClick → Ícone visibility → @click handler
└── loading → b-skeleton-wrapper → Loading state
\`\`\`

---

## Especificações - Dimensões

| Elemento | Tamanho | Descrição |
|----------|---------|-----------|
| **Card Padding** | 24px (1.5rem) | Espaçamento interno do card |
| **Icon Container** | 48x48px | Círculo com ícone centralizado |
| **Icon Size** | 24px | Material Symbols outlined |
| **Gap entre Icon e Content** | 16px (1rem) | Espaço horizontal |
| **Skeleton Height** | 75px | Altura do placeholder de loading |
| **Border Radius** | 6.85px (0.428rem) | Cantos arredondados (padrão Vuexy) |

---

## Especificações - Cores

| Variante | Background Icon | Cor do Ícone | Uso |
|----------|----------------|--------------|-----|
| **Primary** | rgba(110, 99, 232, 0.12) | #6e63e8 | Informações principais (alunos, turmas) |
| **Success** | rgba(40, 199, 111, 0.12) | #28c76f | Métricas positivas (concluídas, aprovados) |
| **Warning** | rgba(255, 159, 67, 0.12) | #ff9f43 | Atenção necessária (pendentes, revisão) |
| **Danger** | rgba(234, 84, 85, 0.12) | #ea5455 | Alertas críticos (atrasadas, reprovados) |
| **Info** | rgba(0, 207, 232, 0.12) | #00cfe8 | Informações secundárias (total, geral) |

---

## Especificações - Tipografia

| Elemento | Tamanho | Peso | Cor | Descrição |
|----------|---------|------|-----|-----------|
| **Título (h5)** | 16px (1rem) | 400 | #5e5873 | Label da métrica |
| **Descrição** | 24px (1.5rem) | 600 | #5e5873 | Valor numérico principal |
| **Ícone visibility** | 16px | - | #6e63e8 | Indicador de ação |
| **Ícone info** | 16px | - | #b9b9c3 | Indicador de tooltip |

---

## Comportamento e Estados

### Estados Visuais

| Estado | Aparência | Quando Usar |
|--------|-----------|-------------|
| **Default** | Borda cinza, sem sombra | Card padrão sem interação |
| **Hover** (clicável) | Sombra elevada | Quando \`eventClick\` está definido |
| **Loading** | Skeleton animado | Durante carregamento de dados |
| **Com Borda Colorida** | \`border-variant\` aplicado | Destacar card específico |

### Interações

\`\`\`javascript
// Card clicável - redireciona para detalhes
const handleCardClick = () => {
  router.push({ name: 'dashboardStudents', params: { classId: 123 } })
}

// Tooltip de informação adicional
tooltipText: "Alunos matriculados e ativos na plataforma"

// Ícone de visibilidade
eventClick: () => console.log('Ver detalhes')
\`\`\`

---

## Regras de Negócio

### Exibição de Valores

1. **Valores Numéricos**: Sempre formatados com separador de milhar (1.234)
2. **Valores Zerados**: Exibir "0" ou "Nenhum" conforme contexto
3. **Valores Grandes**: Usar abreviações (1.2K, 5.4M) se > 10.000
4. **Valores Negativos**: Não aplicável (métricas educacionais são contadores positivos)

### Ícones por Contexto

| Contexto | Ícone | Justificativa |
|----------|-------|---------------|
| Alunos | \`school\` | Representa educação/estudantes |
| Atividades concluídas | \`task_alt\` | Check mark em tarefa |
| Pendentes | \`pending\` | Relógio de espera |
| Problemas | \`warning\` | Alerta visual |
| Turmas | \`groups\` | Grupo de pessoas |
| Professores | \`person\` | Indivíduo |

### Cores por Significado

- **Primary** (#6e63e8): Informações neutras/principais
- **Success** (#28c76f): Ações completas, resultados positivos
- **Warning** (#ff9f43): Requer atenção, mas não crítico
- **Danger** (#ea5455): Problemas críticos, ação urgente
- **Info** (#00cfe8): Dados informativos, contextuais

---

## Acessibilidade

### Conformidade WCAG 2.1 AA

| Critério | Implementação |
|----------|---------------|
| **Contraste de Cores** | Todos os pares texto/fundo ≥ 4.5:1 |
| **Navegação por Teclado** | Card clicável acessível via Tab + Enter |
| **Screen Readers** | Título e descrição lidos sequencialmente |
| **Tooltips** | \`v-b-tooltip\` com \`aria-describedby\` automático |

### Boas Práticas

\`\`\`html
<!-- Estrutura semântica -->
<h5>Total de Alunos</h5>  <!-- Título da métrica -->
<p class="h4">1.234</p>    <!-- Valor principal -->

<!-- Ícone decorativo (aria-hidden implícito) -->
<span class="material-symbols-outlined">school</span>

<!-- Ação acessível via teclado -->
<span 
  tabindex="0"
  @click="eventClick"
  @keydown.enter="eventClick"
  role="button"
>
  visibility
</span>
\`\`\`

---

## Exemplos de Integração

### Vue 2 - Dashboard Professor

\`\`\`vue
<template>
  <b-row>
    <b-col md="3">
      <MediaCard
        icon="school"
        variant="primary"
        title="Total de Alunos"
        :loading="loading"
        :event-click="goToStudents"
      >
        <template #description>
          {{ formatNumber(metrics.totalStudents) }}
        </template>
      </MediaCard>
    </b-col>

    <b-col md="3">
      <MediaCard
        icon="task_alt"
        variant="success"
        title="Atividades Concluídas"
        :loading="loading"
      >
        <template #description>
          {{ formatNumber(metrics.completedActivities) }}
        </template>
      </MediaCard>
    </b-col>

    <b-col md="3">
      <MediaCard
        icon="pending"
        variant="warning"
        title="Pendentes"
        :loading="loading"
        tooltip-text="Atividades aguardando revisão"
      >
        <template #description>
          {{ formatNumber(metrics.pendingActivities) }}
        </template>
      </MediaCard>
    </b-col>

    <b-col md="3">
      <MediaCard
        icon="warning"
        variant="danger"
        title="Alunos com Dificuldade"
        :loading="loading"
        border-variant="danger"
        :event-click="goToAlerts"
      >
        <template #description>
          {{ metrics.studentsWithIssues }}
        </template>
      </MediaCard>
    </b-col>
  </b-row>
</template>

<script>
import MediaCard from '@/components/card/MediaCard.vue'
import { getDashboardMetrics } from '@/services/dashboard.service'

export default {
  components: { MediaCard },
  data() {
    return {
      loading: true,
      metrics: {
        totalStudents: 0,
        completedActivities: 0,
        pendingActivities: 0,
        studentsWithIssues: 0,
      },
    }
  },
  mounted() {
    this.fetchMetrics()
  },
  methods: {
    async fetchMetrics() {
      try {
        const { data } = await getDashboardMetrics()
        this.metrics = data
      } finally {
        this.loading = false
      }
    },
    goToStudents() {
      this.$router.push({ name: 'students-list' })
    },
    goToAlerts() {
      this.$router.push({ name: 'students-alerts' })
    },
    formatNumber(value) {
      return value.toLocaleString('pt-BR')
    },
  },
}
</script>
\`\`\`

### Props API

\`\`\`typescript
interface MediaCardProps {
  // Aparência
  bgVariant?: string           // 'light', 'primary', 'success', etc.
  borderVariant?: string        // 'primary', 'success', 'danger', etc.
  classVariant?: string         // Classes CSS adicionais
  
  // Ícone
  icon?: string                 // Nome do Material Symbols icon
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  
  // Conteúdo
  title?: string                // Título do card (traduzível)
  titleColor?: string           // Classe de cor do título
  tooltipText?: string          // Texto do tooltip de info
  
  // Layout
  verticalAlign?: 'top' | 'center' | 'bottom'  // Default: 'center'
  rightAlign?: boolean          // Inverte posição do ícone
  
  // Estados
  loading?: boolean             // Exibe skeleton
  
  // Interação
  eventClick?: () => void       // Callback de clique no card
}
\`\`\`

---

## UX Writing

| Elemento | Tom | Função | Exemplo |
|----------|-----|--------|---------|
| **Título** | Objetivo, descritivo | Identificar a métrica | "Total de Alunos", "Atividades Pendentes" |
| **Descrição** | Numérico, direto | Apresentar o valor | "1.234", "85%", "42 turmas" |
| **Tooltip** | Explicativo, contextual | Fornecer detalhes | "Alunos matriculados e ativos na plataforma" |
| **Tooltip de Ação** | Imperativo, claro | Indicar possibilidade | "Ver detalhes", "Clique para mais informações" |

### Princípios

1. **Clareza**: Títulos devem ser autoexplicativos
2. **Brevidade**: Valores sem texto desnecessário
3. **Consistência**: Mesmos termos para conceitos iguais
4. **Ação**: Tooltips devem indicar o que acontecerá

---

## Componentes Relacionados

- **MediaCardIcon** - Ícone circular colorido usado dentro do MediaCard
- **Card** - Card genérico do Bootstrap Vue
- **ListTable** - Tabela de dados detalhados (destino do drill-down)
- **ProgressBar** - Indicador de progresso alternativo para métricas de porcentagem

---

## Otimização de Performance

### Lazy Loading de Dados

\`\`\`javascript
// Carregar métricas apenas quando visível
import { useIntersectionObserver } from '@vueuse/core'

const cardRef = ref(null)
const { stop } = useIntersectionObserver(
  cardRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      fetchMetrics()
      stop()  // Carregar apenas uma vez
    }
  }
)
\`\`\`

### Memoização de Formatações

\`\`\`javascript
// Cachear valores formatados
const formattedValue = computed(() => {
  return new Intl.NumberFormat('pt-BR').format(rawValue.value)
})
\`\`\`

### Skeleton Strategy

- Exibir skeleton imediatamente no mount
- Transição suave (fade) após carregamento
- Skeleton com mesma altura do conteúdo final (75px)

---

**Componente**: MediaCard  
**Status**: Pixel-Perfect ✓  
**Fonte**: educacross-frontoffice/src/components/card/MediaCard.vue  
**Última Atualização**: 2 de fevereiro de 2026
        `
      }
    }
  }
};

// Material Symbols icons (carregados globalmente no Storybook)
const loadMaterialIcons = () => {
  if (typeof window !== 'undefined' && !document.getElementById('material-symbols')) {
    const link = document.createElement('link');
    link.id = 'material-symbols';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    document.head.appendChild(link);
  }
};

const mediaCardStyles = `
<style>
  /* MediaCard - CSS Pixel Perfect do Frontoffice */
  
  .media-card {
    background: white;
    border: 1px solid #e9e9f1;
    border-radius: 0.428rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }

  .media-card.clickable {
    cursor: pointer;
  }

  .media-card.clickable:hover {
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
    transform: translateY(-2px);
  }

  .media-card-body {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .media-card-body.vertical-top {
    align-items: flex-start;
  }

  .media-card-body.right-align {
    flex-direction: row-reverse;
  }

  /* Icon wrapper */
  .media-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 0.428rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .media-card-icon.bg-light-primary {
    background-color: rgba(110, 99, 232, 0.12);
    color: #6e63e8;
  }

  .media-card-icon.bg-light-success {
    background-color: rgba(40, 199, 111, 0.12);
    color: #28c76f;
  }

  .media-card-icon.bg-light-danger {
    background-color: rgba(234, 84, 85, 0.12);
    color: #ea5455;
  }

  .media-card-icon.bg-light-warning {
    background-color: rgba(255, 159, 67, 0.12);
    color: #ff9f43;
  }

  .media-card-icon.bg-light-info {
    background-color: rgba(0, 207, 232, 0.12);
    color: #00cfe8;
  }

  .media-card-icon .material-symbols-outlined {
    font-size: 24px;
  }

  /* Content */
  .media-card-content {
    flex: 1;
  }

  .media-card-title {
    font-size: 1rem;
    font-weight: 400;
    color: #5e5873;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .media-card-title .icon-visibility {
    font-size: 16px;
    color: #6e63e8;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .media-card-title .icon-visibility:hover {
    opacity: 1;
  }

  .media-card-title .icon-info {
    font-size: 16px;
    color: #b9b9c3;
    cursor: help;
  }

  .media-card-description {
    font-size: 1.5rem;
    font-weight: 600;
    color: #5e5873;
    margin: 0;
  }

  /* Border variants */
  .media-card.border-primary {
    border-color: #6e63e8;
    border-width: 2px;
  }

  .media-card.border-success {
    border-color: #28c76f;
    border-width: 2px;
  }

  .media-card.border-danger {
    border-color: #ea5455;
    border-width: 2px;
  }

  .media-card.border-warning {
    border-color: #ff9f43;
    border-width: 2px;
  }

  /* Skeleton loading */
  .media-card-skeleton {
    height: 75px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 0.428rem;
  }

  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Responsive - hide icon on mobile */
  @media (max-width: 991px) {
    .media-card-icon.hide-mobile {
      display: none;
    }
    
    .media-card {
      padding: 1rem;
    }
  }

  /* Bootstrap utilities override */
  .tooltip {
    font-size: 0.857rem;
  }
</style>
`;

/**
 * Default - Card básico com ícone e valor
 */
export const Default = {
  render: () => {
    loadMaterialIcons();
    return `
      ${mediaCardStyles}
      <div class="p-4" style="max-width: 350px;">
        <div class="media-card">
          <div class="media-card-body">
            <div class="media-card-icon bg-light-primary">
              <span class="material-symbols-outlined">school</span>
            </div>
            <div class="media-card-content">
              <h5 class="media-card-title">Total de Alunos</h5>
              <p class="media-card-description">1.234</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

/**
 * AllVariants - Todas as variantes de cor com contextos reais
 */
export const AllVariants = {
  render: () => {
    loadMaterialIcons();
    return `
      ${mediaCardStyles}
      <div class="p-4">
        <div class="row g-3">
          <div class="col-md-4">
            <div class="media-card">
              <div class="media-card-body">
                <div class="media-card-icon bg-light-primary">
                  <span class="material-symbols-outlined">school</span>
                </div>
                <div class="media-card-content">
                  <h5 class="media-card-title">Alunos Ativos</h5>
                  <p class="media-card-description">1.234</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="media-card">
              <div class="media-card-body">
                <div class="media-card-icon bg-light-success">
                  <span class="material-symbols-outlined">task_alt</span>
                </div>
                <div class="media-card-content">
                  <h5 class="media-card-title">Atividades Concluídas</h5>
                  <p class="media-card-description">5.678</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="media-card">
              <div class="media-card-body">
                <div class="media-card-icon bg-light-warning">
                  <span class="material-symbols-outlined">pending</span>
                </div>
                <div class="media-card-content">
                  <h5 class="media-card-title">Pendentes</h5>
                  <p class="media-card-description">892</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="media-card">
              <div class="media-card-body">
                <div class="media-card-icon bg-light-danger">
                  <span class="material-symbols-outlined">warning</span>
                </div>
                <div class="media-card-content">
                  <h5 class="media-card-title">Alunos com Dificuldade</h5>
                  <p class="media-card-description">45</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="media-card">
              <div class="media-card-body">
                <div class="media-card-icon bg-light-info">
                  <span class="material-symbols-outlined">groups</span>
                </div>
                <div class="media-card-content">
                  <h5 class="media-card-title">Total de Turmas</h5>
                  <p class="media-card-description">42</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

/**
 * WithClickAction - Card clicável com ícone de visualização
 */
export const WithClickAction = {
  render: () => {
    loadMaterialIcons();
    return `
      ${mediaCardStyles}
      <div class="p-4" style="max-width: 350px;">
        <div class="media-card clickable" onclick="alert('Navegando para lista de alunos...')">
          <div class="media-card-body">
            <div class="media-card-icon bg-light-primary">
              <span class="material-symbols-outlined">school</span>
            </div>
            <div class="media-card-content">
              <h5 class="media-card-title">
                Total de Alunos
                <span class="material-symbols-outlined icon-visibility" title="Ver detalhes">visibility</span>
              </h5>
              <p class="media-card-description">1.234</p>
            </div>
          </div>
        </div>
        <p class="text-muted mt-2 mb-0" style="font-size: 0.875rem;">
          <i class="bi bi-cursor"></i> Clique no card para ver detalhes
        </p>
      </div>
    `;
  }
};

/**
 * WithTooltip - Card com ícone de informação e tooltip explicativo
 */
export const WithTooltip = {
  render: () => {
    loadMaterialIcons();
    return `
      ${mediaCardStyles}
      <div class="p-4" style="max-width: 350px;">
        <div class="media-card">
          <div class="media-card-body">
            <div class="media-card-icon bg-light-warning">
              <span class="material-symbols-outlined">pending</span>
            </div>
            <div class="media-card-content">
              <h5 class="media-card-title">
                Atividades Pendentes
                <span 
                  class="material-symbols-outlined icon-info" 
                  title="Atividades aguardando revisão do professor"
                >
                  info
                </span>
              </h5>
              <p class="media-card-description">892</p>
            </div>
          </div>
        </div>
        <p class="text-muted mt-2 mb-0" style="font-size: 0.875rem;">
          <i class="bi bi-info-circle"></i> Passe o mouse sobre o ícone de informação
        </p>
      </div>
    `;
  }
};

/**
 * WithBorderHighlight - Card com borda colorida para destaque
 */
export const WithBorderHighlight = {
  render: () => {
    loadMaterialIcons();
    return `
      ${mediaCardStyles}
      <div class="p-4" style="max-width: 350px;">
        <div class="media-card border-danger">
          <div class="media-card-body">
            <div class="media-card-icon bg-light-danger">
              <span class="material-symbols-outlined">warning</span>
            </div>
            <div class="media-card-content">
              <h5 class="media-card-title">Alunos com Dificuldade</h5>
              <p class="media-card-description">45</p>
            </div>
          </div>
        </div>
        <p class="text-muted mt-2 mb-0" style="font-size: 0.875rem;">
          Borda colorida destaca alertas críticos
        </p>
      </div>
    `;
  }
};

/**
 * LoadingSkeleton - Estado de carregamento
 */
export const LoadingSkeleton = {
  render: () => {
    return `
      ${mediaCardStyles}
      <div class="p-4" style="max-width: 350px;">
        <div class="media-card">
          <div class="media-card-skeleton"></div>
        </div>
        <p class="text-muted mt-2 mb-0" style="font-size: 0.875rem;">
          Skeleton exibido durante carregamento de dados
        </p>
      </div>
    `;
  }
};

/**
 * DashboardExample - Exemplo completo de dashboard de professor
 */
export const DashboardExample = {
  render: () => {
    loadMaterialIcons();
    return `
      ${mediaCardStyles}
      <div class="p-4">
        <h4 class="mb-3">Dashboard do Professor - 6º Ano A</h4>
        <div class="row g-3 mb-4">
          <div class="col-md-3">
            <div class="media-card clickable" onclick="alert('Ver lista de alunos')">
              <div class="media-card-body">
                <div class="media-card-icon bg-light-primary hide-mobile">
                  <span class="material-symbols-outlined">school</span>
                </div>
                <div class="media-card-content">
                  <h5 class="media-card-title">
                    Total de Alunos
                    <span class="material-symbols-outlined icon-visibility">visibility</span>
                  </h5>
                  <p class="media-card-description">38</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="media-card">
              <div class="media-card-body">
                <div class="media-card-icon bg-light-success hide-mobile">
                  <span class="material-symbols-outlined">task_alt</span>
                </div>
                <div class="media-card-content">
                  <h5 class="media-card-title">Atividades Concluídas</h5>
                  <p class="media-card-description">524</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="media-card">
              <div class="media-card-body">
                <div class="media-card-icon bg-light-warning hide-mobile">
                  <span class="material-symbols-outlined">pending</span>
                </div>
                <div class="media-card-content">
                  <h5 class="media-card-title">
                    Pendentes
                    <span class="material-symbols-outlined icon-info" title="Atividades aguardando revisão">info</span>
                  </h5>
                  <p class="media-card-description">87</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="media-card border-danger clickable" onclick="alert('Ver alunos com dificuldade')">
              <div class="media-card-body">
                <div class="media-card-icon bg-light-danger hide-mobile">
                  <span class="material-symbols-outlined">warning</span>
                </div>
                <div class="media-card-content">
                  <h5 class="media-card-title">
                    Com Dificuldade
                    <span class="material-symbols-outlined icon-visibility">visibility</span>
                  </h5>
                  <p class="media-card-description">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
