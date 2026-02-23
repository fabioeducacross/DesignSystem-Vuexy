<template>
  <section>
    <PageTitle
      :is-loading="!eventDetails"
      :title="eventDetails.eventActiveName"
      :start-date="eventDetails.startDate"
      :end-date="eventDetails.endDate"
      :status="eventDetails.status"
      :last-update="eventDetails.lastUpdatedAt"
      :status-enum="EventStatusEnum"
      :subject-id="eventDetails.subjectId"
      hide-last-update
    />
    <EventsRankingStudentFilter />
    <EventsRankingStudentList />
  </section>
</template>

<script setup>
  import { EventStatusEnum } from '@/consts/StatusEnums.js'
  import router from '@/router'
  import store from '@/store'
  import eventsRankingStudentsModule from '@/store/pageModules/events/module-events-ranking-students.js'
  import PageTitle from '@/views/events/components/PageTitle.vue'
  import EventsRankingStudentFilter from '@/views/events/ranking/students/EventsRankingStudentFilter.vue'
  import EventsRankingStudentList from '@/views/events/ranking/students/EventsRankingStudentList.vue'
  import { ref, computed, watch, getCurrentInstance, onUnmounted } from 'vue'

  store.registerModule('eventsRankingStudents', eventsRankingStudentsModule)

  onUnmounted(() => {
    store.commit('eventsRankingStudents/reset')
    store.unregisterModule('eventsRankingStudents')
  })

  const loading = ref(true)
  const { eventId, institutionId } = router.currentRoute.params
  const vm = getCurrentInstance().proxy

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

  const eventDetails = computed(() => store.getters['events/eventDetails'])

  watch([eventDetails], () => {
    vm.$bus.emit('setBreadcrumb', ['', eventDetails.value.eventActiveName, ''])
  })
</script>

<style lang="scss" scoped></style>