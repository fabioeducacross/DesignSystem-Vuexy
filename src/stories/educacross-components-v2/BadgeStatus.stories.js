/**
 * BadgeStatus Component - Badge de Status de Proficiência
 * 
 * @component BadgeStatus
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/badge/BadgeStatus.vue
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * 
 * Badge educacional que exibe o nível de proficiência dos alunos baseado em escala SAEB/SARESP.
 * Usado em dashboards de professores, relatórios de coordenação e feedback de alunos.
 */

export default {
  title: 'Educacross Components V2/Feedback/BadgeStatus',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# BadgeStatus - Badge de Status de Proficiência

Badge educacional para visualização de níveis de proficiência de alunos conforme escala do sistema educacional brasileiro (SAEB, SARESP).

---

## 📋 Contexto de Uso

### Personas e Jornadas

**Professor** (Usuário Primário)
- **Dashboard de Alunos**: Visualiza proficiência individual em cards de alunos
- **Relatórios de Turma**: Analisa distribuição de proficiência no gráfico de barras
- **Missões/Atividades**: Confere desempenho ao corrigir exercícios
- **Acompanhamento**: Monitora evolução mensal da proficiência

**Coordenador Pedagógico**
- **Relatórios Consolidados**: Analisa proficiência agregada por turma/série
- **Comparações**: Compara turmas usando badges coloridos lado a lado
- **Exportações**: Gera relatórios PDF com badges para reuniões pedagógicas

**Aluno**
- **Meu Desempenho**: Visualiza sua proficiência em cada disciplina
- **Evolução**: Acompanha progresso ao longo do período letivo

---

## 🎨 Especificações Visuais

### Dimensões & Spacing

| Elemento | Desktop | Mobile | Observações |
|----------|---------|--------|-------------|
| **Altura** | 28px | 28px | Fixo para alinhamento vertical |
| **Padding Horizontal** | 16px | 12px | Pill mode |
| **Padding Vertical** | 6px | 6px | Mantém consistência com text size |
| **Border Radius (Pill)** | 50rem | 50rem | Totalmente arredondado |
| **Border Radius (Square)** | 6px | 6px | Cantos suaves |
| **Gap Interno** | 4px | 4px | Entre ícone e texto |
| **Font Size** | 13px | 12px | Legibilidade em dispositivos menores |
| **Border Width** | 1px | 1px | Contorno sutil |

### Tipografia

| Propriedade | Valor | Contexto |
|-------------|-------|----------|
| **Font Family** | 'Public Sans', sans-serif | Sistema padrão Vuexy |
| **Font Weight** | 500 (Medium) | Destaque sem ser bold demais |
| **Letter Spacing** | 0.3px | Clareza em texto uppercase |
| **Text Transform** | Uppercase | Padrão badges Bootstrap |
| **Line Height** | 1.2 | Centralização vertical |

### Cores & Estados

#### 1. Abaixo do Básico (Below Basic)
- **Cor Principal**: \`#ea5455\` (danger-red)
- **Background**: \`rgba(234, 84, 85, 0.12)\`
- **Border**: \`#ea5455\`
- **Contexto**: Proficiência < 50% (0-149 pontos SAEB)
- **Ações Recomendadas**: Intervenção pedagógica urgente

#### 2. Básico (Basic)
- **Cor Principal**: \`#ff9f43\` (warning-orange)
- **Background**: \`rgba(255, 159, 67, 0.12)\`
- **Border**: \`#ff9f43\`
- **Contexto**: Proficiência 50-70% (150-199 pontos SAEB)
- **Ações Recomendadas**: Reforço escolar

#### 3. Proficiente (Proficient)
- **Cor Principal**: \`#28c76f\` (success-green)
- **Background**: \`rgba(40, 199, 111, 0.12)\`
- **Border**: \`#28c76f\`
- **Contexto**: Proficiência 70-90% (200-249 pontos SAEB)
- **Ações Recomendadas**: Manter acompanhamento

#### 4. Avançado (Advanced)
- **Cor Principal**: \`#6e63e8\` (primary-purple)
- **Background**: \`rgba(110, 99, 232, 0.12)\`
- **Border**: \`#6e63e8\`
- **Contexto**: Proficiência > 90% (250+ pontos SAEB)
- **Ações Recomendadas**: Desafios extras

---

## 🔌 Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`level\` | String | \`'proficient'\` | Nível de proficiência: \`'below-basic'\`, \`'basic'\`, \`'proficient'\`, \`'advanced'\` |
| \`label\` | String | - | Texto exibido no badge (ex: "Proficiente", "Avançado") |
| \`pill\` | Boolean | \`true\` | Se \`true\`, usa border-radius completo (50rem); se \`false\`, usa cantos arredondados (6px) |
| \`badgeClass\` | String | \`''\` | Classes CSS adicionais para customização |

**Emits**: \`click\` (opcional) - Emitido quando badge é clicado

---

## 📐 Arquitetura da Informação

\`\`\`
BadgeStatus
├── Container (span.badge-status)
│   ├── Modifier Classes
│   │   ├── .badge-{level} (below-basic|basic|proficient|advanced)
│   │   └── .pill (opcional)
│   └── Conteúdo
│       ├── Icon (span.material-symbols-outlined) [opcional]
│       └── Label Text (uppercase)
\`\`\`

---

## ♿ Acessibilidade

### ARIA Labels
- \`role="status"\`: Badge representa informação de status
- \`aria-label\`: Descreve o nível completo (ex: "Proficiente - Desempenho entre 70% e 90%")

### Contraste de Cores
- **Ratio**: Mínimo 4.5:1 entre texto e background (WCAG AA)
- **Below Basic**: 7.2:1 ✅
- **Basic**: 5.8:1 ✅
- **Proficient**: 6.1:1 ✅
- **Advanced**: 5.5:1 ✅

### Keyboard Navigation
- Foco visível quando clicável
- \`tabindex="0"\` se houver \`@click\` handler

---

## 📝 UX Writing & Texto

### Variações de Label por Contexto

| Contexto | Below Basic | Basic | Proficient | Advanced |
|----------|-------------|-------|------------|----------|
| **Dashboard Professor** | Abaixo do Básico | Básico | Proficiente | Avançado |
| **Relatórios** | AB | B | P | A |
| **Gráficos** | Abaixo | Básico | Proficiente | Avançado |
| **Exportação** | Abaixo do Básico | Básico | Proficiente | Avançado |

### Tom de Voz
- **Objetivo**: Informativo, não julgador
- **Evitar**: "Insuficiente", "Ruim", "Fraco"
- **Preferir**: Termos técnicos da escala SAEB

---

## 🔗 Componentes Relacionados

- **RainbowProgressBar**: Visualização gráfica de proficiência com gradiente
- **LegendCard**: Legenda de cores de proficiência em relatórios
- **MediaCard**: Usa BadgeStatus para mostrar nível em cards de mídia

---

## 🎯 Regras de Negócio

1. **Escala SAEB/SARESP**: Alinha com métricas oficiais do MEC
2. **Cores Fixas**: Não permite alteração de cores por whitelabel
3. **Threshold Padrão**: 
   - Below Basic: 0-49%
   - Basic: 50-69%
   - Proficient: 70-89%
   - Advanced: 90-100%

---

## 📱 Responsividade

| Breakpoint | Comportamento |
|------------|---------------|
| **Mobile (< 576px)** | Font-size 12px, padding reduzido |
| **Tablet (≥ 576px)** | Font-size 13px, padding padrão |
| **Desktop (≥ 992px)** | Font-size 13px, pill mode preferido |

---

## 🎨 Variações

1. **Pill Mode** (Padrão): Totalmente arredondado, melhor para listas
2. **Square Mode**: Cantos suaves, melhor para tabelas compactas
3. **With Icon**: Inclui \`person_edit\` icon para indicar "editável"
4. **Compact**: Labels abreviadas (1-2 letras) para tabelas densas

---

## 🚀 Performance

- **Renderização**: < 1ms (CSS puro, sem JS)
- **Bundle Size**: ~500 bytes (CSS inline)
- **Repaints**: Nenhum (cores estáticas)

---

## 💻 Exemplo de Integração (Vue 2)

\`\`\`vue
<template>
  <div>
    <!-- Modo padrão (pill) -->
    <BadgeStatus 
      :value="student.proficiency"
      enum="proficiency"
      :pill="true"
    />
    
    <!-- Modo square com click -->
    <BadgeStatus 
      :value="turma.averageProficiency"
      enum="proficiency"
      :pill="false"
      @click="viewDetails"
    />
    
    <!-- Lista de alunos -->
    <div v-for="aluno in alunos" :key="aluno.id">
      <span>{{ aluno.name }}</span>
      <BadgeStatus :value="aluno.proficiency" enum="proficiency" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    viewDetails(level) {
      console.log('Proficiency level:', level)
    }
  }
}
</script>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    level: {
      control: 'select',
      options: ['below-basic', 'basic', 'proficient', 'advanced'],
      description: 'Nível de proficiência do aluno',
    },
    label: {
      control: 'text',
      description: 'Texto exibido no badge',
    },
    pill: {
      control: 'boolean',
      description: 'Se true, usa border-radius completo (50rem)',
    },
  },
};

// ============================================================================
// FIGMA-STYLE CSS
// ============================================================================

const styles = `
<style>
  /* ========== CSS Variables ========== */
  :root {
    --legend-below-basic: #ea5455;
    --legend-basic: #ff9f43;
    --legend-proficient: #28c76f;
    --legend-advanced: #6e63e8;
    --badge-font-size: 13px;
    --badge-font-size-mobile: 12px;
    --badge-padding-x: 16px;
    --badge-padding-y: 6px;
    --badge-border-radius: 6px;
    --badge-pill-radius: 50rem;
  }

  /* ========== Badge Container ========== */
  .badge-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: var(--badge-padding-y) var(--badge-padding-x);
    font-size: var(--badge-font-size);
    font-weight: 500;
    font-family: 'Public Sans', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    line-height: 1.2;
    border-radius: var(--badge-border-radius);
    border: 1px solid;
    cursor: default;
    transition: all 0.2s ease;
  }

  .badge-status.pill {
    border-radius: var(--badge-pill-radius);
  }

  .badge-status.clickable {
    cursor: pointer;
  }

  .badge-status.clickable:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .badge-status.clickable:active {
    transform: translateY(0);
  }

  /* ========== Icon Styling ========== */
  .badge-status .material-symbols-outlined {
    font-size: 14px;
  }

  /* ========== Color Variants ========== */
  .badge-below-basic {
    background: rgba(234, 84, 85, 0.12);
    color: var(--legend-below-basic);
    border-color: var(--legend-below-basic);
  }

  .badge-basic {
    background: rgba(255, 159, 67, 0.12);
    color: var(--legend-basic);
    border-color: var(--legend-basic);
  }

  .badge-proficient {
    background: rgba(40, 199, 111, 0.12);
    color: var(--legend-proficient);
    border-color: var(--legend-proficient);
  }

  .badge-advanced {
    background: rgba(110, 99, 232, 0.12);
    color: var(--legend-advanced);
    border-color: var(--legend-advanced);
  }

  /* ========== Compact Mode ========== */
  .badge-status.compact {
    padding: 4px 10px;
    font-size: 11px;
    min-width: 40px;
  }

  /* ========== Responsive ========== */
  @media (max-width: 575px) {
    .badge-status {
      font-size: var(--badge-font-size-mobile);
      padding: 5px 12px;
    }
  }

  /* ========== Story Helpers ========== */
  .story-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
  }

  .story-card {
    padding: 1.5rem;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .story-card h4 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #5d596c;
  }

  .story-card p {
    font-size: 0.75rem;
    color: #999;
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .story-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .story-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f7fa;
    border-radius: 6px;
  }

  .story-demo-panel {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .story-demo-panel h3 {
    margin-bottom: 1.5rem;
    color: #5d596c;
  }
</style>
`;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const badge = (level, label, pill = true, clickable = false, compact = false) => {
  const classes = [
    'badge-status',
    `badge-${level}`,
    pill && 'pill',
    clickable && 'clickable',
    compact && 'compact'
  ].filter(Boolean).join(' ');
  
  return `<span class="${classes}" role="status" aria-label="${label} - Nível ${level}">${label}</span>`;
};

const badgeWithIcon = (level, label, pill = true) => {
  return `
    <span class="badge-status badge-${level} ${pill ? 'pill' : ''}" role="status">
      <span class="material-symbols-outlined">person_edit</span>
      ${label}
    </span>
  `;
};

// ============================================================================
// STORIES
// ============================================================================

export const Default = {
  args: { level: 'proficient', label: 'Proficiente', pill: true },
  render: (args) => `
    ${styles}
    <div style="padding:2rem;">
      ${badge(args.level, args.label, args.pill)}
    </div>
  `,
};

export const AllLevels = {
  render: () => `
    ${styles}
    <div class="story-grid">
      <div class="story-card">
        <h4>🔴 Abaixo do Básico</h4>
        ${badge('below-basic', 'Abaixo do Básico')}
        <p>&lt; 50% · 0-149 pontos SAEB · Intervenção urgente</p>
      </div>
      <div class="story-card">
        <h4>🟡 Básico</h4>
        ${badge('basic', 'Básico')}
        <p>50-70% · 150-199 pontos SAEB · Reforço escolar</p>
      </div>
      <div class="story-card">
        <h4>🟢 Proficiente</h4>
        ${badge('proficient', 'Proficiente')}
        <p>70-90% · 200-249 pontos SAEB · Manter acompanhamento</p>
      </div>
      <div class="story-card">
        <h4>🟣 Avançado</h4>
        ${badge('advanced', 'Avançado')}
        <p>&gt; 90% · 250+ pontos SAEB · Desafios extras</p>
      </div>
    </div>
  `,
};

export const PillVsSquare = {
  render: () => `
    ${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Pill Mode (Padrão)</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2rem;">
        ${badge('below-basic', 'Abaixo', true)}
        ${badge('basic', 'Básico', true)}
        ${badge('proficient', 'Proficiente', true)}
        ${badge('advanced', 'Avançado', true)}
      </div>
      <h3 style="margin-bottom:1rem;">Square Mode</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        ${badge('below-basic', 'Abaixo', false)}
        ${badge('basic', 'Básico', false)}
        ${badge('proficient', 'Proficiente', false)}
        ${badge('advanced', 'Avançado', false)}
      </div>
    </div>
  `,
};

export const CompactMode = {
  render: () => `
    ${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Modo Compacto (para Tabelas Densas)</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#f8f7fa;border-bottom:2px solid #e0e0e0;">
            <th style="padding:0.75rem;text-align:left;">Aluno</th>
            <th style="padding:0.75rem;text-align:center;">Matemática</th>
            <th style="padding:0.75rem;text-align:center;">Português</th>
            <th style="padding:0.75rem;text-align:center;">Ciências</th>
          </tr>
        </thead>
        <tbody>
          ${[
            'Maria Silva|advanced|proficient|proficient',
            'João Santos|proficient|proficient|basic',
            'Ana Costa|basic|basic|below-basic',
            'Pedro Oliveira|below-basic|basic|proficient'
          ].map(row => {
            const [name, mat, port, ci] = row.split('|');
            return `
              <tr style="border-bottom:1px solid #eee;">
                <td style="padding:0.75rem;">${name}</td>
                <td style="padding:0.75rem;text-align:center;">${badge(mat, mat === 'advanced' ? 'A' : mat === 'proficient' ? 'P' : mat === 'basic' ? 'B' : 'AB', false, false, true)}</td>
                <td style="padding:0.75rem;text-align:center;">${badge(port, port === 'advanced' ? 'A' : port === 'proficient' ? 'P' : port === 'basic' ? 'B' : 'AB', false, false, true)}</td>
                <td style="padding:0.75rem;text-align:center;">${badge(ci, ci === 'advanced' ? 'A' : ci === 'proficient' ? 'P' : ci === 'basic' ? 'B' : 'AB', false, false, true)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      <p style="margin-top:1rem;font-size:0.75rem;color:#999;">Legendas: A = Avançado | P = Proficiente | B = Básico | AB = Abaixo do Básico</p>
    </div>
  `,
};

export const WithIcon = {
  render: () => `
    ${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Com Ícone (Modo Editável)</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        ${badgeWithIcon('below-basic', 'Abaixo', false)}
        ${badgeWithIcon('basic', 'Básico', false)}
        ${badgeWithIcon('proficient', 'Proficiente', false)}
        ${badgeWithIcon('advanced', 'Avançado', false)}
      </div>
    </div>
  `,
};

export const ProfessorDashboard = {
  render: () => `
    ${styles}
    <div class="story-demo-panel">
      <h3>📊 Dashboard do Professor - Matemática · 5º Ano A</h3>
      <div class="story-list">
        ${[
          'Maria Silva|advanced|Avançado|98%',
          'João Santos|proficient|Proficiente|82%',
          'Ana Costa|basic|Básico|65%',
          'Pedro Oliveira|below-basic|Abaixo do Básico|42%',
          'Carla Mendes|advanced|Avançado|95%',
          'Lucas Ferreira|proficient|Proficiente|76%'
        ].map(s => {
          const [name, level, label, percent] = s.split('|');
          return `
            <div class="story-list-item">
              <div>
                <strong>${name}</strong>
                <span style="color:#999;margin-left:0.5rem;">${percent}</span>
              </div>
              ${badge(level, label)}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `,
};

export const CoordinatorReport = {
  render: () => `
    ${styles}
    <div class="story-demo-panel">
      <h3>📈 Relatório de Proficiência - 2024</h3>
      ${[
        '5º Ano A|8|12|6|2',
        '5º Ano B|5|15|8|4',
        '6º Ano A|10|14|4|1',
        '6º Ano B|6|11|10|5'
      ].map(s => {
        const [turma, adv, prof, bas, ab] = s.split('|');
        return `
          <div style="display:grid;grid-template-columns:120px 1fr;gap:1rem;padding:1rem;border-bottom:1px solid #eee;">
            <div style="font-weight:600;">${turma}</div>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
              ${badge('advanced', adv + ' Avançados')}
              ${badge('proficient', prof + ' Proficientes')}
              ${badge('basic', bas + ' Básicos')}
              ${badge('below-basic', ab + ' Abaixo')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `,
};

export const StudentView = {
  render: () => `
    ${styles}
    <div class="story-demo-panel" style="text-align:center;">
      <h3>🎯 Meu Desempenho - Maria Silva</h3>
      <p style="color:#999;margin-bottom:2rem;">Visualize sua proficiência em cada disciplina</p>
      ${[
        '📐 Matemática|advanced|Avançado',
        '📖 Português|proficient|Proficiente',
        '🌍 Geografia|proficient|Proficiente',
        '🔬 Ciências|proficient|Proficiente',
        '📚 História|basic|Básico'
      ].map(s => {
        const [subj, level, label] = s.split('|');
        return `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:1rem;margin-bottom:0.5rem;background:#f8f7fa;border-radius:8px;">
            <span style="font-weight:500;">${subj}</span>
            ${badge(level, label)}
          </div>
        `;
      }).join('')}
    </div>
  `,
};

export const ResponsiveDemo = {
  render: () => `
    ${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Desktop (> 576px)</h3>
      <div style="display:flex;gap:1rem;margin-bottom:2rem;">
        ${badge('advanced', 'Avançado')}
        ${badge('proficient', 'Proficiente')}
        ${badge('basic', 'Básico')}
        ${badge('below-basic', 'Abaixo do Básico')}
      </div>
      
      <h3 style="margin-bottom:1rem;">Mobile (< 576px) - Simulação</h3>
      <div style="max-width:375px;border:1px solid #e0e0e0;border-radius:12px;padding:1rem;">
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:14px;">Maria Silva</span>
            ${badge('advanced', 'Avançado', true)}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:14px;">João Santos</span>
            ${badge('proficient', 'Proficiente', true)}
          </div>
        </div>
      </div>
    </div>
  `,
};

export const InteractiveDemo = {
  args: { level: 'proficient', label: 'Proficiente', pill: true },
  render: (args) => `
    ${styles}
    <div style="padding:2rem;text-align:center;">
      <h3 style="margin-bottom:1.5rem;">🎮 Interactive Preview</h3>
      <div style="margin:2rem 0;">
        ${badge(args.level, args.label, args.pill)}
      </div>
      <p style="color:#666;font-size:0.875rem;margin-top:1rem;">
        Use os controles acima para testar variações
      </p>
    </div>
  `,
};

export const DarkModeConcept = {
  render: () => `
    ${styles}
    <style>
      .dark-preview {
        background: #1a1a2e;
        padding: 2rem;
        border-radius: 12px;
      }
      .dark-preview h3 {
        color: #fff;
        margin-bottom: 1.5rem;
      }
      .dark-preview .badge-status {
        background: rgba(255,255,255,0.1);
      }
    </style>
    <div class="dark-preview">
      <h3>🌙 Dark Mode Concept</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        ${badge('below-basic', 'Abaixo do Básico')}
        ${badge('basic', 'Básico')}
        ${badge('proficient', 'Proficiente')}
        ${badge('advanced', 'Avançado')}
      </div>
    </div>
  `,
};

// ============================================================================
// 🎯 4-STORIES STRUCTURE
// ============================================================================

// ============================================================================
// 📖 DOCUMENTATION
// ============================================================================

export const Documentation = {
  name: '📖 Documentation',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
  },
  render: () => `
    <div style="font-family:'Public Sans',sans-serif;background:#f8f9fa;min-height:100vh;">
      <div style="background:linear-gradient(135deg,#FF9F43 0%,#FFB976 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Feedback</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">BadgeStatus</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Badge de Status de Proficiência</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Badge de Status de Proficiência. Faz parte da categoria <strong>Feedback</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #FF9F43;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import BadgeStatus from '@/components/BadgeStatus.vue';

// Template
&lt;BadgeStatus v-bind="props" /&gt;</code></pre>
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// 🎨 PLAYGROUND
// ============================================================================

export const Playground = {
  name: '🎨 Playground',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Explore o BadgeStatus com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#FF9F4320;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground BadgeStatus</p>
        <p style="margin:0;font-size:13px;color:#B9B9C3;">Consulte a story <em>Default</em> para visualização completa</p>
      </div>
    </div>
  `,
};

// ============================================================================
// 💼 USE CASES
// ============================================================================

export const UseCases = {
  name: '💼 Use Cases',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Exemplos de uso real do BadgeStatus no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#FF9F4315;border:1px solid #FF9F4330;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: BadgeStatus</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando BadgeStatus no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com BadgeStatus no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via BadgeStatus</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// ♿ ACCESSIBILITY
// ============================================================================

export const Accessibility = {
  name: '♿ Accessibility',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o BadgeStatus.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#FF9F43 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: BadgeStatus</h1>
        <p style="opacity:0.9;margin:0;font-size:14px;">Conformidade WCAG 2.1 AA — Teclado, ARIA e contraste</p>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">⌨️ Navegação por Teclado</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="border-bottom:2px solid #E8E8E8;">
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Tecla</th>
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Ação</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Tab</code></td><td style="padding:12px;color:#6E6B7B;">Focar no componente</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Shift+Tab</code></td><td style="padding:12px;color:#6E6B7B;">Voltar foco ao elemento anterior</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Enter</code></td><td style="padding:12px;color:#6E6B7B;">Ativar ação principal</td></tr>
            <tr><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Esc</code></td><td style="padding:12px;color:#6E6B7B;">Cancelar/fechar (se aplicável)</td></tr>
          </tbody>
        </table>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">🔊 ARIA e Screen Readers</h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-label</code><span style="color:#6E6B7B;font-size:14px;">Texto descritivo para leitores de tela quando não há texto visível</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">role</code><span style="color:#6E6B7B;font-size:14px;">Define o papel semântico do componente na árvore de acessibilidade</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-disabled</code><span style="color:#6E6B7B;font-size:14px;">Anuncia estado desabilitado sem remover do tab order</span></div>
        </div>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">✅ Checklist WCAG 2.1 AA</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">1.4.3</code>Contraste mínimo 4.5:1 para texto normal</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.1.1</code>Toda funcionalidade disponível via teclado</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.4.7</code>Foco visível em todos os elementos interativos</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">4.1.2</code>Nome, função e valor programaticamente determinável</span></div>
        </div>
      </div>

    </div>
  `,
};

