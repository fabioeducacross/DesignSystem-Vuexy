<template>
  <div>
    <div class="flex justify-end">
      <b-button variant="link" :disabled="loadingButton" @click="closeWithAtt()">
        <span class="underline">
          <span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle">
            keyboard_backspace
          </span>
          Voltar
        </span>
      </b-button>
    </div>
    <b-overlay :show="loadingGetMissionDetails" opacity="1" rounded="md">
      <div v-if="!missionSendedLink" class="header">
        <h2 class="text-center modal-title">
          {{ sendGuide ? 'Deseja enviar missão?' : 'Missão criada com sucesso!' }}
        </h2>
        <h2 class="text-center mission-name">
          {{ guide.guideName }}
        </h2>
        <b-badge
          v-if="activeMissionType"
          pill
          :class="`modal-tag ${activeMissionType === 2 ? 'bg-coletiva' : 'bg-individual'}`"
          :v-bind="activeMissionType"
        >
          <div class="d-flex align-items-center">
            <activity-icon :type="activeMissionType" color="#fff" :size="12" class="mr-50" />
            {{ $utilTeacherService.activityType.formatText(activeMissionType) }}
          </div>
        </b-badge>

        <p class="text-center modal-desc">
          Após o envio e o início do período de duração, não será possível apagar ou editar esta
          missão.
        </p>

        <div class="modal-buttons">
          <b-button
            ref="loadableButtonarchiveMission"
            class="button-left"
            variant="outline-primary"
            type="border"
            :disabled="loadingButton"
            @click="closeFeedbackCreateMission()"
          >
            {{ sendGuide ? 'Agora não' : 'Enviar missão depois' }}
          </b-button>
          <b-button
            variant="primary"
            class="button-right"
            type="filled"
            :disabled="loadingButton"
            @click="sendGuide ? enableAndSendGuide() : enableCustomGuide()"
          >
            <b-spinner v-show="loadingButton" small variant="white" />
            {{ sendGuide ? 'Sim, desejo' : 'Enviar missão agora' }}
          </b-button>
        </div>
      </div>
    </b-overlay>

    <div v-if="!missionSendedLink" class="hr" />

    <!-- Content -->

    <div v-if="!missionSendedLink" class="content">
      <b-overlay :show="loadingGetMissionDetails" opacity="1" rounded="sm">
        <div class="mission-visualization">
          <h2 class="text-center title">Prévia da Missão</h2>
          <div class="mission-activities">
            <span
              class="material-symbols-outlined cursor-pointer"
              :class="{ 'chevron-icon-disabled cursor-not-allowed': disableChevronLeft }"
              @click="changeSelectedActivityByChevron('back')"
            >
              arrow_back_ios
            </span>
            <div
              v-for="(activity, indexActivity) in formatedMission"
              :key="indexActivity"
              :class="{ 'activity-selected': activity.selected }"
            >
              <img
                :src="activity.imageUrl"
                alt="activity"
                @click="changeSelectedActivityByImg(activity)"
              />
            </div>

            <span
              class="material-symbols-outlined cursor-pointer"
              :class="{ 'chevron-icon-disabled cursor-not-allowed': disableChevronRight }"
              @click="changeSelectedActivityByChevron('advance')"
            >
              arrow_forward_ios
            </span>
          </div>
          <b-badge
            v-if="activeMissionType"
            pill
            :class="`modal-tag ${activeMissionType === 2 ? 'bg-coletiva' : 'bg-individual'}`"
            :v-bind="activeMissionType"
          >
            <div class="d-flex align-items-center">
              <activity-icon :type="activeMissionType" color="#fff" :size="12" class="mr-50" />
              {{ $utilTeacherService.activityType.formatText(activeMissionType) }}
            </div>
          </b-badge>

          <div v-if="activeMissionType === 2" class="tablet-container">
            <img
              src="@/assets/images/teacher-context/school-context/devices/iPad.png"
              alt="tablet"
            />
            <img :src="teacherImageToShow" alt="teacherImg" />
          </div>
          <h3 v-if="activeMissionType === 2" class="modal-vision">Visão do Professor</h3>

          <div class="phone-container">
            <img
              src="@/assets/images/teacher-context/school-context/devices/iPhone.png"
              alt="phone"
            />
            <img :src="studentImageToShow" alt="studentImg" />
          </div>
          <h3 class="modal-vision">Visão do Aluno</h3>
        </div>
      </b-overlay>

      <div class="wr d-none d-lg-flex" />
      <div class="mission-details">
        <b-overlay :show="loadingGetMissionDetails" opacity="1" rounded="sm" class="max-w-50">
          <h2 class="title">Detalhes da missão</h2>
          <div class="detail">
            <p class="label">Turma:</p>
            <p class="info">
              {{ guide.classes ? toStringInfo(guide.classes) : null }}
            </p>
          </div>
          <div class="detail">
            <p class="label">Alunos:</p>
            <p
              v-if="guide.students && guide.students.length != 0 < guide.students.length"
              class="info"
            >
              {{ guide.students ? toStringInfo(guide.students) : 'Todos os alunos' }}
            </p>

            <p v-else class="info">Todos os alunos</p>
          </div>
          <div class="detail">
            <p class="label">Duração:</p>
            <p class="info">{{ guide.startDate }} - {{ guide.endDate }}</p>
          </div>
          <div v-if="!$utilTeacherService.subjects.isMultiliteracy(subjectId)" class="detail">
            <p class="label">
              Ranking da missão:
              <span class="info">{{ guide.rankingEnabled ? 'Habilitado' : 'Desabilitado' }}</span>
            </p>
          </div>
        </b-overlay>
      </div>
    </div>

    <div v-else>
      <b-overlay :show="loadingGetMissionDetails" opacity="1" rounded="sm">
        <div class="d-flex flex-col justify-center text-center mt-32">
          <div>
            <img
              src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-success.png"
              class="img-feedback"
              alt="belinha"
            />
          </div>
          <p class="title-sendGuideMissionLink color-patternTwo">Missão enviada com sucesso</p>
          <div class="w-full d-flex justify-center mt-10">
            <div class="lg:w-5/12 w-full">
              <read-only-input-with-clipboard
                input-label="Link da missão"
                :input-data="missionLink"
              />
            </div>
          </div>
          <div class="boxButton-sendGuideMissionLink">
            <b-button
              id="button-loading-enableCustomGuide"
              ref="loadableButtonEnableGuide"
              class="button-right-sendGuideMissionLink lg:w-2/12 md:w-4/12 sm:w-4/12 w-full"
              variant="primary"
              @click="closeWithAtt()"
            >
              Ok
            </b-button>
          </div>
        </div>
      </b-overlay>
    </div>
    <b-modal
      ref="activityDetail"
      v-model="activePromptActivityDetail"
      size="xl"
      hide-footer
      header-class="bg-white"
      scrollable
      no-close-on-backdrop
      no-close-on-esc
      static
      @close="activePromptActivityDetail = false"
    >
      <activity-detail
        v-if="activePromptActivityDetail"
        :activity-id="selectedActivityId"
        @close-activityDetail="closeActivityDetail()"
      />
    </b-modal>
  </div>
