export default {
  title: 'Vuexy/Card',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    content: {
      control: 'text',
      description: 'Card content',
    },
    showHeader: {
      control: 'boolean',
      description: 'Show card header',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Vuexy Card component with optional header and customizable content.',
      },
    },
  },
};

// Create card HTML
const createCard = ({ title = 'Card Title', content = 'Card content goes here.', showHeader = true }) => {
  return `
    <div class="card" style="max-width: 500px;">
      ${showHeader ? `
        <div class="card-header">
          <h4 class="card-title">${title}</h4>
        </div>
      ` : ''}
      <div class="card-body">
        ${content}
      </div>
    </div>
  `;
};

// Stories
export const Default = {
  args: {
    title: 'Card Title',
    content: 'This is the card content. You can put any content here.',
    showHeader: true,
  },
  render: createCard,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<div class="card">
  <div class="card-header">
    <h4 class="card-title">Card Title</h4>
  </div>
  <div class="card-body">
    This is the card content.
  </div>
</div>

<!-- React -->
<div className="card">
  <div className="card-header">
    <h4 className="card-title">Card Title</h4>
  </div>
  <div className="card-body">
    This is the card content.
  </div>
</div>

<!-- Vue 2/3 -->
<div class="card">
  <div class="card-header">
    <h4 class="card-title">{{ title }}</h4>
  </div>
  <div class="card-body">
    {{ content }}
  </div>
</div>`,
      },
    },
  },
};

export const WithoutHeader = {
  args: {
    title: 'Card Title',
    content: 'This card has no header, only body content.',
    showHeader: false,
  },
  render: createCard,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<div class="card">
  <div class="card-body">
    This card has no header, only body content.
  </div>
</div>

<!-- React -->
<div className="card">
  <div className="card-body">
    This card has no header, only body content.
  </div>
</div>

<!-- Vue 2/3 -->
<div class="card">
  <div class="card-body">
    {{ content }}
  </div>
</div>`,
      },
    },
  },
};

export const WithRichContent = {
  args: {
    title: 'Statistics Card',
    content: `
      <p style="margin-bottom: 1rem;">Total Users: <strong>1,234</strong></p>
      <p style="margin-bottom: 1rem;">Active Sessions: <strong>856</strong></p>
      <p style="margin-bottom: 0;">Conversion Rate: <strong>12.5%</strong></p>
    `,
    showHeader: true,
  },
  render: createCard,
  parameters: {
    docs: {
      description: {
        story: 'Card with rich HTML content in the body.',
      },
    },
  },
};

export const WithButton = {
  render: () => `
    <div class="card" style="max-width: 500px;">
      <div class="card-header">
        <h4 class="card-title">User Profile</h4>
      </div>
      <div class="card-body">
        <p style="margin-bottom: 1rem;">Name: John Doe</p>
        <p style="margin-bottom: 1.5rem;">Email: john.doe@example.com</p>
        <button class="btn btn-primary">Edit Profile</button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Card with a button in the body.',
      },
      source: {
        code: `<!-- HTML -->
<div class="card">
  <div class="card-header">
    <h4 class="card-title">User Profile</h4>
  </div>
  <div class="card-body">
    <p>Name: John Doe</p>
    <p>Email: john.doe@example.com</p>
    <button class="btn btn-primary">Edit Profile</button>
  </div>
</div>

<!-- React -->
<div className="card">
  <div className="card-header">
    <h4 className="card-title">User Profile</h4>
  </div>
  <div className="card-body">
    <p>Name: John Doe</p>
    <p>Email: john.doe@example.com</p>
    <button className="btn btn-primary">Edit Profile</button>
  </div>
</div>

<!-- Vue 2/3 -->
<div class="card">
  <div class="card-header">
    <h4 class="card-title">User Profile</h4>
  </div>
  <div class="card-body">
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <button class="btn btn-primary" @click="editProfile">Edit Profile</button>
  </div>
</div>`,
      },
    },
  },
};

export const MultipleCards = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Card 1</h4>
        </div>
        <div class="card-body">
          First card content
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Card 2</h4>
        </div>
        <div class="card-body">
          Second card content
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Card 3</h4>
        </div>
        <div class="card-body">
          Third card content
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Multiple cards in a grid layout.',
      },
    },
  },
};
