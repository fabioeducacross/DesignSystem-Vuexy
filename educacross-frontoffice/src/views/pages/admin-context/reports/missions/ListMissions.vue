<template>
  <SimpleTab>
    <b-card>
      <b-form class="filters-form" autocomplete="off">
        <b-col cols="12" lg="auto">
          <SelectSubject :additional-modules="MODULES_IDS" />
        </b-col>

        <b-col v-if="networkManager" cols="12" lg="3">
          <b-form autocomplete="off" class="filters-form-items">
            <b-form-group
              id="school-group"
              class="filters-form-items"
              label="Escola"
              label-for="school"
            >
              <ESelect
                v-model="selectedSchool"
                label="name"
                :options="schoolList"
                track-by="id"
                placeholder="Selecione uma Escola"
                @change="handleChangeSelectedSchool"
              />
            </b-form-group>
          </b-form>
        </b-col>

        <b-col cols="12" lg="2">
          <b-form-group
            id="classes-group"
            label-for="schoolYear"
            class="filters-form-items"
            label="Ano escolar"
          >
            <ESelect
              :disabled="schoolYearLoading"
              :value="schoolYear"
              :options="schoolYearOptions"
              :page="schoolYearPage"
              :total-pages="schoolYearTotalpages"
              :loading="schoolYearLoading"
              name="schoolYear"
              placeholder="selectOneSchoolYearLabel"
              label="name"
              @input="setSchoolYear"
            >
              <template #no-options> {{ $t('schoolYearNotFound') }} </template>
            </ESelect>
          </b-form-group>
        </b-col>

        <b-col cols="12" lg>
          <b-form-group
            id="dataType-group"
            label-for="classe"
            class="filters-form-items"
            label="Turmas"
          >
            <ESelect
              v-model="filters.classIds"
              :options="classes"
              label="name"
              track-by="id"
              :close-on-select="true"
              :paginated="true"
              :page="classesPage"
              :total-pages="classesTotalPages"
              placeholder="Selecione uma Turma"
              @nextPage="handleNextPageClasses"
            >
              <template v-slot:option="{ name, serieName, id }">
                <span>{{ name }}</span>
                <b-badge
                  v-if="filters.classIds && id === filters.classIds.id && serieName"
                  variant="light"
                  pill
                  class="ml-1 text-primary"
                >
                  {{ serieName }}
                </b-badge>
                <b-badge v-else-if="serieName" variant="light-primary" pill class="ml-1">
                  {{ serieName }}
                </b-badge>
              </template>
              <template #selected-option="{ name, serieName }">
                <span>{{ name }}</span>
                <b-badge v-if="serieName" variant="light-primary" pill class="ml-1">
                  {{ serieName }}
                </b-badge>
              </template>
            </ESelect>
          </b-form-group>
        </b-col>

        <b-col cols="12" lg="2">
          <b-form-group
            id="month-group"
            label-for="month"
            class="filters-form-items"
            label="Periodo"
          >
            <ESelect
              v-model="filters.month"
              label="name"
              track-by="id"
              :options="months"
              placeholder="Selecione um periodo"
              @change="setMonth"
            />
          </b-form-group>
        </b-col>
      </b-form>
    </b-card>
    <ListTable
      :loading="busy"
      :table-columns="tableColumns"
      :data-table="missionList"
      :total-data="rows"
      :show-search-query-input="false"
      @change="changeListTable"
    >
      <template #cell(name)="{ value }">
        <span class="font-bold">{{ value }}</span>
      </template>

      <template #cell(teachers)="{ value }">
        <ListInitialsTeacher :data="value" />
      </template>

      <template #cell(serieName)="{ value }">
        <b-badge pill variant="light-primary">
          {{ value }}
        </b-badge>
      </template>

      <template #cell(progress)="{ value }">
        <ProgressBarHorizontalV2
          height="12px"
          :value="value"
          :get-variant="getProgressEnum"
          reverse
        >
        </ProgressBarHorizontalV2>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
          <span
            v-b-tooltip.hover.top="'Ver Relatorio'"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click="openReport(item)"
          >
            pie_chart
          </span>
        </div>
      </template>
    </ListTable>
  </SimpleTab>
