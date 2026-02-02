const d={title:"Educacross V2/RainbowProgressBar",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## RainbowProgressBar

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- **legend**

### Events
- Nenhum evento definido
        `}}}},n=`

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


.triangle-rainbow-bar {
  margin-top: 3px;
  position: relative;
  height: 8px;
  background: linear-gradient(
    90deg,
    #ea5455 -1.31%,
    #ffb443 34.59%,
    #28c76f 66.8%,
    #7367f0 100.06%
  );
}
.rainbow-bar {
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(
    90deg,
    #ea5455 -1.31%,
    #ffb443 34.59%,
    #28c76f 66.8%,
    #7367f0 100.06%
  );
}
`,s=`
<div class="w-full">
    <div class="rainbow-bar"></div>
    <div class="triangle-rainbow-bar mb-50" style=""></div>
    <div class="slot-placeholder"></div>
  </div>
`,e={render:()=>`
    <style>${n}</style>
    ${s}
  `};var r,a,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const t=["Default"];export{e as Default,t as __namedExportsOrder,d as default};
