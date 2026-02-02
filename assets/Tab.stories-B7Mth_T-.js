const s={title:"Educacross V2/Tab",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## Tab

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **update:currentTab**
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




.tab-line {
  border: 1px solid inherit;

  height: 1px;
  width: 100%;

  margin-bottom: 1rem;
}

.tabs-row {
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: thin;

  .tab-link {
    display: inline-block;
    position: relative;

    padding: 14px 24px 10px 24px;

    border-radius: 15px 15px 0 0;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);

    cursor: pointer;
    color: inherit;
    text-decoration: none;
    background: inherit;

    transform: translateX(calc(var(--index) * var(--offset)));

    white-space: nowrap;

    &:hover {
      color: inherit;
      background-color: inherit;
    }

    &.active {
      background: inherit;
      color: inherit;

      z-index: 1;
    }
  }
}
`,n=`
<div>
    <div
      class="d-flex flex-column-reverse flex-md-row justify-content-center justify-content-md-between align-items-md-baseline flex-nowwrap"
    >
      <div
        class="tabs-row d-md-flex"
        class=""
      >
        <a
          class="tab-link"
          style=""
          class=""
        >
          Sample Text
        </a>
      </div>
      <div
        class="d-flex align-items-center justify-content-center justify-content-md-end mb-50 mb-md-0 gap-1 tab-title text-primary font-bold text-uppercase"
      >
        <span class="material-symbols-outlined">
          Sample Text
        </span>
        Sample Text
      </div>
    </div>

    <div
      class="tab-line"
      class=""
    />
    <div>
      <div class="slot-placeholder">
    </div>
  </div>
`,e={render:()=>`
    <style>${o}</style>
    ${n}
  `};var t,a,r;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(r=(a=e.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};const i=["Default"];export{e as Default,i as __namedExportsOrder,s as default};
