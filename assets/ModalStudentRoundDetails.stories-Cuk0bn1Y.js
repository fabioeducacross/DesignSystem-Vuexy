const o={title:"Educacross V2/ModalStudentRoundDetails",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## ModalStudentRoundDetails

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **input**
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


.modal-icon {
  font-size: 80px;
}
`,s=`
<b-modal
    visible=""
    hide-footer
    size="xl"
    centered
    static
    no-close-on-backdrop
    header-bg-variant="light-primary"
  >
    <div>
      <div class="d-flex flex-col gap-2 p-2">
        <div class="StudentGameDetail"
          :student-round="studentGameDetail"
          :student-name="studentName"
        />

        <div class="StudentQuizDetail"
          :student-round="studentQuizDetail"
          :student-name="studentName"
        />
      </div>
      <div>
        <div class="StudentsDetail" :student-round="studentsDetail" />
      </div>
    </div>
  </b-modal>
`,e={render:()=>`
    <style>${n}</style>
    ${s}
  `};var t,d,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(a=(d=e.parameters)==null?void 0:d.docs)==null?void 0:a.source}}};const r=["Default"];export{e as Default,r as __namedExportsOrder,o as default};
