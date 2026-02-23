<template>
  <div class="expired-mission">
    <div class="expired-mission-content">
      <div class="d-flex justify-content-center mb-1">
        <img
          src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png"
          alt="belinha"
        />
      </div>
      <h2 class="mb-1 text-center text-body">Missão expirada</h2>
      <p class="attention-expired-mission mb-1">
        Opss... o prazo de duração da missão que você deseja enviar está com o prazo de duração
        expirado, por favor, ajuste o prazo de duração da missão antes de enviá-la aos seus alunos.
      </p>
      <div class="d-flex justify-content-center gap-4">
        <b-button variant="outline-primary" type="border" @click="close"> Cancelar </b-button>
        <b-button
          variant="primary"
          type="filled"
          :disabled="loadingButton"
          @click="editExpiredMission"
        >
          Editar missão
        </b-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BButton } from 'bootstrap-vue'

// Emits
const emit = defineEmits(['close', 'edit'])

// State
const loadingButton = ref(false)

// Methods
const close = () => {
  emit('close')
}
const editExpiredMission = () => {
  emit('edit')
}
</script>