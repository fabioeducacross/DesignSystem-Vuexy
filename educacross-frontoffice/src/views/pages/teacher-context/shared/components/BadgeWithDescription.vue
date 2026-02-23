<template>
  <div>
    <small>{{ axisName }}</small>
    <div class="d-flex flex-row flex-wrap gap-1">
      <div v-for="(chip, indexChip) in data" :key="indexChip">
        <b-badge
          :id="`bncc-${chip.name}-${indexChip}`"
          v-b-tooltip.hover="chip.description"
          pill
          :variant="getSubjectVariant(subjectId)"
          class="cursor-default"
        >
          {{ chip.name }}
        </b-badge>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getSubjectVariant } from '@/utils/utils'

const props = defineProps({
  data: { type: Array, required: true },
  axisName: { type: String, required: true },
  subjectId: { type: Number, required: true },
})
</script>

<style lang="scss" scoped>
.chipName {
  font-weight: 600;
}

.text-chip {
  font-size: 16px;
  line-height: 19px;
}
</style>