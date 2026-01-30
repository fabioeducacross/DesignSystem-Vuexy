/**
 * Toast - Molecule (Surfaces)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.toast)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 */

import { formatHtmlSnippet, formatReactSnippet } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Surfaces/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Toast

Notificação flutuante temporária do Vuexy para feedback instantâneo de ações.

## Quando usar
- Confirmação de ações (salvo, deletado, etc)
- Notificações em tempo real
- Feedback não crítico

## Posições
- **top-right**: canto superior direito (padrão)
- **top-left**: canto superior esquerdo
- **bottom-right**: canto inferior direito
- **bottom-left**: canto inferior esquerdo
- **top-center**: topo centralizado

## Variantes
- Success, Danger, Warning, Info, Primary
        `
      }
    }
  },
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['primary', 'success', 'danger', 'warning', 'info'],
      description: 'Cor do toast',
      table: { defaultValue: { summary: 'success' } }
    },
    title: { 
      control: 'text',
      description: 'Título do toast',
      table: { defaultValue: { summary: '' } }
    },
    message: { 
      control: 'text',
      description: 'Mensagem do toast',
      table: { defaultValue: { summary: '' } }
    },
    icon: { 
      control: 'text',
      description: 'Ícone (ex: bx bx-check)',
      table: { defaultValue: { summary: '' } }
    },
    show: { 
      control: 'boolean',
      description: 'Mostra toast',
      table: { defaultValue: { summary: true } }
    }
  }
};

const createToast = ({ variant = 'success', title = 'Notification', message = '', icon = '', show = true }) => {
  const variantClass = `bg-${variant} text-white`;
  const showClass = show ? 'show' : '';
  const iconHtml = icon ? `<i class="${icon} me-2"></i>` : '';

  return `<div class="toast ${showClass}" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header ${variantClass}">
    ${iconHtml}
    <strong class="me-auto">${title}</strong>
    <small class="text-white-50">just now</small>
    <button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    ${message}
  </div>
</div>`;
};

const Template = (args) => {
  const markup = createToast(args);
  
  return `
    <div style="min-height: 200px; position: relative;">
      <div style="position: absolute; top: 1rem; right: 1rem;">
        ${markup}
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Toast').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-3">
    <div class="col-12">
      <h5>Cores</h5>
      <div class="d-flex flex-wrap gap-3">
        ${createToast({ variant: 'success', title: 'Success', message: 'Operation completed successfully!', icon: 'bx bx-check' })}
        ${createToast({ variant: 'danger', title: 'Error', message: 'An error occurred. Please try again.', icon: 'bx bx-x' })}
        ${createToast({ variant: 'warning', title: 'Warning', message: 'Please review your information.', icon: 'bx bx-error' })}
        ${createToast({ variant: 'info', title: 'Info', message: 'Here’s some information for you.', icon: 'bx bx-info-circle' })}
        ${createToast({ variant: 'primary', title: 'Notification', message: 'You have a new message.', icon: 'bx bx-bell' })}
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  variant: 'success',
  title: 'Success!',
  message: 'Your changes have been saved.',
  icon: 'bx bx-check',
  show: true
};

export const Error = Template.bind({});
Error.args = {
  variant: 'danger',
  title: 'Error!',
  message: 'Something went wrong. Please try again.',
  icon: 'bx bx-x',
  show: true
};
