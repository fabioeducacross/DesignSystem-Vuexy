<template>
  <div>
    <h1 class="engagement-title">Engajamento das Escolas {{ currentYear }}</h1>
    <div class="align-items-center justify-content-between mt-2">
      <b-row>
        <b-col v-if="userRole === 'NetworkManager'" cols="12" md="3">
          <b-form-group id="escola" class="filters-form-items" label="Escola" label-for="school">
            <ESelect
              v-model="institution"
              class="filter-chooser filter-items"
              label="name"
              :options="institutionList"
              placeholder="Selecione uma instituicao"
              :clearable="false"
              @input="handleChangeInstitution"
            >
              <template #noOptions> Nenhuma Escola encontrada </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="2">
          <SelectSubject />
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group
            class="filters-form-items"
            :label="userRole !== 'NetworkManager' ? 'Ano Letivo' : 'Ano escolar'"
            label-for="series"
          >
            <ESelect
              v-model="filters.seriesId"
              class="filter-chooser filter-items"
              label="name"
              :options="seriesList"
              placeholder="Todos os anos"
              :clearable="false"
              @input="handleClassFilter"
            >
              <template #noOptions>
                Nenhum
                <span v-if="userRole === 'NetworkManager'">ano escolar</span
                ><span v-else>ano letivo</span> encontrado
              </template>
            </ESelect>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="3">
          <b-form-group class="filters-form-items" label="Mes" label-for="monthBegin">
            <ESelect
              v-model="filters.monthBegin"
              class="filter-chooser filter-items"
              label="name"
              :options="monthList"
              placeholder="Selecione um mes"
              :clearable="false"
              @input="handleListEngagements"
            >
              <template #noOptions> Nenhum mes encontrado </template>
            </ESelect>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <div class="d-flex justify-content-between">
      <div>
        <p style="margin-bottom: 0px; margin-top: 1rem; font-weight: 500">
          Selecione qual nivel de engajamento deseja ver
        </p>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <div class="d-flex flex-wrap">
            <b-button
              class="filtersButton button-gradient-purple mt-1"
              @click="handleListLevelEngagements(0)"
            >
              Todos
            </b-button>
            <b-button
              class="filtersButton button-gradient-red mt-1"
              @click="handleListLevelEngagements(1)"
            >
              0%-50%
            </b-button>
            <b-button
              class="filtersButton button-gradient-yellow mt-1"
              @click="handleListLevelEngagements(2)"
            >
              51%-75%
            </b-button>
            <b-button
              class="filtersButton button-gradient-green mt-1"
              @click="handleListLevelEngagements(3)"
            >
              75%-90%
            </b-button>
            <b-button
              class="filtersButton button-gradient-blue mt-1"
              @click="handleListLevelEngagements(4)"
            >
              91%-100%
            </b-button>
          </div>
        </div>
      </div>
      <div v-if="!isMobile()" class="h-100 align-self-center">
        <div class="d-flex toggle-list">
          <b-button
            :class="`p-01 ${showMode === 'card' ? 'active' : 'desactive'}`"
            :active="showMode === 'card'"
            active-class="active"
            variant="outline-secondary"
            @click="changeShowListMode('card')"
          >
            <feather-icon icon="GridIcon" size="18" />
          </b-button>
          <b-button
            :class="`p-01 ${showMode === 'list' ? 'active' : 'desactive'}`"
            :active="showMode === 'list'"
            active-class="active"
            variant="outline-secondary"
            @click="changeShowListMode('list')"
          >
            <feather-icon icon="ListIcon" size="18" />
          </b-button>
        </div>
      </div>
    </div>
    <dynamic-table
      v-if="showMode === 'list' && !isMobile()"
      role="engagement"
      show-by="list"
      :data="engagementList"
      :config="tableConfig"
      :actions="actions"
    />
    <div v-else class="wrapper mt-3">
      <b-card
        v-for="(content, indexContent) in engagementList"
        :key="indexContent"
        class="engagement-card"
        no-body
      >
        <h4 class="cardTitle mb-2">
          {{ content.name }}
        </h4>
        <div class="mb-2">
          <span class="mb-1"
            >{{ calcTotalActivities(content.activities, content.completionPercentage) }} de
            {{ content.activities }} jogos finalizados</span
          >
          <b-progress :value="content.completionPercentage" :max="100" variant="success" />
        </div>
        <div class="w-100 mb-2">
          <b-button :style="getColorToStatus(content.percentage)" class="cardEngagement">
            {{ content.percentage }}% Engajamento
          </b-button>
        </div>
        <div v-if="!onClassRoute">
          <b-button variant="primary" @click="toSchoolEngagement(content.id)">
            Ver turmas
          </b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script setup>
