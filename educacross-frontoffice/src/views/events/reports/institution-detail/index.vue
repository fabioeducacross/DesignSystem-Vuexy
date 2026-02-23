<template>
  <section>
    <PageTitle
      :is-loading="isLoading"
      :title="eventDetails.eventActiveName"
      :start-date="eventDetails.startDate"
      :end-date="eventDetails.endDate"
      :subject-id="eventDetails.subjectId"
      :status="eventDetails.status"
      :status-enum="EventStatusEnum"
      :last-update="dashboard.lastUpdatedAt"
      :frequency="eventDetails.frequency"
    />

    <InstitutionDetailFilters
      :key="`filters-${keyCounter}`"
      :series="eventDetails.series"
      :is-loading="isLoading"
      @setFiter="setFilter"
    />
    <InstitutionDetailCards
      :key="`cards-${keyCounter}`"
      :dashboard="dashboard"
      :data-institution="eventDetails"
      :is-loading="isLoading"
    />
    <InstitutionDetailTable
      :key="`table-${keyCounter}`"
      :serie-id="selectedSerie"
      :is-loading="isLoading"
    />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import InstitutionDetailCards from './InstitutionDetailCards.vue'
import InstitutionDetailFilters from './InstitutionDetailFilters.vue'
import InstitutionDetailTable from './InstitutionDetailTable.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { EventStatusEnum } from '@/consts/StatusEnums.js'
import { eventProgressLegend } from '@/consts/legends/events/eventProgressEnum.js'
import axiosIns from '@/libs/axios'
import router from '@/router'
import store from '@/store'
import PageTitle from '@/views/events/components/PageTitle.vue'
import { ref, getCurrentInstance, watch, computed } from 'vue'

const vm = getCurrentInstance().proxy
const { eventId, institutionId } = router.currentRoute.params
const { accessRole } = store.getters

const dashboard = ref({
  institutions: 0,
  classes: 0,
  classesStarted: 0,
  students: 0,
  studentsStarted: 0,
  studentsFinished: 0,
  challenges: 0,
  time: 0,
  lastUpdatedAt: '',
})
const selectedSerie = ref(null)
const isLoading = ref(false)
const keyCounter = ref(0)
const frequency = ref(null)

const isNetworkManager = ref(accessRole === 'NetworkManager')

store.dispatch('events/fetchDetails', {
  eventId,
  institutionId,
})

const eventDetails = computed(() => store.getters['events/eventDetails'])

watch(eventDetails, () => {
  const breadcrumb = ['', eventDetails.value.eventActiveName]
  if (isNetworkManager.value) {
    breadcrumb.push(eventDetails.value.institutionName)
  }
  vm.$bus.emit('setBreadcrumb', breadcrumb)
})

const fetchEvent = () => {
  isLoading.value = true

  axiosIns
    .get(`/v1/events/active/${eventId}/report/class/dashboard`, {
      params: {
        institutionId,
      },
    })
    .then(res => {
      if (res.status !== 200) return
      dashboard.value = res.data
    })
    .finally(() => {
      isLoading.value = false
      keyCounter.value += 1
    })
}

fetchEvent()

const setFilter = value => {
  selectedSerie.value = value.serieId
}

const legends = [eventProgressLegend]
</script>