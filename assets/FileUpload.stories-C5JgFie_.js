import{f as O,a as A}from"./snippets-m8t1HIl1.js";const q={title:"Atoms/Forms/FileUpload",tags:["autodocs"],parameters:{docs:{description:{component:`
# File Upload

Input para seleção e upload de arquivos.

## Quando usar
- Upload de documentos
- Upload de imagens/avatares
- Anexos de formulários
- Importação de dados

## Características
- Classe Bootstrap: \`.form-control\`
- Atributos: accept, multiple
- Tamanho customizável: \`.form-control-sm\`, \`.form-control-lg\`
- Suporta drag & drop (via JS)

## Acessibilidade
- Label descritivo obrigatório
- Tipo MIME via \`accept\`
- Estado disabled
- Mensagens de erro associadas
        `}}},argTypes:{size:{control:{type:"select"},options:["default","sm","lg"],description:"Tamanho do input",table:{defaultValue:{summary:"default"}}},multiple:{control:"boolean",description:"Permite múltiplos arquivos",table:{defaultValue:{summary:!1}}},accept:{control:"text",description:"Tipos de arquivo aceitos",table:{defaultValue:{summary:""}}},disabled:{control:"boolean",description:"Estado desabilitado",table:{defaultValue:{summary:!1}}}}},l=({size:d="default",multiple:t=!1,accept:p="",disabled:L=!1})=>{const R=d==="sm"?"form-control-sm":d==="lg"?"form-control-lg":"",T=t?"multiple":"",G=p?`accept="${p}"`:"";return`<input type="file" class="form-control ${R}" ${T} ${G} ${L?"disabled":""}>`},a=d=>{const t=l(d);return`
    <div style="max-width: 500px;">
      <label for="fileInput" class="form-label">Choose file</label>
      ${t}
      <div class="form-text">Maximum file size: 5MB</div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${O(t).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${A(t,"FileUpload").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},c=()=>`
  <div class="row g-4">
    <div class="col-md-6">
      <h5>Default</h5>
      <label class="form-label">Upload document</label>
      ${l({})}
      <div class="form-text">Supported formats: PDF, DOC, DOCX</div>
    </div>
    
    <div class="col-md-6">
      <h5>Image Upload</h5>
      <label class="form-label">Upload avatar</label>
      ${l({accept:"image/*"})}
      <div class="form-text">PNG, JPG, GIF up to 2MB</div>
    </div>
    
    <div class="col-md-6">
      <h5>Multiple Files</h5>
      <label class="form-label">Upload attachments</label>
      ${l({multiple:!0})}
      <div class="form-text">You can select multiple files</div>
    </div>
    
    <div class="col-md-6">
      <h5>Small Size</h5>
      <label class="form-label">Quick upload</label>
      ${l({size:"sm"})}
    </div>
    
    <div class="col-md-6">
      <h5>Large Size</h5>
      <label class="form-label">Upload file</label>
      ${l({size:"lg"})}
    </div>
    
    <div class="col-md-6">
      <h5>Disabled</h5>
      <label class="form-label">Upload locked</label>
      ${l({disabled:!0})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>With Preview Card</h5>
      <div class="card">
        <div class="card-body">
          <div class="mb-3">
            <label class="form-label">Profile Picture</label>
            ${l({accept:"image/*"})}
            <div class="form-text">Upload JPG, PNG or GIF (max 5MB)</div>
          </div>
          <div class="d-flex align-items-center gap-3 p-3 border rounded">
            <div class="avatar avatar-lg bg-label-secondary">
              <i class="bx bx-image fs-3"></i>
            </div>
            <div>
              <p class="mb-0 fw-medium">No file selected</p>
              <small class="text-muted">Click "Choose file" to upload</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-4">
      <h5>Drag & Drop Zone (Markup Example)</h5>
      <div class="card border-dashed" style="border: 2px dashed #d9dee3;">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <i class="bx bx-cloud-upload display-4 text-muted"></i>
          </div>
          <h5 class="mb-2">Drop files here or click to upload</h5>
          <p class="text-muted mb-4">Maximum file size: 10MB</p>
          ${l({multiple:!0})}
        </div>
      </div>
      <small class="text-muted">Note: Drag & drop functionality requires JavaScript implementation</small>
    </div>
  </div>
`,e=a.bind({});e.args={size:"default",multiple:!1,accept:"",disabled:!1};const s=a.bind({});s.args={...e.args,accept:"image/*"};const i=a.bind({});i.args={...e.args,multiple:!0};const n=a.bind({});n.args={...e.args,size:"sm"};const r=a.bind({});r.args={...e.args,size:"lg"};const o=a.bind({});o.args={...e.args,disabled:!0};const m={render:()=>`
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive File Upload Demo</h5>
        <p class="text-muted">Simulate file selection</p>
        
        <label class="form-label" for="fileInput">Choose file</label>
        <input type="file" class="form-control" id="fileInput" accept="image/*">
        
        <div class="mt-3 p-3 border rounded" id="preview" style="display:none;">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
              <i class="bx bx-file fs-4 text-primary"></i>
              <div>
                <div class="fw-medium" id="fileName">No file</div>
                <small class="text-muted" id="fileSize">0 KB</small>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="clearFile()">
              <i class="bx bx-x"></i>
            </button>
          </div>
        </div>
        
        <button class="btn btn-primary btn-sm mt-3" onclick="simulateFile()">
          Simulate File Selection
        </button>
        
        <script>
          const input = document.getElementById('fileInput');
          const preview = document.getElementById('preview');
          const fileName = document.getElementById('fileName');
          const fileSize = document.getElementById('fileSize');
          
          input.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
              const file = e.target.files[0];
              fileName.textContent = file.name;
              fileSize.textContent = (file.size / 1024).toFixed(2) + ' KB';
              preview.style.display = 'block';
            }
          });
          
          function simulateFile() {
            fileName.textContent = 'example-image.jpg';
            fileSize.textContent = '245.67 KB';
            preview.style.display = 'block';
          }
          
          function clearFile() {
            input.value = '';
            preview.style.display = 'none';
            fileName.textContent = 'No file';
            fileSize.textContent = '0 KB';
          }
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `};var u,f,v;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-md-6">
      <h5>Default</h5>
      <label class="form-label">Upload document</label>
      \${createFileUpload({})}
      <div class="form-text">Supported formats: PDF, DOC, DOCX</div>
    </div>
    
    <div class="col-md-6">
      <h5>Image Upload</h5>
      <label class="form-label">Upload avatar</label>
      \${createFileUpload({
  accept: 'image/*'
})}
      <div class="form-text">PNG, JPG, GIF up to 2MB</div>
    </div>
    
    <div class="col-md-6">
      <h5>Multiple Files</h5>
      <label class="form-label">Upload attachments</label>
      \${createFileUpload({
  multiple: true
})}
      <div class="form-text">You can select multiple files</div>
    </div>
    
    <div class="col-md-6">
      <h5>Small Size</h5>
      <label class="form-label">Quick upload</label>
      \${createFileUpload({
  size: 'sm'
})}
    </div>
    
    <div class="col-md-6">
      <h5>Large Size</h5>
      <label class="form-label">Upload file</label>
      \${createFileUpload({
  size: 'lg'
})}
    </div>
    
    <div class="col-md-6">
      <h5>Disabled</h5>
      <label class="form-label">Upload locked</label>
      \${createFileUpload({
  disabled: true
})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>With Preview Card</h5>
      <div class="card">
        <div class="card-body">
          <div class="mb-3">
            <label class="form-label">Profile Picture</label>
            \${createFileUpload({
  accept: 'image/*'
})}
            <div class="form-text">Upload JPG, PNG or GIF (max 5MB)</div>
          </div>
          <div class="d-flex align-items-center gap-3 p-3 border rounded">
            <div class="avatar avatar-lg bg-label-secondary">
              <i class="bx bx-image fs-3"></i>
            </div>
            <div>
              <p class="mb-0 fw-medium">No file selected</p>
              <small class="text-muted">Click "Choose file" to upload</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-4">
      <h5>Drag & Drop Zone (Markup Example)</h5>
      <div class="card border-dashed" style="border: 2px dashed #d9dee3;">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <i class="bx bx-cloud-upload display-4 text-muted"></i>
          </div>
          <h5 class="mb-2">Drop files here or click to upload</h5>
          <p class="text-muted mb-4">Maximum file size: 10MB</p>
          \${createFileUpload({
  multiple: true
})}
        </div>
      </div>
      <small class="text-muted">Note: Drag & drop functionality requires JavaScript implementation</small>
    </div>
  </div>
\``,...(v=(f=c.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var b,g,h;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
  const markup = createFileUpload(args);
  return \`
    <div style="max-width: 500px;">
      <label for="fileInput" class="form-label">Choose file</label>
      \${markup}
      <div class="form-text">Maximum file size: 5MB</div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'FileUpload').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(h=(g=e.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var x,y,S;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const markup = createFileUpload(args);
  return \`
    <div style="max-width: 500px;">
      <label for="fileInput" class="form-label">Choose file</label>
      \${markup}
      <div class="form-text">Maximum file size: 5MB</div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'FileUpload').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(S=(y=s.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var F,k,U;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
  const markup = createFileUpload(args);
  return \`
    <div style="max-width: 500px;">
      <label for="fileInput" class="form-label">Choose file</label>
      \${markup}
      <div class="form-text">Maximum file size: 5MB</div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'FileUpload').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(U=(k=i.parameters)==null?void 0:k.docs)==null?void 0:U.source}}};var $,C,z;n.parameters={...n.parameters,docs:{...($=n.parameters)==null?void 0:$.docs,source:{originalSource:`args => {
  const markup = createFileUpload(args);
  return \`
    <div style="max-width: 500px;">
      <label for="fileInput" class="form-label">Choose file</label>
      \${markup}
      <div class="form-text">Maximum file size: 5MB</div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'FileUpload').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(z=(C=n.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};var I,M,w;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  const markup = createFileUpload(args);
  return \`
    <div style="max-width: 500px;">
      <label for="fileInput" class="form-label">Choose file</label>
      \${markup}
      <div class="form-text">Maximum file size: 5MB</div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'FileUpload').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(w=(M=r.parameters)==null?void 0:M.docs)==null?void 0:w.source}}};var B,D,N;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
  const markup = createFileUpload(args);
  return \`
    <div style="max-width: 500px;">
      <label for="fileInput" class="form-label">Choose file</label>
      \${markup}
      <div class="form-text">Maximum file size: 5MB</div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'FileUpload').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(N=(D=o.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var P,E,H;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive File Upload Demo</h5>
        <p class="text-muted">Simulate file selection</p>
        
        <label class="form-label" for="fileInput">Choose file</label>
        <input type="file" class="form-control" id="fileInput" accept="image/*">
        
        <div class="mt-3 p-3 border rounded" id="preview" style="display:none;">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
              <i class="bx bx-file fs-4 text-primary"></i>
              <div>
                <div class="fw-medium" id="fileName">No file</div>
                <small class="text-muted" id="fileSize">0 KB</small>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="clearFile()">
              <i class="bx bx-x"></i>
            </button>
          </div>
        </div>
        
        <button class="btn btn-primary btn-sm mt-3" onclick="simulateFile()">
          Simulate File Selection
        </button>
        
        <script>
          const input = document.getElementById('fileInput');
          const preview = document.getElementById('preview');
          const fileName = document.getElementById('fileName');
          const fileSize = document.getElementById('fileSize');
          
          input.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
              const file = e.target.files[0];
              fileName.textContent = file.name;
              fileSize.textContent = (file.size / 1024).toFixed(2) + ' KB';
              preview.style.display = 'block';
            }
          });
          
          function simulateFile() {
            fileName.textContent = 'example-image.jpg';
            fileSize.textContent = '245.67 KB';
            preview.style.display = 'block';
          }
          
          function clearFile() {
            input.value = '';
            preview.style.display = 'none';
            fileName.textContent = 'No file';
            fileSize.textContent = '0 KB';
          }
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  }
}`,...(H=(E=m.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};const j=["Overview","Default","ImageOnly","Multiple","SmallSize","LargeSize","Disabled","Interactive"];export{e as Default,o as Disabled,s as ImageOnly,m as Interactive,r as LargeSize,i as Multiple,c as Overview,n as SmallSize,j as __namedExportsOrder,q as default};
