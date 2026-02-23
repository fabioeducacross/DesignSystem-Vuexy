<template>
  <b-card body-class="d-flex justify-content-between">
    <b-link variant="primary" class="d-flex align-items-center" @click="redirectBack">
      <span class="material-symbols-outlined" style="font-size: 14px"> arrow_back_ios </span>
      <span class="underline">Voltar</span>
    </b-link>
    <div class="d-flex align-items-center justify-content-end gap-2">
      <span class="m-0 font-bold text-primary">{{ institutionName }}</span>
    </div>
  </b-card>
</template>

<script setup>
  import router from '@/router'
  import store from '@/store'
  import { computed } from 'vue'

  const redirectBack = () => {
    router.push({
      name: 'missionsPlusInstitutionsOverview',
    })
  }
  const institutionName = computed(
    () => store.getters['moduleMissionsPlusReportAdminClassesOverview/institutionName'],
  )
</script>

<style lang="scss" scoped></style>