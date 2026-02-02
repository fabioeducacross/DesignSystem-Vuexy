/**
 * Card - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component Card
 * @source educacross-frontoffice\src\components\PDFs\Card.vue
 * @generated 2026-02-01T21:06:30.918100
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Educacross V2/Card',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Card

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


* {
  text-transform: uppercase;
}


.student-card-body {
  border: 4px dashed #9c9c9c;

  width: 441px;
  height: 264px;
  padding: 4.28px;

  color: #000;
}

.background {
  width: 100%;
  height: 100%;

  padding: 15px 23px 27px 23px;
  position: relative;

  background: #e2f6ff;
}

.line-height-14 {
  line-height: 14px;
}

.card-head-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.logo {
  height: 23px;
}

.fruit-container {
  padding: 0.25rem;
  border-radius: 0.357rem;
  border: 1px solid #0c5257;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.fruit {
  max-width: 100%;
  max-height: 100%;
}

.info-container {
  line-height: 14px;
}

.user-info {
  margin-top: 10px;
}

.qr-container {
  align-self: center;

  padding: 6px;
  background: #fff;
  border-radius: 8px;
}

.container-warning {
  margin-top: 8px;

  .icon-warning {
    font-size: 10px;
  }
}

@media print {
  .cardsBody {
    margin: 0 !important;
    padding: 0 !important;
  }

  .student-card-body {
    page-break-before: auto;
    page-break-after: auto;
    page-break-inside: avoid;

    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  #app {
    background: #fff;
  }
}

.HTMLtoPdf {
  margin: auto;
  margin-top: calc(50% - 264px);

  .fruits-code {
    margin-bottom: 5px !important;
  }
}
`;

// Template base
const baseTemplate = `
<div
    id="studentsCards"
    class="student-card-body print-component"
    :data-fileName="student.studentName"
  >
    <div class="background">
      <div class="card-head-container">
        <b-img src="" alt="logo" class="logo" />
        <span class="font-bold text-black font-12">Sample Text</span>
      </div>
      <div class="d-flex justify-between" style="height: 100px">
        <div class="info-container">
          <div class="d-flex flex-col">
            <span class="font-bold font-16">Sample Text</span>
            <span class="font-bold font-12">Sample Text</span>
            <span class="font-bold font-10 text-danger">
              Sample Text - Sample Text
            </span>
            <div class="d-flex flex-col">
              <span class="font-bold font-14 user-info">
                Usuário: <span>Sample Text</span>
              </span>
              <span class="font-bold font-14">
                Senha: <span>Sample Text</span>
              </span>
            </div>
          </div>
        </div>
        <div class="qr-container">
          <qrcode-vue value="" size="" render-as="svg" />
        </div>
      </div>
      <div class="fruits-container">
        <p class="font-12 font-bold mb-0 fruits-code">Código de frutas:</p>
        <div class="d-flex justify-between">
          <div
            class="fruit-container bg-white"
          >
            <b-img class="fruit" fluid src="" />
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-end align-items-center font-bold font-8 text-danger container-warning"
      >
        <span class="material-symbols-outlined cursor-pointer icon-warning"> Warning </span>
        <span class="alert-text">Uso pessoal e intransferível</span>
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


