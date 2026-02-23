<template>
  <div>
    <!-- =================================================================================== -->
    <!-- EDIT USER PROFILE -->
    <!-- =================================================================================== -->
    <div
      v-show="!confirmUnlink && !isChangeEmail && !isChangePassword"
      :class="{
        'd-flex justify-content-center align-items-center flex-col': isIntegrator,
      }"
    >
      <b-form
        @submit.prevent="
          submitEditProfileAdmin()
          stopSubmit = false
        "
      >
        <b-row>
          <b-col cols="12" lg="4" class="mb-1">
            <div class="d-flex flex-column align-items-center justify-content-between w-full">
              <UserImageCropper ref="refUserImageCropper" :image-data="imageProfile" />
            </div>
          </b-col>
          <b-col v-if="!isIntegrator">
            <b-form-group label="Nome completo*" label-for="name">
              <b-form-input
                v-model="formEditProfileAdmin.name"
                :danger="dangerInputName"
                name="name"
              />
            </b-form-group>
            <b-form-group label="E-mail*" label-for="email">
              <b-input-group>
                <b-form-input
                  v-model="formEditProfileAdmin.email"
                  type="email"
                  name="email"
                  disabled
                />
                <b-input-group-append
                  is-text
                  @click="
                    isChangeEmail = true
                    showEmailUnchanged = false
                    showEmailChanged = false
                    resetAllErrors()
                  "
                >
                  <span class="material-symbols-outlined text-primary cursor-pointer"> edit </span>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-alert :show="showEmailUnchanged" dismissible variant="warning">
              <div class="alert-body">
                <span class="font-bold">Nada foi alterado.</span>
              </div>
            </b-alert>
            <b-alert :show="showEmailChanged" dismissible variant="success">
              <div class="alert-body">
                <span class="font-bold">E-mail alterado com sucesso!</span>
              </div>
            </b-alert>

            <b-form-group label="Senha" label-for="password">
              <b-input-group>
                <b-form-input name="password" value="••••••••••••••" disabled />
                <b-input-group-append
                  is-text
                  @click="
                    () => {
                      isChangePassword = true
                      showPasswordChanged = false
                      showPasswordUnchanged = false
                    }
                  "
                >
                  <span class="material-symbols-outlined text-primary cursor-pointer">edit</span>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-alert :show="showPasswordUnchanged" dismissible variant="warning">
              <div class="alert-body">
                <span class="font-bold">Nada foi alterado.</span>
              </div>
            </b-alert>
            <b-alert :show="showPasswordChanged" dismissible variant="success">
              <div class="alert-body">
                <span class="font-bold">Senha alterada com sucesso!</span>
              </div>
            </b-alert>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <p
              v-for="(msgError, indexMsgError) in feedbackGeneralError.message"
              :key="indexMsgError"
              class="text-editAdmin text-danger"
            >
              {{ msgError }}
            </p>
          </b-col>
        </b-row>
        <div v-if="haveGoogleLogin()" class="d-flex justify-content-end mb-1">
          <GoogleLogin
            v-if="!formEditProfileAdmin.linkGoogle"
            :params="googleLoginControl.params"
            :on-success="onSuccessGoogle"
            :on-failure="onFailureGoogle"
            style="width: fit-content"
          >
            <b-button
              :class="formEditProfileAdmin.linkGoogle ? 'bg-success' : 'bg-google'"
              :disabled="loadingButton"
              style="width: fit-content"
              @click="stopSubmit = true"
            >
              <div class="flex" style="align-items: center">
                <b-spinner v-if="loadableButtonGoogleLoginLoading" small class="mr-1" />

                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  class="text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                  width="14"
                  height="14"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  />
                </svg>
                <span class="ml-1">Vincular Google</span>
              </div>
            </b-button>
          </GoogleLogin>

          <b-button
            v-else
            id="button-loading-google-login"
            ref="loadableButtonGoogleLogin"
            :variant="formEditProfileAdmin.linkGoogle ? 'success' : '#50B5FF'"
            style="width: fit-content"
            :disabled="loadingButton"
            @click="
              () => {
                stopSubmit = true
                accountType = 'Google'
                confirmUnlink = true
              }
            "
          >
            <div class="flex" style="align-items: center">
              <b-spinner v-if="loadableButtonGoogleLoginLoading" small class="mr-1" />
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                class="text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
                width="14"
                height="14"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                />
              </svg>
              <span class="ml-1">Vinculado</span>
            </div>
          </b-button>
        </div>
        <section class="d-flex align-items-center justify-content-center flex-wrap gap-2">
          <b-button
            variant="outline-danger"
            class="flex-1"
            :disabled="loadingButton"
            @click="
              () => {
                closeEditProfileAdmin()
                stopSubmit = false
                isCancel = true
              }
            "
          >
            Cancelar
          </b-button>
          <b-button
            variant="primary"
            class="flex-1"
            :disabled="!validFormEditProfileAdmin || loadingButton"
            type="submit"
          >
            <b-spinner v-show="loadingButton" small />
            Finalizar
          </b-button>
        </section>
      </b-form>
    </div>

    <!-- =================================================================================== -->
    <!-- DESVINCULAR CONTA -->
    <!-- =================================================================================== -->
    <div
      v-show="confirmUnlink && !isChangeEmail && !isChangePassword"
      class="feedback-editAdmin-box"
    >
      <img
        src="@/assets/images/images-educa/images-feedback/belinha-unlink.png"
        alt="corujinha-success"
        class="img-feedback-editAdmin"
      />
      <p class="title-editAdmin color-patternTwo mt-1">
        Deseja desvincular sua conta do {{ accountType }}?
      </p>
      <b-row>
        <b-col class="button-box-editAdmin mt-10" lg="12" sm="12" xs="12">
          <b-button
            class="button-left-editAdmin"
            variant="outline-secondary"
            type="border"
            :disabled="loadingButton"
            @click="
              () => {
                cancelUnlinkAccountsControl()
                isCancel = true
              }
            "
          >
            Cancelar
          </b-button>
          <b-button
            class="button-right-editAdmin ml-xl-1"
            variant="primary"
            :disabled="loadingButton"
            @click="
              () => {
                unlinkAccountsControl()
                isCancel = false
              }
            "
          >
            <b-spinner v-show="loadingButton" small />
            Desvincular
          </b-button>
        </b-col>
      </b-row>
    </div>

    <!-- =================================================================================== -->
    <!-- CHANGE EMAIL -->
    <!-- =================================================================================== -->
    <div v-show="!confirmUnlink && isChangeEmail && !isChangePassword">
      <template v-if="!isValidateEmail">
        <h3 class="text-primary">Novo e-mail</h3>
        <b-form novalidate @submit.prevent="submitChangeEmail()">
          <b-form-group label="Nome completo" label-for="name">
            <b-form-input :value="formEditProfileAdmin.name" name="name" disabled />
          </b-form-group>
          <b-form-group label="E-mail*" label-for="newEmail">
            <validation-provider
              v-slot="{ errors }"
              ref="teacherEmailValidate"
              name="E-mail"
              rules="required|email|max:100"
            >
              <b-form-input
                v-model="formChangeEmail.email"
                type="email"
                name="newEmail"
                autocomplete="new-user-name"
                placeholder="Digite seu novo e-mail"
                :state="errors.length > 0 ? false : null"
                @input="feedbackGeneralError.message = []"
              />
              <small v-for="(error, index) in errors" :key="index" class="text-danger">
                {{ error }}
              </small>
            </validation-provider>
            <small
              v-for="(msgError, indexMsgError) in feedbackGeneralError.message"
              :key="indexMsgError"
              class="text-danger"
            >
              {{ msgError }}
            </small>
          </b-form-group>

          <p class="text-danger text-center">
            <b>Atenção:</b> Um código de validação será enviado para o novo e-mail.
          </p>
          <div class="d-flex flex-column flex-md-row justify-content-md-center gap-2">
            <b-button
              variant="outline-danger"
              :disabled="loadingButton"
              @click="
                () => {
                  clearChangeEmailStages(true)
                  isCancel = true
                  showEmailUnchanged = true
                }
              "
            >
              Cancelar alteração
            </b-button>
            <b-button
              variant="primary"
              type="submit"
              :disabled="!validFormChangeEmail || loadingButton"
              @click="
                () => {
                  isCancel = false
                }
              "
            >
              <b-spinner v-if="loadingButton" small></b-spinner>
              Avançar
            </b-button>
          </div>
        </b-form>
      </template>
      <template v-else>
        <template v-if="!isFeedbackValidEmail">
          <h3 class="text-primary">Valide seu e-mail</h3>

          <b-form @submit.prevent="submitFormValidateEmail()">
            <b-form-group label="Nome completo" label-for="name">
              <b-form-input :value="formEditProfileAdmin.name" name="name" disabled />
            </b-form-group>
            <p class="text-center">
              Insira o código de 6 dígitos que enviamos para
              <b class="text-primary">{{ formChangeEmail.email }}</b>
            </p>
            <div class="d-flex justify-content-between gap-2 mb-6">
              <b-form-input
                v-for="(digit, index) in digits"
                :key="index"
                ref="digitRefs"
                v-model="digits[index]"
                class="input-largeCode-editAdmin flex-1"
                @input="newVal => handleInput(newVal, index)"
                @keydown="evt => handleKeyDown(evt, index)"
                @paste="evt => handlePaste(evt, index)"
              />
            </div>

            <p class="text-danger text-center">
              <b>Atenção</b>: Código válido por
              {{ emailCodeTimer }}
            </p>
            <b-link
              v-if="!feedbackResendCode"
              class="text-primary underline cursor-pointer font-bold w-full"
              :disabled="emailCodeTimer.includes('minuto') || emailCodeTimer.includes('segundo')"
              @click="resendCodeToEmail()"
            >
              <div class="text-center">
                <span class="material-symbols-outlined align-middle">autorenew</span>
                <span class="align-middle">Reenviar código</span>
              </div>
            </b-link>
            <p class="text-primary cursor-default text-center">
              {{ feedbackResendCode }}
            </p>
            <b-alert dismissible fade variant="danger" :show="confirmEmailCodeCancel">
              <div class="alert-body">
                <span>
                  <b>A validação é obrigatória.</b> Se seguir com o cancelamento, o e-mail não será
                  alterado.
                </span>
              </div>
            </b-alert>
            <div class="d-flex flex-column flex-md-row justify-content-center gap-2">
              <b-button
                variant="outline-danger"
                :disabled="loadingButton"
                @click="
                  () => {
                    clearChangeEmailStages()
                    isCancel = true
                  }
                "
              >
                Cancelar alteração
              </b-button>
              <b-button
                variant="primary"
                type="submit"
                :disabled="!validFormValidateEmail || loadingButton"
                @click.prevent="
                  () => {
                    submitFormValidateEmail()
                    isCancel = false
                  }
                "
              >
                <b-spinner v-if="loadingButton" small></b-spinner>
                Confirmar e salvar
              </b-button>
            </div>
          </b-form>
        </template>
        <template v-else>
          <div class="feedback-editAdmin-box">
            <img
              src="@/assets/images/images-educa/images-feedback/belinha-success.png"
              alt="corujinha-success"
              class="img-feedback-editAdmin"
            />
            <p class="title-editAdmin color-patternTwo mt-1">E-mail alterado com sucesso!</p>
            <b-row>
              <b-col class="button-box-editAdmin" cols="12">
                <b-button
                  class="button-alone-editAdmin"
                  variant="primary"
                  type="filled"
                  @click="
                    () => {
                      closeEditProfileAdmin()
                      isCancel = true
                    }
                  "
                >
                  Ir para área inicial
                </b-button>
              </b-col>
            </b-row>
          </div>
        </template>
      </template>
    </div>

    <!-- =================================================================================== -->
    <!-- CHANGE PASSWORD -->
    <!-- =================================================================================== -->
    <ValidationObserver ref="refObserverPasswordForm" v-slot="{ invalid }">
      <b-form v-show="isChangePassword" @submit.prevent="submitEditProfileAdmin('password')">
        <h3 class="text-primary">Nova senha</h3>
        <b-form-row>
          <b-col cols="12">
            <b-form-group label="Nome completo*" label-for="name">
              <b-form-input
                :value="formEditProfileAdmin.name"
                :danger="dangerInputName"
                disabled
                name="name"
                autocomplete="username"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="E-mail*" label-for="email">
              <b-form-input
                :value="formEditProfileAdmin.email"
                type="email"
                name="email"
                disabled
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Senha atual*" label-for="oldPassword">
              <validation-provider
                v-slot="{ errors }"
                name="Senha atual*"
                rules="required|password|max:30"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : ''"
                >
                  <b-form-input
                    v-model="formEditProfileAdmin.currentPassword"
                    :type="showPasswordText ? 'text' : 'password'"
                    name="oldPassword"
                    :state="errors.length > 0 ? false : null"
                    autocomplete="current-password"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="showPasswordText ? 'EyeIcon' : 'EyeOffIcon'"
                      class="cursor-pointer"
                      @click="showPassword()"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Nova senha*" label-for="newPassword">
              <validation-provider
                v-slot="{ errors }"
                vid="Nova senha*"
                name="Nova senha*"
                rules="required|password|max:30"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : ''"
                >
                  <b-form-input
                    v-model="formEditProfileAdmin.newPassword"
                    :type="showNewPasswordText ? 'text' : 'password'"
                    :state="errors.length > 0 ? false : null"
                    name="newPassword"
                    autocomplete="new-password"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="showNewPasswordText ? 'EyeIcon' : 'EyeOffIcon'"
                      class="cursor-pointer"
                      @click="showNewPassword()"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Confirmar nova senha*" label-for="confirmNewPassword">
              <validation-provider
                v-slot="{ errors }"
                name="Confirmar nova senha*"
                rules="required|max:30|password|confirmed:@Nova senha*"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : ''"
                >
                  <b-form-input
                    v-model="formEditProfileAdmin.confirmNewPassword"
                    :type="showConfirmNewPasswordText ? 'text' : 'password'"
                    :state="errors.length > 0 ? false : null"
                    name="confirmNewPassword"
                    autocomplete="new-password"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="showConfirmNewPasswordText ? 'EyeIcon' : 'EyeOffIcon'"
                      class="cursor-pointer"
                      @click="showConfirmNewPassword()"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-form-row>

        <div class="d-flex flex-column flex-md-row justify-content-center gap-2">
          <b-button
            variant="outline-danger"
            :disabled="loadingButton"
            @click="cancelChangePassword"
          >
            Cancelar alteração
          </b-button>
          <b-button variant="primary" type="submit" :disabled="loadingButton || invalid">
            Salvar
          </b-button>
        </div>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script setup>
