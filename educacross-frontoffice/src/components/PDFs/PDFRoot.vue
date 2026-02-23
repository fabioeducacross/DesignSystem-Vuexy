<template>
  <div>
    <div class="header printOcult">
      <div class="header-title">
        <div class="header-back-button" @click="goBack">
          <feather-icon icon="ArrowLeftIcon" class="back-icon" />
        </div>
        <h1 class="pdf-title">
          {{ pdfTitle }}
        </h1>
      </div>

      <div class="header-buttons">
        <b-button v-if="!massPdf" class="header-button" variant="primary" @click="print">
          Imprimir
        </b-button>

        <b-button v-if="massPdf" class="header-button" variant="primary" @click="print">
          Imprimir em PDF único
        </b-button>

        <b-button
          v-if="massPdf"
          id="button-loading-generateZip"
          :disabled="spin"
          class="header-button"
          variant="primary"
          @click="printInZIP"
        >
          <b-spinner v-if="spin" small />
          Imprimir em PDFs separados
        </b-button>
      </div>
    </div>
    <router-view @setInfos="setInfos" />
    <b-modal
      v-model="showPdfWaitModal"
      centered
      size="xl"
      hide-footer
      :hide-header-close="hideHeaderClose"
      no-close-on-backdrop
      no-close-on-esc
      static
    >
      <zip-loading :name="pdfGenName" :masculine="masculine" @close="hideHeaderClose = false" />
    </b-modal>
  </div>
</template>

<script setup>
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import ZipLoading from '@/components/modal/ZipLoading'
import downloadPDFs from '@/services/shared/pdfs/Pdf.Service'
import { BButton, BSpinner, BModal } from 'bootstrap-vue'
import router from '@/router'
import { ref } from 'vue'

// Reactive State
const pdfTitle = ref('')
const massPdf = ref(false)
const students = ref(null)
const selector = ref('')
const cssPath = ref('')
const pdfGenName = ref('')
const spin = ref(false)
const showPdfWaitModal = ref(false)
const masculine = ref(false)
const info = ref(undefined)
const hideHeaderClose = ref(true)

// Lifecycle
info.value = router.currentRoute?.params || {}

// Methods
const setInfos = data => {
  pdfTitle.value = data.pdfTitle
  massPdf.value = info.value.batchAction === 2 ? true : data.massPdf
  students.value = data.students
  selector.value = data.selector
  cssPath.value = data.cssPath
}

const printInZIP = () => {
  openPdfWaitModal()

  const student = students.value[0]
  pdfGenName.value = pdfTitle.value

  const downloadPdfZip = (title, gender, params = []) => {
    const institutionName = student?.institutionName || ''
    const className = student?.institutionName || ''
    const zipName = `${title} ${institutionName} ${className}`
    masculine.value = gender
    downloadPDFs(selector.value, zipName, ...params)
  }

  switch (pdfTitle.value) {
    case 'Carteirinhas':
      downloadPdfZip('Carteirinhas', false)
      break
    case 'Cartas de acesso':
      downloadPdfZip('Cartas de Acesso', false)
      break
    case 'Certificados de Participação':
      downloadPdfZip('Certificados', true, [2, true])
      break
    case 'Certificados de Desempenho':
      downloadPdfZip('Certificados', true, [2, true])
      break
    case 'Boletins':
      masculine.value = true
      downloadPdfZip('Boletins', true, [2, true])
      break
    case 'Ficha de Desempenho do Evento':
      downloadPdfZip('Fichas de Desempenho do Evento', false, [2, true])
      break
    case 'Certificado do Evento':
      downloadPdfZip('Certificado do Evento', true, [2, true])
      break
    default:
      // No-op
      break
  }
}

const print = () => {
  const student = students.value[0]
  const institutionName = student?.institutionName || ''
  const className = student?.institutionName || ''
  const studentName = student?.studentName || ''

  if (students.value.length === 1) {
    document.title = `${pdfTitle.value} - ${studentName} - ${className}`
  } else if (students.value.length > 1) {
    document.title = `${pdfTitle.value} - ${institutionName}`
  }
  const uwy = document.querySelector('.uwy')
  if (uwy) uwy.style.display = 'none'
  window.print()
  if (uwy) uwy.style.display = ''
}

const openPdfWaitModal = () => {
  showPdfWaitModal.value = true
}

const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
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
</style>