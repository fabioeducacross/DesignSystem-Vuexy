const s={title:"Educacross V2/QuestionAlternative",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## QuestionAlternative

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


.letter-container {
  position: absolute;
  top: 0.5em;
  left: 0.5em;
}
.question-letter {
  font-size: 0.857rem;
}
.card-alternative {
  min-height: 80px;
}
.conntent-img {
  ::v-deep img {
    max-height: 200px;
  }
}
.border-success {
  border-width: 3px !important;
}
.body-alternative {
  min-height: 130px;
}
`,o=`
<b-card
    no-body
    class="card-alternative h-100"
    :border-variant="alternative.rightAlternative "
  >
    <b-card-body body-class="body-alternative">
      <div class="d-flex align-items-center justify-content-center h-full conntent-img">
        <div class="EvaluationsHtmlContentRenderer" content="" class="alternative-content" />
      </div>
      <div class="letter-container">
        <b-avatar
          size="sm"
          class="question-letter"
          variant=""
        >
          <span class="question-letter">
            Sample Text
          </span>
        </b-avatar>
      </div>
    </b-card-body>
  </b-card>
`,e={render:()=>`
    <style>${r}</style>
    ${o}
  `};var t,a,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const i=["Default"];export{e as Default,i as __namedExportsOrder,s as default};
