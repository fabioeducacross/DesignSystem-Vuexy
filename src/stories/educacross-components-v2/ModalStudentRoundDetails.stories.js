/**
 * ModalStudentRoundDetails - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component ModalStudentRoundDetails
 * @source educacross-frontoffice\src\components\mission-plus\ModalStudentRoundDetails.vue
 * @generated 2026-02-01T20:35:35.909208
 * 
 * Props: None
 * Slots: None
 * Emits: input
 */

export default {
  title: 'Educacross V2/ModalStudentRoundDetails',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ModalStudentRoundDetails

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


.modal-icon {
  font-size: 80px;
}
`;

// Template base
const baseTemplate = `
<b-modal
    ref="Modal"
    visible=""
    hide-footer
    size="xl"
    centered
    static
    no-close-on-backdrop
    header-bg-variant="light-primary"
  >
    <div>
      <div class="d-flex flex-col gap-2 p-2">
        <StudentGameDetail
          :student-round="studentGameDetail"
          :student-name="studentName"
        />

        <StudentQuizDetail
          :student-round="studentQuizDetail"
          :student-name="studentName"
        />
      </div>
      <div>
        <StudentsDetail :student-round="studentsDetail" />
      </div>
    </div>
  </b-modal>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


