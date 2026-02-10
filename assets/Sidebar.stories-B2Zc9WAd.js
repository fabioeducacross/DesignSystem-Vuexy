import{f as U,a as Y}from"./snippets-m8t1HIl1.js";const P={title:"Vuexy/Organisms/Navigation/Sidebar",tags:["autodocs"],parameters:{docs:{description:{component:`
# Sidebar

Menu lateral de navegação do Vuexy com suporte a multi-níveis e collapse.

## Quando usar
- Navegação principal de aplicações
- Menu administrativo com múltiplas seções
- Navegação hierárquica com submenus

## Composição
- **Menu Items** - Links de navegação principais
- **Submenus** - Itens aninhados expandíveis
- **Icons** - Ícones visuais para cada item
- **Badges** - Contadores ou notificações
- **Collapse** - Estado expandido/colapsado

## Estados
- Expanded: Menu totalmente visível
- Collapsed: Apenas ícones visíveis
- Hover: Tooltip em modo colapsado
- Active: Item selecionado destacado

## Acessibilidade
- \`role="navigation"\` no nav
- \`aria-expanded\` em submenus
- \`aria-current="page"\` no item ativo
- Suporte a navegação por teclado
        `}}},argTypes:{collapsed:{control:"boolean",description:"Estado colapsado do menu",table:{defaultValue:{summary:!1}}},activeItem:{control:"text",description:"ID do item ativo",table:{defaultValue:{summary:"dashboard"}}},showBadges:{control:"boolean",description:"Mostra badges nos itens",table:{defaultValue:{summary:!0}}},theme:{control:"select",options:["light","dark"],description:"Tema do sidebar",table:{defaultValue:{summary:"light"}}}}},F=[{id:"dashboard",label:"Dashboard",icon:"bx-home-circle",badge:null,children:null},{id:"layouts",label:"Layouts",icon:"bx-layout",badge:null,children:[{id:"collapsed",label:"Collapsed menu",icon:null},{id:"content-navbar",label:"Content navbar",icon:null},{id:"fluid",label:"Fluid",icon:null}]},{id:"pages",label:"Pages",icon:"bx-dock-top",badge:{text:"5",color:"danger"},children:[{id:"account",label:"Account Settings",icon:null},{id:"profile",label:"Profile",icon:null},{id:"faq",label:"FAQ",icon:null},{id:"pricing",label:"Pricing",icon:null},{id:"misc",label:"Misc",icon:null}]},{id:"components",label:"Components",icon:"bx-box",badge:null,children:null},{id:"cards",label:"Cards",icon:"bx-collection",badge:{text:"New",color:"primary"},children:null},{id:"ui",label:"User Interface",icon:"bx-crown",badge:null,children:[{id:"accordion",label:"Accordion",icon:null},{id:"alerts",label:"Alerts",icon:null},{id:"badges",label:"Badges",icon:null},{id:"buttons",label:"Buttons",icon:null},{id:"modals",label:"Modals",icon:null}]},{id:"forms",label:"Forms & Tables",icon:"bx-detail",badge:null,children:[{id:"form-elements",label:"Form Elements",icon:null},{id:"form-layouts",label:"Form Layouts",icon:null},{id:"tables",label:"Tables",icon:null}]},{id:"charts",label:"Charts",icon:"bx-chart",badge:null,children:null}],x=({collapsed:a=!1,activeItem:i="dashboard",showBadges:n=!0,theme:o="light"})=>{const d=a?"layout-menu-collapsed":"",v=o==="dark"?"bg-dark":"bg-menu-theme",h=(e,s=0)=>{const c=e.id===i,b=e.children&&e.children.length>0,l=n&&e.badge?`<span class="badge badge-center rounded-pill bg-${e.badge.color} ms-auto">${e.badge.text}</span>`:"";if(b){const y=e.children.map(N=>h(N,1)).join("");return`
        <li class="menu-item ${c?"active open":""}">
          <a href="javascript:void(0);" class="menu-link menu-toggle">
            <i class="menu-icon tf-icons bx ${e.icon}"></i>
            <div data-i18n="${e.label}">${e.label}</div>
            ${l}
          </a>
          <ul class="menu-sub">
            ${y}
          </ul>
        </li>`}return`
      <li class="menu-item ${c?"active":""}">
        <a href="javascript:void(0);" class="menu-link">
          ${e.icon?`<i class="menu-icon tf-icons bx ${e.icon}"></i>`:""}
          <div data-i18n="${e.label}">${e.label}</div>
          ${l}
        </a>
      </li>`},r=F.map(e=>h(e)).join("");return`<aside id="layout-menu" class="layout-menu menu-vertical menu ${v} ${d}" data-bg-class="${v}">
  <div class="app-brand demo">
    <a href="#" class="app-brand-link">
      <span class="app-brand-logo demo">
        <img src="/educacross-assets/logo-educacross.svg" alt="Educacross Logo" style="height: 22px; width: auto;">
      </span>
    </a>

    <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto ${a?"":"d-xl-none"}">
      <i class="bx bx-chevron-left bx-sm align-middle"></i>
    </a>
  </div>

  <div class="menu-inner-shadow"></div>

  <ul class="menu-inner py-1" style="${a?"overflow: hidden;":""}">
    ${r}
  </ul>
</aside>`},$=a=>{const i=x(a);return`
    <div style="height: 600px; overflow: hidden; display: flex;">
      ${i}
      
      <div class="flex-grow-1 p-4" style="background: #f5f5f9;">
        <h5>Content Area</h5>
        <p class="text-muted">O conteúdo da página apareceria aqui ao lado do sidebar.</p>
        
        <div class="alert alert-info">
          <strong>Dica:</strong> Use o control "collapsed" para ver o menu colapsado.
        </div>
        
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">Menu States</h6>
            <ul>
              <li><strong>Active Item:</strong> ${a.activeItem}</li>
              <li><strong>Collapsed:</strong> ${a.collapsed?"Yes":"No"}</li>
              <li><strong>Theme:</strong> ${a.theme}</li>
              <li><strong>Badges:</strong> ${a.showBadges?"Visible":"Hidden"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${U(i).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${Y(i,"Sidebar").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},f=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Expanded (Default)</h5>
      <div style="height: 400px; overflow: hidden; border: 1px solid #ddd;">
        ${x({collapsed:!1,activeItem:"dashboard"})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Collapsed</h5>
      <div style="height: 400px; overflow: hidden; border: 1px solid #ddd;">
        ${x({collapsed:!0,activeItem:"components"})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>With Submenu Open</h5>
      <div style="height: 400px; overflow: hidden; border: 1px solid #ddd;">
        ${x({collapsed:!1,activeItem:"account"})}
      </div>
    </div>
  </div>
`,t=$.bind({});t.args={collapsed:!1,activeItem:"dashboard",showBadges:!0,theme:"light"};const u=$.bind({});u.args={...t.args,collapsed:!0};const m=$.bind({});m.args={...t.args,activeItem:"profile"};const p=$.bind({});p.args={...t.args,theme:"dark"};const g=()=>{const a="sidebar-interactive-"+Math.random().toString(36).substr(2,9),i=`
    <div id="${a}" style="height: 500px; border: 1px solid #ddd; position: relative;">
      <aside class="menu menu-vertical" style="width: 260px; height: 100%; overflow-y: auto;">
        <div class="app-brand p-3">
          <span class="app-brand-text demo menu-text fw-bold">Vuexy</span>
          <button class="btn btn-sm btn-icon ms-auto" data-action="toggle" style="position: absolute; right: 10px;">
            <i class="bx bx-chevron-left"></i>
          </button>
        </div>
        
        <ul class="menu-inner py-1">
          ${F.map(n=>`
            <li class="menu-item ${n.id==="dashboard"?"active":""}" data-item-id="${n.id}">
              <a href="javascript:void(0);" class="menu-link ${n.children?"menu-toggle":""}" ${n.children?'data-has-submenu="true"':""}>
                <i class="menu-icon tf-icons bx ${n.icon}"></i>
                <div class="menu-text">${n.label}</div>
                ${n.badge?`<div class="badge bg-${n.badge.color} rounded-pill ms-auto">${n.badge.text}</div>`:""}
              </a>
              ${n.children?`
                <ul class="menu-sub" style="display: none;">
                  ${n.children.map(o=>`
                    <li class="menu-item" data-item-id="${o.id}">
                      <a href="javascript:void(0);" class="menu-link">
                        <div class="menu-text">${o.label}</div>
                      </a>
                    </li>`).join("")}
                </ul>`:""}
            </li>`).join("")}
        </ul>
      </aside>
    </div>
  `;return setTimeout(()=>{const n=document.getElementById(a);if(!n)return;const o=n.querySelector(".menu"),d=n.querySelector('[data-action="toggle"]'),v=n.querySelectorAll(".menu-item"),h=n.querySelectorAll(".menu-link");let r=!1;d&&d.addEventListener("click",()=>{r=!r;const e=d.querySelector("i");r?(o.style.width="80px",e.classList.remove("bx-chevron-left"),e.classList.add("bx-chevron-right"),n.querySelectorAll(".menu-text").forEach(s=>s.style.display="none"),n.querySelectorAll(".badge").forEach(s=>s.style.display="none"),n.querySelectorAll(".menu-sub").forEach(s=>s.style.display="none")):(o.style.width="260px",e.classList.remove("bx-chevron-right"),e.classList.add("bx-chevron-left"),n.querySelectorAll(".menu-text").forEach(s=>s.style.display=""),n.querySelectorAll(".badge").forEach(s=>s.style.display=""))}),h.forEach(e=>{e.addEventListener("click",s=>{const c=e.closest(".menu-item"),b=e.hasAttribute("data-has-submenu");if(b&&!r){s.preventDefault();const l=c.querySelector(".menu-sub");if(l){const y=l.style.display!=="none";l.style.display=y?"none":"block",e.classList.toggle("open",!y)}}else b||(v.forEach(l=>l.classList.remove("active")),c.classList.add("active"))})})},100),`
    ${i}
    <div class="alert alert-info mt-3">
      <strong>Interactive demo:</strong> 
      <ul class="mb-0">
        <li>Click the chevron button to toggle collapsed/expanded state</li>
        <li>Click menu items to set active state</li>
        <li>Click items with submenus to expand/collapse (only when expanded)</li>
      </ul>
    </div>
  `};g.parameters={docs:{description:{story:"Interactive sidebar demo with toggle, active states, and submenu expansion."}}};var S,k,w;f.parameters={...f.parameters,docs:{...(S=f.parameters)==null?void 0:S.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Expanded (Default)</h5>
      <div style="height: 400px; overflow: hidden; border: 1px solid #ddd;">
        \${createSidebar({
  collapsed: false,
  activeItem: 'dashboard'
})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Collapsed</h5>
      <div style="height: 400px; overflow: hidden; border: 1px solid #ddd;">
        \${createSidebar({
  collapsed: true,
  activeItem: 'components'
})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>With Submenu Open</h5>
      <div style="height: 400px; overflow: hidden; border: 1px solid #ddd;">
        \${createSidebar({
  collapsed: false,
  activeItem: 'account'
})}
      </div>
    </div>
  </div>
\``,...(w=(k=f.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var I,C,A;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  const markup = createSidebar(args);
  return \`
    <div style="height: 600px; overflow: hidden; display: flex;">
      \${markup}
      
      <div class="flex-grow-1 p-4" style="background: #f5f5f9;">
        <h5>Content Area</h5>
        <p class="text-muted">O conteúdo da página apareceria aqui ao lado do sidebar.</p>
        
        <div class="alert alert-info">
          <strong>Dica:</strong> Use o control "collapsed" para ver o menu colapsado.
        </div>
        
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">Menu States</h6>
            <ul>
              <li><strong>Active Item:</strong> \${args.activeItem}</li>
              <li><strong>Collapsed:</strong> \${args.collapsed ? 'Yes' : 'No'}</li>
              <li><strong>Theme:</strong> \${args.theme}</li>
              <li><strong>Badges:</strong> \${args.showBadges ? 'Visible' : 'Hidden'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Sidebar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(A=(C=t.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};var E,L,q;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
  const markup = createSidebar(args);
  return \`
    <div style="height: 600px; overflow: hidden; display: flex;">
      \${markup}
      
      <div class="flex-grow-1 p-4" style="background: #f5f5f9;">
        <h5>Content Area</h5>
        <p class="text-muted">O conteúdo da página apareceria aqui ao lado do sidebar.</p>
        
        <div class="alert alert-info">
          <strong>Dica:</strong> Use o control "collapsed" para ver o menu colapsado.
        </div>
        
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">Menu States</h6>
            <ul>
              <li><strong>Active Item:</strong> \${args.activeItem}</li>
              <li><strong>Collapsed:</strong> \${args.collapsed ? 'Yes' : 'No'}</li>
              <li><strong>Theme:</strong> \${args.theme}</li>
              <li><strong>Badges:</strong> \${args.showBadges ? 'Visible' : 'Hidden'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Sidebar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(q=(L=u.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};var B,T,M;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
  const markup = createSidebar(args);
  return \`
    <div style="height: 600px; overflow: hidden; display: flex;">
      \${markup}
      
      <div class="flex-grow-1 p-4" style="background: #f5f5f9;">
        <h5>Content Area</h5>
        <p class="text-muted">O conteúdo da página apareceria aqui ao lado do sidebar.</p>
        
        <div class="alert alert-info">
          <strong>Dica:</strong> Use o control "collapsed" para ver o menu colapsado.
        </div>
        
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">Menu States</h6>
            <ul>
              <li><strong>Active Item:</strong> \${args.activeItem}</li>
              <li><strong>Collapsed:</strong> \${args.collapsed ? 'Yes' : 'No'}</li>
              <li><strong>Theme:</strong> \${args.theme}</li>
              <li><strong>Badges:</strong> \${args.showBadges ? 'Visible' : 'Hidden'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Sidebar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(M=(T=m.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var H,O,j;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`args => {
  const markup = createSidebar(args);
  return \`
    <div style="height: 600px; overflow: hidden; display: flex;">
      \${markup}
      
      <div class="flex-grow-1 p-4" style="background: #f5f5f9;">
        <h5>Content Area</h5>
        <p class="text-muted">O conteúdo da página apareceria aqui ao lado do sidebar.</p>
        
        <div class="alert alert-info">
          <strong>Dica:</strong> Use o control "collapsed" para ver o menu colapsado.
        </div>
        
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">Menu States</h6>
            <ul>
              <li><strong>Active Item:</strong> \${args.activeItem}</li>
              <li><strong>Collapsed:</strong> \${args.collapsed ? 'Yes' : 'No'}</li>
              <li><strong>Theme:</strong> \${args.theme}</li>
              <li><strong>Badges:</strong> \${args.showBadges ? 'Visible' : 'Hidden'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Sidebar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(j=(O=p.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var D,V,R;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`() => {
  const containerId = 'sidebar-interactive-' + Math.random().toString(36).substr(2, 9);
  const markup = \`
    <div id="\${containerId}" style="height: 500px; border: 1px solid #ddd; position: relative;">
      <aside class="menu menu-vertical" style="width: 260px; height: 100%; overflow-y: auto;">
        <div class="app-brand p-3">
          <span class="app-brand-text demo menu-text fw-bold">Vuexy</span>
          <button class="btn btn-sm btn-icon ms-auto" data-action="toggle" style="position: absolute; right: 10px;">
            <i class="bx bx-chevron-left"></i>
          </button>
        </div>
        
        <ul class="menu-inner py-1">
          \${menuItems.map(item => \`
            <li class="menu-item \${item.id === 'dashboard' ? 'active' : ''}" data-item-id="\${item.id}">
              <a href="javascript:void(0);" class="menu-link \${item.children ? 'menu-toggle' : ''}" \${item.children ? 'data-has-submenu="true"' : ''}>
                <i class="menu-icon tf-icons bx \${item.icon}"></i>
                <div class="menu-text">\${item.label}</div>
                \${item.badge ? \`<div class="badge bg-\${item.badge.color} rounded-pill ms-auto">\${item.badge.text}</div>\` : ''}
              </a>
              \${item.children ? \`
                <ul class="menu-sub" style="display: none;">
                  \${item.children.map(child => \`
                    <li class="menu-item" data-item-id="\${child.id}">
                      <a href="javascript:void(0);" class="menu-link">
                        <div class="menu-text">\${child.label}</div>
                      </a>
                    </li>\`).join('')}
                </ul>\` : ''}
            </li>\`).join('')}
        </ul>
      </aside>
    </div>
  \`;
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const menu = container.querySelector('.menu');
    const toggleBtn = container.querySelector('[data-action="toggle"]');
    const menuItems = container.querySelectorAll('.menu-item');
    const menuLinks = container.querySelectorAll('.menu-link');
    let isCollapsed = false;

    // Toggle collapsed state
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        const icon = toggleBtn.querySelector('i');
        if (isCollapsed) {
          menu.style.width = '80px';
          icon.classList.remove('bx-chevron-left');
          icon.classList.add('bx-chevron-right');
          container.querySelectorAll('.menu-text').forEach(el => el.style.display = 'none');
          container.querySelectorAll('.badge').forEach(el => el.style.display = 'none');
          container.querySelectorAll('.menu-sub').forEach(el => el.style.display = 'none');
        } else {
          menu.style.width = '260px';
          icon.classList.remove('bx-chevron-right');
          icon.classList.add('bx-chevron-left');
          container.querySelectorAll('.menu-text').forEach(el => el.style.display = '');
          container.querySelectorAll('.badge').forEach(el => el.style.display = '');
        }
      });
    }

    // Handle menu item clicks
    menuLinks.forEach(link => {
      link.addEventListener('click', e => {
        const menuItem = link.closest('.menu-item');
        const hasSubmenu = link.hasAttribute('data-has-submenu');
        if (hasSubmenu && !isCollapsed) {
          // Toggle submenu
          e.preventDefault();
          const submenu = menuItem.querySelector('.menu-sub');
          if (submenu) {
            const isOpen = submenu.style.display !== 'none';
            submenu.style.display = isOpen ? 'none' : 'block';
            link.classList.toggle('open', !isOpen);
          }
        } else if (!hasSubmenu) {
          // Set active item
          menuItems.forEach(item => item.classList.remove('active'));
          menuItem.classList.add('active');
        }
      });
    });
  }, 100);
  return \`
    \${markup}
    <div class="alert alert-info mt-3">
      <strong>Interactive demo:</strong> 
      <ul class="mb-0">
        <li>Click the chevron button to toggle collapsed/expanded state</li>
        <li>Click menu items to set active state</li>
        <li>Click items with submenus to expand/collapse (only when expanded)</li>
      </ul>
    </div>
  \`;
}`,...(R=(V=g.parameters)==null?void 0:V.docs)==null?void 0:R.source}}};const _=["Overview","Expanded","Collapsed","WithSubmenu","DarkTheme","Interactive"];export{u as Collapsed,p as DarkTheme,t as Expanded,g as Interactive,f as Overview,m as WithSubmenu,_ as __namedExportsOrder,P as default};
