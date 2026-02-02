const c={title:"Educacross V2/SelectInfinityScrollModelo",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## SelectInfinityScrollModelo

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- Nenhum evento definido
        `}}}},t=`

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


.loader {
  text-align: center;
  color: #bbbbbb;
}
`,a=`
<v-select
    options=""
    filterable=""
  >
    <div>
      <li class="loader">Loading more options...</li>
`,e={render:()=>`
    <style>${t}</style>
    ${a}
  `};var o,r,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(n=(r=e.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};const s=["Default"];export{e as Default,s as __namedExportsOrder,c as default};
