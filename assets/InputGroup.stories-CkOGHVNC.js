import{f as v}from"./snippets-m8t1HIl1.js";const y={title:"Molecules/Forms/InputGroup",tags:["autodocs"],parameters:{docs:{description:{component:"# Input Group - Input com addon/button"}}},argTypes:{prepend:{control:"text",table:{defaultValue:{summary:""}}},append:{control:"text",table:{defaultValue:{summary:""}}},placeholder:{control:"text",table:{defaultValue:{summary:""}}}}},n=({prepend:e="@",append:a="",placeholder:g="Username"})=>`<div class="input-group">
  ${e?`<span class="input-group-text">${e}</span>`:""}
  <input type="text" class="form-control" placeholder="${g}">
  ${a?`<span class="input-group-text">${a}</span>`:""}
</div>`,b=e=>`${n(e)}<hr/><details><summary><strong>Code</strong></summary><pre><code>${v(n(e)).replace(/</g,"&lt;")}</code></pre></details>`,r=()=>`<div class="d-flex flex-column gap-3" style="max-width:400px">${n({prepend:"@",placeholder:"Username"})}${n({append:".com",placeholder:"Website"})}${n({prepend:"$",append:".00",placeholder:"0.00"})}</div>`,t=b.bind({});t.args={prepend:"@",append:"",placeholder:"Username"};const s={render:()=>`
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
    `};var p,o,c;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`() => \`<div class="d-flex flex-column gap-3" style="max-width:400px">\${createInputGroup({
  prepend: '@',
  placeholder: 'Username'
})}\${createInputGroup({
  append: '.com',
  placeholder: 'Website'
})}\${createInputGroup({
  prepend: '$',
  append: '.00',
  placeholder: '0.00'
})}</div>\``,...(c=(o=r.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var l,u,i;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:"args => `${createInputGroup(args)}<hr/><details><summary><strong>Code</strong></summary><pre><code>${formatHtmlSnippet(createInputGroup(args)).replace(/</g, '&lt;')}</code></pre></details>`",...(i=(u=t.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var d,m,x;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
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
  }
}`,...(x=(m=s.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};const f=["Overview","Default","Interactive"];export{t as Default,s as Interactive,r as Overview,f as __namedExportsOrder,y as default};
