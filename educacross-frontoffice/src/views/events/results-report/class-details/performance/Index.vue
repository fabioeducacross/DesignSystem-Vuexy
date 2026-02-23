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
import { ArrowPerformanceSchoolEnum } from '@/consts/legends/comparisonEnum.js'
import { eventLearningPerformanceLegend } from '@/consts/legends/events/eventPerformanceEnum.js'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import moduleEventsResultsReportStudentsPerformance from '@/store/pageModules/events/module-events-results-report-students-performance.js'
import PageTitle from '@/views/events/components/PageTitle.vue'
import ArrowCompare from '@/views/pages/admin-context/evaluations/components/ArrowCompare.vue'
import { getCurrentInstance, onMounted, onUnmounted, watch, ref, computed } from 'vue'

const userRole = store.getters.accessRole
store.registerModule(
  'resultsReportStudentsPerformance',
  moduleEventsResultsReportStudentsPerformance,
)

const { eventId, institutionId, classId } = router.currentRoute.params
const { classe } = useFilters()

if (classId) {
  classe.value = { ClassId: classId }
}
const vm = getCurrentInstance().proxy

const tabTitle = ref(null)
const loading = ref(true)
const eventDetails = computed(() => store.getters['events/eventDetails'])
const eventLastUpdate = computed(() => store.getters['events/eventLastUpdate'])

store
  .dispatch('events/fetchDetails', {
    eventId,
    institutionId,
    classId: classe.value.ClassId,
  })
  .then(() => (loading.value = false))

const setBreadcrumb = () => {
  const breadcrumb = ['', eventDetails.value.eventActiveName, eventDetails.value.className]

  if (userRole === 'NetworkManager') {
    breadcrumb.splice(2, 0, eventDetails.value.institutionName)
  }

  vm.$bus.emit('setBreadcrumb', breadcrumb)
}

watch([eventDetails], () => {
  setBreadcrumb()
})

onMounted(() => {
  vm.$bus.on('setTabTitle', title => {
    tabTitle.value = title
  })

  setBreadcrumb()
})

onUnmounted(() => {
  vm.$bus.off('setTabTitle')
  store.commit('resultsReportStudentsPerformance/reset')
  store.unregisterModule('resultsReportStudentsPerformance')
})

const legends = [
  {
    enum: ArrowPerformanceSchoolEnum,
  },
  eventLearningPerformanceLegend,
]
</script>