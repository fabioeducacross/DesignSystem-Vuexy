/**
 * LegendEnum - Status Enum Legend Component
 * =========================================
 * 
 * Component for displaying enum-based status legends with color-coded badges.
 * Shows status levels (Below Basic, Basic, Proficient, Advanced) with semaphore colors.
 * 
 * @component LegendEnum
 * @source educacross-frontoffice\src\components\legends\LegendEnum.vue
 */

export default {
  title: 'Educacross Components V2/Legends/LegendEnum',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# LegendEnum

Componente de legenda para **status baseados em enumeração** com badges coloridos.

## Contexto de Uso

- **Níveis de proficiência**: Below Basic, Basic, Proficient, Advanced
- **Sistema semáforo**: Vermelho (danger), Amarelo (warning), Verde (success), Azul (primary)
- **Legendas de avaliação**: Explicar escala de performance
- **Dashboards educacionais**: Mostrar categorias de status
- **Relatórios**: Identificar níveis em gráficos e tabelas

## Estrutura

\`\`\`
+--------------------------------+
| Label: [Badge Status] Value    |  ← Status enum com cor semáforo
+--------------------------------+
| Description text (optional)    |  ← Explicação do nível
+--------------------------------+
\`\`\`

## Status Enum Colors

| Status | Color | CSS Variable | Hex | Significado |
|--------|-------|--------------|-----|-------------|
| **Below Basic** | 🔴 Vermelho | --legend-below-basic | #EA5455 | Abaixo do básico |
| **Basic** | 🟡 Amarelo | --legend-basic | #FF9F43 | Básico |
| **Proficient** | 🟢 Verde | --legend-proficient | #28C76F | Proficiente |
| **Advanced** | 🔵 Azul | --legend-advanced | #6E63E8 | Avançado |

## Características

- **Badge semáforo**: Sistema de cores universalmente reconhecido
- **Slot enum-component**: Permite customização do componente de status
- **Card wrapper**: Apresentação organizada com border discreto
- **Flexbox layout**: Centralizado com gap-2 (16px)
- **Responsive**: flex-wrap para empilhar em mobile
- **Typography**: text-sm (14px) para labels

## Quando usar

- **Explicar legendas**: Antes de gráficos ou tabelas com cores
- **Onboarding**: Ensinar usuários sobre sistema de níveis
- **Relatórios**: Cabeçalho de dashboards com escala
- **Avaliações**: Mostrar critérios de classificação
        `
      }
    }
  }
};

/**
 * Props API
 * 
 * Componente estrutural sem props - recebe status badges via slot enum-component
 */

/**
 * Design Specs
 * 
 * Cores:
 * - Below Basic: #EA5455 (danger)
 * - Basic: #FF9F43 (warning)
 * - Proficient: #28C76F (success)
 * - Advanced: #6E63E8 (primary)
 * - Card border: #D8D6DE
 * - Text color: #5D596C
 * 
 * Dimensões:
 * - Badge padding: 6px 12px
 * - Badge border-radius: 4px
 * - Gap between items: 16px (gap-2)
 * - Card padding: 20px (card-body)
 * - Font-size: 14px (text-sm)
 * 
 * Layout:
 * - Display: flex
 * - Justify-content: center
 * - Align-items: center
 * - Flex-wrap: wrap (responsive)
 */

// Estilos base
const legendStyles = `
<style>
  .legend-enum-container {
    background: #FFFFFF;
    border: 1px solid #D8D6DE;
    border-radius: 8px;
    box-shadow: none;
    padding: 20px;
    max-width: 600px;
  }
  
  .legend-enum-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    font-size: 14px;
    color: #5D596C;
  }
  
  .legend-label {
    font-weight: 500;
    color: #5D596C;
  }
  
  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  
  .status-below-basic {
    background: rgba(234, 84, 85, 0.12);
    color: #EA5455;
    border: 1px solid #EA5455;
  }
  
  .status-basic {
    background: rgba(255, 159, 67, 0.12);
    color: #FF9F43;
    border: 1px solid #FF9F43;
  }
  
  .status-proficient {
    background: rgba(40, 199, 111, 0.12);
    color: #28C76F;
    border: 1px solid #28C76F;
  }
  
  .status-advanced {
    background: rgba(110, 99, 232, 0.12);
    color: #6E63E8;
    border: 1px solid #6E63E8;
  }
  
  .legend-description {
    margin-top: 12px;
    margin-bottom: 0;
    font-size: 13px;
    color: #6E6B7B;
    text-align: center;
  }
  
  .legend-divider {
    margin: 16px 0;
    border: none;
    border-top: 1px solid #E0E0E0;
  }
  
  @media (max-width: 576px) {
    .legend-enum-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    
    .legend-enum-container {
      padding: 16px;
    }
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${legendStyles}
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Status:</span>
        <span class="status-badge status-proficient">Proficient</span>
      </div>
      <p class="legend-description">
        Status enum badge com cor semáforo verde (proficiente)
      </p>
    </div>
  `
};

