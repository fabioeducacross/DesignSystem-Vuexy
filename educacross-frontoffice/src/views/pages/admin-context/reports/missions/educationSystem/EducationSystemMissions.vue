<template>
  <div>
    <h1 class="schoolMission-title">Missões e Jogos - {{ educationSystemName }}</h1>
    <div class="filters-wrapper">
      <b-skeleton-wrapper :loading="loading">
        <template v-slot:loading>
          <div>
            <b-row>
              <b-col cols="12" md="6" lg="4">
                <b-skeleton type="text" class="w-100 mb-2" height="50px"></b-skeleton>
              </b-col>
              <b-col cols="12" md="6" lg="4">
                <b-skeleton type="text" class="w-100 mb-2" height="50px"></b-skeleton>
              </b-col>
              <b-col cols="12" md="6" lg="4">
                <b-skeleton type="text" class="w-100 mb-2" height="50px"></b-skeleton>
              </b-col>
            </b-row>
          </div>
        </template>

        <b-form autocomplete="off" class="filters-form">
          <SelectSubject :fetch-on-mounted="false" />
          <b-form-group
            id="classes-group"
            class="filters-form-items"
            label="Ano escolar"
            label-for="series"
          >
            <select-infinity-scroll
              v-model="filters.SerieIds"
              api="v1/series"
              :father-params="subjectParams"
              :await-father-params="true"
              :busy="seriesLoading"
              :first-option="{ name: 'Todos', id: null }"
              :options="series"
              :get-on-created="true"
              :close-on-select="true"
              select-first
              label="name"
              value="id"
              @isReady="setFilterReadySeries"
            />
          </b-form-group>

          <b-form-group
            id="dataType-group"
            class="filters-form-items"
            label="Turmas"
            label-for="classes"
          >
            <select-infinity-scroll
              v-model="filters.ClassIds"
              api="/v2/classes/label"
              class="filter-chooser filter-items"
              :father-params="classesParams"
              :await-father-params="true"
              select-first
              :first-option="{ name: 'Todas as turmas', id: null }"
              @isReady="setFilterReadyClass"
            ></select-infinity-scroll>
          </b-form-group>
        </b-form>
      </b-skeleton-wrapper>
    </div>
    <dynamic-table-paginated
      :actions="actions"
      :busy="busy"
      :config="tableConfig"
      :data="dataTable"
      :no-local-sorting="true"
      :order-by-enum="orderByEnum"
      :per-page="filters.pageSize"
      :rows="rows"
      role="mission"
      show-by="list"
      @changePage="setPage"
      @orderBy="orderByCallBack"
    />
  </div>
</template>

<script setup>
import { SubjectEnum } from '@/consts/SubjectEnum.js'
import { formatNumber } from '@/filters/filters'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getSeriesSAS } from '@/services/admin-context/series/Series.service'
import { getSASMissionsClass } from '@/services/shared/missions/Missions.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import MultiSelectCheckbox from '@/views/pages/admin-context/shared/components/multi-select/MultiSelectCheckbox.vue'
import DynamicTablePaginated from '@/views/pages/admin-context/shared/components/tables/DynamicTablePaginated'
import { BForm, BFormGroup } from 'bootstrap-vue'
import { defineAsyncComponent, ref, computed, watch, onMounted } from 'vue'
import VSelect from 'vue-select'

const SelectInfinityScroll = defineAsyncComponent(() =>
  import('@/components/selects/SelectInfinityScroll'),
)

const busy = ref(true)
const orderByEnum = ref([])
const rows = ref(0)
const educationSystem = ref({})
const educationSystemName = ref('')
const { subject, subjects } = useFilters()

const filters = ref({
  EducationSystemId: undefined,
  InstitutionId: undefined,
  SerieIds: { name: 'Todos', id: null },
  ClassIds: {
    name: 'Todas as turmas',
    id: null,
  },
  OrderBy: undefined,
  Ascending: false,
  Page: 1,
  pageSize: 15,
})

const series = ref([])
const seriesLoading = ref(false)
const userRole = store.getters.accessRole
const dataTable = ref([])
const subjectParams = ref(null)
const loading = ref(true)

const filtersState = ref({
  classId: false,
  serieId: false,
  subjectId: false,
})

if (userRole === 'NetworkManager') {
  filters.value.InstitutionId = parseInt(window.location.pathname.split('/').pop())
  filters.value.EducationSystemId = parseInt(
    window.location.pathname.slice(45).split('/').shift(),
  )
} else {
  filters.value.EducationSystemId = parseInt(router.currentRoute.params.EducationSystemId)
}

watch(subject, () => {
  if (subject.value) {
    subjectParams.value = { subjects: subject.value.id }
  } else {
    subjectParams.value = null
  }
})

watch(
  [() => filtersState.value.serieId, () => filtersState.value.classId, () => subject.value],
  () => {
    if (
      filtersState.value.serieId &&
      filtersState.value.classId &&
      filtersState.value.subjectId
    ) {
      fetchData()
    }
  },
)

