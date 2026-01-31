const tn={title:"Vuexy/Button",tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["primary","secondary","success","danger","warning","info"],description:"Button variant/color"},size:{control:{type:"select"},options:["sm","md","lg"],description:"Button size"},disabled:{control:"boolean",description:"Disable button"},label:{control:"text",description:"Button text"}},parameters:{docs:{description:{component:"Vuexy Button component with multiple variants, sizes, and states."}}}},n=({variant:t="primary",size:p="md",disabled:X=!1,label:Y="Button"})=>{const Z=p==="md"?"":`btn-${p}`;return`
    <button class="${["btn",`btn-${t}`,Z].filter(Boolean).join(" ")}" ${X?"disabled":""}>
      ${Y}
    </button>
  `},e={args:{variant:"primary",size:"md",disabled:!1,label:"Primary Button"},render:n,parameters:{docs:{source:{code:`<!-- HTML -->
<button class="btn btn-primary">Primary Button</button>

<!-- React -->
<button className="btn btn-primary">Primary Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-primary">Primary Button</button>`}}}},a={args:{variant:"secondary",size:"md",disabled:!1,label:"Secondary Button"},render:n,parameters:{docs:{source:{code:`<!-- HTML -->
<button class="btn btn-secondary">Secondary Button</button>

<!-- React -->
<button className="btn btn-secondary">Secondary Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-secondary">Secondary Button</button>`}}}},s={args:{variant:"success",size:"md",disabled:!1,label:"Success Button"},render:n},r={args:{variant:"danger",size:"md",disabled:!1,label:"Danger Button"},render:n},o={args:{variant:"warning",size:"md",disabled:!1,label:"Warning Button"},render:n},i={args:{variant:"info",size:"md",disabled:!1,label:"Info Button"},render:n},c={args:{variant:"primary",size:"sm",disabled:!1,label:"Small Button"},render:n,parameters:{docs:{source:{code:`<!-- HTML -->
<button class="btn btn-primary btn-sm">Small Button</button>

<!-- React -->
<button className="btn btn-primary btn-sm">Small Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-primary btn-sm">Small Button</button>`}}}},l={args:{variant:"primary",size:"lg",disabled:!1,label:"Large Button"},render:n,parameters:{docs:{source:{code:`<!-- HTML -->
<button class="btn btn-primary btn-lg">Large Button</button>

<!-- React -->
<button className="btn btn-primary btn-lg">Large Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-primary btn-lg">Large Button</button>`}}}},b={args:{variant:"primary",size:"md",disabled:!0,label:"Disabled Button"},render:n,parameters:{docs:{source:{code:`<!-- HTML -->
<button class="btn btn-primary" disabled>Disabled Button</button>

<!-- React -->
<button className="btn btn-primary" disabled>Disabled Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-primary" disabled>Disabled Button</button>`}}}},d={render:()=>`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-success">Success</button>
      <button class="btn btn-danger">Danger</button>
      <button class="btn btn-warning">Warning</button>
      <button class="btn btn-info">Info</button>
    </div>
  `,parameters:{docs:{description:{story:"All button variants displayed together."}}}},u={render:()=>`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <button class="btn btn-primary btn-sm">Small</button>
      <button class="btn btn-primary">Medium</button>
      <button class="btn btn-primary btn-lg">Large</button>
    </div>
  `,parameters:{docs:{description:{story:"All button sizes displayed together."}}}},m={render:()=>{const t="btn-interactive-"+Math.random().toString(36).substr(2,9);return`
      <div id="${t}">
        <div class="alert alert-info mb-4">
          <i class="bx bx-info-circle me-2"></i>
          <strong>Interactive Demo:</strong> Select variant and size to see button changes.
        </div>
        
        <div class="card mb-4">
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Variant:</label>
                <select class="form-select" id="variant-${t}" onchange="
                  const btn = document.getElementById('demoBtn-${t}');
                  btn.className = 'btn btn-' + this.value + ' ' + btn.className.split(' ').find(c => c.includes('btn-'))?.replace('btn-', '').split('-')[1] || '';
                  if (btn.className.includes('undefined')) btn.className = 'btn btn-' + this.value;
                ">
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="success">Success</option>
                  <option value="danger">Danger</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Size:</label>
                <select class="form-select" id="size-${t}" onchange="
                  const btn = document.getElementById('demoBtn-${t}');
                  btn.classList.remove('btn-sm', 'btn-lg');
                  if (this.value !== 'md') btn.classList.add('btn-' + this.value);
                ">
                  <option value="sm">Small</option>
                  <option value="md" selected>Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center">
          <button id="demoBtn-${t}" class="btn btn-primary">Click Me!</button>
        </div>
      </div>
    `},parameters:{docs:{description:{story:"Interactive button with variant and size controls."}}}};var g,y,v;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    label: 'Primary Button'
  },
  render: createButton,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
<button class="btn btn-primary">Primary Button</button>

