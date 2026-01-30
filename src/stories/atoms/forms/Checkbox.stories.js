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
