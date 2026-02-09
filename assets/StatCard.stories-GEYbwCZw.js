const N={title:"Vuexy/Molecules/Data Display/StatCard",tags:["autodocs"],parameters:{docs:{description:{component:`
## StatCard - Cards de Estatísticas

Cards compactos para exibir KPIs e métricas em dashboards.

### Composição (Átomos usados)
- Card (surface)
- Icon (ícone do indicador)
- Badge (trend/variação)
- Text (valor e label)

### Variantes
- **Simple**: Apenas valor e label
- **With Icon**: Ícone representativo
- **With Trend**: Indicador de variação (↑ ou ↓)
- **With Chart**: Mini gráfico sparkline
        `}}},argTypes:{title:{control:"text",description:"Título/label da métrica"},value:{control:"text",description:"Valor principal"},trend:{control:"text",description:"Porcentagem de variação"},trendDirection:{control:"select",options:["up","down","neutral"],description:"Direção do trend"},icon:{control:"text",description:"Classe do ícone Tabler"},color:{control:"select",options:["primary","success","warning","danger","info","secondary"],description:"Cor do tema"}}},s=({title:o="Vendas",value:W="$42.5k",trend:v="+18.2%",trendDirection:a="up",icon:G="currency-dollar",color:z="primary",subtitle:m=""})=>{const q=a==="up"?"success":a==="down"?"danger":"secondary",L=a==="up"?"trending-up":a==="down"?"trending-down":"minus";return`
<div class="card">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-start">
      <div>
        <p class="text-muted mb-1">${o}</p>
        <h3 class="mb-1">${W}</h3>
        ${m?`<small class="text-muted">${m}</small>`:""}
        ${v?`
        <span class="badge bg-label-${q}">
          <i class="ti ti-${L} ti-xs me-1"></i>${v}
        </span>
        `:""}
      </div>
      <div class="avatar">
        <span class="avatar-initial rounded bg-label-${z}">
          <i class="ti ti-${G} ti-md"></i>
        </span>
      </div>
    </div>
  </div>
</div>
  `},e={args:{title:"Total de Vendas",value:"$42.5k",trend:"+18.2%",trendDirection:"up",icon:"currency-dollar",color:"primary"},render:o=>s(o)},t={render:()=>`
<div class="row g-4">
  <div class="col-md-3 col-sm-6">
    ${s({title:"Total de Vendas",value:"$42.5k",trend:"+18.2%",trendDirection:"up",icon:"currency-dollar",color:"primary"})}
  </div>
  <div class="col-md-3 col-sm-6">
    ${s({title:"Novos Usuários",value:"8,549",trend:"+12.4%",trendDirection:"up",icon:"users",color:"success"})}
  </div>
  <div class="col-md-3 col-sm-6">
    ${s({title:"Pedidos",value:"1,423",trend:"-8.1%",trendDirection:"down",icon:"shopping-cart",color:"warning"})}
  </div>
  <div class="col-md-3 col-sm-6">
    ${s({title:"Receita",value:"$89.2k",trend:"+4.8%",trendDirection:"up",icon:"chart-bar",color:"info"})}
  </div>
</div>
  `},i={render:()=>`
<div class="row g-4">
  <div class="col-md-4">
    ${s({title:"Earnings",value:"$545.69",subtitle:"This week",trend:"+4.2%",trendDirection:"up",icon:"wallet",color:"primary"})}
  </div>
  <div class="col-md-4">
    ${s({title:"Profit",value:"$256.34",subtitle:"This month",icon:"chart-pie",color:"success"})}
  </div>
  <div class="col-md-4">
    ${s({title:"Expense",value:"$74.19",subtitle:"This quarter",trend:"-2.3%",trendDirection:"down",icon:"receipt",color:"danger"})}
  </div>
</div>
  `},n={render:()=>`
<div class="row g-4">
  <div class="col-md-3 col-sm-6">
    <div class="card">
      <div class="card-body py-3">
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded bg-label-primary">
              <i class="ti ti-shopping-cart ti-sm"></i>
            </span>
          </div>
          <div>
            <h6 class="mb-0">62.2%</h6>
            <small class="text-muted">Orders</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-3 col-sm-6">
    <div class="card">
      <div class="card-body py-3">
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded bg-label-success">
              <i class="ti ti-check ti-sm"></i>
            </span>
          </div>
          <div>
            <h6 class="mb-0">25.5%</h6>
            <small class="text-muted">Visits</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-3 col-sm-6">
    <div class="card">
      <div class="card-body py-3">
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded bg-label-warning">
              <i class="ti ti-users ti-sm"></i>
            </span>
          </div>
          <div>
            <h6 class="mb-0">6,440</h6>
            <small class="text-muted">Users</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-3 col-sm-6">
    <div class="card">
      <div class="card-body py-3">
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded bg-label-info">
              <i class="ti ti-clock ti-sm"></i>
            </span>
          </div>
          <div>
            <h6 class="mb-0">12,749</h6>
            <small class="text-muted">Duration</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `},l={name:"Dashboard Style (como na imagem)",render:()=>`
<div class="card">
  <div class="card-body">
    <div class="d-flex justify-content-between">
      <div>
        <p class="text-muted mb-0">Sales Overview</p>
        <h3 class="mb-0">$42.5k</h3>
      </div>
      <span class="badge bg-label-success">+18.2%</span>
    </div>
    
    <hr class="my-3">
    
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center">
        <div class="avatar avatar-sm me-2">
          <span class="avatar-initial rounded bg-label-primary">
            <i class="ti ti-shopping-cart ti-xs"></i>
          </span>
        </div>
        <span>Order</span>
      </div>
      <div class="text-end">
        <h6 class="mb-0">62.2%</h6>
        <small class="text-muted">6,440</small>
      </div>
    </div>
    
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <div class="avatar avatar-sm me-2">
          <span class="avatar-initial rounded bg-label-info">
            <i class="ti ti-link ti-xs"></i>
          </span>
        </div>
        <span>Visits</span>
      </div>
      <div class="text-end">
        <h6 class="mb-0">25.5%</h6>
        <small class="text-muted">12,749</small>
      </div>
    </div>
    
    <div class="progress mt-3" style="height: 8px;">
      <div class="progress-bar bg-primary" style="width: 62%"></div>
      <div class="progress-bar bg-info" style="width: 25%"></div>
    </div>
  </div>
</div>
  `},d={name:"Earnings Report Style",render:()=>`
<div class="card">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-start mb-4">
      <div>
        <h5 class="card-title mb-1">Earning Reports</h5>
        <small class="text-muted">Weekly Earnings Overview</small>
      </div>
      <div class="dropdown">
        <button class="btn btn-sm btn-icon" type="button">
          <i class="ti ti-dots-vertical"></i>
        </button>
      </div>
    </div>
    
    <div class="d-flex align-items-center mb-4">
      <h2 class="mb-0 me-2">$468</h2>
      <span class="badge bg-label-success">+4.2%</span>
    </div>
    
    <p class="text-muted mb-4">You informed of this week compared to last week</p>
    
    <!-- Mini bar chart simulation -->
    <div class="d-flex align-items-end gap-2 mb-4" style="height: 100px;">
      <div class="flex-fill text-center">
        <div class="bg-primary rounded-top" style="height: 40px;"></div>
        <small class="text-muted">Mo</small>
      </div>
      <div class="flex-fill text-center">
        <div class="bg-primary rounded-top" style="height: 60px;"></div>
        <small class="text-muted">Tu</small>
      </div>
      <div class="flex-fill text-center">
        <div class="bg-primary rounded-top" style="height: 45px;"></div>
        <small class="text-muted">We</small>
      </div>
      <div class="flex-fill text-center">
        <div class="bg-primary rounded-top" style="height: 80px;"></div>
        <small class="text-muted">Th</small>
      </div>
      <div class="flex-fill text-center">
        <div class="bg-primary opacity-50 rounded-top" style="height: 100px;"></div>
        <small class="text-muted">Fr</small>
      </div>
      <div class="flex-fill text-center">
        <div class="bg-primary rounded-top" style="height: 55px;"></div>
        <small class="text-muted">Sa</small>
      </div>
      <div class="flex-fill text-center">
        <div class="bg-primary rounded-top" style="height: 35px;"></div>
        <small class="text-muted">Su</small>
      </div>
    </div>
    
    <hr>
    
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <div class="avatar avatar-sm me-2">
          <span class="avatar-initial rounded bg-label-primary">
            <i class="ti ti-currency-dollar ti-xs"></i>
          </span>
        </div>
        <div>
          <small class="text-muted d-block">Earnings</small>
          <strong>$545.69</strong>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="avatar avatar-sm me-2">
          <span class="avatar-initial rounded bg-label-success">
            <i class="ti ti-chart-pie ti-xs"></i>
          </span>
        </div>
        <div>
          <small class="text-muted d-block">Profit</small>
          <strong>$256.34</strong>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="avatar avatar-sm me-2">
          <span class="avatar-initial rounded bg-label-danger">
            <i class="ti ti-receipt ti-xs"></i>
          </span>
        </div>
        <div>
          <small class="text-muted d-block">Expense</small>
          <strong>$74.19</strong>
        </div>
      </div>
    </div>
  </div>
</div>
  `},c={name:"Support Tracker (com gauge)",render:()=>`
<div class="card">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-start mb-3">
      <div>
        <h5 class="card-title mb-1">Support Tracker</h5>
        <small class="text-muted">Last 7 Days</small>
      </div>
      <div class="dropdown">
        <button class="btn btn-sm btn-icon" type="button">
          <i class="ti ti-dots-vertical"></i>
        </button>
      </div>
    </div>
    
    <div class="row">
      <div class="col-5">
        <h2 class="mb-0">164</h2>
        <p class="text-muted mb-3">Total Tickets</p>
        
        <div class="d-flex align-items-center mb-2">
          <div class="avatar avatar-xs me-2">
            <span class="avatar-initial rounded bg-label-primary">
              <i class="ti ti-ticket" style="font-size: 10px;"></i>
            </span>
          </div>
          <div>
            <small class="d-block">New Tickets</small>
            <strong>142</strong>
          </div>
        </div>
        
        <div class="d-flex align-items-center mb-2">
          <div class="avatar avatar-xs me-2">
            <span class="avatar-initial rounded bg-label-success">
              <i class="ti ti-check" style="font-size: 10px;"></i>
            </span>
          </div>
          <div>
            <small class="d-block">Open Tickets</small>
            <strong>28</strong>
          </div>
        </div>
        
        <div class="d-flex align-items-center">
          <div class="avatar avatar-xs me-2">
            <span class="avatar-initial rounded bg-label-warning">
              <i class="ti ti-clock" style="font-size: 10px;"></i>
            </span>
          </div>
          <div>
            <small class="d-block">Response Time</small>
            <strong>1 Day</strong>
          </div>
        </div>
      </div>
      
      <div class="col-7 d-flex align-items-center justify-content-center">
        <!-- Gauge/Radial Progress -->
        <div class="position-relative" style="width: 150px; height: 150px;">
          <svg viewBox="0 0 36 36" style="transform: rotate(-90deg);">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e9ecef"
              stroke-width="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#7367f0"
              stroke-width="3"
              stroke-dasharray="85, 100"
              stroke-linecap="round"
            />
          </svg>
          <div class="position-absolute top-50 start-50 translate-middle text-center">
            <h4 class="mb-0">85%</h4>
            <small class="text-muted">Completed Task</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `},r={render:()=>`
<div class="card">
  <div class="card-header d-flex justify-content-between">
    <h5 class="card-title mb-0">Gerador de StatCard</h5>
    <button class="btn btn-sm btn-primary" onclick="
      const title = document.getElementById('stat-title').value;
      const value = document.getElementById('stat-value').value;
      const trend = document.getElementById('stat-trend').value;
      const icon = document.getElementById('stat-icon').value;
      const color = document.getElementById('stat-color').value;
      const preview = document.getElementById('stat-preview');
      
      preview.innerHTML = \`
        <div class='card'>
          <div class='card-body'>
            <div class='d-flex justify-content-between align-items-start'>
              <div>
                <p class='text-muted mb-1'>\${title}</p>
                <h3 class='mb-1'>\${value}</h3>
                <span class='badge bg-label-success'>
                  <i class='ti ti-trending-up ti-xs me-1'></i>\${trend}
                </span>
              </div>
              <div class='avatar'>
                <span class='avatar-initial rounded bg-label-\${color}'>
                  <i class='ti ti-\${icon} ti-md'></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      \`;
    ">
      Gerar Preview
    </button>
  </div>
  <div class="card-body">
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <label class="form-label">Título</label>
        <input type="text" class="form-control" id="stat-title" value="Total de Vendas">
      </div>
      <div class="col-md-4">
        <label class="form-label">Valor</label>
        <input type="text" class="form-control" id="stat-value" value="$42.5k">
      </div>
      <div class="col-md-4">
        <label class="form-label">Trend</label>
        <input type="text" class="form-control" id="stat-trend" value="+18.2%">
      </div>
      <div class="col-md-6">
        <label class="form-label">Ícone (Tabler)</label>
        <input type="text" class="form-control" id="stat-icon" value="currency-dollar">
      </div>
      <div class="col-md-6">
        <label class="form-label">Cor</label>
        <select class="form-select" id="stat-color">
          <option value="primary" selected>Primary</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="danger">Danger</option>
          <option value="info">Info</option>
        </select>
      </div>
    </div>
    
    <h6>Preview:</h6>
    <div id="stat-preview" class="p-3 bg-light rounded">
      <p class="text-muted text-center mb-0">Clique em "Gerar Preview" para ver o resultado</p>
    </div>
  </div>
</div>
  `};var p,u,b;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    title: 'Total de Vendas',
    value: '$42.5k',
    trend: '+18.2%',
    trendDirection: 'up',
    icon: 'currency-dollar',
    color: 'primary'
  },
  render: args => createStatCard(args)
}`,...(b=(u=e.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var g,x,y;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
<div class="row g-4">
  <div class="col-md-3 col-sm-6">
    \${createStatCard({
    title: 'Total de Vendas',
    value: '$42.5k',
    trend: '+18.2%',
    trendDirection: 'up',
    icon: 'currency-dollar',
    color: 'primary'
  })}
  </div>
  <div class="col-md-3 col-sm-6">
    \${createStatCard({
    title: 'Novos Usuários',
    value: '8,549',
    trend: '+12.4%',
    trendDirection: 'up',
    icon: 'users',
    color: 'success'
  })}
  </div>
  <div class="col-md-3 col-sm-6">
    \${createStatCard({
    title: 'Pedidos',
    value: '1,423',
    trend: '-8.1%',
    trendDirection: 'down',
    icon: 'shopping-cart',
    color: 'warning'
  })}
  </div>
  <div class="col-md-3 col-sm-6">
    \${createStatCard({
    title: 'Receita',
    value: '$89.2k',
    trend: '+4.8%',
    trendDirection: 'up',
    icon: 'chart-bar',
    color: 'info'
  })}
  </div>
</div>
  \`
}`,...(y=(x=t.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var h,f,w;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`
<div class="row g-4">
  <div class="col-md-4">
    \${createStatCard({
    title: 'Earnings',
    value: '$545.69',
    subtitle: 'This week',
    trend: '+4.2%',
    trendDirection: 'up',
    icon: 'wallet',
    color: 'primary'
  })}
  </div>
  <div class="col-md-4">
    \${createStatCard({
    title: 'Profit',
    value: '$256.34',
    subtitle: 'This month',
    icon: 'chart-pie',
    color: 'success'
  })}
  </div>
  <div class="col-md-4">
    \${createStatCard({
    title: 'Expense',
    value: '$74.19',
    subtitle: 'This quarter',
    trend: '-2.3%',
    trendDirection: 'down',
    icon: 'receipt',
    color: 'danger'
  })}
  </div>
</div>
  \`
}`,...(w=(f=i.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var k,$,S;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => \`
<div class="row g-4">
  <div class="col-md-3 col-sm-6">
    <div class="card">
      <div class="card-body py-3">
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded bg-label-primary">
              <i class="ti ti-shopping-cart ti-sm"></i>
            </span>
          </div>
          <div>
            <h6 class="mb-0">62.2%</h6>
            <small class="text-muted">Orders</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-3 col-sm-6">
    <div class="card">
      <div class="card-body py-3">
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded bg-label-success">
              <i class="ti ti-check ti-sm"></i>
            </span>
          </div>
          <div>
            <h6 class="mb-0">25.5%</h6>
            <small class="text-muted">Visits</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-3 col-sm-6">
    <div class="card">
      <div class="card-body py-3">
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded bg-label-warning">
              <i class="ti ti-users ti-sm"></i>
            </span>
          </div>
          <div>
            <h6 class="mb-0">6,440</h6>
            <small class="text-muted">Users</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-3 col-sm-6">
    <div class="card">
      <div class="card-body py-3">
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <span class="avatar-initial rounded bg-label-info">
              <i class="ti ti-clock ti-sm"></i>
            </span>
          </div>
          <div>
            <h6 class="mb-0">12,749</h6>
            <small class="text-muted">Duration</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  \`
}`,...(S=($=n.parameters)==null?void 0:$.docs)==null?void 0:S.source}}};var T,E,C;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Dashboard Style (como na imagem)',
  render: () => \`
<div class="card">
  <div class="card-body">
    <div class="d-flex justify-content-between">
      <div>
        <p class="text-muted mb-0">Sales Overview</p>
        <h3 class="mb-0">$42.5k</h3>
      </div>
      <span class="badge bg-label-success">+18.2%</span>
    </div>
    
    <hr class="my-3">
    
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center">
        <div class="avatar avatar-sm me-2">
          <span class="avatar-initial rounded bg-label-primary">
            <i class="ti ti-shopping-cart ti-xs"></i>
          </span>
        </div>
        <span>Order</span>
      </div>
      <div class="text-end">
        <h6 class="mb-0">62.2%</h6>
        <small class="text-muted">6,440</small>
      </div>
    </div>
    
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <div class="avatar avatar-sm me-2">
          <span class="avatar-initial rounded bg-label-info">
            <i class="ti ti-link ti-xs"></i>
          </span>
        </div>
        <span>Visits</span>
      </div>
      <div class="text-end">
        <h6 class="mb-0">25.5%</h6>
        <small class="text-muted">12,749</small>
      </div>
    </div>
    
    <div class="progress mt-3" style="height: 8px;">
      <div class="progress-bar bg-primary" style="width: 62%"></div>
      <div class="progress-bar bg-info" style="width: 25%"></div>
    </div>
  </div>
</div>
  \`
}`,...(C=(E=l.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};var D,I,j;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: 'Earnings Report Style',
  render: () => \`
<div class="card">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-start mb-4">
      <div>
        <h5 class="card-title mb-1">Earning Reports</h5>
        <small class="text-muted">Weekly Earnings Overview</small>
      </div>
      <div class="dropdown">
        <button class="btn btn-sm btn-icon" type="button">
          <i class="ti ti-dots-vertical"></i>
        </button>
      </div>
    </div>
    
    <div class="d-flex align-items-center mb-4">
      <h2 class="mb-0 me-2">$468</h2>
      <span class="badge bg-label-success">+4.2%</span>
    </div>
    
    <p class="text-muted mb-4">You informed of this week compared to last week</p>
    
    <!-- Mini bar chart simulation -->
    <div class="d-flex align-items-end gap-2 mb-4" style="height: 100px;">
      <div class="flex-fill text-center">
        <div class="bg-primary rounded-top" style="height: 40px;"></div>
        <small class="text-muted">Mo</small>
      </div>
      <div class="flex-fill text-center">
        <div class="bg-primary rounded-top" style="height: 60px;"></div>
        <small class="text-muted">Tu</small>
      </div>
      <div class="flex-fill text-center">
        <div class="bg-primary rounded-top" style="height: 45px;"></div>
        <small class="text-muted">We</small>
      </div>
      <div class="flex-fill text-center">
        <div class="bg-primary rounded-top" style="height: 80px;"></div>
        <small class="text-muted">Th</small>
      </div>
      <div class="flex-fill text-center">
        <div class="bg-primary opacity-50 rounded-top" style="height: 100px;"></div>
        <small class="text-muted">Fr</small>
      </div>
      <div class="flex-fill text-center">
        <div class="bg-primary rounded-top" style="height: 55px;"></div>
        <small class="text-muted">Sa</small>
      </div>
      <div class="flex-fill text-center">
        <div class="bg-primary rounded-top" style="height: 35px;"></div>
        <small class="text-muted">Su</small>
      </div>
    </div>
    
    <hr>
    
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <div class="avatar avatar-sm me-2">
          <span class="avatar-initial rounded bg-label-primary">
            <i class="ti ti-currency-dollar ti-xs"></i>
          </span>
        </div>
        <div>
          <small class="text-muted d-block">Earnings</small>
          <strong>$545.69</strong>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="avatar avatar-sm me-2">
          <span class="avatar-initial rounded bg-label-success">
            <i class="ti ti-chart-pie ti-xs"></i>
          </span>
        </div>
        <div>
          <small class="text-muted d-block">Profit</small>
          <strong>$256.34</strong>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="avatar avatar-sm me-2">
          <span class="avatar-initial rounded bg-label-danger">
            <i class="ti ti-receipt ti-xs"></i>
          </span>
        </div>
        <div>
          <small class="text-muted d-block">Expense</small>
          <strong>$74.19</strong>
        </div>
      </div>
    </div>
  </div>
</div>
  \`
}`,...(j=(I=d.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var P,V,B;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: 'Support Tracker (com gauge)',
  render: () => \`
<div class="card">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-start mb-3">
      <div>
        <h5 class="card-title mb-1">Support Tracker</h5>
        <small class="text-muted">Last 7 Days</small>
      </div>
      <div class="dropdown">
        <button class="btn btn-sm btn-icon" type="button">
          <i class="ti ti-dots-vertical"></i>
        </button>
      </div>
    </div>
    
    <div class="row">
      <div class="col-5">
        <h2 class="mb-0">164</h2>
        <p class="text-muted mb-3">Total Tickets</p>
        
        <div class="d-flex align-items-center mb-2">
          <div class="avatar avatar-xs me-2">
            <span class="avatar-initial rounded bg-label-primary">
              <i class="ti ti-ticket" style="font-size: 10px;"></i>
            </span>
          </div>
          <div>
            <small class="d-block">New Tickets</small>
            <strong>142</strong>
          </div>
        </div>
        
        <div class="d-flex align-items-center mb-2">
          <div class="avatar avatar-xs me-2">
            <span class="avatar-initial rounded bg-label-success">
              <i class="ti ti-check" style="font-size: 10px;"></i>
            </span>
          </div>
          <div>
            <small class="d-block">Open Tickets</small>
            <strong>28</strong>
          </div>
        </div>
        
        <div class="d-flex align-items-center">
          <div class="avatar avatar-xs me-2">
            <span class="avatar-initial rounded bg-label-warning">
              <i class="ti ti-clock" style="font-size: 10px;"></i>
            </span>
          </div>
          <div>
            <small class="d-block">Response Time</small>
            <strong>1 Day</strong>
          </div>
        </div>
      </div>
      
      <div class="col-7 d-flex align-items-center justify-content-center">
        <!-- Gauge/Radial Progress -->
        <div class="position-relative" style="width: 150px; height: 150px;">
          <svg viewBox="0 0 36 36" style="transform: rotate(-90deg);">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e9ecef"
              stroke-width="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#7367f0"
              stroke-width="3"
              stroke-dasharray="85, 100"
              stroke-linecap="round"
            />
          </svg>
          <div class="position-absolute top-50 start-50 translate-middle text-center">
            <h4 class="mb-0">85%</h4>
            <small class="text-muted">Completed Task</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  \`
}`,...(B=(V=c.parameters)==null?void 0:V.docs)==null?void 0:B.source}}};var O,M,R;r.parameters={...r.parameters,docs:{...(O=r.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => \`
<div class="card">
  <div class="card-header d-flex justify-content-between">
    <h5 class="card-title mb-0">Gerador de StatCard</h5>
    <button class="btn btn-sm btn-primary" onclick="
      const title = document.getElementById('stat-title').value;
      const value = document.getElementById('stat-value').value;
      const trend = document.getElementById('stat-trend').value;
      const icon = document.getElementById('stat-icon').value;
      const color = document.getElementById('stat-color').value;
      const preview = document.getElementById('stat-preview');
      
      preview.innerHTML = \\\`
        <div class='card'>
          <div class='card-body'>
            <div class='d-flex justify-content-between align-items-start'>
              <div>
                <p class='text-muted mb-1'>\\\${title}</p>
                <h3 class='mb-1'>\\\${value}</h3>
                <span class='badge bg-label-success'>
                  <i class='ti ti-trending-up ti-xs me-1'></i>\\\${trend}
                </span>
              </div>
              <div class='avatar'>
                <span class='avatar-initial rounded bg-label-\\\${color}'>
                  <i class='ti ti-\\\${icon} ti-md'></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      \\\`;
    ">
      Gerar Preview
    </button>
  </div>
  <div class="card-body">
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <label class="form-label">Título</label>
        <input type="text" class="form-control" id="stat-title" value="Total de Vendas">
      </div>
      <div class="col-md-4">
        <label class="form-label">Valor</label>
        <input type="text" class="form-control" id="stat-value" value="$42.5k">
      </div>
      <div class="col-md-4">
        <label class="form-label">Trend</label>
        <input type="text" class="form-control" id="stat-trend" value="+18.2%">
      </div>
      <div class="col-md-6">
        <label class="form-label">Ícone (Tabler)</label>
        <input type="text" class="form-control" id="stat-icon" value="currency-dollar">
      </div>
      <div class="col-md-6">
        <label class="form-label">Cor</label>
        <select class="form-select" id="stat-color">
          <option value="primary" selected>Primary</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="danger">Danger</option>
          <option value="info">Info</option>
        </select>
      </div>
    </div>
    
    <h6>Preview:</h6>
    <div id="stat-preview" class="p-3 bg-light rounded">
      <p class="text-muted text-center mb-0">Clique em "Gerar Preview" para ver o resultado</p>
    </div>
  </div>
</div>
  \`
}`,...(R=(M=r.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};const U=["Default","AllVariants","WithSubtitle","CompactStyle","SalesOverview","EarningsReport","SupportTracker","Interactive"];export{t as AllVariants,n as CompactStyle,e as Default,d as EarningsReport,r as Interactive,l as SalesOverview,c as SupportTracker,i as WithSubtitle,U as __namedExportsOrder,N as default};
