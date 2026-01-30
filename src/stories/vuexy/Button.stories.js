export default {
  title: 'Vuexy/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Button variant/color',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
    label: {
      control: 'text',
      description: 'Button text',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Vuexy Button component with multiple variants, sizes, and states.',
      },
    },
  },
};

// Create button HTML
const createButton = ({ variant = 'primary', size = 'md', disabled = false, label = 'Button' }) => {
  const sizeClass = size === 'md' ? '' : `btn-${size}`;
  const classes = ['btn', `btn-${variant}`, sizeClass].filter(Boolean).join(' ');
  
  return `
    <button class="${classes}" ${disabled ? 'disabled' : ''}>
      ${label}
    </button>
  `;
};

// Stories
export const Primary = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    label: 'Primary Button',
  },
  render: createButton,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<button class="btn btn-primary">Primary Button</button>

<!-- React -->
<button className="btn btn-primary">Primary Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-primary">Primary Button</button>`,
      },
    },
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    label: 'Secondary Button',
  },
  render: createButton,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<button class="btn btn-secondary">Secondary Button</button>

<!-- React -->
<button className="btn btn-secondary">Secondary Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-secondary">Secondary Button</button>`,
      },
    },
  },
};

export const Success = {
  args: {
    variant: 'success',
    size: 'md',
    disabled: false,
    label: 'Success Button',
  },
  render: createButton,
};

export const Danger = {
  args: {
    variant: 'danger',
    size: 'md',
    disabled: false,
    label: 'Danger Button',
  },
  render: createButton,
};

export const Warning = {
  args: {
    variant: 'warning',
    size: 'md',
    disabled: false,
    label: 'Warning Button',
  },
  render: createButton,
};

export const Info = {
  args: {
    variant: 'info',
    size: 'md',
    disabled: false,
    label: 'Info Button',
  },
  render: createButton,
};

export const Small = {
  args: {
    variant: 'primary',
    size: 'sm',
    disabled: false,
    label: 'Small Button',
  },
  render: createButton,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<button class="btn btn-primary btn-sm">Small Button</button>

<!-- React -->
<button className="btn btn-primary btn-sm">Small Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-primary btn-sm">Small Button</button>`,
      },
    },
  },
};

export const Large = {
  args: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
    label: 'Large Button',
  },
  render: createButton,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<button class="btn btn-primary btn-lg">Large Button</button>

<!-- React -->
<button className="btn btn-primary btn-lg">Large Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-primary btn-lg">Large Button</button>`,
      },
    },
  },
};

export const Disabled = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
    label: 'Disabled Button',
  },
  render: createButton,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<button class="btn btn-primary" disabled>Disabled Button</button>

<!-- React -->
<button className="btn btn-primary" disabled>Disabled Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-primary" disabled>Disabled Button</button>`,
      },
    },
  },
};

export const AllVariants = {
  render: () => `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-success">Success</button>
      <button class="btn btn-danger">Danger</button>
      <button class="btn btn-warning">Warning</button>
      <button class="btn btn-info">Info</button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together.',
      },
    },
  },
};

export const AllSizes = {
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <button class="btn btn-primary btn-sm">Small</button>
      <button class="btn btn-primary">Medium</button>
      <button class="btn btn-primary btn-lg">Large</button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together.',
      },
    },
  },
};
