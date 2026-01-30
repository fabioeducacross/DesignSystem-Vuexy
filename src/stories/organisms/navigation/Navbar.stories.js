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
