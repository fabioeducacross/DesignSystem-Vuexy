<template>
  <section>
    <b-skeleton-wrapper :loading="isLoadingReport || isLoading">
      <template v-slot:loading>
        <b-card>
          <b-skeleton height="60px" />
        </b-card>
      </template>

      <b-card :bg-variant="proficiencyVariant" body-class="custom-card-body" text-variant="white">
        <b-row class="align-items-center">
          <b-col cols="12" md="4">
            <span class="date-text">
              Realizado em:
              {{ formatDate(readingDetail.report && readingDetail.report.readingDate) }}
            </span>
          </b-col>

          <b-col cols="12" md="4">
            <div
              class="audio-player-container d-flex align-items-center justify-content-md-center py-1 py-md-0"
            >
              <audio
                v-if="readingDetail.report && readingDetail.report.audioUrl"
                :src="readingDetail.report.audioUrl"
                controls
                controlsList="nodownload"
                preload="metadata"
                class="custom-audio"
              ></audio>
              <div v-else class="audio-placeholder">
                <span class="material-symbols-outlined">volume_off</span>
                <span class="ms-1">Áudio indisponível</span>
              </div>
            </div>
          </b-col>

          <b-col cols="12" md="4">
            <div class="proficiency-section d-flex align-items-center justify-content-md-end gap-2">
              <b-badge
                :class="[
                  `bg-white text-${proficiencyVariant} d-flex align-items-center justify-content-center p-50 gap-1 text-uppercase`,
                  { 'cursor-pointer': isTeacher },
                ]"
                pill
                @click="toggleProficiencyModal"
              >
                <span
                  v-if="isTeacher"
                  :class="`material-symbols-outlined text-${proficiencyVariant}`"
                  style="font-size: 15px"
                >
                  {{ setIcon }}
                </span>
                <span class="proficiency-text">{{ proficiencyLabel }}</span>
              </b-badge>
            </div>

            <div v-if="showProficiencyModal" class="proficiency-mini-modal" @click.stop>
              <div
                v-for="(config, key) in allProficiencyConfigs"
                :key="key"
                class="proficiency-option"
                :class="{ active: key.toString() === currentProficiency.toString() }"
                @click="selectProficiency(key)"
              >
                <span
                  class="badge rounded-pill"
                  :class="`badge-light-legend-${config.variant} border-legend-${config.variant}`"
                >
                  {{ config.label.toUpperCase() }}
                </span>
                <span
                  v-if="key.toString() === currentProficiency.toString()"
                  class="material-symbols-outlined current-indicator"
                >
                  check_circle
                </span>
              </div>
            </div>
          </b-col>

          <div
            v-if="showProficiencyModal"
            class="proficiency-modal-overlay"
            @click="closeProficiencyModal"
          ></div>
        </b-row>
      </b-card>
    </b-skeleton-wrapper>

    <b-modal
      v-model="showConfirmationModal"
      title="Tem certeza que deseja alterar?"
      centered
      hide-footer
      size="md"
      modal-class="proficiency-confirmation-modal"
    >
      <div class="text-center">
        <div class="d-flex flex-column mb-3">
          <span class="material-symbols-outlined" style="color: #ffd643; font-size: 80px"
            >error</span
          >
          <span class="color-grayTheme" style="font-size: 21px"
            >Tem certeza que deseja alterar?</span
          >
        </div>

        <div class="confirmation-content mb-4">
          <div class="row">
            <div class="col-6">
              <div class="d-flex flex-column gap-2 current-section p-2">
                <h6 class="color-grayTheme font-bold font-12">ATUAL:</h6>
                <p class="color-grayTheme">Avaliação feita pela Inteligência Artificial.</p>
                <span class="material-symbols-outlined color-grayTheme mb-1" style="font-size: 20px"
                  >stat_minus_3</span
                >

                <span
                  class="badge rounded-pill font-14"
                  :class="`badge-light-${proficiencyVariant} border-${proficiencyVariant}`"
                >
                  {{ proficiencyLabel.toUpperCase() }}
                </span>
              </div>
            </div>

            <div class="col-6">
              <div
                class="d-flex flex-column gap-2 p-2 rounded border-primary"
                style="box-shadow: 0px 0px 16px 0px #00000029"
              >
                <h6 class="text-primary font-bold font-12">TROCAR POR:</h6>
                <p class="text-primary px-2">Minha avaliação personalizada.</p>
                <span class="material-symbols-outlined text-primary mb-1" style="font-size: 20px"
                  >stat_minus_3</span
                >
                <span
                  v-if="allProficiencyConfigs[pendingProficiency]"
                  class="badge rounded-0 font-14 d-flex align-items-center justify-content-center gap-1"
                  :class="`badge-light-legend-${allProficiencyConfigs[pendingProficiency].variant} border-legend-${allProficiencyConfigs[pendingProficiency].variant}`"
                >
                  <span
                    class="material-symbols-outlined"
                    :class="`text-legend-${allProficiencyConfigs[pendingProficiency].variant}`"
                    style="font-size: 14px"
                    >person_edit</span
                  >
                  {{ allProficiencyConfigs[pendingProficiency].label.toUpperCase() }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center gap-3">
          <b-button variant="outline-danger" @click="cancelProficiencyChange"> Cancelar </b-button>
          <b-button variant="primary" :disabled="isLoadingReport" @click="confirmProficiencyChange">
            <b-spinner v-if="isLoadingReport" small class="mr-50" /> Alterar
          </b-button>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script setup>
import { useStudentReport } from './useStudentReport'
import { getVariantByRuleV2 } from '@/consts/ReadingMeterV2ProficiencyEnum'
import { getVariantByRule } from '@/consts/legends/index.js'
import store from '@/store'
import { computed, ref } from 'vue'

const isTeacher = store.getters.accessRole === 'Teacher'
const {
  readingDetail,
  getReadingFluency,
  changeProficiency,
  typeTest,
  isLoadingReport,
  isLoading,
} = useStudentReport()

const proficiencyData = computed(() => {
  if (
    !readingDetail.value ||
    !readingDetail.value.report ||
    !readingDetail.value.report.proficiency
  ) {
    return { variant: 'secondary', label: 'N/A' }
  }
  return (
    getVariantByRuleV2(readingDetail.value.report.proficiency, 'proficiency') || {
      variant: 'secondary',
      label: 'N/A',
    }
  )
})

const proficiencyVariant = computed(() => proficiencyData.value.variant)
const proficiencyLabel = computed(() => proficiencyData.value.label)

const hasCustomProficiency = computed(() => {
  return (
    readingDetail.value &&
    readingDetail.value.report &&
    readingDetail.value.report.changeProficiency
  )
})

const currentProficiency = computed(() => {
  return readingDetail.value && readingDetail.value.report
    ? readingDetail.value.report.proficiency || 1
    : 1
})

const allProficiencyConfigs = {
  1: { variant: 'below-basic', label: 'Abaixo do Básico' },
  2: { variant: 'basic', label: 'Básico' },
  3: { variant: 'proficient', label: 'Adequado' },
  4: { variant: 'advanced', label: 'Avançado' },
}

const showProficiencyModal = ref(false)
const showConfirmationModal = ref(false)
const pendingProficiency = ref(null)

const formatDate = dateString => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const setIcon = computed(() => {
  return readingDetail.value.report.changeProficiency === 1 ? 'person_edit' : 'edit'
})
const toggleProficiencyModal = () => {
  if (
    !isTeacher ||
    !readingDetail.value.evaluationDetailing.teacherEditProficiencyStudent ||
    readingDetail.value.evaluationDetailing.hasAudit ||
    typeTest.value.id === null
  )
    return
  showProficiencyModal.value = !showProficiencyModal.value
}

const closeProficiencyModal = () => {
  showProficiencyModal.value = false
}

const selectProficiency = proficiencyKey => {
  if (proficiencyKey.toString() === currentProficiency.value.toString()) {
    return
  }

  pendingProficiency.value = proficiencyKey
  showProficiencyModal.value = false
  showConfirmationModal.value = true
}

const confirmProficiencyChange = async () => {
  isLoadingReport.value = true
  await changeProficiency(pendingProficiency.value)
  await getReadingFluency()
  isLoadingReport.value = false

  showConfirmationModal.value = false
  pendingProficiency.value = null
}

const cancelProficiencyChange = () => {
  showConfirmationModal.value = false
  pendingProficiency.value = null
}

const showMoreInfo = () => {}
</script>

<style lang="scss" scoped>
  .underline {
    text-decoration: underline;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .date-text {
    font-weight: 500;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .audio-player-container {
    border-radius: 20px;
    height: fit-content !important;

    .custom-audio {
      height: 30px;
      background: transparent;

      &::-webkit-media-controls-panel {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .audio-placeholder {
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.8rem;

      .material-symbols-outlined {
        font-size: 16px;
      }
    }
  }
  .proficiency-text {
    font-size: 14px;
    font-weight: 600;
  }

  .proficiency-mini-modal {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 9999;
    margin-top: 8px;
    min-width: 208px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    animation: slideDown 0.2s ease-out;

    .proficiency-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &.active {
        background-color: rgba(25, 135, 84, 0.1);
      }

      .current-indicator {
        color: #198754;
        font-size: 18px;
      }
    }
  }

  .proficiency-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9998;
    background: transparent;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .custom-card-body {
      font-size: 0.85rem;
      gap: 8px;
    }
  }
</style>