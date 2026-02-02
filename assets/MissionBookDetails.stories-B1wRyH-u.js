const n={title:"Educacross V2/MissionBookDetails",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## MissionBookDetails

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **update:value**
- **input**
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




.mission-book-details {
  min-height: 200px;
}

.activity-item {
  border: 1px solid #6e6b7b;
  border-radius: 6px;
  margin-bottom: 15px;
  width: calc(100% - 2px);
  min-height: 200px;
  position: relative;

  &:after {
    content: '';
    background: url('@/assets/images/mission-plus/triangle-bottom.svg');
    background-position: bottom center;
    background-repeat: no-repeat;
    width: 38px;
    height: 20px;
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
  }

  &.active {
    border-color: inherit;
    border-width: 2px;
    box-shadow: 0px 0px 10px 0px rgba(115, 103, 240, 0.65);

    &:after {
      background-image: url('@/assets/images/mission-plus/triangle-bottom-active.svg');
      bottom: -16px;
    }
  }
}

.activity-item-footer {
  height: 30px;
}
`,r=`
<b-modal
    centered
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    size="xl"
    static
    title="Detalhes da Missão"
  >
    <div>
      <button class="back">
        <span class="material-symbols-outlined" style="font-size: 16px">arrow_back</span>
      </button>
      <button class="close">
        <span aria-hidden="true">&times;</span>
      </button>
`,e={render:()=>`
    <style>${a}</style>
    ${r}
  `};var o,t,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(s=(t=e.parameters)==null?void 0:t.docs)==null?void 0:s.source}}};const i=["Default"];export{e as Default,i as __namedExportsOrder,n as default};
