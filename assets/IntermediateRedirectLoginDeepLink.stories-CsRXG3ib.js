const d={title:"Educacross V2/IntermediateRedirectLoginDeepLink",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## IntermediateRedirectLoginDeepLink

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


.redirectLogin-container {
  background-color: white;
  border-radius: 12px;
  width: 670px;
  height: 652px;
  padding: 2.5rem 6rem;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    height: 100%;

    h3 {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
    }

    p {
      font-size: 16px;
      line-height: 19px;
    }

    img:first-child {
      width: 250px;
      height: 275px;
    }

    img:nth-child(2) {
      width: 256px;
      height: 42px;
    }

    @media (max-width: 400px) {
      img:first-child,
      img:nth-child(2) {
        width: 100%;
        height: auto;
      }
    }
  }
}

@media (max-width: 675px) {
  .redirectLogin-container {
    width: 90%;
  }
}

@media (max-width: 575px) {
  .redirectLogin-container {
    margin: 1rem 0;
    width: 85%;
    padding: 2rem;

    div {
      h3 {
        font-size: 20px;
      }
    }
  }
}
`,a=`
<div class="BackgroundSpace">
    <div class="redirectLogin-container">
      <div class="color-patternTwo">
        <img src="@/assets/images/images-educa/images-feedback/belinha-gear.png" alt="corujinha" />
        <img src="" alt="logo" />
        <div>
          <h3>Aguarde um instante</h3>
          <p class="mt-5">
            Você está sendo redirecionado para a experiência Sample Text. Pode levar alguns segundos.
          </p>
        </div>
        <div>
          <h3 class="text-danger">
            Sample Text
          </h3>
        </div>
      </div>
    </div>
  </div>
`,e={render:()=>`
    <style>${r}</style>
    ${a}
  `};var i,t,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(n=(t=e.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};const o=["Default"];export{e as Default,o as __namedExportsOrder,d as default};
