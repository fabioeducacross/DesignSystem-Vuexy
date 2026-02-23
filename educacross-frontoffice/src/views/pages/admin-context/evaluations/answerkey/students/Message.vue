<template>
  <div>
    <b-alert
      variant="primary"
      :show="evaluationDetails.status === EEvaluationActiveStatus.Finished"
      class="text-center p-1"
    >
      <div class="d-flex align-items-center justify-content-center gap-1">
        <span class="material-symbols-outlined"> report</span>
        <span class="font-bold">
          Atenção: a inclusão de gabaritos está bloqueada, pois a Avaliação foi finalizada.
        </span>
      </div>
      <span class="font-normal">
        Os gabaritos dos alunos que fizeram estão disponíveis somente para consulta.
      </span>
    </b-alert>
    <b-alert
      variant="danger"
      :show="evaluationDetails.status === EEvaluationActiveStatus.Canceled"
      class="text-center p-1"
    >
      <div class="d-flex align-items-center justify-content-center gap-1">
        <span class="material-symbols-outlined"> report</span>
        <span class="font-bold">
          Atenção: a inclusão de gabaritos está bloqueada, pois a Avaliação foi cancelada.
        </span>
      </div>
      <span class="font-normal">
        Os gabaritos dos alunos que fizeram estão disponíveis somente para consulta.
      </span>
    </b-alert>
  </div>
</template>

<script setup>
  import { EEvaluationActiveStatus } from '@/consts/evaluationsEnum.js'
  import store from '@/store'
  import { computed } from 'vue'

  const evaluationDetails = computed(() => store.getters['evaluations/evaluationDetails'])
</script>

<style lang="scss" scoped></style>