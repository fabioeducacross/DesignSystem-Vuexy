/**
 * @component Icon - Feather Icons
 * @description Biblioteca oficial de ícones do Design System Educacross usando Feather Icons
 * @category Atoms > Data Display
 * @status DONE
 */

import feather from 'feather-icons';

export default {
  title: 'Vuexy/Atoms/Data Display/Icon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## Feather Icons - Biblioteca Oficial Educacross

O Design System Educacross utiliza **Feather Icons** como biblioteca oficial de ícones.

### Componente Vue: FeatherIcon.vue

\`\`\`vue
<template>
  <FeatherIcon icon="home" size="24" />
  <FeatherIcon icon="user" size="18" />

  <!-- Com badge -->
  <FeatherIcon
    icon="bell"
    badge="5"
    badge-classes="badge-primary"
  />
</template>

<script setup>
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
</script>
\`\`\`

### Props do Componente

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`icon\` | String / Object | - | Nome do ícone (obrigatório) |
| \`size\` | String | '14' | Tamanho em pixels |
| \`badge\` | String / Number | null | Badge para notificações |
| \`badgeClasses\` | String / Array | 'badge-primary' | Classes do badge |

### Uso em HTML puro

\`\`\`html
<!-- SVG inline -->
<i data-feather="home"></i>
<i data-feather="user"></i>

<!-- Com JavaScript -->
<script>
  feather.replace()
</script>
\`\`\`

### Tamanhos

\`\`\`vue
<FeatherIcon icon="star" size="12" />  <!-- Extra small -->
<FeatherIcon icon="star" size="16" />  <!-- Small -->
<FeatherIcon icon="star" size="24" />  <!-- Medium (default) -->
<FeatherIcon icon="star" size="32" />  <!-- Large -->
<FeatherIcon icon="star" size="48" />  <!-- Extra large -->
\`\`\`

### Documentação completa
- [Feather Icons](https://feathericons.com/)
- [Vue Feather Icons](https://github.com/egoist/vue-feather-icons)
        `
      }
    }
  }
};

// ========================================
// HELPERS
// ========================================

const iconBox = (iconName, label) => {
  const svg = feather.icons[iconName] ? feather.icons[iconName].toSvg({ width: 24, height: 24 }) : '';
  return `
<div class="d-flex flex-column align-items-center p-3 border rounded"
     style="min-width: 100px; cursor: pointer;"
     onclick="
       navigator.clipboard.writeText('${iconName}');
       const toast = document.createElement('div');
       toast.textContent = 'Copiado: ${iconName}';
       toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #28a745; color: white; padding: 12px 24px; border-radius: 4px; z-index: 9999;';
       document.body.appendChild(toast);
       setTimeout(() => toast.remove(), 2000);
     ">
  ${svg}
  <small class="text-muted text-center mt-2">${label || iconName}</small>
</div>
`;
};

const vueExample = (iconName, size = '24', extraProps = '') => `
<div class="d-flex align-items-center gap-3 p-3 bg-light rounded">
  <div>
    ${feather.icons[iconName].toSvg({ width: size, height: size })}
  </div>
  <div class="font-monospace small">
    <div>&lt;FeatherIcon</div>
    <div class="ms-3">icon="${iconName}"</div>
    <div class="ms-3">size="${size}"</div>
    ${extraProps ? `<div class="ms-3">${extraProps}</div>` : ''}
    <div>/&gt;</div>
  </div>
</div>
`;

const iconGrid = (icons) => `
<div class="d-flex flex-wrap gap-3">
  ${icons.map(icon => iconBox(icon)).join('')}
</div>
`;

// ========================================
// STORIES
// ========================================

export const VueComponent = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Componente Vue - FeatherIcon.vue</h5>

  <div class="alert alert-info">
    <strong>Componente Oficial:</strong>
    <code>educacross-frontoffice/src/@core/components/feather-icon/FeatherIcon.vue</code>
  </div>

  <h6 class="mt-4 mb-3">Exemplos de Uso</h6>

  ${vueExample('home', '24')}
  ${vueExample('user', '18')}
  ${vueExample('bell', '24', 'badge="5" badge-classes="badge-primary"')}

  <div class="mt-4">
    <h6 class="mb-3">Tamanhos Disponíveis</h6>
    <div class="d-flex gap-4 align-items-center">
      ${feather.icons.star.toSvg({ width: 12, height: 12 })}
      <span class="text-muted">12px</span>
      ${feather.icons.star.toSvg({ width: 16, height: 16 })}
      <span class="text-muted">16px</span>
      ${feather.icons.star.toSvg({ width: 24, height: 24 })}
      <span class="text-muted">24px (padrão)</span>
      ${feather.icons.star.toSvg({ width: 32, height: 32 })}
      <span class="text-muted">32px</span>
      ${feather.icons.star.toSvg({ width: 48, height: 48 })}
      <span class="text-muted">48px</span>
    </div>
  </div>
