/**
 * Offcanvas - Organism (Navigation)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.offcanvas)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Painel lateral deslizante para conteúdo adicional.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Vuexy/Organisms/Navigation/Offcanvas',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Offcanvas

Componente de painel lateral deslizante para navegação e conteúdo adicional.

## Quando usar
- Menu lateral mobile
- Carrinho de compras
- Filtros avançados
- Configurações/preferências
- Notificações detalhadas
- Chat/messaging sidebar

## Características
- Classes Bootstrap: \`.offcanvas\`, \`.offcanvas-start\`, \`.offcanvas-end\`, \`.offcanvas-top\`, \`.offcanvas-bottom\`
- Posicionamento: Start (left), End (right), Top, Bottom
- Backdrop escuro por padrão
- Botão close automático
- Scroll interno quando necessário
- Requer Bootstrap JavaScript

## Comportamento
- Abre via trigger button ou JavaScript
- Fecha ao clicar no backdrop
- Fecha ao clicar no botão close
- Navegação por teclado (ESC fecha)
- Body scroll bloqueado quando aberto

## Acessibilidade
- \`role="dialog"\`
- \`aria-labelledby\` referencia título
- \`aria-modal="true"\`
- Foco automático ao abrir
- ESC fecha o painel
        `
      }
    }
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Posição do offcanvas',
      table: { defaultValue: { summary: 'start' } }
    },
    backdrop: {
      control: 'boolean',
      description: 'Mostra backdrop escuro',
      table: { defaultValue: { summary: true } }
    },
    scroll: {
      control: 'boolean',
      description: 'Permite scroll do body',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createOffcanvas = ({ placement = 'start', backdrop = true, scroll = false }) => {
  const scrollAttr = scroll ? 'data-bs-scroll="true"' : '';
  const backdropAttr = !backdrop ? 'data-bs-backdrop="false"' : '';
  
  return `<!-- Button trigger -->
<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
  Open Offcanvas
</button>

<!-- Offcanvas -->
<div class="offcanvas offcanvas-${placement}" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" ${scrollAttr} ${backdropAttr}>
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas Title</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div>
      Some text as placeholder. In real life you can have the elements you have chosen.
    </div>
    <div class="mt-3">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>`;
};

const Template = (args) => {
  const markup = createOffcanvas(args);
  
  return `
    <div style="padding: 20px;">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Offcanvas').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Posicionamento</h5>
      <div class="d-flex flex-wrap gap-3">
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasStart">
          Start (Left)
        </button>
        <button class="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd">
          End (Right)
        </button>
        <button class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop">
          Top
        </button>
        <button class="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom">
          Bottom
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Menu Lateral Example</h5>
      <button class="btn btn-label-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
        <i class="bx bx-menu mr-2"></i>Open Menu
      </button>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Carrinho de Compras</h5>
      <button class="btn btn-label-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart">
        <i class="bx bx-cart mr-2"></i>Cart <span class="badge bg-primary rounded-pill ml-1">3</span>
      </button>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Filtros</h5>
      <button class="btn btn-outline-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFilters">
        <i class="bx bx-filter-alt mr-2"></i>Filters
      </button>
    </div>
  </div>
  
  <!-- Offcanvas Start -->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasStart">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Offcanvas Start</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <p>This offcanvas slides in from the left.</p>
    </div>
  </div>
  
  <!-- Offcanvas End -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Offcanvas End</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <p>This offcanvas slides in from the right.</p>
    </div>
  </div>
  
  <!-- Offcanvas Top -->
  <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" style="height: 300px;">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Offcanvas Top</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <p>This offcanvas slides in from the top.</p>
    </div>
  </div>
  
  <!-- Offcanvas Bottom -->
  <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" style="height: 300px;">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Offcanvas Bottom</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <p>This offcanvas slides in from the bottom.</p>
    </div>
  </div>
  
  <!-- Menu Offcanvas -->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasMenu">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Menu</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body p-0">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <a href="#" class="text-decoration-none">
            <i class="bx bx-home mr-2"></i>Dashboard
          </a>
        </li>
        <li class="list-group-item">
          <a href="#" class="text-decoration-none">
            <i class="bx bx-user mr-2"></i>Profile
          </a>
        </li>
        <li class="list-group-item">
          <a href="#" class="text-decoration-none">
            <i class="bx bx-cog mr-2"></i>Settings
          </a>
        </li>
        <li class="list-group-item">
          <a href="#" class="text-decoration-none">
            <i class="bx bx-bell mr-2"></i>Notifications
          </a>
        </li>
        <li class="list-group-item">
          <a href="#" class="text-decoration-none text-danger">
            <i class="bx bx-power-off mr-2"></i>Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
  
  <!-- Cart Offcanvas -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCart">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Shopping Cart</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <div class="d-flex mb-3 pb-3 border-bottom">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f5f5f9'/%3E%3Cpath d='M40,33 L60,33 L60,53 L53,67 L47,67 L40,53 Z' fill='%23dbdade'/%3E%3Ccircle cx='50' cy='40' r='5' fill='%23696cff'/%3E%3C/svg%3E" class="mr-3" style="width: 60px; height: 60px; object-fit: cover;" alt="Product">
        <div class="flex-grow-1">
          <h6 class="mb-1">Product Name</h6>
          <small class="text-muted">Size: M</small>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <span>$29.99</span>
            <button class="btn btn-sm btn-icon btn-label-danger">
              <i class="bx bx-trash"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="d-flex mb-3 pb-3 border-bottom">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f5f5f9'/%3E%3Cpath d='M40,33 L60,33 L60,53 L53,67 L47,67 L40,53 Z' fill='%23dbdade'/%3E%3Ccircle cx='50' cy='40' r='5' fill='%23696cff'/%3E%3C/svg%3E" class="mr-3" style="width: 60px; height: 60px; object-fit: cover;" alt="Product">
        <div class="flex-grow-1">
          <h6 class="mb-1">Another Product</h6>
          <small class="text-muted">Color: Blue</small>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <span>$49.99</span>
            <button class="btn btn-sm btn-icon btn-label-danger">
              <i class="bx bx-trash"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="mt-auto">
        <div class="d-flex justify-content-between mb-3">
          <span>Subtotal:</span>
          <span class="fw-medium">$79.98</span>
        </div>
        <div class="d-flex justify-content-between mb-3">
          <span>Shipping:</span>
          <span class="fw-medium">$5.00</span>
        </div>
        <hr>
        <div class="d-flex justify-content-between mb-3">
          <span class="fw-medium">Total:</span>
          <span class="font-weight-bold">$84.98</span>
        </div>
        <button class="btn btn-primary w-100">Checkout</button>
      </div>
    </div>
  </div>
  
  <!-- Filters Offcanvas -->
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasFilters">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Filters</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <div class="mb-4">
        <h6>Category</h6>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="cat1" checked>
          <label class="form-check-label" for="cat1">Electronics</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="cat2">
          <label class="form-check-label" for="cat2">Clothing</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="cat3">
          <label class="form-check-label" for="cat3">Home & Garden</label>
        </div>
      </div>
      
      <div class="mb-4">
        <h6>Price Range</h6>
        <input type="range" class="form-range" min="0" max="1000" value="500">
        <div class="d-flex justify-content-between">
          <small>$0</small>
          <small>$1000</small>
        </div>
      </div>
      
      <div class="mb-4">
        <h6>Rating</h6>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="rating5">
          <label class="form-check-label" for="rating5">
            <i class="bx bxs-star text-warning"></i>
            <i class="bx bxs-star text-warning"></i>
            <i class="bx bxs-star text-warning"></i>
            <i class="bx bxs-star text-warning"></i>
            <i class="bx bxs-star text-warning"></i>
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="rating4">
          <label class="form-check-label" for="rating4">
            <i class="bx bxs-star text-warning"></i>
            <i class="bx bxs-star text-warning"></i>
            <i class="bx bxs-star text-warning"></i>
            <i class="bx bxs-star text-warning"></i>
            <i class="bx bx-star text-warning"></i>
            & Up
          </label>
        </div>
      </div>
      
      <div class="d-flex gap-2">
        <button class="btn btn-primary flex-grow-1">Apply</button>
        <button class="btn btn-label-secondary">Reset</button>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle mr-2"></i>
    <strong>JavaScript Required:</strong> Offcanvas requires Bootstrap JavaScript. Use data-bs-toggle="offcanvas" to trigger.
  </div>
`;

export const Start = Template.bind({});
Start.args = {
  placement: 'start',
  backdrop: true,
  scroll: false
};

export const End = Template.bind({});
End.args = {
  placement: 'end',
  backdrop: true,
  scroll: false
};

export const Top = Template.bind({});
Top.args = {
  placement: 'top',
  backdrop: true,
  scroll: false
};

export const Bottom = Template.bind({});
Bottom.args = {
  placement: 'bottom',
  backdrop: true,
  scroll: false
};

export const NoBackdrop = Template.bind({});
NoBackdrop.args = {
  placement: 'start',
  backdrop: false,
  scroll: false
};

export const WithScroll = Template.bind({});
WithScroll.args = {
  placement: 'start',
  backdrop: true,
  scroll: true
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
### Offcanvas com Bootstrap JS Real

Implementação oficial usando Bootstrap JS do Vuexy:

- ✅ **4 Posicionamentos** (start/left, end/right, top, bottom)
- ✅ **Slide in/out** com animações suaves
- ✅ **Backdrop** com blur e dismiss on click
- ✅ **Escape key** para fechar
- ✅ **Body scroll lock** quando offcanvas aberto
- ✅ **Focus trap** para acessibilidade
- ✅ **Scroll interno** quando conteúdo excede altura

**Casos de uso:**
- Menu lateral mobile
- Carrinho de compras
- Filtros de pesquisa
- Painel de notificações

### Como testar:
1. Clique nos botões para abrir offcanvas
2. Use Escape para fechar
3. Clique no backdrop para fechar
4. Teste os 4 posicionamentos diferentes
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
            console.log('✅ Bootstrap JS carregado para Offcanvas');
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
    return `
      <div style="padding: 30px;">
        <h5 class="mb-4">Offcanvas Interativos com Bootstrap JS</h5>
        
        <!-- Trigger Buttons -->
        <div class="row g-3 mb-4">
          <div class="col-md-3">
            <button class="btn btn-primary w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasStart">
              <i class="ti tabler-arrow-left mr-1"></i> Start (Left)
            </button>
          </div>
          
          <div class="col-md-3">
            <button class="btn btn-success w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd">
              <i class="ti tabler-arrow-right mr-1"></i> End (Right)
            </button>
          </div>
          
          <div class="col-md-3">
            <button class="btn btn-info w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop">
              <i class="ti tabler-arrow-up mr-1"></i> Top
            </button>
          </div>
          
          <div class="col-md-3">
            <button class="btn btn-warning w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom">
              <i class="ti tabler-arrow-down mr-1"></i> Bottom
            </button>
          </div>
        </div>
        
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <button class="btn btn-outline-secondary w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart">
              <i class="ti tabler-shopping-cart mr-1"></i> Carrinho de Compras
            </button>
          </div>
          
          <div class="col-md-6">
            <button class="btn btn-outline-primary w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFilters">
              <i class="ti tabler-filter mr-1"></i> Filtros Avançados
            </button>
          </div>
        </div>
        
        <!-- Offcanvas 1: Start (Left) -->
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasStart" aria-labelledby="offcanvasStartLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasStartLabel">
              <i class="ti tabler-menu-2 mr-2"></i> Menu Lateral
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div class="mb-3">
              <h6>Navegação</h6>
              <ul class="nav flex-column">
                <li class="nav-item"><a class="nav-link" href="javascript:void(0);"><i class="ti tabler-home mr-2"></i>Dashboard</a></li>
                <li class="nav-item"><a class="nav-link" href="javascript:void(0);"><i class="ti tabler-users mr-2"></i>Usuários</a></li>
                <li class="nav-item"><a class="nav-link" href="javascript:void(0);"><i class="ti tabler-settings mr-2"></i>Configurações</a></li>
                <li class="nav-item"><a class="nav-link" href="javascript:void(0);"><i class="ti tabler-file mr-2"></i>Relatórios</a></li>
              </ul>
            </div>
            
            <hr>
            
            <div>
              <h6>Perfil</h6>
              <div class="d-flex align-items-center mb-2">
                <div class="avatar mr-2">
                  <span class="avatar-initial rounded-circle bg-label-primary">JD</span>
                </div>
                <div>
                  <h6 class="mb-0">João Silva</h6>
                  <small class="text-muted">joao@example.com</small>
                </div>
              </div>
              <button class="btn btn-sm btn-label-danger w-100 mt-2">
                <i class="ti tabler-logout mr-1"></i> Sair
              </button>
            </div>
          </div>
        </div>
        
        <!-- Offcanvas 2: End (Right) -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasEndLabel">
              <i class="ti tabler-bell mr-2"></i> Notificações
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body p-0">
            <div class="list-group list-group-flush">
              <a href="javascript:void(0);" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <h6 class="mb-1">Nova mensagem</h6>
                  <small class="text-primary">Agora</small>
                </div>
                <p class="mb-1">Você recebeu uma nova mensagem de Maria.</p>
              </a>
              
              <a href="javascript:void(0);" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <h6 class="mb-1">Atualização do sistema</h6>
                  <small class="text-muted">2h atrás</small>
                </div>
                <p class="mb-1">Nova versão disponível: v2.4.0</p>
              </a>
              
              <a href="javascript:void(0);" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <h6 class="mb-1">Backup concluído</h6>
                  <small class="text-muted">5h atrás</small>
                </div>
                <p class="mb-1">Backup automático realizado com sucesso.</p>
              </a>
            </div>
            
            <div class="p-3">
              <button class="btn btn-primary w-100">Ver todas notificações</button>
            </div>
          </div>
        </div>
        
        <!-- Offcanvas 3: Top -->
        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel" style="height: 250px;">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">
              <i class="ti tabler-info-circle mr-2"></i> Informações do Sistema
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div class="row">
              <div class="col-md-3">
                <div class="card bg-primary text-white">
                  <div class="card-body text-center">
                    <i class="ti tabler-users" style="font-size: 32px;"></i>
                    <h4 class="mt-2 mb-0">1,234</h4>
                    <small>Usuários</small>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-success text-white">
                  <div class="card-body text-center">
                    <i class="ti tabler-shopping-cart" style="font-size: 32px;"></i>
                    <h4 class="mt-2 mb-0">567</h4>
                    <small>Vendas</small>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-warning text-white">
                  <div class="card-body text-center">
                    <i class="ti tabler-clock" style="font-size: 32px;"></i>
                    <h4 class="mt-2 mb-0">89</h4>
                    <small>Pendentes</small>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card bg-info text-white">
                  <div class="card-body text-center">
                    <i class="ti tabler-chart-line" style="font-size: 32px;"></i>
                    <h4 class="mt-2 mb-0">92%</h4>
                    <small>Performance</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Offcanvas 4: Bottom -->
        <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel" style="height: 300px;">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasBottomLabel">
              <i class="ti tabler-cookie mr-2"></i> Política de Cookies
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <p>Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda com nossa política de privacidade.</p>
            <p class="mb-3">Você pode gerenciar suas preferências de cookies a qualquer momento nas configurações.</p>
            <div class="d-flex gap-2">
              <button class="btn btn-primary" data-bs-dismiss="offcanvas">Aceitar Todos</button>
              <button class="btn btn-outline-secondary" data-bs-dismiss="offcanvas">Aceitar Necessários</button>
              <button class="btn btn-label-secondary">Configurar</button>
            </div>
          </div>
        </div>
        
        <!-- Offcanvas 5: Carrinho de Compras -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel" style="width: 400px;">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasCartLabel">
              <i class="ti tabler-shopping-cart mr-2"></i> Carrinho (3)
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body p-0">
            <div class="list-group list-group-flush">
              <div class="list-group-item">
                <div class="d-flex gap-3">
                  <div class="flex-shrink-0">
                    <div class="bg-label-primary rounded" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
                      <i class="ti tabler-device-laptop" style="font-size: 32px;"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">Laptop HP 15"</h6>
                    <small class="text-muted">Intel i5, 8GB RAM</small>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                      <div class="input-group" style="width: 100px;">
                        <button class="btn btn-sm btn-outline-secondary">-</button>
                        <input type="text" class="form-control form-control-sm text-center" value="1" readonly>
                        <button class="btn btn-sm btn-outline-secondary">+</button>
                      </div>
                      <strong class="text-primary">R$ 2.499</strong>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="list-group-item">
                <div class="d-flex gap-3">
                  <div class="flex-shrink-0">
                    <div class="bg-label-success rounded" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
                      <i class="ti tabler-headphones" style="font-size: 32px;"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">Headset Gamer</h6>
                    <small class="text-muted">RGB, Surround 7.1</small>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                      <div class="input-group" style="width: 100px;">
                        <button class="btn btn-sm btn-outline-secondary">-</button>
                        <input type="text" class="form-control form-control-sm text-center" value="2" readonly>
                        <button class="btn btn-sm btn-outline-secondary">+</button>
                      </div>
                      <strong class="text-primary">R$ 399</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="p-3 border-top">
              <div class="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <strong>R$ 3.297</strong>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Frete:</span>
                <strong class="text-success">Grátis</strong>
              </div>
              <hr>
              <div class="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong class="text-primary" style="font-size: 1.25rem;">R$ 3.297</strong>
              </div>
              <button class="btn btn-primary w-100 mb-2">
                <i class="ti tabler-credit-card mr-1"></i> Finalizar Compra
              </button>
              <button class="btn btn-label-secondary w-100" data-bs-dismiss="offcanvas">
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
        
        <!-- Offcanvas 6: Filtros -->
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasFilters" aria-labelledby="offcanvasFiltersLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasFiltersLabel">
              <i class="ti tabler-filter mr-2"></i> Filtros Avançados
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div class="mb-4">
              <h6>Categoria</h6>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="cat1" checked>
                <label class="form-check-label" for="cat1">Eletrônicos (234)</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="cat2">
                <label class="form-check-label" for="cat2">Roupas (567)</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="cat3">
                <label class="form-check-label" for="cat3">Livros (123)</label>
              </div>
            </div>
            
            <div class="mb-4">
              <h6>Faixa de Preço</h6>
              <div class="row g-2">
                <div class="col-6">
                  <input type="number" class="form-control form-control-sm" placeholder="Min" value="0">
                </div>
                <div class="col-6">
                  <input type="number" class="form-control form-control-sm" placeholder="Max" value="5000">
                </div>
              </div>
            </div>
            
            <div class="mb-4">
              <h6>Avaliação</h6>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="rating" id="rating5" checked>
                <label class="form-check-label" for="rating5">
                  ⭐⭐⭐⭐⭐ 5 estrelas
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="rating" id="rating4">
                <label class="form-check-label" for="rating4">
                  ⭐⭐⭐⭐ 4+ estrelas
                </label>
              </div>
            </div>
            
            <div class="d-flex gap-2">
              <button class="btn btn-primary flex-grow-1">Aplicar Filtros</button>
              <button class="btn btn-label-secondary">Limpar</button>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Posicionamentos:</strong> Teste os 4 lados (left, right, top, bottom)</li>
            <li><strong>Fechar:</strong> Use X, backdrop (click fora), ou Escape key</li>
            <li><strong>Casos de Uso:</strong> Carrinho e Filtros simulam aplicações reais</li>
            <li><strong>Scroll:</strong> Body trava quando offcanvas está aberto</li>
            <li><strong>Conteúdo Rico:</strong> Cards, listas, formulários todos funcionam</li>
          </ul>
        </div>
      </div>
    `;
  }
};
