import { createDocPage, createExampleCard, createPropsTable } from '../_helpers/docTemplate.js';

/**
 * FilterChip - Filter Badge/Chip Component
 * =========================================
 * Badge pill usado para filtros e tags em turmas,
 * disciplinas, anos escolares e outros contextos.
 * 
 * @component FilterChip
 * @category Educacross Components V2 / Forms
 * @source educacross-frontoffice (filtros em dashboards, relatórios)
 * @priority P0 - Critical
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * 
 * Componente de filtro visual usado para seleção e remoção de filtros em
 * dashboards, relatórios e listagens (turmas, disciplinas, períodos).
 */

export default {
  title: 'Educacross Components V2/Forms/FilterChip',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto do chip/badge',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light-primary', 'light-secondary', 'light-success', 'light-danger'],
      description: 'Variante de cor do badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do badge',
    },
    removable: {
      control: 'boolean',
      description: 'Se o chip pode ser removido (mostra X)',
    },
    icon: {
      control: 'text',
      description: 'Ícone Material Symbols (opcional)',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# FilterChip - Badge de Filtro

Chip visual removível usado para exibir filtros ativos em dashboards, relatórios e listagens da plataforma Educacross.

---

## 📋 Contexto de Uso

### Personas

**Professor** (Usuário Principal)
- Aplica filtros em dashboards de alunos (turma, disciplina, período)
- Remove filtros clicando no X
- Visualiza filtros ativos no cabeçalho de relatórios

**Coordenador Pedagógico**
- Filtra múltiplas turmas em relatórios consolidados
- Aplica filtros de ano letivo e período
- Compara dados com diferentes combinações de filtros

### Casos de Uso

1. **Dashboard de Alunos**: Filtrar por turma (5º A) + disciplina (Matemática)
2. **Relatórios**: Aplicar período (Novembro 2024) + status (Ativa)
3. **Listagens**: Filtrar missões por ano escolar (5º Ano)

---

## 🎨 Props API

| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| label | String | Required | Texto exibido no chip |
| variant | String | 'light-primary' | Cor: primary, success, danger, info, warning, secondary |
| size | String | 'md' | Tamanho: sm, md, lg |
| removable | Boolean | false | Mostra botão X para remover |
| icon | String | - | Ícone Material Symbols (opcional) |

---

## 🎨 Design Specs

### Dimensões

| Tamanho | Height | Padding H | Font Size |
|---------|--------|-----------|-----------|
| Small | 24px | 8px | 11px |
| Medium | 28px | 12px | 13px |
| Large | 32px | 16px | 14px |

### Cores

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| primary | #7367f0 | white | - |
| light-primary | rgba(115,103,240,0.12) | #7367f0 | - |
| success | #28c76f | white | - |
| light-success | rgba(40,199,111,0.12) | #28c76f | - |
| danger | #ea5455 | white | - |
| light-danger | rgba(234,84,85,0.12) | #ea5455 | - |

### Comportamento

- **Border Radius**: 20px (pill completo)
- **Gap Interno**: 4px (ícone + texto + botão)
- **Transition**: 0.2s ease em hover/focus
- **Remove Button**: Opacity 0.7 → 1.0 em hover
        `,
      },
    },
  },
};

// Estilos Figma-style
const componentStyles = `
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1.5;
  transition: all 0.2s ease;
}

.filter-chip.size-sm {
  padding: 2px 8px;
  font-size: 11px;
}

.filter-chip.size-lg {
  padding: 6px 16px;
  font-size: 14px;
}

/* Primary variants */
.filter-chip.badge-primary {
  background-color: #7367f0;
  color: white;
}

.filter-chip.badge-light-primary {
  background-color: rgba(115, 103, 240, 0.12);
  color: #7367f0;
}

/* Secondary variants */
.filter-chip.badge-secondary {
  background-color: #82868b;
  color: white;
}

.filter-chip.badge-light-secondary {
  background-color: rgba(130, 134, 139, 0.12);
  color: #82868b;
}

/* Success variants */
.filter-chip.badge-success {
  background-color: #28c76f;
  color: white;
}

.filter-chip.badge-light-success {
  background-color: rgba(40, 199, 111, 0.12);
  color: #28c76f;
}

