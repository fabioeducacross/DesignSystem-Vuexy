const n={title:"Educacross V2/MissionVisualization",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## MissionVisualization

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- Nenhum evento definido
        `}}}},i=`

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




  img:last-child {
    position: absolute;
    width: inherit;
    top: inherit;
    left: inherit;
  }
}

.tablet-container {
  
}

.phone-container {
  
}
`,t=`
<div class="mission-visualization d-flex flex-column align-items-center mx-1 mw-100 mb-2">
    <div class="d-flex align-items-center justify-content-evenly mb-1 gap-2">
      <span
        class="material-symbols-outlined cursor-pointer"
        class=""
      >
        arrow_back_ios
      </span>
      <div
        class=""
      >
        <img
          src=""
          alt="activity"
        />
      </div>
      <span
        class="material-symbols-outlined cursor-pointer"
        class=""
      >
        arrow_forward_ios
      </span>
    </div>

    <div>
      <div class="tablet-container">
        <img src="@/assets/images/teacher-context/school-context/devices/iPad.png" alt="tablet" />
        <b-img-lazy src="" alt="teacherImg" />
      </div>
      <h3 class="modal-vision">Visão do Professor</h3>

      <div class="phone-container">
        <img src="@/assets/images/teacher-context/school-context/devices/iPhone.png" alt="phone" />
        <b-img-lazy src="" alt="studentImg" />
      </div>
    </div>

    <h3 class="modal-vision">Visão do Aluno</h3>
  </div>
`,e={render:()=>`
    <style>${i}</style>
    ${t}
  `};var s,o,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const r=["Default"];export{e as Default,r as __namedExportsOrder,n as default};
