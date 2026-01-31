/**
 * DataTable - Organism (Data Display)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/core.css (.table, .table-*)
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Tabela de dados com paginação, ordenação e filtros.
 */

export default {
  title: 'Organisms/Data Display/DataTable',
  tags: ['autodocs'],
  argTypes: {
    rowsCount: {
      control: { type: 'range', min: 0, max: 20, step: 1 },
      description: 'Number of rows to display',
      table: {
        defaultValue: { summary: 5 }
      }
    },
    showPagination: {
      control: 'boolean',
      description: 'Show pagination controls',
      table: {
        defaultValue: { summary: true }
      }
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'empty', 'loading'],
      description: 'Table state',
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    striped: {
      control: 'boolean',
      description: 'Striped rows',
      table: {
        defaultValue: { summary: true }
      }
    },
    hover: {
      control: 'boolean',
      description: 'Hover effect on rows',
      table: {
        defaultValue: { summary: true }
      }
    },
    bordered: {
      control: 'boolean',
      description: 'Bordered table',
      table: {
        defaultValue: { summary: false }
      }
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# DataTable

Tabela de dados completa com header, linhas, estados e paginação mockada.

## Composição
- **Table** (estrutura de tabela Bootstrap/Vuexy)
- **Badge** (status indicators)
- **Button** (actions)
- **Pagination** (navegação)

## Quando usar
- Listagens de dados
- Dashboards com métricas
- Relatórios
- Gerenciamento de recursos (users, products, etc.)

## Estados
- **Default**: Tabela com dados
- **Empty**: Sem resultados (ilustração + mensagem)
- **Loading**: Estado de carregamento (skeleton)

## Features (na implementação real)
- Ordenação por colunas
- Filtros
- Busca
- Seleção de linhas
- Ações em lote
- Exportação
- Paginação server-side ou client-side

## Acessibilidade
- Use \`<thead>\`, \`<tbody>\`, \`<th>\`, \`<td>\` corretamente
- Adicione \`scope="col"\` nos headers
- Forneça labels descritivos para ações
- Navegação por teclado funcional
        `
      }
    }
  },
};

// Mock data generator
const generateMockData = (count) => {
  const names = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown', 
                 'Sarah Wilson', 'David Martinez', 'Lisa Anderson', 'James Taylor', 'Maria Garcia'];
  const roles = ['Admin', 'User', 'Manager', 'Developer', 'Designer'];
  const statuses = [
    { label: 'Active', variant: 'success' },
    { label: 'Inactive', variant: 'secondary' },
    { label: 'Pending', variant: 'warning' },
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    date: new Date(2024, 0, i + 1).toLocaleDateString('pt-BR'),
  }));
};

// Helper para criar markup da tabela
const createDataTable = ({ 
  rowsCount = 5, 
  showPagination = true, 
  state = 'default',
  striped = true,
  hover = true,
  bordered = false,
}) => {
  const tableClasses = [
    'table',
    striped ? 'table-striped' : '',
    hover ? 'table-hover' : '',
    bordered ? 'table-bordered' : '',
  ].filter(Boolean).join(' ');

  // Loading State
  if (state === 'loading') {
    return `
<div class="card">
  <div class="card-datatable table-responsive">
    <table class="${tableClasses}">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${Array.from({ length: 3 }, () => `
          <tr>
            <td><div class="placeholder-glow"><span class="placeholder col-8"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-12"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-10"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-6"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-8"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-4"></span></div></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</div>`;
  }

  // Empty State
  if (state === 'empty' || rowsCount === 0) {
    return `
<div class="card">
  <div class="card-datatable table-responsive">
    <table class="${tableClasses}">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="6" class="text-center" style="padding: 3rem;">
            <div style="opacity: 0.6;">
              <i class="bx bx-data" style="font-size: 3rem; display: block; margin-bottom: 1rem;"></i>
              <h5>No data available</h5>
              <p class="text-muted">No records found. Try adjusting your filters.</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;
  }

  // Default State with Data
  const data = generateMockData(rowsCount);
  
  const pagination = showPagination ? `
  <div class="card-footer d-flex justify-content-between align-items-center">
    <div class="text-muted">
      Showing 1 to ${rowsCount} of ${rowsCount} entries
    </div>
    <nav aria-label="Table pagination">
      <ul class="pagination mb-0">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>
        <li class="page-item active">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>` : '';

  return `
<div class="card">
  <div class="card-datatable table-responsive">
    <table class="${tableClasses}">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(row => `
          <tr>
            <td>${row.id}</td>
            <td>
              <div class="d-flex align-items-center">
                <div class="avatar avatar-sm me-2">
                  <span class="avatar-initial rounded-circle bg-label-primary">
                    ${row.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <strong>${row.name}</strong>
                </div>
              </div>
            </td>
            <td>${row.email}</td>
            <td><span class="badge bg-label-info">${row.role}</span></td>
            <td><span class="badge bg-${row.status.variant}">${row.status.label}</span></td>
            <td>${row.date}</td>
            <td>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-icon btn-outline-primary" aria-label="Edit">
                  <i class="bx bx-edit"></i>
                </button>
                <button class="btn btn-sm btn-icon btn-outline-danger" aria-label="Delete">
                  <i class="bx bx-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  ${pagination}
</div>`;
};

// Overview
export const Overview = {
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4 style="margin-bottom: 1rem;">Default State</h4>
          ${createDataTable({ rowsCount: 3, showPagination: false })}
        </div>
        <div>
          <h4 style="margin-bottom: 1rem;">Loading State</h4>
          ${createDataTable({ state: 'loading', showPagination: false })}
        </div>
        <div>
          <h4 style="margin-bottom: 1rem;">Empty State</h4>
          ${createDataTable({ state: 'empty', showPagination: false })}
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Visão geral dos três estados principais: default, loading e empty.'
      }
    }
  }
};

