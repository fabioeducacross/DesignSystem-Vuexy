<template>
  <section>
    <PageTitle
      :is-loading="!evaluationDetails"
      :title="evaluationDetails.evaluationName"
      :start-date="evaluationDetails.startDate"
      :end-date="evaluationDetails.endDate"
      :status="evaluationDetails.status"
      :last-update="lastUpdate"
      :status-enum="StatusEnum"
      :subjects-ids="subjectsIds"
    />
    <AbilityClassesFilters
      v-model="filtersParams"
      :is-loading="loading"
      :exames-options="examesFilterOptions"
      :series-filter-options="seriesFilterOptions"
    />

    <SubjectBand :subjects-ids="subject.id ? [subject.id] : []"></SubjectBand>

    <AbilityClassesList :filters-params="filtersParams" />
    <LegendEnum :legends="legends">
      <template v-slot:enum-component="{ value }">
        <div v-if="value.layout === 'arrow-compare'" class="d-flex align-items-center gap-2">
          <ArrowCompare
            :value-initial="value.valueInitial"
            :value-to-compare="value.valueToCompare"
          />
          <span> {{ value.text }}</span>
        </div>
      </template>
    </LegendEnum>
  </section>
</template>

<script setup>
import AbilityClassesFilters from './AbilityClassesFilters.vue'
import AbilityClassesList from './AbilityClassesList.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import SubjectBand from '@/components/subjects/SubjectBand.vue'
import { StatusEnum, PerformanceEnum } from '@/consts/evaluationsEnum.js'
import { ArrowPerformanceGroupEnum } from '@/consts/legends/comparisonEnum.js'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import ArrowCompare from '@/views/pages/admin-context/evaluations/components/ArrowCompare.vue'
import PageTitle from '@/views/pages/admin-context/evaluations/components/PageTitle.vue'
import { ref, computed, getCurrentInstance } from 'vue'

const { subject } = useFilters()

const examesFilterOptions = computed(() => store.getters['evaluations/exames'])

const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])
const lastUpdate = computed(() => store.getters['evaluations/lastUpdate'])

const seriesFilterOptions = computed(() => [
  {
    id: null,
    name: 'Todos os anos',
  },
  ...store.getters['evaluations/series'],
])
const isNetworkManager = computed(() => store.getters.accessRole === 'NetworkManager')
const evaluationId = router.currentRoute.params.evaluationId
const institutionId = router.currentRoute.params.institutionId

const vm = getCurrentInstance().proxy
const loading = ref(true)
store
  .dispatch('evaluations/setEvaluationData', {
    evaluationId,
    institutionId,
  })
  .then(() => {
    const breadcrumb = ['', '', store.getters['evaluations/evaluationName']]
    if (isNetworkManager.value) {
      breadcrumb.push(store.getters['evaluations/institutionName'])
    }
    vm.$bus.emit('setBreadcrumb', breadcrumb)
    vm.$bus.emit('setTabTitle', store.getters['evaluations/institutionName'])
    loading.value = false
  })

const subjectsIds = computed(() =>
  evaluationDetails.value?.subjects?.map(subject => subject.id),
)

// PAGE FILTERS
const filtersParams = ref({
  SubjectId: null,
  SerieId: null,
  KnowledgeAxisId: null,
})

const legends = [
  {
    enum: ArrowPerformanceGroupEnum,
  },
  {
    text: 'Rendimento',
    enum: PerformanceEnum,
  },
]

</script>

<style lang="scss" scoped></style>