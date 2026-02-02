const c={title:"Educacross V2/ListTableLocalSorting",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## ListTableLocalSorting

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- **header**

### Events
- **update:sortBy**
- **update:sortDesc**
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


.searchQuery {
  border-left: 0;
  padding-left: 0;
}

#searchQueryIcon {
  .material-symbols-outlined {
    font-size: 18px;
  }
}

.per-page-selector {
  width: 90px;
  min-width: 90px;
}

.card-border {
  border: 1px solid #d8d6de;
  box-shadow: none;
}
`,t=`
<div>
    <b-card no-body class="">
      <div class="slot-placeholder">
      <div class="">
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="auto"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Sample Text</label>
            <v-select
              options=""
              clearable=""
              searchable=""
              class="per-page-selector d-inline-block mx-50"
            />
          </b-col>

          <b-col md="auto" class="mb-1 mb-md-0">
            <b-dropdown
              text="Primary"
              variant="outline-primary"
              toggle-class="d-flex align-items-center gap-1 py-50"
              block
            >
              <div>
                <span class="material-symbols-outlined"> tune </span>
                <span class="mr-auto">Classificar e ordenar</span>
`,e={render:()=>`
    <style>${s}</style>
    ${t}
  `};var a,r,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(o=(r=e.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};const l=["Default"];export{e as Default,l as __namedExportsOrder,c as default};
