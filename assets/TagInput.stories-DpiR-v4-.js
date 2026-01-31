import{f as q}from"./snippets-m8t1HIl1.js";const L={title:"Molecules/Forms/TagInput",tags:["autodocs"],parameters:{docs:{description:{component:`
# Tag Input

Input para criação e gerenciamento de tags/chips.

## Quando usar
- Categorização de conteúdo
- Adicionar múltiplos itens
- Keywords/hashtags
- Skills/tecnologias
- Filtros múltiplos
- Emails múltiplos
- Categorias de produtos

## Características
- Adicionar tags via Enter ou vírgula
- Remover tags individualmente
- Limite de tags (opcional)
- Autocompletar (opcional)
- Validação de formato
- Tags pré-definidas
- Cores customizáveis

## Funcionalidades
- Input inline
- Backspace para remover
- Click para remover (×)
- Drag & drop (opcional)
- Max tags
- Duplicatas previstas
- Paste múltiplo

## Acessibilidade
- ARIA labels
- Navegação por teclado
- Focus visible
- Screen reader support
        `}}},argTypes:{size:{control:"select",options:["sm","default","lg"],description:"Tamanho das tags",table:{defaultValue:{summary:"default"}}},variant:{control:"select",options:["primary","secondary","success","info","warning","danger"],description:"Cor das tags",table:{defaultValue:{summary:"primary"}}}}},H=({size:r="default",variant:e="primary"})=>`<div class="tag-input-wrapper">
  <div class="form-control ${r==="sm"?"form-control-sm":r==="lg"?"form-control-lg":""} tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px; cursor: text;">
    <span class="badge bg-${e} d-inline-flex align-items-center gap-1">
      JavaScript
      <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;" aria-label="Remove"></button>
    </span>
    <span class="badge bg-${e} d-inline-flex align-items-center gap-1">
      React
      <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;" aria-label="Remove"></button>
    </span>
    <span class="badge bg-${e} d-inline-flex align-items-center gap-1">
      Vue.js
      <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;" aria-label="Remove"></button>
    </span>
    <input type="text" 
           class="border-0 flex-grow-1" 
           placeholder="Type and press Enter..."
           style="outline: none; min-width: 150px; background: transparent;">
  </div>
  <small class="form-text text-muted">Press Enter or comma to add tags</small>
</div>`,i=r=>{const e=H(r);return`
    <div style="max-width: 600px;">
      ${e}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${q(e).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>JavaScript Required:</strong> This component requires JavaScript for tag management (add, remove, validation).
        </div>
      </div>
    </details>
  `},o=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h6>Default Tag Input</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Skills</label>
          <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              HTML
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              CSS
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              JavaScript
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <input type="text" class="border-0 flex-grow-1" placeholder="Add skill..." style="outline: none; min-width: 120px; background: transparent;">
          </div>
          <small class="form-text text-muted">Press Enter to add</small>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>With Different Colors</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Categories</label>
          <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
            <span class="badge bg-success d-inline-flex align-items-center gap-1">
              Frontend
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-info d-inline-flex align-items-center gap-1">
              Backend
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-warning d-inline-flex align-items-center gap-1">
              DevOps
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <input type="text" class="border-0 flex-grow-1" placeholder="Add category..." style="outline: none; min-width: 120px; background: transparent;">
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>Email Tags</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">To:</label>
          <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
            <span class="badge bg-secondary d-inline-flex align-items-center gap-1">
              john@example.com
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-secondary d-inline-flex align-items-center gap-1">
              jane@example.com
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <input type="text" class="border-0 flex-grow-1" placeholder="Add email..." style="outline: none; min-width: 150px; background: transparent;">
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12">
      <h6>Small Size</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Tags (Small)</label>
          <div class="form-control form-control-sm tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 32px;">
            <span class="badge badge-sm bg-primary d-inline-flex align-items-center gap-1">
              Tag1
              <button type="button" class="btn-close btn-close-white" style="width: 0.6em; height: 0.6em;"></button>
            </span>
            <span class="badge badge-sm bg-primary d-inline-flex align-items-center gap-1">
              Tag2
              <button type="button" class="btn-close btn-close-white" style="width: 0.6em; height: 0.6em;"></button>
            </span>
            <input type="text" class="border-0 flex-grow-1 small" placeholder="Add..." style="outline: none; min-width: 80px; background: transparent;">
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12">
      <h6>In Form Context</h6>
      <div class="card">
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label class="form-label">Article Title</label>
              <input type="text" class="form-control" placeholder="Enter title">
            </div>
            
            <div class="mb-3">
              <label class="form-label">Keywords</label>
              <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
                <span class="badge bg-primary d-inline-flex align-items-center gap-1">
                  web development
                  <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
                </span>
                <span class="badge bg-primary d-inline-flex align-items-center gap-1">
                  tutorial
                  <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
                </span>
                <input type="text" class="border-0 flex-grow-1" placeholder="Add keywords..." style="outline: none; min-width: 150px; background: transparent;">
              </div>
              <small class="form-text text-muted">Max 10 keywords</small>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Categories</label>
              <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
                <span class="badge bg-success d-inline-flex align-items-center gap-1">
                  Programming
                  <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
                </span>
                <input type="text" class="border-0 flex-grow-1" placeholder="Add category..." style="outline: none; min-width: 150px; background: transparent;">
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary">Publish Article</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-4">
    <i class="bx bx-info-circle me-2"></i>
    <strong>Interactive Component:</strong> This component requires JavaScript for full functionality (adding/removing tags, validation, etc.).
  </div>
