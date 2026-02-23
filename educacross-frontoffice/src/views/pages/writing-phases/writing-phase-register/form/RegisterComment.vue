<script setup>
import { useWritingPhaseRegister } from '@/views/pages/writing-phases/writing-phase-register/useWritingPhaseResgister'
import { defineComponent } from 'vue'

const { currentPhase, loading } = useWritingPhaseRegister()
</script>

<template>
  <b-card>
    <b-card-title class="text-primary">
      <span class="material-symbols-outlined align-text-bottom">add_notes</span>
      Notas gerais
    </b-card-title>

    <b-skeleton v-if="loading" height="248px" width="100%" class="mb-0" />

    <div v-else class="text-right">
      <textarea
        v-model="currentPhase.generalNotes"
        placeholder="Digite aqui anotações sobre a aplicação do teste."
        class="form-control custom-textarea"
        maxlength="600"
        style="aspect-ratio: 1; resize: none"
      />
      <span class="small">{{ currentPhase.generalNotes.length }}/600 caracteres</span>
    </div>
  </b-card>
</template>

<style scoped lang="scss">
  .custom-textarea {
    aspect-ratio: 1;
    resize: none;

    &::placeholder {
      color: #82868b;
    }
  }
</style>