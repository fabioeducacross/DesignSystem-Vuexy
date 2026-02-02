const o={title:"Educacross V2/LegendBadgesReadingMeter",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## LegendBadgesReadingMeter

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- Nenhum evento definido
        `}}}},s=`

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



`,d=`
<div class="d-flex gap-1">
    <b-badge
      variant=""
      class="d-flex align-items-center"
      pill
    >
      <span class="font-10">Sample Text</span>
    </b-badge>
  </div>
`,e={render:()=>`
    <style>${s}</style>
    ${d}
  `};var a,n,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(r=(n=e.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};const t=["Default"];export{e as Default,t as __namedExportsOrder,o as default};
