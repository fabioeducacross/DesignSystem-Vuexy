<template>
  <div>
    <section v-if="isTeacher">
      <ReadingMeterEvaluationInfo />

      <EvaluationReportHeader />

      <EvaluationReportFilter />

      <EvaluationReportDashboard />

      <EvaluationReportList />

      <EvaluationReportFooter />
    </section>

    <Tab v-else :tabs="tabs" :current-tab="0" tab-title-icon="school" :tab-title="title">
      <template v-slot:tab-content-0>
        <ReadingMeterEvaluationInfo />

        <EvaluationReportHeader />

        <EvaluationReportFilter />

        <EvaluationReportDashboard />

        <EvaluationReportList />

        <EvaluationReportFooter />
      </template>
    </Tab>
  </div>
</template>

<script setup>
import { useEvaluationReport } from './useEvaluationReport.js'
import Tab from '@/components/tab/Tab.vue'
import store from '@/store'
import EvaluationReportDashboard from '@/views/pages/reading-meter-V2/evaluation-report/EvaluationReportDashboard.vue'
import EvaluationReportFilter from '@/views/pages/reading-meter-V2/evaluation-report/EvaluationReportFilter.vue'
import EvaluationReportFooter from '@/views/pages/reading-meter-V2/evaluation-report/EvaluationReportFooter.vue'
import EvaluationReportHeader from '@/views/pages/reading-meter-V2/evaluation-report/EvaluationReportHeader.vue'
import EvaluationReportList from '@/views/pages/reading-meter-V2/evaluation-report/EvaluationReportList.vue'
import ReadingMeterEvaluationInfo from '@/views/pages/reading-meter-V2/evaluation-report/Info.vue'
import { onMounted, watch, ref, getCurrentInstance } from 'vue'

const {
  getEvaluationDetails,
  getStudentData,
  getReadingsTest,
  readingFluencyEvaluation,
  loadProficiency,
} = useEvaluationReport()

const vm = getCurrentInstance().proxy

const isTeacher = ref(store.getters.accessRole === 'Teacher')

const isManager = store.getters.accessUserData?.Role === 'NetworkManager'

const title = store.getters.accessUserData.InstitutionName

const tabs = [{ title: 'Relatório' }]

onMounted(async () => {
  await getEvaluationDetails()
  await getReadingsTest()
  await getStudentData()
  await loadProficiency()
})

watch(readingFluencyEvaluation, newValue => {
  if (newValue && newValue.evaluationName && isTeacher.value) {
    vm.$bus.emit('setBreadcrumb', ['', '', newValue.evaluationName])
  } else if (isManager) {
    vm.$bus.emit('setBreadcrumb', [
      '',
      '',
      newValue.evaluationName,
      newValue.institutionName,
      newValue.className,
    ])
  } else {
    vm.$bus.emit('setBreadcrumb', ['', '', newValue.evaluationName, newValue.className])
  }
})
</script>

<style lang="scss" scoped>
  .underline {
    text-decoration: underline;
  }

  .icon-badge {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .d-flex.justify-content-between {
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>