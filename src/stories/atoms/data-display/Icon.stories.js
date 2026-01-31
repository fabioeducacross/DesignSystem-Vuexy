/**
 * @component Icon
 * @description Documentação de ícones disponíveis no Vuexy (Tabler Icons)
 * @category Atoms > Data Display
 * @status DONE
 */

export default {
  title: 'Atoms/Data Display/Icon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## Ícones - Tabler Icons

O Vuexy utiliza **Tabler Icons** como biblioteca principal de ícones.

### Como usar
\`\`\`html
<i class="ti ti-[nome-do-icone]"></i>
<i class="ti ti-[nome-do-icone] ti-sm"></i>  <!-- Pequeno -->
<i class="ti ti-[nome-do-icone] ti-md"></i>  <!-- Médio -->
<i class="ti ti-[nome-do-icone] ti-lg"></i>  <!-- Grande -->
\`\`\`

### Tamanhos disponíveis
- **ti-xs**: Extra pequeno (0.75rem)
- **ti-sm**: Pequeno (0.875rem)
- **ti-md**: Médio (1.25rem)
- **ti-lg**: Grande (1.5rem)

### Documentação completa
[Tabler Icons](https://tabler-icons.io/)
        `
      }
    }
  }
};

// ========================================
// HELPERS
// ========================================

const iconBox = (icon, name) => `
<div class="d-flex flex-column align-items-center p-3 border rounded" style="min-width: 100px;">
  <i class="ti ti-${icon} ti-lg mb-2"></i>
  <small class="text-muted text-center">${name}</small>
</div>
`;

// ========================================
// STORIES
// ========================================

export const CommonIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Ícones Mais Usados</h5>
  <div class="d-flex flex-wrap gap-3">
    ${iconBox('home', 'home')}
    ${iconBox('user', 'user')}
    ${iconBox('settings', 'settings')}
    ${iconBox('search', 'search')}
    ${iconBox('bell', 'bell')}
    ${iconBox('mail', 'mail')}
    ${iconBox('calendar', 'calendar')}
    ${iconBox('file', 'file')}
    ${iconBox('folder', 'folder')}
    ${iconBox('heart', 'heart')}
    ${iconBox('star', 'star')}
    ${iconBox('check', 'check')}
    ${iconBox('x', 'x')}
    ${iconBox('plus', 'plus')}
    ${iconBox('minus', 'minus')}
    ${iconBox('edit', 'edit')}
    ${iconBox('trash', 'trash')}
    ${iconBox('download', 'download')}
    ${iconBox('upload', 'upload')}
    ${iconBox('refresh', 'refresh')}
  </div>
</div>
  `
};

export const NavigationIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Navegação</h5>
  <div class="d-flex flex-wrap gap-3">
    ${iconBox('menu-2', 'menu-2')}
    ${iconBox('arrow-left', 'arrow-left')}
    ${iconBox('arrow-right', 'arrow-right')}
    ${iconBox('arrow-up', 'arrow-up')}
    ${iconBox('arrow-down', 'arrow-down')}
    ${iconBox('chevron-left', 'chevron-left')}
    ${iconBox('chevron-right', 'chevron-right')}
    ${iconBox('chevron-up', 'chevron-up')}
    ${iconBox('chevron-down', 'chevron-down')}
    ${iconBox('external-link', 'external-link')}
    ${iconBox('link', 'link')}
    ${iconBox('logout', 'logout')}
    ${iconBox('login', 'login')}
  </div>
</div>
  `
};

export const ActionIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Ações</h5>
  <div class="d-flex flex-wrap gap-3">
    ${iconBox('plus', 'plus')}
    ${iconBox('minus', 'minus')}
    ${iconBox('edit', 'edit')}
    ${iconBox('pencil', 'pencil')}
    ${iconBox('trash', 'trash')}
    ${iconBox('copy', 'copy')}
    ${iconBox('clipboard', 'clipboard')}
    ${iconBox('share', 'share')}
    ${iconBox('send', 'send')}
    ${iconBox('download', 'download')}
    ${iconBox('upload', 'upload')}
    ${iconBox('printer', 'printer')}
    ${iconBox('eye', 'eye')}
    ${iconBox('eye-off', 'eye-off')}
    ${iconBox('lock', 'lock')}
    ${iconBox('lock-open', 'lock-open')}
  </div>
