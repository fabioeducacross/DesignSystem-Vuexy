import{f as $,a as G}from"./snippets-m8t1HIl1.js";const T={title:"Molecules/Content/ListGroup",tags:["autodocs"],parameters:{docs:{description:{component:`
# List Group

Componente flexível para exibir listas de conteúdo.

## Quando usar
- Listas de itens clicáveis
- Navegação lateral
- Inbox/mensagens
- Configurações em lista
- Menu de opções
- Timeline de atividades

## Características
- Classe Bootstrap: \`.list-group\`, \`.list-group-item\`
- Tipos: Links (\`<a>\`), Buttons (\`<button>\`), Static (\`<li>\`)
- Estados: Active, Disabled
- Variantes: Primary, Secondary, Success, Danger, Warning, Info, Light, Dark
- Flush (sem bordas)
- Horizontal
- Com badges, ícones e custom content

## Acessibilidade
- \`role="list"\` em \`<ul>\`
- \`role="listitem"\` em cada item
- Estados comunicados via classes
- Navegável por teclado quando interativo
        `}}},argTypes:{variant:{control:{type:"select"},options:["default","primary","secondary","success","danger","warning","info"],description:"Variante de cor",table:{defaultValue:{summary:"default"}}},flush:{control:"boolean",description:"Remove bordas e arredondamento",table:{defaultValue:{summary:!1}}},horizontal:{control:"boolean",description:"Layout horizontal",table:{defaultValue:{summary:!1}}}}},H=({variant:a="default",flush:s=!1,horizontal:E=!1})=>{const j=s?"list-group-flush":"",I=E?"list-group-horizontal":"",c=a!=="default"?`list-group-item-${a}`:"";return`<ul class="list-group ${j} ${I}">
  <li class="list-group-item ${c}">First item</li>
  <li class="list-group-item ${c}">Second item</li>
  <li class="list-group-item ${c}">Third item</li>
</ul>`},r=a=>{const s=H(a);return`
    <div style="max-width: 500px;">
      ${s}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${$(s).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${G(s,"ListGroup").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},n=()=>`
  <div class="row g-4">
    <div class="col-md-6">
      <h5>Default</h5>
      <ul class="list-group">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
      </ul>
    </div>
    
    <div class="col-md-6">
      <h5>Active & Disabled</h5>
      <ul class="list-group">
        <li class="list-group-item active">Active item</li>
        <li class="list-group-item">Second item</li>
        <li class="list-group-item">Third item</li>
        <li class="list-group-item disabled">Disabled item</li>
      </ul>
    </div>
    
    <div class="col-md-6 mt-4">
      <h5>Links</h5>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action active">Active link</a>
        <a href="#" class="list-group-item list-group-item-action">Link item</a>
        <a href="#" class="list-group-item list-group-item-action">Another link</a>
        <a href="#" class="list-group-item list-group-item-action disabled">Disabled link</a>
      </div>
    </div>
    
    <div class="col-md-6 mt-4">
      <h5>Buttons</h5>
      <div class="list-group">
        <button type="button" class="list-group-item list-group-item-action active">Active button</button>
        <button type="button" class="list-group-item list-group-item-action">Button item</button>
        <button type="button" class="list-group-item list-group-item-action">Another button</button>
        <button type="button" class="list-group-item list-group-item-action" disabled>Disabled button</button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Variantes de Cores</h5>
      <ul class="list-group">
        <li class="list-group-item">Default item</li>
        <li class="list-group-item list-group-item-primary">Primary item</li>
        <li class="list-group-item list-group-item-secondary">Secondary item</li>
        <li class="list-group-item list-group-item-success">Success item</li>
        <li class="list-group-item list-group-item-danger">Danger item</li>
        <li class="list-group-item list-group-item-warning">Warning item</li>
        <li class="list-group-item list-group-item-info">Info item</li>
      </ul>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Com Badges</h5>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Inbox
          <span class="badge bg-primary rounded-pill">14</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Drafts
          <span class="badge bg-secondary rounded-pill">2</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Sent
          <span class="badge bg-success rounded-pill">67</span>
        </li>
      </ul>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Com Ícones</h5>
      <ul class="list-group">
        <li class="list-group-item">
          <i class="bx bx-home me-2"></i>Dashboard
        </li>
        <li class="list-group-item">
          <i class="bx bx-user me-2"></i>Profile
        </li>
        <li class="list-group-item">
          <i class="bx bx-cog me-2"></i>Settings
        </li>
        <li class="list-group-item">
          <i class="bx bx-bell me-2"></i>Notifications
        </li>
      </ul>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Custom Content</h5>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">List group item heading</h6>
            <small>3 days ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small>And some small print.</small>
        </a>
        <a href="#" class="list-group-item list-group-item-action active">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">List group item heading</h6>
            <small class="text-white">3 days ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small class="text-white">And some muted small print.</small>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">List group item heading</h6>
            <small class="text-muted">3 days ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small class="text-muted">And some muted small print.</small>
        </a>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Flush (Sem Bordas)</h5>
      <div class="card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
        </ul>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Horizontal</h5>
      <ul class="list-group list-group-horizontal">
        <li class="list-group-item">First</li>
        <li class="list-group-item">Second</li>
        <li class="list-group-item">Third</li>
      </ul>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Inbox Example</h5>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex align-items-start">
            <div class="avatar avatar-sm me-3">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="mb-0">John Doe</h6>
                <small class="text-muted">2 hours ago</small>
              </div>
              <p class="mb-0 text-muted">Hey! How are you doing?</p>
            </div>
          </div>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex align-items-start">
            <div class="avatar avatar-sm me-3">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="mb-0">Jane Smith</h6>
                <small class="text-muted">5 hours ago</small>
              </div>
              <p class="mb-0 text-muted">Meeting rescheduled to tomorrow</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
`,t=r.bind({});t.args={variant:"default",flush:!1,horizontal:!1};const i=r.bind({});i.args={...t.args,variant:"primary"};const e=r.bind({});e.args={...t.args,flush:!0};const l=r.bind({});l.args={...t.args,horizontal:!0};const o={render:()=>`
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive List Group Demo</h5>
        <p class="text-muted">Click items to toggle active state</p>
        
        <div class="list-group" id="listGroup">
          <button type="button" class="list-group-item list-group-item-action active" onclick="toggleActive(this)">
            <div class="d-flex justify-content-between align-items-center">
              <span><i class="bx bx-home me-2"></i>Dashboard</span>
              <span class="badge bg-primary rounded-pill">5</span>
            </div>
          </button>
          <button type="button" class="list-group-item list-group-item-action" onclick="toggleActive(this)">
            <div class="d-flex justify-content-between align-items-center">
              <span><i class="bx bx-inbox me-2"></i>Inbox</span>
              <span class="badge bg-primary rounded-pill">12</span>
            </div>
          </button>
          <button type="button" class="list-group-item list-group-item-action" onclick="toggleActive(this)">
            <div class="d-flex justify-content-between align-items-center">
              <span><i class="bx bx-user me-2"></i>Profile</span>
              <span class="badge bg-primary rounded-pill">3</span>
            </div>
          </button>
          <button type="button" class="list-group-item list-group-item-action" onclick="toggleActive(this)">
            <div class="d-flex justify-content-between align-items-center">
              <span><i class="bx bx-cog me-2"></i>Settings</span>
            </div>
          </button>
        </div>
        
        <div class="alert alert-info mt-3" id="selectedItem">Selected: Dashboard</div>
        
        <script>
          function toggleActive(element) {
            document.querySelectorAll('#listGroup .list-group-item').forEach(item => {
              item.classList.remove('active');
            });
            
            element.classList.add('active');
            
            const text = element.querySelector('span').textContent.trim();
            document.getElementById('selectedItem').textContent = 'Selected: ' + text;
          }
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `};var m,d,u;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-md-6">
      <h5>Default</h5>
      <ul class="list-group">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
      </ul>
    </div>
    
    <div class="col-md-6">
      <h5>Active & Disabled</h5>
      <ul class="list-group">
        <li class="list-group-item active">Active item</li>
        <li class="list-group-item">Second item</li>
        <li class="list-group-item">Third item</li>
        <li class="list-group-item disabled">Disabled item</li>
      </ul>
    </div>
    
    <div class="col-md-6 mt-4">
      <h5>Links</h5>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action active">Active link</a>
        <a href="#" class="list-group-item list-group-item-action">Link item</a>
        <a href="#" class="list-group-item list-group-item-action">Another link</a>
        <a href="#" class="list-group-item list-group-item-action disabled">Disabled link</a>
      </div>
    </div>
    
    <div class="col-md-6 mt-4">
      <h5>Buttons</h5>
      <div class="list-group">
        <button type="button" class="list-group-item list-group-item-action active">Active button</button>
        <button type="button" class="list-group-item list-group-item-action">Button item</button>
        <button type="button" class="list-group-item list-group-item-action">Another button</button>
        <button type="button" class="list-group-item list-group-item-action" disabled>Disabled button</button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Variantes de Cores</h5>
      <ul class="list-group">
        <li class="list-group-item">Default item</li>
        <li class="list-group-item list-group-item-primary">Primary item</li>
        <li class="list-group-item list-group-item-secondary">Secondary item</li>
        <li class="list-group-item list-group-item-success">Success item</li>
        <li class="list-group-item list-group-item-danger">Danger item</li>
        <li class="list-group-item list-group-item-warning">Warning item</li>
        <li class="list-group-item list-group-item-info">Info item</li>
      </ul>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Com Badges</h5>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Inbox
          <span class="badge bg-primary rounded-pill">14</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Drafts
          <span class="badge bg-secondary rounded-pill">2</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Sent
          <span class="badge bg-success rounded-pill">67</span>
        </li>
      </ul>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Com Ícones</h5>
      <ul class="list-group">
        <li class="list-group-item">
          <i class="bx bx-home me-2"></i>Dashboard
        </li>
        <li class="list-group-item">
          <i class="bx bx-user me-2"></i>Profile
        </li>
        <li class="list-group-item">
          <i class="bx bx-cog me-2"></i>Settings
        </li>
        <li class="list-group-item">
          <i class="bx bx-bell me-2"></i>Notifications
        </li>
      </ul>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Custom Content</h5>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">List group item heading</h6>
            <small>3 days ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small>And some small print.</small>
        </a>
        <a href="#" class="list-group-item list-group-item-action active">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">List group item heading</h6>
            <small class="text-white">3 days ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small class="text-white">And some muted small print.</small>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">List group item heading</h6>
            <small class="text-muted">3 days ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small class="text-muted">And some muted small print.</small>
        </a>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Flush (Sem Bordas)</h5>
      <div class="card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
        </ul>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Horizontal</h5>
      <ul class="list-group list-group-horizontal">
        <li class="list-group-item">First</li>
        <li class="list-group-item">Second</li>
        <li class="list-group-item">Third</li>
      </ul>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Inbox Example</h5>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex align-items-start">
            <div class="avatar avatar-sm me-3">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="mb-0">John Doe</h6>
                <small class="text-muted">2 hours ago</small>
              </div>
              <p class="mb-0 text-muted">Hey! How are you doing?</p>
            </div>
          </div>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex align-items-start">
            <div class="avatar avatar-sm me-3">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="mb-0">Jane Smith</h6>
                <small class="text-muted">5 hours ago</small>
              </div>
              <p class="mb-0 text-muted">Meeting rescheduled to tomorrow</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
\``,...(u=(d=n.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var p,g,v;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  const markup = createListGroup(args);
  return \`
    <div style="max-width: 500px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'ListGroup').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(v=(g=t.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var h,b,f;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const markup = createListGroup(args);
  return \`
    <div style="max-width: 500px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'ListGroup').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(f=(b=i.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var x,y,w;e.parameters={...e.parameters,docs:{...(x=e.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const markup = createListGroup(args);
  return \`
    <div style="max-width: 500px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'ListGroup').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(w=(y=e.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var S,A,C;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
  const markup = createListGroup(args);
  return \`
    <div style="max-width: 500px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'ListGroup').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(C=(A=l.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var k,L,D;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive List Group Demo</h5>
        <p class="text-muted">Click items to toggle active state</p>
        
        <div class="list-group" id="listGroup">
          <button type="button" class="list-group-item list-group-item-action active" onclick="toggleActive(this)">
            <div class="d-flex justify-content-between align-items-center">
              <span><i class="bx bx-home me-2"></i>Dashboard</span>
              <span class="badge bg-primary rounded-pill">5</span>
            </div>
          </button>
          <button type="button" class="list-group-item list-group-item-action" onclick="toggleActive(this)">
            <div class="d-flex justify-content-between align-items-center">
              <span><i class="bx bx-inbox me-2"></i>Inbox</span>
              <span class="badge bg-primary rounded-pill">12</span>
            </div>
          </button>
          <button type="button" class="list-group-item list-group-item-action" onclick="toggleActive(this)">
            <div class="d-flex justify-content-between align-items-center">
              <span><i class="bx bx-user me-2"></i>Profile</span>
              <span class="badge bg-primary rounded-pill">3</span>
            </div>
          </button>
          <button type="button" class="list-group-item list-group-item-action" onclick="toggleActive(this)">
            <div class="d-flex justify-content-between align-items-center">
              <span><i class="bx bx-cog me-2"></i>Settings</span>
            </div>
          </button>
        </div>
        
        <div class="alert alert-info mt-3" id="selectedItem">Selected: Dashboard</div>
        
        <script>
          function toggleActive(element) {
            document.querySelectorAll('#listGroup .list-group-item').forEach(item => {
              item.classList.remove('active');
            });
            
            element.classList.add('active');
            
            const text = element.querySelector('span').textContent.trim();
            document.getElementById('selectedItem').textContent = 'Selected: ' + text;
          }
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  }
}`,...(D=(L=o.parameters)==null?void 0:L.docs)==null?void 0:D.source}}};const B=["Overview","Default","Primary","Flush","Horizontal","Interactive"];export{t as Default,e as Flush,l as Horizontal,o as Interactive,n as Overview,i as Primary,B as __namedExportsOrder,T as default};
