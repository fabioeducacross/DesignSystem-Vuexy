import{f as g}from"./snippets-m8t1HIl1.js";const x={title:"Vuexy/Molecules/Forms/FormGroup",tags:["autodocs"],parameters:{docs:{description:{component:"# Form Group - Label + Input + Help Text"}}},argTypes:{label:{control:"text",table:{defaultValue:{summary:"Label"}}},placeholder:{control:"text",table:{defaultValue:{summary:""}}},helpText:{control:"text",table:{defaultValue:{summary:""}}},required:{control:"boolean",table:{defaultValue:{summary:!1}}}}},n=({label:t="Label",placeholder:b="Enter value...",helpText:s="",required:y=!1})=>`<div class="mb-3">
  <label class="form-label">${t}${y?' <span class="text-danger">*</span>':""}</label>
  <input type="text" class="form-control" placeholder="${b}">
  ${s?`<div class="form-text">${s}</div>`:""}
</div>`,I=t=>`${n(t)}<hr/><details><summary><strong>Code</strong></summary><pre><code>${g(n(t)).replace(/</g,"&lt;")}</code></pre></details>`,l=()=>`<div style="max-width:400px">${n({label:"Email",placeholder:"email@example.com",helpText:"We will never share your email"})}${n({label:"Password",placeholder:"Enter password",required:!0})}</div>`,e=I.bind({});e.args={label:"Input Label",placeholder:"Enter value...",helpText:"",required:!1};const a={render:()=>`
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive FormGroup Demo</h5>
        <p class="text-muted">Trigger validation states</p>
        
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input type="email" class="form-control" id="emailInput" placeholder="email@example.com">
          <div class="valid-feedback" id="validFeedback" style="display:none;">Looks good!</div>
          <div class="invalid-feedback" id="invalidFeedback" style="display:none;">Please enter a valid email.</div>
        </div>
        
        <div class="btn-group" role="group">
          <button class="btn btn-outline-success btn-sm" onclick="
            const input = document.getElementById('emailInput');
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            document.getElementById('validFeedback').style.display = 'block';
            document.getElementById('invalidFeedback').style.display = 'none';
          ">Show Valid</button>
          
          <button class="btn btn-outline-danger btn-sm" onclick="
            const input = document.getElementById('emailInput');
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            document.getElementById('validFeedback').style.display = 'none';
            document.getElementById('invalidFeedback').style.display = 'block';
          ">Show Invalid</button>
          
          <button class="btn btn-outline-secondary btn-sm" onclick="
            const input = document.getElementById('emailInput');
            input.classList.remove('is-valid', 'is-invalid');
            document.getElementById('validFeedback').style.display = 'none';
            document.getElementById('invalidFeedback').style.display = 'none';
          ">Reset</button>
        </div>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    `};var d,i,o;l.parameters={...l.parameters,docs:{...(d=l.parameters)==null?void 0:d.docs,source:{originalSource:`() => \`<div style="max-width:400px">\${createFormGroup({
  label: 'Email',
  placeholder: 'email@example.com',
  helpText: 'We will never share your email'
})}\${createFormGroup({
  label: 'Password',
  placeholder: 'Enter password',
  required: true
})}</div>\``,...(o=(i=l.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};var r,c,m;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:"args => `${createFormGroup(args)}<hr/><details><summary><strong>Code</strong></summary><pre><code>${formatHtmlSnippet(createFormGroup(args)).replace(/</g, '&lt;')}</code></pre></details>`",...(m=(c=e.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,p,v;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    return \`
      <div class="p-4" style="max-width: 500px;">
        <h5>Interactive FormGroup Demo</h5>
        <p class="text-muted">Trigger validation states</p>
        
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input type="email" class="form-control" id="emailInput" placeholder="email@example.com">
          <div class="valid-feedback" id="validFeedback" style="display:none;">Looks good!</div>
          <div class="invalid-feedback" id="invalidFeedback" style="display:none;">Please enter a valid email.</div>
        </div>
        
        <div class="btn-group" role="group">
          <button class="btn btn-outline-success btn-sm" onclick="
            const input = document.getElementById('emailInput');
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            document.getElementById('validFeedback').style.display = 'block';
            document.getElementById('invalidFeedback').style.display = 'none';
          ">Show Valid</button>
          
          <button class="btn btn-outline-danger btn-sm" onclick="
            const input = document.getElementById('emailInput');
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            document.getElementById('validFeedback').style.display = 'none';
            document.getElementById('invalidFeedback').style.display = 'block';
          ">Show Invalid</button>
          
          <button class="btn btn-outline-secondary btn-sm" onclick="
            const input = document.getElementById('emailInput');
            input.classList.remove('is-valid', 'is-invalid');
            document.getElementById('validFeedback').style.display = 'none';
            document.getElementById('invalidFeedback').style.display = 'none';
          ">Reset</button>
        </div>
        
        <small class="d-block mt-3 text-muted">Interactive demo via controlled state</small>
      </div>
    \`;
  }
}`,...(v=(p=a.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};const h=["Overview","Default","Interactive"];export{e as Default,a as Interactive,l as Overview,h as __namedExportsOrder,x as default};
