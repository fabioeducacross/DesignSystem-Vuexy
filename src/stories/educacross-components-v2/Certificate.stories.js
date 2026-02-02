/**
 * Certificate - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component Certificate
 * @source educacross-frontoffice\src\components\PDFs\event\certificate\Certificate.vue
 * @generated 2026-02-01T21:06:30.934461
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Educacross V2/Certificate',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Certificate

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




.certificate {
  position: relative;

  width: 1008px;
  height: 712px;

  background-image: url(@/assets/images/pdf/event-certificate/background.svg);
  background-size: cover;
  background-repeat: no-repeat;

  margin-left: auto;
  margin-right: auto;

  color: #000;

  -webkit-print-color-adjust: exact;

  border: 1px solid transparent;

  @media print {
    page-break-after: auto;
    page-break-inside: avoid;
    margin-left: 0;
    margin-right: 0;
  }
}

.content-container {
  position: absolute;
  top: 283.68px;
  left: 87.9px;

  width: 832px;

  text-align: center;

  p {
    font-size: 15.5px;
  }
}

.student-name {
  color: inherit;
  font-size: 27.577px;
}

.aggrement span {
  font-weight: 700;
}

.logo-container {
  position: absolute;
  top: 523px;

  width: 100%;
  height: 72px;

  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    height: 72px;
    width: 190px;

    display: flex;
    align-items: center;

    &:nth-of-type(1) {
      justify-content: end;
    }

    &:nth-of-type(2) {
      justify-content: start;
    }

    & > img {
      max-height: 100%;
      max-width: 100%;
    }
  }

  .divisor {
    height: 100%;
    width: 1px;

    border-right: 1px solid #000;
    margin: 0 25px;
  }
}

.footer-container {
  position: absolute;
  top: 653.4px;
  left: 87px;

  width: 832px;

  display: flex;
  justify-content: space-between;

  color: inherit;
  font-weight: 600;
}
`;

// Template base
const baseTemplate = `
<div class="certificate print-component" :data-fileName="data.studentName">
    <div class="content-container">
      <p>É com grande satisfação que parabenizamos:</p>

      <h3 class="font-medium student-name mb-1">Sample Text</h3>

      <div class="aggrement">
        <p class="mb-0">
          da turma <span>Sample Text</span
          >, do(a) <span>Sample Text</span
          >, pela participação
          <br />
          no Evento <span>"Sample Text"</span>.
        </p>
        <p>Você realizou diversas jogadas e desenvolveu várias habilidades!</p>
      </div>
      <p>Sample Text, Brasil, Sample Text.</p>
    </div>
    <div class="logo-container">
      <div class="logo">
        <b-img src="" />
      </div>
      <div class="divisor"></div>
      <div class="logo">
        <b-img src="" />
      </div>
    </div>
    <div class="footer-container">
      <span>@Sample Text</span>
      <span>Sample Text</span>
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


