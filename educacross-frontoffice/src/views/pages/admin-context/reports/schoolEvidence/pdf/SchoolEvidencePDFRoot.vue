<template>
  <div>
    <div class="header printOcult">
      <div class="header-title">
        <div class="header-back-button" @click="backToList">
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

        <b-button v-if="massPdf" class="header-button" variant="primary" @click="printInZIP">
          Imprimir em PDFs separados
        </b-button>
      </div>
    </div>
    <router-view @setInfos="setInfos" />
  </div>
</template>

<script setup>
  import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
  import { BButton } from 'bootstrap-vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router/composables'

  const pdfTitle = ref('')
  const massPdf = ref(false)
  const school = ref(null)

  const router = useRouter()

  const backToList = () => {
    router.push({ name: 'listReportSchoolEvidence' })
  }

  const setInfos = data => {
    pdfTitle.value = data.pdfTitle
    massPdf.value = data.massPdf
    school.value = data.school
  }

  const print = () => {
    window.print()
    document.title =
      school.value && school.value[0] ? school.value[0].className : ''
  }

  const printInZIP = () => {
    // The original code didn't have this method, but it's used in template.
    // You may want to implement this logic as needed.
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