watch(
  () => filters.value.ClassIds.id,
  () => {
    if (
      filtersState.value.serieId &&
      filtersState.value.classId &&
      filtersState.value.subjectId
    ) {
      fetchData()
    }
  },
)

const initFiltersData = async () => {
  await getSeriesSAS(filters.value.InstitutionId).then(({ data }) => {
    educationSystem.value = data.find(({ id }) => id === filters.value.EducationSystemId)
    educationSystemName.value = educationSystem.value.name

    subjects.value = educationSystem.value.subjects.map(subject => {
      return {
        id: subject.subjectId,
        name: SubjectEnum[subject.subjectId].label,
      }
    })
    subject.value = subjects.value[0]
    filtersState.value.subjectId = true
  })
}

const setFilterReadySeries = value => {
  filtersState.value.serieId = value
}

const setFilterReadyClass = value => {
  filtersState.value.classId = value
}

const getParams = () => {
  return {
    SubjectId: subject.value.id,
    EducationSystemId: filters.value.EducationSystemId,
    InstitutionId: filters.value.InstitutionId,
    SerieIds: filters.value.SerieIds.id,
    ClassIds: filters.value.ClassIds.id,
    OrderBy: filters.value.OrderBy ? `${filters.value.OrderBy}` : null,
    Ascending: `${filters.value.Ascending}`,
    Page: filters.value.Page,
    pageSize: filters.value.pageSize,
  }
}

const classesParams = computed(() => {
  if (userRole === 'NetworkManager' && !filters.value.InstitutionId) return null
  if (!subject.value.id) return null

  if (userRole === 'NetworkManager') {
    return {
      serieIds: filters.value.SerieIds.id,
      subjectId: subject.value.id,
      institutionId: filters.value.InstitutionId,
    }
  }

  if (filters.value.SerieIds) {
    return {
      serieIds: filters.value.SerieIds.id,
      subjectId: subject.value.id,
    }
  }
  return {
    subjectId: subject.value.id,
  }
})

const fetchData = async () => {
  busy.value = true
  try {
    const { data } = await getSASMissionsClass(getParams())
    const { data: missionList, total } = data

    filters.value.pageSize = data.pageSize
    filters.value.Page = data.currentPage

    orderByEnum.value = data.orderBy
    rows.value = total
    dataTable.value = missionList
  } catch (err) {
    dataTable.value = []
  }
  busy.value = false
}

onMounted(async () => {
  await initFiltersData()
  loading.value = false
})

const setPage = page => {
  filters.value.Page = page
  fetchData()
}

const orderByCallBack = value => {
  if (value.orderBy !== -1) {
    filters.value.OrderBy = value.orderBy
    filters.value.Ascending = value.Ascending
    fetchData()
  }
}

const actions = [
  {
    class: 'icon-primary',
    label: 'Ver detalhes',
    icon: 'ChevronRightIcon',
    action: data => {
      sessionStorage.setItem('SubjectFilterId', subject.value.id)

      if (userRole === 'NetworkManager') {
        return router.push({
          name: 'educationSystemClassPageNM',
          params: {
            EducationSystemId: filters.value.EducationSystemId,
            classId: data.id,
            subjects: subjects.value,
            subjectId: subject.value.id,
            institutionId: filters.value.InstitutionId,
          },
          query: {
            classTitle: data.name,
          },
        })
      }
      store.dispatch('saveEducationSystemSubjects', {
        educationSystemSubjects: subjects.value,
      })

      store.dispatch('saveSubjectId', {
        subjectId: subject.value.id,
      })

      router.push({
        name: 'educationSystemClassPage',
        params: {
          EducationSystemId: filters.value.EducationSystemId,
          subjects: subjects.value,
          subjectId: subject.value.id,
          classId: data.id,
        },
        query: {
          classTitle: data.name,
        },
      })
    },
  },
]

const tableConfig = {
  tableFields: [
    {
      key: 'name',
      label: 'Turma',
      componentName: 'NameClasses',
      sortable: true,
    },
    {
      key: 'teachers',
      label: 'Professor(es)',
      componentName: 'InitialsList',
    },
    {
      key: 'guidesAvailable',
      label: 'Missões disponíveis',
      sortable: true,
      tip: 'Quantidade total de missões disponíveis no sistema de ensino.',
      formatter: value => formatNumber(value),
    },
    {
      key: 'guidesEnabled',
      label: 'Missões habilitadas',
      sortable: true,
      tip: 'Quantidade de missões habilitadas nesse momento.',
      formatter: value => formatNumber(value),
    },
    {
      key: 'actions',
      label: 'Ações',
    },
  ],
  cardFields: [],
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
    justify-content: space-between;
  }

  .filters-form-items {
    flex: 1;
    margin: 0px 5px;
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