/* Danger variants */
.filter-chip.badge-danger {
  background-color: #ea5455;
  color: white;
}

.filter-chip.badge-light-danger {
  background-color: rgba(234, 84, 85, 0.12);
  color: #ea5455;
}

/* Warning variants */
.filter-chip.badge-warning {
  background-color: #ff9f43;
  color: white;
}

.filter-chip.badge-light-warning {
  background-color: rgba(255, 159, 67, 0.12);
  color: #ff9f43;
}

/* Info variants */
.filter-chip.badge-info {
  background-color: #00cfe8;
  color: white;
}

.filter-chip.badge-light-info {
  background-color: rgba(0, 207, 232, 0.12);
  color: #00cfe8;
}

.filter-chip .material-symbols-outlined {
  font-size: 16px;
}

.filter-chip .remove-btn {
  margin-left: 4px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
}

.filter-chip .remove-btn:hover {
  opacity: 1;
}

.filter-chip .remove-btn .material-symbols-outlined {
  font-size: 16px;
}

.filter-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
`;

const renderChip = (args) => `
<span class="filter-chip badge-${args.variant} size-${args.size || 'md'}">
  ${args.icon ? `<span class="material-symbols-outlined">${args.icon}</span>` : ''}
  <span>${args.label}</span>
  ${args.removable ? `
    <button class="remove-btn" aria-label="Remover">
      <span class="material-symbols-outlined">close</span>
    </button>
  ` : ''}
</span>
`;

export const Default = {
  args: {
    label: '5º Ano A',
    variant: 'light-primary',
    size: 'md',
    removable: false,
  },
  render: (args) => `
    <style>${componentStyles}</style>
    ${renderChip(args)}
  `,
};

export const Turmas = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="filter-chip-group">
      ${renderChip({ label: '5º Ano A', variant: 'light-primary', size: 'md' })}
      ${renderChip({ label: '5º Ano B', variant: 'light-primary', size: 'md' })}
      ${renderChip({ label: '6º Ano A', variant: 'light-primary', size: 'md' })}
      ${renderChip({ label: '6º Ano B', variant: 'light-primary', size: 'md' })}
    </div>
  `,
};

export const Disciplinas = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="filter-chip-group">
      ${renderChip({ label: 'Matemática', variant: 'primary', size: 'md' })}
      ${renderChip({ label: 'Português', variant: 'info', size: 'md' })}
      ${renderChip({ label: 'Ciências', variant: 'success', size: 'md' })}
      ${renderChip({ label: 'História', variant: 'warning', size: 'md' })}
    </div>
  `,
};

export const AnosEscolares = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="filter-chip-group">
      ${renderChip({ label: '1º Ano', variant: 'light-primary', size: 'md' })}
      ${renderChip({ label: '2º Ano', variant: 'light-primary', size: 'md' })}
      ${renderChip({ label: '3º Ano', variant: 'light-primary', size: 'md' })}
      ${renderChip({ label: '4º Ano', variant: 'light-primary', size: 'md' })}
      ${renderChip({ label: '5º Ano', variant: 'light-primary', size: 'md' })}
    </div>
  `,
};

export const StatusMissoes = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="filter-chip-group">
      ${renderChip({ label: 'Ativa', variant: 'light-success', size: 'md' })}
      ${renderChip({ label: 'Pendente', variant: 'light-warning', size: 'md' })}
      ${renderChip({ label: 'Concluída', variant: 'light-secondary', size: 'md' })}
      ${renderChip({ label: 'Expirada', variant: 'light-danger', size: 'md' })}
    </div>
  `,
};

export const ComIcones = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="filter-chip-group">
      ${renderChip({ label: 'Turmas', variant: 'light-primary', size: 'md', icon: 'groups' })}
      ${renderChip({ label: 'Matemática', variant: 'primary', size: 'md', icon: 'calculate' })}
      ${renderChip({ label: 'Período', variant: 'light-secondary', size: 'md', icon: 'calendar_month' })}
      ${renderChip({ label: 'Filtros', variant: 'light-info', size: 'md', icon: 'filter_alt' })}
    </div>
  `,
};

