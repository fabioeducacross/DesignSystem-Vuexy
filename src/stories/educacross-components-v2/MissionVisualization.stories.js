/**
 * MissionVisualization - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component MissionVisualization
 * @source educacross-frontoffice\src\components\missions\MissionVisualization.vue
 * @generated 2026-02-01T20:35:35.904777
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Educacross V2/MissionVisualization',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## MissionVisualization

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


@mixin deviceContainer(inherit, inherit, inherit) {
  position: relative;
  top: 0;
  left: 0;

  img:first-child {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
  }

  img:last-child {
    position: absolute;
    width: inherit;
    top: inherit;
    left: inherit;
  }
}

.tablet-container {
  
}

.phone-container {
  
}
`;

// Template base
const baseTemplate = `
<div class="mission-visualization d-flex flex-column align-items-center mx-1 mw-100 mb-2">
    <div class="d-flex align-items-center justify-content-evenly mb-1 gap-2">
      <span
        class="material-symbols-outlined cursor-pointer"
        class=""
      >
        arrow_back_ios
      </span>
      <div
        class=""
      >
        <img
          src=""
          alt="activity"
        />
      </div>
      <span
        class="material-symbols-outlined cursor-pointer"
        class=""
      >
        arrow_forward_ios
      </span>
    </div>

    <div>
      <div class="tablet-container">
        <img src="@/assets/images/teacher-context/school-context/devices/iPad.png" alt="tablet" />
        <b-img-lazy src="" alt="teacherImg" />
      </div>
      <h3 class="modal-vision">Visão do Professor</h3>

      <div class="phone-container">
        <img src="@/assets/images/teacher-context/school-context/devices/iPhone.png" alt="phone" />
        <b-img-lazy src="" alt="studentImg" />
      </div>
    </div>

    <h3 class="modal-vision">Visão do Aluno</h3>
  </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


