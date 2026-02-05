/**
 * NPS - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component NPS
 * @source educacross-frontoffice\src\components\NPS\NPS.vue
 * @generated 2026-02-01T21:06:31.153670
 * 
 * Props: None
 * Slots: None
 * Emits: close
 */

export default {
  title: 'Front-office/Feedback/NPS',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## NPS

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **close**
        `
      }
    }
  }
};

// Estilos inline do componente
const componentStyles = `

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


.title-one-nps {
    font-weight: 500;
    font-size: 21px;
    line-height: 25px;
  }

  .title-two-nps {
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
  }

  .subtitle-nps {
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
  }

  .will-recomend {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
  }

  .buttonNPS-box {
    display: flex;
    justify-content: space-between;
    button {
      width: 17rem;
      padding: 1rem 2rem !important;
    }
    div {
      display: flex;
      align-items: center;
    }

    @media (max-width: 1200px) {
      flex-direction: column;

      button {
        width: 100%;
      }
      div {
        flex-direction: column-reverse;
        text-align: center;
      }
    }
  }

  .container-number {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .numbers {
      font-weight: bold;
      font-size: 32px;
      line-height: 38px;
      width: fit-content;
      border-radius: 8px;
      border: 4px solid #c4c4c4;
      cursor: pointer;
      width: 62px;
      height: 78px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0.5rem 1rem 0.5rem;
    }
    .border-selectedNumber {
      border: 2px solid rgba(var(--primary), 1);
    }
  }
`;

// Template base
const baseTemplate = `
<div class="px-2 pb-2">
    <div class="color-patternTwo text-center">
      <h3 class="title-one-nps">
        Qual é a probabilidade de você recomendar a Sample Text para um amigo ou colega?
      </h3>
      <h3 class="title-two-nps">
        Sample Text
      </h3>
    </div>
    <form class="mt-2" @submit.prevent>
      <div class="color-patternTwo">
        <span class="will-recomend">Pouco provável</span>
      </div>
      <b-row class="container-number mt-2">
        <b-col cols="12" md="12" lg="6" class="d-flex align-items-center justify-content-around">
          <div
            class="numbers"
            class=""
          >
            <span
              class=""
            >
              Sample Text
            </span>
            <span
              class=""
            >
              Sample Text
            </span>
            <span
              class=""
            >
              Sample Text
            </span>
          </div>
        </b-col>
        <b-col cols="12" md="12" lg="6" class="d-flex align-items-center justify-content-around">
          <div
            class="numbers"
            class=""
          >
            <span
              class=""
            >
              Sample Text
            </span>
            <span
              class=""
            >
              Sample Text
            </span>
            <span
              class=""
            >
              Sample Text
            </span>
          </div>
        </b-col>
      </b-row>
      <div class="color-patternTwo text-right mb-1">
        <span class="will-recomend">Muito provável</span>
      </div>
      <div>
        <b-form-textarea
          id="textarea"
          class="mb-1"
          placeholder="Deixe seu comentário (opcional)"
          rows="5"
          max-rows="6"
          disabled=""
        />
      </div>
      <b-row class="mb-1">
        <b-col>
          <span
            class="font-bold text-primary cursor-pointer"
            >Não aparecer novamente</span
          >
        </b-col>
      </b-row>
      <b-row align-h="end">
        <b-col cols="12" md="12" lg="4" xl="3">
          <b-button
            id="button-loading-dontShowAgainNPS"
            variant="outline-primary"
            type="border"
            class="w-100 mb-1 mb-sm-1"
            disabled=""
          >
            <div class="d-flex align-items-center justify-content-center gap-2">
              <b-spinner small />
              <span>Responder depois</span>
            </div>
          </b-button>
        </b-col>
        <b-col cols="12" md="12" lg="4" xl="3">
          <b-button
            variant="primary"
            type="filled"
            class="w-100"
            disabled=""
          >
            <div class="d-flex align-items-center justify-content-center gap-2">
              <b-spinner small />
              <span>Enviar</span>
            </div>
          </b-button>
        </b-col>
      </b-row>
    </form>
  </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


