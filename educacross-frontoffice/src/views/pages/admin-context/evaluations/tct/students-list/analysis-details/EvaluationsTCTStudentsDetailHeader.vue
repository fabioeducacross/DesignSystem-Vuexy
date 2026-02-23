<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <b-card body-class="d-flex justify-content-between">
        <b-skeleton width="100px" class="mb-0" />
        <b-skeleton width="100px" class="mb-0" />
      </b-card>
    </template>
    <b-card body-class="d-flex justify-content-between ">
      <div
        class="text-primary cursor-pointer d-flex align-items-center mr-1"
        style="width: fit-content"
        @click="back"
      >
        <span class="material-symbols-outlined" style="font-size: 14px"> arrow_back_ios </span>
        <span class="underline">Voltar</span>
      </div>
      <span v-if="headerData && headerData.updatedAt"
        >Atualizado em: {{ formatDateAndTime(headerData.updatedAt) }}</span
      >
    </b-card>
  </b-skeleton-wrapper>
</template>

<script setup>
import router from '@/router'
import store from '@/store'
import { formatDateAndTime } from '@/utils/utils'
import { computed } from 'vue'

const headerData = computed(() => store.getters['EvaluationTCTStudentsDetail/header'])
const loading = computed(() => store.getters['EvaluationTCTStudentsDetail/loading'])

const returnTo = router.currentRoute.meta && router.currentRoute.meta.returnTo

const back = () => {
  router.push({
    name: returnTo,
  })
}
</script>