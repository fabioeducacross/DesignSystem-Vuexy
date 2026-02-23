<template>
  <div>
    <intermediate-redirect-login-deep-link v-if="waitRedirectingToDeepLinkLogin" />

    <AuthLayout>
      <template v-slot:image>
        <b-img src="@/assets/images/pages/login/LogoLogin.svg" class="mx-auto mb-3" />
        <h1 class="text-center color-grayTheme">Senha temporária.</h1>
        <p class="text-center">Acesse sua conta {{ loginTitle }}.</p>
      </template>
      <div class="mb-2">
        <router-link
          :to="{ name: 'login' }"
          class="text-link-login d-flex align-items-center gap-2"
        >
          <span class="material-symbols-outlined"> arrow_back </span>
          <span class="underline">Voltar</span>
        </router-link>
      </div>
      <div>
        <ValidationObserver ref="formLogin">
          <form @submit.prevent="loginWithTempAccessKey()">
            <b-form-group>
              <validation-provider v-slot="{ errors }" name="E-mail" rules="required|email">
                <label for="email">E-mail*</label>
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : ''"
                >
                  <b-input-group-prepend is-text>
                    <span
                      class="material-symbols-outlined"
                      :class="errors.length > 0 ? 'text-danger' : ''"
                      style="font-size: 20px"
                    >
                      person
                    </span>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="formLogin.email"
                    name="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    :state="errors.length > 0 ? false : null"
                    @keydown="preventWhiteSpace($event)"
                    @keyup.enter="loginWithTempAccessKey()"
                  />
                </b-input-group>
                <small
                  v-if="errors.length"
                  class="text-danger d-flex align-items-center gap-1 mt-25"
                  ><span class="material-symbols-outlined" style="font-size: 16px"> warning </span>
                  {{ errors[0] }}</small
                >
              </validation-provider>
            </b-form-group>

            <b-form-group>
              <validation-provider v-slot="{ errors }" name="Senha" rules="required">
                <label for="password">Senha temporária*</label>
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : ''"
                >
                  <b-input-group-prepend is-text>
                    <span
                      class="material-symbols-outlined"
                      :class="errors.length > 0 ? 'text-danger' : ''"
                      style="font-size: 20px"
                    >
                      lock
                    </span>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="formLogin.accessKey"
                    :type="showPasswordText ? 'text' : 'password'"
                    name="password"
                    placeholder="Digite sua senha"
                    :state="errors.length > 0 ? false : null"
                  />
                  <b-input-group-append is-text>
                    <span
                      class="material-symbols-outlined cursor-pointer"
                      style="font-size: 20px"
                      @click="showPassword()"
                    >
                      {{ showPasswordText ? 'visibility' : 'visibility_off' }}
                    </span>
                  </b-input-group-append>
                </b-input-group>
                <small
                  v-if="errors.length"
                  class="text-danger d-flex align-items-center gap-1 mt-25"
                  ><span class="material-symbols-outlined" style="font-size: 16px"> warning </span>
                  {{ errors[0] }}</small
                >
              </validation-provider>
            </b-form-group>

            <p
              v-for="(msgError, indexMsgError) in feedbackGeneralError.message"
              :key="indexMsgError"
              class="text-login text-danger mt-1"
            >
              {{ msgError }}
            </p>
            <b-button
              id="button-loading-login"
              ref="loadableButtonLogin"
              variant="primary"
              class="w-100 mb-2"
              :disabled="loadingLogin"
              @click="loginWithTempAccessKey"
            >
              Acessar
              <b-spinner v-show="loadingLogin" small variant="light" />
            </b-button>
          </form>
        </ValidationObserver>
      </div>
    </AuthLayout>
  </div>
</template>

<script setup>
import AuthLayout from './AuthLayout.vue'
import { loginUser } from '@/auth/utils'
import { postLoginTempAccess } from '@/services/auth-context/login/Login.service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { required, email } from '@core/utils/validations/validations.js'
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

// Async component import pattern for intermediate-redirect-login-deep-link
const IntermediateRedirectLoginDeepLink = defineAsyncComponent(() =>
  import('./components/IntermediateRedirectLoginDeepLink.vue')
)

// Refs and reactive state
import { ref, reactive, computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import store from '@/store'
import { useRouter } from 'vue-router/composables'

const router = useRouter()

const formLogin = reactive({
  email: '',
  accessKey: '',
})
const showPasswordText = ref(false)
const feedbackGeneralError = reactive({
  status: 0,
  message: [],
})
const feedbackLoginError = reactive({
  status: 0,
  message: [],
})
const finishAccountUpdate = ref(false)
const redirectUri = ref('')
const accessCredentials = reactive({
  token: '',
  decodedToken: '',
})
const waitRedirectingToDeepLinkLogin = ref(false)
const loadingLogin = ref(false)

const formLoginRef = ref(null)
const loadableButtonLogin = ref(null)

// To simulate prop emailVerified as in original component (would be passed from parent/context if exists)
const props = defineProps({
  emailVerified: { type: String, default: '' }
})

onMounted(() => {
  // Pre-fill email if available
  if (props.emailVerified) {
    formLogin.email = props.emailVerified
  } else {
    formLogin.email = ''
  }
})

// Global error cleanup on unmounted
onUnmounted(() => {
  store.commit('UPDATE_GLOBAL_ERROR', {})
})

// Computed brand name
const loginTitle = computed(() => {
  return getWhitelabelConfig('name')
})

// Show/hide password
const showPassword = () => {
  showPasswordText.value = !showPasswordText.value
}

// Prevent whitespace on email input
const preventWhiteSpace = event => {
  const key = event.keyCode
  if (key === 32) event.preventDefault()
}

// Login logic
const loginWithTempAccessKey = () => {
  // Use ref to ValidationObserver to validate form
  formLoginRef.value.validate().then(success => {
    if (success) {
      loadingLogin.value = true
      postLoginTempAccess(formLogin)
        .then(response => {
          loginUser(response.data.accessToken, response.data.refreshToken)
            .then(() => {
              router.push({ name: 'home' })
            })
            .catch(err => {
              const name = err.message
              if (name) {
                router.push({ name: 'loginTempAccess' })
              }
            })
        })
        .finally(() => {
          loadingLogin.value = false
        })
    }
  })
}
</script>

<style scoped lang="scss">
  .external-access-button {
    width: 48px;
    height: 48px;

    background-color: #50b5ff;
    border-radius: 0.35rem;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .lex {
    background-color: #f0f0f0;
  }
</style>