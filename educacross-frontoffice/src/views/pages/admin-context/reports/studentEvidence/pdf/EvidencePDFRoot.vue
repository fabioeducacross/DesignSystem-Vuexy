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
        <b-button v-if="!massPdf" class="header-button" variant="primary" @click="print">
          Imprimir
        </b-button>

        <b-button v-if="massPdf" class="header-button" variant="primary" @click="print">
          Imprimir em PDF único
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
  import store from '@/store'
  import { useRouter } from 'vue-router/composables'

  const router = useRouter()

  const pdfTitle = ref('')
  const massPdf = ref(false)
  const students = ref(null)
  const moduleBook = ref(false)
  const role = ref('')

  role.value = store.getters.accessRole

  const AdminBackToList = () => {
    router.push({ name: 'listReportStudentEvidence' })
  }

  const setInfos = (data) => {
    if (!data.pdfTitle) {
      if (role.value !== 'Teacher') {
        router.push({ name: 'listReportStudentEvidence' })
      } else if (data.moduleBook) {
        router.push({
          name: 'EducationSystemModules',
          params: { id: data.moduleBook },
        })
      } else {
        router.push({ name: 'TeacherEvidenceReport' })
      }
    }
    pdfTitle.value = data.pdfTitle
    massPdf.value = data.massPdf
    students.value = data.students
    moduleBook.value = data.moduleBook
  }

  const print = () => {
    window.print()
    document.title = 'Relatório de Evidências'
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