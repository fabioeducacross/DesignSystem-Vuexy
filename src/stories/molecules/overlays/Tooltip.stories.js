/**
 * Tooltip - Molecule (Overlays)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.tooltip)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Overlay informativo que aparece ao hover.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Overlays/Tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Tooltip

Pequeno overlay informativo que aparece ao passar o mouse sobre um elemento.

## Quando usar
- Informações adicionais sobre um botão/ícone
- Dicas de uso (hints)
- Explicações breves
- Labels de ícones

## Características
- Classes Bootstrap: \`.tooltip\`, \`.tooltip-inner\`
- Posicionamento: Top, Right, Bottom, Left
- Ativação: Hover, Focus, Click
- Delay configurável
- Requer Bootstrap JavaScript

## Comportamento
- Aparece ao hover por padrão
- Esconde ao sair do elemento
- Posicionamento automático via Popper.js
- Acessível via teclado (focus)

## Acessibilidade
- \`title\` ou \`data-bs-title\` obrigatório
- \`aria-describedby\` automático
- Navegável por teclado
        `
      }
    }
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Posicionamento do tooltip',
      table: { defaultValue: { summary: 'top' } }
    },
    text: {
      control: 'text',
      description: 'Texto do tooltip',
      table: { defaultValue: { summary: 'Tooltip text' } }
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'focus', 'click', 'manual'],
      description: 'Tipo de ativação',
      table: { defaultValue: { summary: 'hover' } }
    }
  }
};

const createTooltip = ({ placement = 'top', text = 'Tooltip text', trigger = 'hover' }) => {
  return `<button type="button" class="btn btn-secondary" 
  data-bs-toggle="tooltip" 
  data-bs-placement="${placement}" 
  data-bs-trigger="${trigger}"
  data-bs-title="${text}">
  Hover me
</button>`;
};

const Template = (args) => {
  const markup = createTooltip(args);
  
  return `
    <div style="padding: 100px; text-align: center;">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Tooltip').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-warning mt-3">
          <strong>Initialization Required:</strong>
          <pre class="mb-0"><code>// JavaScript
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));</code></pre>
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Posicionamento</h5>
      <div class="d-flex justify-content-center align-items-center gap-3" style="padding: 100px 0;">
        ${createTooltip({ placement: 'top', text: 'Tooltip on top' })}
        ${createTooltip({ placement: 'right', text: 'Tooltip on right' })}
        ${createTooltip({ placement: 'bottom', text: 'Tooltip on bottom' })}
        ${createTooltip({ placement: 'left', text: 'Tooltip on left' })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Em Ícones</h5>
      <div class="d-flex justify-content-center gap-3" style="padding: 50px 0;">
        <button type="button" class="btn btn-icon btn-label-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">
          <i class="bx bx-edit"></i>
        </button>
        <button type="button" class="btn btn-icon btn-label-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">
          <i class="bx bx-trash"></i>
        </button>
        <button type="button" class="btn btn-icon btn-label-success" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Download">
          <i class="bx bx-download"></i>
        </button>
        <button type="button" class="btn btn-icon btn-label-info" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Share">
          <i class="bx bx-share-alt"></i>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Em Elementos Diversos</h5>
      <div class="d-flex justify-content-center align-items-center gap-4" style="padding: 50px 0;">
        <a href="#" class="badge bg-primary" data-bs-toggle="tooltip" data-bs-title="Badge with tooltip">
          Hover me
        </a>
        
        <span class="avatar avatar-sm" data-bs-toggle="tooltip" data-bs-title="John Doe">
          <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/1.png" alt="Avatar">
        </span>
        
        <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="This is a small button with a longer tooltip message">
          <i class="bx bx-info-circle"></i>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Trigger Types</h5>
      <div class="d-flex justify-content-center gap-3" style="padding: 50px 0;">
        ${createTooltip({ text: 'Hover tooltip (default)', trigger: 'hover' })}
        ${createTooltip({ text: 'Focus tooltip', trigger: 'focus' })}
        ${createTooltip({ text: 'Click tooltip', trigger: 'click' })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>HTML Content (via JavaScript)</h5>
      <div class="text-center" style="padding: 50px 0;">
        <button type="button" class="btn btn-primary" id="htmlTooltip">
          Tooltip with HTML
        </button>
      </div>
      <small class="text-muted">Note: HTML tooltips require additional JavaScript configuration with <code>html: true</code> option and <code>data-bs-html="true"</code> attribute.</small>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle me-2"></i>
    <strong>JavaScript Required:</strong> Tooltips require Bootstrap JavaScript and Popper.js. Initialize tooltips with:
    <pre class="mt-2 mb-0"><code>const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
[...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));</code></pre>
  </div>
  
  <script>
    // Initialize tooltips (Storybook context)
    if (typeof bootstrap !== 'undefined') {
      setTimeout(() => {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach(el => {
          if (!bootstrap.Tooltip.getInstance(el)) {
            new bootstrap.Tooltip(el);
          }
        });
      }, 100);
    }
  </script>
`;

export const Top = Template.bind({});
Top.args = {
  placement: 'top',
  text: 'Tooltip on top',
  trigger: 'hover'
};

export const Right = Template.bind({});
Right.args = {
  placement: 'right',
  text: 'Tooltip on right',
  trigger: 'hover'
};

export const Bottom = Template.bind({});
Bottom.args = {
  placement: 'bottom',
  text: 'Tooltip on bottom',
  trigger: 'hover'
};

export const Left = Template.bind({});
Left.args = {
  placement: 'left',
  text: 'Tooltip on left',
  trigger: 'hover'
};

export const OnClick = Template.bind({});
OnClick.args = {
  placement: 'top',
  text: 'Click tooltip',
  trigger: 'click'
};

/**
 * ====================================
 * INTERACTIVE STORY - Bootstrap JS Real
 * ====================================
 */

