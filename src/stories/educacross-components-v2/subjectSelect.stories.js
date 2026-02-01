/**
 * subjectSelect - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component subjectSelect
 * @source educacross-frontoffice\src\components\subjects\subjectSelect.vue
 * @generated 2026-02-01T20:35:36.037528
 * 
 * Props: None
 * Slots: None
 * Emits: update:value, submit, cancel
 */

export default {
  title: 'Educacross V2/subjectSelect',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## subjectSelect

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **update:value**
- **submit**
- **cancel**
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
<ValidationObserver ref="formRef">
    <b-form>
      <ValidationProvider v-slot="{ errors }" name="subject" rules="required">
        <b-form-group label="">
          <b-form-select
            options=""
            state=""
            placeholder=""
          />
          <small class="text-danger">
            Sample Text
          </small>
        </b-form-group>
      </ValidationProvider>

      <b-button type="submit" variant="primary">
        Sample Text
      </b-button>
      <b-button type="button" variant="outline-secondary">
        Sample Text
      </b-button>
    </b-form>
  </ValidationObserver>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


