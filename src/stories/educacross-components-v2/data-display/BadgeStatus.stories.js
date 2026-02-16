import { createOverviewGrid, generateSnippetDocs } from '../../_helpers/snippets';

export default {
  title: 'Educacross Components V2/Data Display/BadgeStatus',
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info', 'secondary', 'primary'],
      description: 'Tipo de status',
      table: { category: 'Content' }
    },
    variant: {
      control: 'select',
      options: ['filled', 'light', 'outline'],
      description: 'Variação visual',
      table: { category: 'Appearance' }
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamanho do badge',
      table: { category: 'Appearance' }
    },
    label: {
      control: 'text',
      description: 'Texto do badge',
      table: { category: 'Content' }
    },
    showIcon: {
      control: 'boolean',
      description: 'Mostrar ícone',
      table: { category: 'Content' }
    },
    rounded: {
      control: 'boolean',
      description: 'Badge arredondado',
      table: { category: 'Appearance' }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
### BadgeStatus

Badge para indicação de status com diferentes variações visuais e semânticas. Utilizado para destacar informações de estado em interfaces.

**Características:**
- Múltiplas variantes (preenchido, claro, contornado)
- Cores semânticas
- Diferentes tamanhos
- Suporte a ícones
- Versão arredondada (pill)

**Variantes:**
- \`filled\` - Preenchimento sólido
- \`light\` - Fundo claro com texto colorido
- \`outline\` - Apenas contorno colorido

**Status Disponíveis:**
- \`success\` - Verde (sucesso)
- \`warning\` - Amarelo (aviso)
- \`danger\` - Vermelho (erro)
- \`info\` - Azul (informação)
- \`secondary\` - Cinza (neutro)
- \`primary\` - Azul primário

**Uso no Projeto:**
- Indicação de status em cartões e listas
- Estados de processos e workflows
- Categorização de conteúdo
- Notificações e alertas inline
        `
      }
    }
  }
};

const statusIcons = {
  success: 'check_circle',
  warning: 'warning',
  danger: 'error',
  info: 'info',
  secondary: 'circle',
  primary: 'star'
};

const sizeClasses = {
  xs: { class: 'badge-xs', icon: '12px' },
  sm: { class: 'badge-sm', icon: '14px' },
  md: { class: '', icon: '16px' },
  lg: { class: 'badge-lg', icon: '18px' }
};

export const Default = {
  args: {
    status: 'success',
    variant: 'light',
    size: 'md',
    label: 'Ativo',
    showIcon: true,
    rounded: false
  },
  render: (args) => {
    const sizeClass = sizeClasses[args.size].class;
    const iconSize = sizeClasses[args.size].icon;
    const icon = statusIcons[args.status];
    const roundedClass = args.rounded ? 'rounded-pill' : '';
    
    return `
      <span class="badge badge-${args.variant === 'filled' ? args.status : `${args.variant}-${args.status}`} ${sizeClass} ${roundedClass}">
        ${args.showIcon ? `<span class="material-symbols-outlined me-1" style="font-size: ${iconSize};">${icon}</span>` : ''}
        ${args.label}
      </span>
    `;
  }
};

