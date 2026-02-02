const n={title:"Educacross V2/DescriptorTag",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## DescriptorTag

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- Nenhum evento definido
        `}}}},a=`

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


.test-z {
  z-index: 99999999999;
}
`,s=`
<div>
    <b-badge
      id=""
      variant=""
      pill
      class="text-wrap cursor-help"
    >
      Sample Text
    </b-badge>
    <b-popover
      target=""
      triggers="hover"
      placement=""
      custom-class="test-z"
    >
      <div>
        Sample Text
`,e={render:()=>`
    <style>${a}</style>
    ${s}
  `};var r,o,t;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(t=(o=e.parameters)==null?void 0:o.docs)==null?void 0:t.source}}};const c=["Default"];export{e as Default,c as __namedExportsOrder,n as default};
