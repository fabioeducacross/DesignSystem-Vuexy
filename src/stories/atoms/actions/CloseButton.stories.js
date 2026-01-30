/**
 * CloseButton - Atom (Actions)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.btn-close)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Botão de fechar universal para modals, alerts, etc.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Actions/CloseButton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Close Button

Botão de fechar (X) usado em modals, alerts, toasts e outros componentes dismissíveis.

## Quando usar
- Fechar modals e dialogs
- Dismiss alerts e notifications
- Remover tags/chips
- Fechar offcanvas/sidebars

## Variantes
- **Default**: X branco em fundo escuro
- **White**: X preto em fundo claro
- **Disabled**: Estado não clicável

## Acessibilidade
- \`aria-label="Close"\` obrigatório
- \`data-bs-dismiss\` para integração Bootstrap
- Tamanho mínimo 44x44px (WCAG)
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'white'],
      description: 'Variante de cor',
      table: { defaultValue: { summary: 'default' } }
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
      table: { defaultValue: { summary: false } }
    },
    ariaLabel: {
      control: 'text',
      description: 'Label de acessibilidade',
      table: { defaultValue: { summary: 'Close' } }
    }
  }
};

const createCloseButton = ({ variant = 'default', disabled = false, ariaLabel = 'Close' }) => {
  const variantClass = variant === 'white' ? 'btn-close-white' : '';
  const disabledAttr = disabled ? 'disabled' : '';
  
  return `<button type="button" class="btn-close ${variantClass}" ${disabledAttr} aria-label="${ariaLabel}"></button>`;
};

const Template = (args) => {
  const markup = createCloseButton(args);
  
  return `
    <div class="p-4">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'CloseButton').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Variants</h5>
      <div class="d-flex gap-4 align-items-center">
        <div class="p-3 border rounded" style="background: #fff;">
          <strong>Default:</strong> ${createCloseButton({ variant: 'default' })}
        </div>
        <div class="p-3 rounded" style="background: #333;">
          <strong class="text-white">White:</strong> ${createCloseButton({ variant: 'white' })}
        </div>
        <div class="p-3 border rounded" style="background: #fff;">
          <strong>Disabled:</strong> ${createCloseButton({ variant: 'default', disabled: true })}
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>In Context</h5>
      <div class="alert alert-primary alert-dismissible fade show" role="alert">
        This is a dismissible alert with a close button.
        ${createCloseButton({ ariaLabel: 'Close alert' })}
      </div>
      
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Card with close</h5>
          ${createCloseButton({})}
        </div>
        <div class="card-body">
          Card content with close button in header.
        </div>
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  disabled: false,
  ariaLabel: 'Close'
};

export const White = Template.bind({});
White.args = {
  ...Default.args,
  variant: 'white'
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true
};