</template>

<script setup>
import ActivityIcon from '../components/ActivityIcon.vue'
import ReadOnlyInputWithClipboard from '../components/ReadOnlyInputWithClipboard.vue'
import ActivityDetail from './ActivityDetail.vue'
import {
  enableGuide,
  getAutenticateGuide,
  getGuideDetails,
} from '@/services/teacher-context/guides/Guides.Service'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton } from 'bootstrap-vue'

const emit = defineEmits([
  'close-feedbackCreateMissionWithAtt',
  'close-feedbackCreateMission',
])

const props = defineProps({
  id: { type: Number, required: true },
  sendGuide: { type: Boolean, required: false },
})

const { classe, subject } = useFilters()

import { ref, reactive, computed, onMounted } from 'vue'

const mission = ref([
  {
    imageUrl: '',
    selected: false,
    studentViewImageUrl: '',
    teacherViewImageUrl: '',
  },
])
const missionGuideLink = ref('')
const teacherImageToShow = ref('')
const studentImageToShow = ref('')
const steps = ref([])
const matchMedia = window.matchMedia('(max-width:500px)')
const isMobileScreen = ref(false)

const loadingButton = ref(false)
const activeMissionType = ref(null)
const missionData = ref({})
const subjectId = ref(subject.value.id)
const guide = ref({})
const activePromptActivityDetail = ref(false)
const missionSendedLink = ref(false)
const selectedActivityId = ref(0)
const loadingGetMissionDetails = ref(false)
const missionLink = ref('')

