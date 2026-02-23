<template>
  <section v-if="typeTest.id">
    <template>
      <b-skeleton-wrapper :loading="isLoadingReport || isLoading">
        <template v-slot:loading>
          <b-card>
            <b-skeleton height="400px" />
          </b-card>
        </template>
        <b-card v-if="readingData.transcription.length || readingData.referenceWords.length">
          <b-container fluid>
            <b-row class="flex-column flex-lg-row w-100 mb-2 mb-lg-6">
              <div v-if="isAuditor && !readingData.audited" class="w-100" style="z-index: 9">
                <div
                  v-if="!editMode"
                  key="view-mode-buttons"
                  class="d-flex justify-content-center justify-content-lg-end gap-2"
                >
                  <b-button
                    class="d-flex align-items-center p-50 gap-1 cursor-pointer"
                    variant="success"
                    @click="auditTest((auditWithoutChanges = true))"
                  >
                    <span class="material-symbols-outlined"> done_all </span>
                    Validar sem alterar
                  </b-button>
                  <b-button
                    class="d-flex align-items-center p-50 gap-1 cursor-pointer"
                    variant="primary"
                    @click="editMode = !editMode"
                  >
                    <span class="material-symbols-outlined"> edit </span> Editar
                  </b-button>
                </div>
                <div
                  v-if="editMode"
                  key="edit-mode-buttons"
                  class="d-flex justify-content-end gap-2"
                >
                  <b-button
                    class="d-flex align-items-center p-50 gap-1 cursor-pointer"
                    variant="outline-danger"
                    @click="editMode = !editMode"
                  >
                    Cancelar
                  </b-button>
                  <b-button
                    class="d-flex align-items-center p-50 gap-1 cursor-pointer"
                    variant="success"
                    @click="auditTest((auditWithoutChanges = false))"
                  >
                    <span class="material-symbols-outlined"> done_all </span>
                    Salvar edição
                  </b-button>
                </div>
              </div>
              <div
                v-else-if="readingData.audited"
                v-b-tooltip.hover.top="
                  isAdmin
                    ? 'Este relatório foi validado e editado por uma pessoa auditora. '
                    : 'Relatório auditado. As alterações realizadas refletem na avaliação geral de proficiência do aluno.'
                "
                class="d-flex ml-auto gap-2"
                style="z-index: 9"
              >
                <b-badge variant="light-success" style="padding: 6px 20px"> AUDITADO </b-badge>
              </div>
              <b-col cols="12" class="custom-header text-center mt-2 mt-lg-0">
                <h5 class="mb-1 text-primary font-bold">LEITURA DO ALUNO</h5>
                <b-badge variant="light-primary"> {{ readingData.totalWords }} palavras </b-badge>
              </b-col>
            </b-row>
            <b-row v-if="typeTest.types[0] === 1 || editMode" class="position-relative five-cols">
              <b-col
                v-for="(word, index) in wordsAnalysis"
                :key="`word-${index}-${word.text}`"
                cols="6"
                sm="4"
                md="3"
                lg="2"
                xl="2"
                class="mb-1 px-1 word-col"
              >
                <div
                  class="word-item text-center"
                  :class="[getWordStatusClass(word.status), { editMode: editMode }]"
                  @click="changeStatus(word.status, index)"
                >
                  <span>{{ word.text }}</span>
                  <span
                    v-if="editMode"
                    class="material-symbols-outlined"
                    style="right: 0"
                    :class="{
                      'text-danger': word.status === 'word-error',
                      'text-success': word.status === 'word-correct',
                    }"
                  >
                    person_edit
                  </span>
                </div>
              </b-col>
            </b-row>
            <StudentReportText v-if="typeTest.types[0] === 2 && !editMode" />
          </b-container>
        </b-card>
      </b-skeleton-wrapper>
    </template>
  </section>
</template>

<script setup>
import StudentReportText from './StudentReportText.vue'
import { useStudentReport } from './useStudentReport'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { ref, watch, computed, getCurrentInstance } from 'vue'

const { readingDetail, typeTest, isLoadingReport, isLoading, editMode, putAuditFluencyTest } =
  useStudentReport()

const vm = getCurrentInstance().proxy
const { isAdmin } = useFilters()

const isAuditor = store.getters.accessRole === 'Auditor'

const readingData = computed(() => {
  const transcription = readingDetail.value?.report?.transcription || []
  const referenceWords = readingDetail.value?.report?.referenceWords || []
  const totalWords = readingDetail.value?.report?.totalWords
  const audited = readingDetail.value?.report?.audited

  return {
    transcription,
    referenceWords,
    totalWords,
    audited,
    currentPage: 1,
    totalPages: 1,
  }
})

const wordsAnalysis = computed(() => {
  if (
    !readingDetail.value?.report?.transcription &&
    !readingDetail.value?.report?.referenceWords
  ) {
    return []
  }
  if (readingDetail.value?.report?.transcription) {
    return readingDetail.value.report.transcription.map(word => ({
      text: word.word || '',
      status: word.reading,
      originalData: word,
    }))
  }
  return readingDetail.value?.report?.referenceWords.map(word => ({
    text: word.word || '',
    originalData: word,
  }))
})

const changeStatus = (status, index) => {
  if (!editMode.value) return
  switch (status) {
    case 1:
      wordsAnalysis.value[index].originalData.reading = 2
      break
    case 2:
      wordsAnalysis.value[index].originalData.reading = 4
      break
    case 4:
      wordsAnalysis.value[index].originalData.reading = 1
      break
  }
}
const auditTest = async auditWithoutChanges => {
  const transcription = structuredClone(readingDetail.value.report.transcription)
  await putAuditFluencyTest({
    auditWithoutChanges,
    transcription,
  })
}

const getWordStatusClass = status => {
  const statusClasses = {
    1: 'word-correct',
    2: 'word-error',
    3: 'word-inserted',
    4: 'word-omitted',
  }

  return statusClasses[status] || 'word-omitted'
}

watch(
  isLoadingReport,
  () => {
    editMode.value = false
  },
  {
    deep: true,
  },
)

watch(
  editMode,
  () => {
    if (editMode.value) {
      vm.$bus.emit('showConfirmExit', true)
    } else {
      vm.$bus.emit('showConfirmExit', false)
    }
  },
  {
    deep: true,
  },
)
</script>

<style lang="scss" scoped>
  .reading-text-container {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
    min-height: 300px;
  }

  .word-item {
    padding: 0px 8px;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 22px;
    width: 100%;
    text-align: center;
    font-size: 0.9rem;
    border-style: solid;
    user-select: none;

    & > span:first-of-type {
      overflow-wrap: break-word;
      min-width: 0;
      width: 100%;
    }

    &.editMode {
      border-width: 1px;
      background-color: #fff;
      border-style: dashed;
    }
  }

  .word-correct {
    background-color: #d4edda;
    color: #28a745;
    border-color: #28a745;
  }

  .word-error {
    background-color: #f8d7da;
    color: #dc3545;
    border-color: #dc3545;
  }

  .word-omitted {
    border-color: #6e6b7b;
    color: #6e6b7b;
    background-color: #6c757d1f;
  }

  .reading-legend {
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #e9ecef;
  }

  .legend-item {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .legend-indicator {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    display: inline-block;
  }

  .legend-text {
    font-size: 0.9rem;
    color: #495057;
    font-weight: 500;
  }

  @media (min-width: 992px) {
    .custom-header {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .five-cols {
      display: flex;
      flex-wrap: wrap;

      .word-col {
        flex: 0 0 20% !important;
        max-width: 20% !important;
      }
    }
  }
</style>