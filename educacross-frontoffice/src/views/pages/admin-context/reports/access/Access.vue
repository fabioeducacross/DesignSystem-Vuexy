<template>
  <SimpleTab>
    <div class="align-items-center justify-content-between">
      <b-form class="filters-form" autocomplete="off">
        <b-row class="align-items-end">
          <b-col v-if="isNetworkManager" md="3" sm="12">
            <b-form-group id="escola" class="filters-form-items" label="Escola">
              <ESelect
                :value="selectedInstitution"
                label="name"
                track-by="id"
                :options="institutionList"
                placeholder="Selecione uma instituição"
                :clearable="false"
                :loading="loadingInstitutions"
                :disabled="loadingInstitutions"
                @input="handleInstitutionChange"
              >
                <template #no-options> Nenhuma Escola encontrada </template>
              </ESelect>
            </b-form-group>
          </b-col>
          <b-col :md="isNetworkManager ? '3' : '5'" sm="12">
            <b-form-group class="filters-form-items" label="Turma" label-for="turma">
              <ESelect
                id="classes"
                label="name"
                :value="filters.class"
                :options="classes"
                :clearable="false"
                :loading="classesLoading"
                :disabled="classesLoading"
                :page="classesPage"
                :total-pages="classesTotalpages"
                paginated
                @input="setclasses"
                @nextPage="fetchClasses"
              >
                <template #no-options> Nenhuma turma encontrada </template>
                <template #selected-option="{ name, serieName }">
                  <span class="d-flex class-badge">
                    <span>{{ name }}</span>
                    <b-badge v-if="serieName" pill variant="light-primary" class="ml-1">{{
                      serieName
                    }}</b-badge>
                  </span>
                </template>
                <template #option="{ name, serieName, id }">
                  <span class="d-flex" style="vertical-align: middle">
                    {{ name }}
                    <b-badge
                      v-if="serieName"
                      pill
                      variant="light-primary"
                      :class="filters.class.id === id ? 'bg-white text-primary' : ''"
                      class="ml-1"
                      >{{ serieName }}</b-badge
                    >
                  </span>
                </template>
              </ESelect>
            </b-form-group>
          </b-col>
          <b-col :md="isNetworkManager ? '3' : '5'" sm="12">
            <b-form-group class="filters-form-items" label="Período" label-for="periodo">
              <ESelect
                :value="filters.month"
                label="name"
                track-by="id"
                :options="getMonths()"
                placeholder="Selecione um mês"
                :clearable="false"
                @input="setMonth"
              >
                <template #no-options> Nenhum mês encontrado </template>
              </ESelect>
            </b-form-group>
          </b-col>
          <b-col :md="isNetworkManager ? '3' : '2'" sm="12">
            <b-form-group class="custom-button-margin">
              <template v-slot:label> &ThinSpace; </template>
              <b-button variant="outline-primary" @click="exportToExcel">
                Exportar em excel
              </b-button>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </div>

    <p class="mt-1 text-legend">
      Alunos:
      <span class="legend-numbers">{{ userEnabled.student | formatNumber }}</span> Professores:
      <span class="legend-numbers">{{ userEnabled.teacher | formatNumber }}</span>
      <span v-if="isNetworkManager || isSecretariat || isManager">
        Coordenadores:
        <span class="legend-numbers">{{ userEnabled.coordinator | formatNumber }}</span>
      </span>

      <span v-if="isNetworkManager || isSecretariat">
        Diretores: <span class="legend-numbers">{{ userEnabled.manager | formatNumber }}</span>
      </span>
    </p>

    <b-card class="text-center" body-class="px-50 px-lg-2">
      <h1 class="chart-title">Volume de acessos dos usuários</h1>
      <b-overlay :show="loading">
        <line-chart
          :label="info.label"
          :date="info.date"
          :coordinator-array="info.coordinatorArray"
          :manager-array="info.managerArray"
          :student-array="info.studentArray"
          :teacher-array="info.teacherArray"
        />
      </b-overlay>
    </b-card>
  </SimpleTab>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import { formatNumber } from '@/filters/filters'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import { getUserAccessV2 } from '@/services/shared/reports/Report.service'
