<template>
  <div>
    <div class="container-guideFeedbackConfirmation">
      <div class="d-flex flex-col flex-wrap items-center text-center">
        <img
          src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-success.png"
          class="img-feedback"
          alt="belinha"
        />
        <template v-if="guideObj.guideType === 'customMission'">
          <div v-if="!missionSendedLink">
            <p class="title-guideFeedbackConfirmation color-patternTwo">
              Missão criada com sucesso
            </p>
            <p class="text-guideFeedbackConfirmation color-patternThree mt-4">
              Deseja enviar a missão agora? <br />
              Após o envio e o início do período de duração, não será mais possível apagar ou editar
              esta missão.
            </p>
            <p class="textGuideDescription-guideFeedbackConfirmation color-patternThree mt-6">
              <span>
                Nome: <b>{{ guideObj.name }}</b>
              </span>
              <br />
              <span>
                Duração:
                <b
                  >{{ guideObj.start | formattedDate }} -
                  {{ guideObj.expiration | formattedDate }}</b
                >
              </span>
            </p>
            <div class="boxButton-guideFeedback">
              <b-button
                class="button-left-guideFeedback"
                color="#828282"
                type="border"
                @click="closeGuideFeedbackConfirmation()"
              >
                Não, vou enviar depois
              </b-button>
              <b-button
                id="button-loading-enableCustomGuide"
                ref="loadableButtonEnableGuide"
                class="button-right-guideFeedback"
                color="primary"
                type="filled"
                :disabled="loadingButton"
                @click="enableCustomGuide()"
              >
                <b-spinner v-show="loadingButton" small variant="white" />
                Sim, desejo enviar
              </b-button>
            </div>
          </div>
          <div v-else class="w-full">
            <p class="title-guideFeedbackConfirmation">Missão enviada com sucesso</p>
            <div v-if="missionLink" class="w-full flex justify-center mt-10">
              <div class="xl:w-7/12 w-full">
                <read-only-input-with-clipboard
                  input-label="Link da missão"
                  :input-data="missionLink"
                />
              </div>
            </div>
            <div class="boxButton-guideFeedback">
              <b-button
                id="button-loading-enableCustomGuide"
                ref="loadableButtonEnableGuide"
                class="button-right-guideFeedback"
                color="primary"
                type="filled"
                :href="missionLink"
                icon-pack="feather"
                icon="icon-play-circle"
              >
                Jogar missão
              </b-button>
            </div>
          </div>
        </template>
        <template v-else-if="guideObj.guideType === 'highfive'">
          <p class="title-guideFeedbackConfirmation color-patternTwo">
            {{ guideObj.isEnableOrDisable }} Script
          </p>
          <p class="text-guideFeedbackConfirmation color-patternThree mt-4">
            Are you sure you want to {{ guideObj.isEnableOrDisable }} the HighFive Script '{{
              guideObj.name
            }}'?
          </p>
          <div class="boxButton-guideFeedback">
            <b-button
              class="button-left-guideFeedback"
              color="#828282"
              type="border"
              @click="closeGuideFeedbackConfirmation()"
            >
              No
            </b-button>
            <b-button
              id="button-loading-enableOrDisableHighfive"
              ref="loadableButtonEnableOrDisableHighfive"
              class="button-right-guideFeedback"
              color="primary"
              type="filled"
              :disabled="loadingButton"
              @click="enableOrDisableHighfive()"
            >
              <b-spinner v-if="loadingButton" small />

              Yes
            </b-button>
          </div>
        </template>
        <template
          v-else-if="
            guideObj.guideType === 'book' ||
            guideObj.guideType === 'educacross' ||
            guideObj.guideType === 'shared' ||
            guideObj.guideType === 'inclusion'
          "
        >
          <p class="title-guideFeedbackConfirmation color-patternTwo">Utilizar missão</p>
          <p class="text-guideFeedbackConfirmation color-patternThree mt-4">
            Você realmente deseja utilizar a missão '{{ guideObj.name }}'?
          </p>
          <div class="boxButton-guideFeedback">
            <b-button
              class="button-left-guideFeedback"
              variant="outline-primary"
              type="border"
              @click="closeGuideFeedbackConfirmation()"
            >
              Não
            </b-button>
            <b-button
              id="button-loading-createPreparedGuide"
              ref="loadableButtonCreatePreparedGuide"
              class="button-right-guideFeedback"
              variant="primary"
              type="filled"
              :disabled="loadingButton"
              @click="createPreparedGuide()"
            >
              <b-spinner v-if="loadingButton" small />

              Sim
            </b-button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import ReadOnlyInputWithClipboard from '../components/ReadOnlyInputWithClipboard.vue'
import {
  cloneEducacrossGuide,
  cloneInclusionGuide,
  cloneSharedGuide,
  createGuideBook,
  enableGuide,
  enableHighfiveGuide,
} from '@/services/teacher-context/guides/Guides.Service'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton } from 'bootstrap-vue'