export const AllStatuses = {
  render: () => `
    <div class="d-flex gap-2 flex-wrap">
      ${Object.entries(statusIcons).map(([status, icon]) => `
        <span class="badge badge-light-${status}">
          <span class="material-symbols-outlined me-1" style="font-size: 16px;">${icon}</span>
          ${status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      `).join('')}
    </div>
  `
};

export const Variants = {
  render: () => `
    <div class="d-flex flex-column gap-3">
      <div>
        <h6 class="mb-2">Filled</h6>
        <div class="d-flex gap-2 flex-wrap">
          ${Object.keys(statusIcons).map(status => `
            <span class="badge badge-${status}">
              <span class="material-symbols-outlined me-1" style="font-size: 16px;">${statusIcons[status]}</span>
              ${status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          `).join('')}
        </div>
      </div>
      
      <div>
        <h6 class="mb-2">Light</h6>
        <div class="d-flex gap-2 flex-wrap">
          ${Object.keys(statusIcons).map(status => `
            <span class="badge badge-light-${status}">
              <span class="material-symbols-outlined me-1" style="font-size: 16px;">${statusIcons[status]}</span>
              ${status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          `).join('')}
        </div>
      </div>
      
      <div>
        <h6 class="mb-2">Outline</h6>
        <div class="d-flex gap-2 flex-wrap">
          ${Object.keys(statusIcons).map(status => `
            <span class="badge badge-outline-${status}">
              <span class="material-symbols-outlined me-1" style="font-size: 16px;">${statusIcons[status]}</span>
              ${status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `
};

export const Sizes = {
  render: () => `
    <div class="d-flex gap-3 align-items-center">
      <span class="badge badge-light-success badge-xs">
        <span class="material-symbols-outlined me-1" style="font-size: 12px;">check_circle</span>
        Extra Small
      </span>
      <span class="badge badge-light-success badge-sm">
        <span class="material-symbols-outlined me-1" style="font-size: 14px;">check_circle</span>
        Small
      </span>
      <span class="badge badge-light-success">
        <span class="material-symbols-outlined me-1" style="font-size: 16px;">check_circle</span>
        Medium
      </span>
      <span class="badge badge-light-success badge-lg">
        <span class="material-symbols-outlined me-1" style="font-size: 18px;">check_circle</span>
        Large
      </span>
    </div>
  `
};

export const WithoutIcons = {
  render: () => `
    <div class="d-flex gap-2 flex-wrap">
      <span class="badge badge-light-success">Ativo</span>
      <span class="badge badge-light-warning">Pendente</span>
      <span class="badge badge-light-danger">Inativo</span>
      <span class="badge badge-light-info">Em Análise</span>
      <span class="badge badge-light-secondary">Arquivado</span>
    </div>
  `
};

export const Rounded = {
  render: () => `
    <div class="d-flex gap-2 flex-wrap">
      ${Object.keys(statusIcons).map(status => `
        <span class="badge badge-light-${status} rounded-pill">
          <span class="material-symbols-outlined me-1" style="font-size: 16px;">${statusIcons[status]}</span>
          ${status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      `).join('')}
    </div>
  `
};

export const UsageExamples = {
  render: () => `
    <div class="d-flex flex-column gap-4">
      <div>
        <h6 class="mb-2">Status de Usuários</h6>
        <div class="d-flex gap-2">
          <span class="badge badge-light-success">
            <span class="material-symbols-outlined me-1" style="font-size: 16px;">check_circle</span>
            Ativo
          </span>
          <span class="badge badge-light-warning">
            <span class="material-symbols-outlined me-1" style="font-size: 16px;">schedule</span>
            Pendente
          </span>
          <span class="badge badge-light-danger">
            <span class="material-symbols-outlined me-1" style="font-size: 16px;">block</span>
            Bloqueado
          </span>
        </div>
      </div>
      
      <div>
        <h6 class="mb-2">Status de Pedidos</h6>
        <div class="d-flex gap-2">
          <span class="badge badge-light-info">
            <span class="material-symbols-outlined me-1" style="font-size: 16px;">shopping_cart</span>
            Novo
          </span>
          <span class="badge badge-light-warning">
            <span class="material-symbols-outlined me-1" style="font-size: 16px;">sync</span>
            Processando
          </span>
          <span class="badge badge-light-success">
            <span class="material-symbols-outlined me-1" style="font-size: 16px;">local_shipping</span>
            Enviado
          </span>
          <span class="badge badge-light-success">
            <span class="material-symbols-outlined me-1" style="font-size: 16px;">check_circle</span>
            Entregue
          </span>
        </div>
      </div>
      
      <div>
        <h6 class="mb-2">Categorias</h6>
        <div class="d-flex gap-2">
          <span class="badge badge-outline-primary rounded-pill">Frontend</span>
          <span class="badge badge-outline-secondary rounded-pill">Backend</span>
          <span class="badge badge-outline-info rounded-pill">DevOps</span>
          <span class="badge badge-outline-warning rounded-pill">Design</span>
        </div>
      </div>
    </div>
  `
};

// Documentação dos snippets
export const Documentation = {
  render: () => generateSnippetDocs('BadgeStatus')
};