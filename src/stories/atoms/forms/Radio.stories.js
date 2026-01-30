/**
 * Radio - Atom (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.form-check-input[type="radio"])
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 */

import { formatHtmlSnippet, formatReactSnippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Forms/Radio',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Radio Button

Radio button estilizado do Vuexy para seleção única usando Bootstrap 5.

## Quando usar
- Seleção única entre múltiplas opções
- Grupos de escolha exclusiva
- Filtros e configurações

## Variantes
- **Estados**: unchecked, checked, disabled
- **Layout**: block (padrão), inline

## Acessibilidade
- Use \`<label>\` associado com \`htmlFor\`
- Agrupe radios com \`name\` idêntico
- \`disabled\` para desabilitar interação
        `
      }
    }
  },
  argTypes: {
    checked: { 
      control: 'boolean',
      description: 'Estado selecionado',
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
      table: { defaultValue: { summary: 'Radio Label' } }
    },
    name: { 
      control: 'text',
      description: 'Nome do grupo (agrupa radios)',
      table: { defaultValue: { summary: 'radio-group' } }
    },
    inline: { 
      control: 'boolean',
      description: 'Layout inline',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createRadio = ({ checked = false, disabled = false, label = 'Radio Label', name = 'radio-group', inline = false, id = 'radio-1' }) => {
  const inlineClass = inline ? 'form-check-inline' : '';
  
  return `<div class="form-check ${inlineClass}">
  <input 
    class="form-check-input" 
    type="radio" 
    name="${name}"
    ${checked ? 'checked' : ''}
    ${disabled ? 'disabled' : ''}
    id="${id}"
  >
  <label class="form-check-label" for="${id}">
    ${label}
  </label>
</div>`;
};

const Template = (args) => {
  const markup = createRadio(args);
  
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
        <pre><code>${formatReactSnippet(markup, 'Radio').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-2">
        ${createRadio({ label: 'Unchecked', name: 'demo1', id: 'radio-1' })}
        ${createRadio({ label: 'Checked', checked: true, name: 'demo2', id: 'radio-2' })}
        ${createRadio({ label: 'Disabled', disabled: true, name: 'demo3', id: 'radio-3' })}
        ${createRadio({ label: 'Disabled Checked', checked: true, disabled: true, name: 'demo4', id: 'radio-4' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Grupo (seleção única)</h5>
      <div class="d-flex flex-column gap-2">
        ${createRadio({ label: 'Option 1', name: 'group1', checked: true, id: 'radio-g1' })}
        ${createRadio({ label: 'Option 2', name: 'group1', id: 'radio-g2' })}
        ${createRadio({ label: 'Option 3', name: 'group1', id: 'radio-g3' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Inline Layout</h5>
      <div>
        ${createRadio({ label: 'Option A', name: 'group2', inline: true, id: 'radio-inline-1' })}
        ${createRadio({ label: 'Option B', name: 'group2', inline: true, id: 'radio-inline-2' })}
        ${createRadio({ label: 'Option C', name: 'group2', inline: true, id: 'radio-inline-3' })}
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  label: 'Radio Label',
  name: 'radio-group',
  inline: false,
  id: 'radio-default'
};

export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  checked: true,
  label: 'Checked Radio',
  id: 'radio-checked'
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  label: 'Disabled Radio',
  id: 'radio-disabled'
};
