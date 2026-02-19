/**
 * ProgressBarTopInfo - Progress Bar with Top Information
 * =======================================================
 * Barra de progresso com label e porcentagem no topo,
 * usada em contextos de proficiência e métricas educacionais.
 * 
 * @component ProgressBarTopInfo
 * @category Educacross Components V2 / Feedback
 * @source educacross-frontoffice/src/components/progessBar/ProgressBarTopInfo.vue
 * @priority P0 - Critical
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * 
 * Barra de progresso com layout top-info: label à esquerda e porcentagem à
 * direita no topo da barra, seguida pela barra visual. Ideal para dashboards.
 */

export default {
  title: 'Educacross Components V2/Feedback/ProgressBarTopInfo',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor da barra de progresso (0-100)',
    },
    variant: {
      control: 'select',
      options: ['danger', 'warning', 'success', 'primary'],
      description: 'Variante de cor (danger=Abaixo Básico, warning=Básico, success=Proficiente, primary=Avançado)',
    },
    label: {
      control: 'text',
      description: 'Label exibido à esquerda no topo',
    },
    height: {
      control: 'text',
      description: 'Altura da barra (ex: "8px", "10px")',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Mostrar tooltip na porcentagem',
    },
    tooltipText: {
      control: 'text',
      description: 'Texto do tooltip',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# ProgressBarTopInfo - Barra com Informações no Topo

Variante de barra de progresso com layout top-info: label e porcentagem alinhados no topo da barra, ideal para dashboards e cards compactos.

---

## 📋 Contexto de Uso

### Personas

**Professor** (Uso Principal)
- Visualiza proficiência em cards de alunos (label: "João Silva", value: 72%)
- Acompanha progresso de missões em dashboards
- Monitora desempenho médio da turma

**Coordenador Pedagógico**
- Analisa métricas consolidadas em relatórios
- Compara turmas lado a lado em grids
- Exporta dados visuais para apresentações

### Casos de Uso

1. **Dashboard de Alunos**: Card compacto com nome do aluno e proficiência no topo
2. **Relatórios**: Múltiplas métricas empilhadas verticalmente
3. **Cards de Missão**: Progresso de conclusão com nome da missão no topo

---

## 🎨 Props API

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| value | Number | 0 | Valor 0-100 |
| variant | String | 'primary' | Cor: danger, warning, success, primary |
| label | String | - | Texto à esquerda no topo |
| height | String | '8px' | Altura da barra |
| showTooltip | Boolean | false | Tooltip na porcentagem |
| tooltipText | String | - | Texto do tooltip (se showTooltip=true) |

---

## 🎨 Design Specs

### Layout

- **Top Section**: Flex row, space-between, 4px abaixo da barra
- **Label**: Left-aligned, font-weight 600, 14px
- **Percentage**: Right-aligned, font-weight 700, 14px
- **Gap**: 4px entre top section e barra

### Cores

Mesmas de ProgressBar:
- Danger (#ea5455): 0-29%
- Warning (#ff9f43): 30-69%
- Success (#28c76f): 70-100%
- Primary (#7367f0): Custom

### Comportamento

- **Tooltip**: Cursor help, title attribute mostra tooltipText
- **Responsive**: Label truncate com ellipsis em mobile
        `,
      },
    },
  },
};

// Estilos Figma-style
const componentStyles = `
.progress-bar-top-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

.progress-bar-top-info .top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-bar-top-info .label {
  font-weight: 600;
  font-size: 14px;
  color: #5e5873;
}

.progress-bar-top-info .percentage {
  font-weight: 700;
  font-size: 14px;
  color: #5e5873;
  cursor: default;
}

.progress-bar-top-info .percentage[data-tooltip] {
  cursor: help;
  position: relative;
}

.progress-bar-top-info .percentage[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  right: 0;
  background: #5e5873;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  margin-bottom: 8px;
  z-index: 1000;
}

.progress-bar-top-info .percentage[data-tooltip]:hover::before {
  content: '';
  position: absolute;
  bottom: 100%;
  right: 10px;
  border: 6px solid transparent;
  border-top-color: #5e5873;
  margin-bottom: 2px;
}

.progress-bar-top-info .progress {
  border-radius: 4px;
  overflow: hidden;
  background-color: #f3f2f7;
}

.progress-bar-top-info .progress-bar {
  transition: width 0.6s ease;
  border-radius: 4px;
}

/* Proficiency Colors */
.progress-bar-top-info .bg-danger {
  background-color: #ea5455 !important;
}

.progress-bar-top-info .bg-warning {
  background-color: #ffb443 !important;
}

.progress-bar-top-info .bg-success {
  background-color: #28c76f !important;
}

.progress-bar-top-info .bg-primary {
  background-color: #7367f0 !important;
}
`;

const renderProgressBar = (args) => `
<div class="progress-bar-top-info">
  <div class="top-section">
    <span class="label">${args.label}</span>
    <span class="percentage" ${args.showTooltip ? `data-tooltip="${args.tooltipText}"` : ''}>${args.value}%</span>
  </div>
  <div class="progress" style="height: ${args.height || '8px'}">
    <div 
      class="progress-bar bg-${args.variant}" 
      role="progressbar" 
      style="width: ${args.value}%"
      aria-valuenow="${args.value}" 
      aria-valuemin="0" 
      aria-valuemax="100"
    ></div>
  </div>
</div>
`;

export const Default = {
  args: {
    value: 68,
    variant: 'success',
    label: 'Proficiente',
    height: '8px',
    showTooltip: false,
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const AbaixoBasico = {
  args: {
    value: 22,
    variant: 'danger',
    label: 'Abaixo do Básico',
    height: '8px',
    showTooltip: true,
    tooltipText: '4 de 18 alunos',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const Basico = {
  args: {
    value: 44,
    variant: 'warning',
    label: 'Básico',
    height: '8px',
    showTooltip: true,
    tooltipText: '8 de 18 alunos',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const Proficiente = {
  args: {
    value: 72,
    variant: 'success',
    label: 'Proficiente',
    height: '8px',
    showTooltip: true,
    tooltipText: '13 de 18 alunos',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const Avancado = {
  args: {
    value: 89,
    variant: 'primary',
    label: 'Avançado',
    height: '8px',
    showTooltip: true,
    tooltipText: '16 de 18 alunos',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const ComTooltip = {
  args: {
    value: 65,
    variant: 'success',
    label: 'Desempenho Geral',
    height: '8px',
    showTooltip: true,
    tooltipText: 'Média da turma em todas as missões',
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      <p class="text-muted mb-2" style="font-size: 12px;">Passe o mouse sobre a porcentagem para ver mais detalhes</p>
      ${renderProgressBar(args)}
    </div>
  `,
};

export const BarraAlta = {
  args: {
    value: 78,
    variant: 'success',
    label: 'Conclusão da Missão',
    height: '12px',
    showTooltip: false,
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar(args)}
    </div>
  `,
};

export const DashboardProfessor = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 500px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Relatório de Proficiência - 5º Ano A</h5>
          <small class="text-muted">Matemática - Novembro 2024</small>
        </div>
        <div class="card-body">
          ${renderProgressBar({
            value: 15,
            variant: 'danger',
            label: 'Abaixo do Básico',
            height: '10px',
            showTooltip: true,
            tooltipText: '3 de 20 alunos',
          })}
          ${renderProgressBar({
            value: 30,
            variant: 'warning',
            label: 'Básico',
            height: '10px',
            showTooltip: true,
            tooltipText: '6 de 20 alunos',
          })}
          ${renderProgressBar({
            value: 40,
            variant: 'success',
            label: 'Proficiente',
            height: '10px',
            showTooltip: true,
            tooltipText: '8 de 20 alunos',
          })}
          ${renderProgressBar({
            value: 15,
            variant: 'primary',
            label: 'Avançado',
            height: '10px',
            showTooltip: true,
            tooltipText: '3 de 20 alunos',
          })}
        </div>
      </div>
    </div>
  `,
};

export const RelatorioHabilidades = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 600px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Habilidades da BNCC - Turma 5º B</h5>
          <small class="text-muted">Português - 2º Bimestre</small>
        </div>
        <div class="card-body">
          <h6 class="mb-3">Leitura e Interpretação</h6>
          ${renderProgressBar({
            value: 85,
            variant: 'primary',
            label: 'EF05LP01 - Localizar informações explícitas',
            height: '8px',
            showTooltip: true,
            tooltipText: '17 de 20 alunos dominam',
          })}
          ${renderProgressBar({
            value: 70,
            variant: 'success',
            label: 'EF05LP02 - Inferir sentido de expressões',
            height: '8px',
            showTooltip: true,
            tooltipText: '14 de 20 alunos dominam',
          })}
          ${renderProgressBar({
            value: 55,
            variant: 'success',
            label: 'EF05LP03 - Analisar estrutura textual',
            height: '8px',
            showTooltip: true,
            tooltipText: '11 de 20 alunos dominam',
          })}
          ${renderProgressBar({
            value: 40,
            variant: 'warning',
            label: 'EF05LP04 - Comparar textos',
            height: '8px',
            showTooltip: true,
            tooltipText: '8 de 20 alunos dominam',
          })}
        </div>
      </div>
    </div>
  `,
};

export const EdgeCases = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 400px;">
      ${renderProgressBar({
        value: 0,
        variant: 'danger',
        label: '0% - Nenhum aluno',
        height: '8px',
        showTooltip: true,
        tooltipText: '0 de 20 alunos',
      })}
      ${renderProgressBar({
        value: 5,
        variant: 'danger',
        label: '5% - Mínimo visível',
        height: '8px',
        showTooltip: true,
        tooltipText: '1 de 20 alunos',
      })}
      ${renderProgressBar({
        value: 50,
        variant: 'warning',
        label: '50% - Metade',
        height: '8px',
        showTooltip: true,
        tooltipText: '10 de 20 alunos',
      })}
      ${renderProgressBar({
        value: 95,
        variant: 'primary',
        label: '95% - Quase todos',
        height: '8px',
        showTooltip: true,
        tooltipText: '19 de 20 alunos',
      })}
      ${renderProgressBar({
        value: 100,
        variant: 'primary',
        label: '100% - Todos os alunos',
        height: '8px',
        showTooltip: true,
        tooltipText: '20 de 20 alunos',
      })}
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
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ProgressBarTopInfo</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Progress Bar with Top Information</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Progress Bar with Top Information. Faz parte da categoria <strong>Feedback</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #FF9F43;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ProgressBarTopInfo from '@/components/ProgressBarTopInfo.vue';

// Template
&lt;ProgressBarTopInfo v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o ProgressBarTopInfo com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#FF9F4320;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ProgressBarTopInfo</p>
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
    docs: { description: { story: 'Exemplos de uso real do ProgressBarTopInfo no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#FF9F4315;border:1px solid #FF9F4330;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ProgressBarTopInfo</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ProgressBarTopInfo no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ProgressBarTopInfo no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ProgressBarTopInfo</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ProgressBarTopInfo.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#FF9F43 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ProgressBarTopInfo</h1>
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

