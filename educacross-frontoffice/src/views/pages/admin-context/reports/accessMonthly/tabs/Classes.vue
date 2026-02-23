<template>
  <b-row>
    <b-col v-if="isNetworkManager" md="4" cols="12">
      <b-form-group label="Escola" label-for="school">
        <ESelect
          v-model="institution"
          class="filter-chooser filter-items"
          label="name"
          :options="institutionList"
          :reduce="element => element.id"
          placeholder="Selecione uma turma"
          :clearable="false"
          :loading="institutionListLoading"
          @input="setInstitution"
        >
          <template v-slot:no-options> Nenhuma Escola encontrada </template>
        </ESelect>
      </b-form-group>
    </b-col>
    <b-col md="4" cols="12">
      <b-form-group label="Turmas" label-for="classes">
        <ESelect
          id="classes"
          label="name"
          :value="classe"
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
          <template v-slot:selected-option="{ name, serieName }">
            <div>
              <span>
                {{ name }}
              </span>
              <b-badge v-if="serieName" pill variant="light-primary"> {{ serieName }}</b-badge>
            </div>
          </template>
          <template v-slot:option="{ name, serieName, classId }">
            <div>
              <span>
                {{ name }}
              </span>
              <b-badge
                v-if="serieName"
                pill
                variant="light-primary"
                :class="classe.id === classId ? 'bg-white text-primary' : ''"
              >
                {{ serieName }}
              </b-badge>
            </div>
          </template>
        </ESelect>
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group>
        <span
          id="access-class-last-update cursor-help"
          v-b-tooltip="'Esse relatório é calculado diariamente ao final do dia.'"
        >
          Última atualização:
          {{ lastUpdateClasses !== '' ? handleFormatDate(lastUpdateClasses) || '--/--/----' : '' }}
        </span>
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-card no-body>
        <ListTableAccess
          ref="refListTableAccess"
          :fields="tableColumns"
          :items="fetchData"
          :loading="loading"
          :total-rows="totalRows"
          :generating-excel="loadingExcell"
          :export-to-excel="exportToExcelClasses"
        >
          <template #cell(className)="{ item }">
            <div>
              <span class="whitespace-no-wrap">
                {{ item.className }}
                <b-badge variant="light-primary" pill>{{ item.serieName }}</b-badge>
              </span>
              <p :id="`access-teacher-${item.classId}`" class="text-primary mb-0 cursor-help">
                Ver Professores
              </p>
              <b-tooltip
                :target="`access-teacher-${item.classId}`"
                title="Tooltip title"
                triggers="hover"
              >
                <div v-if="item.teachers.length" class="d-flex flex-column">
                  <span v-for="teacher in item.teachers" :key="teacher.id">
                    {{ teacher.teacherName }}
                  </span>
                </div>
                <span v-else>Sem professor cadastrado</span>
              </b-tooltip>
            </div>
          </template>
        </ListTableAccess>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import ESelect from '@/components/selects/ESelect.vue'
import ListTable from '@/components/table/ListTable.vue'
import ListTableAccess from '@/components/table/ListTableAccess.vue'
import { formatNumber } from '@/filters/filters'
import SchoolYearBadge from '@/layouts/components/SchoolYearBadge'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import {
  getMAUStudentClass,
  getUserAccessMonthlyClasses,
} from '@/services/shared/reports/Report.service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { sanitizeString } from '@/utils/utils'
import MultiSelectCheckbox from '@/views/pages/admin-context/shared/components/multi-select/MultiSelectCheckbox.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton, BPagination, BTab, BTabs, BTooltip, VBTooltip } from 'bootstrap-vue'
import { ref, computed, onMounted } from 'vue'
import VSelect from 'vue-select'

// Filters composable for class selection
const { classe } = useFilters()
classe.value = { name: 'Todas as turmas', id: null }

