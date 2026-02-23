<template>
  <b-card>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-skeleton type="text" class="w-100 mb-0" height="50px" />
      </template>
      <div class="d-flex flex-col flex-md-row align-items-center justify-content-between">
        <b-button
          v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
          variant="link"
          class="p-0"
          @click="redirectBack"
        >
          <div class="d-flex align-items-center">
            <span class="material-icons-outlined">chevron_left</span>
            <span class="underline">Voltar</span>
          </div>
        </b-button>

        <div class="d-flex flex-col flex-md-row align-items-center justify-content-start gap-4">
          <div class="d-flex flex-row align-items-center gap-2">
            <div v-if="data.subjectId" class="d-flex gap-1">
              <Subjects :subject-id="data.subjectId" :size="24" />
            </div>
            <h4 class="font-bold text-body text-sm mb-0">{{ data.title }}</h4>
          </div>

          <span v-if="data.startDate" class="point-circle d-none d-md-block" />
          <div v-if="data.startDate">
            <span class="text-sm">
              {{ formatDate(data.startDate) }} a {{ formatDate(data.endDate) }}</span
            >
          </div>

          <div v-if="data.status && missionStatusEnum[data.status]">
            <b-badge pill :variant="`${missionStatusEnum[data.status].variant}`">
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
import useFilters from '@/store/filters/useFilters'
import formatDate from '@/utils/date.js'
import { formatTime } from '@/utils/time.js'
import { computed } from 'vue'

const { classe } = useFilters()
const loading = computed(() => store.getters['rankingMissionsModule/loading'])
const data = computed(() => store.getters['rankingMissionsModule/title'])

const redirectBack = () => {
  router.push({
    name: 'missionsPlusClassesMissionsOverview',
    params: { classId: classe.value.ClassId },
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