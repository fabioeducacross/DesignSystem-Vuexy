<template>
  <div>
    <div class="flex justify-end container-back">
      <div class="flex items-center cursor-pointer" @click="closeWithAtt()">
        <span class="material-symbols-outlined text-primary mr-2" style="font-size: 18px">
          keyboard_backspace
        </span>

        <span class="text-primary text-sendGuide underline">Voltar</span>
      </div>
    </div>
    <div v-if="!missionSendedLink" class="flex flex-col justify-center text-center mt-32">
      <p class="title-sendGuide color-patternTwo">Deseja enviar a missão para o aluno?</p>
      <p class="text-sendGuide color-patternTwo mt-8">
        Deseja realmente enviar a missão "<span class="font-bold">{{ guideDetail.guideName }}</span
        >" para seus alunos? Após a confirmação e data inicial
        <span class="text-danger font-bold">não será mais possível apagá-lo ou editá-lo.</span>
      </p>
      <p class="text-sendGuide color-patternTwo mt-12">Confira o resumo da sua missão:</p>
      <div class="mt-12">
        <p class="text-sendGuide color-patternTwo">
          <span class="font-bold">Fluxo da missão:</span>
          {{ guideDetail.sequential ? 'Sequencial' : 'Livre' }}
        </p>
        <p class="text-sendGuide color-patternTwo mt-2">
          <span class="font-bold">Data inicial:</span>
          {{ guideDetail.startDate }}
        </p>
        <p class="text-sendGuide color-patternTwo mt-2">
          <span class="font-bold">Data final:</span> {{ guideDetail.endDate }}
        </p>
      </div>
      <div>
        <div class="flex justify-center flex-wrap mt-12">
          <div
            v-for="(activity, indexActivity) in guideDetail.activities"
            :key="indexActivity"
            class="flex"
          >
            <img :src="activity.imageUrl" alt="activity" class="img-activity" />

            <span
              class="material-symbols-outlined"
              style="font-size: 21px"
              @click="openActivityDetail(activity.id)"
            >
              info
            </span>
          </div>
        </div>
        <div class="boxButton-shareOrDelete">
          <b-button
            class="button-left-shareOrDelete"
            color="#828282"
            type="border"
            @click="closeAndBackPage()"
          >
            Não
          </b-button>
          <b-button
            id="button-loading-shareGuide"
            ref="loadableButtonShareGuide"
            class="button-right-shareOrDelete"
            color="primary"
            type="filled"
            :disabled="loadingButton"
            @click="enableAndSendGuide()"
          >
            <b-spinner v-if="loadingButton" small />

            Sim, desejo
          </b-button>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col justify-center text-center mt-32">
      <div>
        <img
          src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-success.png"
          class="img-feedback"
          alt="belinha"
        />
      </div>
      <p class="title-sendGuideMissionLink color-patternTwo">Missão enviada com sucesso</p>
      <div class="w-full flex justify-center mt-10">
        <div class="lg:w-5/12 w-full">
          <read-only-input-with-clipboard input-label="Link da missão" :input-data="missionLink" />
        </div>
      </div>
      <div class="boxButton-sendGuideMissionLink">
        <b-button
          id="button-loading-enableCustomGuide"
          ref="loadableButtonEnableGuide"
          class="button-right-sendGuideMissionLink lg:w-2/12 md:w-4/12 sm:w-4/12 w-full"
          color="primary"
          type="filled"
          @click="closeWithAtt()"
        >
          Ok
        </b-button>
      </div>
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
import ReadOnlyInputWithClipboard from '../components/ReadOnlyInputWithClipboard.vue'
import ActivityDetail from './ActivityDetail.vue'
import { enableGuide, getGuideDetailsV1 } from '@/services/teacher-context/guides/Guides.Service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton } from 'bootstrap-vue'

const props = defineProps({
  guideId: { type: Number, default: 0 },
})

const emit = defineEmits(['close-sendGuide', 'close-sendGuideWithAtt'])

import store from '@/store'

const guideDetail = ref({})
const selectedActivityId = ref(0)
const activePromptActivityDetail = ref(false)
const loadingButton = ref(false)
const missionSendedLink = ref(false)
const missionLink = ref('')

const getGuideDetail = async (guideId) => {
  await getGuideDetailsV1(guideId)
    .then(response => {
      guideDetail.value = response.data
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
}

const enableAndSendGuide = () => {
  loadingButton.value = true
  enableGuide(props.guideId, {
    subject: store.getters['filters/subject']?.id,
  })
    .then(response => {
      missionLink.value = import.meta.env.VITE_APP_DEEPLINK_URL + response.data.guideLinkUrl
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

const closeWithAtt = () => {
  emit('close-sendGuideWithAtt')
}

const closeAndBackPage = () => {
  emit('close-sendGuide')
}

const openActivityDetail = (activityId) => {
  selectedActivityId.value = activityId
  activePromptActivityDetail.value = true
}

const closeActivityDetail = () => {
  activePromptActivityDetail.value = false
  setTimeout(() => {
    document.getElementById('body').style.overflowY = 'hidden'
  }, 1)
}

import { onMounted, onUnmounted } from 'vue'

onMounted(async () => {
  await getGuideDetail(props.guideId)
  document.getElementById('body').style.overflowY = 'hidden'
})

onUnmounted(() => {
  document.getElementById('body').style.overflowY = 'auto'
})
</script>

<style lang="scss" scoped>
  .title-sendGuide {
    font-weight: 600;
    font-size: 34px;
    line-height: 38px;
  }

  .text-sendGuide {
    font-size: 16px;
    line-height: 21px;
  }

  .container-back {
    position: relative;
    top: 2rem;
    padding-right: 1.5rem;
    @media (max-width: 1024px) {
      padding-right: 0;
    }
  }

  .img-activity {
    width: 100px;
    height: 100px;
    margin-bottom: 1.5rem;
  }

  .infoIcon-activity {
    position: relative;
    top: -0.95rem;
    right: 0.65rem;
    cursor: pointer;
  }

  .prompt-activityDetail {
    z-index: 9999999;
  }

  .boxButton-shareOrDelete {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 3rem;
  }

  .button-right-shareOrDelete,
  .button-left-shareOrDelete {
    width: 17rem;
    margin-bottom: 1rem;
  }

  .button-left-shareOrDelete {
    margin-right: 1rem;
    @media (max-width: 1056px) {
      margin-right: 1%;
    }
  }

  .button-right-shareOrDelete {
    margin-left: 1rem;
    @media (max-width: 1056px) {
      margin-left: 1%;
    }
  }

  @media (max-width: 991px) {
    .button-right-shareOrDelete {
      margin-left: 0;
    }

    .button-left-shareOrDelete {
      margin-right: 0;
    }

    .button-left-shareOrDelete,
    .button-right-shareOrDelete {
      width: 100%;
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

  .container-sendGuideMissionLink {
    padding: 1.2rem; //padding: 1.75rem
  }

  .title-sendGuideMissionLink {
    font-weight: 600;
    font-size: 34px;
    line-height: 38px;
  }

  .text-sendGuideMissionLink {
    font-size: 16px;
    line-height: 21px;
  }

  .textGuideDescription-sendGuideMissionLink {
    font-size: 18px;
    line-height: 21px;
  }

  .boxButton-sendGuideMissionLink {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;
    width: 100%;
  }

  @media (max-width: 1024px) {
    .container-sendGuideMissionLink {
      padding: 0;
    }
  }
</style>