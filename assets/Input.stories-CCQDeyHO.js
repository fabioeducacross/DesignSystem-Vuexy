const R={title:"Vuexy/Input",tags:["autodocs"],argTypes:{placeholder:{control:"text",description:"Placeholder text"},disabled:{control:"boolean",description:"Disable input"},value:{control:"text",description:"Input value"},state:{control:{type:"select"},options:["default","valid","invalid"],description:"Validation state"}},parameters:{docs:{description:{component:"Vuexy Input component with validation states and disabled state."}}}},t=({placeholder:e="Enter text...",disabled:T=!1,value:S="",state:d="default"})=>`
    <div style="max-width: 400px;">
      <input 
        type="text" 
        class="${["form-control",d==="valid"?"is-valid":d==="invalid"?"is-invalid":""].filter(Boolean).join(" ")}" 
        placeholder="${e}"
        value="${S}"
        ${T?"disabled":""}
      />
    </div>
  `,n={args:{placeholder:"Enter text...",disabled:!1,value:"",state:"default"},render:t,parameters:{docs:{source:{code:`<!-- HTML -->
<input type="text" class="form-control" placeholder="Enter text..." />

<!-- React -->
<input type="text" className="form-control" placeholder="Enter text..." />

<!-- Vue 2 -->
<input type="text" class="form-control" placeholder="Enter text..." v-model="value" />

<!-- Vue 3 -->
<input type="text" class="form-control" placeholder="Enter text..." v-model="value" />`}}}},a={args:{placeholder:"Enter text...",disabled:!1,value:"Sample text",state:"default"},render:t,parameters:{docs:{description:{story:"Input with a predefined value."}}}},l={args:{placeholder:"Disabled input",disabled:!0,value:"",state:"default"},render:t,parameters:{docs:{source:{code:`<!-- HTML -->
<input type="text" class="form-control" placeholder="Disabled input" disabled />

<!-- React -->
<input type="text" className="form-control" placeholder="Disabled input" disabled />

<!-- Vue 2/3 -->
<input type="text" class="form-control" placeholder="Disabled input" :disabled="true" />`}}}},s={args:{placeholder:"Enter text...",disabled:!1,value:"Valid input",state:"valid"},render:t,parameters:{docs:{source:{code:`<!-- HTML -->
<input type="text" class="form-control is-valid" value="Valid input" />

<!-- React -->
<input type="text" className="form-control is-valid" value="Valid input" />

<!-- Vue 2/3 -->
<input type="text" class="form-control is-valid" v-model="value" />`}}}},i={args:{placeholder:"Enter text...",disabled:!1,value:"Invalid input",state:"invalid"},render:t,parameters:{docs:{source:{code:`<!-- HTML -->
<input type="text" class="form-control is-invalid" value="Invalid input" />

<!-- React -->
<input type="text" className="form-control is-invalid" value="Invalid input" />

<!-- Vue 2/3 -->
<input type="text" class="form-control is-invalid" v-model="value" />`}}}},o={render:()=>`
    <div style="max-width: 400px; display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Default</label>
        <input type="text" class="form-control" placeholder="Default state" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Valid</label>
        <input type="text" class="form-control is-valid" value="Valid input" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Invalid</label>
        <input type="text" class="form-control is-invalid" value="Invalid input" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Disabled</label>
        <input type="text" class="form-control" placeholder="Disabled" disabled />
      </div>
    </div>
  `,parameters:{docs:{description:{story:"All input states displayed together."}}}},r={render:()=>{const e="input-interactive-"+Math.random().toString(36).substr(2,9);return`
      <div id="${e}" style="max-width: 400px;">
        <div class="alert alert-info mb-4">
          <i class="bx bx-info-circle me-2"></i>
          <strong>Interactive Demo:</strong> Type in the input to see character count and validation.
        </div>
        
        <div class="mb-3">
          <label class="form-label">Username (3-20 characters)</label>
          <input 
            type="text" 
            id="demoInput-${e}" 
            class="form-control" 
            placeholder="Enter username"
            oninput="
              const input = this;
              const count = document.getElementById('charCount-${e}');
              const feedback = document.getElementById('feedback-${e}');
              const len = input.value.length;
              
              count.textContent = len + '/20';
              count.className = len > 20 ? 'text-danger' : len >= 3 ? 'text-success' : 'text-muted';
              
              input.classList.remove('is-valid', 'is-invalid');
              
              if (len === 0) {
                feedback.textContent = '';
              } else if (len < 3) {
                input.classList.add('is-invalid');
                feedback.textContent = 'Too short (min 3 characters)';
                feedback.className = 'invalid-feedback d-block';
              } else if (len > 20) {
                input.classList.add('is-invalid');
                feedback.textContent = 'Too long (max 20 characters)';
                feedback.className = 'invalid-feedback d-block';
              } else {
                input.classList.add('is-valid');
                feedback.textContent = 'Looks good!';
                feedback.className = 'valid-feedback d-block';
              }
            "
            maxlength="25"
          />
          <div class="d-flex justify-content-between mt-1">
            <div id="feedback-${e}"></div>
            <small id="charCount-${e}" class="text-muted">0/20</small>
          </div>
        </div>
      </div>
    `},parameters:{docs:{description:{story:"Interactive input with live character count and validation feedback."}}}};var c,p,u;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...',
    disabled: false,
    value: '',
    state: 'default'
  },
  render: createInput,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