import DynamicTable from '../../shared/components/tables/DynamicTable.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getSubjectSeries } from '@/services/admin-context/series/Series.service'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import { getEngagement } from '@/services/shared/reports/Report.service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed, onMounted, reactive, ref, watch } from 'vue'

const { subject, fetchSubjects, institution } = useFilters()

const onClassRoute = computed(() => {
  const path = router.currentRoute.path
  return !path.includes('engagementSchools')
})

const engagementList = ref([])
const seriesList = ref([])
const monthList = ref([])
const institutionList = ref([])
const subjectList = []
const listFilter = ref([])
const filters = reactive({
  subjectId: '',
  seriesId: '',
  monthBegin: null,
  Institution: {
    id: null,
    name: `Todas as Escolas`,
  },
})
const tableConfig = {
  tableFields: [
    {
      key: 'name',
      label: 'Escola',
    },
    {
      key: 'activities',
      label: 'Jogos Finalizados',
      componentName: 'ProgressStatus',
    },
    {
      key: 'percentage',
      label: 'Engajamento',
      componentName: 'PercentageStatus',
    },
  ],
  cardFields: [
    {
      key: 'name',
      label: 'Turma',
      componentName: 'NameClasses',
    },
    {
      key: 'activities',
      label: 'E-Jogos Finalizados',
      componentName: 'ProgressStatus',
    },
    {
      key: 'percentage',
      label: 'Engajamento',
      componentName: 'PercentageStatus',
    },
  ],
}

if (onClassRoute.value) {
  tableConfig.tableFields.push({
    key: 'actions',
    label: '',
  })
}

const showMode = ref('list')
const actions = ref([])
const currentYear = new Date().getFullYear()
const userRole = ref('')

const handleGetInstitutions = async () => {
  if (userRole.value === 'NetworkManager') {
    await getInstitutions().then(response => {
      institutionList.value = response.data
      institutionList.value.unshift({
        id: null,
        name: `Todas as Escolas`,
      })

      institution.value = institutionList.value[0]
    })
  }
}

const created = async () => {
  userRole.value = store.getters.accessRole

  if (userRole.value === 'NetworkManager') {
    await handleGetInstitutions()
  }

  await fetchSubjects()
  generateMonths()

  await handleGetSubjectSeries()
  await handleListEngagements()
}

created()

onMounted(() => {
  actions.value = [
    {
      label: 'Ver engajamento da turma',
      icon: 'ChevronRightIcon',
      color: 'secundary',
      action: data => {
        router.push({
          name: 'engagementReport',
          query: { schoolId: data.id },
        })
      },
    },
  ]
})

const isMobile = () => {
  if (window.innerWidth <= 1200) {
    return true
  }

  return false
}

const calcTotalActivities = (activities, completionPercentage) => {
  return Math.floor((activities * completionPercentage) / 100)
}

const changeShowListMode = mode => {
  showMode.value = mode
}

const toSchoolEngagement = id => {
  router.push({
    name: 'engagementReportNetWorkManager',
    query: { schoolId: id },
  })
}

const getColorToStatus = percentage => {
  if (percentage >= 0 && percentage <= 50) {
    return 'background: linear-gradient(180deg, #FE5153 0%, #FF8889 100%); border: none'
  }
  if (percentage >= 51 && percentage <= 75) {
    return 'background: linear-gradient(180deg, #FFB443 0%, #FFC774 100%); border: none'
  }
  if (percentage >= 76 && percentage <= 90) {
    return 'background: linear-gradient(180deg, #8BC728 0%, #AEED48 100%); border: none'
  }
  if (percentage >= 91 && percentage <= 100) {
    return 'background: linear-gradient(180deg, #00BDB8 0%, #37D7D2 100%); border: none'
  }
}

const handleGetInstitutionsSubjects = async () => {
  await fetchSubjects()
}

const handleChangeInstitution = async () => {
  await handleGetInstitutionsSubjects()
  await handleGetSubjectSeries()
  handleListEngagements()
}

const handleCallFunctions = async () => {
  engagementList.value = []
  handleGetSubjectSeries()
  handleListEngagements()
}

const getValueId = val => {
  if (val == null) return val
  return typeof val === 'object' ? val.id : val
}

const handleListEngagements = async () => {
  engagementList.value = []

  if (!filters.monthBegin) return

  await getEngagement({
    subjectId: subject.value.id,
    seriesId: getValueId(filters.seriesId),
    monthBegin: getValueId(filters.monthBegin),
    InstitutionId: getValueId(institution.value),
  }).then(response => {
    listFilter.value = response.data

    if (getValueId(institution.value)) {
      engagementList.value = listFilter.value.filter(
        engagement => engagement.name === institution.value.name,
      )
    } else {
      engagementList.value = response.data
    }
  })
}

