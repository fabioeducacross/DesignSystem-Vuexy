/**
 * Checkbox - Atom (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.form-check-input[type="checkbox"])
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 */

import { formatHtmlSnippet, formatReactSnippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Forms/Checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Checkbox

Checkbox estilizado do Vuexy para seleção múltipla usando Bootstrap 5.

## Quando usar
- Seleção múltipla de itens
- Ativação de opções on/off
- Formulários com múltiplas escolhas

## Variantes
- **Estados**: unchecked, checked, indeterminate, disabled
- **Layout**: block (padrão), inline

## Acessibilidade
- Use \`<label>\` associado com \`htmlFor\`
- Estado indeterminate requer JavaScript
- \`disabled\` para desabilitar interação
        `
      }
    }
  },
  argTypes: {
    checked: { 
      control: 'boolean',
      description: 'Estado marcado',
      table: { defaultValue: { summary: false } }
    },
    indeterminate: { 
      control: 'boolean',
      description: 'Estado indeterminado (parcial)',
      table: { defaultValue: { summary: false } }
    },
    disabled: { 
      control: 'boolean',
      description: 'Estado desabilitado',
      table: { defaultValue: { summary: false } }
    },
    label: { 
      control: 'text',
      description: 'Texto do label',
      table: { defaultValue: { summary: 'Checkbox Label' } }
    },
    inline: { 
      control: 'boolean',
      description: 'Layout inline',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createCheckbox = ({ checked = false, indeterminate = false, disabled = false, label = 'Checkbox Label', inline = false, id = 'checkbox-1' }) => {
  const inlineClass = inline ? 'form-check-inline' : '';
  const indeterminateAttr = indeterminate ? 'data-indeterminate="true"' : '';
  
  return `<div class="form-check ${inlineClass}">
  <input 
    class="form-check-input" 
    type="checkbox" 
    ${checked ? 'checked' : ''}
    ${disabled ? 'disabled' : ''}
    ${indeterminateAttr}
    id="${id}"
  >
  <label class="form-check-label" for="${id}">
    ${label}
  </label>
</div>`;
};

const Template = (args) => {
  const markup = createCheckbox(args);
  
  return `
    <div style="max-width: 400px;">
      ${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Checkbox').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-2">
        ${createCheckbox({ label: 'Unchecked', id: 'cb-1' })}
        ${createCheckbox({ label: 'Checked', checked: true, id: 'cb-2' })}
        ${createCheckbox({ label: 'Indeterminate', indeterminate: true, id: 'cb-3' })}
        ${createCheckbox({ label: 'Disabled', disabled: true, id: 'cb-4' })}
        ${createCheckbox({ label: 'Disabled Checked', checked: true, disabled: true, id: 'cb-5' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Inline Layout</h5>
      <div>
        ${createCheckbox({ label: 'Option 1', inline: true, id: 'cb-inline-1' })}
        ${createCheckbox({ label: 'Option 2', inline: true, id: 'cb-inline-2' })}
        ${createCheckbox({ label: 'Option 3', inline: true, id: 'cb-inline-3' })}
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  checked: false,
  indeterminate: false,
  disabled: false,
  label: 'Checkbox Label',
  inline: false,
  id: 'checkbox-default'
};

export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  checked: true,
  label: 'Checked Checkbox',
  id: 'checkbox-checked'
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  ...Default.args,
  indeterminate: true,
  label: 'Indeterminate Checkbox',
  id: 'checkbox-indeterminate'
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  label: 'Disabled Checkbox',
  id: 'checkbox-disabled'
};

// Interactive Demo
export const Interactive = () => {
  const containerId = 'checkbox-interactive-' + Math.random().toString(36).substr(2, 9);
  
  const markup = `
    <div id="${containerId}" style="max-width: 600px;">
      <div class="alert alert-info mb-3">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Select/deselect checkboxes to see real-time updates.
      </div>
      
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Checkbox Interactions</h5>
          
          <!-- Single checkbox -->
          <div class="mb-4">
            <h6>Single Selection</h6>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="agree-${containerId}" data-checkbox="agree">
              <label class="form-check-label" for="agree-${containerId}">
                I agree to the terms and conditions
              </label>
            </div>
            <div class="mt-2">
              <span class="badge bg-secondary" id="agree-status-${containerId}">Not agreed</span>
            </div>
          </div>
          
          <!-- Multiple checkboxes (features) -->
          <div class="mb-4">
            <h6>Select Features</h6>
            <div class="d-flex flex-column gap-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="feature-email-${containerId}" data-feature="email" checked>
                <label class="form-check-label" for="feature-email-${containerId}">
                  Email notifications
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="feature-sms-${containerId}" data-feature="sms">
                <label class="form-check-label" for="feature-sms-${containerId}">
                  SMS notifications
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="feature-push-${containerId}" data-feature="push" checked>
                <label class="form-check-label" for="feature-push-${containerId}">
                  Push notifications
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="feature-newsletter-${containerId}" data-feature="newsletter">
                <label class="form-check-label" for="feature-newsletter-${containerId}">
                  Newsletter
                </label>
              </div>
            </div>
            <div class="mt-2">
              <small class="text-muted">Selected: <span class="badge bg-primary" id="feature-count-${containerId}">2</span> features</small>
            </div>
          </div>
          
          <!-- Select All / Indeterminate -->
          <div class="mb-4">
            <h6>Select All (Indeterminate State)</h6>
            <div class="form-check mb-2">
              <input class="form-check-input" type="checkbox" id="select-all-${containerId}" data-checkbox="select-all">
              <label class="form-check-label fw-bold" for="select-all-${containerId}">
                Select All Tasks
              </label>
            </div>
            <div class="ms-4 d-flex flex-column gap-2">
              <div class="form-check">
                <input class="form-check-input task-checkbox" type="checkbox" id="task-1-${containerId}" data-task="task">
                <label class="form-check-label" for="task-1-${containerId}">
                  Review pull requests
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input task-checkbox" type="checkbox" id="task-2-${containerId}" data-task="task">
                <label class="form-check-label" for="task-2-${containerId}">
                  Update documentation
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input task-checkbox" type="checkbox" id="task-3-${containerId}" data-task="task">
                <label class="form-check-label" for="task-3-${containerId}">
                  Deploy to production
                </label>
              </div>
            </div>
            <div class="mt-2">
              <span class="badge bg-info" id="task-status-${containerId}">0 / 3 tasks completed</span>
            </div>
          </div>
          
          <!-- Disabled state -->
          <div class="mb-3">
            <h6>Disabled State</h6>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="disabled-1-${containerId}" disabled>
              <label class="form-check-label text-muted" for="disabled-1-${containerId}">
                This option is disabled
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const idSuffix = containerId.split('-')[2];
    
    // Single agree checkbox
    const agreeCheckbox = container.querySelector(`#agree-${containerId}`);
    const agreeStatus = container.querySelector(`#agree-status-${containerId}`);
    
    agreeCheckbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        agreeStatus.textContent = '✅ Agreed';
        agreeStatus.className = 'badge bg-success';
      } else {
        agreeStatus.textContent = 'Not agreed';
        agreeStatus.className = 'badge bg-secondary';
      }
    });
    
    // Feature checkboxes
    const featureCheckboxes = container.querySelectorAll('[data-feature]');
    const featureCount = container.querySelector(`#feature-count-${containerId}`);
    
    const updateFeatureCount = () => {
      const count = Array.from(featureCheckboxes).filter(cb => cb.checked).length;
      featureCount.textContent = count;
    };
    
    featureCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateFeatureCount);
    });
    
    // Select All with indeterminate state
    const selectAllCheckbox = container.querySelector(`#select-all-${containerId}`);
    const taskCheckboxes = container.querySelectorAll('.task-checkbox');
    const taskStatus = container.querySelector(`#task-status-${containerId}`);
    
    const updateSelectAll = () => {
      const checkedCount = Array.from(taskCheckboxes).filter(cb => cb.checked).length;
      const totalCount = taskCheckboxes.length;
      
      if (checkedCount === 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
        taskStatus.textContent = '0 / 3 tasks completed';
        taskStatus.className = 'badge bg-secondary';
      } else if (checkedCount === totalCount) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
        taskStatus.textContent = '✅ All tasks completed!';
        taskStatus.className = 'badge bg-success';
      } else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
        taskStatus.textContent = `${checkedCount} / ${totalCount} tasks completed`;
        taskStatus.className = 'badge bg-info';
      }
    };
    
    selectAllCheckbox.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      taskCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
      });
      updateSelectAll();
    });
    
    taskCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateSelectAll);
    });
    
    // Initialize
    updateSelectAll();
    
  }, 100);
  
  return markup;
};

Interactive.parameters = {
  docs: {
    description: {
      story: `
**Interactive Demo:** Demonstração completa de funcionalidades de checkbox.

Funcionalidades:
- **Single selection**: Toggle simples com feedback de estado
- **Multiple selection**: Contador de seleções múltiplas
- **Select All**: Estado indeterminado quando parcialmente selecionado
- **Task completion**: Tracking de progresso com badges
- **Disabled state**: Checkboxes desabilitados

**Estado Indeterminado:** O checkbox "Select All" mostra estado indeterminado quando apenas algumas tarefas estão selecionadas.
      `
    }
  }
};
