/**
 * QuestionDetail - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component QuestionDetail
 * @source educacross-frontoffice\src\components\evaluations\questionDetailV2\QuestionDetail.vue
 * @generated 2026-02-01T20:35:35.954192
 * 
 * Props: None
 * Slots: None
 * Emits: input
 */

export default {
  title: 'Educacross V2/QuestionDetail',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## QuestionDetail

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **input**
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


h5 {
  font-weight: 400;
  font-size: 1.15rem;
}

.question-card {
  background: #efefef;
}
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
.question-letter {
  font-size: 0.857rem;
}
.alternativeResultTitle {
  font-weight: 800;
}

.icon-games-finished {
  height: 10px;
  width: 10px;
  border: 2px solid #28c76f;
  border-radius: 50%;
}

.icon-games-unfinished {
  height: 10px;
  width: 10px;
  border: 2px solid #ea5455;
  border-radius: 50%;
}
`;

// Template base
const baseTemplate = `
<b-modal
    id="question-detail-modal"
    ref="question-detail-modal"
    visible=""
    content-class="shadow "
    modal-class="d-flex flex-column justify-content-center"
    title="Detalhes da questão"
    scrollable
    static
    size="lg"
  >
    <b-skeleton-wrapper loading="">
      <template v-slot:loading>
        <div>
          <b-row>
            <b-col cols="12" lg="4">
              <b-skeleton type="text" class="w-100 mb-2" height="50px" />
            </b-col>
            <b-col cols="12" lg="4">
              <b-skeleton type="text" class="w-100 mb-2" height="50px" />
            </b-col>
            <b-col cols="12" lg="4">
              <b-skeleton type="text" class="w-100 mb-2" height="50px" />
            </b-col>
          </b-row>
          <b-skeleton type="text" class="w-100 mb-2" height="200px" />
          <b-row>
            <b-col cols="12">
              <b-skeleton type="text" class="w-100 mb-2" height="50px" />
            </b-col>
            <b-col cols="12">
              <b-skeleton type="text" class="w-100 mb-2" height="50px" />
            </b-col>
          </b-row>
        </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


