<template>
  <b-card class="schools-report-header">
    <div class="d-flex justify-content-between align-items-center">
      <b-link class="text-primary d-flex align-items-center" :to="{ name: backRouteName }">
        <span class="material-symbols-outlined" style="font-size: 14px; margin-right: 4px">
          arrow_back_ios
        </span>
        <span class="underline">Voltar</span>
      </b-link>

      <div class="d-flex align-items-center gap-2">
        <div class="d-flex align-items-center gap-1">
          <div
            v-if="readingFluencyEvaluation.types && readingFluencyEvaluation.types.includes(1)"
            class="icon-badge d-flex align-items-center justify-content-center"
            style="background: #ffb443; width: 32px; height: 32px; border-radius: 4px"
          >
            <span class="material-symbols-outlined" style="font-size: 24px">
              format_list_numbered
            </span>
          </div>
          <div
            v-if="readingFluencyEvaluation.types && readingFluencyEvaluation.types.includes(2)"
            class="icon-badge d-flex align-items-center justify-content-center"
            style="background: #8bc728; width: 32px; height: 32px; border-radius: 4px"
          >
            <span class="material-symbols-outlined" style="font-size: 24px"> book_6 </span>
          </div>
        </div>

        <span class="h5 mb-0 font-weight-bold text-body">
          {{ readingFluencyEvaluation.evaluationName }}
        </span>

        <b-badge v-if="readingFluencyEvaluation.serieName" variant="light-primary" pill>
          {{ readingFluencyEvaluation.serieName }}
        </b-badge>

        <b-badge
          v-if="readingFluencyEvaluation.status !== undefined"
          :variant="`light-${
            getVariantByRule(readingFluencyEvaluation.status, 'ReadingFluencyV2StatusEnum').variant
          }`"
          pill
        >
          {{ getVariantByRule(readingFluencyEvaluation.status, 'ReadingFluencyV2StatusEnum').text }}
        </b-badge>
      </div>

      <div class="text-right"></div>
    </div>
  </b-card>
</template>

<script setup>
import { getVariantByRule } from '@/consts/legends/index.js'
import store from '@/store'
import { computed } from 'vue'

const moduleName = 'ReadingMeterV2Module'

const readingFluencyEvaluation = computed(() => {
  return store.getters[`${moduleName}/readingFluencyEvaluation`] || {}
})

const backRouteName = computed(() => {
  const role = store.getters.accessRole
  if (role === 'NetworkManager') {
    return 'NetworkManagerFluencyV2Evaluations'
  }
  if (role === 'Teacher') {
    return 'TeacherFluencyV2Evaluations'
  }
  return 'AdminFluencyV2Evaluations'
})
</script>

<style lang="scss" scoped>
  .underline {
    text-decoration: underline;
  }

  ::v-deep .card {
    border-radius: 8px;
    border: 1px solid #e9ecef;
    margin-bottom: 1.5rem;
  }

  ::v-deep .card-body {
    padding: 16px 24px;
  }

  .icon-badge {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .d-flex.justify-content-between {
      flex-direction: column;
      gap: 12px;

      .text-right {
        text-align: center !important;
      }
    }

    ::v-deep .card-body {
      padding: 12px 16px;
    }
  }
</style>