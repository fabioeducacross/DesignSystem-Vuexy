/**
 * ButtonGroup - Molecule (Actions)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.btn-group)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Agrupamento de botões relacionados.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Vuexy/Molecules/Actions/ButtonGroup',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Button Group

Agrupa botões relacionados em uma única linha.

## Quando usar
- Ferramentas de edição (bold, italic, underline)
- Alternância entre visualizações (list, grid, map)
- Ações relacionadas em conjunto
- Toggle de opções mutuamente exclusivas
- Paginação e navegação

## Características
- Classe Bootstrap: \`.btn-group\`, \`.btn-group-vertical\`
- Tamanhos: Small, Default, Large
- Orientação: Horizontal, Vertical
- Radio buttons visualmente como botões
- Toolbar com múltiplos grupos

## Comportamento
- Botões adjacentes sem espaçamento
- Cantos arredondados apenas nas extremidades
- Foco e hover em botão individual
- Suporta dropdowns integrados

## Acessibilidade
- \`role="group"\` automático
- \`aria-label\` para contexto do grupo
- Estados individuais preservados
        `
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Tamanho dos botões',
      table: { defaultValue: { summary: 'default' } }
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline-primary', 'outline-secondary'],
      description: 'Estilo dos botões',
      table: { defaultValue: { summary: 'outline-primary' } }
    },
    vertical: {
      control: 'boolean',
      description: 'Orientação vertical',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createButtonGroup = ({ size = 'default', variant = 'outline-primary', vertical = false }) => {
  const sizeClass = size === 'sm' ? 'btn-group-sm' : size === 'lg' ? 'btn-group-lg' : '';
  const groupClass = vertical ? 'btn-group-vertical' : 'btn-group';
  
  return `<div class="${groupClass} ${sizeClass}" role="group" aria-label="Basic button group">
  <button type="button" class="btn btn-${variant}">Left</button>
  <button type="button" class="btn btn-${variant}">Middle</button>
  <button type="button" class="btn btn-${variant}">Right</button>
</div>`;
};

const Template = (args) => {
  const markup = createButtonGroup(args);
  
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
        <pre><code>${formatReactSnippet(markup, 'ButtonGroup').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Variantes de Estilo</h5>
      <div class="demo-vertical-spacing">
        ${createButtonGroup({ variant: 'primary' })}
        ${createButtonGroup({ variant: 'secondary' })}
        ${createButtonGroup({ variant: 'outline-primary' })}
        ${createButtonGroup({ variant: 'outline-secondary' })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Tamanhos</h5>
      <div class="demo-vertical-spacing">
        ${createButtonGroup({ size: 'sm', variant: 'outline-primary' })}
        ${createButtonGroup({ size: 'default', variant: 'outline-primary' })}
        ${createButtonGroup({ size: 'lg', variant: 'outline-primary' })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Vertical</h5>
      <div class="btn-group-vertical" role="group">
        <button type="button" class="btn btn-outline-primary">Top</button>
        <button type="button" class="btn btn-outline-primary">Middle</button>
        <button type="button" class="btn btn-outline-primary">Bottom</button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Com Ícones</h5>
      <div class="btn-group" role="group" aria-label="Text formatting">
        <button type="button" class="btn btn-outline-secondary">
          <i class="bx bx-bold"></i>
        </button>
        <button type="button" class="btn btn-outline-secondary">
          <i class="bx bx-italic"></i>
        </button>
        <button type="button" class="btn btn-outline-secondary">
          <i class="bx bx-underline"></i>
        </button>
        <button type="button" class="btn btn-outline-secondary">
          <i class="bx bx-strikethrough"></i>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>View Switcher</h5>
      <div class="btn-group" role="group" aria-label="View mode">
        <button type="button" class="btn btn-primary active">
          <i class="bx bx-list-ul me-1"></i>List
        </button>
        <button type="button" class="btn btn-outline-primary">
          <i class="bx bx-grid-alt me-1"></i>Grid
        </button>
        <button type="button" class="btn btn-outline-primary">
          <i class="bx bx-map me-1"></i>Map
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Button Toolbar</h5>
      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group me-2" role="group" aria-label="Edit group">
          <button type="button" class="btn btn-outline-secondary">
            <i class="bx bx-copy"></i>
          </button>
          <button type="button" class="btn btn-outline-secondary">
            <i class="bx bx-cut"></i>
          </button>
          <button type="button" class="btn btn-outline-secondary">
            <i class="bx bx-paste"></i>
          </button>
        </div>
        <div class="btn-group me-2" role="group" aria-label="Text align">
          <button type="button" class="btn btn-outline-secondary">
            <i class="bx bx-align-left"></i>
          </button>
          <button type="button" class="btn btn-outline-secondary">
            <i class="bx bx-align-middle"></i>
          </button>
          <button type="button" class="btn btn-outline-secondary">
            <i class="bx bx-align-right"></i>
          </button>
        </div>
        <div class="btn-group" role="group" aria-label="Undo group">
          <button type="button" class="btn btn-outline-secondary">
            <i class="bx bx-undo"></i>
          </button>
          <button type="button" class="btn btn-outline-secondary">
            <i class="bx bx-redo"></i>
          </button>
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Radio Button Group</h5>
      <div class="btn-group" role="group" aria-label="Radio button group">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" checked>
        <label class="btn btn-outline-primary" for="btnradio1">Option 1</label>

        <input type="radio" class="btn-check" name="btnradio" id="btnradio2">
        <label class="btn btn-outline-primary" for="btnradio2">Option 2</label>

        <input type="radio" class="btn-check" name="btnradio" id="btnradio3">
        <label class="btn btn-outline-primary" for="btnradio3">Option 3</label>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Checkbox Button Group</h5>
      <div class="btn-group" role="group" aria-label="Checkbox button group">
        <input type="checkbox" class="btn-check" id="btncheck1" checked>
        <label class="btn btn-outline-secondary" for="btncheck1">Bold</label>

        <input type="checkbox" class="btn-check" id="btncheck2">
        <label class="btn btn-outline-secondary" for="btncheck2">Italic</label>

        <input type="checkbox" class="btn-check" id="btncheck3">
        <label class="btn btn-outline-secondary" for="btncheck3">Underline</label>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Com Dropdown (Dropdown PERMITIDO - usar Dropdown component)</h5>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-primary">Action</button>
        <button type="button" class="btn btn-primary">Another</button>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-primary">More</button>
        </div>
      </div>
      <div class="alert alert-info mt-3"><small>Note: Para dropdown real, use o componente Dropdown separado (PERMITIDO)</small></div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Pagination Style</h5>
      <div class="btn-group" role="group" aria-label="Pagination">
        <button type="button" class="btn btn-outline-primary">
          <i class="bx bx-chevron-left"></i>
        </button>
        <button type="button" class="btn btn-outline-primary">1</button>
        <button type="button" class="btn btn-primary">2</button>
        <button type="button" class="btn btn-outline-primary">3</button>
        <button type="button" class="btn btn-outline-primary">4</button>
        <button type="button" class="btn btn-outline-primary">
          <i class="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  size: 'default',
  variant: 'outline-primary',
  vertical: false
};

export const Primary = Template.bind({});
Primary.args = {
  ...Default.args,
  variant: 'primary'
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  size: 'sm'
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  size: 'lg'
};

export const Vertical = Template.bind({});
Vertical.args = {
  ...Default.args,
  vertical: true
};

// Interactive Story (state controlado)
export const Interactive = {
  render: () => {
    return `
      <div class="p-4">
        <h6 class="mb-3">Interactive Button Groups</h6>
        
        <!-- Demo 1: Toggle Selection -->
        <div class="mb-4">
          <h6 class="mb-2">Toggle Selection</h6>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary" onclick="this.classList.toggle('btn-primary'); this.classList.toggle('btn-outline-primary');">Bold</button>
            <button type="button" class="btn btn-outline-primary" onclick="this.classList.toggle('btn-primary'); this.classList.toggle('btn-outline-primary');">Italic</button>
            <button type="button" class="btn btn-outline-primary" onclick="this.classList.toggle('btn-primary'); this.classList.toggle('btn-outline-primary');">Underline</button>
          </div>
        </div>
        
        <!-- Demo 2: Radio-style -->
        <div class="mb-4">
          <h6 class="mb-2">View Mode (Radio)</h6>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary" onclick="
              this.parentElement.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
              });
              this.classList.remove('btn-outline-primary');
              this.classList.add('btn-primary');
            "><i class="ri-list-check"></i> List</button>
            <button type="button" class="btn btn-outline-primary" onclick="
              this.parentElement.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
              });
              this.classList.remove('btn-outline-primary');
              this.classList.add('btn-primary');
            "><i class="ri-grid-fill"></i> Grid</button>
            <button type="button" class="btn btn-outline-primary" onclick="
              this.parentElement.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
              });
              this.classList.remove('btn-outline-primary');
              this.classList.add('btn-primary');
            "><i class="ri-map-pin-fill"></i> Map</button>
          </div>
        </div>
        
        <!-- Demo 3: Counter -->
        <div class="mb-4">
          <h6 class="mb-2">Counter</h6>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-primary" onclick="
              const span = document.getElementById('counter-value');
              span.textContent = parseInt(span.textContent) - 1;
            "><i class="ri-subtract-line"></i></button>
            <button type="button" class="btn btn-outline-primary" disabled><span id="counter-value">0</span></button>
            <button type="button" class="btn btn-outline-primary" onclick="
              const span = document.getElementById('counter-value');
              span.textContent = parseInt(span.textContent) + 1;
            "><i class="ri-add-line"></i></button>
          </div>
        </div>
        
        <p class="text-muted mt-4 small">
          <i class="ri-information-line"></i> Interactive demo via controlled state (no Bootstrap JS required)
        </p>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interativo com button groups funcionais usando state controlado (classes). Clique para alternar estados.'
      },
      source: {
        code: `<!-- Toggle Selection -->
<div class="btn-group" role="group">
  <button type="button" class="btn btn-primary">Bold</button>
  <button type="button" class="btn btn-outline-primary">Italic</button>
  <button type="button" class="btn btn-outline-primary">Underline</button>
</div>

<!-- Radio Style -->
<div class="btn-group" role="group">
  <button type="button" class="btn btn-primary"><i class="ri-list-check"></i> List</button>
  <button type="button" class="btn btn-outline-primary"><i class="ri-grid-fill"></i> Grid</button>
  <button type="button" class="btn btn-outline-primary"><i class="ri-map-pin-fill"></i> Map</button>
</div>`
      }
    }
  }
};
