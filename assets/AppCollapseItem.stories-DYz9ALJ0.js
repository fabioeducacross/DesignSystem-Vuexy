const c={title:"Educacross V2/AppCollapseItem",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## AppCollapseItem

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- **header**

### Events
- **visible**
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


.collapse-icon {
  .card-header {
    &.left {
      padding: 1rem 1rem 1rem 3.8rem;
    }
  }
  [data-toggle='collapse'] {
    &.left {
      &:after {
        left: 1.5rem;
        right: auto;
      }
    }
  }
}
`,l=`
<b-card
    no-body
    class=""
  >
    <b-card-header
      class=""
      :aria-expanded="visible "
      :aria-controls="collapseItemID"
      role="tab"
      data-toggle="collapse"
    >
      <div class="slot-placeholder">
        <span class="lead collapse-title">Sample Text</span>
      </div>
    </b-card-header>

    <b-collapse id="" accordion="" role="tabpanel">
      <b-card-body class="">
        <div class="slot-placeholder">[Slot Content]</div>
      </b-card-body>
    </b-collapse>
  </b-card>
`,e={render:()=>`
    <style>${s}</style>
    ${l}
  `};var a,o,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(r=(o=e.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const t=["Default"];export{e as Default,t as __namedExportsOrder,c as default};
