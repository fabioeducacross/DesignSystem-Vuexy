/**
 * AppCollapseItem - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component AppCollapseItem
 * @source educacross-frontoffice\src\components\app-collapse\AppCollapseItem.vue
 * @generated 2026-02-01T20:35:35.779456
 * 
 * Props: None
 * Slots: header
 * Emits: visible
 */

export default {
  title: 'Educacross V2/AppCollapseItem',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AppCollapseItem

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- **header**

### Events
- **visible**
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


.collapse-icon {
  .card-header {
    &.left {
      padding: 1rem 1rem 1rem 3.8rem;
    }
  }
  [data-toggle='collapse'] {
    &.left {
      &:after {
        left: 1.5rem;
        right: auto;
      }
    }
  }
}
`;

// Template base
const baseTemplate = `
<b-card
    no-body
    class=""
  >
    <b-card-header
      class=""
      :aria-expanded="visible "
      :aria-controls="collapseItemID"
      role="tab"
      data-toggle="collapse"
    >
      <slot name="header">
        <span class="lead collapse-title">Sample Text</span>
      </slot>
    </b-card-header>

    <b-collapse id="" accordion="" role="tabpanel">
      <b-card-body class="">
        <div class="slot-placeholder"></div>
      </b-card-body>
    </b-collapse>
  </b-card>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