const refListTableAccess = ref(null)
const loadingExcell = ref(false)
const loading = ref(true)
const lastUpdateClasses = ref(undefined)
const currentPageClasses = ref(1)
const institutionList = ref([])
const institutionListLoading = ref(false)
const institution = ref({})
const totalRows = ref(0)
const tableColumns = [
  {
    label: 'Turma',
    key: 'className',
  },
  {
    label: 'Total de Alunos',
    key: 'students',
    class: 'whitespace-no-wrap',
    formatter: value => formatNumber(value),
  },
]

const isNetworkManager = computed(() => store.getters.accessRole === 'NetworkManager')

// CLASSES SELECT
const classesLoading = ref(true)
const classes = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const handleGetInstitutions = async () => {
  currentPageClasses.value = 1
  institutionListLoading.value = true
  try {
    if (isNetworkManager.value) {
      const { data } = await getInstitutions()
      institutionList.value = data
      institution.value = data[0]
      await fetchClasses()
      refreshData(1)
    }
  } finally {
    institutionListLoading.value = false
  }
}

const setInstitution = async data => {
  institution.value = data
  await fetchClasses()
  refreshData(1)
}

const setclasses = value => {
  classe.value = value
  refreshData(1)
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  if (isNetworkManager.value && !institution.value.id) {
    classesLoading.value = false
    return null
  }

  const { page } = ctx
  classesPage.value = page || 1

  try {
    const { data } = await getClassesV2Label({
      Page: classesPage.value,
      institutionId: isNetworkManager.value ? institution.value.id : null,
    })

    const options = data.data

    if (classesPage.value === 1) {
      classes.value = [{ name: 'Todas as turmas', id: null }]
      classe.value = classes.value[0]
    }

    classes.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    classes.value = []
    classesLoading.value = false
  }
}

const getAccessMonthlyClasses = ctx => {
  return getUserAccessMonthlyClasses(
    classe.value.id,
    institution.value.id,
    ctx.sortBy,
    ctx.sortDesc,
    ctx.currentPage,
    ctx.perPage,
  )
}

const fetchData = (ctx, callback) => {
  if (isNetworkManager.value && !institution.value.id) {
    callback([])
    return null
  }

  loading.value = true

  getAccessMonthlyClasses(ctx)
    .then(response => {
      const { data } = response
      const { lastUpdate, reportClass } = data
      lastUpdateClasses.value = lastUpdate
      totalRows.value = reportClass.total
      callback(reportClass.data)
    })
    .catch(() => {
      callback([])
    })
    .finally(() => {
      loading.value = false
    })

  return null
}

const refreshData = page => {
  if (refListTableAccess.value && typeof refListTableAccess.value.refresh === 'function') {
    refListTableAccess.value.refresh(page)
  }
}

const exportToExcelClasses = async () => {
  if (loadingExcell.value) {
    return
  }

  loadingExcell.value = true

  let fileName = 'Relatorio de acessos por turmas'

  if (isNetworkManager.value) {
    fileName = fileName.concat(`${institution.value.name}-`)
  } else {
    fileName = fileName.concat(`${store.getters.accessUserData.InstitutionName}-`)
  }

  if (classe.value.id) {
    fileName = fileName.concat(`${classe.value.name}`)
  } else {
    fileName = fileName.concat(`todas-as-turmas`)
  }

  fileName = sanitizeString(fileName)

  try {
    await getMAUStudentClass(
      {
        classId: classe.value.id,
        institutionId: institution.value.id,
      },
      fileName,
    )
  } catch {
    // $toast pattern must be replaced with eventbus/toast method in composition API migration, 
    // for now we mimic it as event for root listener or use any injected plugin.
    if (typeof window !== 'undefined' && window.Vue && window.Vue.prototype.$toast) {
      window.Vue.prototype.$toast({
        component: Toast,
        props: {
          title: 'Atenção',
          icon: 'AlertTriangleIcon',
          text: 'Erro ao exportar relatório de acessos por Escolas.',
          variant: 'danger',
        },
      })
    }
  } finally {
    loadingExcell.value = false
  }
}

const handleFormatDate = date => {
  if (!date) return null
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

onMounted(async () => {
  if (isNetworkManager.value) {
    await handleGetInstitutions()
  }
})

</script>

<style scoped>
  .cursor-help {
    cursor: help;
    width: fit-content;
  }
</style>