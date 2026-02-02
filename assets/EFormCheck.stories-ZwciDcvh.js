const t={title:"Educacross V2/EFormCheck",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## EFormCheck

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **update:checked**
- **update:indeterminate**
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


.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 24px;
}

.checkbox-container.disabled {
  cursor: not-allowed;
  color: var(--secondary);
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24;
  box-shadow: none;
}
`,n=`
<div
    class="checkbox-container"
    class=""
  >
    <span
      class="material-symbols-outlined"
      class=""
    >
      Sample Text
    </span>
    <label class="">Sample Text</label>
  </div>
`,e={render:()=>`
    <style>${s}</style>
    ${n}
  `};var o,a,r;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(r=(a=e.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};const c=["Default"];export{e as Default,c as __namedExportsOrder,t as default};
