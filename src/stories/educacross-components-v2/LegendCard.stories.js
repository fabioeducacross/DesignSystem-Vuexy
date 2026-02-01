/**
 * LegendCard Component - Pixel Perfect from educacross-frontoffice
 *
 * @component LegendCard
 * @category Educacross Components V2
 * @status PIXEL-PERFECT
 * @source educacross-frontoffice/src/components/legends/LegendCard.vue
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Data Display/LegendCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## LegendCard - Cards de Legenda Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/components/legends/LegendCard.vue\`.

Exibe cards de proficiência com ícones, títulos e conteúdo customizado.
Usado para mostrar distribuição de alunos por nível de proficiência.

### Props do Componente Real

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`items\` | Array | required | Lista de itens de legenda |
| \`active\` | Number | null | Índice do item ativo/destacado |
| \`tooltipActiveText\` | String | 'Maior percentual...' | Texto do tooltip do item ativo |

### Estrutura do Item

\`\`\`javascript
{
  icon: 'sentiment_satisfied', // Material Symbols
  variant: 'success',          // primary, success, warning, danger
  title: 'Proficiente'         // Título do nível
}
\`\`\`

### Slots

- \`#content-{index}\` - Conteúdo customizado para cada card

### Variantes de Proficiência

| Nível | Cor | Ícone |
|-------|-----|-------|
| Abaixo do Básico | danger | sentiment_very_dissatisfied |
| Básico | warning | sentiment_neutral |
| Proficiente | success | sentiment_satisfied |
| Avançado | primary | sentiment_very_satisfied |
        `,
      },
    },
  },
};

// CSS do LegendCard extraído do frontoffice
const legendCardStyles = `
<style>
  /* === LegendCard - CSS Pixel Perfect do Frontoffice === */
  
  :root {
    --primary: #6e63e8;
    --success: #28c76f;
    --warning: #ff9f43;
    --danger: #ea5455;
    --border-color: #ebe9f1;
    --text-color: #5e5873;
  }

  .legend-cards-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  @media (min-width: 768px) {
    .legend-cards-container {
      flex-direction: row;
      gap: 0.5rem;
    }
  }

  .legend-card {
    flex: 1;
    background: white;
    border: 2px solid var(--border-color);
    border-radius: 0.428rem;
    padding: 1rem;
    position: relative;
    transition: all 0.2s ease;
  }

  /* Active state */
  .legend-card.active {
    box-shadow: 0 4px 18px -4px rgba(0, 0, 0, 0.1);
  }

  .legend-card.active.variant-primary {
    border-color: var(--primary);
    box-shadow: 0 4px 18px -4px rgba(110, 99, 232, 0.4);
  }

  .legend-card.active.variant-success {
    border-color: var(--success);
    box-shadow: 0 4px 18px -4px rgba(40, 199, 111, 0.4);
  }

  .legend-card.active.variant-warning {
    border-color: var(--warning);
    box-shadow: 0 4px 18px -4px rgba(255, 159, 67, 0.4);
  }

  .legend-card.active.variant-danger {
    border-color: var(--danger);
    box-shadow: 0 4px 18px -4px rgba(234, 84, 85, 0.4);
  }

  /* Info icon for active */
  .legend-card .info-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    cursor: help;
  }

  .legend-card .info-icon.text-primary { color: var(--primary); }
  .legend-card .info-icon.text-success { color: var(--success); }
  .legend-card .info-icon.text-warning { color: var(--warning); }
  .legend-card .info-icon.text-danger { color: var(--danger); }

  /* Header with icon */
  .legend-card-header {
    text-align: center;
    margin-bottom: 0.75rem;
  }

  .legend-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 0.428rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  .legend-card-icon.bg-light-primary {
    background-color: rgba(110, 99, 232, 0.12);
    color: var(--primary);
  }

  .legend-card-icon.bg-light-success {
    background-color: rgba(40, 199, 111, 0.12);
    color: var(--success);
  }

  .legend-card-icon.bg-light-warning {
    background-color: rgba(255, 159, 67, 0.12);
    color: var(--warning);
  }

  .legend-card-icon.bg-light-danger {
    background-color: rgba(234, 84, 85, 0.12);
    color: var(--danger);
  }

  .legend-card-icon .material-symbols-outlined {
    font-size: 24px;
  }

  .legend-card-title {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--text-color);
    margin: 0;
  }

  /* Content area */
  .legend-card-content {
    text-align: center;
  }

  .legend-card-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-color);
    line-height: 1.2;
  }

  .legend-card-value.text-primary { color: var(--primary); }
  .legend-card-value.text-success { color: var(--success); }
  .legend-card-value.text-warning { color: var(--warning); }
  .legend-card-value.text-danger { color: var(--danger); }

  .legend-card-label {
    font-size: 0.85rem;
    color: #b9b9c3;
    margin-top: 0.25rem;
  }

  /* Progress bar in card */
  .legend-progress {
    margin-top: 0.75rem;
  }

  .legend-progress-bar {
    height: 6px;
    border-radius: 3px;
    background: #ebe9f1;
    overflow: hidden;
  }

  .legend-progress-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .legend-progress-fill.bg-primary { background-color: var(--primary); }
  .legend-progress-fill.bg-success { background-color: var(--success); }
  .legend-progress-fill.bg-warning { background-color: var(--warning); }
  .legend-progress-fill.bg-danger { background-color: var(--danger); }