// Default Story
export const Default = {
  args: {
    rowsCount: 5,
    showPagination: true,
    state: 'default',
    striped: true,
    hover: true,
    bordered: false,
  },
  render: (args) => createDataTable(args),
  parameters: {
    docs: {
      source: {
        code: createDataTable({ rowsCount: 5, showPagination: true }),
      },
      description: {
        story: 'Tabela padrão com dados, efeito hover e paginação.'
      }
    }
  }
};

// With Many Rows
export const WithManyRows = {
  args: {
    rowsCount: 15,
    showPagination: true,
    state: 'default',
    striped: true,
    hover: true,
  },
  render: (args) => createDataTable(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabela com muitas linhas e paginação visível.'
      }
    }
  }
};

// Loading State
export const Loading = {
  args: {
    state: 'loading',
    showPagination: false,
  },
  render: (args) => createDataTable(args),
  parameters: {
    docs: {
      source: {
        code: createDataTable({ state: 'loading' }),
      },
      description: {
        story: 'Estado de carregamento com skeleton placeholders.'
      }
    }
  }
};

// Empty State
export const Empty = {
  args: {
    state: 'empty',
    showPagination: false,
  },
  render: (args) => createDataTable(args),
  parameters: {
    docs: {
      source: {
        code: createDataTable({ state: 'empty' }),
      },
      description: {
        story: 'Estado vazio quando não há dados para exibir.'
      }
    }
  }
};

// Without Pagination
export const WithoutPagination = {
  args: {
    rowsCount: 5,
    showPagination: false,
    state: 'default',
  },
  render: (args) => createDataTable(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabela sem controles de paginação.'
      }
    }
  }
};

// Bordered
export const Bordered = {
  args: {
    rowsCount: 5,
    showPagination: false,
    bordered: true,
    striped: false,
  },
  render: (args) => createDataTable(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabela com bordas em todas as células.'
      }
    }
  }
};

// Compact (Small)
export const Compact = {
  render: () => {
    const compactTable = createDataTable({ 
      rowsCount: 8, 
      showPagination: true,
      striped: true,
      hover: true 
    }).replace('class="table', 'class="table table-sm');
    
    return compactTable;
  },
  parameters: {
    docs: {
      source: {
        code: `<table class="table table-sm table-striped table-hover">
  <!-- ... -->
</table>`,
      },
      description: {
        story: 'Versão compacta da tabela usando classe table-sm.'
      }
    }
  }
};

/**
 * ====================================
 * INTERACTIVE STORY - DataTables Real
 * ====================================
 */

