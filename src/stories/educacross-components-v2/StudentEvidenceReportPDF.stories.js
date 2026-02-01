/**
 * StudentEvidenceReportPDF - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component StudentEvidenceReportPDF
 * @source educacross-frontoffice\src\components\student-evidence-report\StudentEvidenceReportPDF.vue
 * @generated 2026-02-01T20:35:35.989500
 * 
 * Props: None
 * Slots: None
 * Emits: setInfos
 */

export default {
  title: 'Educacross V2/StudentEvidenceReportPDF',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## StudentEvidenceReportPDF

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **setInfos**
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




  .evidence-report-body .table-header-title {
    background: rgba(inherit, 0.12) !important;
  }

  .evidence-report-body .table-header-row {
    background-color: #f3f2f7 !important;
  }

  @page {
    width: 992px !important; /* A4 width */
    margin: 40px 40px 80px 40px; /* Attempt to remove browser default print margins */
  }
`;

// Template base
const baseTemplate = `
<div class="evidence-report-body">
    <div class="text-center">
      <h1 class="font-bold">Sample Text</h1>
      <h1>Relatório de Evidências</h1>
      <p class="font-12 font-bold">
        Sample Text de Sample Text
      </p>
    </div>

    <b-card class="shadow-none border mb-1">
      <p class="font-bold">
        <span class="font-normal">Professor: </span>
        Sample Text
      </p>
      <p class="font-bold">
        <span class="font-normal">Matriz/Currículo: </span>
        Sample Text
      </p>
      <p class="font-bold"><span class="font-normal">Módulo:</span> Sample Text</p>
      <p class="font-bold"><span class="font-normal">Turma:</span> Sample Text</p>
    </b-card>

    <div class="w-100 mb-1">
      <div class="d-flex flex-wrap gap-4 flex-no-wrap">
        <div class="p-50 chart-1 flex-1">
          <h4 class="font-semibold text-center text-body">Rendimento da turma</h4>
          <div>
            <v-chart ref="pie" autoresize option="" class="donut-chart" />
          </div>
        </div>
        <div class="p-50 chart-2 flex-1">
          <h4 class="font-semibold text-center text-body">Jogos finalizados</h4>
          <div>
            <v-chart ref="bar" autoresize option="" class="bar-chart" />
          </div>
        </div>
      </div>
      <div class="border-t w-100 charts-legends-container">
        <LegendEnum legends="" card-class="shadow-none mb-0" />
        <hr class="mt-0" />
        <div class="d-flex align-items-center gap-4 px-1 pb-1">
          <span class="whitespace-no-wrap">Jogos Finalizados:</span>
          <div class="whitespace-normal">
            <div
              class="inline-block mr-1 whitespace-normal"
            >
              <span class="font-bold">Sample Text</span> -
              Sample Text
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-1">
      <b-table-simple
        small
        no-border-collapse
        data=""
        empty-text="Nenhum dado encontrado."
        show-empty
        class="border rounded"
      >
        <b-thead>
          <b-tr>
            <b-th colspan="6" scope="colgroup" class="text-center border-0 table-header-title">
              Desempenho Geral
            </b-th>
          </b-tr>
          <b-tr>
            <b-th class="border-top-0 border-bottom-0 table-header-row" scope="col">Nome</b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row" scope="col"></b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row text-center" scope="col">
              Jogos
            </b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row text-center" scope="col">
              Jogos finalizados
            </b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row text-center" scope="col">
              rendimento
            </b-th>
            <b-th class="border-top-0 border-bottom-0 table-header-row text-center" scope="col">
              tempo investido
            </b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
          >
            <b-td class="text-black whitespace-no-wrap">
              Sample Text
            </b-td>
            <b-td class="text-center">
              <b-badge variant="light-primary" pill>
                Não há dados para exibir
              </b-badge>
              <b-badge
                variant=""
                pill
              >
                Sample Text
              </b-badge>
            </b-td>
            <template>
              <b-td class="text-black text-center">
                Sample Text
              </b-td>
              <b-td class="text-black">
                <large-progress-with-percentage
                  data=""
                  enum="evidenceReportFinishedGames"
                />
              </b-td>
              <b-td class="text-black">
                <large-progress-with-percentage
                  data=""
                  enum="learningPerformance"
                />
              </b-td>
              <b-td class="text-black text-center">
                Sample Text
              </b-td>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


