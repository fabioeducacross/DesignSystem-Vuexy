<template>
  <div id="PDFroot">
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
      @close="showPdfWaitModal = false"
    >
      <zip-loading
        v-if="showPdfWaitModal"
        :name="pdfTitle"
        :masculine="masculine"
        is-report
        @close="hideHeaderClose = false"
      />
    </b-modal>
  </div>
</template>

<script setup>
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import ZipLoading from '@/components/modal/ZipLoading.vue'
import htmlToPdf from '@/services/shared/pdfs/Pdf.Service'
import { BButton, BSpinner } from 'bootstrap-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router/composables'
import { BModal } from 'bootstrap-vue'

// State variables
const pdfTitle = ref('')
const massPdf = ref(false)
const students = ref(null)
const selector = ref('')
const spin = ref(false)
const showPdfWaitModal = ref(true)
const masculine = ref(false)
const hideHeaderClose = ref(true)

const router = useRouter()

const setInfos = (data) => {
  pdfTitle.value = data.pdfTitle
  massPdf.value = data.massPdf
  students.value = data.students
  selector.value = data.selector
}

const printInZIP = async () => {
  openPdfWaitModal()
  spin.value = true

  const student = students.value && students.value[0]
  const className = student?.institutionName || ''

  if (pdfTitle.value === 'Cartas de acesso') {
    await htmlToPdf(
      selector.value,
      `${pdfTitle.value}-${className}`,
      {
        margin: 0,
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'mm', format: 'A4', orientation: 'portrait' },
      }
    )
  } else if (pdfTitle.value === 'Boletins') {
    setTimeout(async () => {
      await htmlToPdf(
        selector.value,
        `${pdfTitle.value}-${className}`,
        {
          margin: 0,
          html2canvas: { scale: 2 },
          jsPDF: {
            unit: 'px',
            format: [595, 842],
            orientation: 'portrait',
          },
          image: { type: 'png', quality: 1 },
        }
      )
    }, 100)
  } else {
    await htmlToPdf(
      selector.value,
      `${pdfTitle.value}-${className}`,
      {
        margin: 0,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'A4', orientation: 'landscape' },
        image: { type: 'png', quality: 1 },
      }
    )
  }

  spin.value = false
}

const print = () => {
  const student = students.value && students.value[0]
  const institutionName = student?.institutionName || ''
  const className = student?.institutionName || ''
  const studentName = student?.studentName || ''

  if (students.value && students.value.length > 1) {
    document.title = `${pdfTitle.value} - ${institutionName} - ${className}`
  } else {
    document.title = `${pdfTitle.value} - ${studentName} - ${className}`
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
  router.back()
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