<template>
  <AuthLayout>
    <template v-slot:image>
      <b-img src="@/assets/images/pages/login/LogoLogin.svg" class="mx-auto mb-3" />
      <h1 class="text-center color-grayTheme">Recuperar senha.</h1>
      <p class="text-center mb-0">Enviaremos um link para a alteração da senha.</p>
      <p class="text-center text-danger">
        Atenção: O link estará disponível apenas pelos próximos 10 minutos.
      </p>
    </template>

    <div>
      <div v-if="isForgotPassword">
        <div class="mb-2">
          <router-link
            :to="{ name: 'login' }"
            class="text-link-login d-flex align-items-center gap-2"
          >
            <span class="material-symbols-outlined"> arrow_back </span>
            <span class="underline">Voltar</span>
          </router-link>
        </div>

        <ValidationObserver ref="formRecoverPassword">
          <b-form @submit.prevent>
            <b-row>
              <b-col cols="12">
                <b-form-group label="E-mail do cadastro*" label-for="userId">
                  <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|email">
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
                        id="userId"
                        v-model="userEmail"
                        type="email"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Digite o e-mail utilizado no cadastro."
                        @keydown="preventWhiteSpace"
                      />
                    </b-input-group>
                    <small
                      v-if="errors.length"
                      class="text-danger d-flex align-items-center gap-1 mt-25"
                      ><span class="material-symbols-outlined" style="font-size: 16px">
                        warning
                      </span>
                      {{ errors[0] }}</small
                    >
                  </ValidationProvider>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <div class="d-flex justify-content-end">
                  <b-button
                    block
                    variant="primary"
                    type="filled"
                    :disabled="loadingButton"
                    @click="submitPasswordReset"
                  >
                    <b-spinner v-if="loadingButton" small />
                    Recuperar senha
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </b-form>
        </ValidationObserver>
      </div>
      <div v-else class="text-center">
        <span class="material-symbols-outlined modal-icon text-sucess display-2 text-success">
          check_circle
        </span>

        <p class="font-bold text-success mb-0">E-mail enviado!</p>
        <p>Verifique sua caixa de entrada.</p>

        <b-button block variant="primary" :to="{ name: 'login' }" type="filled">
          Voltar para início
        </b-button>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AuthLayout from './AuthLayout.vue'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { required, registredEmail } from '@core/utils/validations/validations.js'
import { BButton } from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import store from '@/store'
import axios from 'axios'

const userEmail = ref(undefined)
const isForgotPassword = ref(true)
const loadingButton = ref(false)
const formRecoverPassword = ref(null)
const feedbackGeneralError = ref({
  status: 0,
  message: [],
  errorDictionary: [],
})
const dangerInputEmail = ref(false)

const submitPasswordReset = async () => {
  const valid = await formRecoverPassword.value.validate()
  if (valid) {
    loadingButton.value = true
    try {
      await axios.post('v1/account/forgotpassword', {
        emailOrUserName: userEmail.value,
        whitelabel: getWhitelabelConfig('Id'),
      })
      loadingButton.value = false
      isForgotPassword.value = false
    } catch {
      feedbackGeneralError.value.message = []
      feedbackGeneralError.value.message.push('Acesso não encontrado.')
      dangerInputEmail.value = false
      feedbackGeneralError.value.errorDictionary.forEach(element => {
        if (element === 'Email') {
          dangerInputEmail.value = true
        }
      })
      loadingButton.value = false
    }
  }
}

const preventWhiteSpace = event => {
  const key = event.keyCode
  if (key === 32) event.preventDefault()
}

onMounted(() => {
  if (store.state.email) {
    userEmail.value = store.state.email
  }
})
</script>