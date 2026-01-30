/**
 * ProgressBar - Molecule (Feedback)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.progress, .progress-bar)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Barra de progresso para indicar conclusão de processos.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Molecules/Feedback/ProgressBar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Progress Bar

Indicador visual de progresso ou conclusão de uma tarefa.

## Quando usar
- Upload/download de arquivos
- Formulários multi-etapa
- Processamento de dados
- Loading de operações longas
- Indicadores de habilidade/skill

## Características
- Classes Bootstrap: \`.progress\`, \`.progress-bar\`
- Variantes: Primary, Secondary, Success, Danger, Warning, Info
- Altura customizável
- Labels (texto interno)
- Striped e Animated
- Múltiplas barras (stacked)

## Acessibilidade
- \`role="progressbar"\`
- \`aria-valuenow\`, \`aria-valuemin\`, \`aria-valuemax\`
- \`aria-label\` para contexto
        `
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Valor do progresso (0-100)',
      table: { defaultValue: { summary: 50 } }
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Cor da barra',
      table: { defaultValue: { summary: 'primary' } }
    },
    height: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Altura da barra',
      table: { defaultValue: { summary: 'default' } }
    },
    striped: {
      control: 'boolean',
      description: 'Estilo listrado',
      table: { defaultValue: { summary: false } }
    },
    animated: {
      control: 'boolean',
      description: 'Animação listrada',
      table: { defaultValue: { summary: false } }
    },
    showLabel: {
      control: 'boolean',
      description: 'Mostra porcentagem',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createProgressBar = ({ 
  value = 50, 
  variant = 'primary', 
  height = 'default',
  striped = false,
  animated = false,
  showLabel = false 
}) => {
  const heightStyle = height === 'sm' ? 'height: 8px;' : height === 'lg' ? 'height: 24px;' : '';
  const stripedClass = striped || animated ? 'progress-bar-striped' : '';
  const animatedClass = animated ? 'progress-bar-animated' : '';
  const label = showLabel ? `${value}%` : '';
  
  return `<div class="progress" style="${heightStyle}">
  <div class="progress-bar bg-${variant} ${stripedClass} ${animatedClass}" 
    role="progressbar" 
    style="width: ${value}%" 
    aria-valuenow="${value}" 
    aria-valuemin="0" 
    aria-valuemax="100">
    ${label}
  </div>
</div>`;
};

const Template = (args) => {
  const markup = createProgressBar(args);
  
  return `
    <div style="max-width: 600px;">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'ProgressBar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Variantes de Cores</h5>
      <div class="demo-vertical-spacing">
        ${createProgressBar({ value: 25, variant: 'primary', showLabel: true })}
        ${createProgressBar({ value: 40, variant: 'secondary', showLabel: true })}
        ${createProgressBar({ value: 60, variant: 'success', showLabel: true })}
        ${createProgressBar({ value: 75, variant: 'danger', showLabel: true })}
        ${createProgressBar({ value: 85, variant: 'warning', showLabel: true })}
        ${createProgressBar({ value: 95, variant: 'info', showLabel: true })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Alturas</h5>
      <div class="demo-vertical-spacing">
        <div>
          <small class="text-muted">Small (8px)</small>
          ${createProgressBar({ value: 50, height: 'sm' })}
        </div>
        <div>
          <small class="text-muted">Default (16px)</small>
          ${createProgressBar({ value: 50, height: 'default' })}
        </div>
        <div>
          <small class="text-muted">Large (24px)</small>
          ${createProgressBar({ value: 50, height: 'lg', showLabel: true })}
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Striped & Animated</h5>
      <div class="demo-vertical-spacing">
        <div>
          <small class="text-muted">Striped</small>
          ${createProgressBar({ value: 65, variant: 'success', striped: true })}
        </div>
        <div>
          <small class="text-muted">Animated Striped</small>
          ${createProgressBar({ value: 75, variant: 'primary', animated: true })}
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Com Labels</h5>
      <div class="demo-vertical-spacing">
        ${createProgressBar({ value: 30, variant: 'primary', height: 'lg', showLabel: true })}
        ${createProgressBar({ value: 60, variant: 'success', height: 'lg', showLabel: true })}
        ${createProgressBar({ value: 90, variant: 'warning', height: 'lg', showLabel: true })}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Múltiplas Barras (Stacked)</h5>
      <div class="progress">
        <div class="progress-bar bg-primary" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
        <div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
        <div class="progress-bar bg-info" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Casos de Uso</h5>
      
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="card-title">File Upload Progress</h6>
          <p class="text-muted mb-2">document.pdf (2.5 MB)</p>
          ${createProgressBar({ value: 73, variant: 'primary', showLabel: true })}
          <small class="text-muted">73% complete - 27 seconds remaining</small>
        </div>
      </div>
      
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="card-title">Profile Completion</h6>
          <div class="demo-vertical-spacing">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span>Basic Info</span>
              <span class="badge bg-success">Complete</span>
            </div>
            ${createProgressBar({ value: 100, variant: 'success' })}
            
            <div class="d-flex justify-content-between align-items-center mb-1 mt-3">
              <span>Work Experience</span>
              <span class="badge bg-primary">In Progress</span>
            </div>
            ${createProgressBar({ value: 60, variant: 'primary' })}
            
            <div class="d-flex justify-content-between align-items-center mb-1 mt-3">
              <span>Skills & Certifications</span>
              <span class="badge bg-label-secondary">Not Started</span>
            </div>
            ${createProgressBar({ value: 0, variant: 'secondary' })}
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">Skills</h6>
          <div class="demo-vertical-spacing">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span>JavaScript</span>
              <span class="text-muted">90%</span>
            </div>
            ${createProgressBar({ value: 90, variant: 'primary' })}
            
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span>React</span>
              <span class="text-muted">85%</span>
            </div>
            ${createProgressBar({ value: 85, variant: 'info' })}
            
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span>Node.js</span>
              <span class="text-muted">75%</span>
            </div>
            ${createProgressBar({ value: 75, variant: 'success' })}
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  value: 50,
  variant: 'primary',
  height: 'default',
  striped: false,
  animated: false,
  showLabel: false
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  value: 75,
  showLabel: true
};

export const Striped = Template.bind({});
Striped.args = {
  ...Default.args,
  value: 60,
  variant: 'success',
  striped: true
};

export const Animated = Template.bind({});
Animated.args = {
  ...Default.args,
  value: 70,
  variant: 'primary',
  animated: true
};

export const SmallHeight = Template.bind({});
SmallHeight.args = {
  ...Default.args,
  value: 45,
  height: 'sm'
};

export const LargeHeight = Template.bind({});
LargeHeight.args = {
  ...Default.args,
  value: 80,
  height: 'lg',
  showLabel: true
};
