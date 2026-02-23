<template>
  <b-card>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-skeleton class="w-100 mb-0" height="50px" type="text" />
      </template>
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex flex-md-row align-items-center justify-content-start gap-4">
          <div v-if="data.subjectId" class="d-flex gap-1">
            <Subjects :size="24" :subject-id="data.subjectId" />
          </div>
          <h4 class="font-bold text-body text-sm mb-0">{{ data.title }}</h4>

          <span v-if="data.startDate" class="point-circle d-none d-md-block" />

          <div v-if="data.startDate">
            <span class="text-sm">
              {{ formatDate(data.startDate) }} a {{ formatDate(data.endDate) }}</span
            >
          </div>

          <div v-if="data.status && missionStatusEnum[data.status]">
            <b-badge :variant="`${missionStatusEnum[data.status].variant}`" pill>
              {{ missionStatusEnum[data.status].label }}
            </b-badge>
          </div>
        </div>

        <div class="d-flex align-items-center justify-content-end gap-2 pr-2">
          <span class="m-0 font-bold text-primary">{{ data.className }}</span>
          <b-badge pill variant="light-primary">{{ data.serieName }}</b-badge>
        </div>
      </div>
    </b-skeleton-wrapper>
  </b-card>
</template>

<script setup>
  import Subjects from '@/components/subjects/subjects.vue'
  import { missionStatusEnum } from '@/consts/missionsEnum.js'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import router from '@/router'
  import store from '@/store'
  import formatDate from '@/utils/date.js'
  import { formatTime } from '@/utils/time.js'
  import { computed } from 'vue'

  const loading = computed(() => store.getters['ReportMissionPlusStudents/loading'])
  const data = computed(() => store.getters['ReportMissionPlusStudents/title'])

  const redirectBack = () => {
    router.go(-1)
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