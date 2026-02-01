/**
 * ExpiredMission - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component ExpiredMission
 * @source educacross-frontoffice\src\components\mission-plus\ExpiredMission.vue
 * @generated 2026-02-01T20:35:35.841770
 * 
 * Props: None
 * Slots: None
 * Emits: close, edit
 */

export default {
  title: 'Educacross V2/ExpiredMission',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ExpiredMission

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **close**
- **edit**
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



`;

// Template base
const baseTemplate = `
<div class="expired-mission">
    <div class="expired-mission-content">
      <div class="d-flex justify-content-center mb-1">
        <img
          src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png"
          alt="belinha"
        />
      </div>
      <h2 class="mb-1 text-center text-body">Missão expirada</h2>
      <p class="attention-expired-mission mb-1">
        Opss... o prazo de duração da missão que você deseja enviar está com o prazo de duração
        expirado, por favor, ajuste o prazo de duração da missão antes de enviá-la aos seus alunos.
      </p>
      <div class="d-flex justify-content-center gap-4">
        <b-button variant="outline-primary" type="border"> Cancelar </b-button>
        <b-button
          variant="primary"
          type="filled"
          disabled=""
        >
          Editar missão
        </b-button>
      </div>
    </div>
  </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


