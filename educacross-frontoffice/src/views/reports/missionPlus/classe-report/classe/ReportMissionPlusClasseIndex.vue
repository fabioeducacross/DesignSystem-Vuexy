<template>
  <section>
    <ReportMissionPlusClasseTitle />
    <ReportMissionPlusClasseCards />
    <ReportMissionPlusClasseTables />
    <ReportMissionPlusClasseMissions />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { accuracyPerformanceLegend } from '@/consts/legends/performanceEnum.js'
import { progressLegend } from '@/consts/legends/progressEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import ReportMissionPlusClasse from '@/store/pageModules/reports/module-report-mission-plus-classe.js'
import ReportMissionPlusClasseCards from '@/views/reports/missionPlus/classe-report/classe/ReportMissionPlusClasseCards.vue'
import ReportMissionPlusClasseMissions from '@/views/reports/missionPlus/classe-report/classe/ReportMissionPlusClasseMissions.vue'
import ReportMissionPlusClasseTables from '@/views/reports/missionPlus/classe-report/classe/ReportMissionPlusClasseTables.vue'
import ReportMissionPlusClasseTitle from '@/views/reports/missionPlus/classe-report/classe/ReportMissionPlusClasseTitle.vue'
import { useMissionPlusReportClasse } from '@/views/reports/missionPlus/classe-report/classe/useMissionPlusReportClasse'
import { getCurrentInstance, onUnmounted, watch } from 'vue'

const { moduleName, title, getDetails } = useMissionPlusReportClasse()
const { classe } = useFilters()

const vm = getCurrentInstance().proxy

store.registerModule(moduleName, ReportMissionPlusClasse)

onUnmounted(() => {
  store.commit(`${moduleName}/reset`)
  store.unregisterModule(moduleName)
})

watch(title, () => {
  if (vm.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
    vm.$bus.emit('setBreadcrumb', ['', '', title.value.title])
  } else {
    vm.$bus.emit('setBreadcrumb', ['', '', title.value.className, title.value.title])
  }
})

const { classId } = router.currentRoute.params

if (classId) {
  classe.value = { ClassId: classId }
}

getDetails()

const legends = [progressLegend, accuracyPerformanceLegend]
</script>