import store from '@/store'
import { getMonthList } from '@/utils/date'
import { monthName } from '@/utils/utils'
import LineChart from '@/views/pages/admin-context/shared/components/charts/LineChart.vue'
import SchoolYearBadge from '@components/SchoolYearBadge'
import * as Excel from 'exceljs/dist/exceljs.min'
import { saveAs } from 'file-saver'
import { ref, reactive, computed, onMounted, nextTick } from 'vue'

const loading = ref(true)
const userEnabled = reactive({
  student: 0,
  teacher: 0,
  coordinator: 0,
  manager: 0,
})
const info = reactive({
  label: ['Aluno', 'Professor', 'Coordenador', 'Diretor'],
  date: [],
  coordinatorArray: [],
  managerArray: [],
  teacherArray: [],
  studentArray: [],
})
const filters = reactive({
  year: null,
  month: {
    id: null,
    name: 'Todo o período',
  },
  class: null,
  InstitutionId: null,
})

const classesLoading = ref(true)
const classes = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const setclasses = value => {
  filters.class = value
  handleUserAccess()
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  if (!filters.InstitutionId) return
  try {
    const { data } = await getClassesV2Label({
      Page: classesPage.value,
      institutionId: filters.InstitutionId,
    })

    const options = data.data

    if (classesPage.value === 1) {
      classes.value = [{ id: null, name: 'Todas as turmas' }]
      filters.class = classes.value[0]
    }

    classes.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    classes.value = []
  }
}

const classesList = ref([])
const classesListLoading = ref(true)
const institutionList = ref([])
const loadingInstitutions = ref(true)

/**
 * Computed property para conversão entre ID e objeto completo
 * Permite usar ESelect (que trabalha com objetos) enquanto mantém
 * o armazenamento como ID (compatibilidade com código existente)
 */
const selectedInstitution = computed({
  get: () => {
    if (!filters.InstitutionId) return null
    return institutionList.value.find(inst => inst.id === filters.InstitutionId) || null
  },
  set: obj => {
    filters.InstitutionId = obj?.id || null
  },
})

const monthList = [
  { id: null, name: 'Todo o período' },
  { id: 0, name: 'Últimos 15 dias', last15Days: true },
  ...getMonthList(12),
]
const usersAccess = ref([])
const studentsAccess = ref([])

const isNetworkManager = computed(() => store.getters.accessRole === 'NetworkManager')
const isSecretariat = computed(() => store.getters.accessRole === 'Secretariat')
const isCoordinator = computed(() => store.getters.accessRole === 'Coordinator')
const isManager = computed(() => store.getters.accessRole === 'Manager')

const handleChangeInstitution = async () => {
  await fetchClasses()
  await handleUserAccess()
}

const handleUserAccess = async () => {
  loading.value = true
  const params = {
    Month: filters.month?.id,
    InstitutionId: filters.InstitutionId,
    ClassId: filters.class?.id,
  }

  if (filters.month?.last15Days) {
    params.Month = null
    params.Last15Days = true
  }

  await getUserAccessV2(params).then(response => {
    const data = response.data.usersAccess
    const isTodoPeriodo = params.Month === null && params?.Last15Days === undefined

    info.date = data.map(infoItem => {
      const date = new Date(infoItem.day)
      if (isTodoPeriodo) {
        const monthAbreviado = monthName(date.getMonth() + 1).slice(0, 3)
        return monthAbreviado
      }

      return `${date.getUTCDate()}/${date.getUTCMonth() + 1}`
    })
    userEnabled.student = response.data.usersEnabled?.student
    userEnabled.teacher = response.data.usersEnabled?.teacher
    userEnabled.coordinator = response.data.usersEnabled?.coordinator
    userEnabled.manager = response.data.usersEnabled?.manager

    info.coordinatorArray = data.map(infoItem => infoItem.coordinator)
    info.managerArray = data.map(infoItem => infoItem.manager)
    info.teacherArray = data.map(infoItem => infoItem.teacher)
    info.studentArray = data.map(infoItem => infoItem.student)
    usersAccess.value = data
  })

  loading.value = false

  // Ensure chart resizes after overlay completes and layout stabilizes
  nextTick(() => {
    nextTick(() => {
      // Chart will resize due to watch triggers and mounted lifecycle
    })
  })
}

