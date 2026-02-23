<template>
  <AuthLayout>
    <template v-slot:image>
      <b-img src="@/assets/images/pages/login/LogoLogin.svg" class="mx-auto mb-3" />
      <h1 class="text-center color-grayTheme">Primeiro, informe seu e-mail.</h1>
    </template>
    <div class="d-flex flex-col justify-content-center h-100">
      <div class="mb-2">
        <router-link :to="{ name: 'login' }" class="text-link-login">
          <span class="d-flex align-items-center gap-2" @click="clearEmailState">
            <span class="material-symbols-outlined"> arrow_back </span>
            <span class="underline">Voltar</span>
          </span>
        </router-link>
      </div>

      <form @submit.prevent="verifyEmailValidation">
        <ValidationObserver>
          <b-form-group label="E-mail" label-for="email">
            <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|email">
              <b-form-input
                v-model="formVerifyEmail.email"
                type="email"
                name="email"
                :state="errors.length > 0 ? false : null"
                label="E-mail*"
                placeholder="Digite seu e-mail"
                @keydown="preventWhiteSpace"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </ValidationProvider>
          </b-form-group>

          <p
            v-for="(msgError, indexMsgError) in feedbackGeneralError.message"
            :key="indexMsgError"
            class="text-verifyEmail text-danger mb-1"
          >
            {{ msgError }}
          </p>
          <div class="d-flex justify-content-end">
            <b-button
              id="button-loading-verifyEmail"
              ref="loadableButtonVerifyEmail"
              block
              variant="primary"
              type="filled"
              :disabled="loadingButton"
              @click.prevent="verifyEmailValidation"
            >
              Continuar
              <b-spinner v-show="loadingButton" small variant="light" />
            </b-button>
          </div>
        </ValidationObserver>
      </form>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from './AuthLayout.vue'
import { postVerifyEmail } from '@/services/auth-context/login/Login.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { required, email } from '@validations'
import { BButton } from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'

const formVerifyEmail = ref({
  email: '',
})
const loadingButton = ref(false)
const feedbackGeneralError = ref({
  status: 0,
  message: [],
  errorDictionary: [],
})
const dangerInputEmail = ref(false)

const router = useRouter()

const verifyEmailValidation = () => {
  loadingButton.value = true

  store.state.teacherContext.emailVerify = formVerifyEmail.value.email
  postVerifyEmail(formVerifyEmail.value)
    .then(response => {
      if (response.data.haveAccount === true) {
        if (store.state.access.token) {
          router.push({ name: 'loginAccessUpdate' })
        } else {
          // Equivalent to this.$toast
          // The project likely injects `$toast` globally.
          // But here, we trigger the toast by emitting an event.
          // In Vue 2.7 script setup, we may need to use $toast on `window.app`, but if not possible,
          // Here's how to use Toast manually via event bus or fallback (if global $toast not available)
          if (typeof window.app?.$toast === 'function') {
            window.app.$toast({
              component: Toast,
              props: {
                title: 'Atenção',
                icon: 'AlertTriangleIcon',
                text: 'E-mail já cadastrado.',
                variant: 'warning',
              },
            })
          }
          router.push({ name: 'login' })
        }
      } else {
        router.push({ name: 'registerNewUser' })
      }
      loadingButton.value = false
    })
    .catch(() => {
      feedbackGeneralError.value.message = []
      feedbackGeneralError.value.message.push('E-mail inválido.')
      dangerInputEmail.value = false
      feedbackGeneralError.value.errorDictionary.forEach(element => {
        if (element === 'Email') {
          dangerInputEmail.value = true
        }
      })
      loadingButton.value = false
    })
}

const preventWhiteSpace = event => {
  const key = event.keyCode
  if (key === 32) event.preventDefault()
}

const clearEmailState = () => {
  store.state.teacherContext.emailVerify = ''
}
</script>