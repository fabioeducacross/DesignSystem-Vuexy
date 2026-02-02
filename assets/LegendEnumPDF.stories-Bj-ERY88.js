const t={title:"Educacross V2/LegendEnumPDF",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## LegendEnumPDF

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- **enum-component**

### Events
- Nenhum evento definido
        `}}}},d=`

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
<div>
    <div>
      <div
        class="text-sm"
        class=""
      >
        <div class="d-flex justify-content-center gap-2 flex-wrap">
          <div>Sample Text</div>
          <div>
            <div class="slot-placeholder">
              <div class="SemaphoreStatus" :status-enum="item" size="pdf">
                <span class="font-10">Sample Text</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`,e={render:()=>`
    <style>${d}</style>
    ${o}
  `};var s,a,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const r=["Default"];export{e as Default,r as __namedExportsOrder,t as default};