</div>
  `
};

export const StatusIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Status & Feedback</h5>
  <div class="d-flex flex-wrap gap-3">
    ${iconBox('check', 'check')}
    ${iconBox('check-circle', 'check-circle')}
    ${iconBox('x', 'x')}
    ${iconBox('x-circle', 'x-circle')}
    ${iconBox('alert-circle', 'alert-circle')}
    ${iconBox('alert-triangle', 'alert-triangle')}
    ${iconBox('info-circle', 'info-circle')}
    ${iconBox('help-circle', 'help-circle')}
    ${iconBox('loader', 'loader')}
    ${iconBox('hourglass', 'hourglass')}
    ${iconBox('clock', 'clock')}
  </div>
</div>
  `
};

export const MediaIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Mídia</h5>
  <div class="d-flex flex-wrap gap-3">
    ${iconBox('photo', 'photo')}
    ${iconBox('camera', 'camera')}
    ${iconBox('video', 'video')}
    ${iconBox('music', 'music')}
    ${iconBox('microphone', 'microphone')}
    ${iconBox('player-play', 'player-play')}
    ${iconBox('player-pause', 'player-pause')}
    ${iconBox('player-stop', 'player-stop')}
    ${iconBox('volume', 'volume')}
    ${iconBox('volume-off', 'volume-off')}
  </div>
</div>
  `
};

export const CommunicationIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Comunicação</h5>
  <div class="d-flex flex-wrap gap-3">
    ${iconBox('mail', 'mail')}
    ${iconBox('inbox', 'inbox')}
    ${iconBox('send', 'send')}
    ${iconBox('message', 'message')}
    ${iconBox('message-circle', 'message-circle')}
    ${iconBox('messages', 'messages')}
    ${iconBox('phone', 'phone')}
    ${iconBox('phone-call', 'phone-call')}
    ${iconBox('at', 'at')}
    ${iconBox('bell', 'bell')}
    ${iconBox('bell-off', 'bell-off')}
  </div>
</div>
  `
};

export const CommerceIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Comércio & Finanças</h5>
  <div class="d-flex flex-wrap gap-3">
    ${iconBox('shopping-cart', 'shopping-cart')}
    ${iconBox('shopping-bag', 'shopping-bag')}
    ${iconBox('credit-card', 'credit-card')}
    ${iconBox('wallet', 'wallet')}
    ${iconBox('currency-dollar', 'currency-dollar')}
    ${iconBox('receipt', 'receipt')}
    ${iconBox('tag', 'tag')}
    ${iconBox('discount', 'discount')}
    ${iconBox('gift', 'gift')}
    ${iconBox('truck', 'truck')}
    ${iconBox('package', 'package')}
    ${iconBox('building-store', 'building-store')}
  </div>
</div>
  `
};

export const ChartIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Gráficos & Dados</h5>
  <div class="d-flex flex-wrap gap-3">
    ${iconBox('chart-bar', 'chart-bar')}
    ${iconBox('chart-line', 'chart-line')}
    ${iconBox('chart-pie', 'chart-pie')}
    ${iconBox('chart-donut', 'chart-donut')}
    ${iconBox('chart-area', 'chart-area')}
    ${iconBox('trending-up', 'trending-up')}
    ${iconBox('trending-down', 'trending-down')}
    ${iconBox('report', 'report')}
    ${iconBox('database', 'database')}
    ${iconBox('table', 'table')}
  </div>
</div>
  `
};

