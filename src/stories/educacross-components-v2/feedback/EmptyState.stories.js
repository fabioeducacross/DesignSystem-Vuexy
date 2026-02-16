import { createOverviewGrid, generateSnippetDocs } from '../../_helpers/snippets';

const renderEmptyState = (args) => {
  const iconEl = args.icon
    ? `<div class="text-primary mb-2"><i class="bi ${args.icon}" style="font-size: 32px;"></i></div>`
    : '';

  const actionEl = args.showAction
    ? `<button class="btn btn-primary">${args.actionLabel}</button>`
    : '';

  return `
    <div class="d-flex flex-column align-items-center text-center p-4 gap-2 bg-light rounded">
      ${iconEl}
      <h5 class="mb-1">${args.title}</h5>
      <p class="text-muted mb-2">${args.description}</p>
      ${actionEl}
    </div>
  `;
};

export default {
  title: 'Educacross Components V2/Feedback/EmptyState',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título exibido no estado vazio.',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Descrição complementar.',
      table: { category: 'Content' },
    },
    icon: {
      control: 'text',
      description: 'Classe do ícone (Bootstrap Icons).',
      table: { category: 'Appearance' },
    },
    showAction: {
      control: 'boolean',
      description: 'Exibe botão de ação.',
      table: { category: 'Appearance' },
    },
    actionLabel: {
      control: 'text',
      description: 'Texto do botão de ação.',
      table: { category: 'Content' },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente para exibição de estados vazios com mensagem e ação opcional.',
      },
    },
  },
};

export const Default = {
  args: {
    title: 'Nenhum resultado encontrado',
    description: 'Tente ajustar os filtros ou criar um novo item.',
    icon: 'bi-inbox',
    showAction: true,
    actionLabel: 'Criar novo',
  },
  render: renderEmptyState,
};

export const Variants = {
  render: () => {
    const variants = [
      { title: 'Sem dados', description: 'Nenhum dado disponível.', icon: 'bi-database', showAction: false },
      { title: 'Sem resultados', description: 'A busca não retornou resultados.', icon: 'bi-search', showAction: true, actionLabel: 'Limpar filtros' },
      { title: 'Erro de carregamento', description: 'Não foi possível carregar os dados.', icon: 'bi-exclamation-triangle', showAction: true, actionLabel: 'Tentar novamente' },
    ];

    const items = variants.map((v) => ({
      title: v.title,
      content: renderEmptyState(v),
    }));

    return createOverviewGrid(items);
  },
};

export const Snippets = {
  render: () =>
    generateSnippetDocs({
      componentName: 'EmptyState',
      htmlExample: `<div class="d-flex flex-column align-items-center text-center p-4 gap-2 bg-light rounded">
  <div class="text-primary mb-2"><i class="bi bi-inbox" style="font-size: 32px;"></i></div>
  <h5 class="mb-1">Nenhum resultado</h5>
  <p class="text-muted mb-2">Tente ajustar os filtros.</p>
  <button class="btn btn-primary">Criar novo</button>
</div>`,
      vueExample: `<EmptyState
  title="Nenhum resultado"
  description="Tente ajustar os filtros."
  icon="bi-inbox"
  :showAction="true"
  actionLabel="Criar novo"
/>`,
      reactExample: `<EmptyState
  title="Nenhum resultado"
  description="Tente ajustar os filtros."
  icon="bi-inbox"
  showAction={true}
  actionLabel="Criar novo"
/>`,
    }),
};
