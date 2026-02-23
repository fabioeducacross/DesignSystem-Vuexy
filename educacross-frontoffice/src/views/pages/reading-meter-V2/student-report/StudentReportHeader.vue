<template>
  <b-skeleton-wrapper :loading="isLoading">
    <template v-slot:loading>
      <b-card>
        <b-skeleton height="60px" />
      </b-card>
    </template>
    <b-card>
      <div
        v-if="readingDetail.evaluationDetailing"
        class="d-flex flex-column flex-lg-row justify-center align-items-center"
      >
        <div
          v-if="!editMode"
          class="text-primary link-floating mr-auto mr-lg-0 cursor-pointer"
          style="z-index: 99"
          @click="goBack"
        >
          <span class="material-symbols-outlined" style="font-size: 12px; vertical-align: middle">
            arrow_back_ios
          </span>
          <span class="underline"> Voltar</span>
        </div>
        <div
          class="floating-detail w-100 d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2"
        >
          <b-row class="gap-2 mr-1">
            <ExerciseType
              v-for="(exerciseId, index) in readingDetail.evaluationDetailing.types"
              :key="`exercise-${index}-${exerciseId}`"
              :exercise-id="exerciseId"
              :size="32"
            />
          </b-row>
          <span class="h4 mr-50 mb-0 text-body">
            <span class="font-bold">{{ readingDetail.evaluationDetailing.evaluationName }}</span>
          </span>
          <b-row class="gap-2">
            <b-badge pill variant="light-primary">
              {{ readingDetail.evaluationDetailing.serieName }}
            </b-badge>
            <b-badge
              :variant="`light-${
                getReadingEvaluationStatusEnum(readingDetail.evaluationDetailing.status).variant
              }`"
              pill
            >
              {{ getReadingEvaluationStatusEnum(readingDetail.evaluationDetailing.status).text }}
            </b-badge>
          </b-row>
        </div>
        <section class="mt-1 mt-lg-0 ml-lg-auto" style="z-index: 9">
          <div class="text-right">
            <span v-if="!isAuditor" class="h4 font-bold mb-0 text-primary">
              {{ readingDetail.evaluationDetailing.studentName }}</span
            >
          </div>
          <div v-if="isAuditor" class="d-flex align-items-center gap-1">
            <span
              v-if="readingDetail.studentsQueue.length"
              class="h4 font-bold mb-0 text-primary mr-2"
              >{{ activeStudent.name }}</span
            >
            <div
              class="d-flex align-items-center justify-content-center cursor-pointer"
              :class="{ disabled: isDisabledBackward }"
              style="
                border: 1px solid #7367f0;
                width: 24px;
                height: 24px;
                border-radius: 4px;
                user-select: none;
              "
              @click="moveBackward"
            >
              <span class="material-symbols-outlined text-primary" style="font-size: 24px">
                chevron_left
              </span>
            </div>
            <div
              class="d-flex align-items-center justify-content-center cursor-pointer"
              :class="{ disabled: isDisabledForward }"
              style="
                border: 1px solid #7367f0;
                width: 24px;
                height: 24px;
                border-radius: 4px;
                user-select: none;
              "
              @click="moveForward"
            >
              <span class="material-symbols-outlined text-primary" style="font-size: 24px">
                chevron_right
              </span>
            </div>
          </div>
        </section>
      </div>
      <ModalConfirm
        v-model="openConfirmExit"
        :callback-confirm="confirmChange"
        icon-variant="orange"
        confirm-variant="danger"
        cancel-variant="outline-primary"
        label-confirm="Trocar e perder"
      >
        <h4 class="text-body">Tem certeza que deseja trocar de aluno?</h4>
        <p>
          <span class="text-primary font-bold">Suas ações não foram salvas.</span> Ao trocar, você
          perderá as alterações realizadas.
        </p>
      </ModalConfirm>
    </b-card>
  </b-skeleton-wrapper>
</template>

<script setup>
import { useStudentReport } from './useStudentReport'
import ExerciseType from '@/components/exercise-type/reading-meter/ExerciseType.vue'
import { getReadingEvaluationStatusEnum } from '@/consts/ReadingMeterEnum.js'
import router from '@/router'
import store from '@/store'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { computed, ref, getCurrentInstance, watch } from 'vue'

const {
  readingDetail,
  getReadingFluency,
  getReadingsTest,
  isLoadingReport,
  isLoading,
  editMode,
} = useStudentReport()

const evaluationId = computed(() => router.currentRoute.params.evaluationId)
const role = store.getters.accessRole
const isAuditor = role === 'Auditor'
const positionStudent = ref(0)
const activeStudent = computed(() => readingDetail.value?.studentsQueue[positionStudent.value])
const isDisabledBackward = computed(() => positionStudent.value === 0)
const isDisabledForward = computed(
  () => positionStudent.value === readingDetail.value?.studentsQueue.length - 1,
)

const vm = getCurrentInstance().proxy

const openConfirmExit = ref(false)
const lockedAction = ref()

const confirmChange = () => {
  editMode.value = false
  openConfirmExit.value = false
  vm.$bus.emit('showConfirmExit', false)
  if (lockedAction.value === 'backward') {
    moveBackward()
    return
  }
  moveForward()
  return
}

const moveBackward = () => {
  if (isDisabledBackward.value) {
    return
  }
  if (editMode.value) {
    lockedAction.value = 'backward'
    openConfirmExit.value = true
    return
  }
  positionStudent.value -= 1
  updateParamsStudent()
}
const moveForward = () => {
  if (isDisabledForward.value) {
    return
  }
  if (editMode.value) {
    lockedAction.value = 'forward'
    openConfirmExit.value = true
    return
  }
  positionStudent.value += 1
  updateParamsStudent()
}
const updateParamsStudent = async () => {
  let routeName = 'auditorStudentReport'
  if (!isAuditor) {
    if (role === 'NetworkManager') {
      routeName = 'NetworkManagerFluencyV2StudentReport'
    } else if (role === 'Teacher') {
      routeName = 'TeacherFluencyV2StudentReport'
    } else {
      routeName = 'AdminFluencyV2StudentReport'
    }
  }
  const { institutionId } = router.currentRoute.params
  router
    .push({
      name: routeName,
      params: {
        evaluationId: evaluationId.value,
        studentId: activeStudent.value.id,
        classId: activeStudent.value.classId,
        ...(institutionId && { institutionId }),
      },
    })
    .catch(error => {
      if (error.name !== 'NavigationDuplicated') {
        throw error
      }
    })
  isLoadingReport.value = true
  await getReadingsTest()
  await getReadingFluency()
  isLoadingReport.value = false
}

watch(
  readingDetail,
  () => {
    if (readingDetail.value.report && activeStudent.value) {
      vm.$bus.emit('setBreadcrumb', ['', '', '', activeStudent.value.name])
    }
  },
  {
    deep: true,
  },
)

const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
  .disabled {
    pointer-events: none;
    opacity: 0.6;
  }
  .underline {
    text-decoration: underline;
  }

  ::v-deep .card {
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }

  ::v-deep .card-body {
    padding: 16px 24px;
  }

  .icon-badge {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    ::v-deep .card-body {
      padding: 12px 16px;
    }
  }
  @media (min-width: 992px) {
    .floating-detail {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .link-floating {
      position: absolute;
      left: 25px;
    }
  }
</style>