<template>
  <Tab :current-tab="0" :tabs="tabs" :tab-title="title" tab-title-icon="school">
    <template v-slot:tab-content-0>
      <Info />
      <SchoolsReportHeader />
      <SchoolsReportFilter />
      <SchoolsReportDashboard />
      <SchoolsReportList />
      <SchoolsReportFooter />
    </template>
  </Tab>
</template>

<script setup>
import SchoolsReportDashboard from './SchoolsReportDashboard.vue'
import SchoolsReportFilter from './SchoolsReportFilter.vue'
import SchoolsReportFooter from './SchoolsReportFooter.vue'
import SchoolsReportHeader from './SchoolsReportHeader.vue'
import SchoolsReportList from './SchoolsReportList.vue'
import { useSchoolsReport } from './useSchoolsReport.js'
import Tab from '@/components/tab/Tab.vue'
import store from '@/store'
import Info from '@/views/pages/reading-meter-V2/evaluation-report/Info.vue'
import { onMounted, ref, getCurrentInstance, watch } from 'vue'

const {
  fetchInstitutions,
  fetchEvaluationDetails,
  loadProficiency,
  readingFluencyEvaluation,
  getTestLabels,
} = useSchoolsReport()

const title = store.getters.accessUserData.InstitutionName
const vm = getCurrentInstance().proxy
const role = store.getters.accessRole

const tabs = [
  {
    title: 'Relatórios',
    route: {
      name:
        role === 'NetworkManager'
          ? 'NetworkManagerFluencyV2Institutions'
          : 'AdminFluencyV2Evaluations',
    },
  },
]

const currentTab = ref(0)

onMounted(() => {
  fetchEvaluationDetails()
  loadProficiency()
  fetchInstitutions()
  getTestLabels()
})

watch(readingFluencyEvaluation, newValue => {
  if (newValue && newValue.evaluationName) {
    vm.$bus.emit('setBreadcrumb', ['', '', newValue.evaluationName])
  }
})
</script>

<style lang="scss" scoped></style>