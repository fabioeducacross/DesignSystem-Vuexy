<template>
  <div>
    <b-card>
      <b-skeleton-wrapper :loading="loading">
        <template v-slot:loading>
          <b-skeleton type="text" class="w-100 mb-0" height="50px" />
        </template>
        <div class="d-flex flex-col flex-md-row align-items-center justify-content-between">
          <div class="d-flex flex-col flex-md-row align-items-center justify-content-start gap-4">
            <div class="d-flex flex-row align-items-center gap-2">
              <div class="d-flex gap-1">
                <Subjects :subject-id="data.type" :size="24" />
              </div>
              <h4 class="font-bold text-body text-sm mb-0">{{ data.name }}</h4>
            </div>

            <span v-if="data.date" class="point-circle d-none d-md-block" />
            <div v-if="data.date">
              <span class="text-sm"> {{ data.date }}</span>
            </div>

            <div>
              <b-badge v-if="currentMissionType" pill :variant="currentMissionType.variant">
                <b-icon :icon="currentMissionType.icon"></b-icon>
                {{ currentMissionType.label }}
              </b-badge>

              <b-badge
                v-if="data.application && applicationTypeEnum[data.application]"
                pill
                :variant="applicationTypeEnum[data.application].variant"
              >
                <span class="material-symbols-outlined" style="font-size: 12px">
                  {{ applicationTypeEnum[data.application].icon }}
                </span>
                {{ applicationTypeEnum[data.application].label }}
              </b-badge>
            </div>
          </div>

          <div class="d-flex align-items-center justify-content-end gap-2 pr-2">
            <span class="m-0 font-bold text-primary">{{ classeData.Name }}</span>
            <b-badge pill variant="light-primary">{{ classeData.SerieName }}</b-badge>
          </div>
        </div>
      </b-skeleton-wrapper>
    </b-card>
  </div>
</template>

<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import MissionTypeDicionaryEnum from '@/consts/admin-context/enums/mission.js'
import { missionTypeEnum, applicationTypeEnum } from '@/consts/missionsEnum.js'
import useFilters from '@/store/filters/useFilters'
import formatDate from '@/utils/date.js'
import { formatTime } from '@/utils/time.js'
import { computed } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    required: false,
  },
  data: {
    type: Object,
    required: false,
  },
})

const currentMissionType = computed(() => {
  return missionTypeEnum[props.data?.type] || false
})

const { classe } = useFilters()

const classeData = computed(() => {
  return classe.value
})
</script>

<style lang="scss" scoped>
  .point-circle {
    border-radius: 50%;
    background: #82868b;
    width: 4px;
    height: 4px;
  }
</style>