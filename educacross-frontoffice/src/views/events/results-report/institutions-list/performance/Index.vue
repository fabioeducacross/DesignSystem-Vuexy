<template>
  <section>
    <PageTitle
      :is-loading="!eventDetails"
      :title="eventDetails.eventActiveName"
      :start-date="eventDetails.startDate"
      :end-date="eventDetails.endDate"
      :subject-id="eventDetails.subjectId"
      :status="eventDetails.status"
      :status-enum="EventStatusEnum"
      :last-update="eventLastUpdate"
      start-date-prepend="Período de "
    />
    <Filters />
    <List />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import Filters from './Filters.vue'
import List from './List.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { EventStatusEnum } from '@/consts/StatusEnums.js'
import { eventLearningPerformanceLegend } from '@/consts/legends/events/eventPerformanceEnum.js'
import router from '@/router'
import store from '@/store'
import moduleEventsResultsReportInstitutionsPerformance from '@/store/pageModules/events/module-events-results-report-institutions-performance.js'
import PageTitle from '@/views/events/components/PageTitle.vue'
import { getCurrentInstance, onMounted, onUnmounted, watch, ref, computed } from 'vue'

store.registerModule(
  'resultsReportInstitutionsPerformance',
  moduleEventsResultsReportInstitutionsPerformance,
)

const { eventId, institutionId } = router.currentRoute.params
const vm = getCurrentInstance().proxy

const tabTitle = ref(null)
const loading = ref(true)
const eventDetails = computed(() => store.getters['events/eventDetails'])

store
  .dispatch('events/fetchDetails', {
    eventId,
    institutionId,
  })
  .then(() => (loading.value = false))

watch([eventDetails], () => {
  vm.$bus.emit('setBreadcrumb', ['', eventDetails.value.eventActiveName, ''])
})

const eventLastUpdate = computed(() => store.getters['events/eventLastUpdate'])

onMounted(() => {
  vm.$bus.on('setTabTitle', title => {
    tabTitle.value = title
  })
  vm.$bus.emit('setBreadcrumb', ['', eventDetails.value.eventActiveName, ''])
})

onUnmounted(() => {
  vm.$bus.off('setTabTitle')
  store.commit('resultsReportInstitutionsPerformance/reset')
  store.unregisterModule('resultsReportInstitutionsPerformance')
})

const legends = [eventLearningPerformanceLegend]
</script>