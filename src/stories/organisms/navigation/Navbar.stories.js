/**
 * Navbar - Organism (Navigation)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.navbar, .navbar-expand)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 * 
 * Bootstrap 5 navbar component do Vuexy com search, notificações e user menu.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Navigation/Navbar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Navbar

Barra de navegação principal do Vuexy para aplicações web.

## Quando usar
- Header principal da aplicação
- Navegação global
- Ações rápidas (search, notifications, profile)

## Composição
- **Brand/Logo** - Identidade da aplicação
- **Search** - Busca global (opcional)
- **Actions** - Notificações, mensagens, perfil
- **Responsive** - Colapsa em mobile com hamburger menu

## Variantes
- Default: Brand + search + actions
- WithSearch: Inclui campo de busca
- WithActions: Notificações + user menu

## Acessibilidade
- \`role="navigation"\` no nav
- \`aria-label\` em botões de ícone
- \`aria-expanded\` no toggle mobile
        `
      }
    }
  },
  argTypes: {
    brandText: {
      control: 'text',
      description: 'Texto do brand/logo',
      table: { defaultValue: { summary: 'Vuexy' } }
    },
    showSearch: {
      control: 'boolean',
      description: 'Mostra campo de busca',
      table: { defaultValue: { summary: true } }
    },
    showUserMenu: {
      control: 'boolean',
      description: 'Mostra menu do usuário',
      table: { defaultValue: { summary: true } }
    },
    notificationCount: {
      control: 'number',
      description: 'Número de notificações',
      table: { defaultValue: { summary: 0 } }
    },
    userName: {
      control: 'text',
      description: 'Nome do usuário',
      table: { defaultValue: { summary: 'John Doe' } }
    }
  }
};

const createNavbar = ({ brandText = 'Vuexy', showSearch = true, showUserMenu = true, notificationCount = 0, userName = 'John Doe' }) => {
  const notificationBadge = notificationCount > 0 
    ? `<span class="badge rounded-pill badge-notifications bg-danger">${notificationCount}</span>` 
    : '';
  
  const searchHtml = showSearch ? `
    <div class="navbar-search-wrapper search-input-wrapper d-none d-md-block ms-3">
      <input type="text" class="form-control search-input" placeholder="Search..." aria-label="Search">
      <i class="bx bx-search"></i>
    </div>` : '';
  
  const userMenuHtml = showUserMenu ? `
    <li class="nav-item navbar-dropdown dropdown-user dropdown">
      <a class="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
        <div class="avatar avatar-online">
          <img src="/vuexy/img/avatars/1.png" alt="${userName}" class="w-px-40 h-auto rounded-circle">
        </div>
      </a>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <a class="dropdown-item" href="#">
            <div class="d-flex">
              <div class="flex-shrink-0 me-3">
                <div class="avatar avatar-online">
                  <img src="/vuexy/img/avatars/1.png" alt="${userName}" class="w-px-40 h-auto rounded-circle">
                </div>
              </div>
              <div class="flex-grow-1">
                <span class="fw-semibold d-block">${userName}</span>
                <small class="text-muted">Admin</small>
              </div>
            </div>
          </a>
        </li>
        <li><div class="dropdown-divider"></div></li>
        <li><a class="dropdown-item" href="#"><i class="bx bx-user me-2"></i> My Profile</a></li>
        <li><a class="dropdown-item" href="#"><i class="bx bx-cog me-2"></i> Settings</a></li>
        <li><div class="dropdown-divider"></div></li>
        <li><a class="dropdown-item" href="#"><i class="bx bx-power-off me-2"></i> Log Out</a></li>
      </ul>
    </li>` : '';

  return `<nav class="navbar navbar-expand-lg navbar-light bg-navbar-theme">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">${brandText}</a>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarNav">
      ${searchHtml}
      
      <ul class="navbar-nav flex-row align-items-center ms-auto">
        <li class="nav-item navbar-dropdown dropdown-notifications me-3">
          <a class="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown" aria-label="Notifications">
            <i class="bx bx-bell bx-sm"></i>
            ${notificationBadge}
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li class="dropdown-header"><span>Notifications</span></li>
            <li><div class="dropdown-divider"></div></li>
            <li><a class="dropdown-item" href="#"><i class="bx bx-info-circle me-2"></i> You have ${notificationCount || 'no'} notifications</a></li>
          </ul>
        </li>
        
        ${userMenuHtml}
      </ul>
    </div>
  </div>
</nav>`;
};

const Template = (args) => {
  const markup = createNavbar(args);
  
  return `
    <div style="margin: -1rem; min-height: 80px;">
      ${markup}
    </div>
    
    <div style="padding: 2rem 1rem;">
      <p class="text-muted"><strong>Nota:</strong> Dropdowns requerem Bootstrap JS para funcionar. Aqui mostramos apenas o markup.</p>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Navbar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Default</h5>
      <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
        ${createNavbar({ brandText: 'Vuexy', showSearch: true, showUserMenu: true, notificationCount: 3 })}
      </div>
    </div>
    
    <div class="col-12">
      <h5>Without Search</h5>
      <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
        ${createNavbar({ brandText: 'Vuexy', showSearch: false, showUserMenu: true, notificationCount: 0 })}
      </div>
    </div>
    
    <div class="col-12">
      <h5>Minimal</h5>
      <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
        ${createNavbar({ brandText: 'Vuexy', showSearch: false, showUserMenu: false, notificationCount: 0 })}
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  brandText: 'Vuexy',
  showSearch: true,
  showUserMenu: true,
  notificationCount: 3,
  userName: 'John Doe'
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  ...Default.args,
  showSearch: true
};

export const WithNotifications = Template.bind({});
WithNotifications.args = {
  ...Default.args,
  notificationCount: 12
};

// ============ INTERACTIVE DEMO ============
export const Interactive = () => {
  const containerId = 'navbar-interactive-' + Math.random().toString(36).substr(2, 9);
  
  const markup = `
    <nav id="${containerId}" class="navbar navbar-expand-lg navbar-light bg-navbar-theme">
      <div class="container-fluid">
        <!-- Brand -->
        <a class="navbar-brand" href="javascript:void(0)">Vuexy</a>
        
        <!-- Search -->
        <div class="navbar-search-wrapper search-input-wrapper d-none d-md-block ms-3">
          <input type="text" class="form-control search-input" placeholder="Search..." aria-label="Search">
          <i class="bx bx-search"></i>
        </div>
        
        <!-- Spacer -->
        <div class="navbar-nav-right d-flex align-items-center ms-auto" id="navbar-collapse">
          <ul class="navbar-nav flex-row align-items-center">
            
            <!-- Notifications -->
            <li class="nav-item navbar-dropdown dropdown" data-dropdown="notifications">
              <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0)" data-toggle="notifications">
                <i class="bx bx-bell bx-sm"></i>
                <span class="badge rounded-pill badge-notifications bg-danger">5</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" data-menu="notifications">
                <li>
                  <div class="dropdown-header d-flex align-items-center py-3">
                    <h5 class="text-body mb-0 me-auto">Notifications</h5>
                    <a href="javascript:void(0)" class="dropdown-notifications-all text-body"><i class="bx fs-4 bx-envelope-open"></i></a>
                  </div>
                </li>
                <li>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item list-group-item-action">
                      <div class="d-flex">
                        <div class="flex-shrink-0 me-3">
                          <div class="avatar">
                            <span class="avatar-initial rounded-circle bg-label-primary"><i class="bx bx-cart"></i></span>
                          </div>
                        </div>
                        <div class="flex-grow-1">
                          <h6 class="mb-1">New order received! 🎉</h6>
                          <p class="mb-0 small">You have 5 new orders</p>
                          <small class="text-muted">2 minutes ago</small>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item list-group-item-action">
                      <div class="d-flex">
                        <div class="flex-shrink-0 me-3">
                          <div class="avatar">
                            <span class="avatar-initial rounded-circle bg-label-success"><i class="bx bx-user"></i></span>
                          </div>
                        </div>
                        <div class="flex-grow-1">
                          <h6 class="mb-1">New user registered</h6>
                          <p class="mb-0 small">John Doe joined</p>
                          <small class="text-muted">1 hour ago</small>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            
            <!-- User -->
            <li class="nav-item navbar-dropdown dropdown" data-dropdown="user">
              <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0)" data-toggle="user">
                <div class="avatar avatar-online">
                  <img src="/vuexy/img/avatars/1.png" alt="John Doe" class="w-px-40 h-auto rounded-circle">
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" data-menu="user">
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <div class="d-flex">
                      <div class="flex-shrink-0 me-3">
                        <div class="avatar avatar-online">
                          <img src="/vuexy/img/avatars/1.png" alt="John Doe" class="w-px-40 h-auto rounded-circle">
                        </div>
                      </div>
                      <div class="flex-grow-1">
                        <span class="fw-medium d-block">John Doe</span>
                        <small class="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li><div class="dropdown-divider"></div></li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i class="bx bx-user me-2"></i>
                    <span class="align-middle">My Profile</span>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i class="bx bx-cog me-2"></i>
                    <span class="align-middle">Settings</span>
                  </a>
                </li>
                <li><div class="dropdown-divider"></div></li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i class="bx bx-power-off me-2"></i>
                    <span class="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
  
  setTimeout(() => {
    const navbar = document.getElementById(containerId);
    if (!navbar) return;
    
    const dropdowns = navbar.querySelectorAll('[data-dropdown]');
    
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('[data-toggle]');
      const menu = dropdown.querySelector('[data-menu]');
      
      if (!toggle || !menu) return;
      
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Fecha outros dropdowns
        dropdowns.forEach(other => {
          if (other !== dropdown) {
            const otherMenu = other.querySelector('[data-menu]');
            if (otherMenu) {
              otherMenu.classList.remove('show');
              other.classList.remove('show');
            }
          }
        });
        
        // Toggle atual
        const isOpen = menu.classList.contains('show');
        menu.classList.toggle('show', !isOpen);
        dropdown.classList.toggle('show', !isOpen);
      });
    });
    
    // Close dropdowns when clicking outside (não implementado conforme requisitos)
  }, 100);
  
  return `
    ${markup}
    <div class="alert alert-info mt-3">
      <strong>Interactive demo:</strong> Click on the notification bell or user avatar to toggle their respective dropdown menus.
    </div>
  `;
};
Interactive.parameters = {
  docs: {
    description: {
      story: 'Interactive navbar demo with working notification and user menu dropdowns.'
    }
  }
};
