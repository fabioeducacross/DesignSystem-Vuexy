/**
 * AppLanguageSelector - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component AppLanguageSelector
 * @source educacross-frontoffice\src\components\app-language-selector\AppLanguageSelector.vue
 * @generated 2026-02-01T20:35:35.781921
 * 
 * Props: None
 * Slots: None
 * Emits: input
 */

export default {
  title: 'Educacross V2/AppLanguageSelector',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AppLanguageSelector

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **input**
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


.flag-container {
  height: 24px;
  width: 24px;
}

.country-flag {
  height: 24px;
}

.country-flag-option {
  margin-right: 10px;
  height: 24px;
  display: inline-block;
}
`;

// Template base
const baseTemplate = `
<b-overlay :show.sync="loading">
    <b-dropdown variant="flat-primary" toggle-class=" p-0" no-caret size="sm">
      <template #button-content>
        <div class="flag-container">
          <b-img
            src=""
            class="country-flag"
          />
        </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


