/**
 * SelectInfinityScroll - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component SelectInfinityScroll
 * @source educacross-frontoffice\src\components\selects\SelectInfinityScroll.vue
 * @generated 2026-02-01T21:06:31.247883
 * 
 * Props: None
 * Slots: None
 * Emits: input, isReady, noClasses
 */

export default {
  title: 'Educacross V2/SelectInfinityScroll',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SelectInfinityScroll

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **input**
- **isReady**
- **noClasses**
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


.loader {
  text-align: center;
}
`;

// Template base
const baseTemplate = `
<v-select
    options=""
    label=""
    filterable=""
    :calculate-position="withPopper"
    :clear-search-on-blur="() => false"
    :close-on-select="closeOnSelect"
    disabled=""
    multiple=""
    placeholder=""
    reduce=""
    clearable=""
    value=""
  >
    <div>
      <b-spinner small variant="secondary" />
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