const formatedMission = computed(() => {
  const aux = []
  if (mission.value.length >= 3 || isMobileScreen.value) {
    if (mission.value.length >= 3 && !isMobileScreen.value) {
      mission.value.forEach((el, i) => {
        // retornar no máximo 3 e em telas maiores que 500px
        if (el.selected) {
          if (i !== 0 && i !== mission.value.length - 1) {
            // atividade selecionada no meio
            aux.push(mission.value[i - 1], el, mission.value[i + 1])
          } else if (i === 0) {
            // atividade selecionada no início
            aux.push(el, mission.value[i + 1], mission.value[i + 2])
          } else if (i === mission.value.length - 1) {
            // atividade seleciona no fim
            aux.push(mission.value[i - 2], mission.value[i - 1], el)
          }
        }
      })
    } else if (isMobileScreen.value) {
      // mostrar apenas 1 na visão mobile
      mission.value.forEach(el => {
        if (el.selected) {
          aux.push(el)
        }
      })
    }
    return aux
  }
  // mostrar menos de 3 elementos no desktop

  return mission.value
})

const disableChevronLeft = computed(() => mission.value[0]?.selected)
const disableChevronRight = computed(() =>
  mission.value[mission.value.length - 1]?.selected
)

// --- Methods ---

function enableAndSendGuide() {
  loadingButton.value = true

  enableGuide(props.id, {
    subject: subject.value.id,
  })
    .then(response => {
      missionLink.value =
        import.meta.env.VITE_APP_DEEPLINK_URL + response.data.guideLinkUrl
      missionSendedLink.value = true
      loadingButton.value = false
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = window.$utilTeacherService.handleFormatErrors(errors)
      errorsArray.message.forEach(elementError => {
        window.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
      loadingButton.value = false
    })
}

function openActivityDetail(activityId) {
  selectedActivityId.value = activityId
  activePromptActivityDetail.value = true
}

function closeActivityDetail() {
  activePromptActivityDetail.value = false
  setTimeout(() => {
    document.getElementById('body').style.overflowY = 'hidden'
  }, 1)
}

function closeWithAtt() {
  emit('close-feedbackCreateMissionWithAtt')
}

function toStringInfo(array) {
  const string = array.map(item => item).toString()
  return `${string.replaceAll(',', ', ')}.`
}

function toStringDate(date) {
  return date.toLocaleDateString()
}

function close() {
  emit('close-feedbackCreateMission')
}

function enableCustomGuide() {
  loadingButton.value = true

  enableGuide(props.id, {
    subject: subject.value.id,
  })
    .then(response => {
      missionLink.value =
        import.meta.env.VITE_APP_DEEPLINK_URL + response.data.guideLinkUrl
      missionSendedLink.value = true
      loadingButton.value = false

      close()
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = window.$utilTeacherService.handleFormatErrors(errors)
      errorsArray.message.forEach(elementError => {
        window.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
      loadingButton.value = false

      close()
    })
}

function closeFeedbackCreateMission() {
  emit('close-feedbackCreateMission')
}

async function getMissionDetails() {
  loadingGetMissionDetails.value = true
  getGuideDetails(props.id)
    .then(({ data }) => {
      data.activities.forEach((element, index) => {
        if (index === 0) {
          element.selected = true
          putHelpImagesToShow(element)
        } else {
          element.selected = false
        }
      })
      mission.value = data.activities
      guide.value = data
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = window.$utilTeacherService.handleFormatErrors(errors)
      errorsArray.message.forEach(elementError => {
        window.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
    .finally(() => {
      loadingGetMissionDetails.value = false
    })
}

async function getCollectiveGuideResumeGuideLink() {
  loadingButton.value = true

  await getAutenticateGuide(guide.value.id, classe.value.ClassId)
    .then(({ data }) => {
      missionGuideLink.value =
        import.meta.env.VITE_APP_DEEPLINK_URL + data.guideLinkUrl
      loadingButton.value = false
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = window.$utilTeacherService.handleFormatErrors(errors)
      errorsArray.message.forEach(elementError => {
        window.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
        loadingButton.value = false
      })
    })
}

function changeSelectedActivityByImg(activity) {
  mission.value = mission.value.map(el => {
    el.selected = false
    return el
  })
  activity.selected = true
  putHelpImagesToShow(activity)
}

function changeSelectedActivityByChevron(direction) {
  const sign = direction === 'back' ? -1 : 1
  let indexSelectedActivity = 0
  indexSelectedActivity = mission.value.findIndex(el => el.selected)

  const selectNextOrPreviousActivity = index => {
    mission.value[index].selected = !mission.value[index].selected

    mission.value[index + sign].selected =
      !mission.value[index + sign].selected

    putHelpImagesToShow(mission.value[index + sign])
  }

  if (
    indexSelectedActivity !== 0 &&
    indexSelectedActivity < mission.value.length - 1
  ) {
    selectNextOrPreviousActivity(indexSelectedActivity)
  } else if (
    indexSelectedActivity === 0 &&
    direction === 'advance' &&
    mission.value.length > 1
  ) {
    selectNextOrPreviousActivity(indexSelectedActivity)
  } else if (
    indexSelectedActivity === mission.value.length - 1 &&
    direction === 'back' &&
    mission.value.length > 1
  ) {
    selectNextOrPreviousActivity(indexSelectedActivity)
  }
}

function putHelpImagesToShow(element) {
  teacherImageToShow.value = element.teacherViewImageUrl
  studentImageToShow.value = element.studentViewImageUrl
  activeMissionType.value = element.type
}

async function deepLinkAndToken() {
  await getCollectiveGuideResumeGuideLink()
  window.open(missionGuideLink.value, '_blank')
}

onMounted(async () => {
  if (window.innerWidth <= 500) isMobileScreen.value = true
  if (matchMedia.addEventListener) {
    matchMedia.addEventListener('change', media => {
      if (media.matches) {
        isMobileScreen.value = true
      } else {
        isMobileScreen.value = false
      }
    })
  }

  await getMissionDetails()
})
</script>

<style lang="scss" scoped>
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;

    .modal-title {
      font-weight: 600;
      font-size: 28px;
      line-height: 34px;

      color: #5e5873;
    }

    .mission-name {
      font-weight: 500;
      font-size: 28px;
      line-height: 36px;

      color: #7367f0;

      margin-top: 20px;
    }

    .modal-tag {
      margin-top: 8px;
    }

    .modal-desc {
      font-weight: 600;
      font-size: 15px;
      line-height: 24px;

      color: #5e5873;

      margin-top: 14px;
    }

    .modal-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 3rem;
    }
  }

  .button-right,
  .button-left {
    width: 17rem;
    margin-bottom: 1rem;
  }

  .button-left {
    margin-right: 1rem;

    @media (max-width: 1056px) {
      margin-right: 1%;
    }
  }

  .button-right {
    margin-left: 1rem;

    @media (max-width: 1056px) {
      margin-left: 0;
    }
  }

  @media (max-width: 991px) {
    .button-right {
      margin-left: 0;
    }

    .button-left {
      margin-right: 0;
    }

    .button-left,
    .button-right {
      width: 100%;
    }

    .content {
      flex-direction: column;
    }

    .mission-visualization {
      max-width: 100%;
    }

    .mission-details {
      max-width: 100%;
    }
  }

  .content {
    display: flex;
    flex-direction: row;
    margin-left: 0;

    @media (max-width: 991px) {
      flex-direction: column;
    }

    margin-bottom: 50px;

    .mission-visualization {
      display: flex;
      flex-direction: column;
      align-items: center;

      @media (max-width: 991px) {
        max-width: 100%;
      }

      flex: 1;
      margin-left: 1rem;
      margin-right: 1rem;

      .title {
        font-weight: 500;
        font-size: 28px;
        line-height: 36px;

        color: #7367f0;
      }

      .mission-activities {
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        > div {
          padding: 6px;
          border-radius: 5px;
          border: 2px solid transparent;
          margin-top: 24px;

          &.activity-selected {
            border: 2px solid rgba(var(--primary), 1);
          }

          &.activity-selected-individual {
            border: 2px solid rgba(#f26f21, 1);
          }

          img {
            cursor: pointer;
            width: 100px;
          }
        }

        .chevron-icon {
          align-self: center;
          font-size: 24px;
          cursor: pointer;
        }

        .chevron-icon-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .modal-tag {
        margin-top: 25px;
      }

      .modal-vision {
        font-weight: 600;
        font-size: 15px;
        line-height: 24px;

        color: #5e5873;
      }
    }

    .mission-details {
      max-width: 50%;
      @media (max-width: 991px) {
        max-width: 100%;
      }

      .title {
        font-weight: 500;
        font-size: 28px;
        line-height: 36px;

        color: #7367f0;
      }

      .detail {
        margin-top: 1rem;
        //display: flex;
        flex-direction: column;
        border-radius: 10px;
        padding: 16px;
        border: 1px solid #e2e2e3;

        .label {
          font-weight: 500;
          font-size: 16px;
          line-height: 32px;

          color: #5e5873;
        }

        .info {
          font-weight: 500;
          font-size: 16px;
          line-height: 32px;
          color: #7367f0;
        }
      }
    }
  }

  .bg-individual {
    background: #fd7e14 !important;
    color: #fff !important;
  }

  .bg-coletiva {
    background: #7367f0 !important;
    color: #fff !important;
  }

  .hr {
    border: 0;
    height: 1px;
    background: #e2e2e3;

    margin-top: 2.25rem;
    margin-bottom: 2.25rem;
  }

  .wr {
    border: 0;
    width: 1px;
    background: #e2e2e3;

    margin: 2.25rem;
  }

  @mixin deviceContainer($width, $top, $left) {
    position: relative;
    top: 0;
    left: 0;

    img:first-child {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
    }

    img:last-child {
      position: absolute;
      width: $width;
      top: $top;
      left: $left;
    }
  }

  .tablet-container {
    @include deviceContainer(83%, 17.4%, 8.6%);
  }

  .phone-container {
    @include deviceContainer(71%, 11%, 14.5%);
  }

  .container-back {
    position: relative;
    top: 2rem;
    padding-right: 1.5rem;

    @media (max-width: 1024px) {
      padding-right: 0;
    }
  }

  .img-feedback {
    width: 246.66px;
    height: 226px;
  }

  @media (max-width: 359px) {
    .img-feedback {
      width: 100%;
      height: auto;
    }
  }

  .title-sendGuideMissionLink {
    font-weight: 600;
    font-size: 34px;
    line-height: 38px;
  }

  .boxButton-sendGuideMissionLink {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    .return-button {
      position: inherit;
      margin: 1rem 0;
    }
  }
</style>