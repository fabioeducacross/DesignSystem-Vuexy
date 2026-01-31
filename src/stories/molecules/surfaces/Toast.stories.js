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
    <button type="button" class="btn-close btn-close-white ms-2" onclick="this.closest('.toast').style.opacity='0'; setTimeout(() => this.closest('.toast').remove(), 300)" aria-label="Close"></button>
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

// Interactive Demo
export const Interactive = () => {
  const containerId = 'toast-interactive-' + Math.random().toString(36).substr(2, 9);
  
  const markup = `
    <div id="${containerId}">
      <div class="alert alert-info mb-3" style="max-width: 600px;">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Click buttons to show toasts in different positions.
      </div>
      
      <div class="card" style="max-width: 600px;">
        <div class="card-body">
          <h5 class="card-title">Toast Notifications</h5>
          
          <div class="mb-3">
            <h6>Trigger Toasts</h6>
            <div class="d-flex flex-wrap gap-2">
              <button class="btn btn-success btn-sm" data-toast="success">
                <i class="bx bx-check me-1"></i> Success
              </button>
              <button class="btn btn-danger btn-sm" data-toast="error">
                <i class="bx bx-x me-1"></i> Error
              </button>
              <button class="btn btn-warning btn-sm" data-toast="warning">
                <i class="bx bx-error me-1"></i> Warning
              </button>
              <button class="btn btn-info btn-sm" data-toast="info">
                <i class="bx bx-info-circle me-1"></i> Info
              </button>
            </div>
          </div>
          
          <div class="mb-3">
            <h6>Position</h6>
            <select class="form-select form-select-sm" id="position-${containerId}" style="max-width: 200px;">
              <option value="top-right">Top Right</option>
              <option value="top-left">Top Left</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-center">Top Center</option>
            </select>
          </div>
          
          <div>
            <small class="text-muted">Toasts shown: <span id="toast-count-${containerId}" class="badge bg-primary">0</span></small>
          </div>
        </div>
      </div>
      
      <!-- Toast containers -->
      <div id="toast-container-top-right" class="toast-container position-fixed top-0 end-0 p-3"></div>
      <div id="toast-container-top-left" class="toast-container position-fixed top-0 start-0 p-3"></div>
      <div id="toast-container-bottom-right" class="toast-container position-fixed bottom-0 end-0 p-3"></div>
      <div id="toast-container-bottom-left" class="toast-container position-fixed bottom-0 start-0 p-3"></div>
      <div id="toast-container-top-center" class="toast-container position-fixed top-0 start-50 translate-middle-x p-3"></div>
    </div>
  `;
  
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const buttons = container.querySelectorAll('[data-toast]');
    const positionSelect = container.querySelector(`#position-${containerId}`);
    const countBadge = container.querySelector(`#toast-count-${containerId}`);
    
    let toastCount = 0;
    
    const showToast = (variant, title, message, icon) => {
      toastCount++;
      countBadge.textContent = toastCount;
      
      const position = positionSelect.value;
      const toastContainer = document.getElementById(`toast-container-${position}`);
      
      const toastId = 'toast-' + Math.random().toString(36).substr(2, 9);
      const variantClass = `bg-${variant} text-white`;
      
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.id = toastId;
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'assertive');
      toast.setAttribute('aria-atomic', 'true');
      
      toast.innerHTML = `
        <div class="toast-header ${variantClass}">
          <i class="${icon} me-2"></i>
          <strong class="me-auto">${title}</strong>
          <small class="text-white-50">just now</small>
          <button type="button" class="btn-close btn-close-white ms-2" onclick="this.closest('.toast').style.opacity='0'; setTimeout(() => this.closest('.toast').remove(), 300)" aria-label="Close"></button>
        </div>
        <div class="toast-body ${variantClass}">
          ${message}
        </div>
      `;
      
      toastContainer.appendChild(toast);
      
      // Show toast
      setTimeout(() => {
        toast.classList.add('show');
      }, 10);
      
      // Close button handler
      const closeBtn = toast.querySelector('.btn-close');
      closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      });
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 5000);
    };
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const toastType = e.currentTarget.getAttribute('data-toast');
        
        const toastConfigs = {
          success: {
            variant: 'success',
            title: 'Success!',
            message: 'Your operation completed successfully.',
            icon: 'bx bx-check'
          },
          error: {
            variant: 'danger',
            title: 'Error!',
            message: 'Something went wrong. Please try again.',
            icon: 'bx bx-x'
          },
          warning: {
            variant: 'warning',
            title: 'Warning',
            message: 'Please review your information.',
            icon: 'bx bx-error'
          },
          info: {
            variant: 'info',
            title: 'Information',
            message: 'Here\'s some helpful information.',
            icon: 'bx bx-info-circle'
          }
        };
        
        const config = toastConfigs[toastType];
        if (config) {
          showToast(config.variant, config.title, config.message, config.icon);
        }
      });
    });
    
  }, 100);
  
  return markup;
};

Interactive.parameters = {
  docs: {
    description: {
      story: `
**Interactive Demo:** Toasts dinâmicos com múltiplas posições e auto-hide.

Funcionalidades:
- 4 tipos de toast (success, error, warning, info)
- 5 posições disponíveis (top-right, top-left, bottom-right, bottom-left, top-center)
- Auto-hide após 5 segundos
- Close manual com botão X
- Contador de toasts exibidos
- Stacking automático de múltiplos toasts

**Posicionamento:** Toasts aparecem em containers fixos e se empilham verticalmente.
      `
    }
  }
};
