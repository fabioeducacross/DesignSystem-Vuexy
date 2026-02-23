<template>
  <AuthLayout>
    <template v-slot:image>
      <b-img src="@/assets/images/pages/login/LogoLogin.svg" class="mx-auto mb-3" />
      <div v-if="!isFeedbackValidEmail">
        <h1 class="text-center color-grayTheme">Código de validação enviado!</h1>
        <p class="text-center">
          O cadastro está quase pronto, insira o código enviado para finalizar. Não recebeu?
          Verifique sua caixa de entrada e spam.
        </p>
      </div>
      <div v-else>
        <h1 class="text-center">Pronto!</h1>
        <p class="text-center">
          Agora, é só acessar sua nova conta Educacross e ver os acessos disponíveis para você.
        </p>
      </div>
    </template>
    <div>
      <div v-if="!isFeedbackValidEmail">
        <p>
          Insira o código de 6 dígitos que enviamos para <br /><span class="font-bold text-primary"
            >{{ userDataEmail }}.</span
          >
        </p>
        <form @submit.prevent="submitFormValidateEmail">
          <div class="flex justify-content-between input-container gap-3 mb-1">
            <b-form-input
              v-for="(input, index) in inputs"
              :key="index"
              :ref="setInputRef(index)"
              v-model="inputs[index]"
              type="text"
              class="input-code-char flex-grow-1"
              maxlength="1"
              @keyup="handleKeyUp($event, index)"
              @paste.prevent="handlePaste($event, index)"
            />
          </div>

          <div class="mb-1">
            <b-button
              id="button-loading-validateEmail"
              ref="loadableButtonValidateEmail"
              block
              variant="primary"
              type="filled"
              :disabled="loadingButton"
              @click.prevent="submitFormValidateEmail"
            >
              Finalizar
              <b-spinner v-show="loadingButton" small variant="light" />
            </b-button>
          </div>

          <div class="mb-1">
            <p class="text-danger text-center">
              <span class="font-bold">Atenção:</span>
              {{ emailCodeTimer }}
            </p>
            <p class="text-center">
              <b-link
                v-if="!feedbackResendCode"
                class="font-bold text-info d-inline-flex align-items-center gap-2"
                :class="{ 'cursor-not-allowed': counting }"
                active-class
                @click="resendCodeToEmail"
              >
                <span class="material-symbols-outlined"> autorenew </span
                ><span class="underline">Reenviar código</span>
              </b-link>
              <span v-else class="font-bold text-info cursor-default">
                {{ feedbackResendCode }}
              </span>
            </p>
          </div>
        </form>
      </div>
      <div v-else>
        <div class="text-center">
          <span class="material-symbols-outlined modal-icon text-sucess display-2 text-success">
            check_circle
          </span>

          <h1 class="text-success mb-2">E-mail validado com sucesso!</h1>
          <router-link :to="{ name: 'loginAccessUpdate' }">
            <b-button
              block
              variant="primary"
              type="filled"
              class="mb-5 button-feedbackValidateEmail"
            >
              Fazer login
            </b-button>
          </router-link>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from './AuthLayout.vue'
import { loginUser } from '@/auth/utils'
import {
  postEmailValidationByCode,
  postResendEmailValidationCode,
} from '@/services/auth-context/login/Login.service'
import { BButton } from 'bootstrap-vue'
import store from '@/store'
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router/composables'

const MILLISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60

const loadingButton = ref(false)
const counting = ref(true)
const inputs = ref(Array(6).fill(''))
const feedbackResendCode = ref('')
const isFeedbackValidEmail = ref(false)
const hasUpdateToken = ref('')
const totalTime = ref(null)
const emailCodeTimer = ref(null)
const intervalEmailCodeTimer = ref(null)
const validationCodeExpiredTimeInMinutes = 10

const loadableButtonValidateEmail = ref(null)
const inputRefs = Array.from({ length: 6 }, () => ref(null))
function setInputRef(index) {
  return el => {
    inputRefs[index].value = el
  }
}

const router = useRouter()

const userDataEmail = computed(() => {
  return store.state.account.userData?.Email || ''
})

