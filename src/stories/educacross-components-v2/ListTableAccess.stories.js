/**
 * ListTableAccess - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component ListTableAccess
 * @source educacross-frontoffice\src\components\table\ListTableAccess.vue
 * @generated 2026-02-01T20:35:35.874345
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Educacross V2/ListTableAccess',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ListTableAccess

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


.cell-access-content {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.less-activity {
  background-color: #f9a9a9;
}
.some-activity {
  background-color: #fac2ae;
}
.half-activity {
  background-color: #cbe3ab;
}
.almost-full-activity {
  background-color: #8fcf9b;
}
.per-page-selector {
  width: 90px;
  min-width: 90px;
}
`;

// Template base
const baseTemplate = `
<b-card no-body>
    <div class="m-2">
      <b-row>
        <!-- Per Page -->
        <b-col
          cols="12"
          md="auto"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Sample Text</label>
          <v-select
            options=""
            clearable=""
            searchable=""
            class="per-page-selector d-inline-block mx-50"
          />
        </b-col>

        <!-- Search / Export -->
        <b-col cols="12" md>
          <b-row align-h="end" align-v="center">
            <b-col cols="12" sm="auto">
              <b-button
                variant="outline-primary"
                size="sm"
                class="w-100 mt-2 mt-sm-0"
                class=""
                style="height: 38px"
                disabled=""
              >
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <b-spinner small></b-spinner>
                  <span
                    class="material-symbols-outlined"
                    style="font-size: 22px"
                  >
                    ios_share
                  </span>
                  <span>Exportar em Excel</span>
                </div>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <b-skeleton-table columns="" rows="" class="" />
    <b-table
      id="table-access"
      ref="refTableAccess"
      class=""
      class="position-relative"
      items=""
      fields=""
      :per-page="perPage"
      :current-page="currentPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      striped
      responsive
      tbody-class="text-black"
    >
      <template #head="item">
        <div
          v-b-tooltip.html
          title=""
          class="d-inline-flex align-items-center gap-1 font-weight-bolder text-uppercase"
        >
          Sample Text
          <span
            class="material-symbols-outlined head-icon-info"
            style="font-size: 16px"
          >
            info
          </span>
        </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


