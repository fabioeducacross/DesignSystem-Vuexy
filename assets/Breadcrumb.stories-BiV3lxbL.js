import{f as H,a as $}from"./snippets-m8t1HIl1.js";const S={title:"Molecules/Navigation/Breadcrumb",tags:["autodocs"],parameters:{docs:{description:{component:`
# Breadcrumb

Navegação hierárquica do Vuexy mostrando o caminho atual da página.

## Quando usar
- Mostrar localização na hierarquia do site
- Navegação secundária
- Sites com estrutura profunda (3+ níveis)

## Acessibilidade
- Use \`<nav>\` com \`aria-label="breadcrumb"\`
- Último item deve ter \`aria-current="page"\`
- Links devem ser descritivos
        `}}},argTypes:{showIcons:{control:"boolean",description:"Mostra ícones nos items",table:{defaultValue:{summary:!1}}},items:{control:"object",description:"Array de items do breadcrumb",table:{defaultValue:{summary:"[]"}}}}},l=({items:a=[],showIcons:r=!1})=>(a.length===0&&(a=[{label:"Home",href:"#",icon:"bx bx-home"},{label:"Library",href:"#",icon:"bx bx-library"},{label:"Data",active:!0,icon:"bx bx-data"}]),`<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    ${a.map((e,k)=>{const s=`${r&&e.icon?`<i class="${e.icon} me-1"></i>`:""}${e.label}`,C=e.active?"active":"",L=e.active?' aria-current="page"':"";return`<li class="breadcrumb-item ${C}"${L}>
      ${e.href&&!e.active?`<a href="${e.href}">${s}</a>`:s}
    </li>`}).join(`
    `)}
  </ol>
</nav>`),y=a=>{const r=l(a);return`
    <div>
      ${r}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${H(r).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${$(r,"Breadcrumb").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},c=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Básico</h5>
      ${l({items:[{label:"Home",href:"#"},{label:"Library",href:"#"},{label:"Data",active:!0}]})}
    </div>
    <div class="col-12">
      <h5>Com Ícones</h5>
      ${l({showIcons:!0,items:[{label:"Home",href:"#",icon:"bx bx-home"},{label:"Library",href:"#",icon:"bx bx-library"},{label:"Data",active:!0,icon:"bx bx-data"}]})}
    </div>
    <div class="col-12">
      <h5>Caminho Longo</h5>
      ${l({items:[{label:"Home",href:"#"},{label:"Admin",href:"#"},{label:"Users",href:"#"},{label:"Settings",href:"#"},{label:"Profile",active:!0}]})}
    </div>
  </div>
`,t=y.bind({});t.args={showIcons:!1,items:[{label:"Home",href:"#"},{label:"Library",href:"#"},{label:"Data",active:!0}]};const n=y.bind({});n.args={showIcons:!0,items:[{label:"Home",href:"#",icon:"bx bx-home"},{label:"Documents",href:"#",icon:"bx bx-folder"},{label:"Reports",href:"#",icon:"bx bx-file"},{label:"Annual Report",active:!0,icon:"bx bx-data"}]};const i={render:()=>`
      <div class="p-4">
        <h5>Interactive Breadcrumb Demo</h5>
        <p class="text-muted">Navigate through the trail</p>
        
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb" id="breadcrumbList">
            <li class="breadcrumb-item"><a href="#" onclick="event.preventDefault(); navigate(0);">Home</a></li>
            <li class="breadcrumb-item"><a href="#" onclick="event.preventDefault(); navigate(1);">Library</a></li>
            <li class="breadcrumb-item"><a href="#" onclick="event.preventDefault(); navigate(2);">Documents</a></li>
            <li class="breadcrumb-item active" aria-current="page">Current Page</li>
          </ol>
        </nav>
        
        <div class="alert alert-info">Depth: <strong id="depth">4</strong> levels</div>
        
        <script>
          const items = ['Home', 'Library', 'Documents', 'Current Page'];
          let currentDepth = 3;
          
          function navigate(index) {
            currentDepth = index;
            const breadcrumb = document.getElementById('breadcrumbList');
            breadcrumb.innerHTML = '';
            
            for (let i = 0; i <= currentDepth; i++) {
              const li = document.createElement('li');
              li.className = 'breadcrumb-item';
              
              if (i === currentDepth) {
                li.classList.add('active');
                li.setAttribute('aria-current', 'page');
                li.textContent = items[i];
              } else {
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = items[i];
                a.onclick = (e) => { e.preventDefault(); navigate(i); };
                li.appendChild(a);
              }
              
              breadcrumb.appendChild(li);
            }
            
            document.getElementById('depth').textContent = currentDepth + 1;
          }
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `,parameters:{docs:{source:{code:`<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item"><a href="#">Documents</a></li>
    <li class="breadcrumb-item active" aria-current="page">Current Page</li>
  </ol>
</nav>`}}}};var o,m,d;c.parameters={...c.parameters,docs:{...(o=c.parameters)==null?void 0:o.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Básico</h5>
      \${createBreadcrumb({
  items: [{
    label: 'Home',
    href: '#'
  }, {
    label: 'Library',
    href: '#'
  }, {
    label: 'Data',
    active: true
  }]
})}
    </div>
    <div class="col-12">
      <h5>Com Ícones</h5>
      \${createBreadcrumb({
  showIcons: true,
  items: [{
    label: 'Home',
    href: '#',
    icon: 'bx bx-home'
  }, {
    label: 'Library',
    href: '#',
    icon: 'bx bx-library'
  }, {
    label: 'Data',
    active: true,
    icon: 'bx bx-data'
  }]
})}
    </div>
    <div class="col-12">
      <h5>Caminho Longo</h5>
      \${createBreadcrumb({
  items: [{
    label: 'Home',
    href: '#'
  }, {
    label: 'Admin',
    href: '#'
  }, {
    label: 'Users',
    href: '#'
  }, {
    label: 'Settings',
    href: '#'
  }, {
    label: 'Profile',
    active: true
  }]
})}
    </div>
  </div>
\``,...(d=(m=c.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var b,u,p;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
  const markup = createBreadcrumb(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Breadcrumb').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(p=(u=t.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var h,v,g;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const markup = createBreadcrumb(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Breadcrumb').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(g=(v=n.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var f,x,D;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4">
        <h5>Interactive Breadcrumb Demo</h5>
        <p class="text-muted">Navigate through the trail</p>
        
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb" id="breadcrumbList">
            <li class="breadcrumb-item"><a href="#" onclick="event.preventDefault(); navigate(0);">Home</a></li>
            <li class="breadcrumb-item"><a href="#" onclick="event.preventDefault(); navigate(1);">Library</a></li>
            <li class="breadcrumb-item"><a href="#" onclick="event.preventDefault(); navigate(2);">Documents</a></li>
            <li class="breadcrumb-item active" aria-current="page">Current Page</li>
          </ol>
        </nav>
        
        <div class="alert alert-info">Depth: <strong id="depth">4</strong> levels</div>
        
        <script>
          const items = ['Home', 'Library', 'Documents', 'Current Page'];
          let currentDepth = 3;
          
          function navigate(index) {
            currentDepth = index;
            const breadcrumb = document.getElementById('breadcrumbList');
            breadcrumb.innerHTML = '';
            
            for (let i = 0; i <= currentDepth; i++) {
              const li = document.createElement('li');
              li.className = 'breadcrumb-item';
              
              if (i === currentDepth) {
                li.classList.add('active');
                li.setAttribute('aria-current', 'page');
                li.textContent = items[i];
              } else {
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = items[i];
                a.onclick = (e) => { e.preventDefault(); navigate(i); };
                li.appendChild(a);
              }
              
              breadcrumb.appendChild(li);
            }
            
            document.getElementById('depth').textContent = currentDepth + 1;
          }
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  },
  parameters: {
    docs: {
      source: {
        code: \`<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item"><a href="#">Documents</a></li>
    <li class="breadcrumb-item active" aria-current="page">Current Page</li>
  </ol>
</nav>\`
      }
    }
  }
}`,...(D=(x=i.parameters)==null?void 0:x.docs)==null?void 0:D.source}}};const E=["Overview","Default","WithIcons","Interactive"];export{t as Default,i as Interactive,c as Overview,n as WithIcons,E as __namedExportsOrder,S as default};
