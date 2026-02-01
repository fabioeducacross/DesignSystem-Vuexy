import{f as g}from"./snippets-m8t1HIl1.js";const y={title:"Molecules/Forms/InputGroup",tags:["autodocs"],parameters:{docs:{description:{component:"# Input Group - Input com addon/button"}}},argTypes:{prepend:{control:"text",table:{defaultValue:{summary:""}}},append:{control:"text",table:{defaultValue:{summary:""}}},placeholder:{control:"text",table:{defaultValue:{summary:""}}}}},n=({prepend:e="@",append:r="",placeholder:b="Username"})=>`<div class="input-group">
  ${e?`<span class="input-group-text">${e}</span>`:""}
  <input type="text" class="form-control" placeholder="${b}">
  ${r?`<span class="input-group-text">${r}</span>`:""}
</div>`,v=e=>`${n(e)}<hr/><details><summary><strong>Code</strong></summary><pre><code>${g(n(e)).replace(/</g,"&lt;")}</code></pre></details>`,s=()=>`<div class="d-flex flex-column gap-3" style="max-width:400px">${n({prepend:"@",placeholder:"Username"})}${n({append:".com",placeholder:"Website"})}${n({prepend:"$",append:".00",placeholder:"0.00"})}</div>`,t=v.bind({});t.args={prepend:"@",append:"",placeholder:"Username"};const p={render:()=>`
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive InputGroup Demo</h5>
        <p class="text-muted">Click addon to focus input</p>
        
        <div class="input-group mb-3">
          <span class="input-group-text" onclick="document.getElementById('inp1').focus()" style="cursor:pointer;">
            <i class="bx bx-user"></i>
          </span>
          <input type="text" class="form-control" id="inp1" placeholder="Username">
        </div>
        
        <div class="input-group mb-3">
          <span class="input-group-text" onclick="document.getElementById('inp2').focus()" style="cursor:pointer;">$</span>
          <input type="number" class="form-control" id="inp2" placeholder="0.00">
          <span class="input-group-text">.00</span>
        </div>
        
        <div class="input-group">
          <input type="text" class="form-control" id="inp3" placeholder="Search...">
          <button class="btn btn-primary" onclick="alert('Searching: ' + document.getElementById('inp3').value)">
            <i class="bx bx-search"></i>
          </button>
        </div>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `,parameters:{docs:{source:{code:`<div class="input-group mb-3">
  <span class="input-group-text">
    <i class="bx bx-user"></i>
  </span>
  <input type="text" class="form-control" placeholder="Username">
</div>

<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="number" class="form-control" placeholder="0.00">
  <span class="input-group-text">.00</span>
</div>

<div class="input-group">
  <input type="text" class="form-control" placeholder="Search...">
  <button class="btn btn-primary">
    <i class="bx bx-search"></i>
  </button>
</div>`}}}};var a,o,c;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`() => \`<div class="d-flex flex-column gap-3" style="max-width:400px">\${createInputGroup({
  prepend: '@',
  placeholder: 'Username'
})}\${createInputGroup({
  append: '.com',
  placeholder: 'Website'
})}\${createInputGroup({
  prepend: '$',
  append: '.00',
  placeholder: '0.00'
})}</div>\``,...(c=(o=s.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var l,u,i;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:"args => `${createInputGroup(args)}<hr/><details><summary><strong>Code</strong></summary><pre><code>${formatHtmlSnippet(createInputGroup(args)).replace(/</g, '&lt;')}</code></pre></details>`",...(i=(u=t.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var d,m,x;p.parameters={...p.parameters,docs:{...(d=p.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    const code = \`<div class="input-group mb-3">
  <span class="input-group-text">
    <i class="bx bx-user"></i>
  </span>
  <input type="text" class="form-control" placeholder="Username">
</div>

<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="number" class="form-control" placeholder="0.00">
  <span class="input-group-text">.00</span>
</div>

<div class="input-group">
  <input type="text" class="form-control" placeholder="Search...">
  <button class="btn btn-primary">
    <i class="bx bx-search"></i>
  </button>
</div>\`;
    return \`
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive InputGroup Demo</h5>
        <p class="text-muted">Click addon to focus input</p>
        
        <div class="input-group mb-3">
          <span class="input-group-text" onclick="document.getElementById('inp1').focus()" style="cursor:pointer;">
            <i class="bx bx-user"></i>
          </span>
          <input type="text" class="form-control" id="inp1" placeholder="Username">
        </div>
        
        <div class="input-group mb-3">
          <span class="input-group-text" onclick="document.getElementById('inp2').focus()" style="cursor:pointer;">$</span>
          <input type="number" class="form-control" id="inp2" placeholder="0.00">
          <span class="input-group-text">.00</span>
        </div>
        
        <div class="input-group">
          <input type="text" class="form-control" id="inp3" placeholder="Search...">
          <button class="btn btn-primary" onclick="alert('Searching: ' + document.getElementById('inp3').value)">
            <i class="bx bx-search"></i>
          </button>
        </div>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  },
  parameters: {
    docs: {
      source: {
        code: \`<div class="input-group mb-3">
  <span class="input-group-text">
    <i class="bx bx-user"></i>
  </span>
  <input type="text" class="form-control" placeholder="Username">
</div>

<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="number" class="form-control" placeholder="0.00">
  <span class="input-group-text">.00</span>
</div>

<div class="input-group">
  <input type="text" class="form-control" placeholder="Search...">
  <button class="btn btn-primary">
    <i class="bx bx-search"></i>
  </button>
</div>\`
      }
    }
  }
}`,...(x=(m=p.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};const f=["Overview","Default","Interactive"];export{t as Default,p as Interactive,s as Overview,f as __namedExportsOrder,y as default};
