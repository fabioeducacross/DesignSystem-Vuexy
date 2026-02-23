<template>
  <AuthLayout>
    <template v-slot:image>
      <b-img src="@/assets/images/pages/login/LogoLogin.svg" class="mx-auto mb-3" />
      <div v-if="isConfirmInfoAccessKey && !feedbackGeneralError">
        <h1 class="text-center color-grayTheme">Ativar acesso.</h1>
        <p class="text-center mb-0">Você recebeu um novo convite de acesso.</p>
      </div>

      <div v-else-if="!feedbackGeneralError">
        <h1 class="text-center color-grayTheme">Pronto!</h1>
        <p class="text-center mb-0">
          Agora, é só acessar sua conta Educacross e utilizar o seu novo acesso.
        </p>
      </div>
    </template>
    <div>
      <div v-if="isConfirmInfoAccessKey && !feedbackGeneralError">
        <b-img :src="LetterEmailStar" class="sideImg mx-auto mb-4" />

        <p>
          Você realmente deseja<span class="text-success font-bold"> aceitar </span>o vínculo desse
          acesso?
        </p>
        <p>
          Acesso:
          <span class="font-bold text-primary">{{ userData.role }}</span>
        </p>
        <p v-if="userData.role === 'Student'">
          Nome:
          <span class="font-bold text-primary">{{ userData.name }}</span>
        </p>
        <p>
          Escola:
          <span class="font-bold text-primary">{{ userData.institutionName }}</span>
        </p>
        <b-form-group>
          <b-form-checkbox v-model="acceptTerms">
            <span class="text-body">
              Declaro que li e aceito os
              <a href="https://educalovers.link/termos-de-uso" target="_blank" class="underline">
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
        <div class="d-flex justify-content-end w-100">
          <b-button
            id="button-loading-activeAccessKey"
            ref="loadableButtonActiveAccessKey"
            variant="primary"
            block
            :disabled="!isAcceptedUseTerms || loadingButton"
            :pressed="loadingButton"
            @click="sendActiveAccessKey"
          >
            <b-spinner v-if="loadingButton" small />
            Ativar acesso
          </b-button>
        </div>
      </div>
      <div v-else-if="!feedbackGeneralError">
        <div class="text-center">
          <span class="material-symbols-outlined modal-icon text-sucess display-2 text-success">
            check_circle
          </span>

          <h1 class="text-success mb-2">Acesso ativado com sucesso!</h1>

          <router-link :to="{ name: 'login' }">
            <b-button block variant="primary" type="filled"> Fazer login </b-button>
          </router-link>
        </div>
      </div>

      <h4 v-if="feedbackGeneralError" class="text-danger text-center font-weight-bold mb-2">
        {{ feedbackGeneralError }}
      </h4>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from './AuthLayout.vue'
import LetterEmailStar from '@/assets/images/images-educa/login/LetterEmailStar.png'
import { loginUser, logoutAccount, logoutUser } from '@/auth/utils'
import UtilTeacherService from '@/utils/teacher-utils/utils'
import axios from 'axios'
import { BButton } from 'bootstrap-vue'
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

// Data / State
const hasAccount = ref(false)
const isConfirmInfoAccessKey = ref(true)
const feedbackGeneralError = ref('')
const token = ref(undefined)
const userData = reactive({})
const acceptTerms = ref(false)
const loadingButton = ref(false)
const objActiveKey = ref({})
const http = ref(undefined)
const accessKey = ref(undefined)

// Asset
const LetterEmailStarImg = LetterEmailStar

const route = useRoute()
const router = useRouter()

// Accept Use Terms
const isAcceptedUseTerms = computed(() => acceptTerms.value)

// Send Activation
const sendActiveAccessKey = async () => {
  const params = {
    accessKey: accessKey.value,
    acceptTerms: acceptTerms.value,
  }
  loadingButton.value = true

  try {
    const res = await http.value.post('/activeaccesskey', params)
    loadingButton.value = false
    isConfirmInfoAccessKey.value = false

    const { accountToken, refreshToken } = res.data

    await loginUser(accountToken, refreshToken).catch(err => {
      const name = err.message
      if (name) {
        router.push({ name })
      }
    })
  } catch (error) {
    loadingButton.value = false
  }
}

// Verify Key
const verifyActiveAccessKey = () => {
  const { AccessKey } = UtilTeacherService.decodeToken(token.value)
  accessKey.value = AccessKey

  http.value
    .post('/verifyaccesskey', {
      accessKey: AccessKey,
    })
    .then(res => {
      // User data is a reactive object, set properties
      Object.assign(userData, res.data)
      hasAccount.value = true
      isConfirmInfoAccessKey.value = true
    })
    .catch(error => {
      const { message, ErrorMessage } = error.response.data
      feedbackGeneralError.value = message
      if (ErrorMessage === 'O Acesso já foi ativado!') {
        isConfirmInfoAccessKey.value = false
      }
    })
}

// Lifecycle
onMounted(() => {
  logoutAccount(false)
  logoutUser(false)
  token.value = route.params.token

  http.value = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL_API}${'v1/account'}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token.value}`,
    },
  })
  verifyActiveAccessKey()
})

// Make these available in template
// All refs/computed can be used directly in template with <script setup>

</script>

<script>
/* Component registration only for legacy auto-import compat (bootstrap-vue plugin pattern) */
export default {
  components: {
    BButton,
    AuthLayout,
  },
}
</script>

<style lang="scss" scoped>
.sideImg {
  max-height: 130px;
  max-width: 100%;
  @media (max-width: 768px) {
    max-width: 80px;
  }
}
</style>