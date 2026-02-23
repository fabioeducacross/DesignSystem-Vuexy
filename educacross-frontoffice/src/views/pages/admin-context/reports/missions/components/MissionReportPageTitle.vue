<template>
  <section>
    <b-card>
      <b-row>
        <b-col>
          <b-skeleton-wrapper :loading="loading">
            <template v-slot:loading>
              <b-skeleton type="text" class="w-100 mb-0" />
            </template>
            <b-row>
              <b-col cols="12" lg="9" md="9" sm="12" class="mb-1 mb-md-0">
                <div
                  class="d-flex flex-col flex-md-row align-items-center justify-content-start gap-4"
                >
                  <span class="font-bold text-body mb-0">{{
                    $filters.truncate(data.name, 30)
                  }}</span>

                  <span class="point-circle d-none d-md-block" />
                  <div v-if="data.date">
                    <span>Período de {{ data.date }}</span>
                  </div>

                  <b-badge v-if="data.type" pill :variant="missionTypeEnum[data.type].variant">
                    <b-icon :icon="missionTypeEnum[data.type].icon"></b-icon>
                    {{ missionTypeEnum[data.type].label }}
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
              </b-col>
            </b-row>
          </b-skeleton-wrapper>
        </b-col>
      </b-row>
    </b-card>
  </section>
</template>

<script setup>
import { applicationTypeEnum } from '@/consts/missionsEnum.js'
import formatDate from '@/utils/date.js'
import { formatTime } from '@/utils/time.js'

// Props
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

// Enum for mission types
const missionTypeEnum = {
  Individual: { label: 'Individual', variant: 'warning', icon: 'person-fill' },
  Collective: { label: 'Coletiva', variant: 'primary', icon: 'people-fill' },
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