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
      :last-update="eventLastUpdatedAt"
      :frequency="eventDetails.frequency"
    />
    <EventReportFilter v-model="filters" />
    <EventReportDashboard :filters="filters" @eventLastUpdatedAt="setEventTitleLastUpdatedAt" />
    <EventReportTable :filters="filters" />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import EventReportDashboard from './EventReportDashboard.vue'
import EventReportFilter from './EventReportFilter.vue'
import EventReportTable from './EventReportTable.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { EventStatusEnum } from '@/consts/StatusEnums.js'
import { eventProgressLegend } from '@/consts/legends/events/eventProgressEnum.js'
import router from '@/router'
import store from '@/store'
import PageTitle from '@/views/events/components/PageTitle.vue'
import { ref, watch, computed } from 'vue'

const eventLastUpdatedAt = ref('')
const setEventTitleLastUpdatedAt = value => {
  eventLastUpdatedAt.value = value
}

const filters = ref({
  NetworkGroupId: null,
})

const loading = ref(false)

const eventId = router.currentRoute.params.eventId

store
  .dispatch('events/fetchDetails', {
    eventId,
  })
  .then(() => (loading.value = false))

const eventDetails = computed(() => store.getters['events/eventDetails'])

watch(eventDetails, () => {
  // $bus is available globally in this project via vm.$bus, but in script setup use window/global instance
  // however, preserve import pattern, so call as follows:
  if (eventDetails.value) {
    window.$bus && window.$bus.emit('setBreadcrumb', ['', eventDetails.value.eventActiveName, ''])
  }
})

const legends = [eventProgressLegend]
</script>