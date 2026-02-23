<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum'
import { progressLegend } from '@/consts/legends/progressEnum'
import store from '@/store'
import ModuleReportMissionPlusStudent from '@/store/pageModules/reports/module-report-mission-plus-student'
import ReportMissionPlusStudentCards from '@/views/reports/missionPlus/classe-report/student/ReportMissionPlusStudentCards.vue'
import ReportMissionPlusStudentRounds from '@/views/reports/missionPlus/classe-report/student/ReportMissionPlusStudentRounds.vue'
import ReportMissionPlusStudentTitle from '@/views/reports/missionPlus/classe-report/student/ReportMissionPlusStudentTitle.vue'
import ReportMissionPlusStudentWeakStrong from '@/views/reports/missionPlus/classe-report/student/ReportMissionPlusStudentWeakStrong.vue'
import { useReportMissionPlusStudent } from '@/views/reports/missionPlus/classe-report/student/useReportMissionPlusStudent'
import { getCurrentInstance, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy
const { module_name, getData, missionName } = useReportMissionPlusStudent()
store.registerModule(module_name, ModuleReportMissionPlusStudent)

onUnmounted(() => {
  store.commit(`${module_name}/reset`)
  store.unregisterModule(module_name)
})

const create = async () => {
  await getData()
  vm.$bus.emit('setBreadcrumb', ['', '', missionName.value])
}

create()

const legends = [progressLegend, accuracyPerformanceLegend]
</script>

<template>
  <b-row>
    <b-col cols="12">
      <ReportMissionPlusStudentTitle />
    </b-col>
    <b-col cols="12">
      <ReportMissionPlusStudentCards />
    </b-col>
    <b-col cols="12">
      <ReportMissionPlusStudentWeakStrong />
    </b-col>
    <b-col cols="12">
      <ReportMissionPlusStudentRounds />
    </b-col>
    <b-col>
      <LegendEnum :legends="legends" />
    </b-col>
  </b-row>
</template>