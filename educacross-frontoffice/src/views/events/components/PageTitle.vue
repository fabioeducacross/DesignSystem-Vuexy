<template>
  <section>
    <b-card>
      <b-row>
        <b-col>
          <b-skeleton-wrapper :loading="isLoading">
            <template v-slot:loading>
              <b-skeleton type="text" class="w-100 mb-0" height="50px" />
            </template>
            <b-row>
              <b-col cols="12" lg="9" md="9" sm="12" class="mb-1 mb-md-0">
                <div
                  class="d-flex flex-col flex-md-row align-items-center justify-content-start gap-4"
                >
                  <div>
                    <mission-math v-if="subjectId === 1" :width="width" :height="height" />
                    <mission-port v-else-if="subjectId === 2" :width="width" :height="height" />
                    <mission-liga v-else-if="subjectId === 3" :width="width" :height="height" />
                    <mission-math-ing v-else-if="subjectId === 4" :width="width" :height="height" />
                  </div>

                  <h4 class="font-bold text-body text-sm mb-0">
                    {{ title }}
                  </h4>

                  <span v-if="startDate" class="point-circle d-none d-md-block" />
                  <div v-if="startDate">
                    <span class="text-sm"
                      >{{ startDatePrepend }}{{ formatDate(startDate) }} a
                      {{ formatDate(endDate) }}</span
                    >
                  </div>

                  <b-badge v-if="status" pill :variant="statusEnum[status].variant">
                    {{ statusEnum[status].label }}
                  </b-badge>
                </div>
              </b-col>
              <b-col
                v-if="lastUpdate"
                cols="12"
                lg="3"
                md="3"
                sm="12"
                class="text-center text-md-right"
              >
                <b-badge
                  v-if="frequency && showFrequency(status)"
                  v-b-tooltip.hover="`Atualizado a cada ${frequencyTooltip}`"
                  variant="light-info"
                  class="cursor-pointer"
                >
                  {{ frequencyAbbr }}
                </b-badge>
                <span v-if="lastUpdate">
                  Atualizado em: {{ formatDate(lastUpdate) }} às
                  {{ formatTime(lastUpdate) }}
                </span>
              </b-col>
            </b-row>
          </b-skeleton-wrapper>
        </b-col>
      </b-row>
    </b-card>
  </section>
</template>

<script setup>
import MissionLiga from '@/assets/icons/mission-icons/MissionLiga.vue'
import MissionMath from '@/assets/icons/mission-icons/MissionMath.vue'
import MissionMathIng from '@/assets/icons/mission-icons/MissionMathIng.vue'
import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue'
import { EventStatusEnum } from '@/consts/StatusEnums'
import formatDate from '@/utils/date.js'
import { formatTime } from '@/utils/time.js'
import { computed } from 'vue'

// Props
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: false,
  },
  title: {
    type: [String, undefined, null],
    required: false,
    default: '',
  },
  startDatePrepend: {
    type: [String, undefined, null],
    required: false,
    default: 'Realização de ',
  },
  startDate: {
    type: [String, undefined, null],
    required: false,
  },
  endDate: {
    type: [String, undefined, null],
    required: false,
  },
  status: {
    type: [Number, undefined, null],
    required: false,
  },
  statusEnum: {
    type: [Object, undefined, null],
    required: false,
  },
  lastUpdate: {
    type: [String, undefined, null],
    required: false,
  },
  hideLastUpdate: {
    type: Boolean,
    required: false,
    default: false,
  },
  frequency: {
    type: [String, undefined, null],
    default: null,
  },
  showFrequency: {
    type: Function,
    default: status => status === EventStatusEnum[3].value,
  },
  subjectId: {
    type: [Number, undefined, null],
    default: null,
  },
})

const width = 24
const height = 24

const frequencyAbbr = computed(() => {
  if (!props.frequency) return null
  return props.frequency.split('&')[0]
})

const frequencyTooltip = computed(() => {
  if (!props.frequency) return null
  return props.frequency.split('&')[1]
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