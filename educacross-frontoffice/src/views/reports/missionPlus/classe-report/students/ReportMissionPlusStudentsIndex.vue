<template>
  <section>
    <ReportMissionPlusStudentsTitle />
    <ReportMissionPlusStudentsMissions />
    <ReportMissionPlusStudentsTable />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum.js'
import store from '@/store'
import ReportMissionPlusStudents from '@/store/pageModules/reports/module-report-mission-plus-students.js'
import ReportMissionPlusStudentsMissions from '@/views/reports/missionPlus/classe-report/students/ReportMissionPlusStudentsMissions.vue'
import ReportMissionPlusStudentsTable from '@/views/reports/missionPlus/classe-report/students/ReportMissionPlusStudentsTable.vue'
import ReportMissionPlusStudentsTitle from '@/views/reports/missionPlus/classe-report/students/ReportMissionPlusStudentsTitle.vue'
import { useMissionPlusReportStudents } from '@/views/reports/missionPlus/classe-report/students/useMissionPlusReportStudents'
import { getCurrentInstance, onUnmounted, watch } from 'vue'

const { MODULE_NAME, title, getRoundsData } = useMissionPlusReportStudents()

store.registerModule(MODULE_NAME, ReportMissionPlusStudents)
const { proxy: vm } = getCurrentInstance()

onUnmounted(() => {
  store.commit(`${MODULE_NAME}/reset`)
  store.unregisterModule(MODULE_NAME)
})

watch(title, () => {
  vm.$bus.emit('setBreadcrumb', ['', '', title.title])
})

getRoundsData()

const legends = [accuracyPerformanceLegend]
</script>