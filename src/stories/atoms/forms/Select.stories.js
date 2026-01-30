/**
 * Select - Atom (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.form-select)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 */

import { formatHtmlSnippet, formatReactSnippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Forms/Select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Select Dropdown

Select dropdown estilizado do Vuexy para seleção de opções usando Bootstrap 5.

## Quando usar
- Seleção única entre múltiplas opções
- Filtros e formulários
- Configurações com opções predefinidas

## Variantes
- **Tamanhos**: sm (pequeno), default, lg (grande)
- **Tipos**: single, multiple
- **Estados**: default, disabled, valid, invalid

## Acessibilidade
- Sempre associe com \`<label>\`
- Use \`disabled\` para desabilitar
- Primeira opção como placeholder
        `
      }
    }
  },
  argTypes: {
    size: { 
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tamanho do select',
      table: { defaultValue: { summary: 'default' } }
    },
    disabled: { 
      control: 'boolean',
      description: 'Estado desabilitado',
      table: { defaultValue: { summary: false } }
    },
    multiple: { 
      control: 'boolean',
      description: 'Seleção múltipla',
      table: { defaultValue: { summary: false } }
    },
    state: { 
      control: 'select',
      options: ['default', 'valid', 'invalid'],
      description: 'Estado de validação',
      table: { defaultValue: { summary: 'default' } }
    }
  }
};

const createSelect = ({ size = 'default', disabled = false, multiple = false, state = 'default' }) => {
  const sizeClass = size === 'sm' ? 'form-select-sm' : size === 'lg' ? 'form-select-lg' : '';
  const stateClass = state === 'valid' ? 'is-valid' : state === 'invalid' ? 'is-invalid' : '';
  const classes = ['form-select', sizeClass, stateClass].filter(Boolean).join(' ');
  
  return `<select 
  class="${classes}"
  ${disabled ? 'disabled' : ''}
  ${multiple ? 'multiple size="4"' : ''}
>
  <option ${!multiple ? 'selected' : ''}>Choose an option...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
  ${multiple ? '<option value="4">Option 4</option>' : ''}
</select>`;
};

const Template = (args) => {
  const markup = createSelect(args);
  const feedbackMsg = args.state === 'valid' ? 'Looks good!' : args.state === 'invalid' ? 'Please select a valid option.' : '';
  
  return `
    <div style="max-width: 400px;">
      ${markup}
      ${args.state !== 'default' ? `<div class="${args.state === 'valid' ? 'valid' : 'invalid'}-feedback d-block">${feedbackMsg}</div>` : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Select').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Tamanhos</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 400px;">
        ${createSelect({ size: 'sm' })}
        ${createSelect({ size: 'default' })}
        ${createSelect({ size: 'lg' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 400px;">
        ${createSelect({})}
        ${createSelect({ disabled: true })}
        ${createSelect({ state: 'valid' })}
        ${createSelect({ state: 'invalid' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Multiple Select</h5>
      <div style="max-width: 400px;">
        ${createSelect({ multiple: true })}
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  size: 'default',
  disabled: false,
  multiple: false,
  state: 'default'
};

export const Sizes = Template.bind({});
Sizes.args = {
  ...Default.args,
  size: 'lg'
};

export const Multiple = Template.bind({});
Multiple.args = {
  ...Default.args,
  multiple: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true
};
