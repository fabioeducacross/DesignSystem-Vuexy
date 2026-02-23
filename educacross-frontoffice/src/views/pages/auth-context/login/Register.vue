<template>
  <AuthLayout>
    <template v-slot:image>
      <b-img src="@/assets/images/pages/login/LogoLogin.svg" class="mx-auto mb-3" />
      <h1 class="text-center color-grayTheme">Nova conta.</h1>
      <p class="text-center">Para se cadastrar, preencha os campos e defina uma senha.</p>
    </template>

    <div>
      <ValidationObserver ref="refForm">
        <b-row>
          <b-col cols="12">
            <b-form-group label="E-mail*" label-for="email">
              <ValidationProvider
                v-slot="{ errors }"
                name="E-mail"
                rules="required|email|unregistredEmail"
              >
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
                      person
                    </span>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="formRegister.email"
                    type="email"
                    name="email"
                    :state="errors.length > 0 ? false : null"
                    label="E-mail*"
                    placeholder="Digite seu e-mail"
                    :disabled="disableEmailField"
                    @keydown="preventWhiteSpace($event)"
                  />
                </b-input-group>
                <small
                  v-if="errors.length"
                  class="text-danger d-flex align-items-center gap-1 mt-25"
                  ><span class="material-symbols-outlined" style="font-size: 16px"> warning </span>
                  {{ errors[0] }}</small
                >
              </ValidationProvider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Nome completo*" label-for="name">
              <ValidationProvider v-slot="{ errors }" name="Nome Completo" rules="required">
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
                      person
                    </span>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="formRegister.name"
                    type="text"
                    name="name"
                    :state="errors.length > 0 ? false : null"
                    label="Nome completo*"
                    placeholder="Digite seu nome completo"
                  />
                </b-input-group>
                <small
                  v-if="errors.length"
                  class="text-danger d-flex align-items-center gap-1 mt-25"
                  ><span class="material-symbols-outlined" style="font-size: 16px"> warning </span>
                  {{ errors[0] }}</small
                >
              </ValidationProvider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Senha*" label-for="password">
              <ValidationProvider
                v-slot="{ errors }"
                vid="Senha"
                name="Senha"
                rules="required|max:30|password"
              >
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
                    v-model="formRegister.password"
                    :type="showPasswordText ? 'text' : 'password'"
                    name="password"
                    placeholder="Digite sua senha"
                    :state="errors.length > 0 ? false : null"
                    @keyup.enter="loginJWT()"
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
              </ValidationProvider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Confirmar senha*" label-for="passwordCheck">
              <ValidationProvider
                v-slot="{ errors }"
                name="Confirmar Senha"
                rules="required|max:30|password|confirmed:@Senha"
              >
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
                    v-model="formRegister.passwordCheck"
                    :type="showPasswordCheckText ? 'text' : 'password'"
                    name="passwordCheck"
                    :state="errors.length > 0 ? false : null"
                    label="Confirmar senha*"
                    placeholder="Confirme sua senha"
                    autocomplete="new-password"
                  />
                  <b-input-group-append is-text>
                    <span
                      class="material-symbols-outlined cursor-pointer color-patternFour"
                      style="font-size: 20px"
                      @click="showPasswordCheck"
                    >
                      {{ showPasswordCheckText ? 'visibility' : 'visibility_off' }}
                    </span>
                  </b-input-group-append>
                </b-input-group>
                <small
                  v-if="errors.length"
                  class="text-danger d-flex align-items-center gap-1 mt-25"
                  ><span class="material-symbols-outlined" style="font-size: 16px"> warning </span>
                  {{ errors[0] }}</small
                >
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col cols="12" class="mb-1">
            <b-button
              id="button-loading-register"
              variant="primary"
              block
              :disabled="loadingButton || !formRegister.acceptTerms"
              @click.prevent="createAccount"
            >
              Cadastrar
              <b-spinner v-if="loadingButton" small variant="light-primary" />
            </b-button>
          </b-col>
          <b-col cols="12">
            <b-form-group>
              <b-form-checkbox v-model="formRegister.acceptTerms">
                <span class="text-body">
                  Declaro que li e aceito os
                  <a
                    href="https://educalovers.link/termos-de-uso"
                    target="_blank"
                    class="underline"
                  >
                    termos de uso
                  </a>
                  e
                  <a
                    href="https://educalovers.link/politica-de-privacidade"
                    target="_blank"
                    class="underline"
                  >
                    política de privacidade
                  </a>
                </span>
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </ValidationObserver>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from './AuthLayout.vue'
import { loginUser } from '@/auth/utils'
import router from '@/router'
import { postRegister, postVerifyEmail } from '@/services/auth-context/login/Login.service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import store from '@/store'
import UtilTeacherService from '@/utils/teacher-utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { confirmed } from '@core/utils/validations/validations.js'
import axios from 'axios'
import { extend, localize, ValidationObserver, ValidationProvider } from 'vee-validate'
import pt_BR from 'vee-validate/dist/locale/pt_BR.json'
import { email, required } from 'vee-validate/dist/rules'
import { ref, onMounted } from 'vue'

