/**
 * Range - Atom (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.form-range)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Slider de range para seleção numérica.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Forms/Range',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Range Slider

Controle deslizante para seleção de valores numéricos em um intervalo.

## Quando usar
- Controle de volume/brightness
- Filtros de preço (min-max)
- Ajuste de parâmetros
- Seleção de quantidade

## Características
- Classe Bootstrap: \`.form-range\`
- Atributos: min, max, step, value
- Customizável via CSS
- Thumb e track estilizados

## Acessibilidade
- \`aria-label\` ou label associado
- \`aria-valuenow\`, \`aria-valuemin\`, \`aria-valuemax\`
- Navegação por teclado (setas)
        `
      }
    }
  },
  argTypes: {
    min: {
      control: 'number',
      description: 'Valor mínimo',
      table: { defaultValue: { summary: 0 } }
    },
    max: {
      control: 'number',
      description: 'Valor máximo',
      table: { defaultValue: { summary: 100 } }
    },
    step: {
      control: 'number',
      description: 'Incremento',
      table: { defaultValue: { summary: 1 } }
    },
    value: {
      control: 'number',
      description: 'Valor atual',
      table: { defaultValue: { summary: 50 } }
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
      table: { defaultValue: { summary: false } }
    },
    showValue: {
      control: 'boolean',
      description: 'Mostra valor atual',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createRange = ({ 
  min = 0, 
  max = 100, 
  step = 1, 
  value = 50, 
  disabled = false,
  showValue = false 
}) => {
  const disabledAttr = disabled ? 'disabled' : '';
  const valueDisplay = showValue ? `<div class="mt-2 text-center"><strong>${value}</strong></div>` : '';
  
  return `<input type="range" class="form-range" min="${min}" max="${max}" step="${step}" value="${value}" ${disabledAttr} aria-label="Range slider">
${valueDisplay}`;
};

const Template = (args) => {
  const markup = createRange(args);
  
  return `
    <div style="max-width: 500px;">
      <label for="rangeInput" class="form-label">Select value</label>
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Range').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-md-6">
      <h5>Default Range</h5>
      <label class="form-label">Volume (0-100)</label>
      ${createRange({ min: 0, max: 100, value: 75, showValue: true })}
    </div>
    
    <div class="col-md-6">
      <h5>Custom Step</h5>
      <label class="form-label">Price ($0-$1000, step $50)</label>
      ${createRange({ min: 0, max: 1000, step: 50, value: 500, showValue: true })}
    </div>
    
    <div class="col-md-6">
      <h5>Percentage</h5>
      <label class="form-label">Brightness (0-100%)</label>
      ${createRange({ min: 0, max: 100, step: 5, value: 80, showValue: true })}
    </div>
    
    <div class="col-md-6">
      <h5>Disabled</h5>
      <label class="form-label">Locked setting</label>
      ${createRange({ min: 0, max: 100, value: 50, disabled: true, showValue: true })}
    </div>
    
    <div class="col-12 mt-5">
      <h5>With Labels</h5>
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span><i class="bx bx-volume-low"></i> Min</span>
            <span><i class="bx bx-volume-full"></i> Max</span>
          </div>
          ${createRange({ min: 0, max: 100, value: 60 })}
          <div class="d-flex justify-content-between mt-2">
            <small class="text-muted">0</small>
            <small class="text-muted">25</small>
            <small class="text-muted">50</small>
            <small class="text-muted">75</small>
            <small class="text-muted">100</small>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  disabled: false,
  showValue: true
};

export const CustomStep = Template.bind({});
CustomStep.args = {
  ...Default.args,
  min: 0,
  max: 1000,
  step: 50,
  value: 500
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true
};

export const WithValue = Template.bind({});
WithValue.args = {
  ...Default.args,
  value: 75,
  showValue: true
};

export const Interactive = {
  render: () => {
    return `
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive Range Slider Demo</h5>
        <p class="text-muted">Real-time value display</p>
        
        <label class="form-label">Volume Control</label>
        <input type="range" class="form-range" id="volumeSlider" min="0" max="100" value="50">
        
        <div class="d-flex justify-content-between align-items-center mt-2">
          <div class="text-muted">
            <i class="bx bx-volume-low"></i> 0
          </div>
          <div class="text-center">
            <div class="badge bg-primary fs-5" id="valueDisplay">50</div>
            <div class="small text-muted">Current Value</div>
          </div>
          <div class="text-muted">
            100 <i class="bx bx-volume-full"></i>
          </div>
        </div>
        
        <div class="progress mt-3" style="height: 10px;">
          <div class="progress-bar" id="progressBar" style="width: 50%"></div>
        </div>
        
        <div class="mt-3">
          <small class="text-muted">Status: <span id="status">Medium</span></small>
        </div>
        
        <script>
          const slider = document.getElementById('volumeSlider');
          const display = document.getElementById('valueDisplay');
          const progress = document.getElementById('progressBar');
          const status = document.getElementById('status');
          
          slider.addEventListener('input', (e) => {
            const value = e.target.value;
            display.textContent = value;
            progress.style.width = value + '%';
            
            if (value < 30) {
              status.textContent = 'Low';
              progress.className = 'progress-bar bg-success';
            } else if (value < 70) {
              status.textContent = 'Medium';
              progress.className = 'progress-bar bg-warning';
            } else {
              status.textContent = 'High';
              progress.className = 'progress-bar bg-danger';
            }
          });
        </script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `;
  }
};
