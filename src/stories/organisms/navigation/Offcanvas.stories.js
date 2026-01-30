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
  title: 'Organisms/Navigation/Offcanvas',
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
        <i class="bx bx-menu me-2"></i>Open Menu
      </button>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Carrinho de Compras</h5>
      <button class="btn btn-label-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart">
        <i class="bx bx-cart me-2"></i>Cart <span class="badge bg-primary rounded-pill ms-1">3</span>
      </button>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Filtros</h5>
      <button class="btn btn-outline-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFilters">
        <i class="bx bx-filter-alt me-2"></i>Filters
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
            <i class="bx bx-home me-2"></i>Dashboard
          </a>
        </li>
        <li class="list-group-item">
          <a href="#" class="text-decoration-none">
            <i class="bx bx-user me-2"></i>Profile
          </a>
        </li>
        <li class="list-group-item">
          <a href="#" class="text-decoration-none">
            <i class="bx bx-cog me-2"></i>Settings
          </a>
        </li>
        <li class="list-group-item">
          <a href="#" class="text-decoration-none">
            <i class="bx bx-bell me-2"></i>Notifications
          </a>
        </li>
        <li class="list-group-item">
          <a href="#" class="text-decoration-none text-danger">
            <i class="bx bx-power-off me-2"></i>Logout
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
        <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/products/1.png" class="me-3" style="width: 60px; height: 60px; object-fit: cover;" alt="Product">
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
        <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/products/2.png" class="me-3" style="width: 60px; height: 60px; object-fit: cover;" alt="Product">
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
          <span class="fw-bold">$84.98</span>
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
    <i class="bx bx-info-circle me-2"></i>
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
