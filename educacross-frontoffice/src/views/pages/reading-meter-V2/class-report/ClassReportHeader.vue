<template>
  <b-card>
    <div class="d-flex justify-content-between align-items-center">
      <b-link class="text-primary" :to="backRoute">
        <span class="material-symbols-outlined" style="font-size: 12px; vertical-align: middle">
          arrow_back_ios
        </span>
        <span class="underline">Voltar</span>
      </b-link>
      <div class="d-flex justify-content-center align-items-center gap-2">
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
        <span class="font-bold text-body h4 mb-0">
          {{ readingFluencyEvaluation.evaluationName || 'Carregando...' }}
        </span>
        <b-badge
          v-if="readingFluencyEvaluation.serieName"
          pill
          variant="light-primary"
          class="font-12"
        >
          {{ readingFluencyEvaluation.serieName }}
        </b-badge>
        <b-badge
          v-if="readingFluencyEvaluation.status"
          pill
          :variant="`light-${
            getVariantByRule(readingFluencyEvaluation.status, 'ReadingFluencyV2StatusEnum').variant
          }`"
        >
          {{ getVariantByRule(readingFluencyEvaluation.status, 'ReadingFluencyV2StatusEnum').text }}
        </b-badge>
      </div>
      <div>
        <span v-if="isManager" class="text-primary font-bold h4 mb-0">{{
          readingFluencyEvaluation.institutionName
        }}</span>
      </div>
    </div>
    <div
      v-if="readingFluencyEvaluation.startDate && readingFluencyEvaluation.endDate"
      class="text-center mt-1"
    >
      <small class="text-muted">
        {{ readingFluencyEvaluation.startDate | formatDate }} a
        {{ readingFluencyEvaluation.endDate | formatDate }}
      </small>
    </div>
  </b-card>
</template>

<script setup>
import { useClassReport } from './useClassReport.js'
import { getVariantByRule } from '@/consts/legends/index.js'
import router from '@/router'
import store from '@/store'
import { formatDate } from '@/utils/utils'
import { computed } from 'vue'

// Filters
function formatDateFilter(value) {
  return formatDate(value)
}

// Attach globally for template filter usage
// Vue 2.7 script setup does not support filters natively in template
// But since formatDate in template is only used for small/legacy filter: we'll create a local filter object for compatibility
const filters = { formatDate: formatDateFilter }

// Use readingFluencyEvaluation from composable
const { readingFluencyEvaluation } = useClassReport()

const isManager = computed(() => store.getters.accessUserData?.Role === 'NetworkManager')

const backRoute = computed(() => {
  const { evaluationId } = router.currentRoute.params
  const role = store.getters.accessRole

  if (role === 'NetworkManager') {
    return {
      name: 'NetworkManagerFluencyV2Institutions',
      params: { evaluationId },
    }
  }
  return {
    name: 'AdminFluencyV2Evaluations',
  }
})

// Needed to expose getVariantByRule for template
// Attached to script setup scope automatically
</script>

<script>
// For template filter usage (Vue 2.7 script setup can't define filters block, so this fallback allows use)
export default {
  name: 'ClassReportHeader',
  filters: {
    formatDate(value) {
      return formatDate(value)
    },
  },
  methods: {
    getVariantByRule,
  },
}
</script>

<style lang="scss" scoped>
  .underline {
    text-decoration: underline;
  }
</style>