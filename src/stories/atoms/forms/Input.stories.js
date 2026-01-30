/**
 * Input - Atom (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.form-control)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Forms/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Input Field

Campo de entrada de texto básico do Vuexy usando Bootstrap 5.

## Quando usar
- Captura de texto, email, senha, números
- Formulários de cadastro e login
- Filtros e busca

## Variantes
- **Tamanhos**: sm (pequeno), default, lg (grande)
- **Tipos**: text, email, password, number, search, tel, url, date
- **Estados**: default, disabled, readonly, valid, invalid

## Acessibilidade
- Use \`placeholder\` para dicas curtas
- Sempre associe com \`<label>\` (use htmlFor)
- Mensagens de validação devem estar associadas com \`aria-describedby\`
        `
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url', 'date'],
      description: 'Tipo de input',
      table: { defaultValue: { summary: 'text' } }
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tamanho do input',
      table: { defaultValue: { summary: 'default' } }
    },
    placeholder: { 
      control: 'text',
      description: 'Texto placeholder',
      table: { defaultValue: { summary: '' } }
    },
    value: { 
      control: 'text',
      description: 'Valor do input',
      table: { defaultValue: { summary: '' } }
    },
    disabled: { 
      control: 'boolean',
      description: 'Estado desabilitado',
      table: { defaultValue: { summary: false } }
    },
    readonly: { 
      control: 'boolean',
      description: 'Apenas leitura',
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

const createInput = ({ type = 'text', size = 'default', placeholder = '', value = '', disabled = false, readonly = false, state = 'default' }) => {
  const sizeClass = size === 'sm' ? 'form-control-sm' : size === 'lg' ? 'form-control-lg' : '';
  const stateClass = state === 'valid' ? 'is-valid' : state === 'invalid' ? 'is-invalid' : '';
  const classes = ['form-control', sizeClass, stateClass].filter(Boolean).join(' ');
  
  return `<input 
  type="${type}"
  class="${classes}"
  placeholder="${placeholder}"
  value="${value}"
  ${disabled ? 'disabled' : ''}
  ${readonly ? 'readonly' : ''}
/>`;
};

const Template = (args) => {
  const markup = createInput(args);
  const feedbackMsg = args.state === 'valid' ? 'Looks good!' : args.state === 'invalid' ? 'Please provide a valid value.' : '';
  
  return `
    <div style="max-width: 400px;">
      ${markup}
      ${args.state !== 'default' ? `<div class="${args.state === 'valid' ? 'valid' : 'invalid'}-feedback d-block">${feedbackMsg}</div>` : ''}
    </div>
    
    <hr class="my-5" />
    
    <h6>Code Snippets</h6>
    <div class="accordion" id="snippetAccordion">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#htmlSnippet">
            HTML
          </button>
        </h2>
        <div id="htmlSnippet" class="accordion-collapse collapse show" data-bs-parent="#snippetAccordion">
          <div class="accordion-body">
            <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#reactSnippet">
            React
          </button>
        </h2>
        <div id="reactSnippet" class="accordion-collapse collapse" data-bs-parent="#snippetAccordion">
          <div class="accordion-body">
            <pre><code>${formatReactSnippet(markup, 'Input').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#vue2Snippet">
            Vue 2
          </button>
        </h2>
        <div id="vue2Snippet" class="accordion-collapse collapse" data-bs-parent="#snippetAccordion">
          <div class="accordion-body">
            <pre><code>${formatVue2Snippet(markup, 'Input').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#vue3Snippet">
            Vue 3
          </button>
        </h2>
        <div id="vue3Snippet" class="accordion-collapse collapse" data-bs-parent="#snippetAccordion">
          <div class="accordion-body">
            <pre><code>${formatVue3Snippet(markup, 'Input').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const Overview = () => `
  <div class="row g-3">
    <div class="col-12">
      <h5>Tamanhos</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 400px;">
        ${createInput({ size: 'sm', placeholder: 'Small input' })}
        ${createInput({ placeholder: 'Default input' })}
        ${createInput({ size: 'lg', placeholder: 'Large input' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Tipos</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 400px;">
        ${createInput({ type: 'text', placeholder: 'Text input' })}
        ${createInput({ type: 'email', placeholder: 'email@example.com' })}
        ${createInput({ type: 'password', placeholder: 'Password', value: 'password' })}
        ${createInput({ type: 'number', placeholder: '123' })}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 400px;">
        ${createInput({ placeholder: 'Default', value: 'Default state' })}
        ${createInput({ placeholder: 'Disabled', disabled: true, value: 'Disabled input' })}
        ${createInput({ placeholder: 'Readonly', readonly: true, value: 'Readonly input' })}
        <div>
          ${createInput({ placeholder: 'Valid input', value: 'valid@email.com', state: 'valid' })}
          <div class="valid-feedback d-block">Looks good!</div>
        </div>
        <div>
          ${createInput({ placeholder: 'Invalid input', value: 'invalid', state: 'invalid' })}
          <div class="invalid-feedback d-block">Please provide a valid value.</div>
        </div>
      </div>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  size: 'default',
  placeholder: 'Enter text...',
  value: '',
  disabled: false,
  readonly: false,
  state: 'default'
};
