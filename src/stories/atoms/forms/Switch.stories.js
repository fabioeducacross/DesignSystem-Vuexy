/**
 * Switch - Atom (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.form-check.form-switch)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 */

import { formatHtmlSnippet, formatReactSnippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Forms/Switch',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Switch (Toggle)

Toggle switch estilizado do Vuexy para ativação on/off usando Bootstrap 5.

## Quando usar
- Ativação/desativação imediata de funcionalidades
- Configurações de usuário
- Estados binários (on/off, sim/não)

## Variantes
- **Estados**: off, on, disabled
- **Layout**: block (padrão), inline

## Acessibilidade
- Use \`<label>\` associado com \`htmlFor\`
- \`checked\` para estado ON
- \`disabled\` para desabilitar interação
        `
      }
    }
  },
  argTypes: {
    checked: { 
      control: 'boolean',
      description: 'Estado ON/OFF',
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
      table: { defaultValue: { summary: 'Switch Label' } }
    },
    inline: { 
      control: 'boolean',
      description: 'Layout inline',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createSwitch = ({ checked = false, disabled = false, label = 'Switch Label', inline = false, id = 'switch-1' }) => {
  const inlineClass = inline ? 'form-check-inline' : '';
  
  return `<div class="form-check form-switch ${inlineClass}">
  <input 
    class="form-check-input" 
    type="checkbox" 
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
  const markup = createSwitch(args);
  
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
        <pre><code>${formatReactSnippet(markup, 'Switch').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-3">
        ${createSwitch({ label: 'Switch OFF', id: 'sw-1' })}
        ${createSwitch({ label: 'Switch ON', checked: true, id: 'sw-2' })}
        ${createSwitch({ label: 'Disabled OFF', disabled: true, id: 'sw-3' })}
        ${createSwitch({ label: 'Disabled ON', checked: true, disabled: true, id: 'sw-4' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Inline Layout</h5>
      <div>
        ${createSwitch({ label: 'Option 1', inline: true, id: 'sw-inline-1' })}
        ${createSwitch({ label: 'Option 2', inline: true, checked: true, id: 'sw-inline-2' })}
        ${createSwitch({ label: 'Option 3', inline: true, id: 'sw-inline-3' })}
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  label: 'Switch Label',
  inline: false,
  id: 'switch-default'
};

export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  checked: true,
  label: 'Switch ON',
  id: 'switch-on'
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  label: 'Disabled Switch',
  id: 'switch-disabled'
};
