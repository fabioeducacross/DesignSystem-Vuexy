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
  title: 'Front-office/Feedback/ProgressBarTopInfo',
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


