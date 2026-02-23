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
      :last-update="eventDetails.lastUpdatedAt"
      hide-last-update
    />
    <EventsRankingSchoolsFilter />
    <EventsRankingSchoolsList />
  </section>
</template>

<script setup>
  import { EventStatusEnum } from '@/consts/StatusEnums.js'
  import router from '@/router'
  import store from '@/store'
  import eventsRankingSchoolsModule from '@/store/pageModules/events/module-events-ranking-schools.js'
  import PageTitle from '@/views/events/components/PageTitle.vue'
  import EventsRankingSchoolsFilter from '@/views/events/ranking/schools/EventsRankingSchoolsFilter.vue'
  import EventsRankingSchoolsList from '@/views/events/ranking/schools/EventsRankingSchoolsList.vue'
  import { ref, computed, getCurrentInstance, watch, onUnmounted } from 'vue'

  store.registerModule('eventsRankingSchools', eventsRankingSchoolsModule)

  const loading = ref(true)
  const { eventId, institutionId } = router.currentRoute.params
  const vm = getCurrentInstance().proxy

  const eventDetails = computed(() => store.getters['events/eventDetails'])

  store
    .dispatch('events/fetchDetails', {
      eventId,
      institutionId,
    })
    .then(() => {
      loading.value = false
      if (eventDetails.value.eventActiveName) {
        vm.$bus.emit('setBreadcrumb', ['', eventDetails.value.eventActiveName, ''])
      }
    })

  watch([eventDetails], () => {
    vm.$bus.emit('setBreadcrumb', ['', eventDetails.value.eventActiveName, ''])
  })

  onUnmounted(() => {
    store.commit('eventsRankingSchools/reset')
    store.unregisterModule('eventsRankingSchools')
  })
</script>

<style lang="scss" scoped></style>