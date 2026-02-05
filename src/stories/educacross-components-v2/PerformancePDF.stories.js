/**
 * PerformancePDF - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component PerformancePDF
 * @source educacross-frontoffice\src\components\PDFs\event\performance\PerformancePDF.vue
 * @generated 2026-02-01T21:06:31.171182
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Front-office/PDF/PerformancePDF',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PerformancePDF

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




.performance-report {
  position: relative;
  box-sizing: border-box;
  width: 713px !important;
  height: 1008px !important;
  background-image: url(@/assets/images/pdf/performance-record/background.svg);
  background-size: cover;
  background-repeat: no-repeat;
  color: #000;

  border: none;
  margin-left: auto;
  margin-right: auto;

  text-align: center;

  -webkit-print-color-adjust: exact;

  page-break-after: auto;
  page-break-inside: avoid;

  /* Print-specific styles */
  @media print {
    margin-left: 0;
    margin-right: 0;
  }
}

.title-container {
  position: absolute;
  top: 124px;
  width: 100%;

  display: flex;
  justify-content: center;
  flex-direction: column;

  h4 {
    color: inherit;
  }
}

.student-info-container {
  position: absolute;
  top: 179px;
  left: 93px;

  width: 527px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h3 {
    color: inherit;
  }
}

.awards-container {
  position: absolute;

  width: 445px;

  display: flex;
  justify-content: space-between;

  top: 368px;
  left: 135px;
}

.awards {
  position: absolute;
  top: 368px;
  width: 35.2px;
  height: fit-content;
  margin-bottom: 0;

  text-align: center;
  line-height: normal;
  color: white;
  font-weight: 700;

  // left items
  &:nth-of-type(1) {
    left: 143.87px;
  }

  &:nth-of-type(2) {
    left: 200.45px;
  }

  &:nth-of-type(3) {
    left: 255.62px;
  }

  //rigth items
  &:nth-of-type(4) {
    right: 252.52px;
  }

  &:nth-of-type(5) {
    right: 195.94px;
  }

  &:nth-of-type(6) {
    right: 140.77px;
  }
}

.points-container {
  position: absolute;

  top: 508px;
  left: 180px;
  width: 370px;

  display: grid;
  grid-template-columns: 89px 89px;
  justify-content: space-between;

  h6 {
    color: white;
    font-weight: 700;
  }
}

.themes-performance-container {
  position: absolute;
  top: 613px;
  left: 107.7px;

  width: 500px;
  height: 64px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;

  margin-top: 10px;
}

.theme {
  width: 91.5px;

  text-align: center;
}

.theme-performance {
  background-color: #efefef;
  border-radius: 6px;

  width: 100%;
  height: 25px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.theme-performance-point {
  width: 100%;
  height: 100%;

  border-radius: 6px;
}

.legend-container {
  position: absolute;
  top: 687px;
  left: 199px;
}

.footer-container {
  position: absolute;
  top: 903px;
  left: 77px;

  display: flex;
  justify-content: space-between;
  width: 560px;

  color: inherit;
}

.logo-container {
  position: absolute;
  top: 945px;

  width: 100%;

  display: flex;
  justify-content: center;

  img {
    max-width: 155px;
  }
}

.HTMLtoPdf {
  .performance-report {
    margin: 0;
  }

  .title-container {
    top: 115px;
  }

  .student-info-container {
    top: 170px;
  }

  .awards {
    top: 362px;
  }

  .points-container {
    top: 502px;
  }

  .themes-performance-container {
    top: 606px;
  }

  .legend-container {
    top: 678px;
  }

  .footer-container {
    top: 896px;
  }

  .footer-container {
    top: 894px;
  }
}
`;

// Template base
const baseTemplate = `
<div class="performance-report print-component" :data-fileName="student.studentName">
    <div class="title-container">
      <h4 class="mb-0 font-medium">Sample Text</h4>
      <span class="font-10">
        Sample Text a Sample Text
      </span>
    </div>
    <div class="student-info-container">
      <h3 class="mb-0 font-medium">Sample Text</h3>
      <span class="font-10">Sample Text • Sample Text</span>
    </div>
    <h6 class="awards">
      Sample Text
    </h6>
    <h6 class="awards">
      Sample Text
    </h6>
    <h6 class="awards">
      Sample Text
    </h6>
    <h6 class="awards">
      Sample Text
    </h6>
    <h6 class="awards">
      Sample Text
    </h6>
    <h6 class="awards">
      Sample Text
    </h6>
    <div class="points-container">
      <h6>Sample Text</h6>
      <h6>Sample Text</h6>
    </div>
    <div class="themes-performance-container">
      <div
        class="theme font-10"
      >
        <div class="theme-performance">
          <div
            class="theme-performance-point"
            class=""
          ></div>
        </div>
        <span class="text-black">Sample Text</span>
      </div>
    </div>
    <!-- <div class="legend-container">
      <div class="LegendEnumPDF" legends="" class="shadow-none" />
    </div> -->
    <div class="footer-container">
      <span class="font-12 font-semibold">@Sample Text</span>
      <span class="font-12 font-semibold">Sample Text</span>
    </div>
    <div class="logo-container">
      <b-img src="">logo</b-img>
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


