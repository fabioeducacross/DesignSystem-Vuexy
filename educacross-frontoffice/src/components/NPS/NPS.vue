<template>
  <div class="px-2 pb-2">
    <div class="color-patternTwo text-center">
      <h3 class="title-one-nps">
        Qual é a probabilidade de você recomendar a {{ name }} para um amigo ou colega?
      </h3>
      <h3 class="title-two-nps">
        {{ NPSData.question }}
      </h3>
    </div>
    <form class="mt-2" @submit.prevent>
      <div class="color-patternTwo">
        <span class="will-recomend">Pouco provável</span>
      </div>
      <b-row class="container-number mt-2">
        <b-col cols="12" md="12" lg="6" class="d-flex align-items-center justify-content-around">
          <div
            v-for="(number, indexNumber) in [1, 2, 3, 4, 5]"
            :key="indexNumber"
            class="numbers"
            :class="[
              formNPS.rating === number
                ? 'border-selectedNumber'
                : number <= 6
                ? 'border-danger'
                : number >= 7 && number <= 8
                ? 'border-warning'
                : number >= 9
                ? 'border-success'
                : 'color-patternEighteen',
            ]"
            @click="chooseGrade(number)"
          >
            <span
              v-if="number <= 6"
              :class="[formNPS.rating === number ? 'text-primary' : 'text-danger']"
            >
              {{ number }}
            </span>
            <span
              v-if="number >= 7 && number <= 8"
              :class="[formNPS.rating === number ? 'text-primary' : 'text-warning']"
            >
              {{ number }}
            </span>
            <span
              v-if="number >= 9"
              :class="[formNPS.rating === number ? 'text-primary' : 'text-success']"
            >
              {{ number }}
            </span>
          </div>
        </b-col>
        <b-col cols="12" md="12" lg="6" class="d-flex align-items-center justify-content-around">
          <div
            v-for="(number, indexNumber) in [6, 7, 8, 9, 10]"
            :key="indexNumber"
            class="numbers"
            :class="[
              formNPS.rating === number
                ? 'border-selectedNumber'
                : number <= 6
                ? 'border-danger'
                : number >= 7 && number <= 8
                ? 'border-warning'
                : number >= 9
                ? 'border-success'
                : 'color-patternEighteen',
            ]"
            @click="chooseGrade(number)"
          >
            <span
              v-if="number <= 6"
              :class="[formNPS.rating === number ? 'text-primary' : 'text-danger']"
            >
              {{ number }}
            </span>
            <span
              v-if="number >= 7 && number <= 8"
              :class="[formNPS.rating === number ? 'text-primary' : 'text-warning']"
            >
              {{ number }}
            </span>
            <span
              v-if="number >= 9"
              :class="[formNPS.rating === number ? 'text-primary' : 'text-success']"
            >
              {{ number }}
            </span>
          </div>
        </b-col>
      </b-row>
      <div class="color-patternTwo text-right mb-1">
        <span class="will-recomend">Muito provável</span>
      </div>
      <div>
        <b-form-textarea
          id="textarea"
          v-model="formNPS.comment"
          class="mb-1"
          placeholder="Deixe seu comentário (opcional)"
          rows="5"
          max-rows="6"
          :disabled="isTextareaDisabled"
        />
      </div>
      <b-row class="mb-1">
        <b-col>
          <span
            class="font-bold text-primary cursor-pointer"
            @click="submitFormNPS('dontShowAgain')"
            >Não aparecer novamente</span
          >
        </b-col>
      </b-row>
      <b-row align-h="end">
        <b-col cols="12" md="12" lg="4" xl="3">
          <b-button
            id="button-loading-dontShowAgainNPS"
            ref="loadableButtonDontShowAgainNPS"
            variant="outline-primary"
            type="border"
            class="w-100 mb-1 mb-sm-1"
            :disabled="disabledButton"
            @click="showLater(NPSData.id)"
          >
            <div class="d-flex align-items-center justify-content-center gap-2">
              <b-spinner v-if="loadingDontShowAgainNPS" small />
              <span>Responder depois</span>
            </div>
          </b-button>
        </b-col>
        <b-col cols="12" md="12" lg="4" xl="3">
          <b-button
            ref="loadableButtonSubmitNPsS"
            variant="primary"
            type="filled"
            class="w-100"
            :disabled="!hasSelectedRating || disabledButton"
            @click="submitFormNPS('submit')"
          >
            <div class="d-flex align-items-center justify-content-center gap-2">
              <b-spinner v-if="loadingSubmitNPS" small />
              <span>Enviar</span>
            </div>
          </b-button>
        </b-col>
      </b-row>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { postNps } from '@/services/shared/NPS/Nps.Service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import store from '@/store'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton } from 'bootstrap-vue'

