const t={title:"Educacross V2/SelectLocale",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## SelectLocale

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


#dropdown-grouped {
  list-style: none;
}
`,s=`
<b-nav-item-dropdown
    id="dropdown-grouped"
    variant="link"
    class="dropdown-language"
    toggle-class="d-flex align-items-center"
    right=""
  >
    <div>
      <span class="d-flex align-items-center">
        <b-img src="" height="14px" width="22px" alt="" />
        <span class="ml-50" class="">
          Sample Text
        </span>
      </span>
`,e={render:()=>`
    <style>${r}</style>
    ${s}
  `};var o,a,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const c=["Default"];export{e as Default,c as __namedExportsOrder,t as default};
