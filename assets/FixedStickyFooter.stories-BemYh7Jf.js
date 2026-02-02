const n={title:"Educacross V2/FixedStickyFooter",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## FixedStickyFooter

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





.fixed-footer-wrapper {
  z-index: 998;
  left: inherit;
  box-shadow: 0px -6px 14px 0px #00000029;

  &.expand {
    left: inherit;
  }
}

@media (max-width: 1199px) {
  .fixed-footer-wrapper {
    left: 0;

    &.expand {
      left: 0;
    }
  }
}
`,d=`
<div
    class="footer position-fixed bottom-0 left-0 right-0 fixed-footer-wrapper"
  >
    <div class="HelpChat" />
    <div id="actions-footer">
      <portal-target
        class=""
        name="fixed-sticky-footer-destination"
      />
    </div>
  </div>
`,e={render:()=>`
    <style>${a}</style>
    ${d}
  `};var o,t,r;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(r=(t=e.parameters)==null?void 0:t.docs)==null?void 0:r.source}}};const s=["Default"];export{e as Default,s as __namedExportsOrder,n as default};
