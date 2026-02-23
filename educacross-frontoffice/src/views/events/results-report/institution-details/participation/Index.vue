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
    />
    <ParticipationFilter />
    <ParticipationDashboard />
    <ParticipationList />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import ParticipationDashboard from './Dashboard.vue'
import ParticipationFilter from './ParticipationFilter.vue'
import ParticipationList from './List.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { EventStatusEnum } from '@/consts/StatusEnums.js'
import { eventLearningPerformanceLegend } from '@/consts/legends/events/eventPerformanceEnum.js'
import { participationLegend } from '@/consts/legends/participationEnum.js'
import store from '@/store'
import PageTitle from '@/views/events/components/PageTitle.vue'
import { getCurrentInstance, onMounted, onUnmounted, watch, ref, computed } from 'vue'
import { useRoute } from 'vue-router/composables'

const route = useRoute()
const vm = getCurrentInstance().proxy

const isNetworkManager = store.getters.accessRole === 'NetworkManager'
const eventId = route.params.eventId
const institutionId = Number(route.params.institutionId)

const loadingEventDetails = ref(true)
const tabTitle = ref(null)

const eventDetails = computed(() => store.getters['events/eventDetails'])
const eventLastUpdate = computed(() => store.getters['events/eventLastUpdate'])
const pageTitleInfo = ref({})

store
  .dispatch('events/fetchDetails', {
    eventId,
    institutionId,
  })
  .then(() => {
    loadingEventDetails.value = false
  })

watch([eventDetails], () => {
  const tableTitle = isNetworkManager
    ? eventDetails.value.institutionName
    : 'Visão Geral da Escola'
  vm.$bus.emit('setBreadcrumb', [
    '',
    eventDetails.value.eventActiveName,
    eventDetails.value.institutionName,
  ])
  vm.$bus.emit('setTabTitle', tableTitle)
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