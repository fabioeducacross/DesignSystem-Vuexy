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
    <QuestionsStudentsFilters v-model="filtersParams" :is-loading="loading" />

    <SubjectBand :subjects-ids="subject.id ? [subject.id] : []"></SubjectBand>

    <QuestionsStudentsListQuestion :filters-params="filtersParams" />
  </section>
</template>

<script setup>
import QuestionsStudentsFilters from './QuestionsStudentsFilters.vue'
import QuestionsStudentsListQuestion from './QuestionsStudentsListQuestion.vue'
import SubjectBand from '@/components/subjects/SubjectBand.vue'
import { StatusEnum } from '@/consts/evaluationsEnum.js'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import PageTitle from '@/views/pages/admin-context/evaluations/components/PageTitle.vue'
import { computed, getCurrentInstance, ref } from 'vue'

// PAGE TITLE
const vm = getCurrentInstance().proxy
const loading = ref(true)

const { classe, subject } = useFilters()

const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const classId = router.currentRoute.params.classId || classe.value.ClassId

store
  .dispatch('evaluations/setEvaluationData', {
    evaluationId: router.currentRoute.params.evaluationId,
    institutionId: router.currentRoute.params.institutionId,
    classId,
  })
  .then(() => {
    const breadcrumb = [
      '',
      '',
      store.getters['evaluations/evaluationName'],
      store.getters['evaluations/className'],
    ]
    if (isNetworkManager) {
      breadcrumb.splice(3, 0, store.getters['evaluations/institutionName'])
    }
    vm.$bus.emit('setBreadcrumb', breadcrumb)
    vm.$bus.emit('setTabTitle', store.getters['evaluations/className'])
    loading.value = false
  })

const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])
const lastUpdate = computed(() => store.getters['evaluations/lastUpdate'])

const subjectsIds = computed(() =>
  evaluationDetails.value?.subjects?.map(subject => subject.id),
)
// PAGE FILTERS
const filtersParams = ref({
  NetworkGroupId: null,
  SerieId: null,
})
</script>

<style lang="scss" scoped></style>