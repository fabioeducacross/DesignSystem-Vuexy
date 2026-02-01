/**
 * TabCards - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component TabCards
 * @source educacross-frontoffice\src\components\tab\TabCards.vue
 * @generated 2026-02-01T20:35:35.999800
 * 
 * Props: None
 * Slots: None
 * Emits: click
 */

export default {
  title: 'Educacross V2/TabCards',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## TabCards

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **click**
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


.active {
  .card {
    margin-bottom: 0 !important;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    &::before {
      content: '';
      position: absolute;
      background: transparent;
      bottom: 0;
      left: -0.856rem;
      height: 0.428rem;
      width: 0.856rem;
      border-bottom-right-radius: 0.428rem;
      box-shadow: 0.428rem 0 0 0 #fff;
    }
    &::after {
      content: '';
      position: absolute;
      background: transparent;
      bottom: 0;
      right: -0.856rem;
      height: 0.428rem;
      width: 0.856rem;
      border-bottom-left-radius: 0.428rem;
      box-shadow: -0.428rem 0 0 0 #fff;
    }
  }
  &:first-child {
    .card {
      &::before {
        display: none;
      }
    }
  }
  &:last-child {
    .card {
      &::after {
        display: none;
      }
    }
  }
}
.selected-first {
  border-top-left-radius: 0;
}
.selected-last {
  border-top-right-radius: 0;
}
`;

// Template base
const baseTemplate = `
<div>
    <b-skeleton-wrapper loading="">
      <template #loading>
        <b-row class="flex-nowrap overflow-x-auto match-height">
          <b-col cols="12" sm="" md="">
            <b-card>
              <b-skeleton-img no-aspect height="75px" />
            </b-card>
          </b-col>
          <b-col cols="12" sm="" md="">
            <b-card>
              <b-skeleton-img no-aspect height="75px" />
            </b-card>
          </b-col>
        </b-row>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


