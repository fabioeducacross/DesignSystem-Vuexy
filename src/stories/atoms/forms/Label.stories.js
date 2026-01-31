/**
 * Label - Atom (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.form-label)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 */

import { formatHtmlSnippet, formatReactSnippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Forms/Label',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Form Label

Label de formulário do Vuexy para identificar campos usando Bootstrap 5.

## Quando usar
- Identificar campos de formulário
- Indicar campos obrigatórios
- Fornecer contexto adicional

## Variantes
- **Estados**: default, com asterisco (required)
- **Tamanhos**: small, default

## Acessibilidade
- Use \`htmlFor\` associando ao \`id\` do input
- Asterisco (*) para campos obrigatórios
- Texto descritivo e claro
        `
      }
    }
  },
  argTypes: {
    text: { 
      control: 'text',
      description: 'Texto do label',
      table: { defaultValue: { summary: 'Label Text' } }
    },
    htmlFor: { 
      control: 'text',
      description: 'ID do input associado',
      table: { defaultValue: { summary: 'input-1' } }
    },
    required: { 
      control: 'boolean',
      description: 'Mostra asterisco obrigatório',
      table: { defaultValue: { summary: false } }
    },
    size: { 
      control: 'select',
      options: ['default', 'small'],
      description: 'Tamanho do label',
      table: { defaultValue: { summary: 'default' } }
    }
  }
};

const createLabel = ({ text = 'Label Text', htmlFor = 'input-1', required = false, size = 'default' }) => {
  const sizeClass = size === 'small' ? 'small' : '';
  
  return `<label class="form-label ${sizeClass}" for="${htmlFor}">
  ${text}${required ? ' <span class="text-danger">*</span>' : ''}
</label>`;
};

const Template = (args) => {
  const markup = createLabel(args);
  
  return `
    <div style="max-width: 400px;">
      ${markup}
      <input type="text" class="form-control mt-1" id="${args.htmlFor}" placeholder="Example input">
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'Label').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4" style="max-width: 400px;">
    <div class="col-12">
      <h5>Variações</h5>
      ${createLabel({ text: 'Default Label', htmlFor: 'input-default' })}
      <input type="text" class="form-control mt-1 mb-3" id="input-default">
      
      ${createLabel({ text: 'Required Field', htmlFor: 'input-required', required: true })}
      <input type="text" class="form-control mt-1 mb-3" id="input-required">
      
      ${createLabel({ text: 'Small Label', htmlFor: 'input-small', size: 'small' })}
      <input type="text" class="form-control form-control-sm mt-1" id="input-small">
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  text: 'Label Text',
  htmlFor: 'input-1',
  required: false,
  size: 'default'
};

export const Required = Template.bind({});
Required.args = {
  ...Default.args,
  text: 'Required Field',
  required: true,
  htmlFor: 'input-required'
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  text: 'Small Label',
  size: 'small',
  htmlFor: 'input-small'
};

export const Interactive = {
  render: () => {
    return `
      <div class="p-4" style="max-width: 400px;">
        <h5>Interactive Label Demo</h5>
        <p class="text-muted">Toggle required indicator</p>
        
        <label class="form-label" for="interactive-input" id="labelEl">
          Field Name
        </label>
        <input type="text" class="form-control" id="interactive-input" placeholder="Enter value">
        
        <button class="btn btn-outline-primary btn-sm mt-3" onclick="
          const label = document.getElementById('labelEl');
          const asterisk = label.querySelector('.text-danger');
          if (asterisk) {
            asterisk.remove();
          } else {
            label.innerHTML += ' <span class=\"text-danger\">*</span>';
          }
        ">Toggle Required *</button>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `;
  }
};
