<template>
  <div>
    <b-row>
      <b-col cols="12" lg="8">
        <h1 class="ranking-list-title">Rankings de conquista - Missoes da Escola</h1>
      </b-col>
      <b-col cols="12" lg="4" align-self="end">
        <div class="d-flex justify-content-end">
          <b-form-group>
            <b-button v-b-modal.modal-config variant="primary"> Configurar ranking </b-button>
          </b-form-group>
        </div>
      </b-col>
    </b-row>
    <div class="filters-wrapper">
      <b-row>
        <b-col cols="12" md="auto">
          <SelectSubject :fetch-on-mounted="true" />
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group
            id="classes-group"
            label-for="classes-group"
            class="filters-form-items"
            label="Ano escolar"
          >
            <ESelect
              v-model="filters.serie"
              label="name"
              track-by="id"
              :options="series"
              placeholder="Selecione um ano escolar"
              :clearable="false"
            >
              <template #noOptions> Nenhum ano escolar encontrado </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group
            id="dataType-group"
            label-for="dataType-group"
            class="filters-form-items"
            label="Turmas"
          >
            <ESelect
              v-model="filters.classes"
              label="name"
              track-by="id"
              :options="classesOptions"
              placeholder="Selecione uma turma"
              :clearable="false"
              :disabled="filtersClassesPlaceholderActive || classesLoading"
              :loading="classesLoading"
              :paginated="true"
              :page="classesPage"
              :total-pages="classesTotalPages"
              :skip-initial-request="true"
              @input="handleGetDataRankingBySchool"
              @nextPage="fetchClasses"
            >
              <template #noOptions> Nenhuma turma encontrada </template>
              <template #option="{ name, serieName }">
                <span class="d-flex align-items-center">
                  {{ name }}
                  <SchoolYearBadge v-if="serieName" :text="serieName" class="ml-1" />
                </span>
              </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group
            id="dataType-group"
            label-for="dataType-group"
            class="filters-form-items"
            label="Periodo"
          >
            <ESelect
              v-model="filters.period"
              label="name"
              track-by="id"
              :options="periods"
              placeholder="Selecione um periodo"
              :clearable="false"
              :disabled="filtersClassesPlaceholderActive"
              @input="handleGetDataRankingBySchool"
            >
              <template #noOptions> Nenhum periodo encontrado </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group
            v-if="filters.period.id !== null"
            id="dataType-group"
            class="filters-form-items"
            label-for="month"
            label="Mes"
          >
            <ESelect
              v-model="filters.month"
              label="name"
              track-by="id"
              :options="months"
              placeholder="Selecione um mes"
              :clearable="false"
              :disabled="filtersClassesPlaceholderActive"
              @input="handleGetDataRankingBySchool"
            >
              <template #noOptions> Nenhum mes encontrado </template>
            </ESelect>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <div class="ranking-list-content">
      <ranking-table
        ranking-title="Ranking de conquistas por ano escolar"
        :leader-board="dataRanking"
        :class-name="filters.classes.id != 0 ? filters.classes.name : ''"
        :loading="loading"
      />
    </div>
    <RankingConfigModal
      :school-config="'configSchoolRankingSchoolMission'"
      :class-config="'configClassRankingSchoolMision'"
      :modal-title="schoolRankingName"
    />
  </div>
</template>

<script setup>
import RankingConfigModal from './components/RankingConfigModal.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getSchoolRanking } from '@/services/shared/ranking/Ranking.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { defineAsyncComponent, ref, computed, onMounted, watch, nextTick } from 'vue'
import { BForm, BFormGroup } from 'bootstrap-vue'

const RankingTable = defineAsyncComponent(() =>
  import('../../shared/components/ranking-table/RankingTable'),
)
const SchoolYearBadge = defineAsyncComponent(() => import('@components/SchoolYearBadge'))

const { subject } = useFilters()

const loading = ref(true)
const dataRanking = ref([])
const subjects = ref([])
const filtersClassesPlaceholderActive = ref(false)
// Estados para paginacao de turmas
const classesOptions = ref([])
const classesLoading = ref(false)
const classesPage = ref(1)
const classesTotalPages = ref(1)
const selectFirstOnLoad = ref(true)
const schoolRankingName = ref('')
const series = ref([
  {
    id: 1,
    name: '1 Ano',
  },
  {
    id: 2,
    name: '2 Ano',
  },
  {
    id: 3,
    name: '3 Ano',
  },
  {
    id: 4,
    name: '4 Ano',
  },
  {
    id: 5,
    name: '5 Ano',
  },
])
const periods = ref([
  { id: null, name: 'Geral' },
  { id: 0, name: 'Mensal' },
])
const months = ref([])

