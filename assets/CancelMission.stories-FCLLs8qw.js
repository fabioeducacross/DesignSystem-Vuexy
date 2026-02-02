const s={title:"Educacross V2/CancelMission",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## CancelMission

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **close-cancel-mission**
- **close-cancel-mission-and-refresh**
        `}}}},i=`

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


.cancel-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  .confirm-cancel {
    display: flex;
    flex-direction: column;
    align-items: center;
    .img-school-doubt {
      width: 311px;
      height: 241px;
    }
    .title-cancel-mission {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      text-align: center;
      color: #4b4b4b;
    }
    .warning-cancel-mission {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      text-align: center;
      color: #6e6b7b;
      padding: 0 40px;
    }
    .attention-cancel-mission {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      color: #ea5455;
      padding: 0 40px;
    }
    .boxButton {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      .button-right,
      .button-left {
        width: 18rem;
        height: 48px;
        margin-bottom: 1rem;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0.4px;
      }
      .button-left {
        margin-right: 1%;
      }
      .button-right {
        margin-left: 1%;
      }
    }
  }
  .cancelled {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title-cancelled {
      font-style: normal;
      font-weight: 500;
      font-size: 28px;
      line-height: 36px;
      color: #5e5873;
    }
    .warning-mission-cancelled {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      color: #6e6b7b;
      padding: 0 40px;
    }
    .button-cancelled {
      width: 18rem;
      height: 48px;
      margin-bottom: 1rem;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.4px;
    }
  }
  .fade-in {
    animation-duration: 1s;
    animation-name: fadeIn;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
`,o=`
<div class="cancel-mission">
    <div class="confirm-cancel">
      <div class="d-flex justify-content-center mb-1">
        <img
          src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png"
          alt="belinha"
        />
      </div>

      <h2 class="mb-1 text-center text-body">Cancelar envio de missão?</h2>
      <p class="warning-cancel-mission mt-1">
        Tem certeza que deseja cancelar a "Sample Text"?
      </p>
      <p class="attention-cancel-mission mt-1">
        Atenção: Ao cancelar o envio da missão, a mesma não poderá ser reenviada para os alunos.
      </p>
      <div class="d-flex justify-content-center gap-4">
        <b-button variant="outline-danger" type="border">
          Não quero cancelar
        </b-button>
        <b-button
          variant="danger"
          type="filled"
          disabled=""
        >
          <b-spinner small />
          Quero cancelar
        </b-button>
      </div>
    </div>
    <div class="cancelled" class="">
      <h1 class="title-cancelled mb-6">Missão cancelada!</h1>
      <p class="warning-mission-cancelled mb-6">
        Não é mais possível enviar essa missão para os alunos, caso deseje ocultar a visualização
        dessa missão na listagem você pode arquivar a mesma.
      </p>
      <b-button
        class="button-cancelled"
        variant="primary"
        type="filled"
        size="large"
      >
        Ok
      </b-button>
    </div>
  </div>
`,e={render:()=>`
    <style>${i}</style>
    ${o}
  `};var n,t,a;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(a=(t=e.parameters)==null?void 0:t.docs)==null?void 0:a.source}}};const l=["Default"];export{e as Default,l as __namedExportsOrder,s as default};
