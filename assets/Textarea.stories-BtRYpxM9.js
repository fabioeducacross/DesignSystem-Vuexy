import{f as S,a as I}from"./snippets-m8t1HIl1.js";const z={title:"Atoms/Forms/Textarea",tags:["autodocs"],parameters:{docs:{description:{component:`
## Textarea Field (Atom - Forms)

Campo de texto multi-linha do Vuexy para entrada de conteúdo extenso.

### TODO - Implementação Pendente
- [ ] Adicionar markup HTML do Vuexy usando \`<textarea class="form-control">\`
- [ ] Implementar tamanhos (.form-control-sm, .form-control-lg)
- [ ] Adicionar controle de rows (altura)
- [ ] Implementar estados (disabled, readonly, invalid)
- [ ] Adicionar contador de caracteres (opcional)
- [ ] Incluir snippets multi-stack

### Fonte Vuexy
- **CSS**: \`core.css\` → \`.form-control\` em \`<textarea>\`
- **Variações**: tamanhos (sm, default, lg), rows (3-10)
- **Estados**: default, focus, disabled, readonly, valid, invalid

### Controles Esperados
- \`rows\`: number (3-10)
- \`size\`: select (default, sm, lg)
- \`placeholder\`: text
- \`value\`: text
- \`disabled\`: boolean
- \`readonly\`: boolean
- \`maxlength\`: number (opcional)

### Stories Esperadas
1. Overview - Grid com variações
2. Default - Textarea básico
3. Sizes - sm, default, lg
4. Rows - 3, 5, 10 rows
5. States - disabled, readonly
6. WithCounter - com contador de caracteres
        `}}},argTypes:{rows:{control:{type:"number",min:3,max:10}},size:{control:"select",options:["sm","default","lg"]},placeholder:{control:"text"},value:{control:"text"},disabled:{control:"boolean"},readonly:{control:"boolean"},maxlength:{control:"number"},state:{control:"select",options:["default","valid","invalid"]}}},a=({rows:e=4,size:t="default",placeholder:o="",value:T="",disabled:C=!1,readonly:B=!1,maxlength:c=0,state:d="default"})=>`<textarea 
  class="${["form-control",t==="sm"?"form-control-sm":t==="lg"?"form-control-lg":"",d==="valid"?"is-valid":d==="invalid"?"is-invalid":""].filter(Boolean).join(" ")}"
  rows="${e}"
  placeholder="${o}"
  ${C?"disabled":""}
  ${B?"readonly":""}
  ${c?`maxlength="${c}"`:""}
>${T}</textarea>`,w=e=>{const t=a(e),o=e.maxlength?`<small class="text-muted">${e.value.length}/${e.maxlength}</small>`:"";return`
    <div style="max-width: 500px;">
      ${t}
      ${e.maxlength?`<div class="d-flex justify-content-end mt-1">${o}</div>`:""}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${S(t).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${I(t,"Textarea").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},n=()=>`
  <div class="row g-3">
    <div class="col-12">
      <h5>Tamanhos</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 500px;">
        ${a({size:"sm",placeholder:"Small textarea",rows:2})}
        ${a({placeholder:"Default textarea",rows:3})}
        ${a({size:"lg",placeholder:"Large textarea",rows:4})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 500px;">
        ${a({placeholder:"Default",value:"Default state"})}
        ${a({placeholder:"Disabled",disabled:!0,value:"Disabled textarea"})}
        ${a({placeholder:"Readonly",readonly:!0,value:"Readonly textarea"})}
      </div>
    </div>
  </div>
`,r=w.bind({});r.args={rows:4,size:"default",placeholder:"Enter your message...",value:"",disabled:!1,readonly:!1,maxlength:0,state:"default"};const s=w.bind({});s.args={...r.args,maxlength:200,value:"Textarea with character counter",placeholder:"Max 200 characters"};const l={render:()=>`
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive Textarea Demo</h5>
        <p class="text-muted">Real-time character counter</p>
        
        <label class="form-label" for="interactiveTextarea">Message (max 200 chars)</label>
        <textarea 
          class="form-control" 
          id="interactiveTextarea" 
          rows="4" 
          maxlength="200"
          placeholder="Start typing..."
        ></textarea>
        
        <div class="d-flex justify-content-between mt-2">
          <small class="text-muted">Characters: <span id="charCount">0</span>/200</small>
          <small class="text-muted">Remaining: <span id="remaining">200</span></small>
        </div>
        
        <div class="progress mt-2" style="height: 5px;">
          <div class="progress-bar" id="progressBar" style="width: 0%"></div>
        </div>
        
        <script>
          const textarea = document.getElementById('interactiveTextarea');
          const charCount = document.getElementById('charCount');
          const remaining = document.getElementById('remaining');
          const progressBar = document.getElementById('progressBar');
          
          textarea.addEventListener('input', (e) => {
            const length = e.target.value.length;
            const percent = (length / 200) * 100;
            charCount.textContent = length;
            remaining.textContent = 200 - length;
            progressBar.style.width = percent + '%';
            
            if (percent > 80) {
              progressBar.className = 'progress-bar bg-danger';
            } else if (percent > 50) {
              progressBar.className = 'progress-bar bg-warning';
            } else {
              progressBar.className = 'progress-bar bg-primary';
            }
          });
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `};var i,m,p;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`() => \`
  <div class="row g-3">
    <div class="col-12">
      <h5>Tamanhos</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 500px;">
        \${createTextarea({
  size: 'sm',
  placeholder: 'Small textarea',
  rows: 2
})}
        \${createTextarea({
  placeholder: 'Default textarea',
  rows: 3
})}
        \${createTextarea({
  size: 'lg',
  placeholder: 'Large textarea',
  rows: 4
})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-3" style="max-width: 500px;">
        \${createTextarea({
  placeholder: 'Default',
  value: 'Default state'
})}
        \${createTextarea({
  placeholder: 'Disabled',
  disabled: true,
  value: 'Disabled textarea'
})}
        \${createTextarea({
  placeholder: 'Readonly',
  readonly: true,
  value: 'Readonly textarea'
})}
      </div>
    </div>
  </div>
\``,...(p=(m=n.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,u,x;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const markup = createTextarea(args);
  const charCount = args.maxlength ? \`<small class="text-muted">\${args.value.length}/\${args.maxlength}</small>\` : '';
  return \`
    <div style="max-width: 500px;">
      \${markup}
      \${args.maxlength ? \`<div class="d-flex justify-content-end mt-1">\${charCount}</div>\` : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Textarea').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(x=(u=r.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var h,v,f;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const markup = createTextarea(args);
  const charCount = args.maxlength ? \`<small class="text-muted">\${args.value.length}/\${args.maxlength}</small>\` : '';
  return \`
    <div style="max-width: 500px;">
      \${markup}
      \${args.maxlength ? \`<div class="d-flex justify-content-end mt-1">\${charCount}</div>\` : ''}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Textarea').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(f=(v=s.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var y,b,$;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive Textarea Demo</h5>
        <p class="text-muted">Real-time character counter</p>
        
        <label class="form-label" for="interactiveTextarea">Message (max 200 chars)</label>
        <textarea 
          class="form-control" 
          id="interactiveTextarea" 
          rows="4" 
          maxlength="200"
          placeholder="Start typing..."
        ></textarea>
        
        <div class="d-flex justify-content-between mt-2">
          <small class="text-muted">Characters: <span id="charCount">0</span>/200</small>
          <small class="text-muted">Remaining: <span id="remaining">200</span></small>
        </div>
        
        <div class="progress mt-2" style="height: 5px;">
          <div class="progress-bar" id="progressBar" style="width: 0%"></div>
        </div>
        
        <script>
          const textarea = document.getElementById('interactiveTextarea');
          const charCount = document.getElementById('charCount');
          const remaining = document.getElementById('remaining');
          const progressBar = document.getElementById('progressBar');
          
          textarea.addEventListener('input', (e) => {
            const length = e.target.value.length;
            const percent = (length / 200) * 100;
            charCount.textContent = length;
            remaining.textContent = 200 - length;
            progressBar.style.width = percent + '%';
            
            if (percent > 80) {
              progressBar.className = 'progress-bar bg-danger';
            } else if (percent > 50) {
              progressBar.className = 'progress-bar bg-warning';
            } else {
              progressBar.className = 'progress-bar bg-primary';
            }
          });
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  }
}`,...($=(b=l.parameters)==null?void 0:b.docs)==null?void 0:$.source}}};const L=["Overview","Default","WithCounter","Interactive"];export{r as Default,l as Interactive,n as Overview,s as WithCounter,L as __namedExportsOrder,z as default};