</div>
  `
};

export const CommonIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Ícones Mais Usados</h5>
  <p class="text-muted small">Clique em um ícone para copiar o nome</p>
  ${iconGrid(['home', 'user', 'settings', 'search', 'bell', 'mail', 'calendar', 'file', 'folder', 'heart', 'star', 'check', 'x', 'plus', 'minus', 'edit-2', 'trash-2', 'download', 'upload', 'refresh-cw'])}
</div>
  `
};

export const NavigationIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Navegação</h5>
  ${iconGrid(['menu', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down', 'chevrons-left', 'chevrons-right', 'external-link', 'link', 'log-out', 'log-in'])}
</div>
  `
};

export const ActionIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Ações</h5>
  ${iconGrid(['plus', 'minus', 'edit', 'edit-2', 'trash', 'trash-2', 'copy', 'clipboard', 'share', 'share-2', 'send', 'download', 'upload', 'printer', 'eye', 'eye-off', 'lock', 'unlock'])}
</div>
  `
};

export const StatusIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Status & Feedback</h5>
  ${iconGrid(['check', 'check-circle', 'x', 'x-circle', 'alert-circle', 'alert-triangle', 'info', 'help-circle', 'loader', 'clock'])}
</div>
  `
};

export const MediaIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Mídia</h5>
  ${iconGrid(['image', 'camera', 'video', 'music', 'mic', 'play', 'pause', 'stop-circle', 'volume-2', 'volume-x'])}
</div>
  `
};

export const CommunicationIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Comunicação</h5>
  ${iconGrid(['mail', 'inbox', 'send', 'message-circle', 'message-square', 'phone', 'phone-call', 'at-sign', 'bell', 'bell-off'])}
</div>
  `
};

export const CommerceIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Comércio & Finanças</h5>
  ${iconGrid(['shopping-cart', 'shopping-bag', 'credit-card', 'dollar-sign', 'tag', 'percent', 'gift', 'truck', 'package'])}
</div>
  `
};

export const ChartIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Gráficos & Dados</h5>
  ${iconGrid(['bar-chart', 'bar-chart-2', 'pie-chart', 'activity', 'trending-up', 'trending-down', 'database', 'server'])}
</div>
  `
};

export const FileIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Arquivos & Documentos</h5>
  ${iconGrid(['file', 'file-text', 'file-plus', 'file-minus', 'folder', 'folder-plus', 'archive', 'save', 'paperclip'])}
</div>
  `
};

export const DevIcons = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Desenvolvimento</h5>
  ${iconGrid(['code', 'terminal', 'git-branch', 'git-commit', 'git-merge', 'github', 'gitlab', 'package', 'box'])}
</div>
  `
};

export const Sizes = {
  render: () => `
<div class="mb-4">
  <h5 class="mb-3">Tamanhos</h5>
  <div class="d-flex gap-4 align-items-end">
    <div class="text-center">
      ${feather.icons.star.toSvg({ width: 12, height: 12 })}
      <small class="text-muted d-block mt-2">12px</small>
    </div>
    <div class="text-center">
      ${feather.icons.star.toSvg({ width: 16, height: 16 })}
      <small class="text-muted d-block mt-2">16px</small>
    </div>
    <div class="text-center">
      ${feather.icons.star.toSvg({ width: 24, height: 24 })}
      <small class="text-muted d-block mt-2">24px</small>
    </div>
    <div class="text-center">
      ${feather.icons.star.toSvg({ width: 32, height: 32 })}
      <small class="text-muted d-block mt-2">32px</small>
    </div>
    <div class="text-center">
      ${feather.icons.star.toSvg({ width: 48, height: 48 })}
      <small class="text-muted d-block mt-2">48px</small>
    </div>
    <div class="text-center">
      ${feather.icons.star.toSvg({ width: 64, height: 64 })}
      <small class="text-muted d-block mt-2">64px</small>
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
      ${feather.icons.heart.toSvg({ width: 32, height: 32, class: 'text-primary' })}
      <small class="text-muted d-block">primary</small>
    </div>
    <div class="text-center">
      ${feather.icons.heart.toSvg({ width: 32, height: 32, class: 'text-secondary' })}
      <small class="text-muted d-block">secondary</small>
    </div>
    <div class="text-center">
      ${feather.icons.heart.toSvg({ width: 32, height: 32, class: 'text-success' })}
      <small class="text-muted d-block">success</small>
    </div>
    <div class="text-center">
      ${feather.icons.heart.toSvg({ width: 32, height: 32, class: 'text-danger' })}
      <small class="text-muted d-block">danger</small>
    </div>
    <div class="text-center">
      ${feather.icons.heart.toSvg({ width: 32, height: 32, class: 'text-warning' })}
      <small class="text-muted d-block">warning</small>
    </div>
    <div class="text-center">
      ${feather.icons.heart.toSvg({ width: 32, height: 32, class: 'text-info' })}
      <small class="text-muted d-block">info</small>
    </div>
    <div class="text-center">
      ${feather.icons.heart.toSvg({ width: 32, height: 32, class: 'text-dark' })}
      <small class="text-muted d-block">dark</small>
    </div>
    <div class="text-center bg-dark p-2 rounded">
      ${feather.icons.heart.toSvg({ width: 32, height: 32, class: 'text-light' })}
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
    ${feather.icons.plus.toSvg({ width: 16, height: 16, class: 'me-2' })}
    Adicionar
  </button>
  <button class="btn btn-success">
    ${feather.icons.check.toSvg({ width: 16, height: 16, class: 'me-2' })}
    Salvar
  </button>
  <button class="btn btn-danger">
    ${feather.icons['trash-2'].toSvg({ width: 16, height: 16, class: 'me-2' })}
    Excluir
  </button>
  <button class="btn btn-outline-primary">
    ${feather.icons.download.toSvg({ width: 16, height: 16, class: 'me-2' })}
    Download
  </button>
  <button class="btn btn-icon btn-primary">
    ${feather.icons.settings.toSvg({ width: 20, height: 20 })}
  </button>
  <button class="btn btn-icon btn-outline-secondary">
    ${feather.icons.bell.toSvg({ width: 20, height: 20 })}
  </button>
