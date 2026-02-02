const o={title:"Educacross V2/CellStatus",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## CellStatus

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- Nenhum evento definido
        `}}}},l=`

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
<div
    class="position-absolute h-full w-full inset-0 d-flex align-items-center justify-content-center flex-column gap-1 text-uppercase"
    class=""
  >
    <div>
      <b-badge
        pill=""
        variant=""
        class=""
      >
        <span
          class=""
          style="font-size: 12px"
        >
          person_edit
        </span>
        Sample Text
      </b-badge>
    </div>

    <div class="d-flex align-items-center gap-1">
      <span class="material-icons-outlined" class="">
        Sample Text
      </span>
      <small class="font-semibold uppercase" class="">
        Sample Text
      </small>
    </div>

    <div class="d-flex align-items-center gap-1" class="">
      <span class="material-symbols-outlined" style="font-size: 16px">pace</span>
      <span class="font-bold">Sample Text</span>
    </div>
    <div class="d-flex align-items-center" class="">
      <span class="font-bold">Sample Text</span>
    </div>
  </div>
`,e={render:()=>`
    <style>${l}</style>
    ${n}
  `};var s,a,t;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(t=(a=e.parameters)==null?void 0:a.docs)==null?void 0:t.source}}};const c=["Default"];export{e as Default,c as __namedExportsOrder,o as default};
