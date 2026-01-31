import{f as B}from"./snippets-m8t1HIl1.js";const $={title:"Atoms/Actions/IconButton",tags:["autodocs"],parameters:{docs:{description:{component:"# Icon Button - Botão apenas com ícone do Vuexy"}}},argTypes:{variant:{control:"select",options:["primary","secondary","success","danger","warning","info","dark"],table:{defaultValue:{summary:"primary"}}},outline:{control:"boolean",table:{defaultValue:{summary:!1}}},size:{control:"select",options:["sm","default","lg"],table:{defaultValue:{summary:"default"}}},icon:{control:"text",table:{defaultValue:{summary:"bx bx-heart"}}}}},o=({variant:t="primary",outline:I=!1,size:c="default",icon:h="bx bx-heart"})=>`<button type="button" class="btn btn-icon ${I?`btn-outline-${t}`:`btn-${t}`} ${c==="sm"?"btn-sm":c==="lg"?"btn-lg":""}"><i class="${h}"></i></button>`,f=t=>`<div>${o(t)}</div><hr/><details><summary><strong>Code</strong></summary><pre><code>${B(o(t)).replace(/</g,"&lt;")}</code></pre></details>`,s=()=>`<div class="d-flex gap-2">${["primary","success","danger","warning","info"].map(t=>o({variant:t,icon:"bx bx-heart"})).join(`
`)}</div>`,e=f.bind({});e.args={variant:"primary",outline:!1,size:"default",icon:"bx bx-heart"};const n=f.bind({});n.args={variant:"primary",outline:!0,size:"default",icon:"bx bx-star"};const a={render:()=>`
      <div class="p-4">
        <h5>Interactive Icon Button Demo</h5>
        <p class="text-muted">Toggle state and change icon dynamically</p>
        
        <div class="d-flex gap-3 align-items-center mb-3">
          <button type="button" class="btn btn-icon btn-primary" id="iconBtn">
            <i class="bx bx-heart" id="iconEl"></i>
          </button>
          <span id="statusText" class="badge bg-success">Enabled</span>
        </div>
        
        <div class="btn-group" role="group">
          <button class="btn btn-outline-secondary btn-sm" onclick="
            const btn = document.getElementById('iconBtn');
            const status = document.getElementById('statusText');
            if (btn.disabled) {
              btn.disabled = false;
              status.textContent = 'Enabled';
              status.className = 'badge bg-success';
            } else {
              btn.disabled = true;
              status.textContent = 'Disabled';
              status.className = 'badge bg-secondary';
            }
          ">Toggle Disabled</button>
          
          <button class="btn btn-outline-secondary btn-sm" onclick="
            const icons = ['bx-heart', 'bx-star', 'bx-like', 'bx-bell', 'bx-bookmark'];
            const iconEl = document.getElementById('iconEl');
            const current = iconEl.className.split(' ').find(c => c.startsWith('bx-'));
            const currentIndex = icons.indexOf(current);
            const nextIndex = (currentIndex + 1) % icons.length;
            iconEl.className = 'bx ' + icons[nextIndex];
          ">Change Icon</button>
        </div>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `};var r,l,i;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`() => \`<div class="d-flex gap-2">\${['primary', 'success', 'danger', 'warning', 'info'].map(c => createIconButton({
  variant: c,
  icon: 'bx bx-heart'
})).join('\\n')}</div>\``,...(i=(l=s.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var d,u,b;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:"args => `<div>${createIconButton(args)}</div><hr/><details><summary><strong>Code</strong></summary><pre><code>${formatHtmlSnippet(createIconButton(args)).replace(/</g, '&lt;')}</code></pre></details>`",...(b=(u=e.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var m,p,g;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:"args => `<div>${createIconButton(args)}</div><hr/><details><summary><strong>Code</strong></summary><pre><code>${formatHtmlSnippet(createIconButton(args)).replace(/</g, '&lt;')}</code></pre></details>`",...(g=(p=n.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var x,y,v;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4">
        <h5>Interactive Icon Button Demo</h5>
        <p class="text-muted">Toggle state and change icon dynamically</p>
        
        <div class="d-flex gap-3 align-items-center mb-3">
          <button type="button" class="btn btn-icon btn-primary" id="iconBtn">
            <i class="bx bx-heart" id="iconEl"></i>
          </button>
          <span id="statusText" class="badge bg-success">Enabled</span>
        </div>
        
        <div class="btn-group" role="group">
          <button class="btn btn-outline-secondary btn-sm" onclick="
            const btn = document.getElementById('iconBtn');
            const status = document.getElementById('statusText');
            if (btn.disabled) {
              btn.disabled = false;
              status.textContent = 'Enabled';
              status.className = 'badge bg-success';
            } else {
              btn.disabled = true;
              status.textContent = 'Disabled';
              status.className = 'badge bg-secondary';
            }
          ">Toggle Disabled</button>
          
          <button class="btn btn-outline-secondary btn-sm" onclick="
            const icons = ['bx-heart', 'bx-star', 'bx-like', 'bx-bell', 'bx-bookmark'];
            const iconEl = document.getElementById('iconEl');
            const current = iconEl.className.split(' ').find(c => c.startsWith('bx-'));
            const currentIndex = icons.indexOf(current);
            const nextIndex = (currentIndex + 1) % icons.length;
            iconEl.className = 'bx ' + icons[nextIndex];
          ">Change Icon</button>
        </div>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  }
}`,...(v=(y=a.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};const T=["Overview","Default","Outline","Interactive"];export{e as Default,a as Interactive,n as Outline,s as Overview,T as __namedExportsOrder,$ as default};
