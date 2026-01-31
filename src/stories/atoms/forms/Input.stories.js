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
    <details open>
      <summary class="btn btn-sm btn-outline-secondary mb-2">HTML</summary>
      <div>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
    <details>
      <summary class="btn btn-sm btn-outline-secondary mb-2">React</summary>
      <div>
        <pre><code>${formatReactSnippet(markup, 'Input').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
    <details>
      <summary class="btn btn-sm btn-outline-secondary mb-2">Vue 2</summary>
      <div>
        <pre><code>${formatVue2Snippet(markup, 'Input').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
    <details>
      <summary class="btn btn-sm btn-outline-secondary mb-2">Vue 3</summary>
      <div>
        <pre><code>${formatVue3Snippet(markup, 'Input').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
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

// Interactive Demo
export const Interactive = () => {
  const containerId = 'input-interactive-' + Math.random().toString(36).substr(2, 9);
  
  const markup = `
    <div id="${containerId}" style="max-width: 600px;">
      <div class="alert alert-info mb-3">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Type in inputs to see real-time validation and character count.
      </div>
      
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Input Validation</h5>
          
          <!-- Nome -->
          <div class="mb-3">
            <label for="name-${containerId}" class="form-label">Name *</label>
            <input 
              type="text" 
              class="form-control" 
              id="name-${containerId}" 
              placeholder="Enter your name"
              data-validate="required|minLength:3"
            >
            <div class="invalid-feedback">Name must be at least 3 characters.</div>
            <div class="valid-feedback">Looks good!</div>
          </div>
          
          <!-- Email -->
          <div class="mb-3">
            <label for="email-${containerId}" class="form-label">Email *</label>
            <input 
              type="email" 
              class="form-control" 
              id="email-${containerId}" 
              placeholder="your@email.com"
              data-validate="required|email"
            >
            <div class="invalid-feedback">Please enter a valid email address.</div>
            <div class="valid-feedback">Valid email!</div>
          </div>
          
          <!-- Password com força -->
          <div class="mb-3">
            <label for="password-${containerId}" class="form-label">Password *</label>
            <input 
              type="password" 
              class="form-control" 
              id="password-${containerId}" 
              placeholder="Enter password"
              data-validate="required|minLength:8"
            >
            <div class="invalid-feedback">Password must be at least 8 characters.</div>
            <div class="valid-feedback">Strong password!</div>
            <small class="text-muted">Password strength: <span id="strength-${containerId}" class="badge bg-secondary">Not set</span></small>
          </div>
          
          <!-- Character counter -->
          <div class="mb-3">
            <label for="bio-${containerId}" class="form-label">Bio</label>
            <textarea 
              class="form-control" 
              id="bio-${containerId}" 
              rows="3" 
              placeholder="Tell us about yourself..."
              maxlength="200"
            ></textarea>
            <div class="d-flex justify-content-between">
              <small class="text-muted">Max 200 characters</small>
              <small class="text-muted"><span id="char-count-${containerId}">0</span> / 200</small>
            </div>
          </div>
          
          <!-- Disabled state -->
          <div class="mb-3">
            <label for="disabled-${containerId}" class="form-label">Disabled Input</label>
            <input 
              type="text" 
              class="form-control" 
              id="disabled-${containerId}" 
              placeholder="This is disabled"
              value="Cannot edit this"
              disabled
            >
          </div>
          
          <!-- Summary -->
          <div class="alert alert-secondary" id="summary-${containerId}">
            <strong>Form Status:</strong> <span id="status-text-${containerId}">Not validated yet</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const nameInput = container.querySelector('#name-' + containerId.split('-')[2]);
    const emailInput = container.querySelector('#email-' + containerId.split('-')[2]);
    const passwordInput = container.querySelector('#password-' + containerId.split('-')[2]);
    const bioInput = container.querySelector('#bio-' + containerId.split('-')[2]);
    const strengthBadge = container.querySelector('#strength-' + containerId.split('-')[2]);
    const charCount = container.querySelector('#char-count-' + containerId.split('-')[2]);
    const statusText = container.querySelector('#status-text-' + containerId.split('-')[2]);
    
    // Validation functions
    const validateName = (value) => {
      return value.trim().length >= 3;
    };
    
    const validateEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };
    
    const validatePassword = (value) => {
      return value.length >= 8;
    };
    
    const getPasswordStrength = (password) => {
      if (password.length === 0) return { text: 'Not set', color: 'secondary' };
      if (password.length < 6) return { text: 'Weak', color: 'danger' };
      if (password.length < 10) return { text: 'Medium', color: 'warning' };
      
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[^A-Za-z0-9]/.test(password);
      
      const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
      
      if (score >= 3) return { text: 'Strong', color: 'success' };
      return { text: 'Medium', color: 'warning' };
    };
    
    const updateFormStatus = () => {
      const isNameValid = validateName(nameInput.value);
      const isEmailValid = validateEmail(emailInput.value);
      const isPasswordValid = validatePassword(passwordInput.value);
      
      const allValid = isNameValid && isEmailValid && isPasswordValid;
      
      if (allValid) {
        statusText.textContent = '✅ All fields are valid!';
        statusText.parentElement.className = 'alert alert-success';
      } else {
        const invalid = [];
        if (!isNameValid && nameInput.value) invalid.push('name');
        if (!isEmailValid && emailInput.value) invalid.push('email');
        if (!isPasswordValid && passwordInput.value) invalid.push('password');
        
        if (invalid.length > 0) {
          statusText.textContent = '❌ Invalid: ' + invalid.join(', ');
          statusText.parentElement.className = 'alert alert-danger';
        } else {
          statusText.textContent = 'Fill in all required fields';
          statusText.parentElement.className = 'alert alert-secondary';
        }
      }
    };
    
    // Name validation
    nameInput.addEventListener('input', (e) => {
      const isValid = validateName(e.target.value);
      nameInput.classList.remove('is-valid', 'is-invalid');
      if (e.target.value) {
        nameInput.classList.add(isValid ? 'is-valid' : 'is-invalid');
      }
      updateFormStatus();
    });
    
    // Email validation
    emailInput.addEventListener('input', (e) => {
      const isValid = validateEmail(e.target.value);
      emailInput.classList.remove('is-valid', 'is-invalid');
      if (e.target.value) {
        emailInput.classList.add(isValid ? 'is-valid' : 'is-invalid');
      }
      updateFormStatus();
    });
    
    // Password validation + strength
    passwordInput.addEventListener('input', (e) => {
      const isValid = validatePassword(e.target.value);
      const strength = getPasswordStrength(e.target.value);
      
      passwordInput.classList.remove('is-valid', 'is-invalid');
      if (e.target.value) {
        passwordInput.classList.add(isValid ? 'is-valid' : 'is-invalid');
      }
      
      strengthBadge.textContent = strength.text;
      strengthBadge.className = `badge bg-${strength.color}`;
      
      updateFormStatus();
    });
    
    // Character counter
    bioInput.addEventListener('input', (e) => {
      const count = e.target.value.length;
      charCount.textContent = count;
      
      if (count > 180) {
        charCount.parentElement.classList.add('text-danger');
      } else {
        charCount.parentElement.classList.remove('text-danger');
      }
    });
    
  }, 100);
  
  return markup;
};

Interactive.parameters = {
  docs: {
    description: {
      story: `
**Interactive Demo:** Validação em tempo real de inputs com feedback visual.

Funcionalidades:
- Name: mínimo 3 caracteres
- Email: validação de formato
- Password: mínimo 8 caracteres + indicador de força
- Bio: contador de caracteres (max 200)
- Status geral do formulário

**Validação:** Classes \`.is-valid\` e \`.is-invalid\` aplicadas automaticamente com feedback visual.
      `
    }
  }
};
