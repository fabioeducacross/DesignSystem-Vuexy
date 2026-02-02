const s={title:"Educacross V2/Template1",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## Template1

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- Nenhum evento definido
        `}}}},r=`

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



`,c=`
<b-row>
    <b-col cols="12">
      <b-card>
        <div class="QuestionContent" content="" />
        <div class="QuestionContent"
          content=""
        />
      </b-card>
      <b-card>
        <div class="QuestionContent" content="" />
      </b-card>
    </b-col>
    <b-col cols="12" md="12">
      <b-row class="match-height h-full">
        <b-col cols="12" md="6" lg="3">
          <div class="QuestionAlternative" alternative="" />
        </b-col>
      </b-row>
    </b-col>
  </b-row>
`,e={render:()=>`
    <style>${r}</style>
    ${c}
  `};var o,t,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(n=(t=e.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};const a=["Default"];export{e as Default,a as __namedExportsOrder,s as default};
