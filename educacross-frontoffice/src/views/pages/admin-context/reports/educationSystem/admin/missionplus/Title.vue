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
          <div v-if="subject.id" class="d-flex gap-1">
            <Subjects :subject-id="subject.id" :size="24" />
          </div>
          <h5 class="font-bold text-primary mb-0">{{ name }}</h5>
          <b-badge
            v-if="classe.id"
            pill
            :variant="`${getVariantByRule(status, 'guideStatus').variant}`"
          >
            {{ getVariantByRule(status, 'guideStatus').label }}
          </b-badge>
          <b-badge pill variant="light-primary">{{ serieName }}</b-badge>
        </div>
      </div>
    </b-skeleton-wrapper>
  </b-card>
</template>

<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import { getVariantByRule } from '@/consts/legends'
import router from '@/router'
import useFilters from '@/store/filters/useFilters'
import { useEducationSystemMissionPlus } from '@/views/pages/admin-context/reports/educationSystem/admin/missionplus/useEducationSystemMissionPlus.js'

const { subject, educationSystemId, classe } = useFilters()
const { loading, name, className, serieName, status } = useEducationSystemMissionPlus()
const { bookId } = router.currentRoute.params

const redirectBack = () => {
  router.push({
    name: `educationSystemReportMissionsBooks`,
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