</template>

<script setup>
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SelectInfinityScroll from '@/components/selects/SelectInfinityScroll.vue'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import ListTable from '@/components/table/ListTable.vue'
import ListInitialsTeacher from '@/components/teacher/listInitialsTeacher.vue'
import { ModulesEnum } from '@/consts/admin-context/enums/modules'
import { getVariantByRule } from '@/consts/legends'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import { getMissions } from '@/services/shared/missions/Missions.Service'
import { getSeries } from '@/services/shared/serie/Serie.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date.js'
import { BForm, BFormGroup } from 'bootstrap-vue'
import { onMounted, ref, watch, computed } from 'vue'

const MODULES_IDS = [
  ModulesEnum.BookMissions,
  ModulesEnum.EducacrossMissions,
  ModulesEnum.InclusionGuide,
]
const busy = ref(false)
const busyClasses = ref(false)
const busySchoolYear = ref(false)
const filters = ref({
  serieIds: null,
  classIds: null,
  subjectId: null,
  month: null,
  institutionId: null,
  page: 1,
  pageSize: 15,
})
const classes = ref([])
const classesPage = ref(1)
const classesTotalPages = ref(1)
const months = ref([])
const schoolYearLoading = ref(true)
const schoolYear = computed(() => filters.value.serieIds)
const schoolYearOptions = ref([])
const schoolYearPage = ref(1)
const schoolYearTotalpages = ref(1)

const missionList = ref([])

const tableColumns = [
  {
    key: 'name',
    label: 'Turma',
    sortable: true,
    tdClass: 'font-bold',
  },
  {
    key: 'serieName',
    label: 'Ano Escolar',
    sortable: false,
  },
  {
    key: 'teachers',
    label: 'Professores',
    sortable: false,
  },
  {
    key: 'expiratedGuides',
    label: 'Missoes finalizadas',
    sortable: true,
    tooltip: 'Total de missoes que estao finalizadas no periodo filtrado.',
  },
  {
    key: 'startedGuides',
    label: 'Missoes Iniciadas',
    sortable: true,
    tooltip:
      'Total de missoes que estao com status iniciadas e assim disponiveis para os alunos.',
  },
  {
    key: 'progress',
    label: 'Progresso da turma',
    sortable: false,
    tooltip:
      'Percentual de jogadas completas dividido pela quantidade de jogos disponibilizados nas missoes.',
  },
  {
    key: 'actions',
    label: 'Acoes',
    sortable: false,
    thStyle: { width: '90px' },
  },
]

const rows = ref(0)
const creation = ref(true)

const networkManager = ref(false)

const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const loading = ref(true)

const openReport = data => {
  if (isNetworkManager) {
    router.push({
      name: 'listMissionsSchoolByClassInstitution',
      params: {
        classId: data.id,
        institutionId: selectedSchool.value?.id,
      },
    })
  } else {
    router.push({
      name: 'listMissionsSchoolByClass',
      params: {
        classId: data.id,
      },
    })
  }

  if (data.name || data.name !== '') {
    sessionStorage.setItem('className', data.name)
    sessionStorage.setItem('SubjectFilterId', subject.value.id)
  }
}

const { subject, subjects } = useFilters()

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc }) => {
  filters.value.page = currentPage
  filters.value.pageSize = perPage
  filters.value.OrderBy = sortBy ? `${sortBy}` : null
  filters.value.Ascending = `${!isSortDirDesc}`

  handleGetData()
}
const setSeriesSelecteds = async data => {
  filters.value.serieIds = data
  busy.value = true
  fetchClasses(1)
}

const setSchoolYear = value => {
  setSeriesSelecteds(value)
}

