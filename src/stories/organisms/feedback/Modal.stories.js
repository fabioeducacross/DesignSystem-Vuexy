/**
 * Modal - Organism (Feedback)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.modal, .modal-dialog, .modal-content)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 * 
 * Dialog modal completo do Bootstrap 5 com overlay e múltiplos tamanhos.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Feedback/Modal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Modal

Dialog modal do Vuexy para exibir conteúdo em overlay.

## Quando usar
- Confirmações importantes
- Formulários que precisam de foco
- Detalhes adicionais sem sair da página
- Alertas críticos

## Composição
- **Backdrop** - Overlay escuro (.modal-backdrop)
- **Dialog** - Container do modal (.modal-dialog)
- **Header** - Título e botão fechar
- **Body** - Conteúdo principal
- **Footer** - Ações (botões)

## Tamanhos
- Small: .modal-sm (300px)
- Default: sem classe (500px)
- Large: .modal-lg (800px)
- Extra Large: .modal-xl (1140px)
- Fullscreen: .modal-fullscreen

## Acessibilidade
- \`role="dialog"\` no modal
- \`aria-labelledby\` aponta para o título
- \`aria-hidden="true"\` quando fechado
- Foco automático no abrir
- ESC fecha o modal
        `
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Estado do modal (aberto/fechado)',
      table: { defaultValue: { summary: false } }
    },
    title: {
      control: 'text',
      description: 'Título do modal',
      table: { defaultValue: { summary: 'Modal Title' } }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'fullscreen'],
      description: 'Tamanho do modal',
      table: { defaultValue: { summary: 'md' } }
    },
    centered: {
      control: 'boolean',
      description: 'Centraliza verticalmente',
      table: { defaultValue: { summary: false } }
    },
    scrollable: {
      control: 'boolean',
      description: 'Habilita scroll no body',
      table: { defaultValue: { summary: false } }
    },
    showFooter: {
      control: 'boolean',
      description: 'Mostra footer com botões',
      table: { defaultValue: { summary: true } }
    }
  }
};

const createModal = ({ 
  isOpen = false, 
  title = 'Modal Title', 
  size = 'md',
  centered = false,
  scrollable = false,
  showFooter = true
}) => {
  const sizeClass = size !== 'md' ? `modal-${size}` : '';
  const centeredClass = centered ? 'modal-dialog-centered' : '';
  const scrollableClass = scrollable ? 'modal-dialog-scrollable' : '';
  const displayStyle = isOpen ? 'display: block;' : 'display: none;';
  const backdropHtml = isOpen ? '<div class="modal-backdrop fade show"></div>' : '';
  
  const footerHtml = showFooter ? `
    <div class="modal-footer">
      <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary">Save changes</button>
    </div>` : '';
  
  return `${backdropHtml}
<div class="modal fade ${isOpen ? 'show' : ''}" 
     id="exampleModal" 
     tabindex="-1" 
     aria-labelledby="exampleModalLabel" 
     aria-hidden="${!isOpen}" 
     style="${displayStyle}">
  <div class="modal-dialog ${sizeClass} ${centeredClass} ${scrollableClass}">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
        <p>This is a modal dialog. It overlays the page content and requires user interaction before returning to the main content.</p>
        
        <div class="mb-3">
          <label for="modalInput" class="form-label">Example Input</label>
          <input type="text" class="form-control" id="modalInput" placeholder="Enter something...">
        </div>
        
        <div class="alert alert-info" role="alert">
          <div class="alert-body">
            <i class="bx bx-info-circle me-2"></i>
            Modal content can include any components: forms, cards, alerts, etc.
          </div>
        </div>
        
        ${scrollable ? `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        ` : ''}
      </div>
      
      ${footerHtml}
    </div>
  </div>
</div>`;
};

const Template = (args) => {
  const markup = createModal(args);
  
  return `
    <div>
      ${args.isOpen ? '' : `
        <button type="button" class="btn btn-primary" onclick="alert('In Storybook, use controls to toggle isOpen')">
          Open Modal (use controls)
        </button>
      `}
      
      ${markup}
    </div>
    
    <div class="mt-4">
      <p class="text-muted"><strong>Nota:</strong> Modal requer Bootstrap JS para funcionar. Use o control "isOpen" acima para visualizar.</p>
      ${args.isOpen ? '<p class="text-success"><strong>✓ Modal aberto</strong> - Clique no backdrop ou ESC para fechar (funcional apenas com JS)</p>' : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>${formatVue3Snippet(markup, 'Modal').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Sizes</h5>
      <div class="d-flex gap-2 mb-4">
        <button class="btn btn-sm btn-outline-primary">Small Modal</button>
        <button class="btn btn-sm btn-outline-primary">Default Modal</button>
        <button class="btn btn-sm btn-outline-primary">Large Modal</button>
        <button class="btn btn-sm btn-outline-primary">XL Modal</button>
      </div>
      <p class="text-muted"><small>Use os controles acima para visualizar cada tamanho com isOpen=true</small></p>
    </div>
    
    <div class="col-6">
      <h5>Small</h5>
      <div style="transform: scale(0.6); transform-origin: top left; width: 166%; height: 400px; overflow: hidden;">
        ${createModal({ isOpen: true, title: 'Small Modal', size: 'sm' })}
      </div>
    </div>
    
    <div class="col-6">
      <h5>Default</h5>
      <div style="transform: scale(0.6); transform-origin: top left; width: 166%; height: 400px; overflow: hidden;">
        ${createModal({ isOpen: true, title: 'Default Modal', size: 'md' })}
      </div>
    </div>
    
    <div class="col-6">
      <h5>Large</h5>
      <div style="transform: scale(0.5); transform-origin: top left; width: 200%; height: 400px; overflow: hidden;">
        ${createModal({ isOpen: true, title: 'Large Modal', size: 'lg' })}
      </div>
    </div>
    
    <div class="col-6">
      <h5>Centered</h5>
      <div style="transform: scale(0.6); transform-origin: top left; width: 166%; height: 400px; overflow: hidden;">
        ${createModal({ isOpen: true, title: 'Centered Modal', centered: true })}
      </div>
    </div>
  </div>
`;

export const Closed = Template.bind({});
Closed.args = {
  isOpen: false,
  title: 'My Modal',
  size: 'md',
  centered: false,
  scrollable: false,
  showFooter: true
};

export const Open = Template.bind({});
Open.args = {
  ...Closed.args,
  isOpen: true
};

export const OpenLarge = Template.bind({});
OpenLarge.args = {
  ...Open.args,
  size: 'lg',
  title: 'Large Modal Dialog'
};

export const Centered = Template.bind({});
Centered.args = {
  ...Open.args,
  centered: true,
  title: 'Centered Modal'
};

export const Scrollable = Template.bind({});
Scrollable.args = {
  ...Open.args,
  scrollable: true,
  title: 'Scrollable Modal'
};

export const NoFooter = Template.bind({});
NoFooter.args = {
  ...Open.args,
  showFooter: false,
  title: 'Modal Without Footer'
};

// ============ INTERACTIVE DEMO ============
export const Interactive = () => {
  const containerId = 'modal-interactive-' + Math.random().toString(36).substr(2, 9);
  
  const markup = `
    <div id="${containerId}">
      <button class="btn btn-primary" data-action="open-modal">
        <i class="bx bx-plus me-1"></i> Open Modal
      </button>
      
      <!-- Modal -->
      <div class="modal fade" data-modal-element tabindex="-1" style="display: none;" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Interactive Modal</h5>
              <button type="button" class="btn-close" data-action="close-modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>This is an interactive modal demo. You can:</p>
              <ul>
                <li>Click the "Open Modal" button to open</li>
                <li>Click the X button to close</li>
                <li>Click the "Close" button to close</li>
                <li>Click outside the modal to close (backdrop is dismissible)</li>
              </ul>
              <div class="alert alert-primary mt-3" role="alert">
                <div class="alert-body">
                  <i class="bx bx-info-circle me-2"></i>
                  All interactions are handled via Storybook state without external scripts.
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-action="close-modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Backdrop -->
      <div class="modal-backdrop fade" data-modal-backdrop style="display: none;"></div>
    </div>
  `;
  
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const openBtn = container.querySelector('[data-action="open-modal"]');
    const closeButtons = container.querySelectorAll('[data-action="close-modal"]');
    const modal = container.querySelector('[data-modal-element]');
    const backdrop = container.querySelector('[data-modal-backdrop]');
    
    const openModal = () => {
      modal.style.display = 'block';
      backdrop.style.display = 'block';
      
      setTimeout(() => {
        modal.classList.add('show');
        backdrop.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
      }, 10);
    };
    
    const closeModal = () => {
      modal.classList.remove('show');
      backdrop.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      
      setTimeout(() => {
        modal.style.display = 'none';
        backdrop.style.display = 'none';
      }, 300);
    };
    
    openBtn.addEventListener('click', openModal);
    
    closeButtons.forEach(btn => {
      btn.addEventListener('click', closeModal);
    });
    
    // Click outside to close (dismissible)
    backdrop.addEventListener('click', closeModal);
    
    // Keyboard support: Escape to close
    const handleKeydown = (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    };
    
    document.addEventListener('keydown', handleKeydown);
    
    // Cleanup
    container._cleanup = () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, 100);
  
  return markup;
};
Interactive.parameters = {
  docs: {
    description: {
      story: 'Interactive modal with open/close functionality, dismissible backdrop, and **Escape key** support for closing.'
    }
  }
};
