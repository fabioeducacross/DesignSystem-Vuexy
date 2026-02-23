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
    <ParticipationDashboard />
    <ParticipationList />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import ParticipationDashboard from './Dashboard.vue'
import ParticipationList from './List.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { EventStatusEnum } from '@/consts/StatusEnums.js'
import { eventLearningPerformanceLegend } from '@/consts/legends/events/eventPerformanceEnum.js'
import { participationLegend } from '@/consts/legends/participationEnum.js'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import PageTitle from '@/views/events/components/PageTitle.vue'
import { getCurrentInstance, onMounted, onUnmounted, watch, ref, computed } from 'vue'

const userRole = store.getters.accessRole
const { eventId, institutionId, classId } = router.currentRoute.params
const { classe } = useFilters()

if (classId) {
  classe.value = { ClassId: classId }
}

const loading = ref(true)
const loadingEventDetails = ref(false)
const filterData = ref([])

const vm = getCurrentInstance().proxy

const tabTitle = ref(null)
const eventLastUpdate = computed(() => store.getters['events/eventLastUpdate'])
const eventDetails = computed(() => store.getters['events/eventDetails'])

store
  .dispatch('events/fetchDetails', {
    eventId,
    institutionId,
    classId: classe.value.ClassId,
  })
  .then(() => (loading.value = false))

watch([eventDetails], () => {
  const breadcrumb = ['', eventDetails.value.eventActiveName, eventDetails.value.className]
  if (userRole === 'NetworkManager') {
    breadcrumb.splice(2, 0, eventDetails.value.institutionName)
  }
  vm.$bus.emit('setBreadcrumb', breadcrumb)
  vm.$bus.emit('setTabTitle', eventDetails.value.className)
})

onMounted(() => {
  vm.$bus.on('setTabTitle', title => {
    tabTitle.value = title
  })
})

onUnmounted(() => {
  vm.$bus.off('setTabTitle')
})

const legends = [participationLegend, eventLearningPerformanceLegend]
</script>