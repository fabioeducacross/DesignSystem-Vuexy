/**
 * PDFRoot - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component PDFRoot
 * @source educacross-frontoffice\src\components\PDFs\PDFRoot.vue
 * @generated 2026-02-01T21:06:31.163174
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Educacross V2/PDFRoot',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PDFRoot

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


.header {
    background-color: #ffffff;
    width: 100%;
    height: 7rem;

    padding: 24px;
    margin-bottom: 24px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-title {
    display: flex;
    align-items: center;
  }

  .pdf-title {
    margin: 0;

    font-weight: 500;
    font-size: 24px;
    line-height: 24px;

    color: #2c2c2c;
  }

  .header-back-button {
    width: 40px;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #e2e2e3;
    border-radius: 10px;

    margin-right: 27px;
  }

  .header-back-button:hover {
    border: 2px solid #e2e2e3;
  }

  .header-button {
    margin-left: 24px;
  }
  @media print {
    .printOcult {
      display: none !important;
    }
  }
`;

// Template base
const baseTemplate = `
<div>
    <div class="header printOcult">
      <div class="header-title">
        <div class="header-back-button">
          <feather-icon icon="ArrowLeftIcon" class="back-icon" />
        </div>
        <h1 class="pdf-title">
          Sample Text
        </h1>
      </div>

      <div class="header-buttons">
        <b-button class="header-button" variant="primary">
          Imprimir
        </b-button>

        <b-button class="header-button" variant="primary">
          Imprimir em PDF único
        </b-button>

        <b-button
          id="button-loading-generateZip"
          disabled=""
          class="header-button"
          variant="primary"
        >
          <b-spinner small />
          Imprimir em PDFs separados
        </b-button>
      </div>
    </div>
    <router-view />
    <b-modal
      centered
      size="xl"
      hide-footer
      :hide-header-close="hideHeaderClose"
      no-close-on-backdrop
      no-close-on-esc
      static
    >
      <zip-loading name="" masculine="" />
    </b-modal>
  </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