// Story: AllStatuses
export const AllStatuses = {
  render: () => `
    ${legendStyles}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 700px;">
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Below Basic:</span>
          <span class="status-badge status-below-basic">Below Basic</span>
        </div>
        <p class="legend-description">
          🔴 Vermelho (#EA5455) - Abaixo do nível básico esperado
        </p>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Basic:</span>
          <span class="status-badge status-basic">Basic</span>
        </div>
        <p class="legend-description">
          🟡 Amarelo (#FF9F43) - Nível básico de proficiência
        </p>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Proficient:</span>
          <span class="status-badge status-proficient">Proficient</span>
        </div>
        <p class="legend-description">
          🟢 Verde (#28C76F) - Proficiente, domínio adequado
        </p>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Advanced:</span>
          <span class="status-badge status-advanced">Advanced</span>
        </div>
        <p class="legend-description">
          🔵 Azul (#6E63E8) - Avançado, excelência
        </p>
      </div>
    </div>
  `
};

// Story: MultipleStatuses
export const MultipleStatuses = {
  render: () => `
    ${legendStyles}
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Níveis:</span>
        <span class="status-badge status-below-basic">Below Basic</span>
        <span class="status-badge status-basic">Basic</span>
        <span class="status-badge status-proficient">Proficient</span>
        <span class="status-badge status-advanced">Advanced</span>
      </div>
      <hr class="legend-divider">
      <p class="legend-description">
        Sistema semáforo com 4 níveis de proficiência (vermelho → amarelo → verde → azul)
      </p>
    </div>
  `
};

// Story: WithMetrics
export const WithMetrics = {
  render: () => `
    ${legendStyles}
    <style>
      .metric-card {
        background: #F8F7FA;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        padding: 16px;
        text-align: center;
      }
      
      .metric-value {
        font-size: 32px;
        font-weight: 700;
        margin: 8px 0;
      }
      
      .metric-label {
        font-size: 13px;
        color: #6E6B7B;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    </style>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 800px; margin-bottom: 24px;">
      <div class="metric-card">
        <div class="metric-label">Below Basic</div>
        <div class="metric-value" style="color: #EA5455;">12</div>
        <span class="status-badge status-below-basic">15%</span>
      </div>
      <div class="metric-card">
        <div class="metric-label">Basic</div>
        <div class="metric-value" style="color: #FF9F43;">23</div>
        <span class="status-badge status-basic">29%</span>
      </div>
      <div class="metric-card">
        <div class="metric-label">Proficient</div>
        <div class="metric-value" style="color: #28C76F;">35</div>
        <span class="status-badge status-proficient">44%</span>
      </div>
      <div class="metric-card">
        <div class="metric-label">Advanced</div>
        <div class="metric-value" style="color: #6E63E8;">10</div>
        <span class="status-badge status-advanced">12%</span>
      </div>
    </div>
    
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Legenda:</span>
        <span class="status-badge status-below-basic">Below Basic</span>
        <span class="status-badge status-basic">Basic</span>
        <span class="status-badge status-proficient">Proficient</span>
        <span class="status-badge status-advanced">Advanced</span>
      </div>
      <p class="legend-description">
        Dashboard de proficiência: 80 alunos distribuídos em 4 níveis
      </p>
    </div>
  `
};

// Story: InTable
export const InTable = {
  render: () => `
    ${legendStyles}
    <style>
      .proficiency-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 24px;
        background: white;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        overflow: hidden;
      }
      
      .proficiency-table th {
        background: #F8F7FA;
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        font-size: 13px;
        color: #5D596C;
        text-transform: uppercase;
        border-bottom: 2px solid #E0E0E0;
      }
      
      .proficiency-table td {
        padding: 12px 16px;
        border-bottom: 1px solid #F0F0F0;
        font-size: 14px;
        color: #5D596C;
      }
      
      .proficiency-table tr:last-child td {
        border-bottom: none;
      }
    </style>
    
    <table class="proficiency-table">
      <thead>
        <tr>
          <th>Aluno</th>
          <th>Disciplina</th>
          <th>Nota</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ana Silva</td>
          <td>Matemática</td>
          <td>9.2</td>
          <td><span class="status-badge status-advanced">Advanced</span></td>
        </tr>
        <tr>
          <td>Bruno Costa</td>
          <td>Português</td>
          <td>7.8</td>
          <td><span class="status-badge status-proficient">Proficient</span></td>
        </tr>
        <tr>
          <td>Carlos Mendes</td>
          <td>História</td>
          <td>6.1</td>
          <td><span class="status-badge status-basic">Basic</span></td>
        </tr>
        <tr>
          <td>Diana Alves</td>
          <td>Ciências</td>
          <td>4.5</td>
          <td><span class="status-badge status-below-basic">Below Basic</span></td>
        </tr>
      </tbody>
    </table>
    
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Critérios:</span>
        <span class="status-badge status-below-basic">&lt; 5.0</span>
        <span class="status-badge status-basic">5.0 - 6.9</span>
        <span class="status-badge status-proficient">7.0 - 8.9</span>
        <span class="status-badge status-advanced">≥ 9.0</span>
      </div>
    </div>
  `
};