export const Interactive = {
  parameters: {
    docs: {
      description: {
        story: `
### Tooltips com Bootstrap JS Real

Demonstra tooltips funcionando com Bootstrap JS do Vuexy:

- ✅ **Hover** mostra tooltip automaticamente
- ✅ **Focus** mostra tooltip (acessibilidade via teclado)
- ✅ **4 Posicionamentos** (top, right, bottom, left) com ajuste automático
- ✅ **Multiple tooltips** na mesma página
- ✅ **HTML content** suportado

**Nota:** Esta implementação usa \`/vuexy/js/bootstrap.js\` oficial do Vuexy.

### Como testar:
1. Passe o mouse sobre os botões para ver tooltips
2. Use Tab para navegar e ver tooltips no focus
3. Observe o posicionamento automático
        `
      }
    }
  },
  loaders: [
    async () => {
      if (typeof window !== 'undefined' && !window.bootstrap) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = '/vuexy/js/bootstrap.js';
          script.onload = () => {
            console.log('✅ Bootstrap JS carregado para Tooltip');
            resolve({ bootstrapLoaded: true });
          };
          script.onerror = () => reject(new Error('Failed to load Bootstrap JS'));
          document.head.appendChild(script);
        });
      }
      return { bootstrapLoaded: true };
    }
  ],
  render: () => {
    setTimeout(() => {
      if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
      }
    }, 100);
    
    return `
      <div style="padding: 60px 20px;">
        <h5 class="text-center mb-4">Tooltips Interativos com Bootstrap JS</h5>
        
        <!-- Posicionamentos -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Posicionamento</h6>
          <div class="d-flex gap-3 justify-content-center flex-wrap">
            <button type="button" class="btn btn-primary" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="top" 
                    title="Tooltip no topo">
              <i class="ti ti-arrow-up"></i> Top
            </button>
            
            <button type="button" class="btn btn-secondary" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="right" 
                    title="Tooltip à direita">
              <i class="ti ti-arrow-right"></i> Right
            </button>
            
            <button type="button" class="btn btn-success" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="bottom" 
                    title="Tooltip embaixo">
              <i class="ti ti-arrow-down"></i> Bottom
            </button>
            
            <button type="button" class="btn btn-danger" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="left" 
                    title="Tooltip à esquerda">
              <i class="ti ti-arrow-left"></i> Left
            </button>
          </div>
        </div>
        
        <!-- Variantes de Cor -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Variantes de Botão</h6>
          <div class="d-flex gap-2 justify-content-center flex-wrap">
            <button type="button" class="btn btn-primary" 
                    data-bs-toggle="tooltip" 
                    title="Primary tooltip">
              Primary
            </button>
            
            <button type="button" class="btn btn-success" 
                    data-bs-toggle="tooltip" 
                    title="Success tooltip">
              Success
            </button>
            
            <button type="button" class="btn btn-warning" 
                    data-bs-toggle="tooltip" 
                    title="Warning tooltip">
              Warning
            </button>
            
            <button type="button" class="btn btn-danger" 
                    data-bs-toggle="tooltip" 
                    title="Danger tooltip">
              Danger
            </button>
            
            <button type="button" class="btn btn-info" 
                    data-bs-toggle="tooltip" 
                    title="Info tooltip">
              Info
            </button>
            
            <button type="button" class="btn btn-dark" 
                    data-bs-toggle="tooltip" 
                    title="Dark tooltip">
              Dark
            </button>
          </div>
        </div>
        
        <!-- Ícones com Tooltip -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Ícones com Tooltip</h6>
          <div class="d-flex gap-3 justify-content-center">
            <button type="button" class="btn btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" 
                    title="Editar">
              <i class="ti ti-edit"></i>
            </button>
            
            <button type="button" class="btn btn-icon btn-outline-danger" 
                    data-bs-toggle="tooltip" 
                    title="Excluir">
              <i class="ti ti-trash"></i>
            </button>
            
            <button type="button" class="btn btn-icon btn-outline-info" 
                    data-bs-toggle="tooltip" 
                    title="Informações">
              <i class="ti ti-info-circle"></i>
            </button>
            
            <button type="button" class="btn btn-icon btn-outline-success" 
                    data-bs-toggle="tooltip" 
                    title="Download">
              <i class="ti ti-download"></i>
            </button>
            
            <button type="button" class="btn btn-icon btn-outline-secondary" 
                    data-bs-toggle="tooltip" 
                    title="Configurações">
              <i class="ti ti-settings"></i>
            </button>
          </div>
        </div>
        
        <!-- HTML Content -->
        <div class="text-center mb-4">
          <h6 class="mb-3">Tooltip com HTML</h6>
          <button type="button" class="btn btn-primary" 
                  data-bs-toggle="tooltip" 
                  data-bs-html="true"
                  title="<strong>Bold text</strong><br><em>Italic text</em><br><u>Underlined</u>">
            HTML Tooltip
          </button>
        </div>
        
        <div class="alert alert-info" role="alert">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Mouse:</strong> Passe o mouse sobre os botões para ver os tooltips</li>
            <li><strong>Teclado:</strong> Use Tab para navegar e ver tooltips aparecerem no focus</li>
            <li><strong>Posicionamento:</strong> Observe como os tooltips se ajustam automaticamente quando próximos às bordas</li>
            <li><strong>HTML:</strong> O último botão mostra que tooltips suportam conteúdo HTML</li>
          </ul>
        </div>
      </div>
    `;
  }
};
