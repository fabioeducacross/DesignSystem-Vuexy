const r={title:"Educacross V2/ExpandableFilterArea",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## ExpandableFilterArea

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- **footer**

### Events
- **update:modelValue**
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


.expand-content {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}
`,o=`
<section>
    <div>
      <div class="expand-content">
        <div class="slot-placeholder">[Slot Content]</div>
      </div>
    </div>

    <div class="slot-placeholder">

    <div class="d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-link p-0 font-bold"
        :aria-expanded="isOpen"
      >
        <span class="material-symbols-outlined align-middle font-16">
          Sample Text
        </span>
        <span class="align-middle font-semibold font-14">
          Sample Text
        </span>
        <span class="material-symbols-outlined align-middle font-16">
          Sample Text
        </span>
      </button>
    </div>
  </section>
`,e={render:()=>`
    <style>${s}</style>
    ${o}
  `};var a,t,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(n=(t=e.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};const d=["Default"];export{e as Default,d as __namedExportsOrder,r as default};
