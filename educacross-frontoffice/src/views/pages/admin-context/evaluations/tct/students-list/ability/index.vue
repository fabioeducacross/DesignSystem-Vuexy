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
    <AbilityStudentsFilters
      v-model="filtersParams"
      :is-loading="loading"
      :exames-options="examesFilterOptions"
    />
    <SubjectBand
      :subjects-ids="filtersParams.SubjectId ? [filtersParams.SubjectId] : []"
    ></SubjectBand>

    <AbilityStudentsList :filters-params="filtersParams" />
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
import AbilityStudentsFilters from './AbilityStudentsFilters.vue'
import AbilityStudentsList from './AbilityStudentsList.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import SubjectBand from '@/components/subjects/SubjectBand.vue'
import { PerformanceEnum, StatusEnum } from '@/consts/evaluationsEnum.js'
import { ArrowPerformanceSchoolEnum } from '@/consts/legends/comparisonEnum.js'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import ArrowCompare from '@/views/pages/admin-context/evaluations/components/ArrowCompare.vue'
import PageTitle from '@/views/pages/admin-context/evaluations/components/PageTitle.vue'
import { ref, computed, getCurrentInstance } from 'vue'

const { subject, classe } = useFilters()

const examesFilterOptions = computed(() => store.getters['evaluations/exames'])
const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])

const isNetworkManager = store.getters.accessRole === 'NetworkManager'
const isTeacher = store.getters.accessRole === 'Teacher'
const evaluationId = router.currentRoute.params.evaluationId
const institutionId = router.currentRoute.params.institutionId
const classId = router.currentRoute.params.classId || classe.value.ClassId
const lastUpdate = computed(() => store.getters['evaluations/lastUpdate'])

const vm = getCurrentInstance().proxy
const loading = ref(true)

store
  .dispatch('evaluations/setEvaluationData', {
    evaluationId,
    institutionId,
    classId,
  })
  .then(() => {
    const breadcrumb = ['', '', store.getters['evaluations/evaluationName']]
    if (!isTeacher) {
      breadcrumb.push(store.getters['evaluations/className'])
    }
    if (isNetworkManager) {
      breadcrumb.splice(3, 0, store.getters['evaluations/institutionName'])
    }
    vm.$bus.emit('setBreadcrumb', breadcrumb)
    vm.$bus.emit('setTabTitle', store.getters['evaluations/className'])
    loading.value = false
  })

const subjectsIds = computed(() =>
  evaluationDetails.value?.subjects?.map(subject => subject.id),
)

const filtersParams = ref({
  SubjectId: null,
  StudentId: null,
  KnowledgeAxisId: null,
})

const legends = [
  {
    enum: ArrowPerformanceSchoolEnum,
  },
  {
    text: 'Rendimento',
    enum: PerformanceEnum,
  },
]
</script>

<style lang="scss" scoped></style>