const fetchSchoolYear = async () => {
  schoolYearLoading.value = true
  try {
    const { data } = await getSeries({
      subjects: subject.value.id,
      modulesIds: [ModulesEnum.Reports, ...MODULES_IDS],
    })

    const options = data.data
    if (options.length) {
      options.unshift({ name: 'Todos os anos', id: null })
      if (!filters.value.serieIds) {
        setSchoolYear(options[0])
      }
    }
    schoolYearOptions.value = options
  } catch (error) {}
  schoolYearLoading.value = false
}
const setMonth = async () => {
  store.commit('UPDATE_MONTH_SELECTED', filters.value.month?.id)
}
const handleChangeSubject = () => {
  busy.value = true
  filters.value.OrderBy = null
  filters.value.Ascending = null
  filters.value.serieIds = null
  fetchSchoolYear()
}
const handleNextPageClasses = async () => {
  if (classesPage.value > classesTotalPages.value || busyClasses.value) return
  await fetchClasses()
}

const fetchClasses = async page => {
  busyClasses.value = true

  if (page) classesPage.value = page

  const { data } = await getClassesV2Label({
    serieIds: filters.value.serieIds?.id,
    subjectId: subject.value.id,
    institutionId: selectedSchool.value?.id,
    page: classesPage.value,
    ModulesIds: [ModulesEnum.Reports, ...MODULES_IDS],
    orderBy: 'ClassName',
    ascending: true,
  })

  if (classesPage.value === 1) {
    classes.value = [{ name: 'Todas as Turmas', id: null }]
    filters.value.classIds = { name: 'Todas as Turmas', id: null }
  }

  classes.value.push(...data.data)
  classesTotalPages.value = data.totalPages

  classesPage.value += 1

  busyClasses.value = false
}

const schoolList = ref([])
const selectedSchool = ref(null)

const handleGetData = () => {
  if (!filters.value.classIds) return

  missionList.value = []
  busy.value = true

  if (isNetworkManager) {
    filters.value.institutionId = selectedSchool.value?.id
  }

  const params = {
    ...filters.value,
    serieIds: filters.value.serieIds?.id,
    classIds: filters.value.classIds.id,
    subjectId: subject.value.id,
    month: filters.value.month?.id,
  }

  getMissions(params).then(response => {
    busy.value = false
    rows.value = response.data.total
    missionList.value = response.data.data
  })
}
const handleCreateFilters = async () => {
  busy.value = true

  filters.value.month = months.value[months.value.length - 1]
  store.commit('UPDATE_MONTH_SELECTED', filters.value.month?.id)

  if (isNetworkManager) {
    filters.value.institutionId = selectedSchool.value?.id
  }

  creation.value = false
}

const handleInstitution = async () => {
  const response = await getInstitutions({
    ModuleId: 1,
  })

  schoolList.value = response.data
  if (schoolList.value.length > 0) {
    selectedSchool.value = schoolList.value[0]
  }
}

const networkMInstitution = computed(() => {
  return schoolList.value.find(item => item.id === selectedSchool.value?.id) || {}
})

watch([() => filters.value.classIds, () => filters.value.month], () => {
  if (!loading.value) {
    handleGetData()
  }
})

const handleChangeSelectedSchool = () => {
  fetchClasses(1)
}

watch(subject, () => {
  handleChangeSubject()
})

onMounted(async () => {
  busy.value = true
  if (isNetworkManager) {
    networkManager.value = true
    await handleInstitution()
  }

  months.value = getMonthList()
  await handleCreateFilters()
  loading.value = false
})

const getProgressEnum = value => {
  return getVariantByRule(value, 'progress')
}
</script>

<style lang="scss" scoped>
  .schoolMission-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #2c2c2c;
  }

  .filters-form {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
  }

  .filters-form-items {
    flex: 1;
    margin: 0 5px;
  }

  .filters-wrapper {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  @media (max-width: 900px) {
    .column-order {
      display: flex;
      flex-direction: column;
    }

    .filters-form {
      display: flex;
      flex-direction: column;
    }

    .filters-form-items {
      margin-bottom: 1rem;
    }

    .custom-button-margin {
      margin-top: 1rem;
    }
  }
</style>
