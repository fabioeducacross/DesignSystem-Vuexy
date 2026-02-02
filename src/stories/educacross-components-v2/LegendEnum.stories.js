/**
 * LegendEnum - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component LegendEnum
 * @source educacross-frontoffice\src\components\legends\LegendEnum.vue
 * @generated 2026-02-01T21:06:31.058255
 * 
 * Props: None
 * Slots: enum-component
 * Emits: None
 */

export default {
  title: 'Educacross V2/LegendEnum',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## LegendEnum

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- **enum-component**

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


.card-border {
  border: 1px solid #d8d6de;
  box-shadow: none;
}
`;

// Template base
const baseTemplate = `
<b-card no-body class="">
    <div>
      <b-card-body
        class="text-sm"
        class=""
      >
        <div class="d-flex justify-content-center align-items-center gap-2 flex-wrap">
          <div>Sample Text:</div>
          <div>
            <div class="slot-placeholder">
              <div class="SemaphoreStatus" :status-enum="item">
                <span>Sample Text</span>
              </div>
            </div>
          </div>
        </div>
        <p
          class="mt-1 mb-0"
        ></p>
      </b-card-body>
      <hr />
    </div>
  </b-card>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


