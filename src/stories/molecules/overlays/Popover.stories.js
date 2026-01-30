/**
 * Popover - Molecule (Overlays)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.popover)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Overlay com título e conteúdo rico.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Overlays/Popover',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Popover

Overlay maior que tooltip, com suporte a título e conteúdo rico.

## Quando usar
- Informações detalhadas contextuais
- Mini cards informativos
- Ajuda contextual expandida
- Formulários inline pequenos
- Confirmações de ação

## Diferença entre Tooltip e Popover
- **Tooltip**: Texto curto, hover apenas, sem título
- **Popover**: Conteúdo rico, título, múltiplos triggers, HTML support

## Características
- Classes Bootstrap: \`.popover\`, \`.popover-header\`, \`.popover-body\`
- Posicionamento: Top, Right, Bottom, Left
- Trigger: Click, Hover, Focus, Manual
- Suporta HTML content
- Requer Bootstrap JavaScript

## Acessibilidade
- \`data-bs-title\` para título
- \`data-bs-content\` para conteúdo
- \`role="tooltip"\` automático
- Fechável via ESC
        `
      }
    }
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Posicionamento do popover',
      table: { defaultValue: { summary: 'right' } }
    },
    title: {
      control: 'text',
      description: 'Título do popover',
      table: { defaultValue: { summary: 'Popover title' } }
    },
    content: {
      control: 'text',
      description: 'Conteúdo do popover',
      table: { defaultValue: { summary: 'Popover content' } }
    },
    trigger: {
      control: { type: 'select' },
      options: ['click', 'hover', 'focus'],
      description: 'Tipo de ativação',
      table: { defaultValue: { summary: 'click' } }
    }
  }
};

const createPopover = ({ 
  placement = 'right', 
  title = 'Popover title', 
  content = 'And here\'s some amazing content. It\'s very engaging. Right?',
  trigger = 'click' 
}) => {
  return `<button type="button" class="btn btn-primary" 
  data-bs-toggle="popover" 
  data-bs-placement="${placement}" 
  data-bs-trigger="${trigger}"
  data-bs-title="${title}"
  data-bs-content="${content}">
  ${trigger === 'click' ? 'Click me' : trigger === 'hover' ? 'Hover me' : 'Focus me'}
</button>`;
};

const Template = (args) => {
  const markup = createPopover(args);
  
  return `
    <div style="padding: 150px; text-align: center;">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Popover').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-warning mt-3">
          <strong>Initialization Required:</strong>
          <pre class="mb-0"><code>// JavaScript
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(el => new bootstrap.Popover(el));</code></pre>
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Posicionamento</h5>
      <div class="d-flex justify-content-center align-items-center gap-3" style="padding: 150px 50px;">
        ${createPopover({ placement: 'top', title: 'Popover on top' })}
        ${createPopover({ placement: 'right', title: 'Popover on right' })}
        ${createPopover({ placement: 'bottom', title: 'Popover on bottom' })}
        ${createPopover({ placement: 'left', title: 'Popover on left' })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Diferentes Triggers</h5>
      <div class="d-flex justify-content-center gap-3" style="padding: 100px 0;">
        ${createPopover({ title: 'Click Trigger', content: 'This popover is triggered by click', trigger: 'click' })}
        ${createPopover({ title: 'Hover Trigger', content: 'This popover is triggered by hover', trigger: 'hover' })}
        ${createPopover({ title: 'Focus Trigger', content: 'This popover is triggered by focus', trigger: 'focus' })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Variantes de Botões</h5>
      <div class="d-flex justify-content-center gap-3" style="padding: 100px 0;">
        <button type="button" class="btn btn-success" 
          data-bs-toggle="popover" 
          data-bs-title="Success Popover"
          data-bs-content="This is a success styled button with popover">
          Success
        </button>
        <button type="button" class="btn btn-danger" 
          data-bs-toggle="popover" 
          data-bs-title="Delete Confirmation"
          data-bs-content="Are you sure you want to delete this item?">
          Delete
        </button>
        <button type="button" class="btn btn-warning" 
          data-bs-toggle="popover" 
          data-bs-title="Warning"
          data-bs-content="This action requires attention">
          Warning
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Popover em Ícones</h5>
      <div class="d-flex justify-content-center gap-3" style="padding: 100px 0;">
        <button type="button" class="btn btn-icon btn-label-primary" 
          data-bs-toggle="popover" 
          data-bs-placement="top"
          data-bs-title="Help"
          data-bs-content="Click here for more information about this feature">
          <i class="bx bx-help-circle"></i>
        </button>
        <button type="button" class="btn btn-icon btn-label-info" 
          data-bs-toggle="popover" 
          data-bs-placement="top"
          data-bs-title="Settings"
          data-bs-content="Configure your preferences here">
          <i class="bx bx-cog"></i>
        </button>
        <button type="button" class="btn btn-icon btn-label-secondary" 
          data-bs-toggle="popover" 
          data-bs-placement="top"
          data-bs-title="Notifications"
          data-bs-content="You have 5 new notifications">
          <i class="bx bx-bell"></i>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Conteúdo Rico (via JavaScript)</h5>
      <div class="text-center" style="padding: 100px 0;">
        <button type="button" class="btn btn-outline-primary" id="htmlPopover">
          Popover with HTML
        </button>
      </div>
      <small class="text-muted">Note: HTML popovers require <code>html: true</code> option and <code>data-bs-html="true"</code> attribute for custom HTML content.</small>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Popover em Card</h5>
      <div class="d-flex justify-content-center" style="padding: 50px 0;">
        <div class="card" style="width: 350px;">
          <div class="card-body">
            <h5 class="card-title">
              Product Information
              <button type="button" class="btn btn-sm btn-icon btn-label-secondary ms-2" 
                data-bs-toggle="popover" 
                data-bs-placement="right"
                data-bs-title="Additional Info"
                data-bs-content="This product is available in multiple colors and sizes. Free shipping on orders over $50.">
                <i class="bx bx-info-circle"></i>
              </button>
            </h5>
            <p class="card-text">Click the info icon to see more details about this product.</p>
            <a href="#" class="btn btn-primary">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle me-2"></i>
    <strong>JavaScript Required:</strong> Popovers require Bootstrap JavaScript and Popper.js. Initialize popovers with:
    <pre class="mt-2 mb-0"><code>const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
[...popoverTriggerList].map(el => new bootstrap.Popover(el));</code></pre>
  </div>
  
  <script>
    // Initialize popovers (Storybook context)
    if (typeof bootstrap !== 'undefined') {
      setTimeout(() => {
        const popovers = document.querySelectorAll('[data-bs-toggle="popover"]');
        popovers.forEach(el => {
          if (!bootstrap.Popover.getInstance(el)) {
            new bootstrap.Popover(el);
          }
        });
      }, 100);
    }
  </script>
`;

export const Default = Template.bind({});
Default.args = {
  placement: 'right',
  title: 'Popover title',
  content: 'And here\'s some amazing content. It\'s very engaging. Right?',
  trigger: 'click'
};

export const Top = Template.bind({});
Top.args = {
  ...Default.args,
  placement: 'top',
  title: 'Popover on top'
};

export const Bottom = Template.bind({});
Bottom.args = {
  ...Default.args,
  placement: 'bottom',
  title: 'Popover on bottom'
};

export const Left = Template.bind({});
Left.args = {
  ...Default.args,
  placement: 'left',
  title: 'Popover on left'
};

export const OnHover = Template.bind({});
OnHover.args = {
  ...Default.args,
  title: 'Hover to view',
  content: 'This popover appears on hover and disappears when you move away',
  trigger: 'hover'
};

export const Dismissible = Template.bind({});
Dismissible.args = {
  ...Default.args,
  title: 'Dismissible popover',
  content: 'Click outside or press ESC to close',
  trigger: 'focus'
};
