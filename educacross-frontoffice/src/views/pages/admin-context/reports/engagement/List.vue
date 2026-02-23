<template>
  <div>
    <h1 v-if="userRole === 'NetworkManager'" class="engagement-title">
      Engajamento das turmas {{ currentYear }}
    </h1>
    <div class="align-items-center justify-content-between mt-2">
      <div class="filters-form">
        <b-form-group
          v-if="userRole === 'NetworkManager'"
          id="escola"
          class="filters-form-items"
          label="Escola"
        >
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
        <SelectSubject />
        <b-form-group
          class="filters-form-items"
          :label="userRole === 'NetworkManager' ? 'Ano escolar' : 'Ano Letivo'"
          label-for="series"
        >
          <ESelect
            v-model="selectedSeries"
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
        <b-form-group class="filters-form-items" label="Mes" label-for="monthBegin">
          <ESelect
            v-model="selectedMonth"
            class="filter-chooser filter-items"
            label="name"
            :options="monthList"
            placeholder="Selecione um mes"
            :clearable="false"
            @input="handleListEngagements"
          >
            <template #noOptions> Nenhuma mes encontrada </template>
          </ESelect>
        </b-form-group>
      </div>
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
      :busy="busy"
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
      </b-card>
    </div>
  </div>
</template>

<script setup>
import DynamicTable from '../../shared/components/tables/DynamicTable.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getSubjectSeries } from '@/services/admin-context/series/Series.service'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import { getEngagement } from '@/services/shared/reports/Report.service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date'
import { getCurrentInstance, reactive, ref, computed } from 'vue'

const { subject, fetchSubjects, institution } = useFilters()

const busy = ref(false)
const engagementList = ref([])
const seriesList = ref([])
const monthList = ref([])
const institutionList = ref([])
const subjectList = ref([])
const listFilter = ref([])
const filters = reactive({
  seriesId: null,
  monthBegin: 1,
  classId: '',
})
const tableConfig = reactive({
  tableFields: [
    {
      key: 'name',
      label: 'Turma',
      componentName: 'NameClasses',
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
})
const showMode = ref('list')
const currentYear = new Date().getFullYear()
const currentInstitutionName = ref('')
const userRole = ref('')
const vm = getCurrentInstance().proxy

// Computed mappers to preserve primitive ids in `filters` while
// using `ESelect` which emits objects.
const selectedSeries = computed({
  get: () => seriesList.value.find(s => s.id === filters.seriesId) || null,
  set: val => {
    filters.seriesId = val ? val.id : null
  },
})

const selectedMonth = computed({
  get: () => monthList.value.find(m => m.id === filters.monthBegin) || null,
  set: val => {
    filters.monthBegin = val ? val.id : null
  },
})

const isMobile = () => {
  return window.innerWidth <= 1200
}

const calcTotalActivities = (activities, completionPercentage) => {
  return Math.floor((activities * completionPercentage) / 100)
}

const handleGetInstitutions = async () => {
  if (userRole.value === 'NetworkManager') {
    await getInstitutions().then(response => {
      institutionList.value = response.data

      if (vm.$route.query.schoolId) {
        const found = institutionList.value.find(
          i => String(i.id) === String(vm.$route.query.schoolId),
        )
        institution.value = found || institutionList.value[0]
      } else {
        institution.value = institutionList.value[0]
      }
    })
  }
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

const changeShowListMode = mode => {
  showMode.value = mode
}

const handleGetInstitutionsSubjects = async () => {
  await fetchSubjects()
}

const handleChangeInstitution = async () => {
  handleGetInstitutionsSubjects()
  handleListEngagements()
}

const handleCallFunctions = async () => {
  engagementList.value = []
  handleGetSubjectSeries()
  handleListEngagements()
}

const handleListEngagements = async () => {
  engagementList.value = []
  busy.value = true
  await getEngagement({
    subjectId: subject.value.id,
    institutionId: institution.value.id,
    month: filters.monthBegin,
  }).then(response => {
    engagementList.value = response.data
    busy.value = false
  })
}

const handleListLevelEngagements = async levelValue => {
  busy.value = true
  await getEngagement({
    subjectId: subject.value.id,
    institutionId: institution.value.id,
    month: filters.monthBegin,
  }).then(response => {
    listFilter.value = response.data
    engagementList.value = response.data
    if (filters.seriesId) {
      if (levelValue === 0) {
        engagementList.value = listFilter.value.filter(
          engagement => engagement.serieId === filters.seriesId,
        )
      } else if (levelValue === 1) {
        engagementList.value = listFilter.value.filter(
          engagement =>
            engagement.percentage >= 0 &&
            engagement.percentage <= 50 &&
            engagement.serieId === filters.seriesId,
        )
      } else if (levelValue === 2) {
        engagementList.value = listFilter.value.filter(
          engagement =>
            engagement.percentage >= 51 &&
            engagement.percentage <= 75 &&
            engagement.serieId === filters.seriesId,
        )
      } else if (levelValue === 3) {
        engagementList.value = listFilter.value.filter(
          engagement =>
            engagement.percentage >= 76 &&
            engagement.percentage <= 90 &&
            engagement.serieId === filters.seriesId,
        )
      } else if (levelValue === 4) {
        engagementList.value = listFilter.value.filter(
          engagement =>
            engagement.percentage >= 91 &&
            engagement.percentage <= 100 &&
            engagement.serieId === filters.seriesId,
        )
      }
    } else if (levelValue === 1) {
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
    busy.value = false
  })
}

const handleClassFilter = async () => {
  busy.value = true
  await getEngagement({
    subjectId: subject.value.id,
    institutionId: institution.value.id,
    month: filters.monthBegin,
  }).then(response => {
    listFilter.value = response.data
    if (filters.seriesId) {
      engagementList.value = listFilter.value.filter(
        engagement => engagement.serieId === filters.seriesId,
      )
    } else {
      engagementList.value = response.data
    }
  })
  busy.value = false
}

const handleGetSubjectSeries = async () => {
  filters.seriesId = null
  await getSubjectSeries(subject.value.id).then(response => {
    seriesList.value = response.data.data
    seriesList.value.unshift({
      id: null,
      name: 'Todos os anos',
    })
  })
}

const generateMonths = () => {
  monthList.value = getMonthList()
}

const created = async () => {
  userRole.value = store.getters.accessRole

  if (userRole.value === 'NetworkManager') {
    await handleGetInstitutions()
    await handleGetInstitutionsSubjects()
  }

  generateMonths()

  await handleGetSubjectSeries()
  await handleListEngagements()
}

created()
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  .selects {
    width: 15rem;
    margin-right: 0.5rem;
  }

  .filtersButton {
    border-radius: 200px;
    width: 7.7rem;
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

  .cardTitle {
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #5e5873;
  }

  .cardEngagement {
    border-radius: 200px;
    margin-right: 0.5rem;
  }

  .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;

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

  @media screen and (max-width: 768px) {
    .engagement-card {
      width: 100%;

      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }

  .engagement-title {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;

    color: #2c2c2c;
  }
</style>
