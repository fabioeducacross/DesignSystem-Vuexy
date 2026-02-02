const n={title:"Educacross V2/ModalStudentActivityDetails",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## ModalStudentActivityDetails

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **input**
        `}}}},o=`

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
    title=""
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
        <div class="StudentActivityDetail"
          :student-round="studentActivityDetail"
          :student-name="studentName"
        />
      </div>
      <div>
        <div class="StudentsDetail" :student-round="studentsData" />
      </div>
    </div>
  </b-modal>
`,e={render:()=>`
    <style>${o}</style>
    ${s}
  `};var t,a,d;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(d=(a=e.parameters)==null?void 0:a.docs)==null?void 0:d.source}}};const r=["Default"];export{e as Default,r as __namedExportsOrder,n as default};
