/**
 * ListGroup - Molecule (Content)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.list-group)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Lista de itens com estilização e comportamento interativo.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Content/ListGroup',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# List Group

Componente flexível para exibir listas de conteúdo.

## Quando usar
- Listas de itens clicáveis
- Navegação lateral
- Inbox/mensagens
- Configurações em lista
- Menu de opções
- Timeline de atividades

## Características
- Classe Bootstrap: \`.list-group\`, \`.list-group-item\`
- Tipos: Links (\`<a>\`), Buttons (\`<button>\`), Static (\`<li>\`)
- Estados: Active, Disabled
- Variantes: Primary, Secondary, Success, Danger, Warning, Info, Light, Dark
- Flush (sem bordas)
- Horizontal
- Com badges, ícones e custom content

## Acessibilidade
- \`role="list"\` em \`<ul>\`
- \`role="listitem"\` em cada item
- Estados comunicados via classes
- Navegável por teclado quando interativo
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Variante de cor',
      table: { defaultValue: { summary: 'default' } }
    },
    flush: {
      control: 'boolean',
      description: 'Remove bordas e arredondamento',
      table: { defaultValue: { summary: false } }
    },
    horizontal: {
      control: 'boolean',
      description: 'Layout horizontal',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createListGroup = ({ variant = 'default', flush = false, horizontal = false }) => {
  const flushClass = flush ? 'list-group-flush' : '';
  const horizontalClass = horizontal ? 'list-group-horizontal' : '';
  const itemClass = variant !== 'default' ? `list-group-item-${variant}` : '';
  
  return `<ul class="list-group ${flushClass} ${horizontalClass}">
  <li class="list-group-item ${itemClass}">First item</li>
  <li class="list-group-item ${itemClass}">Second item</li>
  <li class="list-group-item ${itemClass}">Third item</li>
</ul>`;
};

const Template = (args) => {
  const markup = createListGroup(args);
  
  return `
    <div style="max-width: 500px;">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'ListGroup').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-md-6">
      <h5>Default</h5>
      <ul class="list-group">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
      </ul>
    </div>
    
    <div class="col-md-6">
      <h5>Active & Disabled</h5>
      <ul class="list-group">
        <li class="list-group-item active">Active item</li>
        <li class="list-group-item">Second item</li>
        <li class="list-group-item">Third item</li>
        <li class="list-group-item disabled">Disabled item</li>
      </ul>
    </div>
    
    <div class="col-md-6 mt-4">
      <h5>Links</h5>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action active">Active link</a>
        <a href="#" class="list-group-item list-group-item-action">Link item</a>
        <a href="#" class="list-group-item list-group-item-action">Another link</a>
        <a href="#" class="list-group-item list-group-item-action disabled">Disabled link</a>
      </div>
    </div>
    
    <div class="col-md-6 mt-4">
      <h5>Buttons</h5>
      <div class="list-group">
        <button type="button" class="list-group-item list-group-item-action active">Active button</button>
        <button type="button" class="list-group-item list-group-item-action">Button item</button>
        <button type="button" class="list-group-item list-group-item-action">Another button</button>
        <button type="button" class="list-group-item list-group-item-action" disabled>Disabled button</button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Variantes de Cores</h5>
      <ul class="list-group">
        <li class="list-group-item">Default item</li>
        <li class="list-group-item list-group-item-primary">Primary item</li>
        <li class="list-group-item list-group-item-secondary">Secondary item</li>
        <li class="list-group-item list-group-item-success">Success item</li>
        <li class="list-group-item list-group-item-danger">Danger item</li>
        <li class="list-group-item list-group-item-warning">Warning item</li>
        <li class="list-group-item list-group-item-info">Info item</li>
      </ul>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Com Badges</h5>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Inbox
          <span class="badge bg-primary rounded-pill">14</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Drafts
          <span class="badge bg-secondary rounded-pill">2</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Sent
          <span class="badge bg-success rounded-pill">67</span>
        </li>
      </ul>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Com Ícones</h5>
      <ul class="list-group">
        <li class="list-group-item">
          <i class="bx bx-home me-2"></i>Dashboard
        </li>
        <li class="list-group-item">
          <i class="bx bx-user me-2"></i>Profile
        </li>
        <li class="list-group-item">
          <i class="bx bx-cog me-2"></i>Settings
        </li>
        <li class="list-group-item">
          <i class="bx bx-bell me-2"></i>Notifications
        </li>
      </ul>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Custom Content</h5>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">List group item heading</h6>
            <small>3 days ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small>And some small print.</small>
        </a>
        <a href="#" class="list-group-item list-group-item-action active">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">List group item heading</h6>
            <small class="text-white">3 days ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small class="text-white">And some muted small print.</small>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">List group item heading</h6>
            <small class="text-muted">3 days ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small class="text-muted">And some muted small print.</small>
        </a>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Flush (Sem Bordas)</h5>
      <div class="card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
        </ul>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Horizontal</h5>
      <ul class="list-group list-group-horizontal">
        <li class="list-group-item">First</li>
        <li class="list-group-item">Second</li>
        <li class="list-group-item">Third</li>
      </ul>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Inbox Example</h5>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex align-items-start">
            <div class="avatar avatar-sm me-3">
              <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/1.png" alt="Avatar" class="rounded-circle">
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="mb-0">John Doe</h6>
                <small class="text-muted">2 hours ago</small>
              </div>
              <p class="mb-0 text-muted">Hey! How are you doing?</p>
            </div>
          </div>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex align-items-start">
            <div class="avatar avatar-sm me-3">
              <img src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/2.png" alt="Avatar" class="rounded-circle">
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="mb-0">Jane Smith</h6>
                <small class="text-muted">5 hours ago</small>
              </div>
              <p class="mb-0 text-muted">Meeting rescheduled to tomorrow</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  flush: false,
  horizontal: false
};

export const Primary = Template.bind({});
Primary.args = {
  ...Default.args,
  variant: 'primary'
};

export const Flush = Template.bind({});
Flush.args = {
  ...Default.args,
  flush: true
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  ...Default.args,
  horizontal: true
};

export const Interactive = {
  render: () => {
    return `
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive List Group Demo</h5>
        <p class="text-muted">Click items to toggle active state</p>
        
        <div class="list-group" id="listGroup">
          <button type="button" class="list-group-item list-group-item-action active" onclick="toggleActive(this)">
            <div class="d-flex justify-content-between align-items-center">
              <span><i class="bx bx-home me-2"></i>Dashboard</span>
              <span class="badge bg-primary rounded-pill">5</span>
            </div>
          </button>
          <button type="button" class="list-group-item list-group-item-action" onclick="toggleActive(this)">
            <div class="d-flex justify-content-between align-items-center">
              <span><i class="bx bx-inbox me-2"></i>Inbox</span>
              <span class="badge bg-primary rounded-pill">12</span>
            </div>
          </button>
          <button type="button" class="list-group-item list-group-item-action" onclick="toggleActive(this)">
            <div class="d-flex justify-content-between align-items-center">
              <span><i class="bx bx-user me-2"></i>Profile</span>
              <span class="badge bg-primary rounded-pill">3</span>
            </div>
          </button>
          <button type="button" class="list-group-item list-group-item-action" onclick="toggleActive(this)">
            <div class="d-flex justify-content-between align-items-center">
              <span><i class="bx bx-cog me-2"></i>Settings</span>
            </div>
          </button>
        </div>
        
        <div class="alert alert-info mt-3" id="selectedItem">Selected: Dashboard</div>
        
        <script>
          function toggleActive(element) {
            document.querySelectorAll('#listGroup .list-group-item').forEach(item => {
              item.classList.remove('active');
            });
            
            element.classList.add('active');
            
            const text = element.querySelector('span').textContent.trim();
            document.getElementById('selectedItem').textContent = 'Selected: ' + text;
          }
        </script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `;
  }
};
