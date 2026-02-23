<template>
  <b-skeleton-wrapper :loading="isLoading || isLoadingReport">
    <template v-slot:loading>
      <b-card>
        <b-skeleton height="100px" />
      </b-card>
    </template>
    <b-card v-if="typeTest && readingDetail.evaluationDetailing" class="student-report-filter">
      <b-row class="align-items-center">
        <b-col>
          <b-form-group label="Teste" label-for="testType">
            <ESelect
              v-model="typeTest"
              :options="readingsTest"
              :disabled="editMode || readingsTest.length <= 1"
              label="name"
              placeholder="Selecione um tipo de teste"
              @change="changeTypeTest"
            >
              <template v-slot:selected-option="option">
                <div class="d-flex align-items-center gap-2">
                  <ExerciseType
                    v-for="type in option.types"
                    :key="type"
                    :exercise-id="type"
                    :size="24"
                  />
                  <span>{{ option.name }}</span>
                </div>
              </template>

              <template v-slot:option="option">
                <div class="d-flex align-items-center gap-2">
                  <ExerciseType
                    v-for="type in option.types"
                    :key="type"
                    :exercise-id="type"
                    :size="24"
                  />
                  <span>{{ option.name }}</span>
                </div>
              </template>
            </ESelect>
          </b-form-group>
        </b-col>

        <b-col
          v-if="
            isTeacher &&
            readingDetail.evaluationDetailing.teacherReapplyTest &&
            readingDetail.evaluationDetailing.status === 4
          "
          cols="auto"
        >
          <b-form-group label-for="reaplyTest">
            <template v-slot:label> &nbsp; </template>
            <div
              v-b-tooltip.hover.top.html="
                !typeTest.id ? 'Selecione 1 teste para liberar a ação' : null
              "
            >
              <b-button
                variant="primary"
                :disabled="!typeTest.id"
                name="reaplyTest"
                class="d-flex align-items-center gap-1"
                @click="prepareReEnableItem"
              >
                <span class="material-symbols-outlined" style="font-size: 16px"> refresh </span>
                Reaplicar teste
              </b-button>
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <ModalConfirm
        v-model="confirmReEnableIsOpen"
        :callback-confirm="reapplyTest"
        label-confirm="Reaplicar teste"
        :busy="isLoadingReport"
      >
        <h4>Tem certeza que deseja reaplicar?</h4>
        <p>
          O teste ficará disponível novamente para
          <span class="text-primary font-bold">{{
            readingDetail.evaluationDetailing.studentName
          }}</span
          >. Você poderá cancelar a qualquer momento.
        </p>
      </ModalConfirm>
    </b-card>
  </b-skeleton-wrapper>
</template>

<script setup>
import { useStudentReport } from './useStudentReport'
import ExerciseType from '@/components/exercise-type/reading-meter/ExerciseType.vue'
import ESelect from '@/components/selects/ESelect.vue'
import router from '@/router'
import store from '@/store'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { ref } from 'vue'

const {
  readingDetail,
  typeTest,
  reapplyEvaluation,
  readingsTest,
  isLoadingReport,
  isLoading,
  editMode,
  getReadingFluency,
} = useStudentReport()

const isTeacher = store.getters.accessRole === 'Teacher'

const changeTypeTest = async () => {
  isLoadingReport.value = true
  await getReadingFluency()
  isLoadingReport.value = false
}

const reapplyTest = async () => {
  if (!isTeacher) return

  await reapplyEvaluation()
    .then(res => {
      if (res.status === 200) {
        router.push({
          name: 'TeacherFluencyV2Students',
        })
      }
    })
    .finally(() => {
      confirmReEnableIsOpen.value = false
    })
}

const confirmReEnableIsOpen = ref(false)
const prepareReEnableItem = () => {
  confirmReEnableIsOpen.value = true
}
</script>

<style lang="scss" scoped>
  .student-report-filter {
    ::v-deep .card-body {
      padding: 12px 24px;
    }

    .test-label {
      font-size: 0.9rem;
      color: #6c757d;
      font-weight: 500;
      white-space: nowrap;
    }

    ::v-deep .e-select-container {
      .material-symbols-outlined {
        color: #6c757d;
        font-size: 16px !important;
        font-weight: 400;
      }
    }

    .icon-with-background {
      background: rgba(108, 117, 125, 0.1) !important;
      border-radius: 4px !important;
      padding: 4px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-width: 24px !important;
      min-height: 24px !important;

      &:hover {
        background: rgba(108, 117, 125, 0.15) !important;
      }
    }

    ::v-deep .e-select-dropdown {
      .option {
        .material-symbols-outlined {
          color: #6c757d;
          font-size: 16px !important;
          font-weight: 400;
        }

        &:hover .material-symbols-outlined {
          color: #495057;
        }

        &.selected .material-symbols-outlined {
          color: var(--bs-primary);
        }

        .icon-with-background {
          &:hover {
            background: rgba(73, 80, 87, 0.1) !important;
          }
        }

        &.selected .icon-with-background {
          background: rgba(13, 110, 253, 0.1) !important;
          color: var(--bs-primary) !important;
        }
      }
    }

    ::v-deep .row {
      --bs-gutter-x: 1rem;
    }

    @media (max-width: 768px) {
      ::v-deep .card-body {
        padding: 12px 16px;
      }

      ::v-deep .row {
        flex-direction: column;
        --bs-gutter-x: 0;
        --bs-gutter-y: 0.75rem;
      }

      ::v-deep .col,
      ::v-deep .col-auto {
        width: 100% !important;
        max-width: 100% !important;
        flex: none !important;
      }

      .test-label {
        text-align: left;
        margin-bottom: 0.5rem;
      }
    }
  }
</style>