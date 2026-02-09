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
  title: 'Vuexy/Molecules/Overlays/Popover',
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
### Popovers com Bootstrap JS Real

Demonstra popovers funcionando com Bootstrap JS do Vuexy:

- ✅ **Click** para abrir/fechar popover
- ✅ **Dismiss on next click** - fecha ao clicar fora
- ✅ **4 Posicionamentos** (top, right, bottom, left) com ajuste automático
- ✅ **Title + Content** ricos
- ✅ **HTML content** suportado
- ✅ **Hover trigger** opcional
- ✅ **Multiple popovers** na mesma página

**Nota:** Esta implementação usa \`/vuexy/js/bootstrap.js\` oficial do Vuexy com Popper.js integrado.

### Como testar:
1. Clique nos botões para abrir popovers
2. Clique fora ou no botão novamente para fechar
3. Teste os diferentes posicionamentos
4. Observe o ajuste automático nas bordas
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
            console.log('✅ Bootstrap JS carregado para Popover');
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
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
      }
    }, 100);
    
    return `
      <div style="padding: 80px 20px;">
        <h5 class="text-center mb-4">Popovers Interativos com Bootstrap JS</h5>
        
        <!-- Posicionamentos -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Posicionamento (Click para abrir)</h6>
          <div class="d-flex gap-3 justify-content-center flex-wrap">
            <button type="button" class="btn btn-primary" 
                    data-bs-toggle="popover" 
                    data-bs-placement="top"
                    data-bs-title="Top Popover"
                    data-bs-content="Este popover está posicionado no topo. Clique fora para fechar.">
              <i class="ti tabler-arrow-up"></i> Top
            </button>
            
            <button type="button" class="btn btn-secondary" 
                    data-bs-toggle="popover" 
                    data-bs-placement="right"
                    data-bs-title="Right Popover"
                    data-bs-content="Este popover está à direita. O posicionamento se ajusta automaticamente nas bordas.">
              <i class="ti tabler-arrow-right"></i> Right
            </button>
            
            <button type="button" class="btn btn-success" 
                    data-bs-toggle="popover" 
                    data-bs-placement="bottom"
                    data-bs-title="Bottom Popover"
                    data-bs-content="Popover embaixo do botão. Perfeito para informações adicionais.">
              <i class="ti tabler-arrow-down"></i> Bottom
            </button>
            
            <button type="button" class="btn btn-danger" 
                    data-bs-toggle="popover" 
                    data-bs-placement="left"
                    data-bs-title="Left Popover"
                    data-bs-content="Este popover aparece à esquerda do elemento trigger.">
              <i class="ti tabler-arrow-left"></i> Left
            </button>
          </div>
        </div>
        
        <!-- Variantes de Uso -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Casos de Uso Comuns</h6>
          <div class="d-flex gap-3 justify-content-center flex-wrap">
            <button type="button" class="btn btn-outline-info" 
                    data-bs-toggle="popover" 
                    data-bs-title="ℹ️ Ajuda"
                    data-bs-content="Use popovers para fornecer contexto ou ajuda adicional aos usuários sem poluir a interface.">
              <i class="ti tabler-help-circle me-1"></i> Help
            </button>
            
            <button type="button" class="btn btn-outline-success" 
                    data-bs-toggle="popover" 
                    data-bs-title="✅ Dica"
                    data-bs-content="Popovers são ideais para dicas (hints) que aparecem sob demanda, sem ocupar espaço permanentemente.">
              <i class="ti tabler-bulb me-1"></i> Tips
            </button>
            
            <button type="button" class="btn btn-outline-warning" 
                    data-bs-toggle="popover" 
                    data-bs-title="⚠️ Atenção"
                    data-bs-content="Use popovers para avisos ou informações importantes que o usuário deve ler antes de continuar.">
              <i class="ti tabler-alert-triangle me-1"></i> Warning
            </button>
            
            <button type="button" class="btn btn-outline-secondary" 
                    data-bs-toggle="popover" 
                    data-bs-title="📋 Detalhes"
                    data-bs-content="Popovers podem mostrar informações detalhadas sobre um item sem navegar para outra página.">
              <i class="ti tabler-info-circle me-1"></i> Details
            </button>
          </div>
        </div>
        
        <!-- Conteúdo Rico -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Popover com Conteúdo Extenso</h6>
          <button type="button" class="btn btn-primary" 
                  data-bs-toggle="popover" 
                  data-bs-placement="bottom"
                  data-bs-title="📖 Informações do Produto"
                  data-bs-content="Este produto possui múltiplas características: disponível em 5 cores diferentes, 3 tamanhos (P, M, G), entrega grátis para compras acima de R$ 100, garantia de 12 meses, e suporte técnico 24/7. Aproveite 15% de desconto na primeira compra!">
            <i class="ti tabler-shopping-cart me-1"></i> Ver Detalhes
          </button>
        </div>
        
        <!-- HTML Content -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Popover com HTML</h6>
          <button type="button" class="btn btn-info" 
                  data-bs-toggle="popover" 
                  data-bs-html="true"
                  data-bs-title="<strong>🎨 Formatação HTML</strong>"
                  data-bs-content="<ul class='mb-0 ps-3'><li><strong>Bold text</strong></li><li><em>Italic text</em></li><li><u>Underlined text</u></li><li><code>Code snippet</code></li></ul>">
            <i class="ti tabler-code me-1"></i> HTML Content
          </button>
        </div>
        
        <!-- Hover Trigger -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Trigger no Hover (passa o mouse)</h6>
          <button type="button" class="btn btn-outline-primary" 
                  data-bs-toggle="popover" 
                  data-bs-trigger="hover"
                  data-bs-title="Hover Popover"
                  data-bs-content="Este popover aparece ao passar o mouse e desaparece quando você sai. Similar a um tooltip, mas com mais conteúdo.">
            <i class="ti tabler-cursor me-1"></i> Hover Me
          </button>
        </div>
        
        <!-- Focus Trigger (Dismissible) -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Dismissible (Fecha ao perder foco)</h6>
          <button type="button" class="btn btn-outline-danger" 
                  data-bs-toggle="popover" 
                  data-bs-trigger="focus"
                  tabindex="0"
                  data-bs-title="🔒 Dismissible"
                  data-bs-content="Este popover fecha automaticamente quando você clica fora ou pressiona Tab. Perfeito para formulários e validações.">
            <i class="ti tabler-click me-1"></i> Click & Dismiss
          </button>
        </div>
        
        <!-- Em Card -->
        <div class="row justify-content-center mb-4">
          <div class="col-md-6">
            <h6 class="text-center mb-3">Popover em Card</h6>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title d-flex align-items-center">
                  Product Information
                  <button type="button" class="btn btn-sm btn-icon btn-label-info ms-2" 
                          data-bs-toggle="popover" 
                          data-bs-placement="right"
                          data-bs-title="ℹ️ Informações Adicionais"
                          data-bs-content="Este produto está disponível em múltiplas cores e tamanhos. Frete grátis para compras acima de R$ 100. Garantia de 30 dias.">
                    <i class="ti tabler-info-circle"></i>
                  </button>
                </h5>
                <p class="card-text">
                  Clique no ícone de informação para ver mais detalhes sobre este produto.
                </p>
                <div class="d-flex gap-2">
                  <button class="btn btn-primary btn-sm">Comprar</button>
                  <button class="btn btn-outline-secondary btn-sm" 
                          data-bs-toggle="popover" 
                          data-bs-placement="top"
                          data-bs-title="💰 Preço"
                          data-bs-content="R$ 299,90 à vista ou 12x de R$ 29,99 sem juros">
                    Ver Preço
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info" role="alert">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Click:</strong> Clique nos botões para abrir os popovers</li>
            <li><strong>Dismiss:</strong> Clique fora do popover ou no botão novamente para fechar</li>
            <li><strong>Hover:</strong> O botão "Hover Me" mostra popover ao passar o mouse</li>
            <li><strong>Focus:</strong> O botão "Dismissible" fecha automaticamente ao perder foco</li>
            <li><strong>Posicionamento:</strong> Observe como os popovers se ajustam automaticamente</li>
            <li><strong>HTML:</strong> Popovers suportam formatação HTML rica</li>
          </ul>
        </div>
      </div>
    `;
  }
};
