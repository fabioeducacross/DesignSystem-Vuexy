<template>
  <b-modal
    :id="modalId"
    v-model="isVisible"
    centered
    hide-footer
    content-class="shadow"
    modal-class="evaluation-details-modal"
    size="lg"
    static
    no-close-on-backdrop
    title="Detalhes do teste"
    @hidden="onModalHidden"
  >
    <b-skeleton-wrapper :loading="isLoadingModal">
      <template v-slot:loading>
        <div class="px-1">
          <b-row class="align-items-center mb-3">
            <b-col cols>
              <div class="d-flex justify-content-center align-items-center gap-2">
                <b-skeleton type="avatar" width="40px" height="40px" />
                <b-skeleton width="200px" height="20px" />
                <b-skeleton type="badge" width="80px" height="24px" />
                <b-skeleton type="badge" width="100px" height="24px" />
              </div>
            </b-col>
            <b-col cols="auto">
              <b-skeleton type="button" width="180px" height="38px" />
            </b-col>
          </b-row>

          <div class="mb-3">
            <b-row class="align-items-center mb-2">
              <b-col cols="auto">
                <b-skeleton type="avatar" width="32px" height="32px" />
              </b-col>
              <b-col cols="auto">
                <b-skeleton width="180px" height="20px" />
              </b-col>
              <b-col cols="auto">
                <b-skeleton type="badge" width="100px" height="24px" />
              </b-col>
            </b-row>
            <b-skeleton type="card" height="200px" class="w-100 rounded" />
          </div>

          <div class="mb-3">
            <b-row class="align-items-center mb-2">
              <b-col cols="auto">
                <b-skeleton type="avatar" width="32px" height="32px" />
              </b-col>
              <b-col cols="auto">
                <b-skeleton width="180px" height="20px" />
              </b-col>
              <b-col cols="auto">
                <b-skeleton type="badge" width="100px" height="24px" />
              </b-col>
            </b-row>
            <b-skeleton type="card" height="150px" class="w-100 rounded" />
          </div>
        </div>
      </template>

      <b-row v-if="evaluationData" class="align-items-center mb-3">
        <b-col
          cols
          class="evaluation-header-box d-flex justify-content-center align-items-center gap-2"
        >
          <div
            v-if="getEvaluationIcons(evaluationData.types)[0]"
            class="icon-container"
            :class="getEvaluationIcons(evaluationData.types)[0].bgColor"
          >
            <span
              :class="getEvaluationIcons(evaluationData.types)[0].color"
              class="material-symbols-outlined"
            >
              {{ getEvaluationIcons(evaluationData.types)[0].icon }}
            </span>
          </div>
          <div
            v-if="getEvaluationIcons(evaluationData.types)[1]"
            class="icon-container"
            :class="getEvaluationIcons(evaluationData.types)[1].bgColor"
          >
            <span
              :class="getEvaluationIcons(evaluationData.types)[1].color"
              class="material-symbols-outlined"
            >
              {{ getEvaluationIcons(evaluationData.types)[1].icon }}
            </span>
          </div>
          <span class="evaluation-name">{{ evaluationData.name }}</span>
          <b-badge pill variant="light-primary" class="font-12">
            {{ evaluationData.serieName }}
          </b-badge>
          <b-badge
            pill
            :variant="`light-${
              getVariantByRule(evaluationData.status, 'ReadingFluencyV2StatusEnum').variant
            }`"
            :class="`font-12 border-${
              getVariantByRule(evaluationData.status, 'ReadingFluencyV2StatusEnum').variant
            }`"
          >
            {{ getVariantByRule(evaluationData.status, 'ReadingFluencyV2StatusEnum').text }}
          </b-badge>
        </b-col>

        <b-col cols="auto">
          <b-button
            variant="info"
            :class="{ 'cursor-not-allowed': !isDownloadEnabled }"
            :disabled="!isDownloadEnabled"
            @click="handleDownload"
          >
            <span class="material-symbols-outlined align-middle" style="font-size: 18px"
              >download</span
            >
            <span class="align-middle"> Baixar avaliação</span>
          </b-button>
        </b-col>
      </b-row>

      <div v-if="wordsContent">
        <b-row class="align-items-center justify-content-center mb-2">
          <b-col cols="auto" class="pr-0">
            <div class="icon-container bg-list">
              <span class="material-symbols-outlined text-list">format_list_numbered</span>
            </div>
          </b-col>
          <b-col cols="auto" class="pr-0">
            <h6 class="mb-0 text-primary font-weight-bold">LISTA DE PALAVRAS</h6>
          </b-col>
          <b-col cols="auto">
            <b-badge variant="light-primary" pill>{{ wordsArray.length }} palavras</b-badge>
          </b-col>
        </b-row>

        <div class="words-container mb-3">
          <div class="words-grid">
            <div v-for="(word, index) in wordsArray" :key="index" class="word-item">
              {{ word }}
            </div>
          </div>
        </div>
      </div>

      <!-- Texto Completo -->
      <div v-if="textContent">
        <b-row class="justify-content-center align-items-center mb-2">
          <b-col cols="auto" class="pr-0">
            <div class="icon-container bg-book">
              <span class="material-symbols-outlined text-book">book_6</span>
            </div>
          </b-col>
          <b-col cols="auto" class="pr-0">
            <h6 class="mb-0 text-primary font-weight-bold">TEXTO COMPLETO</h6>
          </b-col>
          <b-col cols="auto">
            <b-badge variant="light-primary" pill>
              {{ textContent.split(' ').length }} palavras
            </b-badge>
          </b-col>
        </b-row>

        <div class="text-container mb-3">
          <p class="mb-0">{{ textContent }}</p>
        </div>
      </div>
    </b-skeleton-wrapper>
  </b-modal>
</template>

<script setup>
import { getVariantByRule } from '@/consts/legends/index.js'
import { computed } from 'vue'

// Props
const props = defineProps({
  modalId: {
    type: String,
    default: 'evaluation-details-modal',
  },
  evaluationData: {
    type: Object,
    default: null,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  getEvaluationIcons: {
    type: Function,
    required: true,
  },
})

// Emits
const emit = defineEmits(['update:visible', 'download', 'close'])

// Computed
const isLoadingModal = computed(() => {
  return props.visible && (!props.evaluationData || !props.evaluationData.readingFluencyTests)
})

const isVisible = computed({
  get: () => props.visible,
  set: value => {
    emit('update:visible', value)
  },
})

const textContent = computed(() => {
  if (!props.evaluationData?.readingFluencyTests) return null
  const textTest = props.evaluationData.readingFluencyTests.find(test => test.type === 2)
  return textTest ? textTest.content : null
})

const wordsContent = computed(() => {
  if (!props.evaluationData?.readingFluencyTests) return null
  const wordsTest = props.evaluationData.readingFluencyTests.find(test => test.type === 1)
  return wordsTest ? wordsTest.content : null
})

const wordsArray = computed(() => {
  if (!wordsContent.value) return []
  return wordsContent.value.split(' ').filter(word => word.trim() !== '')
})

const isDownloadEnabled = computed(() => {
  return props.evaluationData && props.evaluationData.evaluationPrint
})

const downloadTooltipMessage = computed(() => {
  if (!props.evaluationData) return ''
  switch (props.evaluationData.status) {
    case 5:
      return 'Ação bloqueada, pois a avaliação já foi finalizada.'
    case 0:
      return 'Ação bloqueada, pois a avaliação foi cancelada.'
    case 2:
      return 'Ação bloqueada, pois a avaliação ainda não foi ativada.'
    default:
      return props.evaluationData.evaluationPrint
        ? 'Download disponível.'
        : 'Download não habilitado para esta avaliação.'
  }
})

// Methods
const handleDownload = () => {
  emit('download', props.evaluationData)
}

const closeModal = () => {
  emit('close')
  isVisible.value = false
}

const onModalHidden = () => {
  emit('update:visible', false)
}

const formatDate = dateString => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
</script>

<style lang="scss" scoped>
  @import '@core/scss/base/bootstrap-extended/include';

  .evaluation-details-modal {
    ::v-deep .modal-dialog {
      max-width: 1143px;
    }

    ::v-deep .modal-content {
      border-radius: 6px;
    }

    ::v-deep .modal-header {
      background-color: $gray-50;
      border-bottom: 1px solid $border-color;
      padding: 1rem 1.5rem;

      .modal-title {
        font-size: 1.125rem;
        font-weight: $font-weight-bolder;
        color: $headings-color;
      }
    }

    ::v-deep .modal-body {
      padding: 1.5rem;
    }
  }

  .evaluation-header-box {
    border: 1px solid $border-color;
    border-radius: 6px;
    padding: 0.25rem;
    background-color: white;
  }

  .evaluation-name {
    font-size: 1rem;
    font-weight: $font-weight-bolder;
    color: $headings-color;
  }

  .icon-container {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    .material-symbols-outlined {
      font-size: 20px;
    }
  }

  .bg-book {
    background-color: #8bc728;
  }

  .bg-list {
    background-color: #ffb443;
  }

  .words-container {
    border: 1px solid $border-color;
    border-radius: 6px;
    padding: 1rem;
    background-color: white;
  }

  .words-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.75rem;
    max-height: 400px;
    overflow-y: auto;
  }

  .word-item {
    background-color: $gray-50;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    text-align: center;
    font-size: 0.875rem;
    font-weight: $font-weight-normal;
    color: $body-color;
    transition: all 0.2s ease;

    &:hover {
      background-color: darken($gray-50, 5%);
    }
  }

  .text-container {
    border: 1px solid $border-color;
    border-radius: 6px;
    padding: 1rem;
    background-color: white;
    max-height: 300px;
    overflow-y: auto;

    p {
      font-size: 0.875rem;
      line-height: 1.6;
      color: $body-color;
      text-align: justify;
    }
  }

  .words-grid,
  .text-container {
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: $gray-50;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: $primary;
      border-radius: 10px;

      &:hover {
        background: darken($primary, 10%);
      }
    }
  }
</style>