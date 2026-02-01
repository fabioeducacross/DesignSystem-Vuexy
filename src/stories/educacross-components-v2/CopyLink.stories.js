/**
 * CopyLink - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component CopyLink
 * @source educacross-frontoffice\src\components\mission-plus\CopyLink.vue
 * @generated 2026-02-01T20:35:35.813592
 * 
 * Props: None
 * Slots: None
 * Emits: close-copylink-modal
 */

export default {
  title: 'Educacross V2/CopyLink',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## CopyLink

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **close-copylink-modal**
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


.image {
  margin-bottom: 24px;
}

.title {
  color: #5e5873;
  font-size: 24px;
  line-height: 29px;
  font-weight: 500;
  margin-bottom: 24px;
}
.custom-button {
  width: 233px;
}

.custom-input {
  padding: 12px 38px;
  margin-bottom: 24px;
  pointer-events: none;
  cursor: pointer !important;
}
`;

// Template base
const baseTemplate = `
<div class="d-flex flex-column align-items-center">
    <img
      src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-copy_link.png"
      class="image"
      alt="belinha"
    />
    <h1 class="title">Copiar link da missão</h1>
    <b-form-input ref="input" class="cursor-pointer custom-input" />
    <b-button class="custom-button" variant="primary" type="filled">
      Copiar link
    </b-button>
  </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


