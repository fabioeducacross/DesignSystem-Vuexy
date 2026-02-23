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
      :frequency="eventDetails.frequency"
      start-date-prepend="Período de "
    />
    <IndividualReportFilters />
    <IndividualReportDashboard />
    <IndividualReportList />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import IndividualReportDashboard from './IndividualReportDashboard.vue'
import IndividualReportFilters from './IndividualReportFilters.vue'
import IndividualReportList from './IndividualReportList.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { EventStatusEnum } from '@/consts/StatusEnums.js'
import { eventLearningPerformanceLegend } from '@/consts/legends/events/eventPerformanceEnum.js'
import { participationLegend } from '@/consts/legends/participationEnum.js'
import router from '@/router'
import store from '@/store'
import eventsIndividualReportStudentsModule from '@/store/pageModules/events/module-events-individual-report-students.js'
import PageTitle from '@/views/events/components/PageTitle.vue'
import { computed, getCurrentInstance, onUnmounted, ref, watch } from 'vue'

store.registerModule('individualReportStudents', eventsIndividualReportStudentsModule)

const vm = getCurrentInstance().proxy

const { eventId } = router.currentRoute.params
const institutionId = store.state.access.userData.InstitutionId
const loading = ref(true)

store
  .dispatch('events/fetchDetails', {
    eventId,
    institutionId,
  })
  .then(() => {
    loading.value = false
  })

const eventDetails = computed(() => store.getters['events/eventDetails'])
const eventLastUpdate = computed(() => store.getters['events/eventLastUpdate'])

watch([eventDetails], () => {
  vm.$bus.emit('setBreadcrumb', ['', eventDetails.value.eventActiveName, ''])
})

onUnmounted(() => {
  store.unregisterModule('individualReportStudents')
})

const legends = [participationLegend, eventLearningPerformanceLegend]
</script>