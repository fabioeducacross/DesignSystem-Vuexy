import{f as M,a as I}from"./snippets-m8t1HIl1.js";const B={title:"Molecules/Overlays/Tooltip",tags:["autodocs"],parameters:{docs:{description:{component:`
# Tooltip

Pequeno overlay informativo que aparece ao passar o mouse sobre um elemento.

## Quando usar
- Informações adicionais sobre um botão/ícone
- Dicas de uso (hints)
- Explicações breves
- Labels de ícones

## Características
- Classes Bootstrap: \`.tooltip\`, \`.tooltip-inner\`
- Posicionamento: Top, Right, Bottom, Left
- Ativação: Hover, Focus, Click
- Delay configurável
- Requer Bootstrap JavaScript

## Comportamento
- Aparece ao hover por padrão
- Esconde ao sair do elemento
- Posicionamento automático via Popper.js
- Acessível via teclado (focus)

## Acessibilidade
- \`title\` ou \`data-bs-title\` obrigatório
- \`aria-describedby\` automático
- Navegável por teclado
        `}}},argTypes:{placement:{control:{type:"select"},options:["top","right","bottom","left"],description:"Posicionamento do tooltip",table:{defaultValue:{summary:"top"}}},text:{control:"text",description:"Texto do tooltip",table:{defaultValue:{summary:"Tooltip text"}}},trigger:{control:{type:"select"},options:["hover","focus","click","manual"],description:"Tipo de ativação",table:{defaultValue:{summary:"hover"}}}}},o=({placement:e="top",text:t="Tooltip text",trigger:n="hover"})=>`<button type="button" class="btn btn-secondary" 
  data-bs-toggle="tooltip" 
  data-bs-placement="${e}" 
  data-bs-trigger="${n}"
  data-bs-title="${t}">
  Hover me
</button>`,c=e=>{const t=o(e);return`
    <div style="padding: 100px; text-align: center;">
      ${t}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${M(t).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${I(t,"Tooltip").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        
        <div class="alert alert-warning mt-3">
          <strong>Initialization Required:</strong>
          <pre class="mb-0"><code>// JavaScript
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));</code></pre>
        </div>
      </div>
    </details>
  `},d=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Posicionamento</h5>
      <div class="d-flex justify-content-center align-items-center gap-3" style="padding: 100px 0;">
        ${o({placement:"top",text:"Tooltip on top"})}
        ${o({placement:"right",text:"Tooltip on right"})}
        ${o({placement:"bottom",text:"Tooltip on bottom"})}
        ${o({placement:"left",text:"Tooltip on left"})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Em Ícones</h5>
      <div class="d-flex justify-content-center gap-3" style="padding: 50px 0;">
        <button type="button" class="btn btn-icon btn-label-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">
          <i class="bx bx-edit"></i>
        </button>
        <button type="button" class="btn btn-icon btn-label-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">
          <i class="bx bx-trash"></i>
        </button>
        <button type="button" class="btn btn-icon btn-label-success" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Download">
          <i class="bx bx-download"></i>
        </button>
        <button type="button" class="btn btn-icon btn-label-info" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Share">
          <i class="bx bx-share-alt"></i>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Em Elementos Diversos</h5>
      <div class="d-flex justify-content-center align-items-center gap-4" style="padding: 50px 0;">
        <a href="#" class="badge bg-primary" data-bs-toggle="tooltip" data-bs-title="Badge with tooltip">
          Hover me
        </a>
        
        <span class="avatar avatar-sm" data-bs-toggle="tooltip" data-bs-title="John Doe">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='11' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="Avatar">
        </span>
        
        <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="This is a small button with a longer tooltip message">
          <i class="bx bx-info-circle"></i>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Trigger Types</h5>
      <div class="d-flex justify-content-center gap-3" style="padding: 50px 0;">
        ${o({text:"Hover tooltip (default)",trigger:"hover"})}
        ${o({text:"Focus tooltip",trigger:"focus"})}
        ${o({text:"Click tooltip",trigger:"click"})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>HTML Content (via JavaScript)</h5>
      <div class="text-center" style="padding: 50px 0;">
        <button type="button" class="btn btn-primary" id="htmlTooltip">
          Tooltip with HTML
        </button>
      </div>
      <small class="text-muted">Note: HTML tooltips require additional JavaScript configuration with <code>html: true</code> option and <code>data-bs-html="true"</code> attribute.</small>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle me-2"></i>
    <strong>JavaScript Required:</strong> Tooltips require Bootstrap JavaScript and Popper.js. Initialize tooltips with:
    <pre class="mt-2 mb-0"><code>const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
[...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));</code></pre>
  </div>
  
  <script>
    // Initialize tooltips (Storybook context)
    if (typeof bootstrap !== 'undefined') {
      setTimeout(() => {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach(el => {
          if (!bootstrap.Tooltip.getInstance(el)) {
            new bootstrap.Tooltip(el);
          }
        });
      }, 100);
    }
  <\/script>
`,i=c.bind({});i.args={placement:"top",text:"Tooltip on top",trigger:"hover"};const s=c.bind({});s.args={placement:"right",text:"Tooltip on right",trigger:"hover"};const l=c.bind({});l.args={placement:"bottom",text:"Tooltip on bottom",trigger:"hover"};const r=c.bind({});r.args={placement:"left",text:"Tooltip on left",trigger:"hover"};const p=c.bind({});p.args={placement:"top",text:"Click tooltip",trigger:"click"};const a={parameters:{docs:{description:{story:`
### Tooltips com Bootstrap JS Real

Demonstra tooltips funcionando com Bootstrap JS do Vuexy:

- ✅ **Hover** mostra tooltip automaticamente
- ✅ **Focus** mostra tooltip (acessibilidade via teclado)
- ✅ **4 Posicionamentos** (top, right, bottom, left) com ajuste automático
- ✅ **Multiple tooltips** na mesma página
- ✅ **HTML content** suportado

**Nota:** Esta implementação usa \`/vuexy/js/bootstrap.js\` oficial do Vuexy.

### Como testar:
1. Passe o mouse sobre os botões para ver tooltips
2. Use Tab para navegar e ver tooltips no focus
3. Observe o posicionamento automático
        `}}},loaders:[async()=>typeof window<"u"&&!window.bootstrap?new Promise((e,t)=>{const n=document.createElement("script");n.src="/vuexy/js/bootstrap.js",n.onload=()=>{console.log("✅ Bootstrap JS carregado para Tooltip"),e({bootstrapLoaded:!0})},n.onerror=()=>t(new Error("Failed to load Bootstrap JS")),document.head.appendChild(n)}):{bootstrapLoaded:!0}],render:()=>(setTimeout(()=>{typeof bootstrap<"u"&&[...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map(t=>new bootstrap.Tooltip(t))},100),`
      <div style="padding: 60px 20px;">
        <h5 class="text-center mb-4">Tooltips Interativos com Bootstrap JS</h5>
        
        <!-- Posicionamentos -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Posicionamento</h6>
          <div class="d-flex gap-3 justify-content-center flex-wrap">
            <button type="button" class="btn btn-primary" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="top" 
                    title="Tooltip no topo">
              <i class="ti ti-arrow-up"></i> Top
            </button>
            
            <button type="button" class="btn btn-secondary" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="right" 
                    title="Tooltip à direita">
              <i class="ti ti-arrow-right"></i> Right
            </button>
            
            <button type="button" class="btn btn-success" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="bottom" 
                    title="Tooltip embaixo">
              <i class="ti ti-arrow-down"></i> Bottom
            </button>
            
            <button type="button" class="btn btn-danger" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="left" 
                    title="Tooltip à esquerda">
              <i class="ti ti-arrow-left"></i> Left
            </button>
          </div>
        </div>
        
        <!-- Variantes de Cor -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Variantes de Botão</h6>
          <div class="d-flex gap-2 justify-content-center flex-wrap">
            <button type="button" class="btn btn-primary" 
                    data-bs-toggle="tooltip" 
                    title="Primary tooltip">
              Primary
            </button>
            
            <button type="button" class="btn btn-success" 
                    data-bs-toggle="tooltip" 
                    title="Success tooltip">
              Success
            </button>
            
            <button type="button" class="btn btn-warning" 
                    data-bs-toggle="tooltip" 
                    title="Warning tooltip">
              Warning
            </button>
            
            <button type="button" class="btn btn-danger" 
                    data-bs-toggle="tooltip" 
                    title="Danger tooltip">
              Danger
            </button>
            
            <button type="button" class="btn btn-info" 
                    data-bs-toggle="tooltip" 
                    title="Info tooltip">
              Info
            </button>
            
            <button type="button" class="btn btn-dark" 
                    data-bs-toggle="tooltip" 
                    title="Dark tooltip">
              Dark
            </button>
          </div>
        </div>
        
        <!-- Ícones com Tooltip -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Ícones com Tooltip</h6>
          <div class="d-flex gap-3 justify-content-center">
            <button type="button" class="btn btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" 
                    title="Editar">
              <i class="ti ti-edit"></i>
            </button>
            
            <button type="button" class="btn btn-icon btn-outline-danger" 
                    data-bs-toggle="tooltip" 
                    title="Excluir">
              <i class="ti ti-trash"></i>
            </button>
            
            <button type="button" class="btn btn-icon btn-outline-info" 
                    data-bs-toggle="tooltip" 
                    title="Informações">
              <i class="ti ti-info-circle"></i>
            </button>
            
            <button type="button" class="btn btn-icon btn-outline-success" 
                    data-bs-toggle="tooltip" 
                    title="Download">
              <i class="ti ti-download"></i>
            </button>
            
            <button type="button" class="btn btn-icon btn-outline-secondary" 
                    data-bs-toggle="tooltip" 
                    title="Configurações">
              <i class="ti ti-settings"></i>
            </button>
          </div>
        </div>
        
        <!-- HTML Content -->
        <div class="text-center mb-4">
          <h6 class="mb-3">Tooltip com HTML</h6>
          <button type="button" class="btn btn-primary" 
                  data-bs-toggle="tooltip" 
                  data-bs-html="true"
                  title="<strong>Bold text</strong><br><em>Italic text</em><br><u>Underlined</u>">
            HTML Tooltip
          </button>
        </div>
        
        <div class="alert alert-info" role="alert">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Mouse:</strong> Passe o mouse sobre os botões para ver os tooltips</li>
            <li><strong>Teclado:</strong> Use Tab para navegar e ver tooltips aparecerem no focus</li>
            <li><strong>Posicionamento:</strong> Observe como os tooltips se ajustam automaticamente quando próximos às bordas</li>
            <li><strong>HTML:</strong> O último botão mostra que tooltips suportam conteúdo HTML</li>
          </ul>
        </div>
      </div>
    `)};var b,g,m;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Posicionamento</h5>
      <div class="d-flex justify-content-center align-items-center gap-3" style="padding: 100px 0;">
        \${createTooltip({
  placement: 'top',
  text: 'Tooltip on top'
})}
        \${createTooltip({
  placement: 'right',
  text: 'Tooltip on right'
})}
        \${createTooltip({
  placement: 'bottom',
  text: 'Tooltip on bottom'
})}
        \${createTooltip({
  placement: 'left',
  text: 'Tooltip on left'
})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Em Ícones</h5>
      <div class="d-flex justify-content-center gap-3" style="padding: 50px 0;">
        <button type="button" class="btn btn-icon btn-label-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">
          <i class="bx bx-edit"></i>
        </button>
        <button type="button" class="btn btn-icon btn-label-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">
          <i class="bx bx-trash"></i>
        </button>
        <button type="button" class="btn btn-icon btn-label-success" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Download">
          <i class="bx bx-download"></i>
        </button>
        <button type="button" class="btn btn-icon btn-label-info" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Share">
          <i class="bx bx-share-alt"></i>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Em Elementos Diversos</h5>
      <div class="d-flex justify-content-center align-items-center gap-4" style="padding: 50px 0;">
        <a href="#" class="badge bg-primary" data-bs-toggle="tooltip" data-bs-title="Badge with tooltip">
          Hover me
        </a>
        
        <span class="avatar avatar-sm" data-bs-toggle="tooltip" data-bs-title="John Doe">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='11' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="Avatar">
        </span>
        
        <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="This is a small button with a longer tooltip message">
          <i class="bx bx-info-circle"></i>
        </button>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Trigger Types</h5>
      <div class="d-flex justify-content-center gap-3" style="padding: 50px 0;">
        \${createTooltip({
  text: 'Hover tooltip (default)',
  trigger: 'hover'
})}
        \${createTooltip({
  text: 'Focus tooltip',
  trigger: 'focus'
})}
        \${createTooltip({
  text: 'Click tooltip',
  trigger: 'click'
})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>HTML Content (via JavaScript)</h5>
      <div class="text-center" style="padding: 50px 0;">
        <button type="button" class="btn btn-primary" id="htmlTooltip">
          Tooltip with HTML
        </button>
      </div>
      <small class="text-muted">Note: HTML tooltips require additional JavaScript configuration with <code>html: true</code> option and <code>data-bs-html="true"</code> attribute.</small>
    </div>
  </div>
  
  <div class="alert alert-info mt-5">
    <i class="bx bx-info-circle me-2"></i>
    <strong>JavaScript Required:</strong> Tooltips require Bootstrap JavaScript and Popper.js. Initialize tooltips with:
    <pre class="mt-2 mb-0"><code>const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
[...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));</code></pre>
  </div>
  
  <script>
    // Initialize tooltips (Storybook context)
    if (typeof bootstrap !== 'undefined') {
      setTimeout(() => {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach(el => {
          if (!bootstrap.Tooltip.getInstance(el)) {
            new bootstrap.Tooltip(el);
          }
        });
      }, 100);
    }
  <\/script>
\``,...(m=(g=d.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var u,v,y;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const markup = createTooltip(args);
  return \`
    <div style="padding: 100px; text-align: center;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Tooltip').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-warning mt-3">
          <strong>Initialization Required:</strong>
          <pre class="mb-0"><code>// JavaScript
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));</code></pre>
        </div>
      </div>
    </details>
  \`;
}`,...(y=(v=i.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var x,T,h;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const markup = createTooltip(args);
  return \`
    <div style="padding: 100px; text-align: center;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Tooltip').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-warning mt-3">
          <strong>Initialization Required:</strong>
          <pre class="mb-0"><code>// JavaScript
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));</code></pre>
        </div>
      </div>
    </details>
  \`;
}`,...(h=(T=s.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};var f,w,S;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const markup = createTooltip(args);
  return \`
    <div style="padding: 100px; text-align: center;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Tooltip').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-warning mt-3">
          <strong>Initialization Required:</strong>
          <pre class="mb-0"><code>// JavaScript
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));</code></pre>
        </div>
      </div>
    </details>
  \`;
}`,...(S=(w=l.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var L,E,C;r.parameters={...r.parameters,docs:{...(L=r.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  const markup = createTooltip(args);
  return \`
    <div style="padding: 100px; text-align: center;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Tooltip').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-warning mt-3">
          <strong>Initialization Required:</strong>
          <pre class="mb-0"><code>// JavaScript
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));</code></pre>
        </div>
      </div>
    </details>
  \`;
}`,...(C=(E=r.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};var k,H,$;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`args => {
  const markup = createTooltip(args);
  return \`
    <div style="padding: 100px; text-align: center;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Tooltip').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-warning mt-3">
          <strong>Initialization Required:</strong>
          <pre class="mb-0"><code>// JavaScript
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));</code></pre>
        </div>
      </div>
    </details>
  \`;
}`,...($=(H=p.parameters)==null?void 0:H.docs)==null?void 0:$.source}}};var q,j,R,D,J;a.parameters={...a.parameters,docs:{...(q=a.parameters)==null?void 0:q.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
### Tooltips com Bootstrap JS Real

Demonstra tooltips funcionando com Bootstrap JS do Vuexy:

- ✅ **Hover** mostra tooltip automaticamente
- ✅ **Focus** mostra tooltip (acessibilidade via teclado)
- ✅ **4 Posicionamentos** (top, right, bottom, left) com ajuste automático
- ✅ **Multiple tooltips** na mesma página
- ✅ **HTML content** suportado

**Nota:** Esta implementação usa \\\`/vuexy/js/bootstrap.js\\\` oficial do Vuexy.

### Como testar:
1. Passe o mouse sobre os botões para ver tooltips
2. Use Tab para navegar e ver tooltips no focus
3. Observe o posicionamento automático
        \`
      }
    }
  },
  loaders: [async () => {
    if (typeof window !== 'undefined' && !window.bootstrap) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/vuexy/js/bootstrap.js';
        script.onload = () => {
          console.log('✅ Bootstrap JS carregado para Tooltip');
          resolve({
            bootstrapLoaded: true
          });
        };
        script.onerror = () => reject(new Error('Failed to load Bootstrap JS'));
        document.head.appendChild(script);
      });
    }
    return {
      bootstrapLoaded: true
    };
  }],
  render: () => {
    setTimeout(() => {
      if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
      }
    }, 100);
    return \`
      <div style="padding: 60px 20px;">
        <h5 class="text-center mb-4">Tooltips Interativos com Bootstrap JS</h5>
        
        <!-- Posicionamentos -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Posicionamento</h6>
          <div class="d-flex gap-3 justify-content-center flex-wrap">
            <button type="button" class="btn btn-primary" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="top" 
                    title="Tooltip no topo">
              <i class="ti ti-arrow-up"></i> Top
            </button>
            
            <button type="button" class="btn btn-secondary" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="right" 
                    title="Tooltip à direita">
              <i class="ti ti-arrow-right"></i> Right
            </button>
            
            <button type="button" class="btn btn-success" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="bottom" 
                    title="Tooltip embaixo">
              <i class="ti ti-arrow-down"></i> Bottom
            </button>
            
            <button type="button" class="btn btn-danger" 
                    data-bs-toggle="tooltip" 
                    data-bs-placement="left" 
                    title="Tooltip à esquerda">
              <i class="ti ti-arrow-left"></i> Left
            </button>
          </div>
        </div>
        
        <!-- Variantes de Cor -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Variantes de Botão</h6>
          <div class="d-flex gap-2 justify-content-center flex-wrap">
            <button type="button" class="btn btn-primary" 
                    data-bs-toggle="tooltip" 
                    title="Primary tooltip">
              Primary
            </button>
            
            <button type="button" class="btn btn-success" 
                    data-bs-toggle="tooltip" 
                    title="Success tooltip">
              Success
            </button>
            
            <button type="button" class="btn btn-warning" 
                    data-bs-toggle="tooltip" 
                    title="Warning tooltip">
              Warning
            </button>
            
            <button type="button" class="btn btn-danger" 
                    data-bs-toggle="tooltip" 
                    title="Danger tooltip">
              Danger
            </button>
            
            <button type="button" class="btn btn-info" 
                    data-bs-toggle="tooltip" 
                    title="Info tooltip">
              Info
            </button>
            
            <button type="button" class="btn btn-dark" 
                    data-bs-toggle="tooltip" 
                    title="Dark tooltip">
              Dark
            </button>
          </div>
        </div>
        
        <!-- Ícones com Tooltip -->
        <div class="text-center mb-5">
          <h6 class="mb-3">Ícones com Tooltip</h6>
          <div class="d-flex gap-3 justify-content-center">
            <button type="button" class="btn btn-icon btn-outline-primary" 
                    data-bs-toggle="tooltip" 
                    title="Editar">
              <i class="ti ti-edit"></i>
            </button>
            
            <button type="button" class="btn btn-icon btn-outline-danger" 
                    data-bs-toggle="tooltip" 
                    title="Excluir">
              <i class="ti ti-trash"></i>
            </button>
            
            <button type="button" class="btn btn-icon btn-outline-info" 
                    data-bs-toggle="tooltip" 
                    title="Informações">
              <i class="ti ti-info-circle"></i>
            </button>
            
            <button type="button" class="btn btn-icon btn-outline-success" 
                    data-bs-toggle="tooltip" 
                    title="Download">
              <i class="ti ti-download"></i>
            </button>
            
            <button type="button" class="btn btn-icon btn-outline-secondary" 
                    data-bs-toggle="tooltip" 
                    title="Configurações">
              <i class="ti ti-settings"></i>
            </button>
          </div>
        </div>
        
        <!-- HTML Content -->
        <div class="text-center mb-4">
          <h6 class="mb-3">Tooltip com HTML</h6>
          <button type="button" class="btn btn-primary" 
                  data-bs-toggle="tooltip" 
                  data-bs-html="true"
                  title="<strong>Bold text</strong><br><em>Italic text</em><br><u>Underlined</u>">
            HTML Tooltip
          </button>
        </div>
        
        <div class="alert alert-info" role="alert">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Mouse:</strong> Passe o mouse sobre os botões para ver os tooltips</li>
            <li><strong>Teclado:</strong> Use Tab para navegar e ver tooltips aparecerem no focus</li>
            <li><strong>Posicionamento:</strong> Observe como os tooltips se ajustam automaticamente quando próximos às bordas</li>
            <li><strong>HTML:</strong> O último botão mostra que tooltips suportam conteúdo HTML</li>
          </ul>
        </div>
      </div>
    \`;
  }
}`,...(R=(j=a.parameters)==null?void 0:j.docs)==null?void 0:R.source},description:{story:`====================================
INTERACTIVE STORY - Bootstrap JS Real
====================================`,...(J=(D=a.parameters)==null?void 0:D.docs)==null?void 0:J.description}}};const A=["Overview","Top","Right","Bottom","Left","OnClick","Interactive"];export{l as Bottom,a as Interactive,r as Left,p as OnClick,d as Overview,s as Right,i as Top,A as __namedExportsOrder,B as default};
