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
import moduleEventsIndividualReportStudentAbilities from '@/store/pageModules/events/module-events-individual-report-student-abilities.js'
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
  'individualReportStudentAbilities',
  moduleEventsIndividualReportStudentAbilities,
)

const { eventId } = router.currentRoute.params
const institutionId = store.state.access.userData.InstitutionId

const vm = getCurrentInstance().proxy

const tabTitle = ref(null)
const loading = ref(true)
const eventDetails = computed(() => store.getters['events/eventDetails'])
const studentName = computed(
  () => store.getters['individualReportStudentAbilities/studentName'],
)

store
  .dispatch('events/fetchDetails', {
    eventId,
    institutionId,
  })
  .then(() => {
    loading.value = false
  })

watch([eventDetails], () => {
  vm.$bus.emit('setBreadcrumb', ['', eventDetails.value.eventActiveName, ''])
})

watch([studentName], () => {
  vm.$bus.emit('setBreadcrumb', [
    '',
    eventDetails.value.eventActiveName,
    '',
    studentName.value,
  ])
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
  store.commit('individualReportStudentAbilities/reset')
  store.unregisterModule('individualReportStudentAbilities')
})

const legends = [{ enum: ArrowPerformanceSchoolEnum }, eventLearningPerformanceLegend]
</script>