// Props
const props = defineProps({
  isTeacher: { default: true },
  NPSData: { type: Object, default: () => ({}) },
  index: { type: Number, required: true },
})

// Emits
const emit = defineEmits(['close'])

// State
const formNPS = ref({
  id: 0,
  rating: null,
  comment: '',
})
const isTextareaDisabled = ref(true)
const disabledButton = ref(false)
const loadingDontShowAgainNPS = ref(false)
const loadingSubmitNPS = ref(false)

const name = getWhitelabelConfig('Name')

// Computed
const hasSelectedRating = computed(() => !!formNPS.value.rating)

// Lifecycle
onMounted(() => {
  formNPS.value.id = props.NPSData.id
})

// Methods
const closeNPS = () => {
  emit('close', props.index)
}

const showLater = npsId => {
  const npsSessionStorage = []
  const userId = store.getters.accessUserData.UserId
  const role = store.getters.accessRole
  const institutionId = store.getters.getInstitutionId

  const npsInfo = {
    userId,
    role,
    institutionId,
    showNPS: false,
    npsId,
  }
  const npsSessionStorageData = sessionStorage.getItem('npsSessionStorage')

  if (npsSessionStorageData) {
    const npsData = JSON.parse(npsSessionStorageData)
    npsData.push(npsInfo)
    sessionStorage.setItem('npsSessionStorage', JSON.stringify(npsData))
  } else {
    npsSessionStorage.push(npsInfo)
    sessionStorage.setItem('npsSessionStorage', JSON.stringify(npsSessionStorage))
  }
  closeNPS()
}

const chooseGrade = number => {
  if (formNPS.value.rating === number) {
    formNPS.value.rating = null
    formNPS.value.comment = ''
    isTextareaDisabled.value = true
  } else {
    formNPS.value.rating = number
    isTextareaDisabled.value = false
  }
}

const submitFormNPS = whichButton => {
  disabledButton.value = true
  if (whichButton === 'dontShowAgain') {
    loadingDontShowAgainNPS.value = true
  } else if (whichButton === 'submit') {
    loadingSubmitNPS.value = true
  }
  const arrFormNPS = [formNPS.value]
  postNps(arrFormNPS)
    .then(() => {
      disabledButton.value = false
      if (whichButton === 'dontShowAgain') {
        loadingDontShowAgainNPS.value = false
      } else if (whichButton === 'submit') {
        loadingSubmitNPS.value = false
        // show toast
        if (typeof window.$toast === 'function') {
          window.$toast({
            component: Toast,
            props: {
              text: 'Obrigado pela sua avaliação',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          })
        }
      }
      closeNPS()
    })
    .catch(() => {
      if (typeof window.$toast === 'function') {
        window.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: 'Erro ao enviar avaliação',
            variant: 'danger',
          },
        })
      }
      disabledButton.value = false
      if (whichButton === 'dontShowAgain') {
        loadingDontShowAgainNPS.value = false
      } else if (whichButton === 'submit') {
        loadingSubmitNPS.value = false
      }
    })
}
</script>

<style lang="scss" scoped>
  .title-one-nps {
    font-weight: 500;
    font-size: 21px;
    line-height: 25px;
  }

  .title-two-nps {
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
  }

  .subtitle-nps {
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
  }

  .will-recomend {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
  }

  .buttonNPS-box {
    display: flex;
    justify-content: space-between;
    button {
      width: 17rem;
      padding: 1rem 2rem !important;
    }
    div {
      display: flex;
      align-items: center;
    }

    @media (max-width: 1200px) {
      flex-direction: column;

      button {
        width: 100%;
      }
      div {
        flex-direction: column-reverse;
        text-align: center;
      }
    }
  }

  .container-number {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .numbers {
      font-weight: bold;
      font-size: 32px;
      line-height: 38px;
      width: fit-content;
      border-radius: 8px;
      border: 4px solid #c4c4c4;
      cursor: pointer;
      width: 62px;
      height: 78px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0.5rem 1rem 0.5rem;
    }
    .border-selectedNumber {
      border: 2px solid rgba(var(--primary), 1);
    }
  }
</style>