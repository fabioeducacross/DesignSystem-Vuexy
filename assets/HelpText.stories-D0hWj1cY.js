import{f as M,a as D}from"./snippets-m8t1HIl1.js";const R={title:"Atoms/Forms/HelpText",tags:["autodocs"],parameters:{docs:{description:{component:`
# Help Text

Texto auxiliar para fornecer contexto adicional em campos de formulário.

## Quando usar
- Explicar formato esperado (ex: "Use formato DD/MM/YYYY")
- Fornecer dicas ao usuário
- Mostrar requisitos de senha
- Exibir contador de caracteres

## Características
- Classe Bootstrap: \`.form-text\`
- Cor suave (muted)
- Fonte menor que o campo
- Associado via \`aria-describedby\`

## Acessibilidade
- Vinculado ao input via ID
- Anunciado por screen readers
- Não substitui o label obrigatório
        `}}},argTypes:{text:{control:"text",description:"Texto de ajuda",table:{defaultValue:{summary:"Help text goes here"}}},muted:{control:"boolean",description:"Usa cor muted",table:{defaultValue:{summary:!0}}},icon:{control:"text",description:"Ícone Boxicons (opcional)",table:{defaultValue:{summary:""}}}}},t=({text:a="Help text goes here",muted:r=!0,icon:d=""})=>{const k=r?"text-muted":"",C=d?`<i class="bx ${d} me-1"></i>`:"";return`<div class="form-text ${k}">
  ${C}${a}
</div>`},c=a=>{const r=t(a);return`
    <div class="mb-3" style="max-width: 400px;">
      <label for="exampleInput" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInput" aria-describedby="emailHelp">
      ${r}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${M(r).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${D(r,"HelpText").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},o=()=>`
  <div class="row g-4">
    <div class="col-md-6">
      <h5>Basic Help Text</h5>
      <div class="mb-3">
        <label for="email1" class="form-label">Email</label>
        <input type="email" class="form-control" id="email1">
        ${t({text:"We'll never share your email with anyone else."})}
      </div>
    </div>
    
    <div class="col-md-6">
      <h5>With Icon</h5>
      <div class="mb-3">
        <label for="password1" class="form-label">Password</label>
        <input type="password" class="form-control" id="password1">
        ${t({text:"Must be 8+ characters with uppercase, lowercase & number",icon:"bx-info-circle"})}
      </div>
    </div>
    
    <div class="col-md-6">
      <h5>Character Counter</h5>
      <div class="mb-3">
        <label for="bio1" class="form-label">Bio</label>
        <textarea class="form-control" id="bio1" rows="3"></textarea>
        ${t({text:"0 / 200 characters",icon:"bx-text"})}
      </div>
    </div>
    
    <div class="col-md-6">
      <h5>Format Example</h5>
      <div class="mb-3">
        <label for="phone1" class="form-label">Phone</label>
        <input type="tel" class="form-control" id="phone1">
        ${t({text:"Format: (XX) XXXXX-XXXX",icon:"bx-phone"})}
      </div>
    </div>
  </div>
`,e=c.bind({});e.args={text:"We'll never share your email with anyone else.",muted:!0,icon:""};const s=c.bind({});s.args={...e.args,text:"Must be 8+ characters with uppercase, lowercase and number",icon:"bx-info-circle"};const l=c.bind({});l.args={...e.args,text:"0 / 200 characters",icon:"bx-text"};const n=c.bind({});n.args={...e.args,text:"Format: (XX) XXXXX-XXXX",icon:"bx-phone"};const i=()=>{const a="helptext-interactive-"+Math.random().toString(36).substr(2,9);return`
    <div id="${a}" style="max-width: 500px;">
      <div class="alert alert-info mb-4">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Select help text type to see different variations.
      </div>
      
      <div class="card mb-4">
        <div class="card-body">
          <label class="form-label">Help Text Type:</label>
          <select class="form-select" onchange="
            const helpTexts = {
              info: '<div class=\\'form-text text-muted\\'><i class=\\'bx bx-info-circle me-1\\'></i>Use format: name@example.com</div>',
              warning: '<div class=\\'form-text text-warning\\'><i class=\\'bx bx-error me-1\\'></i>Password must be at least 8 characters</div>',
              success: '<div class=\\'form-text text-success\\'><i class=\\'bx bx-check-circle me-1\\'></i>Valid format!</div>',
              error: '<div class=\\'form-text text-danger\\'><i class=\\'bx bx-x-circle me-1\\'></i>This field is required</div>'
            };
            document.getElementById('helpDemo-${a}').innerHTML = helpTexts[this.value];
          ">
            <option value="info">Info (Default)</option>
            <option value="warning">Warning</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>
      
      <div class="card">
        <div class="card-body">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-control" placeholder="Enter email">
          <div id="helpDemo-${a}" class="form-text text-muted">
            <i class="bx bx-info-circle me-1"></i>Use format: name@example.com
          </div>
        </div>
      </div>
    </div>
  `};var m,p,u;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-md-6">
      <h5>Basic Help Text</h5>
      <div class="mb-3">
        <label for="email1" class="form-label">Email</label>
        <input type="email" class="form-control" id="email1">
        \${createHelpText({
  text: 'We\\'ll never share your email with anyone else.'
})}
      </div>
    </div>
    
    <div class="col-md-6">
      <h5>With Icon</h5>
      <div class="mb-3">
        <label for="password1" class="form-label">Password</label>
        <input type="password" class="form-control" id="password1">
        \${createHelpText({
  text: 'Must be 8+ characters with uppercase, lowercase & number',
  icon: 'bx-info-circle'
})}
      </div>
    </div>
    
    <div class="col-md-6">
      <h5>Character Counter</h5>
      <div class="mb-3">
        <label for="bio1" class="form-label">Bio</label>
        <textarea class="form-control" id="bio1" rows="3"></textarea>
        \${createHelpText({
  text: '0 / 200 characters',
  icon: 'bx-text'
})}
      </div>
    </div>
    
    <div class="col-md-6">
      <h5>Format Example</h5>
      <div class="mb-3">
        <label for="phone1" class="form-label">Phone</label>
        <input type="tel" class="form-control" id="phone1">
        \${createHelpText({
  text: 'Format: (XX) XXXXX-XXXX',
  icon: 'bx-phone'
})}
      </div>
    </div>
  </div>
\``,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var x,b,v;e.parameters={...e.parameters,docs:{...(x=e.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const markup = createHelpText(args);
  return \`
    <div class="mb-3" style="max-width: 400px;">
      <label for="exampleInput" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInput" aria-describedby="emailHelp">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'HelpText').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(v=(b=e.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var f,h,g;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const markup = createHelpText(args);
  return \`
    <div class="mb-3" style="max-width: 400px;">
      <label for="exampleInput" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInput" aria-describedby="emailHelp">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'HelpText').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(g=(h=s.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var y,H,T;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const markup = createHelpText(args);
  return \`
    <div class="mb-3" style="max-width: 400px;">
      <label for="exampleInput" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInput" aria-describedby="emailHelp">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'HelpText').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(T=(H=l.parameters)==null?void 0:H.docs)==null?void 0:T.source}}};var w,X,$;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const markup = createHelpText(args);
  return \`
    <div class="mb-3" style="max-width: 400px;">
      <label for="exampleInput" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInput" aria-describedby="emailHelp">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'HelpText').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...($=(X=n.parameters)==null?void 0:X.docs)==null?void 0:$.source}}};var I,S,E;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const containerId = 'helptext-interactive-' + Math.random().toString(36).substr(2, 9);
  return \`
    <div id="\${containerId}" style="max-width: 500px;">
      <div class="alert alert-info mb-4">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Select help text type to see different variations.
      </div>
      
      <div class="card mb-4">
        <div class="card-body">
          <label class="form-label">Help Text Type:</label>
          <select class="form-select" onchange="
            const helpTexts = {
              info: '<div class=\\\\'form-text text-muted\\\\'><i class=\\\\'bx bx-info-circle me-1\\\\'></i>Use format: name@example.com</div>',
              warning: '<div class=\\\\'form-text text-warning\\\\'><i class=\\\\'bx bx-error me-1\\\\'></i>Password must be at least 8 characters</div>',
              success: '<div class=\\\\'form-text text-success\\\\'><i class=\\\\'bx bx-check-circle me-1\\\\'></i>Valid format!</div>',
              error: '<div class=\\\\'form-text text-danger\\\\'><i class=\\\\'bx bx-x-circle me-1\\\\'></i>This field is required</div>'
            };
            document.getElementById('helpDemo-\${containerId}').innerHTML = helpTexts[this.value];
          ">
            <option value="info">Info (Default)</option>
            <option value="warning">Warning</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>
      
      <div class="card">
        <div class="card-body">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-control" placeholder="Enter email">
          <div id="helpDemo-\${containerId}" class="form-text text-muted">
            <i class="bx bx-info-circle me-1"></i>Use format: name@example.com
          </div>
        </div>
      </div>
    </div>
  \`;
}`,...(E=(S=i.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};const W=["Overview","Default","WithIcon","CharacterCounter","FormatExample","Interactive"];export{l as CharacterCounter,e as Default,n as FormatExample,i as Interactive,o as Overview,s as WithIcon,W as __namedExportsOrder,R as default};
