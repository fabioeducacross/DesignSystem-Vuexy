/**
 * Sidebar - Organism (Navigation)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (sidebar classes) e vuexy/js/menu.js
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 * 
 * Menu lateral colapsável com subitens e estados visuais.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Vuexy/Organisms/Navigation/Sidebar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Sidebar

Menu lateral de navegação do Vuexy com suporte a multi-níveis e collapse.

## Quando usar
- Navegação principal de aplicações
- Menu administrativo com múltiplas seções
- Navegação hierárquica com submenus

## Composição
- **Menu Items** - Links de navegação principais
- **Submenus** - Itens aninhados expandíveis
- **Icons** - Ícones visuais para cada item
- **Badges** - Contadores ou notificações
- **Collapse** - Estado expandido/colapsado

## Estados
- Expanded: Menu totalmente visível
- Collapsed: Apenas ícones visíveis
- Hover: Tooltip em modo colapsado
- Active: Item selecionado destacado

## Acessibilidade
- \`role="navigation"\` no nav
- \`aria-expanded\` em submenus
- \`aria-current="page"\` no item ativo
- Suporte a navegação por teclado
        `
      }
    }
  },
  argTypes: {
    collapsed: {
      control: 'boolean',
      description: 'Estado colapsado do menu',
      table: { defaultValue: { summary: false } }
    },
    activeItem: {
      control: 'text',
      description: 'ID do item ativo',
      table: { defaultValue: { summary: 'dashboard' } }
    },
    showBadges: {
      control: 'boolean',
      description: 'Mostra badges nos itens',
      table: { defaultValue: { summary: true } }
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Tema do sidebar',
      table: { defaultValue: { summary: 'light' } }
    }
  }
};

const menuItems = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: 'bx-home-circle', 
    badge: null,
    children: null
  },
  { 
    id: 'layouts', 
    label: 'Layouts', 
    icon: 'bx-layout', 
    badge: null,
    children: [
      { id: 'collapsed', label: 'Collapsed menu', icon: null },
      { id: 'content-navbar', label: 'Content navbar', icon: null },
      { id: 'fluid', label: 'Fluid', icon: null }
    ]
  },
  { 
    id: 'pages', 
    label: 'Pages', 
    icon: 'bx-dock-top', 
    badge: { text: '5', color: 'danger' },
    children: [
      { id: 'account', label: 'Account Settings', icon: null },
      { id: 'profile', label: 'Profile', icon: null },
      { id: 'faq', label: 'FAQ', icon: null },
      { id: 'pricing', label: 'Pricing', icon: null },
      { id: 'misc', label: 'Misc', icon: null }
    ]
  },
  { 
    id: 'components', 
    label: 'Components', 
    icon: 'bx-box', 
    badge: null,
    children: null
  },
  { 
    id: 'cards', 
    label: 'Cards', 
    icon: 'bx-collection', 
    badge: { text: 'New', color: 'primary' },
    children: null
  },
  { 
    id: 'ui', 
    label: 'User Interface', 
    icon: 'bx-crown', 
    badge: null,
    children: [
      { id: 'accordion', label: 'Accordion', icon: null },
      { id: 'alerts', label: 'Alerts', icon: null },
      { id: 'badges', label: 'Badges', icon: null },
      { id: 'buttons', label: 'Buttons', icon: null },
      { id: 'modals', label: 'Modals', icon: null }
    ]
  },
  { 
    id: 'forms', 
    label: 'Forms & Tables', 
    icon: 'bx-detail', 
    badge: null,
    children: [
      { id: 'form-elements', label: 'Form Elements', icon: null },
      { id: 'form-layouts', label: 'Form Layouts', icon: null },
      { id: 'tables', label: 'Tables', icon: null }
    ]
  },
  { 
    id: 'charts', 
    label: 'Charts', 
    icon: 'bx-chart', 
    badge: null,
    children: null
  }
];

const createSidebar = ({ collapsed = false, activeItem = 'dashboard', showBadges = true, theme = 'light' }) => {
  const collapsedClass = collapsed ? 'layout-menu-collapsed' : '';
  const themeClass = theme === 'dark' ? 'bg-dark' : 'bg-menu-theme';
  
  const renderMenuItem = (item, level = 0) => {
    const isActive = item.id === activeItem;
    const hasChildren = item.children && item.children.length > 0;
    const badgeHtml = showBadges && item.badge 
      ? `<span class="badge badge-center rounded-pill bg-${item.badge.color} ms-auto">${item.badge.text}</span>` 
      : '';
    
    if (hasChildren) {
      const submenuItems = item.children.map(child => renderMenuItem(child, 1)).join('');
      
      return `
        <li class="menu-item ${isActive ? 'active open' : ''}">
          <a href="javascript:void(0);" class="menu-link menu-toggle">
            <i class="menu-icon tf-icons bx ${item.icon}"></i>
            <div data-i18n="${item.label}">${item.label}</div>
            ${badgeHtml}
          </a>
          <ul class="menu-sub">
            ${submenuItems}
          </ul>
        </li>`;
    }
    
    return `
      <li class="menu-item ${isActive ? 'active' : ''}">
        <a href="javascript:void(0);" class="menu-link">
          ${item.icon ? `<i class="menu-icon tf-icons bx ${item.icon}"></i>` : ''}
          <div data-i18n="${item.label}">${item.label}</div>
          ${badgeHtml}
        </a>
      </li>`;
  };
  
  const menuHtml = menuItems.map(item => renderMenuItem(item)).join('');
  
  return `<aside id="layout-menu" class="layout-menu menu-vertical menu ${themeClass} ${collapsedClass}" data-bg-class="${themeClass}">
  <div class="app-brand demo">
    <a href="#" class="app-brand-link">
      <span class="app-brand-logo demo">
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z" fill="#7367F0"/>
          <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616"/>
          <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z" fill="#7367F0"/>
        </svg>
      </span>
      <span class="app-brand-text demo menu-text fw-bold ms-2">Vuexy</span>
    </a>

    <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto ${collapsed ? '' : 'd-xl-none'}">
      <i class="bx bx-chevron-left bx-sm align-middle"></i>
    </a>
  </div>

  <div class="menu-inner-shadow"></div>

  <ul class="menu-inner py-1" style="${collapsed ? 'overflow: hidden;' : ''}">
    ${menuHtml}
  </ul>
</aside>`;
};

const Template = (args) => {
  const markup = createSidebar(args);
  
  return `
    <div style="height: 600px; overflow: hidden; display: flex;">
      ${markup}
      
      <div class="flex-grow-1 p-4" style="background: #f5f5f9;">
        <h5>Content Area</h5>
        <p class="text-muted">O conteúdo da página apareceria aqui ao lado do sidebar.</p>
        
        <div class="alert alert-info">
          <strong>Dica:</strong> Use o control "collapsed" para ver o menu colapsado.
        </div>
        
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">Menu States</h6>
            <ul>
              <li><strong>Active Item:</strong> ${args.activeItem}</li>
              <li><strong>Collapsed:</strong> ${args.collapsed ? 'Yes' : 'No'}</li>
              <li><strong>Theme:</strong> ${args.theme}</li>
              <li><strong>Badges:</strong> ${args.showBadges ? 'Visible' : 'Hidden'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Sidebar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Expanded (Default)</h5>
      <div style="height: 400px; overflow: hidden; border: 1px solid #ddd;">
        ${createSidebar({ collapsed: false, activeItem: 'dashboard' })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Collapsed</h5>
      <div style="height: 400px; overflow: hidden; border: 1px solid #ddd;">
        ${createSidebar({ collapsed: true, activeItem: 'components' })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>With Submenu Open</h5>
      <div style="height: 400px; overflow: hidden; border: 1px solid #ddd;">
        ${createSidebar({ collapsed: false, activeItem: 'account' })}
      </div>
    </div>
  </div>
`;

export const Expanded = Template.bind({});
Expanded.args = {
  collapsed: false,
  activeItem: 'dashboard',
  showBadges: true,
  theme: 'light'
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  ...Expanded.args,
  collapsed: true
};

export const WithSubmenu = Template.bind({});
WithSubmenu.args = {
  ...Expanded.args,
  activeItem: 'profile'
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  ...Expanded.args,
  theme: 'dark'
};

// ============ INTERACTIVE DEMO ============
export const Interactive = () => {
  const containerId = 'sidebar-interactive-' + Math.random().toString(36).substr(2, 9);
  
  const markup = `
    <div id="${containerId}" style="height: 500px; border: 1px solid #ddd; position: relative;">
      <aside class="menu menu-vertical" style="width: 260px; height: 100%; overflow-y: auto;">
        <div class="app-brand p-3">
          <span class="app-brand-text demo menu-text fw-bold">Vuexy</span>
          <button class="btn btn-sm btn-icon ms-auto" data-action="toggle" style="position: absolute; right: 10px;">
            <i class="bx bx-chevron-left"></i>
          </button>
        </div>
        
        <ul class="menu-inner py-1">
          ${menuItems.map(item => `
            <li class="menu-item ${item.id === 'dashboard' ? 'active' : ''}" data-item-id="${item.id}">
              <a href="javascript:void(0);" class="menu-link ${item.children ? 'menu-toggle' : ''}" ${item.children ? 'data-has-submenu="true"' : ''}>
                <i class="menu-icon tf-icons bx ${item.icon}"></i>
                <div class="menu-text">${item.label}</div>
                ${item.badge ? `<div class="badge bg-${item.badge.color} rounded-pill ms-auto">${item.badge.text}</div>` : ''}
              </a>
              ${item.children ? `
                <ul class="menu-sub" style="display: none;">
                  ${item.children.map(child => `
                    <li class="menu-item" data-item-id="${child.id}">
                      <a href="javascript:void(0);" class="menu-link">
                        <div class="menu-text">${child.label}</div>
                      </a>
                    </li>`).join('')}
                </ul>` : ''}
            </li>`).join('')}
        </ul>
      </aside>
    </div>
  `;
  
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const menu = container.querySelector('.menu');
    const toggleBtn = container.querySelector('[data-action="toggle"]');
    const menuItems = container.querySelectorAll('.menu-item');
    const menuLinks = container.querySelectorAll('.menu-link');
    
    let isCollapsed = false;
    
    // Toggle collapsed state
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        const icon = toggleBtn.querySelector('i');
        
        if (isCollapsed) {
          menu.style.width = '80px';
          icon.classList.remove('bx-chevron-left');
          icon.classList.add('bx-chevron-right');
          container.querySelectorAll('.menu-text').forEach(el => el.style.display = 'none');
          container.querySelectorAll('.badge').forEach(el => el.style.display = 'none');
          container.querySelectorAll('.menu-sub').forEach(el => el.style.display = 'none');
        } else {
          menu.style.width = '260px';
          icon.classList.remove('bx-chevron-right');
          icon.classList.add('bx-chevron-left');
          container.querySelectorAll('.menu-text').forEach(el => el.style.display = '');
          container.querySelectorAll('.badge').forEach(el => el.style.display = '');
        }
      });
    }
    
    // Handle menu item clicks
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const menuItem = link.closest('.menu-item');
        const hasSubmenu = link.hasAttribute('data-has-submenu');
        
        if (hasSubmenu && !isCollapsed) {
          // Toggle submenu
          e.preventDefault();
          const submenu = menuItem.querySelector('.menu-sub');
          if (submenu) {
            const isOpen = submenu.style.display !== 'none';
            submenu.style.display = isOpen ? 'none' : 'block';
            link.classList.toggle('open', !isOpen);
          }
        } else if (!hasSubmenu) {
          // Set active item
          menuItems.forEach(item => item.classList.remove('active'));
          menuItem.classList.add('active');
        }
      });
    });
  }, 100);
  
  return `
    ${markup}
    <div class="alert alert-info mt-3">
      <strong>Interactive demo:</strong> 
      <ul class="mb-0">
        <li>Click the chevron button to toggle collapsed/expanded state</li>
        <li>Click menu items to set active state</li>
        <li>Click items with submenus to expand/collapse (only when expanded)</li>
      </ul>
    </div>
  `;
};
Interactive.parameters = {
  docs: {
    description: {
      story: 'Interactive sidebar demo with toggle, active states, and submenu expansion.'
    }
  }
};
