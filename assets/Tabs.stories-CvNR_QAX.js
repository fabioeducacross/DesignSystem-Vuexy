import{f as N,a as q}from"./snippets-m8t1HIl1.js";const K={title:"Vuexy/Organisms/Navigation/Tabs",tags:["autodocs"],parameters:{docs:{description:{component:`
# Tabs

Sistema de navegação por abas do Vuexy para organizar conteúdo relacionado.

## Quando usar
- Agrupar conteúdo relacionado
- Alternar entre diferentes visualizações
- Economizar espaço vertical

## Composição
- **Nav Tabs** - Botões de navegação (.nav-tabs)
- **Tab Panes** - Painéis de conteúdo (.tab-pane)
- **Active State** - Tab ativa usa .active e .show

## Variantes
- Pills: .nav-pills em vez de .nav-tabs
- Vertical: .nav-align-left ou .nav-align-right
- Justified: .nav-fill para largura igual

## Acessibilidade
- \`role="tablist"\` no nav
- \`role="tab"\` em cada botão
- \`role="tabpanel"\` em cada pane
- \`aria-selected\` na tab ativa
        `}}},argTypes:{activeTab:{control:"select",options:["home","profile","messages","settings"],description:"Tab ativa",table:{defaultValue:{summary:"home"}}},style:{control:"select",options:["tabs","pills"],description:"Estilo das tabs",table:{defaultValue:{summary:"tabs"}}},alignment:{control:"select",options:["top","left","right"],description:"Alinhamento das tabs",table:{defaultValue:{summary:"top"}}}}},f=[{id:"home",label:"Home",icon:"bx-home",content:`<h5>Home Content</h5><p>Welcome to the home tab. This is where your dashboard and overview information would be displayed.</p>
      <div class="alert alert-primary" role="alert">
        <div class="alert-body">This tab contains important dashboard metrics.</div>
      </div>`},{id:"profile",label:"Profile",icon:"bx-user",content:`<h5>Profile Settings</h5>
      <div class="card mb-3">
        <div class="card-body">
          <div class="mb-3">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-control" value="John Doe">
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" value="john@example.com">
          </div>
        </div>
      </div>`},{id:"messages",label:"Messages",icon:"bx-envelope",content:`<h5>Your Messages</h5>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">New message from Sarah</h6>
            <small>3 mins ago</small>
          </div>
          <p class="mb-1">Hey! How are you doing today?</p>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">Project update</h6>
            <small>1 hour ago</small>
          </div>
          <p class="mb-1">The project has been completed successfully.</p>
        </a>
      </div>`},{id:"settings",label:"Settings",icon:"bx-cog",content:`<h5>Application Settings</h5>
      <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="emailNotif" checked>
        <label class="form-check-label" for="emailNotif">Email notifications</label>
      </div>
      <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="pushNotif">
        <label class="form-check-label" for="pushNotif">Push notifications</label>
      </div>
      <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="darkMode">
        <label class="form-check-label" for="darkMode">Dark mode</label>
      </div>`}],g=({activeTab:o="home",style:c="tabs",alignment:e="top"})=>{const s=c==="pills"?"nav-pills":"nav-tabs",v=e!=="top"?`nav-align-${e}`:"",b=e==="left"||e==="right",a=f.map(t=>{const n=t.id===o;return`
      <li class="nav-item" role="presentation">
        <button class="nav-link ${n?"active":""}" 
                id="${t.id}-tab" 
                onclick="
                  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
                  this.classList.add('active');
                  document.querySelectorAll('.tab-pane').forEach(el => {el.classList.remove('show', 'active')});
                  document.getElementById('${t.id}').classList.add('show', 'active');
                "
                type="button" 
                role="tab" 
                aria-controls="${t.id}" 
                aria-selected="${n}">
          <i class="bx ${t.icon} me-1"></i> ${t.label}
        </button>
      </li>`}).join(""),i=f.map(t=>`
      <div class="tab-pane fade ${t.id===o?"show active":""}" 
           id="${t.id}" 
           role="tabpanel" 
           aria-labelledby="${t.id}-tab">
        <div class="p-3">
          ${t.content}
        </div>
      </div>`).join("");return b?`<div class="nav-align-${e}">
  <div class="row">
    <div class="col-md-3">
      <ul class="nav ${s} flex-column ${v}" role="tablist">
        ${a}
      </ul>
    </div>
    <div class="col-md-9">
      <div class="tab-content">
        ${i}
      </div>
    </div>
  </div>
</div>`:`<div>
  <ul class="nav ${s} ${v}" role="tablist">
    ${a}
  </ul>
  <div class="tab-content mt-3">
    ${i}
  </div>
</div>`},y=o=>{const c=g(o);return`
    <div>
      ${c}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${N(c).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${q(c,"Tabs").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},h=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Default Tabs</h5>
      ${g({activeTab:"home",style:"tabs"})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>Pills Style</h5>
      ${g({activeTab:"profile",style:"pills"})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>Vertical Tabs</h5>
      ${g({activeTab:"messages",style:"tabs",alignment:"left"})}
    </div>
  </div>
`,r=y.bind({});r.args={activeTab:"home",style:"tabs",alignment:"top"};const l=y.bind({});l.args={...r.args,activeTab:"profile"};const d=y.bind({});d.args={...r.args,style:"pills",activeTab:"settings"};const m=y.bind({});m.args={...r.args,alignment:"left",activeTab:"messages"};const p=()=>{const o="tabs-interactive-"+Math.random().toString(36).substr(2,9),c=`
    <div id="${o}">
      <ul class="nav nav-tabs" role="tablist">
        ${f.map((e,s)=>`
          <li class="nav-item" role="presentation">
            <button class="nav-link ${s===0?"active":""} ${e.id==="settings"?"disabled":""}" 
                    data-tab-id="${e.id}"
                    type="button" 
                    role="tab"
                    ${e.id==="settings"?"disabled":""}>
              <i class="bx ${e.icon} me-1"></i> ${e.label}
              ${e.id==="settings"?'<small class="ms-1 text-muted">(disabled)</small>':""}
            </button>
          </li>`).join("")}
      </ul>
      <div class="tab-content mt-3">
        ${f.map((e,s)=>`
          <div class="tab-pane fade ${s===0?"show active":""}" 
               data-tab-pane="${e.id}">
            <div class="p-3">
              ${e.content}
            </div>
          </div>`).join("")}
      </div>
    </div>
  `;return setTimeout(()=>{const e=document.getElementById(o);if(!e)return;const s=e.querySelectorAll(".nav-link:not(.disabled)"),v=e.querySelectorAll(".tab-pane");s.forEach(a=>{a.addEventListener("click",()=>{const i=a.getAttribute("data-tab-id");s.forEach(n=>n.classList.remove("active")),a.classList.add("active"),v.forEach(n=>{n.classList.remove("show","active")});const t=e.querySelector(`[data-tab-pane="${i}"]`);t&&t.classList.add("show","active")}),a.addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),a.click())})});const b=a=>{if(!["ArrowLeft","ArrowRight"].includes(a.key))return;const i=e.querySelector(".nav-link.active");if(!i)return;const t=Array.from(s),n=t.indexOf(i);let u;a.key==="ArrowLeft"?u=n>0?n-1:t.length-1:u=n<t.length-1?n+1:0,a.preventDefault(),t[u].focus(),t[u].click()};document.addEventListener("keydown",b),e._cleanup=()=>{document.removeEventListener("keydown",b)}},100),`
    ${c}
    <div class="alert alert-info mt-3">
      <strong>Interactive demo:</strong> Click on tabs to switch content. Note that the "Settings" tab is disabled and cannot be clicked.
    </div>
  `};p.parameters={docs:{description:{story:`Interactive tabs with full keyboard support:
- **Click**: Switch tabs with mouse
- **Enter**: Activate focused tab
- **Arrow Left/Right**: Navigate between tabs
- **Disabled tabs**: Cannot be activated

Keyboard navigation enhances accessibility for keyboard-only users.`}}};var $,k,w;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Default Tabs</h5>
      \${createTabs({
  activeTab: 'home',
  style: 'tabs'
})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>Pills Style</h5>
      \${createTabs({
  activeTab: 'profile',
  style: 'pills'
})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>Vertical Tabs</h5>
      \${createTabs({
  activeTab: 'messages',
  style: 'tabs',
  alignment: 'left'
})}
    </div>
  </div>
\``,...(w=(k=h.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var S,T,x;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
  const markup = createTabs(args);
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
        <pre><code>\${formatReactSnippet(markup, 'Tabs').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(x=(T=r.parameters)==null?void 0:T.docs)==null?void 0:x.source}}};var A,L,E;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
  const markup = createTabs(args);
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
        <pre><code>\${formatReactSnippet(markup, 'Tabs').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(E=(L=l.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};var I,P,R;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  const markup = createTabs(args);
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
        <pre><code>\${formatReactSnippet(markup, 'Tabs').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(R=(P=d.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var C,D,H;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const markup = createTabs(args);
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
        <pre><code>\${formatReactSnippet(markup, 'Tabs').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(H=(D=m.parameters)==null?void 0:D.docs)==null?void 0:H.source}}};var V,j,M;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const containerId = 'tabs-interactive-' + Math.random().toString(36).substr(2, 9);
  const markup = \`
    <div id="\${containerId}">
      <ul class="nav nav-tabs" role="tablist">
        \${tabsData.map((tab, idx) => \`
          <li class="nav-item" role="presentation">
            <button class="nav-link \${idx === 0 ? 'active' : ''} \${tab.id === 'settings' ? 'disabled' : ''}" 
                    data-tab-id="\${tab.id}"
                    type="button" 
                    role="tab"
                    \${tab.id === 'settings' ? 'disabled' : ''}>
              <i class="bx \${tab.icon} me-1"></i> \${tab.label}
              \${tab.id === 'settings' ? '<small class="ms-1 text-muted">(disabled)</small>' : ''}
            </button>
          </li>\`).join('')}
      </ul>
      <div class="tab-content mt-3">
        \${tabsData.map((tab, idx) => \`
          <div class="tab-pane fade \${idx === 0 ? 'show active' : ''}" 
               data-tab-pane="\${tab.id}">
            <div class="p-3">
              \${tab.content}
            </div>
          </div>\`).join('')}
      </div>
    </div>
  \`;
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const buttons = container.querySelectorAll('.nav-link:not(.disabled)');
    const panes = container.querySelectorAll('.tab-pane');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab-id');

        // Remove active de todos os buttons
        buttons.forEach(b => b.classList.remove('active'));
        // Adiciona active ao clicado
        button.classList.add('active');

        // Remove active/show de todos os panes
        panes.forEach(pane => {
          pane.classList.remove('show', 'active');
        });

        // Adiciona active/show ao pane correspondente
        const targetPane = container.querySelector(\`[data-tab-pane="\${tabId}"]\`);
        if (targetPane) {
          targetPane.classList.add('show', 'active');
        }
      });

      // Keyboard support: Enter to activate
      button.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          button.click();
        }
      });
    });

    // Arrow keys navigation
    const handleKeydown = e => {
      if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      const activeButton = container.querySelector('.nav-link.active');
      if (!activeButton) return;
      const buttonsArray = Array.from(buttons);
      const currentIndex = buttonsArray.indexOf(activeButton);
      let nextIndex;
      if (e.key === 'ArrowLeft') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : buttonsArray.length - 1;
      } else {
        nextIndex = currentIndex < buttonsArray.length - 1 ? currentIndex + 1 : 0;
      }
      e.preventDefault();
      buttonsArray[nextIndex].focus();
      buttonsArray[nextIndex].click();
    };
    document.addEventListener('keydown', handleKeydown);

    // Cleanup
    container._cleanup = () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, 100);
  return \`
    \${markup}
    <div class="alert alert-info mt-3">
      <strong>Interactive demo:</strong> Click on tabs to switch content. Note that the "Settings" tab is disabled and cannot be clicked.
    </div>
  \`;
}`,...(M=(j=p.parameters)==null?void 0:j.docs)==null?void 0:M.source}}};const O=["Overview","Default","ProfileActive","PillsStyle","VerticalLeft","Interactive"];export{r as Default,p as Interactive,h as Overview,d as PillsStyle,l as ProfileActive,m as VerticalLeft,O as __namedExportsOrder,K as default};
