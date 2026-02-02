/**
 * SelectLocaleNavbar - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component SelectLocaleNavbar
 * @source educacross-frontoffice\src\components\locale\SelectLocaleNavbar.vue
 * @generated 2026-02-01T21:06:31.258843
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Educacross V2/SelectLocaleNavbar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SelectLocaleNavbar

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


#dropdown-grouped {
  list-style: none;
}

.not-expanded {
  transform: rotate(0deg);
  transition: all 250ms ease-in;
}

.expanded {
  transform: rotate(180deg);
}
`;

// Template base
const baseTemplate = `
<div>
    <b-dropdown-item @click.stop>
      <!-- toggle button -->
      <div
        v-b-toggle.collapse-1
        class="d-flex align-items-center justify-content-between"
        @click.stop
      >
        <div class="d-flex align-content-center">
          <b-img src="" height="24px" width="22px" alt="" />
          <span class="ml-50">Sample Text</span>
        </div>
        <span
          class="material-symbols-outlined not-expanded"
          class=""
        >
          expand_more
        </span>
      </div>
    </b-dropdown-item>

    <b-dropdown-item link-class="p-0 bg-white" @click.stop>
      <b-collapse id="collapse-1">
        <b-dropdown-item
        >
          <span class="d-flex align-items-center pl-50">
            <b-img src="" height="24px" width="22px" alt="" />
            <span class="ml-50">Sample Text</span>
          </span>
        </b-dropdown-item>
      </b-collapse>
    </b-dropdown-item>
  </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