</style>
`;

/**
 * Default - Cards de proficiência
 */
export const Default = {
  render: () => `
    ${legendCardStyles}
    <div class="p-4">
      <div class="legend-cards-container">
        <div class="legend-card">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-danger">
              <span class="material-symbols-outlined">sentiment_very_dissatisfied</span>
            </div>
            <h6 class="legend-card-title">Abaixo do Básico</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-danger">15</div>
            <div class="legend-card-label">alunos (12%)</div>
          </div>
        </div>
        
        <div class="legend-card">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-warning">
              <span class="material-symbols-outlined">sentiment_neutral</span>
            </div>
            <h6 class="legend-card-title">Básico</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-warning">32</div>
            <div class="legend-card-label">alunos (26%)</div>
          </div>
        </div>
        
        <div class="legend-card">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-success">
              <span class="material-symbols-outlined">sentiment_satisfied</span>
            </div>
            <h6 class="legend-card-title">Proficiente</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-success">58</div>
            <div class="legend-card-label">alunos (47%)</div>
          </div>
        </div>
        
        <div class="legend-card">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-primary">
              <span class="material-symbols-outlined">sentiment_very_satisfied</span>
            </div>
            <h6 class="legend-card-title">Avançado</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-primary">19</div>
            <div class="legend-card-label">alunos (15%)</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * WithActiveHighlight - Com item destacado
 */
