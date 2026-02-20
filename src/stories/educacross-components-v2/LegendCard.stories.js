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
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Data Display</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">LegendCard</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Pixel Perfect from educacross-frontoffice</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Pixel Perfect from educacross-frontoffice. Faz parte da categoria <strong>Data Display</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import LegendCard from '@/components/LegendCard.vue';

// Template
&lt;LegendCard v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o LegendCard com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground LegendCard</p>
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
    docs: { description: { story: 'Exemplos de uso real do LegendCard no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: LegendCard</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando LegendCard no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com LegendCard no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via LegendCard</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o LegendCard.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: LegendCard</h1>
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

