/**
 * TabRouter - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component TabRouter
 * @source educacross-frontoffice\src\components\tab\TabRouter.vue
 * @generated 2026-02-01T20:35:36.003125
 * 
 * Props: None
 * Slots: default
 * Emits: None
 */

export default {
  title: 'Educacross V2/TabRouter',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## TabRouter

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- **default**

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




.tab-line {
  border: 1px solid inherit;

  height: 1px;
  width: 100%;

  margin-bottom: 1rem;
}
.tabs-row {
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: thin;

  .tab-link {
    display: inline-block;
    position: relative;

    padding: 14px 24px 10px 24px;

    border-radius: 15px 15px 0 0;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);

    cursor: pointer;
    color: inherit;
    text-decoration: none;
    background: inherit;

    transform: translateX(calc(var(--index) * var(--offset)));

    white-space: nowrap;
    .tab-icon {
      font-size: 18px;
    }

    &:hover {
      color: inherit !important;
      background-color: inherit;
    }

    &.active {
      background: inherit;
      color: inherit;
      //font-weight: 700;

      z-index: 1;
    }
  }
}
`;

// Template base
const baseTemplate = `
<div class="min-vh-100">
    <div
      class="d-flex flex-column-reverse flex-md-row justify-content-center justify-content-md-between align-items-md-baseline flex-nowwrap"
    >
      <div
        class="tabs-row d-md-flex"
        class=""
      >
        <a
          class="tab-link d-flex align-items-center gap-1"
          style=""
          class=""
        >
          <span class="material-symbols-outlined tab-icon">
            Sample Text
          </span>
          Sample Text
        </a>
      </div>
      <div class="d-lg-flex">
        <div class="d-none d-lg-block mr-1">
          <span>
            Atualizado em: Sample Text às
            Sample Text
          </span>
        </div>
        <div
          class="d-flex align-items-center justify-content-center justify-content-md-end mb-50 mb-md-0 gap-1 tab-title text-primary font-bold text-uppercase"
        >
          <span class="material-symbols-outlined">
            Sample Text
          </span>
          Sample Text
        </div>
      </div>
    </div>

    <div
      class="tab-line"
      class=""
    />

    <div class="d-block d-lg-none mb-1">
      <span>
        Atualizado em: Sample Text às
        Sample Text
      </span>
    </div>

    <slot name="default" />
  </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


