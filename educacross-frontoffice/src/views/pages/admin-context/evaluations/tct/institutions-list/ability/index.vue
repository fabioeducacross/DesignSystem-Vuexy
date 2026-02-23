<template>
  <section>
    <PageTitle
      :is-loading="loading"
      :title="evaluationDetails.evaluationName"
      :start-date="evaluationDetails.startDate"
      :end-date="evaluationDetails.endDate"
      :status="evaluationDetails.status"
      :last-update="lastUpdate"
      :status-enum="StatusEnum"
      :subjects-ids="subjectsIds"
    />
    <AbilityInstitutionsFilters
      v-model="filtersParams"
      :is-loading="loading"
      :exames-options="examesFilterOptions"
      :series-filter-options="seriesFilterOptions"
    />
    <SubjectBand :subjects-ids="filtersParams.SubjectId ? [filtersParams.SubjectId] : []" />

    <AbilityInstitutionsList :filters-params="filtersParams" />
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
  import AbilityInstitutionsFilters from './AbilityInstitutionsFilters.vue'
  import AbilityInstitutionsList from './AbilityInstitutionsList.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import SubjectBand from '@/components/subjects/SubjectBand.vue'
  import { StatusEnum, PerformanceEnum } from '@/consts/evaluationsEnum.js'
  import { ArrowPerformanceEnum } from '@/consts/legends/comparisonEnum.js'
  import router from '@/router'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters'
  import ArrowCompare from '@/views/pages/admin-context/evaluations/components/ArrowCompare.vue'
  import PageTitle from '@/views/pages/admin-context/evaluations/components/PageTitle.vue'
  import { ref, computed, getCurrentInstance } from 'vue'

  const { subjects } = useFilters()

  // PAGE TITLE
  const vm = getCurrentInstance().proxy
  const loading = ref(true)

  store
    .dispatch('evaluations/setEvaluationData', {
      evaluationId: router.currentRoute.params.evaluationId,
    })
    .then(() => {
      vm.$bus.emit('setBreadcrumb', ['', '', store.getters['evaluations/evaluationName']])
      vm.$bus.emit('setTabTitle', store.getters['evaluations/evaluationName'])
      loading.value = false
    })

  const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])
  const lastUpdate = computed(() => store.getters['evaluations/lastUpdate'])

  // PAGE FILTERS
  const filtersParams = ref({
    SubjectId: null,
    EducationalOrganizationId: null,
    KnowledgeAxisId: null,
    NetworkGroupId: null,
    InstitutionId: null,
    SerieId: null,
  })

  const examesFilterOptions = computed(() => subjects.value)
  const seriesFilterOptions = computed(() => [
    {
      id: null,
      name: 'Todos os anos',
    },
    ...store.getters['evaluations/series'],
  ])

  const subjectsIds = computed(() =>
    evaluationDetails.value?.subjects?.map(subject => subject.id),
  )

  const legends = [
    {
      enum: ArrowPerformanceEnum,
    },
    {
      text: 'Rendimento',
      enum: PerformanceEnum,
    },
  ]
</script>

<style lang="scss" scoped></style>