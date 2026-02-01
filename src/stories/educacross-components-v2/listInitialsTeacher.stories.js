/**
 * listInitialsTeacher - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component listInitialsTeacher
 * @source educacross-frontoffice\src\components\teacher\listInitialsTeacher.vue
 * @generated 2026-02-01T20:35:36.035531
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Educacross V2/listInitialsTeacher',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## listInitialsTeacher

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


.auxiliar-badge {
  font-size: 11px;
  width: 14px;
  height: 14px;
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: center;
  border-radius: 50%;
  border: 2px solid #fff;
  line-height: 1;
}
`;

// Template base
const baseTemplate = `
<div class="d-flex flex-no-wrap">
    <div class="d-flex flex-no-wrap gap-2">
      <div class="relative">
        <b-avatar
          v-b-tooltip.hover.top="item.name"
          variant=""
          text=""
        />
      </div>
    </div>
    <div class="d-flex align-items-center ml-1">
      <b-badge
        id=""
        pill
        variant=""
      >
        +Sample Text
      </b-badge>
      <b-popover target="" triggers="hover" placement="bottomright">
        <ul class="mb-0">
          <li class="mb-50">
            Sample Text
          </li>
        </ul>
      </b-popover>
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


