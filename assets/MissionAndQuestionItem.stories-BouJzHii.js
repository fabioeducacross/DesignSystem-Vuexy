const n={title:"Educacross V2/MissionAndQuestionItem",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## MissionAndQuestionItem

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **open:details**
        `}}}},d=`

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


.image-border {
  border: 1px solid #d8d6de;
}
`,a=`
<b-card
    class=""
    body-class="d-flex flex-column"
    class="h-100"
  >
    <div class="d-flex flex-grow-1 flex-column flex-md-row">
      <b-media
        class="flex-column flex-md-row align-items-center mb-1 mb-md-0 flex-grow-1"
        vertical-align="center"
      >
        <div>
          <div
            class="image-border rounded mb-1 mb-md-0"
            class=""
          >
            <b-img
              src=""
              alt="Imagem do jogo"
              class="rounded"
              fluid
              height="100px"
              width="100px"
            />
            <div class="d-flex justify-content-center">
              <span
                v-b-tooltiphover=""
                class="material-symbols-outlined align-middle text-primary"
                style="font-size: 24px"
                >visibility</span
              >
            </div>
          </div>
`,e={render:()=>`
    <style>${d}</style>
    ${a}
  `};var s,o,r;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(r=(o=e.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const t=["Default"];export{e as Default,t as __namedExportsOrder,n as default};
