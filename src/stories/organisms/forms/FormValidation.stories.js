/**
 * FormValidation - Organism (Forms)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.form-control, .is-valid, .is-invalid)
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 * 
 * Formulário completo com validação visual de estados (válido/inválido).
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Vuexy/Organisms/Forms/FormValidation',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Form Validation

Formulário completo do Vuexy com validação visual usando Bootstrap 5.

## Quando usar
- Cadastro de usuários
- Formulários de configuração
- Coleta de dados com validação
- Submissões que requerem verificação

## Composição
- **Form Groups** - Inputs com labels e feedback
- **Validation States** - .is-valid e .is-invalid
- **Feedback Messages** - .valid-feedback e .invalid-feedback
- **Submit Button** - Desabilitado até validação passar

## Estados de Validação
- **Default**: Nenhuma validação aplicada
- **Invalid**: Erros visíveis com mensagens
- **Valid**: Sucesso com checkmarks verdes
- **Mixed**: Alguns campos válidos, outros inválidos

## Validação Bootstrap
- \`.was-validated\` - Aplica estilos após submit
- \`.is-valid\` / \`.is-invalid\` - Estados manuais
- \`:valid\` / \`:invalid\` - Pseudo-classes CSS

## Acessibilidade
- \`aria-describedby\` aponta para mensagem de erro
- \`aria-invalid="true"\` em campos com erro
- \`required\` em campos obrigatórios
- Labels associados com \`for\` e \`id\`
        `
      }
    }
  },
  argTypes: {
    validationState: {
      control: 'select',
      options: ['none', 'invalid', 'valid', 'mixed'],
      description: 'Estado geral de validação',
      table: { defaultValue: { summary: 'none' } }
    },
    showFeedback: {
      control: 'boolean',
      description: 'Mostra mensagens de feedback',
      table: { defaultValue: { summary: true } }
    },
    useFloatingLabels: {
      control: 'boolean',
      description: 'Usa floating labels',
      table: { defaultValue: { summary: false } }
    },
    submitDisabled: {
      control: 'boolean',
      description: 'Desabilita botão submit',
      table: { defaultValue: { summary: false } }
    }
  }
};

const formFields = {
  firstName: { label: 'First Name', type: 'text', required: true, placeholder: 'John' },
  lastName: { label: 'Last Name', type: 'text', required: true, placeholder: 'Doe' },
  email: { label: 'Email', type: 'email', required: true, placeholder: 'john.doe@example.com' },
  role: { label: 'Role', type: 'select', required: true, options: ['', 'Admin', 'Editor', 'Viewer'] },
  password: { label: 'Password', type: 'password', required: true, placeholder: '••••••••' },
  confirmPassword: { label: 'Confirm Password', type: 'password', required: true, placeholder: '••••••••' },
  terms: { label: 'I agree to terms and conditions', type: 'checkbox', required: true }
};

const validationMessages = {
  firstName: { valid: 'Looks good!', invalid: 'Please provide a valid first name.' },
  lastName: { valid: 'Looks good!', invalid: 'Please provide a valid last name.' },
  email: { valid: 'Email is valid!', invalid: 'Please provide a valid email address.' },
  role: { valid: 'Great choice!', invalid: 'Please select a role.' },
  password: { valid: 'Strong password!', invalid: 'Password must be at least 8 characters.' },
  confirmPassword: { valid: 'Passwords match!', invalid: 'Passwords do not match.' },
  terms: { valid: 'Thank you!', invalid: 'You must agree before submitting.' }
};

const getFieldState = (fieldName, validationState) => {
  if (validationState === 'none') return '';
  if (validationState === 'valid') return 'is-valid';
  if (validationState === 'invalid') return 'is-invalid';
  
  // Mixed state
  const validFields = ['firstName', 'email', 'role'];
  return validFields.includes(fieldName) ? 'is-valid' : 'is-invalid';
};

const createFormValidation = ({ 
  validationState = 'none', 
  showFeedback = true,
  useFloatingLabels = false,
  submitDisabled = false 
}) => {
  const wasValidatedClass = validationState !== 'none' ? 'was-validated' : '';
  
  const renderField = (name, field) => {
    const state = getFieldState(name, validationState);
    const stateClass = state || '';
    const messages = validationMessages[name];
    
    const validFeedback = showFeedback && state === 'is-valid' 
      ? `<div class="valid-feedback">${messages.valid}</div>` 
      : '';
    const invalidFeedback = showFeedback && state === 'is-invalid' 
      ? `<div class="invalid-feedback">${messages.invalid}</div>` 
      : '';
    
    if (field.type === 'checkbox') {
      return `
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input ${stateClass}" id="${name}" ${field.required ? 'required' : ''}>
          <label class="form-check-label" for="${name}">${field.label}</label>
          ${invalidFeedback}
          ${validFeedback}
        </div>`;
    }
    
    if (field.type === 'select') {
      const options = field.options.map(opt => `<option value="${opt.toLowerCase()}">${opt}</option>`).join('');
      
      if (useFloatingLabels) {
        return `
          <div class="form-floating mb-3">
            <select class="form-select ${stateClass}" id="${name}" ${field.required ? 'required' : ''}>
              ${options}
            </select>
            <label for="${name}">${field.label}</label>
            ${invalidFeedback}
            ${validFeedback}
          </div>`;
      }
      
      return `
        <div class="mb-3">
          <label for="${name}" class="form-label">${field.label}</label>
          <select class="form-select ${stateClass}" id="${name}" ${field.required ? 'required' : ''}>
            ${options}
          </select>
          ${invalidFeedback}
          ${validFeedback}
        </div>`;
    }
    
    if (useFloatingLabels) {
      return `
        <div class="form-floating mb-3">
          <input type="${field.type}" class="form-control ${stateClass}" id="${name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>
          <label for="${name}">${field.label}</label>
          ${invalidFeedback}
          ${validFeedback}
        </div>`;
    }
    
    return `
      <div class="mb-3">
        <label for="${name}" class="form-label">${field.label}</label>
        <input type="${field.type}" class="form-control ${stateClass}" id="${name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>
        ${invalidFeedback}
        ${validFeedback}
      </div>`;
  };
  
  return `<div class="card">
  <div class="card-body">
    <h5 class="card-title mb-4">User Registration</h5>
    
    <form class="${wasValidatedClass}" novalidate>
      <div class="row">
        <div class="col-md-6">
          ${renderField('firstName', formFields.firstName)}
        </div>
        <div class="col-md-6">
          ${renderField('lastName', formFields.lastName)}
        </div>
      </div>
      
      ${renderField('email', formFields.email)}
      ${renderField('role', formFields.role)}
      
      <div class="row">
        <div class="col-md-6">
          ${renderField('password', formFields.password)}
        </div>
        <div class="col-md-6">
          ${renderField('confirmPassword', formFields.confirmPassword)}
        </div>
      </div>
      
      ${renderField('terms', formFields.terms)}
      
      <div class="d-flex justify-content-between align-items-center">
        <button type="submit" class="btn btn-primary" ${submitDisabled ? 'disabled' : ''}>
          ${submitDisabled ? 'Validating...' : 'Submit'}
        </button>
        <button type="reset" class="btn btn-label-secondary">Reset</button>
      </div>
    </form>
  </div>
</div>`;
};

const Template = (args) => {
  const markup = createFormValidation(args);
  
  return `
    <div>
      ${markup}
    </div>
    
    <div class="mt-4">
      <div class="alert alert-${args.validationState === 'valid' ? 'success' : args.validationState === 'invalid' || args.validationState === 'mixed' ? 'danger' : 'info'}">
        <strong>Validation State:</strong> ${args.validationState === 'none' ? 'Not validated yet' : args.validationState === 'valid' ? 'All fields valid ✓' : args.validationState === 'invalid' ? 'All fields invalid ✗' : 'Some fields invalid'}
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>${formatReactSnippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>${formatVue3Snippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div class="row g-4">
    <div class="col-12">
      <h5>Default (No Validation)</h5>
      ${createFormValidation({ validationState: 'none' })}
    </div>
    
    <div class="col-12 mt-5">
      <h5>All Invalid</h5>
      ${createFormValidation({ validationState: 'invalid' })}
    </div>
    
    <div class="col-12 mt-5">
      <h5>All Valid</h5>
      ${createFormValidation({ validationState: 'valid' })}
    </div>
    
    <div class="col-12 mt-5">
      <h5>Mixed State</h5>
      ${createFormValidation({ validationState: 'mixed' })}
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  validationState: 'none',
  showFeedback: true,
  useFloatingLabels: false,
  submitDisabled: false
};

export const Invalid = Template.bind({});
Invalid.args = {
  ...Default.args,
  validationState: 'invalid'
};

export const Valid = Template.bind({});
Valid.args = {
  ...Default.args,
  validationState: 'valid'
};

export const Mixed = Template.bind({});
Mixed.args = {
  ...Default.args,
  validationState: 'mixed'
};

export const FloatingLabels = Template.bind({});
FloatingLabels.args = {
  ...Default.args,
  useFloatingLabels: true,
  validationState: 'mixed'
};

export const Submitting = Template.bind({});
Submitting.args = {
  ...Valid.args,
  submitDisabled: true
};

// ============ INTERACTIVE DEMO ============
export const Interactive = () => {
  const containerId = 'form-validation-interactive-' + Math.random().toString(36).substr(2, 9);
  
  const markup = `
    <div id="${containerId}">
      <form novalidate>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">User Registration</h5>
            
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label" for="firstName">First Name *</label>
                <input type="text" class="form-control" id="firstName" name="firstName" placeholder="John" required>
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please provide your first name.</div>
              </div>
              
              <div class="col-md-6">
                <label class="form-label" for="lastName">Last Name *</label>
                <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Doe" required>
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please provide your last name.</div>
              </div>
              
              <div class="col-12">
                <label class="form-label" for="email">Email *</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="john.doe@example.com" required>
                <div class="valid-feedback">Email is valid!</div>
                <div class="invalid-feedback">Please provide a valid email (must contain @).</div>
              </div>
              
              <div class="col-12">
                <label class="form-label" for="password">Password *</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="••••••••" required minlength="8">
                <div class="valid-feedback">Strong password!</div>
                <div class="invalid-feedback">Password must be at least 8 characters.</div>
              </div>
              
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="terms" name="terms" required>
                  <label class="form-check-label" for="terms">
                    I agree to terms and conditions *
                  </label>
                  <div class="valid-feedback">Thank you!</div>
                  <div class="invalid-feedback">You must agree before submitting.</div>
                </div>
              </div>
              
              <div class="col-12">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-label-secondary ms-2" data-action="reset">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      
      <div class="alert alert-secondary mt-3" data-status-message>
        Fill the form and click Submit to validate
      </div>
    </div>
  `;
  
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const form = container.querySelector('form');
    const firstName = form.querySelector('#firstName');
    const lastName = form.querySelector('#lastName');
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    const terms = form.querySelector('#terms');
    const resetBtn = container.querySelector('[data-action="reset"]');
    const statusMessage = container.querySelector('[data-status-message]');
    
    const validateField = (field) => {
      let isValid = false;
      
      if (field.type === 'checkbox') {
        isValid = field.checked;
      } else if (field.name === 'email') {
        isValid = field.value.includes('@') && field.value.length > 3;
      } else if (field.name === 'password') {
        isValid = field.value.length >= 8;
      } else {
        isValid = field.value.trim().length > 0;
      }
      
      field.classList.remove('is-valid', 'is-invalid');
      field.classList.add(isValid ? 'is-valid' : 'is-invalid');
      
      return isValid;
    };
    
    const validateForm = () => {
      const fields = [firstName, lastName, email, password, terms];
      const results = fields.map(validateField);
      return results.every(result => result === true);
    };
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const isValid = validateForm();
      
      if (isValid) {
        statusMessage.className = 'alert alert-success mt-3';
        statusMessage.innerHTML = '<i class="bx bx-check-circle me-2"></i><strong>Success!</strong> All fields are valid. Form would be submitted.';
      } else {
        statusMessage.className = 'alert alert-danger mt-3';
        statusMessage.innerHTML = '<i class="bx bx-error-circle me-2"></i><strong>Error!</strong> Please fix the invalid fields above.';
      }
    });
    
    resetBtn.addEventListener('click', () => {
      form.reset();
      const fields = form.querySelectorAll('.form-control, .form-check-input');
      fields.forEach(field => field.classList.remove('is-valid', 'is-invalid'));
      statusMessage.className = 'alert alert-secondary mt-3';
      statusMessage.textContent = 'Fill the form and click Submit to validate';
    });
  }, 100);
  
  return markup;
};
Interactive.parameters = {
  docs: {
    description: {
      story: 'Interactive form validation demo. Submit the form to trigger validation. Rules: First/Last name required, Email must contain @, Password min 8 chars, Terms must be checked.'
    }
  }
};