const filters = ref({
  subject: null,
  serie: { name: '' },
  classes: { name: 'Nao possui turmas', id: null },
  period: { name: '' },
  month: { name: '' },
})

const classesParams = computed(() => ({
  subjectId: subject.value.id,
  serieIds: filters.value.serie ? filters.value.serie.id : null,
}))

const noClasses = value => {
  if (value) {
    filters.value.classes.id = null
    filters.value.classes.name = 'Nenhuma turma encontrada'
    filters.value.classes.serieName = ''
    filtersClassesPlaceholderActive.value = true
    dataRanking.value = []
  } else {
    filtersClassesPlaceholderActive.value = false
  }
}

const handleGetDataRankingBySchool = async () => {
  loading.value = true
  filtersClassesPlaceholderActive.value = false

  await getSchoolRanking({
    subjectId: subject.value.id,
    serieId: filters.value.serie?.id,
    classIds: filters.value.classes?.id,
    timePeriod: filters.value.period?.id,
    month: filters.value.month?.id,
  })
    .then(response => {
      dataRanking.value = response.data
    })
    .finally(() => {
      loading.value = false
    })
}

/**
 * Busca turmas com paginacao
 * @param {Object} ctx - Contexto de paginacao
 * @param {Number} ctx.page - Numero da pagina
 */
const fetchClasses = async (ctx = {}) => {
  if (!subject.value?.id || !filters.value.serie?.id) {
    return
  }

  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  try {
    const { data } = await getClassesV2Label({
      SubjectId: subject.value.id,
      SerieIds: [filters.value.serie.id],
      Page: classesPage.value,
      PageSize: 15,
    })

    const options = data.data

    if (classesPage.value === 1 && !options.length) {
      noClasses(true)
      classesLoading.value = false
      return
    }

    if (classesPage.value === 1) {
      classesOptions.value = [{ name: 'Todas as turmas', id: null }]
    }

    classesOptions.value.push(...options)

    classesTotalPages.value = data.totalPages

    if (classesPage.value === 1 && selectFirstOnLoad.value) {
      filters.value.classes = classesOptions.value[0]
      selectFirstOnLoad.value = false
    }

    noClasses(false)
  } catch (error) {
    noClasses(true)
  } finally {
    classesLoading.value = false
  }
}

const generateMonths = async () => {
  const length = new Date().getMonth() + 1
  const generatedMonths = Array.from({ length }, (_item, i) => {
    const str = new Date(0, i).toLocaleString('pt-BR', { month: 'long' })
    const capitalized = str[0].toUpperCase() + str.substr(1)
    return {
      name: capitalized,
      id: i + 1,
    }
  })
  months.value = generatedMonths
}

const handleCreateFilters = () => {
  generateMonths()

  filters.value.serie = series.value[0]
  filters.value.period = periods.value[0]
  filters.value.month = months.value[0]

  // Dispara busca de turmas apos inicializar serie
  nextTick(() => {
    fetchClasses()
  })
}

watch(
  classesParams,
  (newVal, oldVal) => {
    const hasChanged =
      newVal.subjectId !== oldVal?.subjectId || newVal.serieIds !== oldVal?.serieIds

    if (hasChanged && newVal.subjectId && newVal.serieIds) {
      classesPage.value = 1
      classesTotalPages.value = 1
      classesOptions.value = []
      selectFirstOnLoad.value = true
      fetchClasses()
    }
  },
  { deep: true },
)

onMounted(() => {
  schoolRankingName.value = store.state.access.selectedRanking.rankingName
  handleCreateFilters()
})
</script>

<style lang="scss" scoped>
  .ranking-list-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    color: #2c2c2c;
  }

  .ranking-list-legend {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;

    color: #2c2c2c;

    margin: 0;
  }

  .ranking-list-action {
    display: flex;
    justify-content: end;
  }

  .ranking-modal-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    color: #2c2c2c;

    text-align: center;
  }

  .ranking-modal-buttons {
    display: flex;
    justify-content: space-between;
  }

  .ranking-modal-button {
    margin: 8px;
  }

  .filters-form-items {
    flex: 1;
    margin: 0px 5px;
  }

  .filters-wrapper {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .class-badge {
    display: flex;
    align-items: center;
    letter-spacing: 0;

    .select-badge {
      margin-top: 2px;
      margin-left: 8px !important;
    }
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

    .filters-form-items {
      margin-bottom: 1rem;
    }

    .custom-button-margin {
      margin-top: 1rem;
    }
  }
</style>
