import{f as T,a as j}from"./snippets-m8t1HIl1.js";const q={title:"Organisms/Navigation/Navbar",tags:["autodocs"],parameters:{docs:{description:{component:`
# Navbar

Barra de navegação principal do Vuexy para aplicações web.

## Quando usar
- Header principal da aplicação
- Navegação global
- Ações rápidas (search, notifications, profile)

## Composição
- **Brand/Logo** - Identidade da aplicação
- **Search** - Busca global (opcional)
- **Actions** - Notificações, mensagens, perfil
- **Responsive** - Colapsa em mobile com hamburger menu

## Variantes
- Default: Brand + search + actions
- WithSearch: Inclui campo de busca
- WithActions: Notificações + user menu

## Acessibilidade
- \`role="navigation"\` no nav
- \`aria-label\` em botões de ícone
- \`aria-expanded\` no toggle mobile
        `}}},argTypes:{brandText:{control:"text",description:"Texto do brand/logo",table:{defaultValue:{summary:"Vuexy"}}},showSearch:{control:"boolean",description:"Mostra campo de busca",table:{defaultValue:{summary:!0}}},showUserMenu:{control:"boolean",description:"Mostra menu do usuário",table:{defaultValue:{summary:!0}}},notificationCount:{control:"number",description:"Número de notificações",table:{defaultValue:{summary:0}}},userName:{control:"text",description:"Nome do usuário",table:{defaultValue:{summary:"John Doe"}}}}},m=({brandText:n="Vuexy",showSearch:e=!0,showUserMenu:d=!0,notificationCount:i=0,userName:a="John Doe"})=>{const c=i>0?`<span class="badge rounded-pill badge-notifications bg-danger">${i}</span>`:"",r=e?`
    <div class="navbar-search-wrapper search-input-wrapper d-none d-md-block ms-3">
      <input type="text" class="form-control search-input" placeholder="Search..." aria-label="Search">
      <i class="bx bx-search"></i>
    </div>`:"",v=d?`
    <li class="nav-item navbar-dropdown dropdown-user dropdown">
      <a class="nav-link dropdown-toggle hide-arrow" href="#" onclick="this.nextElementSibling.classList.toggle('show'); return false;">
        <div class="avatar avatar-online">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="${a}" class="w-px-40 h-auto rounded-circle">
        </div>
      </a>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <a class="dropdown-item" href="#">
            <div class="d-flex">
              <div class="flex-shrink-0 me-3">
                <div class="avatar avatar-online">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="${a}" class="w-px-40 h-auto rounded-circle">
                </div>
              </div>
              <div class="flex-grow-1">
                <span class="fw-semibold d-block">${a}</span>
                <small class="text-muted">Admin</small>
              </div>
            </div>
          </a>
        </li>
        <li><div class="dropdown-divider"></div></li>
        <li><a class="dropdown-item" href="#"><i class="bx bx-user me-2"></i> My Profile</a></li>
        <li><a class="dropdown-item" href="#"><i class="bx bx-cog me-2"></i> Settings</a></li>
        <li><div class="dropdown-divider"></div></li>
        <li><a class="dropdown-item" href="#"><i class="bx bx-power-off me-2"></i> Log Out</a></li>
      </ul>
    </li>`:"";return`<nav class="navbar navbar-expand-lg navbar-light bg-navbar-theme">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">${n}</a>
    
    <button class="navbar-toggler" type="button" onclick="const nav = document.getElementById('navbarNav'); nav.classList.toggle('show')" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarNav">
      ${r}
      
      <ul class="navbar-nav flex-row align-items-center ms-auto">
        <li class="nav-item navbar-dropdown dropdown-notifications me-3">
          <a class="nav-link dropdown-toggle hide-arrow" href="#" onclick="this.nextElementSibling.classList.toggle('show'); return false;" aria-label="Notifications">
            <i class="bx bx-bell bx-sm"></i>
            ${c}
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li class="dropdown-header"><span>Notifications</span></li>
            <li><div class="dropdown-divider"></div></li>
            <li><a class="dropdown-item" href="#"><i class="bx bx-info-circle me-2"></i> You have ${i||"no"} notifications</a></li>
          </ul>
        </li>
        
        ${v}
      </ul>
    </div>
  </div>
</nav>`},g=n=>{const e=m(n);return`
    <div style="margin: -1rem; min-height: 80px;">
      ${e}
    </div>
    
    <div style="padding: 2rem 1rem;">
      <p class="text-muted"><strong>Nota:</strong> Dropdowns requerem Bootstrap JS para funcionar. Aqui mostramos apenas o markup.</p>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${T(e).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${j(e,"Navbar").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},p=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Default</h5>
      <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
        ${m({brandText:"Vuexy",showSearch:!0,showUserMenu:!0,notificationCount:3})}
      </div>
    </div>
    
    <div class="col-12">
      <h5>Without Search</h5>
      <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
        ${m({brandText:"Vuexy",showSearch:!1,showUserMenu:!0,notificationCount:0})}
      </div>
    </div>
    
    <div class="col-12">
      <h5>Minimal</h5>
      <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
        ${m({brandText:"Vuexy",showSearch:!1,showUserMenu:!1,notificationCount:0})}
      </div>
    </div>
  </div>
`,s=g.bind({});s.args={brandText:"Vuexy",showSearch:!0,showUserMenu:!0,notificationCount:3,userName:"John Doe"};const o=g.bind({});o.args={...s.args,showSearch:!0};const t=g.bind({});t.args={...s.args,notificationCount:12};const l=()=>{const n="navbar-interactive-"+Math.random().toString(36).substr(2,9),e=`
    <nav id="${n}" class="navbar navbar-expand-lg navbar-light bg-navbar-theme">
      <div class="container-fluid">
        <!-- Brand -->
        <a class="navbar-brand" href="javascript:void(0)">Vuexy</a>
        
        <!-- Search -->
        <div class="navbar-search-wrapper search-input-wrapper d-none d-md-block ms-3">
          <input type="text" class="form-control search-input" placeholder="Search..." aria-label="Search">
          <i class="bx bx-search"></i>
        </div>
        
        <!-- Spacer -->
        <div class="navbar-nav-right d-flex align-items-center ms-auto" id="navbar-collapse">
          <ul class="navbar-nav flex-row align-items-center">
            
            <!-- Notifications -->
            <li class="nav-item navbar-dropdown dropdown" data-dropdown="notifications">
              <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0)" data-toggle="notifications">
                <i class="bx bx-bell bx-sm"></i>
                <span class="badge rounded-pill badge-notifications bg-danger">5</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" data-menu="notifications">
                <li>
                  <div class="dropdown-header d-flex align-items-center py-3">
                    <h5 class="text-body mb-0 me-auto">Notifications</h5>
                    <a href="javascript:void(0)" class="dropdown-notifications-all text-body"><i class="bx fs-4 bx-envelope-open"></i></a>
                  </div>
                </li>
                <li>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item list-group-item-action">
                      <div class="d-flex">
                        <div class="flex-shrink-0 me-3">
                          <div class="avatar">
                            <span class="avatar-initial rounded-circle bg-label-primary"><i class="bx bx-cart"></i></span>
                          </div>
                        </div>
                        <div class="flex-grow-1">
                          <h6 class="mb-1">New order received! 🎉</h6>
                          <p class="mb-0 small">You have 5 new orders</p>
                          <small class="text-muted">2 minutes ago</small>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item list-group-item-action">
                      <div class="d-flex">
                        <div class="flex-shrink-0 me-3">
                          <div class="avatar">
                            <span class="avatar-initial rounded-circle bg-label-success"><i class="bx bx-user"></i></span>
                          </div>
                        </div>
                        <div class="flex-grow-1">
                          <h6 class="mb-1">New user registered</h6>
                          <p class="mb-0 small">John Doe joined</p>
                          <small class="text-muted">1 hour ago</small>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            
            <!-- User -->
            <li class="nav-item navbar-dropdown dropdown" data-dropdown="user">
              <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0)" data-toggle="user">
                <div class="avatar avatar-online">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="John Doe" class="w-px-40 h-auto rounded-circle">
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" data-menu="user">
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <div class="d-flex">
                      <div class="flex-shrink-0 me-3">
                        <div class="avatar avatar-online">
                          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="John Doe" class="w-px-40 h-auto rounded-circle">
                        </div>
                      </div>
                      <div class="flex-grow-1">
                        <span class="fw-medium d-block">John Doe</span>
                        <small class="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li><div class="dropdown-divider"></div></li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i class="bx bx-user me-2"></i>
                    <span class="align-middle">My Profile</span>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i class="bx bx-cog me-2"></i>
                    <span class="align-middle">Settings</span>
                  </a>
                </li>
                <li><div class="dropdown-divider"></div></li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i class="bx bx-power-off me-2"></i>
                    <span class="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;return setTimeout(()=>{const d=document.getElementById(n);if(!d)return;const i=d.querySelectorAll("[data-dropdown]");i.forEach(a=>{const c=a.querySelector("[data-toggle]"),r=a.querySelector("[data-menu]");!c||!r||c.addEventListener("click",v=>{v.preventDefault(),i.forEach(u=>{if(u!==a){const f=u.querySelector("[data-menu]");f&&(f.classList.remove("show"),u.classList.remove("show"))}});const h=r.classList.contains("show");r.classList.toggle("show",!h),a.classList.toggle("show",!h)})})},100),`
    ${e}
    <div class="alert alert-info mt-3">
      <strong>Interactive demo:</strong> Click on the notification bell or user avatar to toggle their respective dropdown menus.
    </div>
  `};l.parameters={docs:{description:{story:"Interactive navbar demo with working notification and user menu dropdowns."}}};var b,w,x;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Default</h5>
      <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
        \${createNavbar({
  brandText: 'Vuexy',
  showSearch: true,
  showUserMenu: true,
  notificationCount: 3
})}
      </div>
    </div>
    
    <div class="col-12">
      <h5>Without Search</h5>
      <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
        \${createNavbar({
  brandText: 'Vuexy',
  showSearch: false,
  showUserMenu: true,
  notificationCount: 0
})}
      </div>
    </div>
    
    <div class="col-12">
      <h5>Minimal</h5>
      <div style="border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
        \${createNavbar({
  brandText: 'Vuexy',
  showSearch: false,
  showUserMenu: false,
  notificationCount: 0
})}
      </div>
    </div>
  </div>
\``,...(x=(w=p.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var y,S,k;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const markup = createNavbar(args);
  return \`
    <div style="margin: -1rem; min-height: 80px;">
      \${markup}
    </div>
    
    <div style="padding: 2rem 1rem;">
      <p class="text-muted"><strong>Nota:</strong> Dropdowns requerem Bootstrap JS para funcionar. Aqui mostramos apenas o markup.</p>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Navbar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(k=(S=s.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var C,E,N;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const markup = createNavbar(args);
  return \`
    <div style="margin: -1rem; min-height: 80px;">
      \${markup}
    </div>
    
    <div style="padding: 2rem 1rem;">
      <p class="text-muted"><strong>Nota:</strong> Dropdowns requerem Bootstrap JS para funcionar. Aqui mostramos apenas o markup.</p>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Navbar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(N=(E=o.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var $,D,M;t.parameters={...t.parameters,docs:{...($=t.parameters)==null?void 0:$.docs,source:{originalSource:`args => {
  const markup = createNavbar(args);
  return \`
    <div style="margin: -1rem; min-height: 80px;">
      \${markup}
    </div>
    
    <div style="padding: 2rem 1rem;">
      <p class="text-muted"><strong>Nota:</strong> Dropdowns requerem Bootstrap JS para funcionar. Aqui mostramos apenas o markup.</p>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Navbar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(M=(D=t.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var L,J,A;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  const containerId = 'navbar-interactive-' + Math.random().toString(36).substr(2, 9);
  const markup = \`
    <nav id="\${containerId}" class="navbar navbar-expand-lg navbar-light bg-navbar-theme">
      <div class="container-fluid">
        <!-- Brand -->
        <a class="navbar-brand" href="javascript:void(0)">Vuexy</a>
        
        <!-- Search -->
        <div class="navbar-search-wrapper search-input-wrapper d-none d-md-block ms-3">
          <input type="text" class="form-control search-input" placeholder="Search..." aria-label="Search">
          <i class="bx bx-search"></i>
        </div>
        
        <!-- Spacer -->
        <div class="navbar-nav-right d-flex align-items-center ms-auto" id="navbar-collapse">
          <ul class="navbar-nav flex-row align-items-center">
            
            <!-- Notifications -->
            <li class="nav-item navbar-dropdown dropdown" data-dropdown="notifications">
              <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0)" data-toggle="notifications">
                <i class="bx bx-bell bx-sm"></i>
                <span class="badge rounded-pill badge-notifications bg-danger">5</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" data-menu="notifications">
                <li>
                  <div class="dropdown-header d-flex align-items-center py-3">
                    <h5 class="text-body mb-0 me-auto">Notifications</h5>
                    <a href="javascript:void(0)" class="dropdown-notifications-all text-body"><i class="bx fs-4 bx-envelope-open"></i></a>
                  </div>
                </li>
                <li>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item list-group-item-action">
                      <div class="d-flex">
                        <div class="flex-shrink-0 me-3">
                          <div class="avatar">
                            <span class="avatar-initial rounded-circle bg-label-primary"><i class="bx bx-cart"></i></span>
                          </div>
                        </div>
                        <div class="flex-grow-1">
                          <h6 class="mb-1">New order received! 🎉</h6>
                          <p class="mb-0 small">You have 5 new orders</p>
                          <small class="text-muted">2 minutes ago</small>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item list-group-item-action">
                      <div class="d-flex">
                        <div class="flex-shrink-0 me-3">
                          <div class="avatar">
                            <span class="avatar-initial rounded-circle bg-label-success"><i class="bx bx-user"></i></span>
                          </div>
                        </div>
                        <div class="flex-grow-1">
                          <h6 class="mb-1">New user registered</h6>
                          <p class="mb-0 small">John Doe joined</p>
                          <small class="text-muted">1 hour ago</small>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            
            <!-- User -->
            <li class="nav-item navbar-dropdown dropdown" data-dropdown="user">
              <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0)" data-toggle="user">
                <div class="avatar avatar-online">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="John Doe" class="w-px-40 h-auto rounded-circle">
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" data-menu="user">
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <div class="d-flex">
                      <div class="flex-shrink-0 me-3">
                        <div class="avatar avatar-online">
                          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="John Doe" class="w-px-40 h-auto rounded-circle">
                        </div>
                      </div>
                      <div class="flex-grow-1">
                        <span class="fw-medium d-block">John Doe</span>
                        <small class="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li><div class="dropdown-divider"></div></li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i class="bx bx-user me-2"></i>
                    <span class="align-middle">My Profile</span>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i class="bx bx-cog me-2"></i>
                    <span class="align-middle">Settings</span>
                  </a>
                </li>
                <li><div class="dropdown-divider"></div></li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i class="bx bx-power-off me-2"></i>
                    <span class="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  \`;
  setTimeout(() => {
    const navbar = document.getElementById(containerId);
    if (!navbar) return;
    const dropdowns = navbar.querySelectorAll('[data-dropdown]');
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('[data-toggle]');
      const menu = dropdown.querySelector('[data-menu]');
      if (!toggle || !menu) return;
      toggle.addEventListener('click', e => {
        e.preventDefault();

        // Fecha outros dropdowns
        dropdowns.forEach(other => {
          if (other !== dropdown) {
            const otherMenu = other.querySelector('[data-menu]');
            if (otherMenu) {
              otherMenu.classList.remove('show');
              other.classList.remove('show');
            }
          }
        });

        // Toggle atual
        const isOpen = menu.classList.contains('show');
        menu.classList.toggle('show', !isOpen);
        dropdown.classList.toggle('show', !isOpen);
      });
    });

    // Close dropdowns when clicking outside (não implementado conforme requisitos)
  }, 100);
  return \`
    \${markup}
    <div class="alert alert-info mt-3">
      <strong>Interactive demo:</strong> Click on the notification bell or user avatar to toggle their respective dropdown menus.
    </div>
  \`;
}`,...(A=(J=l.parameters)==null?void 0:J.docs)==null?void 0:A.source}}};const B=["Overview","Default","WithSearch","WithNotifications","Interactive"];export{s as Default,l as Interactive,p as Overview,t as WithNotifications,o as WithSearch,B as __namedExportsOrder,q as default};