const formRegister = ref({
  email: '',
  name: '',
  password: '',
  passwordCheck: '',
  acceptTerms: false,
})
const showPasswordText = ref(false)
const showPasswordCheckText = ref(false)
const hasEmail = ref(true)
const loadingButton = ref(false)

const tokenParam = ref(router.currentRoute.params.token)
const disableEmailField = ref(false)

if (tokenParam.value) {
  disableEmailField.value = true
}

const googleRegister = ref(false)
const refForm = ref(null)

const emailVerified = store.state.teacherContext.emailVerify
const mainLogo = getWhitelabelConfig('MainLogo')

localize('pt_BR', pt_BR)

extend('required', required)
extend('email', email)
extend('unregistredEmail', async value => {
  const registred = await verifyEmail(value)
  if (!registred) {
    return true
  }
  return 'O e-mail informado já está cadastrado.'
})

const showPassword = () => {
  showPasswordText.value = !showPasswordText.value
}

const showPasswordCheck = () => {
  showPasswordCheckText.value = !showPasswordCheckText.value
}

const cancelEmail = () => {
  store.state.teacherContext.emailVerify = ''
  formRegister.value.email = ''
  hasEmail.value = false
}

const preventWhiteSpace = event => {
  const key = event.keyCode
  if (key === 32) event.preventDefault()
}

const clearEmailState = () => {
  store.state.teacherContext.emailVerify = ''
}

const createAccount = async () => {
  refForm.value.validate().then(async success => {
    if (!success) {
      return
    }

    const payload = {
      email: formRegister.value.email,
      name: formRegister.value.name,
      password: formRegister.value.password,
      explicitAcceptanceOfTermsOfUse: formRegister.value.acceptTerms,
    }
    loadingButton.value = true

    let response
    if (!tokenParam.value) {
      response = await postRegister(payload)
      store.state.teacherContext.accountId = response.data.accountId
      store.commit('totalCodeTimeValidateEmail', 0)
      router.push({ name: 'validateEmailByCode' })
    } else {
      response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL_API}v1/account/auth/create`,
        {
          email: payload.email,
          name: payload.name,
          password: payload.password,
          explicitAcceptanceOfTermsOfUse: payload.explicitAcceptanceOfTermsOfUse,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenParam.value}`,
          },
        },
      )

      await loginUser(response.data.token, response.data.refreshToken)
      router.push({ name: 'managerAccount' })
    }
  })
}

const verifyEmail = email => {
  if (!email || email === '') {
    return false
  }

  return new Promise((resolve, reject) => {
    postVerifyEmail({ email })
      .then(response => {
        const { data } = response

        const { haveAccount } = data
        resolve(haveAccount)
      })
      .catch(error => {
        reject(error)
      })
  })
}

onMounted(() => {
  if (tokenParam.value) {
    const decodedToken = UtilTeacherService.decodeToken(tokenParam.value)
    const email = decodedToken.Email || ''
    formRegister.value.email = email.trim()
    if (formRegister.value.email) {
      hasEmail.value = true
    } else {
      hasEmail.value = false
    }
    formRegister.value.name = decodedToken.Name ? decodedToken.Name : ''
  } else if (emailVerified) {
    formRegister.value.email = emailVerified
    hasEmail.value = true
  } else {
    formRegister.value.email = ''
    hasEmail.value = false
  }

  verifyEmail(formRegister.value.email).then(response => {
    if (response) {
      router.push({ name: 'login' })
    }
  })
})
</script>