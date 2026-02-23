<template>
  <div>
    <div class="header printOcult">
      <div class="header-title">
        <div class="header-back-button" @click="router.back()">
          <feather-icon icon="ArrowLeftIcon" class="back-icon" />
        </div>
        <h1 class="pdf-title">
          {{ pdfTitle }}
        </h1>
      </div>

      <div class="header-buttons">
        <b-button class="header-button" variant="primary" @click="print"> Imprimir </b-button>
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
import useFilters from '@/store/filters/useFilters.js'
import { BButton, BSpinner } from 'bootstrap-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router/composables'

const router = useRouter()

const pdfTitle = ref('')
const massPdf = ref(false)
const students = ref(null)
const selector = ref('')
const spin = ref(false)
const showPdfWaitModal = ref(false)
const masculine = ref(true)
const hideHeaderClose = ref(true)

const setInfos = data => {
  pdfTitle.value = data.pdfTitle
  massPdf.value = data.massPdf
  students.value = data.students
  selector.value = data.selector
}

const printInZIP = async () => {
  openPdfWaitModal()
  spin.value = true

  const filters = useFilters()
  const institutionName = filters.institution.value?.name || ''
  const className = filters.classe.value?.Name || filters.classe.value?.name || ''

  const zipName = `${pdfTitle.value} ${institutionName} ${className}`

  await htmlToPdf(selector.value, zipName, 2, false, 0)
  spin.value = false
}

const print = () => {
  const filters = useFilters()
  const institutionName = filters.institution.value?.name || ''
  const className = filters.classe.value?.Name || filters.classe.value?.name || ''
  const student = students.value?.[0]
  const studentName = student?.studentName || student?.name || ''

  if (students.value && students.value.length === 1) {
    document.title = `${pdfTitle.value} - ${studentName} - ${className}`
  } else if (students.value && students.value.length > 1) {
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