/**
 * GameDetailsModal - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component GameDetailsModal
 * @source educacross-frontoffice\src\components\modal\GameDetailsModal.vue
 * @generated 2026-02-01T21:06:31.024537
 * 
 * Props: None
 * Slots: None
 * Emits: input
 */

export default {
  title: 'Educacross V2/GameDetailsModal',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## GameDetailsModal

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


.modal-game-image {
  width: 95px;
  height: 95px;
}

.dot-list {
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background-color: #6e6b7b;
}
.title-activity {
  word-break: break-word;
  color: #6b6b6b;
}
.firstActivityColumn-image {
  min-width: 100px;
}
.secondActivityColumn-description {
  flex: 1;
}
.text-activityCard {
  font-weight: normal;
}

.back {
  position: absolute;
  top: -2px;
  right: 30px;

  padding: 0.7rem 0.7rem;
  box-shadow: 0 5px 20px 0 rgb(34 41 47 / 10%);
  border-radius: 0.357rem;
  background: #fff;

  color: #5e5873;

  opacity: 1;
  transition: all 0.23s ease 0.1s;

  &:hover {
    transform: translate(-3px, 5px);
  }
}

.left-arrow-icon {
  stroke-width: 3;
  transform: scale(1.2);
}
.ActivityImage {
  max-width: 100px;
  max-height: 100px;
  height: auto;
}
`;

// Template base
const baseTemplate = `
<b-modal
    id="student-detail-modal"
    visible=""
    content-class="shadow "
    modal-class="d-flex flex-column justify-content-center"
    title="Detalhes do jogo"
    hide-footer
    scrollable
    static
    size="xl"
  >
    <div>
      <button class="back">
        <span class="material-symbols-outlined" style="font-size: 16px">arrow_back</span>
      </button>
      <button class="close">
        <span aria-hidden="true">&times;</span>
      </button>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


