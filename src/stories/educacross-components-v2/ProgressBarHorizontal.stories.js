/**
 * ProgressBarHorizontal - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component ProgressBarHorizontal
 * @source educacross-frontoffice\src\components\progessBar\ProgressBarHorizontal.vue
 * @generated 2026-02-01T21:06:31.187146
 * 
 * Props: None
 * Slots: default, right-content
 * Emits: None
 */

export default {
  title: 'Educacross V2/ProgressBarHorizontal',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ProgressBarHorizontal

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- **default**
- **right-content**

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


.font-size-md {
  font-size: 14px;
}

.bg-progress-bar-danger {
  background: rgba(234, 84, 85, 0.12);
}

.bg-progress-bar-warning {
  background: rgba(250, 184, 74, 0.12);
}

.bg-progress-bar-success {
  background: rgba(40, 199, 111, 0.12);
}
`;

// Template base
const baseTemplate = `
<div class="">
    <b-row class="mb-50">
      <b-col>
        <div class="text-left">
          <span class="font-bold" class="">
            Sample Text
          </span>
          <div class="slot-placeholder"></div>
        </div>
      </b-col>
      <b-col cols="auto">
        <span
          class="font-bold"
          class=""
        >
          Sample Text
        </span>
        <div class="slot-placeholder"></div>
      </b-col>
    </b-row>

    <div class="rounded-lg" class="">
      <b-progress
        v-b-tooltip.hover.top=""""
        variant=""
        value=""
        max="100"
        height="5px"
      />
    </div>
    <h6
      class="font-bold"
      class=""
    >
      Sample Text
    </h6>
    <div class="">
      <span>
        Sample Text
      </span>
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


