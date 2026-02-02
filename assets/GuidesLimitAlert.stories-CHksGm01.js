const i={title:"Educacross V2/GuidesLimitAlert",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## GuidesLimitAlert

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **input**
        `}}}},t=`

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
<b-alert variant="" show>
    <div class="alert-body">
      <div class="d-flex justify-content-center align-items-center font-normal">
        <div
          class="d-flex flex-column flex-lg-row align-items-center gap-1"
        >
          <span class="material-symbols-outlined"> edit_calendar </span>
          É permitida a criação de até 40 missões ao mês por turma. Este mês, você criou:
          <span class="font-bold">
            Sample Text Sample Text.
          </span>
          <span
            v-b-tooltip="
              'Somente as missões criadas no mês atual são consideradas, canceladas não são contabilizadas.'
            "
            style="font-size: 15px"
            class="material-symbols-outlined"
          >
            info
          </span>
        </div>

        <div
          class="d-flex flex-column flex-lg-row align-items-center gap-1"
        >
          <span class="material-symbols-outlined"> edit_calendar </span>
          Atenção: é permitida a criação de até 40 missão ao mês por turma. Este mês, você criou:
          <span class="font-bold">
            Sample Text missões.
          </span>
          <span
            v-b-tooltip="
              'Somente as missões criadas no mês atual são consideradas, canceladas não são contabilizadas.'
            "
            style="font-size: 15px"
            class="material-symbols-outlined"
          >
            info
          </span>
        </div>

        <div
          class="d-flex flex-column flex-lg-row align-items-center gap-2"
        >
          <span class="material-symbols-outlined"> edit_calendar </span>
          <span>
            <span class="font-bold">As missões dessa turma se esgotaram.</span> É permitida a
            criação até 40 missões ao mês por turma, exclua uma missão para criar uma nova.
            <span
              v-b-tooltip="
                'Somente as missões criadas no mês atual são consideradas, canceladas não são contabilizadas.'
              "
              style="font-size: 15px; vertical-align: text-bottom"
              class="material-symbols-outlined"
            >
              info
            </span>
          </span>
        </div>
      </div>
    </div>
  </b-alert>
`,s={render:()=>`
    <style>${t}</style>
    ${n}
  `};var a,e,o;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(o=(e=s.parameters)==null?void 0:e.docs)==null?void 0:o.source}}};const l=["Default"];export{s as Default,l as __namedExportsOrder,i as default};
