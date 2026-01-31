import{f as I,a as D}from"./snippets-m8t1HIl1.js";const H={title:"Atoms/Feedback/Badge",tags:["autodocs"],parameters:{docs:{description:{component:`
# Badge

Badge/tag do Vuexy para indicadores de status e contadores usando Bootstrap 5.

## Quando usar
- Indicadores de status
- Contadores e notificações
- Tags e categorias

## Variantes
- **Cores**: primary, secondary, success, danger, warning, info, dark, light
- **Tipos**: solid (sólido), light (suave)
- **Formatos**: square (padrão), pill (arredondado)

## Acessibilidade
- Use texto descritivo
- Evite depender apenas de cor
- Para badges vazios, adicione \`aria-label\`
        `}}},argTypes:{variant:{control:"select",options:["primary","secondary","success","danger","warning","info","dark","light"],description:"Cor do badge",table:{defaultValue:{summary:"primary"}}},type:{control:"select",options:["solid","light"],description:"Tipo (sólido ou suave)",table:{defaultValue:{summary:"solid"}}},shape:{control:"select",options:["square","pill"],description:"Formato do badge",table:{defaultValue:{summary:"square"}}},label:{control:"text",description:"Texto do badge",table:{defaultValue:{summary:"Badge"}}}}},e=({variant:r="primary",type:n="solid",shape:C="square",label:k="Badge"})=>`<span class="${["badge",n==="solid"?`bg-${r}`:`bg-label-${r}`,C==="pill"?"rounded-pill":""].filter(Boolean).join(" ")}">${k}</span>`,o=r=>{const n=e(r);return`
    <div>
      ${n}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${I(n).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${D(n,"Badge").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},i=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Cores (Solid)</h5>
      <div class="d-flex flex-wrap gap-2">
        ${e({variant:"primary",label:"Primary"})}
        ${e({variant:"secondary",label:"Secondary"})}
        ${e({variant:"success",label:"Success"})}
        ${e({variant:"danger",label:"Danger"})}
        ${e({variant:"warning",label:"Warning"})}
        ${e({variant:"info",label:"Info"})}
        ${e({variant:"dark",label:"Dark"})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Cores (Light)</h5>
      <div class="d-flex flex-wrap gap-2">
        ${e({variant:"primary",type:"light",label:"Primary"})}
        ${e({variant:"secondary",type:"light",label:"Secondary"})}
        ${e({variant:"success",type:"light",label:"Success"})}
        ${e({variant:"danger",type:"light",label:"Danger"})}
        ${e({variant:"warning",type:"light",label:"Warning"})}
        ${e({variant:"info",type:"light",label:"Info"})}
        ${e({variant:"dark",type:"light",label:"Dark"})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Formato Pill</h5>
      <div class="d-flex flex-wrap gap-2">
        ${e({variant:"primary",shape:"pill",label:"Pill Primary"})}
        ${e({variant:"success",shape:"pill",label:"Pill Success"})}
        ${e({variant:"danger",shape:"pill",label:"Pill Danger"})}
      </div>
    </div>
  </div>
`,a=o.bind({});a.args={variant:"primary",type:"solid",shape:"square",label:"Badge"};const t=o.bind({});t.args={...a.args,type:"light",label:"Light Badge"};const s=o.bind({});s.args={...a.args,shape:"pill",label:"Pill Badge"};const l={render:()=>`
      <div class="p-4">
        <h6 class="mb-3">Interactive Demos</h6>
        
        <!-- Demo 1: Toggle Badge Type -->
        <div class="mb-4">
          <h6 class="mb-2">Toggle Type (Solid/Light)</h6>
          <span id="toggle-badge" class="badge bg-primary">Click me!</span>
          <script>
            (function() {
              const badge = document.getElementById('toggle-badge');
              let isSolid = true;
              badge.style.cursor = 'pointer';
              badge.onclick = function() {
                if (isSolid) {
                  this.className = 'badge bg-label-primary';
                  this.textContent = 'Light Badge';
                } else {
                  this.className = 'badge bg-primary';
                  this.textContent = 'Solid Badge';
                }
                isSolid = !isSolid;
              };
            })();
          <\/script>
        </div>
        
        <!-- Demo 2: Status Counter -->
        <div class="mb-4">
          <h6 class="mb-2">Notification Counter</h6>
          <button class="btn btn-primary position-relative" onclick="
            const counter = document.getElementById('notification-counter');
            let count = parseInt(counter.textContent) + 1;
            counter.textContent = count;
            if (count > 99) counter.textContent = '99+';
          ">
            Inbox
            <span id="notification-counter" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              5
              <span class="visually-hidden">unread messages</span>
            </span>
          </button>
        </div>
        
        <!-- Demo 3: Status Tags -->
        <div class="mb-4">
          <h6 class="mb-2">Toggle Status</h6>
          <span id="status-badge" class="badge bg-success" style="cursor: pointer;" onclick="
            const statuses = [
              {label: 'Active', variant: 'success'},
              {label: 'Pending', variant: 'warning'},
              {label: 'Inactive', variant: 'secondary'}
            ];
            const currentIndex = parseInt(this.dataset.index || '0');
            const nextIndex = (currentIndex + 1) % statuses.length;
            const next = statuses[nextIndex];
            this.className = 'badge bg-' + next.variant;
            this.textContent = next.label;
            this.dataset.index = nextIndex;
          " data-index="0">Active</span>
        </div>
        
        <p class="text-muted mt-4 small">
          <i class="ri-information-line"></i> Interactive demo via Storybook state (no external dependencies)
        </p>
      </div>
    `,parameters:{docs:{description:{story:"Demo interativo com badges funcionais usando state controlado (classes). Clique para alternar estados."}}}};var d,c,p;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Cores (Solid)</h5>
      <div class="d-flex flex-wrap gap-2">
        \${createBadge({
  variant: 'primary',
  label: 'Primary'
})}
        \${createBadge({
  variant: 'secondary',
  label: 'Secondary'
})}
        \${createBadge({
  variant: 'success',
  label: 'Success'
})}
        \${createBadge({
  variant: 'danger',
  label: 'Danger'
})}
        \${createBadge({
  variant: 'warning',
  label: 'Warning'
})}
        \${createBadge({
  variant: 'info',
  label: 'Info'
})}
        \${createBadge({
  variant: 'dark',
  label: 'Dark'
})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Cores (Light)</h5>
      <div class="d-flex flex-wrap gap-2">
        \${createBadge({
  variant: 'primary',
  type: 'light',
  label: 'Primary'
})}
        \${createBadge({
  variant: 'secondary',
  type: 'light',
  label: 'Secondary'
})}
        \${createBadge({
  variant: 'success',
  type: 'light',
  label: 'Success'
})}
        \${createBadge({
  variant: 'danger',
  type: 'light',
  label: 'Danger'
})}
        \${createBadge({
  variant: 'warning',
  type: 'light',
  label: 'Warning'
})}
        \${createBadge({
  variant: 'info',
  type: 'light',
  label: 'Info'
})}
        \${createBadge({
  variant: 'dark',
  type: 'light',
  label: 'Dark'
})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Formato Pill</h5>
      <div class="d-flex flex-wrap gap-2">
        \${createBadge({
  variant: 'primary',
  shape: 'pill',
  label: 'Pill Primary'
})}
        \${createBadge({
  variant: 'success',
  shape: 'pill',
  label: 'Pill Success'
})}
        \${createBadge({
  variant: 'danger',
  shape: 'pill',
  label: 'Pill Danger'
})}
      </div>
    </div>
  </div>
\``,...(p=(c=i.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var g,m,u;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const markup = createBadge(args);
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
        <pre><code>\${formatReactSnippet(markup, 'Badge').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var b,v,h;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
  const markup = createBadge(args);
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
        <pre><code>\${formatReactSnippet(markup, 'Badge').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(h=(v=t.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var y,x,f;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const markup = createBadge(args);
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
        <pre><code>\${formatReactSnippet(markup, 'Badge').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(f=(x=s.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var $,S,B;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4">
        <h6 class="mb-3">Interactive Demos</h6>
        
        <!-- Demo 1: Toggle Badge Type -->
        <div class="mb-4">
          <h6 class="mb-2">Toggle Type (Solid/Light)</h6>
          <span id="toggle-badge" class="badge bg-primary">Click me!</span>
          <script>
            (function() {
              const badge = document.getElementById('toggle-badge');
              let isSolid = true;
              badge.style.cursor = 'pointer';
              badge.onclick = function() {
                if (isSolid) {
                  this.className = 'badge bg-label-primary';
                  this.textContent = 'Light Badge';
                } else {
                  this.className = 'badge bg-primary';
                  this.textContent = 'Solid Badge';
                }
                isSolid = !isSolid;
              };
            })();
          <\/script>
        </div>
        
        <!-- Demo 2: Status Counter -->
        <div class="mb-4">
          <h6 class="mb-2">Notification Counter</h6>
          <button class="btn btn-primary position-relative" onclick="
            const counter = document.getElementById('notification-counter');
            let count = parseInt(counter.textContent) + 1;
            counter.textContent = count;
            if (count > 99) counter.textContent = '99+';
          ">
            Inbox
            <span id="notification-counter" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              5
              <span class="visually-hidden">unread messages</span>
            </span>
          </button>
        </div>
        
        <!-- Demo 3: Status Tags -->
        <div class="mb-4">
          <h6 class="mb-2">Toggle Status</h6>
          <span id="status-badge" class="badge bg-success" style="cursor: pointer;" onclick="
            const statuses = [
              {label: 'Active', variant: 'success'},
              {label: 'Pending', variant: 'warning'},
              {label: 'Inactive', variant: 'secondary'}
            ];
            const currentIndex = parseInt(this.dataset.index || '0');
            const nextIndex = (currentIndex + 1) % statuses.length;
            const next = statuses[nextIndex];
            this.className = 'badge bg-' + next.variant;
            this.textContent = next.label;
            this.dataset.index = nextIndex;
          " data-index="0">Active</span>
        </div>
        
        <p class="text-muted mt-4 small">
          <i class="ri-information-line"></i> Interactive demo via Storybook state (no external dependencies)
        </p>
      </div>
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interativo com badges funcionais usando state controlado (classes). Clique para alternar estados.'
      }
    }
  }
}`,...(B=(S=l.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};const N=["Overview","Default","Light","Pill","Interactive"];export{a as Default,l as Interactive,t as Light,i as Overview,s as Pill,N as __namedExportsOrder,H as default};
