export default {
  title: 'Vuexy/Input',
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'valid', 'invalid'],
      description: 'Validation state',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Vuexy Input component with validation states and disabled state.',
      },
    },
  },
};

// Create input HTML
const createInput = ({ placeholder = 'Enter text...', disabled = false, value = '', state = 'default' }) => {
  const stateClass = state === 'valid' ? 'is-valid' : state === 'invalid' ? 'is-invalid' : '';
  const classes = ['form-control', stateClass].filter(Boolean).join(' ');
  
  return `
    <div style="max-width: 400px;">
      <input 
        type="text" 
        class="${classes}" 
        placeholder="${placeholder}"
        value="${value}"
        ${disabled ? 'disabled' : ''}
      />
    </div>
  `;
};

// Stories
export const Default = {
  args: {
    placeholder: 'Enter text...',
    disabled: false,
    value: '',
    state: 'default',
  },
  render: createInput,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<input type="text" class="form-control" placeholder="Enter text..." />

<!-- React -->
<input type="text" className="form-control" placeholder="Enter text..." />

<!-- Vue 2 -->
<input type="text" class="form-control" placeholder="Enter text..." v-model="value" />

<!-- Vue 3 -->
<input type="text" class="form-control" placeholder="Enter text..." v-model="value" />`,
      },
    },
  },
};

export const WithValue = {
  args: {
    placeholder: 'Enter text...',
    disabled: false,
    value: 'Sample text',
    state: 'default',
  },
  render: createInput,
  parameters: {
    docs: {
      description: {
        story: 'Input with a predefined value.',
      },
    },
  },
};

export const Disabled = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    value: '',
    state: 'default',
  },
  render: createInput,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<input type="text" class="form-control" placeholder="Disabled input" disabled />

<!-- React -->
<input type="text" className="form-control" placeholder="Disabled input" disabled />

<!-- Vue 2/3 -->
<input type="text" class="form-control" placeholder="Disabled input" :disabled="true" />`,
      },
    },
  },
};

export const Valid = {
  args: {
    placeholder: 'Enter text...',
    disabled: false,
    value: 'Valid input',
    state: 'valid',
  },
  render: createInput,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<input type="text" class="form-control is-valid" value="Valid input" />

<!-- React -->
<input type="text" className="form-control is-valid" value="Valid input" />

<!-- Vue 2/3 -->
<input type="text" class="form-control is-valid" v-model="value" />`,
      },
    },
  },
};

export const Invalid = {
  args: {
    placeholder: 'Enter text...',
    disabled: false,
    value: 'Invalid input',
    state: 'invalid',
  },
  render: createInput,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<input type="text" class="form-control is-invalid" value="Invalid input" />

<!-- React -->
<input type="text" className="form-control is-invalid" value="Invalid input" />

<!-- Vue 2/3 -->
<input type="text" class="form-control is-invalid" v-model="value" />`,
      },
    },
  },
};

export const AllStates = {
  render: () => `
    <div style="max-width: 400px; display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Default</label>
        <input type="text" class="form-control" placeholder="Default state" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Valid</label>
        <input type="text" class="form-control is-valid" value="Valid input" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Invalid</label>
        <input type="text" class="form-control is-invalid" value="Invalid input" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Disabled</label>
        <input type="text" class="form-control" placeholder="Disabled" disabled />
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All input states displayed together.',
      },
    },
  },
};

// Interactive Demo
export const Interactive = {
  render: () => {
    const containerId = 'input-interactive-' + Math.random().toString(36).substr(2, 9);
    
    return `
      <div id="${containerId}" style="max-width: 400px;">
        <div class="alert alert-info mb-4">
          <i class="bx bx-info-circle me-2"></i>
          <strong>Interactive Demo:</strong> Type in the input to see character count and validation.
        </div>
        
        <div class="mb-3">
          <label class="form-label">Username (3-20 characters)</label>
          <input 
            type="text" 
            id="demoInput-${containerId}" 
            class="form-control" 
            placeholder="Enter username"
            oninput="
              const input = this;
              const count = document.getElementById('charCount-${containerId}');
              const feedback = document.getElementById('feedback-${containerId}');
              const len = input.value.length;
              
              count.textContent = len + '/20';
              count.className = len > 20 ? 'text-danger' : len >= 3 ? 'text-success' : 'text-muted';
              
              input.classList.remove('is-valid', 'is-invalid');
              
              if (len === 0) {
                feedback.textContent = '';
              } else if (len < 3) {
                input.classList.add('is-invalid');
                feedback.textContent = 'Too short (min 3 characters)';
                feedback.className = 'invalid-feedback d-block';
              } else if (len > 20) {
                input.classList.add('is-invalid');
                feedback.textContent = 'Too long (max 20 characters)';
                feedback.className = 'invalid-feedback d-block';
              } else {
                input.classList.add('is-valid');
                feedback.textContent = 'Looks good!';
                feedback.className = 'valid-feedback d-block';
              }
            "
            maxlength="25"
          />
          <div class="d-flex justify-content-between mt-1">
            <div id="feedback-${containerId}"></div>
            <small id="charCount-${containerId}" class="text-muted">0/20</small>
          </div>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive input with live character count and validation feedback.',
      },
    },
  },
};
