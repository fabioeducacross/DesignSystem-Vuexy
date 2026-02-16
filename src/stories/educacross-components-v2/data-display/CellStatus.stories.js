import { createOverviewGrid, generateSnippetDocs } from '../../_helpers/snippets';

const statusConfig = {
  ativo: { label: 'Ativo', color: 'success', icon: 'bi-check-circle-fill' },
  inativo: { label: 'Inativo', color: 'secondary', icon: 'bi-x-circle-fill' },
  pendente: { label: 'Pendente', color: 'warning', icon: 'bi-clock-fill' },
  aprovado: { label: 'Aprovado', color: 'success', icon: 'bi-check-lg' },
  rejeitado: { label: 'Rejeitado', color: 'danger', icon: 'bi-x-lg' },
  processando: { label: 'Processando', color: 'info', icon: 'bi-arrow-repeat' },
};

const renderStatus = (args) => {
  const config = statusConfig[args.status] || statusConfig.ativo;

  if (args.variant === 'icon') {
    return `<i class="bi ${config.icon} text-${config.color}" title="${config.label}"></i>`;
  }

  if (args.variant === 'text') {
    return `<span class="text-${config.color}">${config.label}</span>`;
  }

  return `<span class="badge bg-${config.color}">${config.label}</span>`;
};

export default {
  title: 'Educacross Components V2/Data Display/CellStatus',
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: Object.keys(statusConfig),
      description: 'Status a ser exibido.',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: ['badge', 'icon', 'text'],
      description: 'Variante de exibição do status.',
      table: { category: 'Appearance' },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente para exibição de status em células de tabela.',
      },
    },
  },
};

export const Default = {
  args: {
    status: 'ativo',
    variant: 'badge',
  },
  render: renderStatus,
};

export const AllStatuses = {
  render: () => {
    const items = Object.keys(statusConfig).map((status) => ({
      title: statusConfig[status].label,
      content: renderStatus({ status, variant: 'badge' }),
    }));
    return createOverviewGrid(items);
  },
};

export const Variants = {
  render: () => {
    const variants = ['badge', 'icon', 'text'];
    const items = variants.map((variant) => ({
      title: variant,
      content: renderStatus({ status: 'ativo', variant }),
    }));
    return createOverviewGrid(items);
  },
};

export const TableExample = {
  render: () => `
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Item 1</td>
          <td>${renderStatus({ status: 'ativo', variant: 'badge' })}</td>
        </tr>
        <tr>
          <td>Item 2</td>
          <td>${renderStatus({ status: 'pendente', variant: 'badge' })}</td>
        </tr>
        <tr>
          <td>Item 3</td>
          <td>${renderStatus({ status: 'inativo', variant: 'badge' })}</td>
        </tr>
      </tbody>
    </table>
  `,
};

export const Snippets = {
  render: () =>
    generateSnippetDocs({
      componentName: 'CellStatus',
      htmlExample: `<span class="badge bg-success">Ativo</span>`,
      vueExample: `<CellStatus status="ativo" variant="badge" />`,
      reactExample: `<CellStatus status="ativo" variant="badge" />`,
    }),
};
