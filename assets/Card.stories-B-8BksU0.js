const L={title:"Vuexy/Card",tags:["autodocs"],argTypes:{title:{control:"text",description:"Card title"},content:{control:"text",description:"Card content"},showHeader:{control:"boolean",description:"Show card header"}},parameters:{docs:{description:{component:"Vuexy Card component with optional header and customizable content."}}}},c=({title:e="Card Title",content:E="Card content goes here.",showHeader:H=!0})=>`
    <div class="card" style="max-width: 500px;">
      ${H?`
        <div class="card-header">
          <h4 class="card-title">${e}</h4>
        </div>
      `:""}
      <div class="card-body">
        ${E}
      </div>
    </div>
  `,a={args:{title:"Card Title",content:"This is the card content. You can put any content here.",showHeader:!0},render:c,parameters:{docs:{source:{code:`<!-- HTML -->
<div class="card">
  <div class="card-header">
    <h4 class="card-title">Card Title</h4>
  </div>
  <div class="card-body">
    This is the card content.
  </div>
</div>

<!-- React -->
<div className="card">
  <div className="card-header">
    <h4 className="card-title">Card Title</h4>
  </div>
  <div className="card-body">
    This is the card content.
  </div>
</div>

<!-- Vue 2/3 -->
<div class="card">
  <div class="card-header">
    <h4 class="card-title">{{ title }}</h4>
  </div>
  <div class="card-body">
    {{ content }}
  </div>
</div>`}}}},n={args:{title:"Card Title",content:"This card has no header, only body content.",showHeader:!1},render:c,parameters:{docs:{source:{code:`<!-- HTML -->
<div class="card">
  <div class="card-body">
    This card has no header, only body content.
  </div>
</div>

<!-- React -->
<div className="card">
  <div className="card-body">
    This card has no header, only body content.
  </div>
</div>

<!-- Vue 2/3 -->
<div class="card">
  <div class="card-body">
    {{ content }}
  </div>
</div>`}}}},t={args:{title:"Statistics Card",content:`
      <p style="margin-bottom: 1rem;">Total Users: <strong>1,234</strong></p>
      <p style="margin-bottom: 1rem;">Active Sessions: <strong>856</strong></p>
      <p style="margin-bottom: 0;">Conversion Rate: <strong>12.5%</strong></p>
    `,showHeader:!0},render:c,parameters:{docs:{description:{story:"Card with rich HTML content in the body."}}}},d={render:()=>`
    <div class="card" style="max-width: 500px;">
      <div class="card-header">
        <h4 class="card-title">User Profile</h4>
      </div>
      <div class="card-body">
        <p style="margin-bottom: 1rem;">Name: John Doe</p>
        <p style="margin-bottom: 1.5rem;">Email: john.doe@example.com</p>
        <button class="btn btn-primary">Edit Profile</button>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Card with a button in the body."},source:{code:`<!-- HTML -->
<div class="card">
  <div class="card-header">
    <h4 class="card-title">User Profile</h4>
  </div>
  <div class="card-body">
    <p>Name: John Doe</p>
    <p>Email: john.doe@example.com</p>
    <button class="btn btn-primary">Edit Profile</button>
  </div>
</div>

<!-- React -->
<div className="card">
  <div className="card-header">
    <h4 className="card-title">User Profile</h4>
  </div>
  <div className="card-body">
    <p>Name: John Doe</p>
    <p>Email: john.doe@example.com</p>
    <button className="btn btn-primary">Edit Profile</button>
  </div>
</div>

<!-- Vue 2/3 -->
<div class="card">
  <div class="card-header">
    <h4 class="card-title">User Profile</h4>
  </div>
  <div class="card-body">
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <button class="btn btn-primary" @click="editProfile">Edit Profile</button>
  </div>
</div>`}}}},r={render:()=>`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Card 1</h4>
        </div>
        <div class="card-body">
          First card content
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Card 2</h4>
        </div>
        <div class="card-body">
          Second card content
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Card 3</h4>
        </div>
        <div class="card-body">
          Third card content
        </div>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Multiple cards in a grid layout."}}}},s={render:()=>{const e="card-interactive-"+Math.random().toString(36).substr(2,9);return`
      <div id="${e}" style="max-width: 500px;">
        <div class="alert alert-info mb-4">
          <i class="bx bx-info-circle me-2"></i>
          <strong>Interactive Demo:</strong> Click the header to expand/collapse the card content.
        </div>
        
        <div class="card">
          <div class="card-header" style="cursor: pointer;" onclick="
            const content = document.getElementById('cardContent-${e}');
            const icon = this.querySelector('i');
            content.classList.toggle('d-none');
            icon.classList.toggle('bx-chevron-down');
            icon.classList.toggle('bx-chevron-up');
          ">
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="card-title mb-0">Collapsible Card</h4>
              <i class="bx bx-chevron-up"></i>
            </div>
          </div>
          <div id="cardContent-${e}" class="card-body">
            <p class="mb-3">This is the card content. Click the header to collapse/expand this section.</p>
            <p class="mb-3">You can put any content here:</p>
            <ul>
              <li>Lists</li>
              <li>Paragraphs</li>
              <li>Images</li>
              <li>Any HTML elements</li>
            </ul>
            <button class="btn btn-primary mt-2">Action Button</button>
          </div>
        </div>
      </div>
    `},parameters:{docs:{description:{story:"Interactive collapsible card with expand/collapse functionality."}}}};var i,o,l;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    title: 'Card Title',
    content: 'This is the card content. You can put any content here.',
    showHeader: true
  },
  render: createCard,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
<div class="card">
  <div class="card-header">
    <h4 class="card-title">Card Title</h4>
  </div>
  <div class="card-body">
    This is the card content.
  </div>
</div>

<!-- React -->
<div className="card">
  <div className="card-header">
    <h4 className="card-title">Card Title</h4>
  </div>
  <div className="card-body">
    This is the card content.
  </div>
</div>

<!-- Vue 2/3 -->
<div class="card">
  <div class="card-header">
    <h4 class="card-title">{{ title }}</h4>
  </div>
  <div class="card-body">
    {{ content }}
  </div>
</div>\`
      }
    }
  }
}`,...(l=(o=a.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var v,h,m;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    title: 'Card Title',
    content: 'This card has no header, only body content.',
    showHeader: false
  },
  render: createCard,
  parameters: {
    docs: {
      source: {
        code: \`<!-- HTML -->
<div class="card">
  <div class="card-body">
    This card has no header, only body content.
  </div>
</div>

<!-- React -->
<div className="card">
  <div className="card-body">
    This card has no header, only body content.
  </div>
</div>

<!-- Vue 2/3 -->
<div class="card">
  <div class="card-body">
    {{ content }}
  </div>
</div>\`
      }
    }
  }
}`,...(m=(h=n.parameters)==null?void 0:h.docs)==null?void 0:m.source}}};var p,b,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    title: 'Statistics Card',
    content: \`
      <p style="margin-bottom: 1rem;">Total Users: <strong>1,234</strong></p>
      <p style="margin-bottom: 1rem;">Active Sessions: <strong>856</strong></p>
      <p style="margin-bottom: 0;">Conversion Rate: <strong>12.5%</strong></p>
    \`,
    showHeader: true
  },
  render: createCard,
  parameters: {
    docs: {
      description: {
        story: 'Card with rich HTML content in the body.'
      }
    }
  }
}`,...(u=(b=t.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};var y,g,C;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
    <div class="card" style="max-width: 500px;">
      <div class="card-header">
        <h4 class="card-title">User Profile</h4>
      </div>
      <div class="card-body">
        <p style="margin-bottom: 1rem;">Name: John Doe</p>
        <p style="margin-bottom: 1.5rem;">Email: john.doe@example.com</p>
        <button class="btn btn-primary">Edit Profile</button>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Card with a button in the body.'
      },
      source: {
        code: \`<!-- HTML -->
<div class="card">
  <div class="card-header">
    <h4 class="card-title">User Profile</h4>
  </div>
  <div class="card-body">
    <p>Name: John Doe</p>
    <p>Email: john.doe@example.com</p>
    <button class="btn btn-primary">Edit Profile</button>
  </div>
</div>

<!-- React -->
<div className="card">
  <div className="card-header">
    <h4 className="card-title">User Profile</h4>
  </div>
  <div className="card-body">
    <p>Name: John Doe</p>
    <p>Email: john.doe@example.com</p>
    <button className="btn btn-primary">Edit Profile</button>
  </div>
</div>

<!-- Vue 2/3 -->
<div class="card">
  <div class="card-header">
    <h4 class="card-title">User Profile</h4>
  </div>
  <div class="card-body">
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <button class="btn btn-primary" @click="editProfile">Edit Profile</button>
  </div>
</div>\`
      }
    }
  }
}`,...(C=(g=d.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};var x,T,f;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Card 1</h4>
        </div>
        <div class="card-body">
          First card content
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Card 2</h4>
        </div>
        <div class="card-body">
          Second card content
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Card 3</h4>
        </div>
        <div class="card-body">
          Third card content
        </div>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Multiple cards in a grid layout.'
      }
    }
  }
}`,...(f=(T=r.parameters)==null?void 0:T.docs)==null?void 0:f.source}}};var N,w,P;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const containerId = 'card-interactive-' + Math.random().toString(36).substr(2, 9);
    return \`
      <div id="\${containerId}" style="max-width: 500px;">
        <div class="alert alert-info mb-4">
          <i class="bx bx-info-circle me-2"></i>
          <strong>Interactive Demo:</strong> Click the header to expand/collapse the card content.
        </div>
        
        <div class="card">
          <div class="card-header" style="cursor: pointer;" onclick="
            const content = document.getElementById('cardContent-\${containerId}');
            const icon = this.querySelector('i');
            content.classList.toggle('d-none');
            icon.classList.toggle('bx-chevron-down');
            icon.classList.toggle('bx-chevron-up');
          ">
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="card-title mb-0">Collapsible Card</h4>
              <i class="bx bx-chevron-up"></i>
            </div>
          </div>
          <div id="cardContent-\${containerId}" class="card-body">
            <p class="mb-3">This is the card content. Click the header to collapse/expand this section.</p>
            <p class="mb-3">You can put any content here:</p>
            <ul>
              <li>Lists</li>
              <li>Paragraphs</li>
              <li>Images</li>
              <li>Any HTML elements</li>
            </ul>
            <button class="btn btn-primary mt-2">Action Button</button>
          </div>
        </div>
      </div>
    \`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive collapsible card with expand/collapse functionality.'
      }
    }
  }
}`,...(P=(w=s.parameters)==null?void 0:w.docs)==null?void 0:P.source}}};const S=["Default","WithoutHeader","WithRichContent","WithButton","MultipleCards","Interactive"];export{a as Default,s as Interactive,r as MultipleCards,d as WithButton,t as WithRichContent,n as WithoutHeader,S as __namedExportsOrder,L as default};
