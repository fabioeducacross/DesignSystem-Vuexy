const t={title:"Educacross V2/BackgroundSpace",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## BackgroundSpace

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

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


.backgroundControl {
  background-image: url('@/assets/images/images-educa/deep-link/Educa_BG_Espaco.svg');
  background-position: center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  background-attachment: fixed;
}

// remove the background image on mobile
@media (max-width: 768px) {
  .backgroundControl {
    background-image: none !important;
  }
}
`,c=`
<div class="flex justify-center items-center backgroundControl">
    <div class="slot-placeholder">[Slot Content]</div>
  </div>
`,e={render:()=>`
    <style>${n}</style>
    ${c}
  `};var o,r,a;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};const d=["Default"];export{e as Default,d as __namedExportsOrder,t as default};
