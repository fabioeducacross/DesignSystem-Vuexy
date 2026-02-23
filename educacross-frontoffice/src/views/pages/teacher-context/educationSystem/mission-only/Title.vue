<template>
  <div>
    <b-card v-if="!error">
      <b-skeleton-wrapper :loading="loading">
        <template v-slot:loading>
          <b-skeleton type="text" class="w-100 mb-0" height="50px" />
        </template>
        <b-row>
          <b-col cols="12" md>
            <div class="d-flex align-items-center gap-2 my-2 my-md-0 h-100">
              <Subjects v-if="subject.id" :subject-id="subject.id" :size="24" />
              <span class="m-0 font-bold">{{ mission.name }}</span>

              <span
                class="material-symbols-outlined text-primary cursor-pointer"
                style="vertical-align: middle"
                @click="openDetailsMission"
              >
                visibility
              </span>

              <span v-if="startDate" class="point-circle d-none d-md-block" />
              <div v-if="startDate">
                <span class="text-sm"
                  >Período de {{ startDate | formatDate }} a {{ finishDate | formatDate }}</span
                >
              </div>
            </div>
          </b-col>
          <b-col cols="12" md="auto">
            <b-button
              v-if="
                status === EEducationSystemGuideStatus.NotSent ||
                status === EEducationSystemGuideStatus.Finished ||
                status === EEducationSystemGuideStatus.Paused
              "
              block
              variant="success"
              class="py-25"
              @click="confirmEnable"
            >
              <span class="material-symbols-outlined" style="vertical-align: middle"> send </span>
              <span style="vertical-align: middle"> {{ $t('Enviar missão') }} </span>
            </b-button>

            <b-button
              v-if="
                status === EEducationSystemGuideStatus.NotStarted ||
                status === EEducationSystemGuideStatus.Started
              "
              block
              variant="danger"
              class="py-25"
              @click="confirmPause"
            >
              <span class="material-symbols-outlined" style="vertical-align: middle">
                pause_circle
              </span>
              <span style="vertical-align: middle">
                {{ $t('Pausar missão') }}
              </span>
            </b-button>
          </b-col>
        </b-row>
      </b-skeleton-wrapper>
    </b-card>

    <b-modal
      v-model="enableModal"
      hide-footer
      centered
      size="sm"
      title="Habilitar missão"
      no-close-on-backdrop
      static
      @close="showEnableModal = false"
    >
      <EducationSystemMissionsEnableModal
        v-if="enableModal"
        @close-modal="showEnableModal = false"
        @close-modal-success="enableModalSuccess"
      />
    </b-modal>

    <ModalConfirm
      v-model="pauseModal"
      :callback-confirm="disableMission"
      :busy="busy"
      label-cancel="Cancelar"
      label-confirm="Pausar missão"
    >
      <h4>Tem certeza que deseja pausar?</h4>
      <div>
        <p>
          A missão será ocultada para
          <span class="font-bold text-primary">{{ classe.Name }}.</span> Você poderá retomar a
          missão a qualquer momento.
        </p>
      </div>
    </ModalConfirm>

    <b-modal
      v-model="modalSelectClass"
      no-close-on-backdrop
      no-close-on-esc
      hide-footer
      hide-header
      centered
      static
      size="lg"
      @hide="modalSelectClass = false"
    >
      <select-class
        v-if="modalSelectClass"
        :classes="filteredClasses"
        @selectedClass="selectedClass($event)"
        @close="$router.push({ name: 'home' })"
      />
    </b-modal>

    <MissionBookDetails v-model="showDetailsMission" :guide-id="mission.id" />
  </div>
</template>

<script setup>
import MissionBookDetails from '@/components/mission-plus/MissionBookDetails.vue'
import Subjects from '@/components/subjects/subjects.vue'
import { EEducationSystemGuideStatus } from '@/consts/EEducationSystemGuideStatus.js'
import router from '@/router'
import { enableDisableEducationSystemBooks } from '@/services/teacher-context/educationSystem/EducationSystem.Service'
import { getSubjectAndSerie } from '@/services/teacher-context/guides/Guides.Service'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import EducationSystemMissionsEnableModal from '@/views/pages/teacher-context/educationSystem/EducationSystemMissionsEnableModal.vue'
import { useEducationSystemOnlyMission } from '@/views/pages/teacher-context/educationSystem/mission-only/useEducationSystemOnlyMission.js'
import SelectClass from '@/views/pages/teacher-context/shared/modals/SelectClass.vue'
import { ref, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy

const { subject, classe, classes, serie, mission, book } = useFilters()
const { resetAndfetch, status, startDate, finishDate, resetWithErrors, error } =
  useEducationSystemOnlyMission()
const { loading } = useTable()

const { missionId, bookId } = router.currentRoute.params
mission.value = { id: parseInt(missionId), name: '' }
book.value = { id: parseInt(bookId) }

const filteredClasses = ref([])
const modalSelectClass = ref(false)

const getSerieAndSubjectFromMission = async missionId => {
  try {
    const { data } = await getSubjectAndSerie(missionId)

    if (!data) resetWithErrors()

    serie.value = { id: data.serieId }
    subject.value = { id: data.subjectId }
  } catch (error) {
    resetWithErrors()
  }
}

if (missionId) {
  getSerieAndSubjectFromMission(missionId).then(() => {
    filteredClasses.value = classes.value
      .filter(cl => cl.SerieId === serie.value.id && cl.Students)
      .map(cl => ({ ...cl, id: cl.ClassId }))

    if (filteredClasses.value.length === 1) {
      classe.value = filteredClasses.value[0]
      resetAndfetch()
    } else if (filteredClasses.value.length > 1) {
      modalSelectClass.value = true
    }
  })
}

const selectedClass = value => {
  classe.value = value
  modalSelectClass.value = false
  resetAndfetch()
}

const busy = ref(false)

const enableModal = ref(false)
const pauseModal = ref(false)

const confirmEnable = () => {
  enableModal.value = true
}

const confirmPause = () => {
  pauseModal.value = true
}
const disableMission = () => {
  enableAndDisableMission()
}

const enableModalSuccess = data => {
  enableAndDisableMission(data.startDate, data.endDate)
}

const enableAndDisableMission = (startDate = null, finishDate = null) => {
  busy.value = true
  enableDisableEducationSystemBooks({
    missionId,
    classId: classe.value.ClassId,
    startDate,
    finishDate,
  })
    .then(() => {
      vm.$toast({
        component: Toast,
        props: {
          title: `Missão ${enableModal.value ? 'enviada' : 'pausada'} com sucesso!`,
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      enableModal.value = false
      pauseModal.value = false
      resetAndfetch()
    })

    .finally(() => {
      busy.value = false
    })
}

const showDetailsMission = ref(false)

const openDetailsMission = () => {
  showDetailsMission.value = true
}
</script>

<style lang="scss" scoped>
  .point-circle {
    border-radius: 50%;
    background: #6e6b7b;
    width: 4px;
    height: 4px;
  }
</style>