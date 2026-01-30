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