<!-- React -->
<button className="btn btn-primary">Primary Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-primary">Primary Button</button>\`
      }
    }
  }
}`,...(v=(y=e.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var B,f,S;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    label: 'Secondary Button'
  },
  render: createButton,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
<button class="btn btn-secondary">Secondary Button</button>

<!-- React -->
<button className="btn btn-secondary">Secondary Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-secondary">Secondary Button</button>\`
      }
    }
  }
}`,...(S=(f=a.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var z,L,I;s.parameters={...s.parameters,docs:{...(z=s.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    size: 'md',
    disabled: false,
    label: 'Success Button'
  },
  render: createButton
}`,...(I=(L=s.parameters)==null?void 0:L.docs)==null?void 0:I.source}}};var h,D,w;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    size: 'md',
    disabled: false,
    label: 'Danger Button'
  },
  render: createButton
}`,...(w=(D=r.parameters)==null?void 0:D.docs)==null?void 0:w.source}}};var x,M,N;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    size: 'md',
    disabled: false,
    label: 'Warning Button'
  },
  render: createButton
}`,...(N=(M=o.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};var $,V,P;i.parameters={...i.parameters,docs:{...($=i.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    size: 'md',
    disabled: false,
    label: 'Info Button'
  },
  render: createButton
}`,...(P=(V=i.parameters)==null?void 0:V.docs)==null?void 0:P.source}}};var T,H,R;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'sm',
    disabled: false,
    label: 'Small Button'
  },
  render: createButton,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
<button class="btn btn-primary btn-sm">Small Button</button>

<!-- React -->
<button className="btn btn-primary btn-sm">Small Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-primary btn-sm">Small Button</button>\`
      }
    }
  }
}`,...(R=(H=c.parameters)==null?void 0:H.docs)==null?void 0:R.source}}};var A,W,E;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
    label: 'Large Button'
  },
  render: createButton,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
<button class="btn btn-primary btn-lg">Large Button</button>

<!-- React -->
<button className="btn btn-primary btn-lg">Large Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-primary btn-lg">Large Button</button>\`
      }
    }
  }
}`,...(E=(W=l.parameters)==null?void 0:W.docs)==null?void 0:E.source}}};var C,_,k;b.parameters={...b.parameters,docs:{...(C=b.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
    label: 'Disabled Button'
  },
  render: createButton,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
<button class="btn btn-primary" disabled>Disabled Button</button>

<!-- React -->
<button className="btn btn-primary" disabled>Disabled Button</button>

<!-- Vue 2/3 -->
<button class="btn btn-primary" disabled>Disabled Button</button>\`
      }
    }
  }
}`,...(k=(_=b.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var j,O,q;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-success">Success</button>
      <button class="btn btn-danger">Danger</button>
      <button class="btn btn-warning">Warning</button>
      <button class="btn btn-info">Info</button>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together.'
      }
    }
  }
}`,...(q=(O=d.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var F,G,J;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => \`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <button class="btn btn-primary btn-sm">Small</button>
      <button class="btn btn-primary">Medium</button>
      <button class="btn btn-primary btn-lg">Large</button>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together.'
      }
    }
  }
}`,...(J=(G=u.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,U;m.parameters={...m.parameters,docs:{...(K=m.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    const containerId = 'btn-interactive-' + Math.random().toString(36).substr(2, 9);
    return \`
      <div id="\${containerId}">
        <div class="alert alert-info mb-4">
          <i class="bx bx-info-circle me-2"></i>
          <strong>Interactive Demo:</strong> Select variant and size to see button changes.
        </div>
        
        <div class="card mb-4">
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Variant:</label>
                <select class="form-select" id="variant-\${containerId}" onchange="
                  const btn = document.getElementById('demoBtn-\${containerId}');
                  btn.className = 'btn btn-' + this.value + ' ' + btn.className.split(' ').find(c => c.includes('btn-'))?.replace('btn-', '').split('-')[1] || '';
                  if (btn.className.includes('undefined')) btn.className = 'btn btn-' + this.value;
                ">
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="success">Success</option>
                  <option value="danger">Danger</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Size:</label>
                <select class="form-select" id="size-\${containerId}" onchange="
                  const btn = document.getElementById('demoBtn-\${containerId}');
                  btn.classList.remove('btn-sm', 'btn-lg');
                  if (this.value !== 'md') btn.classList.add('btn-' + this.value);
                ">
                  <option value="sm">Small</option>
                  <option value="md" selected>Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center">
          <button id="demoBtn-\${containerId}" class="btn btn-primary">Click Me!</button>
        </div>
      </div>
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive button with variant and size controls.'
      }
    }
  }
}`,...(U=(Q=m.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};const en=["Primary","Secondary","Success","Danger","Warning","Info","Small","Large","Disabled","AllVariants","AllSizes","Interactive"];export{u as AllSizes,d as AllVariants,r as Danger,b as Disabled,i as Info,m as Interactive,l as Large,e as Primary,a as Secondary,c as Small,s as Success,o as Warning,en as __namedExportsOrder,tn as default};
