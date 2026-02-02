const a={title:"Educacross V2/SubjectBand",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## SubjectBand

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



`,s=`
<section class="d-flex flex-column flex-md-row gap-1 mb-50">
    <div
      class="flex-1 p-50 text-white font-weight-bolder rounded d-flex align-items-center justify-content-center text-center"
      class=""
    >
      Sample Text
    </div>
  </section>
`,e={render:()=>`
    <style>${r}</style>
    ${s}
  `};var t,o,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};const c=["Default"];export{e as Default,c as __namedExportsOrder,a as default};
