<template>
  <div class="student-report-index">
    <SimpleTab v-if="isNetworkManager || managerProfile" tab-title="Relatórios" />
    <ReadingMeterEvaluationInfo v-if="!isAuditor" />
    <b-row>
      <b-col cols="12">
        <StudentReportHeader />
      </b-col>
      <b-col cols="12">
        <StudentReportFilter />
      </b-col>
      <b-col cols="12">
        <StudentReportInfo />
      </b-col>
      <b-col cols="12">
        <StudentReportCards />
      </b-col>
      <b-col cols="12">
        <StudentReportData />
      </b-col>
      <b-col cols="12">
        <StudentReportFooter />
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
import StudentReportCards from './StudentReportCards.vue'
import StudentReportData from './StudentReportData.vue'
import StudentReportFilter from './StudentReportFilter.vue'
import StudentReportFooter from './StudentReportFooter.vue'
import StudentReportHeader from './StudentReportHeader.vue'
import StudentReportInfo from './StudentReportInfo.vue'
import { useStudentReport } from './useStudentReport'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import ReadingMeterEvaluationInfo from '@/views/pages/reading-meter-V2/evaluation-report/Info.vue'
import { onMounted, getCurrentInstance, computed, ref } from 'vue'

const { loadInitialData, readingDetail } = useStudentReport()
const vm = getCurrentInstance().proxy

const isAuditor = store.getters.accessRole === 'Auditor'
const isTeacher = store.getters.accessRole === 'Teacher'

const isNetworkManager = computed(() => store.getters.accessRole === 'NetworkManager')

const isSecretariat = computed(() => store.getters.accessRole === 'Secretariat')
const isCoordinator = computed(() => store.getters.accessRole === 'Coordinator')
const isManager = computed(() => store.getters.accessRole === 'Manager')

const managerProfile = computed(
  () => isSecretariat.value || isCoordinator.value || isManager.value,
)

const breadcrumbRoute = ref('')

const setBreadcrumbRoute = () => {
  if (isAuditor) {
    breadcrumbRoute.value = ['', '', readingDetail.value.evaluationDetailing.evaluationName, '']
  }
  if (isTeacher) {
    breadcrumbRoute.value = [
      '',
      '',
      readingDetail.value.evaluationDetailing.evaluationName,
      readingDetail.value.evaluationDetailing.studentName,
    ]
  }
  if (managerProfile.value) {
    breadcrumbRoute.value = [
      '',
      '',
      readingDetail.value.evaluationDetailing.evaluationName,
      readingDetail.value.evaluationDetailing.className,
      readingDetail.value.evaluationDetailing.studentName,
    ]
  }
  if (isNetworkManager.value) {
    breadcrumbRoute.value = [
      '',
      '',
      readingDetail.value.evaluationDetailing.evaluationName,
      readingDetail.value.evaluationDetailing.institutionName,
      readingDetail.value.evaluationDetailing.className,
      readingDetail.value.evaluationDetailing.studentName,
    ]
  }
}

onMounted(async () => {
  await loadInitialData()
  setBreadcrumbRoute()
  vm.$bus.emit('setBreadcrumb', breadcrumbRoute.value)
})
</script>