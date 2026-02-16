import { createOverviewGrid, generateSnippetDocs } from '../../_helpers/snippets';

const sizes = ['sm', 'md', 'lg'];
const variants = ['primary', 'secondary', 'success', 'danger'];

export default {
  title: 'Educacross Components V2/Actions/ExportExcelButton',
  tags: ['autodocs'],
  args: {
    label: 'Exportar para Excel',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: variants },
    size: { control: 'select', options: sizes },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Botão padrão para exportação de dados em Excel, utilizado em tabelas e relatórios.',
      },
      source: {
        code: generateSnippetDocs({ component: 'ExportExcelButton' }),
      },
    },
  },
};

const baseClasses = ({ variant, size, disabled }) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const disabledClass = disabled ? 'disabled' : '';
  return ['btn', variantClass, sizeClass, disabledClass].filter(Boolean).join(' ');
};

const renderButton = (args) => `
  <button type="button" class="${baseClasses(args)}">
    <i class="bi bi-file-earmark-excel me-2"></i>
    ${args.label}
  </button>
`;

export const Default = {
  render: (args) => renderButton(args),
};

export const Variants = {
  render: (args) =>
    createOverviewGrid(
      variants.map((variant) => ({
        label: variant,
        content: renderButton({ ...args, variant }),
      })),
    ),
};

export const Sizes = {
  render: (args) =>
    createOverviewGrid(
      sizes.map((size) => ({
        label: size,
        content: renderButton({ ...args, size }),
      })),
    ),
};

export const Disabled = {
  args: { disabled: true },
  render: (args) => renderButton({ ...args, disabled: true }),
};
