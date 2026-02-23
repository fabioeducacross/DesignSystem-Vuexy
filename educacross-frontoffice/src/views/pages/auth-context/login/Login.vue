<template>
  <div>
    <intermediate-redirect-login-deep-link v-if="waitRedirectingToDeepLinkLogin" />

    <AuthLayout v-if="!lexAcountSelect">
      <template v-slot:image>
        <b-img :src="logoLogin" class="mx-auto mb-3" />
        <h1 class="text-center">Acessar conta.</h1>
        <p class="text-center">Seja bem-vindo à {{ name }}.</p>
      </template>
      <div>
        <ValidationObserver ref="formLogin">
          <form @submit.prevent="loginJWT">
            <b-form-group>
              <validation-provider v-slot="{ errors }" name="E-mail" rules="required|email">
                <label for="email">E-mail*</label>
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : ''"
                >
                  <b-input-group-prepend is-text>
                    <span
                      class="material-symbols-outlined color-patternFour"
                      :class="errors.length > 0 ? 'text-danger' : ''"
                      style="font-size: 20px"
                    >
                      person
                    </span>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="formLoginData.email"
                    name="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    :state="errors.length > 0 ? false : null"
                    @keydown="preventWhiteSpace"
                    @keyup.enter="loginJWT"
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
                <label for="password">Senha*</label>
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : ''"
                >
                  <b-input-group-prepend is-text>
                    <span
                      class="material-symbols-outlined"
                      :class="errors.length > 0 ? 'text-danger' : 'color-patternFour'"
                      style="font-size: 20px"
                    >
                      lock
                    </span>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="formLoginData.password"
                    :type="showPasswordText ? 'text' : 'password'"
                    name="password"
                    placeholder="Digite sua senha"
                    :state="errors.length > 0 ? false : null"
                    @keyup.enter="loginJWT"
                  />
                  <b-input-group-append is-text>
                    <span
                      class="material-symbols-outlined cursor-pointer color-patternFour"
                      style="font-size: 20px"
                      @click="showPassword"
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
              class="w-100 mb-50"
              :disabled="loadingLogin"
              @click.prevent="loginJWT"
            >
              Acessar
              <b-spinner v-show="loadingLogin" small variant="light" />
            </b-button>

            <b-button
              id="button-loading-login"
              ref="loadableButtonLogin"
              variant="outline-primary"
              class="w-100 mb-50"
              :disabled="loadingLogin"
              :to="{ name: 'loginTempAccess' }"
            >
              Acessar com senha temporária
              <b-spinner v-show="loadingLogin" small variant="light" />
            </b-button>
            <div class="text-center font-weight-bold mb-2">
              <router-link :to="{ name: 'forgotPassword' }" class="text-link-login underline">
                Esqueceu sua senha? Recupere aqui.
              </router-link>
            </div>
          </form>
        </ValidationObserver>
        <divider class="text-body">Outras formas de acesso:</divider>

        <div
          class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-5 lg:gap-x-8 w-100"
        >
          <GoogleLogin
            v-if="haveGoogleLogin"
            :params="googleLoginControl.params"
            :on-success="onSuccessGoogle"
            :on-failure="onFailureGoogle"
          >
            <div
              id="button-loading-google-login"
              ref="loadableButtonGoogleLogin"
              v-b-tooltip="'Google'"
              class="external-access-button lex"
              :class="{ disabled: loadingButton }"
            >
              <b-img src="@/assets/images/logo/google.svg" width="18" height="18" />
            </div>
          </GoogleLogin>

          <div
            ref="loadableButtonFacebookLogin"
            v-b-tooltip="'Microsoft'"
            class="external-access-button lex"
            :class="{ disabled: loadingButton }"
            @click="loginMicrosoft"
          >
            <b-img src="@/assets/images/logo/microsoft.svg" width="18" height="18" />
          </div>

          <div
            v-if="showOtherLogins"
            ref="loadableButtonFacebookLogin"
            v-b-tooltip="'Lex'"
            class="external-access-button lex"
            :class="{ disabled: loadingButton }"
            @click="loginLex"
          >
            <b-img src="@/assets/images/images-educa/icons/lex-icon.svg" width="18" height="18" />
          </div>

          <div
            v-if="showOtherLogins"
            ref="loadableButtonFacebookLogin"
            v-b-tooltip="'SAS'"
            class="external-access-button lex"
            :class="{ disabled: loadingButton }"
            @click="loginSas"
          >
            <b-img src="@/assets/images/images-educa/icons/sas-icon.svg" width="36" height="15" />
          </div>

          <div
            v-if="showOtherLogins"
            ref="loadableButtonFacebookLogin"
            v-b-tooltip="'COC'"
            class="external-access-button lex"
            :class="{ disabled: loadingButton }"
            @click="loginCOC"
          >
            <b-img src="@/assets/images/images-educa/icons/coc-icon.svg" width="36" height="25" />
          </div>

          <div
            v-if="showOtherLogins"
            ref="loadableButtonFacebookLogin"
            v-b-tooltip="'Plurall'"
            class="external-access-button lex"
            :class="{ disabled: loadingButton }"
            @click="loginPlural"
          >
            <b-img
              src="@/assets/images/images-educa/icons/plural-icon.svg"
              width="48"
              height="48"
            />
          </div>

          <div
            v-if="showOtherLogins"
            ref="loadableButtonFacebookLogin"
            v-b-tooltip="'Layers'"
            class="external-access-button layers"
            :class="{ disabled: loadingButton }"
            @click="loginlayers"
          >
            <b-img src="@/assets/images/images-educa/icons/layers.svg" width="48" height="48" />
          </div>
        </div>
        <div>
          <p
            v-for="(msgError, indexMsgError) in feedbackLoginError.message"
            :key="indexMsgError"
            class="text-login text-danger mt-4 mb-4"
          >
            {{ msgError }}
          </p>
        </div>
      </div>
    </AuthLayout>
  </div>
