/**
 * ZipLoading - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component ZipLoading
 * @source educacross-frontoffice\src\components\modal\ZipLoading.vue
 * @generated 2026-02-01T20:35:36.033526
 * 
 * Props: None
 * Slots: None
 * Emits: close
 */

export default {
  title: 'Educacross V2/ZipLoading',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ZipLoading

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **close**
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


.working {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  color: #5e5873;

  .title {
    font-size: 28px;
    font-weight: 600;
    text-align: center;

    &:first-letter {
      text-transform: uppercase;
    }

    margin-top: 1.5rem;
  }

  .subtitle {
    font-size: 21px;
    font-weight: 500;

    text-align: center;

    margin-top: 24px;
  }

  .tryAgain {
    color: #6e63e8;
    cursor: pointer;
    text-decoration: underline;
  }

  .progress-container {
    width: 50%;
    text-align: center;

    @media (max-width: 425px) {
      width: 100%;
    }

    .title {
      font-size: 21px;
      font-weight: 500;
      color: #28c76f;

      margin-bottom: 1rem;
    }
  }
}
`;

// Template base
const baseTemplate = `
<div>
    <div class="working">
      <img src="@/assets/images/pdf-progress/working.png" alt="" />
      <div>
        <p class="title">Os boletins estão sendo preparados.</p>
        <p class="subtitle">
          Assim que o processamento acabar, os boletins serão baixados automaticamente.
        </p>
      </div>
      <div>
        <p class="title">Estamos preparando Sample Text</p>
        <p class="subtitle">
          Assim que o processamento acabar, o download será iniciado automaticamente
        </p>
      </div>
      <div class="progress-container">
        <span class="title">Sample Text% dos arquivos prontos...</span>
        <b-progress value="" max="" variant="success" height="12px" />
        <b-spinner small />
      </div>
    </div>
    <div class="working">
      <img src="@/assets/images/pdf-progress/done.png" alt="" />
      <p class="title">Os boletins estão prontos!</p>
      <p class="title">
        Sample Text estão Sample Text!
      </p>
      <p class="subtitle">
        Se o download não iniciou automaticamente,
        <span class="tryAgain"> clique aqui</span>
      </p>
      <div class="progress-container">
        <span class="title">100% dos arquivos prontos!</span>
        <b-progress value="" max="" variant="success" height="12px" />
      </div>
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


