<template>
  <b-card body-class="flex flex-column">
    <div id="card-subject" class="d-flex align-items-center justify-content-center gap-2 mb-2">
      <section class="user-cell">
        <div class="image-container">
          <b-img-lazy v-bind="{ blank: true }" :src="data.imageUrl" fluid blank-color="#88f" />
        </div>
      </section>
    </div>
    <div style="flex-grow: 1">
      <h3 class="text-body text-center">
        {{ data.name }}
      </h3>
    </div>
    <div
      v-if="data.subjectId"
      id="evaluation-card-subject"
      class="d-flex align-items-center justify-content-center gap-2 mb-2"
    >
      <mission-math v-if="data.subjectId === 1" :width="36" :height="36" />
      <mission-port v-else-if="data.subjectId === 2" :width="36" :height="36" />
      <mission-liga v-else-if="data.subjectId === 3" :width="36" :height="36" />
      <mission-math-ing v-else-if="data.subjectId === 4" :width="36" :height="36" />
    </div>
    <ProgressBarHorizontal
      :value="calcPercent(data.guidesStarted, data.totalGuides)"
      label="Missões iniciadas"
      :sufix="`${formatNumber(data.guidesStarted)}/${formatNumber(data.totalGuides)} missões`"
    >
      <span
        v-b-tooltip.hover.right.html="tooltipText"
        class="material-symbols-outlined text-base head-icon-info"
      >
        info
      </span>
    </ProgressBarHorizontal>
    <ProgressBarHorizontal
      :value="calcPercent(data.activitiesStarted, data.totalActivities)"
      label="Jogos iniciados"
      :sufix="`${formatNumber(data.activitiesStarted)}/${formatNumber(data.totalActivities)} jogos`"
    >
    </ProgressBarHorizontal>
  </b-card>
</template>

<script setup>
import MissionLiga from '@/assets/icons/mission-icons/MissionLiga.vue'
import MissionMath from '@/assets/icons/mission-icons/MissionMath.vue'
import MissionMathIng from '@/assets/icons/mission-icons/MissionMathIng.vue'
import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue'
import ProgressBarHorizontal from '@/components/progessBar/ProgressBarHorizontal.vue'
import { formatNumber } from '@/filters/filters'
import { calcPercent } from '@/utils/number.js'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  tooltipText: {
    type: String,
  },
})
</script>

<style lang="scss" scoped>
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
</style>