</template>

<script setup>
import AuthLayout from './AuthLayout.vue'
import AuthMicrosoft from '@/auth/microsoft/AuthMicrosoft'
import { loginUser } from '@/auth/utils'
import Divider from '@/components/divider/Divider.vue'
import { postLogin, postLoginGoogle } from '@/services/auth-context/login/Login.service'
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
import GoogleLogin from 'vue-google-login'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import store from '@/store'
import { useRouter } from 'vue-router/composables'

// Component refs
const formLogin = ref(null)
const loadableButtonLogin = ref(null)
const loadableButtonGoogleLogin = ref(null)
const loadableButtonFacebookLogin = ref(null)

// Whitelabel config
const logoLogin = getWhitelabelConfig('LogoLogin')
const showOtherLogins = getWhitelabelConfig('showOthersLogins')
const name = getWhitelabelConfig('name')

// Router
const router = useRouter()

// Reactive data
const formLoginData = ref({
  email: '',
  password: '',
  checkboxRemember: false,
})
const showPasswordText = ref(false)
const loadingButton = ref(false)
const feedbackGeneralError = ref({
  status: 0,
  message: [],
})
const feedbackLoginError = ref({
  status: 0,
  message: [],
})
const googleLoginControl = ref({
  params: {
    client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
  },
  renderParams: {
    width: 250,
    height: 50,
    longtitle: true,
  },
})
const finishAccountUpdate = ref(false)
const redirectUri = ref('')
const lexAcountSelect = ref(false)
const lexUsers = ref([])
const lexToken = ref('')
const accessCredentials = ref({
  token: '',
  decodedToken: '',
})
const enterWithAccount = ref(false)
const waitRedirectingToDeepLinkLogin = ref(false)
const loadingLogin = ref(false)

// Computed: emailVerified
const emailVerified = computed(() => store.state.emailVerify)

// Handle created lifecycle
onMounted(() => {
  const loadingBg = document.getElementById('loading-bg')
  if (loadingBg) loadingBg.setAttribute('style', 'display: none')
  if (emailVerified.value) {
    formLoginData.value.email = emailVerified.value
  } else {
    formLoginData.value.email = ''
  }
})

// Handle destroyed lifecycle
onUnmounted(() => {
  store.commit('UPDATE_GLOBAL_ERROR', {})
})

// Helpers
const userType = profile => {
  switch (profile) {
    case '1':
      return 'Aluno'
    case '2':
      return 'Professor'
    case '5':
      return 'Coordenador'
    case '4':
      return 'Diretor'
    case '3':
      return 'Responsável'
    default:
      return ''
  }
}

// Google Login presence
const haveGoogleLogin = computed(() => {
  const googleKeyEnv = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID
  return !!googleKeyEnv && googleKeyEnv.trim() !== ''
})

// Microsoft Login
const loginMicrosoft = () => {
  const auth = new AuthMicrosoft()
  auth.signIn()
}

// Google Success
const onSuccessGoogle = async googleUser => {
  loadingButton.value = true

  const { id_token } = googleUser.getAuthResponse()

  await postLoginGoogle(id_token).then(response => {
    loadingButton.value = false
    decodeTokenAndLogin(response.data.token, response.data.refreshToken)
  })
}
const onFailureGoogle = () => {}

