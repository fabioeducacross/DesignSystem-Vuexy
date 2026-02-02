/**
 * MissionDetailsPlus - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component MissionDetailsPlus
 * @source educacross-frontoffice\src\components\mission-plus\MissionDetailsPlus.vue
 * @generated 2026-02-01T21:06:31.128362
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Educacross V2/MissionDetailsPlus',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## MissionDetailsPlus

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- Nenhum evento definido
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


.title {
  color: #5e5873;
}
.mission-visualization-container {
  max-width: 480px;
}
`;

// Template base
const baseTemplate = `
<b-overlay show="" opacity="1" rounded="md">
    <h1 class="text-primary text-center mb-2">Sample Text</h1>
    <div class="d-flex justify-content-center mb-2">
      <b-badge variant="light-primary" pill class="d-flex align-items-center gap-1">
        <img src="" alt="Missão Plus" />
        Missão Plus
      </b-badge>
    </div>

    <b-row class="match-height">
      <b-col cols="12" lg="6">
        <b-card border-variant="light-gray shadow-none d-flex flex-column">
          <div class="title font-weight-bold">Turma:</div>
          <p class="text-primary m-0 font-weight-bold">Sample Text</p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6">
        <b-card border-variant="light-gray shadow-none d-flex flex-column">
          <div class="title font-weight-bold">Duração:</div>
          <p class="text-primary m-0 font-weight-bold">
            Sample Text a Sample Text
          </p>
        </b-card>
      </b-col>
      <b-col cols="12">
        <b-card border-variant="light-gray shadow-none d-flex flex-column">
          <div class="title font-weight-bold">Alunos:</div>
          <p class="text-primary m-0 font-weight-bold">
            Sample Text
          </p>
        </b-card>
      </b-col>

      <b-col cols="12">
        <div class="cards-round-slide my-2" class="">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                style="width: 125px"
              >
                <div class="d-flex flex-column align-items-center h-100 mx-auto">
                  <h6 class="text-center uppercase text-body">Turno Sample Text</h6>
                  <b-card
                    body-class="p-75"
                    border-variant="primary"
                    bg-variant="transparent"
                    class="shadow-none flex-grow-1 w-100"
                  >
                    <b-img-lazy
                      src=""
                      alt=""
                      width="100"
                      height="100"
                      class="mb-75 mx-auto"
                    />

                    <b-card-text class="text-center text-body text-wrap">
                      Sample Text
                    </b-card-text>
                  </b-card>
                </div>
              </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-overlay>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


