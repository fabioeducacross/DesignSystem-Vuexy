/**
 * MultipleDropdown - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component MultipleDropdown
 * @source educacross-frontoffice\src\components\selects\MultipleDropdown.vue
 * @generated 2026-02-01T20:35:35.911298
 * 
 * Props: None
 * Slots: None
 * Emits: change
 */

export default {
  title: 'Educacross V2/MultipleDropdown',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## MultipleDropdown

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **change**
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


.sub-items {
  position: absolute;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  // padding: 8px;
  z-index: 10;
  left: 100%;
  top: 0;
}
.select-subject-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}
`;

// Template base
const baseTemplate = `
<b-dropdown
    id="dropdown-button-subject-parent"
    text="Primary"
    variant="outline-secondary"
    no-caret
    block
    menu-class="w-100 mt-0"
    disabled=""
  >
    <template #button-content>
      <div class="select-subject-wrapper">
        <div>
          <b-spinner small />
        </div>
        <span class="font-normal text-body">
          Sample Text
        </span>
        <span class="font-normal text-body">
          Sample Text
          {{ selectedChildren  }}
        </span>
        <span class="material-symbols-outlined text-body" style="font-size: 20px">
          expand_more
        </span>
      </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