import {
  getProfileAdminData,
  postChangeEmailValidation,
  postResendEmailValidation,
  postSendEmailValidation,
  putEditAccessAdmin,
  putLinkFacebook,
  putLinkGoogle,
} from '@/services/auth-context/account-manager/Account.service'
import store from '@/store'
import UserImageCropper from '@/views/pages/auth-context/manage-account/components/UserImageCropper.vue'
import { confirmed, max, password, required } from '@core/utils/validations/validations.js'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Vue, { computed, nextTick, onMounted, reactive, ref } from 'vue'
import GoogleLogin from 'vue-google-login'

const emit = defineEmits(['close-editProfileAdmin', 'close-editProfileAdmin-withAtt', 'update-profile-img', 'update-user-account-name'])

// Reactive State
const formEditProfileAdmin = reactive({
  name: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  imageBase64: '',
  linkFacebook: false,
  linkGoogle: false,
})

const imageProfile = ref('')
const showPasswordText = ref(false)
const showNewPasswordText = ref(false)
const showConfirmNewPasswordText = ref(false)
const isCancel = ref(false)
const feedbackGeneralError = reactive({
  status: 0,
  message: [],
  errorDictionary: [],
})

const dangerInputName = ref(false)
const pictureAdminAux = ref('')
const loadingButton = ref(false)
const isChangePassword = ref(false)
const showPasswordChanged = ref(false)
const showPasswordUnchanged = ref(false)
const showEmailChanged = ref(false)
const showEmailUnchanged = ref(false)
const refObserverPasswordForm = ref(null)

