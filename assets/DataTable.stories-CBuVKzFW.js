const X={title:"Vuexy/Organisms/Data Display/DataTable",tags:["autodocs"],argTypes:{rowsCount:{control:{type:"range",min:0,max:20,step:1},description:"Number of rows to display",table:{defaultValue:{summary:5}}},showPagination:{control:"boolean",description:"Show pagination controls",table:{defaultValue:{summary:!0}}},state:{control:{type:"select"},options:["default","empty","loading"],description:"Table state",table:{defaultValue:{summary:"default"}}},striped:{control:"boolean",description:"Striped rows",table:{defaultValue:{summary:!0}}},hover:{control:"boolean",description:"Hover effect on rows",table:{defaultValue:{summary:!0}}},bordered:{control:"boolean",description:"Bordered table",table:{defaultValue:{summary:!1}}}},parameters:{docs:{description:{component:`
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
        `}}}},Y=a=>{const s=["John Doe","Jane Smith","Robert Johnson","Emily Davis","Michael Brown","Sarah Wilson","David Martinez","Lisa Anderson","James Taylor","Maria Garcia"],t=["Admin","User","Manager","Developer","Designer"],l=[{label:"Active",variant:"success"},{label:"Inactive",variant:"secondary"},{label:"Pending",variant:"warning"}];return Array.from({length:a},(d,e)=>({id:e+1,name:s[e%s.length],email:`${s[e%s.length].toLowerCase().replace(" ",".")}@example.com`,role:t[e%t.length],status:l[e%l.length],date:new Date(2024,0,e+1).toLocaleDateString("pt-BR")}))},n=({rowsCount:a=5,showPagination:s=!0,state:t="default",striped:l=!0,hover:d=!0,bordered:e=!1})=>{const r=["table",l?"table-striped":"",d?"table-hover":"",e?"table-bordered":""].filter(Boolean).join(" ");if(t==="loading")return`
<div class="card">
  <div class="card-datatable table-responsive">
    <table class="${r}">
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
        ${Array.from({length:3},()=>`
          <tr>
            <td><div class="placeholder-glow"><span class="placeholder col-8"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-12"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-10"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-6"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-8"></span></div></td>
            <td><div class="placeholder-glow"><span class="placeholder col-4"></span></div></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  </div>
</div>`;if(t==="empty"||a===0)return`
<div class="card">
  <div class="card-datatable table-responsive">
    <table class="${r}">
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
</div>`;const i=Y(a),f=s?`
  <div class="card-footer d-flex justify-content-between align-items-center">
    <div class="text-muted">
      Showing 1 to ${a} of ${a} entries
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
  </div>`:"";return`
<div class="card">
  <div class="card-datatable table-responsive">
    <table class="${r}">
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
        ${i.map(o=>`
          <tr>
            <td>${o.id}</td>
            <td>
              <div class="d-flex align-items-center">
                <div class="avatar avatar-sm me-2">
                  <span class="avatar-initial rounded-circle bg-label-primary">
                    ${o.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <strong>${o.name}</strong>
                </div>
              </div>
            </td>
            <td>${o.email}</td>
            <td><span class="badge bg-label-info">${o.role}</span></td>
            <td><span class="badge bg-${o.status.variant}">${o.status.label}</span></td>
            <td>${o.date}</td>
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
        `).join("")}
      </tbody>
    </table>
  </div>
  ${f}
</div>`},u={render:()=>`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4 style="margin-bottom: 1rem;">Default State</h4>
          ${n({rowsCount:3,showPagination:!1})}
        </div>
        <div>
          <h4 style="margin-bottom: 1rem;">Loading State</h4>
          ${n({state:"loading",showPagination:!1})}
        </div>
        <div>
          <h4 style="margin-bottom: 1rem;">Empty State</h4>
          ${n({state:"empty",showPagination:!1})}
        </div>
      </div>
    `,parameters:{docs:{description:{story:"Visão geral dos três estados principais: default, loading e empty."}}}},p={args:{rowsCount:5,showPagination:!0,state:"default",striped:!0,hover:!0,bordered:!1},render:a=>n(a),parameters:{docs:{source:{code:n({rowsCount:5,showPagination:!0})},description:{story:"Tabela padrão com dados, efeito hover e paginação."}}}},m={args:{rowsCount:15,showPagination:!0,state:"default",striped:!0,hover:!0},render:a=>n(a),parameters:{docs:{description:{story:"Tabela com muitas linhas e paginação visível."}}}},h={args:{state:"loading",showPagination:!1},render:a=>n(a),parameters:{docs:{source:{code:n({state:"loading"})},description:{story:"Estado de carregamento com skeleton placeholders."}}}},b={args:{state:"empty",showPagination:!1},render:a=>n(a),parameters:{docs:{source:{code:n({state:"empty"})},description:{story:"Estado vazio quando não há dados para exibir."}}}},g={args:{rowsCount:5,showPagination:!1,state:"default"},render:a=>n(a),parameters:{docs:{description:{story:"Tabela sem controles de paginação."}}}},v={args:{rowsCount:5,showPagination:!1,bordered:!0,striped:!1},render:a=>n(a),parameters:{docs:{description:{story:"Tabela com bordas em todas as células."}}}},y={render:()=>n({rowsCount:8,showPagination:!0,striped:!0,hover:!0}).replace('class="table','class="table table-sm'),parameters:{docs:{source:{code:`<table class="table table-sm table-striped table-hover">
  <!-- ... -->
</table>`},description:{story:"Versão compacta da tabela usando classe table-sm."}}}},c={parameters:{docs:{description:{story:`
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
        `}}},loaders:[async()=>typeof window<"u"?(window.jQuery||await new Promise((a,s)=>{const t=document.createElement("script");t.src="/vuexy/vendors/libs/jquery/jquery.js",t.onload=()=>{console.log("✅ jQuery carregado"),a()},t.onerror=()=>s(new Error("Failed to load jQuery")),document.head.appendChild(t)}),document.querySelector('link[href*="datatables"]')||await new Promise((a,s)=>{const t=document.createElement("link");t.rel="stylesheet",t.href="/vuexy/vendors/libs/datatables-bs5/datatables.bootstrap5.css",t.onload=()=>a(),t.onerror=()=>s(new Error("Failed to load DataTables CSS")),document.head.appendChild(t)}),window.jQuery.fn.DataTable||await new Promise((a,s)=>{const t=document.createElement("script");t.src="/vuexy/vendors/libs/datatables-bs5/datatables-bootstrap5.js",t.onload=()=>{console.log("✅ DataTables CSS + JS carregados"),a()},t.onerror=()=>s(new Error("Failed to load DataTables JS")),document.head.appendChild(t)}),{datatablesLoaded:!0}):{}],render:()=>{const a=[],s=["João","Maria","Pedro","Ana","Carlos","Juliana","Lucas","Fernanda","Rafael","Camila"],t=["Silva","Santos","Oliveira","Souza","Costa","Ferreira","Rodrigues","Almeida"],l=["TI","Vendas","Marketing","RH","Financeiro"],d=["Ativo","Inativo","Férias"];for(let e=1;e<=50;e++){const r=s[Math.floor(Math.random()*s.length)],i=t[Math.floor(Math.random()*t.length)],f=l[Math.floor(Math.random()*l.length)],o=d[Math.floor(Math.random()*d.length)],H=(3e3+Math.floor(Math.random()*12e3)).toLocaleString("pt-BR");a.push({id:e,name:r+" "+i,email:r.toLowerCase()+"."+i.toLowerCase()+"@empresa.com",department:f,status:o,salary:"R$ "+H})}return a.map(e=>`
      <tr>
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td>${e.email}</td>
        <td>${e.department}</td>
        <td>
          <span class="badge bg-label-${e.status==="Ativo"?"success":e.status==="Inativo"?"danger":"warning"}">
            ${e.status}
          </span>
        </td>
        <td>${e.salary}</td>
      </tr>
    `).join(""),setTimeout(()=>{if(window.jQuery&&window.jQuery.fn.DataTable){const e=window.jQuery;e("#datatable-main").DataTable({pageLength:10,lengthMenu:[[10,25,50],[10,25,50]],language:{search:"Buscar:",lengthMenu:"Exibir _MENU_ por página",info:"Mostrando _START_ a _END_ de _TOTAL_",paginate:{previous:"Anterior",next:"Próxima"}},order:[[0,"asc"]]}),e("#datatable-column-search thead tr").clone(!0).appendTo("#datatable-column-search thead"),e("#datatable-column-search thead tr:eq(1) th").each(function(i){e(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar..." />'),e("input",this).on("keyup change",function(){r.column(i).search()!==this.value&&r.column(i).search(this.value).draw()})});const r=e("#datatable-column-search").DataTable({pageLength:5,orderCellsTop:!0,language:{search:"Buscar:",lengthMenu:"Exibir _MENU_",info:"_START_-_END_ de _TOTAL_",paginate:{previous:"←",next:"→"}}});console.log("✅ DataTables: 50 usuários")}},100),`
      <style>
        table.dataTable thead th {
          border-bottom: 2px solid #ddd;
        }
      </style>
      
      <div style="padding: 30px;">
        <h5 class="mb-4">
          <i class="ti tabler-table me-2 text-primary"></i>
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
    `}};var w,T,x;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4 style="margin-bottom: 1rem;">Default State</h4>
          \${createDataTable({
      rowsCount: 3,
      showPagination: false
    })}
        </div>
        <div>
          <h4 style="margin-bottom: 1rem;">Loading State</h4>
          \${createDataTable({
      state: 'loading',
      showPagination: false
    })}
        </div>
        <div>
          <h4 style="margin-bottom: 1rem;">Empty State</h4>
          \${createDataTable({
      state: 'empty',
      showPagination: false
    })}
        </div>
      </div>
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Visão geral dos três estados principais: default, loading e empty.'
      }
    }
  }
}`,...(x=(T=u.parameters)==null?void 0:T.docs)==null?void 0:x.source}}};var D,E,S;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    rowsCount: 5,
    showPagination: true,
    state: 'default',
    striped: true,
    hover: true,
    bordered: false
  },
  render: args => createDataTable(args),
  parameters: {
    docs: {
      source: {
        code: createDataTable({
          rowsCount: 5,
          showPagination: true
        })
      },
      description: {
        story: 'Tabela padrão com dados, efeito hover e paginação.'
      }
    }
  }
}`,...(S=(E=p.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var C,$,P;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    rowsCount: 15,
    showPagination: true,
    state: 'default',
    striped: true,
    hover: true
  },
  render: args => createDataTable(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabela com muitas linhas e paginação visível.'
      }
    }
  }
}`,...(P=($=m.parameters)==null?void 0:$.docs)==null?void 0:P.source}}};var M,L,j;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    state: 'loading',
    showPagination: false
  },
  render: args => createDataTable(args),
  parameters: {
    docs: {
      source: {
        code: createDataTable({
          state: 'loading'
        })
      },
      description: {
        story: 'Estado de carregamento com skeleton placeholders.'
      }
    }
  }
}`,...(j=(L=h.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};var A,N,R;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    state: 'empty',
    showPagination: false
  },
  render: args => createDataTable(args),
  parameters: {
    docs: {
      source: {
        code: createDataTable({
          state: 'empty'
        })
      },
      description: {
        story: 'Estado vazio quando não há dados para exibir.'
      }
    }
  }
}`,...(R=(N=b.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var _,k,B;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    rowsCount: 5,
    showPagination: false,
    state: 'default'
  },
  render: args => createDataTable(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabela sem controles de paginação.'
      }
    }
  }
}`,...(B=(k=g.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var I,Q,F;v.parameters={...v.parameters,docs:{...(I=v.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    rowsCount: 5,
    showPagination: false,
    bordered: true,
    striped: false
  },
  render: args => createDataTable(args),
  parameters: {
    docs: {
      description: {
        story: 'Tabela com bordas em todas as células.'
      }
    }
  }
}`,...(F=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:F.source}}};var V,q,J;y.parameters={...y.parameters,docs:{...(V=y.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
        code: \`<table class="table table-sm table-striped table-hover">
  <!-- ... -->
</table>\`
      },
      description: {
        story: 'Versão compacta da tabela usando classe table-sm.'
      }
    }
  }
}`,...(J=(q=y.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var O,U,z,W,G;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
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
        \`
      }
    }
  },
  loaders: [async () => {
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
      return {
        datatablesLoaded: true
      };
    }
    return {};
  }],
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
        name: firstName + ' ' + lastName,
        email: firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@empresa.com',
        department: dept,
        status: status,
        salary: 'R$ ' + salary
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
        $('#datatable-column-search thead tr:eq(1) th').each(function (i) {
          $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar..." />');
          $('input', this).on('keyup change', function () {
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
          <i class="ti tabler-table me-2 text-primary"></i>
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
                  \\\${tableRows}
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
                  \\\${tableRows}
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
}`,...(z=(U=c.parameters)==null?void 0:U.docs)==null?void 0:z.source},description:{story:`====================================
INTERACTIVE STORY - DataTables Real
====================================`,...(G=(W=c.parameters)==null?void 0:W.docs)==null?void 0:G.description}}};const K=["Overview","Default","WithManyRows","Loading","Empty","WithoutPagination","Bordered","Compact","Interactive"];export{v as Bordered,y as Compact,p as Default,b as Empty,c as Interactive,h as Loading,u as Overview,m as WithManyRows,g as WithoutPagination,K as __namedExportsOrder,X as default};
