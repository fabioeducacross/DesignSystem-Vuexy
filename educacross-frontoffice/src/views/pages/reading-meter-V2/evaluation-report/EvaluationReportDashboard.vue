<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <b-row>
        <b-col v-for="j in 5" :key="j" cols="12" md>
          <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
        </b-col>
      </b-row>
    </template>
    <div>
      <b-row v-if="listData.length" class="match-height">
        <b-col v-for="proficiency in listData" :key="proficiency.proficiency" cols="12" md>
          <b-card
            class="position-relative"
            :class="
              proficiency.isHighest
                ? [
                    'border',
                    'border-' + proficiency.variant.variant,
                    'shadow-' + proficiency.variant.variant,
                  ]
                : []
            "
          >
            <div
              v-if="proficiency.isHighest"
              v-b-tooltip.hover.left="
                'O maior percentual de alunos se encontra nesta faixa de proficiência.'
              "
              class="highest-percentage-icon"
            >
              <span class="material-symbols-outlined" :class="proficiency.variant.textClass">
                info
              </span>
            </div>

            <div class="text-center mb-1">
              <span>
                <MediaCardIcon
                  :icon="proficiency.variant.icon"
                  :variant="proficiency.variant.variant"
              /></span>
            </div>
            <div class="font-bold text-center mb-1">
              {{ proficiency.variant.label }}
            </div>
            <ProgressBarHorizontalV2
              show-values
              height="6px"
              :value="proficiency.students"
              :max="totalStudents"
              :variant-object="proficiency.variant"
              reverse
            >
              <template v-slot="{ item }">
                <div class="d-flex justify-content-center">
                  <span :class="item.variant.textClass" class="font-bold mr-1"
                    >{{ item.percent | formatNumber }}%</span
                  >
                </div>
              </template>
            </ProgressBarHorizontalV2>
            <div class="d-flex justify-content-center mt-50">
              <span class="">
                <span class="font-bold">{{ proficiency.students | formatNumber }}</span> de
                {{ totalStudents | formatNumber }} alunos</span
              >
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col class="text-center mb-2">
          <div class="d-flex flex-column align-items-center">
            <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
            <span
              class="text-center text-primary font-bold"
              v-html="$t('noInformationFound')"
            ></span>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-skeleton-wrapper>
</template>

<script setup>
import { useEvaluationReport } from './useEvaluationReport.js'
import MediaCard from '@/components/card/MediaCard.vue'
import MediaCardIcon from '@/components/card/MediaCardIcon.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRuleV2 } from '@/consts/ReadingMeterV2ProficiencyEnum'
import { getVariantByRule } from '@/consts/legends/index.js'
import { defineComponent, computed, ref } from 'vue'

const loading = ref(false)

const { readingsTestReport } = useEvaluationReport()

const totalStudents = computed(() => readingsTestReport.value.students || 0)

const proficiencies = [0, 1, 2, 3, 4]

const listData = computed(() => {
  if (loading.value) {
    return []
  }

  const reportData = readingsTestReport.value

  const readingProficiency = proficiencies.map(profId => {
    const existingProficiency = reportData.proficiency?.find(
      item => item.proficiency === profId,
    )

    const students = existingProficiency ? existingProficiency.students : 0
    const percentage =
      existingProficiency && reportData.students > 0
        ? Math.round((existingProficiency.students / reportData.students) * 100)
        : 0

    const variant = getVariantByRuleV2(profId, 'proficiencyWithNotCompleted')

    return {
      proficiency: profId,
      students,
      percentage,
      variant: {
        ...variant,
        textClass: `text-${variant.variant}`,
      },
    }
  })

  const maxPercentage = Math.max(...readingProficiency.map(item => item.percentage))

  return readingProficiency.map(item => ({
    ...item,
    isHighest: item.percentage === maxPercentage && item.percentage > 0,
  }))
})
</script>

<style lang="scss" scoped>
  .highest-percentage-icon {
    position: absolute;
    top: 8px;
    right: 8px;

    .material-symbols-outlined {
      font-size: 20px;
      background-color: white;
      border-radius: 50%;
      padding: 2px;
    }
  }
</style>