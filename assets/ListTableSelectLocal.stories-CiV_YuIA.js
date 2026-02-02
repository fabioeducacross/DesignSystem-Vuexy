const s={title:"Educacross V2/ListTableSelectLocal",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## ListTableSelectLocal

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- **header**

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




  .selectItems {
    color: inherit;
  }
  .checkbox-container {
    top: 1rem;
    right: 1rem;
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

  .selectable-card-container {
    flex: 1 1 auto;
    .card {
      flex: 1 1 auto;
    }
  }

  .selectAll-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    border-top: 1px solid inherit;

    padding: 1rem 2rem;
    padding: 1rem 1.175rem;

    @media (max-width: 576px) {
      flex-direction: column;
      justify-content: center;
    }
  }
  .border-arround {
    border: 1px solid #dae1e7;
  }
`,c=`
<div>
    <b-card no-body class="">
      <div class="slot-placeholder">
      <b-row class="p-2">
        <!-- Per Page -->
        <b-col
          cols="12"
          md="auto"
          class="d-flex align-items-center flex-wrap justify-content-start mb-1 mb-md-0"
        >
          <label>Sample Text</label>
          <v-select
            options=""
            clearable=""
            searchable=""
            class="per-page-selector d-inline-block mx-50"
          />
        </b-col>

        <!-- Search -->
        <b-col cols="12" md>
          <b-row align-h="end" align-v="center">
            <b-col style="max-width: 520px">
              <b-input-group>
                <div>
                  <b-input-group-text
                    id="searchQueryIcon"
                  >
                    <span class="material-symbols-outlined"> search </span>
                  </b-input-group-text>
`,e={render:()=>`
    <style>${o}</style>
    ${c}
  `};var r,t,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(a=(t=e.parameters)==null?void 0:t.docs)==null?void 0:a.source}}};const l=["Default"];export{e as Default,l as __namedExportsOrder,s as default};