function countDownTimer() {
  if (!totalTime.value) {
    const currentTime = new Date()
    currentTime.setMinutes(currentTime.getMinutes() + validationCodeExpiredTimeInMinutes)
    totalTime.value = currentTime.getTime()
  }

  intervalEmailCodeTimer.value = setInterval(() => {
    const now = new Date().getTime()
    const difference = totalTime.value - now

    const totalMinutes = Math.floor(
      (difference % (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR)) /
        (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE),
    )
    const totalSeconds = Math.floor(
      (difference % (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE)) / MILLISECONDS_PER_SECOND,
    )

    const minuteLabel = totalMinutes === 1 ? 'minuto' : 'minutos'
    const secondLabel = totalSeconds === 1 ? 'segundo' : 'segundos'

    if (totalMinutes > 0 && totalSeconds > 0) {
      emailCodeTimer.value = `Código válido por ${totalMinutes} ${minuteLabel} e ${totalSeconds} ${secondLabel}`
    } else if (totalMinutes > 0 && totalSeconds === 0) {
      emailCodeTimer.value = `Código válido por ${totalMinutes} ${minuteLabel}`
    } else if (totalSeconds > 0) {
      emailCodeTimer.value = `Código válido por ${totalSeconds} ${secondLabel}`
    } else {
      emailCodeTimer.value = 'O tempo do código foi expirado! Clique em reenviar código.'
      counting.value = false
      clearInterval(intervalEmailCodeTimer.value)
    }
  }, MILLISECONDS_PER_SECOND)
}

function validateCodeChar(char) {
  const NumberRegex = /^\d+$/
  return NumberRegex.test(char)
}

function handleKeyUp(event, index) {
  if (!(event instanceof KeyboardEvent)) return

  const currentInput = event.currentTarget
  if (!(currentInput instanceof HTMLInputElement)) {
    return
  }

  if (event.key === 'Backspace') {
    currentInput.value = ''
    inputs.value[index] = ''
    if (index === 0) return

    nextTick(() => {
      inputRefs[index - 1].value?.focus()
    })
    return
  }

  if (!validateCodeChar(event.key)) {
    currentInput.value = ''
    inputs.value[index] = ''
    return
  }

  currentInput.value = event.key
  inputs.value[index] = event.key

  if (index === inputs.value.length - 1) return

  nextTick(() => {
    inputRefs[index + 1].value?.focus()
  })
}

function handlePaste(event, index) {
  const text = event.clipboardData.getData('text').substr(0, inputs.value.length - index)

  for (let i = 0; i < text.length; i++) {
    if (!validateCodeChar(text[i])) continue

    const targetIndex = index + i
    if (inputRefs[targetIndex] && inputRefs[targetIndex].value) {
      inputRefs[targetIndex].value.value = text[i]
      inputs.value[targetIndex] = text[i]
      if (i < text.length - 1) {
        inputRefs[targetIndex + 1]?.value?.focus()
      }
    }
  }
}

function resendCodeToEmail() {
  if (
    emailCodeTimer.value &&
    !emailCodeTimer.value.includes('minuto') &&
    !emailCodeTimer.value.includes('segundo')
  ) {
    const accountId =
      store.state.account.userData?.AccountId

    const payload = {
      accountId,
    }
    clearInterval(intervalEmailCodeTimer.value)
    feedbackResendCode.value = 'Enviando...'

    postResendEmailValidationCode(payload).then(() => {
      feedbackResendCode.value = 'Enviado com sucesso!'
      store.commit('totalCodeTimeValidateEmail', 0)
      countDownTimer()
      setTimeout(() => {
        feedbackResendCode.value = ''
      }, 4000)
    })
  }
}

async function submitFormValidateEmail() {
  loadingButton.value = true

  const payload = {
    accountId: store.state.teacherContext.accountId,
    code: inputs.value.join(''),
  }
  postEmailValidationByCode(payload)
    .then(async response => {
      store.state.accountId = ''
      store.commit('totalCodeTimeValidateEmail', 0)
      if (hasUpdateToken.value) {
        isFeedbackValidEmail.value = true
      } else {
        await loginUser(response.data.token, response.data.refreshToken).catch(err => {
          const name = err.message
          if (name) {
            router.push({ name })
          }
        })

        router.push({ name: 'managerAccount' })
      }
    })
    .finally(() => {
      loadingButton.value = false
    })
}

onMounted(() => {
  hasUpdateToken.value = store.state.access.token

  countDownTimer()

  if (
    !store.state.teacherContext.accountId &&
    !store.state.account.userData?.AccountId
  ) {
    router.push({ name: 'login' })
  }
})

onUnmounted(() => {
  if (intervalEmailCodeTimer.value) clearInterval(intervalEmailCodeTimer.value)
})
</script>

<style lang="scss" scoped>
  .input-code-char {
    padding: 0;
    text-align: center;
  }

  @media (min-width: 576px) {
    .input-code-char {
      height: 100px;

      font-size: 45px;
    }
  }
</style>