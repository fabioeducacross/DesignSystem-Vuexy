/**
 * ConditionalValueDisplay - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component ConditionalValueDisplay
 * @source educacross-frontoffice\src\components\badge\ConditionalValueDisplay.vue
 * @generated 2026-02-01T21:06:30.950570
 * 
 * Props: None
 * Slots: empty
 * Emits: None
 */

export default {
  title: 'Educacross V2/ConditionalValueDisplay',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ConditionalValueDisplay

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- **empty**

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


.badge {
  font-size: 10px;
  font-weight: 700;
}
`;

// Template base
const baseTemplate = `
<div class="flex-grow-1">
    <div>
      <b-badge variant="light-primary" class="text-uppercase" pill>
        Não há dados para exibir
      </b-badge>
      <div class="d-flex flex-column align-items-center justify-content-center h-100">
        <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
        <span
          class="text-center font-bold"
          class=""
        ></span>
        <div class="slot-placeholder"></div>
      </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


