<template>
  <b-modal
    ref="refModalTestOrientation"
    hide-footer
    title="Orientações do teste"
    size="xl"
    no-close-on-backdrop
    no-close-on-esc
    centered
    header-bg-variant="light-primary"
    @close="closeModal"
  >
    <section v-if="can(ACTION.READ, PERMISSION.GENERAL.TEACHER)">
      <div class="d-flex flex-column flex-lg-row gap-8">
        <div class="diagnostic-card-container">
          <b-card border-variant="primary" class="h-100">
            <div class="d-flex justify-content-center">
              <span class="material-symbols-outlined text-primary" style="font-size: 40px">
                wb_incandescent
              </span>
            </div>
            <p class="text-primary font-bold">
              Neste teste você deverá diagnosticar se o aluno já:
            </p>
            <p class="whitespace-pre-line">{{ orientationDetails.objective }}</p>
          </b-card>
        </div>
        <div>
          <div class="d-flex align-items-center gap-2 mb-2">
            <h1 class="text-primary mb-0">
              {{ applicationName }}
            </h1>
            <div>
              <b-badge pill variant="light-primary">{{ orientationDetails.serieName }}</b-badge>
            </div>
          </div>
          <h4>Orientações</h4>
          <p class="whitespace-pre-line">{{ orientationDetails.orientation }}</p>
          <div class="d-flex flex-column flex-lg-row gap-2">
            <b-button
              v-if="orientationDetails.manualUrl"
              variant="math"
              :disabled="loadingDownload"
              @click="download"
            >
              <b-spinner v-if="loadingDownload" small class="mr-50"></b-spinner>
              <span
                v-else
                class="material-symbols-outlined"
                style="font-size: 18px; vertical-align: middle"
                >download</span
              >
              <span class="align-middle"> Baixar manual do teste</span>
            </b-button>

            <b-button
              v-if="!orientationDetails.enabled"
              variant="primary"
              :disabled="loadingApply"
              @click="enablePhase"
            >
              Aplicar e ver relatório
              <b-spinner v-if="loadingApply" small class="mr-50"></b-spinner>
              <span
                class="material-symbols-outlined"
                style="font-size: 18px; vertical-align: middle"
                >arrow_forward</span
              >
            </b-button>
          </div>
        </div>
      </div>

      <hr />
      <h4 class="text-primary">Prévia do teste</h4>
      <div v-if="orientationDetails.manualUrl">
        <embed :src="orientationDetails.manualUrl" class="w-full" height="700" />
      </div>
    </section>
    <section v-else>
      <div class="d-flex align-items-center justify-content-center gap-2 mb-2">
        <h1 class="text-primary mb-0">Fases da Escrita</h1>
        <div>
          <b-badge pill variant="light-primary">{{ orientationDetails.serieName }}</b-badge>
        </div>
      </div>
      <h4 class="text-primary">Prévia do teste</h4>
      <div v-if="orientationDetails.manualUrl">
        <embed :src="orientationDetails.manualUrl" class="w-full" height="700" />
      </div>
    </section>
  </b-modal>
</template>

<script setup>
import { ACTION, PERMISSION } from '@/consts/permissions'
import { getWritingStagesTest, putWritingStagesEnable } from '@/services/shared/writing-stages/writing-stages.Service'
import { can } from '@core/libs/acl/utils'
import { saveAs } from 'file-saver'
import { ref } from 'vue'

// Props
const props = defineProps({
  disableDetailsButton: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['input', 'apply'])

// Refs and state
const refModalTestOrientation = ref(null)
const orientationDetails = ref({})
const loading = ref(false)
const loadingApply = ref(false)
const loadingDownload = ref(false)
const writingStagesTestId = ref(null)
const apply = ref(null)
const classId = ref(null)
const applicationName = ref('')

// Methods
const closeModal = () => {
  emit('input', false)
}

const fetchData = () => {
  if (loading.value) return

  loading.value = true

  getWritingStagesTest(writingStagesTestId.value, {
    Apply: apply.value,
    ClassId: classId.value,
  })
    .then(({ data }) => {
      orientationDetails.value = data
      refModalTestOrientation.value.show()
    })
    .finally(() => {
      loading.value = false
    })
}

const download = async () => {
  loadingDownload.value = true

  const url = orientationDetails.value.manualUrl
  const name = `manual_${applicationName.value}.pdf`
  saveAs(url, name)

  loadingDownload.value = false
}

const enablePhase = async () => {
  if (loadingApply.value) return

  loadingApply.value = true

  putWritingStagesEnable({
    Apply: apply.value,
    WritingStagesTestId: writingStagesTestId.value,
    ClassId: classId.value,
  })
    .then(() => {
      emit('apply')
    })
    .finally(() => {
      loadingApply.value = false
    })
}

/**
 * @param {Object} params
 * @param {number} params.writingStagesTestId
 * @param {number} params.apply
 * @param {string} params.applicationName
 * @param {number} params.classId
 * @returns {Promise<void>}
 */
const show = async params => {
  writingStagesTestId.value = params.writingStagesTestId
  apply.value = params.apply
  applicationName.value = params.applicationName
  classId.value = params.classId

  await fetchData()
}
</script>

<style lang="scss" scoped>
  @import '@core/scss/base/bootstrap-extended/include';

  .diagnostic-card-container {
    flex: 0 0 280px;
    @media (max-width: (map-get($grid-breakpoints, lg))) {
      flex: 0 0 100%;
    }
  }
</style>