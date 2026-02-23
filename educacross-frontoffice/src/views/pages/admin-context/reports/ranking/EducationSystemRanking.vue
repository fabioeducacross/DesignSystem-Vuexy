<template>
  <div>
    <b-row>
      <b-col cols="12" lg="8">
        <h1 class="ranking-list-title">Rankings de conquista - {{ educationSystemName }}</h1>
      </b-col>
      <b-col cols="12" lg="4" align-self="end">
        <div class="d-flex justify-content-end">
          <b-form-group>
            <b-button v-b-modal.modal-config variant="primary"> Configurar ranking </b-button>
          </b-form-group>
        </div>
      </b-col>
    </b-row>
    <b-card>
      <b-row>
        <b-col cols="12" lg>
          <SelectSubject :fetch-on-mounted="false" />
        </b-col>
        <b-col cols="12" lg>
          <b-form-group :label="$t('selectSchoolYearLabel')" label-for="schoolYear">
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
              <template v-slot:no-options> {{ $t('schoolYearNotFound') }} </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" lg>
          <b-form-group :label="$t('Turmas')" label-for="classes">
            <ESelect
              :disabled="classesLoading"
              :value="classes"
              :options="classesOptions"
              :page="classesPage"
              :total-pages="classesTotalpages"
              :loading="classesLoading"
              name="classes"
              label="name"
              paginated
              @input="setclasses"
              @nextPage="fetchClasses"
            >
              <template v-slot:no-options> {{ $t('classesNotFound') }} </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" lg>
          <b-form-group :label="$t('Período')" label-for="period">
            <ESelect
              :value="period"
              :options="periods"
              :disabled="!classes || classes.id === false"
              name="period"
              label="name"
              @input="setPeriod"
            >
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col v-if="period && period.id !== null" cols="12" lg>
          <b-form-group :label="$t('Mês')" label-for="month">
            <ESelect
              :value="month"
              :options="months"
              :disabled="!classes || classes.id === false"
              name="month"
              label="name"
              @input="setMonth"
            >
            </ESelect>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <div class="ranking-list-content">
      <ranking-table
        ranking-title="Ranking de conquistas por ano escolar"
        :leader-board="data"
        :class-name="classes && classes.id ? classes.name : ''"
        :loading="loading"
      />
    </div>
    <RankingConfigModal
      :school-config="'configSchoolRankingEsducationSystem'"
      :class-config="'configClassRankingEducationSystem'"
      :education-system-id="educationSystemId"
      :modal-title="educationSystemName"
    />
  </div>
</template>

<script setup>
import RankingTable from '../../shared/components/ranking-table/RankingTable.vue'
import RankingConfigModal from './components/RankingConfigModal.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import moduleEducationSystemRanking from '@/store/pageModules/reports/module-education-system-ranking.js'
import SchoolYearBadge from '@components/SchoolYearBadge'
import { computed, ref, onUnmounted, watch } from 'vue'

store.registerModule('moduleEducationSystemRanking', moduleEducationSystemRanking)
const { fetchSubjectsWithParams, subject } = useFilters()

const { educationSystemId } = router.currentRoute.params
const institutionId = store.getters.accessUserData?.InstitutionId

store.commit('moduleEducationSystemRanking/setEducationSystemId', educationSystemId)

const educationSystemName = store.state.access.selectedRanking.name

const data = computed(() => store.getters['moduleEducationSystemRanking/data'])

const subjects = computed(() => {
  const subjectsList = store.getters.accessUserData?.InstitutionSubjects || []
  return subjectsList.filter(subject => subject.Id !== 3)
})

const setSubject = value => {
  store.commit('moduleEducationSystemRanking/setSubject', value)
  fetchSchoolYear()
}

// ano escolar
const schoolYear = computed(() => store.getters['moduleEducationSystemRanking/schoolYear'])
const schoolYearLoading = ref(true)
const schoolYearOptions = ref([])
const schoolYearPage = ref(1)
const schoolYearTotalpages = ref(1)