export const Removivel = {
  render: () => `
    <style>${componentStyles}</style>
    <div class="filter-chip-group">
      ${renderChip({ label: '5º Ano A', variant: 'light-primary', size: 'md', removable: true })}
      ${renderChip({ label: 'Matemática', variant: 'primary', size: 'md', removable: true })}
      ${renderChip({ label: 'Novembro 2024', variant: 'light-secondary', size: 'md', removable: true })}
    </div>
  `,
};

export const Tamanhos = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <div>
        <p class="mb-2"><strong>Small</strong></p>
        <div class="filter-chip-group">
          ${renderChip({ label: '5º Ano A', variant: 'light-primary', size: 'sm' })}
          ${renderChip({ label: 'Matemática', variant: 'primary', size: 'sm' })}
          ${renderChip({ label: 'Novembro', variant: 'light-secondary', size: 'sm' })}
        </div>
      </div>
      <div>
        <p class="mb-2"><strong>Medium (Default)</strong></p>
        <div class="filter-chip-group">
          ${renderChip({ label: '5º Ano A', variant: 'light-primary', size: 'md' })}
          ${renderChip({ label: 'Matemática', variant: 'primary', size: 'md' })}
          ${renderChip({ label: 'Novembro', variant: 'light-secondary', size: 'md' })}
        </div>
      </div>
      <div>
        <p class="mb-2"><strong>Large</strong></p>
        <div class="filter-chip-group">
          ${renderChip({ label: '5º Ano A', variant: 'light-primary', size: 'lg' })}
          ${renderChip({ label: 'Matemática', variant: 'primary', size: 'lg' })}
          ${renderChip({ label: 'Novembro', variant: 'light-secondary', size: 'lg' })}
        </div>
      </div>
    </div>
  `,
};

export const BarraDeFiltros = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 800px;">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">Filtros Aplicados</h5>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <p class="text-muted mb-2" style="font-size: 12px;">TURMA</p>
            <div class="filter-chip-group">
              ${renderChip({ label: '5º Ano A', variant: 'light-primary', size: 'md', removable: true })}
            </div>
          </div>
          <div class="mb-3">
            <p class="text-muted mb-2" style="font-size: 12px;">DISCIPLINA</p>
            <div class="filter-chip-group">
              ${renderChip({ label: 'Matemática', variant: 'primary', size: 'md', removable: true })}
            </div>
          </div>
          <div>
            <p class="text-muted mb-2" style="font-size: 12px;">PERÍODO</p>
            <div class="filter-chip-group">
              ${renderChip({ label: 'Novembro 2024', variant: 'light-secondary', size: 'md', removable: true })}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const ProfessorDashboard = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="max-width: 900px;">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-1">Relatório de Desempenho</h5>
            <div class="filter-chip-group mt-2">
              ${renderChip({ label: '5º Ano A', variant: 'light-primary', size: 'md' })}
              ${renderChip({ label: 'Matemática', variant: 'primary', size: 'md' })}
              ${renderChip({ label: '2º Bimestre', variant: 'light-secondary', size: 'md' })}
            </div>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <span class="material-symbols-outlined" style="font-size: 16px;">filter_alt</span>
            Filtrar
          </button>
        </div>
        <div class="card-body">
          <p class="text-muted">Mostrando resultados para os filtros selecionados acima...</p>
        </div>
      </div>
    </div>
  `,
};

export const AllVariants = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: grid; gap: 16px;">
      <div>
        <p class="mb-2"><strong>Solid Variants</strong></p>
        <div class="filter-chip-group">
          ${renderChip({ label: 'Primary', variant: 'primary', size: 'md' })}
          ${renderChip({ label: 'Secondary', variant: 'secondary', size: 'md' })}
          ${renderChip({ label: 'Success', variant: 'success', size: 'md' })}
          ${renderChip({ label: 'Danger', variant: 'danger', size: 'md' })}
          ${renderChip({ label: 'Warning', variant: 'warning', size: 'md' })}
          ${renderChip({ label: 'Info', variant: 'info', size: 'md' })}
        </div>
      </div>
      <div>
        <p class="mb-2"><strong>Light Variants</strong></p>
        <div class="filter-chip-group">
          ${renderChip({ label: 'Light Primary', variant: 'light-primary', size: 'md' })}
          ${renderChip({ label: 'Light Secondary', variant: 'light-secondary', size: 'md' })}
          ${renderChip({ label: 'Light Success', variant: 'light-success', size: 'md' })}
          ${renderChip({ label: 'Light Danger', variant: 'light-danger', size: 'md' })}
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// 📖 DOCUMENTATION - Template 1 (JavaScript Functional)
// ============================================================================

