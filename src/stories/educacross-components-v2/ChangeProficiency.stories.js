/**
 * ChangeProficiency - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component ChangeProficiency
 * @source educacross-frontoffice\src\components\proficiency\ChangeProficiency.vue
 * @generated 2026-02-01T20:35:35.809580
 * 
 * Props: None
 * Slots: None
 * Emits: None
 */

export default {
  title: 'Educacross V2/ChangeProficiency',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ChangeProficiency

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



`;

// Template base
const baseTemplate = `
<section>
    <b-alert show variant="primary">
      <div class="alert-body text-center">
        <h6 class="text-primary font-weight-bolder">
          Que tal personalizar a avaliação desta atividade?
        </h6>
        <div class="d-flex justify-content-center gap-2 mb-50">
          <div>
            <b-row>
              <b-col
                cols="12"
                md="6"
                lg="auto"
                class="mb-1"
              >
                <b-badge
                  variant=""
                  class=""
                >
                  <span
                    class=""
                    style="font-size: 12px"
                  >
                    person_edit
                  </span>
                  Sample Text
                </b-badge>
              </b-col>
            </b-row>
          </div>
        </div>
        <!-- <p class="text-body underline cursor-pointer">
          Relatar inconsistência na análise automática.
        </p> -->
      </div>
    </b-alert>

    <b-modal
      ref="refModalConfirm"
      centered
      static
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <section class="text-center mb-2">
        <span
          class="material-symbols-outlined font-weight-bolder text-warning"
          style="font-size: 80px"
        >error</span>
        <h3 class="font-weight-bolder text-body mb-2">Tem certeza que deseja alterar?</h3>
        <div class="d-flex gap-2">
          <div class="text-center flex-1 px-2 py-1 d-flex flex-column">
            <h6 class="text-body font-weight-bolder">ATUAL:</h6>
            <p class="text-body font-weight-bold">Sample Text</p>
            <span class="material-symbols-outlined mt-auto">stat_minus_3</span>
            <br />
            <BadgeStatus value="" enum="proficiency" pill="" />
          </div>
          <div
            class="h100 text-center flex-1 text-primary border-primary rounded px-2 py-1 d-flex flex-column"
          >
            <h6 class="text-primary font-weight-bolder">TROCAR POR:</h6>
            <p class="font-weight-bold">Sample Text</p>
            <span class="material-symbols-outlined mt-auto">stat_minus_3</span>
            <br />
            <BadgeStatus
              value=""
              enum="proficiency"
              pill=""
            />
          </div>
        </div>
      </section>
      <section class="d-flex justify-content-center w-100 gap-2 mb-1">
        <b-button
          variant="outline-danger"
          disabled=""
        >
          Cancelar
        </b-button>
        <b-button
          variant="primary"
          disabled=""
        >
          <b-spinner show small />
          Alterar
        </b-button>
      </section>
    </b-modal>

    <b-modal
      ref="refModalReason"
      centered
      static
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <section>
        <b-form>
          <b-form-group
            label="Deseja registrar o motivo da sua alteração? (opcional)"
            label-class="h5 text-body"
          >
            <b-form-textarea
              id="textarea"
              placeholder="Registre aqui."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <div class="d-flex justify-content-center w-100">
            <b-button disabled="" variant="primary" type="submit">
              <b-spinner show small />
              Concluir
            </b-button>
          </div>
        </b-form>
      </section>
    </b-modal>
    <b-modal
      ref="refModalReportInconsistency"
      centered
      static
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <b-form>
        <b-form-group label="Qual inconsistência você identificou na análise automática?">
          <b-form-textarea
            id="textarea"
            placeholder="Registre aqui."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <div class="d-flex gap-2">
          <b-button
            class="flex-1"
            disabled=""
            variant="outline-danger"
            type="button"
          >
            Cancelar
          </b-button>

          <b-button class="flex-1" disabled="" variant="primary" type="submit">
            <b-spinner show small />
            Concluir
          </b-button>
        </div>
      </b-form>
    </b-modal>
  </section>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