<input type="text" class="form-control" placeholder="Enter text..." />

<!-- React -->
<input type="text" className="form-control" placeholder="Enter text..." />

<!-- Vue 2 -->
<input type="text" class="form-control" placeholder="Enter text..." v-model="value" />

<!-- Vue 3 -->
<input type="text" class="form-control" placeholder="Enter text..." v-model="value" />\`
      }
    }
  }
}`,...(u=(p=n.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,v,b;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...',
    disabled: false,
    value: 'Sample text',
    state: 'default'
  },
  render: createInput,
  parameters: {
    docs: {
      description: {
        story: 'Input with a predefined value.'
      }
    }
  }
}`,...(b=(v=a.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var f,x,h;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    value: '',
    state: 'default'
  },
  render: createInput,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
<input type="text" class="form-control" placeholder="Disabled input" disabled />

<!-- React -->
<input type="text" className="form-control" placeholder="Disabled input" disabled />

<!-- Vue 2/3 -->
<input type="text" class="form-control" placeholder="Disabled input" :disabled="true" />\`
      }
    }
  }
}`,...(h=(x=l.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var y,g,k;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...',
    disabled: false,
    value: 'Valid input',
    state: 'valid'
  },
  render: createInput,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
<input type="text" class="form-control is-valid" value="Valid input" />

<!-- React -->
<input type="text" className="form-control is-valid" value="Valid input" />

<!-- Vue 2/3 -->
<input type="text" class="form-control is-valid" v-model="value" />\`
      }
    }
  }
}`,...(k=(g=s.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};var I,V,E;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...',
    disabled: false,
    value: 'Invalid input',
    state: 'invalid'
  },
  render: createInput,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
<input type="text" class="form-control is-invalid" value="Invalid input" />

<!-- React -->
<input type="text" className="form-control is-invalid" value="Invalid input" />

<!-- Vue 2/3 -->
<input type="text" class="form-control is-invalid" v-model="value" />\`
      }
    }
  }
}`,...(E=(V=i.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};var D,w,L;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => \`
    <div style="max-width: 400px; display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Default</label>
        <input type="text" class="form-control" placeholder="Default state" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Valid</label>
        <input type="text" class="form-control is-valid" value="Valid input" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Invalid</label>
        <input type="text" class="form-control is-invalid" value="Invalid input" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Disabled</label>
        <input type="text" class="form-control" placeholder="Disabled" disabled />
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'All input states displayed together.'
      }
    }
  }
}`,...(L=(w=o.parameters)==null?void 0:w.docs)==null?void 0:L.source}}};var C,N,$;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => {
    const containerId = 'input-interactive-' + Math.random().toString(36).substr(2, 9);
    return \`
      <div id="\${containerId}" style="max-width: 400px;">
        <div class="alert alert-info mb-4">
          <i class="bx bx-info-circle me-2"></i>
          <strong>Interactive Demo:</strong> Type in the input to see character count and validation.
        </div>
        
        <div class="mb-3">
          <label class="form-label">Username (3-20 characters)</label>
          <input 
            type="text" 
            id="demoInput-\${containerId}" 
            class="form-control" 
            placeholder="Enter username"
            oninput="
              const input = this;
              const count = document.getElementById('charCount-\${containerId}');
              const feedback = document.getElementById('feedback-\${containerId}');
              const len = input.value.length;
              
              count.textContent = len + '/20';
              count.className = len > 20 ? 'text-danger' : len >= 3 ? 'text-success' : 'text-muted';
              
              input.classList.remove('is-valid', 'is-invalid');
              
              if (len === 0) {
                feedback.textContent = '';
              } else if (len < 3) {
                input.classList.add('is-invalid');
                feedback.textContent = 'Too short (min 3 characters)';
                feedback.className = 'invalid-feedback d-block';
              } else if (len > 20) {
                input.classList.add('is-invalid');
                feedback.textContent = 'Too long (max 20 characters)';
                feedback.className = 'invalid-feedback d-block';
              } else {
                input.classList.add('is-valid');
                feedback.textContent = 'Looks good!';
                feedback.className = 'valid-feedback d-block';
              }
            "
            maxlength="25"
          />
          <div class="d-flex justify-content-between mt-1">
            <div id="feedback-\${containerId}"></div>
            <small id="charCount-\${containerId}" class="text-muted">0/20</small>
          </div>
        </div>
      </div>
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive input with live character count and validation feedback.'
      }
    }
  }
}`,...($=(N=r.parameters)==null?void 0:N.docs)==null?void 0:$.source}}};const B=["Default","WithValue","Disabled","Valid","Invalid","AllStates","Interactive"];export{o as AllStates,n as Default,l as Disabled,r as Interactive,i as Invalid,s as Valid,a as WithValue,B as __namedExportsOrder,R as default};