const googleLoginControl = reactive({
  params: {
    client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
  },
  renderParams: {
    width: 250,
    height: 50,
    longtitle: true,
  },
})

const stopSubmit = ref(false)
const confirmUnlink = ref(false)
const accountType = ref('')
const isChangeEmail = ref(false)

const formChangeEmail = reactive({
  email: '',
})

const dangerInputNewEmail = ref(false)
const isValidateEmail = ref(false)
const isFeedbackValidEmail = ref(false)
const emailCodeTimer = ref('')
let intervalEmailCodeTimer = null
const validationCodeExpiredTimeInMinutes = ref(10)
const digits = ref(Array(6).fill(''))
const dangerInputEmailCode = ref(false)
const feedbackResendCode = ref('')
const loadableButtonGoogleLoginLoading = ref(false)
const length = ref(6)
const refUserImageCropper = ref(null)
const digitRefs = ref([])
const confirmEmailCodeCancel = ref(false)

// Computed Properties
const isIntegrator = computed(() => {
  const { Integrator } = store.getters.accountUserData
  return Integrator
})

const validFormEditProfileAdmin = computed(() => {
  return (
    formEditProfileAdmin.name.length > 0 &&
    (!isChangePassword.value ||
      (formEditProfileAdmin.currentPassword.length > 0 &&
        formEditProfileAdmin.newPassword.length > 0 &&
        formEditProfileAdmin.confirmNewPassword.length > 0))
  )
})

