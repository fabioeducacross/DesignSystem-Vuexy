import{f as N,a as C}from"./snippets-m8t1HIl1.js";const I={title:"Vuexy/Atoms/Forms/Switch",tags:["autodocs"],parameters:{docs:{description:{component:`
# Switch (Toggle)

Toggle switch estilizado do Vuexy para ativação on/off usando Bootstrap 5.

## Quando usar
- Ativação/desativação imediata de funcionalidades
- Configurações de usuário
- Estados binários (on/off, sim/não)

## Variantes
- **Estados**: off, on, disabled
- **Layout**: block (padrão), inline

## Acessibilidade
- Use \`<label>\` associado com \`htmlFor\`
- \`checked\` para estado ON
- \`disabled\` para desabilitar interação
        `}}},argTypes:{checked:{control:"boolean",description:"Estado ON/OFF",table:{defaultValue:{summary:!1}}},disabled:{control:"boolean",description:"Estado desabilitado",table:{defaultValue:{summary:!1}}},label:{control:"text",description:"Texto do label",table:{defaultValue:{summary:"Switch Label"}}},inline:{control:"boolean",description:"Layout inline",table:{defaultValue:{summary:!1}}}}},e=({checked:c=!1,disabled:a=!1,label:O="Switch Label",inline:E=!1,id:d="switch-1"})=>`<div class="form-check form-switch ${E?"form-check-inline":""}">
  <input 
    class="form-check-input" 
    type="checkbox" 
    ${c?"checked":""}
    ${a?"disabled":""}
    id="${d}"
  >
  <label class="form-check-label" for="${d}">
    ${O}
  </label>
</div>`,r=c=>{const a=e(c);return`
    <div style="max-width: 400px;">
      ${a}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${N(a).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${C(a,"Switch").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},i=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-3">
        ${e({label:"Switch OFF",id:"sw-1"})}
        ${e({label:"Switch ON",checked:!0,id:"sw-2"})}
        ${e({label:"Disabled OFF",disabled:!0,id:"sw-3"})}
        ${e({label:"Disabled ON",checked:!0,disabled:!0,id:"sw-4"})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Inline Layout</h5>
      <div>
        ${e({label:"Option 1",inline:!0,id:"sw-inline-1"})}
        ${e({label:"Option 2",inline:!0,checked:!0,id:"sw-inline-2"})}
        ${e({label:"Option 3",inline:!0,id:"sw-inline-3"})}
      </div>
    </div>
  </div>
`,t=r.bind({});t.args={checked:!1,disabled:!1,label:"Switch Label",inline:!1,id:"switch-default"};const s=r.bind({});s.args={...t.args,checked:!0,label:"Switch ON",id:"switch-on"};const n=r.bind({});n.args={...t.args,disabled:!0,label:"Disabled Switch",id:"switch-disabled"};const l={render:()=>`
      <div class="p-4" style="max-width: 400px;">
        <h5>Interactive Switch Demo</h5>
        <p class="text-muted">Toggle switch on/off</p>
        
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="interactiveSwitch">
          <label class="form-check-label" for="interactiveSwitch">Enable notifications</label>
        </div>
        
        <div class="alert mt-3" id="statusAlert" style="display:none;"></div>
        
        <script>
          const switchEl = document.getElementById('interactiveSwitch');
          const alert = document.getElementById('statusAlert');
          switchEl.addEventListener('change', (e) => {
            alert.style.display = 'block';
            if (e.target.checked) {
              alert.className = 'alert alert-success mt-3';
              alert.textContent = '✓ Notifications enabled';
            } else {
              alert.className = 'alert alert-secondary mt-3';
              alert.textContent = 'Notifications disabled';
            }
          });
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `};var o,m,p;i.parameters={...i.parameters,docs:{...(o=i.parameters)==null?void 0:o.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Estados</h5>
      <div class="d-flex flex-column gap-3">
        \${createSwitch({
  label: 'Switch OFF',
  id: 'sw-1'
})}
        \${createSwitch({
  label: 'Switch ON',
  checked: true,
  id: 'sw-2'
})}
        \${createSwitch({
  label: 'Disabled OFF',
  disabled: true,
  id: 'sw-3'
})}
        \${createSwitch({
  label: 'Disabled ON',
  checked: true,
  disabled: true,
  id: 'sw-4'
})}
      </div>
    </div>
    <div class="col-12 mt-4">
      <h5>Inline Layout</h5>
      <div>
        \${createSwitch({
  label: 'Option 1',
  inline: true,
  id: 'sw-inline-1'
})}
        \${createSwitch({
  label: 'Option 2',
  inline: true,
  checked: true,
  id: 'sw-inline-2'
})}
        \${createSwitch({
  label: 'Option 3',
  inline: true,
  id: 'sw-inline-3'
})}
      </div>
    </div>
  </div>
\``,...(p=(m=i.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var h,u,b;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const markup = createSwitch(args);
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
        <pre><code>\${formatReactSnippet(markup, 'Switch').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(b=(u=t.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var v,w,g;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
  const markup = createSwitch(args);
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
        <pre><code>\${formatReactSnippet(markup, 'Switch').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(g=(w=s.parameters)==null?void 0:w.docs)==null?void 0:g.source}}};var f,S,k;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const markup = createSwitch(args);
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
        <pre><code>\${formatReactSnippet(markup, 'Switch').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(k=(S=n.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var y,x,$;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4" style="max-width: 400px;">
        <h5>Interactive Switch Demo</h5>
        <p class="text-muted">Toggle switch on/off</p>
        
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="interactiveSwitch">
          <label class="form-check-label" for="interactiveSwitch">Enable notifications</label>
        </div>
        
        <div class="alert mt-3" id="statusAlert" style="display:none;"></div>
        
        <script>
          const switchEl = document.getElementById('interactiveSwitch');
          const alert = document.getElementById('statusAlert');
          switchEl.addEventListener('change', (e) => {
            alert.style.display = 'block';
            if (e.target.checked) {
              alert.className = 'alert alert-success mt-3';
              alert.textContent = '✓ Notifications enabled';
            } else {
              alert.className = 'alert alert-secondary mt-3';
              alert.textContent = 'Notifications disabled';
            }
          });
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  }
}`,...($=(x=l.parameters)==null?void 0:x.docs)==null?void 0:$.source}}};const D=["Overview","Default","Checked","Disabled","Interactive"];export{s as Checked,t as Default,n as Disabled,l as Interactive,i as Overview,D as __namedExportsOrder,I as default};
