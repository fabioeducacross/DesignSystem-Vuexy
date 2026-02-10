import{c as o,a as b,b as a,d as h}from"./docTemplate-RKjNfURf.js";const y={title:"Getting Started/Doc Template Example",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",layout:"fullscreen"}},e={render:()=>o({title:"Button Component",subtitle:"Buttons allow users to take actions and make choices with a single tap. Use buttons to communicate actions users can take.",badge:"Atoms / Actions",badgeIcon:"smart_button",category:"Atoms",showStats:!0,stats:{Variantes:"8",Tamanhos:"3",Estados:"5",Acessível:"✓"},colors:{primary:"#667eea",secondary:"#764ba2"},content:`
      ${b({title:"Como Usar",icon:"integration_instructions",steps:["Importe o componente Button do design system","Defina a variante desejada (primary, secondary, success, etc)","Configure o tamanho (sm, md, lg)","Adicione o texto e ícones se necessário","Conecte o handler de click apropriado"]})}

      ${a({title:"Exemplo Básico",description:"Button primário com tamanho médio",preview:`
          <button class="btn btn-primary">
            Click Me
          </button>
        `,code:`<button class="btn btn-primary">
  Click Me
</button>`})}

      ${a({title:"Button com Ícone",description:"Button com ícone Material Symbols",preview:`
          <button class="btn btn-primary d-flex align-items-center gap-2">
            <span class="material-symbols-outlined">add</span>
            <span>Add New</span>
          </button>
        `,code:`<button class="btn btn-primary d-flex align-items-center gap-2">
  <span class="material-symbols-outlined">add</span>
  <span>Add New</span>
</button>`})}

      ${h([{name:"variant",type:"string",default:"primary",description:"Define o estilo visual do botão (primary, secondary, success, danger, warning, info, light, dark)"},{name:"size",type:"string",default:"md",description:"Tamanho do botão (sm, md, lg)"},{name:"disabled",type:"boolean",default:"false",description:"Desabilita o botão quando true"},{name:"loading",type:"boolean",default:"false",description:"Mostra spinner de loading quando true"},{name:"icon",type:"string",default:"-",description:"Nome do ícone Material Symbols a exibir"},{name:"iconPosition",type:"string",default:"left",description:"Posição do ícone (left, right)"}])}
    `,features:[{icon:"palette",title:"8 Variantes",description:"Primary, Secondary, Success, Danger, Warning, Info, Light e Dark"},{icon:"straighten",title:"3 Tamanhos",description:"Small (32px), Medium (40px) e Large (48px) de altura"},{icon:"touch_app",title:"Totalmente Interativo",description:"Estados hover, active, focus e disabled com transições suaves"},{icon:"accessibility_new",title:"Acessível",description:"ARIA labels, keyboard navigation e contrast ratio WCAG AA"},{icon:"devices",title:"Responsivo",description:"Adapta-se perfeitamente a mobile, tablet e desktop"},{icon:"bolt",title:"Performance",description:"CSS otimizado com minimal JavaScript overhead"}],relatedComponents:[{title:"Button Group",icon:"view_week",description:"Agrupe múltiplos botões em uma única linha",path:"?path=/docs/atoms-actions-buttongroup--docs"},{title:"Icon Button",icon:"radio_button_checked",description:"Botão circular apenas com ícone",path:"?path=/docs/atoms-actions-iconbutton--docs"},{title:"Link Button",icon:"link",description:"Botão estilizado como link de texto",path:"?path=/docs/atoms-actions-linkbutton--docs"}]})},t={render:()=>o({title:"Card Component",subtitle:"Cards contain content and actions about a single subject",content:`
      <div class="doc-section">
        <h3 class="doc-section-title">
          <span class="material-symbols-outlined">info</span>
          <span>Overview</span>
        </h3>
        <p style="color: #6c757d; line-height: 1.8;">
          Cards are surfaces that display content and actions on a single topic.
          They should be easy to scan for relevant and actionable information.
          Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.
        </p>
      </div>

      ${a({title:"Basic Card",preview:`
          <div class="card" style="max-width: 400px;">
            <div class="card-body">
              <h5 class="card-title">Card Title</h5>
              <p class="card-text">Some quick example text to build on the card title.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        `})}
    `})},n={render:()=>o({title:"Alert Component",subtitle:"Provide contextual feedback messages for typical user actions",badge:"Atoms / Feedback",badgeIcon:"notifications",colors:{primary:"#28c76f",secondary:"#48da89"},content:`
      <div class="doc-section">
        <p style="color: #6c757d; line-height: 1.8;">
          Alerts provide brief messages about app processes. The component is also well suited to display errors to users.
        </p>
      </div>

      ${a({title:"Success Alert",preview:`
          <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Well done!</h4>
            <p>You successfully completed the action.</p>
          </div>
        `})}
    `,features:[{icon:"check_circle",title:"Contextual",description:"Variantes para success, danger, warning e info"},{icon:"close",title:"Dismissible",description:"Opção de fechar o alert com botão X"},{icon:"image",title:"Com Ícones",description:"Suporte para ícones customizados"}]})};var s,i,c;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => createDocPage({
    title: 'Button Component',
    subtitle: 'Buttons allow users to take actions and make choices with a single tap. Use buttons to communicate actions users can take.',
    badge: 'Atoms / Actions',
    badgeIcon: 'smart_button',
    category: 'Atoms',
    showStats: true,
    stats: {
      'Variantes': '8',
      'Tamanhos': '3',
      'Estados': '5',
      'Acessível': '✓'
    },
    colors: {
      primary: '#667eea',
      secondary: '#764ba2'
    },
    content: \`
      \${createUsageSection({
      title: 'Como Usar',
      icon: 'integration_instructions',
      steps: ['Importe o componente Button do design system', 'Defina a variante desejada (primary, secondary, success, etc)', 'Configure o tamanho (sm, md, lg)', 'Adicione o texto e ícones se necessário', 'Conecte o handler de click apropriado']
    })}

      \${createExampleCard({
      title: 'Exemplo Básico',
      description: 'Button primário com tamanho médio',
      preview: \`
          <button class="btn btn-primary">
            Click Me
          </button>
        \`,
      code: \`<button class="btn btn-primary">
  Click Me
</button>\`
    })}

      \${createExampleCard({
      title: 'Button com Ícone',
      description: 'Button com ícone Material Symbols',
      preview: \`
          <button class="btn btn-primary d-flex align-items-center gap-2">
            <span class="material-symbols-outlined">add</span>
            <span>Add New</span>
          </button>
        \`,
      code: \`<button class="btn btn-primary d-flex align-items-center gap-2">
  <span class="material-symbols-outlined">add</span>
  <span>Add New</span>
</button>\`
    })}

      \${createPropsTable([{
      name: 'variant',
      type: 'string',
      default: 'primary',
      description: 'Define o estilo visual do botão (primary, secondary, success, danger, warning, info, light, dark)'
    }, {
      name: 'size',
      type: 'string',
      default: 'md',
      description: 'Tamanho do botão (sm, md, lg)'
    }, {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Desabilita o botão quando true'
    }, {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Mostra spinner de loading quando true'
    }, {
      name: 'icon',
      type: 'string',
      default: '-',
      description: 'Nome do ícone Material Symbols a exibir'
    }, {
      name: 'iconPosition',
      type: 'string',
      default: 'left',
      description: 'Posição do ícone (left, right)'
    }])}
    \`,
    features: [{
      icon: 'palette',
      title: '8 Variantes',
      description: 'Primary, Secondary, Success, Danger, Warning, Info, Light e Dark'
    }, {
      icon: 'straighten',
      title: '3 Tamanhos',
      description: 'Small (32px), Medium (40px) e Large (48px) de altura'
    }, {
      icon: 'touch_app',
      title: 'Totalmente Interativo',
      description: 'Estados hover, active, focus e disabled com transições suaves'
    }, {
      icon: 'accessibility_new',
      title: 'Acessível',
      description: 'ARIA labels, keyboard navigation e contrast ratio WCAG AA'
    }, {
      icon: 'devices',
      title: 'Responsivo',
      description: 'Adapta-se perfeitamente a mobile, tablet e desktop'
    }, {
      icon: 'bolt',
      title: 'Performance',
      description: 'CSS otimizado com minimal JavaScript overhead'
    }],
    relatedComponents: [{
      title: 'Button Group',
      icon: 'view_week',
      description: 'Agrupe múltiplos botões em uma única linha',
      path: '?path=/docs/atoms-actions-buttongroup--docs'
    }, {
      title: 'Icon Button',
      icon: 'radio_button_checked',
      description: 'Botão circular apenas com ícone',
      path: '?path=/docs/atoms-actions-iconbutton--docs'
    }, {
      title: 'Link Button',
      icon: 'link',
      description: 'Botão estilizado como link de texto',
      path: '?path=/docs/atoms-actions-linkbutton--docs'
    }]
  })
}`,...(c=(i=e.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var r,l,d;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => createDocPage({
    title: 'Card Component',
    subtitle: 'Cards contain content and actions about a single subject',
    content: \`
      <div class="doc-section">
        <h3 class="doc-section-title">
          <span class="material-symbols-outlined">info</span>
          <span>Overview</span>
        </h3>
        <p style="color: #6c757d; line-height: 1.8;">
          Cards are surfaces that display content and actions on a single topic.
          They should be easy to scan for relevant and actionable information.
          Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.
        </p>
      </div>

      \${createExampleCard({
      title: 'Basic Card',
      preview: \`
          <div class="card" style="max-width: 400px;">
            <div class="card-body">
              <h5 class="card-title">Card Title</h5>
              <p class="card-text">Some quick example text to build on the card title.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        \`
    })}
    \`
  })
}`,...(d=(l=t.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var p,m,u;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => createDocPage({
    title: 'Alert Component',
    subtitle: 'Provide contextual feedback messages for typical user actions',
    badge: 'Atoms / Feedback',
    badgeIcon: 'notifications',
    colors: {
      primary: '#28c76f',
      secondary: '#48da89'
    },
    content: \`
      <div class="doc-section">
        <p style="color: #6c757d; line-height: 1.8;">
          Alerts provide brief messages about app processes. The component is also well suited to display errors to users.
        </p>
      </div>

      \${createExampleCard({
      title: 'Success Alert',
      preview: \`
          <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Well done!</h4>
            <p>You successfully completed the action.</p>
          </div>
        \`
    })}
    \`,
    features: [{
      icon: 'check_circle',
      title: 'Contextual',
      description: 'Variantes para success, danger, warning e info'
    }, {
      icon: 'close',
      title: 'Dismissible',
      description: 'Opção de fechar o alert com botão X'
    }, {
      icon: 'image',
      title: 'Com Ícones',
      description: 'Suporte para ícones customizados'
    }]
  })
}`,...(u=(m=n.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const x=["CompleteExample","MinimalExample","CustomColorsExample"];export{e as CompleteExample,n as CustomColorsExample,t as MinimalExample,x as __namedExportsOrder,y as default};
