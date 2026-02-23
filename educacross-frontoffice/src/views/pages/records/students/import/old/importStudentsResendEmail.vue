<template>
  <div>
    <div class="header-list-imports-email-error">
      <h1 class="import-email-error-title">Importar cadastros de alunos</h1>
    </div>
    <div v-if="importListEmailError" class="list-imports-email-error">
      <div>
        <div class="import-email-error-identifier">
          Nome do arquivo:
          <span class="import-email-error-identifier-name">{{
            importListEmailError.fileName
          }}</span>
        </div>
        <div class="import-email-error-identifier">
          Data:
          <span class="import-email-error-identifier-name">
            {{ handleFormatDate(importListEmailError.date) }}</span
          >
        </div>
        <div class="import-email-error-identifier">
          Autor:
          <InitialsRed
            :name="importListEmailError.authorName"
            class="import-email-error-initials"
          />
          <span class="import-email-error-identifier-name">{{
            importListEmailError.authorName
          }}</span>
        </div>
        <div class="import-email-error-identifier">
          Status:
          <span class="import-email-error-identifier-name">
            <ImportStatus :content="importListEmailError" />
          </span>
        </div>
      </div>
    </div>
    <div class="resend-emails">
      <b-button variant="primary" class="btn-resend" @click="resendEmails">
        Reenviar e-mails
      </b-button>
      <b-button variant="outline-primary" class="btn-resend" @click="cancelResend">
        Cancelar
      </b-button>
    </div>
    <dynamic-table
      role="Aluno"
      :data="studentAccessList"
      :actions="actions"
      :mass-actions="massActions"
      show-by="list"
      :config="tableConfig"
      label-name="alunos"
      :show-filter="false"
      :busy="busy"
    />
    <ModaProccesslResendEmail />
  </div>
</template>

<script setup>
import ModaProccesslResendEmail from './ModaProccesslResendEmail.vue'
import {
  getImportStudentListEmailErrorById,
  resendEmailError,
} from '@/services/admin-context/students/Students.service'
import { formatDate } from '@/utils/utils'
import DynamicTable from '@/views/pages/admin-context/shared/components/tables/DynamicTable.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ImportStatus from '@/views/pages/admin-context/shared/table-columns-components/ImportStatus.vue'
import InitialsRed from '@/views/pages/admin-context/shared/table-columns-components/InitialsRed.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const route = useRoute()
const router = useRouter()

const importId = ref(null)
const busy = ref(false)
const tableConfig = ref({
  tableFields: [
    {
      key: 'studentName',
      label: 'Nome do aluno *',
      componentName: '',
    },
    {
      key: 'className',
      label: 'Turma *',
    },
    {
      key: 'sponsorEmail',
      label: 'E-mail do responsável',
    },
    {
      key: 'emailStatus',
      label: 'Envio de e-mail',
      componentName: 'EmailStatusError',
    },
    {
      key: 'actions',
      label: '',
    },
  ],
  cardFields: [],
})
const actions = ref([])
const massActions = ref([])
const importListEmailError = ref(null)
const studentAccessList = ref([])

const handleFormatDate = (date) => {
  return formatDate(date)
}

const cancelResend = () => {
  router.push({ name: 'listImportStudentAdmin' })
}

const importStudentListEmailErrorById = async (id) => {
  busy.value = true
  const response = await getImportStudentListEmailErrorById(id)
  importListEmailError.value = response.data
  studentAccessList.value = response.data.studentAccessList
  busy.value = false
}

const resendEmails = async () => {
  try {
    await resendEmailError(importId.value)
    // Show modal (BootstrapVue modal by ref name)
    // In Vue 2.7 in <script setup>, $bvModal is accessed via 'this', but in setup you use global event bus or window property
    // We'll use $bvModal via window if available, else fallback.
    if (typeof window !== 'undefined' && window?.vm?.$bvModal) {
      window.vm.$bvModal.show('modal-resend-emails')
    }
  } catch (err) {
    if (typeof window !== 'undefined' && window?.vm?.$toast) {
      window.vm.$toast({
        component: Toast,
        props: {
          title: 'Atenção',
          icon: 'AlertTriangleIcon',
          text: 'Ocorreu um erro ao reenviar o(s) e-mail(s)!',
          variant: 'danger',
        },
      })
    }
  }
}

onMounted(async () => {
  if (route.params.importId) {
    importId.value = route.params.importId
    await importStudentListEmailErrorById(importId.value)
  } else {
    router.push({ name: 'listImportStudentAdmin' })
  }
})
</script>

<style lang="scss" scoped>
  .list-imports-email-error {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-list-imports-email-error {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.5rem;
  }

  .import-email-error-identifier {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #202223;
    display: inline-block;
  }
  .import-email-error-identifier-name {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.5px;
    line-height: 32px;
    color: #00bdb9;
    padding-right: 24px;
  }

  .import-email-error-initials {
    display: inline-block;
    margin-right: 5px;
  }

  .resend-emails {
    margin-top: 28px;
    .btn-resend {
      padding: 12px 16px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.4px;
      margin-right: 24px;
    }
  }
</style>