<template>
  <b-card>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-skeleton type="text" class="w-100 mb-0" height="50px" />
      </template>
      <div class="d-flex flex-col flex-md-row align-items-center justify-content-between">
        <b-button variant="link" class="p-0" @click="redirectBack">
          <div class="d-flex align-items-center">
            <span class="material-icons-outlined">chevron_left</span>
            <span class="underline">Voltar</span>
          </div>
        </b-button>

        <div class="d-flex align-items-center justify-content-end gap-2 pr-2">
          <h5 class="mb-0">
            <span class="font-bold text-primary">{{ institutionName }}</span>
          </h5>
        </div>
      </div>
    </b-skeleton-wrapper>
  </b-card>
</template>

<script setup>
  import Subjects from '@/components/subjects/subjects.vue'
  import router from '@/router'
  import useFilters from '@/store/filters/useFilters'
  import { useEducationSystemClasses } from '@/views/pages/admin-context/network-manager/education-system/schools/classes/useEducationSystemClasses.js'

  const { subject, educationSystemId } = useFilters()
  const { loading, institutionName } = useEducationSystemClasses()
  const { bookId } = router.currentRoute.params

  const redirectBack = () => {
    router.push({
      name: router.currentRoute.meta.routeBack,
      params: {
        educationSystemId: educationSystemId.value,
        bookId,
      },
    })
  }
</script>
<style lang="scss" scoped>
  .point-circle {
    border-radius: 50%;
    background: #82868b;
    width: 4px;
    height: 4px;
  }
</style>