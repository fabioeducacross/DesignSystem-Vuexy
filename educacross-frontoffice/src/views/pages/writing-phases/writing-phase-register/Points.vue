<script setup>
import { useWritingPhaseRegister } from '@/views/pages/writing-phases/writing-phase-register/useWritingPhaseResgister'
import { ref, watch } from 'vue'

const { qtdPhases, currentPhaseIndex, loading } = useWritingPhaseRegister()
const currentPhasePage = ref(1)

const handlerPageChange = page => {
  currentPhaseIndex.value = page - 1
}

watch(currentPhaseIndex, () => {
  currentPhasePage.value = currentPhaseIndex.value + 1
})
</script>

<template>
  <b-card>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-skeleton width="200px" class="mx-auto mb-0" />
      </template>

      <b-pagination
        v-model="currentPhasePage"
        :total-rows="qtdPhases"
        :per-page="1"
        align="center"
        first-number
        last-number
        prev-class="prev-item d-none"
        next-class="next-item d-none"
        class="mb-0"
        @change="handlerPageChange"
      >
        <template v-slot:prev-text>
          <feather-icon icon="ChevronLeftIcon" size="18" />
        </template>
        <template v-slot:next-text>
          <feather-icon icon="ChevronRightIcon" size="18" />
        </template>
      </b-pagination>
    </b-skeleton-wrapper>
  </b-card>
</template>