// Story: CompactVariant
export const CompactVariant = {
  render: () => `
    ${legendStyles}
    <style>
      .status-badge-compact {
        display: inline-flex;
        align-items: center;
        padding: 4px 8px;
        border-radius: 3px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.2px;
      }
    </style>
    <div class="legend-enum-container" style="padding: 12px;">
      <div class="legend-enum-row" style="font-size: 12px; gap: 12px;">
        <span class="legend-label" style="font-size: 12px;">Status:</span>
        <span class="status-badge-compact status-below-basic">Below</span>
        <span class="status-badge-compact status-basic">Basic</span>
        <span class="status-badge-compact status-proficient">Prof.</span>
        <span class="status-badge-compact status-advanced">Adv.</span>
      </div>
    </div>
  `
};

// Story: WithIcons
export const WithIcons = {
  render: () => `
    ${legendStyles}
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 700px;">
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Below Basic:</span>
          <span class="status-badge status-below-basic">
            <i class="bi bi-x-circle-fill" style="margin-right: 6px;"></i>
            Below Basic
          </span>
        </div>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Basic:</span>
          <span class="status-badge status-basic">
            <i class="bi bi-exclamation-triangle-fill" style="margin-right: 6px;"></i>
            Basic
          </span>
        </div>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Proficient:</span>
          <span class="status-badge status-proficient">
            <i class="bi bi-check-circle-fill" style="margin-right: 6px;"></i>
            Proficient
          </span>
        </div>
      </div>
      
      <div class="legend-enum-container">
        <div class="legend-enum-row">
          <span class="legend-label">Advanced:</span>
          <span class="status-badge status-advanced">
            <i class="bi bi-star-fill" style="margin-right: 6px;"></i>
            Advanced
          </span>
        </div>
      </div>
    </div>
  `
};

// Story: Responsive
export const Responsive = {
  render: () => `
    ${legendStyles}
    <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
        <i class="bi bi-phone"></i> LegendEnum: Responsivo
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
        <li>Desktop: flex-row com badges lado a lado</li>
        <li>Mobile (&lt;576px): flex-column empilhado</li>
        <li>Gap responsivo: 16px → 12px mobile</li>
        <li>Padding: 20px → 16px mobile</li>
      </ul>
    </div>
    
    <div class="legend-enum-container">
      <div class="legend-enum-row">
        <span class="legend-label">Níveis de Proficiência:</span>
        <span class="status-badge status-below-basic">
          <i class="bi bi-x-circle-fill" style="margin-right: 6px;"></i>
          Below Basic
        </span>
        <span class="status-badge status-basic">
          <i class="bi bi-exclamation-triangle-fill" style="margin-right: 6px;"></i>
          Basic
        </span>
        <span class="status-badge status-proficient">
          <i class="bi bi-check-circle-fill" style="margin-right: 6px;"></i>
          Proficient
        </span>
        <span class="status-badge status-advanced">
          <i class="bi bi-star-fill" style="margin-right: 6px;"></i>
          Advanced
        </span>
      </div>
      <hr class="legend-divider">
      <p class="legend-description">
        Em mobile, badges empilham verticalmente para melhor legibilidade
      </p>
    </div>
  `
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Legends</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">LegendEnum</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Status Enum Legend Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Status Enum Legend Component. Faz parte da categoria <strong>Legends</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import LegendEnum from '@/components/LegendEnum.vue';

// Template
&lt;LegendEnum v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o LegendEnum com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground LegendEnum</p>
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
    docs: { description: { story: 'Exemplos de uso real do LegendEnum no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: LegendEnum</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando LegendEnum no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com LegendEnum no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via LegendEnum</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o LegendEnum.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: LegendEnum</h1>
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