export const Interactive = {
  parameters: {
    docs: {
      description: {
        story: `
### DataTable com jQuery DataTables

Implementação oficial usando DataTables do Vuexy:

- ✅ **Search** - busca global em todas as colunas
- ✅ **Sort** - ordenação por coluna (asc/desc)
- ✅ **Pagination** - navegação por páginas
- ✅ **Page Length** - escolher itens por página (10/25/50/100)
- ✅ **Info** - mostra "Exibindo X de Y registros"
- ✅ **Responsive** - adapta colunas em mobile
- ✅ **Column Search** - busca individual por coluna

**Casos de uso:**
- Listagem de usuários
- Relatórios de vendas
- Inventário de produtos
- Logs do sistema
- Qualquer dataset grande

### Como testar:
1. Digite no Search para filtrar
2. Clique nos headers para ordenar
3. Teste paginação
4. Use busca por coluna
        `
      }
    }
  },
  loaders: [
    async () => {
      if (typeof window !== 'undefined') {
        // Load jQuery first
        if (!window.jQuery) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '/vuexy/vendors/libs/jquery/jquery.js';
            script.onload = () => {
              console.log('✅ jQuery carregado');
              resolve();
            };
            script.onerror = () => reject(new Error('Failed to load jQuery'));
            document.head.appendChild(script);
          });
        }
        
        // Load DataTables CSS
        if (!document.querySelector('link[href*="datatables"]')) {
          await new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/vuexy/vendors/libs/datatables-bs5/datatables.bootstrap5.css';
            link.onload = () => resolve();
            link.onerror = () => reject(new Error('Failed to load DataTables CSS'));
            document.head.appendChild(link);
          });
        }
        
        // Load DataTables JS
        if (!window.jQuery.fn.DataTable) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '/vuexy/vendors/libs/datatables-bs5/datatables-bootstrap5.js';
            script.onload = () => {
              console.log('✅ DataTables CSS + JS carregados');
              resolve();
            };
            script.onerror = () => reject(new Error('Failed to load DataTables JS'));
            document.head.appendChild(script);
          });
        }
        
        return { datatablesLoaded: true };
      }
      return {};
    }
  ],
  render: () => {
    // Sample data - 50 users
    const users = [];
    const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Juliana', 'Lucas', 'Fernanda', 'Rafael', 'Camila'];
    const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Costa', 'Ferreira', 'Rodrigues', 'Almeida'];
    const departments = ['TI', 'Vendas', 'Marketing', 'RH', 'Financeiro'];
    const statuses = ['Ativo', 'Inativo', 'Férias'];
    
    for (let i = 1; i <= 50; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const dept = departments[Math.floor(Math.random() * departments.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const salary = (3000 + Math.floor(Math.random() * 12000)).toLocaleString('pt-BR');
      
      users.push({
        id: i,
        name: \`\${firstName} \${lastName}\`,
        email: \`\${firstName.toLowerCase()}.\${lastName.toLowerCase()}@empresa.com\`,
        department: dept,
        status: status,
        salary: \`R$ \${salary}\`
      });
    }
    
    // Generate table rows
    const tableRows = users.map(user => \`
      <tr>
        <td>\${user.id}</td>
        <td>\${user.name}</td>
        <td>\${user.email}</td>
        <td>\${user.department}</td>
        <td>
          <span class="badge bg-label-\${user.status === 'Ativo' ? 'success' : user.status === 'Inativo' ? 'danger' : 'warning'}">
            \${user.status}
          </span>
        </td>
        <td>\${user.salary}</td>
      </tr>
    \`).join('');
    
    // Initialize DataTable after render
    setTimeout(() => {
      if (window.jQuery && window.jQuery.fn.DataTable) {
        const $ = window.jQuery;
        
        $('#datatable-main').DataTable({
          pageLength: 10,
          lengthMenu: [[10, 25, 50], [10, 25, 50]],
          language: {
            search: 'Buscar:',
            lengthMenu: 'Exibir _MENU_ por página',
            info: 'Mostrando _START_ a _END_ de _TOTAL_',
            paginate: {
              previous: 'Anterior',
              next: 'Próxima'
            }
          },
          order: [[0, 'asc']]
        });
        
        // Column search table
        $('#datatable-column-search thead tr').clone(true).appendTo('#datatable-column-search thead');
        $('#datatable-column-search thead tr:eq(1) th').each(function(i) {
          $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar..." />');
          
          $('input', this).on('keyup change', function() {
            if (table.column(i).search() !== this.value) {
              table.column(i).search(this.value).draw();
            }
          });
        });
        
        const table = $('#datatable-column-search').DataTable({
          pageLength: 5,
          orderCellsTop: true,
          language: {
            search: 'Buscar:',
            lengthMenu: 'Exibir _MENU_',
            info: '_START_-_END_ de _TOTAL_',
            paginate: {
              previous: '←',
              next: '→'
            }
          }
        });
        
        console.log('✅ DataTables: 50 usuários');
      }
    }, 100);

    return \`
      <style>
        table.dataTable thead th {
          border-bottom: 2px solid #ddd;
        }
      </style>
      
      <div style="padding: 30px;">
        <h5 class="mb-4">
          <i class="ti ti-table me-2 text-primary"></i>
          DataTable Avançado com jQuery DataTables
        </h5>
        
        <!-- Main DataTable -->
        <div class="card mb-4">
          <div class="card-header">
            <h6 class="mb-0">Listagem de Colaboradores (50 registros)</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-hover" id="datatable-main">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Departamento</th>
                    <th>Status</th>
                    <th>Salário</th>
                  </tr>
                </thead>
                <tbody>
                  \${tableRows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- Column Search -->
        <div class="card mb-4">
          <div class="card-header">
            <h6 class="mb-0">Com Busca por Coluna</h6>
          </div>
          <div class="card-body">
            <p class="text-muted small">Digite nos campos abaixo dos headers</p>
            <div class="table-responsive">
              <table class="table table-bordered" id="datatable-column-search">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Departamento</th>
                    <th>Status</th>
                    <th>Salário</th>
                  </tr>
                </thead>
                <tbody>
                  \${tableRows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Search:</strong> Campo "Buscar" no topo - busca em todas as colunas</li>
            <li><strong>Sort:</strong> Clique nos headers - alterna asc/desc</li>
            <li><strong>Pagination:</strong> Use botões "Anterior/Próxima"</li>
            <li><strong>Page Length:</strong> Escolha 10/25/50 registros por página</li>
            <li><strong>Column Search:</strong> Segunda tabela - filtro individual por coluna</li>
            <li><strong>Badges:</strong> Status com cores (Ativo=verde, Inativo=vermelho)</li>
            <li><strong>Locale pt-BR:</strong> Mensagens em português</li>
          </ul>
        </div>
      </div>
    \`;
  }
};
