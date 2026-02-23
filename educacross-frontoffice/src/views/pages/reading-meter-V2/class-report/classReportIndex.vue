<template>
  <Tab :current-tab="0" :tabs="tabs" :tab-title="title" tab-title-icon="school">
    <template v-slot:tab-content-0>
      <Info />
      <ClassReportHeader />
      <ClassReportFilter />
      <ClassReportDashboard />
      <ClassReportTable />
      <ClassReportFooter />
    </template>
  </Tab>
</template>

<script setup>
import ClassReportDashboard from './ClassReportDashboard.vue'
import ClassReportFilter from './ClassReportFilter.vue'
import ClassReportFooter from './ClassReportFooter.vue'
import ClassReportHeader from './ClassReportHeader.vue'
import ClassReportTable from './ClassReportTable.vue'
import { useClassReport } from './useClassReport.js'
import Tab from '@/components/tab/Tab.vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'
import Info from '@/views/pages/reading-meter-V2/evaluation-report/Info.vue'
import { onMounted, watch } from 'vue'
import { emitter } from '@/eventBus'

// composables
const {
  selectedEvaluation,
  loadEvaluationDetails,
  loadClassesData,
  readingFluencyEvaluation,
  getTestLabels,
} = useClassReport()

const route = useRoute()
const router = useRouter()

const title = store.getters.accessUserData.InstitutionName
const isManager = store.getters.accessUserData?.Role === 'NetworkManager'
const role = store.getters.accessRole
const evaluationId = route.params.evaluationId

const tabs = [
  {
    title: 'Relatórios',
    route: {
      name:
        role === 'NetworkManager'
          ? 'NetworkManagerFluencyV2Institutions'
          : 'AdminFluencyV2Evaluations',
      params: role === 'NetworkManager' ? { evaluationId } : {},
    },
  },
]

onMounted(async () => {
  await loadEvaluationDetails()
  await loadClassesData()
  await getTestLabels()
})

const handleSetOrReplaceBreadcrumb = newValue => {
  if (newValue && newValue.evaluationName && isManager) {
    emitter.emit('setBreadcrumb', [
      '',
      '',
      newValue.evaluationName,
      newValue.institutionName,
    ])
  } else if (newValue && newValue.evaluationName) {
    const current =
      route.meta && route.meta.breadcrumb ? route.meta.breadcrumb.slice() : []

    if (current[2]) {
      current[2] = { ...current[2], text: newValue.evaluationName }
    } else {
      current[2] = { text: newValue.evaluationName, active: true }
    }

    const filtered = current.filter(
      item => String(item?.text || '').trim() !== 'Listagem de Turmas',
    )

    emitter.emit('replaceBreadcrumb', filtered)
  }
}

watch(readingFluencyEvaluation, handleSetOrReplaceBreadcrumb)
</script>

<style lang="scss" scoped></style>