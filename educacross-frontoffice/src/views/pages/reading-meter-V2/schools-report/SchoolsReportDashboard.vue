<template>
  <b-skeleton-wrapper :loading="isLoading">
    <template v-slot:loading>
      <b-row>
        <b-col v-for="j in 5" :key="j" cols="12" md>
          <b-skeleton type="card" height="100px" class="w-100 rounded mb-1"></b-skeleton>
        </b-col>
      </b-row>
    </template>
    <div>
      <b-row v-if="listData.length" class="match-height">
        <b-col v-for="proficiencyData in listData" :key="proficiencyData.proficiency" cols="12" md>
          <b-card
            class="position-relative"
            :class="
              proficiencyData.isHighest
                ? [
                    'border',
                    'border-' + proficiencyData.variant.variant,
                    'shadow-' + proficiencyData.variant.variant,
                  ]
                : []
            "
          >
            <div
              v-if="proficiencyData.isHighest"
              v-b-tooltip.hover.left="
                'O maior percentual de alunos se encontra nesta faixa de proficiência.'
              "
              class="highest-percentage-icon"
            >
              <span class="material-symbols-outlined" :class="proficiencyData.variant.textClass">
                info
              </span>
            </div>

            <div class="text-center mb-1">
              <span>
                <MediaCardIcon
                  :icon="proficiencyData.variant.icon"
                  :variant="proficiencyData.variant.variant"
                />
              </span>
            </div>
            <div class="font-bold text-center mb-1">
              {{ proficiencyData.variant.label }}
            </div>
            <ProgressBarHorizontalV2
              show-values
              height="6px"
              :value="proficiencyData.students"
              :max="totalStudents"
              :variant-object="proficiencyData.variant"
              reverse
            >
              <template v-slot="{ item }">
                <div class="d-flex justify-content-center">
                  <span :class="item.variant.textClass" class="font-bold mr-1">
                    {{ item.percent | formatNumber }}%
                  </span>
                </div>
              </template>
            </ProgressBarHorizontalV2>
            <div class="d-flex justify-content-center mt-50">
              <span>
                <span class="font-bold">{{ proficiencyData.students | formatNumber }}</span> de
                {{ totalStudents | formatNumber }} alunos
              </span>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col class="text-center mb-2">
          <div class="d-flex flex-column align-items-center">
            <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
            <span class="text-center text-primary font-bold">Nenhuma informação encontrada</span>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-skeleton-wrapper>
</template>

<script setup>
import { useSchoolsReport } from './useSchoolsReport.js'
import MediaCardIcon from '@/components/card/MediaCardIcon.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import { getVariantByRuleV2 } from '@/consts/ReadingMeterV2ProficiencyEnum'
import { getVariantByRule } from '@/consts/legends/index.js'
import { computed } from 'vue'

const { proficiencies, totalStudents, isLoading } = useSchoolsReport()

const proficiencyOrder = [0, 1, 2, 3, 4]

const listData = computed(() => {
  if (!proficiencies.value || !proficiencies.value.length) {
    return []
  }

  const data = proficiencyOrder.map(profId => {
    const profData = proficiencies.value.find(p => p.proficiency === profId) || {
      proficiency: profId,
      students: 0,
    }

    const variant = getVariantByRuleV2(profId, 'proficiencyWithNotCompleted')

    return {
      proficiency: profId,
      students: profData.students || 0,
      variant: {
        ...variant,
        textClass: `text-${variant.variant}`,
      },
    }
  })

  const maxStudents = Math.max(...data.map(d => d.students))
  return data.map(item => ({
    ...item,
    isHighest: item.students > 0 && item.students === maxStudents,
  }))
})
</script>

<style lang="scss" scoped>
  .highest-percentage-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
  }
</style>