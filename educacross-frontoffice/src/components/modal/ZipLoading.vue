<template>
  <div>
    <div v-if="!pdfDone" class="working">
      <img src="@/assets/images/pdf-progress/working.png" alt="" />
      <div v-if="props.isReport">
        <p class="title">Os boletins estão sendo preparados.</p>
        <p class="subtitle">
          Assim que o processamento acabar, os boletins serão baixados automaticamente.
        </p>
      </div>
      <div v-else>
        <p class="title">Estamos preparando {{ props.name }}</p>
        <p class="subtitle">
          Assim que o processamento acabar, o download será iniciado automaticamente
        </p>
      </div>
      <div class="progress-container">
        <span class="title">{{ pdfLoadPercent }}% dos arquivos prontos...</span>
        <b-progress :value="pdfLoadPercent" :max="100" variant="success" height="12px" />
        <b-spinner small />
      </div>
    </div>
    <div v-if="pdfDone" class="working">
      <img src="@/assets/images/pdf-progress/done.png" alt="" />
      <p v-if="props.isReport" class="title">Os boletins estão prontos!</p>
      <p v-else class="title">
        {{ props.name }} estão {{ props.masculine ? 'prontos' : 'prontas' }}!
      </p>
      <p class="subtitle">
        Se o download não iniciou automaticamente,
        <span class="tryAgain" @click.stop="tryAgain"> clique aqui</span>
      </p>
      <div class="progress-container">
        <span class="title">100% dos arquivos prontos!</span>
        <b-progress :value="100" :max="100" variant="success" height="12px" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { BSpinner } from 'bootstrap-vue'
import store from '@/store'

// Props
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  masculine: {
    type: Boolean,
    default: false,
  },
  isReport: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['close'])

// Local State
const pdfDone = ref(false)

// Vuex Getter
const pdfLoadPercent = computed(() => store.getters.GET_ADMIN_PDF_LOAD_PERCENT)

// Watch PDF Percent - when it hits 100, trigger close
watch(pdfLoadPercent, (val) => {
  if (val === 100) {
    pdfDone.value = true
    store.state.adminContext.pdfLoadPercent = 0
    emit('close')
  }
})

// Try again handler
const tryAgain = () => {
  pdfDone.value = false
  store.state.adminContext.pdfLoadPercent = 0

  const button = document.getElementById('button-loading-generateZip')
  if (button) {
    button.click()
  }
}
</script>

<style lang="scss">
.working {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  color: #5e5873;

  .title {
    font-size: 28px;
    font-weight: 600;
    text-align: center;

    &:first-letter {
      text-transform: uppercase;
    }

    margin-top: 1.5rem;
  }

  .subtitle {
    font-size: 21px;
    font-weight: 500;

    text-align: center;

    margin-top: 24px;
  }

  .tryAgain {
    color: #6e63e8;
    cursor: pointer;
    text-decoration: underline;
  }

  .progress-container {
    width: 50%;
    text-align: center;

    @media (max-width: 425px) {
      width: 100%;
    }

    .title {
      font-size: 21px;
      font-weight: 500;
      color: #28c76f;

      margin-bottom: 1rem;
    }
  }
}
</style>