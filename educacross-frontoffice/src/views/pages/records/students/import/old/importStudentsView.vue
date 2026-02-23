<template>
  <div>
    <div class="header-list-imports-view">
      <h1 class="import-view-title">Importar cadastros de alunos</h1>
    </div>
    <div v-if="importListView" class="list-imports-view">
      <div>
        <div class="import-view-identifier">
          Nome do arquivo:
          <span class="import-view-identifier-name">{{ importListView.fileName }}</span>
        </div>
        <div class="import-view-identifier">
          Data:
          <span class="import-view-identifier-name">
            {{ handleFormatDate(importListView.date) }}</span
          >
        </div>
        <div class="import-view-identifier">
          Autor:
          <InitialsRed :name="importListView.authorName" class="import-view-initials" />
          <span class="import-view-identifier-name">{{ importListView.authorName }}</span>
        </div>
        <div class="import-view-identifier">
          Status:
          <span class="import-view-identifier-name">
            <ImportStatus :content="importListView" />
          </span>
        </div>
      </div>
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
  </div>
</template>

<script setup>
import { getImportStudentListById } from '@/services/admin-context/students/Students.service'
import { formatDate } from '@/utils/utils'
import DynamicTable from '@/views/pages/admin-context/shared/components/tables/DynamicTable.vue'
import ImportStatus from '@/views/pages/admin-context/shared/table-columns-components/ImportStatus.vue'
import InitialsRed from '@/views/pages/admin-context/shared/table-columns-components/InitialsRed.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const route = useRoute()
const router = useRouter()

const busy = ref(false)
const importId = ref(null)
const importListView = ref(null)
const studentAccessList = ref([])
const actions = ref([])
const massActions = ref([])
const tableConfig = reactive({
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
      key: 'actions',
      label: '',
    },
  ],
  cardFields: [],
})

const handleFormatDate = (date) => {
  return formatDate(date)
}

const importStudentListById = async (id) => {
  busy.value = true
  getImportStudentListById(id).then(response => {
    importListView.value = response.data
    studentAccessList.value = response.data.studentAccessList
    busy.value = false
  })
}

const init = async () => {
  if (route.params.importId) {
    importId.value = route.params.importId
    await importStudentListById(importId.value)
  } else {
    router.push({ name: 'listImportStudentAdmin' })
  }
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
  .list-imports-view {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-list-imports-view {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.5rem;
  }

  .import-view-identifier {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #202223;
    display: inline-block;
  }
  .import-view-identifier-name {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.5px;
    line-height: 32px;
    color: #00bdb9;
    padding-right: 24px;
  }

  .import-view-initials {
    display: inline-block;
    margin-right: 5px;
  }
</style>