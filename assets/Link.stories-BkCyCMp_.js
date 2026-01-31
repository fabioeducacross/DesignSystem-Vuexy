import{f as k}from"./snippets-m8t1HIl1.js";const f={title:"Atoms/Navigation/Link",tags:["autodocs"],parameters:{docs:{description:{component:`# Link
Link estilizado do Vuexy.`}}},argTypes:{href:{control:"text",table:{defaultValue:{summary:"#"}}},text:{control:"text",table:{defaultValue:{summary:"Link"}}},color:{control:"select",options:["primary","secondary","success","danger","warning","info","dark"],table:{defaultValue:{summary:"primary"}}}}},n=({href:e="#",text:v="Link",color:u="primary"})=>`<a href="${e}" class="link-${u}">${v}</a>`,b=e=>`<div>${n(e)}</div><hr/><details><summary><strong>Code</strong></summary><pre><code>${k(n(e)).replace(/</g,"&lt;")}</code></pre></details>`,s=()=>`<div class="d-flex flex-column gap-2">${["primary","secondary","success","danger","warning","info","dark"].map(e=>n({text:e,color:e})).join(`
`)}</div>`,t=b.bind({});t.args={href:"#",text:"Link Text",color:"primary"};const a={render:()=>`
      <div class="p-4">
        <h5>Interactive Link Demo</h5>
        <p class="text-muted">Toggle visited state</p>
        
        <style>
          #interactiveLink.visited { 
            color: #6f42c1 !important; 
            text-decoration: underline;
          }
        </style>
        
        <div class="mb-3">
          <a href="#" class="link-primary" id="interactiveLink" onclick="event.preventDefault();">Visit this link</a>
          <span class="badge bg-secondary ms-2" id="visitBadge">Not visited</span>
        </div>
        
        <button class="btn btn-outline-primary btn-sm" onclick="
          const link = document.getElementById('interactiveLink');
          const badge = document.getElementById('visitBadge');
          if (link.classList.contains('visited')) {
            link.classList.remove('visited');
            badge.textContent = 'Not visited';
            badge.className = 'badge bg-secondary ms-2';
          } else {
            link.classList.add('visited');
            badge.textContent = 'Visited';
            badge.className = 'badge bg-success ms-2';
          }
        ">Toggle Visited State</button>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `};var i,r,o;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`() => \`<div class="d-flex flex-column gap-2">\${['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'].map(c => createLink({
  text: c,
  color: c
})).join('\\n')}</div>\``,...(o=(r=s.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};var c,d,l;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:"args => `<div>${createLink(args)}</div><hr/><details><summary><strong>Code</strong></summary><pre><code>${formatHtmlSnippet(createLink(args)).replace(/</g, '&lt;')}</code></pre></details>`",...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var m,g,p;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4">
        <h5>Interactive Link Demo</h5>
        <p class="text-muted">Toggle visited state</p>
        
        <style>
          #interactiveLink.visited { 
            color: #6f42c1 !important; 
            text-decoration: underline;
          }
        </style>
        
        <div class="mb-3">
          <a href="#" class="link-primary" id="interactiveLink" onclick="event.preventDefault();">Visit this link</a>
          <span class="badge bg-secondary ms-2" id="visitBadge">Not visited</span>
        </div>
        
        <button class="btn btn-outline-primary btn-sm" onclick="
          const link = document.getElementById('interactiveLink');
          const badge = document.getElementById('visitBadge');
          if (link.classList.contains('visited')) {
            link.classList.remove('visited');
            badge.textContent = 'Not visited';
            badge.className = 'badge bg-secondary ms-2';
          } else {
            link.classList.add('visited');
            badge.textContent = 'Visited';
            badge.className = 'badge bg-success ms-2';
          }
        ">Toggle Visited State</button>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  }
}`,...(p=(g=a.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};const L=["Overview","Default","Interactive"];export{t as Default,a as Interactive,s as Overview,L as __namedExportsOrder,f as default};
