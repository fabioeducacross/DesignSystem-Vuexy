<template>
  <section>
    <b-row>
      <b-col cols="12">
        <EvaluationsTCTStudentsDetailHeader />
      </b-col>
      <b-col cols="12">
        <EvaluationsTCTStudentsDetailCards />
      </b-col>
      <b-col cols="12">
        <EvaluationsTCTStudentsDetailFilter v-model="filterParams" />
      </b-col>
      <b-col cols="12">
        <EvaluationsTCTStudentsDetailCardsComp />
      </b-col>
      <b-col cols="12">
        <EvaluationsTCTStudentsDetailTableStrongWeak />
      </b-col>
      <b-col cols="12">
        <EvaluationsTCTStudentsDetailFeedback :filter="filterParams" />
      </b-col>
      <b-col cols="12">
        <EvaluationsTCTStudentsDetailFooter />
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import moduleTctStudentsFeedback from '@/store/pageModules/reports/module-tct-students-feedback.js'
import EvaluationsTCTStudentsDetailCards from '@/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailCards.vue'
import EvaluationsTCTStudentsDetailCardsComp from '@/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailCardsComp.vue'
import EvaluationsTCTStudentsDetailFeedback from '@/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailFeedback.vue'
import EvaluationsTCTStudentsDetailFilter from '@/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailFilter.vue'
import EvaluationsTCTStudentsDetailFooter from '@/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailFooter.vue'
import EvaluationsTCTStudentsDetailHeader from '@/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailHeader.vue'
import EvaluationsTCTStudentsDetailTableStrongWeak from '@/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailTableStrongWeak.vue'
import { computed, getCurrentInstance, onUnmounted, ref, watch } from 'vue'

const filterParams = ref({
  educationalOrganization: {
    id: null,
    name: null,
  },
  subjectId: null,
})

const { evaluationId, studentId, classId, institutionId } = router.currentRoute.params
const { classe } = useFilters()

store.dispatch('evaluations/setEvaluationData', {
  evaluationId,
  institutionId,
  classId: classId || classe.value.ClassId,
})

store.registerModule('EvaluationTCTStudentsDetail', moduleTctStudentsFeedback)

store.commit('EvaluationTCTStudentsDetail/evaluationId', evaluationId)
store.commit('EvaluationTCTStudentsDetail/studentId', studentId)
store.commit('EvaluationTCTStudentsDetail/classId', classId || classe.value.ClassId)

const studentName = computed(() => store.getters['EvaluationTCTStudentsDetail/studentName'])

const vm = getCurrentInstance().proxy
const isTeacher = store.getters.accessRole === 'Teacher'

watch(studentName, () => {
  const breadcrumb = ['', '', store.getters['evaluations/evaluationName']]

  if (vm.$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
    breadcrumb.push(store.getters['evaluations/institutionName'])
  }
  if (!isTeacher) {
    breadcrumb.push(store.getters['evaluations/className'])
  }
  breadcrumb.push(studentName.value)

  vm.$bus.emit('setBreadcrumb', breadcrumb)
})

onUnmounted(() => {
  store.commit('EvaluationTCTStudentsDetail/reset')
  store.unregisterModule('EvaluationTCTStudentsDetail')
})
</script>