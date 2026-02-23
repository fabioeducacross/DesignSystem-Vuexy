<script setup>
import { useWritingPhaseRegister } from '@/views/pages/writing-phases/writing-phase-register/useWritingPhaseResgister'

const { loading, writingPhasesWritten, goBack } = useWritingPhaseRegister()
</script>

<template>
  <b-card no-body>
    <b-card-body class="d-flex justify-content-between">
      <b-link @click="goBack">
        <span class="material-symbols-outlined align-middle text-primary font-14">
          chevron_left
        </span>
        <span class="align-middle underline">Voltar</span>
      </b-link>
      <h4 v-if="!loading" class="mb-0 text-body font-bold">{{ writingPhasesWritten.name }}</h4>
      <b-skeleton v-else width="100px" class="mb-0" />
    </b-card-body>
  </b-card>
</template>

<style scoped lang="scss"></style>