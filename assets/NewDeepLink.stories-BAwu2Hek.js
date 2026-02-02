const r={title:"Educacross V2/NewDeepLink",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## NewDeepLink

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- Nenhum evento definido
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


.brand-logo {
  width: auto;
  margin: 0 auto;
  max-width: 40%;
  min-width: 150px;
  height: auto;
}

.media-icon-container {
  width: 80px;
  height: 80px;
  @media (max-width: 767px) {
    width: 45px;
    height: 45px;
  }
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  .media-icon {
    font-size: 48px;
    font-weight: 600;
    @media (max-width: 767px) {
      font-size: 20px;
    }
  }
}
`,o=`
<b-card body-class="p-50 p-md-3" class="max-w-screen-md">
    <b-img src="" class="brand-logo mb-3" />

    <div
      class="d-flex flex-col align-items-center justify-content-center gap-5 mt-1"
    >
      <!-- first button -->
      <div>
        <b-media
          class=""
          vertical-align="center"
        >
          <div>
            <div class="">
              <span class="material-symbols-outlined text-white media-icon"> sports_esports </span>
            </div>
`,e={render:()=>`
    <style>${s}</style>
    ${o}
  `};var t,a,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const i=["Default"];export{e as Default,i as __namedExportsOrder,r as default};