const validFormChangeEmail = computed(() => {
  return formChangeEmail.email.length > 0
})

const validFormValidateEmail = computed(() => {
  return digits.value.every(value => value !== '')
})

// Lifecycle Hooks
onMounted(async () => {
  await getProfileAdmin()
})

// Methods

const haveGoogleLogin = () => {
  const googleKeyEnv = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID
  return !!googleKeyEnv && googleKeyEnv.trim() !== ''
}

const cancelChangePassword = () => {
  isChangePassword.value = false
  formEditProfileAdmin.currentPassword = ''
  formEditProfileAdmin.confirmNewPassword = ''
  formEditProfileAdmin.newPassword = ''
  showPasswordUnchanged.value = true
  showPasswordChanged.value = false

  refObserverPasswordForm.value.reset()
}

const resetAllErrors = () => {
  feedbackGeneralError.status = 0
  feedbackGeneralError.message = []
  feedbackGeneralError.errorDictionary = []
  dangerInputName.value = false
  dangerInputNewEmail.value = false
  dangerInputEmailCode.value = false
}

const getProfileAdmin = async () => {
  const response = await getProfileAdminData()
  formEditProfileAdmin.name = response.data.name
  formEditProfileAdmin.email = response.data.email
  formEditProfileAdmin.imageBase64 = response.data.imageUrl
  imageProfile.value = response.data.imageUrl
  formEditProfileAdmin.linkGoogle = response.data.linkGoogle
  formEditProfileAdmin.linkFacebook = response.data.linkFacebook
  pictureAdminAux.value = response.data.imageUrl
}

