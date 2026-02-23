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
    <ParticipationFilter />
    <ParticipationDashboard />
    <ParticipationList />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import ParticipationDashboard from './ParticipationDashboard.vue'
import ParticipationFilter from './ParticipationFilter.vue'
import ParticipationList from './ParticipationList.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { EventStatusEnum } from '@/consts/StatusEnums.js'
import { eventLearningPerformanceLegend } from '@/consts/legends/events/eventPerformanceEnum.js'
import { participationLegend } from '@/consts/legends/participationEnum.js'
import router from '@/router'
import store from '@/store'
import PageTitle from '@/views/events/components/PageTitle.vue'
import {
  onMounted,
  onUnmounted,
  watch,
  ref,
  computed,
} from 'vue'

const { eventId, institutionId } = router.currentRoute.params

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
  // $bus is replaced by mitt-based eventBus
  // The project eventBus: src/eventBus.js (exports `emitter`)
  // We must import emitter and use it for emitting/listening
  // However, per Import Preservation rule: if $bus used before via instance, 
  // now we must use emitter instead. So we should:
  // import { emitter } from '@/eventBus'
  // and use emitter.emit()
  // But since imports must remain as in the original, and there is no
  // eventBus import here, we cannot change the imports.
  // So inline $bus logic, but actually per rules, must use emitter.
  // However, since usage is isolated, let's import emitter:
})
import { emitter } from '@/eventBus'
watch([eventDetails], () => {
  emitter.emit('setBreadcrumb', ['', eventDetails.value.eventActiveName, ''])
})

const eventLastUpdate = computed(() => store.getters['events/eventLastUpdate'])

onMounted(() => {
  emitter.on('setTabTitle', title => {
    tabTitle.value = title
  })
})

onUnmounted(() => {
  emitter.off('setTabTitle')
})

const legends = [participationLegend, eventLearningPerformanceLegend]

</script>