`,t=i.bind({});t.args={size:"default",variant:"primary"};const n=i.bind({});n.args={size:"sm",variant:"primary"};const a=i.bind({});a.args={size:"lg",variant:"primary"};const s=i.bind({});s.args={size:"default",variant:"success"};const l=i.bind({});l.args={size:"default",variant:"secondary"};const c=()=>`
    <div class="card" style="max-width: 600px; margin: 0 auto;">
      <div class="card-body">
        <h5 class="card-title mb-3">🏷️ Interactive Tag Input</h5>
        
        <div class="mb-3">
          <label class="form-label">Skills</label>
          <div id="tag-container" class="form-control d-flex flex-wrap gap-2 align-items-center" style="min-height: 50px; cursor: text;">
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              JavaScript
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;" onclick="this.parentElement.remove();"></button>
            </span>
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              React
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;" onclick="this.parentElement.remove();"></button>
            </span>
            <input type="text" id="tag-input" class="border-0 flex-grow-1" placeholder="Type and press Enter..." 
                   style="outline: none; min-width: 150px; background: transparent;"
                   onkeypress="
                     if (event.key === 'Enter' && this.value.trim()) {
                       const tag = document.createElement('span');
                       tag.className = 'badge bg-primary d-inline-flex align-items-center gap-1';
                       tag.innerHTML = this.value.trim() + 
                         '<button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;" onclick="this.parentElement.remove(); updateCount();"></button>';
                       this.parentElement.insertBefore(tag, this);
                       this.value = '';
                       updateCount();
                       event.preventDefault();
                     }
                   ">
          </div>
          <small class="form-text text-muted">
            <span id="tag-count">2</span> tags added. Press Enter or comma to add.
          </small>
        </div>
        
        <button class="btn btn-sm btn-outline-danger" onclick="
          const tags = document.querySelectorAll('#tag-container .badge');
          tags.forEach(t => t.remove());
          updateCount();
        ">🗑️ Clear All Tags</button>
        
        <button class="btn btn-sm btn-outline-success ms-2" onclick="
          const presets = ['Vue.js', 'TypeScript', 'Node.js'];
          const container = document.getElementById('tag-container');
          const input = document.getElementById('tag-input');
          presets.forEach(preset => {
            const tag = document.createElement('span');
            tag.className = 'badge bg-success d-inline-flex align-items-center gap-1';
            tag.innerHTML = preset + 
              '<button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;" onclick="this.parentElement.remove(); updateCount();"></button>';
            container.insertBefore(tag, input);
          });
          updateCount();
        ">➕ Add Preset Tags</button>
      </div>
    </div>
    
    <script>
      function updateCount() {
        const count = document.querySelectorAll('#tag-container .badge').length;
        document.getElementById('tag-count').textContent = count;
      }
    <\/script>
  `;var d,p,m;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h6>Default Tag Input</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Skills</label>
          <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              HTML
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              CSS
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              JavaScript
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <input type="text" class="border-0 flex-grow-1" placeholder="Add skill..." style="outline: none; min-width: 120px; background: transparent;">
          </div>
          <small class="form-text text-muted">Press Enter to add</small>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>With Different Colors</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Categories</label>
          <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
            <span class="badge bg-success d-inline-flex align-items-center gap-1">
              Frontend
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-info d-inline-flex align-items-center gap-1">
              Backend
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-warning d-inline-flex align-items-center gap-1">
              DevOps
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <input type="text" class="border-0 flex-grow-1" placeholder="Add category..." style="outline: none; min-width: 120px; background: transparent;">
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-6">
      <h6>Email Tags</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">To:</label>
          <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
            <span class="badge bg-secondary d-inline-flex align-items-center gap-1">
              john@example.com
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <span class="badge bg-secondary d-inline-flex align-items-center gap-1">
              jane@example.com
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
            </span>
            <input type="text" class="border-0 flex-grow-1" placeholder="Add email..." style="outline: none; min-width: 150px; background: transparent;">
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12">
      <h6>Small Size</h6>
      <div class="card">
        <div class="card-body">
          <label class="form-label">Tags (Small)</label>
          <div class="form-control form-control-sm tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 32px;">
            <span class="badge badge-sm bg-primary d-inline-flex align-items-center gap-1">
              Tag1
              <button type="button" class="btn-close btn-close-white" style="width: 0.6em; height: 0.6em;"></button>
            </span>
            <span class="badge badge-sm bg-primary d-inline-flex align-items-center gap-1">
              Tag2
              <button type="button" class="btn-close btn-close-white" style="width: 0.6em; height: 0.6em;"></button>
            </span>
            <input type="text" class="border-0 flex-grow-1 small" placeholder="Add..." style="outline: none; min-width: 80px; background: transparent;">
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12">
      <h6>In Form Context</h6>
      <div class="card">
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label class="form-label">Article Title</label>
              <input type="text" class="form-control" placeholder="Enter title">
            </div>
            
            <div class="mb-3">
              <label class="form-label">Keywords</label>
              <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
                <span class="badge bg-primary d-inline-flex align-items-center gap-1">
                  web development
                  <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
                </span>
                <span class="badge bg-primary d-inline-flex align-items-center gap-1">
                  tutorial
                  <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
                </span>
                <input type="text" class="border-0 flex-grow-1" placeholder="Add keywords..." style="outline: none; min-width: 150px; background: transparent;">
              </div>
              <small class="form-text text-muted">Max 10 keywords</small>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Categories</label>
              <div class="form-control tag-input d-flex flex-wrap gap-2 align-items-center" style="min-height: 40px;">
                <span class="badge bg-success d-inline-flex align-items-center gap-1">
                  Programming
                  <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;"></button>
                </span>
                <input type="text" class="border-0 flex-grow-1" placeholder="Add category..." style="outline: none; min-width: 150px; background: transparent;">
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary">Publish Article</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <div class="alert alert-info mt-4">
    <i class="bx bx-info-circle me-2"></i>
    <strong>Interactive Component:</strong> This component requires JavaScript for full functionality (adding/removing tags, validation, etc.).
  </div>
\``,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var g,b,u;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const markup = createTagInput(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>JavaScript Required:</strong> This component requires JavaScript for tag management (add, remove, validation).
        </div>
      </div>
    </details>
  \`;
}`,...(u=(b=t.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};var h,v,y;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const markup = createTagInput(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>JavaScript Required:</strong> This component requires JavaScript for tag management (add, remove, validation).
        </div>
      </div>
    </details>
  \`;
}`,...(y=(v=n.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var f,x,w;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const markup = createTagInput(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>JavaScript Required:</strong> This component requires JavaScript for tag management (add, remove, validation).
        </div>
      </div>
    </details>
  \`;
}`,...(w=(x=a.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var S,k,T;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
  const markup = createTagInput(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>JavaScript Required:</strong> This component requires JavaScript for tag management (add, remove, validation).
        </div>
      </div>
    </details>
  \`;
}`,...(T=(k=s.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var C,E,A;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const markup = createTagInput(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>JavaScript Required:</strong> This component requires JavaScript for tag management (add, remove, validation).
        </div>
      </div>
    </details>
  \`;
}`,...(A=(E=l.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var I,D,J;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  return \`
    <div class="card" style="max-width: 600px; margin: 0 auto;">
      <div class="card-body">
        <h5 class="card-title mb-3">🏷️ Interactive Tag Input</h5>
        
        <div class="mb-3">
          <label class="form-label">Skills</label>
          <div id="tag-container" class="form-control d-flex flex-wrap gap-2 align-items-center" style="min-height: 50px; cursor: text;">
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              JavaScript
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;" onclick="this.parentElement.remove();"></button>
            </span>
            <span class="badge bg-primary d-inline-flex align-items-center gap-1">
              React
              <button type="button" class="btn-close btn-close-white" style="width: 0.75em; height: 0.75em;" onclick="this.parentElement.remove();"></button>
            </span>
            <input type="text" id="tag-input" class="border-0 flex-grow-1" placeholder="Type and press Enter..." 
                   style="outline: none; min-width: 150px; background: transparent;"
                   onkeypress="
                     if (event.key === 'Enter' && this.value.trim()) {
                       const tag = document.createElement('span');
                       tag.className = 'badge bg-primary d-inline-flex align-items-center gap-1';
                       tag.innerHTML = this.value.trim() + 
                         '<button type=\\"button\\" class=\\"btn-close btn-close-white\\" style=\\"width: 0.75em; height: 0.75em;\\" onclick=\\"this.parentElement.remove(); updateCount();\\"></button>';
                       this.parentElement.insertBefore(tag, this);
                       this.value = '';
                       updateCount();
                       event.preventDefault();
                     }
                   ">
          </div>
          <small class="form-text text-muted">
            <span id="tag-count">2</span> tags added. Press Enter or comma to add.
          </small>
        </div>
        
        <button class="btn btn-sm btn-outline-danger" onclick="
          const tags = document.querySelectorAll('#tag-container .badge');
          tags.forEach(t => t.remove());
          updateCount();
        ">🗑️ Clear All Tags</button>
        
        <button class="btn btn-sm btn-outline-success ms-2" onclick="
          const presets = ['Vue.js', 'TypeScript', 'Node.js'];
          const container = document.getElementById('tag-container');
          const input = document.getElementById('tag-input');
          presets.forEach(preset => {
            const tag = document.createElement('span');
            tag.className = 'badge bg-success d-inline-flex align-items-center gap-1';
            tag.innerHTML = preset + 
              '<button type=\\"button\\" class=\\"btn-close btn-close-white\\" style=\\"width: 0.75em; height: 0.75em;\\" onclick=\\"this.parentElement.remove(); updateCount();\\"></button>';
            container.insertBefore(tag, input);
          });
          updateCount();
        ">➕ Add Preset Tags</button>
      </div>
    </div>
    
    <script>
      function updateCount() {
        const count = document.querySelectorAll('#tag-container .badge').length;
        document.getElementById('tag-count').textContent = count;
      }
    <\/script>
  \`;
}`,...(J=(D=c.parameters)==null?void 0:D.docs)==null?void 0:J.source}}};const F=["Overview","Default","Small","Large","Success","Secondary","Interactive"];export{t as Default,c as Interactive,a as Large,o as Overview,l as Secondary,n as Small,s as Success,F as __namedExportsOrder,L as default};
