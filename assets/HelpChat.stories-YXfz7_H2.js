const s={title:"Educacross V2/HelpChat",tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
## HelpChat

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **input**
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



  

  inherit: var(--fixed-footer-var-height, 0);
  inherit: calc(
    100vh - #{inherit} - #{inherit} * 4 - #{inherit} - 108px
  );

  .help-chat-content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;

    position: absolute;
    right: 0;
    bottom: 100%;

    .font-20 {
      font-size: 20px;
    }
  }

  .help-chat {
    width: 400px;

    margin-bottom: inherit;
    margin-right: inherit;

    border-radius: inherit;
    border: 1px solid #d8d6de;

    box-shadow: 0px 10px 24px 0px #00000029;
  }

  .help-chat-content {
    max-height: inherit;

    z-index: 997;
  }

  .chat-help-button-container {
    width: 400px;
    display: flex;
    justify-content: center;
    @media print {
      display: none;
    }
  }

  .chat-help-button {
    z-index: 998;
    border-radius: inherit inherit 0 0 !important;
    margin-right: inherit;

    box-shadow: 0px 0px 24px 0px #00000029;
  }

  .typebot-content {
    width: 100%;
    height: min(400px, 100vh);
    overflow-y: auto;
  }

  @media (max-width: 576px) {
    #help-chat-wrapper {
      width: 100%;
      margin-right: 0;
    }

    .help-chat {
      width: 100vw;
      margin-right: 0;
      margin-bottom: 0;

      border-radius: 0;
    }

    .help-chat-content {
      width: 100%;
      height: calc(100vh - #{inherit} - #{inherit} - 50px);
      max-height: none;
      border-radius: 0 !important;
      margin-bottom: 0 !important;
      box-shadow: none !important;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .chat-help-button-container {
      width: fit-content;
      position: fixed;
      justify-content: flex-end;
    }

    .chat-help-button {
      border-radius: 50% !important;
      margin-bottom: inherit;
      width: 54px;
      height: 54px;
      padding: 0 !important;
    }

    .typebot-content {
      width: calc(100vw - #{inherit});
    }
  }
`,o=`
<div class="help-chat-content-wrapper">
    <b-collapse visible="">
      <div class="bg-white border help-chat">
        <div class="d-flex justify-content-between p-1 pb-0">
          <div>
            <span
              class="material-symbols-outlined cursor-pointer"
              >arrow_back_ios</span
            >
          </div>
          <span class="material-symbols-outlined cursor-pointer">
            close
          </span>
        </div>
        <div class="text-center help-chat-content d-flex flex-column justify-content-center">
          <div class="px-2 pb-2 overflow-y-auto">
            <p class="text-primary h2"><span class="font-bold">Olá</span></p>
            <p class="mb-2 font-16">
              Estamos aqui para ajudar você.<br />
              Por qual canal você prefere ser atendido?
            </p>

            <div class="mb-2">
              <b-button block variant="primary">
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <span> WhatsApp</span>
                  <b-img src="" alt="whatsapp icon" class="d-inline" style="width: 20px" />
                </div>
              </b-button>
              <b-button block variant="primary">
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <span> Chat</span>
                  <span class="material-symbols-outlined font-20">chat_bubble</span>
                </div>
              </b-button>

              <b-button block variant="primary">
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <span> E-mail</span>
                  <span class="material-symbols-outlined font-20">outgoing_mail</span>
                </div>
              </b-button>
              <b-button block variant="outline-primary">
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <span>Ir para a Central de Ajuda</span>
                  <span class="material-symbols-outlined font-20">arrow_forward</span>
                </div>
              </b-button>
            </div>

            <b-card-text class="font-16">
              O nosso atendimento é de
              <span class="text-primary font-bold">segunda a sexta-feira, das 7h às 19h.</span>
            </b-card-text>
          </div>
          <typebot-standard
            id="bot1"
            class="typebot-content"
          ></typebot-standard>
          <div></div>
        </div>
      </div>
    </b-collapse>
    <div class="chat-help-button-container">
      <b-button
        class="chat-help-button"
        variant="orange"
      >
        <span class="material-symbols-outlined align-middle">contact_support</span>
        <span class="align-middle d-none d-sm-inline">Precisando de ajuda?</span>
        <span class="material-symbols-outlined align-middle d-none d-sm-inline-block">
          Sample Text
        </span>
      </b-button>
    </div>
  </div>
`,t={render:()=>`
    <style>${i}</style>
    ${o}
  `};var e,a,n;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render: () => \`
    <style>\${componentStyles}</style>
    \${baseTemplate}
  \`
}`,...(n=(a=t.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const r=["Default"];export{t as Default,r as __namedExportsOrder,s as default};