export const Documentation = {
  render: () => createDocPage({
    title: 'FilterChip',
    subtitle: 'Badge pill para filtros em dashboards e relatórios',
    badge: 'Forms / Filters',
    colors: { primary: '#6E63E8', secondary: '#00CFE8' },
    
    stats: [
      { label: 'Variantes', value: '10', description: 'primary, secondary, success, danger, warning, info + light' },
      { label: 'Tamanhos', value: '3', description: 'sm, md, lg' },
      { label: 'Removível', value: 'Sim', description: 'Com ícone X para remoção' },
      { label: 'Uso Principal', value: 'Filtros', description: 'Dashboards, relatórios, listagens' }
    ],
    
    content: `
${createExampleCard({
  title: 'Chip Básico',
  description: 'Badge pill simples com label',
  preview: '<div style="padding: 20px;"><span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #6E63E8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Matemática</span></div>',
  code: '<FilterChip\n  label="Matemática"\n  variant="primary"\n  size="md"\n/>'
})}

${createExampleCard({
  title: 'Chip Removível',
  description: 'Com ícone X para remover filtro',
  preview: '<div style="padding: 20px; display: flex; gap: 8px; flex-wrap: wrap;"><span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #6E63E8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer;">Turma A <i class="bi bi-x" style="font-size: 16px; margin-left: 2px;"></i></span><span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #28C76F; color: white; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer;">2024 <i class="bi bi-x" style="font-size: 16px; margin-left: 2px;"></i></span><span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background-color: #00CFE8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer;">1º Trimestre <i class="bi bi-x" style="font-size: 16px; margin-left: 2px;"></i></span></div>',
  code: '<FilterChip\n  label="Turma A"\n  variant="primary"\n  :removable="true"\n  @remove="handleRemove"\n/>'
})}

${createExampleCard({
  title: 'Variantes de Cor',
  description: 'Diferentes cores para categorização visual',
  preview: '<div style="padding: 20px; display: flex; gap: 8px; flex-wrap: wrap;"><span style="padding: 6px 12px; background-color: #6E63E8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Primary</span><span style="padding: 6px 12px; background-color: #28C76F; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Success</span><span style="padding: 6px 12px; background-color: #FF9F43; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Warning</span><span style="padding: 6px 12px; background-color: #EA5455; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Danger</span><span style="padding: 6px 12px; background-color: #00CFE8; color: white; border-radius: 20px; font-size: 13px; font-weight: 500;">Info</span></div>',
  code: '<FilterChip variant="primary" label="Primary" />\n<FilterChip variant="success" label="Success" />\n<FilterChip variant="warning" label="Warning" />'
})}

${createPropsTable([
  { name: 'label', type: 'String', default: "''", description: 'Texto do chip/badge' },
  { name: 'variant', type: 'String', default: "'primary'", description: 'Cor: primary, secondary, success, danger, warning, info, light-*' },
  { name: 'size', type: 'String', default: "'md'", description: "Tamanho: 'sm', 'md', 'lg'" },
  { name: 'removable', type: 'Boolean', default: 'false', description: 'Mostra ícone X para remoção' }
])}
    `,
    
    features: [
      { icon: 'funnel', title: 'Filtros Visuais', description: 'Representação visual de filtros ativos' },
      { icon: 'palette', title: '10 Variantes', description: 'Cores sólidas e light para categorização' },
      { icon: 'x-circle', title: 'Removível', description: 'Ícone X para remover filtro rapidamente' },
      { icon: 'stack', title: 'Agrupação', description: 'Funciona bem em grupos de filtros' }
    ],
    
    relatedComponents: [
      { name: 'ESelect', path: '/story/front-office-forms-eselect--default' },
      { name: 'BadgeStatus', path: '/story/front-office-badges-badgestatus--default' }
    ]
  })
};