export const Sizes = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Tamanhos</h5>
  <div class="d-flex gap-4 align-items-end">
    <div class="text-center">
      <i class="ti ti-star ti-xs d-block mb-2"></i>
      <small class="text-muted">ti-xs</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star ti-sm d-block mb-2"></i>
      <small class="text-muted">ti-sm</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star d-block mb-2"></i>
      <small class="text-muted">default</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star ti-md d-block mb-2"></i>
      <small class="text-muted">ti-md</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star ti-lg d-block mb-2"></i>
      <small class="text-muted">ti-lg</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star" style="font-size: 2rem;" ></i>
      <small class="text-muted d-block">2rem</small>
    </div>
    <div class="text-center">
      <i class="ti ti-star" style="font-size: 3rem;"></i>
      <small class="text-muted d-block">3rem</small>
    </div>
  </div>
</div>
  `
};

export const Colors = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Cores</h5>
  <div class="d-flex gap-4 align-items-center flex-wrap">
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-primary"></i>
      <small class="text-muted d-block">primary</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-secondary"></i>
      <small class="text-muted d-block">secondary</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-success"></i>
      <small class="text-muted d-block">success</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-danger"></i>
      <small class="text-muted d-block">danger</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-warning"></i>
      <small class="text-muted d-block">warning</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-info"></i>
      <small class="text-muted d-block">info</small>
    </div>
    <div class="text-center">
      <i class="ti ti-heart ti-lg text-dark"></i>
      <small class="text-muted d-block">dark</small>
    </div>
    <div class="text-center bg-dark p-2 rounded">
      <i class="ti ti-heart ti-lg text-light"></i>
      <small class="text-light d-block">light</small>
    </div>
  </div>
</div>
  `
};

export const WithButtons = {
  render: () => `
<div class="d-flex gap-3 flex-wrap">
  <button class="btn btn-primary">
    <i class="ti ti-plus me-2"></i>Adicionar
  </button>
  <button class="btn btn-success">
    <i class="ti ti-check me-2"></i>Salvar
  </button>
  <button class="btn btn-danger">
    <i class="ti ti-trash me-2"></i>Excluir
  </button>
  <button class="btn btn-outline-primary">
    <i class="ti ti-download me-2"></i>Download
  </button>
  <button class="btn btn-icon btn-primary">
    <i class="ti ti-settings"></i>
  </button>
  <button class="btn btn-icon btn-outline-secondary">
    <i class="ti ti-bell"></i>
  </button>
</div>
  `
};

export const Interactive = {
  render: () => `
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Buscar Ícone</h5>
  </div>
  <div class="card-body">
    <div class="input-group mb-4">
      <span class="input-group-text"><i class="ti ti-search"></i></span>
      <input type="text" class="form-control" id="icon-search" placeholder="Digite o nome do ícone..." oninput="
        const query = this.value.toLowerCase();
        const icons = document.querySelectorAll('#icon-grid > div');
        icons.forEach(icon => {
          const name = icon.dataset.name;
          icon.style.display = name.includes(query) ? 'flex' : 'none';
        });
      ">
    </div>
    
    <div id="icon-grid" class="d-flex flex-wrap gap-2">
      ${['home', 'user', 'settings', 'search', 'bell', 'mail', 'calendar', 'file', 'folder', 'heart', 'star', 'check', 'x', 'plus', 'minus', 'edit', 'trash', 'download', 'upload', 'refresh', 'menu-2', 'arrow-left', 'arrow-right', 'eye', 'lock', 'shopping-cart', 'credit-card', 'chart-bar', 'phone', 'message'].map(icon => `
        <div data-name="${icon}" class="d-flex flex-column align-items-center p-2 border rounded" 
             style="width: 80px; cursor: pointer;" 
             onclick="navigator.clipboard.writeText('ti ti-${icon}'); this.classList.add('border-primary'); setTimeout(() => this.classList.remove('border-primary'), 500);">
          <i class="ti ti-${icon} ti-md"></i>
          <small class="text-muted text-center" style="font-size: 10px;">${icon}</small>
        </div>
      `).join('')}
    </div>
    
    <p class="text-muted mt-3 small">
      <i class="ti ti-info-circle me-1"></i>
      Clique em um ícone para copiar a classe. 
      <a href="https://tabler-icons.io/" target="_blank">Ver todos os ícones →</a>
    </p>
  </div>
</div>
  `
};