const getMonths = () => {
  const currentDate = new Date()
  return monthList.filter(month => month.id < currentDate.getMonth() + 1)
}

const exportToExcel = async () => {
  const wb = new Excel.Workbook()
  const ws = wb.addWorksheet('Relatório de acessos')
  ws.properties.defaultColWidth = 30

  const rowsTitle = ['Alunos', 'Professores']
  const rowsAccessTitle = ['Dia', 'Acessos de alunos', 'Acessos de professores']
  const rows = [formatNumber(userEnabled.student), formatNumber(userEnabled.teacher)]

  if (isSecretariat.value || isNetworkManager.value || isManager.value) {
    rows.push(formatNumber(userEnabled.coordinator))
    rowsTitle.push('Coordenadores')
    rowsAccessTitle.push('Acessos de coordenadores')
  }
  if (isSecretariat.value || isNetworkManager.value) {
    rows.push(formatNumber(userEnabled.manager))
    rowsTitle.push('Diretores')
    rowsAccessTitle.push('Acessos de diretores')
  }

  const usersEnabledTitle = ws.addRow(rowsTitle)
  usersEnabledTitle.font = { bold: true, size: 12 }
  usersEnabledTitle.alignment = { horizontal: 'center' }

  const usersEnabledData = ws.addRow(rows)
  usersEnabledData.alignment = { horizontal: 'center' }

  ws.addRow()

  const usersAccessTitle = ws.addRow(rowsAccessTitle)
  usersAccessTitle.font = { bold: true, size: 12 }
  usersAccessTitle.alignment = { horizontal: 'center' }

  usersAccess.value.forEach(data => {
    const date = new Date(data.day)
    const formatedDate = `${date.getUTCDate()}/${
      date.getUTCMonth() + 1
    }/${date.getFullYear()}`

    const rowAccessData = [
      formatedDate,
      formatNumber(data.student),
      formatNumber(data.teacher),
    ]

    if (isSecretariat.value || isNetworkManager.value || isManager.value) {
      rowAccessData.push(formatNumber(data.coordinator))
    }
    if (isSecretariat.value || isNetworkManager.value) {
      rowAccessData.push(formatNumber(data.manager))
    }

    const usersAccessData = ws.addRow(rowAccessData)
    usersAccessData.alignment = { horizontal: 'center' }
  })

  const buf = await wb.xlsx.writeBuffer()
  saveAs(new Blob([buf]), 'Relatório de acessos.xlsx')
}

/**
 * Handler para mudança de instituição
 * @param {Object|null} institution - Instituição selecionada
 */
const handleInstitutionChange = institution => {
  selectedInstitution.value = institution
  if (institution) {
    handleChangeInstitution()
  }
}

/**
 * Handler para mudança de mês/período
 * @param {Object|null} month - Mês selecionado
 */
const setMonth = month => {
  filters.month = month
  handleUserAccess()
}

const handleCreateFilters = async () => {
  loadingInstitutions.value = true
  if (isNetworkManager.value) {
    await getInstitutions().then(response => {
      institutionList.value = response.data
      filters.InstitutionId = institutionList.value[0].id
    })
  } else {
    filters.InstitutionId = store.getters.accessUserData?.InstitutionId
  }
  loadingInstitutions.value = false
  await fetchClasses()
  await handleUserAccess()
}

onMounted(() => {
  handleCreateFilters()
})
</script>

<style scoped lang="scss">
  .legend-numbers {
    color: #00bdb9;
  }
</style>
