export default {
  title: 'Vuexy/Table',
  tags: ['autodocs'],
  argTypes: {
    hover: {
      control: 'boolean',
      description: 'Enable hover effect on rows',
    },
    isEmpty: {
      control: 'boolean',
      description: 'Show empty state',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Vuexy Table component with optional hover effect and empty state.',
      },
    },
  },
};

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'Active' },
];

// Create table HTML
const createTable = ({ hover = true, isEmpty = false }) => {
  const hoverClass = hover ? 'table-hover' : '';
  
  if (isEmpty) {
    return `
      <div class="card" style="max-width: 900px;">
        <div class="card-body">
          <table class="table ${hoverClass}">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="5">
                  <div class="empty-state">
                    <p style="margin: 0; font-size: 1.1rem;">No data available</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
  
  const rows = sampleData.map(item => `
    <tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>${item.role}</td>
      <td>${item.status}</td>
    </tr>
  `).join('');
  
  return `
    <div class="card" style="max-width: 900px;">
      <div class="card-body">
        <table class="table ${hoverClass}">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  `;
};

// Stories
export const Default = {
  args: {
    hover: true,
    isEmpty: false,
  },
  render: createTable,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<table class="table table-hover">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td>Admin</td>
      <td>Active</td>
    </tr>
    <!-- More rows... -->
  </tbody>
</table>

<!-- React -->
<table className="table table-hover">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {data.map(item => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.role}</td>
        <td>{item.status}</td>
      </tr>
    ))}
  </tbody>
</table>

<!-- Vue 2/3 -->
<table class="table table-hover">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in data" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.email }}</td>
      <td>{{ item.role }}</td>
      <td>{{ item.status }}</td>
    </tr>
  </tbody>
</table>`,
      },
    },
  },
};

export const WithoutHover = {
  args: {
    hover: false,
    isEmpty: false,
  },
  render: createTable,
  parameters: {
    docs: {
      description: {
        story: 'Table without hover effect on rows.',
      },
      source: {
        code: `<!-- HTML -->
<table class="table">
  <!-- Table content -->
</table>`,
      },
    },
  },
};

export const EmptyState = {
  args: {
    hover: true,
    isEmpty: true,
  },
  render: createTable,
  parameters: {
    docs: {
      source: {
        code: `<!-- HTML -->
<table class="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="5">
        <div class="empty-state">
          <p>No data available</p>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<!-- React -->
<table className="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {data.length === 0 ? (
      <tr>
        <td colSpan="5">
          <div className="empty-state">
            <p>No data available</p>
          </div>
        </td>
      </tr>
    ) : (
      data.map(item => (
        <tr key={item.id}>
          <td>{item.id}</td>
          {/* More columns... */}
        </tr>
      ))
    )}
  </tbody>
</table>

<!-- Vue 2/3 -->
<table class="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr v-if="data.length === 0">
      <td colspan="5">
        <div class="empty-state">
          <p>No data available</p>
        </div>
      </td>
    </tr>
    <tr v-else v-for="item in data" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.email }}</td>
      <td>{{ item.role }}</td>
      <td>{{ item.status }}</td>
    </tr>
  </tbody>
</table>`,
      },
    },
  },
};

export const InCard = {
  render: () => `
    <div class="card" style="max-width: 900px;">
      <div class="card-header">
        <h4 class="card-title">Users List</h4>
      </div>
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>Admin</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>jane@example.com</td>
              <td>User</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Bob Johnson</td>
              <td>bob@example.com</td>
              <td>User</td>
              <td>Inactive</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Table inside a card with header.',
      },
    },
  },
};
