<template>
  <b-modal
    v-if="value"
    id="report-pdf-modal"
    ref="report-pdf-modal"
    :visible="value"
    modal-class="d-flex flex-column justify-content-center py-2"
    title="Exportar em PDF"
    dialog-class="w-100"
    hide-footer
    scrollable
    static
    size="md"
    @close="closeModal"
    @hide="closeModal"
  >
    <section class="d-flex flex-column align-items-center justify-content-center gap-5">
      <span class="material-symbols-outlined text-primary py-1" style="font-size: 62px">
        picture_as_pdf
      </span>
      <div class="row w-100 justify-content-between">
        <div class="export-pdf-option d-flex flex-column flex-fill p-1 gap-3">
          <span class="mb-auto">Relatório por ano escolar.</span>
          <div>
            <b-button
              v-if="reportTCTComplete"
              class="button d-flex align-items-center justify-content-center gap-2"
              style="height: 44px"
              variant="primary"
              @click="handleGeneratePDF(false)"
            >
              <b-spinner v-if="loadingReport" variant="light" small />
              <span v-else class="material-symbols-outlined primary" style="font-size: 22px">
                download
              </span>
              Exportar em PDF
            </b-button>

            <b-button
              v-else
              class="button d-flex align-items-center justify-content-center gap-2 px-50 w-100"
              variant="outline-info"
              disabled
            >
              <span class="material-symbols-outlined" style="font-size: 20px"> hourglass_top </span>
              Disponível em breve
            </b-button>
          </div>
        </div>
        <div class="export-pdf-option d-flex flex-column p-1 flex-fill gap-3">
          <span class="mb-auto">Relatório por ano escolar + dados por aluno.</span>
          <div>
            <b-button
              v-if="reportTCTComplete"
              class="button d-flex align-items-center justify-content-center gap-2"
              style="height: 44px"
              variant="primary"
              @click="handleGeneratePDF(true)"
            >
              <b-spinner v-if="loadingReportStudents" variant="light" small />
              <span v-else class="material-symbols-outlined primary" style="font-size: 22px">
                download
              </span>
              Exportar em PDF
            </b-button>
            <b-button
              v-else
              class="button d-flex align-items-center justify-content-center gap-2 px-50 w-100"
              variant="outline-info"
              disabled
            >
              <span class="material-symbols-outlined" style="font-size: 20px"> hourglass_top </span>
              Disponível em breve
            </b-button>
          </div>
        </div>
      </div>
    </section>
  </b-modal>
</template>

<script setup>
import router from '@/router'
import {
  getEvaluationTCTClassesReportPDF,
  getEvaluationTCTInstitutionsReportPDF,
} from '@/services/shared/evaluations/Evaluation.Service'
import store from '@/store'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { saveAs } from 'file-saver'
import { ref, computed, getCurrentInstance } from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
  isInstitution: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
  },
})

const emit = defineEmits(['input'])

const vm = getCurrentInstance().proxy
const evaluationId = router.currentRoute.params.evaluationId
const institutionId = router.currentRoute.params.institutionId

const loadingReport = ref(false)
const loadingReportStudents = ref(false)

const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])

const handleGeneratePDF = (viewStudents) => {
  if (props.isInstitution) {
    fetchEvaluationPDFInstitutionsReport(viewStudents)
  } else {
    fetchEvaluationPDFClassReport(viewStudents)
  }
}

const fetchEvaluationPDFInstitutionsReport = (viewStudents) => {
  if (!evaluationId) return
  if (viewStudents) {
    loadingReportStudents.value = true
  } else {
    loadingReport.value = true
  }

  getEvaluationTCTInstitutionsReportPDF(evaluationId, {
    viewStudents,
  })
    .then((response) => {
      saveAs(response.data, evaluationDetails.value.evaluationName)
      vm.$toast({
        component: Toast,
        props: {
          text: 'Exportado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
    })
    .finally(() => {
      loadingReport.value = false
      loadingReportStudents.value = false
      closeModal()
    })
}

const fetchEvaluationPDFClassReport = (viewStudents) => {
  if (!evaluationId) return
  if (viewStudents) {
    loadingReportStudents.value = true
  } else {
    loadingReport.value = true
  }

  getEvaluationTCTClassesReportPDF(evaluationId, {
    viewStudents,
    institutionId,
  })
    .then((response) => {
      saveAs(response.data, evaluationDetails.value.evaluationName)
      vm.$toast({
        component: Toast,
        props: {
          text: 'Exportado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
    })
    .finally(() => {
      loadingReport.value = false
      loadingReportStudents.value = false
      closeModal()
    })
}

const reportTCTComplete = computed(() => {
  return evaluationDetails.value.reportTCT === true
})

const closeModal = () => {
  emit('input', false)
}
</script>
<style lang="scss">
  #report-pdf-modal {
    .custom-control-primary
      input[type='checkbox']:disabled:checked
      + .custom-control-label::before {
      background-color: #b4b7bd !important;
      border-color: #b4b7bd !important;
    }

    .custom-control-primary input[type='checkbox']:disabled:checked + .custom-control-label::after {
      color: white !important;
    }
  }
</style>
<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  .export-pdf-option {
    max-width: 226px;
    border-radius: 6px;
    border: 1px solid $primary;
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    color: $color-gray-themeBodyText;
  }
</style>