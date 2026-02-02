const l={title:"Educacross V2/StudentGameDetailsModal",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## StudentGameDetailsModal

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
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


.modal-game-image {
  width: 95px;
  height: 95px;
}
`,c=`
<b-modal
    id="student-detail-modal"
    visible=""
    content-class="shadow "
    modal-class="d-flex flex-column justify-content-center"
    title="Detalhes do aluno no jogo"
    hide-footer
    scrollable
    static
    size="xl"
  >
    <section>
      <b-skeleton-wrapper loading="" class="w-100 px-1">
        <div>
          <div class="h-100">
            <b-row class="match-height h-50">
              <b-col cols="12">
                <b-row>
                  <b-col>
                    <b-row>
                      <b-col cols="6">
                        <b-skeleton
                          type="card"
                          height="100px"
                          class="w-100 rounded mb-1"
                        ></b-skeleton>
                      </b-col>
                      <b-col cols="6">
                        <b-skeleton
                          type="card"
                          height="100px"
                          class="w-100 rounded mb-1"
                        ></b-skeleton>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
`,e={render:()=>`
    <style>${a}</style>
    ${c}
  `};var o,t,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(s=(t=e.parameters)==null?void 0:t.docs)==null?void 0:s.source}}};const r=["Default"];export{e as Default,r as __namedExportsOrder,l as default};
