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
    <LegendEnum :legends="legends">
      <template v-slot:enum-component="{ value }">
        <div v-if="value.layout === 'arrow-compare'" class="d-flex align-items-center gap-2">
          <ArrowCompare
            :value-initial="value.valueInitial"
            :value-to-compare="value.valueToCompare"
          />
          <span> {{ value.text }}</span>
        </div>
      </template>
    </LegendEnum>
  </section>
</template>

<script setup>
import Filters from './Filters.vue'
import List from './List.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { EventStatusEnum } from '@/consts/StatusEnums.js'
import { ArrowPerformanceGroupEnum } from '@/consts/legends/comparisonEnum.js'
import { eventLearningPerformanceLegend } from '@/consts/legends/events/eventPerformanceEnum.js'
import router from '@/router'
import store from '@/store'
import moduleEventsResultsReportClassesPerformance from '@/store/pageModules/events/module-events-results-report-classes-performance.js'
import PageTitle from '@/views/events/components/PageTitle.vue'
import ArrowCompare from '@/views/pages/admin-context/evaluations/components/ArrowCompare.vue'
import {
  getCurrentInstance,
  onMounted,
  onUnmounted,
  watch,
  ref,
  computed,
} from 'vue'

store.registerModule(
  'resultsReportClassesPerformance',
  moduleEventsResultsReportClassesPerformance,
)

const { eventId, institutionId } = router.currentRoute.params
const { proxy: vm } = getCurrentInstance()

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
  vm.$bus.emit('setBreadcrumb', [
    '',
    eventDetails.value.eventActiveName,
    eventDetails.value.institutionName,
  ])
})

const eventLastUpdate = computed(() => store.getters['events/eventLastUpdate'])

onMounted(() => {
  vm.$bus.on('setTabTitle', title => {
    tabTitle.value = title
  })
  vm.$bus.emit('setBreadcrumb', [
    '',
    eventDetails.value.eventActiveName,
    eventDetails.value.institutionName,
  ])
})

onUnmounted(() => {
  vm.$bus.off('setTabTitle')
  store.commit('resultsReportClassesPerformance/reset')
  store.unregisterModule('resultsReportClassesPerformance')
})

const legends = [
  {
    enum: ArrowPerformanceGroupEnum,
  },
  eventLearningPerformanceLegend,
]
</script>