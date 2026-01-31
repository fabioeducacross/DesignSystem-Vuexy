const D={title:"Vuexy/Table",tags:["autodocs"],argTypes:{hover:{control:"boolean",description:"Enable hover effect on rows"},isEmpty:{control:"boolean",description:"Show empty state"}},parameters:{docs:{description:{component:"Vuexy Table component with optional hover effect and empty state."}}}},N=[{id:1,name:"John Doe",email:"john@example.com",role:"Admin",status:"Active"},{id:2,name:"Jane Smith",email:"jane@example.com",role:"User",status:"Active"},{id:3,name:"Bob Johnson",email:"bob@example.com",role:"User",status:"Inactive"},{id:4,name:"Alice Williams",email:"alice@example.com",role:"Editor",status:"Active"}],s=({hover:t=!0,isEmpty:A=!1})=>{const l=t?"table-hover":"";if(A)return`
      <div class="card" style="max-width: 900px;">
        <div class="card-body">
          <table class="table ${l}">
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
    `;const E=N.map(e=>`
    <tr>
      <td>${e.id}</td>
      <td>${e.name}</td>
      <td>${e.email}</td>
      <td>${e.role}</td>
      <td>${e.status}</td>
    </tr>
  `).join("");return`
    <div class="card" style="max-width: 900px;">
      <div class="card-body">
        <table class="table ${l}">
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
            ${E}
          </tbody>
        </table>
      </div>
    </div>
  `},a={args:{hover:!0,isEmpty:!1},render:s,parameters:{docs:{source:{code:`<!-- HTML -->
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
</table>`}}}},n={args:{hover:!1,isEmpty:!1},render:s,parameters:{docs:{description:{story:"Table without hover effect on rows."},source:{code:`<!-- HTML -->
<table class="table">
  <!-- Table content -->
</table>`}}}},d={args:{hover:!0,isEmpty:!0},render:s,parameters:{docs:{source:{code:`<!-- HTML -->
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
</table>`}}}},r={render:()=>`
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
  `,parameters:{docs:{description:{story:"Table inside a card with header."}}}},o={render:()=>{const t="table-interactive-"+Math.random().toString(36).substr(2,9);return`
      <div id="${t}" style="max-width: 900px;">
        <div class="alert alert-info mb-4">
          <i class="bx bx-info-circle me-2"></i>
          <strong>Interactive Demo:</strong> Click on rows to highlight, or click column headers to sort.
        </div>
        
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">Sortable Table</h4>
          </div>
          <div class="card-body">
            <table class="table table-hover" id="demoTable-${t}">
              <thead>
                <tr>
                  <th style="cursor: pointer;" onclick="
                    const tbody = document.querySelector('#demoTable-${t} tbody');
                    const rows = Array.from(tbody.querySelectorAll('tr'));
                    rows.sort((a, b) => parseInt(a.cells[0].textContent) - parseInt(b.cells[0].textContent));
                    rows.forEach(row => tbody.appendChild(row));
                  ">ID ↕</th>
                  <th style="cursor: pointer;" onclick="
                    const tbody = document.querySelector('#demoTable-${t} tbody');
                    const rows = Array.from(tbody.querySelectorAll('tr'));
                    rows.sort((a, b) => a.cells[1].textContent.localeCompare(b.cells[1].textContent));
                    rows.forEach(row => tbody.appendChild(row));
                  ">Name ↕</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th style="cursor: pointer;" onclick="
                    const tbody = document.querySelector('#demoTable-${t} tbody');
                    const rows = Array.from(tbody.querySelectorAll('tr'));
                    rows.sort((a, b) => a.cells[4].textContent.localeCompare(b.cells[4].textContent));
                    rows.forEach(row => tbody.appendChild(row));
                  ">Status ↕</th>
                </tr>
              </thead>
              <tbody>
                <tr onclick="this.classList.toggle('table-active');" style="cursor: pointer;">
                  <td>3</td>
                  <td>Alice Cooper</td>
                  <td>alice@example.com</td>
                  <td>User</td>
                  <td><span class="badge bg-success">Active</span></td>
                </tr>
                <tr onclick="this.classList.toggle('table-active');" style="cursor: pointer;">
                  <td>1</td>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>Admin</td>
                  <td><span class="badge bg-success">Active</span></td>
                </tr>
                <tr onclick="this.classList.toggle('table-active');" style="cursor: pointer;">
                  <td>4</td>
                  <td>Bob Johnson</td>
                  <td>bob@example.com</td>
                  <td>User</td>
                  <td><span class="badge bg-secondary">Inactive</span></td>
                </tr>
                <tr onclick="this.classList.toggle('table-active');" style="cursor: pointer;">
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>jane@example.com</td>
                  <td>Manager</td>
                  <td><span class="badge bg-success">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `},parameters:{docs:{description:{story:"Interactive sortable table with clickable rows."}}}};var c,i,h;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    hover: true,
    isEmpty: false
  },
  render: createTable,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
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
</table>\`
      }
    }
  }
}`,...(h=(i=a.parameters)==null?void 0:i.docs)==null?void 0:h.source}}};var m,b,p;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    hover: false,
    isEmpty: false
  },
  render: createTable,
  parameters: {
    docs: {
      description: {
        story: 'Table without hover effect on rows.'
      },
      source: {
        code: \`<!-- HTML -->
<table class="table">
  <!-- Table content -->
</table>\`
      }
    }
  }
}`,...(p=(b=n.parameters)==null?void 0:b.docs)==null?void 0:p.source}}};var y,v,u;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    hover: true,
    isEmpty: true
  },
  render: createTable,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
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
</table>\`
      }
    }
  }
}`,...(u=(v=d.parameters)==null?void 0:v.docs)==null?void 0:u.source}}};var g,w,x;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
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
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Table inside a card with header.'
      }
    }
  }
}`,...(x=(w=r.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var S,f,I;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    const containerId = 'table-interactive-' + Math.random().toString(36).substr(2, 9);
    return \`
      <div id="\${containerId}" style="max-width: 900px;">
        <div class="alert alert-info mb-4">
          <i class="bx bx-info-circle me-2"></i>
          <strong>Interactive Demo:</strong> Click on rows to highlight, or click column headers to sort.
        </div>
        
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">Sortable Table</h4>
          </div>
          <div class="card-body">
            <table class="table table-hover" id="demoTable-\${containerId}">
              <thead>
                <tr>
                  <th style="cursor: pointer;" onclick="
                    const tbody = document.querySelector('#demoTable-\${containerId} tbody');
                    const rows = Array.from(tbody.querySelectorAll('tr'));
                    rows.sort((a, b) => parseInt(a.cells[0].textContent) - parseInt(b.cells[0].textContent));
                    rows.forEach(row => tbody.appendChild(row));
                  ">ID ↕</th>
                  <th style="cursor: pointer;" onclick="
                    const tbody = document.querySelector('#demoTable-\${containerId} tbody');
                    const rows = Array.from(tbody.querySelectorAll('tr'));
                    rows.sort((a, b) => a.cells[1].textContent.localeCompare(b.cells[1].textContent));
                    rows.forEach(row => tbody.appendChild(row));
                  ">Name ↕</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th style="cursor: pointer;" onclick="
                    const tbody = document.querySelector('#demoTable-\${containerId} tbody');
                    const rows = Array.from(tbody.querySelectorAll('tr'));
                    rows.sort((a, b) => a.cells[4].textContent.localeCompare(b.cells[4].textContent));
                    rows.forEach(row => tbody.appendChild(row));
                  ">Status ↕</th>
                </tr>
              </thead>
              <tbody>
                <tr onclick="this.classList.toggle('table-active');" style="cursor: pointer;">
                  <td>3</td>
                  <td>Alice Cooper</td>
                  <td>alice@example.com</td>
                  <td>User</td>
                  <td><span class="badge bg-success">Active</span></td>
                </tr>
                <tr onclick="this.classList.toggle('table-active');" style="cursor: pointer;">
                  <td>1</td>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>Admin</td>
                  <td><span class="badge bg-success">Active</span></td>
                </tr>
                <tr onclick="this.classList.toggle('table-active');" style="cursor: pointer;">
                  <td>4</td>
                  <td>Bob Johnson</td>
                  <td>bob@example.com</td>
                  <td>User</td>
                  <td><span class="badge bg-secondary">Inactive</span></td>
                </tr>
                <tr onclick="this.classList.toggle('table-active');" style="cursor: pointer;">
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>jane@example.com</td>
                  <td>Manager</td>
                  <td><span class="badge bg-success">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive sortable table with clickable rows.'
      }
    }
  }
}`,...(I=(f=o.parameters)==null?void 0:f.docs)==null?void 0:I.source}}};const T=["Default","WithoutHover","EmptyState","InCard","Interactive"];export{a as Default,d as EmptyState,r as InCard,o as Interactive,n as WithoutHover,T as __namedExportsOrder,D as default};