export const WithActiveHighlight = {
  render: () => `
    ${legendCardStyles}
    <div class="p-4">
      <div class="legend-cards-container">
        <div class="legend-card">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-danger">
              <span class="material-symbols-outlined">sentiment_very_dissatisfied</span>
            </div>
            <h6 class="legend-card-title">Abaixo do Básico</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-danger">15</div>
            <div class="legend-card-label">alunos (12%)</div>
          </div>
        </div>
        
        <div class="legend-card">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-warning">
              <span class="material-symbols-outlined">sentiment_neutral</span>
            </div>
            <h6 class="legend-card-title">Básico</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-warning">32</div>
            <div class="legend-card-label">alunos (26%)</div>
          </div>
        </div>
        
        <div class="legend-card active variant-success">
          <span class="material-symbols-outlined info-icon text-success" title="Maior percentual de alunos nesta faixa de proficiência">info</span>
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-success">
              <span class="material-symbols-outlined">sentiment_satisfied</span>
            </div>
            <h6 class="legend-card-title">Proficiente</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-success">58</div>
            <div class="legend-card-label">alunos (47%)</div>
          </div>
        </div>
        
        <div class="legend-card">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-primary">
              <span class="material-symbols-outlined">sentiment_very_satisfied</span>
            </div>
            <h6 class="legend-card-title">Avançado</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-primary">19</div>
            <div class="legend-card-label">alunos (15%)</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * WithProgressBars - Com barras de progresso
 */
export const WithProgressBars = {
  render: () => `
    ${legendCardStyles}
    <div class="p-4">
      <div class="legend-cards-container">
        <div class="legend-card">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-danger">
              <span class="material-symbols-outlined">sentiment_very_dissatisfied</span>
            </div>
            <h6 class="legend-card-title">Abaixo do Básico</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-danger">12%</div>
            <div class="legend-progress">
              <div class="legend-progress-bar">
                <div class="legend-progress-fill bg-danger" style="width: 12%;"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="legend-card">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-warning">
              <span class="material-symbols-outlined">sentiment_neutral</span>
            </div>
            <h6 class="legend-card-title">Básico</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-warning">26%</div>
            <div class="legend-progress">
              <div class="legend-progress-bar">
                <div class="legend-progress-fill bg-warning" style="width: 26%;"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="legend-card active variant-success">
          <span class="material-symbols-outlined info-icon text-success" title="Maior percentual">info</span>
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-success">
              <span class="material-symbols-outlined">sentiment_satisfied</span>
            </div>
            <h6 class="legend-card-title">Proficiente</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-success">47%</div>
            <div class="legend-progress">
              <div class="legend-progress-bar">
                <div class="legend-progress-fill bg-success" style="width: 47%;"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="legend-card">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-primary">
              <span class="material-symbols-outlined">sentiment_very_satisfied</span>
            </div>
            <h6 class="legend-card-title">Avançado</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-primary">15%</div>
            <div class="legend-progress">
              <div class="legend-progress-bar">
                <div class="legend-progress-fill bg-primary" style="width: 15%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Compact - Versão compacta
 */
export const Compact = {
  render: () => `
    ${legendCardStyles}
    <style>
      .legend-card.compact {
        padding: 0.75rem;
      }
      .legend-card.compact .legend-card-icon {
        width: 36px;
        height: 36px;
        margin-bottom: 0.25rem;
      }
      .legend-card.compact .legend-card-icon .material-symbols-outlined {
        font-size: 20px;
      }
      .legend-card.compact .legend-card-title {
        font-size: 0.8rem;
      }
      .legend-card.compact .legend-card-value {
        font-size: 1.25rem;
      }
      .legend-card.compact .legend-card-label {
        font-size: 0.75rem;
      }
    </style>
    <div class="p-4" style="max-width: 600px;">
      <div class="legend-cards-container">
        <div class="legend-card compact">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-danger">
              <span class="material-symbols-outlined">sentiment_very_dissatisfied</span>
            </div>
            <h6 class="legend-card-title">Abaixo</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-danger">15</div>
          </div>
        </div>
        
        <div class="legend-card compact">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-warning">
              <span class="material-symbols-outlined">sentiment_neutral</span>
            </div>
            <h6 class="legend-card-title">Básico</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-warning">32</div>
          </div>
        </div>
        
        <div class="legend-card compact active variant-success">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-success">
              <span class="material-symbols-outlined">sentiment_satisfied</span>
            </div>
            <h6 class="legend-card-title">Proficiente</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-success">58</div>
          </div>
        </div>
        
        <div class="legend-card compact">
          <div class="legend-card-header">
            <div class="legend-card-icon bg-light-primary">
              <span class="material-symbols-outlined">sentiment_very_satisfied</span>
            </div>
            <h6 class="legend-card-title">Avançado</h6>
          </div>
          <div class="legend-card-content">
            <div class="legend-card-value text-primary">19</div>
          </div>
        </div>
      </div>
    </div>
  `,
};
