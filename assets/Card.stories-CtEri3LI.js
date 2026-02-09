import{f as y}from"./snippets-m8t1HIl1.js";const g={title:"Vuexy/Molecules/Surfaces/Card",tags:["autodocs"],parameters:{docs:{description:{component:"# Card - Container de conteúdo do Vuexy"}}},argTypes:{title:{control:"text",table:{defaultValue:{summary:"Card Title"}}},body:{control:"text",table:{defaultValue:{summary:"Card body content"}}},footer:{control:"text",table:{defaultValue:{summary:""}}}}},r=({title:t="Card Title",body:b="Card body content goes here. This is some example text.",footer:o=""})=>`<div class="card">
  <div class="card-header">${t}</div>
  <div class="card-body">${b}</div>
  ${o?`<div class="card-footer">${o}</div>`:""}
</div>`,h=t=>`${r(t)}<hr/><details><summary><strong>Code</strong></summary><pre><code>${y(r(t)).replace(/</g,"&lt;")}</code></pre></details>`,a=()=>`<div class="row g-3"><div class="col-6">${r({title:"Simple Card",body:"Basic card with header and body"})}</div><div class="col-6">${r({title:"With Footer",body:"Card with footer",footer:"Card Footer"})}</div></div>`,e=h.bind({});e.args={title:"Card Title",body:"Card body content",footer:""};const d={render:()=>`
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive Card Demo</h5>
        <p class="text-muted">Expand/collapse card content</p>
        
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center" onclick="toggleCard()" style="cursor:pointer;">
            <span>Collapsible Card</span>
            <i class="bx bx-chevron-down" id="chevron"></i>
          </div>
          <div class="card-body" id="cardBody">
            <h5 class="card-title">Card Content</h5>
            <p class="card-text">This is the card body content that can be collapsed. Click the header to toggle visibility.</p>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button class="btn btn-primary btn-sm">Action</button>
          </div>
        </div>
        
        <script>
          let isExpanded = true;
          
          function toggleCard() {
            const body = document.getElementById('cardBody');
            const chevron = document.getElementById('chevron');
            
            if (isExpanded) {
              body.style.display = 'none';
              chevron.className = 'bx bx-chevron-right';
            } else {
              body.style.display = 'block';
              chevron.className = 'bx bx-chevron-down';
            }
            
            isExpanded = !isExpanded;
          }
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `};var s,n,c;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`() => \`<div class="row g-3"><div class="col-6">\${createCard({
  title: 'Simple Card',
  body: 'Basic card with header and body'
})}</div><div class="col-6">\${createCard({
  title: 'With Footer',
  body: 'Card with footer',
  footer: 'Card Footer'
})}</div></div>\``,...(c=(n=a.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var i,l,p;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:"args => `${createCard(args)}<hr/><details><summary><strong>Code</strong></summary><pre><code>${formatHtmlSnippet(createCard(args)).replace(/</g, '&lt;')}</code></pre></details>`",...(p=(l=e.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var m,v,u;d.parameters={...d.parameters,docs:{...(m=d.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive Card Demo</h5>
        <p class="text-muted">Expand/collapse card content</p>
        
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center" onclick="toggleCard()" style="cursor:pointer;">
            <span>Collapsible Card</span>
            <i class="bx bx-chevron-down" id="chevron"></i>
          </div>
          <div class="card-body" id="cardBody">
            <h5 class="card-title">Card Content</h5>
            <p class="card-text">This is the card body content that can be collapsed. Click the header to toggle visibility.</p>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button class="btn btn-primary btn-sm">Action</button>
          </div>
        </div>
        
        <script>
          let isExpanded = true;
          
          function toggleCard() {
            const body = document.getElementById('cardBody');
            const chevron = document.getElementById('chevron');
            
            if (isExpanded) {
              body.style.display = 'none';
              chevron.className = 'bx bx-chevron-right';
            } else {
              body.style.display = 'block';
              chevron.className = 'bx bx-chevron-down';
            }
            
            isExpanded = !isExpanded;
          }
        <\/script>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  }
}`,...(u=(v=d.parameters)==null?void 0:v.docs)==null?void 0:u.source}}};const C=["Overview","Default","Interactive"];export{e as Default,d as Interactive,a as Overview,C as __namedExportsOrder,g as default};
