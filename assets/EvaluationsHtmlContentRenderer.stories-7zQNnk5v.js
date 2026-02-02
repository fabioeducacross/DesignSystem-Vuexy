const o={title:"Educacross V2/EvaluationsHtmlContentRenderer",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## EvaluationsHtmlContentRenderer

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


.html-content-renderer {
  white-space: wrap;
  overflow-wrap: break-word;

  img {
    max-width: var(--max-image-width);
    max-height: var(--max-image-height);
    height: auto;
  }

  .align-center {
    display: block;
    text-align: center;
    width: 100%;

    img {
      display: inline-block;
      max-width: var(--max-image-width);
      max-height: var(--max-image-height);
    }
  }

  .align-left {
    display: block;
    text-align: left;
    width: 100%;

    img {
      display: inline-block;
      max-width: var(--max-image-width);
      max-height: var(--max-image-height);
    }
  }

  .align-right {
    display: block;
    text-align: right;
    width: 100%;

    img {
      display: inline-block;
      max-width: var(--max-image-width);
      max-height: var(--max-image-height);
    }
  }

  .align-justify {
    display: block;
    text-align: justify;
    width: 100%;

    img {
      display: inline-block;
      max-width: var(--max-image-width);
      max-height: var(--max-image-height);
    }
  }
}
`,n=`
<div class="html-content-renderer" style=""></div>
`,e={render:()=>`
    <style>${r}</style>
    ${n}
  `};var a,t,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(i=(t=e.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};const d=["Default"];export{e as Default,d as __namedExportsOrder,o as default};