const closeEditProfileAdmin = () => {
  emit('close-editProfileAdmin')
}

const closeEditProfileAdminWithAtt = () => {
  emit('close-editProfileAdmin-withAtt')
}

const showPassword = () => {
  showPasswordText.value = !showPasswordText.value
}

const showNewPassword = () => {
  showNewPasswordText.value = !showNewPasswordText.value
}

const showConfirmNewPassword = () => {
  showConfirmNewPasswordText.value = !showConfirmNewPasswordText.value
}

const closeAndCleanPassword = () => {
  isChangePassword.value = false
  formEditProfileAdmin.currentPassword = ''
  formEditProfileAdmin.newPassword = ''
  formEditProfileAdmin.confirmNewPassword = ''

  refObserverPasswordForm.value.reset()
}

/**
 * @param {'password'} editing
 */
const submitEditProfileAdmin = editing => {
  feedbackGeneralError.message = []

  if (refUserImageCropper.value) {
    formEditProfileAdmin.imageBase64 = refUserImageCropper.value.getCroppedCanvas()
  }

  if (stopSubmit.value) return

  loadingButton.value = true

  putEditAccessAdmin({
    imageBase64: formEditProfileAdmin.imageBase64,
    name: formEditProfileAdmin.name,
    currentPassword: formEditProfileAdmin.currentPassword,
    newPassword: formEditProfileAdmin.newPassword,
  })
    .then(response => {
      closeEditProfileAdminWithAtt()
      const profileImageUrl = response.data.imageUrl || store.state.account.userData?.ImageUrl
      emit('update-profile-img', profileImageUrl)
      emit('update-user-account-name', formEditProfileAdmin.name)

      confirmUnlink.value = false
      isChangeEmail.value = false
      isChangePassword.value = false

      formEditProfileAdmin.currentPassword = ''
      formEditProfileAdmin.newPassword = ''
      formEditProfileAdmin.confirmNewPassword = ''

      refObserverPasswordForm.value.reset()

      if (editing === 'password') {
        showPasswordChanged.value = true
      } else {
        emit('close-editProfileAdmin')
      }
    })
    .finally(() => {
      loadingButton.value = false
    })
}

