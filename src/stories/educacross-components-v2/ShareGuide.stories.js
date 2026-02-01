/**
 * ShareGuide - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component ShareGuide
 * @source educacross-frontoffice\src\components\mission-plus\ShareGuide.vue
 * @generated 2026-02-01T20:35:35.975585
 * 
 * Props: None
 * Slots: None
 * Emits: close, close-and-update
 */

export default {
  title: 'Educacross V2/ShareGuide',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ShareGuide

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **close**
- **close-and-update**
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
<div class="d-flex align-items-center flex-col">
    <b-img-lazy
      v-bind="propsImageBelinha"
      src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-success2.png"
      alt="belinha"
      class="mb-1"
    />
    <h1>Compartilhar a missão "Sample Text"</h1>
    <p>Selecione como você deseja compartilhar essa missão:</p>
    <b-form class="mb-1">
      <b-form-radio-group
        options=""
        value-field="value"
        text-field="text"
      >
      </b-form-radio-group>
    </b-form>
    <div class="d-flex gap-5">
      <b-button variant="outline-primary" type="border" disabled="">
        Cancelar
      </b-button>
      <b-button
        variant="primary"
        type="filled"
        disabled=""
      >
        Compartilhar
        <b-spinner small variant="primary" />
      </b-button>
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


