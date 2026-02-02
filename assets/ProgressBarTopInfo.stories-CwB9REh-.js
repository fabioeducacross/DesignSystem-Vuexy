const t={title:"Educacross V2/ProgressBarTopInfo",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## ProgressBarTopInfo

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



`,n=`
<div class="d-flex gap-1 flex-column mb-1">
    <div class="d-flex justify-content-between">
      <span class="font-weight-bold">Sample Text</span>
      <span
        v-b-tooltip="tooltip"
        class="font-bold"
        class=""
      >
        Sample Text%
      </span>
    </div>
    <b-progress variant="" value="" height=""></b-progress>
  </div>
`,e={render:()=>`
    <style>${a}</style>
    ${n}
  `};var o,s,r;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(r=(s=e.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};const c=["Default"];export{e as Default,c as __namedExportsOrder,t as default};