// Expose props
const props = defineProps({
  guideObj: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits([
  'close-guideFeedbackConfirmation',
  'close-guideFeedbackConfirmationWithAtt',
])

// Filter for formattedDate
import { formattedDate } from '@/filters/filters'

// BootstrapVue automatically registers most components
// but below is needed so <b-button> etc. works in <script setup>

const loadingButton = ref(false)
const missionSendedLink = ref(false)
const missionLink = ref('')

const { classe, subject } = useFilters()

// Access to global properties: $toast, $utilTeacherService, $router
const app = getCurrentInstance().appContext.config.globalProperties

// Filters for template
const formattedDateFilter = (date) => {
  return formattedDate(date)
}

// Register filters for template (Composition API limitation: can't use filters directly, so use method workaround)
if (!getCurrentInstance().proxy.$options.filters) {
  getCurrentInstance().proxy.$options.filters = {}
}
getCurrentInstance().proxy.$options.filters.formattedDate = formattedDateFilter

function closeGuideFeedbackConfirmation() {
  emit('close-guideFeedbackConfirmation')
}

function enableCustomGuide() {
  loadingButton.value = true

  enableGuide(props.guideObj.id, { subject: subject.value.id })
    .then(response => {
      missionLink.value =
        import.meta.env.VITE_APP_DEEPLINK_URL + response.data.guideLinkUrl
      missionSendedLink.value = true
      loadingButton.value = false
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = app.$utilTeacherService.handleFormatErrors(errors)
      errorsArray.message.forEach(elementError => {
        app.$toast({
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

function enableOrDisableHighfive() {
  loadingButton.value = true

  const payload = {
    classId: classe.value.ClassId,
    subjectId: subject.value.id,
  }

  enableHighfiveGuide(props.guideObj.id, payload)
    .then(({ data }) => {
      app.$toast({
        component: Toast,
        props: {
          text: `High Five ${
            props.guideObj.isEnableOrDisable === 'Enable' ? 'enabled' : 'disabled'
          } with success!`,
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })

      data.referenceId = props.guideObj.id
      emit('close-guideFeedbackConfirmationWithAtt', data)

      loadingButton.value = false
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = app.$utilTeacherService.handleFormatErrors(errors)
      errorsArray.message.forEach(elementError => {
        app.$toast({
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

async function createPreparedGuide() {
  loadingButton.value = true

  const routePathCustomMission = '/teacher/custom-mission/'
  const classObj = {
    classId: classe.value.ClassId,
  }

  if (props.guideObj.guideType === 'book') {
    await createGuideBook(props.guideObj.id, classe.value.ClassId)
      .then(response => {
        app.$router.push(routePathCustomMission + response.data.id)
      })
      .catch(error => {
        const { errors } = error.response.data
        const errorsArray = app.$utilTeacherService.handleFormatErrors(errors)
        errorsArray.message.forEach(elementError => {
          app.$toast({
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
  } else if (props.guideObj.guideType === 'educacross') {
    await cloneEducacrossGuide(props.guideObj.id, classObj)
      .then(({ data }) => {
        app.$router.push(routePathCustomMission + data.id)
      })
      .catch(error => {
        const { errors } = error.response.data
        const errorsArray = app.$utilTeacherService.handleFormatErrors(errors)
        errorsArray.message.forEach(elementError => {
          app.$toast({
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
  } else if (props.guideObj.guideType === 'inclusion') {
    await cloneInclusionGuide(props.guideObj.id, classe.value.ClassId)
      .then(response => {
        app.$router.push(routePathCustomMission + response.data.id)
      })
      .catch(error => {
        const { errors } = error.response.data
        const errorsArray = app.$utilTeacherService.handleFormatErrors(errors)
        errorsArray.message.forEach(elementError => {
          app.$toast({
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
  } else if (props.guideObj.guideType === 'shared') {
    if (props.guideObj.isCustoMissionPlus) {
    }

    await cloneSharedGuide(props.guideObj.id, {
      classId: classe.value.ClassId,
      subjectId: subject.value.id,
    })
      .then(response => {
        app.$router.push(
          (props.guideObj.isCustoMissionPlus
            ? '/teacher/missions-plus/create/'
            : routePathCustomMission) + response.data.guideId,
        )
      })
      .catch(error => {
        const { errors } = error.response.data
        const errorsArray = app.$utilTeacherService.handleFormatErrors(errors)
        errorsArray.message.forEach(elementError => {
          app.$toast({
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
  }
  loadingButton.value = false
}
</script>

<style lang="scss" scoped>
  .container-guideFeedbackConfirmation {
    padding: 1.2rem; //padding: 1.75rem
  }

  .title-guideFeedbackConfirmation {
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 36px;
    text-align: center;
    color: #5e5873;
    margin-top: 1.5rem;
  }

  .text-guideFeedbackConfirmation {
    font-size: 16px;
    line-height: 21px;
  }

  .textGuideDescription-guideFeedbackConfirmation {
    font-size: 18px;
    line-height: 21px;
  }

  .img-feedback {
    width: 246.66px;
    height: 226px;
  }

  .button-right-guideFeedback,
  .button-left-guideFeedback {
    width: 18rem;
    margin-bottom: 1rem;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.4px;
  }

  .button-left-guideFeedback {
    margin-right: 1rem;
  }

  .button-right-guideFeedback {
    margin-left: 1rem;
  }

  .boxButton-guideFeedback {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 1.25rem;
    width: 100%;
  }

  @media (max-width: 1056px) {
    .button-left-guideFeedback {
      margin-right: 1%;
    }

    .button-right-guideFeedback {
      margin-left: 1%;
    }
  }

  @media (max-width: 1024px) {
    .container-guideFeedbackConfirmation {
      padding: 0;
    }

    .button-right-guideFeedback {
      margin-left: 0;
    }

    .button-left-guideFeedback {
      margin-right: 0;
    }

    .button-left-guideFeedback,
    .button-right-guideFeedback {
      width: 100%;
    }
  }

  @media (max-width: 359px) {
    .img-feedback {
      width: 100%;
      height: auto;
    }
  }
</style>