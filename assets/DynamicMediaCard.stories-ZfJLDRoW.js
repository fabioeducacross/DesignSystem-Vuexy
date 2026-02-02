const s={title:"Educacross V2/DynamicMediaCard",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## DynamicMediaCard

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- Nenhum evento definido
        `}}}},r=`

:root {
  --primary: #6e63e8;
  --primary-rgb: 110, 99, 232;
  --success: #28c76f;
  --success-rgb: 40, 199, 111;
  --danger: #ea5455;
  --danger-rgb: 234, 84, 85;
  --warning: #ff9f43;
  --warning-rgb: 255, 159, 67;
  --info: #00cfe8;
  --info-rgb: 0, 207, 232;
  --secondary: #6c757d;
  --secondary-rgb: 108, 117, 125;
  --light: #f8f9fa;
  --dark: #343a40;
  --legend-below-basic: #ea5455;
  --legend-basic: #ff9f43;
  --legend-proficient: #28c76f;
  --legend-advanced: #6e63e8;
  --border-color: #dbdade;
  --body-bg: #f8f7fa;
  --card-bg: #ffffff;
  --text-color: #5d596c;
  --heading-color: #5d596c;
}


h5 {
  font-weight: 400;
  font-size: 1.15rem;
}

.material-symbols-outlined.dynamic-card-icon-info {
  font-size: 16px;
}

.icon-container {
  height: 78px;
  width: 78px;
}

.icon {
  font-size: 46.67px;
  align-self: center;
}
`,t=`
<b-card
    :bg-variant="bgVariant"
    class=""
    :border-variant="borderVariant"
    body-class="d-flex flex-column"
  >
    <b-skeleton-wrapper loading="">
      <div>
        <b-skeleton-img no-aspect height="150px" />
`,e={render:()=>`
    <style>${r}</style>
    ${t}
  `};var a,n,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(o=(n=e.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const d=["Default"];export{e as Default,d as __namedExportsOrder,s as default};
