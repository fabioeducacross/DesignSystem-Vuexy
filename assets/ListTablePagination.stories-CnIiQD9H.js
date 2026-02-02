const r={title:"Educacross V2/ListTablePagination",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## ListTablePagination

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



`,o=`
<b-row>
    <b-col
      cols="12"
      sm=""
      class="d-flex align-items-center justify-content-center justify-content-sm-start mb-1 mb-sm-0"
      class=""
    >
      <span
        class="text-muted"
      >
      </span>
    </b-col>
    <!-- Pagination -->
    <b-col
      cols="12"
      sm=""
      class="d-flex align-items-center justify-content-center justify-content-sm-end"
      class=""
    >
      <b-pagination
        value=""
        :total-rows="totalData"
        :per-page="perPage"
        first-number
        last-number
        class="mb-0"
        prev-class="prev-item"
        next-class="next-item"
      >
        <div>
          <feather-icon icon="ChevronLeftIcon" size="18" />
`,e={render:()=>`
    <style>${n}</style>
    ${o}
  `};var t,s,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const c=["Default"];export{e as Default,c as __namedExportsOrder,r as default};
