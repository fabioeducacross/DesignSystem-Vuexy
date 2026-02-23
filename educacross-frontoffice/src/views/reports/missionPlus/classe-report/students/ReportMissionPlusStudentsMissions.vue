<template>
  <b-card>
    <div
      class="d-flex align-items-start justify-content-between gap-4 px-50"
      style="overflow: auto"
    >
      <div v-for="(item, index) in computedRounds" :key="`round-${index}`">
        <div v-if="item" class="text-center">
          <div class="d-flex flex-column align-items-center">
            <b-card
              :key="`${item.guideRoundId}-${selectedRoundFilter.guideRoundId}`"
              :class="{
                'selected-item': isSelectedRound(item),
                'unselected-item': selectedRoundFilter.guideRoundId && !isSelectedRound(item),
              }"
              bg-variant="transparent"
              body-class="p-75"
              class="default-item cursor-pointer"
              @click="selectRound(item)"
            >
              <div class="h-50">
                <b-img-lazy
                  :alt="item.thematicName"
                  :src="item.imageUrl ? item.imageUrl : SubjectEnum[subject.id].image"
                  class="mb-75 mx-auto"
                  height="60"
                  width="60"
                />

                <b-card-text class="text-center font-bold text-thematicName">
                  {{ item.thematicName }}
                </b-card-text>
              </div>
              <div class="h-50">
                <b-card-text class="text-center font-semibold mb-0"> Rendimento</b-card-text>
                <ProgressBarVertical
                  :value="item.performance"
                  class="mb-1"
                  enum="accuracyPerformance"
                  height="12"
                />

                <b-card-text class="text-center font-semibold mb-0"> Tempo</b-card-text>
                <b-card-text class="text-center font-bold text-primary">
                  {{ item.time | formattedTime }}
                </b-card-text>
              </div>
            </b-card>
          </div>

          <span v-b-tooltip="'Filtrar turno'" class="material-symbols-outlined text-primary">{{
            isSelectedRound(item) ? 'filter_alt_off' : 'filter_alt'
          }}</span>
        </div>
        <div v-else class="default-item empty"></div>
      </div>
    </div>
  </b-card>
</template>

<script setup>
import ProgressBarVertical from '@/components/progessBar/ProgressBarVertical.vue'
import { getVariantByRule } from '@/consts/legends'
import { useMissionPlusReportStudents } from '@/views/reports/missionPlus/classe-report/students/useMissionPlusReportStudents'
import { computed, ref } from 'vue'

// Props if any (none declared in original, so omitted)

// useMissionPlusReportStudents composition
const loading = ref(false)
const { rounds, selectedRoundFilter, selectRound, isSelectedRound } =
  useMissionPlusReportStudents()

const computedRounds = computed(() => {
  const diff = 8 - rounds.value.length

  if (diff > 0) {
    return [...rounds.value, ...Array(diff).fill(null)]
  }

  return rounds.value
})

const getPerformanceVariant = value => {
  return getVariantByRule(value, 'accuracyPerformance')
}
</script>

<style lang="scss" scoped>
  .selected-item {
    border: 2px solid var(--primary) !important;
    box-shadow: 0 0 10px 0 var(--primary) !important;
  }

  .text-thematicName {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
      text-overflow: unset;
      white-space: normal;
      overflow: visible;
      background-color: #ffffff;
      position: relative;
      z-index: 9999;
    }
  }

  .unselected-item {
    filter: opacity(0.5);

    & .h-50:last-of-type {
      filter: grayscale(100%) !important;
    }
  }

  .default-item {
    width: 150px;
    height: 224px;

    border: 1px solid #b9b9c3;
    border-radius: 6px;

    margin-top: 0.5rem;

    &.empty {
      border: 1px dashed #b9b9c3;
    }
  }
</style>