const onSuccessGoogle = googleUser => {
  feedbackGeneralError.message = []
  loadingButton.value = true
  loadableButtonGoogleLoginLoading.value = true
  if (!formEditProfileAdmin.linkGoogle) {
    putLinkGoogle({ googleId: googleUser.getBasicProfile().getId() })
      .then(() => {
        loadingButton.value = false
        loadableButtonGoogleLoginLoading.value = false
        formEditProfileAdmin.linkGoogle = true
      })
      .catch(error => {
        loadingButton.value = false
        loadableButtonGoogleLoginLoading.value = false
        feedbackGeneralError.message.push(error)
      })
  } else {
    accountType.value = 'Google'
    confirmUnlink.value = true
  }
  stopSubmit.value = false
}

const onFailureGoogle = () => {
  feedbackGeneralError.message = []
  stopSubmit.value = false
}

const unlinkAccountsControl = () => {
  feedbackGeneralError.message = []
  if (accountType.value === 'Facebook') {
    putLinkFacebook({ facebookId: null })
      .then(() => {
        loadingButton.value = false
        formEditProfileAdmin.linkFacebook = false
      })
      .catch(error => {
        loadingButton.value = false
        feedbackGeneralError.message.push(error)
      })
    confirmUnlink.value = false
  } else if (accountType.value === 'Google') {
    putLinkGoogle({ googleId: null })
      .then(() => {
        loadingButton.value = false
        loadableButtonGoogleLoginLoading.value = false
        formEditProfileAdmin.linkGoogle = false
      })
      .catch(error => {
        loadingButton.value = false
        loadableButtonGoogleLoginLoading.value = false
        feedbackGeneralError.message.push(error)
      })
    confirmUnlink.value = false
  }

  stopSubmit.value = false
}

