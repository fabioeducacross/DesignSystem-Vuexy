import{f as _,a as Q}from"./snippets-m8t1HIl1.js";const Y={title:"Molecules/Navigation/Dropdown",tags:["autodocs"],parameters:{docs:{description:{component:`
# Dropdown

Menu suspenso para seleção de opções ou ações.

## Quando usar
- Menus de ação
- Seleção de opções
- Navegação contextual
- Filtros e configurações

## Características
- Classes Bootstrap: \`.dropdown\`, \`.dropdown-menu\`, \`.dropdown-item\`
- Variantes: Primary, Secondary, Success, Danger, Warning, Info
- Alinhamento: Left (default), Right, Center
- Dividers e Headers para organização
- Ícones e badges nos itens

## Comportamento
- Toggle via data-bs-toggle="dropdown"
- Fecha ao clicar fora
- Navegação por teclado
- Suporta submenus (via CSS/JS adicional)

## Acessibilidade
- \`aria-expanded\` no botão trigger
- \`role="menu"\` no dropdown-menu
- \`role="menuitem"\` nos itens
        `}}},argTypes:{variant:{control:{type:"select"},options:["primary","secondary","success","danger","warning","info","dark","light"],description:"Cor do botão",table:{defaultValue:{summary:"primary"}}},alignment:{control:{type:"select"},options:["start","end","center"],description:"Alinhamento do menu",table:{defaultValue:{summary:"start"}}},size:{control:{type:"select"},options:["sm","default","lg"],description:"Tamanho do botão",table:{defaultValue:{summary:"default"}}},splitButton:{control:"boolean",description:"Botão dividido com ação principal",table:{defaultValue:{summary:!1}}}}},a=({variant:e="primary",alignment:o="start",size:t="default",splitButton:U=!1})=>{const v=t==="sm"?"btn-sm":t==="lg"?"btn-lg":"",g=o==="end"?"dropdown-menu-end":o==="center"?"dropdown-menu-center":"";return U?`<div class="btn-group">
  <button type="button" class="btn btn-${e} ${v}">Action</button>
  <button type="button" class="btn btn-${e} ${v} dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu ${g}">
    <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
    <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
    <li><a class="dropdown-item" href="javascript:void(0);">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="javascript:void(0);">Separated link</a></li>
  </ul>
</div>`:`<div class="dropdown">
  <button class="btn btn-${e} ${v} dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu ${g}">
    <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
    <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
    <li><a class="dropdown-item" href="javascript:void(0);">Something else here</a></li>
  </ul>
</div>`},r=e=>{const o=a(e);return`
    <div style="padding: 20px;">
      ${o}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${_(o).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${Q(o,"Dropdown").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},u=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Variantes de Cores</h5>
      <div class="d-flex flex-wrap gap-3">
        ${a({variant:"primary"})}
        ${a({variant:"secondary"})}
        ${a({variant:"success"})}
        ${a({variant:"danger"})}
        ${a({variant:"warning"})}
        ${a({variant:"info"})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Tamanhos</h5>
      <div class="d-flex align-items-center gap-3">
        ${a({variant:"primary",size:"sm"})}
        ${a({variant:"primary",size:"default"})}
        ${a({variant:"primary",size:"lg"})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Alinhamento do Menu</h5>
      <div class="d-flex gap-3">
        ${a({variant:"primary",alignment:"start"})}
        ${a({variant:"primary",alignment:"end"})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Split Button</h5>
      <div class="d-flex gap-3">
        ${a({variant:"primary",splitButton:!0})}
        ${a({variant:"success",splitButton:!0})}
      </div>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Com Ícones</h5>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bx bx-cog me-2"></i>Settings
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="javascript:void(0);">
              <i class="bx bx-user me-2"></i>Profile
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="javascript:void(0);">
              <i class="bx bx-bell me-2"></i>Notifications
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="javascript:void(0);">
              <i class="bx bx-cog me-2"></i>Settings
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <a class="dropdown-item text-danger" href="javascript:void(0);">
              <i class="bx bx-power-off me-2"></i>Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Com Headers e Dividers</h5>
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Menu
        </button>
        <ul class="dropdown-menu">
          <li><h6 class="dropdown-header">Navigation</h6></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Dashboard</a></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Reports</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><h6 class="dropdown-header">Account</h6></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Profile</a></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Settings</a></li>
        </ul>
      </div>
    </div>
    
    <div class="col-md-6 mt-4">
      <h5>Com Badge</h5>
      <div class="dropdown">
        <button class="btn btn-label-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Notifications <span class="badge rounded-pill bg-danger ms-2">5</span>
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item d-flex justify-content-between" href="javascript:void(0);">
              <span>New messages</span>
              <span class="badge bg-primary rounded-pill">3</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item d-flex justify-content-between" href="javascript:void(0);">
              <span>Updates</span>
              <span class="badge bg-info rounded-pill">2</span>
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-center" href="javascript:void(0);">View all</a></li>
        </ul>
      </div>
    </div>
    
    <div class="col-md-6 mt-4">
      <h5>Disabled Items</h5>
      <div class="dropdown">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Actions
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="javascript:void(0);">Enabled action</a></li>
          <li><a class="dropdown-item disabled" href="javascript:void(0);" aria-disabled="true">Disabled action</a></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle me-2"></i>
    <strong>Note:</strong> Dropdown functionality requires Bootstrap JavaScript. Make sure to include bootstrap.bundle.js or popper.js + bootstrap.js.
  </div>
`,n=r.bind({});n.args={variant:"primary",alignment:"start",size:"default",splitButton:!1};const i=r.bind({});i.args={...n.args,variant:"secondary"};const d=r.bind({});d.args={...n.args,variant:"success"};const l=r.bind({});l.args={...n.args,splitButton:!0};const p=r.bind({});p.args={...n.args,alignment:"end"};const c=r.bind({});c.args={...n.args,size:"sm"};const m=r.bind({});m.args={...n.args,size:"lg"};const s={parameters:{docs:{description:{story:`
### Dropdown com Bootstrap JS Real

Esta story carrega o **Bootstrap JS real** do Vuexy para demonstrar a interatividade completa:

- ✅ Click no botão abre/fecha o menu
- ✅ Click fora fecha o menu
- ✅ Navegação por teclado (Tab, Enter, Esc)
- ✅ Multiple dropdowns funcionando independentemente
- ✅ Split buttons com ação principal

**Nota:** Esta é a implementação oficial do Vuexy usando \`/vuexy/js/bootstrap.js\`
        `}}},loaders:[async()=>typeof window<"u"&&!window.bootstrap?new Promise((e,o)=>{const t=document.createElement("script");t.src="/vuexy/js/bootstrap.js",t.onload=()=>{console.log("✅ Bootstrap JS carregado com sucesso"),e({bootstrapLoaded:!0})},t.onerror=()=>{console.error("❌ Falha ao carregar Bootstrap JS"),o(new Error("Failed to load Bootstrap JS"))},document.head.appendChild(t)}):{bootstrapLoaded:!0}],render:()=>`
      <div style="padding: 30px;">
        <h5 class="mb-4">Dropdowns Interativos com Bootstrap JS</h5>
        
        <div class="row g-4">
          <!-- Dropdown Básico -->
          <div class="col-md-6">
            <h6>Dropdown Básico</h6>
            <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Primary Dropdown
              </button>
              <ul class="dropdown-menu">
                <li><h6 class="dropdown-header">Categoria 1</h6></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><h6 class="dropdown-header">Categoria 2</h6></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Something else here</a></li>
              </ul>
            </div>
          </div>
          
          <!-- Dropdown com Ícones -->
          <div class="col-md-6">
            <h6>Dropdown com Ícones</h6>
            <div class="dropdown">
              <button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="ti tabler-settings me-1"></i> Settings
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ti tabler-user me-2"></i>Profile</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ti tabler-settings me-2"></i>Settings</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ti tabler-credit-card me-2"></i>Billing</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="javascript:void(0);"><i class="ti tabler-logout me-2"></i>Logout</a></li>
              </ul>
            </div>
          </div>
          
          <!-- Split Button -->
          <div class="col-md-6">
            <h6>Split Button</h6>
            <div class="btn-group">
              <button type="button" class="btn btn-info">Primary Action</button>
              <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Something else here</a></li>
              </ul>
            </div>
          </div>
          
          <!-- Dropdown Right Aligned -->
          <div class="col-md-6">
            <h6>Right Aligned</h6>
            <div class="dropdown">
              <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Right Aligned
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Something else here</a></li>
              </ul>
            </div>
          </div>
          
          <!-- Dropdown com Estados -->
          <div class="col-md-6">
            <h6>Dropdown com Active/Disabled</h6>
            <div class="dropdown">
              <button class="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Status Options
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item active" href="javascript:void(0);">Active item</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Regular item</a></li>
                <li><a class="dropdown-item disabled" href="javascript:void(0);">Disabled item</a></li>
              </ul>
            </div>
          </div>
          
          <!-- Dropdown Sizes -->
          <div class="col-md-6">
            <h6>Tamanhos</h6>
            <div class="d-flex gap-2 align-items-center">
              <div class="dropdown">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Small
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                </ul>
              </div>
              
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Default
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                </ul>
              </div>
              
              <div class="dropdown">
                <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Large
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4" role="alert">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li>Clique nos botões para abrir/fechar os menus</li>
            <li>Clique fora do menu para fechá-lo</li>
            <li>Use Tab para navegar entre botões</li>
            <li>Pressione Enter para abrir o dropdown focado</li>
            <li>Use Escape para fechar dropdowns abertos</li>
          </ul>
        </div>
      </div>
    `};var b,w,h;u.parameters={...u.parameters,docs:{...(b=u.parameters)==null?void 0:b.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Variantes de Cores</h5>
      <div class="d-flex flex-wrap gap-3">
        \${createDropdown({
  variant: 'primary'
})}
        \${createDropdown({
  variant: 'secondary'
})}
        \${createDropdown({
  variant: 'success'
})}
        \${createDropdown({
  variant: 'danger'
})}
        \${createDropdown({
  variant: 'warning'
})}
        \${createDropdown({
  variant: 'info'
})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Tamanhos</h5>
      <div class="d-flex align-items-center gap-3">
        \${createDropdown({
  variant: 'primary',
  size: 'sm'
})}
        \${createDropdown({
  variant: 'primary',
  size: 'default'
})}
        \${createDropdown({
  variant: 'primary',
  size: 'lg'
})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Alinhamento do Menu</h5>
      <div class="d-flex gap-3">
        \${createDropdown({
  variant: 'primary',
  alignment: 'start'
})}
        \${createDropdown({
  variant: 'primary',
  alignment: 'end'
})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Split Button</h5>
      <div class="d-flex gap-3">
        \${createDropdown({
  variant: 'primary',
  splitButton: true
})}
        \${createDropdown({
  variant: 'success',
  splitButton: true
})}
      </div>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Com Ícones</h5>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bx bx-cog me-2"></i>Settings
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="javascript:void(0);">
              <i class="bx bx-user me-2"></i>Profile
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="javascript:void(0);">
              <i class="bx bx-bell me-2"></i>Notifications
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="javascript:void(0);">
              <i class="bx bx-cog me-2"></i>Settings
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <a class="dropdown-item text-danger" href="javascript:void(0);">
              <i class="bx bx-power-off me-2"></i>Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="col-md-6 mt-5">
      <h5>Com Headers e Dividers</h5>
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Menu
        </button>
        <ul class="dropdown-menu">
          <li><h6 class="dropdown-header">Navigation</h6></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Dashboard</a></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Reports</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><h6 class="dropdown-header">Account</h6></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Profile</a></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Settings</a></li>
        </ul>
      </div>
    </div>
    
    <div class="col-md-6 mt-4">
      <h5>Com Badge</h5>
      <div class="dropdown">
        <button class="btn btn-label-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Notifications <span class="badge rounded-pill bg-danger ms-2">5</span>
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item d-flex justify-content-between" href="javascript:void(0);">
              <span>New messages</span>
              <span class="badge bg-primary rounded-pill">3</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item d-flex justify-content-between" href="javascript:void(0);">
              <span>Updates</span>
              <span class="badge bg-info rounded-pill">2</span>
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-center" href="javascript:void(0);">View all</a></li>
        </ul>
      </div>
    </div>
    
    <div class="col-md-6 mt-4">
      <h5>Disabled Items</h5>
      <div class="dropdown">
        <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Actions
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="javascript:void(0);">Enabled action</a></li>
          <li><a class="dropdown-item disabled" href="javascript:void(0);" aria-disabled="true">Disabled action</a></li>
          <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle me-2"></i>
    <strong>Note:</strong> Dropdown functionality requires Bootstrap JavaScript. Make sure to include bootstrap.bundle.js or popper.js + bootstrap.js.
  </div>
\``,...(h=(w=u.parameters)==null?void 0:w.docs)==null?void 0:h.source}}};var f,y,x;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const markup = createDropdown(args);
  return \`
    <div style="padding: 20px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Dropdown').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(x=(y=n.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var S,j,D;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
  const markup = createDropdown(args);
  return \`
    <div style="padding: 20px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Dropdown').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(D=(j=i.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var $,A,C;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`args => {
  const markup = createDropdown(args);
  return \`
    <div style="padding: 20px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Dropdown').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(C=(A=d.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var B,k,E;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
  const markup = createDropdown(args);
  return \`
    <div style="padding: 20px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Dropdown').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(E=(k=l.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var R,T,L;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
  const markup = createDropdown(args);
  return \`
    <div style="padding: 20px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Dropdown').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(L=(T=p.parameters)==null?void 0:T.docs)==null?void 0:L.source}}};var H,M,N;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`args => {
  const markup = createDropdown(args);
  return \`
    <div style="padding: 20px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Dropdown').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(N=(M=c.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};var z,J,P;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:`args => {
  const markup = createDropdown(args);
  return \`
    <div style="padding: 20px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Dropdown').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(P=(J=m.parameters)==null?void 0:J.docs)==null?void 0:P.source}}};var V,I,F,q,O;s.parameters={...s.parameters,docs:{...(V=s.parameters)==null?void 0:V.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
### Dropdown com Bootstrap JS Real

Esta story carrega o **Bootstrap JS real** do Vuexy para demonstrar a interatividade completa:

- ✅ Click no botão abre/fecha o menu
- ✅ Click fora fecha o menu
- ✅ Navegação por teclado (Tab, Enter, Esc)
- ✅ Multiple dropdowns funcionando independentemente
- ✅ Split buttons com ação principal

**Nota:** Esta é a implementação oficial do Vuexy usando \\\`/vuexy/js/bootstrap.js\\\`
        \`
      }
    }
  },
  loaders: [async () => {
    // Carregar Bootstrap JS do Vuexy
    if (typeof window !== 'undefined' && !window.bootstrap) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/vuexy/js/bootstrap.js';
        script.onload = () => {
          console.log('✅ Bootstrap JS carregado com sucesso');
          resolve({
            bootstrapLoaded: true
          });
        };
        script.onerror = () => {
          console.error('❌ Falha ao carregar Bootstrap JS');
          reject(new Error('Failed to load Bootstrap JS'));
        };
        document.head.appendChild(script);
      });
    }
    return {
      bootstrapLoaded: true
    };
  }],
  render: () => {
    return \`
      <div style="padding: 30px;">
        <h5 class="mb-4">Dropdowns Interativos com Bootstrap JS</h5>
        
        <div class="row g-4">
          <!-- Dropdown Básico -->
          <div class="col-md-6">
            <h6>Dropdown Básico</h6>
            <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Primary Dropdown
              </button>
              <ul class="dropdown-menu">
                <li><h6 class="dropdown-header">Categoria 1</h6></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><h6 class="dropdown-header">Categoria 2</h6></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Something else here</a></li>
              </ul>
            </div>
          </div>
          
          <!-- Dropdown com Ícones -->
          <div class="col-md-6">
            <h6>Dropdown com Ícones</h6>
            <div class="dropdown">
              <button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="ti tabler-settings me-1"></i> Settings
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ti tabler-user me-2"></i>Profile</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ti tabler-settings me-2"></i>Settings</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ti tabler-credit-card me-2"></i>Billing</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="javascript:void(0);"><i class="ti tabler-logout me-2"></i>Logout</a></li>
              </ul>
            </div>
          </div>
          
          <!-- Split Button -->
          <div class="col-md-6">
            <h6>Split Button</h6>
            <div class="btn-group">
              <button type="button" class="btn btn-info">Primary Action</button>
              <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Something else here</a></li>
              </ul>
            </div>
          </div>
          
          <!-- Dropdown Right Aligned -->
          <div class="col-md-6">
            <h6>Right Aligned</h6>
            <div class="dropdown">
              <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Right Aligned
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Something else here</a></li>
              </ul>
            </div>
          </div>
          
          <!-- Dropdown com Estados -->
          <div class="col-md-6">
            <h6>Dropdown com Active/Disabled</h6>
            <div class="dropdown">
              <button class="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Status Options
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item active" href="javascript:void(0);">Active item</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);">Regular item</a></li>
                <li><a class="dropdown-item disabled" href="javascript:void(0);">Disabled item</a></li>
              </ul>
            </div>
          </div>
          
          <!-- Dropdown Sizes -->
          <div class="col-md-6">
            <h6>Tamanhos</h6>
            <div class="d-flex gap-2 align-items-center">
              <div class="dropdown">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Small
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                </ul>
              </div>
              
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Default
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                </ul>
              </div>
              
              <div class="dropdown">
                <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  Large
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4" role="alert">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li>Clique nos botões para abrir/fechar os menus</li>
            <li>Clique fora do menu para fechá-lo</li>
            <li>Use Tab para navegar entre botões</li>
            <li>Pressione Enter para abrir o dropdown focado</li>
            <li>Use Escape para fechar dropdowns abertos</li>
          </ul>
        </div>
      </div>
    \`;
  }
}`,...(F=(I=s.parameters)==null?void 0:I.docs)==null?void 0:F.source},description:{story:`====================================
INTERACTIVE STORY - Bootstrap JS Real
====================================`,...(O=(q=s.parameters)==null?void 0:q.docs)==null?void 0:O.description}}};const G=["Overview","Default","Secondary","Success","SplitButton","RightAligned","SmallSize","LargeSize","Interactive"];export{n as Default,s as Interactive,m as LargeSize,u as Overview,p as RightAligned,i as Secondary,c as SmallSize,l as SplitButton,d as Success,G as __namedExportsOrder,Y as default};