const handleListLevelEngagements = async levelValue => {
  await getEngagement({
    seriesId: getValueId(filters.seriesId),
    monthBegin: getValueId(filters.monthBegin),
    subjectId: subject.value.id,
    institutionId: getValueId(institution.value),
  }).then(response => {
    filters.seriesId = null
    listFilter.value = response.data
    engagementList.value = response.data
    if (levelValue === 1) {
      engagementList.value = listFilter.value.filter(
        engagement => engagement.percentage >= 0 && engagement.percentage <= 50,
      )
    } else if (levelValue === 2) {
      engagementList.value = listFilter.value.filter(
        engagement => engagement.percentage >= 51 && engagement.percentage <= 75,
      )
    } else if (levelValue === 3) {
      engagementList.value = listFilter.value.filter(
        engagement => engagement.percentage >= 76 && engagement.percentage <= 90,
      )
    } else if (levelValue === 4) {
      engagementList.value = listFilter.value.filter(
        engagement => engagement.percentage >= 91 && engagement.percentage <= 100,
      )
    }
  })
}

const handleClassFilter = async () => {
  await getEngagement({
    seriesId: getValueId(filters.seriesId),
    monthBegin: getValueId(filters.monthBegin),
    subjectId: subject.value.id,
    institutionId: getValueId(institution.value),
  }).then(response => {
    listFilter.value = response.data
    if (filters.seriesId) {
      const selectedSerieId = getValueId(filters.seriesId)
      engagementList.value = listFilter.value.filter(
        engagement => engagement.serieId === selectedSerieId,
      )
    } else {
      engagementList.value = response.data
    }
  })
}

const handleGetSubjectSeries = async () => {
  if (userRole.value !== 'NetworkManager') {
    await getSubjectSeries(subject.value.id).then(response => {
      seriesList.value = response.data.data
      seriesList.value.unshift({
        id: null,
        name: 'Todos os anos',
      })
    })
  }
  filters.seriesId = ''
}

const generateMonths = () => {
  const length = new Date().getMonth() + 1
  const months = Array.from({ length }, (item, i) => {
    const str = new Date(0, i).toLocaleString('pt-BR', { month: 'long' })
    const capitalized = str[0].toUpperCase() + str.substr(1)
    return {
      name: capitalized,
      id: i + 1,
    }
  })
  monthList.value = months
  filters.monthBegin = months[0]
}

watch(subject, async () => {
  await handleGetSubjectSeries()
  handleListEngagements()
})
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  .cardTitle {
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #5e5873;
  }

  .selects {
    width: 15rem;
    margin-right: 0.5rem;
  }

  .filtersButton {
    border-radius: 200px;
    width: 7.7rem;
    margin-right: 0.5rem;
  }

  .cardEngagement {
    border-radius: 200px;
    margin-right: 0.5rem;
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
    margin-bottom: 20px;
  }

  .filters-wrapper {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .custom-button-margin {
    margin-top: 27px;
  }
  .button-gradient-purple {
    background: linear-gradient(180deg, #7367f0 0%, #8d85eb 100%);
    border: none;
  }
  .button-gradient-red {
    background: linear-gradient(180deg, #fe5153 0%, #ff8889 100%);
    border: none;
  }

  .button-gradient-yellow {
    background: linear-gradient(180deg, #ffb443 0%, #ffc774 100%);
    border: none;
  }

  .button-gradient-green {
    background: linear-gradient(180deg, #8bc728 0%, #aeed48 100%);
    border: none;
  }

  .button-gradient-blue {
    background: linear-gradient(180deg, #00bdb8 0%, #37d7d2 100%);
    border: none;
  }

  @media (max-width: 1000px) {
    .column-order {
      display: flex;
      flex-direction: column;
    }

    .selects {
      width: 27.5rem;
      margin-right: 0.5rem;
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

  .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-between;

    // flex-flow: column wrap;
  }

  .engagement-card {
    width: 31%;

    padding: 24px;
  }

  .wrapper .engagement-card:nth-child(3n - 1) {
    margin-left: 24px;
    margin-right: 24px;
  }

  .toggle-list {
    & > button:first-child {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }

    & > button:last-child {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      border-left: none !important;
    }
  }

  @media screen and (max-width: 768px) {
    .engagement-card {
      width: 100%;
    }
  }

  .p-01 {
    padding: 0.7rem !important;
  }

  .active {
    border-color: $color-gray-themeLight !important;
    color: $primary !important;
    background: $white !important;
  }

  .desactive {
    border-color: $color-gray-themeLight !important;
    color: $color-gray-themeLight !important;
    background: $white !important;
  }

  .engagement-title {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;

    color: #2c2c2c;
  }
</style>
