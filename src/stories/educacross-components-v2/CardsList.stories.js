/**
 * CardsList - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component CardsList
 * @source educacross-frontoffice\src\components\PDFs\CardsList.vue
 * @generated 2026-02-01T20:35:35.797492
 * 
 * Props: None
 * Slots: None
 * Emits: setInfos
 */

export default {
  title: 'Educacross V2/CardsList',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## CardsList

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **setInfos**
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


.titleBox {
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  width: 100%;
  margin-bottom: 3rem;
  margin-left: 4.7rem;

  span {
    border-bottom: 2px solid;
  }
}

.cardsContainer {
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  row-gap: 1rem;
  flex-wrap: wrap;

  padding: 1rem 0;

  width: 100%;
}
`;

// Template base
const baseTemplate = `
<div>
    <b-overlay class="text-primary h-100" no-wrap show="" />
    <div class="titleBox">
      <span class="color-patternTwo">Sample Text</span>
    </div>
    <div class="cardsContainer">
      <Card student="" />
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


