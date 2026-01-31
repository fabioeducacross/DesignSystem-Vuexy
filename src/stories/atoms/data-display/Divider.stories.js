/**
 * @component Divider
 * @description Separadores visuais - linhas horizontais e divisores
 * @category Atoms > Data Display
 * @status DONE
 */

export default {
  title: 'Atoms/Data Display/Divider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## Divider - Separadores Visuais

Linhas horizontais para separar conteúdo visualmente.

### Variantes
- **Default**: Linha simples \`<hr>\`
- **With Text**: Divisor com texto central
- **Styled**: Divisores com estilos customizados
        `
      }
    }
  }
};

// ========================================
// STORIES
// ========================================

export const Default = {
  render: () => `
<div>
  <p>Conteúdo acima do divisor</p>
  <hr>
  <p>Conteúdo abaixo do divisor</p>
</div>
  `
};

export const WithMargins = {
  render: () => `
<div>
  <p>Margem padrão</p>
  <hr>
  
  <p>Margem pequena (my-2)</p>
  <hr class="my-2">
  
  <p>Margem grande (my-5)</p>
  <hr class="my-5">
  
  <p>Fim</p>
</div>
  `
};

export const Colored = {
  render: () => `
<div class="d-flex flex-column gap-3">
  <div>
    <small class="text-muted">Primary</small>
    <hr class="border-primary border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">Success</small>
    <hr class="border-success border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">Danger</small>
    <hr class="border-danger border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">Warning</small>
    <hr class="border-warning border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">Info</small>
    <hr class="border-info border-2 opacity-100">
  </div>
</div>
  `
};

export const Thickness = {
  render: () => `
<div class="d-flex flex-column gap-3">
  <div>
    <small class="text-muted">border-1 (padrão)</small>
    <hr class="border-1 opacity-100">
  </div>
  <div>
    <small class="text-muted">border-2</small>
    <hr class="border-2 opacity-100">
  </div>
  <div>
    <small class="text-muted">border-3</small>
    <hr class="border-3 opacity-100">
  </div>
  <div>
    <small class="text-muted">border-4</small>
    <hr class="border-4 opacity-100">
  </div>
  <div>
    <small class="text-muted">border-5</small>
    <hr class="border-5 opacity-100">
  </div>
</div>
  `
};

export const WithText = {
  render: () => `
<div class="d-flex flex-column gap-4">
  <!-- Divisor com texto central -->
  <div class="d-flex align-items-center">
    <hr class="flex-grow-1 m-0">
    <span class="px-3 text-muted">ou</span>
    <hr class="flex-grow-1 m-0">
  </div>
  
  <!-- Divisor com texto e ícone -->
  <div class="d-flex align-items-center">
    <hr class="flex-grow-1 m-0">
    <span class="px-3 text-muted">
      <i class="ti ti-star me-1"></i>Destaque
    </span>
    <hr class="flex-grow-1 m-0">
  </div>
  
  <!-- Divisor com badge -->
  <div class="d-flex align-items-center">
    <hr class="flex-grow-1 m-0 border-primary opacity-50">
    <span class="badge bg-primary mx-3">NOVO</span>
    <hr class="flex-grow-1 m-0 border-primary opacity-50">
  </div>
</div>
  `
};

export const DropdownDivider = {
  render: () => `
<div class="dropdown-menu d-block position-static" style="max-width: 200px;">
  <a class="dropdown-item" href="#">Perfil</a>
  <a class="dropdown-item" href="#">Configurações</a>
  <div class="dropdown-divider"></div>
  <a class="dropdown-item" href="#">Ajuda</a>
  <div class="dropdown-divider"></div>
  <a class="dropdown-item text-danger" href="#">Sair</a>
</div>
  `
};

export const VerticalDivider = {
  render: () => `
<div class="d-flex align-items-center gap-3">
  <span>Item 1</span>
  <div class="vr"></div>
  <span>Item 2</span>
  <div class="vr"></div>
  <span>Item 3</span>
</div>

<div class="d-flex align-items-center gap-3 mt-4">
  <button class="btn btn-sm btn-outline-primary">Editar</button>
  <div class="vr"></div>
  <button class="btn btn-sm btn-outline-success">Salvar</button>
  <div class="vr"></div>
  <button class="btn btn-sm btn-outline-danger">Excluir</button>
</div>
  `
};

export const InCard = {
  render: () => `
<div class="card" style="max-width: 400px;">
  <div class="card-header">
    <h5 class="card-title mb-0">Detalhes do Pedido</h5>
  </div>
  <div class="card-body">
    <div class="d-flex justify-content-between mb-2">
      <span>Subtotal</span>
      <span>R$ 150,00</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Frete</span>
      <span>R$ 15,00</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Desconto</span>
      <span class="text-success">-R$ 10,00</span>
    </div>
    
    <hr class="my-3">
    
    <div class="d-flex justify-content-between">
      <strong>Total</strong>
      <strong class="text-primary">R$ 155,00</strong>
    </div>
  </div>
</div>
  `
};

export const Dashed = {
  render: () => `
<div class="d-flex flex-column gap-3">
  <div>
    <small class="text-muted">Linha tracejada</small>
    <hr style="border-style: dashed;">
  </div>
  <div>
    <small class="text-muted">Linha pontilhada</small>
    <hr style="border-style: dotted;">
  </div>
  <div>
    <small class="text-muted">Linha dupla</small>
    <hr style="border-style: double; border-width: 4px;">
  </div>
</div>
  `
};
