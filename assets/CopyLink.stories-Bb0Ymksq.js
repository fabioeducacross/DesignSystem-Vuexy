const a={title:"Educacross V2/CopyLink",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## CopyLink

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **close-copylink-modal**
        `}}}},s=`

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


.image {
  margin-bottom: 24px;
}

.title {
  color: #5e5873;
  font-size: 24px;
  line-height: 29px;
  font-weight: 500;
  margin-bottom: 24px;
}
.custom-button {
  width: 233px;
}

.custom-input {
  padding: 12px 38px;
  margin-bottom: 24px;
  pointer-events: none;
  cursor: pointer !important;
}
`,r=`
<div class="d-flex flex-column align-items-center">
    <img
      src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-copy_link.png"
      class="image"
      alt="belinha"
    />
    <h1 class="title">Copiar link da missão</h1>
    <b-form-input class="cursor-pointer custom-input" />
    <b-button class="custom-button" variant="primary" type="filled">
      Copiar link
    </b-button>
  </div>
`,e={render:()=>`
    <style>${s}</style>
    ${r}
  `};var o,t,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(n=(t=e.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};const c=["Default"];export{e as Default,c as __namedExportsOrder,a as default};
