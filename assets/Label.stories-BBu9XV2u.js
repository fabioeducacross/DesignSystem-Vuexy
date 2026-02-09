import{f as q,a as T}from"./snippets-m8t1HIl1.js";const w={title:"Vuexy/Atoms/Forms/Label",tags:["autodocs"],parameters:{docs:{description:{component:`
# Form Label

Label de formulário do Vuexy para identificar campos usando Bootstrap 5.

## Quando usar
- Identificar campos de formulário
- Indicar campos obrigatórios
- Fornecer contexto adicional

## Variantes
- **Estados**: default, com asterisco (required)
- **Tamanhos**: small, default

## Acessibilidade
- Use \`htmlFor\` associando ao \`id\` do input
- Asterisco (*) para campos obrigatórios
- Texto descritivo e claro
        `}}},argTypes:{text:{control:"text",description:"Texto do label",table:{defaultValue:{summary:"Label Text"}}},htmlFor:{control:"text",description:"ID do input associado",table:{defaultValue:{summary:"input-1"}}},required:{control:"boolean",description:"Mostra asterisco obrigatório",table:{defaultValue:{summary:!1}}},size:{control:"select",options:["default","small"],description:"Tamanho do label",table:{defaultValue:{summary:"default"}}}}},o=({text:l="Label Text",htmlFor:t="input-1",required:S=!1,size:k="default"})=>`<label class="form-label ${k==="small"?"small":""}" for="${t}">
  ${l}${S?' <span class="text-danger">*</span>':""}
</label>`,i=l=>{const t=o(l);return`
    <div style="max-width: 400px;">
      ${t}
      <input type="text" class="form-control mt-1" id="${l.htmlFor}" placeholder="Example input">
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${q(t).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${T(t,"Label").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},s=()=>`
  <div class="row g-4" style="max-width: 400px;">
    <div class="col-12">
      <h5>Variações</h5>
      ${o({text:"Default Label",htmlFor:"input-default"})}
      <input type="text" class="form-control mt-1 mb-3" id="input-default">
      
      ${o({text:"Required Field",htmlFor:"input-required",required:!0})}
      <input type="text" class="form-control mt-1 mb-3" id="input-required">
      
      ${o({text:"Small Label",htmlFor:"input-small",size:"small"})}
      <input type="text" class="form-control form-control-sm mt-1" id="input-small">
    </div>
  </div>
`,e=i.bind({});e.args={text:"Label Text",htmlFor:"input-1",required:!1,size:"default"};const a=i.bind({});a.args={...e.args,text:"Required Field",required:!0,htmlFor:"input-required"};const r=i.bind({});r.args={...e.args,text:"Small Label",size:"small",htmlFor:"input-small"};const n={render:()=>`
      <div class="p-4" style="max-width: 400px;">
        <h5>Interactive Label Demo</h5>
        <p class="text-muted">Toggle required indicator</p>
        
        <label class="form-label" for="interactive-input" id="labelEl">
          Field Name
        </label>
        <input type="text" class="form-control" id="interactive-input" placeholder="Enter value">
        
        <button class="btn btn-outline-primary btn-sm mt-3" onclick="
          const label = document.getElementById('labelEl');
          const asterisk = label.querySelector('.text-danger');
          if (asterisk) {
            asterisk.remove();
          } else {
            label.innerHTML += ' <span class="text-danger">*</span>';
          }
        ">Toggle Required *</button>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `};var c,m,d;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`() => \`
  <div class="row g-4" style="max-width: 400px;">
    <div class="col-12">
      <h5>Variações</h5>
      \${createLabel({
  text: 'Default Label',
  htmlFor: 'input-default'
})}
      <input type="text" class="form-control mt-1 mb-3" id="input-default">
      
      \${createLabel({
  text: 'Required Field',
  htmlFor: 'input-required',
  required: true
})}
      <input type="text" class="form-control mt-1 mb-3" id="input-required">
      
      \${createLabel({
  text: 'Small Label',
  htmlFor: 'input-small',
  size: 'small'
})}
      <input type="text" class="form-control form-control-sm mt-1" id="input-small">
    </div>
  </div>
\``,...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var p,u,b;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  const markup = createLabel(args);
  return \`
    <div style="max-width: 400px;">
      \${markup}
      <input type="text" class="form-control mt-1" id="\${args.htmlFor}" placeholder="Example input">
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Label').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(b=(u=e.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var g,x,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const markup = createLabel(args);
  return \`
    <div style="max-width: 400px;">
      \${markup}
      <input type="text" class="form-control mt-1" id="\${args.htmlFor}" placeholder="Example input">
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Label').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(h=(x=a.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var f,v,y;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const markup = createLabel(args);
  return \`
    <div style="max-width: 400px;">
      \${markup}
      <input type="text" class="form-control mt-1" id="\${args.htmlFor}" placeholder="Example input">
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Label').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(y=(v=r.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var L,$,F;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4" style="max-width: 400px;">
        <h5>Interactive Label Demo</h5>
        <p class="text-muted">Toggle required indicator</p>
        
        <label class="form-label" for="interactive-input" id="labelEl">
          Field Name
        </label>
        <input type="text" class="form-control" id="interactive-input" placeholder="Enter value">
        
        <button class="btn btn-outline-primary btn-sm mt-3" onclick="
          const label = document.getElementById('labelEl');
          const asterisk = label.querySelector('.text-danger');
          if (asterisk) {
            asterisk.remove();
          } else {
            label.innerHTML += ' <span class=\\"text-danger\\">*</span>';
          }
        ">Toggle Required *</button>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  }
}`,...(F=($=n.parameters)==null?void 0:$.docs)==null?void 0:F.source}}};const I=["Overview","Default","Required","Small","Interactive"];export{e as Default,n as Interactive,s as Overview,a as Required,r as Small,I as __namedExportsOrder,w as default};
