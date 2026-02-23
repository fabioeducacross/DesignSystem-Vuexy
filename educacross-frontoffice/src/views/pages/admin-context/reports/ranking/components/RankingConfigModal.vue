<template>
  <b-modal id="modal-config" content-class="shadow" centered hide-header hide-footer size="lg">
    <button type="button" aria-label="Close" class="close" @click="$bvModal.hide('modal-config')">
      <feather-icon size="28" icon="XIcon" />
    </button>
    <div class="ranking-modal">
      <h1 class="ranking-modal-title">Configurar ranking - {{ modalTitle }}</h1>
      <div class="ranking-modal-buttons">
        <b-button variant="primary" class="ranking-modal-button" @click="toSchoolConfig">
          Configurar ranking da Escola toda
        </b-button>
        <b-button variant="primary" class="ranking-modal-button" @click="toClassConfig">
          Configurar ranking por turma
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script setup>
import { useRouter } from 'vue-router/composables'

const props = defineProps({
  modalTitle: {
    type: String,
    required: false,
    default: '',
  },
  schoolConfig: {
    type: String,
    required: false,
    default: 'configSchoolRanking',
  },
  classConfig: {
    type: String,
    required: false,
    default: 'configClassRanking',
  },
  educationSystemId: {
    type: [Number, String],
    required: false,
    default: 0,
  },
})

const router = useRouter()

const toSchoolConfig = () => {
  router.push({
    name: props.schoolConfig,
    params: {
      educationSystemId: props.educationSystemId || null,
    },
  })
}

const toClassConfig = () => {
  router.push({
    name: props.classConfig,
    params: {
      educationSystemId: props.educationSystemId || null,
    },
  })
}
</script>

<style scoped>
  .ranking-modal-title {
    margin: 2rem;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    color: #2c2c2c;

    text-align: center;
  }

  .ranking-modal-buttons {
    display: flex;
    justify-content: center;
  }

  .ranking-modal-button {
    margin: 8px;
  }
</style>