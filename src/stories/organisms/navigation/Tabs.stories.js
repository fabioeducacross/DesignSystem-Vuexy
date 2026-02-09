/**
 * Tabs - Organism (Navigation)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.nav-tabs, .tab-content, .tab-pane)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 * 
 * Sistema completo de tabs com navegação e conteúdo trocável.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Vuexy/Organisms/Navigation/Tabs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Tabs

Sistema de navegação por abas do Vuexy para organizar conteúdo relacionado.

## Quando usar
- Agrupar conteúdo relacionado
- Alternar entre diferentes visualizações
- Economizar espaço vertical

## Composição
- **Nav Tabs** - Botões de navegação (.nav-tabs)
- **Tab Panes** - Painéis de conteúdo (.tab-pane)
- **Active State** - Tab ativa usa .active e .show

## Variantes
- Pills: .nav-pills em vez de .nav-tabs
- Vertical: .nav-align-left ou .nav-align-right
- Justified: .nav-fill para largura igual

## Acessibilidade
- \`role="tablist"\` no nav
- \`role="tab"\` em cada botão
- \`role="tabpanel"\` em cada pane
- \`aria-selected\` na tab ativa
        `
      }
    }
  },
  argTypes: {
    activeTab: {
      control: 'select',
      options: ['home', 'profile', 'messages', 'settings'],
      description: 'Tab ativa',
      table: { defaultValue: { summary: 'home' } }
    },
    style: {
      control: 'select',
      options: ['tabs', 'pills'],
      description: 'Estilo das tabs',
      table: { defaultValue: { summary: 'tabs' } }
    },
    alignment: {
      control: 'select',
      options: ['top', 'left', 'right'],
      description: 'Alinhamento das tabs',
      table: { defaultValue: { summary: 'top' } }
    }
  }
};

const tabsData = [
  { 
    id: 'home', 
    label: 'Home', 
    icon: 'bx-home',
    content: `<h5>Home Content</h5><p>Welcome to the home tab. This is where your dashboard and overview information would be displayed.</p>
      <div class="alert alert-primary" role="alert">
        <div class="alert-body">This tab contains important dashboard metrics.</div>
      </div>` 
  },
  { 
    id: 'profile', 
    label: 'Profile', 
    icon: 'bx-user',
    content: `<h5>Profile Settings</h5>
      <div class="card mb-3">
        <div class="card-body">
          <div class="mb-3">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-control" value="John Doe">
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" value="john@example.com">
          </div>
        </div>
      </div>` 
  },
  { 
    id: 'messages', 
    label: 'Messages', 
    icon: 'bx-envelope',
    content: `<h5>Your Messages</h5>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">New message from Sarah</h6>
            <small>3 mins ago</small>
          </div>
          <p class="mb-1">Hey! How are you doing today?</p>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">Project update</h6>
            <small>1 hour ago</small>
          </div>
          <p class="mb-1">The project has been completed successfully.</p>
        </a>
      </div>` 
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: 'bx-cog',
    content: `<h5>Application Settings</h5>
      <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="emailNotif" checked>
        <label class="form-check-label" for="emailNotif">Email notifications</label>
      </div>
      <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="pushNotif">
        <label class="form-check-label" for="pushNotif">Push notifications</label>
      </div>
      <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="darkMode">
        <label class="form-check-label" for="darkMode">Dark mode</label>
      </div>` 
  }
];

const createTabs = ({ activeTab = 'home', style = 'tabs', alignment = 'top' }) => {
  const navClass = style === 'pills' ? 'nav-pills' : 'nav-tabs';
  const alignClass = alignment !== 'top' ? `nav-align-${alignment}` : '';
  const isVertical = alignment === 'left' || alignment === 'right';
  
  const navItems = tabsData.map(tab => {
    const isActive = tab.id === activeTab;
    return `
      <li class="nav-item" role="presentation">
        <button class="nav-link ${isActive ? 'active' : ''}" 
                id="${tab.id}-tab" 
                onclick="
                  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
                  this.classList.add('active');
                  document.querySelectorAll('.tab-pane').forEach(el => {el.classList.remove('show', 'active')});
                  document.getElementById('${tab.id}').classList.add('show', 'active');
                "
                type="button" 
                role="tab" 
                aria-controls="${tab.id}" 
                aria-selected="${isActive}">
          <i class="bx ${tab.icon} me-1"></i> ${tab.label}
        </button>
      </li>`;
  }).join('');
  
  const tabPanes = tabsData.map(tab => {
    const isActive = tab.id === activeTab;
    return `
      <div class="tab-pane fade ${isActive ? 'show active' : ''}" 
           id="${tab.id}" 
           role="tabpanel" 
           aria-labelledby="${tab.id}-tab">
        <div class="p-3">
          ${tab.content}
        </div>
      </div>`;
  }).join('');
  
  if (isVertical) {
    return `<div class="nav-align-${alignment}">
  <div class="row">
    <div class="col-md-3">
      <ul class="nav ${navClass} flex-column ${alignClass}" role="tablist">
        ${navItems}
      </ul>
    </div>
    <div class="col-md-9">
      <div class="tab-content">
        ${tabPanes}
      </div>
    </div>
  </div>
</div>`;
  }
  
  return `<div>
  <ul class="nav ${navClass} ${alignClass}" role="tablist">
    ${navItems}
  </ul>
  <div class="tab-content mt-3">
    ${tabPanes}
  </div>
</div>`;
};

const Template = (args) => {
  const markup = createTabs(args);
  
  return `
    <div>
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Tabs').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Default Tabs</h5>
      ${createTabs({ activeTab: 'home', style: 'tabs' })}
    </div>
    
    <div class="col-12 mt-5">
      <h5>Pills Style</h5>
      ${createTabs({ activeTab: 'profile', style: 'pills' })}
    </div>
    
    <div class="col-12 mt-5">
      <h5>Vertical Tabs</h5>
      ${createTabs({ activeTab: 'messages', style: 'tabs', alignment: 'left' })}
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  activeTab: 'home',
  style: 'tabs',
  alignment: 'top'
};

export const ProfileActive = Template.bind({});
ProfileActive.args = {
  ...Default.args,
  activeTab: 'profile'
};

export const PillsStyle = Template.bind({});
PillsStyle.args = {
  ...Default.args,
  style: 'pills',
  activeTab: 'settings'
};

export const VerticalLeft = Template.bind({});
VerticalLeft.args = {
  ...Default.args,
  alignment: 'left',
  activeTab: 'messages'
};

// ============ INTERACTIVE DEMO ============
export const Interactive = () => {
  const containerId = 'tabs-interactive-' + Math.random().toString(36).substr(2, 9);
  
  const markup = `
    <div id="${containerId}">
      <ul class="nav nav-tabs" role="tablist">
        ${tabsData.map((tab, idx) => `
          <li class="nav-item" role="presentation">
            <button class="nav-link ${idx === 0 ? 'active' : ''} ${tab.id === 'settings' ? 'disabled' : ''}" 
                    data-tab-id="${tab.id}"
                    type="button" 
                    role="tab"
                    ${tab.id === 'settings' ? 'disabled' : ''}>
              <i class="bx ${tab.icon} me-1"></i> ${tab.label}
              ${tab.id === 'settings' ? '<small class="ms-1 text-muted">(disabled)</small>' : ''}
            </button>
          </li>`).join('')}
      </ul>
      <div class="tab-content mt-3">
        ${tabsData.map((tab, idx) => `
          <div class="tab-pane fade ${idx === 0 ? 'show active' : ''}" 
               data-tab-pane="${tab.id}">
            <div class="p-3">
              ${tab.content}
            </div>
          </div>`).join('')}
      </div>
    </div>
  `;
  
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const buttons = container.querySelectorAll('.nav-link:not(.disabled)');
    const panes = container.querySelectorAll('.tab-pane');
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab-id');
        
        // Remove active de todos os buttons
        buttons.forEach(b => b.classList.remove('active'));
        // Adiciona active ao clicado
        button.classList.add('active');
        
        // Remove active/show de todos os panes
        panes.forEach(pane => {
          pane.classList.remove('show', 'active');
        });
        
        // Adiciona active/show ao pane correspondente
        const targetPane = container.querySelector(`[data-tab-pane="${tabId}"]`);
        if (targetPane) {
          targetPane.classList.add('show', 'active');
        }
      });
      
      // Keyboard support: Enter to activate
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          button.click();
        }
      });
    });
    
    // Arrow keys navigation
    const handleKeydown = (e) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      
      const activeButton = container.querySelector('.nav-link.active');
      if (!activeButton) return;
      
      const buttonsArray = Array.from(buttons);
      const currentIndex = buttonsArray.indexOf(activeButton);
      
      let nextIndex;
      if (e.key === 'ArrowLeft') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : buttonsArray.length - 1;
      } else {
        nextIndex = currentIndex < buttonsArray.length - 1 ? currentIndex + 1 : 0;
      }
      
      e.preventDefault();
      buttonsArray[nextIndex].focus();
      buttonsArray[nextIndex].click();
    };
    
    document.addEventListener('keydown', handleKeydown);
    
    // Cleanup
    container._cleanup = () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, 100);
  
  return `
    ${markup}
    <div class="alert alert-info mt-3">
      <strong>Interactive demo:</strong> Click on tabs to switch content. Note that the "Settings" tab is disabled and cannot be clicked.
    </div>
  `;
};
Interactive.parameters = {
  docs: {
    description: {
      story: `Interactive tabs with full keyboard support:
- **Click**: Switch tabs with mouse
- **Enter**: Activate focused tab
- **Arrow Left/Right**: Navigate between tabs
- **Disabled tabs**: Cannot be activated

Keyboard navigation enhances accessibility for keyboard-only users.`
    }
  }
};
