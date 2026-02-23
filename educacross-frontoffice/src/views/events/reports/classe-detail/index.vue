<template>
  <section>
    <PageTitle
      :is-loading="loading"
      :title="eventDetails.eventActiveName"
      :start-date="eventDetails.startDate"
      :end-date="eventDetails.endDate"
      :subject-id="eventDetails.subjectId"
      :status="eventDetails.status"
      :status-enum="EventStatusEnum"
      :last-update="lastUpdatedAt"
      :frequency="eventDetails.frequency"
    />
    <ClasseDetailCards :classe-details="eventDetails" @lastUpdatedEvent="lastUpdatedEvent" />
    <ClasseDetailTable />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import ClasseDetailCards from './ClasseDetailCards.vue'
import ClasseDetailFilter from './ClasseDetailFilter.vue'
import ClasseDetailTable from './ClasseDetailTable.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { EventStatusEnum } from '@/consts/StatusEnums.js'
import { eventProgressLegend } from '@/consts/legends/events/eventProgressEnum.js'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import PageTitle from '@/views/events/components/PageTitle.vue'
import { ref, getCurrentInstance, computed, watch } from 'vue'

const { eventId, institutionId, classId } = router.currentRoute.params
const { classe } = useFilters()

if (classId) {
  classe.value = { ClassId: classId }
}

const vm = getCurrentInstance().proxy

const lastUpdatedAt = ref('')

const lastUpdatedEvent = value => {
  lastUpdatedAt.value = value
}

const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const loading = ref(false)

store
  .dispatch('events/fetchDetails', {
    eventId,
    institutionId,
    classId: classe.value.ClassId,
  })
  .then(() => (loading.value = false))

const eventDetails = computed(() => store.getters['events/eventDetails'])

watch(eventDetails, () => {
  const breadcrumb = ['', eventDetails.value.eventActiveName, eventDetails.value.className]
  if (isNetworkManager) {
    breadcrumb.splice(2, 0, eventDetails.value.institutionName)
  }
  vm.$bus.emit('setBreadcrumb', breadcrumb)
})

const legends = [eventProgressLegend]
</script>