</div>
  `
};

export const Interactive = {
  render: () => {
    const allIcons = Object.keys(feather.icons).slice(0, 100); // Primeiros 100 ícones

    return `
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Buscar Ícone Feather</h5>
  </div>
  <div class="card-body">
    <div class="input-group mb-4">
      <span class="input-group-text">${feather.icons.search.toSvg({ width: 16, height: 16 })}</span>
      <input type="text" class="form-control" id="icon-search" placeholder="Digite o nome do ícone..." oninput="
        const query = this.value.toLowerCase();
        const icons = document.querySelectorAll('#icon-grid > div');
        let count = 0;
        icons.forEach(icon => {
          const name = icon.dataset.name;
          const visible = name.includes(query);
          icon.style.display = visible ? 'flex' : 'none';
          if (visible) count++;
        });
        document.getElementById('icon-count').textContent = count + ' ícones encontrados';
      ">
    </div>

    <p class="text-muted small mb-3" id="icon-count">${allIcons.length} ícones encontrados</p>

    <div id="icon-grid" class="d-flex flex-wrap gap-2" style="max-height: 500px; overflow-y: auto;">
      ${allIcons.map(iconName => {
        const svg = feather.icons[iconName].toSvg({ width: 24, height: 24 });
        return `
          <div data-name="${iconName}"
               class="d-flex flex-column align-items-center p-2 border rounded"
               style="width: 90px; cursor: pointer; transition: all 0.2s;"
               onmouseover="this.style.borderColor='#7367f0'; this.style.backgroundColor='#f8f7ff';"
               onmouseout="this.style.borderColor=''; this.style.backgroundColor='';"
               onclick="
                 navigator.clipboard.writeText('${iconName}');
                 const toast = document.createElement('div');
                 toast.innerHTML = '${feather.icons.check.toSvg({ width: 16, height: 16 })} Copiado: <strong>${iconName}</strong>';
                 toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #28a745; color: white; padding: 12px 24px; border-radius: 4px; z-index: 9999; display: flex; align-items: center; gap: 8px;';
                 document.body.appendChild(toast);
                 setTimeout(() => toast.remove(), 2000);
               ">
            ${svg}
            <small class="text-muted text-center mt-1" style="font-size: 9px; word-break: break-all;">${iconName}</small>
          </div>
        `;
      }).join('')}
    </div>

    <div class="mt-4 p-3 bg-light rounded">
      <p class="small mb-2">
        ${feather.icons.info.toSvg({ width: 16, height: 16, class: 'me-2' })}
        <strong>Dica:</strong> Clique em um ícone para copiar o nome.
      </p>
      <p class="small mb-0">
        <a href="https://feathericons.com/" target="_blank" class="text-decoration-none">
          ${feather.icons['external-link'].toSvg({ width: 14, height: 14, class: 'me-1' })}
          Ver todos os ${Object.keys(feather.icons).length} ícones no site oficial →
        </a>
      </p>
    </div>
  </div>
</div>
    `;
  }
};