const cancelUnlinkAccountsControl = () => {
  resetAllErrors()
  loadingButton.value = false
  loadableButtonGoogleLoginLoading.value = false
  confirmUnlink.value = false
  stopSubmit.value = false
}

const submitChangeEmail = () => {
  loadingButton.value = true
  postSendEmailValidation(formChangeEmail)
    .then(() => {
      resetAllErrors()
      isValidateEmail.value = true
      countDownTimer()
    })
    .catch(e => {
      feedbackGeneralError.message = []
      feedbackGeneralError.message.push(e.response?.data?.ErrorMessage)
      showEmailUnchanged.value = true
    })
    .finally(() => {
      loadingButton.value = false
    })
}

const countDownTimer = () => {
  let totalTime = new Date()
  totalTime.setMinutes(totalTime.getMinutes() + validationCodeExpiredTimeInMinutes.value)
  totalTime = totalTime.getTime()

  intervalEmailCodeTimer = setInterval(() => {
    const currentTime = new Date().getTime()
    const difference = totalTime - currentTime

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    if (minutes > 0 && seconds > 0) {
      emailCodeTimer.value = `${minutes} minuto${minutes === 1 ? '' : 's'} e ${seconds} segundo${seconds === 1 ? '' : 's'}`
    } else if (minutes > 0 && seconds === 0) {
      emailCodeTimer.value = `${minutes} minuto${minutes === 1 ? '' : 's'}`
    } else if (seconds > 0) {
      emailCodeTimer.value = `${seconds} segundo${seconds === 1 ? '' : 's'}`
    } else {
      emailCodeTimer.value = 'O tempo do código foi expirado! Clique em reenviar código.'
      clearInterval(intervalEmailCodeTimer)
    }
  }, 1000)
}

const resendCodeToEmail = () => {
  if (!emailCodeTimer.value.includes('minuto') && !emailCodeTimer.value.includes('segundo')) {
    const payload = {
      accountId: store.state.account.userData?.AccountId,
    }
    clearInterval(intervalEmailCodeTimer)
    feedbackResendCode.value = 'Enviando...'
    postResendEmailValidation(payload).then(() => {
      feedbackResendCode.value = 'Enviado com sucesso!'
      countDownTimer()
      setTimeout(() => {
        feedbackResendCode.value = ''
      }, 4000)
    })
  }
}

const submitFormValidateEmail = () => {
  loadingButton.value = true
  const codeValidateEmailConcat = digits.value.join('')
  const payload = {
    code: codeValidateEmailConcat,
  }
  postChangeEmailValidation(payload)
    .then(() => {
      isChangeEmail.value = false
      isValidateEmail.value = false
      emailCodeTimer.value = ''
      loadingButton.value = false
      showEmailChanged.value = true

      store.state.account.userData.Email = formChangeEmail.email
      formEditProfileAdmin.email = formChangeEmail.email

      formChangeEmail.email = ''
    })
    .catch(() => {
      dangerInputEmailCode.value = true
      loadingButton.value = false
      showEmailUnchanged.value = true
    })
    .finally(() => {
      digits.value = new Array(6).fill('')
    })
}

const clearChangeEmailStages = (byPassVerification = false) => {
  if (!confirmEmailCodeCancel.value && !byPassVerification) {
    confirmEmailCodeCancel.value = true
    return
  }

  resetAllErrors()
  isChangeEmail.value = false
  isValidateEmail.value = false
  formChangeEmail.email = ''
  emailCodeTimer.value = ''
  clearInterval(intervalEmailCodeTimer)
  digits.value = Array(6).fill('')
  confirmEmailCodeCancel.value = false
  showEmailUnchanged.value = true
  showEmailChanged.value = false
}

