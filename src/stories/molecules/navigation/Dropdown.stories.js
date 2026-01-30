/**
 * Dropdown - Molecule (Navigation)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.dropdown, .dropdown-menu)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Menu suspenso com opções de seleção.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Navigation/Dropdown',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Dropdown

Menu suspenso para seleção de opções ou ações.

## Quando usar
- Menus de ação
- Seleção de opções
- Navegação contextual
- Filtros e configurações

## Características
- Classes Bootstrap: \`.dropdown\`, \`.dropdown-menu\`, \`.dropdown-item\`
- Variantes: Primary, Secondary, Success, Danger, Warning, Info
- Alinhamento: Left (default), Right, Center
- Dividers e Headers para organização
- Ícones e badges nos itens

## Comportamento
- Toggle via data-bs-toggle="dropdown"
- Fecha ao clicar fora
- Navegação por teclado
- Suporta submenus (via CSS/JS adicional)

## Acessibilidade
- \`aria-expanded\` no botão trigger
- \`role="menu"\` no dropdown-menu
- \`role="menuitem"\` nos itens
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'],
      description: 'Cor do botão',
      table: { defaultValue: { summary: 'primary' } }
    },
    alignment: {
      control: { type: 'select' },
      options: ['start', 'end', 'center'],
      description: 'Alinhamento do menu',
      table: { defaultValue: { summary: 'start' } }
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Tamanho do botão',
      table: { defaultValue: { summary: 'default' } }
    },
    splitButton: {
      control: 'boolean',
      description: 'Botão dividido com ação principal',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createDropdown = ({ 
  variant = 'primary', 
  alignment = 'start',
  size = 'default',
  splitButton = false 
}) => {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const alignmentClass = alignment === 'end' ? 'dropdown-menu-end' : alignment === 'center' ? 'dropdown-menu-center' : '';
  
  if (splitButton) {
    return `<div class="btn-group">
  <button type="button" class="btn btn-${variant} ${sizeClass}">Action</button>
  <button type="button" class="btn btn-${variant} ${sizeClass} dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu ${alignmentClass}">
    <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
    <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
    <li><a class="dropdown-item" href="javascript:void(0);">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="javascript:void(0);">Separated link</a></li>
  </ul>
</div>`;
  }
  
  return `<div class="dropdown">
  <button class="btn btn-${variant} ${sizeClass} dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu ${alignmentClass}">
    <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
    <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
    <li><a class="dropdown-item" href="javascript:void(0);">Something else here</a></li>
  </ul>
</div>`;
};

const Template = (args) => {
  const markup = createDropdown(args);
  
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
        <pre><code>${formatReactSnippet(markup, 'Dropdown').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Variantes de Cores</h5>
      <div class="d-flex flex-wrap gap-3">
        ${createDropdown({ variant: 'primary' })}
        ${createDropdown({ variant: 'secondary' })}
        ${createDropdown({ variant: 'success' })}
        ${createDropdown({ variant: 'danger' })}
        ${createDropdown({ variant: 'warning' })}
        ${createDropdown({ variant: 'info' })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Tamanhos</h5>
      <div class="d-flex align-items-center gap-3">
        ${createDropdown({ variant: 'primary', size: 'sm' })}
        ${createDropdown({ variant: 'primary', size: 'default' })}
        ${createDropdown({ variant: 'primary', size: 'lg' })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Alinhamento do Menu</h5>
      <div class="d-flex gap-3">
        ${createDropdown({ variant: 'primary', alignment: 'start' })}
        ${createDropdown({ variant: 'primary', alignment: 'end' })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Split Button</h5>
      <div class="d-flex gap-3">
        ${createDropdown({ variant: 'primary', splitButton: true })}
        ${createDropdown({ variant: 'success', splitButton: true })}
      </div>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Com Ícones</h5>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bx bx-cog me-2"></i>Settings
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="javascript:void(0);">
              <i class="bx bx-user me-2"></i>Profile
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="javascript:void(0);">
              <i class="bx bx-bell me-2"></i>Notifications
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="javascript:void(0);">
              <i class="bx bx-cog me-2"></i>Settings
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <a class="dropdown-item text-danger" href="javascript:void(0);">
              <i class="bx bx-power-off me-2"></i>Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Com Headers e Dividers</h5>
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Menu
        </button>
        <ul class="dropdown-menu">
          <li><h6 class="dropdown-header">Navigation</h6></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Dashboard</a></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Reports</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><h6 class="dropdown-header">Account</h6></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Profile</a></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Settings</a></li>
        </ul>
      </div>
    </div>
    
    <div class="col-md-6 mt-4">
      <h5>Com Badge</h5>
      <div class="dropdown">
        <button class="btn btn-label-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Notifications <span class="badge rounded-pill bg-danger ms-2">5</span>
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item d-flex justify-content-between" href="javascript:void(0);">
              <span>New messages</span>
              <span class="badge bg-primary rounded-pill">3</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item d-flex justify-content-between" href="javascript:void(0);">
              <span>Updates</span>
              <span class="badge bg-info rounded-pill">2</span>
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-center" href="javascript:void(0);">View all</a></li>
        </ul>
      </div>
    </div>
    
    <div class="col-md-6 mt-4">
      <h5>Disabled Items</h5>
      <div class="dropdown">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Actions
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="javascript:void(0);">Enabled action</a></li>
          <li><a class="dropdown-item disabled" href="javascript:void(0);" aria-disabled="true">Disabled action</a></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle me-2"></i>
    <strong>Note:</strong> Dropdown functionality requires Bootstrap JavaScript. Make sure to include bootstrap.bundle.js or popper.js + bootstrap.js.
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  variant: 'primary',
  alignment: 'start',
  size: 'default',
  splitButton: false
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
  variant: 'secondary'
};

export const Success = Template.bind({});
Success.args = {
  ...Default.args,
  variant: 'success'
};

export const SplitButton = Template.bind({});
SplitButton.args = {
  ...Default.args,
  splitButton: true
};

export const RightAligned = Template.bind({});
RightAligned.args = {
  ...Default.args,
  alignment: 'end'
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  ...Default.args,
  size: 'sm'
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  ...Default.args,
  size: 'lg'
};
