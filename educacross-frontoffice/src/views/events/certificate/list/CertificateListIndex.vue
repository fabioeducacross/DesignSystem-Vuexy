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
      :last-update="eventDetails.lastUpdatedAt"
    />
    <CertificateListFilter />
    <CertificateListTable />
  </section>
</template>

<script setup>
  import { EventStatusEnum } from '@/consts/StatusEnums.js'
  import router from '@/router'
  import store from '@/store'
  import eventsCertificateModule from '@/store/pageModules/events/module-events-certificate.js'
  import CertificateListFilter from '@/views/events/certificate/list/CertificateListFilter.vue'
  import CertificateListTable from '@/views/events/certificate/list/CertificateListTable.vue'
  import PageTitle from '@/views/events/components/PageTitle.vue'
  import { ref, computed, getCurrentInstance, watch, onUnmounted } from 'vue'

  store.registerModule('eventsCertificate', eventsCertificateModule)

  onUnmounted(() => {
    store.commit('eventsCertificate/reset')
    store.unregisterModule('eventsCertificate')
  })

  const loading = ref(true)
  const { eventId } = router.currentRoute.params
  const vm = getCurrentInstance().proxy

  store
    .dispatch('events/fetchDetails', {
      eventId,
    })
    .then(() => (loading.value = false))

  const eventDetails = computed(() => store.getters['events/eventDetails'])

  watch(eventDetails, () => {
    vm.$bus.emit('setBreadcrumb', ['', eventDetails.value.eventActiveName, ''])
  })
</script>

<style lang="scss" scoped></style>