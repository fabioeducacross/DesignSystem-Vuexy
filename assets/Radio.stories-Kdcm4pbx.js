import{f as L,a as D}from"./snippets-m8t1HIl1.js";const A={title:"Atoms/Forms/Radio",tags:["autodocs"],parameters:{docs:{description:{component:`
# Radio Button

Radio button estilizado do Vuexy para seleção única usando Bootstrap 5.

## Quando usar
- Seleção única entre múltiplas opções
- Grupos de escolha exclusiva
- Filtros e configurações

## Variantes
- **Estados**: unchecked, checked, disabled
- **Layout**: block (padrão), inline

## Acessibilidade
- Use \`<label>\` associado com \`htmlFor\`
- Agrupe radios com \`name\` idêntico
- \`disabled\` para desabilitar interação
        `}}},argTypes:{checked:{control:"boolean",description:"Estado selecionado",table:{defaultValue:{summary:!1}}},disabled:{control:"boolean",description:"Estado desabilitado",table:{defaultValue:{summary:!1}}},label:{control:"text",description:"Texto do label",table:{defaultValue:{summary:"Radio Label"}}},name:{control:"text",description:"Nome do grupo (agrupa radios)",table:{defaultValue:{summary:"radio-group"}}},inline:{control:"boolean",description:"Layout inline",table:{defaultValue:{summary:!1}}}}},e=({checked:d=!1,disabled:n=!1,label:O="Radio Label",name:C="radio-group",inline:E=!1,id:c="radio-1"})=>`<div class="form-check ${E?"form-check-inline":""}">
  <input 
    class="form-check-input" 
    type="radio" 
    name="${C}"
    ${d?"checked":""}
    ${n?"disabled":""}
    id="${c}"
  >
  <label class="form-check-label" for="${c}">
    ${O}
  </label>
</div>`,l=d=>{const n=e(d);return`
    <div style="max-width: 400px;">
      ${n}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${L(n).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${D(n,"Radio").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},t=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-2">
        ${e({label:"Unchecked",name:"demo1",id:"radio-1"})}
        ${e({label:"Checked",checked:!0,name:"demo2",id:"radio-2"})}
        ${e({label:"Disabled",disabled:!0,name:"demo3",id:"radio-3"})}
        ${e({label:"Disabled Checked",checked:!0,disabled:!0,name:"demo4",id:"radio-4"})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Grupo (seleção única)</h5>
      <div class="d-flex flex-column gap-2">
        ${e({label:"Option 1",name:"group1",checked:!0,id:"radio-g1"})}
        ${e({label:"Option 2",name:"group1",id:"radio-g2"})}
        ${e({label:"Option 3",name:"group1",id:"radio-g3"})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Inline Layout</h5>
      <div>
        ${e({label:"Option A",name:"group2",inline:!0,id:"radio-inline-1"})}
        ${e({label:"Option B",name:"group2",inline:!0,id:"radio-inline-2"})}
        ${e({label:"Option C",name:"group2",inline:!0,id:"radio-inline-3"})}
      </div>
    </div>
  </div>
`,a=l.bind({});a.args={checked:!1,disabled:!1,label:"Radio Label",name:"radio-group",inline:!1,id:"radio-default"};const r={render:()=>`
      <div class="p-4" style="max-width: 400px;">
        <h5>Interactive Radio Group Demo</h5>
        <p class="text-muted">Select an option (radio group behavior)</p>
        
        <div class="d-flex flex-column gap-2">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="interactiveRadio" id="radio-opt1" checked>
            <label class="form-check-label" for="radio-opt1">Option 1</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="interactiveRadio" id="radio-opt2">
            <label class="form-check-label" for="radio-opt2">Option 2</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="interactiveRadio" id="radio-opt3">
            <label class="form-check-label" for="radio-opt3">Option 3</label>
          </div>
        </div>
        
        <div class="alert alert-info mt-3" id="selection">Selected: Option 1</div>
        
        <script>
          document.querySelectorAll('input[name="interactiveRadio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
              const label = e.target.nextElementSibling.textContent;
              document.getElementById('selection').textContent = 'Selected: ' + label;
            });
          });
        <\/script>
        
        <small class="d-block mt-2 text-muted">Interactive demo via controlled state</small>
      </div>
    `},i=l.bind({});i.args={...a.args,checked:!0,label:"Checked Radio",id:"radio-checked"};const o=l.bind({});o.args={...a.args,disabled:!0,label:"Disabled Radio",id:"radio-disabled"};var s,p,m;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-2">
        \${createRadio({
  label: 'Unchecked',
  name: 'demo1',
  id: 'radio-1'
})}
        \${createRadio({
  label: 'Checked',
  checked: true,
  name: 'demo2',
  id: 'radio-2'
})}
        \${createRadio({
  label: 'Disabled',
  disabled: true,
  name: 'demo3',
  id: 'radio-3'
})}
        \${createRadio({
  label: 'Disabled Checked',
  checked: true,
  disabled: true,
  name: 'demo4',
  id: 'radio-4'
})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Grupo (seleção única)</h5>
      <div class="d-flex flex-column gap-2">
        \${createRadio({
  label: 'Option 1',
  name: 'group1',
  checked: true,
  id: 'radio-g1'
})}
        \${createRadio({
  label: 'Option 2',
  name: 'group1',
  id: 'radio-g2'
})}
        \${createRadio({
  label: 'Option 3',
  name: 'group1',
  id: 'radio-g3'
})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Inline Layout</h5>
      <div>
        \${createRadio({
  label: 'Option A',
  name: 'group2',
  inline: true,
  id: 'radio-inline-1'
})}
        \${createRadio({
  label: 'Option B',
  name: 'group2',
  inline: true,
  id: 'radio-inline-2'
})}
        \${createRadio({
  label: 'Option C',
  name: 'group2',
  inline: true,
  id: 'radio-inline-3'
})}
      </div>
    </div>
  </div>
\``,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,h,v;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const markup = createRadio(args);
  return \`
    <div style="max-width: 400px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Radio').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(v=(h=a.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var b,g,f;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4" style="max-width: 400px;">
        <h5>Interactive Radio Group Demo</h5>
        <p class="text-muted">Select an option (radio group behavior)</p>
        
        <div class="d-flex flex-column gap-2">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="interactiveRadio" id="radio-opt1" checked>
            <label class="form-check-label" for="radio-opt1">Option 1</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="interactiveRadio" id="radio-opt2">
            <label class="form-check-label" for="radio-opt2">Option 2</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="interactiveRadio" id="radio-opt3">
            <label class="form-check-label" for="radio-opt3">Option 3</label>
          </div>
        </div>
        
        <div class="alert alert-info mt-3" id="selection">Selected: Option 1</div>
        
        <script>
          document.querySelectorAll('input[name="interactiveRadio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
              const label = e.target.nextElementSibling.textContent;
              document.getElementById('selection').textContent = 'Selected: ' + label;
            });
          });
        <\/script>
        
        <small class="d-block mt-2 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  }
}`,...(f=(g=r.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var k,R,x;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`args => {
  const markup = createRadio(args);
  return \`
    <div style="max-width: 400px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Radio').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(x=(R=i.parameters)==null?void 0:R.docs)==null?void 0:x.source}}};var y,$,S;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const markup = createRadio(args);
  return \`
    <div style="max-width: 400px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'Radio').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(S=($=o.parameters)==null?void 0:$.docs)==null?void 0:S.source}}};const H=["Overview","Default","Interactive","Checked","Disabled"];export{i as Checked,a as Default,o as Disabled,r as Interactive,t as Overview,H as __namedExportsOrder,A as default};
