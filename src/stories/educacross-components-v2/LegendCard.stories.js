/**
 * LegendCard - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component LegendCard
 * @source educacross-frontoffice\src\components\legends\LegendCard.vue
 * @generated 2026-02-01T20:35:35.862655
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Educacross V2/LegendCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## LegendCard

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



`;

// Template base
const baseTemplate = `
<section class="d-flex flex-column flex-md-row gap-2">
    <b-card
      class="flex-1 border-2 position-relative"
      class=""
    >
      <span
        v-b-tooltip.hover="tooltipActiveText"
        class="material-symbols-outlined position-absolute"
        class=""
        style="right: 10px; top: 10px; font-size: 16px"
      >info</span>
      <div class="text-center mb-1">
        <MediaCardIcon icon="" variant="" class="mb-1" />
        <h6 class="font-weight-bolder text-body">Sample Text</h6>
      </div>
      <slot name="" item="" />
    </b-card>
  </section>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