// Other login methods
const loginLex = () => {
  if (loadingButton.value) return
  router.push({ name: 'loginLex' })
}
const loginlayers = () => {
  if (loadingButton.value) return
  router.push({ name: 'loginLayers' })
}
const loginSas = () => {
  if (loadingButton.value) return
  router.push({ name: 'ArcoSas' })
}
const loginCOC = () => {
  if (loadingButton.value) return
  router.push({ name: 'LoginCoc' })
}
const loginPlural = () => {
  if (loadingButton.value) return
  router.push({ name: 'LoginPlurall' })
}

// Show/Hide Password
const showPassword = () => {
  showPasswordText.value = !showPasswordText.value
}

// Prevent whitespace
const preventWhiteSpace = event => {
  const key = event.keyCode
  if (key === 32) event.preventDefault()
}

// Decode & login flow (shared logic)
const decodeTokenAndLogin = async (token, refreshToken) => {
  try {
    await loginUser(token, refreshToken).catch(err => {
      const name = err.message
      if (name) {
        router.push({ name })
      }
    })
    router.push({ name: 'managerAccount' })
  } catch (e) {
    router.push({ name: 'login' })
  }
}

// JWT Login
const loginJWT = () => {
  if (formLogin.value) {
    formLogin.value.validate().then(success => {
      if (success) {
        loadingLogin.value = true
        loadingButton.value = true

        postLogin(formLoginData.value)
          .then(async response => {
            if (response.data.redirectUri) {
              redirectUri.value = response.data.redirectUri
              finishAccountUpdate.value = true
              accessCredentials.value = {
                decodedToken: {
                  Students: [],
                  redirectUri: response.data.redirectUri,
                },
              }
            } else if (response.data.enterWithAccount === false) {
              enterWithAccount.value = false
              finishAccountUpdate.value = true
              if (response.data.token) {
                if (response.data.decodedToken.Role === 'Teacher') {
                  response.data.decodedToken.roleTranslated = 'Professor'
                } else if (response.data.decodedToken.Role === 'Coordinator') {
                  response.data.decodedToken.roleTranslated = 'Coordenador'
                } else if (response.data.decodedToken.Role === 'Secretariat') {
                  response.data.decodedToken.roleTranslated = 'Administrador Escolar'
                } else if (response.data.decodedToken.Role === 'Manager') {
                  response.data.decodedToken.roleTranslated = 'Diretor'
                } else if (response.data.decodedToken.Students) {
                  if (
                    response.data.decodedToken.Role === 'Sponsor' &&
                    response.data.decodedToken.Students.length === 1
                  ) {
                    response.data.decodedToken.roleTranslated = 'Aluno'
                    response.data.decodedToken.UserName =
                      response.data.decodedToken.Students[0].UserName
                    response.data.decodedToken.InstitutionName =
                      response.data.decodedToken.Students[0].SchoolName
                  }
                }
              }
            }
            await loginUser(response.data.token, response.data.refreshToken).catch(err => {
              const name = err.message
              if (name) {
                router.push({ name })
              }
            })
            router.push({ name: 'managerAccount' })
            loadingButton.value = false
            store.state.emailVerify = ''
          })
          .catch(error => {
            if (error.status === 403 && error.data.accountId) {
              router.push({ name: 'validateEmailByCode' })
              store.state.accountId = error.data.accountId
              store.commit('totalCodeTimeValidateEmail', 0)
            } else {
              feedbackGeneralError.value.message = []
              feedbackGeneralError.value.message.push('Dados inválidos.')
              loadingButton.value = false
            }
          })
          .finally(() => {
            loadingLogin.value = false
          })
      }
    })
  }
}

// Update now
const updateNow = () => {
  store.commit('accountToken', accessCredentials.value.token)
  router.push({ name: 'verifyEmail' })
  loadingButton.value = false
}

// External redirects
const redirectStudentApp = () => {
  window.location.replace(redirectUri.value)
}
const redirectToSupport = () => {
  window.location.replace(
    'https://suporte.educacross.com.br/hc/pt-br/articles/360049175331-Minha-escola-%C3%A9-parceira-Educacross-e-estou-com-d%C3%BAvidas',
  )
}

// Lex account select
const IntermediateRedirectLoginDeepLink = ref(null)

</script>

<style scoped lang="scss">
  .external-access-button {
    width: 48px;
    height: 48px;
    min-width: 48px;
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

  .layers {
    background-color: #30b8ad;
  }

  .text-link-login {
    color: #00bdb9;
  }
</style>