// Handling the 6-digit input
const handleInput = (newVal, index) => {
  let _val = newVal
  if (_val.length > 1) {
    _val = _val[_val.length - 1]
  }
  digits.value[index] = _val
  if (_val && index < length.value - 1) {
    nextTick(() => digitRefs.value[index + 1].focus())
  }
}

const handleKeyDown = (evt, index) => {
  if (evt.key === 'Backspace') {
    Vue.set(digits.value, index, '')
    if (index > 0) digitRefs.value[index - 1].focus()
    evt.preventDefault()
  }
}

const handlePaste = evt => {
  evt.preventDefault()
  const pastedData = (evt.clipboardData || window.clipboardData).getData('text')
  if (!pastedData) return
  const chars = pastedData.split('')
  for (let i = 0; i < chars.length && i < length.value; i++) {
    Vue.set(digits.value, i, chars[i])
  }
}
</script>

<style lang="scss">
  .input-largeCode-editAdmin {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    padding: 0;
    text-align: center;
    color: black !important;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 30px;
    }

    @media (min-width: 768px) {
      font-size: 50px;
    }

    @media (min-width: 1024px) {
      font-size: 60px;
    }
  }
</style>

<style lang="scss" scoped>
  .container-editProfileAdmin {
    padding: 1.75rem;
  }

  .title-editAdmin {
    font-weight: 600;
    font-size: 34px;
    line-height: 38px;
  }

  .text-editAdmin {
    font-size: 16px;
    line-height: 21px;
  }

  .textLink-editAdmin {
    text-decoration: underline;
    cursor: pointer;
    text-align: center;
  }

  .icon-password-editAdmin {
    align-self: center;
    position: relative;
    top: 2.25rem;
    right: 2.25rem;
    cursor: pointer;
    height: min-content;
  }

  .boxBorderMini-transparent-editAdmin {
    border: 1px solid transparent;
  }

  .boxBorderMini-gray-editAdmin {
    border: 1px solid #d9d9d9;
  }

  .button-box-editAdmin {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .button-right-editAdmin,
  .button-left-editAdmin,
  .button-alone-editAdmin,
  .button-upload-editAdmin {
    width: 15rem;
  }

  .pictureProfileAdmin-container {
    width: 300px !important;
  }

  .responsive-formEditAdmin {
    display: flex;
    width: 100%;
  }

  .cropper-admin {
    .cropper-dashed {
      border: none;
    }

    .cropper-center::before,
    .cropper-center::after {
      background: none;
    }
  }

  @media (max-width: 1024px) {
    .button-left-editAdmin {
      margin-right: 0;
      margin-bottom: 4%;
    }

    .button-right-editAdmin {
      margin-left: 0;
    }

    .button-right-editAdmin,
    .button-left-editAdmin,
    .button-alone-editAdmin,
    .button-upload-editAdmin {
      width: 100%;
    }

    .container-editProfileAdmin {
      padding: 0;
    }

    .responsive-formEditAdmin {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .alternativeAccessButton {
    font-weight: 600 !important;
  }

  [id^='google-signin-btn-'] {
    cursor: pointer;
    border: 0;
  }

  .feedback-editAdmin-box {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;

    .img-feedback-editAdmin {
      width: 300px;
      height: 226px;

      @media (max-width: 359px) {
        width: 100%;
        height: auto;
      }
    }
  }

  .bg-success {
    background: #8bc728 !important;
    border: none;
  }

  .bg-google {
    background: #50b5ff !important;
    border: none;
  }

  .margin-auto {
    margin: auto;
  }

  .edit-user-image-wrapper {
    background: #000000a6;
    box-shadow: 0 4px 4px 0 #00000040;
    width: 33px;
    height: 33px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 10px;
    top: 5px;

    & > span {
      text-shadow: 0 4px 4px 0 #00000040;
      font-size: 20px;
    }
  }
</style>