const setSchoolYear = value => {
  store.commit('moduleEducationSystemRanking/setclasses', {
    name: 'Todas as turmas',
    id: null,
  })
  store.commit('moduleEducationSystemRanking/setSchoolYear', value)
  fetchClasses({ fetch: true })
}

const fetchSchoolYear = async (ctx = {}) => {
  schoolYearLoading.value = true

  const { page } = ctx
  schoolYearPage.value = page || 1

  try {
    const { data } = await getSeries({
      Subjects: subject.value.id,
      Page: schoolYearPage.value,
    })

    const options = data.data

    if (schoolYearPage.value === 1 && !options.length) {
      setNoClasses(true)
      schoolYearLoading.value = false

      return
    }

    if (schoolYearPage.value === 1) {
      setSchoolYear(options[0])
    }

    schoolYearOptions.value = options
    schoolYearPage.value = data.page
    schoolYearTotalpages.value = data.totalPages
  } catch (error) {
    setNoClasses(true)
  }

  schoolYearLoading.value = false
}

const setNoClasses = noSchoolYear => {
  if (noSchoolYear) {
    schoolYearOptions.value = [
      {
        id: false,
        name: 'Nenhum ano escolar encontrado',
      },
    ]

    store.commit('moduleEducationSystemRanking/setSchoolYear', schoolYearOptions.value[0])
  }
  classesOptions.value = [
    {
      id: false,
      name: 'Nenhuma Turma encontrada',
    },
  ]
  store.commit('moduleEducationSystemRanking/setclasses', classesOptions.value[0])
  store.dispatch('moduleEducationSystemRanking/noData')
}

// Turma

const classes = computed(() => store.getters['moduleEducationSystemRanking/classes'])
const classesLoading = ref(false)
const classesOptions = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const setclasses = value => {
  store.commit('moduleEducationSystemRanking/setclasses', value)
  store.dispatch('moduleEducationSystemRanking/fetch')
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  try {
    const { data } = await getClassesV2Label({
      InstitutionId: institutionId,
      SerieIds: [schoolYear.value.id],
      Subjects: subject.value.id,
      Page: classesPage.value,
    })

    const options = data.data

    if (classesPage.value === 1) {
      if (!options.length) {
        classesLoading.value = false
        setNoClasses()
        return
      }
      classesOptions.value = [{ name: 'Todas as turmas', id: null }]
    }

    classesOptions.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false

    store.dispatch('moduleEducationSystemRanking/fetch')
  } catch (error) {
    setNoClasses()
  }
}

// periodo
const period = computed(() => store.getters['moduleEducationSystemRanking/period'])
const periods = [
  { id: null, name: 'Geral' },
  { id: 0, name: 'Mensal' },
]

const setPeriod = value => {
  store.commit('moduleEducationSystemRanking/setPeriod', value)
  if (month.value) {
    store.dispatch('moduleEducationSystemRanking/fetch')
  } else {
    setMonth(months.value[0])
  }
}

// MES
const month = computed(() => store.getters['moduleEducationSystemRanking/month'])

const months = computed(() => {
  const length = new Date().getMonth() + 1
  return Array.from({ length }, (item, i) => {
    const str = new Date(0, i).toLocaleString('pt-BR', { month: 'long' })
    const capitalized = str[0].toUpperCase() + str.substr(1)
    return {
      name: capitalized,
      id: i + 1,
    }
  })
})

const setMonth = value => {
  store.commit('moduleEducationSystemRanking/setMonth', value)
  store.dispatch('moduleEducationSystemRanking/fetch')
}

const loading = computed(() => {
  return store.getters['moduleEducationSystemRanking/loading']
})

const created = async () => {
  await fetchSubjectsWithParams({ institutionId, educationSystemId })
}

created()

onUnmounted(() => {
  store.unregisterModule('moduleEducationSystemRanking')
})

watch(subject, setSubject)
</script>
<style lang="scss" scoped>
  .ranking-list-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    color: #2c2c2c;
  }
</style>