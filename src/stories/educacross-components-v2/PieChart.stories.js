/**
 * PieChart - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component PieChart
 * @source educacross-frontoffice\src\components\chart\PieChart.vue
 * @generated 2026-02-01T21:06:31.178164
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Educacross V2/PieChart',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PieChart

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


.arrow_box {
  font-size: 12px;
  background: #fff;
  border: 1px solid #d8d6de;
  padding: 0 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
}

#chart .apexcharts-tooltip {
  color: #fff;
  background: transparent !important;
  transform: translateX(10px) translateY(10px);
  overflow: visible !important;
  white-space: normal !important;
}

#chart .apexcharts-tooltip span {
  padding: 5px 10px;
  display: inline-block;
}

.chart-tooltip-icon {
  height: 10px;
  width: 10px;
  border: 2px solid;
}
`;

// Template base
const baseTemplate = `
<div>
    <vue-apex-charts
      options=""
      series=""
      height=""
    />
    <div class="d-flex align-items-center justify-content-center mb-1">
      <svg
        width="103"
        height="102"
        viewBox="0 0 103 102"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="51.5"
          cy="51"
          r="50"
          fill="#BABFC7"
          fill-opacity="0.12"
          stroke="#D8D6DE"
          stroke-width="2"
        />
      </svg>
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


